const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    funcids: [],
    messtype: 1,
    kdmesstype: 1,
    kdmessage: '',
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
    deliverylist5: '',//迷你吧
    total5: [],//卡券合计
    totalnum5: '',//卡券总数量
    deliverytype5: '',//是否显示卡券
    expresslist: '',//快递商品分组后的数据
    courierfee: 0.00,//快递费总额
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
    roomCodeN: '',
    roomCodetype: false,
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
    catlist5: '',//购物车数据-迷你吧
    buylist: '',
    shareuser: '',
    prodvou: [],//商品抵扣券
    prodvou_select: [],//已选商品抵扣券
    prodvou_money: 0.00,//商品抵扣金额
    prodvou_name: '未选择免费领用券',
    prodvou_type: false,
    moneyvou: [],//现金抵扣券
    moneyvou_select: [],//已选现金抵扣券
    moneyvou_money: 0.00,//现金抵扣金额
    moneyvou_name: '未选择现金抵扣券',
    moneyvou_type: false,
    selelist: [],
    points: [],
    wblogistics: '',
    lgcId: -1,
    lgcHotelId: '',
    lgcIdindex: 0,
    freight: 0.00
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      funcids: app.globalData.funcids,
      cabId: app.globalData.cabId,
      hotelId: app.globalData.hotelId,
      customerId: app.globalData.userId,
      points: app.globalData.points,
      shareuser: app.globalData.shareUser,
      lumpsum: options.lumpsum,
      lumpsum_Discount: options.lump_sum_discount,
      province: options.province,
      lgcId: options.lgcid,
      lgcIdindex: options.lgcidindex,
      lgcHotelId: options.lgchotelid,
      freight: options.freight
    });
    wx.getStorage({
      key: 'prodvouIds',
      success: function (res) {
        that.setData({
          prodvou_select: res.data
        });
      }
    });
    wx.getStorage({
      key: 'moneyvouId',
      success: function (res) {
        that.setData({
          moneyvou_select: res.data
        });
      }
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
      key: 'deliverylist5',
      success: function (res) {
        that.setData({
          catlist5: res.data
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
    that.get_logisticslist(app.globalData.funcids);
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
        that.getvoucherdata(total3, total1, province);
      }
    });
  },
  getvoucherdata: function(total3, total1, province){//卡券商品
    const that = this;
    let total5 = 0.00;
    let totalnum5 = 0;
    let deliverytype5 = false;
    let total_price = 0.00;
    wx.getStorage({
      key: 'orderlist5',
      success: function (res) {
        const resdata = res.data;
        if (resdata.length > 0) {
          for (let i = 0; i < resdata.length; i++) {
            total5 += parseFloat(resdata[i].totalprice);
            totalnum5 += parseInt(resdata[i].prodnum);
            resdata[i].delivWay = 5;
          }
          total_price = parseFloat(total3) + parseFloat(total1) + parseFloat(total5);
          total_price = total_price.toFixed(2);
          deliverytype5 = true;
        } else {
          total5 = 0.00;
          totalnum5 = 0;
          deliverytype5 = false;
          total_price = parseFloat(total3) + parseFloat(total1) + parseFloat(total5);
          total_price = total_price.toFixed(2);
        }
        that.setData({
          deliverylist5: resdata,
          total5: total5.toFixed(2),
          totalnum5: totalnum5,
          deliverytype5: deliverytype5
        });
        that.getztdata(total3, total1, total5, province);
      }
    });
  },
  getztdata: function(total3, total1, total5, province){//自提商品
    const that = this;
    let total4 = 0.00;
    let totalnum4 = 0;
    let deliverytype4 = false;
    let total_price = 0.00;
    wx.getStorage({
      key: 'orderlist4',
      success: function (res) {
        const resdata = res.data;
        if (resdata.length > 0) {
          for (let i = 0; i < resdata.length; i++) {
            total4 += parseFloat(resdata[i].totalprice);
            totalnum4 += parseInt(resdata[i].prodnum);
            resdata[i].delivWay = 4;
          }
          total_price = parseFloat(total3) + parseFloat(total1) + parseFloat(total4) + parseFloat(total5);
          total_price = total_price.toFixed(2);
          deliverytype4 = true;
        } else {
          total4 = 0.00;
          totalnum4 = 0;
          deliverytype4 = false;
          total_price = parseFloat(total3) + parseFloat(total1) + parseFloat(total4) + parseFloat(total5);
          total_price = total_price.toFixed(2);
        }
        that.setData({
          deliverylist4: resdata,
          total4: total4.toFixed(2),
          totalnum4: totalnum4,
          deliverytype4: deliverytype4
        });
        that.getkddata(total3, total1, total4, total5, province);
      }
    });
  },
  getkddata: function (total3, total1, total4, total5, province) {//快递商品
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
          total_price = parseFloat(total3) + parseFloat(total1) + parseFloat(total2) + parseFloat(total4) + parseFloat(total5);
          total_price = total_price.toFixed(2);
          deliverytype2 = true;
          that.getproduct(res.data, province, total_price, total3);//快递商品分组
          that.getaddress();
        } else {
          total2 = 0.00;
          totalnum2 = 0;
          deliverytype2 = false;
          total_price = parseFloat(total3) + parseFloat(total1) + parseFloat(total2) + parseFloat(total4) + parseFloat(total5);
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
        that.post_prodvou();
        that.get_moneyvou();
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
            });
            if(that.data.deliverylist2.length > 0 && that.data.lgcId != -1) {
              that.get_freight(that.data.lgcId);
            }
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
            if(resdatas == '' || resdatas == null){
              that.setData({
                receipttype: true
              });
            } else {
              that.setData({
                receiptlist: resdatas,
                receipttype: false
              });
            }
            if(that.data.deliverylist2.length > 0 && that.data.lgcId != -1) {
              that.get_freight(that.data.lgcId);
            }
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
      if (resdata.code == 0) {
        for (let i = 0; i < resdatas.length; i++){
          resdatas[i].messtype = 1;
          resdatas[i].message = '';
          courierfee = parseFloat(courierfee) + parseFloat(resdatas[i].totalExpressFee);
        }
        courierfee = courierfee.toFixed(2);
        that.setData({
          expresslist: resdatas,
          courierfee: courierfee,
          lumpsum2: total_price,
          lumpsum_Discount: total_price
        });
        that.post_prodvou();
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
    // let listdata = that.data.expresslist;
    // let id = e.currentTarget.dataset.id;
    // setTimeout(function () {
    //   wx.setStorageSync("id", id);
    // }, 200);
    // for (let i = 0; i < listdata.length; i++) {
    //   if (listdata[i].prodOwnerOrgId == id) {
    //     listdata[i].messtype = 2;
    //   } else {
    //     listdata[i].messtype = 1;
    //   }
    // }
    that.setData({
      kdmesstype: 2
      // expresslist: listdata
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
    // let id = wx.getStorageSync("id");
    let message = e.detail.value;
    for (let i = 0; i < listdata.length; i++) {
      listdata[i].message = message;
      // if (listdata[i].prodOwnerOrgId == id) {
      //   listdata[i].message = message;
      //   listdata[i].messtype = 1;
      // }
    }
    for (let i = 0; i < list2.length; i++) {
      list2[i].message = message;
      // if (list2[i].prodOwnerOrgId == id) {
      //   list2[i].message = message;
      // }
    }

    that.setData({
      expresslist: listdata,
      deliverylist2: list2,
      kdmessage: message,
      kdmesstype: 1
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
          if (!resdatas) {//有不可用的券
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
            title: resdata.msg,
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
          that.backfun();
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
    let lgcId = that.data.lgcId;
    let lgcHotelId = that.data.lgcHotelId;
    let logisticsFee = that.data.freight;
    if(userphone != '' && !/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(userphone)){
      wx.showToast({
        title: '请填写正确的联系电话',
        icon: 'none',
        duration: 2000
      });
      that.setData({
        paytype: true
      });
      return false;
    }
    if(shareuser != '0' && shareuser != ''){
      shareUserId = shareuser.id;
      shareUserType = shareuser.type;
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
    let orderProd4 = thatdata.deliverylist4;//自提
    let orderProd5 = thatdata.deliverylist5;//卡券
    let expressFee = parseFloat(thatdata.courierfee).toFixed(2);//快递费总额
    let couponAmount = parseFloat(thatdata.discount).toFixed(2);//优惠总金额
    let lump_sum = parseFloat(thatdata.lumpsum_Discount).toFixed(2);//实际支付金额
    // if(lgcId == -1) {
    //   lgcId = '';
    //   lgcHotelId = '';
    //   logisticsFee = 0.00;
    // } else {
    //   expressFee = 0.00;
    // }
    for (let i = 0; i < orderProd1.length; i++) {
      orderProd1[i].latticeId = 0;
    }
    for (let i = 0; i < orderProd2.length; i++){
      orderProd2[i].expressPerson = receiptlist.consignee;
      orderProd2[i].expressPhone = receiptlist.consigneePhone;
      orderProd2[i].expressAddress = receiptlist.address;
      orderProd2[i].latticeId = 0;
    }
    let orderProd = orderProd3.concat(orderProd1);
    orderProd = orderProd.concat(orderProd2);
    orderProd = orderProd.concat(orderProd5);
    orderProd = orderProd.concat(orderProd4);
    let lisr_order = [];
    for (let i = 0; i < orderProd.length; i++) {
      let prodinfo = {};
      prodinfo.discountPrice = orderProd[i].discountPrice;
      prodinfo.discountAmount = orderProd[i].discountAmount;
      prodinfo.actSecDiscountSettingId = orderProd[i].actSecDiscountSettingId;
      prodinfo.prodOwnerOrgId = orderProd[i].prodOwnerOrgId;
      prodinfo.prodOwnerOrgKind = orderProd[i].prodOwnerOrgKind;
      prodinfo.hotelId = orderProd[i].hotelId;
      prodinfo.hotelProdId = orderProd[i].hotelProdId;
      prodinfo.prodCode = orderProd[i].prodCode;
      prodinfo.prodCount = orderProd[i].prodnum;
      prodinfo.prodPrice = orderProd[i].prodRetailPrice;
      prodinfo.totalAmount = orderProd[i].totalprice;
      prodinfo.deliveryWay = orderProd[i].delivWay;
      if (orderProd[i].delivWay == 3){
        prodinfo.latticeId = orderProd[i].latticeId;
        prodinfo.funcId = 1;
        prodinfo.funcProdId = 0;
      } else {
        prodinfo.funcId = orderProd[i].funcId;
        prodinfo.funcProdId = orderProd[i].funcProdId;
      }
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
      if(orderProd[i].delivWay == 5){
        prodinfo.vouBatchId = orderProd[i].vouBatchId;
      }
      if(orderProd[i].funcProdSpecId){
        prodinfo.funcProdSpecId = orderProd[i].funcProdSpecId;
      } else {
        prodinfo.funcProdSpecId = 0;
      }
      if(orderProd[i].delivWay == 4 && thatdata.points && thatdata.points[0].id){
        prodinfo.pointId = thatdata.points[0].id;
      } else {
        prodinfo.pointId = 0;
      }
      if(orderProd[i].categoryId) {
        prodinfo.prodCategoryId = parseInt(orderProd[i].categoryId);
      } else {
        prodinfo.prodCategoryId = '';
      }
      lisr_order.push(prodinfo);
    }
    let prodCount = parseInt(thatdata.totalnum1) + parseInt(thatdata.totalnum2) + parseInt(thatdata.totalnum3) + parseInt(thatdata.totalnum5);
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
    let prodVouIds_data = [];
    if(that.data.prodvou_select.length > 0) {
      prodVouIds_data = that.data.prodvou_select;
    }
    let linkData = {
      shareStyle: app.globalData.shareStyle,
      shareCode: app.globalData.sharecode,
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
      couponIds: selected_id,//优惠券id_list
      vouDeductAmount: that.data.prodvou_money,//商品抵扣金额
      cashDeductAmount: that.data.moneyvou_money,//现金抵扣金额
      prodVouIds: prodVouIds_data,//已选商品抵扣券id(数组)
      moneyVouIds: that.data.moneyvou_select,//已选现金抵扣券id
      // lgcHotelId: lgcHotelId,//外部物流id
      // lgcActualFee: logisticsFee,//外部物流费用
      // lgcLatitude: receiptlist.latitude,
      // lgcLongitude: receiptlist.longitude,
      settleShareCode: app.globalData.settleShareCode,
      visitRecordId: app.globalData.visitRecordId
    };
    wxrequest.postbuynow(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.funcids = [];
        if (lump_sum > 0){
          that.orderpayfun(resdata.data.id, resdata.data.orderCode, delayPayFlag);
        } else {
          that.changestorage();
          wx.reLaunch({
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
      wx.hideLoading();
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
            wx.reLaunch({
              url: '../my/my?type=' + 1
            });
          }
        })
      } else {
        wx.hideToast();//隐藏加载动画
        wx.showToast({
          title: resdata.msg,
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
      wx.hideLoading();
      console.log(err)
    });
  },
  changestorage: function () {//清空购物车
    let kong = [];
    let kong2 = '';
    wx.setStorage({
      key: 'prodvouIds',
      data: kong,
    });
    wx.setStorage({
      key: 'moneyvouId',
      data: kong2,
    });
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
      key: 'deliverylist4',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist5',
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
      key: 'orderlist4',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist5',
      data: kong,
    });
    wx.setStorage({
      key: 'buylist',
      data: kong,
    });
    wx.setStorage({
      key: 'shopcartvoucherlist',
      data: kong,
    });
    wx.setStorage({
      key: 'money',
      data: 0.00,
    });
  },
  getcouponlist: function () {//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this; 
    const datajson_data = that.getdata();
    let prodList = that.data.selelist;
    let linkData = {
      prodList: prodList,//已选商品
      couponIds: datajson_data.selected_id,//已选优惠券id
      cusId: app.globalData.userId,
      hotelId: app.globalData.hotelId
    };
    wxrequest.getcancouponlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          coupon_optional: resdatas
        });
        that.get_moneyvou();
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
      wx.hideLoading();
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
    let coupon_optional = that.data.coupon_optional;//可选优惠券
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
      coupon_selected: coupon_selected,
      moneyvou_select: []
    });
    that.getcouponlist();
  },
  calculation: function () {//计算优惠后金额
    const that = this;
    const lumpsum2 = parseFloat(that.data.lumpsum2);//商品总额
    let lumpsum_Discount = 0.00;//商品优惠后总额
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    const prodvou_money = parseFloat(that.data.prodvou_money);//商品抵扣金额
    const moneyvou_money = parseFloat(that.data.moneyvou_money);//现金抵扣金额
    let discount = 0.00;//优惠金额
    const lgcId = that.data.lgcId;//外部物id
    const freight = that.data.freight;//外部物流费
    const courierfee = that.data.courierfee;//快递费
    for (let i = 0; i < coupon_selected.length; i++) {
      discount = parseFloat(discount) + parseFloat(coupon_selected[i].reduceMoney);
    }
    discount = discount.toFixed(2);
    lumpsum_Discount = parseFloat(lumpsum2) - parseFloat(discount) - parseFloat(prodvou_money) - parseFloat(moneyvou_money);
    if(lumpsum_Discount <= 0) {
      lumpsum_Discount = 0.00;
    }
    lumpsum_Discount = parseFloat(lumpsum_Discount) + parseFloat(courierfee);
    
    if(lumpsum_Discount < 0) {
      lumpsum_Discount = 0.00;
    }
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
    let checkbox_listh_4 = JSON.stringify(that.data.deliverylist4);//自提商品
    checkbox_listh_4 = JSON.parse(checkbox_listh_4);
    let checkbox_listh_5 = JSON.stringify(that.data.deliverylist5);//卡券商品
    checkbox_listh_5 = JSON.parse(checkbox_listh_5);

    if (checkbox_listh_1.length > 0) {//现场配送商品
      for (let i = 0; i < checkbox_listh_1.length; i++) {
        let datainfo = {};
        datainfo.funcId = checkbox_listh_1[i].funcId;
        datainfo.funcProdId = checkbox_listh_1[i].funcProdId;
        datainfo.funcProdSpecId = checkbox_listh_1[i].funcProdSpecId;
        datainfo.hotelProdId = checkbox_listh_1[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_1[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_1[i].prodnum;
        if(checkbox_listh_1[i].discountPrice != '') {
          datainfo.prodPrice = checkbox_listh_1[i].discountPrice;
        } else {
          datainfo.prodPrice = checkbox_listh_1[i].prodRetailPrice;
        }
        datainfo.totalAmount = checkbox_listh_1[i].totalprice;
        finclist.push(datainfo);
      }
    }
    if (checkbox_listh_2.length > 0) {//快递配送商品
      for (let i = 0; i < checkbox_listh_2.length; i++) {
        let datainfo = {};
        datainfo.funcId = checkbox_listh_2[i].funcId;
        datainfo.funcProdId = checkbox_listh_2[i].funcProdId;
        datainfo.funcProdSpecId = checkbox_listh_2[i].funcProdSpecId;
        datainfo.hotelProdId = checkbox_listh_2[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_2[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_2[i].prodnum;
        if(checkbox_listh_2[i].discountPrice != '') {
          datainfo.prodPrice = checkbox_listh_2[i].discountPrice;
        } else {
          datainfo.prodPrice = checkbox_listh_2[i].prodRetailPrice;
        }
        datainfo.totalAmount = checkbox_listh_2[i].totalprice;
        finclist.push(datainfo);
      }
    }
    if (checkbox_listh_3.length > 0) {//迷你吧商品
      for (let i = 0; i < checkbox_listh_3.length; i++) {
        let datainfo = {};
        datainfo.hotelProdId = checkbox_listh_3[i].hotelProdId;
        datainfo.funcProdSpecId = 0;
        datainfo.prodOwnerOrgId = checkbox_listh_3[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_3[i].prodnum;
        if(checkbox_listh_3[i].discountPrice != '') {
          datainfo.prodPrice = checkbox_listh_3[i].discountPrice;
        } else {
          datainfo.prodPrice = checkbox_listh_3[i].prodRetailPrice;
        }
        datainfo.totalAmount = checkbox_listh_3[i].totalprice;
        minlist.push(datainfo);
      }
    }
    if (checkbox_listh_4.length > 0) {//自提商品
      for (let i = 0; i < checkbox_listh_4.length; i++) {
        let datainfo = {};
        datainfo.funcId = checkbox_listh_4[i].funcId;
        datainfo.funcProdId = checkbox_listh_4[i].funcProdId;
        datainfo.funcProdSpecId = checkbox_listh_4[i].funcProdSpecId;
        datainfo.hotelProdId = checkbox_listh_4[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_4[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_4[i].prodnum;
        if(checkbox_listh_4[i].discountPrice != '') {
          datainfo.prodPrice = checkbox_listh_4[i].discountPrice;
        } else {
          datainfo.prodPrice = checkbox_listh_4[i].prodRetailPrice;
        }
        datainfo.totalAmount = checkbox_listh_4[i].totalprice;
        finclist.push(datainfo);
      }
    }
    if (checkbox_listh_5.length > 0) {//卡券商品
      for (let i = 0; i < checkbox_listh_5.length; i++) {
        let datainfo = {};
        datainfo.funcId = checkbox_listh_5[i].funcId;
        datainfo.funcProdId = checkbox_listh_5[i].funcProdId;
        datainfo.funcProdSpecId = 0;
        datainfo.hotelProdId = checkbox_listh_5[i].hotelProdId;
        datainfo.prodOwnerOrgId = checkbox_listh_5[i].prodOwnerOrgId;
        datainfo.prodCount = checkbox_listh_5[i].prodnum;
        if(checkbox_listh_5[i].discountPrice != '') {
          datainfo.prodPrice = checkbox_listh_5[i].discountPrice;
        } else {
          datainfo.prodPrice = checkbox_listh_5[i].prodRetailPrice;
        }
        datainfo.totalAmount = checkbox_listh_5[i].totalprice;
        finclist.push(datainfo);
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
        let red_code = -1;
        if(resdatas.redPacketDTO) {
          red_code = resdatas.redPacketDTO.shareCode
          var redData = JSON.stringify(resdatas.redPacketDTO)
        }
        if (resdatas.result == 'SUCCESS') {
          wx.reLaunch({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + orderid + '&ishasmnb=' + delayPayFlag + '&redcode=' + red_code + '&redData=' + redData
          });
        } else {
          wx.reLaunch({
            url: '../my/my?type=' + 1
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
      wx.hideLoading();
      console.log(err)
    });
  },
  backfun: function(){
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      });
    },2000)
  },
  post_prodvou: function () {//获取用户在酒店可用商品抵扣券
    const that = this;
    const prodvou_select = that.data.prodvou_select;
    let prodvou_name = '未选择免费领用券';
    let prodvou_money = 0.00;
    const list_data = that.getdata();
    const minlist = list_data.minlist;
    const finclist = list_data.finclist;
    let prod_list = minlist.concat(finclist);
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodList: prod_list
    };
    wxrequest.postprodvou(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        for(let i=0;i<resdatas.length;i++){
          resdatas[i].seletype = false;
          for(let j=0;j<prodvou_select.length;j++){
            if(resdatas[i].id == prodvou_select[j]){
              resdatas[i].seletype = true;
              prodvou_name = resdatas[i].vouName + '...';
              prodvou_money = parseFloat(prodvou_money) + resdatas[i].prodPrice
            }
          }
        }
        prodvou_money = prodvou_money.toFixed(2);
        that.setData({
          prodvou: resdatas,
          prodvou_name: prodvou_name,
          prodvou_money: prodvou_money
        });
        const list_data = that.getdata();
        const minlist = list_data.minlist;
        const finclist = list_data.finclist;
        let prod_list = minlist.concat(finclist);
        that.post_prodlist(prod_list);
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
  post_prodlist: function (listdata) {//筛选出未使用卡券的商品
    const that = this;
    let linkData = {
      cusId: app.globalData.userId,
      hotelId: app.globalData.hotelId,
      vouIds: that.data.prodvou_select,
      prodList: listdata
    };
    wxrequest.postprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          selelist: resdatas
        });
        that.getcouponlist(1);
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
  get_moneyvou: function () {//获取用户在酒店可用现金抵扣卡券
    const that = this;
    let selected_id = [];//已选优惠券id
    const coupon_selectids = that.data.coupon_selected;
    if (coupon_selectids.length != 0) {
      for (let i = 0; i < coupon_selectids.length; i++) {
        selected_id.push(coupon_selectids[i].id);
      }
    }
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodList: that.data.selelist,
      couponIds: selected_id//优惠券id_list
    };
    wxrequest.getmoneyvou(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let moneyvou_select = '';
        if(that.data.moneyvou_select.length > 0){
          moneyvou_select = that.data.moneyvou_select[0];
        }
        let moneyvou_money = 0.00;
        let moneyvou_name = '未选择现金抵扣券';
        for(let i=0;i<resdatas.length;i++){
          resdatas[i].seletype = false;
          if(resdatas[i].id == moneyvou_select){
            resdatas[i].seletype = true;
            moneyvou_money = resdatas[i].vouDeductibleMoney;
            moneyvou_name = resdatas[i].vouName;
          }
        }
        moneyvou_money = moneyvou_money.toFixed(2);
        that.setData({
          moneyvou: resdatas,
          moneyvou_money: moneyvou_money,
          moneyvou_name: moneyvou_name
        });
        that.calculation();
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
  changeprodvou: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    let prodvou_list = that.data.prodvou;
    let money = 0.00;
    let prodvou_name = '未选择免费领用券';
    prodvou_list[edata.index].seletype = !prodvou_list[edata.index].seletype;
    let list = [];
    let indexnum = -1;
    for(let i=0;i<prodvou_list.length;i++){
      if(prodvou_list[i].seletype){
        list.push(prodvou_list[i].id);
        money += parseFloat(prodvou_list[i].prodPrice);
        indexnum = i;
      }
    }
    if(indexnum >= 0) {
      prodvou_name = prodvou_list[indexnum].vouName + '...';
    }
    money = money.toFixed(2);
    that.setData({
      prodvou: prodvou_list,
      prodvou_select: list,
      prodvou_money: money,
      prodvou_name: prodvou_name,
      moneyvou_select: [],
      coupontype: true
    });
  },
  changemoneyvou: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    let moneyvou_list = that.data.moneyvou;
    let moneyvou_name = '未选择免费领用券';
    let money = 0.00;
    let moneyvou_select = [];
    if(moneyvou_list[edata.index].seletype){
      moneyvou_name = '未选择免费领用券';
      moneyvou_list[edata.index].seletype = false;
    } else {
      for(let i=0;i<moneyvou_list.length;i++){
        moneyvou_list[i].seletype = false;
      }
      moneyvou_list[edata.index].seletype = true;
      moneyvou_name = moneyvou_list[edata.index].vouName;
      money = edata.money.toFixed(2);
      moneyvou_select.push(edata.vouid);
    }
    that.setData({
      moneyvou: moneyvou_list,
      moneyvou_select: moneyvou_select,
      moneyvou_money: money,
      moneyvou_name: moneyvou_name
    });
  },
  prodvoutoggle: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    that.setData({
      coupontype2: !this.data.coupontype2,
      prodvou_type: !that.data.prodvou_type
    });
    if(edata.type == 1) {
      that.setData({
        coupon_selected: []
      });
      const list_data = that.getdata();
      const minlist = list_data.minlist;
      const finclist = list_data.finclist;
      let prod_list = minlist.concat(finclist);
      that.post_prodlist(prod_list);
    }
  },
  moneyvoutoggle: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    that.setData({
      coupontype2: !this.data.coupontype2,
      moneyvou_type: !that.data.moneyvou_type
    });
    if(edata.type == 1) {
      that.calculation();
    }
  },
  roomcodetoggle: function () {
    this.setData({
      roomCodetype: !this.data.roomCodetype
    })
  },
  changeroomcode: function (e) {
    this.setData({
      roomCodeN: e.detail.value
    })
  },
  changeroomcodefun: function () {
    const that = this;
    const roomCodeN = that.data.roomCodeN;
    if(roomCodeN == '') {
      wx.showToast({
        title: '请填写房间号',
        icon: 'none',
        duration: 2000
      })
    } else {
      that.setData({
        roomCode: roomCodeN
      });
      that.roomcodetoggle();
      wx.setStorage({
        key: 'roomCode',
        data: roomCodeN
      });
    }
  },
  get_logisticslist: function (funids) {//获取外部物流
    const that = this;
    let funcids_list = funids.toString();
    let postData = {
      funcIds : funcids_list
    }
    wxrequest.getlogisticslist(postData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let wldata = {id: -1, lgcName: '商家配送'};
        resdatas.push(wldata);
        that.setData({
          wblogistics: resdatas
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
  bindPickerChangewb: function (e) {//选择外部物流
    const that = this;
    that.setData({
      lgcIdindex: e.detail.value,
      lgcId: that.data.wblogistics[e.detail.value].lgcId,
      lgcHotelId: that.data.wblogistics[e.detail.value].id
    });
    if(that.data.wblogistics[e.detail.value].id != -1) {
      that.get_freight(that.data.wblogistics[e.detail.value].lgcId);
    } else {
      that.setData({
        freight: 0.00
      });
    }
  },
  get_freight: function (id) {
    const that = this;
    if(that.data.lgcHotelId == -1) {
      return false;
    }
    const receiptlist = that.data.receiptlist;
    let linkData = {
      recLat: parseFloat(receiptlist.latitude),
      recLong: parseFloat(receiptlist.longitude),
      shopLat: parseFloat(app.globalData.hotelLatitude),
      shopLong: parseFloat(app.globalData.hotelLongitude),
      // hotelId: app.globalData.hotelId,
      // lgcId: id,
      lgcHotelId: that.data.lgcHotelId
    };
    wxrequest.postfreight(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          freight: resdatas
        });
        that.calculation(that.data.coupon_selected);
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
  rulefun: function (e) {//获取半价活动规则
    const id = e.currentTarget.dataset.ruleid;
    wxrequest.getrulefun(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.showModal({
          title: '活动规则',
          content: resdatas,
          showCancel: false,
          confirmText: '我知道了',
          success (res) {}
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
  getRules(){
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    let params = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.getRedpackRules(params).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if(resdata.code == 0){
        this.setData({
          ifshowRules: true,
          ruleData: resdatas
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  closeRule(){
    this.setData({
      ifshowRules: false
    })
  },
})