// pages/bindcabinet/bindcabinet.js
const app = getApp()
let apiUrl = app.getApiUrl();
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
Page({

  /**
   * 页面的初始数据
   */
  data: {
    floorval:"",
    housenumberval:"",
    iotcartval:"",
    qrcode:'',  //二维码
    cabinethao:null,  //物联卡
    hotelid:"",  //酒店id
    wifiname:"", //wifi名称
    wifipassword: "", //wifi密码
    latticecount:"",  //格子数
    saomainfo:"",  //扫码信息
    flag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hotelId = wx.getStorageSync("hotelid")
    // this.setData({
    //   qrcode: options.guizicode,
    //   // cabinethao: options.guizinumber,
    //   hotelid: hotelId
    // })
    let nowqrcode=parseInt(Math.random() * 200 + 1355) 
    this.setData({
      // qrcode: nowqrcode,
      qrcode: options.guizicode
    })
    console.log(this.data.qrcode)

  },


  yanzhengcode: function () {
    let that = this;

    wx.request({
      url: apiUrl + '/cabinet/ccid',
      data: {
        ccid: that.data.iotcartval,
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res.data.data)
          if (res.data.data == 1) {
          } else if (res.data.data == 0) {

          } else if (res.data.data == 2) {
            alerttishi("提示","物联卡号已被使用", function () {
              that.setData({
                cabinethao:""
              })
            });
          }
        }else{
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
  Loufloor:function(e){
    this.setData({
      floorval: e.detail.value
    })
  },
  Housenumber: function (e) {
    this.setData({
      housenumberval: e.detail.value
    })
  },
  Iotcart: function (e) {
    this.setData({
      iotcartval: e.detail.value
    })
  },
  wifiname: function (e) {
    this.setData({
      wifiname: e.detail.value
    })
  },
  wifipass: function (e) {
    this.setData({
      wifipassword: e.detail.value
    })
  },
  gezishu: function (e) {
    this.setData({
      latticecount: parseFloat(e.detail.value)
    })
  },
  testingniu:function(){
    let that=this;
    if (that.data.floorval.length<1){
      alerttishi("提示", "请填写酒店楼层", function () {
      });
      return;
    }

    if (that.data.housenumberval.length < 1){
      alerttishi("提示", "请填写房号", function () {
      });
      return;
    }

    if (that.data.iotcartval.length < 1) {
      alerttishi("提示", "请填写物联卡号", function () {
      });
      return;
    }
    if (that.data.wifiname.length < 1) {
      alerttishi("提示", "请填写WiFi名称", function () {
      });
      return;
    }
    if (that.data.wifipassword.length < 1) {
      alerttishi("提示", "请填写WiFi密码", function () {
      });
      return;
    }
    if (isNaN(that.data.latticecount)){
       alerttishi("提示", "格子数请输入数字", function () {
      });
      return;
    }
    if (that.data.latticecount < 1) {
      alerttishi("提示", "请填写格子数", function () {
      });
      return;
    }
    if (that.data.latticecount > 12) {
      alerttishi("提示", "格子数不能大于12", function () {
      });
      return;
    } 
    if (that.data.latticecount == 0) {
      alerttishi("提示", "格子数不能为0", function () {
      });
      return;
    }
    if(that.data.flag==true){
      that.setData({
        flag:false
      })
      wx.request({
        url: apiUrl + '/cabinet/room',
        data: {
          roomCode: that.data.housenumberval,
          hotelId: wx.getStorageSync("hotelid"),
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("Token")
        },
        method: "GET",
        success: function (res) {
          that.setData({
            flag: true
          })
          if (res.data.code == 0) {
            if (res.data.data == true) {
              wx.navigateTo({
                url: '../cabinet/cabinet?saomainfo=' + that.data.qrcode + '&guiziid=' + "" + '&floorval=' + that.data.floorval + '&housenumberval=' + that.data.housenumberval + '&iotcartval=' + that.data.iotcartval + '&wifiname=' + that.data.wifiname + '&wifipassword=' + that.data.wifipassword + '&latticecount=' + that.data.latticecount,
              })
            }
          }
          if (res.data.status == 404) {
            alerttishi("提示", res.data.message, function () {
            });
          }
        },
        fail: function (err) {
          that.setData({
            flag: true
          })
          console.log(err)
        }
      });
    }
    
  }
})