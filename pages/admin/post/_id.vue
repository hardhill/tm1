<template>
  <div class="page-wrap">
    <el-breadcrumb class="mb2" separator="/">
      <el-breadcrumb-item to="/admin/list">Posts</el-breadcrumb-item>
      <el-breadcrumb-item>{{post.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <h2>{{post.title}}</h2>
    <el-form :model="controls" :rules="rules" @submit.native.prevent="onSubmit" ref="form">
      <!--      <h1>Login as admin</h1>-->
      <el-form-item label="Text as md or html" prop="text">
        <el-input :rows="10" type="textarea" v-model="controls.text"></el-input>
      </el-form-item>
      <div class="mb2 left-right">
        <small>
          <i class="el-icon-time"></i>
          <span>{{ new Date(post.date).toLocaleString() }}</span>
        </small>
        <small>
          <i class="el-icon-view"></i>
          <span>{{ post.views }}</span>
        </small>
      </div>
      <el-form-item>
        <el-button :loading="loading" native-type="submit" round type="primary">Save</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    validate({params}) {
      return Boolean(params.id)
    },
    head() {
      return {
        title: `Post | ${this.post.title}`
      }
    },
    async asyncData({store, params}) {
      const result = await store.dispatch('post/fetchAdminPostById', params.id)
      return {post: result.data}
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
    mounted() {
      this.controls.text = this.post.text
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate(async valid => {
          if (valid) {
            this.loading = true
            const formData = {
              text: this.controls.text,
              id: this.post._id
            }
            try {
              await this.$store.dispatch('post/update', formData)
              this.$message.success('Post updated')
              this.loading = false
            } catch (e) {
              this.loading = false
            }

          }
        })
      }
    }
  }
</script>

<style scoped>
  .page-wrap {
    width: 600px;
  }


</style>
