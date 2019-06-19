/*
 *api接口统一管理
 */
import axios from './request.js'

const api = {
    upload_file_url: 'http://172.16.200.90:9001/longan/api/basic/file/upload', //上传附件
    // upload_file_url: 'http://192.168.1.122:9001/longan/api/basic/file/upload', //上传附件

	login(params, path) { //登录
		return axios.post('/longan/api/user/login/' + path, params)
    },

    /*
         ------ 酒店管理 ------
    */
    //获取省、市、区
    provinceGet(params){
        return axios.get('/longan/api/basic/dict/items', {params})
    },
    //获取酒店皮肤
    skinGet(params){
        return axios.get('/longan/api/hotel/theme', {params})
    },
    //酒店详情
    hotelDetail(params, encryptedHotelOrgId){
        return axios.get('/longan/api/hotel/detail/' + encryptedHotelOrgId, {params})
    },
    //酒店修改
    hotelModify(params,id){
        return axios.patch('/longan/api/hotel/' + id, params)
    },

    /*------ 库存管理 ------*/
    //库存列表
    inventoryList(params){
        return axios.get('/longan/api/hotel/prod', {params})
    },
    //入库明细
    warehousingList(params){
        return axios.get('/longan/api/inv/in/detail', {params})
    },
    //销售明细
    salesList(params){
        return axios.get('/longan/api/buy/cab/order', {params})
    },

    /*------ 入库单管理 ------*/
    //入库单列表
    godownEntryList(params){
        return axios.get('/longan/api/inv/in', {params})
    },
    //入库单详情
    godownEntryDetail(params, id){
        return axios.get('/longan/api/inv/in/' + id, {params})
    },
    //入库单编号
    godownEntryDataCode(params){
        return axios.get('/longan/api/inv/in/create/squ', {params})
    },
    //商品列表
    commodityDataList(params){
        return axios.get('/longan/api/product/productAllName', {params})
    },
    //新增入库单
    godownEntryAdd(params){
        return axios.post('/longan/api/inv/in', params)
    },
    //修改入库单
    godownEntryModify(params, id){
        return axios.patch('/longan/api/inv/in/' + id, params)
    },

    /*------ 补货管理 ------*/
    //补货管理
    getReplenishList(params){
        return axios.get('/longan/api/repl/emptyLattice', {params})
    },
    /*
        ------ 客房服务-酒店服务 ------
    */
    //酒店服务类型列表
    hotelServiceList(params){
        return axios.get('/longan/api/rmsvc/hotel', {params})
    },
    //服务类型列表
    serviceTypeList(params){
        return axios.get('/longan/api/rmsvc/hotel/selectTypeRorHotel', {params})
    },
    //添加酒店服务类型
    HotelServiceTypeAdd(params){
        return axios.post('/longan/api/rmsvc/hotel', params)
    },
    //移除酒店服务类型
    HotelServiceTypeDelete(params, id){
        return axios.delete('/longan/api/rmsvc/hotel/' + id, params)
    },
    //获取酒店服务明细
    getHotelServiceDetail(params){
        return axios.get('/longan/api/rmsvc/hotelDetail', {params})
    },
    //酒店明细模板 - 新增条目
    hotelstlevelOneAdd(params){
        return axios.post('/longan/api/rmsvc/hotelDetail', params)
    },
    //酒店明细模板 - 条目详情
    hotelstlevelOneDetail(params, id){
        return axios.get('/longan/api/rmsvc/hotelDetail/' + id, {params})
    },
    //酒店明细模板 - 修改条目
    hotelstlevelOneModify(params, id){
        return axios.patch('/longan/api/rmsvc/hotelDetail/' + id, params)
    },
    //酒店明细模板 - 删除条目
    hotelstlevelOneDelete(params, id){
        return axios.delete('/longan/api/rmsvc/hotelDetail/' + id, params)
    },
    //酒店明细模板 - 位置移动
    hotellocationMove(params){
        return axios.patch('/longan/api/rmsvc/hotelDetail', params)
    },

    /*------ 采购单管理 ------*/
    //采购单列表
    HotelPurchaseOrderlist(params){
      return axios.get('/longan/api/pur/hotel', {params})
    },
    //查看采购单
    Hotellookpurchaseorder(params,id){
        return axios.get('/longan/api/pur/'+id,params)
    },
    //修改采购单
    Hoteleditpurchaseorder(params,id){
        return axios.patch('/longan/api/pur/hotelBG/'+id,params)
    },
    /*------ 故障管理 ------*/
    //故障管理
    FaultManagement(params){
        return axios.get('/longan/api/mal',params);
    },
    //故障类型
    FaultManagementMalType(params){
        return axios.get('/longan/api/mal/getMalPartOrReason',params);
    },
    //营收统计
    HotelRevenueStatistics(params){
        return axios.get('/longan/api/fin',params);
    },
    //获取所有商品名称
    getProdNameList(){
        return axios.get('/longan/api/product/productAllName');
    },
    //酒店分成
    HotelDivideInto(params){
        return axios.get('/longan/api/fin/revenue',params);
    },
    //营收统计详情
    HotelRevenueDetail(params){
        return axios.get('/longan/api/fin/details',params);
    },
    //获取预计分成总收入
    getGrossIncome(params){
        return axios.get('/longan/api/fin/divided',params);
    },
    //获取酒店银行账户信息
    getwithdraw(params){
        return axios.get('/longan/api/fin/withdraw/hotel',params);
    },
    //提交提现申请
    postwithdraw(params){
        return axios.post('/longan/api/fin/withdraw',params);
    },
    //酒店提现列表
    HotelWithdrawalsRecord(params){
        return axios.get('/longan/api/fin/withdraw',params);
    },
    //酒店提现详情
    HotelWithdrawalsRecordDetail(id){
        return axios.get('/longan/api/fin/withdraw/'+id);
    },
    //柜子管理列表
    CabinetGl(params){
      return axios.get('/longan/api/cabinet',params)
      },
    //柜子管理查看信息
    CabinetLook(params){
      return axios.get('/longan/api/cabinet/lattice',params)
   },
   //柜子管理修改
   CabinetChange(params,id){
    return axios.get('/longan/api/cabinet/'+id,params)
   },
   //柜子管理更新数据
   CabinetUpdate(params,id){
    return axios.patch('/longan/api/cabinet/'+id,params)
   },
    //客服服务记录列表
    getserverrecord(params){
      return axios.get('/longan/api/rmsvc/records',params);
    },
    //客服服务记录列表
    getserverrecorddetail(params,id){
      return axios.get('/longan/api/rmsvc/records/'+id,params);
    },
    //客服服务记录列表
    getsettingval(params){
      return axios.get('/longan/api/basic/settings/value',params);
    }
}

export default api
