<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <p>欢迎页</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const isLoading = ref(true);
const router = useRouter();

/**
 * 1.检查token，如果不存在跳转登录页
 * 2.如果token存在获取全局共享数据，数据字典等信息
 */

const fetchGlobalData = async () => {
  try {
    // 模拟请求全局数据和数据字典
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟网络请求
    // 请求成功后，跳转到主页面
    router.push("/test");
  } catch (error) {
    console.error("Failed to fetch global data:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchGlobalData();
});
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 8px solid rgba(0, 0, 0, 0.1);
  border-top: 8px solid #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
