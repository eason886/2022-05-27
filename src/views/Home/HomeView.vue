<template>
  <div style="width: 100%; height: 100%" id="container">
    <div ref="map2" style="width: 100%; height: 70%; overflow: hidden"></div>
    <div ref="map3" style="width: 100%; height: 30%; overflow: hidden"></div>

    <router-view></router-view>
  </div>
</template>

<script setup>
import 'echarts-liquidfill'
import * as echarts from 'echarts'
import china from '../json/china.json'
import { onMounted, ref } from 'vue'
echarts.registerMap('HK', china)
// onMounted(() => {
//   var map = new window.BMapGL.Map('container')
//   var point = new BMapGL.Point(116.331398, 39.897445)
//   map.centerAndZoom(point, 12)

//   var geolocation = new window.BMapGL.Geolocation()
//   geolocation.getCurrentPosition(function (r) {
//     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
//       var mk = new window.BMapGL.Marker(r.point)
//       map.addOverlay(mk)
//       map.panTo(r.point)
//       alert('您的位置：' + r.point.lng + ',' + r.point.lat)
//     } else {
//       alert('failed' + this.getStatus())
//     }
//   })
// })
const map2 = ref()
const map3 = ref()

let aa = '&copy;'
onMounted(() => {
  initEcharts3()
  initEcharts()
})
var option
const initEcharts = () => {
  var myChart = echarts.init(map2.value)
  option = {
    layoutCenter: ['70%', '59%'],
    title: {
      text: '',
      subtext: 'Data from Wikipedia',
      sublink: 'https://www.baidu.com'
    },
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        // console.log(params)
      }
    },
    grid: {
      top: 'middle'
    },
    visualMap: {
      min: 100,
      max: 200,
      show: false,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: (() => {
          return [1, 2, 3, 4, 5].map((item) => {
            let a = Math.floor(Math.random() * 226)
            let b = Math.floor(Math.random() * 226)
            let c = Math.floor(Math.random() * 226)
            return `rgba(${a},${b},${c})`
          })
        })()
      }
    },
    series: [
      {
        type: 'map',
        map: 'HK',
        geoIndex: 0,
        zoom: 1.2,
        // symbol: 'circle',
        //  symbolSize: 15,

        // label: {
        //   normal: {
        //     formatter: '{b}',
        //     position: 'top',
        //     show: true
        //   }
        // },

        data: (function (china) {
          return china.features.map((item) => {
            return { name: item.properties.name, value: Math.random() * 225 }
          })
        })(china),
        itemStyle: {
          // 图形上的地图区域
          normal: {
            areaColor: 'yellow',
            borderColor: 'rgba(43, 196, 243, 1)',
            borderWidth: 1
          },
          // normal: {
          //   borderWidth: 2, //边际线大小
          //   borderColor: '#00ffff', //边界线颜色
          //   areaColor: '#09295b' //默认区域颜色
          // },  // 这里是重点！！！
          regions: [
            {
              name: '南海诸岛',
              itemStyle: {
                // 隐藏地图
                normal: {
                  opacity: 0 // 为 0 时不绘制该图形
                }
              },
              label: {
                show: false // 隐藏文字
              }
            }
          ],

          emphasis: {
            // 高亮时

            // areaColor: 'red',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 10,
            borderWidth: 0,
            shadowColor: 'rgba(0, 93, 255, 0.2)'
          }
        }
      }
    ],
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
            // backgroundColor: 'red',
            textStyle: {
              color: 'yellow',
              fontSize: '8'
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
            areaColor: '#12225c', //背景色

            borderColor: '#5e84fd',
            borderWidth: 2,
            //  reaColor: '#013C62', //地区颜色
            shadowColor: '#182f68', //阴影颜色
            shadowOffsetX: 0, //阴影偏移量
            shadowOffsetY: 25 //阴影偏移量
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
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}

const initEcharts3 = () => {
  var myChart = echarts.init(map3.value)

  let option = {
    // 图表主标题
    title: {
      text: '', // 主标题文本，支持使用 \n 换行
      bottom: 60, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
      left: 'center', // 值: 'left', 'center', 'right' 同上
      textStyle: {
        // 文本样式
        fontSize: 18,
        color: '#fff'
      }
    },
    // 提示框组件
    tooltip: {
      // 触发类型, 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
      textStyle: {
        color: 'black' // 文字颜色
      }
      // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
      // 水球图: {a}（系列名称），{b}（无），{c}（数值）
      // 使用函数模板   传入的数据值 -> value: number|Array,
      // formatter: function (value) {
      //   console.log(value)
      //   return value.name
      // }
    },
    series: [
      {
        type: 'liquidFill',

        name: 'current', // 系列名称，用于tooltip的显示，legend 的图例筛选
        radius: '70%', // 水球图的半径
        center: ['50%', '50%'], // 水球图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
        // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
        // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
        shape: 'container',

        phase: 0, // 波的相位弧度 不设置  默认自动
        direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
        outline: {
          show: true,
          borderDistance: 10, // 边框线与图表的距离 数字
          itemStyle: {
            opacity: 1, // 边框的透明度   默认为 1
            borderWidth: 0, // 边框的宽度
            shadowBlur: 1, // 边框的阴影范围 一旦设置了内外都有阴影
            shadowColor: '#fff', // 边框的阴影颜色,'#134547'
            borderColor: '#33C9F0' // 边框颜色 '#134547'
          }
        },
        // 图形样式
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 1,
              color: 'skyblue'
            },
            {
              offset: 0,
              color: '#1593e7'
            }
          ]), // 水球显示的背景颜色
          opacity: 0.9, // 波浪的透明度
          shadowBlur: 10 // 波浪的阴影范围
        },
        backgroundStyle: {
          color: 'skyblue', // 水球未到的背景颜色
          opacity: 0.2
        },
        // 图形的高亮样式
        emphasis: {
          itemStyle: {
            color: 'yellow',
            opacity: 0.8 // 鼠标经过波浪颜色的透明度
          }
        },
        // 图形上的文本标签
        label: {
          color: 'yellow',
          position: ['50%', '50%'],
          show: false,
          normal: {
            show: false,
            position: ['50%', '100%'], // 设置标签显示的位置
            textStyle: {
              fontSize: 19, //修改字体大小
              fontWeight: 500,
              fontFamily: ' DINPro-Medium, DINPro'
            }
          }
        },
        data: [
          { name: '11', value: 0.72 },
          { name: '11', value: 0.22 },
          { name: '11', value: 0.82 },
          { name: '11', value: 0.22 }
        ] // 系列中的数据内容数组
      }
    ]
  }
  myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
</script>
<style lang="scss" scoped>
.header {
  width: 200px;
  height: 200px;
  background: red;
  transform: rotate(45deg) scale(0.5);
  animation-name: hd;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: reverse;
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
}
.header::before {
  content: ' ';
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  transform: translateX(-100px);
  background: red;
}
#container {
  background-image: url(../../assets/2.webp);
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
