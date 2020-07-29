/*
 *api接口统一管理
 */
import axios from './request.js'

const api = {
    upload_file_url: '/longan/api/basic/file/upload', //上传附件
    

    //获取权限
    authzcontroller(params){
        return axios.get('/longan/api/authz/perm/emp/map', {params})
    },

    /*------ 审核管理 ------*/
    //获取业务类型
    getbusinessty(params){
        return axios.get('/longan/api/basic/dict/items', {params})
    },
    //发起的流程
    getProcessList(params){
        return axios.get('/longan/api/review', {params})
    },
    //获取详情信息（所有的获取详情）
    getReviewDetails(id){
        return axios.get('/longan/api/review/'+id);
    },
    //认领任务列表
    getPendingClaimList(params){
        return axios.get('/longan/api/review/checker/claim', {params})
    },
    //认领任务
    postclaim(id,params){
        return axios.post('/longan/api/review/checker/claim/'+id, params)
    },
    //待审核列表
    getPendingReviewList(params){
        return axios.get('/longan/api/review/checker/audit', {params})
    },
    //审核
    postreview(id,params){
        return axios.post('/longan/api/review/checker/audit/'+id, params)
    },
    //已审核列表
    getReviewList(params){
        return axios.get('/longan/api/review/checker/audit/audited', {params})
    }
}

export default api
