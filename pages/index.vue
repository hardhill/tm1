<template>
  <el-row align="center" justify="center" type="flex">
    <el-col :lg="12" :md="16" :sm="20" :xl="8" :xs="24">
      <AppPost
        :key="post._id"
        :post="post"
        v-for="post in posts"
      />
    </el-col>
  </el-row>
</template>

<script>
  import AppPost from '@/components/main/Post'

  export default {
    head: {
      title: 'Главный'
    },
    components: {
      AppPost
    },
    async asyncData({store}) {
      const result = await store.dispatch('post/fetchPosts')
      return {posts: result.data}
    }
  }
</script>

<style>

</style>
