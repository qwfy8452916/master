// pages/ownDeliveryList/ownDeliveryList.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({


  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false, //搜索框的显示状态
    orderStatusData: [{
      name: "全部",
      id: ""
    },
    {
      name: "待处理",
      id: "0"
    },
    {
      name: "已接单",
      id: "1"
    },
    {
      name: "已拒单",
      id: "2"
    },
    {
      name: "申请退订",
      id: "3"
    },
    {
      name: "已退订",
      id: "4"
    },
    {
      name: "已核销",
      id: "6"
    },
    ],
    orderStatusIndex: 1,
    orderStatusId: 0, //订单状态id
    orderStatusName: '待确认', //订单状态名称
    orderCode: '', //订单号
    cusName: '', //联系人
    cusPhone: '', //手机号
    adminUnsubscribeStatus: [{
      name: "全部",
      id: ""
    },
    {
      name: "申请退订中",
      id: "1"
    },
    {
      name: "已后台退订",
      id: "2"
    },
    {
      name: "退订失败",
      id: "3"
    },
    ],//后台退订状态
    unsubscribeId: '', //后台退订状态id
    unsubscribeIndex: '', //后台退订状态index
    unsubscribeName: '', //后台退订状态名称
    arrivalStartDate: '',
    arrivalEndDate: '',//入住结束时间
    pageNum: 1,
    orderDataList: [], //配送单数据
    sizejudge: 0,
    searchData: [{
      name: "配送单状态",
      desc: "",
      codeName: 'orderStatusId'
    },
    {
      name: "订单号",
      desc: "",
      codeName: 'orderCode'
    },
    {
      name: "联系人",
      desc: "",
      codeName: 'cusName'
    },
    {
      name: "手机号",
      desc: "",
      codeName: 'cusPhone'
    },
    {
      name: "入住时间",
      desc: "",
      desc2: '',
      codeName: 'arrivalStartDate'
    },
    {
      name: "后台退订状态",
      desc: "",
      codeName: 'unsubscribeId'
    },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
      searchDatabak: this.data.searchData,
    })
    this.bookOrderList();
  },

  //删除初始条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    if (codeName === 'orderStatusId') {
      this.setData({
        orderStatusId: '',
        orderStatusIndex: ''
      })
    } else if (codeName === 'orderCode') {
      this.setData({
        orderCode: '',
      })
    } else if (codeName === 'cusName') {
      this.setData({
        cusName: '',
      })
    }
    else if (codeName === 'cusPhone') {
      this.setData({
        cusPhone: '',
      })
    } else if (codeName === 'unsubscribeId') {
      this.setData({
        unsubscribeId: '',
        unsubscribeIndex: ''
      })
    } else {
      this.setData({
        arrivalStartDate: '',
        arrivalEndDate: '',
      })
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData
    })
    this.bookOrderList()
  },

  //获取配送数据
  bookOrderList: function () {
    let that = this;

    if (!this.data.arrivalStartDate && !this.data.arrivalEndDate) { } else if (this.data.arrivalStartDate && this.data.arrivalEndDate) { } else {
      wx.showToast({
        title: '请选择完整支付时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let linkData = {
      pageNo: that.data.pageNum,
      pageSize: 10,
      chooseAs: 1,
      orderCode: that.data.orderCode,//订单号
      cusName: that.data.cusName,//联系人
      cusPhone: that.data.cusPhone,//手机号
      dealStatus: that.data.orderStatusId,//订单状态
      arrivalStartDate: that.data.arrivalStartDate,//入住开始时间
      arrivalEndDate: that.data.arrivalEndDate,//入住结束时间
      adminUnsubscribeStatus: that.data.unsubscribeId,//后台退订状态
    };

    let excessive = JSON.stringify(that.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'orderStatusId') {
        item.desc = that.data.orderStatusId.toString().length ? that.data.orderStatusName.trim() : '';
      } else if (item.codeName === 'orderCode') {
        item.desc = that.data.orderCode.trim();
      } else if (item.codeName === 'cusName') {
        item.desc = that.data.cusName.trim();
      } else if (item.codeName === 'cusPhone') {
        item.desc = that.data.cusPhone.trim();
      } else if (item.codeName === 'unsubscribeId') {
        item.desc = that.data.unsubscribeId.toString().length ? that.data.unsubscribeName.trim() : '';
      } else {
        item.desc = that.data.arrivalStartDate.trim();
        item.desc2 = that.data.arrivalEndDate.trim();
      }
      return item;
    })
    this.setData({
      searchData: nowsearchData
    })


    wx.showLoading({
      title: '加载中',
    })
    wxrequest.bookOrderList(linkData).then(res => {
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
          tempdata = that.data.orderDataList.concat(resdata.data.records)
        } else {
          tempdata = resdata.data.records
        }
        that.setData({
          orderDataList: tempdata
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
      url: '../ownDeliveryDetail/ownDeliveryDetail?id=' + id,
    })
  },

  //配送单号
  orderCode: function (e) {
    this.setData({
      orderCode: e.detail.value
    })
  },
  //配送单号
  cusName: function (e) {
    this.setData({
      cusName: e.detail.value
    })
  },
  //配送单号
  cusPhone: function (e) {
    this.setData({
      cusPhone: e.detail.value
    })
  },


  // 时间段选择  
  bindStartDateChange(e) {
    let that = this;
    that.setData({
      arrivalStartDate: e.detail.value,
      pageNum: 1,
    })
  },


  bindEndDateChange(e) {
    let that = this;
    that.setData({
      arrivalEndDate: e.detail.value,
      pageNum: 1,
    })
  },

  //选择后台退订状态
  bindPickerUnsubscribe: function (e) {
    let index = e.detail.value;
    this.setData({
      unsubscribeId: this.data.adminUnsubscribeStatus[index].id,
      unsubscribeIndex: index,
      unsubscribeName: this.data.adminUnsubscribeStatus[index].name,
    })
  },

  //订单状态
  bindPickerOrder: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      orderStatusIndex: index,
      orderStatusId: that.data.orderStatusData[index].id,
      orderStatusName: that.data.orderStatusData[index].name,
    })
  },

  //搜索自营配送
  searchBtn: function () {
    this.setData({
      pageNum: 1,
      switchJudge: false
    })
    this.bookOrderList()
  },


  //重置
  reset: function () {
    this.setData({
      orderStatusIndex: '',
      orderStatusId: '',
      orderCode: '',
      cusName: '',
      cusPhone: '',
      unsubscribeId: '',
      unsubscribeIndex: '',
      arrivalStartDate: '',
      arrivalEndDate: '',
      pageNum: 1,
    })
    this.bookOrderList()
  },

  //切换搜索开关状态
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
    this.bookOrderList();
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
      this.bookOrderList();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})