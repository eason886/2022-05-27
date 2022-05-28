<template>
  <el-card class="box-card" shadow="hover">
    <div class="layout">
      <div ref="chartsUi4"></div>
      <div ref="chartsUi3"></div>
      <div ref="chartsUi2"></div>

      <div ref="chartsUi1" style="height: 100%:width:100%"></div>
    </div>
  </el-card>
  <el-card class="box-card" shadow="hover"> <div ref="bottomUl" style="height: 400px; width: 100%"></div> </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// import { on } from 'element-plus/lib/utils'

const chartsUi1 = ref(null)

const chartsUi2 = ref(null)

const chartsUi3 = ref(null)

const chartsUi4 = ref(null)
const bottomUl = ref(null)
onMounted(() => {
  init1()
  init2()
  init3()
  init4()
  init5()
})
const init1 = () => {
  var myChart = echarts.init(chartsUi1.value)
  const option = {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          show: false
        }
      }
    },
    xAxis: [
      {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        show: false,
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          normal: {
            color: '#36a3f7',
            lineStyle: {
              width: 0
            }
          }
        },
        symbol: 'none',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  }
  option && myChart.setOption(option)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
}
const init2 = () => {
  var myChart = echarts.init(chartsUi2.value)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
  const option = {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          show: false
        }
      }
    },
    xAxis: [
      {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        show: false,
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          color: '#36a3f7',
          normal: {
            lineStyle: {
              width: 0
            }
          }
        },
        symbol: 'none',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  }
  option && myChart.setOption(option)
  window.onresize = function () {
    myChart.resize()
  }
}
const init3 = () => {
  var myChart = echarts.init(chartsUi3.value)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
  const option = {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          show: false
        }
      }
    },
    xAxis: [
      {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        show: false,
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          normal: {
            color: '#36a3f7',
            lineStyle: {
              width: 0
            }
          }
        },
        symbol: 'none',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  }
  option && myChart.setOption(option)
  window.onresize = function () {
    myChart.resize()
  }
}
const init4 = () => {
  var myChart = echarts.init(chartsUi4.value)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
  const option = {
    grid: {
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: false
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          show: false
        }
      }
    },
    xAxis: [
      {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        show: false,
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Email',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        itemStyle: {
          normal: {
            color: '#36a3f7',
            lineStyle: {
              width: 0
            }
          }
        },
        symbol: 'none',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  }
  option && myChart.setOption(option)
  window.onresize = function () {
    myChart.resize()
  }
}
const init5 = () => {
  var myChart = echarts.init(bottomUl.value)
  var option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  }
  option && myChart.setOption(option)
  window.onresize = function () {
    myChart.resize()
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
.layout {
  // background-color: red;
  width: 100%;
  height: 120px;
  display: flex;

  justify-content: space-between;
  > div {
    // background-color: skyblue;
    flex: 0 0 22%;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 1px 1px #f1f1f1;
  }
}
</style>
