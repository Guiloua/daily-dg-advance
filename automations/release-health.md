# Geometry Site Release & Health

这是工作日上海时间 10:30、14:30 的生产发布与健康检查任务。成功静默，失败通知。与日报共用本时段的官方清单，不再重复抓取 arXiv。不得打印凭据、Authorization、完整 JSON 载荷或论文正文。

## 0. 日报任务结果门禁

与日报同时启动时，用任务等待机制等待当次日报结束。任务状态 `completed` 只表示结束，绝不代表执行成功；必须读取实际结果和 `.automation/daily-outcomes/YYYY-MM-DD.json`（上海计划日期）。结果缺失、过期、`running`、`blocked`、`failed` 均不得报告总任务成功。即使旧日报仍与官方一致，也只能报告“站点健康，但日报任务受阻/未完成”。不得代替日报写成功记录。`no_new` 明确写作“无新公告，已核验”，不得写成“日报发布成功”。

旧格式读取日报本时段 `manifest.json`；新格式读取运行目录的 `progress.json` 与逐日发布快照。其 runId 必须与结果一致，scheduledFor 必须是当前计划时刻（上午/下午不互换，手动运行不替代定时运行）。限流但两站实际核验发布成功时接受 schemaVersion 2 的 published_partial，单独报告待补齐；按日报回执 notify 决定通知，相同缺口不重复提醒。服务故障与镜像失败仍为失败。健康任务不重抓 arXiv。

## 1. 确定候选版本

1. 在项目中获取 `origin/main`，记录其完整 40 位 SHA；不要使用未提交的本地文件。
2. 查询该 SHA 的 GitHub Actions `CI / gate` 结果。
3. 读取当前 Sites 生产版本保存的 SHA。
4. 调用 `scripts/release_gate.py`：同一 SHA 则跳过发布；CI 非成功则禁止发布；只有新的绿色 SHA 才继续。

## 2. 构建与发布

1. 为候选 SHA 创建临时、分离的干净 worktree。
2. 在其中运行 `npm ci` 和 `npm run ci`。任何失败都停止，不保存或部署版本。
3. 按 `sites:sites-building` 与 `sites:sites-hosting` 技能处理现有 Sites 项目，保持 `.openai/hosting.json` 中的项目和 D1 绑定不变。
4. 获取短期 Sites 源码凭据，将候选提交以原 SHA 推送到 Sites 源码远端；不得把凭据写入 URL或 Git 配置。
5. 打包已经验证的构建，保存 Sites 版本，并确认版本中的 `commit_sha` 等于 GitHub SHA。
6. 站点是公开的。若 Sites 流程要求发布确认，暂停并请求“发布到现有公开访问”；不得绕过审批。
7. 发布成功后创建不可变标签 `sites-v{Sites版本号}` 和 GitHub `production` Deployment 成功记录，包含生产 URL、完整 SHA 和 Sites 版本号。

## 3. 生产检查

1. 从 `.automation/site-url` 读取站点地址，运行 `python3 scripts/verify_production.py --site <地址> --manifest <本时段manifest.json> --scheduled-for <本次计划时间> --daily-outcome .automation/daily-outcomes/YYYY-MM-DD.json`。schemaVersion 2 回执省略 `--manifest`，由对应发布快照与镜像记录核验。缺失证据时失败关闭，不能退回独立抓取。单独排查站点时可不传结果，但输出 `dailyRunStatus: not_checked` 不得解释为日报成功。
2. 新格式回执使用 `/api/reports/v2` 核对首页的已确认、已发布、已解读数量和待补齐状态，并核对 Pages 的同日内容哈希。expectedCount 为 null 时不得要求 X/X。旧格式仍使用原完整批次校验。
3. 若新代码造成首页或核心接口不可用，重新部署本次发布前保存的 Sites 版本，记录 GitHub rollback Deployment，并让任务失败。
4. 若只是公告日、收录量或 arXiv 来源异常，不回滚代码；保留日报游标并让任务失败。
5. 清理临时 worktree。没有新版本时仍执行全部生产检查。
