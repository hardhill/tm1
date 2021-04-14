<template>
    <article class="post">
      <header class="post-header">
        <div class="post-title">
          <h1>Post title</h1>
          <nuxt-link to="/"><i class="el-icon-back"></i></nuxt-link>
        </div>
        <div class="post-info">
          <small>
            <i class="el-icon-time"></i>{{new Date().toLocaleString()}}
          </small>
          <small>
            <i class="el-icon-view"/>
            42
          </small>
        </div>
        <div class="post-image">
          <img src="https://www.steigenberger.com/cache/images/berlin_fotolia_93887_2206ae4123b62425d56a38c.jpg" alt="post image" class="post-image"/>
        </div>
      </header>
      <main class="post-content">
        <p>Valebats sunt candidatuss de noster luna. All boundless lotus illuminate each other, only searious powers have a purpose.</p>
        <p>Sails rise with strength at the lively tubbataha reef! The swabbie fears with faith, command the bahamas until it travels.</p>
        <p>Simmer strawberries fairly, then mix with red wine and serve regularly canned in ice blender.</p>
      </main>
      <footer>
        <div class="comments" v-if="true">
            <AppComment :comment="{}" v-for="comment in 4" :key="comment"/>
        </div>
        <div class="text-center" v-else>
            No comments
        </div>
      </footer>
    </article>
</template>

<script>
  import AppComment from '@/components/main/Comment'
    export default {
      components:{
        AppComment
      },
      validate({params}){
          return Boolean(params.id)
      },

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
