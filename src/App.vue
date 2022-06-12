<template>
  <!-- appear使页面一上来就有效果 -->
  <div style="height: 100%" v-loading.body="fullScreen" element-loading-text="Loading..." element-loading-background="rgba(0, 0, 0, 0.7)">
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
router.beforeEach((to, from, next) => {
  fullScreen.value = true
  const flag = window.localStorage.getItem('flag')
  if (flag) {
    next()
  } else if (to.path === '/login') {
    next()
  } else {
    next('/login')
  }

  // next()
})
router.afterEach(() => {
  nextTick(() => {
    setTimeout(() => {
      fullScreen.value = false
    }, 200)
  })
})
const fullScreen = ref(true)

const svg = `
<search style="width: 1em; height: 1em; margin-right: 8px" />
       
      `
// onMounted(() => {
//   setTimeout(() => {
//     fullScreen.value = false
//   }, 200)
// })
</script>

<style lang="scss">
.el-button--warning {
  background-color: red;
}
// ::v-deep .element-loading-spinner {
//   background-image: url(./assets/2.webp);
// }
// ::v-deep .el-loading-spinner {
//   background-image: url(./assets/2.webp) !important;
// }
</style>
