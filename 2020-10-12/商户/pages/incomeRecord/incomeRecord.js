// pages/incomeRecord/incomeRecord.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    identitydata: [{ asName: '全部', as: '' }, { asName: '酒店', as: '3' }, { asName: '供应商', as: '4' }],
    identityId: '', //身份id
    identityName: '', //身份名称
    orderTypeId: '', //订单类型id
    orderTypeName: '', //订单类型名称
    orderCode: '', //订单号
    roomFloorAndCode: '', //楼层房间号
    orderTypeData: [], //订单类型数据
    incomeRecordDataList: [], //待入账记录
    date: '',
    date2: '',
    pageNum: 1,
    sizeJudge: 0,
    switchJudge: false,
    searchData: [
      { name: "分成身份", desc: "", codeName: 'revenueAs' },
      { name: "订单类型", desc: "", codeName: 'funId' },
      { name: "楼层房号", desc: "", codeName: 'roomFloorAndCode' },
      { name: "订单号", desc: "", codeName: 'orderCode' },
      { name: "下单时间", desc: "", desc2: '', codeName: 'startTime' },
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
    this.hotelFuncList();
    this.incomeRecord()
  },


  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    if (codeName === 'revenueAs') {
      this.setData({
        identityId: '',
        index: ''
      })
    } else if (codeName === 'funId') {
      this.setData({
        orderTypeId: '',
        index2: ''
      })
    } else if (codeName === 'roomFloorAndCode') {
      this.setData({
        roomFloorAndCode: '',
      })
    } else if (codeName === 'orderCode') {
      this.setData({
        orderCode: '',
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
    this.incomeRecord()
  },


  //获取入账记录数据
  incomeRecord: function () {
    let that = this;
    let tempDataSet = [];
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
      pageNo: this.data.pageNum,
      pageSize: 20,
      orgId: wx.getStorageSync('orgId'),
      revenueAs: this.data.identityId,
      funId: this.data.orderTypeId,
      orderCode: this.data.orderCode,
      roomFloorAndCode: this.data.roomFloorAndCode,
      startTime: this.data.date,
      endTime: this.data.date2,
    };
    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'revenueAs') {
        item.desc = this.data.identityId ? this.data.identityName.trim() : '';
      } else if (item.codeName === 'funId') {
        item.desc = this.data.orderTypeId ? this.data.orderTypeName.trim() : '';
      } else if (item.codeName === 'orderCode') {
        item.desc = this.data.orderCode.trim();
      } else if (item.codeName === 'roomFloorAndCode') {
        item.desc = this.data.roomFloorAndCode.trim();
      } else {
        item.desc = this.data.date.trim();
        item.desc2 = this.data.date2.trim();
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })
    wx.showLoading({
      title: "加载中"
    })
    wxrequest.incomeRecord(linkData).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      if (resdata.code == 0) {
        if (resdata.data.records.length < 20 && resdata.data.records.length > 0) {
          that.setData({
            sizeJudge: 0
          })
        } else {
          that.setData({
            sizeJudge: 1
          })
        }
        if (that.data.pageNum > 1){
          tempDataSet = that.data.incomeRecordDataList.concat(resdata.data.records)
        }else{
          tempDataSet = res.data.data.records
        }
        
        that.setData({
          incomeRecordDataList: tempDataSet
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },

  //获取订单类型
  hotelFuncList: function () {
    let that = this;
    let linkData = {
      isNeedBookRoom: 1,
      isNotNeedDef: 1,
      hotelId: wx.getStorageSync("hotelId")
    };
    wx.showLoading({
      title: "加载中"
    })
    wxrequest.getHotelFunctionList(linkData).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      if (resdata.code == 0) {
        that.setData({
          orderTypeData: resdata.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })

  },

  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },

  //身份选择
  bindPickerChange: function (e) {
    let that = this;
    this.setData({
      index: e.detail.value,
      identityId: that.data.identitydata[e.detail.value].as,
      identityName: that.data.identitydata[e.detail.value].asName,
    })
  },

  //订单类型选择
  bindPickerChange2: function (e) {
    let that = this;
    this.setData({
      index2: e.detail.value,
      orderTypeId: that.data.orderTypeData[e.detail.value].id,
      orderTypeName: that.data.orderTypeData[e.detail.value].funcCnName,
    })
  },



  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    let startdate = e.detail.value
    that.setData({
      date: e.detail.value,
    })
  },

  bindDateChange2(e) {
    let that = this;
    let enddate = e.detail.value;
    that.setData({
      date2: e.detail.value,
    })
  },

  //获取楼层房间号
  floorRoom: function (e) {
    this.setData({
      roomFloorAndCode: e.detail.value
    })
  },

  //获取订单号
  orderInput: function (e) {
    this.setData({
      orderCode: e.detail.value
    })
  },

  //待入账详情
  incomeRecordDetail: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../incomeRecordDetail/incomeRecordDetail?id=' + id,
    })
  },

  //搜索待入账记录
  searchBtn: function () {
    this.setData({
      pageNum: 1,
      switchJudge: false
    })
    this.incomeRecord()
  },

  //重置
  reset: function () {
    this.setData({
      identityId: '',
      orderTypeId: '',
      orderCode: '',
      roomFloorAndCode: '',
      date: '',
      date2: '',
      index: '',
      index2: '',
      pageNum: 1,
    })
    this.incomeRecord()
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
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let page = that.data.pageNum;
    if (that.data.sizeJudge) {
      that.setData({
        pageNum: ++page
      })
      that.incomeRecord();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})