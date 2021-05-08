<template>
  <div>
    <h1>Admin main page</h1>
    <MyChart/>
  </div>

</template>

<script>
  import MyChart from '@/components/admin/MyChart'

  export default {
    layout: "admin",
    middleware: ['admin-auth'],
    components: {MyChart}
  }
</script>

<style scoped>

</style>
