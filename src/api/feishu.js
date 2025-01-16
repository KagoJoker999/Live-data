import axios from 'axios'

const APP_ID = import.meta.env.VITE_APP_ID
const APP_SECRET = import.meta.env.VITE_APP_SECRET
const BASE_ID = import.meta.env.VITE_BASE_ID
const TABLE_ID = import.meta.env.VITE_TABLE_ID

console.log('环境变量:', {
  APP_ID,
  APP_SECRET,
  BASE_ID,
  TABLE_ID
})

const instance = axios.create({
  baseURL: 'https://open.feishu.cn/open-apis',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
  }
})

// 响应拦截器
instance.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API请求失败:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    })
    return Promise.reject(error)
  }
)

// 获取tenant_access_token
async function getTenantAccessToken() {
  try {
    console.log('开始获取tenant_access_token...')
    const response = await instance.post('/auth/v3/tenant_access_token/internal', {
      app_id: APP_ID,
      app_secret: APP_SECRET
    })
    
    if (response.code !== 0) {
      throw new Error(`获取tenant_access_token失败: ${response.msg}`)
    }
    
    console.log('获取tenant_access_token成功')
    return response.tenant_access_token
  } catch (error) {
    console.error('获取tenant_access_token失败:', error)
    throw error
  }
}

// 获取最新记录
export async function getLatestRecord() {
  try {
    console.log('开始获取最新记录...')
    const token = await getTenantAccessToken()
    
    const response = await instance.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page_size: 1,
        sort: 'CurrentValue.开播日期',
        sort_flag: -1
      }
    })
    
    if (response.code !== 0) {
      throw new Error(`获取记录失败: ${response.msg}`)
    }
    
    if (!response.data?.items?.length) {
      console.log('未找到记录')
      return null
    }
    
    console.log('获取最新记录成功')
    return response.data.items[0]
  } catch (error) {
    console.error('获取最新记录失败:', error)
    throw error
  }
}

// 获取最近记录列表
export async function getRecentRecords(pageSize = 10) {
  try {
    console.log('开始获取最近记录列表...')
    const token = await getTenantAccessToken()
    
    const response = await instance.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        page_size: pageSize,
        sort: 'CurrentValue.开播日期',
        sort_flag: -1
      }
    })
    
    if (response.code !== 0) {
      throw new Error(`获取记录列表失败: ${response.msg}`)
    }
    
    console.log('获取最近记录列表成功')
    return response.data.items || []
  } catch (error) {
    console.error('获取最近记录列表失败:', error)
    throw error
  }
}

// 获取记录详情
export async function getRecordDetail(recordId) {
  try {
    console.log('开始获取记录详情...')
    const token = await getTenantAccessToken()
    
    const response = await instance.get(`/bitable/v1/apps/${BASE_ID}/tables/${TABLE_ID}/records/${recordId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    
    if (response.code !== 0) {
      throw new Error(`获取记录详情失败: ${response.msg}`)
    }
    
    console.log('获取记录详情成功')
    return response.data
  } catch (error) {
    console.error('获取记录详情失败:', error)
    throw error
  }
} 