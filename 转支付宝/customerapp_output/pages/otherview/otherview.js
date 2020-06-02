const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
Page({
  data: {
    urldata: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      urldata: options.url
    });
  }
});