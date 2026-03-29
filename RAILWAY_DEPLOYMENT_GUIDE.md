# Railway 部署详细指南 (Railway Deployment Guide)

本指南将指导您如何将「根基八字，为卿为相」应用部署到 **Railway.app**，并确保其在国内（及企业微信）稳定运行。

---

### 第一步：准备工作 (Preparation)

1.  **导出代码到 GitHub**：
    *   点击本窗口右上角的 **齿轮图标 (Settings)**。
    *   选择 **“Export to GitHub”**，将代码推送到您的 GitHub 仓库。
2.  **注册 Railway**：
    *   访问 [railway.app](https://railway.app/)，点击 **“Login”** 并选择 **“GitHub”** 登录。

---

### 第二步：创建 Railway 项目 (Create Project)

1.  点击页面右上角的 **“+ New Project”**。
2.  选择 **“Deploy from GitHub repo”**。
3.  在列表中找到您刚才导出的仓库名称，点击它。
4.  点击 **“Deploy Now”**。

---

### 第三步：配置环境变量 (Environment Variables) —— **关键步骤**

1.  在 Railway 项目面板中，点击您的服务（Service）。
2.  点击顶部的 **“Variables”** 选项卡。
3.  点击 **“+ New Variable”**，依次添加以下所有变量（请从您的飞书后台获取真实值）：

| 变量名 (Key) | 说明 (Description) |
| :--- | :--- |
| `FEISHU_APP_ID` | 飞书应用的 App ID |
| `FEISHU_APP_SECRET` | 飞书应用的 App Secret |
| `FEISHU_BASE_ID` | 飞书多维表格的 Base ID (app 开头) |
| `FEISHU_TABLE_ORACLE` | 占卜数据表的 Table ID (tbl 开头) |
| `FEISHU_TABLE_BAZI` | 八字数据表的 Table ID |
| `FEISHU_TABLE_MARRIAGE` | 合婚数据表的 Table ID |
| `FEISHU_TABLE_PLANNING` | 人生规划数据表的 Table ID |
| `FEISHU_WEBHOOK_URL` | 飞书群机器人的 Webhook 地址 (用于实时通知) |
| `NODE_ENV` | 设置为 `production` |

---

### 第四步：绑定自定义域名 (Custom Domain) —— **国内访问必做**

由于 Railway 默认的 `.up.railway.app` 域名在国内被屏蔽，您必须绑定自己的域名。

1.  在 Railway 服务面板中，点击 **“Settings”** 选项卡。
2.  找到 **“Networking”** 部分，点击 **“Custom Domain”**。
3.  输入您的域名（例如 `bz49.top` 或 `bz49.vercel.app` 对应的自定义域名）。
4.  **配置 DNS**：按照 Railway 给出的提示，在您的域名解析商（如阿里云、腾讯云、Cloudflare）处添加一条 **CNAME 记录**。
5.  等待解析生效（通常 10-30 分钟），Railway 会自动为您配置 HTTPS。

---

### 第五步：更新飞书回调地址 (Update Feishu Callback)

部署完成后，您必须更新飞书后台的配置，否则无法接收数据。

1.  登录 [飞书开放平台](https://open.feishu.cn/)。
2.  进入您的应用 -> **安全设置** -> **重定向 URL**。
3.  添加您的新域名回调地址：`https://您的自定义域名/auth/callback`。
4.  进入 **事件订阅**，如果配置了请求网址，也请同步更新。

---

### 第六步：企业微信挂接 (WeCom Integration)

1.  登录 **企业微信管理后台**。
2.  进入 **应用管理** -> **自建应用**。
3.  在 **“应用主页”** 处，填入您的自定义域名地址（例如 `https://bz49.top`）。
4.  在 **“网页授权及 JS-SDK”** 处，将您的域名添加为可信域名。

---

### 常见问题排查 (Troubleshooting)

*   **部署失败**：检查 Railway 的 **“Deployments” -> “View Logs”**。如果提示 `PORT` 相关错误，请放心，代码已更新为自动识别 Railway 的端口。
*   **数据未同步**：检查环境变量是否填写正确，特别是 `FEISHU_BASE_ID` 和 `FEISHU_TABLE_XXX`。
*   **国内无法打开**：请确认您使用的是**自定义域名**，而不是 Railway 默认域名。

祝您的「根基八字」应用运行顺利！
