import dayjs from 'dayjs'

// 格式化日期
export function formatDate(timestamp) {
  if (!timestamp) return '-'
  return dayjs(timestamp * 1000).format('YYYY-MM-DD')
}

// 格式化时间
export function formatTime(timestamp) {
  if (!timestamp) return '-'
  return dayjs(timestamp * 1000).format('HH:mm:ss')
}

// 格式化数字（保留2位小数）
export function formatNumber(num) {
  if (num === undefined || num === null) return '-'
  return Number(num).toFixed(2)
}

// 格式化百分比
export function formatPercent(num) {
  if (num === undefined || num === null) return '-'
  return `${(Number(num) * 100).toFixed(2)}%`
}

// 格式化金额（单位：元）
export function formatMoney(num) {
  if (num === undefined || num === null) return '-'
  return `¥${Number(num).toFixed(2)}`
}

// 格式化布尔值
export function formatBoolean(value) {
  if (value === undefined || value === null) return '-'
  return value ? '是' : '否'
}

// 格式化数量（大于1万时显示为万）
export function formatCount(num) {
  if (num === undefined || num === null) return '-'
  return num > 10000 ? `${(num / 10000).toFixed(2)}万` : num
} 