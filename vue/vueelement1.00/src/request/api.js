/*
 *api接口统一管理
 */
import axios from './request.js'

const api = {
	upload_file_url: 'http://172.16.200.90:9001/longan/api/basic/file/upload', //上传附件
    //登录
	login(params) { 
		return axios.post('/api/frontend/member/login', params)
    },
    //注册
    register(params) {
        return axios.post('', params)
    },
    /*------ 酒店管理 ------*/
    //获取省、市、区
    provinceGet(params){
        return axios.get('/basic/dict/items',{params})
    },
    //获取酒店皮肤
    skinGet(params){
        return axios.get('/hotel/theme',{params})
    },
    //判断社会信用代码是否存在
    isAccount(params){
        return axios.get('/user/emp/isExistEmpName',{params})
    },
    //添加酒店
    hotelAdd(params){
        return axios.post('/hotel',params)
    },
    //酒店列表-查询
    hotelList(params){
        return axios.get('/hotel',{params})
    },
    //酒店详情
    hotelDetail(params,id){
        return axios.get('/hotel/' + id,{params})
    },
    //酒店修改
    hotelModify(params,id){
        return axios.patch('/hotel/' + id,params)
    },
    //酒店删除
    hotelDelete(params,id){
        return axios.delete('/hotel/' + id,{params})
    },
    //重置密码
    hotelResetPWD(params,id){
        return axios.patch('/hotel/resetPassword/' + id,{params})
    },
    /*------ 酒店商品管理 ------*/
    //酒店商品列表
    hotelCommodityList(params){
        return axios.get('',{params})
    },
    //酒店商品详情
    hotelCommodityDetail(params,id){
        return axios.get('' + id,{params})
    },
    //酒店商品修改
    hotelCommodityModify(params,id){
        return axios.patch('' + id,params)
    },
    //酒店商品清除
    ClearHotelCommodity(params,id){
        return axios.delete('' + id,{params})
    },



    //柜子管理列表
    CabinetGl(params){
    return axios.get('/cabinet',params)
    },
    //柜子管理修改
    CabinetChange(params,id){
        return axios.get('/cabinet/'+id,params)
    },
    //柜子管理更新数据
    CabinetUpdate(params,id){
        return axios.patch('/cabinet/'+id,params)
    },
    //柜子管理查看信息
    CabinetLook(params,id){
        return axios.get('/cabinet/lattice',params)
    }
}

export default api