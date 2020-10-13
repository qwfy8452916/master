import { get, post, put, del, patch} from 'http.js'
const apis = {
	//获取广告页轮播图
	getadvertiselist(){
		return get('user/customer/advertise')
  },
  //获取订单商品
  getorderprodlist(data){
		return get('order/delivery/detail/csCab', {data})
  },
  //获取售后类型
  getaftertype(data){
    return get('basic/dict/items', {data})
  },
  //提交售后申请
  postmnbafter(data){
    return post('cs/appl', {data})
  },
  //获取待开票列表
  getinvoicedlist(data){
    return get('fin/inv/user/valid/prod', {data})
  },
  //获取开票详情
  getinvoiceddetail(id){
    return get('fin/inv/' + id)
  },
  //撤销开票申请
  putinvoicedlist(id){
    return put('fin/inv/' + id + '/cancel')
  },
  //获取运营商支持的发票类型
  getinvoicetype(data){
    return get('fin/inv/style', {data})
  },
  //提交开票
  postinvoicing(data){
    return post('fin/inv', {data})
  },
  //获取开票记录
  getbillingrecord(data){
    return get('fin/inv/user', {data})
  },
  //获取分类名称
  gettypename(data){
    return get('hotel/feature/hotel', {data})
  },
  //获取分类列表
  gettypeList(data){
    return get('hotel/feature/detail/condition', {data})
  },
  //获取客房设施详情
  getcharaceristicdetail(id){
    return get('hotel/feature/detail/' + id)
  },
  //授权登陆
  postloginByWX(data){
    return post('user/customer/loginByWX2', {data})
  },
  //获取优惠券列表
  getcouponlist(data){
    return get('coupon/batch/drawable', {data})
  },
  //获取可用优惠券列表(商品券)
  getcancouponlist(data){
    return post('coupon/coupon/cus/can/use/prod/coupon', {data})
  },
  //获取可用优惠券列表(房券)
  getroomcancouponlist(data){
    return get('coupon/coupon/cus/can/use/room/coupon', {data})
  },
  //领取优惠券
  postcoupon(data){
    return post('coupon/coupon', {data})
  },
  //获取评价信息1
  getevaluationlist(data){
    return get('remark/cus', {data})
  },
  //获取评价信息2
  getevaluation(data){
    return get('remark/fine', {data})
  },
  //获取商品信息
  getpordinfo(data){
    return get('prod/func/product/hshop/detail', {data})
  },
  //下单
  postbuynow(data){
    return post('order', {data})
  },
  //支付请求
  postprodpay(data){
    return post('order/pay', {data})
  },
  //检验商品是否可以增加数量
  testprodnum(data){
    return get('prod/hotel/product/hshop/check/product', {data})
  },
  //确认支付状态
  confirmstatus(data){
    return get('order/queryOrder', {data})
  },
  //确认支付状态（堂食多人下单）
  confirmstatus2(data){
    return get('order/here/queryOrder', {data})
  },
  //获取地址列表
  getaddresslist(data){
    return get('order/address', {data})
  },
  //新建地址post
  postcreateaddress(data){
    return post('order/address', {data})
  },
  //新建地址put/修改默认地址
  putcreateaddress(data){
    return put('order/address', {data})
  },
  //删除地址
  deleteaddress(id, data){
    return del('order/address/' + id, {data})
  },
  //获取选中地址
  getaddressnow(id){
    return get('order/address/' + id)
  },
  //获取默认地址
  getdefaultaddress(data){
    return get('order/address/default', {data})
  },
  //校验已选(商品券)优惠券是否可用
  postverifyavailable(data){
    return post('coupon/coupon/cus/prod/valid', {data})
  },
  //校验已选(房券)优惠券是否可用
  getverifyavailableroom(data){
    return get('coupon/coupon/cus/room/valid', {data})
  },
  //获取分享码
  postsharecode(data){
    return post('mktg/code', {data})
  },
  //快递商品分类
  postcategories(data){
    return post('prod/func/product/hshop/group/order/product', {data})
  },
  //获取订单详情
  getorderdetail(id){
    return get('order/hShop/' + id)
  },
  //获取酒店故事列表
  gethotelstorylist(data){
    return get('hotel/culture/story', {data})
  },
  //获取酒店故事故事详情
  gethotelstorydetail(id){
    return get('hotel/culture/' + id + '/details')
  },
  //获取wifi
  getwifi(data){
    return get('cabinet/qrcode', {data})
  },
  //获取酒店信息
  gethotelinfo(id){
    return get('hotel/hshop/' + id)
  },
  //获取酒店所属运营商是否支持开商品发票
  getfininvcheck(data){
    return get('fin/inv/check', {data})
  },
  //获取迷你吧商品信息
  getmnbprodlist(data){
    return get('prod/func/product/hshop/cab/product', {data})
  },
  //获取便利店商品
  getbldprodlist(data){
    return get('prod/func/product/hshop', {data})
  },
  //获取客房服务订单列表
  getkffworderlist(data){
    return get('rmsvc/order/mine', {data})
  },
  //获取住过的酒店
  getlicedhotel(data){
    return get('reside/hotel', {data})
  },
  //静默登录
  postsilentlogin(data){
    return post('user/customer/silentLogin', {data})
  },
  //新登陆
  postsilentloginnew(data){
    return post('user/customer/wxlogin', {data})
  },
  //获取cabcode、shareUser
  getcabcode(code){
    return get('enter/' + code + '/check')
  },
  //获取柜子类型配置(弃用)
  getcabtype(data){
    return get('cabinet/setting/cabType', {data})
  },
  //根据柜子类型获取柜子进场配置详情
  getcabTypenew(data){
		return get('cab/enter/setting/cabType', {data})
  },
  //存储用户进场信息
  postuserinfo(data){
    return post('reside/hotel', {data})
  },
  //获取退款金额
  getrefundamount(id, data){
    return get('cs/appl/' + id +'/amount', {data})
  },
  //撤销申请
  putmallafter(id){
    return put('cs/appl/' + id + '/cancel')
  },
  //获取已申请售后商品详情
  getafterdetail(id){
    return get('cs/appl/' + id)
  },
  //取消订单
  putcancelorder(id, data){
    return put('order/hShop/cancel/' + id, {data})
  },
  //待支付订单支付
  posttobepaid(data){
    return post('order/hShop/pay', {data})
  },
  //待确认退款
  postaftersale(data){
    return post('order/refund/record', {data})
  },
  //获取售后列表数据
  getafterlist(data){
    return get('cs/appl/mine', {data})
  },
  //获取是否支持酒店房费发票
  gethotelinvtype(data){
    return get('fin/inv/user/valid/type', {data})
  },
  //获取用户余额、收支明细
  getuserbalance(id){
    return get('fin/cus/' + id + '/balance')
  },
  //获取优惠券列表(领券中心)
  getcouponlist2(data){
    return get('coupon/coupon/customer', {data})
  },
  //获取优惠券列表(优惠券使用说明)
  getcouponexplain(data, id){
    return get('coupon/batch/instructions/' + id, {data})
  },
  //获取待支付详情
  gettobepaiddetail(id){
    return get('order/rountine/' + id)
  },
  //取消订单
  putcancelorder2(id, data){
    return put('order/cancel/' + id, {data})
  },
  //获取订单我的订单列表
  getorderlist2(data){
    return get('order/delivery/rountine/', {data})
  },
  //获取订单详情
  getorderdetail2(id){
    return get('order/delivery/rountine/' + id)
  },
  //余额提现
  postwithdraw(data){
    return post('fin/cus/expense/withdraw', {data})
  },
  //修改后余额提现
  newPostwithdraw(data) {
    return post('fin/user/account/detail/expense/withdraw', { data })
  },
  //获取订单详情
  getorderlist(id){
    return get('rmsvc/order/' + id)
  },
  //取消订单
  putcancelorder3(id, data){
    return put('rmsvc/order/mine/' + id, {data})
  },
  //提交评价
  postevaluation(data){
    return post('remark/cus', {data})
  },
  //待支付列表
  gettobepaylist(data){
    return get('order/paying', {data})
  },
  //再次开门订单列表页
  getaginopen(id){
    return put('order/detail/cab/open/' + id)
  },
  //再次开门支付成功页
  getaginopen2(id){
    return put('order/cab/open/' + id)
  },
  //获取酒店房型房源信息
  getroominfo(data){
    return get('book/room', {data})
  },
  //获取房源信息
  getfyroominfo(id){
    return get('book/resource/' + id + '/withType')
  },
  //获取房型信息
  getfxroominfo(id){
    return get('book/type/' + id)
  },
  //获取订房详情
  getdfdetail(id){
    return get('book/order/cus/' + id)
  },
  //申请订房退订
  putdforder(id){
    return put('book/order/applyUnSub/' + id)
  },
  //获取房间信息
  getroominfo2(data){
    return get('book/resource/order', {data})
  },
  //提交订房
  postdfroom(data){
    return post('book/order', {data})
  },
  //调取微信支付
  postwxpay(data){
    return post('book/order/pay', {data})
  },
  //取消订房订单
  canceldforder(id){
    return put('book/order/cancel/' + id)
  },
  //订房支付状态确认
  getpaytype(data){
    return get('book/order/queryOrder', {data})
  },
  //获取订房列表信息
  getdflist(data){
    return get('book/order/cus/all', {data})
  },
  //获取客房服务列表
  getroomsercicelist(data){
    return get('rmsvc/hotel_category', {data})
  },
  //获取客房服务详情
  getroomsercicedetail(hotelcategoryid,id){
    return get('rmsvc/hotel_category/' + hotelcategoryid + '/style/common/' + id)
  },
  //提交客房服务订单
  postroomorder(data){
    return post('rmsvc/order', {data})
  },
  //获取客房服务订单列表
  getroomorderlist(id){
    return get('rmsvc/hotel_category/' + id)
  },
  //获取功能区详情
  getfuncdetail(id, data){
    return get('hotel/func/hshop/' + id, {data})
  },
  //获取酒店市场分类一级目录
  gethotelclass(data){
    return get('hotel/func/market/category/children', {data})
  },
  //获取我的红包
  getmyredbaglist(data){
    return get('act/redPacket/user', {data})
  },
  //领取分享红包
  getshareredbag(data){
    return get('act/redPacket/record/gain', {data})
  },
  //修改红包为已分享
  putredbagtype(code){
    return put('act/redPacket/shared/' + code)
  },
  //获取用户可参与的活动
  getActlist(data){
    return get('act/act/valid', {data})
  },
  //参与新人礼包活动
  putActNewcomer(data){
    return put('act/hotel/newer_gift/part_in', {data})
  },
  //获取推荐商品
  getrecommendprodlist(data){
    return get('prod/func/product/hshop/recommend/prod', {data})
  },
  //获取柜子格子状态
  getcabopentype(data){
    return get('order/lattices/realTime/state', {data})
  },
  //获取酒店板块分销开关
  getshareactivity(data){
    return get('mktg/share/setting/model/status', {data})
  },
  //获取员工分享信息
  getsharecontent(data){
    return get('mktg/code/detail', {data})
  },
  //获取分享海报
  getposter(id){
    return get('mktg/code/'+ id +'/poster')
  },
  //获取微信绑定的手机号
  postuserphonenumber(data){
    return post('user/customer/getWXPhone2', {data})
  },
  //认证手机号
  putcertification(data){
    return put('mktg/team/member', {data})
  },
  //认证手机号(我的)
  putcertificationmy(id, data){
    return put('user/cus/' + id + '/auth', {data})
  },
  //新增酒店分享记录
  postsharehistory(data){
    return post('mktg/share/record', {data})
  },
  //获取我的社群成员
  getmycommunitylist(data){
    return get('mktg/team/mine', {data})
  },
  //提交邀请码
  putinvitationcode(hotelId, invitationcode){
    return put('mktg/team/invitation/'+ hotelId +'/' + invitationcode)
  },
  //获取用户卡券列表（已使用，未使用，已失效）
  getvoucherlist(data){
    return get('vou/voucher/customer', {data})
  },
  //刷新卡券二维码
  getvouchercode(id){
    return get('vou/voucher/verified/code/' + id)
  },
  //接受转增卡券
  receivevoucher(shareUserId, id){
    return put('vou/voucher/received/voucher/' + id + '/' + shareUserId)
  },
  //验证当前卡券是否可以转赠他人
  getcheckvoucher(id){
    return get('vou/voucher/check/giving/' + id)
  },
  //获取功能区卡券列表数据
  getalldatalist(data){
    return get('prod/func/product/all/category/prod', {data})
  },
  //获取功能区餐饮列表数据
  getallfoodlist(data){
    return get('prod/func/product/all/dish', {data})
  },
  //获取功能区餐饮详情数据
  getfooddetail(data){
    return get('prod/func/product/hshop/dish/product', {data})
  },
  //获取商品规格
  getproductspec(data){
    return get('prod/func/product/spec', {data})
  },
  //获取用户在酒店可用商品抵扣券
  postprodvou(data){
    return post('vou/voucher/customer/valid/Deductible/prod/vou', {data})
  },
  //获取用户在酒店可用现金抵扣卡券
  getmoneyvou(data){
    return post('vou/voucher/customer/valid/Deductible/money/vou', {data})
  },
  //筛选出未使用卡券的商品
  postprodlist(data){
    return post('vou/voucher/find/not/use/cou/prod', {data})
  },
  //获取外部物流
  getlogisticslist(data){
    return get('hotel/func/func/lgc', {data})
  },
  //获取用户收入总额
  getTotal(data){
    return get('fin/user/account/detail/income/' + data.userType + '/' +data.userId)
  },
  //获取用户提现总额
  cashTotal(data) {
    return get('fin/user/account/detail/withdraw/' + data.userType + '/' + data.userId)
  },
  //获取用户待收入总额
  waitIncome(data) {
    return get('fin/user/pending/pending/' + data.userType + '/' + data.userId)
  },
  //获取用户可提现余额
  getBalance(data) {
    return get('fin/user/account/detail/canWithdraw/' + data.userType + '/' + data.userId)
  },
  //获取用户收支列表信息
  getDetailList(data, userType) {
    return get('fin/user/account/detail/' + userType, {data})
  },
  //获取用户待收支列表信息
  waitIncom(data, userType) {
    return get('fin/user/pending/' + userType, { data })
  },
  //获取用户收支详情
  getIncomeDetail(data){
    return get('fin/user/account/detail/' + data.userType + '/' + data.id)
  },
  //获取用户待入账详情
  waitIncomeDetail(data){
    return get('fin/user/pending/' + data.userType + '/' + data.id)
  },
  //获取外部物流运费
  postfreight(data){
    return post('order/deliv/distanceFee', {data})
  },
  //获取经纬度
  getcoordinate(data){
    return get('basic/dict/coordinate', {data})
  },
  //刷新外部物流状态
  getLogisticstype(id){
    return get('order/deliv/getOrderStatus/' + id)
  },
  //获取用户配置
  getuserconfiguration(data){
    return get('user/customer/wxlogin', {data})
  },
  //我的红包创建红包码
  postmyredbagsharecode(code){
    return post('act/redPacket/user/share/' + code)
  },
  //我的足迹
  getmyhistory(data){
    return post('user/userCustomerVisit/getVisitPage', {data})
  },
  //更新进入页地址
  getpages(data){
    return get('user/userCustomerVisit/setenterpage', {data})
  },
  //获取红包领取记录详情
  getRedpackRecords(id){
    return get(`act/redPacket/${id}/record`)
  },
  //设置用户成为会员
  getbecomemember(id){
    return get('user/customer/update/' + id)
  },
  //获取购物车第二件半价
  putshoppingCart(id, data){
    return put('act/secDiscount/setting/' + id + '/shoppingCart', {data})
  },
  //获取红包规则
  getRedpackRules(data){
    return get('act/redPacket/setting/v2/v2/rule',{data})
  },
  //获取海报
  getNewPoster(data){
    return get('mktg/code/'+data+'/poster/v2')
  },
  //新增红包分享记录
  postRedpackRecord(businessCode){
    return post('act/redPacket/user/share/' + businessCode)
  },
  //获取半价规则
  getrulefun(id){
    return get('act/secDiscount/setting/' + id + '/rule')
  },
  //多人下单获取待支付订单
  getunpaidOrders(data) {
    return get('order/here/table/noPay', {data})
  },
  //多人下单支付
  postunpaidOrders(data) {
    return post('order/here/pay', {data})
  },
  //获取报名状态
  getsignupdata(data) {
    return get('act/meeting/partIn/status', {data})
  },
  //报名
  putsignup(data) {
    return put('act/meeting/partIn/enlist', {data})
  },
  //签到
  putsignin(data) {
    return put('act/meeting/partIn/sign', {data})
  },
  //根据用户Id获取参与信息
  getmeetingcusinfo(data) {
    return get('act/meeting/partIn/cus', {data})
  },
  //下载资料
  post_downloadFile(id) {
    return post('act/meeting/partIn/downloadFile/' + id)
  },
  //领券(会议)
  putmeetingcoupon(id) {
    return put('act/meeting/partIn/coupon/' + id)
  },
  //领券(会议)
  putmeetingcoupon2(id) {
    return put('act/meeting/partIn/v2/coupon/' + id)
  },
  //获取分享标题
  getTitle(data) {
    return get('mktg/code/detail',{data})
  },
  //查询功能区下面的导航
  getFuncGuide(funcId) {
    return get('hotel/func/guidance/func/'+funcId)
  },
  //获取我的授权码
  getMyEnterpriseCode(hotelId) {
    return get('book/contracted/enterprises/license/mine/'+hotelId)
  },
  //获取我的授权码
  inputEnterpriseCode(data) {
    return get('book/contracted/enterprises/licence',{data})
  },
  //绑定授权码
  bindEnterpriseCode(licence,data) {
    return put('book/contracted/enterprises/license/'+licence+'/bind',{data})
  },
  //修改授权码日期
  changeEnterpriseCode(data,id) {
    return put('book/contracted/enterprises/license/'+id,{data})
  },
  //获取授权码
  getAllEnterpriseCode(rootLicence) {
    return get('book/contracted/enterprises/license/'+rootLicence+'/sonList')
  },
  //生成授权码
  createEnterpriseCode(data) {
    return post('book/contracted/enterprises/license',{data})
  },
  //删除授权码日期
  cancelEnterpriseCode(id) {
    return del('book/contracted/enterprises/license/'+id)
  },
  //解绑授权码
  unbindEnterpriseCode(licence) {
    return put('book/contracted/enterprises/license/'+licence+'/unbind')
  },
  //授权码状态
  EnterpriseCodeStatus(id,status) {
    return put('book/contracted/enterprises/license/'+id+'/enable/'+status)
  },
  //授权码详情
  EnterpriseCodeOne(id) {
    return get('book/contracted/enterprises/license/'+id)
  },
  //授权码详情
  getFuncRooms(data) {
    return get('book/room/func',{data})
  },
  //获取购物车列表信息
  getCart(data) {
    return get('cart',{data})
  },
  //购物车新增商品信息
  postCart(data) {
    return post('cart',{data})
  },
  //增减购物车商品数量
  patchCart(data) {
    return patch('cart',{data})
  },
  //勾选购物车商品信息
  patchCartChecked(data) {
    return patch('cart/checked', data)
  },
  //删除购物车商品信息
  deleteCart(data) {
    return del('cart/' + data)
  },
  //清空购物车商品信息
  deleteCart(data) {
    return del('cart/clear/' + data)
  },
  //我的参与记录
  getminecouponlist() {
    return get('act/coupon/part_in/mine')
  },
  //我的参与记录详情
  getminecoupondetail(data) {
    return get('act/coupon/part_in/' + data)
  },
  //获取广告业
  getAdLinks(data) {
    return get('act/redPacket/record/adLink', {data})
  },
  //参与
  postpartin(data){
    return post('act/coupon/part_in', {data})
  },

}
export default apis