<template>
  <div class="out">
    <div class="left">
      <el-row>
        <el-col :span="24">
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div>个人论坛</div>
            </template>
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
            <el-table :data="tableData" style="width: 100%" max-height="220px">
              <el-table-column fixed prop="date" label="Date"></el-table-column>
              <el-table-column prop="name" label="Name"></el-table-column>
              <el-table-column prop="state" label="State"></el-table-column>
              <el-table-column prop="city" label="City"></el-table-column>
              <el-table-column prop="address" label="Address"></el-table-column>
              <el-table-column prop="zip" label="Zip"></el-table-column>
              <el-table-column fixed="right" label="Operations">
                <template #default>
                  <el-button text size="small" @click="handleClick">Detail</el-button>
                  <el-button text size="small">Edit</el-button>
                </template>
              </el-table-column>
            </el-table>
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
import { reactive } from 'vue'
const url = 'https://pics3.baidu.com/feed/a8ec8a13632762d0e984c674694de6f2533dc6e9.jpeg?token=803c2a52b1d7b2fd0972f93b6af7a656'
const srcList = [
  'https://pics3.baidu.com/feed/a8ec8a13632762d0e984c674694de6f2533dc6e9.jpeg?token=803c2a52b1d7b2fd0972f93b6af7a656',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ff5d337bd65747c908695f963b8b8f03ea8b5107c50631-HSJ5DK_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1657528876&t=4ef847397da3999357de118aff0321ac'
  // 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  // 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  // 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  // 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  // 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
]
// 定义表格数据默认为空
const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
])
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
