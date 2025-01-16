import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const APP_ID = process.env.VITE_APP_ID;
const APP_SECRET = process.env.VITE_APP_SECRET;
const BASE_ID = process.env.VITE_BASE_ID;
const TABLE_ID = process.env.VITE_TABLE_ID;

console.log('环境变量检查:');
console.log('APP_ID:', APP_ID);
console.log('APP_SECRET:', APP_SECRET?.slice(0, 4) + '****');
console.log('BASE_ID:', BASE_ID);
console.log('TABLE_ID:', TABLE_ID);

const instance = axios.create({
  baseURL: 'https://open.feishu.cn/open-apis',
  timeout: 10000
});

// 获取访问令牌
async function getTenantAccessToken() {
  try {
    console.log('正在获取访问令牌...');
    const response = await instance.post('/auth/v3/tenant_access_token/internal', {
      app_id: APP_ID,
      app_secret: APP_SECRET
    });
    console.log('访问令牌响应:', JSON.stringify(response.data, null, 2));
    return response.data.tenant_access_token;
  } catch (error) {
    console.error('获取访问令牌失败:', error.response?.data || error.message);
    throw error;
  }
}

// 获取所有记录
async function getAllRecords(token) {
  try {
    console.log('正在获取记录...');
    const response = await instance.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page_size: 100
      }
    });
    console.log('获取记录响应:', JSON.stringify(response.data, null, 2));
    if (response.data.code === 0 && response.data.data && response.data.data.items) {
      const items = response.data.data.items;
      items.sort((a, b) => {
        const dateA = new Date(a.fields['开播日期'] * 1000);
        const dateB = new Date(b.fields['开播日期'] * 1000);
        return dateB - dateA;  // 降序排序
      });
      return items;
    } else {
      throw new Error('获取记录失败: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('获取记录失败:', error.response?.data || error.message);
    throw error;
  }
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function main() {
  try {
    console.log('开始获取数据...');
    console.log('当前时间:', new Date().toISOString());
    
    // 获取访问令牌
    const token = await getTenantAccessToken();
    console.log('成功获取访问令牌');
    
    // 获取所有记录
    const records = await getAllRecords(token);
    console.log(`成功获取 ${records.length} 条记录`);
    
    // 获取最近7天的日期范围
    const now = new Date();
    const dates = Array.from({length: 7}, (_, i) => {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      return formatDate(date);
    });
    
    console.log('需要获取的日期:', dates);
    
    // 处理每天的数据
    const dailyData = dates.map(date => {
      const dayData = records.find(r => {
        const recordDate = new Date(r.fields['开播日期'] * 1000);
        return formatDate(recordDate) === date;
      }) || { fields: {} };
      
      return {
        date,
        data: {
          viewers: parseInt(dayData.fields['直播间观看人数'] || 0),
          interactions: parseInt(dayData.fields['评论次数'] || 0),
          duration: dayData.fields['开播时长'] || '0小时0分钟',
          viewers_count: parseInt(dayData.fields['直播间观看人次'] || 0),
          max_online: parseInt(dayData.fields['最高在线人数'] || 0),
          avg_online: parseInt(dayData.fields['平均在线人数'] || 0),
          comments: parseInt(dayData.fields['评论次数'] || 0),
          new_followers: parseInt(dayData.fields['新增粉丝数'] || 0),
          sales_amount: parseFloat(dayData.fields['直播间成交金额'] || 0),
          sales_count: parseInt(dayData.fields['直播间成交件数'] || 0),
          sales_users: parseInt(dayData.fields['直播间成交人数'] || 0)
        }
      };
    });
    
    // 生成统计数据
    const stats = {
      lastUpdate: now.toISOString(),
      today: dailyData[0].data,
      yesterday: dailyData[1].data,
      week: {
        viewers: dailyData.reduce((sum, day) => sum + day.data.viewers, 0),
        interactions: dailyData.reduce((sum, day) => sum + day.data.interactions, 0),
        duration: dailyData.reduce((sum, day) => {
          const hours = parseInt(day.data.duration?.split('小时')[0] || 0);
          return sum + hours;
        }, 0) + '小时',
        total_sales: dailyData.reduce((sum, day) => sum + day.data.sales_amount, 0),
        total_orders: dailyData.reduce((sum, day) => sum + day.data.sales_count, 0),
        total_customers: dailyData.reduce((sum, day) => sum + day.data.sales_users, 0),
        total_followers: dailyData.reduce((sum, day) => sum + day.data.new_followers, 0)
      }
    };
    
    // 保存原始数据
    const rawDataPath = path.join(__dirname, '..', 'data', 'raw.json');
    fs.writeFileSync(rawDataPath, JSON.stringify(dailyData, null, 2));
    console.log('原始数据已保存到:', rawDataPath);
    
    // 保存统计数据
    const statsDataPath = path.join(__dirname, '..', 'data', 'stats.json');
    fs.writeFileSync(statsDataPath, JSON.stringify(stats, null, 2));
    console.log('统计数据已保存到:', statsDataPath);
    
    console.log('数据处理完成。');
    console.log('7天数据概览:', dailyData.map(d => `${d.date}: ${d.data.viewers}人观看`));
    console.log('统计数据:', JSON.stringify(stats, null, 2));
    
  } catch (error) {
    console.error('执行失败:', error);
    console.error('错误堆栈:', error.stack);
    process.exit(1);
  }
}

main(); 