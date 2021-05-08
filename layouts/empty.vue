<template>
  <div class="empty">
    <nuxt/>
  </div>
</template>

<script>
  export default {
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error(value) {
        this.$message.error(`Error: ${value}`)
      }
    }
  }
</script>

<style scoped>
  .empty {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 4rem;
  }
</style>
