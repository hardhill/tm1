<template>
  <el-card
    :style="{width:'500px'}"
  >
    <el-form :model="controls" :rules="rules" @submit.native.prevent="onSubmit" ref="form">
      <h1>Login as admin</h1>
      <el-form-item label="Login" prop="login">
        <el-input v-model="controls.login"></el-input>
      </el-form-item>
      <div class="mb2">
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model="controls.password"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button :loading="loading" native-type="submit" type="primary">Login</el-button>
      </el-form-item>

    </el-form>
  </el-card>
</template>

<script>
  export default {
    layout: 'empty',
    data: () => ({
      loading: false,
      controls: {
        login: '',
        password: ''
      },
      rules: {
        login: [
          {required: true, message: 'Please input login', trigger: 'blur'}
        ],
        password: [
          {required: true, message: 'Please input password', trigger: 'blur'}
        ]
      }
    }),
    methods: {
      onSubmit() {
        this.$refs['form'].validate(async valid => {

          if (valid) {
            this.loading = true
            try {
              const formData = {
                login: this.controls.login,
                password: this.controls.password
              }
              await this.$store.dispatch('auth/login', formData)
              this.$router.push('/admin')
            } catch (e) {

            }
            this.loading = false
          }
        })
      }
    },
    mounted() {
      const {message} = this.$route.query
      switch (message) {
        case 'login':
          this.$message.info('You must login in system')
          break
        case 'logout':
          this.$message.success('You leave us')
          break
        case 'session':
          this.$message.warning('Time session is end. Login again')
          break
      }

    }
  }
</script>

<style scoped>

</style>
