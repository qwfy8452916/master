// pages/storeDeliv/storeDeliv.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    orderStatusData: [
      { name: "全部", id: "" },
      { name: "待确认", id: "0" },
      { name: "已确认", id: "1" },
      { name: "已发货", id: "2" },
      { name: "已取消", id: "6" },
    ],
    pdId: '', //配送单id
    orderStatusIndex: 1,
    orderStatusId: 0, //订单状态id
    orderStatusName: '待确认', //订单状态名称
    deliveryCode: '', //配送单号
    functionList: [], //功能区数据
    funcId: '', //功能区id
    funcName: '', //功能区名称
    funcIndex: '',

    date: '',
    date2: '',
    pageNum: 1,
    deliveryDataList: [], //配送单数据
    sizejudge: 0,

    searchData: [
      { name: "配送单状态", desc: "", codeName: 'orderStatusId' },
      { name: "配送单号", desc: "", codeName: 'deliveryCode' },
      { name: "功能区", desc: "", codeName: 'funcId' },
      { name: "支付时间", desc: "", desc2: '', codeName: 'date' },
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
    this.hotelFunctionList();
    this.delivList();
  },



  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    if (codeName === 'orderStatusId') {
      this.setData({
        orderStatusId: '',
        orderStatusIndex: ''
      })
    } else if (codeName === 'deliveryCode') {
      this.setData({
        deliveryCode: '',
      })
    } else if (codeName === 'funcId') {
      this.setData({
        funcIndex: '',
        funcId: ''
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
        title: '请选择完整支付时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let linkData = {
      pageNo: that.data.pageNum,
      pageSize: 20,
      chooseAs: 3,
      delivWay: 1,
      deliveryCode: that.data.deliveryCode,
      funcId: that.data.funcId,
      status: that.data.orderStatusId,
      payStartTime: that.data.date,
      payEndTime: that.data.date2,
      contactPhone: '',
    };

    let excessive = JSON.stringify(that.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'orderStatusId') {
        item.desc = that.data.orderStatusId.toString().length ? that.data.orderStatusName.trim() : '';
      } else if (item.codeName === 'deliveryCode') {
        item.desc = that.data.deliveryCode.trim();
      } else if (item.codeName === 'funcId') {
        item.desc = that.data.funcId.toString().length ? that.data.funcName.trim() : '';
      }else {
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
    wxrequest.delivList(linkData).then(res => {
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
    let delivType = e.currentTarget.dataset.delivtype;
    if (delivType!=1){
      wx.navigateTo({
        url: '../storeDelivDetail/storeDelivDetail?id=' + id,
      })
    }else{
      wx.navigateTo({
        url: '../roomDelivDetail/roomDelivDetail?id=' + id,
      })
    }
    
  },

  //配送单号
  deliveryCode: function (e) {
    this.setData({
      deliveryCode: e.detail.value
    })
  },

  //发货时间
  bindDateChangefh(e) {
    this.setData({
      fahuodate: e.detail.value,
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


  //选择物流方式
  radioChange: function (e) {
    this.setData({
      deliveryId: e.detail.value,
      logisticsId: ''
    })
  },

  //确认配送单
  delisure(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否确认该订单',
      success(res) {
        if (res.confirm) {
          that.delisureRequest(id)
        }
      }
    })

  },

  delisureRequest: function (id) {
    let that = this;
    wx.showLoading({
      title: '确认中',
    })
    wxrequest.ensurePlatDelivery(id).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '配送单确认成功!',
        })
        that.delivList();
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }

    }).catch(err => {
      wx.hideLoading();
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },


  //获取功能区
  hotelFunctionList: function () {
    let that = this;
    let linkData = {
      isNeedRmsv: 1,
      hotelId: wx.getStorageSync('hotelId'),
    }
    wxrequest.hotelFunctionList(linkData).then(res => {
      let resdata = res.data;

      if (resdata.code == 0) {
        let nowfunctionList = resdata.data.records.map(item => {
          return {
            id: item.id,
            funcCnName: item.funcCnName
          }
        })
        let functionAll = {
          id: '',
          funcCnName: '全部'
        };
        nowfunctionList.unshift(functionAll)
        that.setData({
          functionList: nowfunctionList
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })

  },

  //选择功能区
  bindPickerFun: function (e) {
    let index = e.detail.value;
    this.setData({
      funcIndex: index,
      funcId: this.data.functionList[index].id,
      funcName: this.data.functionList[index].funcCnName,
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
    this.delivList()
  },


  //重置
  reset: function () {
    this.setData({
      orderStatusIndex: '',
      orderStatusId: '',
      deliveryCode: '',
      funcId: '',
      funcIndex: '',
      date: '',
      date2: '',
      pageNum: 1,
    })
    this.delivList()
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



