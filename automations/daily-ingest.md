# Geometry arXiv Daily

这是工作日上海时间 14:00 的日报数据任务。成功时静默；抓取、分析、校验、写入或核对任一步失败时让任务失败以触发通知。读取令牌时不得打印文件内容、Authorization 或完整报告载荷。

## 抓取

1. 读取 README、V2 校验结构、抓取/构建/发布脚本和 `.automation/site-url`。
2. 通过带鉴权的 `/api/ingest/state` 读取上次成功游标，从游标前 72 小时重叠抓取；失败时不得推进游标。
3. 以 math.DG、math.MG、math.GT 的官方 `new/catchup` 页面为公告事件清单，分别记录 New submissions 与 Cross-lists；Replacements 不进入发文量。
4. 使用 `scripts/arxiv_fetch.py --manifest` 按清单 ID 并集从 Atom API 补齐元数据。相邻请求至少间隔三秒，临时错误最多重试三次。

## 分析

- 清单内每篇论文只生成一份报告；同一论文出现在多个目标板块时，论文卡合并，但各分类分别计数。
- 分析标题、作者、分类、评论和英文摘要；高优先级、重要修订或方法不清时补读引言、主结果、方法和结论。
- 生成主题、进展类型、完成工作、技术、突破、限制、分析深度、100 分优先级和排序理由。
- 低于 50 分必须给出具体靠后理由，不得表述为论文质量结论。
- 只有元数据、作者评论或已检查正文明确披露 AI 参与时才标记 `explicit` 并保存简短证据；其余为 `no_disclosure_observed`，不得猜测。

## 原子发布与核对

1. 生成 ReportBatchV2；`sourceManifest` 必须包含三个分类的新稿和跨列表 ID，`expectedCount` 等于 ID 并集，非修订报告必须完整覆盖该并集。
2. 预期、抓取、分析或发布数量任一不一致时，不调用写入接口，不覆盖旧数据，不推进游标。
3. 通过 `scripts/publish_payload.py --endpoint report-v2` 发布。
4. 成功后核对 `/api/reports` 的非修订条目数、expected、published、数据库 coverage，以及 `/api/volume` 的 DG/MG/GT 日统计。
5. 对最近十个公告日中尚未完整核验的日期，按同一 V2 流程每次至少补齐一天；近 90 天趋势优先使用官方 catchup 精确回溯。

## 静态镜像

V2 写入和上述核对全部成功后，运行 `scripts/publish_static_mirror.sh <Sites地址> <公告日> <本次ReportBatchV2文件>`；当前公告日优先直接使用刚通过校验的批次：

- 从 Sites 公开接口补齐最近十个完整公告日，并把两年趋势写入 Markdown/JSON 镜像。
- 仅向 `daily-content` 快进推送；无内容变化时不提交，也不重复触发 Pages。
- 推送后用精确内容提交 SHA 触发 `Geometry Pages` 工作流。镜像生成、推送或触发失败时，本次任务必须失败并通知，但不得回滚已成功的 D1 写入或成功游标。
- 不得把写入令牌、Authorization、抓取缓存或完整写入载荷复制到内容分支。
- 若本机网络对公开 Sites 请求返回访问门禁错误，可仅在当前进程内使用 Sites 提供的只读绕过令牌重试；不得打印、提交或长期复制该令牌。

只输出运行 ID、公告日、三个分类数量、expected/published 和脱敏错误摘要，不输出论文正文。
