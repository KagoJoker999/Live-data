<template>
  <div class="history">
    <van-nav-bar title="历史数据" />
    
    <div class="page-content">
      <template v-if="loading">
        <div class="loading-wrapper">
          <van-loading type="spinner" color="#1989fa" />
          <p>加载中...</p>
        </div>
      </template>
      
      <template v-else-if="error">
        <van-empty
          image="error"
          :description="error"
        />
      </template>
      
      <template v-else>
        <div class="card-list">
          <van-card
            v-for="item in historyData"
            :key="item.record_id"
            :desc="formatDate(item.fields['开播日期'])"
            :title="`直播数据 - ${item.fields['周几']}`"
            @click="goToDetail(item.record_id)"
          >
            <template #tags>
              <van-tag plain type="primary" v-if="item.fields['是否为大促']">大促</van-tag>
              <van-tag plain type="warning" v-if="item.fields['是否为节假日']">节假日</van-tag>
            </template>
            <template #bottom>
              <div class="card-data">
                <div class="data-item">
                  <span class="label">成交金额</span>
                  <span class="value">{{ formatMoney(item.fields['直播间成交金额']) }}</span>
                </div>
                <div class="data-item">
                  <span class="label">观看人数</span>
                  <span class="value">{{ formatCount(item.fields['直播间观看人数']) }}</span>
                </div>
                <div class="data-item">
                  <span class="label">成交转化</span>
                  <span class="value">{{ formatPercent(item.fields['点击成交转化率(次数)']) }}</span>
                </div>
              </div>
            </template>
          </van-card>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRecentRecords } from '@/api/feishu'
import { formatDate, formatMoney, formatCount, formatPercent } from '@/utils/format'

const router = useRouter()
const loading = ref(true)
const error = ref('')
const historyData = ref([])

async function fetchHistoryData() {
  try {
    loading.value = true
    error.value = ''
    historyData.value = await getRecentRecords()
  } catch (err) {
    error.value = '数据加载失败，请稍后重试'
    console.error('获取历史数据失败:', err)
  } finally {
    loading.value = false
  }
}

function goToDetail(recordId) {
  router.push(`/detail/${recordId}`)
}

onMounted(() => {
  fetchHistoryData()
})
</script>

<style scoped>
.history {
  padding-bottom: 50px;
}

.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.loading-wrapper p {
  margin-top: 12px;
  color: #969799;
}

.card-list {
  padding: 12px;
}

.van-card {
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.van-card:active {
  transform: scale(0.98);
}

.card-data {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.data-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.data-item .label {
  font-size: 12px;
  color: #969799;
}

.data-item .value {
  font-size: 14px;
  color: #323233;
  margin-top: 2px;
}

.van-tag {
  margin-right: 4px;
}
</style> 