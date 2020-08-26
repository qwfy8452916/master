/*
 *api接口统一管理
 */
import axios from './request.js'
const api = {
    upload_file_url: '/longan/api/basic/file/upload', //上传附件
    // upload_file_url: 'http://192.168.1.51:9001/longan/api/basic/file/upload', //上传附件



    //获取权限
    authzcontroller(params){
      return axios.get('/longan/api/authz/perm/emp/map', {params})
     },


}

export default api



