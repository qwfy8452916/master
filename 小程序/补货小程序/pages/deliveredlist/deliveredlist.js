
const app = getApp()
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId
let token = app.globalData.token
let organizationid = app.globalData.organizationid
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide: false,
    floorlc: "",  //楼层
    nowfloorlc: 1,
    floordataactive: [true, false, false, false, false, false, false, false, false, false],
    floordata: [],  //楼层信息
    typedata: ["补货", "换货", "取货"],
    typedataactive: [true, false, false],
    roomFloor: '', //房间号
    floordatalist: [],  //楼层补货信息
    floortotal: null,  //楼层总计
    housedata: "",  //房间数据
    gaodu:530,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let hotelId = wx.getStorageSync("hotelid")
    that.getfloor(hotelId)

  },

  //获取楼层信息
  getfloor: function (hotelId) {
    let that = this;
    wx.request({
      url: apiUrl + '/repl/cab/hotel/floor',
      data: {
        hotelId: hotelId
      },
      header: {
        'content-type': 'application/json',
        'Authorization': token
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          if (res.data.data.length < 1) {
            that.setData({
              isHide: true
            })
          }
          that.setData({
            floordata: res.data.data
          })
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          gaodu: res.windowHeight * 2 - 124
        })
      }
    })
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
  selectlouceng: function (e) {
  
    this.setData({
      isHide: false
    })
  },

  yinying: function () {
    this.setData({
      isHide: true
    })
  },


  flooritem: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowfloordata = [false, false, false, false, false, false, false, false, false, false]
    for (var i = 0; i < nowfloordata.length; i++) {
      if (i == index) {
        nowfloordata[index] = true
      } else {
        nowfloordata[i] = false

      }
    }

    wx.request({
      url: apiUrl + '/repl/cab/floor',
      data: { roomFloor: e.currentTarget.dataset.floor },
      header: {
        'content-type': 'application/json',
        'Authorization': token
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            floordataactive: nowfloordata,
            isHide: true,
            floorlc: e.currentTarget.dataset.floor,
            housedata: res.data.data
          })
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }

      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })

    that.getfloorcount(e);
  },

  //获取楼层补货信息总计

  getfloorcount: function (e) {
    let that = this;
    wx.request({
      url: apiUrl + '/repl/cab/floor/code',
      data: { roomFloors: e.currentTarget.dataset.floor },
      header: {
        'content-type': 'application/json',
        'Authorization': token
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            floortotal: res.data.data
          })
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }

      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

  housedetail: function (e) {

    wx.navigateTo({
      url: '../housebulist/housebulist?roomCode=' + e.currentTarget.dataset.roomcode,
    })
  },
  testingniu: function () {
    // let that = this;
    // wx.scanCode({
    //   success(res) {
    //     nowsaomadata = res.result
    //     let nowsaomadata = JSON.parse(nowsaomadata)
    //     wx.navigateTo({
    //       url: '../buhuolist/buhuolist?guizicode=' + nowsaomadata.id
    //     })
    //   }
    // })

    wx.navigateTo({
      url: '../buhuolist/buhuolist',
    })
  }
})