<template>
  <div class="chart" @click.stop="toEmits()" id="main-18" ref="chart"></div>
</template>

<script setup>
import { defineProps, ref, onMounted, reactive, watch } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from '../../static/json/china.json'
// 基于准备好的dom，初始化echarts实例
import { BarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent } from 'echarts/components'
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import { stuToDistribution } from '@/api/count'
import { useRouter, useRoute } from 'vue-router'
// import func from "../../../vue-temp/vue-editor-bridge";

import axios from 'axios'

// 注册必须的组件
echarts.use([TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, BarChart, LabelLayout, UniversalTransition, CanvasRenderer])

const chinaMap = ref()

const defineData = defineProps({
  data: {
    type: Array,
    required: true,
    default: []
  }
})

var tempData = ref([])
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
} from '../../utils/map'
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

const router = useRouter()
const route = useRoute()
//1、暴露内部数据
const emits = defineEmits(['childFn'])
const chart = ref(null)

var timeFn = null
const flag = ref(false)

const toEmits = () => {
  console.log('我点击了')
  flag.value = false
  //添加一个返回按键
  $('<div class="back">返回中国地图</div>').appendTo($('#main-18'))
  //给返回按键设置样式
  $('.back').css({
    position: 'absolute', //绝对地位
    left: '65%', //设置位置
    top: '30.5%', //设置位置
    color: '#2271a7', //设置字体颜色
    'font-size': '16px', //设置字体大小
    cursor: 'pointer', //变小手
    'font-weight': 'bold'
    // display:'none'
  })
  //设置返回按钮的点击事件
  $('.back').click(function (event) {
    event.stopPropagation()

    //地图重新设置为中国地图
    // echarts.registerMap("china", chinaJSON)
    console.log('我返回了')
    flag.value = true
    $('<div class="back"></div>').appendTo($('#main-18'))
    //隐藏按钮
    $('.back').css({
      opacity: 0,
      display: 'none',
      color: 'rgba(255,255,255,0)' //设置字体颜色
    })
    //绘制地图
    drawChina()
  })
}

var myChart
onMounted(() => {
  // myChart = echarts.init(document.getElementById('main-12'))

  window.addEventListener('resize', () => {
    myChart.resize()
  })

  drawChina()

  //圆环的点击事件
  myChart.on('click', function (param) {
    // myChart.off("click"); // 这里很重要 ，防止重复点击事件！！！
    console.log('2次')
    // 制造数据才能渲染
    let count = []
    //1、暴露内部数据
    // const emits = defineEmits(["childFn"]);

    //2、触发父组件中暴露的childFn方法并携带数据
    emits('childFn', param.name)
    //实习流向
    stuToDistribution({
      status: '2',
      level: '',
      batchId: '2021-2022学年',
      praProvince: param.name
    }).then((data) => {
      if (data.code === 200) {
        let list = {
          name: [],
          v1: []
        }
        let cclist = data.data
        // console.log("list13", cclist);
        for (let i = 0; i < cclist.length; i++) {
          list.name.push(cclist[i].name)
          list.v1.push(cclist[i].value)
        }
        defineData.data = list
        // console.log("实习生2", defineData.data);
        tempData.value = list

        for (var i = 0; i < tempData.value.name.length; i++) {
          count.push({
            name: tempData.value.name[i] || '',
            value: tempData.value.v1[i] || 0
          })
        }
      }
      var chooseName = [
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
      ]

      chooseName = mapJson.filter((item) => {
        //我们根据名字来判断是否选择一种
        return item.name == param.name
      })
      // console.log(chooseName, "json");
      // axios.get(chooseName[0].json).then((res) => {
      const getJson = chooseName[0].json
      // console.log(xiZangMap, "省");

      echarts.registerMap(param.name, getJson)

      chinaDatas = []
      chinaGeoCoordMap = []
      var option1 = {
        geo: {
          show: true,
          //设置中心点
          center: xiZangMap.features[0].properties.center,
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
              color: '#ffffff',
              formatter: function (params) {
                var total = 0
                var target
                var name
                target = 0

                for (var i = 0; i < count.length; i++) {
                  name = params.name
                  if (count[i].name === params.name) {
                    name = count[i].name
                    target = count[i].value
                  }
                }
                if (flag.value == false) {
                  return name + '\n' + target + '人'
                } else {
                  return ''
                }
              }
            },

            emphasis: {
              show: true
            }
          },
          //各个省份模块样式设置
          itemStyle: {
            normal: {
              areaColor: '#12225c', //背景色
              color: 'red', //字体颜色
              borderColor: '#5e84fd',
              borderWidth: 2,
              reaColor: '#013C62', //地区颜色
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
          // 显示层级
          z: 11
        },
        series: series2
      }
      myChart.setOption(option1)
    })
    // console.log("1222224", defineData.data);
  })
})
function drawChina() {
  myChart = echarts.init(chart.value)
  echarts.registerMap('china', chinaJSON) //注册可用地图
  var option = {
    geo: {
      show: true,
      //设置中心点
      center: [105.194115019531, 35.582111640625],
      map: 'china',
      roam: false, //是否允许缩放，拖拽
      zoom: 1.7, //初始化大小
      //缩放大小限制
      scaleLimit: {
        min: 0.1, //最小
        max: 12 //最大
      },
      //各个省份模块样式设置
      itemStyle: {
        normal: {
          areaColor: '#12225c', //背景色
          color: 'red', //字体颜色
          borderColor: '#5e84fd',
          borderWidth: 2,
          reaColor: '#013C62', //地区颜色
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
      // 显示层级
      z: 10
    },
    series: series
  }
  myChart.setOption(option)
}

// 中国地理坐标图
var chinaGeoCoordMap = {
  黑龙江: [126.642464, 45.756967],
  西藏: [91.140856, 29.645554],
  青海: [98.778916, 36.623178],
  四川: [104.065735, 30.659462],
  云南: [102.712251, 25.040609],
  湖南: [112.982279, 28.19409],
  山东: [117.000923, 36.675807],
  河南: [113.665412, 34.757975],
  北京: [116.405285, 39.904989],
  浙江: [120.153576, 30.287459],
  江苏: [118.767413, 32.041544],
  吉林: [125.3245, 43.886841],
  辽宁: [123.429096, 41.796767],
  天津: [117.190182, 39.125596],
  上海: [121.472644, 31.231706],
  河北: [114.502461, 38.045474],
  福建: [118.767413, 26.075302],
  内蒙: [111.670801, 40.818311],
  贵州: [106.713478, 26.578343],
  安徽: [117.283042, 31.86119],
  海南: [110.33119, 20.031971],
  江西: [115.892151, 28.676493],
  湖北: [114.298572, 30.584355],
  陕西: [108.948024, 34.263161],
  甘肃: [103.823557, 36.058039],
  广西: [108.320004, 22.82402],
  西藏: [91.132212, 29.660361],
  重庆: [106.504962, 29.533155],
  新疆: [87.617733, 43.792818],
  宁夏: [106.278179, 38.46637]
}
//发射点
var chinaDatas = [
  [{ name: '西藏', value: 2 }],
  [{ name: '青海', value: 2 }],
  [{ name: '四川', value: 2 }],
  [{ name: '云南', value: 2 }],
  [{ name: '湖南', value: 2 }],
  [{ name: '山东', value: 2 }],
  [{ name: '河南', value: 2 }],
  [{ name: '北京', value: 2 }],
  [{ name: '浙江', value: 2 }],
  [{ name: '江苏', value: 2 }],
  [{ name: '吉林', value: 2 }],
  [{ name: '辽宁', value: 2 }],
  [{ name: '天津', value: 2 }],
  [{ name: '上海', value: 2 }],
  [{ name: '河北', value: 2 }],
  [{ name: '福建', value: 2 }],
  [{ name: '贵州', value: 2 }],
  [{ name: '安徽', value: 2 }],
  [{ name: '海南', value: 2 }],
  [{ name: '江西', value: 2 }],
  [{ name: '湖北', value: 2 }],
  [{ name: '陕西', value: 2 }],
  [{ name: '甘肃', value: 2 }],
  [{ name: '广西', value: 2 }],
  [{ name: '西藏', value: 2 }],
  [{ name: '重庆', value: 2 }],
  [{ name: '新疆', value: 2 }],
  [{ name: '宁夏', value: 2 }]
]
//投射点
const scatterPos = [126.642464, 45.756967]
// 数据转换
var convertData = function (data) {
  var res = []
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i]
    var fromCoord = chinaGeoCoordMap[dataItem[0].name]
    var toCoord = scatterPos
    if (fromCoord && toCoord) {
      res.push([
        {
          coord: fromCoord,
          value: dataItem[0].value
        },
        {
          coord: toCoord
        }
      ])
    }
  }
  return res
}

var series = []
// [["黑龙江", chinaDatas]].forEach(function (item, i) {
;[['黑龙江', chinaDatas]].forEach(function (item, i) {
  series.push(
    //设置指向箭头信息
    {
      type: 'lines',
      zlevel: 2,
      effect: {
        show: false,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', //箭头图标
        symbolSize: 8 //图标大小
      },
      lineStyle: {
        normal: {
          color: '#d4cf68', //指向线的颜色
          width: 1, //尾迹线条宽度
          opacity: 1, //尾迹线条透明度
          curveness: 0.3 //尾迹线条曲直度
        }
      },
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
          show: true,
          position: 'right', //显示位置
          offset: [-20, 0], //偏移设置
          formatter: function (params) {
            //圆环显示文字
            return '\n\n\n' + params.data.name
          },
          fontSize: 12,
          color: '#ffffff'
        },
        emphasis: {
          show: true
        }
      },
      symbol: 'circle',
      symbolSize: function (val) {
        return 5 + val[2] * 5 //圆环大小
      },
      itemStyle: {
        normal: {
          show: false,
          color: '#dcd465'
        }
      },
      symbolSize: 5, //圆圈大小
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[0].name,
          value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
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
      label: {
        normal: {
          show: true,
          position: 'right',
          color: '#0f0',
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
          color: '#dcd465' //黑龙江圆点颜色
        }
      },
      symbol: 'circle',
      symbolSize: 10, //圆圈大小
      data: [
        {
          name: item[0],
          value: chinaGeoCoordMap[item[0]].concat([10])
        }
      ]
    }
  )
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 150%;
  /* border: 1px solid red; */
  z-index: 999;
}
</style>
