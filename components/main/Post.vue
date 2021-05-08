<template>
  <el-card class="post" shadow="hover">
    <header class="post-header" slot="header">
      <h3>{{post.title}}</h3>
      <small>
        <i class="el-icon-time"></i>
        {{new Date(post.date).toLocaleString()}}
      </small>
    </header>
    <div class="post-body">
      <img :src="post.imageUrl" alt="post image" class="post-img"/>
    </div>
    <footer class="post-footer">
      <el-button @click="viewPost" round>View</el-button>
      <span>
          <i class="el-icon-message"></i>
          {{post.comments.length}}
        </span>
    </footer>
  </el-card>
</template>

<script>
  export default {
    name: "Post",
    props: {
      post: {
        type: Object,
        required: true
      }
    },
    methods: {
      viewPost() {
        const id = this.post._id
        this.$router.push(`/post/${id}`)
      }
    }
  }
</script>

<style scoped>
  .post {
    margin-bottom: 2rem;
  }

  .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .post-body {
    padding: 0;
  }

  .post-img {
    width: 100%;
    height: auto;
  }

  .post-footer {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
