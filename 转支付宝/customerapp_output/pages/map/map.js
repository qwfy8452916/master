const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/map/map.js
Page({
  data: {
    latitude: '',
    longitude: '',
    markers: [{
      id: 1,
      latitude: '',
      longitude: '',
      name: ''
    }]
  },
  onReady: function (e) {
    this.mapCtx = my.createMapContext('myMap');
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      latitude: options.hotelLatitude,
      longitude: options.hotelLongitude,
      markers: [{
        id: 1,
        latitude: options.hotelLatitude,
        longitude: options.hotelLongitude,
        name: options.hotelName
      }]
    });
  }
});