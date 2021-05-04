export default  function({$axios, redirect, store}){

  // $axios.interceptors.request.use(request=>{
  //
  //   if(store.getters['auth/isAuthenticated'] ) {
  //     const token = store.getters['auth/token']
  //     //request.default.headers.common['Authorization'] = `Bearer ${token}`
  //   }
  // })

  $axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(store.getters['auth/isAuthenticated']&&!config.headers.Authorization){
      const token = store.getters['auth/token']
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })


  $axios.onError(error=>{
    if(error.response){
      if(error.response.status === 401){
        redirect('/admin/login?message=session')
        store.dispatch('auth/logout')
      }
      if(error.response.status === 500){
        redirect ('/')
        console.log('Server 500 error.')
      }
    }

  })
}
