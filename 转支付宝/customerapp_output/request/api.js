const wx2my = require('../wx2my');
const Behavior = require('../Behavior');
import { get, post, put, del } from "./http.js";
const apis = {
  //获取广告页轮播图
  getadvertiselist() {
    return get('user/customer/advertise');
  },

  //获取订单商品
  getorderprodlist(data) {
    return get('order/delivery/detail/csCab?hotelId='+data.hotelId, {
      
    });
  },

  //获取售后类型
  getaftertype(data) {
    return get('basic/dict/items', {
      data
    });
  },

  //提交售后申请
  postmnbafter(data) {
    return post('cs/appl', {
      data
    });
  },

  //获取待开票列表
  getinvoicedlist(data) {
    return get('fin/inv/user/valid/prod?hotelId='+data.hotelId+'&customerId='+data.customerId, {
      data
    });
  },

  //获取开票详情
  getinvoiceddetail(id) {
    return get('fin/inv/' + id);
  },

  //撤销开票申请
  putinvoicedlist(id) {
    return put('fin/inv/' + id + '/cancel');
  },

  //获取运营商支持的发票类型
  getinvoicetype(data) {
    return get('fin/inv/style', {
      data
    });
  },

  //提交开票
  postinvoicing(data) {
    return post('fin/inv', {
      data
    });
  },

  //获取开票记录
  getbillingrecord(data) {
    return get('fin/inv/user?hotelId='+data.hotelId+'&customerId='+data.customerId, {
    });
  },

  //获取分类名称
  gettypename(data) {
    return get('hotel/feature/hotel?hotelId='+data.hotelId, {
      // data
    });
  },

  //获取分类列表
  gettypeList(data) {
    return get('hotel/feature/detail/condition', {
      data
    });
  },

  //获取客房设施详情
  getcharaceristicdetail(id) {
    return get('hotel/feature/detail/' + id);
  },

  //授权登陆
  postloginByWX(data) {
    return post('user/customer/loginByWX', {
      data
    });
  },

  //获取优惠券列表
  getcouponlist(data) {
    return get('coupon/batch/drawable?categoryIds='+data.categoryIds+'&cusId='+data.cusId+'&drawWay='+data.drawWay+'&funcId='+data.funcId+'&funcProdId='+data.funcProdId+'&hotelId='+data.hotelId+'&hotelProdId='+data.hotelProdId+'&sceneCode=',{
    });
  },

  //获取可用优惠券列表
  getcancouponlist(data) {
    return post('coupon/coupon/customer/useful', {
      data
    });
  },

  //领取优惠券
  postcoupon(data) {
    return post('coupon/coupon', {
      data
    });
  },

  //获取评价信息1
  getevaluationlist(data) {
    return get('remark/cus', {
      data
    });
  },

  //获取评价信息2
  getevaluation(data) {
    return get('remark/fine?hotelId='+data.hotelId+'&pageSize=1'+'&prodCode='+data.prodCode, {

    });
  },

  //获取商品信息
  getpordinfo(data) {
    return get('prod/func/product/hshop/detail?funcProdId='+data.funcProdId+'&latticeId='+data.latticeId, {
    });
  },

  //下单
  postbuynow(data) {
    return post('order', {
      data
    });
  },

  //支付请求
  postprodpay(data) {
    return post('order/pay', {
      data
    });
  },

  //检验商品是否可以增加数量
  testprodnum(data) {
    return get('prod/hotel/product/hshop/check/product', {
      data
    });
  },

  //确认支付状态
  confirmstatus(data) {
    return get('order/queryOrder', {
      data
    });
  },

  //获取地址列表
  getaddresslist(data) {
    return get('order/address', {
      data
    });
  },

  //新建地址post
  postcreateaddress(data) {
    return post('order/address', {
      data
    });
  },

  //新建地址put/修改默认地址
  putcreateaddress(data) {
    return put('order/address', {
      data
    });
  },

  //删除地址
  deleteaddress(id, data) {
    return del('order/address/' + id, {
      data
    });
  },

  //获取选中地址
  getaddressnow(id) {
    return get('order/address/' + id);
  },

  //获取默认地址
  getdefaultaddress(data) {
    return get('order/address/default', {
      data
    });
  },

  //校验已选优惠券是否可用
  postverifyavailable(data) {
    return post('coupon/coupon/customer/valid', {
      data
    });
  },

  //获取分享码
  postsharecode(data) {
    return post('act/share/code', {
      data
    });
  },

  //快递商品分类
  postcategories(data) {
    return post('prod/func/product/hshop/group/order/product', {
      data
    });
  },

  //获取订单详情
  getorderdetail(id) {
    return get('order/hShop/' + id);
  },

  //获取酒店故事列表
  gethotelstorylist(data) {
    return get('hotel/culture/story', {
      data
    });
  },

  //获取酒店故事故事详情
  gethotelstorydetail(id) {
    return get('hotel/culture/' + id + '/details');
  },

  //获取wifi
  getwifi(data) {
    return get('cabinet/qrcode?qrcode='+data.qrcode, {
      
    });
  },

  //获取酒店信息
  gethotelinfo(id) {
    return get('hotel/hshop/' + id);
  },

  //获取酒店所属运营商是否支持开商品发票
  getfininvcheck(data) {
    return get('fin/inv/check?hotelId='+data.hotelId, {
      
    });
  },

  //获取迷你吧商品信息
  getmnbprodlist(data) {
    return get('prod/func/product/hshop/cab/product?cabCode='+data.cabCode, {
      
    });
  },



  //获取便利店商品
  getbldprodlist(data) {
    return get('prod/func/product/hshop?categoryId='+data.categoryId+'&funcId='+data.funcId+'&hotelId='+data.hotelId+'&isStore=0'+'&pageNo='+data.pageNo+'&pageSize='+data.pageSize, {
    });
  },

  //获取客房服务订单列表
  getkffworderlist(data) {
    return get('rmsvc/order/mine', {
      data
    });
  },

  //获取住过的酒店
  getlicedhotel(data) {
    return get('reside/hotel?customerId='+data.customerId, {
    });
  },

  //静默登录
  postsilentlogin(data) {
    return post('user/customer/silentLogin', {
      data
    });
  },

  //获取cabcode、shareUser
  getcabcode(data) {
    return get('act/share/code/check?code='+data.code, {
    });
  },

  //获取柜子类型配置
  getcabtype(data) {
    return get('cabinet/setting/cabType?cabCode='+data.cabCode, {
      
    });
  },

  //存储用户进场信息
  postuserinfo(data) {
    return post('reside/hotel', {
      data
    });
  },

  //获取退款金额
  getrefundamount(id, data) {
    return get('cs/appl/' + id + '/amount', {
      data
    });
  },

  //撤销申请
  putmallafter(id) {
    return put('cs/appl/' + id + '/cancel');
  },

  //获取已申请售后商品详情
  getafterdetail(id) {
    return get('cs/appl/' + id);
  },

  //取消订单
  putcancelorder(id, data) {
    return put('order/hShop/cancel/' + id, {
      data
    });
  },

  //待支付订单支付
  posttobepaid(data) {
    return post('order/hShop/pay', {
      data
    });
  },

  //提交售后申请
  postaftersale(data) {
    return post('order/refund/record', {
      data
    });
  },

  //获取售后列表数据
  getafterlist(data) {
    return get('cs/appl/mine?customId='+data.customId+'&hotelId='+data.hotelId+'&pageNo='+data.pageNo+'&pageSize='+data.pageSize, {
    });
  },

  //获取是否支持酒店房费发票
  gethotelinvtype(data) {
    return get('fin/inv/user/valid/type?hotelId='+data.hotelId, {
      // data
    });
  },

  //获取用户余额、收支明细
  getuserbalance(id) {
    return get('fin/cus/' + id + '/balance');
  },

  //获取优惠券列表(领券中心)
  getcouponlist2(data) {
    return get('coupon/coupon/customer?cusId='+data.cusId+'&couponState='+data.couponState+'&hotelId='+data.hotelId+'&cabCode='+data.cabCode, {
    });
  },

  //获取待支付详情
  gettobepaiddetail(id) {
    return get('order/rountine/' + id);
  },

  //取消订单
  putcancelorder2(id, data) {
    return put('order/cancel/' + id, {
      data
    });
  },

  //获取订单我的订单列表
  getorderlist2(data) {
    return get('order/delivery/rountine/', {
      data
    });
  },

  //获取订单详情
  getorderdetail2(id) {
    return get('order/delivery/rountine/' + id);
  },

  //余额提现
  postwithdraw(data) {
    return post('fin/cus/expense/withdraw', {
      data
    });
  },

  //获取订单详情
  getorderlist(id) {
    return get('rmsvc/order/' + id);
  },

  //取消订单
  putcancelorder3(id, data) {
    return put('rmsvc/order/mine/' + id, {
      data
    });
  },

  //提交评价
  postevaluation(data) {
    return post('remark/cus', {
      data
    });
  },

  //待支付列表
  gettobepaylist(data) {
    return get('order/paying', {
      data
    });
  },

  //再次开门订单列表页
  getaginopen(id) {
    return put('order/detail/cab/open/' + id);
  },

  //再次开门支付成功页
  getaginopen2(id) {
    return put('order/cab/open/' + id);
  },

  //获取酒店房型房源信息
  getroominfo(data) {
    return get('book/room?hotelId='+data.hotelId+'&startDate='+data.startDate+'&endDate='+data.endDate+'&days='+data.days, {
      // data
    });
  },

  //获取房源信息
  getfyroominfo(id) {
    return get('book/resource/' + id + '/withType');
  },

  //获取房型信息
  getfxroominfo(id) {
    return get('book/type/' + id);
  },

  //获取订房详情
  getdfdetail(id) {
    return get('book/order/cus/' + id);
  },

  //申请订房退订
  putdforder(id) {
    return put('book/order/applyUnSub/' + id);
  },

  //获取房间信息
  getroominfo2(data) {
    return get('book/resource/order', {
      data
    });
  },

  //提交订房
  postdfroom(data) {
    return post('book/order', {
      data
    });
  },

  //调取微信支付
  postwxpay(data) {
    return post('book/order/pay', {
      data
    });
  },

  //取消订房订单
  canceldforder(id) {
    return put('book/order/cancel/' + id);
  },

  //订房支付状态确认
  getpaytype(data) {
    return get('book/order/queryOrder', {
      data
    });
  },

  //获取订房列表信息
  getdflist(data) {
    return get('book/order/cus/all', {
      data
    });
  },

  //获取客房服务列表
  getroomsercicelist(data) {
    return get('rmsvc/hotel_category?hotelId='+data.hotelId+'&isPage=0'+'&status=ENABLED', {
      // data
    });
  },

  //获取客房服务详情
  getroomsercicedetail(hotelcategoryid, id) {
    return get('rmsvc/hotel_category/' + hotelcategoryid + '/style/common/' + id);
  },

  //提交客房服务订单
  postroomorder(data) {
    return post('rmsvc/order', {
      data
    });
  },

  //获取客房服务订单列表
  getroomorderlist(id) {
    return get('rmsvc/hotel_category/' + id);
  },

  //获取功能区详情
  getfuncdetail(id) {
    return get('hotel/func/hshop/' + id);
  },

  //获取酒店市场分类一级目录
  gethotelclass(data) {
    return get('hotel/func/market/category/children?hotelId='+data.hotelId+'&funcId='+data.funcId+'&parentId=0', {
    });
  },

  //获取我的红包
  getmyredbaglist(data) {
    return get('act/redPacket/user?pageNo='+data.pageNo+'&pageSize='+data.pageSize+'&hotelId='+data.hotelId, {
    });
  },

  //领取分享红包
  getshareredbag(data) {
    return get('act/redPacket/record', {
      data
    });
  },

  //修改红包为已分享
  putredbagtype(code) {
    return put('act/redPacket/shared/' + code);
  },

  //获取用户可参与的活动
  getActlist(data) {
    return get('act/act/valid?hotelId='+data.hotelId, {
      
    });
  },

  //参与新人礼包活动
  putActNewcomer(data) {
    return put('act/hotel/newer_gift/part_in', {
      data
    });
  },

  //获取推荐商品
  getrecommendprodlist(data) {
    return get('prod/func/product/hshop/recommend/prod', {
      data
    });
  },

  //获取柜子格子状态
  getcabopentype(data) {
    return get('order/lattices/realTime/state', {
      data
    });
  },

  shouquan(data){
    return post('user/customer/login/aliPay/'+data.code,{

    })
  }

};
export default apis;