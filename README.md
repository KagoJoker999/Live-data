# 飞书数据展示网站

这是一个基于iOS风格设计的移动端网站，用于展示从飞书多维表格中获取的数据。

## 功能特点

1. 首页展示
   - 实时显示飞书表格中最新一条数据的所有字段内容
   - iOS风格的界面设计
   - 自适应移动端显示

2. 历史数据页
   - 展示近7条历史数据记录
   - 卡片式布局，纵向排列
   - 点击卡片可查看详细信息
   - 支持返回操作

## 技术栈

- 前端：Vue.js 3 + Vite
- UI框架：Vant UI (iOS风格)
- 后端API：飞书开放API
- 部署：GitHub Pages

## 项目结构

```
project/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── App.vue
│   ├── main.js
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── HistoryView.vue
│   │   └── DetailView.vue
│   ├── components/
│   │   ├── DataCard.vue
│   │   └── NavBar.vue
│   ├── api/
│   │   └── feishu.js
│   └── utils/
│       └── format.js
└── public/
    └── favicon.ico
```

## 开发环境设置

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 构建生产版本
```bash
npm run build
```

## 部署说明

项目使用GitHub Actions自动部署到GitHub Pages。每次推送到main分支时会自动触发部署流程。

## 环境变量配置

在项目根目录创建`.env`文件，添加以下配置：

```
VITE_APP_ID=cli_a7f5f4dd28ff5013
VITE_APP_SECRET=HmhpNW5GenirT6oFIOe3DdjgcJS50Dwb
VITE_BASE_ID=HVnlblCt9aXkI7spOv8cK5wenEe
VITE_TABLE_ID=tbl8vDt0B9mYLpRH
```

## 注意事项

1. 确保飞书API配置正确
2. 部署时需要设置正确的GitHub Pages配置
3. 移动端访问时建议使用iOS 18及以上版本获得最佳体验 