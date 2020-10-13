const app = getApp();
import wxrequest from '../../request/api'
var QR = require("../../utils/qrcode.js");
Page({
  data: {
    domiciledata: '',
    funcName: '',
    fooddatalist: [],
    fooddatalist2: [], 
    foodtotalmoney: 0.00,
    foodtotalmoney2: 0.00,
    coupon_selected: [],//已选优惠券
    coupon_optional: [],//可选优惠券
    discount: 0.00,
    prodvou: [],//商品抵扣券
    prodvou_select: [],//已选商品抵扣券
    prodvou_money: 0.00,//现金抵扣金额
    prodvou_name: '未选择免费领用券',
    prodvou_type: false,
    moneyvou: [],//现金抵扣券
    moneyvou_select: [],//已选现金抵扣券
    moneyvou_money: 0.00,//现金抵扣金额
    moneyvou_name: '未选择现金抵扣券',
    moneyvou_type: false,
    coupontype: false,//是否显示优惠券
    coupontype2: false,//是否显示优惠券列表
    imagePath: '',
    paytypeval: 1
  },
  onLoad: function (options) {
    const that = this;
    let size = that.setCanvasSize(); //动态设置画布大小 
    let urllink = app.globalData.QRurllink + app.globalData.cabCode + '&funcid=' + options.funcid + '&ispaymentcode=true';
    console.log(urllink);
    that.createQrCode(urllink, "mycanvas", size.w, size.h); 
    that.get_domiciledata(options.funcid);
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  get_domiciledata: function (funcid) {
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    const linkData = {
      funcId: funcid,
      cabId: app.globalData.cabId
    }
    wxrequest.getunpaidOrders(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          domiciledata: resdatas,
          funcName: resdatas.orderDetailDTOList[0].funcName
        });
        let orderDetailDTOList = resdatas.orderDetailDTOList;
        for(let i=0;i<orderDetailDTOList.length;i++) {
          orderDetailDTOList[i].selecttype = true;
          orderDetailDTOList[i].prodnum = orderDetailDTOList[i].prodCount;
          orderDetailDTOList[i].prodRetailPrice = orderDetailDTOList[i].prodPrice;
          orderDetailDTOList[i].totalprice = orderDetailDTOList[i].totalAmount;
          orderDetailDTOList[i].prodOwnerOrgId = orderDetailDTOList[i].prodHotelProductDTO.prodOwnerOrgId;
          orderDetailDTOList[i].prodOwnerOrgKind = orderDetailDTOList[i].prodHotelProductDTO.prodOwnerOrgKind;
        }
        that.put_shoppingCart(orderDetailDTOList);
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
  put_shoppingCart: function (fooddatalist) {
    const that = this;
    let carlist = JSON.stringify(fooddatalist);
    const linkData = {
      shoppingCartProd: carlist
    }
    wxrequest.putshoppingCart(app.globalData.hotelId, linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let carlistdata = JSON.parse(resdatas);
        let foodtotal_money = 0.00;
        let foodtotal_num = 0;
        for(let i=0;i<carlistdata.length;i++){
          carlistdata[i].totalAmount = carlistdata[i].totalprice;
          foodtotal_money = parseFloat(foodtotal_money) + parseFloat(carlistdata[i].totalprice);
          foodtotal_num = parseInt(foodtotal_num) + parseInt(carlistdata[i].prodnum);
        }
        foodtotal_money = foodtotal_money.toFixed(2);
        that.setData({
          fooddatalist: carlistdata,
          foodtotalmoney: foodtotal_money,
          foodtotalnum: foodtotal_num
        });
        wx.hideLoading();
        that.post_prodvou();
      } else {
        wx.hideLoading();
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
  post_prodvou: function () {//获取用户在酒店可用商品抵扣券
    const that = this;
    const list_data = that.getdata();
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodList: list_data.finclist
    };
    wxrequest.postprodvou(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        for(let i=0;i<resdatas.length;i++){
          resdatas[i].seletype = false
        }
        that.setData({
          prodvou: resdatas
        });
        that.post_prodlist(list_data.finclist);
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
    wx.showLoading({
      title: '加载中',
    });
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
          fooddatalist2: resdatas
        });
        wx.hideLoading();
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
  getcouponlist: function (type) {//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let coupon_selected = JSON.stringify(that.data.coupon_selected);//已选优惠券
    coupon_selected = JSON.parse(coupon_selected);
    const datajson = that.getdata();
    const selected_id = datajson.selected_id;
    const vouIds_list = that.data.prodvou_select;
    let linkData = {
      prodList: that.data.fooddatalist2,
      couponIds: selected_id,//已选优惠券id
      vouIds: vouIds_list,//已选商品抵扣券id
      cusId: app.globalData.userId,
      hotelId: app.globalData.hotelId
    };
    wxrequest.getcancouponlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let listdata_selected = coupon_selected;//已选
        let listdata_optional = [];//可选
        let coupontype = true;
        if (coupon_selected.length == 0 && type == 1 && resdatas.length > 0) {//如果没有已选，则取第一个可选优惠券为已选优惠券
          listdata_selected.push(resdatas[0]);
          listdata_optional = resdatas.slice(1);
        } else {
          listdata_optional = resdatas;
        }
        if (coupon_selected.length == 0 && resdatas.length == 0) {
          coupontype = false;
        }
        that.setData({
          coupontype: coupontype,
          coupon_optional: listdata_optional,
          coupon_selected: listdata_selected
        });
        if (coupon_selected.length == 0 && type == 1) {//如果没有已选，则取第一个可选优惠券为已选优惠券
          setTimeout(function(){
            that.getcouponlist();
          },500);
        }
        that.get_moneyvou(listdata_selected);
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
  get_moneyvou: function (listdata) {//获取用户在酒店可用现金抵扣卡券
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodList: that.data.fooddatalist2,
      couponIds: that.data.selected_id//优惠券id_list
    };
    wxrequest.getmoneyvou(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        for(let i=0;i<resdatas.length;i++){
          resdatas[i].seletype = false
        }
        that.setData({
          moneyvou: resdatas,
          moneyvou_select: [],
          moneyvou_name: '未选择现金抵扣券',
          moneyvou_money: 0.00
        });
        wx.hideLoading();
        that.calculation(listdata);
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
    const that = this;
    if (!that.data.coupontype2) {
      that.getcouponlist(1);
    } else {
      that.calculation(that.data.coupon_selected);
    }
    that.setData({
      coupontype2: !that.data.coupontype2
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
      if(coupon_optional[edata.index].couponLimit == 0){
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
  checkcoupon: function () {//校验已选优惠券是否可用
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    const hotelid = that.data.hotelid;
    const userid = that.data.userid;
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    const datajson = that.getdata();
    const finclist = datajson.finclist;
    const selected_id = datajson.selected_id;
    let prodList = finclist;
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
            that.setData({
              coupon_selected: []
            });
            that.getcouponlist(1);
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
          that.setData({
            coupon_selected: []
          });
          that.getcouponlist();
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
  calculation: function (listdata) {//计算优惠后金额
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let fooddata_list = JSON.stringify(that.data.fooddatalist);
    fooddata_list = JSON.parse(fooddata_list);
    const lumpsum = parseFloat(that.data.foodtotalmoney);//商品总额
    const prodvou_money = parseFloat(that.data.prodvou_money);//商品抵扣金额
    const moneyvou_money = parseFloat(that.data.moneyvou_money);//现金抵扣金额
    let lumpsum_Discount = 0.00;//商品优惠后总额
    const coupon_selected = listdata;//已选优惠券
    let discount = 0.00;//优惠金额
    for (let i = 0; i<coupon_selected.length; i++) {
      discount = parseFloat(discount) + parseFloat(coupon_selected[i].reduceMoney);
      discount = discount.toFixed(2);
    }
    lumpsum_Discount = parseFloat(lumpsum) - parseFloat(prodvou_money) - parseFloat(discount) - parseFloat(moneyvou_money);
    if(lumpsum_Discount <= 0) {
      lumpsum_Discount = 0.00;
    }
    if(lumpsum_Discount <= 0) {
      lumpsum_Discount = 0.00;
    }
    lumpsum_Discount = lumpsum_Discount.toFixed(2);
    that.setData({
      foodtotalmoney2: lumpsum_Discount,
      discount: discount
    });
    wx.hideLoading();
  },
  prodvoutoggle: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    that.setData({
      prodvou_type: !that.data.prodvou_type
    });
    if(edata.type == 1) {
      that.setData({
        coupon_selected: []
      });
      const listdata = that.getdata(); 
      that.post_prodlist(listdata.finclist);
    }
  },
  moneyvoutoggle: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    that.setData({
      moneyvou_type: !that.data.moneyvou_type
    });
    if(edata.type == 1) {
      that.calculation(that.data.coupon_selected);
    }
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
      prodvou_name: prodvou_name
    });
  },
  changemoneyvou: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    let moneyvou_list = that.data.moneyvou;
    let moneyvou_name = '未选择现金抵扣券';
    let money = 0.00;
    let moneyvou_select = [];
    if(moneyvou_list[edata.index].seletype){
      moneyvou_name = '未选择现金抵扣券';
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
  getdata() {//获取finclist
    const that = this;
    let datajson = {};
    let finclist = [];//功能区商品id+商品总价
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let selected_id = [];//已选优惠券id
    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }
    let fooddata_list = JSON.stringify(that.data.fooddatalist);
    fooddata_list = JSON.parse(fooddata_list);
    for (let i = 0; i < fooddata_list.length; i++) {
      let datainfo = {};
      datainfo.funcId = fooddata_list[i].funcId;
      datainfo.funcProdId = fooddata_list[i].funcProdId;
      datainfo.hotelProdId = fooddata_list[i].hotelProdId;
      datainfo.prodOwnerOrgId = fooddata_list[i].prodOwnerOrgId;
      datainfo.prodCount = fooddata_list[i].prodnum;
      datainfo.prodCategoryId = fooddata_list[i].categoryId;
      if(fooddata_list[i].discountPrice != '') {
        datainfo.prodPrice = fooddata_list[i].discountPrice;
      } else {
        datainfo.prodPrice = fooddata_list[i].prodRetailPrice;
      }
      datainfo.totalAmount = fooddata_list[i].totalprice;
      datainfo.funcProdSpecId = fooddata_list[i].funcProdSpecId;
      finclist.push(datainfo);
    }
    datajson.finclist = finclist;
    datajson.selected_id = selected_id;
    return datajson;
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
  setCanvasSize: function() {//适配不同屏幕大小的canvas
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽 686是因为样式wxss文件中设置的大小
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function(url, canvasId, cavW, cavH) {//调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      this.canvasToTempImage();
    }, 1000);
  },
  canvasToTempImage: function() {//获取临时缓存照片路径，存入data中
    var that = this;
    wx.canvasToTempFilePath({//把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
      canvasId: 'mycanvas',
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        that.setData({
          imagePath: tempFilePath,
        });
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  previewImg: function (e) {//点击图片进行预览
    var img = this.data.imagePath;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    });
  },
  gopayfun: function () {
    wx.showLoading({
      title: '支付中',
    });
    const that = this;
    const couponAmountval = parseFloat(that.data.discount).toFixed(2);
    const vouDeductAmountval = parseFloat(that.data.prodvou_money).toFixed(2);
    const cashDeductAmountval = parseFloat(that.data.moneyvou_money).toFixed(2);
    const coupon_list = that.data.coupon_selected;
    let selected_id = [];//已选优惠券id
    if (coupon_list.length > 0) {
      for (let i = 0; i < coupon_list.length; i++) {
        selected_id.push(coupon_list[i].id);
      }
    }
    let prodVouIds_data = [];
    if(that.data.prodvou_select.length > 0) {
      prodVouIds_data = that.data.prodvou_select;
    }
    that.setData({
      paytypeval: 0
    });
    let linkData = {
      orderDetailDTOList: that.data.fooddatalist,//订单商品信息
      id: that.data.domiciledata.id,
      customerId: app.globalData.userId,//顾客id
      totalAmount: that.data.foodtotalmoney2,//商品总价 
      couponAmount: couponAmountval,//优惠金额
      vouDeductAmount: vouDeductAmountval,//商品抵扣金额
      cashDeductAmount: cashDeductAmountval,//现金抵扣金额
      couponIds: selected_id,//已选优惠券
      prodVouIds: prodVouIds_data,//已选商品抵扣券id(数组)
      moneyVouIds: that.data.moneyvou_select//已选现金抵扣券id
    };
    wxrequest.postunpaidOrders(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.isclearfooddata = 1;
        if(resdatas.isNeedPay == 1) {
          that.orderpayfun(resdatas);
        } else {
          wx.hideLoading();
          that.setData({
            paytypeval: 0
          });
          wx.reLaunch({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + that.data.domiciledata.id + '&ishasmnb=1' + '&redcode=-1'
          })
        }
      } else {
        wx.hideLoading();
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
        that.setData({
          paytypeval: 1
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  orderpayfun: function (paydata) {//支付请求
    const that = this;
    wx.requestPayment({
      appId: paydata.appId,
      timeStamp: paydata.timeStamp,
      nonceStr: paydata.nonceStr,
      package: paydata.package,
      signType: 'MD5',
      paySign: paydata.paySign,
      success: function (res) {
        if (res.errMsg === "requestPayment:ok") {
          that.confirmfun(paydata.orderCode);
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '支付失败，请重新支付',
          icon: 'none',
          duration: 2000
        });
        that.setData({
          paytypeval: 1
        });
      }
    })
  },
  confirmfun: function (code){//确认支付状态
    const that = this;
    let linkData = {
      orderCode: code
    };
    wxrequest.confirmstatus2(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let red_code = -1;
        if(resdatas.redPacketDTO) {
          red_code = resdatas.redPacketDTO.shareCode;
          var redData = JSON.stringify(resdatas.redPacketDTO);
        }
        if (resdatas.result == 'SUCCESS') {
          wx.hideLoading();
          that.setData({
            paytypeval: 1
          });
          wx.reLaunch({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + that.data.domiciledata.id + '&ishasmnb=1' + '&redcode=' + red_code + '&redData=' + redData
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '支付失败，请重新支付',
            icon: 'none',
            duration: 2000
          });
          that.setData({
            paytypeval: 1
          });
        }
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        that.setData({
          paytypeval: 1
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  }
})