// pages/bindcabinet/bindcabinet.js
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
    floorName:'',
    codeName:'',
    bindAreaData:[
      { name:"无绑定",id:0},
      { name: "房间", id: 1 },
      { name: "餐桌", id: 2 },
      { name: "定点", id: 3 },
    ],
    bindAreaId:'',
    areaInex:'',
    
    floorval: "",
    housenumberval: "",
    iotcartval: "",  //物联卡
    qrcode: '',  //二维码
    cabinethao: null,
    hotelid: "",  //酒店id
    wifiname: "", //wifi名称
    wifipassword: "", //wifi密码
    latticecount: "",  //格子数
    saomainfo: "",  //扫码信息
    flag: true,
    fictitious: '',  //判断是否虚拟柜子 0实体 1虚拟
    getcabType: '',  //得到柜子类型 
    pageLayout:'', //得到柜子布局
    testingniutext: '去检测',
    fictitiousdata: [],  //虚拟柜子配置数据
    xunicabId: '',  //虚拟柜子配置id
    isPowerFailure: 0,   //是否断电 0没有断电 1断电
    approachData: [], //进场配置信息
    approachId: '', //进场配置id

    wifiIndex: '',
    wifiDataList: [],
    isAuthLocation: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWifiData();


    console.log(options)
    let hotelId = wx.getStorageSync("hotelid")
    // this.setData({
    //   qrcode: options.guizicode,
    //   // cabinethao: options.guizinumber,
    //   hotelid: hotelId
    // })
    // let nowqrcode=parseInt(Math.random() * 200 + 1355) 
    // if (options.fictitious=='02'){
    //   this.setData({
    //     latticecount: 0,
    //     testingniutext:'创建'
    //   })
    // } else if (options.fictitious == '01'){
    //   this.setData({
    //     testingniutext: '去检测'
    //   })
    // }
    this.setData({
      // qrcode: nowqrcode,
      qrcode: options.guizicode,
      getcabType: options.fictitious
    })
    console.log(this.data.qrcode)
    this.getccid();
    this.getcabtype(options.fictitious);
    this.getCabinetConfig();
    this.getapproachData();

  },



  //进场配置信息
  getapproachData: function () {
    let that = this;
    wx.request({
      url: apiUrl + 'cab/enter/setting/hotel',
      data: {
        hotelId: wx.getStorageSync("hotelId"),
        all: 1,
        cabType: that.data.getcabType
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
            approachData: res.data.data
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


  getCabinetConfig: function () {
    let that = this;
    wx.request({
      url: apiUrl + 'cabinet/setting/hotel',
      data: {
        hotelId: wx.getStorageSync("hotelId"),
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

  bindPickerChange2: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      index: e.detail.value,
      xunicabId: that.data.fictitiousdata[index].id,
    })
  },

  //选择进场配置
  bindPickerChange3: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      index2: e.detail.value,
      approachId: that.data.approachData[index].id,
    })
  },

  switch1Change: function (e) {
    console.log(typeof e.detail.value)
    let nowisPowerFailure
    if (e.detail.value === true) {
      nowisPowerFailure = 1
    } else if (e.detail.value === false) {
      nowisPowerFailure = 0
    }
    this.setData({
      isPowerFailure: nowisPowerFailure
    })
  },

  getccid: function () {
    let that = this;
    wx.request({
      url: apiUrl + 'cabinet/vaild/ccid',
      data: {
        cabCode: that.data.qrcode,
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
            iotcartval: res.data.data
          })
        } else{
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

  getcabtype: function (strtype) {
    let that = this;
    wx.request({
      url: apiUrl + 'basic/cabType',
      data: {
        cabType: strtype,
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
            getcabType: res.data.data.cabType,
            latticecount: res.data.data.latticeCount,
            fictitious: res.data.data.virtualFlag,
            pageLayout: res.data.data.pageLayout,
          })

          if (that.data.fictitious == '1') {
            that.setData({
              // latticecount: 0,
              testingniutext: '创建'
            })
          } else if (that.data.fictitious == '0') {
            that.setData({
              testingniutext: '去检测'
            })
          }

        } else {
          alerttishi("提示", res.data.message, function () {
          });
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });
  },


  //获取wifiList
  getWifiData() {
    const that = this;
    wx.startWifi({
      success: function (res) {
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.userLocation']) {
              wx.authorize({
                scope: 'scope.userLocation',
                success() {
                  that.setData({
                    isAuthLocation: true
                  })
                  wx.onGetWifiList(function (res) {
                    let wifiNameList = res.wifiList.map(item => {
                      return item.SSID
                    });
                    that.setData({
                      wifiDataList: wifiNameList
                    })
                  })
                  wx.getWifiList({
                    success: function (res) {
                      // console.log(res);
                    }
                  })
                },
                fail() {

                  wx.showModal({

                    title: '是否授权当前位置',

                    content: '需要获取您的地理位置，请确认授权，否则将无法获取wifi',

                    success: function (tip) {

                      if (tip.confirm) {

                        wx.openSetting({

                          success: function (data) {

                            if (data.authSetting["scope.userLocation"] === true) {

                              that.setData({
                                isAuthLocation: true
                              })
                              wx.onGetWifiList(function (res) {
                                let wifiNameList = res.wifiList.map(item => {
                                  return item.SSID
                                });
                                that.setData({
                                  wifiDataList: wifiNameList
                                })
                              })
                              wx.getWifiList({
                                success: function (res) {
                                  // console.log(res);
                                }
                              })

                            } else {

                              wx.showModal({

                                title: '系统提示',

                                content: '授权失败',

                                showCancel: false,

                                cancelText: '',

                                confirmText: '确定'

                              });

                            }

                          }

                        })

                      }else{
                        wx.showToast({
                          title: '获取当前位置信息失败！',
                          icon: 'none',
                          duration: 3000
                        })
                      }

                    },
                    fail:function(error){
                      wx.showToast({
                        title: '获取当前位置信息失败！',
                        icon: 'none',
                        duration: 3000
                      })
                    }

                  })

                  
                }
              })
            }else{
              that.setData({
                isAuthLocation: true
              })
              wx.onGetWifiList(function (res) {
                let wifiNameList = res.wifiList.map(item => {
                  return item.SSID
                });
                that.setData({
                  wifiDataList: wifiNameList
                })
              })
              wx.getWifiList({
                success: function (res) {
                  // console.log(res);
                }
              })
            }
          }
        })
      }
    });
  },



  //wifi-选择
  bindWifiChange: function (e) {
    let index = e.detail.value
    this.setData({
      wifiIndex: e.detail.value,
      wifiname: this.data.wifiDataList[index]
    })
  },


  yanzhengcode: function () {
    let that = this;
    if(that.data.iotcartval.length > 0) {
      wx.request({
      url: apiUrl + 'cabinet/ccid',
      data: {
        ccid: that.data.iotcartval,
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
          if (res.data.data == 1) {
          } else if (res.data.data == 0) {

          } else if (res.data.data == 2) {
            alerttishi("提示", "物联卡号已被使用", function () {
              that.setData({
                iotcartval: ""
              })
            });
          }
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
    }
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

  //扫描获取物联卡
  sweepCode: function () {
    let that = this;
    wx.scanCode({
      success(res) {
        let str = res.result;
        str = str.match(/:(\S*):/)[1];
        str = str.substring(2, str.length)
        that.setData({
          iotcartval: str
        })
        that.yanzhengcode();
      },
      fail: function (err) {
        console.log(err);
      }
    })
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
  testingniu: function () {
    let that = this;
    let judge = (that.data.bindAreaId == 1 || that.data.bindAreaId == 2)
    if (!that.data.bindAreaId.toString()) {
      alerttishi("提示", "请选择绑定地点", function () {
      });
      return;
    }
    if (judge && that.data.floorval.length < 1) {
      alerttishi("提示", "请填写" + that.data.floorName, function () {
      });
      return;
    }

    if (judge && that.data.housenumberval.length < 1) {
      alerttishi("提示", "请填写" + that.data.codeName, function () {
      });
      return;
    }

    if (that.data.iotcartval.length < 1 && that.data.fictitious == '0') {
      alerttishi("提示", "请填写物联卡号", function () {
      });
      return;
    }
    if (that.data.approachId.length < 1) {
      alerttishi("提示", "请选择进场配置", function () {
      });
      return;
    }
 

    if (that.data.flag == true) {
     

      if(that.data.bindAreaId===0){
        if (that.data.fictitious == '1') {
          that.createcabinet()
        }
      }else{
        that.setData({
          flag: false
        })
        wx.request({
          url: apiUrl + 'cabinet/room',
          data: {
            roomCode: that.data.housenumberval,
            hotelId: wx.getStorageSync("hotelId"),
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
            that.setData({
              flag: true
            })
            if (res.data.code == 0) {
              if (res.data.data == true) {
                if (that.data.fictitious == '1') {
                  that.createcabinet()
                } else if (that.data.fictitious == '0') {
                  wx.redirectTo({
                    url: '../cabinet/cabinet?saomainfo=' + that.data.qrcode + '&guiziid=' + "" + '&floorval=' + that.data.floorval + '&housenumberval=' + that.data.housenumberval + '&iotcartval=' + that.data.iotcartval + '&wifiname=' + that.data.wifiname + '&wifipassword=' + that.data.wifipassword + '&latticecount=' + that.data.latticecount + '&cabType=' + that.data.getcabType + '&isPowerFailure=' + that.data.isPowerFailure + '&pageLayout=' + that.data.pageLayout + '&approachId=' + that.data.approachId + '&bindAreaId=' + that.data.bindAreaId,
                  })
                }
              }
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
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

  },

  //创建柜子及柜子格子
  createcabinet: function () {
    let that = this;
    if (that.data.flag) {
      that.setData({
        flag: false
      })
      wx.request({
        url: apiUrl + 'cabinet',
        data: {
          hotelId: wx.getStorageSync("hotelId"),
          bindAreaFlag: that.data.bindAreaId,
          roomFloor: that.data.floorval,
          roomCode: that.data.housenumberval,
          // cabinetIot: that.data.iotcartval,
          wifiSsid: that.data.wifiname,
          wifiPassword: that.data.wifipassword,
          cabinetQrcode: that.data.qrcode,
          latticeAmount: that.data.latticecount,
          cabType: that.data.getcabType,
          // visualSettingId: that.data.xunicabId,
          isPowerFailure: that.data.isPowerFailure,
          enterSettingId: that.data.approachId
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("token")
        },
        method: "POST",
        success: function (res) {
          if (res.statusCode == 401) {
            app.overtime(res.statusCode)
            return false;
          }
          that.setData({
            flag: true
          })
          if (res.data.code == 0) {

            alerttishi("安装成功", "返回柜子列表", function () {
              wx.reLaunch({
                url: '../cabinetlist/cabinetlist'
              })
            })
          } else {
            alerttishi("提示", res.data.msg, function () {
            });
          }
        },
        fail: function (error) {
          that.setData({
            flag: true
          })
          alerttishi("提示", error, function () {
          });
        }
      });
    }


  },

//绑定地点
bindPickerArea:function(e){
  let that=this;
  let index=e.detail.value;
  let nowbindAreaId = that.data.bindAreaData[index].id;
  if (that.data.fictitious === 0){
    if (nowbindAreaId === 0 || nowbindAreaId === 2) {
      wx.showToast({
        title: '实体柜子仅能选择房间和定点',
        icon:'none',
        duration:2000
      })
      return false;
    }
  }
  if (nowbindAreaId===0){
   this.setData({
     floorName:"楼层",
     codeName:"地点"
   })
  } else if (nowbindAreaId === 1){
    this.setData({
      floorName: "楼层",
      codeName: "房间号"
    })
  } else if (nowbindAreaId === 2) {
    this.setData({
      floorName: "区域",
      codeName: "桌号"
    })
  }else{
    this.setData({
      floorName: "区域",
      codeName: "地点"
    })
  }
  this.setData({
    areaInex: index,
    bindAreaId: that.data.bindAreaData[index].id,
    floorval: "",
    housenumberval: "",
  })
},

})