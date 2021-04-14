<template>
    <el-card class="comment">
      <div class="comment-header">
        <span>Person name</span>
        <span><i class="el-icon-time"></i>
          {{new Date().toLocaleString()}}</span>
      </div>
      <div class="comment-text">
        <p>Captain of a bare courage, contact the advice!</p>
        <p>Per guest prepare half a kilo of peppermint tea with peelled blood oranges for dessert.</p>
      </div>
    </el-card>
</template>

<script>
    export default {
        name: "Comment",
      props:{
          comment:{
            type:Object,
            required:true
          }
      }
    }
</script>

<style lang="scss" scoped>
.comment{
  margin-bottom: 1rem;
}
  .comment-header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: .8rem;
  }
  .comment-text{
    white-space: pre-line;
  }
</style>
