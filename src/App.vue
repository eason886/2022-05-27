<template>
  <!-- appear使页面一上来就有效果 -->
  <div style="height: 100%">
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
router.beforeEach((to, from, next) => {
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
</script>

<style lang="scss" scoped></style>
