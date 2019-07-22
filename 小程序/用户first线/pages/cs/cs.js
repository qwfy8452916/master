
Page({
  data: {

  },
  sm: function(){
    wx.scanCode({
      success: (res) => {
        wx.setStorageSync('scenes', res.result);
        let qrUrl = decodeURIComponent(res.result);
        let q = this.getQueryString(qrUrl, 'c');
        wx.redirectTo({
          url: '../login/login?q=' + q
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },
  //解析链接方法
  getQueryString: function (url, name) {
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
    var r = url.substr(1).match(reg);
    if (r != null) {
      // console.log("r = " + r)
      // console.log("r[2] = " + r[2])
      return r[2];
    }
    return null;
  }
})