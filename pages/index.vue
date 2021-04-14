<template>
  <el-row type="flex" align="center" justify="center">
    <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
      <AppPost
        v-for="post in 3"
        :key="post"
      />
    </el-col>
  </el-row>
</template>

<script>
  import AppPost from '@/components/main/Post'
export default {
    head:{
      title:'Главный'
    },
    components:{
      AppPost
    }
}
</script>

<style>

</style>
