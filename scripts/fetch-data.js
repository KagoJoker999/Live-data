import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 环境变量
const APP_ID = process.env.VITE_APP_ID;
const APP_SECRET = process.env.VITE_APP_SECRET;
const BASE_ID = process.env.VITE_BASE_ID;
const TABLE_ID = process.env.VITE_TABLE_ID;

// 创建axios实例
const instance = axios.create({
  baseURL: 'https://open.feishu.cn/open-apis',
  timeout: 30000,
  maxRedirects: 5,
});

// 重试函数
async function withRetry(fn, maxRetries = 3) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error.message);
      if (i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // 指数退避
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// 获取tenant_access_token
async function getTenantAccessToken() {
  const response = await withRetry(() => instance.post('/auth/v3/tenant_access_token/internal', {
    app_id: APP_ID,
    app_secret: APP_SECRET
  }));
  return response.data.tenant_access_token;
}

// 获取所有记录
async function getAllRecords(token) {
  const response = await withRetry(() => instance.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }));
  return response.data.data.items;
}

// 主函数
async function main() {
  try {
    console.log('开始获取数据...');

    // 获取token
    const token = await getTenantAccessToken();
    console.log('获取token成功');

    // 获取记录
    const records = await getAllRecords(token);
    console.log(`获取到 ${records.length} 条记录`);

    // 处理数据
    const processedRecords = records.map(record => {
      const fields = record.fields;
      return {
        '开播日期': fields['日期'] || '',
        '直播间观看人数': Number(fields['直播间观看人数'] || 0),
        '直播间观看人次': Number(fields['直播间观看人次'] || 0),
        '最高在线人数': Number(fields['最高在线人数'] || 0),
        '平均在线人数': Number(fields['平均在线人数'] || 0),
        '评论次数': Number(fields['评论次数'] || 0),
        '新增粉丝数': Number(fields['新增粉丝数'] || 0),
        '直播间成交金额': Number(fields['直播间成交金额'] || 0),
        '直播间成交件数': Number(fields['直播间成交件数'] || 0),
        '直播间成交人数': Number(fields['直播间成交人数'] || 0),
        '日志': fields['日志'] || '',
        '复盘AI报告': fields['复盘AI报告'] || ''
      };
    });

    // 按日期排序
    processedRecords.sort((a, b) => b['开播日期'].localeCompare(a['开播日期']));

    // 构建数据结构
    const processedData = {
      current: processedRecords[0] || null,  // 最新一场直播
      previous: processedRecords[1] || null,  // 上一场直播
      history: processedRecords.slice(0, 7),  // 最近7场直播
      lastUpdate: new Date().toISOString()
    };

    // 确保目录存在
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const dataDir = path.join(__dirname, '..', 'public', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 保存数据
    const outputPath = path.join(dataDir, 'live-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2));
    console.log('数据已保存到:', outputPath);

  } catch (error) {
    console.error('获取数据失败:', error);
    process.exit(1);
  }
}

// 运行主函数
main(); 