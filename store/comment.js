export const actions = {
  async create({commit},data){
    try{
      return await this.$axios.post('/api/comment',data)
    }catch{
      commit('setError',e,{root:true})
      throw e
    }
  }
}
