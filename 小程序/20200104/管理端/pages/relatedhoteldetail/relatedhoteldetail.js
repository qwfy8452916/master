// pages/relatedhoteldetail/relatedhoteldetail.js
const app = getApp()
let apiUrl = app.getApiUrl();
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      } else if (res) { }
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotelAs: '',
    hotelId: '',
    hotelName: '',
    cabList: [],
    flag: true,   //请求数据是否为空的状态
    pageindex: 1,   //初始页数
    cabId: '',
    isShowMsg: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hotelAs: options.hotelas,
      hotelId: options.hotelid
    });
    // this.getHotelDetail();
  },
  //获取详情
  getHotelDetail: function(){
    let that = this;
    wx.request({
      url: apiUrl + '/fin/monitor/calc/relatedHotel/detail',
      data: {
        allyId: wx.getStorageSync("allyId"),
        hotelAs: that.data.hotelAs,
        hotelId: that.data.hotelId,
        pageNo: that.data.pageindex,
        pageSize: 10
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          wx.hideLoading()
          that.setData({
            hotelName: res.data.data.hotelName,
          });
          let cabDTOlist = res.data.data.allyHotelCabDTOList;
          if (cabDTOlist.length != 0){
            let newCabList = that.data.cabList.concat(cabDTOlist);
            that.setData({
              cabList: newCabList
            });
          }else{
            that.setData({
              flag: false
            });
            wx.showToast({
              title: '已经到底了~~',
              icon: 'loading',
              duration: 1000
            })
          }
        } else {
          wx.hideLoading()
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },
  //转让
  makeoverCab: function(e){
    let cid = e.currentTarget.dataset.cid;
    let frcode = e.currentTarget.dataset.frcode;
    wx.navigateTo({
      url: '../cabmakeover/cabmakeover?hotelid=' + this.data.hotelId + '&hotelname=' + this.data.hotelName + '&frcode=' + frcode +'&cid=' + cid,
    })
  },
  //取消转让
  makeoverCancel: function(e){
    this.setData({
      cabId: e.currentTarget.dataset.cid,
      isShowMsg: true
    });
  },
  //确定取消
  msgEnsure: function(){
    let cid = this.data.cabId;
    let that = this;
    wx.request({
      url: apiUrl + '/ally/transfer/'+ cid +'/cancal',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "PUT",
      success: function (res) {
        if (res.data.code == 0) {
          wx.hideLoading();
          that.setData({
            cabList: [],
            flag: true,
            pageindex: 1
          });
          that.getHotelDetail();
        } else {
          wx.hideLoading()
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
        that.setData({
          isShowMsg: false
        });
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },
  //取消
  msgCancel: function () {
    this.setData({
      isShowMsg: false
    });
  },
  //跳转小程序
  jumpapplet: function(e){
    wx.navigateToMiniProgram({
      appId: 'wxe4bc42f44b79c8dc',
      path: 'pages/login/login?sharecode=' + e.currentTarget.dataset.cabcode,
      extraData: {
        // cabCode: e.currentTarget.dataset.cabcode
        // sharecode: e.currentTarget.dataset.cabcode
      },
      success(res) {
        // 打开成功
        console.log(222222222);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      cabList: [],
      flag: true,
      pageindex: 1
    });
    this.getHotelDetail();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      cabList: [],
      flag: true,
      pageindex: 1
    });
    this.getHotelDetail();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.flag) {
      let pageindex = this.data.pageindex + 1;
      this.setData({
        pageindex: pageindex
      });
      this.getHotelDetail();
    } else {
      wx.showToast({
        title: '已经到底了~~',
        icon: 'loading',
        duration: 1000
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})