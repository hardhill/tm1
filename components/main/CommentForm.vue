<template>
  <el-form :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
    <h1>Add comment please</h1>
    <el-form-item label="Name" prop="name">
      <el-input v-model="controls.name"></el-input>
    </el-form-item>
    <el-form-item label="Comment" prop="text">
      <el-input type="textarea" v-model="controls.text" resize="none" :rows="3"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading">Add comment</el-button>

    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "CommentForm",
    data() {
      return {
        loading:false,
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
    methods:{
      onSubmit(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            const formData = {
              name:this.controls.name,
              text:this.controls.text,
              postId:''
            }
            try{
              this.$message.success('Comment is added')
              this.$emit('onComment')
            }catch(e){

            }
            this.loading = false
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
