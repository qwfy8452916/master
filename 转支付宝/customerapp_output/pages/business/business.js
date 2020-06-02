const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/business/business.js
Page({
  data: {},
  onLoad: function (options) {},
  tel: function () {
    wx2my.makePhoneCall({
      phoneNumber: '18912773939'
    });
  }
});