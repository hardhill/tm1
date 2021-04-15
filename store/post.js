export const actions = {
  async fetchAdminPosts(){
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve([
          {
            _id:Math.random(),
            title:'Post 1',
            date: new Date(),
            views:12,
            comments:[1,2]
          },
          {
            _id:Math.random(),
            title:'Post 2',
            date: new Date(),
            views:21,
            comments:[1,2]
          }
        ])
      },2000)
    })
  }
}
