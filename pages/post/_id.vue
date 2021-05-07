<template>
    <article class="post">
      <header class="post-header">
        <div class="post-title">
          <h1>{{post.title}}</h1>
          <nuxt-link to="/"><i class="el-icon-back"></i></nuxt-link>
        </div>
        <div class="post-info">
          <small>
            <i class="el-icon-time"></i>{{new Date(post.date).toLocaleString()}}
          </small>
          <small>
            <i class="el-icon-view"/>
            {{post.views}}
          </small>
        </div>
        <div class="post-image">
          <img :src="post.imageUrl" alt="post image" class="post-image"/>
        </div>
      </header>
      <main class="post-content">
        <vue-markdown>{{post.text}}</vue-markdown>
      </main>
      <footer>
        <AppCommentForm @onComment="commentHandler" v-if="canAddComment" :post-id="post._id"/>
        <div class="comments" v-if="post.comments.length">
            <AppComment :comment="comment" v-for="comment in post.comments" :key="comment._id"/>
        </div>
        <div class="text-center" v-else>
            No comments
        </div>
      </footer>
    </article>
</template>

<script>
  import AppComment from '@/components/main/Comment'
  import AppCommentForm from '@/components/main/CommentForm'
  import {applyAsyncData} from "~/.nuxt/utils";
    export default {
      components:{
        AppComment, AppCommentForm
      },

      validate({params}){
          return Boolean(params.id)
      },
      async asyncData({store, params}){
        const result = await store.dispatch('post/fetchPostById',params.id)
        await store.dispatch('post/addView',result.data)
        return {post:{...result.data,views:result.data.views++}}
      },
      data:()=>({
        canAddComment:true
      }),
      methods:{
        commentHandler(comment){
          this.post.comments.unshift(comment)
          this.canAddComment = false
        }
      }

    }
</script>

<style scoped lang="scss">
.post{
  margin: 0 auto;
  max-width: 600px;
}

.post-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-header{
  margin-bottom: 1.5rem;
}

.post-info{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-body{

}

.post-image img{
  height: auto;
  width: 100%;
}
.post-content{
  margin-bottom: 2rem;
}
</style>
