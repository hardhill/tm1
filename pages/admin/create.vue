<template>
  <el-form :model="controls" :rules="rules" @submit.native.prevent="onSubmit" class="mb2" ref="form">
    <h1>Create new post</h1>
    <el-form-item label="Post title" prop="title">
      <el-input v-model="controls.title"></el-input>
    </el-form-item>
    <el-form-item label="Text as md or html" prop="text">
      <el-input :rows="10" type="textarea" v-model="controls.text"></el-input>
    </el-form-item>
    <el-button @click="previewDialog=true" class="mb" plain round type="success">Preview</el-button>
    <el-dialog :visible.sync="previewDialog" title="Preview">
      <span :key="controls.text">
        <vue-markdown>{{controls.text}}</vue-markdown>
      </span>
      <span class="dialog-footer" slot="footer">
      <el-button @click="previewDialog = false" type="primary">OK</el-button>
      </span>
    </el-dialog>
    <el-upload
      :auto-upload="false"
      :on-change="handleImageChange"
      action="https://jsonplaceholder.typicode.com/posts/"
      class="mb"
      drag
      ref="upload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
    <el-form-item>
      <el-button :loading="loading" native-type="submit" round type="primary">Save</el-button>
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
      image: null
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

          } else {
            this.$message.warning('Form is not valid')
          }
        })
      },
      handleImageChange(file, fileList) {
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
