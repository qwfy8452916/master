/*
 *api接口统一管理
 */
import axios from './request.js'

const api = {
  upload_file_url: 'http://172.16.200.90:9001/longan/api/basic/file/upload', //上传附件
  mockces(params) {
    return axios.get('https://www.easy-mock.com/mock/5b7f7b7d4a96987699e40656/dc/renyuan', { params })
  },

  login(params) { //登录
    return axios.post('/longan/api/user/login', params)
  },//登录


   //获取权限
   authzcontroller(params){
    return axios.get('/longan/api/authz/perm/emp/map', {params})
   },

   //查看卡券批次列表（分页，条件）
   getCardticketList(params){
    return axios.get('/longan/api/vou/batch',params)
   },


  // upload_file_url: 'http://192.168.1.122:9001/longan/api/basic/file/upload', //上传附件

  // login(params, path) { //登录
  // 	return axios.post('/longan/api/user/login/' + path, params)
  //   },

  //   //酒店修改
  //   hotelModify(params,id){
  //       return axios.patch('/longan/api/hotel/' + id, params)
  //   },

  //   /*------ 库存管理 ------*/
  //   //库存列表
  //   inventoryList(params){
  //       return axios.get('/longan/api/hotel/prod', {params})
  //   },

}

export default api
