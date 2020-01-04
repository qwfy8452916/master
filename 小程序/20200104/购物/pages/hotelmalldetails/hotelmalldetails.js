const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    showtype: false,
    shareCode: '',
    isCanBuy: 0,//是否可以购买 0-no,1-yes
    delivWaynum: 0,//配送方式 0-无,1-现场,2-快递
    detailsdata: '',//详情信息
    imgheights: [],//banner图
    current: 0,//第一张banner图
    deliverylength: '',//购物车数量
    isvirtual: '',//是否是虚拟柜 false: 虚拟柜，true: 不是虚拟柜
    pjtotal: '',//评价总条数
    evaluatelist: '',//评价信息
    hotelId: '',
    prodCode: '',
    userid: '',
    coupontype: false,//是否显示优惠券列表
    couponlist: [],//优惠券列表
    funcprodid: '',
    money: '',//购物车金额
    buylist: '',//购物车数据
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    shareuser: ''
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    app.globalData.num = 0;
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomService',
      success(res) {
        that.setData({
          roomService: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isvirtual',
      success: function (res) {
        that.setData({
          isvirtual: res.data
        })
      },
    });
    that.setData({
      shareuser: app.globalData.shareUser,
      userid: app.globalData.userId,
      hotelId: app.globalData.hotelId,
      funcprodid: options.funcprodid
    });
    that.get_pordinfo(options.funcprodid);//获取商品信息
  },
  onShow:function(){
    const that = this;
    wx.getStorage({
      key: 'buylist',
      success: function (res) {
        that.setData({
          buylist: res.data
        })
      },
      fail: function () {
        that.setData({
          buylist: []
        })
      }
    });
    wx.getStorage({
      key: 'money',
      success: function (res) {
        that.setData({
          money: res.data
        })
      },
      fail: function () {
        that.setData({
          money: 0.00
        })
      }
    });
  },
  get_pordinfo: function (funcProdId) {//获取商品信息
    const that = this;
    let linkData = {
      funcProdId: funcProdId,
      latticeId: ''
    };
    wxrequest.getpordinfo(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        resdatas.prodnum = 1;
        resdatas.prodtype = 3;
        resdatas.selecttype = false;
        let isCanBuy = 0;
        let delivWaynum = 0;
        const shareuser = that.data.shareuser;
        const delivWay = resdatas.delivWay;//配送方式
        const invProdAmount = resdatas.invProdAmount;//库存
        const isNeedInv = resdatas.isNeedInv;//是否需要校验库存
        if (delivWay == 0){
          isCanBuy = 0;
        } else if (delivWay == 1){
          if ((invProdAmount > 0 || isNeedInv == 0) && shareuser == ''){
            isCanBuy = 1;
            delivWaynum = 1;
          } else {
            isCanBuy = 0;
          }
        } else if (delivWay == 2){
          isCanBuy = 1;
          delivWaynum = 2;
        } else if (delivWay == 3){
          isCanBuy = 1;
          if (invProdAmount > 0 && shareuser == '') {
            delivWaynum = 1;
          } else {
            delivWaynum = 2;
          }
        }
        that.setData({
          detailsdata: resdatas,
          isCanBuy: isCanBuy,
          delivWaynum: delivWaynum,
          prodCode: resdatas.prodCode
        });
        that.getpjdatafun(resdatas.prodCode);
        that.getcouponlist(resdatas);
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
  getpjdatafun: function (prodcode) {//获取评价信息
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
          pjtotal: res.data.data.total
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
      console.log(err)
    });
  },
  imageLoad: function(e){//banner图高度自适应
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  addcarfun: function (e) {//加入购物车
    const that = this;
    const shareuser = that.data.shareuser;
    let edata = e.currentTarget.dataset;
    let money = that.data.money;
    money = parseFloat(money);
    let buy_list = that.data.buylist;
    let details_data = that.data.detailsdata;
    let delivWaynum = that.data.delivWaynum;//配送方式 1-现场,2-快递
    let index = that.getlistindex(buy_list, details_data.prodCode, 3);
    if (delivWaynum == 1){//现场配送
      if(shareuser == ''){
        if (index == -1) {
          wx.showToast({
            title: '已成功加入购物车',
            icon: 'none',
            duration: 2000
          });
          buy_list.push(details_data);
          money = money + details_data.prodRetailPrice;
        } else {
          if (buy_list[index].prodnum < details_data.invProdAmount) {//检验库存
            wx.showToast({
              title: '已成功加入购物车',
              icon: 'none',
              duration: 2000
            });
            buy_list[index].prodnum = buy_list[index].prodnum + 1;
            money = money + buy_list[index].prodRetailPrice;
          } else {
            wx.showToast({
              title: '购买数量不可超出库存数量',
              icon: 'none',
              duration: 2000
            });
            return;
          }
        }
      } else {

      }
    } else if (delivWaynum == 2) {//快递配送
      let detailsinfo = JSON.stringify(details_data);
      detailsinfo = JSON.parse(detailsinfo);
      detailsinfo.delivWay = 2;
      if (index == -1) {//购物车没有该商品
        buy_list.push(detailsinfo);
        money = money + detailsinfo.prodRetailPrice;
      } else {//购物车有该商品
        buy_list[index].prodnum = buy_list[index].prodnum + 1;
        money = money + buy_list[index].prodRetailPrice;
      }
      wx.showToast({
        title: '已成功加入购物车',
        icon: 'none',
        duration: 2000
      });
    }
    money = money.toFixed(2);
    that.setData({
      buylist: buy_list,
      money: money
    });
    if (edata.typenum == 3){
      wx.navigateTo({
        url: '../hotelmallcar/hotelmallcar'
      });
    }
    wx.setStorage({
      key: 'buylist',
      data: buy_list,
    });
    wx.setStorage({
      key: 'money',
      data: money,
    });
  },
  evaluatefun: function () {//查看全部评论
    wx.navigateTo({
      url: '../evaluate/evaluate?prodcode=' + this.data.prodCode
    })
  },
  goshopcar: function(){
    wx.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    });
  },
  isLanding: function (e) {//判断是否授权登陆
    const that = this;
    let edata = e.currentTarget.dataset;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          if (edata.typenum == 1) {//跳转到购物车
            wx.navigateTo({
              url: '../hotelmallcar/hotelmallcar'
            });
          } else {//加入购物车
            that.addcarfun(edata);
          }
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
  },
  getlistindex: function (list, val, ptype) {//获取购物车中是否存在该商品
    let type = true;
    let indexnum = -2;
    if (list.length != 0) {
      for (let i = 0; i < list.length; i++) {
        if (type) {
          if (ptype == 1) {//迷你吧商品下标
            if (list[i].latticeCode == val) {
              return i;
            } else {
              type = true;
            }
          } else if (ptype == 2){//便利店商品下标
            if (list[i].prodCode == val && list[i].prodtype == 2) {
              return i;
            } else {
              type = true;
            }
          } else if (ptype == 3) {//其他功能区商品下标
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
  getcouponlist: function (prodinfo) {//获取优惠券列表
    const that = this;
    let linkData = {
      categoryIds: '',
      cusId: that.data.userid,
      drawWay: 2,//1：领取中心，2：详情页，3：列表页
      funcId: prodinfo.funcId,
      funcProdId: prodinfo.funcProdId,
      hotelId: prodinfo.hotelId,
      hotelProdId: prodinfo.hotelProdId,
      sceneCode: ''
    };
    wxrequest.getcouponlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let coupontype = that.data.coupontype
        if (resdatas.length == 0 && coupontype == true) {
          coupontype = false
        }
        that.setData({
          couponlist: resdatas,
          coupontype: coupontype
        });
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
    this.setData({
      coupontype: !this.data.coupontype
    })
  },
  receive: function (e) {//领取优惠券
    const that = this;
    const detailsdata = that.data.detailsdata;
    let linkData = {
      funcId: detailsdata.funcId,
      funcProdId: detailsdata.funcProdId,
      hotelProdId: detailsdata.hotelProdId,
      batchId: e.currentTarget.dataset.id,
      cusId: that.data.userid,
      drawWay: 2,//1：领取中心；2：详情页；3：列表页
      getWay: 1
    };
    wxrequest.postcoupon(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdatas){
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 2000
          });
          that.getcouponlist(that.data.detailsdata);
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
      console.log(err)
    });
  },
  sharefun: function () {//获取分享码
    const that = this;
    const proddata = that.data.detailsdata;
    let linkData = {
      cabCode: app.globalData.cabCode,
      hotelId: app.globalData.hotelId,
      funcId: proddata.funcId,
      shareObj: 1,
      shareObjId: that.data.funcprodid,
      shareUserId: app.globalData.userId,
      shareUserType: 2
    };
    wxrequest.postsharecode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          shareCode: resdatas.shareCode,
          showtype: true
        });
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
  closefun: function () {//关闭分享窗口
    this.setData({
      showtype: false
    })
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    return {
      title: '推荐了你一个商品，'+ that.data.detailsdata.prodShowName,
      path: 'pages/login/login?sharecode=' + that.data.shareCode,  // 路径，传递参数到指定页面。
      imageUrl: that.data.detailsdata.bannerImageList[0], // 分享的封面图
      success: function (res) {// 转发成功
        console.log('用户取消转发');
      },
      fail: function (res) {// 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {//用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {//转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    }
  }
})