/*
 *api接口统一管理
 */
import axios from './request.js'

const api = {
    upload_file_url: '/longan/api/basic/file/upload', //上传附件
    // upload_file_url: 'http://192.168.1.121:9001/longan/api/basic/file/upload', //上传附件
    // download_file_url: "http://testhotel.kefangbao.com.cn",//测试环境-下载文件
    // download_file_url:"http://testhotel.kefangbao.com.cn",//本地环境-下载文件
    download_file_url:"http://hotel.kefangbao.com.cn",//线上环境-下载文件

    login(params) { //登录
        return axios.post('/longan/api/user/login', params)
    },

    //获取权限
    authzcontroller(params) {
        return axios.get('/longan/api/authz/perm/emp/map', { params })
    },

    //商品销售发票 - 列表
    invoiceRateList(params) {
        return axios.get('/longan/api/fin/opr/rate/rate', { params })
    },

    //banner图片-链接列表
    basicDataItems_url(params) {
        return axios.get('/longan/api/basic/link/all', { params })
    },
    //banner图片-链接参数列表
    basicDataItems_urlParamsF(params) {
        return axios.get('/longan/api/hotel/func/image/link/param', { params })
    },
    basicDataItems_urlParamsH(params) {
        return axios.get('/longan/api/hotel/image/link/param', { params })
    },
    //酒店列表-查询
    hotelList(params) {
        return axios.get('/longan/api/hotel', { params })
    },
    /*
        ------ 广告页管理 ------
    */
    //广告页 - 列表
    hotelADList(params) {
        return axios.get('/longan/api/hotel/ad/setting', { params })
    },
    //广告页 - 新增
    hotelADAdd(params) {
        return axios.post('/longan/api/hotel/ad/setting', params)
    },
    //广告页 - 详情
    hotelADDetail(params, id) {
        return axios.get('/longan/api/hotel/ad/setting/' + id, { params })
    },
    //广告页 - 修改
    hotelADModify(params, id) {
        return axios.put('/longan/api/hotel/ad/setting/' + id, params)
    },
    //广告页 - 引用详情
    hotelADQuoteDetail(params, id) {
        return axios.get('/longan/api/hotel/ad/setting/' + id + '/used', { params })
    },
    //广告页 - 撤销修改
    ADModifyCancel(params, id) {
        return axios.put('/longan/api/hotel/ad/setting/' + id + '/undo', params)
    },
    //广告页 - 删除
    hotelADDelete(params, id) {
        return axios.delete('/longan/api/hotel/ad/setting/' + id, params)
    },
    //广告页 - 发布
    hotelADIssue(params, id) {
        return axios.put('/longan/api/hotel/ad/setting/' + id + '/issue', params)
    },

    /*
        ------ 规格管理 ------
    */
    //酒店商品规格 - 列表
    hotelProdSpecsList(params) {
        return axios.get('/longan/api/prod/hotel/product/spec', { params })
    },
    //酒店商品规格 - 添加 - 未使用的规格列表
    unusedProdSpecsList(params) {
        return axios.get('/longan/api/prod/product/spec/unused/spec', { params })
    },
    //酒店商品规格 - 添加
    hotelProdSpecsAdd(params) {
        return axios.post('/longan/api/prod/hotel/product/spec', params)
    },
    //酒店商品规格 - 添加全部
    hotelProdSpecsAllAdd(params, hotelProdId) {
        return axios.post('/longan/api/prod/hotel/product/spec/save/batch/' + hotelProdId, params)
    },
    //酒店商品规格 - 详情
    hotelProdSpecsDetail(params, id) {
        return axios.get('/longan/api/prod/hotel/product/spec/' + id, { params })
    },
    //酒店商品规格 - 修改
    hotelProdSpecsModify(params, id) {
        return axios.put('/longan/api/prod/hotel/product/spec/' + id, params)
    },
    //酒店商品规格 - 移除
    hotelProdSpecsDelete(params, id) {
        return axios.delete('/longan/api/prod/hotel/product/spec/' + id, params)
    },
    //功能区商品规格 - 列表
    funcProdSpecsList(params) {
        return axios.get('/longan/api/prod/func/product/spec', { params })
    },
    //功能区商品规格 - 添加 - 未使用的规格列表
    unusedFuncProdSpecsList(params) {
        return axios.get('/longan/api/prod/hotel/product/spec/unused/spec', { params })
    },
    //功能区商品规格 - 添加
    funcProdSpecsAdd(params) {
        return axios.post('/longan/api/prod/func/product/spec', params)
    },
    //功能区商品规格 - 添加全部
    funcProdSpecsAllAdd(params, funcProdId) {
        return axios.post('/longan/api/prod/func/product/spec/save/batch/' + funcProdId, params)
    },
    //功能区商品规格 - 详情
    funcProdSpecsDetail(params, id) {
        return axios.get('/longan/api/prod/func/product/spec/' + id, { params })
    },
    //功能区商品规格 - 修改
    funcProdSpecsModify(params, id) {
        return axios.put('/longan/api/prod/func/product/spec/' + id, params)
    },
    //功能区商品规格 - 移除
    funcProdSpecsDelete(params, id) {
        return axios.delete('/longan/api/prod/func/product/spec/' + id, params)
    },


    /*
        ------ 统计报表 ------
    */
    //过期商品 - 列表
    overdueProdList(params) {
        return axios.get('/longan/api/report/lattice/warranty', { params })
    },

    /*
        ------ 迷你吧商品管理 ------
    */
    //迷你吧配置-列表
    miniDeployList(params) {
        return axios.get('/longan/api/prod/cab/prod/profile', { params })
    },
    //迷你吧配置-新增-柜子类型列表
    cabTypeList(params) {
        return axios.get('/longan/api/basic/cabType/all', { params })
    },
    //迷你吧配置-新增
    miniDeployAdd(params) {
        return axios.post('/longan/api/prod/cab/prod/profile', params)
    },
    //迷你吧配置-详情
    miniDeployDetail(params, id) {
        return axios.get('/longan/api/prod/cab/prod/profile/' + id, { params })
    },
    //迷你吧配置-修改
    miniDeployModify(params, id) {
        return axios.put('/longan/api/prod/cab/prod/profile/' + id, params)
    },
    //迷你吧配置-删除
    miniDeployDelete(params, id) {
        return axios.delete('/longan/api/prod/cab/prod/profile/' + id, params)
    },
    //迷你吧配置-选择商品-验证有没有配置房间
    validIsHaveRoom(params) {
        return axios.get('/longan/api/prod/cab/prod/profile/room/vaild', { params })
    },
    //迷你吧配置-选择房间-酒店未使用的房间列表
    getMiniRoomList(params) {
        return axios.get('/longan/api/cabinet/unused/room', { params })
    },
    //迷你吧配置-选择房间-已使用的房间列表
    getSelectedRoomList(params) {
        return axios.get('/longan/api/prod/cab/prod/profile/room', { params })
    },
    //迷你吧配置-选择房间-保存选择的房间
    modifyMiniRoom(params) {
        return axios.post('/longan/api/prod/cab/prod/profile/room', params)
    },

    /*
        ------ 功能区商品管理 ------
    */
    //商品管理 - 平台商品列表
    platformCommodityList(params) {
        return axios.get('/longan/api/prod/product', { params })
    },
    //功能区商品-列表
    functionProdList(params) {
        return axios.get('/longan/api/prod/func/product', { params })
    },
    //功能区商品-上下架
    functionProdStatus(params, id) {
        return axios.put('/longan/api/prod/func/product/shelf/' + id, params)
    },
    //功能区商品-功能区下拉列表
    getHotelFunctionList(params) {
        return axios.get('/longan/api/hotel/func/hotel/vaild/func', { params })
    },
    //功能区商品-商品下拉列表
    getFunctionProdList(params) {
        return axios.get('/longan/api/prod/hotel/product/func/unused', { params })
    },
    //功能区商品-添加
    functionProdAdd(params) {
        return axios.post('/longan/api/prod/func/product', params)
    },
    //功能区商品-详情
    functionProdDetail(params, id) {
        return axios.get('/longan/api/prod/func/product/' + id, { params })
    },
    //功能区商品-修改
    functionProdModify(params, id) {
        return axios.put('/longan/api/prod/func/product/' + id, params)
    },
    //功能区商品-删除
    functionProdDelete(params, id) {
        return axios.delete('/longan/api/prod/func/product/' + id, params)
    },

    /*
        ------ 酒店功能区 ------
    */
    //功能区-列表
    hotelFunctionList(params) {
        return axios.get('/longan/api/hotel/func', { params })
    },
    //功能区-新增
    hotelFunctionAdd(params) {
        return axios.post('/longan/api/hotel/func', params)
    },
    //功能区-详情
    hotelFunctionDetail(params, id) {
        return axios.get('/longan/api/hotel/func/' + id, { params })
    },
    //检验功能区配送方式是否可修改
    isDisableDelivWay(params) {
        return axios.get('/longan/api/prod/func/product/vaild', { params })
    },
    //功能区-修改-酒店外部物流
    getLgcList(params) {
        return axios.get('/longan/api/lgc/hotel/logistics/hotel/logistics', { params })
    },
    //功能区-修改
    hotelFunctionModify(params, id) {
        return axios.put('/longan/api/hotel/func/' + id, params)
    },
    //功能区-删除
    hotelFunctionDelete(params, id) {
        return axios.delete('/longan/api/hotel/func/' + id, params)
    },
    //功能区分类-树
    functionClassifyTree(params) {
        return axios.get('/longan/api/hotel/func/market/category', { params })
    },
    //功能区分类-新增
    functionClassifyAdd(params) {
        return axios.post('/longan/api/hotel/func/market/category', params)
    },
    //功能区分类-详情
    functionClassifyDetail(params, id) {
        return axios.get('/longan/api/hotel/func/market/category/' + id, { params })
    },
    //功能区分类-修改
    functionClassifyModify(params, id) {
        return axios.put('/longan/api/hotel/func/market/category/' + id, params)
    },
    //功能区分类-删除
    functionClassifyDelete(params, id) {
        return axios.delete('/longan/api/hotel/func/market/category/' + id, params)
    },

    /*
        ------ 开票管理 ------
    */
    //开票管理-列表
    allInvoiceProdList(params) {
        return axios.get('/longan/api/fin/inv/org', { params })
    },
    //开票管理-详情
    allInvoiceProdDetail(params, id) {
        return axios.get('/longan/api/fin/inv/' + id, { params })
    },
    //开票管理-处理
    allInvoiceProdDeal(params, id) {
        return axios.put('/longan/api/fin/inv/' + id + '/handle', params)
    },

    /*
        ------ 酒店商品管理 ------
    */
    //酒店商品-移除已使用商品
    hotelProdDelete(params, id) {
        // return axios.delete('/longan/api/hotel/product/' + id, params)
        return axios.delete('/longan/api/prod/hotel/product/' + id, params)
    },
    //酒店商品-未使用商品列表
    hotelUnusedProdList(params) {
        // return axios.get('/longan/api/hotel/product/avail/mer/prod', {params})
        return axios.get('/longan/api/prod/product/mer/unused/product', { params })
    },
    //酒店商品-添加未使用商品
    hotelProdAdd(params) {
        // return axios.post('/longan/api/hotel/product/mer/prod', params)
        return axios.post('/longan/api/prod/hotel/product/mer/prod', params)
    },
    // --- 管理柜子商品 ---
    //柜子列表
    hotelCabinetList(params) {
        // return axios.get('/longan/api/cab/prod',{params})
        return axios.get('/longan/api/prod/cab/prod/profile/product', { params })
    },
    //验证是否有权修改、清除
    hotelCabinetLimits(params, id) {
        return axios.get('/longan/api/cab/prod/access/update/' + id, { params })
    },
    //柜子清除
    hotelCabinetClear(params, id) {
        // return axios.patch('/longan/api/cab/prod/clear/' + id, params)
        return axios.put('/longan/api/prod/cab/prod/profile/product/clear/' + id, params)
    },
    //柜子商品详情
    hotelCabinetDetail(params, id) {
        // return axios.get('/longan/api/cab/prod/' + id,{params})
        return axios.get('/longan/api/prod/cab/prod/profile/product/' + id, { params })
    },
    //柜子商品列表
    hotelCabinetCommodityList(params) {
        // return axios.get('/longan/api/hotel/product/group',{params})
        return axios.get('/longan/api/prod/hotel/product/group', { params })
    },
    //柜子商品修改
    hotelCabinetCommodityModify(params, id) {
        // return axios.patch('/longan/api/cab/prod/' + id, params)
        return axios.put('/longan/api/prod/cab/prod/profile/product/' + id, params)
    },
    // //获取虚拟柜子配置数据
    // getCabinetConfig(params){
    //     return axios.get('/longan/api/cabinet/setting/hotel',{params})
    // },


    /*
        ------ 虚拟柜配置 ------
    */

    //查询虚拟柜配置
    hotelCabinetSet(params) {
        return axios.get('/longan/api/cabinet/setting', params)
    },
    //新增虚拟柜配置
    hotelCabinetAdd(params) {
        return axios.post('/longan/api/cabinet/setting', params)
    },
    //修改虚拟柜配置
    hotelCabinetChange(params, id) {
        return axios.put('/longan/api/cabinet/setting/' + id, params)
    },
    //查看单个虚拟柜配置
    hotelCabinetLook(id) {
        return axios.get('/longan/api/cabinet/setting/' + id)
    },
    //删除单个虚拟柜配置
    hotelCabinetCancel(id) {
        return axios.delete('/longan/api/cabinet/setting/' + id)
    },

    /*
        ------ 市场分类 ------
    */
    //酒店商品市场分类 - 详情
    getHotelMarketDetail(params) {
        return axios.get('/longan/api/hotel/market/category', { params })
    },
    //酒店商品市场分类 - 新增
    hotelMarketAdd(params) {
        return axios.post('/longan/api/hotel/market/category', params)
    },
    //酒店商品市场分类 - 详情
    hotelMarketDetail(params, id) {
        return axios.get('/longan/api/hotel/market/category/' + id, { params })
    },
    //酒店商品市场分类 - 修改
    hotelMarketModify(params, id) {
        return axios.put('/longan/api/hotel/market/category/' + id, params)
    },
    //酒店商品市场分类 - 删除
    hotelMarketDelete(params, id) {
        return axios.delete('/longan/api/hotel/market/category/' + id, params)
    },
    //酒店商品市场分类 - 导入模板
    hotelMarketTpl(params, id) {
        return axios.post('/longan/api/hotel/market/category/tpl/' + id, params)
    },

    /*
        ------ 酒店文化 ------
    */
    //酒店文化故事 - 新增
    hotelCultureAdd(params) {
        return axios.post('/longan/api/hotel/culture', params)
    },
    //酒店文化故事 - 列表
    hotelCultureList(params) {
        return axios.get('/longan/api/hotel/culture/story', { params })
    },
    //酒店文化故事 - 详情
    hotelCultureDetail(params, id) {
        return axios.get('/longan/api/hotel/culture/' + id, { params })
    },
    //酒店文化故事 - 修改
    hotelCultureModify(params, id) {
        return axios.put('/longan/api/hotel/culture/' + id, params)
    },
    //酒店文化故事 - 删除
    hotelCultureDelete(params, id) {
        return axios.delete('/longan/api/hotel/culture/' + id, params)
    },
    //酒店文化故事条目 - 新增
    hotelCultureDetailAdd(params, id) {
        return axios.post('/longan/api/hotel/culture/' + id + '/details', params)
    },
    //酒店文化故事条目 - 列表
    hotelCultureDetailList(params, id) {
        return axios.get('/longan/api/hotel/culture/' + id + '/details', { params })
    },
    //酒店文化故事条目 - 详情
    hotelCultureDetailDetail(params, id, did) {
        return axios.get('/longan/api/hotel/culture/' + id + '/details/' + did, { params })
    },
    //酒店文化故事条目 - 修改
    hotelCultureDetailModify(params, id, did) {
        return axios.post('/longan/api/hotel/culture/' + id + '/details/' + did, params)
    },
    //酒店文化故事条目 - 删除
    hotelCultureDetailDelete(params, id, did) {
        return axios.delete('/longan/api/hotel/culture/' + id + '/details/' + did, params)
    },

    /*
        ------ 客房预订 ------
    */
    //房型管理 - 列表
    bookTypeList(params) {
        return axios.get('/longan/api/book/type', { params })
    },
    //字典表
    basicDataItems(params) {
        return axios.get('/longan/api/basic/dict/items', { params })
    },
    //房型管理 - 修改状态
    bookTypeChangeStatus(params, id, status) {
        return axios.put('/longan/api/book/type/' + id + '/enable/' + status, params)
    },
    //房型管理 - 新增
    bookTypeAdd(params) {
        return axios.post('/longan/api/book/type', params)
    },
    //房型管理 - 详情
    bookTypeDetail(params, id) {
        return axios.get('/longan/api/book/type/' + id, { params })
    },
    //房型管理 - 修改
    bookTypeModify(params, id) {
        return axios.put('/longan/api/book/type/' + id, params)
    },
    //房型管理 - 删除
    bookTypeDelete(params, id) {
        return axios.delete('/longan/api/book/type/' + id, params)
    },
    //房型管理 - 房型列表
    getBookTypeList(params) {
        return axios.get('/longan/api/book/type/list', { params })
    },
    //房源管理 - 列表
    bookResourceList(params) {
        return axios.get('/longan/api/book/resource', { params })
    },
    //房源管理 - 新增
    bookResourceAdd(params) {
        return axios.post('/longan/api/book/resource', params)
    },
    //房源管理 - 详情
    bookResourceDetail(params, id) {
        return axios.get('/longan/api/book/resource/' + id, { params })
    },
    //房源管理 - 修改
    bookResourceModify(params, id) {
        return axios.put('/longan/api/book/resource/' + id, params)
    },
    //房源管理 - 删除
    bookResourceDelete(params, id) {
        return axios.delete('/longan/api/book/resource/' + id, params)
    },
    //房源管理 - 房源列表
    getBookResourceList(params) {
        return axios.get('/longan/api/book/resource/list', { params })
    },
    //房型管理 - 修改状态
    bookResourChangeStatus(params, id, status) {
        return axios.put('/longan/api/book/resource/' + id + '/enable/' + status, params)
    },
    //房价管理 - 房价信息
    bookPriceInfo(params) {
        return axios.get('/longan/api/book/price', { params })
    },
    //房价管理 - 房价修改
    bookPriceModify(params) {
        return axios.put('/longan/api/book/price', params)
    },
    //房价管理 - 新增变价单
    bookPriceChange(params) {
        return axios.post('/longan/api/book/price/change', params)
    },
    //房价管理 - 查询变价单
    getBookPriceChange(params) {
        return axios.get('/longan/api/book/price/change', { params })
    },
    //房态管理 - 房态信息
    bookStatusInfo(params) {
        return axios.get('/longan/api/book/state', { params })
    },
    //房态管理 - 房态修改
    bookStatusModify(params) {
        return axios.put('/longan/api/book/state', params)
    },
    //房态管理 - 查询房态操作
    bookStatusHandleList(params) {
        return axios.get('/longan/api/book/state/change', { params })
    },

    //功能区房源 - 功能区房源列表
    getBookFuncResourceList(params) {
        return axios.get('/longan/api/book/func/resource', { params })
    },
    //功能区房源 - 新增功能区房源
    bookFuncResourceAdd(params) {
        return axios.post('/longan/api/book/func/resource', params)
    },
    //功能区房源 - 功能区房源详情
    bookFuncResourceDetail(params, id) {
        return axios.get('/longan/api/book/func/resource/' + id, params)
    },
    //功能区房源 - 修改功能区房源
    bookFuncResourceEdit(params, id) {
        return axios.put('/longan/api/book/func/resource/' + id, params)
    },
    //功能区房源 - 删除功能区房源
    bookFuncResourceDelete(params, id) {
        return axios.delete('/longan/api/book/func/resource/' + id, params)
    },
    /*
        ------ 订单管理 ------
    */
    //订单管理 - 列表
    bookOrderList(params) {
        return axios.get('/longan/api/book/order', { params })
    },
    //订单管理 - 订单计数
    bookOrderCount(params) {
        return axios.get('/longan/api/book/order/count', { params })
    },
    //订单管理 - 详情
    bookOrderDetail(params, id) {
        return axios.get('/longan/api/book/order/' + id, { params })
    },
    //订单管理 - 确认 - 房间数量
    checkOrderRoomnum(params) {
        return axios.get('/longan/api/book/order/check/predict', { params })
    },
    //订单管理 - 处理 - 预订订单
    ensureOrderDeal(params, id) {
        return axios.put('/longan/api/book/order/' + id, params)
    },
    //订单管理 - 处理 - 拒绝订单
    ensureOrderReject(params, id) {
        return axios.put('/longan/api/book/order/' + id + '/reject', params)
    },
    //订单管理 - 处理 - 后台退订
    bookOrderApplyUnSubAdmin(params, id) {
        return axios.put('/longan/api/book/order/applyUnSub/' + id + '/admin', params)
    },
    //订单管理 - 处理 - 订单退订
    orderUnsubscribeDeal(params, id) {
        return axios.put('/longan/api/book/order/deal/' + id, params)
    },
    //订单管理 - 核销
    bookOrderWriteOff(params, id) {
        return axios.put('/longan/api/book/order/' + id + '/writeOff', params)
    },
    //堂食订单 - 修改订单商品 - 功能区商品
    getFuncProdList(params) {
        return axios.get('/longan/api/prod/func/product/category/prod', { params })
    },
    /*
        ------ 运费模板 ------
    */
    //创建运费模板
    createExpressFee(params) {
        return axios.post('/longan/api/product/express/fee', params)
    },
    //查询运费模板
    getExpressFee() {
        return axios.get('/longan/api/product/express/fee')
    },
    //查询单个运费模板
    getExpressFeeOne(id) {
        return axios.get('/longan/api/product/express/fee/' + id)
    },
    //修改运费模板
    changeExpressFee(params, id) {
        return axios.put('/longan/api/product/express/fee/' + id, params)
    },
    //删除运费模板
    deleteExpressFee(id) {
        return axios.delete('/longan/api/product/express/fee/' + id)
    },

    /*
        ------ 酒店管理 ------
    */
    //获取省、市、区
    provinceGet(params) {
        return axios.get('/longan/api/basic/dict/items', { params })
    },
    //获取酒店皮肤
    skinGet(params) {
        return axios.get('/longan/api/hotel/theme/all', { params })
    },
    //酒店详情
    hotelDetail(id) {
        // return axios.get('/longan/api/hotel/detail/' + encryptedHotelOrgId, {params})
        return axios.get('/longan/api/hotel/' + id)
    },
    //酒店修改
    hotelModify(params, id) {
        return axios.patch('/longan/api/hotel/' + id, params)
    },
    //酒店未更换的格子列表
    hotelGridList(params) {
        return axios.get('/longan/api/cabinet/lattice/needReplace', { params })
    },
    /*------ 自营商品管理 ------*/
    //商品统计分类 - 列表
    commodityStatisticsList(params) {
        return axios.get('/longan/api/prod/category', { params })
    },
    //自营商品 - 新增
    ownCommodityAdd(params) {
        // return axios.post('/longan/api/hotel/product', params)
        return axios.post('/longan/api/prod/hotel/product', params)
    },
    //自营商品 - 新增 - 卡券列表
    getHotelCouponList(params) {
        return axios.get('/longan/api/vou/batch/org/vou/batch', { params })
    },
    //自营商品 - 新增 - 优惠券列表
    getProdCouponList(params) {
        return axios.post('/longan/api/coupon/batch/can/sell', params)
    },
    //自营商品 - 新增 - 有效自提点列表
    getHotelPickUpPointList(params) {
        return axios.get('/longan/api/hotel/pick/up/point/active/point', { params })
    },
    //酒店平台商品管理 - 添加 - 酒店商品下未被选用的功能区列表
    hotelProdUnsedFunctionList(params) {
        return axios.get('/longan/api/hotel/func/not/choose/func', { params })
    },
    //酒店平台商品管理 - 添加 - 酒店商品下未被选用的功能区市场分类
    hotelProdUnsedFunctionCategory(params) {
        return axios.get('/longan/api/hotel/func/market/category/not/choose/category', { params })
    },
    //酒店平台商品管理 - 添加 - 酒店商品下未被选用的功能区市场分类---验证分成协议是否一致
    hotelProdUnsedVerifyAlloc(params) {
        return axios.get('/longan/api/hotel/func/market/category/check/category/alloc', { params })
    },
    //自营商品 - 列表
    ownCommodityList(params) {
        // return axios.get('/longan/api/hotel/product', {params})
        return axios.get('/longan/api/prod/hotel/product', { params })
    },
    //自营商品 - 列表 - 上下架
    ownCommodityStatus(params, id) {
        return axios.put('/longan/api/hotel/product/shelf/' + id, params)
    },
    //自营商品 - 删除
    ownCommodityDelete(params, id) {
        // return axios.delete('/longan/api/hotel/product/' + id, params)
        return axios.delete('/longan/api/prod/hotel/product/' + id, params)
    },
    //自营商品 - 详情
    ownCommodityDetail(params, id) {
        // return axios.get('/longan/api/hotel/product/' + id, {params})
        return axios.get('/longan/api/prod/hotel/product/' + id, { params })
    },
    //酒店平台商品管理 - 添加 - 商品列表
    hotelPlatCommodityUnused(params) {
        // return axios.get('/longan/api/prod/product/unused', {params})
        return axios.get('/longan/api/prod/product/opr/unused/product', { params })
    },
    //自营商品 - 修改
    ownCommodityModify(params, id) {
        // return axios.put('/longan/api/hotel/product/' + id, params)
        return axios.put('/longan/api/prod/hotel/product/review/' + id, params)
    },
    //获取酒店全部分成协议
    getprotocolList(params) {
        // return axios.get('/longan/api/hotel/agreement/all', {params})
        return axios.get('/longan/api/fin/alloc/all', { params })
    },
    /*------ 商品市场分类 ------*/
    //市场分类 - 新增
    hotelCommodityMarketAdd(params) {
        return axios.post('/longan/api/hotel/prod/category/market', params)
    },
    //市场分类 - 列表
    hotelCommodityMarketList(params) {
        return axios.get('/longan/api/hotel/prod/category/market', { params })
    },
    hotelCommodityMarketListM(params) {
        return axios.get('/longan/api/hotel/market/category/hotel/all', { params })
    },
    //商品市场分类 - 导入模板
    hotelCommodityMarketTemplate(params) {
        return axios.post('/longan/api/hotel/prod/category/market/hotel', params)
    },
    //市场分类 - 删除
    hotelCommodityMarketDelete(params, id) {
        return axios.delete('/longan/api/hotel/prod/category/market/' + id, params)
    },
    //市场分类 - 详情
    hotelCommodityMarketDetail(params, id) {
        return axios.get('/longan/api/hotel/prod/category/market/' + id, { params })
    },
    //市场分类 - 修改
    hotelCommodityMarketModify(params, id) {
        return axios.put('/longan/api/hotel/prod/category/market/' + id, params)
    },

    /*
        ------ 配送管理 ------
    */
    //配送单 - 列表
    platDeliveryList(params) {
        // return axios.get('/longan/api/deliv/order', {params})
        return axios.get('/longan/api/order/delivery', { params })
    },
    //配送单 - 详情
    platDeliveryDetail(params, id) {
        // return axios.get('/longan/api/deliv/order/' + id, {params})
        return axios.get('/longan/api/order/delivery/' + id, { params })
    },
    //配送单 - 确认
    ensurePlatDelivery(params, id) {
        // return axios.put('/longan/api/deliv/order/'+ id +'/confirm', params)
        return axios.put('/longan/api/order/delivery/confirm/' + id, params)
    },
    //配送单 - 发货
    shipmentsPlatDelivery(params) {
        // return axios.put('/longan/api/deliv/order/mail/'+ id, params)
        return axios.put('/longan/api/order/delivery/consignment', params)
    },
    //配送单 - 重新发单
    againShipmentsDelivery(params) {
        return axios.get('/longan/api/order/deliv/getOrderStatus2', { params })
    },
    //配送单 - 更新状态
    updateLgcStatus(params) {
        return axios.get('/longan/api/order/delivery/lgc/status', { params })
    },

    /*
        ------ 库存管理 ------
    */
    //库存列表
    inventoryList(params) {
        return axios.get('/longan/api/hotel/prod', { params })
    },
    //入库明细
    warehousingList(params) {
        return axios.get('/longan/api/inv/in/detail', { params })
    },
    //销售明细
    salesList(params) {
        return axios.get('/longan/api/buy/cab/order', { params })
    },
    /*------ 入库单管理 ------*/
    //入库单列表
    godownEntryList(params) {
        return axios.get('/longan/api/inv/in', { params })
    },
    //入库单详情
    godownEntryDetail(params, id) {
        return axios.get('/longan/api/inv/in/' + id, { params })
    },
    //入库单编号
    godownEntryDataCode(params) {
        return axios.get('/longan/api/inv/in/squ/access', { params })
    },
    //商品列表
    commodityDataList(params) {
        return axios.get('/longan/api/hotel/prod/all', { params })
    },
    //新增入库单
    godownEntryAdd(params) {
        return axios.post('/longan/api/inv/in', params)
    },
    //修改入库单
    godownEntryModify(params, id) {
        return axios.put('/longan/api/inv/in/' + id, params)
    },

    /*------ 补货管理 ------*/
    //补货/换货 - 列表
    getReplenishList(params) {
        return axios.get('/longan/api/repl/emptyLattice', { params })
    },
    //补货/换货 - 总计
    replenishTotal(params) {
        return axios.get('/longan/api/repl/emp/amount', { params })
    },
    //取货 - 列表
    getClaimGoodsList(params) {
        return axios.get('/longan/api/repl/emp/replace', { params })
    },

    /*
        ------ 酒店特色 ------
    */
    //酒店特色 - 列表 - 未使用的
    hotelfeatureList(params) {
        return axios.get('/longan/api/hotel/feature/type/hotel', { params })
    },
    //酒店特色 - 添加
    HotelFeatureAdd(params) {
        return axios.post('/longan/api/hotel/feature/hotel', params)
    },
    //酒店特色 - 列表
    hotelFeatureList(params) {
        return axios.get('/longan/api/hotel/feature/hotel', { params })
    },
    //酒店特色 - 删除
    deleteHotelFeature(params, id) {
        return axios.delete('/longan/api/hotel/feature/hotel/' + id, params)
    },
    //酒店特色明细 - 新增
    HotelFeatureDetailAdd(params) {
        return axios.post('/longan/api/hotel/feature/detail', params)
    },
    //酒店特色明细 - 列表
    hotelFeatureDetail(params) {
        return axios.get('/longan/api/hotel/feature/detail/condition', { params })
    },
    //酒店特色明细 - 删除
    hotelFeatureDetailDelete(params, id) {
        return axios.delete('/longan/api/hotel/feature/detail/' + id, params)
    },
    //酒店特色明细 - 修改
    HotelFeatureDetailModify(params, id) {
        return axios.patch('/longan/api/hotel/feature/detail/' + id, params)
    },
    //酒店特色明细 - 详情
    getHotelFeatureDetail(params) {
        return axios.get('/longan/api/hotel/feature/detail', { params })
    },

    /*
        ------ 客房服务-酒店服务 ------
    */
    //酒店服务类型列表
    hotelServiceList(params) {
        // return axios.get('/longan/api/rmsvc/hotel', {params})
        return axios.get('/longan/api/rmsvc/hotel_category', { params })
    },
    //服务类型列表
    serviceTypeList(params) {
        // return axios.get('/longan/api/rmsvc/hotel/selectTypeRorHotel', {params})
        return axios.get('/longan/api/rmsvc/category', { params })
    },
    //酒店服务类型 - 启用
    hotelServiceEnable(params, id) {
        return axios.put('/longan/api/rmsvc/hotel_category/' + id + '/enable', params)
    },
    //酒店服务类型 - 禁用
    hotelServiceDisable(params, id) {
        return axios.put('/longan/api/rmsvc/hotel_category/' + id + '/disable', params)
    },
    //添加酒店服务类型
    HotelServiceTypeAdd(params) {
        // return axios.post('/longan/api/rmsvc/hotel', params)
        return axios.post('/longan/api/rmsvc/hotel_category', params)
    },
    //酒店服务类型 - 详情
    HotelServiceTypeDetail(params, id) {
        return axios.get('/longan/api/rmsvc/hotel_category/' + id, { params })
    },
    //酒店服务类型 - 修改
    HotelServiceTypeModify(params, id) {
        return axios.put('/longan/api/rmsvc/hotel_category/' + id, params)
    },
    //移除酒店服务类型
    HotelServiceTypeDelete(params, id) {
        // return axios.delete('/longan/api/rmsvc/hotel/' + id, params)
        return axios.delete('/longan/api/rmsvc/hotel_category/' + id, params)
    },
    //服务类型目录 - 列表
    serviceCatalogueList(params, hsId) {
        return axios.get('/longan/api/rmsvc/hotel_category/' + hsId + '/catalog', { params })
    },
    //服务类型目录 - 新增
    serviceCatalogueAdd(params, hsId) {
        return axios.post('/longan/api/rmsvc/hotel_category/' + hsId + '/catalog', params)
    },
    //服务类型目录 - 详情
    serviceCatalogueDetail(params, hsId, id) {
        return axios.get('/longan/api/rmsvc/hotel_category/' + hsId + '/catalog/' + id, { params })
    },
    //服务类型目录 - 修改
    serviceCatalogueModify(params, hsId, id) {
        return axios.put('/longan/api/rmsvc/hotel_category/' + hsId + '/catalog/' + id, params)
    },
    //服务类型目录 - 删除
    serviceCatalogueDelete(params, hsId, id) {
        return axios.delete('/longan/api/rmsvc/hotel_category/' + hsId + '/catalog/' + id, params)
    },
    //服务类型明细 - 通用 - 列表
    serviceCommonList(params, hsId) {
        return axios.get('/longan/api/rmsvc/hotel_category/' + hsId + '/style/common', { params })
    },
    //服务类型明细 - 通用 - 新增
    serviceCommonAdd(params, hsId) {
        return axios.post('/longan/api/rmsvc/hotel_category/' + hsId + '/style/common', params)
    },
    //服务类型明细 - 通用 - 详情
    serviceCommonDetail(params, hsId, id) {
        return axios.get('/longan/api/rmsvc/hotel_category/' + hsId + '/style/common/' + id, { params })
    },
    //服务类型明细 - 通用 - 修改
    serviceCommonModify(params, hsId, id) {
        return axios.put('/longan/api/rmsvc/hotel_category/' + hsId + '/style/common/' + id, params)
    },
    //服务类型明细 - 通用 - 删除
    serviceCommonDelete(params, hsId, id) {
        return axios.delete('/longan/api/rmsvc/hotel_category/' + hsId + '/style/common/' + id, params)
    },
    //服务类型明细 - 动态表单 - 列表
    serviceFormList(params, hsId) {
        return axios.get('/longan/api/rmsvc/hotel_category/' + hsId + '/style/dynamic_form', { params })
    },
    //服务类型明细 - 动态表单 - 新增
    serviceFormAdd(params, hsId) {
        return axios.post('/longan/api/rmsvc/hotel_category/' + hsId + '/style/dynamic_form', params)
    },
    //服务类型明细 - 动态表单 - 详情
    serviceFormDetail(params, hsId, id) {
        return axios.get('/longan/api/rmsvc/hotel_category/' + hsId + '/style/dynamic_form/' + id, { params })
    },
    //服务类型明细 - 动态表单 - 修改
    serviceFormModify(params, hsId, id) {
        return axios.put('/longan/api/rmsvc/hotel_category/' + hsId + '/style/dynamic_form/' + id, params)
    },
    //服务类型明细 - 动态表单 - 删除
    serviceFormDelete(params, hsId, id) {
        return axios.delete('/longan/api/rmsvc/hotel_category/' + hsId + '/style/dynamic_form/' + id, params)
    },
    //客房服务订单 - 列表
    ServiceOrderList(params) {
        return axios.get('/longan/api/rmsvc/order', { params })
    },
    //客房服务订单 - 确认
    serviceOrderVerify(params, id) {
        return axios.put('/longan/api/rmsvc/order/' + id, params)
    },
    //客房服务订单 - 详情
    ServiceOrderDetail(params, id) {
        return axios.get('/longan/api/rmsvc/order/' + id, { params })
    },


    //获取酒店服务明细
    getHotelServiceDetail(params) {
        return axios.get('/longan/api/rmsvc/hotelDetail', { params })
    },
    //酒店明细模板 - 新增条目
    hotelstlevelOneAdd(params) {
        return axios.post('/longan/api/rmsvc/hotelDetail', params)
    },
    //酒店明细模板 - 条目详情
    hotelstlevelOneDetail(params, id) {
        return axios.get('/longan/api/rmsvc/hotelDetail/' + id, { params })
    },
    //酒店明细模板 - 修改条目
    hotelstlevelOneModify(params, id) {
        return axios.patch('/longan/api/rmsvc/hotelDetail/' + id, params)
    },
    //酒店明细模板 - 删除条目
    hotelstlevelOneDelete(params, id) {
        return axios.delete('/longan/api/rmsvc/hotelDetail/' + id, params)
    },
    //酒店明细模板 - 位置移动
    hotellocationMove(params) {
        return axios.patch('/longan/api/rmsvc/hotelDetail', params)
    },

    /*------ 采购单管理 ------*/
    //采购单列表
    HotelPurchaseOrderlist(params) {
        return axios.get('/longan/api/pur/hotel', { params })
    },
    //查看采购单
    Hotellookpurchaseorder(params, id) {
        return axios.get('/longan/api/pur/' + id, params)
    },
    //修改采购单
    Hoteleditpurchaseorder(params, id) {
        return axios.patch('/longan/api/pur/hotelBG/' + id, params)
    },
    /*------ 故障管理 ------*/
    //故障管理
    FaultManagement(params) {
        return axios.get('/longan/api/mal', params);
    },
    //故障类型
    FaultManagementMalType(params) {
        return axios.get('/longan/api/mal/getMalPartOrReason', params);
    },
    //营收统计
    HotelRevenueStatistics(params) {
        return axios.get('/longan/api/fin', params);
    },
    //酒店平台商品管理 - 列表 - 商品名称
    getProdList(params) {
        return axios.get('/longan/api/prod/product/all', { params })
    },
    //获取所有商品名称
    getProdNameList() {
        return axios.get('/longan/api/product/productAllName');
    },
    //酒店分成
    HotelDivideInto(params) {
        return axios.get('/longan/api/fin/revenue', params);
    },
    //营收统计详情
    HotelRevenueDetail(params) {
        return axios.get('/longan/api/fin/details', params);
    },
    //获取预计分成总收入
    getGrossIncome(params) {
        return axios.get('/longan/api/fin/divided', params);
    },
    //获取酒店银行账户信息
    getwithdraw(params) {
        return axios.get('/longan/api/fin/withdraw/hotel', params);
    },
    //提交提现申请
    postwithdraw(params) {
        return axios.post('/longan/api/fin/withdraw', params);
    },
    //酒店提现列表
    HotelWithdrawalsRecord(params) {
        return axios.get('/longan/api/fin/withdraw', params);
    },
    //酒店提现详情
    HotelWithdrawalsRecordDetail(id) {
        return axios.get('/longan/api/fin/withdraw/' + id);
    },
    //柜子管理列表
    CabinetGl(params) {
        return axios.get('/longan/api/cabinet', params)
    },
    //柜子管理查看信息
    CabinetLook(params) {
        return axios.get('/longan/api/cabinet/lattice', params)
    },
    //柜子管理修改
    CabinetChange(params, id) {
        return axios.get('/longan/api/cabinet/' + id, params)
    },
    //柜子管理更新数据
    CabinetUpdate(params, id) {
        return axios.put('/longan/api/cabinet/common/' + id, params)
    },
    //客服服务记录列表
    getserverrecord(params) {
        return axios.get('/longan/api/rmsvc/records', params);
    },
    //客服服务记录列表
    getserverrecorddetail(params, id) {
        return axios.get('/longan/api/rmsvc/records/' + id, params);
    },
    //客服服务记录列表
    getsettingval(params) {
        return axios.get('/longan/api/basic/settings/value', params);
    },
    //补货费记录
    HotelReplenishmentFeeList(params) {
        return axios.get('/longan/api/fin/repl', params);
    },
    //补货费提现记录
    HotelReplenishmentFeeRecordList(params) {
        return axios.get('/longan/api/fin/repl/withdraw', params);
    },
    //开票记录
    getinvoicerecordlist(params) {
        return axios.get('/longan/api/fin/invoice', params);
    },
    //查询柜子更换记录
    replacecabinetcordlist(params) {
        return axios.get('/longan/api/cab/replace', params);
    },
    //确认更换柜子
    launchreplacecabinet(params, id) {
        return axios.patch('/longan/api/cab/replace/' + id, params);
    },
    //所有商品订单
    HotelOrderList(params) {
        // return axios.get('/longan/api/order/hShop',{params});
        return axios.get('/longan/api/order', { params });
    },
    //商品订单详情
    HotelOrderDetails(params, id) {
        // return axios.get('/longan/api/order/hShop/'+id);
        return axios.get('/longan/api/order/' + id, { params });
    },
    //堂食订单列表
    hotelEatinOrderList(params) {
        return axios.get('/longan/api/order/here', { params });
    },
    //堂食订单 - 取消订单
    HotelEatinOrderCancel(params, id) {
        return axios.put('/longan/api/order/cancel/' + id, params);
    },
    //堂食订单 - 修改订单商品
    HotelEatinOrderModify(params) {
        return axios.put('/longan/api/order', params);
    },
    //订单卡券详情
    orderCouponDetail(params, id) {
        return axios.get('/longan/api/order/vou/' + id, { params })
    },
    //出库单
    outhouselist(params) {
        return axios.get('/longan/api/inv/out', params);
    },
    //条件查询酒店商品
    productDataList(params) {
        return axios.get('/longan/api/hotel/product/all', params);
    },
    //获取酒店下需要库存的指定类型商品
    getHotelprodDataList(params) {
        return axios.get('/longan/api/prod/hotel/product/inv', params);
    },
    //新增出库单
    addourorder(params) {
        return axios.post('/longan/api/inv/out', params);
    },
    //获取可用出库单序列号
    getoutDataCode(params) {
        return axios.get('/longan/api/inv/out/squ/access', params);
    },
    //根据的酒店组织Id产找酒店
    gethotelDataList(params, id) {
        return axios.get('/longan/api/hotel/detail/' + id, params);
    },
    //获取入驻商列表ByOprOrgId
    getruzhuDataList(params) {
        return axios.get('/longan/api/merchant/all', params);
    },
    //获取入驻商列表
    getHotelMerchant(params) {
        return axios.get('/longan/api/merchant', { params });
    },
    //出库单详情
    outhouseDetail(params, id) {
        return axios.get('/longan/api/inv/out/' + id, params);
    },
    //修改出库单
    modifyupdate(params, id) {
        return axios.put('/longan/api/inv/out/' + id, params);
    },
    //条件查询库存（分页，条件）
    checkstock(params) {
        return axios.get('/longan/api/inv/inventory', params);
    },

    //查询售后申请列表
    aftersaleapplylist(params) {
        return axios.get('/longan/api/cs/request/shop', params);
    },
    //查看售后申请详情 - 后台
    aftersaleapplydetail(params, id) {
        return axios.get('/longan/api/cs/request/shop/' + id, params);
    },
    //处理售后申请-后台
    handleaftersale(params) {
        return axios.put('/longan/api/cs/request/handle', params);
    },

    //获取组织账户信息
    accountInfo(params) {
        return axios.get('/longan/api/fin/account/org', params);
    },

    //获取组织银行账户
    bankInfo(params) {
        return axios.get('/longan/api/fin/bank/account', params);
    },

    //获取组织提现记录
    withdrawMoneylist(params) {
        return axios.get('/longan/api/fin/withdraw', params);
    },

    //组织申请提现
    getmoney(params) {
        return axios.post('/longan/api/fin/withdraw', params);
    },

    //提现详情
    getcashdetail(params, id) {
        return axios.get('/longan/api/fin/withdraw/' + id, params);
    },
    //分成明细
    getDividetail(params) {
        return axios.get('/longan/api/fin/income', params);
    },
    //导出
    exportfile(params) {
        return axios.get('/longan/api/fin/download', params);
    },
    //所有酒店客房配送单
    AllDeliverylist(params) {
        // return axios.get('/longan/api/deliv/hotel/delivery',params);
        return axios.get('/longan/api/order/delivery/now', { params });
    },
    //根据ID获取酒店客房配送单信息
    AllDeliverydetail(params, id) {
        // return axios.get('/longan/api/deliv/hotel/delivery/'+id,params);
        return axios.get('/longan/api/order/delivery/' + id, { params });
    },
    //确认配送单
    SureDelivery(params, id) {
        return axios.get('/longan/api/deliv/hotel/delivery/sure/' + id, params);
    },
    //后台查看所有对应组织的商品售后
    PlatformAfterSale(params) {
        return axios.get('/longan/api/cs/appl/prod', params);
    },
    //查看售后申请详情
    AfterSaleDetail(params, id) {
        return axios.get('/longan/api/cs/appl/' + id, params);
    },
    //处理售后申请
    handleSaleApply(params, id) {
        return axios.put('/longan/api/cs/appl/' + id, params);
    },
    //后台查看所有售后
    allAfterSale(params) {
        return axios.get('/longan/api/cs/appl', params);
    },

    //获取已有指定组织商品的酒店
    getAppointHotel(params) {
        return axios.get('/longan/api/hotel/curr/org/prod/hotel', params)
    },
    //获取指定酒店下所有有效酒店商品
    getAppointProd(params) {
        return axios.get('/longan/api/prod/hotel/product/hotel/active/prod', params)
    },
    //获取指定酒店下所有有效酒店房源
    getAppointResource(params) {
        return axios.get('/longan/api/book/resource/hotel', params)
    },
    //优惠券-功能区下拉列表
    getCouponFunctionList(params) {
        return axios.get('/longan/api/hotel/func/hotel/all/vaild/func', { params })
    },

    //新增优惠券批次
    addCouponBatch(params) {
        return axios.post('/longan/api/coupon/batch', params)
    },
    //修改优惠券批次
    editCouponBatch(params, id) {
        return axios.put('/longan/api/coupon/batch/' + id, params)
    },
    //查看优惠券批次列表（分页，条件）
    getCouponBatch(params) {
        return axios.get('/longan/api/coupon/batch', params)
    },
    //查看优惠券批次详情
    checkCouponBatch(params, id) {
        return axios.get('/longan/api/coupon/batch/' + id, params)
    },
    //设置优惠券批次是否有效
    couponIsActiv(params, id) {
        return axios.put('/longan/api/coupon/batch/active/' + id, params)
    },
    //删除优惠券批次
    deleCouponBatch(params, id) {
        return axios.delete('/longan/api/coupon/batch/' + id, params)
    },
    //发放优惠券
    grantCoupon(params) {
        return axios.post('/longan/api/coupon/gived/record', params)
    },
    //新增优惠券分组
    addCouponGroup(params) {
        return axios.post('/longan/api/coupon/group', params)
    },
    //获取当前登录的组织名
    getOrganName(params) {
        return axios.get('/longan/api/basic/org/curr/org/name', params)
    },
    //查看优惠券分组列表（分页，条件）
    getCouponGroupList(params) {
        return axios.get('/longan/api/coupon/group', params)
    },
    //删除优惠券分组
    delCouponGroup(params, id) {
        return axios.delete('/longan/api/coupon/group/' + id, params)
    },
    //修改优惠券分组
    editCouponGroup(params, id) {
        return axios.put('/longan/api/coupon/group/' + id, params)
    },
    //查看优惠券分组详情
    checkCouponGroup(params, id) {
        return axios.get('/longan/api/coupon/group/' + id, params)
    },
    //获取指定组织下优惠券分组列表
    getAppointGroup(params) {
        return axios.get('/longan/api/coupon/group/org', params)
    },
    //查看优惠券批次发放记录（分页，条件）
    getCouponGrantRecord(params) {
        return axios.get('/longan/api/coupon/gived/record', params)
    },
    //查看优惠券批次发放记录明细列表（分页，条件）
    getCouponGrantDetail(params) {
        return axios.get('/longan/api/coupon/gived/record/detail', params)
    },
    //查看优惠券发送记录（分页，条件）
    getCouponSendRecord(params) {
        return axios.get('/longan/api/coupon/gift/record', { params })
    },
    //查看优惠券列表（分页，条件）
    getCouponList(params) {
        return axios.get('/longan/api/coupon/coupon', params)
    },
    //设置优惠券是否有效
    getCouponisActive(params, id) {
        return axios.put('/longan/api/coupon/coupon/active/' + id, params)
    },
    //延长有效期
    extendTime(params, id) {
        return axios.put('/longan/api/coupon/coupon/term/' + id, params)
    },
    //条件查询酒店自提点列表
    selftakingList(params) {
        return axios.get('/longan/api/hotel/pick/up/point', params)
    },
    //新增酒店自提点
    createSelftake(params) {
        return axios.post('/longan/api/hotel/pick/up/point', params)
    },
    //启用/禁用自提点
    selftakeStatus(params, id) {
        return axios.put('/longan/api/hotel/pick/up/point/active/' + id, params)
    },
    //查看酒店自提点详情
    checkSelftakeDetail(params, id) {
        return axios.get('/longan/api/hotel/pick/up/point/' + id, params)
    },
    //修改酒店自提点
    editSelftake(params, id) {
        return axios.put('/longan/api/hotel/pick/up/point/' + id, params)
    },
    //删除酒店自提点
    deleteSelftake(params, id) {
        return axios.delete('/longan/api/hotel/pick/up/point/' + id)
    },
    //根据字体点ID查询自提点核销员工
    getSelftakeStaff(params) {
        return axios.get('/longan/api/hotel/pick/up/point/verified/emp', params)
    },
    //根据酒店ID获取全部员工
    getAllSelftakeStaff(params) {
        return axios.get('/longan/api/hotel/pick/up/point/hotel/emp', params)
    },
    //新增或者修改酒店自提点核销人员
    addSelftakeStaff(params) {
        return axios.post('/longan/api/hotel/pick/up/point/verified/emp', params)
    },
    //查看卡券批次列表（分页，条件）
    getCardticketList(params) {
        return axios.get('/longan/api/vou/batch', params)
    },
    //新增卡券批次
    CardticketAdd(params) {
        return axios.post('/longan/api/vou/batch', params)
    },
    //查看卡券批次详情
    CardticketDetail(params, id) {
        return axios.get('/longan/api/vou/batch/' + id, params)
    },
    //修改卡券批次
    cardticketEdit(params, id) {
        return axios.put('/longan/api/vou/batch/' + id, params)
    },
    //删除卡券批次
    deleCardticket(params, id) {
        return axios.delete('/longan/api/vou/batch/' + id, params)
    },
    //设置卡券批次是否有效
    getCardticketisActive(params, id) {
        return axios.put('/longan/api/vou/batch/active/' + id, params)
    },
    //查看卡券列表（分页，条件）
    getUseCardticketList(params) {
        return axios.get('/longan/api/vou/voucher', params)
    },
    //获取组织
    getOrganization(params) {
        return axios.get('/longan/api/basic/org', params);
    },
    //员工管理-列表
    staffList(params) {
        return axios.get('/longan/api/user/emp/all', { params })
    },
    //员工管理-列表
    staffOrgList(params) {
        return axios.get('/longan/api/user/emp/org', { params })
    },
    //员工列表
    empRelationList(params) {
        return axios.get('/longan/api/user/emp/org', params)
    },
    //员工管理-详情
    getStaffManageDetail(id) {
        return axios.get('/longan/api/user/emp/getById/' + id)
    },
    //顾客管理-列表
    customerList(params) {
        // return axios.get('/longan/api/user/cus', {params})
        return axios.get('/longan/api/user/userCustomerHotel/getpage', { params })
    },
    //顾客管理-详情
    customerDetail(id) {
        return axios.get('/longan/api/user/userCustomerHotel/getDetail/' + id)
    },
    //顾客管理-访问记录
    getCustomerAccesslist(params) {
        return axios.get('/longan/api/user/userCustomerVisit/getPage', { params })
    },
    //顾客管理-访问记录详情
    getCustomerAccessDetail(id) {
        return axios.get('/longan/api/user/userCustomerVisit/getVisitById/' + id)
    },
    //顾客管理-订单记录
    getCustomerOrderlist(params) {
        return axios.get('/longan/api/user/userCustomerOrder/getPage', { params })
    },
    //(顾客管理)分页获取所有顾客信息
    getCardUser(params) {
        return axios.get('/longan/api/vou/voucher/vou/cus', params)
    },
    //查看用户卡券详情
    getUseCardticketDetail(params, id) {
        return axios.get('/longan/api/vou/voucher/' + id, params)
    },
    //根据vouId获取卡券使用记录
    getUseCardticketRecord(params) {
        return axios.get('/longan/api/vou/used/record', params)
    },
    //用户卡券延长有效期
    delayCardticketDate(params, id) {
        return axios.put('/longan/api/vou/voucher/term/' + id, params)
    },
    //获取卡券线上抵扣商品
    getCardticketProd(params) {
        return axios.get('/longan/api/prod/hotel/product/org/entity/prod', params)
    },
    //根据商品Id查看规格列表
    getCardticketProdspec(params) {
        return axios.get('/longan/api/prod/hotel/product/spec', params)
    },

    //进场配置
    CabinetType(params) {
        return axios.get('/longan/api/basic/cabType/page', params)
    },
    //新增进场配置
    addenterCabConf(params) {
        return axios.post('/longan/api/cab/enter/setting', params)
    },
    //查询进场配置
    selenterCabConf(params) {
        return axios.get('/longan/api/cab/enter/setting', params)
    },
    //删除进场配置
    delenterCabConf(id) {
        return axios.delete('/longan/api/cab/enter/setting/' + id)
    },
    //单个进场配置
    selOneenterCabConf(id) {
        return axios.get('/longan/api/cab/enter/setting/' + id)
    },
    //修改进场配置
    changeenterCabConf(params, id) {
        return axios.put('/longan/api/cab/enter/setting/' + id, params)
    },
    //获取虚拟柜子配置数据
    getCabinetConfig(params) {
        return axios.get('/longan/api/cab/enter/setting/hotel', { params })
    },

    //新财务管理

    //获取账户金额信息
    getAccountAmount(params) {
        return axios.get('/longan/api/fin/org/account', params)
    },
    //获取组织待收入记录列表信息
    getWaitDivide(params) {
        return axios.get('/longan/api/fin/org/pending', params)
    },
    //获取组织待收入记录单条信息
    WaitDivideDetail(id) {
        return axios.get('/longan/api/fin/org/pending/' + id)
    },
    //获取组织分成记录列表信息
    orgDivideRecord(params) {
        return axios.get('/longan/api/fin/org/income', params)
    },
    //获取组织分成记录单条信息
    divideRecordDetail(id) {
        return axios.get('/longan/api/fin/org/income/' + id)
    },
    //订单信息---分成详情
    getDiveideDetail(params) {
        return axios.get('/longan/api/order/alloc/orderDetail', params)
    },

    //配送单信息---分成详情
    getDeliDiveideDetail(params) {
        return axios.get('/longan/api/order/alloc/orderDelivDetail', params)
    },

    //解锁上下级关系
    unlockLink(params) {
        return axios.get('/longan/api/mktg/team/relation/unLock', { params })
    },
    //酒店分销
    hotelShareTotal(params) {
        return axios.get('/longan/api/mktg/team/hotel/census', { params })
    },
    //员工分销
    empShareTotal(params) {
        return axios.get('/longan/api/mktg/team/hotel/user/census', { params })
    },
    //营销-员工社群
    selMemberRelation(params) {
        return axios.get('/longan/api/mktg/team/emp/member', params)
    },
    //营销-顾客社群
    selCustomerRelation(params) {
        return axios.get('/longan/api/mktg/team/cus/member', params)
    },

    //营销-分享记录
    selHotelShareRecords(params) {
        return axios.get('/longan/api/mktg/share/record', params)
    },
    selHotelVisitRecords(params) {
        return axios.get('/longan/api/mktg/share/visit/record', params)
    },
    selHotelOrderRecords(params) {
        return axios.get('/longan/api/mktg/share/order/record', params)
    },

    //新增活动
    addActivity(params) {
        return axios.post('/longan/api/act/act', params)
    },
    //查询活动
    selectActivity(params) {
        return axios.get('/longan/api/act/act', params)
    },
    //查询单个活动
    selectActivityOne(id) {
        return axios.get('/longan/api/act/act/' + id)
    },
    //修改单个活动
    changeActivityOne(params, id) {
        return axios.put('/longan/api/act/act/' + id, params)
    },
    //修改单个活动状态
    changeActivityStatus(enable, id) {
        return axios.put('/longan/api/act/act/' + id + '/status/' + enable)
    },
    //删除单个活动
    deleteActivityOne(id) {
        return axios.delete('/longan/api/act/act/' + id)
    },
    //活动参与记录
    getActivityRecords(params) {
        return axios.get('/longan/api/act/part_in/record', params)
    },
    //活动参与记录-查看详情
    getRecordsDetail(id) {
        return axios.get('/longan/api/act/part_in/record/' + id)
    },
    //活动参与记录-查看详情
    getRecordsDetails(id) {
        return axios.get('/longan/api/act/coupon/part_in/' + id)
    },
    //活动明细管理 - 新人大礼包
    actDetailManage(params, actHotelId) {
        return axios.put('/longan/api/act/hotel/newer_gift/' + actHotelId, params)
    },
    //活动明细管理 - 新人大礼包 - 优惠券列表
    getActCouponList(params) {
        return axios.get('/longan/api/coupon/batch/drawable/act', { params })
    },
    //活动明细管理 - 新人大礼包 - 卡券列表
    getActVouList(params) {
        return axios.get('/longan/api/vou/batch/hotel/vou/batch', { params })
    },

    //添加红包板块
    addRedpackModel(params) {
        return axios.post('/longan/api/act/redPacket/setting/v2/detail', params)
    },
    //查询红包板块
    selRedpackModel(params) {
        return axios.get('/longan/api/act/redPacket/setting/v2/detail', { params })
    },
    //查询单个红包板块
    selOneRedpackModel(id) {
        return axios.get('/longan/api/act/redPacket/setting/v2/detail/' + id)
    },
    //所有广告业
    selAllAdPages(params) {
        return axios.get('/longan/api/hotel/ad/setting/all', { params })
    },
    //删除红包板块
    delRedpackModel(id) {
        return axios.delete('/longan/api/act/redPacket/setting/v2/detail/' + id)
    },
    //修改红包板块
    changeRedpackModel(params, id) {
        return axios.put('/longan/api/act/redPacket/setting/v2/detail/' + id, params)
    },

    //修改明细板块
    resetRedpackModel(params, id) {
        return axios.put('/longan/api/act/redPacket/setting/v2/v2/' + id, params)
    },
    //查询链接
    selNewLink(params) {
        return axios.get('/longan/api/basic/link', params)
    },
    //查询参数
    selNewParams(params) {
        return axios.get('/longan/api/basic/link/parameter', params)
    },
    //修改参数
    changeNewParams(params, id) {
        return axios.patch('/longan/api/basic/link/parameter/' + id, params)
    },
    //红包详情
    selRedpackDetail(id) {
        return axios.get('/longan/api/act/redPacket/' + id)
    },
    //红包分享记录
    selRedpackShareRe(params) {
        return axios.get('/longan/api/act/redPacket/record/share', params)
    },

    //第二件半价明细
    secondDiscount(params, id) {
        return axios.put('/longan/api/act/secDiscount/setting/' + id, params)
    },
    //商品表
    newProdList(params, id) {
        return axios.get('/longan/api/prod/product/org/' + id, params)
    },
    //查询红包
    searchRedPack(params) {
        return axios.get('/longan/api/act/redPacket', params)
    },
    //查询红包领取记录
    searchRedPackRecords(id) {
        return axios.get('/longan/api/act/redPacket/' + id + '/record')
    },
    //酒店分享统计
    shareRedpackHotelTotal(params) {
        return axios.get('/longan/api/act/redPacket/hotel/census', params)
    },
    //智能会议
    smartMeetingSet(params, id) {
        return axios.put('/longan/api/act/meeting/setting/' + id, params)
    },
    //智能会议-审核
    smartMeetingTest(params) {
        return axios.put('/longan/api/act/meeting/partIn/audit', params)
    },
    //智能会议接口
    smartMeetingList(params) {
        return axios.get('/longan/api/act/meeting/setting/hotel', { params })
    },
    //智能会议记录
    smartMeetingRecords(params) {
        return axios.get('/longan/api/act/meeting/partIn', params)
    },
    //红包领取记录
    selRedpackGetRecord(params) {
        return axios.get('/longan/api/act/redPacket/record', params)
    },
    //添加关联酒店
    addRelateHotel(params) {
        return axios.post('/longan/api/hotel/relation', params)
    },
    //关联酒店列表
    getRelateHotel(params) {
        return axios.get('/longan/api/hotel/relation', params)
    },
    //修改关联酒店
    changeRelateHotel(params, id) {
        return axios.put('/longan/api/hotel/relation/' + id, params)
    },
    //单个关联酒店
    getOneRelateHotel(id) {
        return axios.get('/longan/api/hotel/relation/' + id)
    },
    //删除关联酒店
    deleteRelateHotel(id) {
        return axios.delete('/longan/api/hotel/relation/' + id)
    },
    //关联酒店状态
    relateHotelStatus(status, id) {
        return axios.put('/longan/api/hotel/relation/' + id + '/enable/' + status)
    },

    //添加关联酒店
    addHotelGuidance(params) {
        return axios.post('/longan/api/hotel/func/guidance', params)
    },
    //关联酒店列表
    getHotelGuidance(params) {
        return axios.get('/longan/api/hotel/func/guidance', params)
    },
    //修改关联酒店
    changeHotelGuidance(params, id) {
        return axios.put('/longan/api/hotel/func/guidance/' + id, params)
    },
    //单个关联酒店
    getOneHotelGuidance(id) {
        return axios.get('/longan/api/hotel/func/guidance/' + id)
    },
    //删除关联酒店
    deleteHotelGuidance(id) {
        return axios.delete('/longan/api/hotel/func/guidance/' + id)
    },

    //关联酒店状态
    getFuncType(params) {
        return axios.get('/longan/api/hotel/func/type', params)
    },
    //精准查询酒店
    getAllNameHotel(params) {
        return axios.get('/longan/api/hotel/name', params)
    },
    //查询未添加酒店
    getWithoutAdd(params) {
        return axios.get('/longan/api/hotel/relation/list', params)
    },
    //查询组织营销短信发送记录
    smsrecord(params) {
        return axios.get('/longan/api/msg/sms/record/org', params)
    },
    //查看营销短信发送记录详情
    smsrecordDetail(id) {
        return axios.get('/longan/api/msg/sms/record/' + id)
    },
    //消息类型
    messageType() {
        return axios.get('/longan/api/message/template/msgType')
    },
    //消息内容模板列表
    messageTempData(params) {
        return axios.get('/longan/api/message/content_template', params);
    },
    //消息内容模板详情
    contentTempDetail(params, ctpCode) {
        return axios.get('/longan/api/message/content_template/' + ctpCode, params)
    },
    //查询已认证手机号的酒店顾客
    getuserlist(params) {
        return axios.get('/longan/api/user/cus/hotel', params);
    },
    //获取所有酒店顾客的手机号
    getuserlistAll(params) {
        return axios.get('/longan/api/user/cus/hotel/mobiles', params);
    },
    //预估当前要发送的短信的费用，仅供参考，实际费用以结算为准
    getfee(params) {
        return axios.get('/longan/api/msg/sms/record/fee/est', params);
    },
    //发送营销短信
    postsmsrecord(params) {
        return axios.post('/longan/api/msg/sms/record', params);
    },
    //查看营销短信发送记录短信清单
    getsmsrecorditem(id, params) {
        return axios.get('/longan/api/msg/sms/record/' + id + '/item', params);
    },
    //添加协议单位
    addEnterprises(params) {
        return axios.post('/longan/api/book/contracted/enterprises', params)
    },
    //协议单位列表
    getEnterprises(params) {
        return axios.get('/longan/api/book/contracted/enterprises', params)
    },
    //单个协议单位
    getOneEnterprises(id) {
        return axios.get('/longan/api/book/contracted/enterprises/' + id)
    },
    //修改协议单位
    changeEnterprises(params, id) {
        return axios.put('/longan/api/book/contracted/enterprises/' + id, params)
    },
    //更新授权码
    updateEnterprises(id) {
        return axios.put('/longan/api/book/contracted/enterprises/' + id + '/licence')
    },
    //删除协议单位
    deleteEnterprises(id) {
        return axios.delete('/longan/api/book/contracted/enterprises/' + id)
    },
    //修改协议单位状态
    changeEnterprisesStatus(enable, id) {
        return axios.put('/longan/api/book/contracted/enterprises/license/' + id + '/enable/' + enable)
    },

    //添加协议单位
    addEnterprisesRooms(params) {
        return axios.post('/longan/api/book/contracted/setting', params)
    },
    //协议单位列表
    getEnterprisesRooms(params) {
        return axios.get('/longan/api/book/contracted/setting', params)
    },
    //修改协议单位
    changeEnterprisesRooms(params, id) {
        return axios.put('/longan/api/book/contracted/setting/' + id, params)
    },
    //单个协议单位
    getOneEnterprisesRooms(id) {
        return axios.get('/longan/api/book/contracted/setting/' + id)
    },
    //删除协议单位
    deleteEnterprisesRooms(id) {
        return axios.delete('/longan/api/book/contracted/setting/' + id)
    },

    //协议单位列表-授权码
    getEnterprisesCode(params) {
        return axios.get('/longan/api/book/contracted/enterprises/license', params)
    },
    //单个协议单位-授权码
    getOneEnterprisesCode(id) {
        return axios.get('/longan/api/book/contracted/enterprises/license/' + id)
    },
    //授权码解绑
    unbindEnterprisesCode(licence) {
        return axios.put('/longan/api/book/contracted/enterprises/license/' + licence + '/unbind')
    },
    //修改协议单位状态
    changeEnterprisesCodeStatus(enable, id) {
        return axios.put('/longan/api/book/contracted/enterprises/license/' + id + '/enable/' + enable)
    },
    //最优弹性价
    getAdaptPriceList(params) {
        return axios.get('/longan/api/book/adapt/setting', params)
    },
    //员工管理-列表
    staffOrgList(params) {
        return axios.get('/longan/api/user/emp/org', { params })
    },

    //查看二维码
    virtuaQrcodel(params) {
        return axios.get('/longan/api/cabinet/miniApp/qrcode', { params })
    },
    //查看二维码记录
    virtuaQrcodelRecord(params) {
        return axios.get('/longan/api/act/coupon/part_in', { params })
    },
    //安装虚拟柜
    addVirtualCabinet(params) {
        return axios.post('/longan/api/cabinet/virtual', params)
    },
    //删除柜子
    deleteCabinet(id) {
        return axios.delete('/longan/api/cabinet/' + id)
    },
    //扫码
    sancodeSetting(params, id) {
        return axios.put('/longan/api/act/coupon/setting/' + id, params)
    },

    //扫码
    checkCode(params, id) {
        return axios.post('/longan/api/act/coupon/setting/' + id + '/check/coupon', params)
    },
    //会议
    checkMeetingCode(params, id) {
        return axios.post('/longan/api/act/meeting/setting/'+id+'/check/coupon', params)
    },
}

export default api
