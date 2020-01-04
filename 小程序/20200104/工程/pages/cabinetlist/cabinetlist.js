// pages/cabinetlist/cabinetlist.js
const app = getApp()
let apiUrl = app.getApiUrl();
let hotelid = app.globalData.hotelId;
let passid = app.globalData.passId;
let token = app.globalData.token


function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "删除",
    confirmColor: "#e32121",
    showCancel: true,
    cancelColor: "#ff9700",
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
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
    authzData: wx.getStorageSync('buttondata'),
    cabinetlistdata: [],  //柜子列表数据
    repairlistdata: [],  //报修列表数据
    replacelistdata: [],  //更换列表数据
    hotelfloor: null,   //酒店楼层
    housenumber: null,   //房间号
    cabinetid: null,   //柜子id
    cabinetindex: null,  //柜子索引
    pagesize: 20,      //每页展示条数
    nowpage: 1,        //默认当前页 
    sizejudge: 0,
    hotelid: null,   //酒店id  
    hoteldata:[],  //酒店数据
    hotelName:'',   //所选酒店名
    gaodu: 600,
    navarray: [true, false, false],
    navindex: 0, //导航索引
    Tabindex: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hotelId = wx.getStorageSync("hotelid")
    let hotelName = wx.getStorageSync("hotelName")
    let that = this;

    that.gethotel();
    that.setData({
      authzData: wx.getStorageSync('buttondata')
    })
    console.log(that.data.authzData)






    that.setData({
      hotelid: hotelId,
      hotelName: hotelName
    })
    console.log(this.data.hotelid)
    // that.getData(that.data.nowpage);



    if (options.navindex == 1) {
      let index = options.navindex

      let nownavarray = [false, false, false];
      nownavarray[index] = true
      that.setData({
        navindex: 1,
        navarray: nownavarray,
      })
    }

    //动态设置navindex



    let popup = this.selectComponent("#tabbar");
    if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      })
    } else {
      that.setData({
        Tabindex: 1
      })
    }
    // popup.dabdata()
    popup.tabzhixing(that.data.Tabindex)

  },

  bindPickerChange2: function (e) {
    let that = this;
    let index = e.detail.value;
    let hotelid = that.data.hoteldata[index].id;
    let hotelName = that.data.hoteldata[index].hotelName;

    this.setData({
      cabinetlistdata:[],
      index: e.detail.value,
      hotelid: hotelid,
      hotelName: hotelName
    })
    that.getData(1);
    wx.setStorageSync("hotelid",hotelid)
    wx.setStorageSync("hotelName", hotelName)
  },

  gethotel: function () {
    let that = this;
    wx.request({
      url: apiUrl + '/hotel',
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          that.setData({
            hoteldata: res.data.data.records
          })
          if(that.data.hotelid==''){
            that.setData({
              hotelid: res.data.data.records[0].id,
              hotelName: res.data.data.records[0].hotelName
            })
            wx.setStorageSync("hotelid", res.data.data.records[0].id)
            wx.setStorageSync("hotelName", res.data.data.records[0].hotelName)
          }
          that.getData(that.data.nowpage);
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

  //获取安装列表

  getData: function (cabpage) {
    let that = this;
    let tempDataSet = [];



    wx.request({
      url: apiUrl + '/cabinet',
      data: {
        hotelId: that.data.hotelid,
        pageSize: 20,
        pageNo: cabpage,
        orgAs: '',
        isWx: 1
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }

        if (res.data.code == 0) {
          wx.showLoading({
            title: "加载中",
            duration: 500,
          })

          if (res.data.data.records.length < 20 && res.data.data.records.length > 0) {
            that.setData({
              sizejudge: 0
            })
          } else {
            that.setData({
              sizejudge: 1
            })
          }
          tempDataSet = that.data.cabinetlistdata.concat(res.data.data.records)
          that.setData({
            cabinetlistdata: tempDataSet
          })
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





  checkdetail: function (e) {
    wx.redirectTo({
      url: '../lookdetail/lookdetail?id=' + e.currentTarget.dataset.id,
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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          gaodu: res.windowHeight * 2 - 390
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
    let that = this;

    that.setData({
      cabinetlistdata: [],
      repairlistdata: [],
      replacelistdata: [],
    })

    that.getData(1);
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  downLoad: function () {
    let that = this;
    let page = that.data.nowpage;
    let page2 = that.data.repairpage;
    let page3 = that.data.replacepage;

    if (that.data.sizejudge) {
      that.setData({
        nowpage: ++page,
      })
      that.getData(that.data.nowpage);
    }

   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showModal(e) {
    let that = this;

    this.setData({
      modalName: e.currentTarget.dataset.target,
      hotelfloor: e.currentTarget.dataset.floor,
      housenumber: e.currentTarget.dataset.roomid,
      cabinetid: e.currentTarget.dataset.id,
      cabinetindex: e.currentTarget.dataset.index
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  yinying: function () {
    this.setData({
      modalName: null
    })
  },
  showxian: function (e) {

  },

  //删除柜子
  delevent: function (e) {
    let that = this;

    alertViewWithCancel("是否删除", "酒店楼层" + that.data.hotelfloor + " / 房间号" + that.data.housenumber + "信息?", function () {
      wx.request({
        url: apiUrl + '/cabinet/' + that.data.cabinetid,
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("Token")
        },
        method: "DELETE",
        success: function (res) {
          if (res.statusCode == 401) {
            app.overtime(res.statusCode)
            return false;
          }
          if (res.data.code == 0) {
            let nowcabinetlistdata = that.data.cabinetlistdata
            for (var i = 0; i < nowcabinetlistdata.length; i++) {
              if (i == that.data.cabinetindex) {
                nowcabinetlistdata.splice(that.data.cabinetindex, 1)
              }
            }
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 1200
            });
            that.setData({
              cabinetlistdata: nowcabinetlistdata,
              modalName: null
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

    });
  },

  //编辑柜子
  editevent: function (e) {
    let that = this;
    let cabinetid = e.currentTarget.dataset.id

    wx.scanCode({
      success(res) {
        if (!res.result) {
          alertViewWithCancel("提示", "扫描失败", function () {
          });
          return false
        }
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

        let nowsaomadata = res.result.substring(res.result.length - 14)
        let fictitious = res.result.substring(res.result.length - 14, res.result.length - 12);
        // let nowsaomadata = JSON.parse(nowsaomadata)



        wx.request({
          url: apiUrl + '/cabinet/cabCode',
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("Token")
          },
          method: "GET",
          dataType: 'json',
          data: {
            cabCode: nowsaomadata,
            cabId: cabinetid
          },
          success: function (res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode)
              return false;
            }
 
            if (res.data.code == 0) {
              // if (res.data.data == 2) {
              //   alerttishi("提示", "柜子已被使用", function () {
              //   });
              // }
              wx.navigateTo({
                url: '../bindcabinetedit/bindcabinetedit?guizicode=' + nowsaomadata + '&guiziid=' + cabinetid + '&fictitious=' + fictitious
              })
            }else{
              alerttishi("提示", res.data.msg, function () {
              });
            }
          },
          fail: function () {
            console.log("error!!!!");
          }
        })

      },
      fail: function (err) {
        console.log(err);
      }
    })
  },



  continueniu: function () {
    let that = this;

    if (that.data.hotelid==''){
      wx.showToast({
        title: '请选择酒店',
        icon: 'none',
        duration: 1200
      })
      return false;
    }

    wx.scanCode({
      success(res) {

        if (!res.result) {
          alerttishi("提示", "扫描失败", function () {
          });
          return false
        }
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

        let nowsaomadata = res.result.substring(res.result.length - 14)

        let fictitious = res.result.substring(res.result.length - 14, res.result.length - 12);
        console.log(nowsaomadata)
        console.log(fictitious)

        wx.request({
          url: apiUrl + '/cabinet/cabCode',
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("Token")
          },
          method: "GET",
          dataType: 'json',
          data: {
            cabCode: nowsaomadata,
            cabId: ""
          },
          success: function (res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode)
              return false;
            }
            console.log(res.data.message)
            // if (res.data.data == 2) {
            //   alerttishi("提示", "柜子已被使用", function () {
            //   });
            // }
            if (res.data.code == 1) {
              alerttishi("提示", res.data.msg, function () {
              });
            }
            if (res.data.data == 0 || res.data.data == 1) {
              wx.navigateTo({
                url: '../bindcabinet/bindcabinet?guizicode=' + nowsaomadata + '&fictitious=' + fictitious
              })
            }

          },
          fail: function () {
            console.log("error!!!!");
          }
        })

      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

})