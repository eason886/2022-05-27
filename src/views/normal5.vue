<template>
  <div class="out">
    <div class="left">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card" shadow="hover">
            <el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList" :initial-index="4" fit="cover" />
          </el-card>
        </el-col>
        <!-- <el-col :span="16">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card class="box-card" shadow="hover">
            <el-carousel height="150px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small justify-center" text="2xl">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </el-card>
        </el-col>
        <!-- <el-col :span="16">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col> -->
      </el-row>
    </div>
    <div class="right">
      <el-row v-loading="true" element-loading-text="Loading..." :element-loading-spinner="svg" element-loading-svg-view-box="-10, -10, 50, 50" element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-col :span="24">
          <el-card class="box-card" shadow="hover"> </el-card>
        </el-col>
        <!-- <el-col :span="16">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col> -->
      </el-row>
    </div>
  </div>
  <!-- <el-row :gutter="20">
    <el-col :span="16">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card" shadow="hover"> </el-card>
    </el-col>
  </el-row> -->
</template>

<script setup>
const url = 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]
const tableData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }
]
</script>

<style lang="scss" scoped>
.out {
  display: flex;
  height: 100%;
  .left {
    flex: 2;
    // background-color: red;
    margin-right: 20px;
  }
  .right {
    // background-color: red;
    flex: 1.2;
  }
}
.el-row {
  margin-bottom: 20px;
}
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.right .el-row {
  height: 100%;
}
.el-card {
  height: 100%;
}
</style>
