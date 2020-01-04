// pages/test/test.js
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
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
    Tabindex: '',
    iotcartval:'',  //物联卡号
    caninetType:[],  //柜子类型数据
    cabType:'',  //柜子类型
    latticeCount:'', //格子数
    virtualFlag:'',  //实体0，虚拟1
    virtualname:'',  //实体柜、虚拟柜描述
    pageLayout: '', //得到柜子布局
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;

    that.cabinetType();

    let popup = this.selectComponent("#tabbar");
    if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      })
    } else {
      that.setData({
        Tabindex: 0
      })
    }
    // popup.dabdata()
    popup.tabzhixing(that.data.Tabindex)

  },


  bindPickerChange2: function (e) {
    let that = this;
    let index = e.detail.value;
    let nowvirtualname;
    if (that.data.caninetType[index].virtualFlag=='0'){
       nowvirtualname="实体柜子"
    }
    if (that.data.caninetType[index].virtualFlag == '1') {
      nowvirtualname = "虚拟柜子"
    }
    this.setData({
      index: e.detail.value,
      cabType: that.data.caninetType[index].cabType,
      latticeCount: that.data.caninetType[index].latticeCount,
      virtualFlag: that.data.caninetType[index].virtualFlag,
      pageLayout: that.data.caninetType[index].pageLayout,
      virtualname: nowvirtualname
    })
  },

  cabinetType:function(){
    let that=this;
    wx.request({
      url: apiUrl + '/basic/cabType/all',
      data: {
        virtualFlag:0,
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
          that.setData({
            caninetType: res.data.data
          })
          console.log(res.data.data)
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

  Iotcart: function (e) {
    this.setData({
      iotcartval: e.detail.value
    })
  },


  testingniu:function(){
    let that=this;
    if (that.data.iotcartval==''){
      alertViewWithCancel("提示", "请填写物联卡号", function () {
        that.setData({
          iotcartval: ""
        })
      });
      return false
    }
    if (that.data.cabType == '') {
      alertViewWithCancel("提示", "请选择柜子类型", function () {
        that.setData({
          cabType: ""
        })
      });
      return false
    }
    if (that.data.virtualFlag == '1') {
      alertViewWithCancel("提示", "选择的是虚拟柜子不需要测试", function () {
        that.setData({
          cabType: ""
        })
      });
      return false
    }
    if (that.data.virtualFlag == '0') {
      wx.navigateTo({
        url: "../cabinet/cabinet?iotcartval=" + that.data.iotcartval + "&cabType=" + that.data.cabType + '&pageLayout=' + that.data.pageLayout,
       })
     }
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
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          if (res.data.data == 1) {
          } else if (res.data.data == 0) {

          }
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
            that.setData({
              iotcartval: ""
            })
          });
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    });
  },

  //扫描获取物联卡
  sweepCode: function () {
    let that = this;
    wx.scanCode({
      success(res) {
        let str = res.result;
       
        let reg = RegExp(/sim:1:/);
        if (!str.match(reg)){
          wx.showToast({
            title: '不是物联卡',
            icon: 'none',
            duration: 1200
          })
          return false;
        }

        str = str.match(/:(\S*):/)[1];
        str = str.substring(2, str.length)
        that.setData({
          iotcartval: str
        })
        that.yanzhengcode();
      },
      fail: function (err) {
        wx.showToast({
          title: '扫码错误',
          icon: 'none',
          duration: 1200
        })
        console.log(err);
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