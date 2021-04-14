<template>
    <div class="admin-wrap">
      <el-container :style="{height:'100%'}">
        <el-aside>
          Aside
        </el-aside>
        <el-main>
          <nuxt/>
        </el-main>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "admin"
    }
</script>

<style lang="scss" scoped>
.admin-wrap{
  width: 100%;
  height: 100vh;
}
</style>
