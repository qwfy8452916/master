// pages/ownDeliveryDetail/ownDeliveryDetail.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {},
    detailId:'',
    shuzhanJudge:true,
    deliveryDateDetail:{}, //配送详情数据
    diajudge:false,
    fahuojudge:false,
    firstOrder: true,
    deliveryId: '', //物流方式
    logisticsList: [], //物流数据
    logisticsIndex: '',
    logisticsId: '', //物流id
    wlcompany: '', //物流公司
    wlcode: '', //物流单号
    fahuodate: '', //发货时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       detailId: options.id,
       authzData: wx.getStorageSync('pageAuthority')
     })
    this.platDeliveryDetail(options.id);
    this.getLgcList();
  },


  //获取配送单详情
  platDeliveryDetail:function(id){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.platDeliveryDetail(id).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
         that.setData({
           deliveryDateDetail:resdata.data
         })
        console.log(that.data.deliveryDateDetail)
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000
        })
      }
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },


  //点击弹窗
  fahuo: function (e) {
    let that = this;
    let delivway = e.currentTarget.dataset.delivway;
    if (delivway == 7) {
      that.setData({
        firstOrder: true,
        pdId: e.currentTarget.dataset.id,
        fahuojudge: true,
        deliveryId: '',
        logisticsId: '',
        logisticsIndex: '',
        wlcompany: '',
        wlcode: '',
        fahuodate: '',
      })
    } else {
      that.setData({
        pdId: e.currentTarget.dataset.id,
        diajudge: true,
        deliveryId: '',
        logisticsId: '',
        logisticsIndex: '',
        wlcompany: '',
        wlcode: '',
        fahuodate: '',
      })

    }
  },

  //选择物流方式
  radioChange: function (e) {
    this.setData({
      deliveryId: e.detail.value,
      logisticsId: ''
    })
  },

  //非外卖取消
  fahuocancel: function () {
    this.setData({
      diajudge: false,
    })
  },

  //非外卖发货
  delivfahuo: function () {
    let that = this;
    if (!that.data.wlcompany.toString()) {
      wx.showToast({
        title: '请填写物流公司',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!that.data.wlcode.toString()) {
      wx.showToast({
        title: '请填写快递单号',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (!that.data.fahuodate.toString()) {
      wx.showToast({
        title: '请选择发货时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    let linkData = {
      deliveryId: that.data.pdId,
      logistics: that.data.wlcompany,
      logisticsCode: that.data.wlcode,
      shipmentsTime: that.data.fahuodate,
    };
    wx.showLoading({
      title: '请求中',
    })
    wxrequest.shipmentsPlatDelivery(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '配送单发货成功！',
          icon: 'none',
          duration: 2000
        })
        that.delivList();
        this.setData({
          diajudge: false,
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

  //发货时间
  bindDateChangefh(e) {
    this.setData({
      fahuodate: e.detail.value,
    })
  },

  //取消发货
  fahuocan: function () {

    this.setData({
      fahuojudge: false
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
        wx.redirectTo({
          url: '../ownDeliveryList/ownDeliveryList',
        })
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

  //确认发货
  fahuosure: function () {
    let that = this;
    if (!that.data.deliveryId.toString().length) {
      wx.showToast({
        title: '请选择配送方式',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (that.data.deliveryId == 2) {
      that.setData({
        logisticsId: -99
      })
    } else {
      if (!that.data.logisticsId.toString().length) {
        wx.showToast({
          title: '请选择物流',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    if (that.data.firstOrder) {
      let linkData = {
        deliveryId: that.data.pdId,
        lgcHotelId: that.data.logisticsId,
      }
      wx.showLoading({
        title: '请求中',
      })
      wxrequest.shipmentsPlatDelivery(linkData).then(res => {
        wx.hideLoading()
        let resdata = res.data;
        if (resdata.code == 0) {
          wx.showToast({
            title: '配送单发货成功！',
            icon: 'none',
            duration: 2000
          })
          that.delivList();
          this.setData({
            fahuojudge: false,
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
    } else {
      let linkData = {
        orderDelivId: that.data.nowDelivCode,
        hotelLgcId: that.data.logisticsId,
      }
      wx.showLoading({
        title: '请求中',
      })
      wxrequest.againShipmentsDelivery(linkData).then(res => {
        wx.hideLoading()
        let resdata = res.data;
        if (resdata.code == 0) {
          wx.showToast({
            title: '重新发单成功！',
            icon: 'none',
            duration: 2000
          })
          that.delivList();
          this.setData({
            fahuojudge: false,
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
    }
  },

  //重新发单
  againShipmentsDelivery: function (e) {
    this.setData({
      nowDelivCode: e.currentTarget.dataset.delivcode,
      fahuojudge: true,
      firstOrder: false,
    })
  },


  //更新状态
  updateLgcStatus(e) {
    let that = this;
    let delivCode = e.currentTarget.dataset.delivcode;
    let linkData = {
      delivCode: delivCode
    }
    wx.showLoading({
      title: '更新中',
    })
    wxrequest.updateLgcStatus(linkData).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '更新状态成功！',
          icon: 'none',
          duration: 2000
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
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },


  //物流公司
  inputwlcompany: function (e) {
    this.setData({
      wlcompany: e.detail.value
    })
  },

  //快递单号
  inputwlcode: function (e) {
    this.setData({
      wlcode: e.detail.value
    })
  },

  //获取指定酒店的全部外部物流
  getLgcList() {
    let that = this;
    let linkData = {
      hotelId: wx.getStorageSync('hotelId')
    }
    wxrequest.getLgcList(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowlogisticsList = [];
        if (resdata.data.length != 0) {
          nowlogisticsList = resdata.data.map(item => {
            return {
              id: item.id,
              logisticsName: item.lgcName
            }
          })
        }
        that.setData({
          logisticsList: nowlogisticsList,
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

  //选择物流
  bindPickerlogistics: function (e) {
    let that = this;
    let index = e.detail.value;
    that.setData({
      logisticsIndex: index,
      logisticsId: that.data.logisticsList[index].id
    })
  },

  shuzhan:function(){
     this.setData({
       shuzhanJudge: !this.data.shuzhanJudge
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})