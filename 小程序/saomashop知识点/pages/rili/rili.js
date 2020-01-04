// const app = getApp()
const app = getApp()
let apiUrl = app.getApiUrl();
let util = require("../../utils/util.js");
Page({
  data: {
    

    timedataval: '5',//凌晨时间
    starTime: '',//入住时间
    starweek: '',//入住-星期
    day: '',//入住几晚
    endTime: '',//离店时间
    endweek: '',//离店-星期
  },
  onLoad: function (options) {
    const that = this;


  },
  initialization: function () {//初始化 入住-离店时间
    let that = this;
    let time = util.formatDate(new Date());
    let dateweek = util.getDates(2, time);
    that.setData({
      starTime: dateweek[0].time,//入住时间
      starweek: dateweek[0].week,//入住-星期
      day: 1,
      endTime: dateweek[1].time,//离店时间
      endweek: dateweek[1].week,//离店-星期
    })
    // that.getroominfo(dateweek[0].time, dateweek[1].time, hotelid, 1);//获取酒店房型房源信息
  },

  selecttimefun: function () {//选择 入住-离店时间
    const that = this;
    that.rili = that.selectComponent("#rili");
    let starTime = '';
    let starweek = '';
    let day = '';
    let endTime = '';
    let endweek = '';
    that.rili.xianShi({
      data: function (res) {
        if (res != null) {
          if (res.length == 1) {
            starTime = res[0].data;
          }
          else if (res.length == 2) {
            starTime = res[0].data;
            endTime = res[1].data;
            day = res[1].chaDay;
            let data1 = util.getDates(1, starTime);
            let data2 = util.getDates(1, endTime);
            starweek = data1[0].week;
            endweek = data2[0].week;
          }
        } else {
          that.initialization();//初始化 入住-离店时间
          return;
        }
        that.setData({
          starTime: starTime,//入住时间
          starweek: starweek,//入住-星期
          day: day,
          endTime: endTime,//离店时间
          endweek: endweek,//离店-星期
        });
        // that.getroominfo(starTime, endTime, that.data.hotelid, day);//获取酒店房型房源信息
      }
    })
  },
  
})