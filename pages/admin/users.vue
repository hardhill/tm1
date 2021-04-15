<template>
  <el-form
    :model="controls"
    :rules="rules" ref="form"
    @submit.native.prevent="onSubmit">
    <h1>New user</h1>
    <el-form-item label="Login" prop="login">
      <el-input v-model="controls.login"></el-input>
    </el-form-item>
    <div class="mb2">
      <el-form-item label="Password" prop="password">
        <el-input v-model="controls.password" type="password"></el-input>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" native-type="submit" :loading="loading">Create</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
    export default {
      layout:'admin',
      middleware:['admin-auth'],
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
                await this.$store.dispatch('auth/createUser',formData)
                this.$message.success('New user created')
                this.controls.login = ''
                this.controls.password = ''
                this.loading = false
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
form{
  width: 400px;
}
</style>
