import axios from 'axios'

const APP_ID = import.meta.env.VITE_APP_ID
const APP_SECRET = import.meta.env.VITE_APP_SECRET
const BASE_ID = import.meta.env.VITE_BASE_ID
const TABLE_ID = import.meta.env.VITE_TABLE_ID

const instance = axios.create({
  baseURL: 'https://open.feishu.cn/open-apis',
  timeout: 10000
})

// 获取访问令牌
async function getTenantAccessToken() {
  try {
    const response = await instance.post('/auth/v3/tenant_access_token/internal', {
      app_id: APP_ID,
      app_secret: APP_SECRET
    })
    return response.data.tenant_access_token
  } catch (error) {
    console.error('获取访问令牌失败:', error)
    throw error
  }
}

// 获取最新一条记录
export async function getLatestRecord() {
  try {
    const token = await getTenantAccessToken()
    const response = await instance.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page_size: 1,
        sort: 'CurrentValue.开播日期:desc'
      }
    })
    return response.data.data.items[0]
  } catch (error) {
    console.error('获取最新记录失败:', error)
    throw error
  }
}

// 获取最近7条记录
export async function getRecentRecords() {
  try {
    const token = await getTenantAccessToken()
    const response = await instance.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page_size: 7,
        sort: 'CurrentValue.开播日期:desc'
      }
    })
    return response.data.data.items
  } catch (error) {
    console.error('获取最近记录失败:', error)
    throw error
  }
}

// 获取单条记录详情
export async function getRecordDetail(recordId) {
  try {
    const token = await getTenantAccessToken()
    const response = await instance.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records/${recordId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data
  } catch (error) {
    console.error('获取记录详情失败:', error)
    throw error
  }
} 