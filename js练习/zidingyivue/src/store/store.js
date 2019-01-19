import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import dagefile from './modulesd/dagefile';
console.log(dagefile)

Vue.use(Vuex);//使用Vuex 
// import mutations from './mutations';

import {state,mutations} from './mutations';

// // 创建一个常量对象
// const state={
//     isRed:false,
//     datasj:1,
// }

// const mutations={
//     zheng(state){
//          state.isRed=true;//这就代表上面num加加
//      },
//     fu(state){
//          state.isRed=false;//同上
//      },
//      jia(state){
//         state.datasj++
//         if(state.datasj==10){
//             state.isRed='123'
//             state.datasj=0
//         }
//      }
     
//  }


// 让外部引用vuex
// export default new Vuex.Store({//创建vuex中的store对象
//     state,
//     mutations
// })
// console.log(state)
// console.log(mutations)
export default new Vuex.Store({//创建vuex中的store对象
    // dagefile,
    modules: {
        dagefile
      },
    state,
    mutations,
    getters,
    
    
    
})

