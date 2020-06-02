const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/myqecode/myqecode.js
const app = getApp();
let apiUrl = app.getApiUrl();
let token = app.globalData.token;

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
      } else if (res) {}
    }
  });
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    qrcodeData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQrCode();
  },
  getQrCode: function () {
    let that = this;
    wx2my.request({
      url: apiUrl + '/act/share/code',
      header: {
        'content-type': 'application/json',
        'Authorization': wx2my.getStorageSync("Token")
      },
      data: {
        shareObj: 0,
        shareUserType: 1,
        shareUserId: wx2my.getStorageSync("empid")
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode);
          return false;
        }

        if (res.data.code == 0) {
          that.setData({
            qrcodeData: res.data.data.qrPath
          });
          console.log(res.data.data.qrPath);
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {});
      }
    });
  },
  //点击开始的时间  
  timestart: function (e) {
    var _this = this;

    _this.setData({
      timestart: e.timeStamp
    });
  },
  //点击结束的时间
  timeend: function (e) {
    var _this = this;

    _this.setData({
      timeend: e.timeStamp
    });
  },
  //保存图片
  saveImg: function (e) {
    var _this = this;

    var times = _this.data.timeend - _this.data.timestart;

    if (times > 300) {
      console.log("长按");
      wx2my.getSetting({
        success: function (res) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function (res) {
              console.log("授权成功"); // var imgUrl = "https://dwz.cn/e7dxK8rA";

              var imgUrl = _this.data.qrcodeData;
              wx2my.downloadFile({
                //下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
                url: imgUrl,
                success: function (res) {
                  // 下载成功后再保存到本地
                  wx2my.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    //返回的临时文件路径，下载后的文件会存储到一个临时文件
                    success: function (res) {
                      wx2my.showToast({
                        title: '成功保存到相册',
                        icon: 'success'
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onShareAppMessage: function () {}
});