<template>
  <div class="detail">
    <van-nav-bar
      title="数据详情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    
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
        <van-cell-group inset title="基本信息">
          <van-cell title="开播日期" :value="formatDate(detailData.fields['开播日期'])" />
          <van-cell title="是否为大促" :value="formatBoolean(detailData.fields['是否为大促'])" />
          <van-cell title="是否为节假日" :value="formatBoolean(detailData.fields['是否为节假日'])" />
          <van-cell title="自觉流量如何" :value="detailData.fields['自觉流量如何'] || '-'" />
        </van-cell-group>

        <van-cell-group inset title="流量数据">
          <van-cell title="千次" :value="formatNumber(detailData.fields['千次'])" />
          <van-cell title="直播推荐千次" :value="formatNumber(detailData.fields['直播推荐千次'])" />
          <van-cell title="千川PC千次" :value="formatNumber(detailData.fields['千川PC千次'])" />
          <van-cell title="随心推千次" :value="formatNumber(detailData.fields['随心推千次'])" />
        </van-cell-group>

        <van-cell-group inset title="直播间数据">
          <van-cell title="直播间曝光次数" :value="formatCount(detailData.fields['直播间曝光次数（万）'])" suffix="万" />
          <van-cell title="在线峰值人数" :value="formatCount(detailData.fields['在线峰值人数'])" suffix="人" />
          <van-cell title="进入率" :value="formatPercent(detailData.fields['进入率'])" />
          <van-cell title="互动率" :value="formatPercent(detailData.fields['互动率'])" />
          <van-cell title="加粉率" :value="formatPercent(detailData.fields['加粉率'])" />
        </van-cell-group>

        <van-cell-group inset title="时间数据">
          <van-cell title="开播时间" :value="formatTime(detailData.fields['开播时间'])" />
          <van-cell title="开播时长" :value="`${detailData.fields['开播时长']}小时`" />
          <van-cell title="周几" :value="detailData.fields['周几']" />
        </van-cell-group>

        <van-cell-group inset title="观众数据">
          <van-cell title="直播间观看人数" :value="formatCount(detailData.fields['直播间观看人数'])" suffix="人" />
          <van-cell title="直播间观看人次" :value="formatCount(detailData.fields['直播间观看人次'])" suffix="次" />
          <van-cell title="最高在线人数" :value="formatCount(detailData.fields['最高在线人数'])" suffix="人" />
          <van-cell title="平均在线人数" :value="formatCount(detailData.fields['平均在线人数'])" suffix="人" />
          <van-cell title="人均观看时长" :value="`${detailData.fields['人均观看时长']}分钟`" />
        </van-cell-group>

        <van-cell-group inset title="互动数据">
          <van-cell title="评论次数" :value="formatCount(detailData.fields['评论次数'])" suffix="次" />
          <van-cell title="新增粉丝数" :value="formatCount(detailData.fields['新增粉丝数'])" suffix="人" />
          <van-cell title="上一场新增粉丝数" :value="formatCount(detailData.fields['上一场新增粉丝数'])" suffix="人" />
          <van-cell title="看播粉丝占比" :value="formatPercent(detailData.fields['看播粉丝占比'])" />
          <van-cell title="成交粉丝占比" :value="formatPercent(detailData.fields['成交粉丝占比'])" />
        </van-cell-group>

        <van-cell-group inset title="成交数据">
          <van-cell title="直播间成交金额" :value="formatMoney(detailData.fields['直播间成交金额'])" />
          <van-cell title="直播间成交件数" :value="formatCount(detailData.fields['直播间成交件数'])" suffix="件" />
          <van-cell title="直播间成交人数" :value="formatCount(detailData.fields['直播间成交人数'])" suffix="人" />
          <van-cell title="商品点击率" :value="formatPercent(detailData.fields['商品点击率(次数)'])" />
          <van-cell title="点击成交转化率" :value="formatPercent(detailData.fields['点击成交转化率(次数)'])" />
          <van-cell title="成交件单价" :value="formatMoney(detailData.fields['成交件单价'])" />
        </van-cell-group>

        <van-cell-group inset title="备注">
          <van-cell title="日志" :label="detailData.fields['日志'] || '-'" />
        </van-cell-group>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRecordDetail } from '@/api/feishu'
import { 
  formatDate, 
  formatTime, 
  formatNumber, 
  formatPercent, 
  formatMoney, 
  formatBoolean,
  formatCount
} from '@/utils/format'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const error = ref('')
const detailData = ref(null)

async function fetchDetailData() {
  try {
    loading.value = true
    error.value = ''
    detailData.value = await getRecordDetail(route.params.id)
  } catch (err) {
    error.value = '数据加载失败，请稍后重试'
    console.error('获取详情数据失败:', err)
  } finally {
    loading.value = false
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  fetchDetailData()
})
</script>

<style scoped>
.detail {
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

.van-cell-group {
  margin: 12px 0;
}

.van-cell-group__title {
  padding: 0 16px;
  font-size: 14px;
  color: #969799;
}
</style> 