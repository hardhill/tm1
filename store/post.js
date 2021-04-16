const posts = [
  {
    _id:1,
    title:'Post 1',
    date: new Date(),
    views:12,
    comments:[1,2]
  },
  {
    _id:2,
    title:'Post 2',
    date: new Date(),
    views:21,
    comments:[1,2]
  }
]
export const actions = {
  async fetchAdminPosts(){
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve(posts)
      },500)
    })
  },
  async fetchAdminPostById({},id){
    return new Promise(resolve => {
      setTimeout(()=>{
        let post = posts.find(p=>p._id === +id)
        resolve(post)
      },500)
    })
  },
  async remove({},id){

  },
  update({},{id,text}){

  },
  async newPost({commit,dispatch},{title, text,image}){
    try{
      const fd = new FormData()
      fd.append('title',title)
      fd.append('text',text)
      fd.append('image',image,image.name)
      return new Promise(resolve => {
        setTimeout(()=>{
          resolve()
        },500)
      })
    }catch(e){
      commit('setError',e,{root:true})
      throw e
    }

  }
}
