// pages/foodOrder/foodOrder.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    serialNumber: '', //流水号
    roomCode:'',  //桌号
    date: '',
    date2: '',
    pageNum: 1,
    deliveryDataList: [], //配送单数据
    sizejudge: 0,

    searchData: [
      { name: "流水号", desc: "", codeName: 'serialNumber' },
      { name: "桌号", desc: "", codeName: 'roomCode' },
      { name: "下单时间", desc: "", desc2: '', codeName: 'date' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
      searchDatabak: this.data.searchData
    })
    this.delivList();
  },



  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    if (codeName === 'serialNumber') {
      this.setData({
        serialNumber: '',
      })
    } else if (codeName === 'roomCode') {
      this.setData({
        roomCode: '',
      })
    } else {
      this.setData({
        date: '',
        date2: '',
      })
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData
    })
    this.delivList()
  },


  //获取配送数据
  delivList: function () {
    let that = this;

    if (!this.data.date && !this.data.date2) {
    } else if (this.data.date && this.data.date2) {
    } else {
      wx.showToast({
        title: '请选择完整下单时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let linkData = {
      pageNo: that.data.pageNum,
      pageSize: 20,
      serialNumber: that.data.serialNumber,
      roomCode: that.data.roomCode,
      startTime: that.data.date,
      endTime: that.data.date2,
    };

    let excessive = JSON.stringify(that.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'serialNumber') {
        item.desc = that.data.serialNumber.trim();
      } else if (item.codeName === 'roomCode') {
        item.desc = that.data.roomCode.trim();
      } else {
        item.desc = that.data.date.trim();
        item.desc2 = that.data.date2.trim();
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })


    wx.showLoading({
      title: '加载中',
    })
    wxrequest.hotelEatinOrderList(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      let tempdata = [];
      if (resdata.code == 0) {
        if (resdata.data.records.length > 0 && resdata.data.records.length < 20) {
          that.setData({
            sizejudge: 0
          })
        } else {
          that.setData({
            sizejudge: 1
          })
        }
        if (that.data.pageNum > 1) {
          tempdata = that.data.deliveryDataList.concat(resdata.data.records)
        } else {
          tempdata = resdata.data.records
        }
        that.setData({
          deliveryDataList: tempdata
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //详情
  btndetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../foodOrderDetail/foodOrderDetail?id=' + id,
    })
  },

  //流水号
  serialNumber: function (e) {
    this.setData({
      serialNumber: e.detail.value
    })
  },


  //桌号
  roomCode: function (e) {
    this.setData({
      roomCode: e.detail.value
    })
  },


  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    let startdate = e.detail.value
    that.setData({
      date: e.detail.value,
      pageNum: 1,
    })
  },


  bindDateChange2(e) {
    let that = this;
    let enddate = e.detail.value;
    that.setData({
      date2: e.detail.value,
      pageNum: 1,
    })
  },





  //搜索自营配送
  searchBtn: function () {
    this.setData({
      pageNum: 1,
      switchJudge: false
    })
    this.delivList()
  },


  //重置
  reset: function () {
    this.setData({
      serialNumber: '',
      roomCode:'',
      date: '',
      date2: '',
      pageNum: 1,
    })
    this.delivList()
  },

  //修改订单
  btnedit:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../foodOrderEdit/foodOrderEdit?id='+id,
    })
  },


  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
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
      pageNum: 1
    })
    this.delivList();
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let nowpageNum = this.data.pageNum;
    if (this.data.sizejudge) {
      this.setData({
        pageNum: ++nowpageNum
      })
      this.delivList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})