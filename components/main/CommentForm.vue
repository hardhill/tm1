<template>
  <el-form :model="controls" :rules="rules" @submit.native.prevent="onSubmit" ref="form">
    <h1>Add comment please</h1>
    <el-form-item label="Name" prop="name">
      <el-input v-model="controls.name"></el-input>
    </el-form-item>
    <el-form-item label="Comment" prop="text">
      <el-input :rows="3" resize="none" type="textarea" v-model="controls.text"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :loading="loading" native-type="submit" type="primary">Add comment</el-button>

    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "CommentForm",
    props: {
      postId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        loading: false,
        controls: {
          name: '',
          text: ''
        },
        rules: {
          name: [
            {required: true, message: 'Please input name', trigger: 'blur'}
          ],
          text: [
            {required: true, message: 'Please input comment', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            this.loading = true
            const formData = {
              name: this.controls.name,
              text: this.controls.text,
              postId: this.postId
            }
            try {
              const newComment = await this.$store.dispatch('comment/create', formData)
              this.$message.success('Comment is added')

              this.$emit('onComment', newComment.data)
            } catch (e) {

            }
            this.loading = false
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
