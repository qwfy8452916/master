const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId;
let token = app.globalData.token;
let organizationid = app.globalData.organizationid;

function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx2my.showModal({
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
    nowfloorlc: 1,
    deliFloor: '',
    //配送类层
    selectFloor: "",
    floordataactive: [true, false, false, false, false, false, false, false, false, false],
    floordata: [],
    //楼层信息
    typedata: ["补货", "换货", "取货"],
    typedataactive: [true, false, false],
    roomFloor: '',
    //房间号
    floordatalist: [],
    //楼层补货信息
    floortotal: null,
    //楼层总计
    deliverydata: "",
    //配送数据
    gaodu: 530,
    Tabindex: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let hotelId = wx2my.getStorageSync("hotelid");
    that.getfloor(hotelId);
    // let popup = this.selectComponent("#tabbar");

    if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      });
    } else {
      that.setData({
        Tabindex: 3
      });
    }

    // popup.dabdata();
    // popup.tabzhixing(that.data.Tabindex);
  },
  //获取楼层信息
  getfloor: function (hotelId) {
    let that = this;
    wx2my.request({
      url: apiUrl + '/order/delivery/wx/roomFloor',
      data: {
        hotelId: hotelId
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          if (res.data.data.length < 1) {
            that.setData({
              isHide: true
            });
          }

          that.setData({
            floordata: res.data.data
          });
          let nowfloordataactive = [];

          for (var i = 0; i < res.data.data.length; i++) {
            // if(i==0){
            //   nowfloordataactive.push(true)
            // }else{
            //   nowfloordataactive.push(false)
            // }
            if (that.data.selectFloor != 0) {
              if (that.data.selectFloor == res.data.data[i]) {
                nowfloordataactive[i] = true;
              } else {
                nowfloordataactive[i] = false;
              }

              console.log(nowfloordataactive);
            } else {
              if (i == 0) {
                nowfloordataactive[i] = true;
              } else {
                nowfloordataactive[i] = false;
              }

              console.log(nowfloordataactive);
            }
          }

          that.setData({
            floordataactive: nowfloordataactive
          });
        } else if (res.statusCode == 404) {
          alertViewWithCancel("提示", res.data.message, function () {});
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {});
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {});
      }
    });
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
    let nowfloor = wx2my.getStorageSync("deliFloor") || 0;

    if (nowfloor != 0) {
      that.setData({
        authzData: wx2my.getStorageSync('buttondata'),
        selectFloor: nowfloor,
        deliFloor: nowfloor,
        isHide: true
      });
      this.getdata();
    } else {
      that.setData({
        authzData: wx2my.getStorageSync('buttondata'),
        selectFloor: 0,
        deliFloor: '',
        isHide: false
      });
    }

    wx2my.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight); //设置map高度，根据当前设备宽高满屏显示

        that.setData({
          gaodu: res.windowHeight * 2 - 150
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  selectlouceng: function (e) {
    this.setData({
      isHide: false
    });
  },
  yinying: function () {
    this.setData({
      isHide: true
    });
  },
  flooritem: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let newfloor = e.currentTarget.dataset.floor;
    let nowfloordata = [];

    for (var i = 0; i < that.data.floordata.length; i++) {
      nowfloordata.push(false);
    }

    for (var i = 0; i < nowfloordata.length; i++) {
      if (i == index) {
        nowfloordata[index] = true;
      } else {
        nowfloordata[i] = false;
      }
    }

    wx2my.setStorageSync("deliFloor", newfloor);
    wx2my.request({
      url: apiUrl + '/order/delivery/rountine',
      data: {
        roomFloor: e.currentTarget.dataset.floor,
        hotelId: wx2my.getStorageSync("hotelid"),
        status: 1
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          console.log(res.data.data.records);
          that.setData({
            floordataactive: nowfloordata,
            isHide: true,
            deliverydata: res.data.data.records
          });
          console.log(that.data.deliverydata);
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {});
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {});
      }
    });
  },
  getdata: function () {
    let that = this;
    wx2my.request({
      url: apiUrl + '/order/delivery/rountine',
      data: {
        roomFloor: that.data.deliFloor,
        // roomFloor:'2',
        hotelId: wx2my.getStorageSync("hotelid"),
        status: 1
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          console.log(res.data.data.records);
          that.setData({
            isHide: true,
            deliverydata: res.data.data.records
          });
          console.log(that.data.deliverydata);
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {});
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {});
      }
    });
  },
  delivereddetail: function (e) {
    let id = e.currentTarget.dataset.id;
    let delivtype = e.currentTarget.dataset.delivtype;
    wx2my.navigateTo({
      url: '../delivereddetail/delivereddetail?id=' + id + '&delivtype=' + delivtype
    });
  },
  deliveredrecord: function (e) {
    wx2my.navigateTo({
      url: '../conplatedelivered/conplatedelivered'
    });
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
    wx2my.navigateTo({
      url: '../buhuolist/buhuolist'
    });
  }
});