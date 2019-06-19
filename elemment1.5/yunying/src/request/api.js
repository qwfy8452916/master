/*
 *api接口统一管理
 */
import axios from './request.js'

const api = {
    upload_file_url: 'http://172.16.200.90:9001/longan/api/basic/file/upload', //上传附件
    // upload_file_url: 'http://192.168.1.122:9001/longan/api/basic/file/upload', //上传附件

    //登录
	login(params, path) {
		return axios.post('/longan/api/user/login/' + path, params)
    },

    /*
         ------ 酒店管理 ------
    */
    //获取省、市、区
    provinceGet(params){
        return axios.get('/longan/api/basic/dict/items',{params})
    },
    //获取酒店皮肤
    skinGet(params){
        return axios.get('/longan/api/hotel/theme',{params})
    },
    //判断社会信用代码是否存在
    isAccount(params){
        return axios.get('/longan/api/hotel/isExist',{params})
    },
    //添加酒店
    hotelAdd(params){
        return axios.post('/longan/api/hotel',params)
    },
    //酒店列表-查询
    hotelList(params){
        return axios.get('/longan/api/hotel',{params})
    },
    //酒店详情
    hotelDetail(params,id){
        return axios.get('/longan/api/hotel/' + id,{params})
    },
    //酒店修改
    hotelModify(params,id){
        return axios.patch('/longan/api/hotel/' + id,params)
    },
    //酒店删除
    hotelDelete(params,id){
        return axios.delete('/longan/api/hotel/' + id, params )
    },
    //重置密码
    hotelResetPWD(params,id){
        return axios.patch('/longan/api/hotel/resetPassword/' + id, params)
    },
    // --- 管理柜子商品 ---
    //柜子列表
    hotelCabinetList(params){
        return axios.get('/longan/api/cab/prod',{params})
    },
    //验证是否有权修改、清除
    hotelCabinetLimits(params,id){
        return axios.get('/longan/api/cab/prod/access/update/' + id,{params})
    },
    //柜子清除
    hotelCabinetClear(params,id){
        return axios.patch('/longan/api/cab/prod/clear/' + id, params)
    },
    //柜子商品详情
    hotelCabinetDetail(params,id){
        return axios.get('/longan/api/cab/prod/' + id,{params})
    },
    //柜子商品列表
    hotelCabinetCommodityList(params){
        return axios.get('/longan/api/hotel/prod',{params})
    },
    //柜子商品修改
    hotelCabinetCommodityModify(params,id){
        return axios.patch('/longan/api/cab/prod/' + id, params)
    },
    // --- 酒店商品管理 ---
    //酒店商品列表
    hotelCommodityList(params){
        return axios.get('/longan/api/hotel/prod',{params})
    },
    //酒店商品添加
    hotelCommodityAdd(params){
        return axios.post('/longan/api/hotel/prod', params)
    },
    //酒店商品采购单价历史价格列表
    lookHistoryPrice(params){
        return axios.get('/longan/api/hotel/prod/pur/price', {params})
    },
    //酒店商品名称列表
    hotelCommodityNameList(params){
        return axios.get('/longan/api/hotel/prod/productAllName',{params})
    },
    //酒店商品详情
    hotelCommodityDetail(params,id){
        return axios.get('/longan/api/hotel/prod/' + id,{params})
    },
    //酒店商品修改
    hotelCommodityModify(params,id){
        return axios.patch('/longan/api/hotel/prod/' + id,params)
    },

    /*
         ------ 库存管理 ------
    */
    //库存列表
    inventoryList(params){
        return axios.get('/longan/api/hotel/prod',{params})
    },
    //入库单列表
    godownEntryList(params){
        return axios.get('/longan/api/inv/in',{params})
    },
    //入库单详情
    godownEntryDetailInfo(params, id){
        return axios.get('/longan/api/inv/in/' + id,{params})
    },
    //入库单详情-列表
    godownEntryDetail(params){
        return axios.get('/longan/api/inv/in/detail',{params})
    },
    //入库单审核
    godownEntryAudit(params){
        return axios.patch('/longan/api/inv/in/approve', params)
    },
    /*
         ------ 客房服务-自有服务 ------
    */
    //服务类型列表
    serviceTypeList(params){
        return axios.get('/longan/api/rmsvc/type', {params})
    },
    //新增服务类型
    serviceTypeAdd(params){
        return axios.post('/longan/api/rmsvc/type', params)
    },
    //删除服务类型
    serviceTypeDelete(params, id){
        return axios.delete('/longan/api/rmsvc/type/' + id, params)
    },
    //获取服务类型详情
    getServiceType(params, id){
        return axios.get('/longan/api/rmsvc/type/' + id, {params})
    },
    //修改服务类型
    serviceTypeModify(params, id){
        return axios.patch('/longan/api/rmsvc/type/' + id, params)
    },
    //明细模板 - 获取数据
    getServiceTypeDetail(params){
        return axios.get('/longan/api/rmsvc/template', {params})
    },
    //明细模板 - 新增条目
    stlevelOneAdd(params){
        return axios.post('/longan/api/rmsvc/template', params)
    },
    //明细模板 - 条目详情
    stlevelOneDetail(params, id){
        return axios.get('/longan/api/rmsvc/template/' + id, {params})
    },
    //明细模板 - 修改条目
    stlevelOneModify(params, id){
        return axios.patch('/longan/api/rmsvc/template/' + id, params)
    },
    //明细模板 - 删除条目
    stlevelOneDelete(params, id){
        return axios.delete('/longan/api/rmsvc/template/' + id, params)
    },
    //明细模板 - 位置移动
    locationMove(params){
        return axios.patch('/longan/api/rmsvc/template', params)
    },
    /*
        ------ 客房服务-酒店服务 ------
    */
   //酒店服务类型列表
   hotelServiceList(params){
        return axios.get('/longan/api/rmsvc/hotel', {params})
   },
   //酒店名称列表
   getHotelNameAll(params, orgId){
        return axios.get('/longan/api/hotel/allHotel/' + orgId, {params})
   },
   //酒店服务类型列表
   hotelserviceTypeList(params){
        return axios.get('/longan/api/rmsvc/hotel/selectTypeRorOpr', {params})
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



    //柜子管理列表
    CabinetGl(params){
      return axios.get('/longan/api/cabinet',params)
      },
      //柜子管理修改
      CabinetChange(params,id){
          return axios.get('/longan/api/cabinet/'+id,params)
      },
      //柜子管理更新数据
      CabinetUpdate(params,id){
          return axios.patch('/longan/api/cabinet/'+id,params)
      },
      //柜子管理查看信息
      CabinetLook(params){
          return axios.get('/longan/api/cabinet/lattice',params)
      },
      //商品管理列表页
      commoditylist(params){
          return axios.get('/longan/api/product',params)
      },
      //删除商品
      delcommodity(params){
          return axios.delete('/longan/api/product',params)
      },
      //添加商品
      addcommodity(params){
          return axios.post('/longan/api/product',params)
      },
      //修改加载商品信息
      lookcommodity(params,id){
          return axios.get('/longan/api/product/'+id,params)
      },
      //修改商品信息提交
      changecommodity(params,id){
          return axios.patch('/longan/api/product/'+id,params)
      },
      //创建采购单获取信息
      createorderinfo(params){
        return axios.get('/longan/api/pur/create/squ',params)
    },
    //查询所有酒店信息
    queryhotel(params,oprOrgId){
      return axios.get('/longan/api/pur/hotel/'+oprOrgId,params)
    },
    //查询酒店商品信息
    queryhotelprod(params,hotelId){
      return axios.get('/longan/api/pur/hotelProd/'+hotelId,params)
    },
    //创建采购单信息
    createpurchaseorder(params){
      return axios.post('/longan/api/pur',params)
    },
    //运营商获取采购单列表
    purchaseorderlist(params){
      return axios.get('/longan/api/pur/opr',params)
    },
    //查看采购单详情信息
    lookpurchaseorder(params,id){
      return axios.get('/longan/api/pur/'+id,params)
    },
    //修改更新采购单信息
    uploadpurchaseorder(params,id){
      return axios.patch('/longan/api/pur/'+id,params)
    },
    //删除采购单信息
    delpurchaseorder(params,id){
      return axios.delete('/longan/api/pur/'+id,params)
    },
    //故障类型
    FaultManagementMalType(params){
        return axios.get('/longan/api/mal/getMalPartOrReason',params);
    },
    //故障管理
    FaultManagement(params){
        return axios.get('/longan/api/mal',params);
    },
    //营收统计
    RevenueStatistics(params){
        return axios.get('/longan/api/fin',params);
    },
    //获取所有商品名称
    getProdNameList(){
        return axios.get('/longan/api/product/productAllName');
    },
    //获取所有酒店名称
    HotelNameList(id){
        return axios.get('/longan/api/hotel/allHotel/'+id);
    },
    //运营分享订单查询
    LonganOperationAnalysis(params){
        return axios.get('/longan/api/ops',params);
    },
    //运营分享订单查询详情
    LonganRevenueDetail(params){
        return axios.get('/longan/api/fin/details',params);
    },
    //导出
    exportfun(params){
        return axios.get('/longan/api/ops/export',params);
    },
    //酒店分成
    LonganDivideInto(params){
        return axios.get('/longan/api/fin/revenue',params);
    },
    //获取预计分成总收入
    getGrossIncome(params){
        return axios.get('/longan/api/fin/divided',params);
    },
    //运营商商品成本列表
    LonganFinancialCost(params){
        return axios.get('/longan/api/fin/prod',params);
    },
    //运营商商品成本详情
    LonganFinancialCostDetails(id){
        return axios.get('/longan/api/fin/product/'+id);
    },
    //修改运营商商品成本列表
    LonganFinancialCostChange(id,params){
        return axios.patch('/longan/api/fin/prod/'+id,params); 
    },
    //酒店提现记录
    LonganWithdrawalsRecord(params){
        return axios.get('/longan/api/fin/withdraw',params);
    },
    //酒店提现记录详情
    LonganWithdrawalsRecordDetail(id){
        return axios.get('/longan/api/fin/withdraw/'+id);
    },
    //提交提现处理
    patchporDisposePath(id,params){
        return axios.patch('/longan/api/fin/withdraw/'+id,params);
    },
    //柜子异常状态
    LonganAbnormalStateOfCabinet(params){
        return axios.get('/longan/api/mal/cab',params);
    },
    //更新格子数据
    updatelattice(params,id){
      return axios.patch('/longan/api/cabinet/lattice/'+id,params);
    },
    //客服服务记录列表
    getserverrecord(params){
      return axios.get('/longan/api/rmsvc/records',params);
    },
    //客服服务记录列表
    getserverrecorddetail(params,id){
      return axios.get('/longan/api/rmsvc/records/'+id,params);
    }
}

export default api
