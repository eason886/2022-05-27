<template>
  <el-card class="box-card" shadow="hover">
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
  </el-card>
</template>

<script setup>
import { ref, reactive } from 'vue'
const handleClick = () => {
  console.log('click')
}

const tableData = reactive([
  {
    date: '2016-05-03',
    name: 'Tom',

    address: 'No. 189, Grove St, Los Angeles'
  }
])
</script>

<style lang="scss" scoped></style>
