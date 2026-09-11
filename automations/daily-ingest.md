# Geometry arXiv Daily

这是工作日上海时间 10:30、14:30 的日报数据任务。成功静默，最终未完成、限流延期或权限阻塞须失败通知。可恢复的临时错误在本次成功恢复后不单独报警。不得打印令牌、Authorization 或完整报告载荷。

## 共享请求、进度与时段

- 所有子命令继承同一个 `ARXIV_RUN_ID` 和 `ARXIV_SCHEDULED_FOR`（ISO 时区时间），并将 `ARXIV_CACHE_DIR` 指向保存项目的 `.automation/arxiv-cache` 绝对路径；临时 worktree 也使用该目录，不另建限流器。上午、下午、手动运行必须各有唯一 runId；进程重启恢复同一运行时沿用其 ID。每日结果指针与 `history/<runId>.json` 都记录 scheduledFor、startedAt、completedAt，不覆盖旧失败记录。
- 先等待已有日报任务完成，再准备数据；发布过程用 `scripts/with_lock.py .automation/daily-write.flock` 包住实际发布命令，禁止并发写入。不要把长期锁留在依靠多次独立工具调用的后台进程中。
- 所有 arXiv HTTP 读取必须使用 `scripts/arxiv_client.py`，包括全文、清单、元数据与回溯。禁止临时编写 urllib/curl 并行抓取。共享跨进程锁、4 秒间隔、Retry-After 和每时段累计 20 分钟等待预算；Deferred 必须保留进度，不能换 runId、代理或主机继续冲击。
- 当前日报优先。处于冷却或日报/镜像未完成时，不做历史回溯。历史解析失败不得当作假日或零发文，保留待核验记录。
- `.automation/arxiv-cache/` 保存成功响应、内容哈希、时间及冷却/请求计数；`.automation/progress/` 保存阶段证据、按元数据及规则版本索引的分析、Pages 待发布状态。这些目录禁止进入 Git 或日志。

## 当次运行结果与权限

- 在 `.automation/daily-outcomes/YYYY-MM-DD.json`（上海计划日期）记录当次结果，包含 `schemaVersion: 1`、唯一 `runId`、`scheduledDate`、`status`。开始时为 `running`；失败为 `failed`，权限拒绝为 `blocked`。同时保留以运行 ID 命名的历史记录，不得抹除失败历史。
- 先检查官方三分类最新公告日与两个公开站点。如果确实无新公告、两站日期与完整收录数一致且没有待同步内容，可结束为 `no_new`，无需读取写入令牌。这表示“核验后无需更新”，不是“已发布新日报”，也不证明写入权限可用。
- `success` 只用于实际 V2 发布及核对完成；`no_new` 与 `success` 均须记录 `announcementDate`、整数 `expectedCount` / `publishedCount`，以及实际核验后才置为 true 的 `officialVerified`、`sitesVerified`、`pagesVerified`。实际发布还须 `ingestVerified: true`。
- 如有新公告，沿用下述鉴权流程。用户授权不替代应用的权限审批；审批拒绝后立即记录 `blocked`，不得改用其他凭据、命令包装、代理或运行方式规避拒绝。需要用户在应用中批准受限的既有站点访问；不得自动扩大为全面访问。
- 异常终止导致结果缺失或停留 `running` 时，健康任务必须判为未完成，不能代写成功。

## 抓取

1. 读取 README、V2 校验结构、抓取/构建/发布脚本和 `.automation/site-url`。
2. 通过带鉴权的 `/api/ingest/state` 读取上次成功游标，从游标前 72 小时重叠抓取；失败时不得推进游标。
3. 运行 `scripts/prepare_daily_run.py --run-id <本次ID> --scheduled-for <本次计划时间> --out <本次目录>`。此命令从三个 `new` 页确认最新实际公告日，节假日可仍是前一个公告日，不以日历日期冒充公告。保存 `manifest.json`、`source.json`、`reusable-analyses.json` 及修订元数据；缺元数据时保留成功响应供同一运行恢复。
4. 最新公告采用三个日期一致的 `new` 页，不再强制另抓 catchup 作阻断性比较；历史采用 catchup。对已保存的同日官方清单存在差异时，将清单指纹及 ID 差异记录为待核查事项；不得仅凭历史差异自动删改已发布论文。
5. 14:30 必须使用新的 runId 重新读取清单，不能复用上午的核验标记。复用 `reusable-analyses.json` 中元数据及版本一致的分析；其余补做。已是摘要级的高优先级条目优先补读。`replacementIds` 及其版本变化用于修订检查，不能用 submittedDate 搜索替代；有 `revisions-pending.json` 或未完成历史窗口时保留原 sourceCursor。

## 分析

- 清单内每篇论文只生成一份报告；同一论文出现在多个目标板块时，论文卡合并，但各分类分别计数。
- 分析标题、作者、分类、评论和英文摘要；高优先级、重要修订或方法不清时补读引言、主结果、方法和结论。
- 全文通过 `scripts/arxiv_client.py --url https://arxiv.org/html/<ID>v<版本> --out <本地文件>` 取得，版本化全文跨时段复用。全文不可用或限流时，不阻塞已完整覆盖的摘要级日报；必须标为 abstract 并写明未核查正文的限制与 AI 披露来源边界。上午未完成的重点全文列为下午待补读项。
- 生成主题、进展类型、完成工作、技术、突破、限制、分析深度、100 分优先级和排序理由。
- 低于 50 分必须给出具体靠后理由，不得表述为论文质量结论。
- 只有元数据、作者评论或已检查正文明确披露 AI 参与时才标记 `explicit` 并保存简短证据；其余为 `no_disclosure_observed`，不得猜测。

## 原子发布与核对

1. 生成 ReportBatchV2；`sourceManifest` 必须包含三个分类的新稿和跨列表 ID，`expectedCount` 等于 ID 并集，非修订报告必须完整覆盖该并集。
2. 预期、抓取、分析或发布数量任一不一致时，不调用写入接口，不覆盖旧数据，不推进游标。
3. 通过 `scripts/build_complete_report.py` 组装批次，再用带共享写锁的 `scripts/publish_payload.py --endpoint report-v2` 发布。重试必须沿用原批次及 runId，不能重新生成时间戳。脚本会先读状态和报告；写入响应不确定时核验全部内容和更新时间，不能仅凭数量相等宣告成功。已存在更晚日报时禁止回放旧批次。
4. 成功后核对 `/api/reports` 的非修订条目数、expected、published、数据库 coverage，以及 `/api/volume` 的 DG/MG/GT 日统计。
5. 当前日报与镜像成功且不存在冷却后，才可补最近十个公告日中未完整核验的历史日期，每次最多一天。历史缺失不以当前日期游标掩盖。

## 静态镜像

V2 写入和上述核对全部成功后，运行 `scripts/publish_static_mirror.sh <Sites地址> <公告日> <本次ReportBatchV2文件>`；当前公告日优先直接使用刚通过校验的批次：

- 从 Sites 公开接口补齐最近十个完整公告日，并把两年趋势写入 Markdown/JSON 镜像。
- 仅向 `daily-content` 快进推送；无变化不提交，但必须用 `ensure_pages.py` 核验相同内容 SHA 与当前 main 生成器的 Pages 发布是否成功。推送成功而触发或部署失败时，重试同一 SHA；只有确已成功才跳过部署。
- 推送后用精确内容提交 SHA 触发 `Geometry Pages` 工作流。镜像生成、推送或触发失败时，本次任务必须失败并通知，但不得回滚已成功的 D1 写入或成功游标。
- 不得把写入令牌、Authorization、抓取缓存或完整写入载荷复制到内容分支。
- 若本机网络对公开 Sites 请求返回访问门禁错误，可仅在当前进程内使用 Sites 提供的只读绕过令牌重试；不得打印、提交或长期复制该令牌。

## 健康任务的交接

日报完成后，健康任务只读取本时段 manifest 和结果，不重复请求 arXiv：`scripts/verify_production.py --site <既有站点> --manifest <本时段manifest.json> --scheduled-for <本次计划时间> --daily-outcome <本时段结果.json>`。manifest、结果的 runId 与 scheduledFor 必须对应；缺失、失败、blocked、running 均不能以旧站点健康替代成功。公开报告 ID 并集、各分类数量、周汇总及两站页面仍须实测核对。手动审计才可使用 `--check-arxiv`。

只输出运行 ID、公告日、三个分类数量、expected/published 和脱敏错误摘要，不输出论文正文。
