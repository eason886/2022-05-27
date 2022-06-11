<template>
  <div class="head" style="width: 100%; height: 100%; display: flex; position: relative">
    <!-- <router-link to="/child">你好</router-link> -->

    <div class="container" style="flex: 1; color: #fff; overflow: hidden; width: 100%; height: 100%">
      <vue-seamless-scroll ref="seamlessScroll" :data="listData" :class-option="optionHover" class="seamless-warp">
        <ul id="item" class="item" style="padding: 0; margin: 0; list-style: none">
          <li v-for="item in listData" :key="item.label" style="color: #fff; text-align: center">
            <span> 实时数据轮询 </span> <span> {{ item.title }}</span>
          </li>
        </ul>
        <!-- <div v-for="item in listData" :key="item.label" style="color: #fff; text-align: center; background: #e4e4e4">
          <span> 实时数据轮询 </span> <span> {{ item.title }}</span>
        </div> -->
      </vue-seamless-scroll>
    </div>
    <div style="width: 100%; height: 100%; flex: 1.5" id="center">
      <div v-if="cc" ref="map2" class="echarts" style="width: 100%; height: 100%"></div>
      <Map v-if="!cc"></Map>
      <div id="time" style="color: white">{{ nowDate }}</div>
      <p class="box-item">
        <countTo :startVal="startVal" :endVal="endVal" :duration="10000"></countTo>
        <countTo :startVal="startVal" :endVal="endVal" :duration="10000"></countTo>
        <countTo :startVal="startVal" :endVal="endVal" :duration="10000"></countTo>
        <countTo :startVal="startVal" :endVal="endVal" :duration="10000"></countTo>
      </p>
    </div>
    <!-- <vue-seamless-scroll :data="listData" :class-option="aa":data="listData" :class-option="aa"> -->
    <!-- <ul class="ul-scoll">overflow: hidden;
        <li v-for="(item, index) in listData" :key="index">
          <span class="title">{{ item.title }}：</span><span class="date"> {{ item.time }}</span>
        </li>
      </ul> -->
    <!-- </vue-seamless-scroll> -->
    <!-- <div>{{ 11 }}</div>
    <div>{{ 11 }}</div>
    <div>{{ 11 }}</div>
    <div>{{ 11 }}</div> -->
    <!-- <router-view></router-view> -->
    <!-- <p class="box-item2" style="color: white">
      <span>0123456789</span>
    </p> -->
    <!-- <div id="out"> -->
    <!-- <div class="header">
      <p class="box-item2" style="color: white">
        <span>0123456789</span>
      </p>
      <div style="overflow: hidden; color: red">
        .
        <div>Notice :I LOVE YOU TOO PROGRAM</div>
      </div>
    </div> -->
    <!-- <div>I</div>
      <div>LOVE</div>
      <div>YOU</div>
      <div>TOO</div>
      <div>program</div> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import countTo from 'vue-count-to/src'
import * as echarts from 'echarts'
import china from './json/china.json'
import Map from './Map/map.vue'
import { onMounted, ref, computed } from 'vue'
import {
  xiZangMap,
  zheJiangMap,
  yunNanMap,
  xinJiangMap,
  tianJinMap,
  siChuanMap,
  shanXiMap,
  shanXi2Map,
  shangHaiMap,
  shanDongMap,
  qingHaiMap,
  ningXiaMap,
  neimengGuMap,
  liaoNingMap,
  jiLinMap,
  jiangXiMap,
  jiangSuMap,
  huNanMap,
  huBeiMap,
  heNanMap,
  heiLongJiangMap,
  heBeiMap,
  haiNanMap,
  guiZhouMap,
  guangXiMap,
  guangDongMap,
  ganSuMap,
  fuJianMap,
  chongQingMap,
  beiJingMap,
  anHuiMap
} from './Map/map.js'
const cc = ref(true)
var mapJson = [
  /*   {
    name: "台湾省",
    json: taiWanMap,
  }, */
  {
    name: '海南省',
    json: haiNanMap
  },
  {
    name: '安徽省',
    json: anHuiMap
  },
  {
    name: '江西省',
    json: jiangXiMap
  },
  {
    name: '湖南省',
    json: huNanMap
  },
  {
    name: '云南省',
    json: yunNanMap
  },
  {
    name: '贵州省',
    json: guiZhouMap
  },
  {
    name: '广东省',
    json: guangDongMap
  },
  {
    name: '福建省',
    json: fuJianMap
  },
  {
    name: '浙江省',
    json: zheJiangMap
  },
  {
    name: '江苏省',
    json: jiangSuMap
  },
  {
    name: '四川省',
    json: siChuanMap
  },
  {
    name: '重庆市',
    json: chongQingMap
  },
  {
    name: '湖北省',
    json: huBeiMap
  },
  {
    name: '河南省',
    json: heNanMap
  },
  {
    name: '山东省',
    json: shanDongMap
  },
  {
    name: '吉林省',
    json: jiLinMap
  },
  {
    name: '辽宁省',
    json: liaoNingMap
  },
  {
    name: '天津市',
    json: tianJinMap
  },
  {
    name: '北京市',
    json: beiJingMap
  },
  {
    name: '河北省',
    json: heBeiMap
  },
  {
    name: '山西省',
    json: shanXiMap
  },
  {
    name: '陕西省',
    json: shanXi2Map
  },
  {
    name: '宁夏回族自治区',
    json: ningXiaMap
  },
  {
    name: '青海省',
    json: qingHaiMap
  },
  {
    name: '西藏自治区',
    json: xiZangMap
  },
  {
    name: '黑龙江省',
    json: heiLongJiangMap
  },
  {
    name: '内蒙古自治区',
    json: neimengGuMap
  },
  {
    name: '甘肃省',
    json: ganSuMap
  },
  {
    name: '新疆维吾尔自治区',
    json: xinJiangMap
  },
  {
    name: '广西壮族自治区',
    json: guangXiMap
  },
  {
    name: '上海市',
    json: shangHaiMap
  }
]
var chooseName = ref([
  xiZangMap,
  zheJiangMap,
  yunNanMap,
  xinJiangMap,
  tianJinMap,
  siChuanMap,
  shanXiMap,
  shanXi2Map,
  shangHaiMap,
  shanDongMap,
  qingHaiMap,
  ningXiaMap,
  neimengGuMap,
  liaoNingMap,
  jiLinMap,
  jiangXiMap,
  jiangSuMap,
  huNanMap,
  huBeiMap,
  heNanMap,
  heiLongJiangMap,
  heBeiMap,
  haiNanMap,
  guiZhouMap,
  guangXiMap,
  guangDongMap,
  ganSuMap,
  fuJianMap,
  chongQingMap,
  beiJingMap,
  anHuiMap
])
// chooseName = mapJson.filter((item) => {
//   //我们根据名字来判断是否选择一种
//   return item.name == param.name
// })
// const getJson = chooseName.value[0].json

// console.log(chooseName, "json");
// axios.get(chooseName[0].json).then((res) => {
const listData = ref([
  {
    title: '无缝滚动第七行无缝滚动第七行',
    date: '2017-12-16',
    test: '测试',
    test2: '测试2',
    test3: '测试3'
  },
  {
    title: '无缝滚动第一行无缝滚动第一行',
    date: '2017-12-16',
    test: '测试',
    test2: '测试2',
    test3: '测试3'
  },
  {
    title: '无缝滚动第二行无缝滚动第二行',
    date: '2017-12-16',
    test: '测试',
    test2: '测试2',
    test3: '测试3'
  },
  {
    title: '无缝滚动第三行无缝滚动第三行',
    date: '2017-12-16',
    test: '测试',
    test2: '测试2',
    test3: '测试3'
  },
  {
    title: '无缝滚动第四行无缝滚动第四行',
    date: '2017-12-16',
    test: '测试',
    test2: '测试2',
    test3: '测试3'
  },
  {
    title: '无缝滚动第五行无缝滚动第五行',
    date: '2017-12-16',
    test: '测试',
    test2: '测试2',
    test3: '测试3'
  },
  {
    title: '无缝滚动第六行无缝滚动第六行',
    date: '2017-12-16',
    test: '测试',
    test2: '测试2',
    test3: '测试3'
  },
  {
    title: '无缝滚动第七行无缝滚动第七行',
    date: '2017-12-16',
    test: '测试',
    test2: '测试2',
    test3: '测试3'
  }
])
const startVal = ref(1970)
const endVal = ref(2022)
listData.value.forEach((item) => {
  item.title = '轮询'
})

const nowDate = ref('')
const formatDate = () => {
  let date = new Date()
  let year = date.getFullYear() // 年
  let month = date.getMonth() + 1 // 月
  let day = date.getDate() // 日
  let week = date.getDay() // 星期
  let weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let hour = date.getHours() // 时
  hour = hour < 10 ? '0' + hour : hour // 如果只有一位，则前面补零
  let minute = date.getMinutes() // 分
  minute = minute < 10 ? '0' + minute : minute // 如果只有一位，则前面补零
  let second = date.getSeconds() // 秒
  second = second < 10 ? '0' + second : second // 如果只有一位，则前面补零
  nowDate.value = `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`
  return `${year}/${month}/${day} ${hour}:${minute}:${second} ${weekArr[week]}`
}
const seamlessScroll = ref(null)
setInterval(() => {
  let aa = formatDate()
  // if ((listData.value, length > 20)) {
  //   listData.splice(0, 8)
  // }
  // document.getElementById('out').style.display = 'none'
  setTimeout(() => {
    listData.value.push({ title: aa })
    startVal.value++
    // seamlessScroll.value.reset()
  }, 200)
}, 5000)
const map2 = ref()
const leave = ref('province')
onMounted(() => {
  initEcharts()
})
var myChart
const initEcharts = () => {
  // var myChart = echarts.init(map2.value)
  drawChina()
  window.addEventListener('resize', function () {
    myChart.resize()
  })
  myChart.on('click', (param) => {
    // myChart.clear()
    const div = document.createElement('div')
    div.innerHTML = '返回上一级'

    div.className = 'return'
    div.style.position = 'absolute'
    div.style.top = '20px'
    div.style.right = '20px'
    div.style.color = '#fff'
    div.style.cursor = 'pointer'
    div.addEventListener('click', function (e) {
      e.stopPropagation()
      console.log(1111)
      drawChina()
    })
    document.getElementById('center').appendChild(div)
    leave.value = 'district'
    console.log(param, div)
    // const getJson = chooseName[0].json
    chooseName.value = mapJson.filter((item) => {
      //我们根据名字来判断是否选择一种
      return item.name == param.name
    })
    if (!chooseName.value.length) {
      cc.value = false
      return
    }
    const getJson = chooseName.value[0].json
    // if (!getJson.type) return alert('暂无数据')
    console.log(chooseName, 401)
    var series2 = []
    // [["黑龙江", chinaDatas]].forEach(function (item, i) {
    ;[[param.name]].forEach(function (item, i) {
      series2.push(
        {
          //绘制一个新地图
          tooltip: {
            trigger: ''
          },
          type: 'map',
          map: param.name,
          geoIndex: 0,
          tooltip: {
            trigger: ''
          },
          center: [105.194115019531, 35.582111640625],
          z: -1,
          aspectScale: 0.75, //
          // data: []
          data: []
        },
        {
          //设置指向箭头信息
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 4, //箭头指向速度，值越小速度越快
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 0 //图标大小
          },
          lineStyle: {
            normal: {
              show: false,
              color: 'transparent', //指向线的颜色
              width: 1, //尾迹线条宽度
              opacity: 1, //尾迹线条透明度
              curveness: 0.3 //尾迹线条曲直度
            }
          }
        },
        // 发射点位置涟漪等效果
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 4 //波纹圆环最大限制，值越大波纹越大
          },
          tooltip: {
            trigger: ''
          },
          label: {
            normal: {
              show: true,
              position: 'right', //显示位置
              offset: [-20, 0], //偏移设置
              formatter: function (params) {
                //圆环显示文字
                return '\n\n\n' + params.data.name
              },
              fontSize: 10,
              color: '#ffffff'
            },
            emphasis: {
              show: true
            }
          },
          // symbol: 'circle',
          symbolSize: function (val) {
            return 5 + val[2] * 5 //圆环大小
          },
          itemStyle: {
            normal: {
              show: false,
              color: '#dcd465'
            }
          },
          symbolSize: 10, //圆圈大小
          data: [{ name: '000 ' }]
        },

        //被攻击点
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            //涟漪相关
            period: 2,
            brushType: 'stroke',
            scale: 5
          },
          tooltip: {
            trigger: ''
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              // offset:[5, 0],
              color: '#fff',
              formatter: '{b}',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            },
            emphasis: {
              show: true,
              color: '#f60'
            }
          },
          itemStyle: {
            normal: {
              color: 'white'
            }
          },
          symbol: 'circle',
          symbolSize: 10, //圆圈大小
          data: []
        }
      )
    })
    echarts.registerMap(param.name, getJson)
    var option1 = {
      geo: {
        show: true,
        //设置中心点
        center: '',
        map: param.name,
        roam: false, //是否允许缩放，拖拽
        zoom: 1.2, //初始化大小
        //缩放大小限制
        scaleLimit: {
          min: 0.1, //最小
          max: 12 //最大
        },
        label: {
          normal: {
            show: true, //关闭省份名展示
            fontSize: '12',
            color: '#ffffff'
            // formatter: function (params) {
            //   var total = 0
            //   var target
            //   var name
            //   target = 0
            //   for (var i = 0; i < count.length; i++) {
            //     name = params.name
            //     if (count[i].name === params.name) {
            //       name = count[i].name
            //       target = count[i].value
            //     }
            //   }
            //   if (flag.value == false) {
            //     return name + '\n' + target + '人'
            //   } else {
            //     return ''
            //   }
            // }
          },
          emphasis: {
            show: true
          }
        },
        //各个省份模块样式设置
        itemStyle: {
          normal: {
            areaColor: '#12225c', //背景色

            borderColor: '#5e84fd',
            borderWidth: 2,
            //  reaColor: '#013C62', //地区颜色
            shadowColor: '#182f68', //阴影颜色
            shadowOffsetX: 0, //阴影偏移量
            shadowOffsetY: 25 //阴影偏移量
          }
        },
        //高亮状态
        emphasis: {
          itemStyle: {
            areaColor: '#1774d4'
          },
          label: {
            show: true,
            color: '#fff'
          }
        },
        select: {
          // 地图选中区域样式
          label: {
            // 选中区域的label(文字)样式
            color: '#fff'
          },
          itemStyle: {
            // 选中区域的默认样式
            areaColor: '#12225c'
          }
        },
        z: 11
      },
      series: series2
    }
    myChart.setOption(option1)
  })

  //lines 按照格式添加发射点的精度维度,和发射点去往位置的精度维度
}
function drawChina() {
  myChart = echarts.init(map2.value)
  myChart.clear()
  echarts.registerMap('HK', china)
  var chinaGeoCoordMap = {
    陕西: [108.948024, 34.263161],
    新疆: [87.617733, 40.792818],
    西藏: [88.132212, 31.660361],
    广西: [108.320004, 22.82402],
    台湾: [121.509062, 24.044332],
    黑龙江: [127.642464, 46.756967],
    吉林: [125.3245, 43.886841]
  }
  var chinaDatas = [
    // {
    //   name: '北京',
    //   value: 0
    // },

    {
      name: '新疆',
      value: 2
    },

    {
      name: '西藏',
      value: 1
    },

    {
      name: '台湾',
      value: 1
    },
    {
      name: '广西',
      value: 2
    },
    {
      name: '黑龙江',
      value: 1
    },
    {
      name: '吉林',
      value: 1
    }
  ]
  // 设置发射的中心点
  const scatterPos = [108.948024, 34.263161]
  var convertData = function (data) {
    var res = []
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i]
      var fromCoord = chinaGeoCoordMap[dataItem.name]
      var toCoord = scatterPos
      if (fromCoord && toCoord) {
        res.push({
          // fromName: toCoord,
          toName: '山西',
          coords: [toCoord, fromCoord],
          value: 'yinsdemo'
        })

        //   res.push([
        //     {
        //       coord: fromCoord,
        //       value: ''
        //     },
        //     {
        //       coord: toCoord
        //     }
        //   ])
      }
    }
    console.log('res', res)
    return res
  }
  // 联谊
  var series = []

  ;[['陕西', chinaDatas]].forEach(function (item, i) {
    console.log(item)
    series.push(
      {
        //绘制一个新地图
        type: 'map',
        map: 'HK',
        geoIndex: 0,
        tooltip: {
          trigger: ''
        },
        center: [105.194115019531, 35.582111640625],
        z: -1,
        aspectScale: 0.75, //
        // data: []
        data: ((china) => {
          return china.features.map((item) => {
            return { name: item.properties.name, value: 0 }
          })
        })(china)
      },
      //设置指向线和箭头信息 按照固定的格式加进去
      {
        type: 'lines',
        zlevel: 2,
        effect: {
          show: true,
          period: 5, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: ['arrow'], //箭头图标
          symbolSize: 8, //图标大小
          color: 'yellow'
        },
        lineStyle: {
          normal: {
            color: 'yellow',
            width: 1,
            curveness: 0.2
          }
        },
        tooltip: {
          trigger: ''
        },
        // lineStyle: {
        //   normal: {
        //     color: '#fff',
        //     width: 1, //尾迹线条宽度
        //     opacity: 1, //尾迹线条透明度
        //     curveness: 0.3 //尾迹线条曲直度
        //   }
        // },
        data: convertData(item[1])
      },
      // 发射点位置涟漪等效果
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          period: 4, //动画时间，值越小速度越快
          brushType: 'stroke', //波纹绘制方式 stroke, fill
          scale: 4 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: false,
            position: 'right', //显示位置
            offset: [5, 0], //偏移设置
            formatter: function (params) {
              //圆环显示文字
              return params.data.name
            },
            fontSize: 13
          },
          emphasis: {
            show: true
          }
        },
        tooltip: {
          trigger: ''
        },
        symbol: 'circle',
        symbolSize: function (val) {
          return 5 + val[2] * 5 //圆环大小
        },
        itemStyle: {
          normal: {
            show: false,
            color: 'yellow'
          }
        },

        data: item[1].map(function (dataItem) {
          return {
            name: dataItem.name,
            str: 'demo',
            value: chinaGeoCoordMap[dataItem.name].concat([dataItem.value])
          }
        })
      },
      //被攻击点
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          //涟漪相关
          period: 2,
          brushType: 'stroke',
          scale: 5
        },
        tooltip: {
          trigger: ''
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            // offset:[5, 0],
            color: '#fff',
            formatter: '{b}',
            textStyle: {
              color: '#fff',
              fontSize: 12
            }
          },
          emphasis: {
            show: true,
            color: '#f60'
          }
        },
        itemStyle: {
          normal: {
            color: 'white'
          }
        },
        symbol: 'circle',
        symbolSize: 10, //圆圈大小
        data: [
          {
            name: item[0],
            value: chinaGeoCoordMap[item[0]]
          }
        ]
      }
    )
    console.log(series, 220)
  })
  var option = {
    tooltip: {
      trigger: ''
      // formatter: function (params) {
      //   // console.log(params)
      // }
    },
    layoutCenter: ['70%', '59%'],

    grid: {
      top: 'middle'
    },
    // visualMap: {
    //   min: 100,
    //   max: 200,
    //   text: ['High', 'Low'],
    //   realtime: false,
    //   calculable: true
    //   // inRange: {
    //   //   color: 'skyblue'
    //   // }
    // },
    // series: [
    //   {
    //     name: '测试地图',
    //     type: 'map',
    //     map: 'HK',
    //     geoIndex: 0,
    //     data: (function (china) {
    //       return china.features.map((item) => {
    //         return { name: item.properties.name, value: Math.random() * 500 }
    //       })
    //     })(china)
    //     // 自定义名称映射
    //     // nameMap: {
    //     //   'Central and Western': '中西区',
    //     //   Eastern: '东区',
    //     //   Islands: '离岛',
    //     //   'Kowloon City': '九龙城',
    //     //   'Kwai Tsing': '葵青',
    //     //   'Kwun Tong': '观塘',
    //     //   North: '北区',
    //     //   'Sai Kung': '西贡',
    //     //   'Sha Tin': '沙田',
    //     //   'Sham Shui Po': '深水埗',
    //     //   Southern: '南区',
    //     //   'Tai Po': '大埔',
    //     //   'Tsuen Wan': '荃湾',
    //     //   'Tuen Mun': '屯门',
    //     //   'Wan Chai': '湾仔',
    //     //   'Wong Tai Sin': '黄大仙',
    //     //   'Yau Tsim Mong': '油尖旺',
    //     //   'Yuen Long': '元朗'
    //     // }
    //   }
    // ],

    geo: [
      {
        // 地理坐标系组件
        map: 'HK',
        type: 'map',
        show: true,
        //     map: 'HK',
        roam: true, // 可以缩放和平移
        aspectScale: 0.8, // 比例
        zoom: 1.5,
        center: [105.194115019531, 35.582111640625],
        // center: [116.405285, 39.904989],
        tooltip: {
          trigger: function (params) {
            return params.name
          }
        },
        layoutCenter: ['50%', '50%'], // position位置
        // 地图大小，保证了不超过 370x370 的区域
        label: {
          // 图形上的文本标签
          normal: {
            show: true,
            rotate: 360,
            // position: 'outside',
            // verticalAlign: 'bottom',
            // position: '',
            // offset: ['500px', '50px'],
            // lineHeight: 'bottom',
            // align: 'center',
            // lineHeight: 26,
            backgroundColor: '',
            textStyle: {
              color: '#fff',
              fontSize: '9'
            }
          },
          emphasis: {
            // 高亮时样式
            color: '#fff'
          }
        },
        // 这里是重点！！！
        // regions: [
        //   {
        //     name: '南海诸岛',
        //     itemStyle: {
        //       // 隐藏地图
        //       normal: {
        //         opacity: 0 // 为 0 时不绘制该图形
        //       }
        //     },
        //     label: {
        //       show: false // 隐藏文字
        //     }
        //   }
        // ],
        itemStyle: {
          // 图形上的地图区域
          normal: {
            areaColor: '#00398e'
          },
          emphasis: {
            // 高亮时
            areaColor: 'skyblue',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 10,
            borderWidth: 0,
            shadowColor: 'rgba(0, 93, 255, 0.2)'
          }
        },
        z: 11
      }
    ],
    series: series
  }
  myChart.setOption(option)
}
</script>

<script>
export default {
  computed: {
    optionHover() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        singleHeight: 50,
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  background-image: url(../assets/2.webp);
  background-repeat: no-repeat;
  background-size: cover;
}
::v-deep .echarts {
  width: 100%;
  height: 100%;
  div {
    &:nth-child(1) {
      width: 100% !important;
      height: 100% !important;
      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}
#time {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
}
// ::v-deep .seamless-warp > div > div:nth-of-type(1) {
//   height: 100% !important;
// }

.seamless-warp {
  width: 100%;
  height: 100%;
  overflow: hidden;
  ul li {
    border: none !important;
  }
}
#item li {
  height: 50px;
  line-height: 50px;
  display: flex;
  // background-color: #020836;
  justify-content: space-around;
  flex-wrap: nowrap;
  text-overflow: ellipsis;
  span:nth-of-type(1) {
    flex: 0 0 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  span:nth-of-type(2) {
    flex: 0 0 200px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  // background-color: #006a9e;
  // border: 1px solid transparent !important;
  // opacity: 0.1;
}
.box-item {
}
.box-item {
  // display: inline-block;
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 82px;
  position: absolute;
  color: yellow;
  top: 0;
  right: 0;
  // background: url(./number-bg.png) no-repeat center center;
  // background-size: 100% 100%;
  font-size: 62px;
  line-height: 82px;
  // text-align: center;
  // // position: relative;
  // writing-mode: vertical-lr;
  // text-orientation: upright;
  // overflow: hidden;
}
.box-item2 {
  position: absolute;
  width: 56px;
  height: 82px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  writing-mode: vertical-lr;
  text-orientation: upright;
  font-size: 80px;
  overflow: hidden;
  transform: rotate(315deg);
  z-index: 1000;
}
.box-item2 span {
  letter-spacing: 10px;
  left: 50%;
  transform: translate(-50%, 0%);
  position: absolute;
  // top: 10px;
  animation: identifier 3s linear infinite;
  //  overflow: hidden;
}
// .box-item span {
//   position: absolute;
//   top: 10px;
//   left: 50%;
//   transform: translate(-50%, 0%);
//   letter-spacing: 10px;
//   animation: identifier 0.5s linear forwards;
// }
@keyframes identifier {
  from {
    transform: translate(-50%, 0%);
  }
  to {
    transform: translate(-50%, -90%);
  }
}
// #out {
//   position: absolute;
//   z-index: 0;
//   width: 800px;
//   height: 500px;
//   display: flex;
//   flex-wrap: wrap;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   margin: auto;
//   justify-content: space-around;
//   align-content: center;
//   overflow: hidden;
//   // background-color: red;
//   div {
//     width: 300px;
//     height: 120px;
//     background-color: #070d39;
//     margin-bottom: 40px;
//     border-radius: 10px;
//     color: white;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 50px;
//     opacity: 0;
//     // position: absolute;
//   }
//   div:nth-of-type(1) {
//     // position: absolute;
//     transform: translate(0%, -400%);
//     animation: identifier1 5s linear forwards;
//   }
//   div:nth-of-type(2) {
//     transform: translate(0%, -400%);
//     animation: identifier1 5s linear forwards;
//   }
//   div:nth-of-type(3) {
//     transform: translate(0%, 400%);
//     margin-top: 160px;
//     animation: identifier2 5s linear forwards;
//   }
//   div:nth-of-type(4) {
//     margin-top: 160px;
//     transform: translate(0%, 400%);
//     animation: identifier2 5s linear forwards;
//   }
//   div:nth-of-type(5) {
//     position: absolute;
//     top: 50%;
//     color: red;
//     transform: translate(0%, -60%);
//     animation: identifier3 9s linear forwards;
//   }
// }
// @keyframes identifier1 {
//   0% {
//     transform: translate(0%, -400%);
//     opacity: 0;
//   }
//   25% {
//     opacity: 0.5;
//   }
//   50% {
//     opacity: 0.7;
//   }
//   75% {
//     opacity: 0.8;
//   }
//   100% {
//     transform: translate(0%);
//     opacity: 0;
//     display: none;
//   }
// }
// @keyframes identifier2 {
//   0% {
//     transform: translate(0%, 400%);
//     opacity: 0;
//   }
//   25% {
//     opacity: 0.5;
//   }
//   50% {
//     opacity: 0.7;
//   }
//   75% {
//     opacity: 0.8;
//   }
//   100% {
//     transform: translate(0%);
//     opacity: 0;
//     display: none;
//   }
// }
// @keyframes identifier3 {
//   0% {
//     opacity: 0;
//   }
//   25% {
//     opacity: 0.5;
//   }
//   50% {
//     opacity: 0.7;
//   }
//   75% {
//     opacity: 0.8;
//   }
//   100% {
//     opacity: 0;
//   }
// }
.header {
  width: 200px;
  height: 200px;
  background: red;
  transform: rotate(45deg) scale(0.5);
  animation-name: hd;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: reverse;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  position: absolute;

  div {
    position: absolute;
    top: 0px;
    width: 200px;
    transform: translate(0%, 0%);
    // background-color: skyblue;
    // // left: 50%;
    // color: white;
    z-index: 1000;

    div {
      // position: absolute;
      top: 0px;
      width: 200px;
      // left: 50%;
      color: white;
      // z-index: 1001;
      // transform: scale(10);
      font-size: 20px;
      white-space: nowrap;
      // text-overflow: ellipsis;
      // overflow: hidden;
      animation: hd2 5s linear infinite;
    }
  }
}
@keyframes hd2 {
  0% {
    transform: translateX(-0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes hd {
  25% {
    transform: rotate(45deg) scale(1);
  }
  50% {
    transform: rotate(45deg) scale(0.5);
  }
  75% {
    transform: rotate(45deg) scale(1);
  }
}
.header::after {
  content: ' ';
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  transform: translateY(-100px);
  background: red;
  z-index: 10;
}
.header::before {
  content: ' ';
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  transform: translateX(-100px);
  background: red;
  z-index: 10;
}
</style>
