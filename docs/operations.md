# 生产运维手册

## 版本来源

- GitHub `Guiloua/daily-dg-advance` 是唯一源码仓库。
- 生产候选必须是 `origin/main` 的精确提交，且 GitHub 检查 `CI / gate` 为成功。
- 每个 Sites 版本保存完整 Git SHA 和归档内容哈希；成功上线后创建 `sites-v{版本号}` 标签及 GitHub `production` Deployment 记录。
- GitHub Actions 不保存 `INGEST_TOKEN` 或 Sites 发布凭据。Sites 源码写入凭据只在发布时临时获取，不写入远端 URL、Git 配置或日志。

## 发布门禁

1. 获取 `origin/main`，确认完整 SHA 与 GitHub CI 状态。
2. 用 `scripts/release_gate.py` 比对 GitHub SHA、当前生产 SHA 和 CI 结果。
3. 仅当结果为 `deploy` 时，在临时干净 worktree 中运行 `npm ci` 与 `npm run ci`。
4. 将同一提交推送到 Sites 源码远端，打包该构建并保存不可变 Sites 版本。
5. 发布前记录当前版本作为回滚目标；发布后核对 Sites 记录中的 SHA。
6. 执行 `scripts/verify_production.py`。代码可用性冒烟失败时立即恢复发布前版本；数据新鲜度失败只报警，不回滚代码。

当前 Sites 为公开访问。公开版本切换必须遵循 Sites 的发布审批流程；自动任务遇到需要确认的公开发布时应暂停并请求批准，不得绕过审批。

## 健康检查

工作日上海时间 14:30 执行：

- 首页返回成功响应。
- `/api/health` 为 `ok`。
- `/api/reports` 中非修订论文数量与 expected、published 和数据库实际数量一致。
- `/api/volume` 最近完整周的 DG/MG/GT 等于同一周逐日数据求和。
- 最近公告日和三个分类的 New submissions + Cross-lists 数量与 arXiv 官方列表一致。
- 匿名读取 `/api/ingest/state` 或写入 `/api/ingest/v2` 均返回 401。

命令只输出日期和数量摘要，不输出论文正文、鉴权头或完整写入载荷。任何失败都让自动任务失败并触发通知；成功保持静默。

## 回滚

1. 列出 Sites 版本，选择当前生产版本之前最近一次已验证版本。
2. 核对该版本对应的 Git SHA、`sites-v{版本号}` 标签和归档内容哈希。
3. 直接重新部署保存的版本，不重新构建，也不逆向修改 D1。
4. 运行核心接口冒烟检查并创建新的 GitHub `production` Deployment 记录，说明回滚目标与原因。

迁移默认只允许新增表、字段和索引。`npm run db:check` 会拒绝删除、截断、重命名及列重写等破坏性 SQL；确需此类变化时必须先制定独立迁移与回滚方案。
