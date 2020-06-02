const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
var edata;
Page({
  data: {
    canbuy: 0,
    cabCode: '',
    img: '',
    themecolor: '',
    bannerImageList: [],
    imgheights: [],
    current: 0,
    descImageList: [],
    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 500,
    prodRetailPrice: '',
    prodMarketPrice: '',
    prodShowName: '',
    prodId: '',
    isFree: '',
    roomCode: '',
    //房间号
    roomFloor: '',
    //楼层
    latticeCode: '',
    //格子编号
    latticeId: '',
    hotelId: '',
    prodCode: '',
    isEmpty: '',
    isClock: '',
    //是否锁定
    cabId: '',
    userid: '',
    evaluatelist: '',
    //评价信息
    total: '',
    //评价总条数
    hotelprodid: '',
    //酒店商品id
    prodinfo: '',
    //商品全部信息
    buybtntype: 1,
    funcProdId: '',
    prodamt: '',
    prodnumtype: '',
    jointype: -1,
    //是否已加入购物车
    money: 0.00,
    //购物车金额
    buylist: [],
    //购物车数据
    ptype: '',
    //1-迷你吧，2-便利店
    coupontype: false,
    //是否显示优惠券列表
    couponlist: [],
    //优惠券列表
    shareuser: '',
    //分享人信息
    minibar: '',
    //迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    convenienceStore: '',
    //便利店支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',
    //酒店配送支持功能（1：展示，2：展示+下单）
    roomService: '',
    //客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    spotpurchaseflag: ''
  },
  onLoad: function (options) {
    const that = this;
    wx2my.getStorage({
      key: 'minibar',

      success(res) {
        that.setData({
          minibar: res.data
        });
        wx2my.getStorage({
          key: 'convenienceStore',

          success(res2) {
            that.setData({
              convenienceStore: res2.data
            });
            let minibarv = res.data;
            let bldv = res2.data;
            let ptype = options.ptype;
            let can_buy;

            if (ptype == 1 && minibarv == 2) {
              can_buy = 1;
            } else if (ptype == 1 && bldv == 2) {
              can_buy = 1;
            } else if (ptype == 2 && bldv == 2) {
              can_buy = 1;
            } else {
              can_buy = 0;
            }

            that.setData({
              canbuy: can_buy
            });
          }

        });
      }

    });
    wx2my.getStorage({
      key: 'roomDelivery',

      success(res) {
        that.setData({
          roomDelivery: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'roomService',

      success(res) {
        that.setData({
          roomService: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'themecolor',

      success(res) {
        that.setData({
          themecolor: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'roomCode',

      success(res) {
        that.setData({
          roomCode: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'roomFloor',

      success(res) {
        that.setData({
          roomFloor: res.data
        });
      }

    });
    let funcProdId = options.funcprodid;
    let latticeId = options.latticeid;

    if (options.funcprodid == 0) {
      funcProdId = '';
    }

    if (options.latticeid == "undefined") {
      latticeId = '';
    }

    that.setData({
      cabCode: app.globalData.cabCode,
      hotelId: app.globalData.hotelId,
      cabId: app.globalData.cabId,
      userid: app.globalData.userId,
      shareuser: app.globalData.shareUser,
      prodCode: options.prodcode,
      latticeCode: options.latticecode,
      hotelprodid: options.hotelprodid,
      img: options.img,
      ptype: options.ptype,
      isEmpty: options.isempty,
      funcProdId: funcProdId,
      latticeId: latticeId,
      prodamt: options.prodamt,
      prodnumtype: options.prodnumtype,
      spotpurchaseflag: app.globalData.spotpurchaseflag
    });
    that.get_evaluation(options.prodcode);
    that.get_pordinfo(funcProdId, latticeId); //获取商品详情
  },
  onShow: function () {
    const that = this;
    wx2my.getStorage({
      key: 'buylist',

      success(res) {
        let jointype = -1;

        if (res.data.length != 0) {
          if (that.data.ptype == 1) {
            jointype = that.getlistindex(res.data, that.data.latticeCode, that.data.ptype);
          } else {
            jointype = that.getlistindex(res.data, that.data.prodCode, that.data.ptype);
          }
        } else {
          jointype = -1;
        }

        that.setData({
          buylist: res.data,
          jointype: jointype
        });
      },

      fail: function () {
        that.setData({
          buylist: []
        });
      }
    });
    wx2my.getStorage({
      key: 'money',

      success(res) {
        that.setData({
          money: res.data
        });
      },

      fail: function () {
        that.setData({
          money: 0.00
        });
      }
    });
  },
  get_evaluation: function (prodcode) {
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      pageSize: 1,
      prodCode: prodcode
    };
    wxrequest.getevaluation(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          evaluatelist: res.data.data.records,
          total: res.data.data.total
        });
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      console.log(err);
    });
  },
  get_pordinfo: function (funcProdId, latticeId) {
    //获取商品信息
    const that = this;
    let linkData = {
      funcProdId: funcProdId,
      latticeId: latticeId
    };
    wxrequest.getpordinfo(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let prodRetailPrice = resdatas.prodRetailPrice;

        if (latticeId) {
          prodRetailPrice = resdatas.latticeProdAmt;
        }

        that.setData({
          bannerImageList: resdatas.bannerImageList,
          descImageList: resdatas.descImageList,
          prodRetailPrice: prodRetailPrice,
          prodMarketPrice: resdatas.prodMarketPrice,
          prodShowName: resdatas.prodShowName,
          isFree: resdatas.isFree,
          isClock: resdatas.isClock,
          prodinfo: resdatas
        });
        that.getcouponlist(resdatas); //获取优惠券列表
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      console.log(err);
    });
  },
  imageLoad: function (e) {
    var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
    ratio = imgwidth / imgheight; //计算的高度值  

    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights; //把每一张图片的对应的高度记录到数组里  

    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    });
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    });
  },
  evaluatefun: function () {
    //查看全部评论
    wx2my.navigateTo({
      url: '../evaluate/evaluate?prodcode=' + this.data.prodCode
    });
  },
  isLanding: function () {
    //判断是否授权登陆
    const that = this;
    that.dialog = that.selectComponent("#dialog");
    wx2my.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          that.purchase(app.globalData.userId);
        } else {
          that.dialog.showDialog();
        }
      }

    });
  },
  redirectfun: function (e) {
    //监听组件传回的userid
    const that = this;
    that.purchase(e.detail.userid);
  },
  shopcarfun: function () {
    //去购物车
    wx2my.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    });
  },
  joincarfun: function () {
    //商品数量增加校验
    const that = this;
    wx2my.showLoading({
      title: '加载中',
      mask: true
    });
    setTimeout(function () {
      wx2my.hideLoading();
      const hotelId = app.globalData.hotelId;
      let cabCode = app.globalData.cabCode;
      let prodinfo = that.data.prodinfo;
      const ptype = that.data.ptype;
      let prod_amt = parseInt(that.data.prodamt) + 1;

      if (prodinfo.isClock == 1) {
        //柜子已锁定：1是锁定，0是未锁定
        wx2my.showToast({
          title: '此商品已锁定暂不支持购买，请选择其它商品',
          icon: 'none',
          duration: 2000
        });
        return;
      } else {
        if (ptype == 1) {
          console.log('1');

          if (prodinfo.isEmpty == 1) {
            console.log('2');
            wx2my.setStorageSync("plustype", 0);
            that.testadd(cabCode, hotelId, prodinfo.hotelProdId, prod_amt);
            setTimeout(function () {
              if (wx2my.getStorageSync('plustype') == 0) {
                that.setData({
                  jointype: -2
                });
                return false;
              } else {
                console.log('3');
                that.plusfun2();
              }
            }, 300);
          } else if (that.data.prodnumtype == true) {
            wx2my.setStorageSync("plustype", 0);
            that.testadd(cabCode, hotelId, prodinfo.hotelProdId, prod_amt);
            setTimeout(function () {
              if (wx2my.getStorageSync('plustype') == 0) {
                that.setData({
                  jointype: -2
                });
                return false;
              } else {
                that.plusfun2();
              }
            }, 300);
          } else {
            that.setData({
              prodnumtype: true
            });
            that.plusfun2();
          }
        } else if (ptype == 2) {
          cabCode = '';
          wx2my.setStorageSync("plustype", 0);
          that.testadd(cabCode, hotelId, prodinfo.hotelProdId, prod_amt);
          setTimeout(function () {
            if (wx2my.getStorageSync('plustype') == 0) {
              that.setData({
                jointype: -2
              });
              return false;
            } else {
              that.plusfun2();
            }
          }, 300);
        }
      }
    }, 400);
  },
  plusfun2: function (e) {
    //商品数量增加
    const that = this;
    let cabCode = app.globalData.cabCode;
    let buy_list_data = that.data.buylist;
    let buy_list = JSON.stringify(buy_list_data);
    buy_list = JSON.parse(buy_list);
    let money = that.data.money;
    money = parseFloat(money);
    const ptype = that.data.ptype;
    let prodinfo = that.data.prodinfo;

    if (ptype == 1) {
      if (prodinfo.isFree == 1) {
        money = money + 0;
      } else {
        money = money + prodinfo.latticeProdAmt;
      }
    } else {
      money = money + prodinfo.prodRetailPrice;
    }

    let index1 = -1;

    if (ptype == 1) {
      //迷你吧商品
      index1 = that.getlistindex(buy_list, prodinfo.latticeCode, 1);

      if (index1 == -1 && prodinfo.isEmpty != 1) {
        prodinfo.prodtype = 1;
        prodinfo.prodnum = 1;
        buy_list.push(prodinfo);
      } else {
        let index2 = that.getlistindex(buy_list, prodinfo.prodCode, 2);

        if (index2 == -1) {
          prodinfo.prodtype = 2;
          prodinfo.prodnum = 1;
          buy_list.push(prodinfo);
        } else {
          if (buy_list[index2].prodtype == 2) {
            buy_list[index2].prodnum = buy_list[index2].prodnum + 1;
          }
        }
      }
    } else {
      //便利店商品
      index1 = that.getlistindex(buy_list, prodinfo.prodCode, 2);

      if (index1 == -1) {
        prodinfo.prodtype = 2;
        prodinfo.prodnum = 1;
        buy_list.push(prodinfo);
      } else {
        buy_list[index1].prodnum = buy_list[index1].prodnum + 1;
      }
    }

    money = money.toFixed(2);
    that.setData({
      buylist: buy_list,
      money: money
    });
    wx2my.setStorage({
      key: 'money',
      data: money
    });
    wx2my.setStorage({
      key: 'buylist',
      data: buy_list
    });
    wx2my.showToast({
      title: '已成功加入购物车',
      icon: 'success',
      duration: 2000
    });
  },
  getlistindex: function (list, val, ptype) {
    //获取购物车中是否存在该商品
    let type = true;
    let indexnum = -2;

    if (list.length != 0) {
      for (let i = 0; i < list.length; i++) {
        if (type) {
          if (ptype == 1) {
            //迷你吧商品下标
            if (list[i].latticeCode == val) {
              return i;
            } else {
              type = true;
            }
          } else if (ptype == 2) {
            //便利店商品下标
            if (list[i].prodCode == val && list[i].prodtype == 2) {
              return i;
            } else {
              type = true;
            }
          } else if (ptype == 3) {
            //其他功能区商品下标
            if (list[i].prodCode == val && list[i].prodtype == 3) {
              return i;
            } else {
              type = true;
            }
          }
        }
      }

      if (type && indexnum == -2) {
        return -1;
      }
    } else {
      return -1;
    }
  },
  purchase: function () {
    //立即购买---下单接口
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    const thatdata = this.data;
    const shareuser = that.data.shareuser;
    let shareUserId = '';
    let shareUserType = '';

    if (shareuser != '0' && shareuser != '') {
      shareUserId = shareuser.id;
      shareUserType = shareuser.type;
    }

    const prodinfo = thatdata.prodinfo; //商品详情

    const ptype = thatdata.ptype;
    const userid = thatdata.userid;
    let delayPayFlag = 0;
    let deliveryWay = 1;
    let totalAmount = prodinfo.prodRetailPrice;
    wx2my.setStorageSync("plustype", 1);
    console.log(prodinfo.isEmpty);

    if (prodinfo.latticeId == null || prodinfo.latticeId == 0 || prodinfo.latticeId == '' || prodinfo.isEmpty != 0) {
      that.testadd(thatdata.cabCode, prodinfo.hotelId, prodinfo.hotelProdId, 1);
    }

    setTimeout(function () {
      if (wx2my.getStorageSync('plustype') == 0) {
        wx2my.hideLoading(); //隐藏加载动画

        that.setData({
          jointype: -2,
          buybtntype: 3
        });
        return;
      } else {
        that.setData({
          jointype: -2,
          buybtntype: 2
        });

        if (ptype == 1 && prodinfo.isEmpty == 0) {
          //迷你吧商品
          delayPayFlag = 0;
          deliveryWay = 3;

          if (prodinfo.isFree == 1) {
            totalAmount = 0.00;
          } else {
            totalAmount = prodinfo.latticeProdAmt;
          }
        } else {
          //便利店商品
          delayPayFlag = 1;
          deliveryWay = 1;
        }

        let lisr_order = [];
        let prod_info = {};
        prod_info.prodOwnerOrgId = prodinfo.prodOwnerOrgId;
        prod_info.prodOwnerOrgKind = prodinfo.prodOwnerOrgKind;
        prod_info.hotelId = prodinfo.hotelId;

        if (ptype == 1) {
          prod_info.latticeId = prodinfo.latticeId;
          prod_info.funcId = 1;
          prod_info.funcProdId = 0;
        } else {
          prod_info.latticeId = 0;
          prod_info.funcId = 2;
          prod_info.funcProdId = prodinfo.funcProdId;
        }

        prod_info.hotelProdId = prodinfo.hotelProdId;
        prod_info.prodCode = prodinfo.prodCode;
        prod_info.prodCount = 1;
        prod_info.prodPrice = prodinfo.prodRetailPrice;
        prod_info.totalAmount = totalAmount;
        prod_info.deliveryWay = deliveryWay;
        lisr_order.push(prod_info);
        let linkData = {
          shareCode: app.globalData.sharecode,
          shareUserId: shareUserId,
          //分享者的用户Id,
          shareUserType: shareUserType,
          //分享者的用户类型(1:员工，2：顾客)
          cabId: thatdata.cabId,
          //柜子id
          roomCode: thatdata.roomCode,
          //房间号
          roomFloor: thatdata.roomFloor,
          //房间楼层
          contactName: '',
          //联系人姓名
          contactPhone: '',
          //联系人手机号码
          roomDeliveryRemark: '',
          //客房配送留言
          hotelId: thatdata.hotelId,
          //酒店ID
          customerId: userid,
          //顾客id
          delayPayFlag: delayPayFlag,
          //是否支持待支付(0：否；1：是；有迷你吧商品不支持)
          totalAmount: totalAmount,
          //商品总价
          prodCount: 1,
          //商品总数量
          expressFee: 0,
          //快递费总额
          orderDetailDTOList: lisr_order,
          //订单商品信息
          couponAmount: 0.00,
          //优惠金额
          couponIds: [] //优惠券id_list

        };
        wxrequest.postbuynow(linkData).then(res => {
          let resdata = res.data;
          let resdatas = res.data.data;

          if (resdata.code == 0) {
            if (totalAmount > 0) {
              that.orderpayfun(resdatas.id, resdatas.orderCode, userid, delayPayFlag);
            } else {
              wx2my.reLaunch({
                url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + resdatas.id + '&ishasmnb=' + delayPayFlag + '&redcode=-1'
              });
            }
          } else {
            wx2my.hideToast(); //隐藏加载动画

            let msglist = resdata.msg;

            if (msglist.startsWith('msg')) {
              that.setData({
                buybtntype: 3,
                jointype: -1
              });
              wx2my.showToast({
                title: prodname + '该商品库存不足不可购买',
                icon: 'none',
                duration: 2000
              });
            } else {
              wx2my.showToast({
                title: msglist,
                icon: 'none',
                duration: 2000
              });
            }

            that.setData({
              buybtntype: 1,
              jointype: -1
            });
            return false;
          }
        }).catch(err => {
          wx2my.hideLoading();
          console.log(err);
        });
      }
    }, 300);
  },
  orderpayfun: function (id, order_code, customerId, delayPayFlag) {
    //支付请求
    const that = this;
    const orderid = id;
    console.log(order_code);
    let linkData = {
      appletType: app.globalData.appletType,
      id: orderid,
      customerId: customerId
    };
    wxrequest.postprodpay(linkData).then(res => {
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
            wx2my.hideLoading(); //隐藏加载动画

            if (res.errMsg === "requestPayment:ok") {
              console.log(order_code);
              that.confirmfun(orderid, order_code, delayPayFlag);
            }
          },
          fail: function (res) {
            wx2my.hideLoading(); //隐藏加载动画

            if (delayPayFlag == 0) {
              wx2my.showToast({
                title: '下单失败，请重新下单',
                icon: 'none',
                duration: 2000
              });
              that.setData({
                jointype: -1,
                buybtntype: 1
              });
            } else {
              wx2my.navigateTo({
                url: '../prodOrder/prodOrder?typeindex=3'
              });
            }
          }
        });
      } else {
        wx2my.hideToast(); //隐藏加载动画

        wx2my.showToast({
          title: '订单异常，请重新提交',
          icon: 'none',
          duration: 2000
        });
        that.setData({
          jointype: -1,
          buybtntype: 1
        });
        return;
      }
    }).catch(err => {
      console.log(err);
    });
  },
  testadd: function (cabCode, hotelId, hotelProdId, prodnum) {
    //检验商品是否可以增加数量
    const that = this;
    let linkData = {
      cabCode: cabCode,
      hotelId: hotelId,
      hotelProdId: hotelProdId,
      prodAmt: prodnum
    };
    wxrequest.testprodnum(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        wx2my.setStorageSync("plustype", 1);
      } else {
        wx2my.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        wx2my.setStorageSync("plustype", 0);
      }
    }).catch(err => {
      console.log(err);
    });
  },
  getcouponlist: function (prodinfo) {
    //获取优惠券列表
    const that = this;
    let ptype = that.data.ptype;
    let funcProd_Id = that.data.funcProdId;

    if (ptype == 1) {
      funcProd_Id = 0;
    }

    let linkData = {
      categoryIds: '',
      cusId: that.data.userid,
      drawWay: 2,
      //1：领取中心，2：详情页，3：列表页
      funcId: that.data.ptype,
      funcProdId: funcProd_Id,
      hotelId: that.data.hotelId,
      hotelProdId: prodinfo.hotelProdId,
      sceneCode: ''
    };
    wxrequest.getcouponlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let coupontype = that.data.coupontype;

        if (resdatas.length == 0 && coupontype == true) {
          coupontype = false;
        }

        that.setData({
          couponlist: resdatas,
          coupontype: coupontype
        });
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      console.log(err);
    });
  },
  showcoupon: function () {
    //显示优惠券列表
    this.setData({
      coupontype: !this.data.coupontype
    });
  },
  receive: function (e) {
    //领取优惠券
    const that = this;
    const ptype = that.data.ptype;
    const prodinfo = that.data.prodinfo;
    let funcId = prodinfo.funcId;
    let funcProdId = prodinfo.funcProdId;

    if (ptype == 1) {
      //迷你吧商品
      funcId = '';
      funcProdId = '';
    }

    let linkData = {
      funcId: funcId,
      funcProdId: funcProdId,
      hotelProdId: prodinfo.hotelProdId,
      batchId: e.currentTarget.dataset.id,
      cusId: that.data.userid,
      drawWay: 2,
      //1：领取中心；2：详情页；3：列表页
      getWay: 1
    };
    wxrequest.postcoupon(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        if (resdatas) {
          wx2my.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 2000
          });
          that.getcouponlist(that.data.prodinfo);
        }
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      console.log(err);
    });
  },
  confirmfun: function (orderid, ordercode, delayPayFlag) {
    //确认支付状态
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
          wx2my.reLaunch({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + orderid + '&ishasmnb=' + delayPayFlag + '&redcode=' + resdatas.redCode
          });
        } else {
          if (delayPayFlag == 0) {
            wx2my.showToast({
              title: '下单失败，请重新下单',
              icon: 'none',
              duration: 2000
            });
          } else {
            wx2my.navigateTo({
              url: '../prodOrder/prodOrder?typeindex=3'
            });
          }
        }
      } else {
        wx2my.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        that.setData({
          jointype: -1,
          buybtntype: 1
        });
        return;
      }
    }).catch(err => {
      console.log(err);
    });
  }
});