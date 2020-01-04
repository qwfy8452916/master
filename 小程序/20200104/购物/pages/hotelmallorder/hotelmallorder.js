const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    messtype: 1,
    cabId: '',//柜子id
    deliverylist1: [],//客房配送
    total1: [],//客房配送合计
    totalnum1: '',//客房配送商品总数量
    deliverytype1: '',//是否显示客房配送
    deliverylist2: [],//快递到家
    total2: [],//快递到家合计
    totalnum2: '',//快递到家商品总数量
    deliverytype2: '',//是否显示快递到家
    deliverylist3: '',//迷你吧
    total3: [],//迷你吧合计
    totalnum3: '',//迷你吧商品总数量
    deliverytype3: '',//是否显示迷你吧
    expresslist: '',//快递商品分组后的数据
    courierfee: 0,//快递费总额
    lumpsum: 0.00,//商品总额
    lumpsum2: 0.00,//商品总额+快递费总额
    lumpsum_Discount: 0.00,//商品优惠后总额
    coupon_selected: [],//已选优惠券
    coupon_optional: [],//可选优惠券
    coupontype: false,//是否显示优惠券
    coupontype2: false,//是否显示优惠券列表
    discount: 0.00,//优惠金额
    alllength: '',//结算商品种类总数
    roomFloor: '',//楼层
    roomCode: '',//房间号
    hotelName: '',//酒店名称
    receipttype: '',//收货信息是否需要填写
    receiptlist: '',//收货信息
    usernamekf: '',//客房配送联系人
    userphone: '',//客房配送联系电话
    remark1: '',//客房配送留言
    hotelId: '',
    customerId: '',
    province: '',//省代号
    paytype: true,//支付按钮状态
    catlist1: '',//购物车数据-客房配送
    catlist2: '',//购物车数据-快递到家
    catlist3: '',//购物车数据-迷你吧
    buylist: '',
    shareuser: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      cabId: app.globalData.cabId,
      hotelId: app.globalData.hotelId,
      customerId: app.globalData.userId,
      shareuser: app.globalData.shareUser,
      lumpsum: options.lumpsum,
      lumpsum_Discount: options.lump_sum_discount,
      province: options.province
    });
    wx.getStorage({
      key: 'buylist',
      success: function (res) {
        that.setData({
          buylist: res.data
        });
      }
    });
    wx.getStorage({
      key: 'deliverylist1',
      success: function (res) {
        that.setData({
          catlist1: res.data
        })
      }
    });
    wx.getStorage({
      key: 'deliverylist2',
      success: function (res) {
        that.setData({
          catlist2: res.data
        });
      }
    });
    wx.getStorage({
      key: 'deliverylist3',
      success: function (res) {
        that.setData({
          catlist3: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomCode',
      success: function (res) {
        that.setData({
          roomCode: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomFloor',
      success: function (res) {
        that.setData({
          roomFloor: res.data
        })
      }
    });
    wx.getStorage({
      key: 'hotelName',
      success: function (res) {
        that.setData({
          hotelName: res.data
        })
      }
    });
    wx.getStorage({
      key: 'coupon_selected',
      success: function (res) {
        let coupontype = false;
        if (res.data.length > 0) {
          coupontype = true;
        }
        that.setData({
          coupon_selected: res.data,
          coupontype: coupontype
        });
      }
    });
    that.getmnbdata(options.province);//迷你吧商品
  },
  onShow: function(){
    this.getaddress();
  },
  getmnbdata: function (province) {//迷你吧商品
    const that = this;
    let total3 = 0.00;
    let totalnum3 = 0;
    let deliverytype3 = false;
    wx.getStorage({//迷你吧商品
      key: 'orderlist3',
      success: function (res) {
        const resdata = res.data;
        if (resdata.length > 0) {
          for (let i = 0; i < resdata.length; i++) {
            total3 += parseFloat(resdata[i].totalprice);
            totalnum3 += parseInt(resdata[i].prodnum);
            resdata[i].delivWay = 3;
          }
          deliverytype3 = true;
        } else {
          total3 = 0.00;
          totalnum3 = 0;
          deliverytype3 = false;
        }
        that.setData({
          deliverylist3: resdata,
          total3: total3.toFixed(2),
          totalnum3: totalnum3,
          deliverytype3: deliverytype3
        });
        that.getxcdata(total3, province);
      }
    });
  },
  getxcdata: function (total3, province) {//现场配送商品
    const that = this;
    let total1 = 0.00;
    let totalnum1 = 0;
    let deliverytype1 = false;
    wx.getStorage({
      key: 'orderlist1',
      success: function (res) {
        const resdata = res.data;
        if (resdata.length > 0) {
          for (let i = 0; i < resdata.length; i++) {
            total1 += parseFloat(resdata[i].totalprice);
            totalnum1 += parseInt(resdata[i].prodnum);
            resdata[i].delivWay = 1;
          }
          deliverytype1 = true;
        } else {
          total1 = 0.00;
          totalnum1 = 0;
          deliverytype1 = false;
        }
        that.setData({
          deliverylist1: resdata,
          total1: total1.toFixed(2),
          totalnum1: totalnum1,
          deliverytype1: deliverytype1
        });
        that.getkddata(total3, total1, province);
      }
    });
  },
  getkddata: function (total3, total1, province) {//快递商品
    const that = this;
    let total2 = 0.00;
    let totalnum2 = 0;
    let deliverytype2 = false;
    let total_price = 0.00;
    wx.getStorage({
      key: 'orderlist2',
      success: function (res) {
        const resdata = res.data;
        if (resdata.length > 0) {
          for (let i = 0; i < resdata.length; i++) {
            total2 += parseFloat(resdata[i].totalprice);
            totalnum2 += parseInt(resdata[i].prodnum);
            resdata[i].delivWay = 2;
          }
          total_price = parseFloat(total3) + parseFloat(total1) + parseFloat(total2);
          total_price = total_price.toFixed(2);
          deliverytype2 = true;
          that.getproduct(res.data, province, total_price);//快递商品分组
          that.getaddress();
        } else {
          total2 = 0.00;
          totalnum2 = 0;
          deliverytype2 = false;
          total_price = parseFloat(total3) + parseFloat(total1) + parseFloat(total2);
          total_price = total_price.toFixed(2);
        }
        that.setData({
          deliverylist2: resdata,
          total2: total2.toFixed(2),
          totalnum2: totalnum2,
          deliverytype2: deliverytype2,
          lumpsum2: total_price,
          lumpsum_Discount: total_price
        });
        if (resdata.length == 0) {
          that.calculation();
          that.getcouponlist();
        }
      }
    });
  },
  getaddress: function () {//获取地址
    const that = this;
    wx.getStorage({
      key: 'addressid',
      success: function (res) {//获取选中地址
        wxrequest.getaddressnow(res.data).then(res => {
          let resdata = res.data;
          let resdatas = res.data.data;
          if (resdata.code == 0) {
            that.setData({
              receiptlist: resdatas,
              receipttype: false
            });
            wx.removeStorage({
              key: 'addressid',
              success(res) {}
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
        .catch(err => {
          wx.hideLoading();
          console.log(err)
        });
      },
      fail: function (res) {//获取默认地址
        let linkData = {
          customerId: app.globalData.userId
        };
        wxrequest.getdefaultaddress(linkData).then(res => {
          let resdata = res.data;
          let resdatas = res.data.data;
          if (resdata.code == 0) {
            that.setData({
              receiptlist: resdatas,
              receipttype: false
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        })
        .catch(err => {
          wx.hideLoading();
          console.log(err)
        });
      }
    });
  },
  onUnload: function () {
    this.changestorage();
  },
  getproduct: function (list, provinceCode, total_price){//快递商品分类
    const that = this;
    let postData = {
      provinceCode: provinceCode,
      params: list
    }
    postData = JSON.stringify(postData);
    wxrequest.postcategories(postData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let courierfee = 0.00;
      let lumpsum2 = 0.00;
      if (resdata.code == 0) {
        for (let i = 0; i < resdatas.length; i++){
          resdatas[i].messtype = 1;
          resdatas[i].message = '';
          courierfee = parseFloat(courierfee) + parseFloat(resdatas[i].totalExpressFee);
        }
        lumpsum2 = parseFloat(total_price) + parseFloat(courierfee);
        lumpsum2 = lumpsum2.toFixed(2);
        courierfee = courierfee.toFixed(2);
        that.setData({
          expresslist: resdatas,
          courierfee: courierfee,
          lumpsum2: lumpsum2,
          lumpsum_Discount: lumpsum2
        });
        that.calculation();
        that.getcouponlist();
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  addressfun: function () {//地址
    wx.navigateTo({
      url: '../hotelmalladdress/hotelmalladdress'
    })
  },
  bindTextAreaBlur: function(e){//现场送备注
    this.setData({
      remark1: e.detail.value
    });
  },
  showtext: function (e) {//快递备注信息1
    const that = this;
    let listdata = that.data.expresslist;
    let id = e.currentTarget.dataset.id;
    setTimeout(function () {
      wx.setStorageSync("id", id);
    }, 200);
    for (let i = 0; i < listdata.length; i++) {
      if (listdata[i].prodOwnerOrgId == id) {
        listdata[i].messtype = 2;
      } else {
        listdata[i].messtype = 1;
      }
    }
    that.setData({
      expresslist: listdata
    });
  },
  showtext2: function (e) {//现场备注信息
    this.setData({
      messtype: 2
    });
  },
  confirm: function (e) {//快递备注信息2
    const that = this;
    let listdata = that.data.expresslist;
    let list2 = that.data.deliverylist2;
    let id = wx.getStorageSync("id");
    let message = e.detail.value;
    for (let i = 0; i < listdata.length; i++) {
      if (listdata[i].prodOwnerOrgId == id) {
        listdata[i].message = message;
        listdata[i].messtype = 1;
      }
    }
    for (let i = 0; i < list2.length; i++) {
      if (list2[i].prodOwnerOrgId == id) {
        list2[i].message = message;
      }
    }
    that.setData({
      expresslist: listdata,
      deliverylist2: list2
    });
    wx.removeStorageSync("id");
  },
  confirm2: function (){
    this.setData({
      messtype: 1
    });
  },
  usernamefun: function (e) {//联系人
    this.setData({
      usernamekf: e.detail.value
    })
  },
  telfun: function (e) {//联系人
    this.setData({
      userphone: e.detail.value
    })
  },
  delayfun: function(){
    const that = this;
    setTimeout(function(){
      that.checkcoupon();
    },200);
  },
  checkcoupon: function () {//校验已选优惠券是否可用
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    const hotelid = that.data.hotelId;
    const userid = that.data.customerId;
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    const datajson = that.getdata();
    const minlist = datajson.minlist;
    const finclist = datajson.finclist;
    const selected_id = datajson.selected_id;
    let prodList = minlist.concat(finclist);
    if (selected_id.length != 0) {
      let linkData = {
        prodList: prodList,//已选商品
        couponIds: selected_id,//已选优惠券id
        cusId: userid,
        hotelId: hotelid
      };
      wxrequest.postverifyavailable(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          if (resdata.data.length != 0) {//有不可用的券
            wx.showToast({
              title: '您选的优惠券中有不可用的优惠券，请重新选择优惠券',
              icon: 'none',
              duration: 2000
            });
            wx.removeStorage({
              key: 'coupon_selected',
              success(res) {}
            });
            that.setData({
              coupon_selected: []
            });
            wx.navigateBack({
              delta: 1
            });
            wx.hideLoading();
          } else {
            that.settlementfun();//结算
          }
        } else {
          wx.showToast({
            title: resdatas.msg,
            icon: 'none',
            duration: 2000
          });
          wx.removeStorage({
            key: 'coupon_selected',
            success(res) {  }
          });
          that.setData({
            coupon_selected: []
          });
          wx.navigateBack({
            delta: 1
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
    } else {
      that.settlementfun();//结算
    }
  },
  settlementfun: function () {//提交订单
    const that = this;
    const thatdata = that.data;
    const usernamekf = thatdata.usernamekf;//客房配送联系人
    const userphone = thatdata.userphone;//客房配送联系电话
    const shareuser = that.data.shareuser;
    let shareUserId = '';
    let shareUserType = '';
    if(shareuser != '0' && shareuser != ''){
      shareUserId = shareuser.id;
      shareUserType = shareuser.type;
    }
    if (usernamekf == ''){
      wx.showToast({
        title: '请填写联系人',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (userphone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (!/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(userphone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    that.setData({
      paytype: false
    });
    wx.showToast({
      title: '支付中,请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    });
    let receiptlist = thatdata.receiptlist;//快递收货信息
    let orderProd1 = thatdata.deliverylist1;//现场送
    let orderProd2 = thatdata.deliverylist2;//快递送
    let orderProd3 = thatdata.deliverylist3;//迷你吧
    let expressFee = parseFloat(thatdata.courierfee).toFixed(2);//快递费总额
    let couponAmount = parseFloat(thatdata.discount).toFixed(2);//优惠总金额
    let lump_sum = parseFloat(thatdata.lumpsum_Discount).toFixed(2);//实际支付金额
    if (expressFee == ''){
      expressFee = 0;
    }
    for (let i = 0; i < orderProd1.length; i++) {
      orderProd1[i].latticeId = 0;
    }
    for (let i = 0; i < orderProd2.length; i++){
      orderProd2[i].expressPerson = receiptlist.consignee;
      orderProd2[i].expressPhone = receiptlist.consigneePhone;
      orderProd2[i].expressAddress = receiptlist.addressAll;
      orderProd2[i].latticeId = 0;
    }
    let orderProd = orderProd3.concat(orderProd1);
    orderProd = orderProd.concat(orderProd2);
    let lisr_order = [];
    for (let i = 0; i < orderProd.length; i++) {
      let prodinfo = {};
      prodinfo.prodOwnerOrgId = orderProd[i].prodOwnerOrgId;
      prodinfo.prodOwnerOrgKind = orderProd[i].prodOwnerOrgKind;
      prodinfo.hotelId = orderProd[i].hotelId;
      if (orderProd[i].delivWay == 3){
        prodinfo.latticeId = orderProd[i].latticeId;
        prodinfo.funcId = 1;
        prodinfo.funcProdId = 0;
      } else {
        prodinfo.funcId = orderProd[i].funcId;
        prodinfo.funcProdId = orderProd[i].funcProdId;
      }
      prodinfo.hotelProdId = orderProd[i].hotelProdId;
      prodinfo.prodCode = orderProd[i].prodCode;
      if (orderProd[i].delivWay == 2){
        prodinfo.expressPerson = orderProd[i].expressPerson;
        prodinfo.expressPhone = orderProd[i].expressPhone;
        prodinfo.expressAddress = orderProd[i].expressAddress;
        prodinfo.isFreeShipping = orderProd[i].isFreeShipping;
        prodinfo.expressFeeId = orderProd[i].expressFeeId;
        if (orderProd[i].message == undefined){
          prodinfo.message = '';
        } else {
          prodinfo.message = orderProd[i].message;
        }
      }
      prodinfo.prodCount = orderProd[i].prodnum;
      prodinfo.prodPrice = orderProd[i].prodRetailPrice;
      prodinfo.totalAmount = orderProd[i].totalprice;
      prodinfo.deliveryWay = orderProd[i].delivWay;
      lisr_order.push(prodinfo);
    }
    let prodCount = parseInt(thatdata.totalnum1) + parseInt(thatdata.totalnum2) + parseInt(thatdata.totalnum3);
    let delayPayFlag = 0;
    if (orderProd3.length > 0){//有迷你吧商品不支持待支付
      delayPayFlag = 0;
    } else {//没有有迷你吧商品支持待支付
      delayPayFlag = 1;
    }
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let selected_id = [];//已选优惠券id
    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }
    let linkData = {
      shareUserId: shareUserId,//分享者的用户Id,
      shareUserType: shareUserType,//分享者的用户类型(1:员工，2：顾客)
      cabId: thatdata.cabId,//柜子id
      roomCode: thatdata.roomCode,//房间号
      roomFloor: thatdata.roomFloor,//房间楼层
      contactName: usernamekf,//联系人姓名
      contactPhone: userphone,//联系人手机号码
      roomDeliveryRemark: thatdata.remark1,//客房配送留言
      hotelId: thatdata.hotelId,//酒店ID
      customerId: thatdata.customerId,//顾客id
      delayPayFlag: delayPayFlag,//是否支持待支付(0：否；1：是；有迷你吧商品不支持)
      totalAmount: lump_sum,//商品总价 
      prodCount: prodCount,//商品总数量
      expressFee: expressFee,//快递费总额
      orderDetailDTOList: lisr_order,//订单商品信息
      couponAmount: couponAmount,//优惠金额
      couponIds: selected_id//优惠券id_list
    };
    wxrequest.postbuynow(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (lump_sum > 0){
          that.orderpayfun(resdata.data.id, resdata.data.orderCode, delayPayFlag);
        } else {
          that.changestorage();
          wx.redirectTo({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + resdata.data.id + '&ishasmnb=' + delayPayFlag + '&redcode=-1'
          })
        }
      } else {
        wx.hideToast();//隐藏加载动画
        const msglist = resdata.msg;
        const resdatas = resdata.data;
        if (msglist.startsWith('msg')) {
          let msglist2 = msglist.substring(3, msglist.length);
          let prodname = '';
          let msglist3 = msglist2.split(",");
          let lumpsum = that.data.lumpsum;
          let lumpsum2 = that.data.lumpsum2;
          let buy_list = that.data.deliverylist1;//现场送商品
          for (let j = 0; j < msglist3.length; j++) {
            for (let i = 0; i < buy_list.length; i++) {
              if (msglist3[j] == buy_list[i].hotelProdId) {
                prodname = buy_list[i].prodShowName;
                lumpsum2 = lumpsum2 - buy_list[i].prodnum * buy_list[i].prodRetailPrice;
                lumpsum = lumpsum - buy_list[i].prodnum * buy_list[i].prodRetailPrice;
                buy_list.splice(i, 1);
              }
            }
          }
          wx.setStorage({
            key: 'orderlist1',
            data: buy_list,
          });
          that.setData({
            lumpsum: lumpsum
          });
          wx.showToast({
            title: prodname + '等商品库存不足已删除，请重新下单',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function(){
            that.getmnbdata(that.data.province);
          },300);
        } else {
          wx.showToast({
            title: msglist,
            icon: 'none',
            duration: 2000
          });
        }
        that.setData({
          paytype: true
        });
        return false;
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  orderpayfun: function (id, code, delayPayFlag) {//支付请求
    const that = this;
    let orderid = id;
    let ordercode = code;
    let linkData = {
      appletType: app.globalData.appletType,
      id: orderid,
      customerId: that.data.customerId
    };
    wxrequest.postprodpay(linkData).then(res => {
      that.changestorage();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.requestPayment({
          appId: resdatas.appId,
          timeStamp: resdatas.timeStamp,
          nonceStr: resdatas.nonceStr,
          package: resdatas.package,
          signType: 'MD5',
          paySign: resdatas.paySign,
          success: function (res) {
            wx.hideToast();//隐藏加载动画
            if (res.errMsg === "requestPayment:ok") {
              that.confirmfun(orderid, ordercode, delayPayFlag);//确认支付状态
            }
          },
          fail: function (res) {
            wx.hideToast();//隐藏加载动画
            wx.navigateTo({
              url: '../prodOrder/prodOrder?typeindex=3'
            });
          }
        })
      } else {
        wx.hideToast();//隐藏加载动画
        wx.showToast({
          title: '订单异常，请重新提交',
          icon: 'none',
          duration: 2000
        });
        wx.removeStorage({
          key: 'coupon_selected',
          success(res) {  }
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 3000);
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  changestorage: function () {//清空购物车
    let kong = [];
    wx.setStorage({
      key: 'deliverylist1',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist2',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist3',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist1',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist2',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist3',
      data: kong,
    });
    wx.setStorage({
      key: 'buylist',
      data: kong,
    });
  },
  getcouponlist: function () {//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let minlist = [];//酒店商品id
    let finclist = [];//功能区商品id+商品总价
    const hotelid = that.data.hotelId;
    const userid = that.data.customerId;
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let selected_id = [];//已选优惠券id
    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }
    let checkbox_listh_1 = JSON.stringify(that.data.deliverylist1);//现场配送商品
    checkbox_listh_1 = JSON.parse(checkbox_listh_1);
    let checkbox_listh_2 = JSON.stringify(that.data.deliverylist2);//快递配送商品
    checkbox_listh_2 = JSON.parse(checkbox_listh_2);
    let checkbox_listh_3 = JSON.stringify(that.data.deliverylist3);//迷你吧商品
    checkbox_listh_3 = JSON.parse(checkbox_listh_3);

    if (checkbox_listh_1.length > 0) {//现场配送商品
      for (let i = 0; i < checkbox_listh_1.length; i++) {
        let datainfo = {};
        datainfo.funcId = checkbox_listh_1[i].funcId;
        datainfo.funcProdId = checkbox_listh_1[i].funcProdId;
        datainfo.hotelProdId = checkbox_listh_1[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_1[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_1[i].prodnum;
        datainfo.prodPrice = checkbox_listh_1[i].prodRetailPrice;
        datainfo.totalAmount = checkbox_listh_1[i].totalprice;
        finclist.push(datainfo);
      }
    }
    if (checkbox_listh_2.length > 0) {//快递配送商品
      for (let i = 0; i < checkbox_listh_2.length; i++) {
        let datainfo = {};
        datainfo.funcId = checkbox_listh_2[i].funcId;
        datainfo.funcProdId = checkbox_listh_2[i].funcProdId;
        datainfo.hotelProdId = checkbox_listh_2[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_2[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_2[i].prodnum;
        datainfo.prodPrice = checkbox_listh_2[i].prodRetailPrice;
        datainfo.totalAmount = checkbox_listh_2[i].totalprice;
        finclist.push(datainfo);
      }
    }
    if (checkbox_listh_3.length > 0) {//迷你吧商品
      for (let i = 0; i < checkbox_listh_3.length; i++) {
        let datainfo = {};
        datainfo.hotelProdId = checkbox_listh_3[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_3[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_3[i].prodnum;
        datainfo.prodPrice = checkbox_listh_3[i].prodRetailPrice;
        datainfo.totalAmount = checkbox_listh_3[i].totalprice;
        minlist.push(datainfo);
      }
    }
    let prodList = minlist.concat(finclist);
    let linkData = {
      prodList: finclist,//已选商品
      couponIds: selected_id,//已选优惠券id
      cusId: userid,
      hotelId: hotelid
    };
    wxrequest.getcancouponlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          coupon_optional: resdatas
        });
        wx.hideLoading();
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  showcoupon: function () {//显示优惠券列表
    if (!this.data.coupontype2) {
      this.getcouponlist();
    } else {
      this.calculation();
    }
    this.setData({
      coupontype2: !this.data.coupontype2
    });
  },
  changecoupon: function (e) {//修改已选优惠券
    const that = this;
    const edata = e.currentTarget.dataset;
    let coupon_selected = that.data.coupon_selected;//已选优惠券
    let coupon_optional = that.data.coupon_optional;//已选优惠券
    if (edata.type == 1) {//删除优惠券
      coupon_selected.splice(edata.index, 1);
    } else {//添加优惠券
      if (coupon_optional[edata.index].couponLimit == 0) {
        coupon_selected = [],
        coupon_selected.push(coupon_optional[edata.index]);
      } else {
        coupon_selected.push(coupon_optional[edata.index]);
      } 
    }
    that.setData({
      coupon_selected: coupon_selected
    });
    that.getcouponlist();
  },
  calculation: function () {//计算优惠后金额
    const that = this;
    const lumpsum2 = parseFloat(that.data.lumpsum2);//商品总额+快递费
    let lumpsum_Discount = 0.00;//商品优惠后总额
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let discount = 0.00;//优惠金额
    for (let i = 0; i < coupon_selected.length; i++) {
      discount = parseFloat(discount) + parseFloat(coupon_selected[i].reduceMoney);
    }
    lumpsum_Discount = parseFloat(lumpsum2) - parseFloat(discount);
    discount = discount.toFixed(2);
    lumpsum_Discount = lumpsum_Discount.toFixed(2);
    that.setData({
      discount: discount,
      lumpsum_Discount: lumpsum_Discount
    });
  },
  getdata() {//获取minlist、finclist
    const that = this;
    let datajson = {};
    let minlist = [];//酒店商品id
    let finclist = [];//功能区商品id+商品总价
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let selected_id = [];//已选优惠券id
    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }
    let checkbox_listh_1 = JSON.stringify(that.data.deliverylist1);//现场配送商品
    checkbox_listh_1 = JSON.parse(checkbox_listh_1);
    let checkbox_listh_2 = JSON.stringify(that.data.deliverylist2);//快递配送商品
    checkbox_listh_2 = JSON.parse(checkbox_listh_2);
    let checkbox_listh_3 = JSON.stringify(that.data.deliverylist3);//迷你吧商品
    checkbox_listh_3 = JSON.parse(checkbox_listh_3);

    if (checkbox_listh_1.length > 0) {//现场配送商品
      for (let i = 0; i < checkbox_listh_1.length; i++) {
        let datainfo = {};
        datainfo.funcId = checkbox_listh_1[i].funcId;
        datainfo.funcProdId = checkbox_listh_1[i].funcProdId;
        datainfo.hotelProdId = checkbox_listh_1[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_1[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_1[i].prodnum;
        datainfo.prodPrice = checkbox_listh_1[i].prodRetailPrice;
        datainfo.totalAmount = checkbox_listh_1[i].totalprice;
        finclist.push(datainfo);
      }
    }
    if (checkbox_listh_2.length > 0) {//快递配送商品
      for (let i = 0; i < checkbox_listh_2.length; i++) {
        let datainfo = {};
        datainfo.funcId = checkbox_listh_2[i].funcId;
        datainfo.funcProdId = checkbox_listh_2[i].funcProdId;
        datainfo.hotelProdId = checkbox_listh_2[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_2[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_2[i].prodnum;
        datainfo.prodPrice = checkbox_listh_2[i].prodRetailPrice;
        datainfo.totalAmount = checkbox_listh_2[i].totalprice;
        finclist.push(datainfo);
      }
    }
    if (checkbox_listh_3.length > 0) {//迷你吧商品
      for (let i = 0; i < checkbox_listh_3.length; i++) {
        let datainfo = {};
        datainfo.hotelProdId = checkbox_listh_3[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_3[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_3[i].prodnum;
        datainfo.prodPrice = checkbox_listh_3[i].prodRetailPrice;
        datainfo.totalAmount = checkbox_listh_3[i].totalprice;
        minlist.push(datainfo);
      }
    }
    datajson.minlist = minlist;
    datajson.finclist = finclist;
    datajson.selected_id = selected_id;
    return datajson;
  },
  confirmfun: function (orderid, ordercode, delayPayFlag){//确认支付状态
    const that = this;
    let linkData = {
      orderCode: ordercode,
      appletType: app.globalData.appletType
    };
    wxrequest.confirmstatus(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdatas.result == 'SUCCESS') {
          wx.redirectTo({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + orderid + '&ishasmnb=' + delayPayFlag + '&redcode=' + resdatas.redCode
          });
        } else {
          wx.navigateTo({
            url: '../prodOrder/prodOrder?typeindex=3'
          });
        }
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        wx.removeStorage({
          key: 'coupon_selected',
          success(res) {  }
        });
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        }, 3000);
      }
    })
    .catch(err => {
      console.log(err)
    });
  }
})