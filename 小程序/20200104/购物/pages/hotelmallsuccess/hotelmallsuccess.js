const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    showtype: false,
    redcode: '',
    ishasmnb: '',//是否有迷你吧商品 0-有，1-没有
    pagetype: '',
    funcId: '',
    user_name: '',
    orderid: ''//订单id
  },
  onLoad: function (options) {
    const that = this;
    console.log(options.redcode);
    let red_code = options.redcode;
    if(red_code == '' || red_code == 'null'){
      red_code = -1;
    }
    that.setData({
      orderid: options.orderid,
      ishasmnb: options.ishasmnb,
      redcode: red_code
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
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  backfun: function(){//返回列表页
    const pagetype = this.data.pagetype;
    const funcId = this.data.funcId;
    if (funcId == '' || funcId == null){
      wx.redirectTo({
        url: '../index/index'
      });
    } else {
      wx.redirectTo({
        url: '../specialty/specialty?&id=' + funcId
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
  sharefun: function () {//打开分享窗口
    this.setData({
      showtype: true
    });
    wxrequest.putredbagtype(that.data.redcode).then(res => {
      const resdata = res.data;
      if (resdata.code == 0) {
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
      title: that.data.user_name?that.data.user_name+'邀你一起领红包':'好友邀你一起领红包',
      path: 'pages/login/login?sharecode=' + that.data.redcode,  // 路径，传递参数到指定页面。
      imageUrl: 'cloud://hotelconsumption-e23cl.686f-hotelconsumption-e23cl-1300251335/shareimg.jpg', // 分享的封面图
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
  }
})