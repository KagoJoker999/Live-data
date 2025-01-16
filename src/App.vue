<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  
  <van-tabbar v-model="active" route>
    <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/history" icon="clock-o">历史</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7f8fa;
  min-height: 100vh;
}

.page-content {
  padding-bottom: 50px;
}

.van-nav-bar {
  background-color: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}

.van-nav-bar__title {
  font-weight: 600;
}

.van-card {
  background-color: #fff;
  border-radius: 12px;
  margin: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style> 