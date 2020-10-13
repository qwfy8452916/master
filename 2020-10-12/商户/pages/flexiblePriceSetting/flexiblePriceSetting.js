// pages/buhuolist/buhuolist.js

const app = getApp()
import wxrequest from '../../utils/api'
let hotelId = wx.getStorageSync("hotelId");
let token = wx.getStorageSync("token");

app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    showSelect: false,
    hotelData: "",
    adaptHighestMoney: "", //弹性最高金额范围
    adaptLowestMoney: "", //弹性最低金额范围
    adaptHighestPercent: "", //弹性最高百分比范围
    adaptLowestPercent: "", //弹性最低百分比范围
    isAdaptByMoney: "", //是否支持加价金额方式： 0 = 否，1=是
    isAdaptByPercentage: "", //是否支持加价百分比方式： 0 = 否，1=是
    startPercent: "",
    startAcount: "",
    imgUrl: "", //二维码
    formdata: {
      cardName: '', //卡券名称
      scenId: '', //使用场景id
      scenName: '', //场景名
      index: '',
    },
    scenData: [],
  },
  //获取酒店数据
  getHotelData: function (id) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getHotelDetail(id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        that.setData({
          hotelData: resdata.data,
          adaptHighestMoney: resdata.data.adaptHighestMoney,
          adaptLowestMoney: resdata.data.adaptLowestMoney,
          adaptHighestPercent: resdata.data.adaptHighestPercent,
          adaptLowestPercent: resdata.data.adaptLowestPercent,
          isAdaptByMoney: resdata.data.isAdaptByMoney,
          isAdaptByPercentage: resdata.data.isAdaptByPercentage
        })
        if (resdata.data.isAdaptByMoney == 1 && resdata.data.isAdaptByPercentage == 1) {
          this.setData({
            'formdata.index': '0',
            'formdata.scenId': '0',
            'formdata.scenName': '加价百分比',
          })
          let nowscenData = [{
            dictName: "加价百分比",
            dictValue: "0",
          }, {
            dictName: "加价金额",
            dictValue: "1",
          }]
          this.setData({
            scenData: nowscenData
          })
          this.setData({
            showSelect: true,
          })
        }
        if (resdata.data.isAdaptByMoney == 1 && resdata.data.isAdaptByPercentage == 0) {
          this.setData({
            'formdata.index': '0',
            'formdata.scenId': '0',
            'formdata.scenName': '加价金额',
          })
          let nowscenData = [{
            dictName: "加价金额",
            dictValue: "0",
          }]
          this.setData({
            scenData: nowscenData
          })
          this.setData({
            showSelect: false,
          })
        }
        if (resdata.data.isAdaptByMoney == 0 && resdata.data.isAdaptByPercentage == 1) {
          this.setData({
            'formdata.index': '0',
            'formdata.scenId': '0',
            'formdata.scenName': '加价百分比',
          })
          let nowscenData = [{
            dictName: "加价百分比",
            dictValue: "0",
          }]
          this.setData({
            scenData: nowscenData
          })
          this.setData({
            showSelect: false,
          })
        }

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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;
    that.getHotelData(wx.getStorageSync("hotelId"));
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

  },

  startPercent(e) {
    let positiveInteger = /^(0|[1-9][0-9]*|-[1-9][0-9]*)$/;
    if (!positiveInteger.test(e.detail.value)) {
      wx.showToast({
        title: "输入错误，请重新输入",
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        startPercent: e.detail.value
      })


    }
  },
  startAcount(e) {
    let money = /(^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$)/;
    if (!money.test(e.detail.value)) {
      wx.showToast({
        title: "输入错误，请重新输入",
        icon: 'none',
        duration: 2000
      })
    } else {
      this.setData({
        startAcount: e.detail.value
      })
    }
  },
  //删除条件

  //使用场景
  bindPickerChange: function (e) {
    let that = this;
    this.setData({
      'formdata.index': e.detail.value,
      'formdata.scenId': that.data.scenData[e.detail.value].dictValue,
      'formdata.scenName': that.data.scenData[e.detail.value].dictName,
    })
  },
  adaptSettingSubmit() {
    let name = this.data.formdata.scenName;
    let bookAdaptSettingDTO = {
      adaptPrice: "",
      adaptPriceType: "",
      hotelId: wx.getStorageSync("hotelId"),
    }

    if (name == "加价百分比") {
      if (this.data.startPercent != "") {
        if (this.data.startPercent > this.data.adaptHighestPercent || this.data.startPercent < this.data.adaptLowestPercent) {
          wx.showToast({
            title: "不在设置范围",
            icon: 'none',
            duration: 2000
          })
          this.setData({
            startPercent: ""
          })
          return ;
        } else {
          bookAdaptSettingDTO.adaptPriceType = 1;
          bookAdaptSettingDTO.adaptPrice = this.data.startPercent;
          this.adaptSetting(bookAdaptSettingDTO)
        }

      } else {
        wx.showToast({
          title: "请输入加价比例！",
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      if (this.data.startAcount != "") {
        if (this.data.startAcount > this.data.adaptHighestMoney || this.data.startAcount < this.data.adaptLowestMoney) {
          wx.showToast({
            title: "不在设置范围",
            icon: 'none',
            duration: 2000
          })
          this.setData({
            startAcount: ""
          })
          return ;
        } else {
          bookAdaptSettingDTO.adaptPriceType = 2;
          bookAdaptSettingDTO.adaptPrice = this.data.startAcount;
          this.adaptSetting(bookAdaptSettingDTO)
        }

      } else {
        wx.showToast({
          title: "请输入金额！",
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  //设置弹性
  adaptSetting: function (data) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.adaptSetting(data).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: "设置成功",
          icon: 'none',
          duration: 2000
        })
        // console.log(resdata, "111")
        this.setData({
          imgUrl: resdata.data
        })
        wx.navigateTo({
          url: '../qrcodesetting/qrcodesetting?imgUrl=' + resdata.data,
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
  //

})