const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    showtype: '',
    moretype: false,
    pageNo: 1,
    pageSize: 20,
    redbaglist: [],
    shareredcode: '',
    user_name: '',
    pages: ''
  },
  onLoad: function (options) {
    const that = this;
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
    that.get_myredbaglist(that.data.pageNo);
  },
  get_myredbaglist: function (pageNo) {//获取我的红包
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    let linkData = {
      pageNo: pageNo,
      pageSize: 20,
      hotelId: app.globalData.hotelId
    };
    wxrequest.getmyredbaglist(linkData).then(res => {
      const resdata = res.data;
      const resdatas = res.data.data;
      let redbag_list = that.data.redbaglist;
      if (resdata.code == 0) {
        if(redbag_list.length == 0) {
          redbag_list = resdatas.records;
        } else {
          redbag_list = redbag_list.concat(resdatas.records);
        }
        that.setData({
          redbaglist: redbag_list,
          pages: resdatas.pages
        });
      } else {
        that.setData({
          searchLoadingComplete: false
        });
      }
      wx.hideNavigationBarLoading();// 隐藏导航栏加载框
      wx.stopPullDownRefresh();// 停止下拉动作
      wx.hideLoading();// 隐藏加载框
    })
    .catch(err => {
      console.log(err)
    });
  },
  onPullDownRefresh: function () {//下拉刷新
    const that = this;
    that.setData({
      moretype: true,
      pageNum: 1,
      redbaglist: []
    });
    that.get_myredbaglist(1);
  },
  onReachBottom: function () {//上拉加载
    var that = this;
    let page_No = that.data.pageNo;
    let pages = that.data.pages;
    if (pages == page_No) {
      that.setData({
        moretype: false
      })
    } else {
      wx.showLoading({// 显示加载图标
        title: '玩命加载中',
      });
      page_No = page_No + 1;// 页数+1
      that.setData({
        pageNo: page_No
      })
      that.get_myredbaglist(page_No);
    }
  },
  shareredbagfun: function (e) {
    this.setData({
      showtype: true,
      shareredcode: e.currentTarget.dataset.code
    })
  },
  sharefun: function () {//打开分享窗口
    this.setData({
      showtype: true
    });
    wxrequest.putredbagtype(that.data.shareredcode).then(res => {
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
      path: 'pages/login/login?sharecode=' + that.data.shareredcode,  // 路径，传递参数到指定页面。
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