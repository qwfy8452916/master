// export const customdata='自定义单数据';
import zujian01data from '@/components/layer/zujian/zujian01'

export const state={
    isRed:false,
    datasj:1,
    hello:"组件通信测试",
    zjdata:zujian01data.zujianxx,
};

export const mutations={
    
    zheng:(state)=>{
         state.isRed=true;//这就代表上面num加加
     },
    fu:(state)=>{
         state.isRed=false;//同上
     },
     jia:(state)=>{
        state.datasj++
        if(state.datasj==10){
            state.isRed='123'
            state.datasj=0
        }
     },

     
     
 };
 
//  module.exports.state=state;
//  module.exports.mutations=mutations;
 
 
// export default {
// 	state,
// 	mutations,
// }

