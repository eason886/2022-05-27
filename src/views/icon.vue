<template>
  <el-card>
    <ul>
      <li @click="fn">
        <el-icon><Camera /></el-icon>
        <!-- <component  :is="'Camera'"></component> -->
      </li>
    </ul>
  </el-card>
</template>

<script setup>
const fn = () => {
  // copyText(` copyText(‘{value}`)
}
</script>

<style lang="scss" scoped>
.component {
  font-size: 20px;
}
</style>
