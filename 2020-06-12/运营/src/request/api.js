/*
 *api接口统一管理
 */
import axios from './request.js'
const api = {
    upload_file_url: '/longan/api/basic/file/upload', //上传附件
    // upload_file_url: 'http://192.168.1.51:9001/longan/api/basic/file/upload', //上传附件

    //登录
	login(params) {
		return axios.post('/longan/api/user/login', params)
    },

    //权限
    authzcontroller(params){
        return axios.get('/longan/api/authz/perm/emp/map', {params})
    },

    //故障管理
    cabInfoList(params){
        return axios.get('/longan/api/cabinet/status', {params})
    },
    //banner图片-链接列表
    basicDataItems_url(params){
        return axios.get('/longan/api/basic/link/all', {params})
    },
    //banner图片-链接参数列表
    basicDataItems_urlParamsF(params){
        return axios.get('/longan/api/hotel/func/image/link/param', {params})
    },
    basicDataItems_urlParamsH(params){
        return axios.get('/longan/api/hotel/image/link/param', {params})
    },

    /*
        ------ 广告页管理 ------
    */
    //广告页 - 列表
    hotelADList(params){
        return axios.get('/longan/api/hotel/ad/setting', {params})
    },
    //广告页 - 新增
    hotelADAdd(params){
        return axios.post('/longan/api/hotel/ad/setting', params)
    },
    //广告页 - 详情
    hotelADDetail(params, id){
        return axios.get('/longan/api/hotel/ad/setting/'+ id, {params})
    },
    //广告页 - 修改
    hotelADModify(params, id){
        return axios.put('/longan/api/hotel/ad/setting/'+ id, params)
    },
    //广告页 - 引用详情
    hotelADQuoteDetail(params, id){
        return axios.get('/longan/api/hotel/ad/setting/'+ id +'/used', {params})
    },
    //广告页 - 撤销修改
    ADModifyCancel(params, id){
        return axios.put('/longan/api/hotel/ad/setting/'+ id +'/undo', params)
    },
    //广告页 - 删除
    hotelADDelete(params, id){
        return axios.delete('/longan/api/hotel/ad/setting/'+ id, params)
    },
    //广告页 - 发布
    hotelADIssue(params, id){
        return axios.put('/longan/api/hotel/ad/setting/'+ id +'/issue', params)
    },

    /*
        ------ 规格管理 ------
    */
    //商品规格 - 列表
    prodSpecsList(params){
        return axios.get('/longan/api/prod/product/spec', {params})
    },
    //商品规格 - 新增
    prodSpecsAdd(params){
        return axios.post('/longan/api/prod/product/spec', params)
    },
    //商品规格 - 详情
    prodSpecsDetail(params, id){
        return axios.get('/longan/api/prod/product/spec/' + id, {params})
    },
    //商品规格 - 修改
    prodSpecsModify(params, id){
        return axios.put('/longan/api/prod/product/spec/' + id, params)
    },
    //商品规格 - 删除
    prodSpecsDelete(params, id){
        return axios.delete('/longan/api/prod/product/spec/' + id, params)
    },
    //酒店商品规格 - 列表
    hotelProdSpecsList(params){
        return axios.get('/longan/api/prod/hotel/product/spec', {params})
    },
    //酒店商品规格 - 添加 - 未使用的规格列表
    unusedProdSpecsList(params){
        return axios.get('/longan/api/prod/product/spec/unused/spec', {params})
    },
    //酒店商品规格 - 添加
    hotelProdSpecsAdd(params){
        return axios.post('/longan/api/prod/hotel/product/spec', params)
    },
    //酒店商品规格 - 添加全部
    hotelProdSpecsAllAdd(params, hotelProdId){
        return axios.post('/longan/api/prod/hotel/product/spec/save/batch/' + hotelProdId, params)
    },
    //酒店商品规格 - 详情
    hotelProdSpecsDetail(params, id){
        return axios.get('/longan/api/prod/hotel/product/spec/' + id, {params})
    },
    //酒店商品规格 - 修改
    hotelProdSpecsModify(params, id){
        return axios.put('/longan/api/prod/hotel/product/spec/' + id, params)
    },
    //酒店商品规格 - 移除
    hotelProdSpecsDelete(params, id){
        return axios.delete('/longan/api/prod/hotel/product/spec/' + id, params)
    },
    //功能区商品规格 - 列表
    funcProdSpecsList(params){
        return axios.get('/longan/api/prod/func/product/spec', {params})
    },
    //功能区商品规格 - 添加 - 未使用的规格列表
    unusedFuncProdSpecsList(params){
        return axios.get('/longan/api/prod/hotel/product/spec/unused/spec', {params})
    },
    //功能区商品规格 - 添加
    funcProdSpecsAdd(params){
        return axios.post('/longan/api/prod/func/product/spec', params)
    },
    //功能区商品规格 - 添加全部
    funcProdSpecsAllAdd(params, funcProdId ){
        return axios.post('/longan/api/prod/func/product/spec/save/batch/' + funcProdId , params)
    },
    //功能区商品规格 - 详情
    funcProdSpecsDetail(params, id){
        return axios.get('/longan/api/prod/func/product/spec/' + id, {params})
    },
    //功能区商品规格 - 修改
    funcProdSpecsModify(params, id){
        return axios.put('/longan/api/prod/func/product/spec/' + id, params)
    },
    //功能区商品规格 - 移除
    funcProdSpecsDelete(params, id){
        return axios.delete('/longan/api/prod/func/product/spec/' + id, params)
    },

    /*
        ------ 统计报表 ------
    */
    //过期商品 - 列表
    overdueProdList(params){
        return axios.get('/longan/api/report/lattice/warranty', {params})
    },

    /*
        ------ 顾客管理 ------
    */
   //员工管理-列表
   staffList(params){
        return axios.get('/longan/api/user/emp/all', {params})
    },
    //顾客管理-列表
    customerList(params){
        return axios.get('/longan/api/user/cus', {params})
    },
    //顾客管理-提现记录
    withdrawRecordList(params){
        return axios.get('/longan/api/fin/cus/expense', {params})
    },

    /*
        ------ 财运星 ------
    */
    //渠道管理-列表
    channelList(params){
        return axios.get('/longan/api/fs/channelPartner', {params})
    },
    //渠道管理-新增
    channelAdd(params){
        return axios.post('/longan/api/fs/channelPartner', params)
    },
    //渠道管理-详情
    channelDetail(params, id){
        return axios.get('/longan/api/fs/channelPartner/' + id, {params})
    },
    //渠道管理-修改
    channelModify(params, id){
        return axios.put('/longan/api/fs/channelPartner/' + id, params)
    },
    //渠道管理-删除
    channelDelete(params, id){
        return axios.delete('/longan/api/fs/channelPartner/' + id, params)
    },
    //渠道管理-启用/禁用
    channelStatus(params, id, status){
        return axios.put('/longan/api/fs/channelPartner/'+ id +'/status/' + status, params)
    },
    //渠道管理-重置密码
    channelResetPWD(params){
        return axios.put('/longan/api/fs/channelPartner/password', params)
    },
    //渠道商链接
    channelLinkList(params){
        return axios.get('/longan/api/fs/shareCode', {params})
    },
    //渠道商合伙人-柜子类型
    getCabTypeList(params){
        // return axios.get('/longan/api/fs/cabType', {params})
        return axios.get('/longan/api/fs/cabType/all', {params})
    },
    //渠道商合伙人
    channelPartnerList(params){
        return axios.get('/longan/api/fs/investor/order/record', {params})
    },
    //红包管理
    redPacketList(params){
        return axios.get('/longan/api/fs/redPacket', {params})
    },
    //红包领取记录
    packetGetRecord(params, id){
        return axios.get('/longan/api/fs/balance/detail/redPacket/' + id, {params})
    },

    /*
        ------ 迷你吧商品管理 ------
    */
    //迷你吧配置-列表
    miniDeployList(params){
        return axios.get('/longan/api/prod/cab/prod/profile', {params})
    },
    //迷你吧配置-新增-柜子类型列表
    cabTypeList(params){
        return axios.get('/longan/api/basic/cabType/all', {params})
    },
    //迷你吧配置-新增
    miniDeployAdd(params){
        return axios.post('/longan/api/prod/cab/prod/profile', params)
    },
    //迷你吧配置-详情
    miniDeployDetail(params, id){
        return axios.get('/longan/api/prod/cab/prod/profile/' + id, {params})
    },
    //迷你吧配置-修改
    miniDeployModify(params, id){
        return axios.put('/longan/api/prod/cab/prod/profile/' + id, params)
    },
    //迷你吧配置-删除
    miniDeployDelete(params, id){
        return axios.delete('/longan/api/prod/cab/prod/profile/' + id, params)
    },
    //迷你吧配置-选择商品-验证有没有配置房间
    validIsHaveRoom(params){
        return axios.get('/longan/api/prod/cab/prod/profile/room/vaild', {params})
    },
    //迷你吧配置-选择房间-酒店未使用的房间列表
    getMiniRoomList(params){
        return axios.get('/longan/api/cabinet/unused/room', {params})
    },
    //迷你吧配置-选择房间-已使用的房间列表
    getSelectedRoomList(params){
        return axios.get('/longan/api/prod/cab/prod/profile/room', {params})
    },
    //迷你吧配置-选择房间-保存选择的房间
    modifyMiniRoom(params){
        return axios.post('/longan/api/prod/cab/prod/profile/room', params)
    },

    /*
        ------ 功能区商品管理 ------
    */
    //功能区商品-列表
    functionProdList(params){
        return axios.get('/longan/api/prod/func/product', {params})
    },
    //功能区商品-上下架
    functionProdStatus(params, id){
        return axios.put('/longan/api/prod/func/product/shelf/' + id, params)
    },
    //功能区商品-功能区下拉列表
    getHotelFunctionList(params){
        return axios.get('/longan/api/hotel/func/hotel/vaild/func', {params})
    },
    //功能区商品-商品下拉列表
    getFunctionProdList(params){
        return axios.get('/longan/api/prod/hotel/product/func/unused', {params})
    },
    //功能区商品-添加
    functionProdAdd(params){
        return axios.post('/longan/api/prod/func/product', params)
    },
    //功能区商品-详情
    functionProdDetail(params, id){
        return axios.get('/longan/api/prod/func/product/' + id, {params})
    },
    //功能区商品-修改
    functionProdModify(params, id){
        return axios.put('/longan/api/prod/func/product/' + id, params)
    },
    //功能区商品-删除
    functionProdDelete(params, id){
        return axios.delete('/longan/api/prod/func/product/' + id, params)
    },

    /*
        ------ 酒店功能区 ------
    */
    //功能区-列表
    hotelFunctionList(params){
        return axios.get('/longan/api/hotel/func', {params})
    },
    //功能区-新增
    hotelFunctionAdd(params){
        return axios.post('/longan/api/hotel/func', params)
    },
    //功能区-新增-酒店外部物流
    getLgcList(params){
        return axios.get('/longan/api/lgc/hotel/logistics/hotel/logistics', {params})
    },
    //功能区-详情
    hotelFunctionDetail(params, id){
        return axios.get('/longan/api/hotel/func/' + id, {params})
    },
    //检验功能区配送方式是否可修改
    isDisableDelivWay(params){
        return axios.get('/longan/api/prod/func/product/vaild', {params})
    },
    //功能区-修改
    hotelFunctionModify(params, id){
        return axios.put('/longan/api/hotel/func/' + id, params)
    },
    //功能区-删除
    hotelFunctionDelete(params, id){
        return axios.delete('/longan/api/hotel/func/' + id, params)
    },
    //功能区分类-树
    functionClassifyTree(params){
        return axios.get('/longan/api/hotel/func/market/category', {params})
    },
    //功能区分类-新增
    functionClassifyAdd(params){
        return axios.post('/longan/api/hotel/func/market/category', params)
    },
    //功能区分类-详情
    functionClassifyDetail(params, id){
        return axios.get('/longan/api/hotel/func/market/category/' + id, {params})
    },
    //功能区分类-修改
    functionClassifyModify(params, id){
        return axios.put('/longan/api/hotel/func/market/category/' + id, params)
    },
    //功能区分类-删除
    functionClassifyDelete(params, id){
        return axios.delete('/longan/api/hotel/func/market/category/' + id, params)
    },

    /*
        ------ 开票管理 ------
    */
    //(待)开票管理-列表
    waitInvoiceProdList(params){
        return axios.get('/longan/api/fin/inv/org', {params})
    },
    //(全部)开票管理-列表
    allInvoiceProdList(params){
        return axios.get('/longan/api/fin/inv', {params})
    },
    //开票管理-详情
    waitInvoiceProdDetail(params, id){
        return axios.get('/longan/api/fin/inv/' + id, {params})
    },
    //开票管理-处理
    waitInvoiceProdDeal(params, id){
        return axios.put('/longan/api/fin/inv/'+ id +'/handle', params)
    },

    /*
        ------ 市场分类 ------
    */
    //市场分类模板 - 详情
    getMarketTemplateDetail(params){
        return axios.get('/longan/api/prod/market/category/tpl', {params})
    },
    //市场分类模板 - 新增
    marketTemplateAdd(params){
        return axios.post('/longan/api/prod/market/category/tpl', params)
    },
    //市场分类模板 - 详情
    marketTemplateDetail(params, id){
        return axios.get('/longan/api/prod/market/category/tpl/' + id, {params})
    },
    //市场分类模板 - 修改
    marketTemplateModify(params, id){
        return axios.put('/longan/api/prod/market/category/tpl/' + id, params)
    },
    //市场分类模板 - 删除
    marketTemplateDelete(params, id){
        return axios.delete('/longan/api/prod/market/category/tpl/' + id, params)
    },
    //酒店商品市场分类 - 详情
    getHotelMarketDetail(params){
        return axios.get('/longan/api/hotel/market/category', {params})
    },
    //酒店商品市场分类 - 新增
    hotelMarketAdd(params){
        return axios.post('/longan/api/hotel/market/category', params)
    },
    //酒店商品市场分类 - 详情
    hotelMarketDetail(params, id){
        return axios.get('/longan/api/hotel/market/category/' + id, {params})
    },
    //酒店商品市场分类 - 修改
    hotelMarketModify(params, id){
        return axios.put('/longan/api/hotel/market/category/' + id, params)
    },
    //酒店商品市场分类 - 删除
    hotelMarketDelete(params, id){
        return axios.delete('/longan/api/hotel/market/category/' + id, params)
    },
    //酒店商品市场分类 - 导入模板
    hotelMarketTpl(params, id){
        return axios.post('/longan/api/hotel/market/category/tpl/' + id, params)
    },

    /*
        ------ 财务管理 ------
    */
    //实时分成
    predictEarningsList(params){
        return axios.get('/longan/api/fin/monitor/calc', {params})
    },
    //商品销售发票 - 新增
    invoiceRateAdd(params){
        return axios.post('/longan/api/fin/opr/rate/rate', params)
    },
    //商品销售发票 - 列表
    invoiceRateList(params){
        return axios.get('/longan/api/fin/opr/rate/rate', {params})
    },
    //商品销售发票 - 设为默认
    rateSetDefault(params, id){
        return axios.put('/longan/api/fin/opr/rate/rate/default/' + id, params)
    },
    //商品销售发票 - 详情
    invoiceRateDetail(params, id){
        return axios.get('/longan/api/fin/opr/rate/rate/' + id, {params})
    },
    //商品销售发票 - 修改
    invoiceRateModify(params, id){
        return axios.put('/longan/api/fin/opr/rate/rate/' + id, params)
    },
    //商品销售发票 - 删除
    invoiceRateDelete(params, id){
        return axios.delete('/longan/api/fin/opr/rate/rate/' + id, params)
    },

    //新财务管理
    //获取组织账户列表信息
      getOrgaccount(params){
        return axios.get('/longan/api/fin/org/account/list',params)
    },
    //获取组织待收入记录列表信息
    getWaitDivide(params){
        return axios.get('/longan/api/fin/org/pending',params)
    },
    //获取组织待收入记录单条信息
    WaitDivideDetail(id){
      return axios.get('/longan/api/fin/org/pending/'+id)
    },
    //获取组织分成记录列表信息
    orgDivideRecord(params){
     return axios.get('/longan/api/fin/org/income',params)
    },
    //获取组织分成记录单条信息
    divideRecordDetail(id){
      return axios.get('/longan/api/fin/org/income/'+id)
    },
    //获取用户待入账列表信息
    waitInlist(params,userType){
      return axios.get('/longan/api/fin/user/pending/'+userType,params)
    },
    //获取用户收支列表信息
    incomeRecord(params,userType){
      return axios.get('/longan/api/fin/user/account/detail/'+userType,params)
    },
    //获取用户待入账单条信息
    waitInDetail(id,userType){
      return axios.get('/longan/api/fin/user/pending/'+userType+'/'+id)
    },
    //获取用户收支单条信息
    inRecordDetail(id,userType){
      return axios.get('/longan/api/fin/user/account/detail/'+userType+'/'+id)
    },

    //订单信息---分成详情
    getDiveideDetail(params){
      return axios.get('/longan/api/order/alloc/orderDetail',params)
    },
    //配送单信息---分成详情
    getDeliDiveideDetail(params){
      return axios.get('/longan/api/order/alloc/orderDelivDetail',params)
    },

    /*
        ------ 酒店文化 ------
    */
    //酒店文化故事 - 新增
    hotelCultureAdd(params){
        return axios.post('/longan/api/hotel/culture', params)
    },
    //酒店文化故事 - 列表
    hotelCultureList(params){
        return axios.get('/longan/api/hotel/culture', {params})
    },
    //酒店文化故事 - 详情
    hotelCultureDetail(params, id){
        return axios.get('/longan/api/hotel/culture/' + id, {params})
    },
    //酒店文化故事 - 修改
    hotelCultureModify(params, id){
        return axios.put('/longan/api/hotel/culture/' + id, params)
    },
    //酒店文化故事 - 删除
    hotelCultureDelete(params, id){
        return axios.delete('/longan/api/hotel/culture/' + id, params)
    },
    //酒店文化故事条目 - 新增
    hotelCultureDetailAdd(params, id){
        return axios.post('/longan/api/hotel/culture/' + id + '/details', params)
    },
    //酒店文化故事条目 - 列表
    hotelCultureDetailList(params, id){
        return axios.get('/longan/api/hotel/culture/' + id + '/details', {params})
    },
    //酒店文化故事条目 - 详情
    hotelCultureDetailDetail(params, id, did){
        return axios.get('/longan/api/hotel/culture/' + id + '/details/' + did, {params})
    },
    //酒店文化故事条目 - 修改
    hotelCultureDetailModify(params, id, did){
        return axios.post('/longan/api/hotel/culture/' + id + '/details/' + did, params)
    },
    //酒店文化故事条目 - 删除
    hotelCultureDetailDelete(params, id, did){
        return axios.delete('/longan/api/hotel/culture/' + id + '/details/' + did, params)
    },

    /*
        ------ 客房预订 ------
    */
    //房型管理 - 列表
    bookTypeList(params){
        return axios.get('/longan/api/book/type', {params})
    },
    //字典表
    basicDataItems(params){
        return axios.get('/longan/api/basic/dict/items', {params})
    },
    //房型管理 - 详情
    bookTypeDetail(params, id){
        return axios.get('/longan/api/book/type/' + id, {params})
    },
    //房源管理 - 列表
    bookResourceList(params){
        return axios.get('/longan/api/book/resource', {params})
    },
    //房型管理 - 房型列表
    getBookTypeList(params){
        return axios.get('/longan/api/book/type/list', {params})
    },
    //房源管理 - 详情
    bookResourceDetail(params, id){
        return axios.get('/longan/api/book/resource/' + id, {params})
    },
    //房源管理 - 房源列表
    getBookResourceList(params){
        return axios.get('/longan/api/book/resource/list', {params})
    },
    //房价管理 - 房价信息
    bookPriceInfo(params){
        return axios.get('/longan/api/book/price', {params})
    },
    //房态管理 - 房态信息
    bookStatusInfo(params){
        return axios.get('/longan/api/book/state', {params})
    },

    //订单管理 - 列表
    bookOrderList(params){
        return axios.get('/longan/api/book/order', {params})
    },
    //订单管理 - 详情
    bookOrderDetail(params, id){
        return axios.get('/longan/api/book/order/' + id, {params})
    },

    /*
        ------ 分成协议 ------
    */
    //协议名称唯一验证
    isValidationName(params){
        return axios.get('/longan/api/fin/alloc/validation', {params})
    },
    //新增
    hotelProtocolAdd(params){
        return axios.post('/longan/api/fin/alloc', params)
    },
    //列表
    hotelProtocolList(params){
        return axios.get('/longan/api/fin/alloc', {params})
    },
    //列表 - 启用、禁用
    disableProtocol(params, id){
        return axios.put('/longan/api/fin/alloc/active/' + id, params)
    },
    //列表 - 删除
    hotelProtocolDelete(params, id){
        return axios.delete('/longan/api/fin/alloc/' + id, params)
    },
    //详情
    hotelProtocolDetail(params, id){
        return axios.get('/longan/api/fin/alloc/' + id, {params})
    },
    //获取全部分成协议
    getprotocolList(params){
        return axios.get('/longan/api/fin/alloc/all', {params})
    },

    authzcontroller(params){
      return axios.get('/longan/api/authz/perm/emp/map', params)
    },

    /*
        ------ 茶叶商城 ------
    */
    //商品 - 新增
    teashopTeaAdd(params){
        return axios.post('/longan/api/tshop/product', params)
    },
    //商品 - 列表
    teashopTeaList(params){
        return axios.get('/longan/api/tshop/product', {params})
    },
    //商品 - 下拉
    getTeaList(params){
        return axios.get('/longan/api/tshop/product/getAllProd', {params})
    },
    //商品 - 删除
    teashopTeaDelete(params, id){
        return axios.delete('/longan/api/tshop/product/' + id, params)
    },
    //商品 - 详情
    teashopTeaDetail(params, id){
        return axios.get('/longan/api/tshop/product/' + id, {params})
    },
    //商品 - 修改
    teashopTeaModify(params, id){
        return axios.put('/longan/api/tshop/product/' + id, params)
    },
    //商品 - 上下架
    teashopTeaStatus(params, id){
        return axios.put('/longan/api/tshop/product/onShelf/' + id, params)
    },
    //订单 - 列表
    teaOrderList(params){
        return axios.get('/longan/api/tshop/order', {params})
    },
    //订单 - 发货
    shipmentsTeaOrder(params, id){
        return axios.put('/longan/api/tshop/order/' + id, params)
    },
    //订单 - 详情
    teaOrderDetail(params, id){
        return axios.get('/longan/api/tshop/order/' + id, {params})
    },
    //会员卡 - 新增
    memberCardAdd(params){
        return axios.post('/longan/api/tShop/mShip/card', params)
    },
    //会员卡 - 列表
    memberCardList(params){
        return axios.get('/longan/api/tShop/mShip/card', {params})
    },
    //会员卡 - 详情
    memberCardDetail(params, id){
        return axios.get('/longan/api/tShop/mShip/card/' + id, {params})
    },
    //会员卡 - 修改
    memberCardModify(params, id){
        return axios.put('/longan/api/tShop/mShip/card/' + id, params)
    },
    //会员卡 - 删除
    memberCardDelete(params, id){
        return axios.delete('/longan/api/tShop/mShip/card/' + id, params)
    },
    //会员 - 管理 - 列表
    memberList(params){
        return axios.get('/longan/api/tshop/customer', {params})
    },
    //会员 - 详情
    memberDetail(params, id){
        return axios.get('/longan/api/tshop/customer/' + id, {params})
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
        return axios.get('/longan/api/hotel/theme/all',{params})
    },
    //判断社会信用代码是否存在
    isAccount(params){
        // return axios.get('/longan/api/hotel/isExist',{params})
        return axios.get('/longan/api/user/emp/isExistEmpName',{params})
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
        // return axios.get('/longan/api/cab/prod',{params})
        return axios.get('/longan/api/prod/cab/prod/profile/product',{params})
    },
    //查询虚拟柜配置
    hotelCabinetSet(params){
        return axios.get('/longan/api/cabinet/setting',params)
    },
    //新增虚拟柜配置
    hotelCabinetAdd(params){
        return axios.post('/longan/api/cabinet/setting',params)
    },
    //修改虚拟柜配置
    hotelCabinetChange(params,id){
        return axios.put('/longan/api/cabinet/setting/' + id,params)
    },
    //查看单个虚拟柜配置
    hotelCabinetLook(id){
        return axios.get('/longan/api/cabinet/setting/' + id)
    },
    //删除单个虚拟柜配置
    hotelCabinetCancel(id){
        return axios.delete('/longan/api/cabinet/setting/' + id)
    },
    //验证是否有权修改、清除
    hotelCabinetLimits(params,id){
        return axios.get('/longan/api/cab/prod/access/update/' + id,{params})
    },
    //柜子清除
    hotelCabinetClear(params,id){
        // return axios.patch('/longan/api/cab/prod/clear/' + id, params)
        return axios.put('/longan/api/prod/cab/prod/profile/product/clear/' + id, params)
    },
    //柜子商品详情
    hotelCabinetDetail(params,id){
        // return axios.get('/longan/api/cab/prod/' + id,{params})
        return axios.get('/longan/api/prod/cab/prod/profile/product/' + id,{params})
    },
    //柜子商品列表
    hotelCabinetCommodityList(params){
        // return axios.get('/longan/api/hotel/product/all',{params})
        // return axios.get('/longan/api/hotel/product/group',{params})
        return axios.get('/longan/api/prod/hotel/product/group',{params})
    },
    // //获取虚拟柜子配置数据
    // getCabinetConfig(params){
    //     return axios.get('/longan/api/cabinet/setting/hotel',{params})
    // },
    //获取虚拟柜子配置数据
    getCabinetConfig(params){
        return axios.get('/longan/api/cab/enter/setting/hotel',{params})
    },
    //条件查询酒店商品
    getHotelproduct(params){
      return axios.get('/longan/api/hotel/product/all',{params})
  },


    //柜子商品修改
    hotelCabinetCommodityModify(params,id){
        // return axios.patch('/longan/api/cab/prod/' + id, params)
        return axios.put('/longan/api/prod/cab/prod/profile/product/' + id, params)
    },
    //酒店未更换的格子列表
    hotelGridList(params){
        return axios.get('/longan/api/cabinet/lattice/needReplace', {params})
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
        // return axios.get('/longan/api/hotel/prod/pur/price', {params})
        return axios.get('/longan/api/prod/hotel/prod/pur/price/history', {params})
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
    //酒店商品管理-修改
    newHotelCommodityModify(params, id){
        // return axios.put('/longan/api/hotel/product/common/' + id, params)
        return axios.put('/longan/api/prod/hotel/product/'+ id +'/opr', params)
    },
    // --- 商品市场分类 ---
    //商品市场分类 - 新增
    HotelCommodityMarketAdd(params){
        return axios.post('/longan/api/hotel/prod/category/market', params)
    },
    //商品市场分类 - 列表
    hotelCommodityMarketList(params){
        return axios.get('/longan/api/hotel/prod/category/market', {params})
    },
    hotelCommodityMarketListM(params){
        return axios.get('/longan/api/hotel/market/category/hotel/all', {params})
    },
    //商品市场分类 - 导入模板
    hotelCommodityMarketTemplate(params){
        return axios.post('/longan/api/hotel/prod/category/market/hotel', params)
    },
    //商品市场分类 - 删除
    hotelCommodityMarketDelete(params, id){
        return axios.delete('/longan/api/hotel/prod/category/market/' + id, params)
    },
    //商品市场分类 - 详情
    hotelCommodityMarketDetail(params, id){
        return axios.get('/longan/api/hotel/prod/category/market/' + id, {params})
    },
    //商品市场分类 - 修改
    hotelCommodityMarketModify(params, id){
        return axios.put('/longan/api/hotel/prod/category/market/' + id, params)
    },

    //功能区
    HotelFuncList(params){
        return axios.get('/longan/api/hotel/func', {params})
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
         ------ 新库存管理 ------
    */
    //条件查询库存（分页，条件）
    checkstock(params){
      return axios.get('/longan/api/inv/inventory',params);
    },
    //出库单
    outhouselist(params){
      return axios.get('/longan/api/inv/out',params);
   },
    //出库单详情
    outhouseDetail(params,id){
      return axios.get('/longan/api/inv/out/'+id,params);
    },
    //获取入驻商下拉列表
    getmerchant(params){
      return axios.get('/longan/api/merchant/all',params);
    },

    /*
         ------ 客房服务-自有服务 ------
    */
    //服务类型列表
    serviceTypeList(params){
        // return axios.get('/longan/api/rmsvc/type', {params})
        return axios.get('/longan/api/rmsvc/category', {params})
    },
    //新增服务类型
    serviceTypeAdd(params){
        // return axios.post('/longan/api/rmsvc/type', params)
        return axios.post('/longan/api/rmsvc/category', params)
    },
    //删除服务类型
    serviceTypeDelete(params, id){
        // return axios.delete('/longan/api/rmsvc/type/' + id, params)
        return axios.delete('/longan/api/rmsvc/category/' + id, params)
    },
    //获取服务类型详情
    serviceTypeDetail(params, id){
        // return axios.get('/longan/api/rmsvc/type/' + id, {params})
        return axios.get('/longan/api/rmsvc/category/' + id, {params})
    },
    //修改服务类型
    serviceTypeModify(params, id){
        // return axios.patch('/longan/api/rmsvc/type/' + id, params)
        return axios.put('/longan/api/rmsvc/category/' + id, params)
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
        // return axios.get('/longan/api/rmsvc/hotel', {params})
        return axios.get('/longan/api/rmsvc/hotel_category', {params})
    },
    //酒店服务类型 - 启用
    hotelServiceEnable(params, id){
        return axios.put('/longan/api/rmsvc/hotel_category/'+ id +'/enable', params)
    },
    //酒店服务类型 - 禁用
    hotelServiceDisable(params, id){
        return axios.put('/longan/api/rmsvc/hotel_category/'+ id +'/disable', params)
    },
    //酒店名称列表
    getHotelNameAll(params){
        return axios.get('/longan/api/hotel/all', {params})
    },
    //酒店服务类型列表
    hotelserviceTypeList(params){
        return axios.get('/longan/api/rmsvc/hotel/selectTypeRorOpr', {params})
    },
    //添加酒店服务类型
    HotelServiceTypeAdd(params){
        // return axios.post('/longan/api/rmsvc/hotel', params)
        return axios.post('/longan/api/rmsvc/hotel_category', params)
    },
    //酒店服务类型 - 详情
    HotelServiceTypeDetail(params, id){
        return axios.get('/longan/api/rmsvc/hotel_category/' + id, {params})
    },
    //酒店服务类型 - 修改
    HotelServiceTypeModify(params, id){
        return axios.put('/longan/api/rmsvc/hotel_category/' + id, params)
    },
    //移除酒店服务类型
    HotelServiceTypeDelete(params, id){
        // return axios.delete('/longan/api/rmsvc/hotel/' + id, params)
        return axios.delete('/longan/api/rmsvc/hotel_category/' + id, params)
    },
    //服务类型目录 - 列表
    serviceCatalogueList(params, hsId){
        return axios.get('/longan/api/rmsvc/hotel_category/'+ hsId +'/catalog', {params})
    },
    //服务类型目录 - 新增
    serviceCatalogueAdd(params, hsId){
        return axios.post('/longan/api/rmsvc/hotel_category/'+ hsId +'/catalog', params)
    },
    //服务类型目录 - 详情
    serviceCatalogueDetail(params, hsId, id){
        return axios.get('/longan/api/rmsvc/hotel_category/'+ hsId +'/catalog/' + id, {params})
    },
    //服务类型目录 - 修改
    serviceCatalogueModify(params, hsId, id){
        return axios.put('/longan/api/rmsvc/hotel_category/'+ hsId +'/catalog/' + id, params)
    },
    //服务类型目录 - 删除
    serviceCatalogueDelete(params, hsId, id){
        return axios.delete('/longan/api/rmsvc/hotel_category/'+ hsId +'/catalog/' + id, params)
    },
    //服务类型明细 - 通用 - 列表
    serviceCommonList(params, hsId){
        return axios.get('/longan/api/rmsvc/hotel_category/' + hsId + '/style/common', {params})
    },
    //服务类型明细 - 通用 - 新增
    serviceCommonAdd(params, hsId){
        return axios.post('/longan/api/rmsvc/hotel_category/'+ hsId +'/style/common', params)
    },
    //服务类型明细 - 通用 - 详情
    serviceCommonDetail(params, hsId, id){
        return axios.get('/longan/api/rmsvc/hotel_category/'+ hsId +'/style/common/' + id, {params})
    },
    //服务类型明细 - 通用 - 修改
    serviceCommonModify(params, hsId, id){
        return axios.put('/longan/api/rmsvc/hotel_category/'+ hsId +'/style/common/' + id, params)
    },
    //服务类型明细 - 通用 - 删除
    serviceCommonDelete(params, hsId, id){
        return axios.delete('/longan/api/rmsvc/hotel_category/'+ hsId +'/style/common/' + id, params)
    },
    //服务类型明细 - 动态表单 - 列表
    serviceFormList(params, hsId){
        return axios.get('/longan/api/rmsvc/hotel_category/' + hsId + '/style/dynamic_form', {params})
    },
    //服务类型明细 - 动态表单 - 新增
    serviceFormAdd(params, hsId){
        return axios.post('/longan/api/rmsvc/hotel_category/' + hsId + '/style/dynamic_form', params)
    },
    //服务类型明细 - 动态表单 - 详情
    serviceFormDetail(params, hsId, id){
        return axios.get('/longan/api/rmsvc/hotel_category/'+ hsId +'/style/dynamic_form/' + id, {params})
    },
    //服务类型明细 - 动态表单 - 修改
    serviceFormModify(params, hsId, id){
        return axios.put('/longan/api/rmsvc/hotel_category/'+ hsId +'/style/dynamic_form/' + id, params)
    },
    //服务类型明细 - 动态表单 - 删除
    serviceFormDelete(params, hsId, id){
        return axios.delete('/longan/api/rmsvc/hotel_category/'+ hsId +'/style/dynamic_form/' + id, params)
    },
    //客房服务订单 - 列表
    ServiceOrderList(params){
        return axios.get('/longan/api/rmsvc/order', {params})
    },
    //客房服务订单 - 详情
    ServiceOrderDetail(params, id){
        return axios.get('/longan/api/rmsvc/order/' + id, {params})
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
    /*
        ------ 酒店特色-通用特色分类 ------
    */
    //通用酒店特色 - 分类列表
    commonFeatureList(params){
        return axios.get('/longan/api/hotel/feature/type', {params})
    },
    //通用酒店特色 - 分类新增
    commonFeatureAdd(params){
        return axios.post('/longan/api/hotel/feature/type', params)
    },
    //通用酒店特色 - 分类详情
    getCommonFeature(params, id){
        return axios.get('/longan/api/hotel/feature/type/' + id, {params})
    },
    //通用酒店特色 - 分类修改
    commonFeatureModify(params, id){
        return axios.patch('/longan/api/hotel/feature/type/' + id, params)
    },
    //通用酒店特色 - 分类删除
    commonFeaturedelete(params, id){
        return axios.delete('/longan/api/hotel/feature/type/' + id, params)
    },
    //酒店特色 - 列表 - 未使用的
    hotelfeatureList(params){
        return axios.get('/longan/api/hotel/feature/type/hotel', {params})
    },
    //酒店特色 - 添加
    HotelFeatureAdd(params){
        return axios.post('/longan/api/hotel/feature/hotel', params)
    },
    //酒店特色 - 列表
    hotelFeatureList(params){
        return axios.get('/longan/api/hotel/feature/hotel', {params})
    },
    //酒店特色 - 删除
    deleteHotelFeature(params, id){
        return axios.delete('/longan/api/hotel/feature/hotel/' + id, params)
    },
    //酒店特色明细 - 新增
    HotelFeatureDetailAdd(params){
        return axios.post('/longan/api/hotel/feature/detail', params)
    },
    //酒店特色明细 - 列表
    hotelFeatureDetail(params){
        return axios.get('/longan/api/hotel/feature/detail/condition', {params})
    },
    //酒店特色明细 - 删除
    hotelFeatureDetailDelete(params, id){
        return axios.delete('/longan/api/hotel/feature/detail/' + id, params)
    },
    //酒店特色明细 - 修改
    HotelFeatureDetailModify(params, id){
        return axios.patch('/longan/api/hotel/feature/detail/' + id, params)
    },
    //酒店特色明细 - 详情
    getHotelFeatureDetail(params){
        return axios.get('/longan/api/hotel/feature/detail', {params})
    },

    /*
        ------ 商品管理 ------
    */
    //商品管理 - 新增平台商品
    platformCommodityAdd(params){
        return axios.post('/longan/api/prod/product', params)
    },
    //商品管理 - 新增平台商品 - 卡券列表
    getHotelCouponList(params){
        return axios.get('/longan/api/vou/batch/org/vou/batch', {params})
    },
    //商品管理 - 平台商品列表
    platformCommodityList(params){
        return axios.get('/longan/api/prod/product', {params})
    },
    //商品管理 - 删除平台商品
    platformCommodityDelete(params, id){
        return axios.delete('/longan/api/prod/product/' + id, params)
    },
    //商品管理 - 平台商品详情
    PlatformCommodityDetail(params, id){
        return axios.get('/longan/api/prod/product/' + id, {params})
    },
    //商品管理 - 修改平台商品
    PlatformCommodityModify(params, id){
        return axios.put('/longan/api/prod/product/' + id, params)
    },
    //商品统计分类 - 新增
    commodityStatisticsAdd(params){
        return axios.post('/longan/api/prod/category', params)
    },
    //商品统计分类 - 列表
    commodityStatisticsList(params){
        return axios.get('/longan/api/prod/category', {params})
    },
    //商品统计分类 - 删除
    commodityStatisticsDelete(params, id){
        return axios.delete('/longan/api/prod/category/' + id, params)
    },
    //商品统计分类 - 详情
    commodityStatisticsDetail(params, id){
        return axios.get('/longan/api/prod/category/' + id, params)
    },
    //商品统计分类 - 修改
    commodityStatisticsModify(params, id){
        return axios.put('/longan/api/prod/category/' + id, params)
    },
    //商品市场分类模板 - 新增
    commodityMarketAdd(params){
        return axios.post('/longan/api/prod/category/market/tpl', params)
    },
    //商品市场分类模板 - 列表
    commodityMarketList(params){
        return axios.get('/longan/api/prod/category/market/tpl', {params})
    },
    //商品市场分类模板 - 删除
    commodityMarketDelete(params, id){
        return axios.delete('/longan/api/prod/category/market/tpl/' + id, params)
    },
    //商品市场分类模板 - 详情
    commodityMarketDetail(params, id){
        return axios.get('/longan/api/prod/category/market/tpl/' + id, {params})
    },
    //商品市场分类模板 - 修改
    commodityMarketModify(params, id){
        return axios.put('/longan/api/prod/category/market/tpl/' + id, params)
    },
    //酒店平台商品管理 - 添加
    hotelPlatCommodityAdd(params){
        // return axios.post('/longan/api/hotel/product', params)
        return axios.post('/longan/api/prod/hotel/product', params)
    },
    //酒店平台商品管理 - 添加 - 有效自提点列表
    getHotelPickUpPointList(params){
        return axios.get('/longan/api/hotel/pick/up/point/active/point', {params})
    },
    //酒店平台商品管理 - 添加 - 商品列表
    hotelPlatCommodityUnused(params){
        // return axios.get('/longan/api/prod/product/unused', {params})
        return axios.get('/longan/api/prod/product/opr/unused/product', {params})
    },
    //酒店平台商品管理 - 添加 - 酒店商品下未被选用的功能区列表
    hotelProdUnsedFunctionList(params){
        return axios.get('/longan/api/hotel/func/not/choose/func', {params})
    },
    //酒店平台商品管理 - 添加 - 酒店商品下未被选用的功能区市场分类
    hotelProdUnsedFunctionCategory(params){
        return axios.get('/longan/api/hotel/func/market/category/not/choose/category', {params})
    },
    //酒店平台商品管理 - 添加 - 酒店商品下未被选用的功能区市场分类---验证分成协议是否一致
    hotelProdUnsedVerifyAlloc(params){
        return axios.get('/longan/api/hotel/func/market/category/check/category/alloc', {params})
    },
    //酒店平台商品管理 - 列表
    hotelPlatCommodityList(params){
        // return axios.get('/longan/api/hotel/product', {params})
        return axios.get('/longan/api/prod/hotel/product', {params})
    },
    //酒店平台商品管理 - 列表 - 商品名称
    getProdList(params){
        return axios.get('/longan/api/prod/product/all', {params})
    },
    //酒店平台商品管理 - 列表 - 上下架
    hotelPlatCommodityStatus(params, id){
        return axios.put('/longan/api/hotel/product/shelf/' + id, params)
    },
    //酒店平台商品管理 - 详情
    hotelPlatCommodityDetail(params, id){
        // return axios.get('/longan/api/hotel/product/' + id, {params})
        return axios.get('/longan/api/prod/hotel/product/' + id, {params})
    },
    hotelPlatProdDelete(params,id){
        return axios.delete('/longan/api/prod/hotel/product/'+id,params)
    },
    //酒店平台商品管理 - 修改
    hotelPlatCommodityModify(params, id){
        // return axios.put('/longan/api/hotel/product/' + id, params)
        return axios.put('/longan/api/prod/hotel/product/review/' + id, params)
    },
    //酒店商品-未使用商品列表
    hotelUnusedProdList(params){
        // return axios.get('/longan/api/hotel/product/avail/mer/prod', {params})
        return axios.get('/longan/api/prod/product/mer/unused/product', {params})
    },
    //酒店商品-添加未使用商品
    hotelProdAdd(params){
        // return axios.post('/longan/api/hotel/product/mer/prod', params)
        return axios.post('/longan/api/prod/hotel/product/mer/prod', params)
    },
    //获取入驻商列表
    getHotelMerchant(params){
        return axios.get('/longan/api/merchant',{params});
    },

    /*
        ------ 配送管理 ------
    */
    //配送单 - 列表
    platDeliveryList(params){
        // return axios.get('/longan/api/deliv/order', {params})
        return axios.get('/longan/api/order/delivery', {params})
    },
    //配送单 - 详情
    platDeliveryDetail(params, id){
        // return axios.get('/longan/api/deliv/order/' + id, {params})
        return axios.get('/longan/api/order/delivery/' + id, {params})
    },
    //配送单 - 确认
    ensurePlatDelivery(params, id){
        // return axios.put('/longan/api/deliv/order/'+ id +'/confirm', params)
        return axios.put('/longan/api/order/delivery/confirm/'+ id, params)
    },
    //配送单 - 发货
    shipmentsPlatDelivery(params){
        // return axios.put('/longan/api/deliv/order/mail/'+ id, params)
        return axios.put('/longan/api/order/delivery/consignment', params)
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
          return axios.put('/longan/api/cabinet/common/'+id,params)
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
    queryhotel(params){
      return axios.get('/longan/api/pur/hotel/all',{params})
    },
    //查询酒店商品信息
    queryhotelprod(params,hotelId){
      return axios.get('/longan/api/pur/hotelProd/'+hotelId,params)
    },

     //获取酒店下需要库存的指定类型商品
     getHotelprodDataList(params){
        return axios.get('/longan/api/prod/hotel/product/inv',params);
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
    getProdNameList(params){
        return axios.get('/longan/api/prod/product/all',{params});
    },
    //获取所有酒店名称
    HotelNameList(params){
        return axios.get('/longan/api/hotel/all',{params});
    },

    //运营分析订单查询
    LonganOperationAnalysis(params){
        return axios.get('/longan/api/ops/cab/order',params);
    },
    //运营分析订单查询详情
    LonganOperationAnalysisDetail(id){
        return axios.get('/longan/api/ops/cab/order/'+id);
    },
    //运营分析订单查询详情
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
    },
    //补货费记录
    LonganReplenishmentFee(params){
      return axios.get('/longan/api/fin/repl',params);
    },
    //补货费提现记录
    LonganReplenishmentFeeDiscount(params){
      return axios.get('/longan/api/fin/repl/withdraw',params);
    },
    //获取酒店主题列表
    gethotelskinlist(params){
      return axios.get('/longan/api/hotel/theme',params);
    },
    //新增酒店主题
    addhotelskin(params){
      return axios.post('/longan/api/hotel/theme',params);
    },
    //获取主题注释
    gethotelskin(params){
      return axios.get('/longan/api/basic/settings/value',params);
    },
    //查看酒店主题详情
    lookhotelskindetail(params,id){
      return axios.get('/longan/api/hotel/theme/'+id,params);
    },
    //更新酒店主题
    updatehotelskin(params,id){
      return axios.patch('/longan/api/hotel/theme/'+id,params);
    },
    //删除酒店主题
    deletehotelskin(params,id){
      return axios.delete('/longan/api/hotel/theme/'+id,params);
    },
    //开票记录
    getinvoicerecordlist(params){
      return axios.get('/longan/api/fin/invoice',params);
    },
     //查询柜子更换记录
     replacecabinetcordlist(params){
      return axios.get('/longan/api/cab/replace',params);
    },
    //确认更换柜子
    launchreplacecabinet(id,params){
      return axios.patch('/longan/api/cab/replace/'+id,params);
    },
    //售后申请列表
    LonganHotelAfterSale(params){
        return axios.get('/longan/api/cs/request/',params);
    },
    //获取所有售后故障原因
    getrequestReasonlist(params){
        return axios.get('/longan/api/basic/dict/items/',params);
    },
    //获取所有入驻商
    getLonganMerchant(params){
        return axios.get('/longan/api/merchant',{params});
    },
    //新增入驻商
    addmerchant(params){
        return axios.post('/longan/api/merchant',params);
    },
    //校验入驻商唯一性
    isnumber(params){
        return axios.get('/longan/api/merchant/check',{params});
    },
    //删除入驻商
    deleteMerchant(id){
        return axios.delete('/longan/api/merchant/'+id);
    },
    //入驻商重置密码
    changepwd(id,params){
        return axios.post('/longan/api/merchant/password/'+id,params);
    },
    //修改入驻商-获取信息
    getMerchaninfo(id){
        return axios.get('/longan/api/merchant/'+id);
    },
    //修改入驻商
    changemerchant(id,params){
        return axios.patch('/longan/api/merchant/' + id,params)
    },
    //获取运营商信息
    getOperatorInfo(params){
        return axios.get('/longan/api/opr',{params});
    },
    //修改运营商信息
    changeOperator(id,params){
        return axios.patch('/longan/api/opr/' + id,params)
    },
    //酒店商城订单列表
    LonganOrderList(params){
        // return axios.get('/longan/api/order/hShop',{params})
        return axios.get('/longan/api/order',{params})
    },
    //订单商品详情
    orderProdDetail(params, id){
        return axios.get('/longan/api/order/' + id,{params})
    },
    //订单卡券详情
    orderCouponDetail(params, id){
        return axios.get('/longan/api/order/vou/' + id, {params})
    },
    //设置卡券批次是否有效
    getCardticketisActive(id){
       return axios.put('/longan/api/vou/batch/active/'+id)
    },
    LonganOrderProductDetails(id){
        return axios.get('/longan/api/order/hShop/'+id);
    },
    //订单配送单列表
    orderDeliveryDetail(params, id){
        return axios.get('/longan/api/order/' + id + '/deliv',{params})
    },
    LonganOrderDeliveryDetails(params){
        return axios.get('/longan/api/deliv/order/details',{params});
    },
    //根据的酒店组织Id产找酒店
    gethotelDataList(params,id){
    return axios.get('/longan/api/hotel/detail/'+id,params);
    },
    //查询售后申请列表
    aftersaleapplylist(params){
      return axios.get('/longan/api/cs/request/shop',params);
    },
    //查看售后申请详情 - 后台
    aftersaleapplydetail(params,id){
      return axios.get('/longan/api/cs/request/shop/'+id,params);
    },
    //处理售后申请-后台
    handleaftersale(params){
      return axios.put('/longan/api/cs/request/handle',params);
    },
    //酒店商品评价列表接口、酒店默认评价接口
    prodEvaluatelist(params){
      return axios.get('/longan/api/remark',params);
    },
    //获取所有酒店所有酒店商品（此接口在运营商新增默认评论处下拉商品用）
    allProdEvaluatelist(params){
      return axios.get('/longan/api/prod/hotel/product/all',params);
    },
    //酒店商品评价删除接口、删除默认评价
    DeleEvaluate(params,id){
      return axios.delete('/longan/api/remark/'+id,params);
    },

    //酒店商品评价详情接口、查看默认评价
    EvalDetail(params,id){
      return axios.get('/longan/api/remark/'+id,params);
    },

    //酒店商品评价详情接口、查看默认评价
    EvalUpload(params,id){
      return axios.put('/longan/api/remark/default/'+id,params);
    },

    //新增默认评价
    AdddefEvaluate(params){
      return axios.post('/longan/api/remark/default',params);
    },
    //条件查询酒店
    singlehotelprod(params){
      return axios.get('/longan/api/hotel/product/prodCode',params);
    },

    //获取组织账户
    getaccount(params){
      return axios.get('/longan/api/fin/account',params);
    },


    //获取组织分成
    getDivide(params){
      return axios.get('/longan/api/fin/revenue/org',params);
    },

    //获取组织提现记录
    withdrawMoneylist(params){
      return axios.get('/longan/api/fin/withdraw',params);
    },

    //提现详情
    getcashdetail(params,id){
      return axios.get('/longan/api/fin/withdraw/'+id,params);
    },
    //提现详情
    getcashdetail(params,id){
      return axios.get('/longan/api/fin/withdraw/'+id,params);
    },

    //获取组织
    getOrganization(params){
      return axios.get('/longan/api/basic/org',params);
    },
    //处理提现
    dealgetcash(params,id){
      return axios.put('/longan/api/fin/withdraw/'+id+'/deal',params);
    },
     //分成明细
    getDividetail(params){
      return axios.get('/longan/api/fin/income',params);
    },
    //分类分成
    getClassifydivide(params){
      return axios.get('/longan/api/fin/revenue/kind',params);
    },
    //获取合作伙伴管理列表(运营商)
     getPartnerdata(params){
      return axios.get('/longan/api/ally',params);
    },
    //新增合作伙伴信息
    addPartner(params){
      return axios.post('/longan/api/ally',params);
    },
    //获取合作伙伴详情信息
    getpartnerdetail(params,id){
      return axios.get('/longan/api/ally/'+id,params);
    },
    //禁用合作伙伴信息
    prohibitpartner(params,id){
      return axios.put('/longan/api/ally/forbidden/'+id,params);
    },
    //修改合作伙伴信息
    editpartner(params,id){
      return axios.put('/longan/api/ally/'+id,params);
    },
    //酒店合作伙伴列表(运营商后台)
    gethotelpartner(params){
      return axios.get('/longan/api/ally/hotel',params);
    },
    //移除酒店合作伙伴(运营商后台)
    Removehotelpartner(params,id){
      return axios.delete('/longan/api/ally/hotel/'+id,params);
    },
    //获取合作伙伴所有下拉列表
    Getselectpartner(params){
      return axios.get('/longan/api/ally/all/list',params);
    },
    //酒店合作伙伴详情(运营商后台)
    Gethotelpartnerdetail(params,id){
      return axios.get('/longan/api/ally/hotel/'+id,params);
    },
    //获取合作伙伴设置详情
    Getsetpartnerdetail(params){
      return axios.get('/longan/api/ally/setAHDetail',params);
    },
    //设置酒店合作伙伴(运营商后台)
    SetHotelpartner(params){
      return axios.post('/longan/api/ally/hotel',params);
    },
    //查询某个酒店可使用的柜子信息
    getWaitCabinet(params){
      return axios.get('/longan/api/ally/hotel/cab',params);
    },
    //获取某个类型下已关联的柜子信息
    getSelectCabinet(params){
      return axios.get('/longan/api/ally/hotel/cab/investType',params);
    },
    //创建某个合作伙伴下的柜子信息
    createSelectCabinet(params){
      return axios.post('/longan/api/ally/hotel/cab',params);
    },
    //重置密码
    Resetpassword(params,id){
      return axios.put('/longan/api/ally/password/'+id,params);
    },
    //查询某个酒店所有的柜子信息
    SearchHotelCab(params){
      return axios.get('/longan/api/ally/hotel/cab',params);
    },
    //所有酒店客房配送单
    AllDeliverylist(params){
    //   return axios.get('/longan/api/deliv/hotel/delivery',params);
        return axios.get('/longan/api/order/delivery/now', {params});
    },
    //根据ID获取酒店客房配送单信息
    AllDeliverydetail(params, id){
    //   return axios.get('/longan/api/deliv/hotel/delivery/'+id,params);
      return axios.get('/longan/api/order/delivery/' + id, {params});
    },
    //获取供应商列表
    supplierapply(params){
      return axios.get('/longan/api/mer/supplier',params);
    },
    //根据ID获取供应商详情
    supplierdetail(params,id){
      return axios.get('/longan/api/mer/supplier/'+id,params);
    },
    //审核供应商申请
    supplierExamine(params,id,reviewResult){
      return axios.put('/longan/api/mer/supplier/'+id+'/'+reviewResult,params);
    },

    /*
        ------ 财运星 ------
    */
    //投放酒店管理
    FsHotelSearch(params){
        return axios.get('/longan/api/fs/hotel', params);
    },
    FsHoteladdNew(params){
        return axios.post('/longan/api/fs/hotel', params);
    },
    FsHotelSearchSingle(id){
        return axios.get('/longan/api/fs/hotel/'+id);
    },
    FsHotelChange(id,params){
        return axios.put('/longan/api/fs/hotel/'+id,params);
    },
    FsHotelDelete(id){
        return axios.delete('/longan/api/fs/hotel/'+id);
    },
    FsHotelAble(params){
        return axios.get('/longan/api/fs/hotel/user',params);
    },
    //投放柜子管理
    FsHotelAll(){
        return axios.get('/longan/api/fs/hotel/all');
    },
    FsCabinetSearch(params){
        return axios.get('/longan/api/fs/cabinet', params);
    },
    FsCabinetaddNew(params){
        return axios.post('/longan/api/fs/cabinet', params);
    },
    FsCabinetSearchSingle(id){
        return axios.get('/longan/api/fs/cabinet/'+id);
    },
    FsCabinetChange(id,params){
        return axios.put('/longan/api/fs/cabinet/'+id,params);
    },
    FsCabinetDelete(id){
        return axios.delete('/longan/api/fs/cabinet/'+id);
    },
    //投资人管理
    FsPersonSearch(params){
        return axios.get('/longan/api/fs/investor', params);
    },
    FsPersonAccess(params){
        return axios.get('/longan/api/fs/investor/access', params);
    },
    FsPersonCoupon(params){
        return axios.get('/longan/api/fs/investor/coupon', params);
    },
    FsPersonOrder(params){
        return axios.get('/longan/api/fs/investor/order', params);
    },
    FsCabinetHotelAll(params){
        return axios.get('/longan/api/fs/cabinet/hotel',params);
    },
    FsCabinetInvestor(params){
        return axios.get('/longan/api/fs/investor/cabinet',params);
    },
    //柜子类型管理
    FsCabinetTypeGet(params){
        return axios.get('/longan/api/fs/cabType',params);
    },
    FsCabinetTypeAdd(params){
        return axios.post('/longan/api/fs/cabType',params);
    },
    FsCabinetTypeGetone(id){
        return axios.get('/longan/api/fs/cabType/'+id);
    },
    FsCabinetTypeChange(params,id){
        return axios.put('/longan/api/fs/cabType/'+id,params);
    },
    FsCabinetTypeDelete(id){
        return axios.delete('/longan/api/fs/cabType/'+id);
    },
    FsCabinetTypeAll(){
        return axios.get('/longan/api/fs/cabType/all');
    },
    //后台查看所有对应组织的商品售后
    PlatformAfterSale(params){
        return axios.get('/longan/api/cs/appl/prod',params);
    },
    //查看售后申请详情
    AfterSaleDetail(params,id){
        return axios.get('/longan/api/cs/appl/'+id,params);
    },
    //处理售后申请
    handleSaleApply(params,id){
        return axios.put('/longan/api/cs/appl/'+id,params);
    },
    //后台查看所有售后
    allAfterSale(params){
        return axios.get('/longan/api/cs/appl',params);
    },
    //会员管理
    FsMemberAll(params){
        return axios.get('/longan/api/fs/investor/member',params);
    },
    FsMemberAdd(params){
        return axios.post('/longan/api/fs/investor/member',params);
    },
    FsMemberChange(params,id){
        return axios.put('/longan/api/fs/investor/member/'+id,params);
    },
    FsMemberShareCom(params){
        return axios.get('/longan/api/fs/investor/partner',params);
    },
    FsMemberShareComRe(params){
        return axios.get('/longan/api/fs/investor/order/record',params);
    },
    FsMemberOne(id){
        return axios.get('/longan/api/fs/investor/'+id);
    },
    //消息模板列表
    getMessageList(params){
        return axios.get('/longan/api/message/template',params);
    },
    //消息模板创建
    createMessageTemp(params){
        return axios.post('/longan/api/message/template',params);
    },
    //消息内容模板列表
    messageTempData(params){
      return axios.get('/longan/api/message/content_template',params);
    },
    //编辑消息模板更新
    editMessageTemp(params,tpCode){
      return axios.put('/longan/api/message/template/'+tpCode,params)
    },
    //查看消息模板获取详情
    checkMessageTemp(params,tpCode){
      return axios.get('/longan/api/message/template/'+tpCode,params)
    },
    //消息模板禁用
    disableMessageTemp(params,tpCode){
      return axios.put('/longan/api/message/template/'+tpCode+'/disable',params)
    },
    //消息模板启用
    enableMessageTemp(params,tpCode){
      return axios.put('/longan/api/message/template/'+tpCode+'/enable',params)
    },
    //消息模板删除
    deleteMessageTemp(params,tpCode){
      return axios.delete('/longan/api/message/template/'+tpCode,params)
    },
    //消息模板测试
    testMessageTemp(params){
      return axios.post('/longan/api/message/test',params)
    },
    //待发送消息
    waiteSendMsg(params){
      return axios.get('/longan/api/message/sending',params)
    },
    //已发送消息
    SendMsg(params){
      return axios.get('/longan/api/message/record',params)
    },
    //消息内容模板列表
    contentTempList(params){
       return axios.get('/longan/api/message/content_template',params)
    },
    //消息内容模板创建
    createContentTemp(params){
       return axios.post('/longan/api/message/content_template',params)
    },
    //消息内容模板详情
    contentTempDetail(params,ctpCode){
       return axios.get('/longan/api/message/content_template/'+ctpCode,params)
    },
    //消息内容模板更新
    editContentTemp(params,ctpCode){
       return axios.put('/longan/api/message/content_template/'+ctpCode,params)
    },
    //消息内容模板删除
    delContentTemp(params,ctpCode){
       return axios.delete('/longan/api/message/content_template/'+ctpCode,params)
    },
    //创建运费模板
    createExpressFee(params){
        return axios.post('/longan/api/product/express/fee',params)
    },
    //查询运费模板
    getExpressFee(){
        return axios.get('/longan/api/product/express/fee')
    },
    //查询单个运费模板
    getExpressFeeOne(id){
        return axios.get('/longan/api/product/express/fee/'+id)
    },
    //修改运费模板
    changeExpressFee(params,id){
        return axios.put('/longan/api/product/express/fee/'+id,params)
    },
    //删除运费模板
    deleteExpressFee(id){
        return axios.delete('/longan/api/product/express/fee/'+id)
    },
    //提现列表
    getwithdrawAmount(params){
        return axios.get('/longan/api/fs/balance/detail/cashOut',params)
    },
    //提现列表处理
    handlewithdraw(params,id){
        return axios.put('/longan/api/fs/balance/detail/cashOut/handle/'+id,params)
    },
    //查询奖励
    getMemberBonus(params){
        return axios.get('/longan/api/fs/balance/detail/bonus',params)
    },
    //修改业务员状态
    changeMemberStatus(id,status){
        return axios.post('/longan/api/fs/investor/member/enable/'+id+'/'+status)
    },
    //修改业务员状态
    changeMemberShare(id,status){
        return axios.post('/longan/api/fs/investor/shareFlag/enable/'+id+'/'+status)
    },

    //获取已有指定组织商品的酒店
    getAppointHotel(params){
      return axios.get('/longan/api/hotel/curr/org/prod/hotel',params)
    },
    //获取指定酒店下所有有效酒店商品
    getAppointProd(params){
      return axios.get('/longan/api/prod/hotel/product/hotel/active/prod',params)
    },
    //获取指定酒店下所有有效酒店房源
    getAppointResource(params){
        return axios.get('/longan/api/book/resource/hotel',params)
      },
    //优惠券-功能区下拉列表
    getCouponFunctionList(params){
      return axios.get('/longan/api/hotel/func/hotel/all/vaild/func', {params})
    },

    //新增优惠券批次
    addCouponBatch(params){
      return axios.post('/longan/api/coupon/batch',params)
    },
    //修改优惠券批次
    editCouponBatch(params,id){
      return axios.put('/longan/api/coupon/batch/'+id,params)
    },
    //查看优惠券批次列表（分页，条件）
    getCouponBatch(params){
      return axios.get('/longan/api/coupon/batch',params)
    },
    //按组织类型分组可发放的批次
    getCouponBatchGroup(params){
      return axios.get('/longan/api/coupon/batch/can/give/orgKind/group', {params})
    },
    //查看优惠券批次详情
    checkCouponBatch(params,id){
      return axios.get('/longan/api/coupon/batch/'+id,params)
    },
    //设置优惠券批次是否有效
     couponIsActiv(params,id){
      return axios.put('/longan/api/coupon/batch/active/'+id,params)
     },
     //删除优惠券批次
     deleCouponBatch(params,id){
      return axios.delete('/longan/api/coupon/batch/'+id,params)
     },
     //发放优惠券
     grantCoupon(params){
      return axios.post('/longan/api/coupon/gived/record',params)
     },
    //新增优惠券分组
    addCouponGroup(params){
      return axios.post('/longan/api/coupon/group',params)
    },
    //获取当前登录的组织名
     getOrganName(params){
      return axios.get('/longan/api/basic/org/curr/org/name',params)
     },
    //查看优惠券分组列表（分页，条件）
    getCouponGroupList(params){
      return axios.get('/longan/api/coupon/group',params)
    },
    //删除优惠券分组
    delCouponGroup(params,id){
      return axios.delete('/longan/api/coupon/group/'+id,params)
    },
    //修改优惠券分组
    editCouponGroup(params,id){
      return axios.put('/longan/api/coupon/group/'+id,params)
    },
    //查看优惠券分组详情
    checkCouponGroup(params,id){
      return axios.get('/longan/api/coupon/group/'+id,params)
    },
    //获取指定组织下优惠券分组列表
    getAppointGroup(params){
      return axios.get('/longan/api/coupon/group/org',params)
    },
    //查看优惠券批次发放记录（分页，条件）
    getCouponGrantRecord(params){
      return axios.get('/longan/api/coupon/gived/record',params)
    },
    //查看优惠券批次发放记录明细列表（分页，条件）
    getCouponGrantDetail(params){
      return axios.get('/longan/api/coupon/gived/record/detail',params)
    },
    //查看优惠券列表（分页，条件）
    getCouponList(params){
      return axios.get('/longan/api/coupon/coupon',params)
    },
    //查看优惠券订单列表列表（分页，条件）
    getCouponOrder(params){
      return axios.get('/longan/api/coupon/coupon/order',params)
    },
    //设置优惠券是否有效
    getCouponisActive(params,id){
      return axios.put('/longan/api/coupon/coupon/active/'+id,params)
    },
    //延长有效期
    extendTime(params,id){
      return axios.put('/longan/api/coupon/coupon/term/'+id,params)
    },

    //获取控制板物联卡
    getControlCcids(params){
      return axios.get('/longan/api/cab/sim/factory/test',params)
    },
    //获取单个控制板物联卡
    getControlCcidone(id){
      return axios.get('/longan/api/cab/sim/factory/test/'+id)
    },
    //新增控制板物联卡
    addControlCcid(params){
      return axios.post('/longan/api/cab/sim/factory/test',params)
    },
    //修改控制板物联卡
    changeControlCcid(params,id){
      return axios.put('/longan/api/cab/sim/factory/test/'+id,params)
    },
    //删除控制板物联卡
    delControlCcid(id){
      return axios.delete('/longan/api/cab/sim/factory/test/'+id)
    },
    //启用/禁用控制板物联卡
    isActiveCcid(id,params){
      return axios.put('/longan/api/cab/sim/factory/test/active/'+id,params)
    },

    //获取下次首发时间
    getNextLaunchtime(){
      return axios.get('/longan/api/fs/settings/nextLunchTime')
    },
    //财运星退款记录
    forturnReback(params){
      return axios.get('/longan/api/fs/refound',params)
    },
    //创建柜子类型
    addCabinetType(params){
      return axios.post('/longan/api/basic/cabType',params)
    },
    //获取柜子类型列表
    CabinetType(params){
      return axios.get('/longan/api/basic/cabType/page',params)
    },
    //根据Id获取柜子类型
    CabinetTypeDetail(params,id){
      return axios.get('/longan/api/basic/cabType/'+id,params)
    },
    //修改柜子类型配置
    editCabinetType(params,id){
      return axios.put('/longan/api/basic/cabType/'+id,params)
    },
    //删除柜子类型
    delteCabinetType(params,id){
      return axios.delete('/longan/api/basic/cabType/'+id,params)
    },
    //获取所有需要补货/取货/换货的柜子列表信息--运营商后台
    getReplenish(params){
      return axios.get('/longan/api/repl/replenish',params)
    },
    //补货/取货/换货的柜子列表信息查看详情--运营商后台查看详情
    getReplenishDetail(params,cabId){
       return axios.get('/longan/api/repl/replenish/'+cabId)
    },
    //查询福袋领取记录
    getLuckyBagList(params){
       return axios.get('/longan/api/cab/welfare/draw/record',params)
    },

    //新增活动
    addActivity(params){
       return axios.post('/longan/api/act/act',params)
    },
    //查询活动
    selectActivity(params){
       return axios.get('/longan/api/act/act',params)
    },
    //查询单个活动
    selectActivityOne(id){
       return axios.get('/longan/api/act/act/'+id)
    },
    //修改单个活动
    changeActivityOne(params,id){
       return axios.put('/longan/api/act/act/'+id,params)
    },
    //修改单个活动状态
    changeActivityStatus(enable,id){
       return axios.put('/longan/api/act/act/'+id+'/status/'+enable)
    },
    //删除单个活动
    deleteActivityOne(id){
       return axios.delete('/longan/api/act/act/'+id)
    },
    //活动参与记录
    getActivityRecords(params){
       return axios.get('/longan/api/act/part_in/record',params)
    },
    //活动参与记录-查看详情
    getRecordsDetail(id){
       return axios.get('/longan/api/act/part_in/record/'+id)
    },
    //设置优惠券
    settingCoupons(id,params){
       return axios.put('/longan/api/act/hotel/newer_gift/'+id,params)
    },
    //查询红包
    searchRedPack(params){
       return axios.get('/longan/api/act/redPacket',params)
    },
    //查询红包领取记录
    searchRedPackRecords(id){
       return axios.get('/longan/api/act/redPacket/'+ id +'/record')
    },
    //活动获取优惠卷列表
    actGetCouponList(params){
       return axios.get('/longan/api/coupon/batch/drawable/act',params)
    },
    //财运星首发数据展示
    fsFirstDataShow(){
       return axios.get('/longan/api/fs/console')
    },
    //根据活动酒店修改活动明细
    setActShareRule(id,params){
        return axios.put('/longan/api/act/share_bonus/setting/'+id,params)
    },
    //根据活动酒店修改活动明细
    getActShareRule(params){
        return axios.get('/longan/api/act/share_bonus/setting',{params})
    },
    //活动明细管理 - 新人大礼包
    actDetailManage(params, actHotelId){
        return axios.put('/longan/api/act/hotel/newer_gift/' + actHotelId, params)
    },
    //活动明细管理 - 新人大礼包 - 优惠券列表
    getActCouponList(params){
        return axios.get('/longan/api/coupon/batch/drawable/act', {params})
    },
    //活动明细管理 - 新人大礼包 - 卡券列表
    getActVouList(params){
        return axios.get('/longan/api/vou/batch/hotel/vou/batch', {params})
    },

    //根据活动酒店新增修改商品红包活动明细
    setGoodsRedpackBili(id,params){
        return axios.put('/longan/api/act/red_packet/setting/prod/'+id,params)
    },
    //根据Id修改活动明细
    changeHouseRedpackBili(id,params){
        return axios.put('/longan/api/act/red_packet/setting/'+id,params)
    },
    //根据Id查询活动明细
    selectHouseRedpackOne(id){
        return axios.get('/longan/api/act/red_packet/setting/'+id)
    },
    //根据活动酒店新增活动明细
    addHouseRedpackOne(params){
        return axios.post('/longan/api/act/red_packet/setting',params)
    },
    //根据活动酒店查询活动明细
    selectHouseRedpackBili(params){
        return axios.get('/longan/api/act/red_packet/setting',params)
    },
    //获取带设置的房源
    getHouseFroms(id){
        return axios.get('/longan/api/act/hotel/room_resource/'+id)
    },
    //根据活动酒店删除活动明细
    deleteHouseRedpackOne(id){
        return axios.delete('/longan/api/act/red_packet/setting/'+id)
    },

    //新增酒店分销板块
    addHotelShareArea(params){
        return axios.post('/longan/api/mktg/share/setting',params)
    },
    //修改酒店分销板块
    changeHotelShareArea(params,id){
        return axios.put('/longan/api/mktg/share/setting/' + id,params)
    },
    //查询酒店分销板块
    getHotelShareArea(params){
        return axios.get('/longan/api/mktg/share/setting',params)
    },
    //查询单个酒店分销板块
    selHotelShareArea(id){
        return axios.get('/longan/api/mktg/share/setting/'+id)
    },
    //删除酒店分销板块
    delHotelShareArea(id){
        return axios.delete('/longan/api/mktg/share/setting/'+id)
    },
    //修改酒店分销板块开关
    changeModelOnoff(status,id){
        return axios.put('/longan/api/mktg/share/setting/'+id+'/status/'+status)
    },


    //条件查询酒店自提点列表
    selftakingList(params){
      return axios.get('/longan/api/hotel/pick/up/point',params)
    },
    //新增酒店自提点
    createSelftake(params){
      return axios.post('/longan/api/hotel/pick/up/point',params)
    },
    //启用/禁用自提点
    selftakeStatus(params,id){
      return axios.delete('/longan/api/hotel/pick/up/point/active/'+id,params)
    },
    //查看酒店自提点详情
    checkSelftakeDetail(params,id){
      return axios.get('/longan/api/hotel/pick/up/point/'+id,params)
    },
    //修改酒店自提点
    editSelftake(params,id){
      return axios.patch('/longan/api/hotel/pick/up/point/'+id,params)
    },
    //删除酒店自提点
    deleteSelftake(params,id){
      return axios.delete('/longan/api/hotel/pick/up/point/'+id)
    },
    //根据字体点ID查询自提点核销员工
    getSelftakeStaff(params){
      return axios.get('/longan/api/hotel/pick/up/point/verified/emp',params)
    },
    //根据酒店ID获取全部员工
    getAllSelftakeStaff(params){
      return axios.get('/longan/api/hotel/pick/up/point/hotel/emp',params)
    },
    //新增或者修改酒店自提点核销人员
    addSelftakeStaff(params){
      return axios.post('/longan/api/hotel/pick/up/point/verified/emp',params)
    },
    //营销-员工社群
    selMemberRelation(params){
        return axios.get('/longan/api/mktg/team/emp/member',params)
    },
    //营销-顾客社群
    selCustomerRelation(params){
        return axios.get('/longan/api/mktg/team/cus/member',params)
    },

    //营销-分享记录
    selHotelShareRecords(params){
        return axios.get('/longan/api/mktg/share/record',params)
    },
    selHotelVisitRecords(params){
        return axios.get('/longan/api/mktg/share/visit/record',params)
    },
    selHotelOrderRecords(params){
        return axios.get('/longan/api/mktg/share/order/record',params)
    },
    //员工收支记录
    cusEmpRecords(params){
        return axios.get('/longan/api/fin/emp',params)
    },
    //员工收支记录
    cusFinRecords(params){
        return axios.get('/longan/api/fin/cus',params)
    },
    //员工列表
    empRelationList(params){
        return axios.get('/longan/api/user/emp/org',params)
    },

    //新增进场配置
    addenterCabConf(params){
        return axios.post('/longan/api/cab/enter/setting',params)
    },
    //查询进场配置
    selenterCabConf(params){
        return axios.get('/longan/api/cab/enter/setting',params)
    },
    //删除进场配置
    delenterCabConf(id){
        return axios.delete('/longan/api/cab/enter/setting/'+id)
    },
    //单个进场配置
    selOneenterCabConf(id){
        return axios.get('/longan/api/cab/enter/setting/'+id)
    },
    //修改进场配置
    changeenterCabConf(params,id){
        return axios.put('/longan/api/cab/enter/setting/'+id,params)
    },

    //新增链接
    addNewLink(params){
        return axios.post('/longan/api/basic/link',params)
    },
    //查询链接
    selNewLink(params){
        return axios.get('/longan/api/basic/link',params)
    },
    //删除链接
    delNewLink(id){
        return axios.delete('/longan/api/basic/link/'+id)
    },
    //修改链接
    changeNewLink(params,id){
        return axios.patch('/longan/api/basic/link/'+id,params)
    },
    //单个链接
    seloneNewLink(id){
        return axios.get('/longan/api/basic/link/'+id)
    },

    //查询参数
    selNewParams(params){
        return axios.get('/longan/api/basic/link/parameter',params)
    },
    //新增参数
    addNewParams(params){
        return axios.post('/longan/api/basic/link/parameter',params)
    },
    //修改参数
    changeNewParams(params,id){
        return axios.patch('/longan/api/basic/link/parameter/'+id,params)
    },
    //单个参数
    selOneNewParams(id){
        return axios.get('/longan/api/basic/link/parameter/'+id)
    },
    //删除参数
    delNewParams(id){
        return axios.delete('/longan/api/basic/link/parameter/'+id)
    },
    //链接状态
    changelinkStatus(id){
        return axios.put('/longan/api/basic/link/enable/'+id)
    },
    //查看卡券批次列表（分页，条件）
    getCardticketList(params){
        return axios.get('/longan/api/vou/batch',params)
     },
     //(顾客管理)分页获取所有顾客信息
    getCardUser(params){
      return axios.get('/longan/api/vou/voucher/vou/cus',params)
    },
     //查看卡券批次详情
     CardticketDetail(params,id){
      return axios.get('/longan/api/vou/batch/'+id,params)
     },
     //查看卡券列表（分页，条件）
     getUseCardticketList(params){
      return axios.get('/longan/api/vou/voucher',params)
     },
      //查看用户卡券详情
      getUseCardticketDetail(params,id){
          return axios.get('/longan/api/vou/voucher/'+id,params)
      },
      //根据vouId获取卡券使用记录
      getUseCardticketRecord(params){
          return axios.get('/longan/api/vou/used/record',params)
      },
      //用户卡券延长有效期
      delayCardticketDate(params,id){
        return axios.put('/longan/api/vou/voucher/term/'+id,params)
      },
      //查看酒店外部物流列表（分页，条件）
      getHotelLogistics(params){
        return axios.get('/longan/api/lgc/hotel/logistics',params)
      },

      //新增酒店外部物流
      addHotelLogistics(params){
        return axios.post('/longan/api/lgc/hotel/logistics',params)
      },
      //获取未被酒店使用的外部物流
      selectOutLogistics(params){
        return axios.get('/longan/api/lgc/logistics/hotel/unused/logistics',params)
      },
      //查看酒店外部物流详情
      getLogisticsDetail(params,id){
        return axios.get('/longan/api/lgc/hotel/logistics/'+id,params)
      },
      //修改酒店外部物流
      editLogistics(params,id){
        return axios.put('/longan/api/lgc/hotel/logistics/'+id,params)
      },
      //删除酒店外部物流
      dellogistics(id){
        return axios.delete('/longan/api/lgc/hotel/logistics/'+id)
      },
      //查看外部物流列表（分页，条件）
      getlogistics(params){
        return axios.get('/longan/api/lgc/logistics',params)
      },
      //查看外部物流详情
      getOutLogisticsDetail(params,id){
        return axios.get('/longan/api/lgc/logistics/'+id,params)
      },
      //修改外部物流
      editOutLogistics(params,id){
        return axios.put('/longan/api/lgc/logistics/'+id,params)
      },

      //查看外部物流详情
      getAllCatGoods(params){
        return axios.get('/longan/api/prod/func/product/all/category/prod',params)
      },
      //查看外部物流详情
      getAllProduct(params){
        return axios.get('/longan/api/prod/func/product/all',params)
      },
      //查看外部物流详情
      getAllroomInfo(params){
        return axios.get('/longan/api/book/resource/list',{params})
      },
      //外部配送单
      exterDeliOrder(params){
         return axios.get('/longan/api/order/deliv/getPage',params)
      },
      //获取外部物流详情
      exterlogisticsDetail(id){
        return axios.get('/longan/api/order/deliv/getOne/'+id)
      },
      //获取外部物流
      exterlogistics(){
        return axios.get('/longan/api/lgc/logistics/hotel/getAlllogistics')
      },

      //解锁上下级关系
      unlockLink(params){
        return axios.get('/longan/api/mktg/team/relation/unLock',{params})
      },
      //酒店分销
      hotelShareTotal(params){
        return axios.get('/longan/api/mktg/team/hotel/census',{params})
      },
      //员工分销
      empShareTotal(params){
        return axios.get('/longan/api/mktg/team/hotel/user/census',{params})
      },

      //添加红包板块
      addRedpackModel(params){
        return axios.post('/longan/api/act/redPacket/setting/v2/detail',params)
      },
      //查询红包板块
      selRedpackModel(params){
        return axios.get('/longan/api/act/redPacket/setting/v2/detail',{params})
      },
      //查询单个红包板块
      selOneRedpackModel(id){
        return axios.get('/longan/api/act/redPacket/setting/v2/detail/'+id)
      },
      //所有广告业
      selAllAdPages(params){
        return axios.get('/longan/api/hotel/ad/setting/all',{params})
      },
      //删除红包板块
      delRedpackModel(id){
        return axios.delete('/longan/api/act/redPacket/setting/v2/detail/'+id)
      },
      //修改红包板块
      changeRedpackModel(params,id){
        return axios.put('/longan/api/act/redPacket/setting/v2/detail/'+id,params)
      },

      //修改明细板块
      resetRedpackModel(params,id){
        return axios.put('/longan/api/act/redPacket/setting/v2/v2/'+id,params)
      },

}

export default api
