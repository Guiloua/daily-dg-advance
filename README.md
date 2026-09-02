# 几何前沿日报 · Geometry arXiv Brief

面向课题组的几何学 arXiv 阅读指南，完整收录 `math.DG`、`math.MG` 与 `math.GT` 每个实际公告日的 New submissions 与 Cross-lists。站点提供近 26／104 个完整周的分类趋势、中文研究分析、AI 协作披露区分、阅读优先级与历史归档。

## 本地运行

```bash
npm install
npm run dev
```

`npm run db:generate` 生成 D1 迁移，`npm run build` 完成生产构建。写入接口需要 Sites 环境变量 `INGEST_TOKEN`，本地自动化将站点地址与令牌分别保存在被忽略的 `.automation/site-url` 与 `.automation/ingest-token`。

## 自动化流程

1. 从 `/api/ingest/state` 读取上次成功游标，并从游标前 72 小时开始重叠抓取。
2. `scripts/arxiv_listing.py` 读取三个分类官方 `new/catchup` 页，将 New submissions 与 Cross-lists 作为当日事件清单；Replacements 不进入发文量。
3. `scripts/arxiv_fetch.py --manifest` 按清单中的精确 arXiv ID 集合从 Atom API 补齐元数据，请求至少间隔三秒并最多重试三次。
4. 自动化分析清单内全部论文并生成 `ReportBatchV2`。服务端要求分析报告与清单并集完全一致，同时校验三个分类计数、低优先级理由与明确 AI 协作证据。
5. `scripts/publish_payload.py --endpoint report-v2` 原子发布完整批次；缺少任何论文时整批拒绝，成功游标不会推进。
6. `scripts/backfill_volume.py` 按官方公告事件重建滚动 24 个月趋势；网页只展示 DG、MG、GT 三条分类线。

公开接口为 `/api/volume?range=6m|2y` 与 `/api/reports`。趋势接口把公告日数据按自然周汇总，只返回截至周五的完整周；默认范围为最近 26 周。受保护写入接口为 `/api/ingest/v2` 与 `/api/ingest/volume-history`；`/api/ingest/v1` 仅为兼容旧发布工具而保留。
