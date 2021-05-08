<template>
  <el-table
    :data="posts"
    style="width: 100%">
    <el-table-column label="Title" prop="title" width="280"/>
    <el-table-column
      label="Date"
      width="160">
      <template slot-scope="{row:{date}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ new Date(date).toLocaleDateString() }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Views" prop="views" width="100"/>
    <el-table-column
      label="Comments"
      width="180">
      <template slot-scope="{row:{comments}}">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="Operations">
      <template slot-scope="{row}">
        <el-tooltip content="Edit record" effect="light" placement="left">
          <el-button
            @click="open(row._id)"
            circle
            icon="el-icon-edit"
            type="primary"></el-button>
        </el-tooltip>
        <el-tooltip content="Delete" effect="dark" placement="right">
          <el-button
            @click="remove(row._id)"
            circle
            icon="el-icon-delete"
            type="danger"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>

</template>

<script>
  export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    async asyncData({store}) {
      const result = await store.dispatch('post/fetchAdminPosts')
      return {posts: result.data}
    },

    methods: {
      open(id) {
        this.$router.push(`/admin/post/${id}`)
      },
      async remove(id) {
        try {
          await this.$confirm('Do you want delete this post?', 'Attention!', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(async () => {
            await this.$store.dispatch('post/remove', id)
            this.posts = this.posts.filter(p => p._id != id)
            this.$message({
              type: 'success',
              message: 'Delete completed'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: 'Delete canceled'
            })
          })
        } catch (e) {

        }
      }
    }
  }
</script>

<style scoped>

</style>
