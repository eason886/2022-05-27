<template>
  <div id="info">
    <p id="tip"></p>
  </div>
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
var map, geolocation
const getMapList = (obj, val) => {
  map = new AMap.Map('container', obj)

  //实例化城市查询类
  AMap.plugin('AMap.CitySearch', function () {
    var citySearch = new AMap.CitySearch()
    citySearch.getLocalCity(function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        var cityinfo = result.city
        var citybounds = result.bounds
        ElMessage({
          message: '您当前所在城市：' + cityinfo,
          type: 'success'
        })
        if ('3D' !== val) {
          map.setBounds(citybounds)
        }
        // map.setBounds(citybounds)
        // console.log(citybounds)
        // 查询成功，result即为当前所在城市信息
      } else {
        ElMessage({
          message: result.info,
          type: 'info'
        })
      }
    })
  })
  // var citysearch = new AMap.CitySearch()
  // //自动获取用户IP，返回当前城市
  // citysearch.getLocalCity(function (status, result) {
  //   if (status === 'complete' && result.info === 'OK') {
  //     if (result && result.city && result.bounds) {
  //       var cityinfo = result.city
  //       var citybounds = result.bounds
  //       document.getElementById('info').innerHTML = '您当前所在城市：' + cityinfo
  //       //地图显示当前城市
  //       map.setBounds(citybounds)
  //     }
  //   } else {
  //     document.getElementById('info').innerHTML = result.info
  //   }
  // })
  // map.plugin(['AMap.Geolocation'], function (event) {
  //   geolocation = new AMap.Geolocation({
  //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
  //     timeout: 10000, //超过10秒后中止定位，默认：无穷大
  //     buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
  //     zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  //     buttonDom: '<input hidden="true" >',
  //     buttonPosition: 'RB'
  //   })
  //   map.addControl(geolocation)
  //   geolocation.getCurrentPosition()
  //   AMap.event.addListener(geolocation, 'complete', onComplete) //返回定位信息
  //   AMap.event.addListener(geolocation, 'error', onError) //返回定位出错信息
  // })
  // //解析定位结果
  // function onComplete(data) {
  //   var str = ['定位成功']
  //   str.push('经度：' + data.position.getLng())
  //   str.push('纬度：' + data.position.getLat())
  //   if (data.accuracy) {
  //     str.push('精度：' + data.accuracy + ' 米')
  //   } //如为IP精肯定位结果则没有精度信息
  //   str.push('是否通过偏移：' + (data.isConverted ? '是' : '否'))
  //   document.getElementById('tip').innerHTML = str.join('<br>')
  // }
  // //解析定位错误信息
  // function onError(data) {
  //   document.getElementById('tip').innerHTML = '定位失败'
  // }
  // showCityInfo()
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
      // center: [114.298572, 30.584355],
      zoom: 17,
      pitch: 60, // 地图俯仰角度，有效范围 0 度- 83 度
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
            // center: [114.298572, 30.584355],
            zoom: 100,
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
            // center: [114.298572, 30.584355],
            zoom: 13,
            pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
            //  viewMode: '3D', // 地图模式
            mapStyle: 'amap://styles/grey'
            //只显示默认图层的时候，layers可以缺省
          }
          break
        default:
          obj = {
            // center: [114.298572, 30.584355],
            zoom: 17,
            pitch: 70, // 地图俯仰角度，有效范围 0 度- 83 度
            viewMode: '', // 地图模式
            // mapStyle: 'amap://styles/whitesmoke',
            //只显示默认图层的时候，layers可以缺省
            layers: []
          }
      }

      getMapList(obj, val)
    })

    // })
    console.log(newVal, '监听属性', curtype)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.info {
  width: 26rem;
}
</style>
