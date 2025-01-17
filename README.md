# 直播数据统计

这是一个用于展示直播数据的静态网站，数据来源于飞书多维表格。网站每30分钟自动从飞书获取最新数据并更新展示。

## 功能特点

- 实时数据展示：显示本场和上一场直播的详细数据
- 历史数据查询：支持查看今日、昨日和本周的数据统计
- 自动更新：每30分钟自动从飞书获取最新数据
- 响应式设计：适配各种屏幕尺寸的设备

## 数据指标

展示的数据指标包括：

- 直播间观看人数
- 直播间观看人次
- 最高在线人数
- 平均在线人数
- 评论次数
- 新增粉丝数
- 直播间成交金额
- 直播间成交件数
- 直播间成交人数

## 技术栈

- 前端：原生 HTML + CSS + JavaScript
- 构建工具：Vite
- 自动化部署：GitHub Actions
- 数据源：飞书多维表格 API

## 本地开发

1. 克隆项目：

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. 安装依赖：

```bash
npm install
```

3. 创建 `.env` 文件并设置以下环境变量：

```
VITE_APP_ID=your_feishu_app_id
VITE_APP_SECRET=your_feishu_app_secret
VITE_BASE_ID=your_feishu_base_id
VITE_TABLE_ID=your_feishu_table_id
```

4. 启动开发服务器：

```bash
npm run dev
```

5. 构建项目：

```bash
npm run build
```

## 部署

项目使用 GitHub Actions 自动部署到 GitHub Pages。每次推送到 main 分支或每30分钟自动运行部署流程：

1. 从飞书获取最新数据
2. 构建静态网站
3. 部署到 GitHub Pages

## 环境变量

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中设置以下 secrets：

- `VITE_APP_ID`: 飞书应用的 App ID
- `VITE_APP_SECRET`: 飞书应用的 App Secret
- `VITE_BASE_ID`: 飞书多维表格的 Base ID
- `VITE_TABLE_ID`: 飞书多维表格的 Table ID

## 贡献

欢迎提交 Issue 和 Pull Request。

## 许可证

MIT 