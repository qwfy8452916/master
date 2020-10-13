// pages/cabinet/cabinet.js
const app = getApp()
let apiUrl = app.globalData.requestUrl;
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


app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    panduan: [true, 3, true, false, true, 3, false, true, false],
    cabinet: [
    ],

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
    getcabType: '',  //获取柜子类型
    customtip: true,  //显示提示
    cabCode: '',  //柜子编号
    timing: '',  //定时器
    testpage:'',  //判断是否测试页跳转
    isPowerFailure: 0,   //是否断电 0没有断电 1断电
    pageLayout:[], //柜子布局数据
    bindAreaId:'', //绑定方式
    approachId:'', //进场配置id

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let nowiotcartval = options.iotcartval;
    let nowguiziid = options.guiziid;
    let nowpageLayout = JSON.parse(options.pageLayout);

    console.log(typeof options.testpage)
    that.setData({
      guiziid: options.guiziid,
      saomainfo: options.saomainfo,
      floorval: options.floorval,
      housenumberval: options.housenumberval,
      iotcartval: options.iotcartval,
      wifiname: options.wifiname,
      wifipassword: options.wifipassword,
      latticecount: options.latticecount,
      getcabType: options.cabType,
      testpage: options.testpage,
      isPowerFailure: options.isPowerFailure,
      pageLayout: nowpageLayout,
      bindAreaId: options.bindAreaId,
      approachId: options.approachId,
    })
    that.getgeziinfo();
  },

  //继续测试
  continueTest: function () {
    wx.reLaunch({
      url: "../test/test"
    })
  },


  //绑定
  binding() {
    let that = this;
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
          url: apiUrl + 'cabinet/cabCode/ccid',
          data: {
            cabCode: cabCode,
            cabType: that.data.getcabType,
            ccid: that.data.iotcartval,
          },
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("token")
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
              setTimeout(function () {
                wx.reLaunch({
                  url: "../test/test"
                })
              }, 1500)

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

  closetip: function () {
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
      url: apiUrl + 'cabinet/status/ccid',
      data: {
        ccid: that.data.iotcartval,
        cabType: that.data.getcabType,
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
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
            let nowpageLayout = that.data.pageLayout
            let nowlatticecount = res.data.data.latticeAmount

            let createarr = new Array();
            for (var i = 0; i < nowlatticecount; i++) {
              createarr.push(false)
            }
            // nowcabinet[0].width="20";
            // nowcabinet[0].height = "20";
            // nowcabinet[0].left = "0";
            // nowcabinet[0].top = "0";

            // nowcabinet[1].width = "50";
            // nowcabinet[1].height = "25";
            // nowcabinet[1].left = "20";
            // nowcabinet[1].top = "0";

            // nowcabinet[2].width = "30";
            // nowcabinet[2].height = "100";
            // nowcabinet[2].left = "70";
            // nowcabinet[2].top = "0";

            // nowcabinet[3].width = "20";
            // nowcabinet[3].height = "80";
            // nowcabinet[3].left = "0";
            // nowcabinet[3].top = "20";

            // nowcabinet[4].width = "50";
            // nowcabinet[4].height = "75";
            // nowcabinet[4].left = "20";
            // nowcabinet[4].top = "25";
            // console.log(nowcabinet)
            for(var i = 0; i < nowcabinet.length;i++){
              for (var j = 0; j < nowpageLayout.length;j++){
                if (nowcabinet[i].latticeCode == nowpageLayout[j].latticeCode){
                  nowcabinet[i] = Object.assign(nowpageLayout[j],nowcabinet[i])
                 }
               }
            }
            console.log(nowcabinet)
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
                  url: '../cabinetlist/cabinetlist'
                })
              } else {
                wx.reLaunch({
                  url: '../cabinetlist/cabinetlist'
                })
              }

            });
          }
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
            wx.reLaunch({
              url: '../cabinetlist/cabinetlist'
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
        title:"响应中"
      })
      wx.request({
        url: apiUrl + 'cabinet/lattice/open/ccid',
        data: {
          ccid: that.data.iotcartval,
          latticeCode: latticecode
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("token")
        },
        method: "GET",
        success: function (res) {
          wx.hideLoading();
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
          wx.hideLoading();
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
      wx.showLoading();
      wx.request({
        url: apiUrl + 'cabinet/lattice/status/ccid',
        data: {
          ccid: that.data.iotcartval,
          latticeCode: latticecode
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("token")
        },
        method: "GET",
        success: function (res) {
          wx.hideLoading();
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
          wx.hideLoading();
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
      if (that.data.testpage=='true'){
        that.setData({
          customtip: false
        })
      }else{
        if (that.data.guiziid == "") {
          that.createcabinet()
          console.log("创建")
        } else {
          that.updatecabinet()
          console.log("更新")
        }
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
          roomFloor: that.data.floorval,
          roomCode: that.data.housenumberval,
          cabinetIot: that.data.iotcartval,
          wifiSsid: that.data.wifiname,
          wifiPassword: that.data.wifipassword,
          cabinetQrcode: that.data.saomainfo,
          latticeAmount: that.data.latticecount,
          cabType: that.data.getcabType,
          isPowerFailure: that.data.isPowerFailure,
          bindAreaFlag: that.data.bindAreaId,
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

            alertViewWithCancel("安装成功", "返回柜子列表", function () {
              clearTimeout(that.data.timing)
              wx.reLaunch({
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

  //编辑更换更新柜子数据
  updatecabinet: function () {
    let that = this;
    if (that.data.flag) {
      that.setData({
        flag: false
      })
      wx.request({
        url: apiUrl + 'cabinet/' + that.data.guiziid,
        data: {
          hotelId: wx.getStorageSync("hotelId"),
          roomFloor: that.data.floorval,
          roomCode: that.data.housenumberval,
          cabinetIot: that.data.iotcartval,
          wifiSsid: that.data.wifiname,
          wifiPassword: that.data.wifipassword,
          cabinetQrcode: that.data.saomainfo,
          latticeAmount: that.data.latticecount,
          cabType: that.data.getcabType,
          isPowerFailure: that.data.isPowerFailure,
          bindAreaFlag: that.data.bindAreaId,
          enterSettingId: that.data.approachId
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
            alertViewWithCancel("柜子更新成功", "返回柜子列表", function () {
              clearTimeout(that.data.timing)
              wx.reLaunch({
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