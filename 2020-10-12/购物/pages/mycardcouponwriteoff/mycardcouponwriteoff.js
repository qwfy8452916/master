const app = getApp();
import wxrequest from '../../request/api'
var QR = require("../../utils/qrcode.js");
Page({
  data: {
    canvasHidden: false,
    imagePath: '',
    voucherdata: ''
  },
  onLoad: function (options) {
    const that = this;
    that.get_vouchercode(options.id);
  },
  onShow: function () {
    wx.hideHomeButton();
  },
  get_vouchercode: function (id) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    wxrequest.getvouchercode(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          voucherdata: resdatas
        });
        var size = that.setCanvasSize(); //动态设置画布大小 
        that.createQrCode(resdatas.vouVerifiedCode, "mycanvas", size.w, size.h); 
        wx.hideLoading();
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  setCanvasSize: function() {//适配不同屏幕大小的canvas
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 686; //不同屏幕下canvas的适配比例；设计稿是750宽 686是因为样式wxss文件中设置的大小
      var width = res.windowWidth / scale;
      var height = width; //canvas画布为正方形
      size.w = width;
      size.h = height;
    } catch (e) {
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  createQrCode: function(url, canvasId, cavW, cavH) {//调用插件中的draw方法，绘制二维码图片
    QR.api.draw(url, canvasId, cavW, cavH);
    setTimeout(() => {
      this.canvasToTempImage();
    }, 1000);
  },
  canvasToTempImage: function() {//获取临时缓存照片路径，存入data中
    var that = this;
    wx.canvasToTempFilePath({//把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
      canvasId: 'mycanvas',
      success: function(res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        that.setData({
          imagePath: tempFilePath,
        });
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  previewImg: function (e) {//点击图片进行预览
    var img = this.data.imagePath;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    });
  },
})