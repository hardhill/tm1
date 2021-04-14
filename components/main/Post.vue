<template>
    <el-card class="post" shadow="hover">
      <header slot="header" class="post-header">
        <h3>Post title</h3>
        <small>
          <i class="el-icon-time"></i>
          {{new Date().toLocaleString()}}
        </small>
      </header>
      <div class="post-body">
        <img src="https://www.steigenberger.com/cache/images/berlin_fotolia_93887_2206ae4123b62425d56a38c.jpg" alt="post image" class="post-img"/>
      </div>
      <footer class="post-footer">
        <el-button round @click="viewPost">View</el-button>
        <span>
          <i class="el-icon-message"></i>
          12
        </span>
      </footer>
    </el-card>
</template>

<script>
    export default {
        name: "Post",
      methods:{
          viewPost(){
            const id = 2
            this.$router.push(`/post/${id}`)
          }
      }
    }
</script>

<style scoped>
.post{
  margin-bottom: 2rem;
}
  .post-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .post-body{
    padding: 0;
  }
  .post-img{
    width: 100%;
    height: auto;
  }
  .post-footer{
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
