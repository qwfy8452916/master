// pages/relatedhotel/relatedhotel.js
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
    hname: '',
    hotelList: [],
    flag: true,   //请求数据是否为空的状态
    pageindex: 1   //初始页数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotellist(this.data.hname, this.data.pageindex);
  },
  //获取酒店列表
  gethotellist: function (hname, pageindex) {
    let that = this;
    wx.request({
      url: apiUrl + '/fin/monitor/calc/relatedHotel',
      data: {
        allyId: wx.getStorageSync("allyId"),
        hotelName: hname,
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
          if (res.data.data.length != 0){
            let hotelInfo = res.data.data.map(item => {
              item.orgAsNames.map(subitem => {
                if(subitem == '加盟商'){
                  item.hotelAs = '8'
                }else if(subitem == '城市运营商'){
                  item.hotelAs = '6'
                }else{
                  item.hotelAs = ''
                }
              });
              return item
            });
            let newHotelList = that.data.hotelList.concat(hotelInfo);
            that.setData({
              hotelList: newHotelList
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
            // that.setData({
            //   hotelList: []
            // });
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
  //搜索酒店
  inputhotelname: function (e) {
    this.setData({
      hname: e.detail.value
    });
  },
  searchhotel: function () {
    this.setData({
      hotelList: [],
      flag: true,
      pageindex: 1
    });
    this.gethotellist(this.data.hname, this.data.pageindex);
  },
  //查看详情
  linkdetail: function(e){
    // console.log(e);
    let hotelas = e.currentTarget.dataset.hotelas;
    let hotelid = e.currentTarget.dataset.hotelid;
    if (hotelas != ""){
      wx.navigateTo({
        url: '../relatedhoteldetail/relatedhoteldetail?hotelas=' + hotelas + '&hotelid=' + hotelid,
      })
    }
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
    // console.log(11111111);
    this.setData({
      hotelList: [],
      flag: true,
      pageindex: 1
    });
    this.gethotellist(this.data.hname, this.data.pageindex);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.flag){
      let pageindex = this.data.pageindex + 1;
      this.setData({
        pageindex: pageindex
      });
      this.gethotellist(this.data.hname, pageindex);
    }else{
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