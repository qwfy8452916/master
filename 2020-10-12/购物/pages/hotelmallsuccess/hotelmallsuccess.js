const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    global_Data: '',
    showtype: false,
    redcode: '',
    ishasmnb: '',//是否有迷你吧商品 0-有，1-没有
    pagetype: '',
    funcId: '',
    user_name: '',
    orderid: '',//订单id
    recommendprodlist: [],
    cabopentype: false,
    isshowicon: true,
    redData: '',
    sharetype:false,
    showPoster:false,
    imgurldata: '',
    shareTitle: '',
    posterurl: '',
  },
  onLoad: function (options) {
    const that = this;
    let red_code = options.redcode;
    if(red_code == '' || red_code == 'null'){
      red_code = -1;
    }
    setTimeout(function(){
      that.setData({
        isshowicon: false
      });
    },5000);
    that.setData({
      global_Data: app.globalData,
      orderid: options.orderid,
      ishasmnb: options.ishasmnb,
      redcode: red_code,
      redData: red_code != -1?JSON.parse(options.redData):'',
    });
    wx.getStorage({
      key: 'funcAreaId',
      success: function (res) {
        that.setData({
          funcId: res.data
        });
      },
      fail: function(){
        that.setData({
          funcId: ''
        });
      }
    });
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          user_name: res.data.nickName
        });
      },
      fail: function(){
        that.setData({
          user_name: ''
        });
      }
    });
    that.changestorage();
    // that.get_recommendprodlist(options.orderid);//获取推荐商品
    if(options.ishasmnb == 0){
      that.get_cabopentype(options.orderid);
    }
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  backfun: function(){//返回列表页
    const pagetype = this.data.pagetype;
    const funcId = this.data.funcId;
    if (wx.getStorageSync('funcType') == 1){
      wx.reLaunch({
        url: '../index/index?funcId='+funcId
      });
    } else {
      wx.reLaunch({
        url: '../specialty/specialty?id=' + funcId
      });
    }
  },
  orderdetails: function(){//订单详情
    wx.navigateTo({
      url: '../myorderDetail/myorderDetail?orderid=' + this.data.orderid + '&pagetype=1'
    });
  },
  orderlist: function(){//订单列表
    wx.navigateTo({
      url: '../prodOrder/prodOrder?typeindex=all'
    })
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
  sharefun(){//打开分享窗口
    if(this.data.redData.posterFlag == 1){
      this.setData({
        sharetype: true,
      });
    }else{
      this.setData({
        showtype: true
      });
    }
    this.getTitle()
  },
  closefun: function () {//关闭分享窗口
    this.setData({
      showtype: false
    })
  },
  getTitle: function(){//朋友圈分享获取海报
    const that = this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wxrequest.getTitle({code: this.data.redcode}).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
          this.setData({
            imgurldata: resdatas.picUrl,
            shareTitle: resdatas.title,
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
  post_sharehistory: function(){//新增酒店分享记录
    const that = this;
    const linkData = {
      shareCode: that.data.redcode
    }
    wxrequest.postsharehistory(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {} else {
        console.log(err)
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  openagain: function (e) {//再次开门
    const that = this;
    wxrequest.getaginopen2(that.data.orderid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '柜门已开启，请取走您的商品',
          icon: 'none',
          duration: 3000
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
      wx.hideLoading();
      console.log(err)
    });
  },
  get_recommendprodlist: function (orderid) {//获取推荐商品
    const that = this;
    let linkData = {
      orderId: orderid
    };
    wxrequest.getrecommendprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          recommendprodlist: resdatas
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
      wx.hideLoading();
      console.log(err)
    });
  },
  detailfun: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    const funcid = edata.funcid;
    if(funcid == 2){
      let prodcode = edata.prodcode;
      let latticeId = edata.latticeid;
      let latticeCode = edata.latticecode;
      let hotelprodid = edata.hotelprodid;
      let img = edata.img;
      let ptype = edata.ptype;
      let funcprodid = edata.funcprodid;
      let isempty = edata.isempty;
      let prodamt = edata.prodamt;
      let prodnumtype = edata.prodnumtype;
      wx.navigateTo({
        url: '../details/details?latticeid=' + latticeId + '&latticecode=' + latticeCode + '&prodcode=' + prodcode + '&hotelprodid=' + hotelprodid + '&img=' + img + '&ptype=' + ptype + '&funcprodid=' + funcprodid + '&isempty=' + isempty + '&prodamt=' + prodamt + '&prodnumtype=' + prodnumtype
      });
    } else {
      wx.navigateTo({
        url: '../hotelmalldetails/hotelmalldetails?funcprodid=' + edata.funcprodid
      });
    }
  },
  get_cabopentype: function (orderid) {//检查柜门打开状态
    const that = this;
    let linkData = {
      orderId: orderid
    };
    wxrequest.getcabopentype(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          cabopentype: resdatas
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
      wx.hideLoading();
      console.log(err)
    });
  },
  hideiconfun: function () {
    this.setData({
      isshowicon: false
    })
  },
  closefunP: function () {//关闭分享窗口
    this.setData({
      showPoster: false
    })
  },
  closefuns: function () {//关闭分享窗口
    this.setData({
      sharetype: false
    })
  },
  sharefun1(){
    this.setData({
      showtype: true,
      sharetype: false
    });
  },
  get_poster: function(){//朋友圈分享获取海报
    const that = this;
    wx.showLoading({
      title: '加载中',
      mask:true
    })
    wxrequest.getNewPoster(that.data.redcode).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          posterurl: resdatas,
          showPoster:true
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
      wx.hideLoading();
      console.log(err)
    });
  },
  saveimg: function(){
    const that = this;
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    let imgUrl = that.data.posterurl;
    console.log(imgUrl);
    wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
      url: imgUrl,
      success: function (res) {
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
          success: function (res) {
            wx.showToast({
              title: '成功保存到相册',
              icon: 'success'
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success:modalSuccess=>{
                  wx.openSetting({
                    success(settingdata) {
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击保存图片按钮即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData",failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          }
        })
      }
    })
  },
  previewImg: function () {
    const that = this;
    let imglist = [];
    imglist.push(that.data.posterurl);
    wx.previewImage({
      current: imglist[0],     //当前图片地址
      urls: imglist               //所有要预览的图片的地址集合 数组形式
    })
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    if(that.data.redcode != -1){
      this.post_sharehistory()
    }
    return {
      title: that.data.shareTitle?that.data.shareTitle:(that.data.user_name?that.data.user_name+'给你发了一个现金红包，领取后可提入微信零钱':'好友给你发了一个现金红包，领取后可提入微信零钱'),
      path: 'pages/login/login?sharecode=' + that.data.redcode,  // 路径，传递参数到指定页面。
      imageUrl: that.data.imgurldata?that.data.imgurldata:(that.data.global_Data.imgurldata + 'shareimg.png'), // 分享的封面图
      success: function (res) {// 转发成功
        
      },
      fail: function (res) {// 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {//用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {//转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    }
  },
})