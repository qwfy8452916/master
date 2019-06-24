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
    floorval: "",  //楼层
    housenumberval: "",  //房号
    iotcartval: "",   //物联卡code
    cabinetid:null,   //柜子id
    saomainfo:null,   //扫码信息
    wifiname: "", //wifi名称
    wifipassword: "", //wifi密码
    niujudge:true,   //检测显示按钮
    latticecount:'',  //格子数
    flag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that=this;
    if (options.panudan==="true"){
      that.setData({
        niujudge:true
      })
    } else if (options.panudan === "false"){
      that.setData({
        niujudge: false
      })
    }
    that.setData({
      cabinetid: options.guiziid,
      saomainfo:options.guizicode,
    })
    that.getdatainfo();
    console.log(that.data.niujudge)

    // wx.request({
    //   url: apiUrl + '/cabinet/' + options.cabinetid,
    //   header: {
    //     'content-type': 'application/json',
    //     'Authorization': wx.getStorageSync("Token")
    //   },
    //   method: "GET",
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.setData({
    //         startiotcart: res.data.data.cabinetIot,
    //         floorval: res.data.data.roomFloor,
    //         housenumberval: res.data.data.roomCode,
    //         iotcartval: res.data.data.cabinetIot,
    //         wifiname: res.data.data.wifiSsid,
    //         wifipassword: res.data.data.wifiPassword,
    //       })
    //     }
    //   }
    // });
    

  },

  //根据ID获取柜子详情

   getdatainfo:function(){
     let that=this;
     wx.request({
       url: apiUrl + '/cabinet/' + that.data.cabinetid,
       header: {
         'content-type': 'application/json',
         'Authorization': wx.getStorageSync("Token")
       },
       method: "GET",
       success: function (res) {
         if (res.data.code == 0) {
           console.log(res.data.data.roomFloor)
           that.setData({
             floorval: res.data.data.roomFloor,
             housenumberval: res.data.data.roomCode,
             iotcartval: res.data.data.cabinetIot,
             wifiname: res.data.data.wifiSsid,
             wifipassword: res.data.data.wifiPassword,
             latticecount: res.data.data.latticeAmount,
           })
         }else{
           alerttishi("提示", res.data.message, function () {
           });
         }
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
  Loufloor: function (e) {
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
    let that=this;
    console.log(11)
    this.setData({
      iotcartval: e.detail.value
    })
    // if (e.detail.value != that.data.startiotcart) {
    //   this.setData({
    //     iotcartval: e.detail.value,
    //     niujudge:false
    //   })
    // }else{
    //   this.setData({
    //     iotcartval: e.detail.value,
    //     niujudge: true
    //   })
    // }
    
    
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

//验证物联卡

yanzhengcode:function(){
  let that=this;

  wx.request({
    url: apiUrl + '/cabinet/ccid',
    data: {
      cabId: that.data.cabinetid,
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
         if(res.data.data==1){
           that.setData({
              niujudge:false
          })
         } else if (res.data.data == 0){
           that.setData({
             niujudge: true
           })
         } else if (res.data.data == 2){
           alerttishi("提示", "物联卡号已被使用", function () {
             that.setData({
               iotcartval: ""
             })
           });
         }
      }
    },
    fail: function (error) {
      alerttishi("提示", error, function () {
      });
    }
  });
},
 



  sureniu: function () {
    let that = this;
    console.log("确定")
    if (that.data.floorval.length < 1) {
      alerttishi("提示", "请填写酒店楼层", function () {
      });
      return;
    } 
    // else if (isNaN(that.data.floorval)) {
    //   alerttishi("提示", "酒店楼层请填写数字", function () {
    //   });
    //   return;
    // }
    if (that.data.housenumberval.length < 1) {
      alerttishi("提示", "请填写房号", function () {
      });
      return;
    }
    //  else if (isNaN(that.data.housenumberval)) {
    //   alerttishi("提示", "房号请填写数字", function () {
    //   });
    //   return;
    // }
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
    if (isNaN(that.data.latticecount)) {
      alerttishi("提示", "格子数请输入数字", function () {
      });
      return;
    }
    if (that.data.latticecount < 1) {
      alerttishi("提示", "请填写格子数", function () {
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
          cabId: that.data.cabinetid
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
            that.sureupdate()
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

  },

  //确定更新
  sureupdate:function(){
    let that=this;
    wx.request({
      url: apiUrl + '/cabinet/' + that.data.cabinetid,
      data: {
        roomFloor: that.data.floorval,
        roomCode: that.data.housenumberval,
        cabinetIot: that.data.iotcartval,
        // cabinetQrcode: that.data.qrcode,
        hotelId: wx.getStorageSync("hotelid"),
        wifiSsid: that.data.wifiname,
        wifiPassword: that.data.wifipassword,
        latticeAmount: that.data.latticecount,
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "PUT",
      success: function (res) {
        if (res.data.code == 0) {
          console.log(res)
          let id = res.data.data
          if (id != 0) {
            wx.navigateTo({
              url: '../cabinetlist/cabinetlist'
            })
          } else {
            alerttishi("提示", "系统异常", function () {
            });
          }

        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });

  },


  //去检测

  testingniu: function () {
    let that = this;

    if (that.data.floorval.length < 1) {
      alerttishi("提示", "请填写酒店楼层", function () {
      });
      return;
    }
    if (that.data.housenumberval.length < 1) {
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
    if (isNaN(that.data.latticecount)) {
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
          cabId: that.data.cabinetid
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
                url: '../cabinet/cabinet?saomainfo=' + that.data.saomainfo + '&guiziid=' + that.data.cabinetid + '&floorval=' + that.data.floorval + '&housenumberval=' + that.data.housenumberval + '&iotcartval=' + that.data.iotcartval + '&wifiname=' + that.data.wifiname + '&wifipassword=' + that.data.wifipassword + '&latticecount=' + that.data.latticecount,
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
   
  },


})

