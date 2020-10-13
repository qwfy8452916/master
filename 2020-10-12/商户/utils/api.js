import {
  get,
  post,
  put,
  del
} from 'http.js'
const apis = {
  //微信小程序员工登录
  postwxlogin(data) {
    return post('user/emp/wxlogin', {
      data
    })
  },
  //微信小程序员工登录
  postwxloginaccount(data) {
    return post('user/emp/wxlogin/account', {
      data
    })
  },
  //获取权限
  getAuthority(data) {
    return get('authz/perm/emp/map', {
      data
    })
  },
  //获取账户信息
  getAccountData(data) {
    return get('fin/org/account', {
      data
    })
  },
  //功能区商品-功能区下拉列表
  getHotelFunctionList(data) {
    return get('hotel/func/hotel/vaild/func', {
      data
    })
  },
  //获取组织待收入记录列表信息
  getWaitDivide(data) {
    return get('fin/org/pending', {
      data
    })
  },
  //获取待入账详情
  waiteEntryRecordDetail(id) {
    return get('fin/org/pending/' + id)
  },
  //获取入账记录
  incomeRecord(data) {
    return get('fin/org/income', {
      data
    })
  },
  //获取入账记录详情
  incomeRecordDetail(id) {
    return get('fin/org/income/' + id)
  },
  //提现明细
  withdrawMoneylist(data) {
    return get('fin/withdraw', {
      data
    })
  },
  //获取银行信息
  getBankInfo(data) {
    return get('fin/org/account', {
      data
    })
  },
  //提现
  withdrawal(data) {
    return post('fin/withdraw', {
      data
    })
  },
  //字典表
  basicDataItems(data) {
    return get('basic/dict/items', {
      data
    })
  },
  //查看卡券批次列表（分页，条件）
  getCardticketList(data) {
    return get('vou/batch', {
      data
    })
  },
  //卡券启用禁用
  cardSwitch(id) {
    return put('vou/batch/active/' + id)
  },
  //获取卡券线上抵扣商品
  getCardticketProd(data) {
    return get('prod/hotel/product/org/entity/prod', {
      data
    })
  },
  //根据商品Id查看规格列表
  getCardticketProdspec(data) {
    return get('prod/hotel/product/spec', {
      data
    })
  },
  //新增卡券批次
  cardticketAdd(data) {
    return post('vou/batch', {
      data
    })
  },
  //查看卡券批次详情
  cardticketDetail(id) {
    return get('vou/batch/' + id)
  },
  //修改卡券批次
  cardticketEdit(data, id) {
    return put('vou/batch/' + id, {
      data
    })
  },
  //删除卡券批次
  deleCardticket(id) {
    return del('vou/batch/' + id)
  },
  //获取顾客数据
  getCardUser(data) {
    return get('vou/voucher/vou/cus', {
      data
    })
  },
  //获取卡券批次数据
  getCardticketList(data) {
    return get('vou/batch', {
      data
    })
  },
  //获取用户卡券
  getUseCardticketList(data) {
    return get('vou/voucher', {
      data
    })
  },
  //用户卡券延长有效期
  delayCardticketDate(data, id) {
    return put('vou/voucher/term/' + id, {
      data
    })
  },
  //查看用户卡券详情
  getUseCardticketDetail(id) {
    return get('vou/voucher/' + id)
  },
  //根据vouId获取卡券使用记录
  getUseCardticketRecord(data) {
    return get('vou/used/record', {
      data
    })
  },
  //根据vouId获取卡券
  getvous(data) {
    return get('vou/voucher/all/Verified/vous', {
      data
    })
  },
  //提现详情
  getcashdetail(id) {
    return get('fin/withdraw/' + id)
  },
  //转赠记录
  giveRecord(data) {
    return get('vou/giving/record', {
      data
    })
  },
  //条件查询酒店自提点列表
  selftakingList(data) {
    return get('hotel/pick/up/point', {
      data
    })
  },
  //启用/禁用自提点
  selftakeStatus(id) {
    return put('hotel/pick/up/point/active/' + id)
  },
  //删除酒店自提点
  deleteSelftake(id) {
    return del('hotel/pick/up/point/' + id)
  },
  //新增自提点
  createSelftake(data) {
    return post('hotel/pick/up/point', {
      data
    })
  },
  //修改自提点
  editSelftake(data, id) {
    return put('hotel/pick/up/point/' + id, {
      data
    })
  },
  //查看酒店自提点详情
  checkSelftakeDetail: function (id) {
    return get('hotel/pick/up/point/' + id)
  },
  //功能区商品-功能区下拉列表
  getHotelFunctionList(data) {
    return get('hotel/func/hotel/vaild/func', {
      data
    })
  },
  //配送单 - 列表
  delivList(data) {
    return get('order/delivery', {
      data
    })
  },
  //功能区-列表
  hotelFunctionList(data) {
    return get('hotel/func', {
      data
    })
  },
  //后台查看所有对应组织的商品售后
  selfAfterSale(data) {
    return get('cs/appl/prod', {
      data
    })
  },
  //处理售后申请
  handleSaleApply(data, id) {
    return put('cs/appl/' + id, {
      data
    })
  },
  //查看可发送优惠券批次列表

  getsendCouponBatch(data) {
    return get('coupon/batch/can/gift', )
  },
  //获取优惠券使用说明
  getcouponexplain(data, id) {
    return get('coupon/batch/instructions/' + id, {
      data
    })
  },
  //查看优惠券发送记录（分页，条件）
  getCouponSendRecord(data) {
    return get('coupon/gift/record', {
      data
    })
  },
  //店内分享1
  getInStoredata(hotelId, status) {
    return get('mktg/share/setting/hotel/share/' + hotelId + '/' + status)
  },
  //店内分享2
  postcreateCode(data) {
    return post('mktg/code', {
      data
    })
  },
  //店内分享3
  gethaibaodata(id) {
    return get('mktg/code/' + id + '/poster')
  },
  //店内分享4
  getFunData(data) {
    return get('prod/func/product/hshop', {
      data
    })
  },
  //店内分享5
  getRoomxieyiData(data) {
    return get('book/resource/list', {
      data
    })
  },
  //店内分享6
  postsure(data) {
    return post('mktg/code', {
      data
    })
  },
  //查看售后申请详情
  afterSaleDetail(id) {
    return get('cs/appl/' + id)
  },
  //订单信息---分成详情
  getDiveideDetail(data) {
    return get('order/alloc/orderDetail', {
      data
    })
  },
  //功能区-修改-酒店外部物流
  getLgcList(data) {
    return get('lgc/hotel/logistics/hotel/logistics', {
      data
    })
  },
  //配送单 - 发货
  shipmentsPlatDelivery(data) {
    return put('order/delivery/consignment', {
      data
    })
  },
  //配送单 - 确认
  ensurePlatDelivery(id) {
    return put('order/delivery/confirm/' + id)
  },
  //配送单 - 重新发单
  againShipmentsDelivery(data) {
    return get('order/deliv/getOrderStatus2', {
      data
    })
  },
  //配送单 - 更新状态
  updateLgcStatus(data) {
    return get('order/delivery/lgc/status', {
      data
    })
  },
  //获取酒店有效自提点
  getpoint(data) {
    return get('hotel/pick/up/point/active/point', {
      data
    })
  },
  //获取酒店所有已核销的自提信息
  getypoint(data) {
    return get('order/delivery/detail/point', {
      data
    })
  },
  //配送单 - 详情
  platDeliveryDetail(id) {
    return get('order/delivery/' + id)
  },
  //查看优惠券批次列表（分页，条件）
  getCouponBatch(data) {
    return get('coupon/batch', {
      data
    })
  },
  //设置优惠券批次是否有效
  couponIsActiv(id) {
    return put('coupon/batch/active/' + id)
  },
  //堂食订单列表
  hotelEatinOrderList(data) {
    return get('order/here', {
      data
    })
  },
  //商品订单详情
  hotelOrderDetails(id) {
    return get('order/' + id)
  },
  //功能区分类-树
  functionClassifyTree(data) {
    return get('hotel/func/market/category/all', {
      data
    })
  },
  //堂食订单 - 修改订单商品 - 功能区商品
  getFuncProdList(data) {
    return get('prod/func/product/category/prod', {
      data
    })
  },
  //功能区商品规格 - 列表
  funcProdSpecsList(data) {
    return get('prod/func/product/spec', {
      data
    })
  },
  //堂食订单 - 修改订单商品
  hotelEatinOrderModify(data) {
    return put('order', {
      data
    })
  },
  //发放优惠券
  grantCoupon(data) {
    return post('coupon/gived/record', {
      data
    })
  },
  //优惠券-功能区下拉列表
  getCouponFunctionList(data) {
    return get('hotel/func/hotel/all/vaild/func', {
      data
    })
  },
  //功能区分类-树
  functionClassifyTreefen(data) {
    return get('hotel/func/market/category', {
      data
    })
  },
  //获取指定酒店下所有有效酒店商品
  getAppointProd(data) {
    return get('prod/hotel/product/hotel/active/prod', {
      data
    })
  },
  //获取指定组织下优惠券分组列表
  getAppointGroup() {
    return get('coupon/group/org')
  },
  //获取指定酒店下所有有效酒店房源
  getAppointResource(data) {
    return get('book/resource/hotel', {
      data
    })
  },
  //新增优惠券批次
  addCouponBatch(data) {
    return post('coupon/batch', {
      data
    })
  },
  //查看优惠券批次详情
  checkCouponBatch(id) {
    return get('coupon/batch/' + id)
  },
  //修改优惠券批次
  editCouponBatch(data, id) {
    return put('coupon/batch/' + id, {
      data
    })
  },
  //新增优惠券分组
  addCouponGroup(data) {
    return post('coupon/group', {
      data
    })
  },
  //查看优惠券分组列表（分页，条件）
  getCouponGroupList(data) {
    return get('coupon/group', {
      data
    })
  },
  //删除优惠券分组
  delCouponGroup(id) {
    return del('coupon/group/' + id)
  },
  //查看优惠券分组详情
  checkCouponGroup(id) {
    return get('coupon/group/' + id)
  },
  //修改优惠券分组
  editCouponGroup(data, id) {
    return put('coupon/group/' + id, {
      data
    })
  },
  //查看优惠券列表（分页，条件）
  getCouponList(data) {
    return get('coupon/coupon', {
      data
    })
  },
  //优惠券延长有效期
  extendTime(data, id) {
    return put('coupon/coupon/term/' + id, {
      data
    })
  },
  //设置优惠券是否有效
  getCouponisActive(id) {
    return put('coupon/coupon/active/' + id)
  },
  //功能区-详情
  hotelFunctionDetail(id) {
    return get('hotel/func/' + id)
  },

  // 获取酒店详情信息
  getHotelDetail(id) {
    return get('hotel/' + id)
  },
  // 设置弹性
  adaptSetting(data) {
    return post('book/adapt/setting', {
      data
    })
  },
  //删除优惠券批次
  deleCouponBatch(id) {
    return del('coupon/batch/' + id)
  },
  //功能区分类-新增
  functionClassifyAdd(data) {
    return post('hotel/func/market/category', {
      data
    })
  },
  //功能区分类-详情
  functionClassifyDetail(id) {
    return get('hotel/func/market/category/' + id)
  },
  //自营商品 - 新增 - 有效自提点列表
  getHotelPickUpPointList(data) {
    return get('hotel/pick/up/point/active/point', {
      data
    })
  },
  //房源管理 - 列表
  bookResourceList(data) {
    return get('book/resource', {
      data
    })
  },
  //功能区-修改
  hotelFunctionModify(data, id) {
    return put('hotel/func/' + id, {
      data
    })
  },
  //功能区-删除
  hotelFunctionDelete(id) {
    return del('hotel/func/' + id)
  },
  //功能区分类-修改
  functionClassifyModify(data, id) {
    return put('hotel/func/market/category/' + id, {
      data
    })
  },
  //功能区分类-删除
  functionClassifyDelete(id) {
    return del('hotel/func/market/category/' + id)
  },
  //自营商品 - 列表
  ownCommodityList(data) {
    return get('prod/hotel/product', {
      data
    })
  },
  //功能区商品-列表
  functionProdList(data) {
    return get('prod/func/product', {
      data
    })
  },
  //功能区商品-上下架
  functionProdStatus(id) {
    return put('prod/func/product/shelf/' + id)
  },
  //功能区商品-删除
  functionProdDelete(id) {
    return del('prod/func/product/' + id)
  },
  //功能区分类-树二级
  funClassifyTree(data) {
    return get('hotel/func/market/category', {
      data
    })
  },
  //功能区商品-商品下拉列表
  getFunctionProdList(data) {
    return get('prod/hotel/product/func/unused', {
      data
    })
  },
  //功能区商品-添加
  functionProdAdd(data) {
    return post('prod/func/product', {
      data
    })
  },
  //功能区商品-详情
  functionProdDetail(id) {
    return get('prod/func/product/' + id)
  },
  //功能区商品-修改
  functionProdModify(data, id) {
    return put('prod/func/product/' + id, {
      data
    })
  },
  //自营商品 - 删除
  ownCommodityDelete(id) {
    return del('prod/hotel/product/' + id)
  },
  //自营商品 - 新增 - 优惠券列表
  getProdCouponList() {
    return post('coupon/batch/can/sell')
  },
  //自营商品 - 新增 - 卡券列表
  getHotelCouponList() {
    return get('vou/batch/org/vou/batch')
  },
  //酒店平台商品管理 - 添加 - 酒店商品下未被选用的功能区列表
  hotelProdUnsedFunctionList(data) {
    return get('hotel/func/not/choose/func', {
      data
    })
  },
  //查询运费模板
  getExpressFee() {
    return get('product/express/fee')
  },
  //酒店平台商品管理 - 添加 - 酒店商品下未被选用的功能区市场分类
  hotelProdUnsedFunctionCategory(data) {
    return get('hotel/func/market/category/not/choose/category', {
      data
    })
  },
  //自营商品 - 新增
  ownCommodityAdd(data) {
    return post('prod/hotel/product', {
      data
    })
  },
  //自营商品 - 详情
  ownCommodityDetail(id) {
    return get('prod/hotel/product/' + id)
  },
  //自营商品 - 修改
  ownCommodityModify(data, id) {
    return put('prod/hotel/product/review/' + id, {
      data
    })
  },
  //酒店商品规格 - 列表
  hotelProdSpecsList(data) {
    return get('prod/hotel/product/spec', {
      data
    })
  },
  //酒店商品规格 - 移除
  hotelProdSpecsDelete(id) {
    return del('prod/hotel/product/spec/' + id)
  },
  //酒店商品规格 - 添加
  hotelProdSpecsAdd(data) {
    return post('prod/hotel/product/spec', {
      data
    })
  },
  //酒店商品规格 - 详情
  hotelProdSpecsDetail(id) {
    return get('prod/hotel/product/spec/' + id)
  },
  //酒店商品规格 - 修改
  hotelProdSpecsModify(data, id) {
    return put('prod/hotel/product/spec/' + id, {
      data
    })
  },
  //进场配置柜子
  cabinetType: function (data) {
    return get('basic/cabType/page', {
      data
    })
  },
  //查询进场配置
  selenterCabConf(data) {
    return get('cab/enter/setting', {
      data
    })
  },
  //删除进场配置
  delenterCabConf(id) {
    return del('cab/enter/setting/' + id)
  },
  //新增进场配置
  addenterCabConf(data) {
    return post('cab/enter/setting', {
      data
    })
  },
  //查看进场配置
  selOneenterCabConf(id) {
    return get('cab/enter/setting/' + id)
  },
  //订单管理 - 列表
  bookOrderList(data) {
    return get('book/order', {
      data
    })
  },
  //修改进场配置
  changeenterCabConf(data,id){
    return put('cab/enter/setting/'+id,{data})
  },
  //柜子管理
  cabinetGl(data){
    return get('cabinet',{data})
  },
  //查看二维码
  virtuaQrcodel(data){
    return get('cabinet/miniApp/qrcode',{data})
  },
  //查询活动
  selectActivity(data){
    return get('act/act',{data})
  },
  //修改单个活动状态
  changeActivityStatus(enable,id){
    return put('act/act/'+id+'/status/'+enable)
  },
  //删除单个活动
  deleteActivityOne(id){
    return del('act/act/'+id)
  },
  //新增活动
  addActivity(data){
    return post('act/act',{data})
  },
  //查询单个活动
  selectActivityOne(id){
  return get('act/act/'+id)
  },
  //修改单个活动
  changeActivityOne(data,id){
    return put('act/act/'+id,{data})
  },
  //所有广告业
  selAllAdPages(data){
    return get('hotel/ad/setting/all',{data})
  },
  //查询链接
  selNewLink(data){
    return get('basic/link',{data})
  },
  //查询参数
  selNewParams(data){
   return get('basic/link/parameter',{data})
  },
  //查询红包板块
  selRedpackModel(data){
    return get('act/redPacket/setting/v2/detail',{data})
  },
  //板块商品
  platformCommodityList(data){
    return get('prod/product',{data})
  }, 
  //添加红包板块
  addRedpackModel(data){
    return post('act/redPacket/setting/v2/detail',{data})
  },
  //修改明细板块
  resetRedpackModel(data,id){
   return put('act/redPacket/setting/v2/v2/'+id,{data})
  },
  //商品表
  newProdList(data,id){
    return get('prod/product/org/'+id,{data})
  },
  //第二件半价明细
  secondDiscount(data, id) {
    return put('act/secDiscount/setting/' + id, {data})
  },

}

export default apis