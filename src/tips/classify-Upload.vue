<template>
  <el-dialog
    title="上传文件"
    :close-on-click-modal="false"
    @close="closeHandle"
    :visible.sync="commonUploadvisible"
  >
    <el-upload
      drag
      :action="url"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
      :headers="headers"
      :data="{ namespace: paramsnamespace }"
      multiple
      :file-list="fileList"
      style="text-align: center"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只支持.xlsx. xls格式的文件！</div>
    </el-upload>
  </el-dialog>
</template>

<script>
import local from '@/local/loacl'
export default {
  data() {
    return {
      commonUploadvisible: false,
      paramsnamespace: '',
      url: this.HOST + '/dict/classify/import',
      num: 0,
      successNum: 0,
      fileList: [],
      headers: {
        token: JSON.parse(local.get('Token'))
      }
    }
  },
  props: {
    classifyUploadFlag: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    classifyUploadFlag: {
      handler() {
        console.log(this.classifyUploadFlag, 54)
        this.commonUploadvisible = this.classifyUploadFlag.flag
        this.paramsnamespace = this.classifyUploadFlag.namespace
      },
      deep: true
    }
  },

  methods: {
    // 上传之前
    beforeUploadHandle(file) {
      const extension = file.name.split('.')[1] === 'xls'

      const extension2 = file.name.split('.')[1] === 'xlsx'

      const isLt2M = file.size / 1024 / 1024 < 10

      if (!extension && !extension2) {
        this.$message.error('上传模板只能是 xls、xlsx格式!')
      }

      if (!isLt2M) {
        this.$message.error('上传模板大小不能超过 10MB!')
      }
      this.num++
      return extension || extension2
    },
    // 上传成功
    successHandle(response, file, fileList) {
      this.fileList = fileList
      this.successNum++
      // response &&

      console.log(response, file, fileList)
      if (response.code === 1000) {
        if (this.num === this.successNum) {
          this.$confirm('操作成功, 是否继续操作?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(() => {
            this.$emit('refreshDataUpload', false)
          })
        }
      } else if (response.code === 0) {
        this.$message.error(response.message)
      }
    },
    // 弹窗关闭时
    closeHandle() {
      this.fileList = []
      this.$emit('refreshDataUpload', false)
    }
  }
}
</script>
