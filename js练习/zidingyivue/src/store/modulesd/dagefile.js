
import {ceshiajax} from '@/api/api'

const dagefile = {
  state: {
    token: 3404211991,
    name: 'likui',
    age: '100',
    requiredata:'默认值',
  },

  mutations: {
    PUBLICXX:(state, age) => {
      state.age=age
    },
    SET_TOKEN: (state, requiredata) => {
      state.requiredata = requiredata
    },

  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password).then(response => {
    //       const data = response.data
    //       setToken(data.token)
    //       commit('SET_TOKEN', data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    ceshiajax({ commit }){
        
            ceshiajax({
                
            }).then(res=>{
               commit('SET_TOKEN',res.data.error_msg) 
               commit('PUBLICXX',6666) 
            })
     },


  }
}

export default dagefile
