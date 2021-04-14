<template>
    <div class="error-layout">
      <div class="error-content">
        <h1 class="error-title">ERROR 404</h1>
        <nuxt-link to="/">Back to main page</nuxt-link>
      </div>
    </div>
</template>

<script>
    export default {
        name: "error"
    }
</script>

<style lang="scss" scoped>
.error-layout{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.error-content{
  display: flex;
  flex-direction: column;
  align-items: center;

}
  .error-title{
    color: #d000ff;
  }
</style>
