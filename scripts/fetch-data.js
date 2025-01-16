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
        page_size: 100,
        sort: JSON.stringify([{"field_name": "开播日期", "order": "desc"}])
      }
    });
    console.log('获取记录响应:', JSON.stringify(response.data, null, 2));
    if (response.data.code === 0 && response.data.data && response.data.data.items) {
      return response.data.data.items;
    } else {
      throw new Error('获取记录失败: ' + JSON.stringify(response.data));
    }
  } catch (error) {
    console.error('获取记录失败:', error.response?.data || error.message);
    throw error;
  }
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
    
    if (records.length > 0) {
      console.log('第一条记录示例:', JSON.stringify(records[0], null, 2));
    }
    
    // 保存原始数据
    const rawDataPath = path.join(__dirname, '..', 'data', 'raw.json');
    fs.writeFileSync(rawDataPath, JSON.stringify(records, null, 2));
    console.log('原始数据已保存到:', rawDataPath);
    
    // 处理统计数据
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    console.log('查找今日数据，日期:', today.toISOString());
    const todayData = records.find(r => {
      const recordDate = new Date(r.fields['开播日期'] * 1000);
      console.log('比对记录日期:', recordDate.toISOString(), '字段值:', r.fields['开播日期']);
      return recordDate.getDate() === today.getDate() &&
             recordDate.getMonth() === today.getMonth() &&
             recordDate.getFullYear() === today.getFullYear();
    }) || { fields: {} };
    
    console.log('今日数据:', JSON.stringify(todayData, null, 2));
    
    console.log('查找昨日数据，日期:', yesterday.toISOString());
    const yesterdayData = records.find(r => {
      const recordDate = new Date(r.fields['开播日期'] * 1000);
      return recordDate.getDate() === yesterday.getDate() &&
             recordDate.getMonth() === yesterday.getMonth() &&
             recordDate.getFullYear() === yesterday.getFullYear();
    }) || { fields: {} };
    
    console.log('昨日数据:', JSON.stringify(yesterdayData, null, 2));
    
    // 获取本周数据
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    console.log('本周开始日期:', weekStart.toISOString());
    
    const weekData = records.filter(r => {
      const recordDate = new Date(r.fields['开播日期'] * 1000);
      return recordDate >= weekStart;
    });
    
    console.log('本周数据条数:', weekData.length);
    
    const stats = {
      lastUpdate: now.toISOString(),
      today: {
        viewers: parseInt(todayData.fields['直播间观看人数'] || 0),
        interactions: parseInt(todayData.fields['评论次数'] || 0),
        duration: todayData.fields['开播时长'] || '0小时0分钟'
      },
      yesterday: {
        viewers: parseInt(yesterdayData.fields['直播间观看人数'] || 0),
        interactions: parseInt(yesterdayData.fields['评论次数'] || 0),
        duration: yesterdayData.fields['开播时长'] || '0小时0分钟'
      },
      week: {
        viewers: weekData.reduce((sum, r) => sum + parseInt(r.fields['直播间观看人数'] || 0), 0),
        interactions: weekData.reduce((sum, r) => sum + parseInt(r.fields['评论次数'] || 0), 0),
        duration: weekData.reduce((sum, r) => {
          const hours = parseInt(r.fields['开播时长']?.split('小时')[0] || 0);
          return sum + hours;
        }, 0) + '小时'
      }
    };
    
    console.log('生成的统计数据:', JSON.stringify(stats, null, 2));
    
    // 保存统计数据
    const statsDataPath = path.join(__dirname, '..', 'data', 'stats.json');
    fs.writeFileSync(statsDataPath, JSON.stringify(stats, null, 2));
    console.log('统计数据已保存到:', statsDataPath);
    
  } catch (error) {
    console.error('执行失败:', error);
    console.error('错误堆栈:', error.stack);
    process.exit(1);
  }
}

main(); 