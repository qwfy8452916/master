// pages/package/pages/qrCodeEdit/qrCodeEdit.js
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
    id:"",
    commoditygai:{},
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


    this.getWifiData();

    
    this.getCabinetConfig();
    this.basicDataItems();
    

  },


  //加载数据
  getdata:function(){
    let that=this;
    wx.request({
      url: apiUrl + 'cabinet/'+that.data.id,
      data:{},
      header:{
        'content-type':'application/json',
        'Authorization': wx.getStorageSync('token')
      },
      method: "GET",
      success:function(res){
        let resdata=res.data;
        if(resdata.code==0){

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

        }else{
          wx.showToast({
            title: resdata.msg,
            icon:'none',
            duration:2000
          })
        }
      },
      fail:function(err){
        wx.showToast({
          title: err,
          icon:'none',
          duration:2000
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

  bindPickerChange2: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      index: e.detail.value,
      xunicabId: that.data.fictitiousdata[index].id,
    })
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

                      } else {
                        wx.showToast({
                          title: '获取当前位置信息失败！',
                          icon: 'none',
                          duration: 3000
                        })
                      }

                    },
                    fail: function (error) {
                      wx.showToast({
                        title: '获取当前位置信息失败！',
                        icon: 'none',
                        duration: 3000
                      })
                    }

                  })


                }
              })
            } else {
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
  remark: function (e) {
    this.setData({
      'form.remark': e.detail.value
    })
  },

  testingniu: function () {
    let that = this;
    let judge = (that.data.bindAreaId == 1 || that.data.bindAreaId == 2);

    if (that.data.xunicabId.length < 1) {
      alerttishi("提示", "请选择进场配置", function () {
      });
      return;
    }

    if (!that.data.bindAreaId.toString()) {
      alerttishi("提示", "请选择绑定类型", function () {
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


    if (that.data.flag == true) {

      that.setData({
        flag: false
      })
      wx.request({
        url: apiUrl + 'cabinet/common/'+that.data.id,
        data: {
          hotelId: wx.getStorageSync('hotelId'),
          isVisual: that.data.form.isVisual,
          bindAreaFlag: that.data.bindAreaId,
          roomFloor: that.data.floorval,
          roomCode: that.data.housenumberval,
          cabinetQrcode: that.data.commoditygai.cabinetQrcode,
          enterSettingId: that.data.xunicabId,
          wifiSsid: that.data.wifiname,
          wifiPassword: that.data.wifipassword,
          lastUpdatedAt: "",
          lastUpdatedBy: "",
          isNeedRepair: 0,
          remark: that.data.form.remark,
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("token")
        },
        method: "PUT",
        success: function (res) {
          if (res.statusCode == 401) {
            app.overtime(res.statusCode)
            return false;
          }
          that.setData({
            flag: true
          })
          if (res.data.code == 0) {
            wx.showToast({
              title: '操作成功！',
              icon: 'none',
              duration: 2000
            })
            wx.navigateBack({
              delta: 1
            })

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

  },


  //绑定地点
  bindPickerArea: function (e) {
    let that = this;
    let index = e.detail.value;
    let nowbindAreaId = that.data.bindAreaData[index].id;
    if (that.data.fictitious === 0) {
      if (nowbindAreaId === 0 || nowbindAreaId === 2) {
        wx.showToast({
          title: '实体柜子仅能选择房间和定点',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }
    if (nowbindAreaId === 0) {
      this.setData({
        floorName: "楼层",
        codeName: "地点"
      })
    } else if (nowbindAreaId === 1) {
      this.setData({
        floorName: "楼层",
        codeName: "房间号"
      })
    } else if (nowbindAreaId === 2) {
      this.setData({
        floorName: "区域",
        codeName: "桌号"
      })
    } else {
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