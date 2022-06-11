<template>
  <div class="block">
    <el-avatar
      id="infinit"
      :size="60"
      :src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242306111155-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657487316&t=dd5d1034c1a08743e94e524af1e8a6d9'"
    />
    <transition>
      <span v-if="!props.isCollapse">个人博客系统</span>
    </transition>
  </div>
  <el-menu
    :router="true"
    :collapse="props.isCollapse"
    @open="handleOpen"
    @close="handleClose"
    active-text-color="#ffd04b"
    background-color="#313642"
    class="el-menu-vertical-demo"
    :default-active="router.path"
    text-color="#fff"
  >
    <template v-for="(item, index) in list">
      <el-sub-menu v-if="!item.hidden && item.meta && item.children" :key="index" :index="item.path">
        <template #title>
          <el-icon><location /></el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <el-menu-item-group v-for="(item2, index) in item.children" :key="index">
          <el-menu-item :index="item2.path">{{ item2.meta.title }}</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item v-if="!item.hidden && !item.meta && item.children" :key="index" :index="item.children[0].path">
        <el-icon><icon-menu /></el-icon>
        <template #title>{{ item.children[0].meta.title }}</template>
      </el-menu-item>
      <el-menu-item v-if="!item.hidden && !item.children" :key="index" :index="item.path">
        <el-icon><icon-menu /></el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </template>
    <!-- <el-icon><ElemeFilled /></el-icon> -->
  </el-menu>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting, ArrowRight, FullScreen } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, defineProps } from 'vue'
const store = useStore()
const router = useRoute()
const props = defineProps(['isCollapse'])
// console.log(router, 78)
const list = store.state.routerList
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
let clear, speed
onMounted(() => {
  const infinit = document.querySelector('#infinit')
  speed = 2
  let pausedrequestAnimationFrameId
  infinit.addEventListener('mouseover', () => {
    if (clear) clearInterval(clear)

    pausedrequestAnimationFrameId = window.requestAnimationFrame(function render() {
      infinit.style.animationPlayState = `running`
      infinit.style.animationDuration = `${speed}s`
      speed -= 0.01
      if (speed === 0.1) speed = 0.1
      pausedrequestAnimationFrameId = window.requestAnimationFrame(render)
    })
  })
  infinit.addEventListener('mouseout', () => {
    speed = 2
    infinit.style.animationPlayState = `paused`
    window.cancelAnimationFrame(pausedrequestAnimationFrameId)

    // animationPlayState = 'running'
  })
})
</script>

<style lang="scss" scoped>
.block {
  background-color: #313642;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 5px;
  span {
    color: white;
    letter-spacing: 1px;
    font-family: FangSong;
    font-weight: bold;
    // font-style: italic;
  }
}
.el-menu {
  // height: 100%;
  border: none;
}
::v-deep .el-sub-menu__icon-arrow {
  margin-left: 10px !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-avatar {
  animation: identifier 2s linear infinite;
  animation-play-state: paused;
  animation-timing-function: 2s;
  cursor: pointer;
}
@keyframes identifier {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
