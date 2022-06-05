<template>
  <div id="login">
    <div class="middle">
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'
const ruleFormRef = ref()
const router = useRouter()
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
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
</script>

<style lang="scss" scoped>
#login {
  height: 100%;

  height: 100%;
  background-image: url(../assets/6.webp);
  background-repeat: no-repeat;
  background-size: cover;
  .middle {
    position: absolute;
    width: 400px;
    height: 300px;
    //  background-color: #fff;
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
  width: 100%;
  .el-form-item__label {
    width: 80px !important;
    color: white;
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
</style>
