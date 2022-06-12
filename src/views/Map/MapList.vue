<template>
  <div id="container" style="height: 100%" v-loading="loading"></div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { onMounted, nextTick, watch, ref, reactive, resolveComponent } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const curtype = ref('')
const loading = ref(true)
onMounted(() => {
  console.log('dom', curtype.value)
})
// {
//     center: [114.298572, 30.584355],
//     zoom: 17,
//     pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
//     viewMode: '3D', // 地图模式

//     //只显示默认图层的时候，layers可以缺省
//     layers: [new AMap.TileLayer.Satellite()]
//   }
var map
const getMapList = (obj) => {
  map = new AMap.Map('container', obj)
  map.on('complete', function () {
    ElMessage({
      message: 'accomplish map loding ',
      type: 'success'
    })
    loading.value = false
  })
}
watch(
  route,
  (newVal, oldVal) => {
    map && map.destroy()
    loading.value = true
    curtype.value = newVal.meta.query
    // nextTick(() => {
    const val = newVal.meta.query
    let obj = reactive({
      center: [114.298572, 30.584355],
      zoom: 17,
      pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode: '', // 地图模式

      //只显示默认图层的时候，layers可以缺省
      layers: []
    })
    new Promise((resolve, reject) => {
      resolve()
    }).then(() => {
      switch (val) {
        case '3D':
          obj = {
            center: [114.298572, 30.584355],
            zoom: 17,
            pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
            viewMode: '3D', // 地图模式
            mapStyle: 'amap://styles/darkblue'
            //只显示默认图层的时候，layers可以缺省
          }

          break
        case 'weixing':
          obj.layers = [new AMap.TileLayer.Satellite()]
          obj.zoom = 13
          obj.viewMode = ''
          break
        case 'luwang':
          obj.layers = [
            new AMap.TileLayer.Satellite(),
            // 路网
            new AMap.TileLayer.RoadNet()
          ]
          obj.viewMode = ''
          obj.zoom = 13
          break
        case 'grey':
          obj = {
            center: [114.298572, 30.584355],
            zoom: 13,
            pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
            //  viewMode: '3D', // 地图模式
            mapStyle: 'amap://styles/grey'
            //只显示默认图层的时候，layers可以缺省
          }
          break
        default:
          obj = {
            center: [114.298572, 30.584355],
            zoom: 17,
            pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
            viewMode: '', // 地图模式
            // mapStyle: 'amap://styles/whitesmoke',
            //只显示默认图层的时候，layers可以缺省
            layers: []
          }
      }

      getMapList(obj)
    })

    // })
    console.log(newVal, '监听属性', curtype)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
