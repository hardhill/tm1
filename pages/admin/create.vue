<template>
  <el-form class="mb2" :model="controls" :rules="rules" ref="form" @submit.native.prevent="onSubmit">
    <h1>Create new post</h1>
    <el-form-item label="Post title" prop="title">
      <el-input v-model="controls.title"></el-input>
    </el-form-item>
    <el-form-item label="Text as md or html" prop="text">
      <el-input v-model="controls.text" type="textarea" :rows="10"></el-input>
    </el-form-item>
    <el-button class="mb" type="success" round plain @click="previewDialog=true">Preview</el-button>
    <el-dialog title="Preview" :visible.sync="previewDialog">
      <span :key="controls.text">
        <vue-markdown>{{controls.text}}</vue-markdown>
      </span>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="previewDialog = false">OK</el-button>
      </span>
    </el-dialog>
    <el-upload
      class="mb"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
      ref="upload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading" round>Save</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    data: () => ({
      previewDialog: false,
      loading: false,
      controls: {
        text: '',
        title: ''
      },
      rules: {
        text: [
          {required: true, message: 'Please input text', trigger: 'blur'}
        ],
        title: [
          {required: true, message: 'Title must not empty', trigger: 'blur'}
        ]
      },
      image:null
    }),
    methods: {
      onSubmit() {
        this.$refs['form'].validate(async valid => {
          if (valid && this.image) {
            this.loading = true
            const formData = {
              text: this.controls.text,
              title: this.controls.title,
              image: this.image

            }
            try {
              await this.$store.dispatch('post/newPost', formData)
              this.$message.success('New post saved')
              this.controls.text = ''
              this.controls.title = ''
              this.image = null
              this.$refs.upload.clearFiles()
            } catch (e) {
            } finally {
              this.loading = false
            }

          }else{
            this.$message.warning('Form is not valid')
          }
        })
      },
      handleImageChange(file,fileList){
       this.image = file.raw
      }
    }
  }
</script>

<style scoped>
  form {
    width: 600px;
  }
</style>
