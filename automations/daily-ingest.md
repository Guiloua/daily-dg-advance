# Geometry arXiv Daily

工作日上海时间 10:30、14:30 运行。以“基础信息先发布、随后补齐”为默认流程。首次部分发布简报、相同缺口静默、补齐后通知一次；真实发布失败和权限阻塞通知。通知以 `progressive_outcome.py` 的 `notify` 为准。

## 运行顺序

1. 等待已有日报结束。建立唯一 runId、带时区 scheduledFor 和本次目录，所有子命令共享 ARXIV_RUN_ID、ARXIV_SCHEDULED_FOR，以及保存项目的绝对 ARXIV_CACHE_DIR。
2. 运行 `scripts/progressive_daily.py --run-id <ID> --scheduled-for <ISO> --out <目录> --publish`。每取得一个分类即发布有日期证据的条目。三分类日期不同则分别发布；未知总数为 null，缺失资料不填造版本、时间或零计数。
3. 读取本次 listing 文件中的标题、作者、摘要、评论，按原有研究标准生成按 ID 索引的中文分析。保存准确的分析依据：英文摘要和已明确的版本。优先补读高优先级主结果；正文不可用保留摘要级分析。AI explicit 必须有已读来源的明确证据；尚未检查的条目保持未知。
4. 用 `--from-run <当前运行ID> --analyses <JSON> --analysis-source <来源JSON> --publish` 重用本次清单并增量发布分析；不重新请求清单。来源 JSON 可为带 papers 的元数据文件或按 ID 索引的 listing-reading.json。分析字段包括 topic、progressType、workSummary、techniques、breakthrough、limitations、analysisDepth、priorityScore、priorityReason；低于 50 分补 lowPriorityReason。
5. 无冷却时，可在同一运行调用上述命令并加 `--enrich` 补齐 Atom 资料。元数据改变使旧解读失效的条目重新分析；同源全文分析不被摘要分析覆盖。
6. 检查运行目录的 progress、pending 和 publications，以及 daily-outcomes 回执。状态 published_partial 表示两站已核验发布但仍待补齐；success 表示基础资料和摘要解读完整。镜像失败只重试 `scripts/progressive_mirror.py`，随后 `scripts/progressive_outcome.py --run <目录>` 核验。

## 缓存、限流与恢复

公开清单读取不依赖 ingest 访问权限，不以受保护状态接口预检作为抓取前置条件。已知写入受阻且未获得恢复证据时，先运行不带 `--publish` 的 `progressive_daily.py`，保存本时段三个分类与 candidate；只做本地整理，不尝试其他凭据或访问路径。此阶段不生成发布成功回执，也不覆盖上午、下午的原失败历史。阻塞记录中明确保存本地运行目录、来源 runId、日期及待发布数量。

正常渐进流程的发布子进程首次失败后，本轮不再调用发布或结果核验来冒充成功；仍可继续由统一客户端读取其余公开分类，保存完整 candidate 和 progress，最终返回失败。arXiv 自身出现限流时仍遵守共享冷却，不因发布失败增加请求或历史回溯。

恢复原接口访问权限后，使用原来源 `--from-run <来源ID>` 和保存的分析继续发布，不重新抓取该来源；新时段的清单核对必须使用新 runId。先处理当前公告，再检查已保存但未发布的旧日期，保留各自真实观察时间。镜像只使用 Sites 已确认的快照，不能把本地待发布 candidate 当成正式日报推送。

全部 arXiv 读取使用 arxiv_client.py：跨进程共享锁、4 秒间隔、Retry-After、每请求最多三次及每时段 20 分钟等待预算。Deferred 后不换 runId、主机或代理继续请求。仍可用本地缓存执行发布、分析与镜像任务。

下个时段使用新 runId 核验当时清单；保留旧失败和发布记录。需要在核验前发布已知历史信息时，用 --from-run 指定其真实来源运行，保留旧观察时间，不冒充本时段核验。跨日信息按原公告日发布，首页仍选最新公告日。

V3 发布使用 publicationId、内容哈希、基础修订号和数据库原子检查；冲突重读并合并，超时核对发布回执。所有写操作使用 daily-write.flock。缺失字段不清空已有信息；较旧来源不能覆盖较新内容。清单差异删除须人工核查，默认保留已发布条目并记录差异。

渐进发布不推进旧 sourceCursor。资料、修订及历史窗口未完成时始终保留旧游标；后续完整历史核验仍通过原完整批次流程推进。当前资料与镜像优先于历史回溯。

## 两站与结果

实时接口为 `/api/reports/v2`，写入为 `/api/ingest/v3`，保护方式沿用已有站点令牌。仅向 `.automation/site-url` 对应的固定生产站点发送凭据。权限审查拒绝后记录 blocked，不尝试其他凭据或访问方式。

Sites 成功写入后，mirror-outbox 保存最新日期快照。镜像保持最近十个完整公告日和所有待补齐日，使用同一已确认快照；连续发布可以合并待同步项。镜像推送与 Pages 部署失败不回滚 Sites，必须保留可重试内容。

只有完整核验的分类清单可以产生精确日统计；有已知缺口的周不进入完整周图表。站点服务健康与资料完整度分开判断。运行报告只输出日期、数量、状态与脱敏错误，不输出凭据或整篇载荷。
