import dayjs from 'dayjs'

// 格式化日期
export function formatDate(date) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('zh-CN')
}

// 格式化时间
export function formatTime(time) {
  if (!time) return '-'
  return time
}

// 格式化数字（保留2位小数）
export function formatNumber(num) {
  if (num === undefined || num === null) return '-'
  return Number(num).toLocaleString('zh-CN')
}

// 格式化百分比
export function formatPercent(value) {
  if (value === undefined || value === null) return '-'
  return `${(Number(value) * 100).toFixed(2)}%`
}

// 格式化金额（单位：元）
export function formatMoney(amount) {
  if (amount === undefined || amount === null) return '-'
  return `¥${Number(amount).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

// 格式化布尔值
export function formatBoolean(value) {
  if (value === undefined || value === null) return '-'
  return value ? '是' : '否'
}

// 格式化数量（大于1万时显示为万）
export function formatCount(value) {
  if (value === undefined || value === null) return '-'
  return Number(value).toLocaleString('zh-CN')
} 