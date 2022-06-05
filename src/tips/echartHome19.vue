<template>
  <div class="chart" id="main-19" ref="chart"></div>
</template>

<script setup>
import { defineProps, ref, onMounted, reactive, watch } from "vue";
import * as echarts from "echarts";
import chinaJSON from "../../static/json/geometryProvince/heiLongJiangMap.json";
// 基于准备好的dom，初始化echarts实例
import { BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

import { useRouter, useRoute } from "vue-router";
// import func from "../../../vue-temp/vue-editor-bridge";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

const chinaMap = ref();

const defineData = defineProps({
  data: {
    type: Array,
    required: true,
    default: [],
  },
});
const router = useRouter();
const route = useRoute();
const chart = ref(null);
var myChart;
onMounted(() => {
  // myChart = echarts.init(document.getElementById('main-12'))

  window.addEventListener("resize", () => {
    myChart.resize();
  });

  drawChina();
});

function drawChina() {
  myChart = echarts.init(chart.value);
  echarts.registerMap("china", chinaJSON); //注册可用地图
  var option = {
    geo: {
      show: true,
      //设置中心点
      center: [128.194115019531, 48.582111640625],
      map: "china",
      roam: false, //是否允许缩放，拖拽
      zoom: 3.7, //初始化大小
      //缩放大小限制
      scaleLimit: {
        min: 0.1, //最小
        max: 12, //最大
      },
      //各个省份模块样式设置
      itemStyle: {
        normal: {
          areaColor: "#12225c", //背景色
          color: "red", //字体颜色
          borderColor: "#5e84fd",
          borderWidth: 2,
          reaColor: "#013C62", //地区颜色
          shadowColor: "#182f68", //阴影颜色
          shadowOffsetX: 0, //阴影偏移量
          shadowOffsetY: 25, //阴影偏移量
        },
      },
      //高亮状态
      emphasis: {
        itemStyle: {
          areaColor: "#1774d4",
        },
        label: {
          show: true,
          color: "#fff",
        },
      },
      // 显示层级
      z: 10,
    },
    series: series,
  };
  myChart.setOption(option);
}
// 中国地理坐标图
var chinaGeoCoordMap = {
  广西: [108.320004, 22.82402],
  哈尔滨市: [127.642464, 45.756967],
  齐齐哈尔市: [122.95792, 47.342081],
  大庆市: [125.11272, 46.590734],
  鹤岗市: [130.277487, 47.932085],
  佳木斯市: [130.361634, 46.809606],
  牡丹江市: [129.618602, 44.582962],
  七台河市: [131.015584, 45.771266],
  伊春市: [129.899396, 48.724775],
  大兴安岭地区: [124.711526, 52.335262],
  黑河市: [127.499023,50.249585],
  绥化市: [126.99293,46.637393],
  双鸭市: [131.157304,46.643442],
  鸡西市: [130.975966,45.300046],
};

//发射点
var chinaDatas = [
  [{ name: "哈尔滨市", value: defineData.data[0].value }],
  [{ name: "齐齐哈尔市", value: defineData.data[1].value }],
  [{ name: "牡丹江市", value: defineData.data[2].value }],
  [{ name: "佳木斯市", value: defineData.data[3].value }],
  [{ name: "大庆市", value: defineData.data[4].value }],
  [{ name: "绥化市", value: defineData.data[5].value }],
  [{ name: "双鸭市", value: defineData.data[7].value }],
  [{ name: "黑河市", value: defineData.data[8].value }],
  [{ name: "伊春市", value: defineData.data[9].value }],
  [{ name: "鸡西市", value: defineData.data[10].value }],
  [{ name: "鹤岗市", value: defineData.data[11].value }],
  [{ name: "大兴安岭地区", value: defineData.data[12].value }],
  [{ name: "七台河市", value: defineData.data[13].value }],
];

//投射点
const scatterPos = [126.642464, 45.756967];
// 数据转换
var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var fromCoord = chinaGeoCoordMap[dataItem[0].name];
    var toCoord = scatterPos;
    if (fromCoord && toCoord) {
      res.push([
        {
          coord: fromCoord,
          value: dataItem[0].value,
        },
        {
          coord: toCoord,
        },
      ]);
    }
  }
  return res;
};

var series = [];
// [["哈尔滨市", chinaDatas]].forEach(function (item, i) {
[["广西", chinaDatas]].forEach(function (item, i) {
  series.push(
    //设置指向箭头信息
    {
      type: "lines",
      zlevel: 2,
      effect: {
        show: false,
        period: 4, //箭头指向速度，值越小速度越快
        trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: "arrow", //箭头图标
        symbolSize: 8, //图标大小
      },
      lineStyle: {
        normal: {
          show: false,
          color: "transparent", //指向线的颜色
          width: 1, //尾迹线条宽度
          opacity: 1, //尾迹线条透明度
          curveness: 0.3, //尾迹线条曲直度
        },
      },
      data: convertData(item[1]),
    },
    // 发射点位置涟漪等效果
    {
      type: "effectScatter",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        //涟漪特效
        period: 4, //动画时间，值越小速度越快
        brushType: "stroke", //波纹绘制方式 stroke, fill
        scale: 4, //波纹圆环最大限制，值越大波纹越大
      },
      label: {
        normal: {
          show: true,
          position: "right", //显示位置
          offset: [-20, 0], //偏移设置
          formatter: function (params) {
            // console.log(params);
            //圆环显示文字
            return (
              "\n\n\n" + params.data.name + "\n" + params.data.value[2] + "所"
            );
          },
          fontSize: 12,
          color:'#ffffff'
        },
        emphasis: {
          show: true,
        },
      },
      symbol: "circle",
      symbolSize: function (val) {
        return 5 + val[2] * 5; //圆环大小
      },
      itemStyle: {
        normal: {
          show: false,
          color: "#dcd465",
        },
      },
      symbolSize: 5, //圆圈大小
      data: item[1].map(function (dataItem) {
        return {
          name: dataItem[0].name,
          value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]),
        };
      }),
    },
    //被攻击点
    {
      type: "effectScatter",
      coordinateSystem: "geo",
      zlevel: 2,
      rippleEffect: {
        //涟漪相关
        period: 2,
        brushType: "stroke",
        scale: 5,
      },
      label: {
        normal: {
          show: true,
          position: "right",
          color: "#0f0",
          formatter: "{b}",
          textStyle: {
            color: "#fff",
            fontSize: 12,
          },
        },
        emphasis: {
          show: true,
          color: "#f60",
        },
      },
      itemStyle: {
        normal: {
          color: "#dcd465", //黑龙江圆点颜色
        },
      },
      symbol: "circle",
      symbolSize: 10, //圆圈大小
      data: [
        {
          name: item[0],
          value: chinaGeoCoordMap[item[0]].concat([10]),
        },
      ],
    }
  );
});
console.log(defineData.data);
/* watch(
  () => defineData.data,
  (newVal, oldVal) => {
    // console.log('newVal',newVal);
    if (newVal && newVal[0]) {
      
      // console.log("1222224", defineData.data);
      myChart.setOption({
        
      });
    }
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
); */
</script>

<style scoped>
.chart {
  width: 100%;
  height: 150%;
  z-index: 999;
}
</style>