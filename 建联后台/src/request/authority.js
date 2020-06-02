import api from './api.js'

const control = {
    authority(that,resType,userId){
    let params={
      resType:resType,
    }
    return api.authzcontroller(params,userId).then(response=>{
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