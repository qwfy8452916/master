// pages/wifi/wifi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log("成功")
      }
    })

  },



  //点击链接
  connect:function(){
    let that=this;
    that.connectWifi()
    that.startWifi()
  },


  connectWifi: function () {

    var that = this;

    //检测手机型号

    wx.getSystemInfo({

      success: function (res) {

        var system = '';

        if (res.platform == 'android') system = parseInt(res.system.substr(8));

        if (res.platform == 'ios') system = parseInt(res.system.substr(4));

        if (res.platform == 'android' && system < 6) {

          wx.showToast({

            title: '手机版本不支持',

          })

          return

        }

        if (res.platform == 'ios' && system < 11.2) {

          wx.showToast({

            title: '手机版本不支持',

          })

          return

        }
      }
    })
  },


  //初始化 Wi-Fi 模块

  startWifi: function () {

    var that = this

    wx.startWifi({

      success: function (res) {
        console.log(res.errMsg)

        //请求成功连接Wifi

        that.Connected();

      },

      fail: function (res) {
        console.log(res)

        // this.setData({

          wx.showToast({

            title: '接口调用失败',

          })

        // });

      }

    })

  },


// 连接已知Wifi

Connected: function () {
  console.log(22)

    var that = this

    wx.connectWifi({

      SSID: that.data.accountNumber,

      BSSID: that.data.bssid,

      password: that.data.password,

      success: function (res) {

        wx.showToast({

          title: 'wifi连接成功',

        })

      },

      fail: function (res) {

        wx.showToast({

          title: 'wifi连接失败',

        })

      }

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