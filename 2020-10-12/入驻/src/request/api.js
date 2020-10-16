/*
 *api接口统一管理
 */
import axios from './request.js'

const api = {
    upload_file_url: '/longan/api/basic/file/upload', //上传附件
    // upload_file_url: 'http://192.168.1.121:9001/longan/api/basic/file/upload', //上传附件

    // 登录
    login(params){
        return axios.post('/longan/api/user/login', params)
    },

    //权限
    authzcontroller(params){
      return axios.get('/longan/api/authz/perm/emp/map', {params})
    },

    /*
        ------ 根据OrgId入驻商详情 ------
    */
    // merDetail(params){
    //     return axios.get('/longan/api/merchant/detail', {params})
    // },

    //检验功能区配送方式是否可修改
    isDisableDelivWay(params){
        return axios.get('/longan/api/prod/func/product/vaild', {params})
    },
    //酒店商品市场分类 - 详情
    getHotelMarketDetail(params){
        return axios.get('/longan/api/hotel/market/category', {params})
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

    /*
        ------ 开票管理 ------
    */
    //开票管理-列表
    waitInvoiceProdList(params){
        return axios.get('/longan/api/fin/inv/org', {params})
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
        ------ 入驻商信息维护 ------
    */
    //修改入驻商-获取信息
    getMerchaninfo(id){
        return axios.get('/longan/api/merchant/'+id);
    },
    //商品销售发票 - 列表
    invoiceRateList(params){
        return axios.get('/longan/api/fin/opr/rate/rate', {params})
    },
    //获取省、市、区
    provinceGet(params){
        return axios.get('/longan/api/basic/dict/items',{params})
    },
    //修改入驻商
    changemerchant(id,params){
        return axios.patch('/longan/api/merchant/' + id,params)
    },

    /*
        ------ 商品管理 ------
    */
    //商品统计分类 - 列表
    commodityStatisticsList(params){
        return axios.get('/longan/api/prod/category', {params})
    },
    //商品管理 - 新增
    ownCommodityAdd(params){
        return axios.post('/longan/api/prod/product', params)
    },
    //商品管理 - 列表
    ownCommodityList(params){
        return axios.get('/longan/api/prod/product', {params})
    },
    //商品管理 - 删除
    ownCommodityDelete(params, id){
        return axios.delete('/longan/api/prod/product/' + id, params)
    },
    //商品管理 - 详情
    ownCommodityDetail(params, id){
        return axios.get('/longan/api/prod/product/' + id, {params})
    },
    //商品管理 - 修改
    ownCommodityModify(params, id){
        return axios.put('/longan/api/prod/product/' + id, params)
    },

    /*
        ------ 酒店管理 ------
    */
    //商品市场分类列表
    hotelCommodityMarketList(params){
        return axios.get('/longan/api/hotel/prod/category/market', {params})
    },
    hotelCommodityMarketListM(params){
        return axios.get('/longan/api/hotel/market/category/hotel/all', {params})
    },
    //酒店名称列表
    getHotelNameAll(params){
        return axios.get('/longan/api/hotel/all', {params})
    },
    hotelList(params){
        return axios.get('/longan/api/hotel',{params})
    },
    //未使用的商品列表
    hotelCommodityUnused(params){
        return axios.get('/longan/api/prod/product/unused', {params})
    },
    //酒店入驻商品管理 - 添加
    hotelCommodityAdd(params){
        return axios.post('/longan/api/hotel/product', params)
    },
    //商品名称列表
    getProdList(params){
        return axios.get('/longan/api/prod/product/all', {params})
    },
    //酒店入驻商品管理 - 列表
    hotelCommodityList(params){
        // return axios.get('/longan/api/hotel/product', {params})
        return axios.get('/longan/api/prod/hotel/product', {params})
    },
    //酒店入驻商品管理 - 列表 - 上下架
    hotelCommodityStatus(params, id){
        return axios.put('/longan/api/hotel/product/shelf/' + id, params)
    },
    //酒店入驻商品管理 - 详情
    hotelCommodityDetail(params, id){
        // return axios.get('/longan/api/hotel/product/' + id, {params})
        return axios.get('/longan/api/prod/hotel/product/' + id, {params})
    },
    //酒店入驻商品管理 - 修改 - 卡券列表
    getHotelCouponList(params){
        return axios.get('/longan/api/vou/batch/org/vou/batch', {params})
    },
    //酒店入驻商品管理 - 新增 - 优惠券列表
    getProdCouponList(params){
        return axios.post('/longan/api/coupon/batch/can/sell', params)
    },
    //酒店入驻商品管理 - 修改
    hotelCommodityModify(params, id){
        // return axios.put('/longan/api/hotel/product/' + id, params)
        return axios.put('/longan/api/prod/hotel/product/review/' + id, params)
    },
    //酒店入驻商品管理 - 移除
    hotelCommodityDelete(params, id){
        return axios.delete('/longan/api/prod/hotel/product/' + id, params)
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
    //获取酒店全部分成协议
    getprotocolList(params){
        return axios.get('/longan/api/hotel/agreement/all', {params})
    },

    /*
        ------ 运费模板 ------
    */
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
    /*
        ------ 配送管理 ------
    */
    //功能区-列表
    hotelFunctionList(params){
        return axios.get('/longan/api/hotel/func', {params})
    },
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
    //入驻商后台根据订单id和优惠券id获取配送单详情(仅供优惠券列表跳转使用)
    couponDeliveryDetail(params){
        return axios.get('/longan/api/order/delivery/dealer', {params})
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
    //所有酒店客房配送单
    AllDeliverylist(params){
        return axios.get('/longan/api/order/delivery/detail', {params});
    },
    //所有酒店客房配送单详情
    AllDeliveryDetail(params, id){
        return axios.get('/longan/api/order/delivery/detail/' + id, {params});
    },

    /*
        ------ 库存管理 ------
    */
    //入驻商品库存
    merchantStockList(params) {
        return axios.get('/longan/api/inv/inventory', {params})
    },
    //入驻商详情
    getMerDetail(params) {
        return axios.get('/longan/api/merchant/', {params})
    },
    //入驻商品入库单 - 列表
    godownEntryList(params) {
        return axios.get('/longan/api/inv/in', {params})
    },
    //入驻商品入库单 - 详情
    godownEntryDetail(params, id) {
        return axios.get('/longan/api/inv/in/' + id, {params})
    },
    //入驻商品出库单 - 列表
    stockOutList(params){
        return axios.get('/longan/api/inv/out', {params})
    },
    //入驻商品出库单 - 详情
    stockOutDetail(params, id){
        return axios.get('/longan/api/inv/out/' + id, {params})
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
      //获取组织账户信息
      accountInfo(params){
        return axios.get('/longan/api/fin/account/org',params);
      },
      //获取组织银行账户
      bankInfo(params){
        return axios.get('/longan/api/fin/bank/account',params);
      },
      //获取组织提现记录
      withdrawMoneylist(params){
        return axios.get('/longan/api/fin/withdraw',params);
      },
       //组织申请提现
      getmoney(params){
        return axios.post('/longan/api/fin/withdraw',params);
      },
      //提现详情
      getcashdetail(params,id){
        return axios.get('/longan/api/fin/withdraw/'+id,params);
      },
      //分成明细
      getDividetail(params){
        return axios.get('/longan/api/fin/income',params);
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

    //字典表
    basicDataItems(params){
        return axios.get('/longan/api/basic/dict/items', {params})
    },
     //功能区分类-树
     functionClassifyTree(params){
        return axios.get('/longan/api/hotel/func/market/category', {params})
    },
    //获取已有指定组织商品的酒店
    getAppointHotel(params){
      return axios.get('/longan/api/hotel/curr/org/prod/hotel',params)
    },
    //获取指定酒店下所有有效酒店商品
    getAppointProd(params){
      return axios.get('/longan/api/prod/hotel/product/hotel/active/prod',params)
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
    //设置优惠券是否有效
    getCouponisActive(params,id){
      return axios.put('/longan/api/coupon/coupon/active/'+id,params)
    },
    //延长有效期
    extendTime(params,id){
      return axios.put('/longan/api/coupon/coupon/term/'+id,params)
    },
    //新财务管理

     //获取账户金额信息
     getAccountAmount(params){
      return axios.get('/longan/api/fin/org/account',params)
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
     //订单信息---分成详情
     getDiveideDetail(params){
      return axios.get('/longan/api/order/alloc/orderDelivDetail',params)
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
     //第二件半价明细
     secondDiscount(params,id){
        return axios.put('/longan/api/act/secDiscount/setting/'+id,params)
      },
      //商品表
      newProdList(params,id){
        return axios.get('/longan/api/prod/product/org/'+id,params)
      },
}

export default api
