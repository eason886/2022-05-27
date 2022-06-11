<template>
  <div id="login">
    <audio id="success" ref="musickref" autoplay :src="musick" loop />
    <!-- <div class="box"></div> -->
    <div class="middle" @click="playmusickref()">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm" size="normal">
        <el-form-item>
          <span>个人博客系统</span>
        </el-form-item>
        <el-form-item label="用户名" prop="account">
          <el-input v-model="ruleForm.account" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
          <el-button type="primary" @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import $ from 'jquery'
import { reactive, ref, onMounted, resolveComponent } from 'vue'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'
const ruleFormRef = ref()
const musickref = ref()
const musick = require('../assets/audio/Ash - Melody (旋律)(Original Mix).mp3')
const router = useRouter()
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const playmusickref = (e) => {
  console.log(e)
  // const curMusic = document.querySelector('#success')
  // curMusic.play()
  //console.log(curMusic)
  // e.target.play()
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: '',
  account: ''
})

const rules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  account: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('我')
      console.log('submit!')
      const ruleForm2 = {
        pass: md5(ruleForm.pass),
        account: ruleForm.account
      }
      window.localStorage.setItem('flag', JSON.stringify(ruleForm2))
      router.push('/')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const Spiecoal = () => {
  var img
  function startSakura() {
    window.requestAnimationFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame
      // function (callback) {
      //   window.setTimeout(callback, 1000 / 60)
      // }
      //  / )
    })()

    // 定义canvas画布
    var canvas = document.createElement('canvas')
    var cxt

    // 初始化canvas画布
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;background:transparent')
    canvas.setAttribute('id', 'canvas_sakura')
    document.getElementById('login').appendChild(canvas)

    // 获取canvas画布上下文 提供在画布上绘图的方法和属性
    cxt = canvas.getContext('2d')
    // cxt.save()
    img = new Image()
    img.src = require('../assets/画板 2 (1).png')

    // var stop = requestAnimationFrame(function () {
    //   cxt.clearRect(0, 0, canvas.width, canvas.height) // 清空画布
    //   sakuraList.draw(cxt) // 绘制
    //   stop = requestAnimationFrame(arguments.callee) // 递归重绘
    // })

    // 在startSakura方法上加上
    // drawImage(image, sx, sy, swidth, sheight, x, y, width, height)
    // cxt.drawImage(img, 0, 0, 40, 40)
    function Sakura(x, y, s) {
      this.x = x // x轴坐标
      this.y = y // y轴随机坐标
      this.s = s // sakura大小
    }
    // 单花瓣 类
    function Sakura(x, y, s, r) {
      this.x = x // x轴坐标
      this.y = y // y轴随机坐标
      this.s = s // sakura大小
      this.r = r
    }

    Sakura.prototype.draw = function (cxt) {
      var xc = (40 * this.s) / 4
      // cxt.restore()
      cxt.save()
      // 画布平移
      cxt.translate(200, 200)
      cxt.restore()
      // drawImage(图像源，图像x坐标，图像y坐标，宽度， 高度)
      cxt.drawImage(img, this.x, this.y, xc, xc)
      // cxt.save() // 保存先前的状态
      // cxt.save()

      // 恢复之前保存的状态
    }
    Sakura.prototype.update = function () {
      this.x = getRandomx(this.x, this.y)
      this.y = getRandomy(this.y, this.y)
      this.r = getRandomr(this.r)
      if (
        // 判断是否超出边界
        this.x > window.innerWidth ||
        this.x < 0 ||
        this.y > window.innerHeight ||
        this.y < 0
      ) {
        // 如果超出边界 则重新生成随机坐标
        this.r = getRandom('fnr')
        if (Math.random() > 0.4) {
          // 如果随机值大于0.4 则重新生成x轴随机坐标
          this.x = getRandom('fnx')
          this.y = 0
          this.s = getRandom('fns')
          this.r = getRandom('fnr')
        } else {
          // 如果随机值小于0.4 则重新生成y轴随机坐标
          this.x = window.innerWidth
          this.y = getRandom('fny')
          this.s = getRandom('fns')
          this.r = getRandom('fnr')
        }
      }
    }

    // 多花瓣 类
    var SakuraList = function () {
      this.list = []
    }

    SakuraList.prototype.push = function (sakura) {
      this.list.push(sakura)
    }

    // 多个单瓣 组成 一组花瓣
    SakuraList.prototype.draw = function (cxt) {
      for (var i = 0, len = this.list.length; i < len; i++) {
        this.list[i].update()
        this.list[i].draw(cxt)
        // console.log(this.list[i])
      }
    }
    var sakuraList = new SakuraList()
    get()
    function get() {
      for (var i = 0; i < 200; i++) {
        // x轴随机 y轴随机 大小不变
        var sakura, randomX, randomY, randomS, randomR
        randomX = getRandom('fnx')
        randomY = getRandom('fny')
        randomR = getRandom('fnr')
        randomS = getRandom('fns')
        sakura = new Sakura(randomX, randomY, randomS, randomR)
        sakuraList.push(sakura)

        // sakuraList.push(sakura)
      }
    }

    // function getRandom(option) {
    //   var ret, random;
    //   switch (option) {
    //     case "x":
    //       // x轴随机坐标
    //       ret = Math.random() * window.innerWidth;
    //       break;
    //     case "y":
    //       // y轴随机坐标
    //       ret = Math.random() * window.innerHeight;
    //       break;
    //     case "s":
    //       // sakura大小
    //       ret = Math.random();
    //       break;
    //     case "r":
    //       // sakura旋转角度
    //       ret = Math.random() * 6;
    //       break;
    //   }
    //   return ret;
    // };
    function getRandomx() {
      return Math.random() * Math.random() * window.innerWidth
    }
    function getRandomy() {
      return Math.random() * Math.random() * window.innerHeight
    }
    function getRandomr() {
      return Math.random() * 0.03
    }
    function getRandom(option) {
      var ret, random
      switch (option) {
        case 'fnx':
          // x轴随机函数
          random = -0.5 + Math.random() * 1
          ret = (function (x, y) {
            return x + 0.5 * random - 1.7
          })(getRandomx(), getRandomy())
          break
        case 'fny':
          // y轴随机函数
          random = 1.5 + Math.random() * 0.7
          ret = (function (x, y) {
            return y + random
          })(getRandomx(), getRandomy())
          break
        case 'fnr':
          // r轴随机函数
          random = Math.random() * 0.03
          ret = (function (r) {
            return r + random
          })(getRandomr())
          break
        case 'fns':
          ret = Math.random()
      }
      return ret
    }

    console.log(sakuraList, 174)
    sakuraList.draw(cxt) // 绘制
    // window.setInterval(() => {
    //   cxt.clearRect(0, 0, canvas.width, canvas.height) // 清空画布
    //   get()
    //   sakuraList.draw(cxt) // 绘制
    // }, 1000)
    // console.log(requestAnimationFrame, 259)
    // var arment
    let startTimer1, endTimer1
    window.requestAnimationFrame(function render(timeStamp) {
      // console.log(timeStamp)
      startTimer1 = timeStamp

      // console.log(timeStamp, Date.now())
      cxt.clearRect(0, 0, canvas.width, canvas.height) // 清空画布
      // get()
      sakuraList.draw(cxt) // 绘制
      // if (newTimer < 2000) {
      setTimeout(() => {
        window.requestAnimationFrame(render)
      }, 150) // 递归重绘
      // }
    })
  }
  startSakura()
  img.onload = function () {
    startSakura()
  }

  // startSakura()
}
onMounted(() => {
  Spiecoal()

  window.onload = () => {
    const curMusic = document.querySelector('#success')
    // document.body.addEventListener('keyup', () => {
    //   console.log('zhing')
    //   curMusic.play()
    //   console.log('zhing')
    // })
    document.body.addEventListener('click', () => {
      console.log('zhing')
      curMusic.play()
    })
    curMusic.addEventListener('play', () => {
      curMusic.muted = false
    })

    // new Promise((resolve, reject) => {
    //   const curMusic = document.querySelector('#success')
    //   resolve(curMusic)
    // }).then((res) => {
    //   res.play()
    // })
    //
    // setTimeout(() => {
    //   document.body.click()
    // }, 3000)
  }
})
</script>

<style lang="scss" scoped>
#login {
  background: #fff;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  background-image: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2FO1CN01ifLuw32Hw44pslJia_%21%211117969214-0-cib.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657483195&t=3054eee5301474f62da28e5e87185798);
  z-index: 100;
  // background-repeat: no-repeat;
  background-size: cover;
  .middle {
    position: absolute;
    border-radius: 10px;
    width: 400px;
    height: 300px;
    background-color: rgba(225, 225, 225, 0.8);
    filter: blur(0.2px);
    // -webkit-backdrop-filter: blur(10px);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.el-button {
  background-color: skyblue;
  border: none;
}
::v-deep .el-form {
  // width: 100%;
  // position: absolute;
  .el-form-item__label {
    width: 80px !important;
    color: white;
  }
  .el-form-item {
    width: 300px;
  }
  .el-form-item:nth-of-type(1) {
    span {
      color: white;
      letter-spacing: 1px;
      font-family: FangSong;
      font-weight: bold;
      font-size: 25px;
    }
    .el-form-item__content {
      margin-left: 0px !important;
      display: flex;
      justify-content: center;
    }

    // font-style: italic;
  }

  .el-form-item:nth-last-child(1) {
    margin-bottom: 0;
  }
  .el-form-item__label {
    justify-content: flex-start;
  }
  .el-form-item:nth-last-child(1) .el-form-item__content {
    margin-left: 80px !important;
  }
  .el-input__wrapper {
    background: none;
  }
  .el-input__inner {
    background: transparent !important;
    -webkit-text-fill-color: #ededed !important;

    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;

    background-color: transparent;

    background-image: none;

    transition: background-color 50000s ease-in-out 0s;
  }
}
canvas {
  background-color: #fff;
}
li {
  list-style: none;
}
.box {
  width: 200px;
  height: 200px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  position: absolute;
  left: 42%;
  top: 45%;
  transform: translate(-50%, -50%);
  -webkit-transform-style: preserve-3d;
  -webkit-transform: rotateX(13deg);
  -webkit-animation: move 5s linear infinite;
}
.minbox {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50px;
  top: 30px;
  -webkit-transform-style: preserve-3d;
}
.minbox li {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
.minbox li:nth-child(1) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: translateZ(50px);
}
.minbox li:nth-child(2) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateX(180deg) translateZ(50px);
}
.minbox li:nth-child(3) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateX(-90deg) translateZ(50px);
}
.minbox li:nth-child(4) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateX(90deg) translateZ(50px);
}
.minbox li:nth-child(5) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateY(-90deg) translateZ(50px);
}
.minbox li:nth-child(6) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateY(90deg) translateZ(50px);
}
.maxbox li:nth-child(1) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: translateZ(50px);
}
.maxbox li:nth-child(2) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: translateZ(50px);
}
.maxbox li:nth-child(3) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateX(-90deg) translateZ(50px);
}
.maxbox li:nth-child(4) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateX(90deg) translateZ(50px);
}
.maxbox li:nth-child(5) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateY(-90deg) translateZ(50px);
}
.maxbox li:nth-child(6) {
  background: url(https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F98f05fafaa81029e4c225d88d9227633697f71e4.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657462619&t=75f2e8c24655ef47112dbb547ac055c4)
    no-repeat 0 0;
  -webkit-transform: rotateY(90deg) translateZ(50px);
}
#success {
  position: absolute;
  z-index: 100;
}
</style>
