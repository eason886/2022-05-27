<template>
  <el-card class="box-card" shadow="hover">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="admin" name="2">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="User" name="first">User</el-tab-pane>
          <el-tab-pane label="Config" name="second">Config</el-tab-pane>
          <el-tab-pane label="Role" name="third">Role</el-tab-pane>
          <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
        </el-tabs>
        <el-table
          v-loading="true"
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
const activeName = ref('first')
const activeNames = ref(['2'])
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 0 !important;
}
</style>
