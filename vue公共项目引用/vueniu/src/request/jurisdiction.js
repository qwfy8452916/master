import api from './api.js'
const control = {
  jurisdiction(that,resType){

  let params={
    resType: resType
  }
 return api.authzcontroller(params).then(response=>{
      if(response.data.code==0){
        return response.data.data
      }else{
        that.$alert(response.data.msg,"警告",{
          confirmButtonText: "确定"
      })
        return false
      }
  }).catch(err=>{
    that.$alert(response.data.msg,"警告",{
      confirmButtonText: "确定"
  })
    return false
  })
}

}
export default control
