<template>
  <el-card class="box-card" shadow="hover">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="admin" name="2">
        <el-row class="mb-4">
          <el-button>Default</el-button>
          <el-button type="primary">Primary</el-button>
          <el-button type="success">Success</el-button>
          <el-button type="info">Info</el-button>
          <el-button type="warning">Warning</el-button>
          <el-button type="danger">Danger</el-button>
          <el-button>中文</el-button>
        </el-row>
        <el-table
          :data="[
            {
              date: '2016-05-03',
              name: 'Tom',

              address: 'No. 189, Grove St, Los Angeles'
            },
            {
              date: '2016-05-03',
              name: 'Tom',

              address: 'No. 189, Grove St, Los Angeles'
            },
            {
              date: '2016-05-03',
              name: 'Tom',

              address: 'No. 189, Grove St, Los Angeles'
            },
            {
              date: '2016-05-03',
              name: 'Tom',

              address: 'No. 189, Grove St, Los Angeles'
            }
          ]"
          style="width: 100%"
        >
          <el-table-column prop="date" label="Date" width="180">
            <template #default="scope">
              <div>{{ scope.row.date }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Name" width="180">
            <template #default="scope">
              <div>{{ scope.row.date }}</div>
            </template></el-table-column
          >
          <el-table-column prop="address" label="Address">
            <template #default="scope">
              <div>{{ scope.row.date }}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
const activeNames = ref(['2'])
const handleChange = (val) => {
  console.log(val)
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 0 !important;
}
</style>
