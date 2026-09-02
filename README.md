# 几何前沿日报 · Geometry arXiv Brief

面向课题组的几何学 arXiv 阅读指南，收录 `math.DG`、`math.MG` 与 `math.GT`。站点提供滚动两年发文趋势、中文研究分析、AI 协作披露区分、阅读优先级与历史归档。

## 本地运行

```bash
npm install
npm run dev
```

`npm run db:generate` 生成 D1 迁移，`npm run build` 完成生产构建。写入接口需要 Sites 环境变量 `INGEST_TOKEN`，本地自动化将站点地址与令牌分别保存在被忽略的 `.automation/site-url` 与 `.automation/ingest-token`。

## 自动化流程

1. 从 `/api/ingest/state` 读取上次成功游标，并从游标前 72 小时开始重叠抓取。
2. `scripts/arxiv_fetch.py` 通过官方 arXiv API 获取三个分类的新稿与版本，分页请求至少间隔三秒并最多重试三次。
3. 自动化分析论文并生成版本化 `ReportBatchV1`；低优先级理由与明确 AI 协作证据由服务端强制校验。
4. `scripts/publish_payload.py` 原子发布整批报告；失败不会推进服务端成功游标。
5. `scripts/backfill_volume.py` 只处理 v1 元数据，按官方公告时刻与节假日生成滚动 24 个月趋势。

公开接口为 `/api/volume?range=3m|2y` 与 `/api/reports`；受保护写入接口为 `/api/ingest/v1`、`/api/ingest/volume-history`。
