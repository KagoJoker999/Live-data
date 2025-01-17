import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 环境变量
const APP_ID = process.env.VITE_APP_ID;
const APP_SECRET = process.env.VITE_APP_SECRET;
const BASE_ID = process.env.VITE_BASE_ID;
const TABLE_ID = process.env.VITE_TABLE_ID;

// 创建 axios 实例
const api = axios.create({
  baseURL: 'https://open.feishu.cn/open-apis',
  timeout: 30000,
  maxRedirects: 5,
});

// 重试函数
async function withRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    console.log(`请求失败，${retries}秒后重试...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
}

// 获取访问令牌
async function getTenantAccessToken() {
  try {
    const response = await withRetry(() => api.post('/auth/v3/tenant_access_token/internal', {
      app_id: APP_ID,
      app_secret: APP_SECRET
    }));
    return response.data.tenant_access_token;
  } catch (error) {
    console.error('获取访问令牌失败:', error);
    throw error;
  }
}

// 获取所有记录
async function getAllRecords(token) {
  try {
    const response = await withRetry(() => api.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page_size: 100,
        sort: JSON.stringify([{ field: '日期', order: 'desc' }])
      }
    }));

    // 打印完整的响应数据以便调试
    console.log('API响应数据:', JSON.stringify(response.data, null, 2));

    // 检查响应数据结构
    if (!response.data) {
      throw new Error('API响应中没有data字段');
    }
    if (!response.data.data) {
      throw new Error('API响应中没有data.data字段');
    }
    if (!Array.isArray(response.data.data.items)) {
      throw new Error('API响应中的items不是数组');
    }

    return response.data.data.items;
  } catch (error) {
    if (error.response) {
      // 请求已发出，但服务器响应状态码不在 2xx 范围内
      console.error('API错误响应:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      });
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('未收到API响应:', error.request);
    } else {
      // 发送请求时出现问题
      console.error('请求错误:', error.message);
    }
    throw error;
  }
}

// 格式化日期
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// 获取最近7天的日期
function getLast7Days() {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(formatDate(date));
  }
  return dates;
}

// 主函数
async function main() {
  try {
    // 检查环境变量
    if (!APP_ID || !APP_SECRET || !BASE_ID || !TABLE_ID) {
      throw new Error('缺少必要的环境变量');
    }
    console.log('环境变量检查通过');
    console.log('BASE_ID:', BASE_ID);
    console.log('TABLE_ID:', TABLE_ID);

    // 确保数据目录存在
    const dataDir = path.resolve(__dirname, '../public/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    console.log('数据目录创建成功:', dataDir);

    // 获取访问令牌
    console.log('正在获取访问令牌...');
    const token = await getTenantAccessToken();
    console.log('成功获取访问令牌:', token.substring(0, 10) + '...');

    // 获取记录
    console.log('正在获取数据记录...');
    const records = await getAllRecords(token);
    console.log(`成功获取 ${records.length} 条记录`);

    // 处理数据
    const dates = getLast7Days();
    const processedData = {
      current: {},
      previous: {},
      today: {},
      yesterday: {},
      week: {
        '直播间观看人数': 0,
        '直播间观看人次': 0,
        '最高在线人数': 0,
        '平均在线人数': 0,
        '评论次数': 0,
        '新增粉丝数': 0,
        '直播间成交金额': 0,
        '直播间成交件数': 0,
        '直播间成交人数': 0
      },
      logs: [],  // 存储日志
      reports: [], // 存储复盘AI报告
      lastUpdate: new Date().toISOString()
    };

    // 按日期分组
    const groupedData = {};
    records.forEach(record => {
      const date = record.fields['日期'];
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      groupedData[date].push(record.fields);

      // 收集日志和报告
      if (record.fields['日志']) {
        processedData.logs.push({
          date: date,
          content: record.fields['日志']
        });
      }
      if (record.fields['复盘AI报告']) {
        processedData.reports.push({
          date: date,
          content: record.fields['复盘AI报告']
        });
      }
    });

    // 处理每天的数据
    dates.forEach((date, index) => {
      const dayData = groupedData[date] || [];
      const stats = {
        '直播间观看人数': 0,
        '直播间观看人次': 0,
        '最高在线人数': 0,
        '平均在线人数': 0,
        '评论次数': 0,
        '新增粉丝数': 0,
        '直播间成交金额': 0,
        '直播间成交件数': 0,
        '直播间成交人数': 0
      };

      // 合计当天数据
      dayData.forEach(record => {
        Object.keys(stats).forEach(key => {
          stats[key] += Number(record[key] || 0);
        });
      });

      // 更新周数据
      Object.keys(stats).forEach(key => {
        processedData.week[key] += stats[key];
      });

      // 更新当天和昨天数据
      if (index === 0) {
        processedData.today = stats;
      } else if (index === 1) {
        processedData.yesterday = stats;
      }

      // 更新本场和上一场数据
      if (dayData.length > 0) {
        if (!processedData.current.date) {
          processedData.current = { ...dayData[0], date };
        } else if (!processedData.previous.date) {
          processedData.previous = { ...dayData[0], date };
        }
      }
    });

    // 按日期排序日志和报告
    processedData.logs.sort((a, b) => b.date.localeCompare(a.date));
    processedData.reports.sort((a, b) => b.date.localeCompare(a.date));

    // 保存数据
    const dataPath = path.join(dataDir, 'live-data.json');
    fs.writeFileSync(dataPath, JSON.stringify(processedData, null, 2));
    console.log('数据已保存到:', dataPath);

  } catch (error) {
    console.error('处理数据失败:', error);
    if (error.response) {
      console.error('API错误详情:', error.response.data);
    }
    process.exit(1);
  }
}

// 运行主函数
main(); 