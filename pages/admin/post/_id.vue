<template>
  <div class="page-wrap">
    <el-breadcrumb separator="/" class="mb2">
      <el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
      <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>{{post.title}}</h2>
    <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
<!--      <h1>Login as admin</h1>-->
      <el-form-item label="Text as md or html" prop="text">
        <el-input v-model="controls.text" type="textarea" :rows="10"></el-input>
      </el-form-item>
      <div class="mb2 left-right">
        <small>
          <i class="el-icon-time"></i>
          <span >{{ new Date(post.date).toLocaleString() }}</span>
        </small>
        <small>
          <i class="el-icon-view"></i>
          <span >{{ post.views }}</span>
        </small>
      </div>
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading" round >Save</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    validate({params}){
      return Boolean(params.id)
    },
    head(){
      return {
        title:`Post | ${this.post.title}`
      }
    },
    async asyncData({store, params}){
      const post = await store.dispatch('post/fetchAdminPostById',params.id)
      return {post}
    },
    data: () => ({
      loading: false,
      controls: {
        text: '',

      },
      rules: {
        text: [
          {required: true, message: 'Please input text', trigger: 'blur'}
        ]
      }
    }),
    methods:{
      onSubmit(){
        this.$refs['form'].validate(async valid=>{
          if(valid){
            this.loading = true
            const formData = {
              text: this.controls.text,
              id:this.post._id
            }
            try {
              await this.$store.dispatch('post/update', formData)
              this.$message.success('Post updated')
              this.loading = false
            }catch(e){
              this.loading = false
            }

          }
        })
      }
    }
  }
</script>

<style scoped>
.page-wrap{
  width: 600px;
}



</style>
