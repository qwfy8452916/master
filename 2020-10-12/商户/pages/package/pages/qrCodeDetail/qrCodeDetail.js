// pages/package/pages/qrCodeDetail/qrCodeDetail.js
const app = getApp()
let apiUrl = app.globalData.requestUrl;
let hotelid = app.globalData.hotelId
let token = app.globalData.token

function alerttishi(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    cancelColor: "#ff9700",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    commoditygai: {},
    form: {
      isVisual: 1, //类型
      remark: '', //备注
    },
    fictitiousdata: [],  //进场配置数据




    floorName: '',
    codeName: '',
    bindAreaData: [],
    bindAreaId: '',
    areaInex: '',

    floorval: "",
    housenumberval: "",
    hotelid: "",  //酒店id
    wifiname: "", //wifi名称
    wifipassword: "", //wifi密码

    flag: true,


    xunicabId: '',  //虚拟柜子配置id

    wifiIndex: '',
    wifiDataList: [],
    isAuthLocation: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      id: options.id
    })


    this.getCabinetConfig();
    this.basicDataItems();


  },


  //加载数据
  getdata: function () {
    let that = this;
    wx.request({
      url: apiUrl + 'cabinet/' + that.data.id,
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      method: "GET",
      success: function (res) {
        let resdata = res.data;
        if (resdata.code == 0) {

          that.setData({
            commoditygai: resdata.data,
            'form.isVisual': resdata.data.isVisual,
            bindAreaId: resdata.data.bindAreaFlag,
            floorval: resdata.data.roomFloor,
            housenumberval: resdata.data.roomCode,
            xunicabId: resdata.data.enterSettingId,
            wifiname: resdata.data.wifiSsid,
            wifipassword: resdata.data.wifiPassword,
            'form.remark': resdata.data.remark
          })



          that.data.bindAreaData.map((item, index) => {

            if (item.id == that.data.bindAreaId) {
              that.setData({
                areaInex: index,
              })
            }
            if (that.data.bindAreaId === 0) {
              that.setData({
                floorName: "楼层",
                codeName: "地点"
              })
            } else if (that.data.bindAreaId === 1) {
              that.setData({
                floorName: "楼层",
                codeName: "房间号"
              })
            } else if (that.data.bindAreaId === 2) {
              that.setData({
                floorName: "区域",
                codeName: "桌号"
              })
            } else {
              that.setData({
                floorName: "区域",
                codeName: "地点"
              })
            }

          })

          that.data.fictitiousdata.map((item, index) => {

            if (item.id == that.data.xunicabId) {
              that.setData({
                index: index,
              })
            }
          })

        } else {
          wx.showToast({
            title: resdata.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (err) {
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },


  //绑定类型 - 字典表
  basicDataItems: function () {
    let that = this;
    wx.request({
      url: apiUrl + 'basic/dict/items',
      data: {
        key: 'BIND_AREA_FLAG',
        orgId: '0',
        parentKey: '',
        parentValue: ''
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        let resdata = res.data;
        let nowbindAreaData = resdata.data.map(item => {
          return {
            id: parseInt(item.dictValue),
            name: item.dictName
          }
        })
        that.setData({
          bindAreaData: nowbindAreaData
        })
        that.getdata();
      },
      fail: function (err) {
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },


  //进场配置
  getCabinetConfig: function () {
    let that = this;
    wx.request({
      url: apiUrl + 'cab/enter/setting/hotel',
      data: {
        hotelId: wx.getStorageSync("hotelId"),
        all: wx.getStorageSync("hotelId") ? 1 : '',
        cabType: '04',
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          that.setData({
            fictitiousdata: res.data.data
          })
        } else {
          alerttishi("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });
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

  },






})