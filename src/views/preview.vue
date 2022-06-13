<template>
  <div class="big">
    <el-button size="small" type="primary" @click="goPreview">default docx</el-button>
    <el-button ref="wordView" size="small" type="primary" @click="goPreview1">预览文件doc</el-button>
    <el-button size="small" type="primary" @click="goPreview2">预览文件pdf</el-button>
    <div ref="file" style="width：100%；height：100%"></div>

    <!--doc 配合外网地址即可访问doc预览-->
    <!-- <iframe style="width: 100%; height: 100%" :src="'https://view.officeapps.live.com/op/view.aspx?src=https://127.0.0.1:8080//预览do.doc'" frameborder="0"></iframe> -->
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import axios from 'axios'

// import docx from 'docx-preview'
const docx = require('docx-preview')
// const pdf = require('vue-pdf')
// const mammoth = require('mammoth')
// import pdf from 'vue-pdf'
const file = ref(null)
const wordView = ref(null)
onMounted(() => {
  // sc.value = document.querySelector('.cal-backgound-size-width').clientWidth / document.querySelector('.cal-backgound-size-width').clientHeight
  // // document.querySelector('.cal-backgound-size-width').children[0].style.transform = `scale(${sc.value.toFixed(2)})`
  // document.querySelector('.cal-backgound-size-width').style.transform = `scale(${sc.value.toFixed(2)})`
  goPreview()
  // console.log(sc.value)
})
const goPreview = () => {
  // window.open('/出师表.docx', '_blank')
  axios({
    method: 'get',
    responseType: 'blob', // 因为是流文件，所以要指定blob类型
    url: '/出师表.docx' // 自己的服务器，提供的一个word下载文件接口
  }).then(({ data }) => {
    console.log(data) // 后端返回的是流文件
    docx.renderAsync(data, file.value) // 渲染到页面
  })
}
const goPreview1 = () => {
  window.open('/预览do.doc', '_blank')
  // 请求文件流，本地文件参考文档
}
// const xhr = new XMLHttpRequest()
// xhr.open('get', '/人员简历表--前端开发--尹森.doc', true)
// xhr.responseType = 'arraybuffer'
// xhr.onload = function () {
//   if (xhr.status == 200) {
// mammoth.convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) }).then(function (resultObject) {
//   document.querySelector('#wordView').innerHTML = resultObject.value
// })
// }
// }
// xhr.send()

const goPreview2 = () => {
  window.open('/迅捷PDF编辑器v2.0使用手册.pdf')
  // 请求文件流，本地文件参考文档

  //   console.log(data) // 后端返回的是流文件
  //   // mammoth.convertToHtml().then(function (resultObject) {
  //   //   document.querySelector('#wordView').innerHTML = resultObject.value
  //   // })
  //   mammoth.convertToHtml({ arrayBuffer: new Uint8Array(data) }).then(function (resultObject) {
  //     // document.querySelector("#wordView").innerHTML =
  //     //   resultObject.value;
  //     vm.vHtml = resultObject.value
  //   })

  // const xhr = new XMLHttpRequest()
  // xhr.open('get', '/人员简历表--前端开发--尹森.doc', true)
  // xhr.responseType = 'arraybuffer'
  // xhr.onload = function () {
  //   if (xhr.status == 200) {
  // mammoth.convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) }).then(function (resultObject) {
  //   document.querySelector('#wordView').innerHTML = resultObject.value
  // })
  // }
  // }
  // xhr.send()
}
nextTick(() => {})
</script>

<style lang="scss" scoped>
.big {
  width: 100%;
  height: 100%;

  div:nth-last-child(1) {
    // background: red;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
::v-deep .docx-wrapper {
  background: rgba(0, 0, 0, 0.8);
}
.cal-backgound-size-width {
  img {
    height: 100%;
    width: 100%;

    object-fit: fill;
  }
}

.cal-backgound-size-height {
  background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fbfb5e57bc33c594970cc342326b1bff084bb1b88250b-rkzmT4_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657701611&t=221c0e7e3980550fe90f2eacbf43ed05')
    no-repeat;

  background-size: 100% auto;
}
</style>
