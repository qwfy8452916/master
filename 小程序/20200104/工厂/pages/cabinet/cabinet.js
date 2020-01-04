// pages/cabinet/cabinet.js
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token

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

function alerttishi(title = "", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    cancelText: "报修锁具",
    confirmText: "去关门",
    confirmColor: "#ff9700",
    cancelColor: "#ff9700",
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}

function alerttishi2(title = "", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    cancelText: "",
    confirmText: "报修锁具",
    confirmColor: "#ff9700",
    cancelColor: "",
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
    panduan: [true, 3, true, false, true, 3, false, true, false],
    cabinet: [],

    switch: true,
    geziid: "",   //格子id
    geziindex: "",  //当前格子索引
    sortindex: 0,  //默认顺序索引
    geziarray: [],
    geziswitch: false,  //开关默认关闭
    guizistate: null,   //柜子状态最终为1测试完成
    flag: true,   //重复操作
    guiziid: "",  //柜子id
    saomainfo: "",   //扫码信息
    floorval: "",   //楼层
    housenumberval: "",  //房号
    iotcartval: "",   //物联卡
    wifiname: "",   //wifi名
    wifipassword: "",  //wifi密码
    latticecount: "",   //格子数
    flag: true,
    getcabType: '',  //柜子类型
    customtip:true,  //显示提示
    cabCode:'',  //柜子编号
    timing: '',  //定时器
    pageLayout: [], //柜子布局数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let nowpageLayout = JSON.parse(options.pageLayout);
    let nowiotcartval = options.iotcartval;
    // let nowlatticecount = options.latticecount;
    let nowguiziid = options.guiziid;
    // let createarr = new Array();
    // for (var i = 0; i < nowlatticecount; i++) {
    //   createarr.push(false)
    // }
    that.setData({
      iotcartval: options.iotcartval,
      getcabType: options.cabType,
      pageLayout: nowpageLayout,
    })
    that.getgeziinfo();
  },

  //继续测试
  continueTest:function(){
    wx.redirectTo({
      url:"../test/test"
    })
  },


  //绑定
  binding(){
    let that=this;
    wx.scanCode({
      success(res) {
        let str = res.result;
        let reg = RegExp(/http:\/\/cab.kefangbao.com.cn/);
        if (!str.match(reg)) {
          wx.showToast({
            title: '不是柜子二维码',
            icon: 'none',
            duration: 1200
          })
          return false;
        }

        let cabCode = res.result.substring(res.result.length - 14);

        wx.showLoading({
          title: "响应中"
        });
        wx.request({
          url: apiUrl + '/cabinet/cabCode/ccid',
          data: {
            cabCode: cabCode,
            cabType: that.data.getcabType,
            ccid: that.data.iotcartval,
          },
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("Token")
          },
          method: "PUT",
          success: function (res) {
            wx.hideLoading()
            that.setData({
              customtip: true,
            })
            if (res.statusCode == 401) {
              app.overtime(res.statusCode)
              return false;
            }
            if (res.data.code == 0) {
              wx.showToast({
                title: '操作成功!',
                icon: 'none',
                duration: 1200
              })
              setTimeout(function(){
                wx.redirectTo({
                  url: "../test/test"
                })
              },2000)
              
            } else {
              alertViewWithCancel("提示", res.data.msg, function () {
              });
            }
          },
          fail: function (error) {
            wx.hideLoading()
            alertViewWithCancel("提示", error, function () {
            });
          }
        });
        
      },
      fail: function (err) {
        
        console.log(err);
      }
    })

  },

  closetip:function(){
    let that = this;
    that.setData({
      customtip: true,
    })
  },

  //获取柜子格子信息
  getgeziinfo: function () {
    let that = this;
    wx.showLoading({
      title: "响应中"
    });
    wx.request({
      url: apiUrl + '/cabinet/status/ccid',
      data: {
        ccid: that.data.iotcartval,
        cabType: that.data.getcabType,
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          if (res.data.data.cabinetStatus == 1) {
            console.log(res.data.data.cabLatticeDTOS)
            let nowcabinet = res.data.data.cabLatticeDTOS
            let nowlatticecount = res.data.data.latticeAmount
            let nowpageLayout = that.data.pageLayout
            
              let createarr = new Array();
              for (var i = 0; i < nowlatticecount; i++) {
                createarr.push(false)
              }

              for (var i = 0; i < nowcabinet.length; i++) {
                for (var j = 0; j < nowpageLayout.length; j++) {
                  if (nowcabinet[i].latticeCode == nowpageLayout[j].latticeCode) {
                    nowcabinet[i] = Object.assign(nowpageLayout[j], nowcabinet[i])
                  }
                }
              }

              that.setData({
                cabinet: nowcabinet,
                latticecount: res.data.data.latticeAmount,
                geziarray: createarr,
              })
            that.panduan()
            // nowtiming();
          } else if (res.data.data.cabinetStatus == 2) {
            alertViewWithCancel("提示", '柜子故障，请更换柜子', function () {
              if (that.data.guiziid === "") {
                wx.reLaunch({
                  url: '../test/test'
                })
              } else {
                wx.reLaunch({
                  url: '../test/test'
                })
              }

            });
          }
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
            wx.reLaunch({
              url: '../test/test'
            })
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    });
  },


  //判断是否有格子门打开
  panduan: function () {
    let nowtiming = this.data.timing
    let that = this;
    for (var i = 0; i < that.data.cabinet.length; i++) {
      if (that.data.cabinet[i].isOpen == 1) {
        console.log("执行")
        alertViewWithCancel("提示", that.data.cabinet[i].latticeCode + "格子门没关,请关好门再测试", function () {
          nowtiming=setTimeout(function () {
            that.getgeziinfo()
          }, 1500)
          that.setData({
            timing: nowtiming
          })
          return false
        });
        return false
      } else {
        clearTimeout(nowtiming)
      }
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
    clearTimeout(this.data.timing)
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




  //执行开关

  switchzhixing: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id
    let index = e.currentTarget.dataset.index
    let isopen = e.currentTarget.dataset.isopen
    let latticecode = e.currentTarget.dataset.latticecode
    let nowgeziarray = that.data.geziarray
    
    //判断当前格子开关状态及当前索引
    if (isopen == 0 && nowgeziarray[index] != true) {
      
      that.openlattice(index, latticecode)
    }
    //判断当前格子开关状态及当前索引
    if (isopen == 1 && nowgeziarray[index] != true) {
      that.querystatus(index, latticecode)
    }
  },

  //开格子
  openlattice: function (index, latticecode) {
    let that = this;
    let nowlatticecount = that.data.latticecount
    let nowsortindex = that.data.sortindex
    let nowcabinet = that.data.cabinet
    console.log(nowlatticecount)
    console.log(nowsortindex)
    console.log(nowcabinet)
    if (nowsortindex < nowlatticecount && nowsortindex == index && that.data.flag == true) {
      
      that.setData({
        flag: false
      })
      wx.showLoading({
        title: "响应中"
      });
      wx.request({
        url: apiUrl + '/cabinet/lattice/open/ccid',
        data: {
          ccid: that.data.iotcartval,
          latticeCode: latticecode
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("Token")
        },
        method: "GET",
        success: function (res) {
          wx.hideLoading()
          if (res.statusCode == 401) {
            app.overtime(res.statusCode)
            return false;
          }

          that.setData({
            flag: true
          })
          
          if (res.data.code == 0) {
            console.log(res.data.data.isFault)
            if (res.data.data.isFault == 1) {
              if (res.data.data.isOpen == 1) {
                nowcabinet[index].isOpen = 1
                that.setData({
                  cabinet: nowcabinet,
                })
              }
            } else if (res.data.data.isFault == 2) {

              alertViewWithCancel("提示", "格子故障", function () {
                if (that.data.guiziid === "") {
                  wx.reLaunch({
                    url: '../cabinetlist/cabinetlist'
                  })
                } else {
                  wx.reLaunch({
                    url: '../cabinetlist/cabinetlist'
                  })
                }
              });

            }

          }else{
            alertViewWithCancel("提示", res.data.msg, function () {
            });
          }
        },
        fail: function (error) {
          wx.hideLoading()
          that.setData({
            flag: true
          })
          alertViewWithCancel("提示", error, function () {
          });
        }
      });
    }

  },

  //查询格子状态

  querystatus: function (index, latticecode) {
    let that = this;
    let nowsortindex = that.data.sortindex
    if (nowsortindex == index && that.data.flag == true) {
      that.setData({
        flag: false
      })
      wx.showLoading({
        title: "响应中"
      });
      wx.request({
        url: apiUrl + '/cabinet/lattice/status/ccid',
        data: {
          ccid: that.data.iotcartval,
          latticeCode: latticecode
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("Token")
        },
        method: "GET",
        success: function (res) {
          wx.hideLoading()
          if (res.statusCode == 401) {
            app.overtime(res.statusCode)
            return false;
          }
          that.setData({
            flag: true
          })
          if (res.data.code == 0) {

            if (res.data.data.isFault == 1) {
              if (res.data.data.isOpen == 0) {
                let nowlatticecount = that.data.latticecount
                let nowgeziarray = that.data.geziarray
                let nowcabinet = that.data.cabinet
                let nowsortindex = that.data.sortindex
                nowgeziarray[index] = true
                nowcabinet[index].isOpen = 0
                if (nowsortindex < nowlatticecount) {
                  nowsortindex = nowsortindex + 1
                  if (nowsortindex == nowlatticecount) {
                    that.setData({
                      guizistate: 1
                    })
                  }
                }
                that.setData({
                  geziarray: nowgeziarray,
                  cabinet: nowcabinet,
                  sortindex: nowsortindex,
                })
                console.log(that.data.geziarray)
              } else if (res.data.data.isOpen == 1) {
                alertViewWithCancel("提示", "请关上格子门", function () {

                })
              }
            } else if (res.data.data.isFault == 2) {

              alertViewWithCancel("提示", "格子故障", function () {
                if (that.data.guiziid === "") {
                  wx.reLaunch({
                    url: '../cabinetlist/cabinetlist'
                  })
                } else {
                  wx.reLaunch({
                    url: '../cabinetlist/cabinetlist'
                  })
                }
              });

            }

          }else{
            alertViewWithCancel("提示", res.data.msg, function () {
            });
          }
        },
        fail: function (error) {
          wx.hideLoading()
          that.setData({
            flag: true
          })
          alertViewWithCancel("提示", error, function () {
          });
        }
      });
    }

  },

  //测试完成
  completetest: function () {
    let that = this;
    
    if (that.data.guizistate != 1) {
      wx.showToast({
        title: '还有柜子未测试',
        icon: 'none',
        duration: 1200
      })
    } else {
      that.setData({
        customtip: false
      })
      
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
        url: apiUrl + '/cabinet',
        data: {
          hotelId: wx.getStorageSync("hotelid"),
          roomFloor: that.data.floorval,
          roomCode: that.data.housenumberval,
          cabinetIot: that.data.iotcartval,
          wifiSsid: that.data.wifiname,
          wifiPassword: that.data.wifipassword,
          cabinetQrcode: that.data.saomainfo,
          latticeAmount: that.data.latticecount,
          cabType: that.data.getcabType
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("Token")
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
            
            alertViewWithCancel("安装成功", "返回柜子列表", function () {
              clearTimeout(that.data.timing)
              wx.redirectTo({
                url: '../cabinetlist/cabinetlist'
              })
            })
          } else {
            alertViewWithCancel("提示", res.data.message, function () {
            });
          }
        },
        fail: function (error) {
          that.setData({
            flag: true
          })
          alertViewWithCancel("提示", error, function () {
          });
        }
      });
    }


  },

  //编辑更换更新柜子数据
  updatecabinet: function () {
    let that = this;
    if (that.data.flag) {
      that.setData({
        flag: false
      })
      wx.request({
        url: apiUrl + '/cabinet/' + that.data.guiziid,
        data: {
          hotelId: wx.getStorageSync("hotelid"),
          roomFloor: that.data.floorval,
          roomCode: that.data.housenumberval,
          cabinetIot: that.data.iotcartval,
          wifiSsid: that.data.wifiname,
          wifiPassword: that.data.wifipassword,
          cabinetQrcode: that.data.saomainfo,
          latticeAmount: that.data.latticecount,
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("Token")
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
            alertViewWithCancel("柜子更新成功", "返回柜子列表", function () {
              clearTimeout(that.data.timing)
              wx.redirectTo({
                url: '../cabinetlist/cabinetlist'
              })
            })
          } else {
            alertViewWithCancel("提示", res.data.msg, function () {
            });
          }
        },
        fail: function (error) {
          that.setData({
            flag: true
          })
          alertViewWithCancel("提示", error, function () {
          });
        }
      });
    }


  },


})