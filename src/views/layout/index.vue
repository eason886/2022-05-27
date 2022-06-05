<template>
  <el-container>
    <el-aside :width="'auto'">
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
      </el-radio-group> -->
      <el-menu
        :router="true"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#ffd04b"
        background-color="#313642"
        class="el-menu-vertical-demo"
        :default-active="router.path"
        text-color="#fff"
      >
        <template v-for="(item, index) in list">
          <el-sub-menu v-if="!item.hidden && item.children && item.children.length > 1" :key="index" :index="item.path">
            <template #title>
              <el-icon><location /></el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group v-for="(item2, index) in item.children" :key="index">
              <el-menu-item :index="item2.path">{{ item2.meta.title }}</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item v-if="!item.hidden && item.children && item.children.length === 1" :key="index" :index="item.children[0].path">
            <el-icon><icon-menu /></el-icon>
            <template #title>{{ item.children[0].meta.title }}</template>
          </el-menu-item>
          <el-menu-item v-if="!item.hidden && !item.children" :key="index" :index="item.path">
            <el-icon><icon-menu /></el-icon>
            <template #title>{{ item.meta.title }}</template>
          </el-menu-item>
        </template>
        <!-- <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group>
            <template #title><span>Group One</span></template>
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item> -->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="left">
          <div id="pointer" @click="clone()">
            <el-icon><location /></el-icon>
          </div>
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in path" :to="{ path: item.path }" :key="index">{{ item.title }}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item>promotion management</el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->
          </el-breadcrumb>
        </div>
        <div>
          <span id="fullscreen" @click.stop="screen()" style="margin-right: 20px">
            <el-icon><FullScreen /></el-icon>
          </span>
          <span @click="reset">退出</span>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { Document, Menu as IconMenu, Location, Setting, ArrowRight, FullScreen } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const router = useRoute()
import { ref, watch } from 'vue'
// if (router.path === '/dashbord') {
//   router.path = '/'
// }
const reset = () => {
  window.localStorage.clear()
  window.location.reload()
}
let fullscreen = false
const screen = () => {
  let element = document.documentElement
  if (fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  } else {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen()
    }
  }
  fullscreen = !fullscreen
}

// console.log(router)
const path = ref([{ path: '/', title: '首页' }])
watch(
  router,
  (newVal, oldVal) => {
    path.value = [{ path: '/', title: '首页' }]
    // newVal.matched.forEach((item) => {
    if (newVal.matched.length > 1) {
      if (newVal.matched[0].children.length > 1) {
        newVal.matched.forEach((item) => {
          path.value.push({
            path: item.path,
            title: item.meta.title
          })
        })
      } else {
        path.value.push({
          path: newVal.matched[1].path,
          title: newVal.matched[1].meta.title
        })
      }
    }
    console.log(path, 109)
    // })
  },
  {
    immediate: true,
    deep: true
  }
)
const store = useStore()
console.log(router, 78)
const list = store.state.routerList
const isCollapse = ref(false)
const curw = ref('200px')
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const clone = () => {
  console.log(11)
  isCollapse.value = !isCollapse.value
  // curw.value = isCollapse.value ? 'auto' : '200px'
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
  width: 100%;
  .el-container {
    width: 100% !important;
  }
}
// .el-header {
//   background-color: red;
// }

.el-main {
  background-color: #f0f2f5;
}
.el-menu {
  height: 100%;
  border: none;
}
::v-deep .el-sub-menu__icon-arrow {
  margin-left: 10px !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-header {
  .left {
    display: flex;
    align-items: center;
    height: 50px;
  }
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #fff;
  justify-content: space-between;
  cursor: pointer;
  #pointer {
    cursor: pointer;
    vertical-align: middle;
    margin-top: 4px;
    margin-right: 20px;
  }
}
#fullscreen {
  vertical-align: middle;
}
</style>
