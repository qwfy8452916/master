const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    userInfo: '',
    vouname: '',
    vouimageurl: '',
    cardcouponlist: [],
    popupstype: false,
    typeindex: 0,
    shareCode: '',
    qrPath: '',
    createdByOrderId: 0,
  },
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: res.data
        });
        console.log(res.data.nickName);
      },
      fail: function(){
        let user_Info = { avatarUrl: '', nickName: ''}
        that.setData({
          userInfo: user_Info
        })
      }
    });
    that.setData({
      createdByOrderId: typeof(options.orderid)== 'undefined'? 0:options.orderid,
    });
    that.get_voucherlist(0);
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  get_voucherlist:function(type){//取用户卡券列表（已使用，未使用，已失效）
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      vouState: type,
      cusId: app.globalData.userId,
      hotelId: app.globalData.hotelId,
      createdByOrderId: that.data.createdByOrderId,
    };
    wxrequest.getvoucherlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let cardcouponlist = resdatas.map(item=>{
          if(item.vouInstruction) {
            item.vouInstructions = item.vouInstruction.split(/[\n,]/g);
            item.vouInstructions.map((item2,index)=>{
              if(item2 == ''){
                item.vouInstructions.splice(index, 1);
              }
            })
          }
          return item;
        })
        console.log(cardcouponlist);
        that.setData({
          cardcouponlist: cardcouponlist
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
      wx.hideLoading();
      console.log(err)
    });
  },
  changelisttype: function (e) {
    const that = this;
    let num = e.currentTarget.dataset.type;
    that.setData({
      typeindex: num
    });
    that.get_voucherlist(num);
  },
  writeofffun: function (e) {//查看核销码
    wx.navigateTo({
      url: '../mycardcouponwriteoff/mycardcouponwriteoff?id=' + e.currentTarget.dataset.id
    })
  },
  get_checkvoucher: function (id) {//验证当前卡券是否可以转赠他人
    const that = this;
    wxrequest.getcheckvoucher(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0 && resdatas) {
        that.sharefun(id);
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
  sharefun: function (id) {//获取分享码
    const that = this;
    let linkData = {
      cabCode: app.globalData.cabCode,
      hotelId: app.globalData.hotelId,
      funcId: -1,
      shareObj: 99,
      shareObjId: id,
      shareUserId: app.globalData.userId,
      shareUserType: 2,
      shareType: 2,//1：列表，2：单项，3：分类
      shareCode: app.globalData.sharecode
    };
    wxrequest.postsharecode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          shareCode: resdatas.shareCode
        });
        that.changepopupstype();
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
  onShareAppMessage: function (options) {//赠送卡券
    const that = this;
    that.changepopupstype();
    that.post_sharehistory();
    let nick_Name = '您的好友';
    if(that.data.userInfo.nickName){
      nick_Name = that.data.userInfo.nickName
    }
    return {
      title: nick_Name + '转赠给您一张' + that.data.vouname + ',点击领取',
      path: 'pages/login/login?sharecode=' + that.data.shareCode,  // 路径，传递参数到指定页面。
      imageUrl: that.data.vouimageurl, // 分享的封面图
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
  },
  changepopupstype: function(){//分享弹窗显示隐藏
    this.setData({
      popupstype: !this.data.popupstype
    })
  },
  isLanding: function (e) {//判断是否授权登陆
    const that = this;
    const vouname = e.currentTarget.dataset.vouname;
    const vouimageurl = e.currentTarget.dataset.vouimageurl;
    const id = e.currentTarget.dataset.id;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称
          that.setData({
            vouname: vouname,
            vouimageurl: vouimageurl
          });
          that.get_checkvoucher(id);
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        that.setData({
          userInfo: res.data
        })
      },
      fail: function(){
        let user_Info = { avatarUrl: '', nickName: ''}
        that.setData({
          userInfo: user_Info
        })
      }
    });
  },
  post_sharehistory: function(){//新增酒店分享记录
    const that = this;
    const linkData = {
      shareCode: that.data.sharecode
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
  }
})