<template>
  <el-row type="flex" align="center" justify="center">
    <el-col :xs="24" :sm="20" :md="16" :lg="12" :xl="8">
      <AppPost
        v-for="post in posts"
        :key="post._id"
        :post = "post"
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
    },
  async asyncData({store}){
      const result = await store.dispatch('post/fetchPosts')
      return {posts:result.data}
  }
}
</script>

<style>

</style>
