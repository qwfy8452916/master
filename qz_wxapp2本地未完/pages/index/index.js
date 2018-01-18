//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      { iag: '../../img/59.jpg', lianj: 'zxsjym'},
      {
        iag: '../../img/592.jpg', lianj: 'zxsjym1'},
      {
        iag: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg', lianj: 'zxsjym2'
      }
    ],
    tuwen:[{text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang:'641',
      image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang:'zxsjym'},
      {
        text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
        image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym1'
      },
      {
        text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
        image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym2'
      },
      {
        text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
        image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym'
      },
      {
        text: '五种客厅墙面漆颜色 不知你喜欢的是？五种客厅墙面漆颜色', time: '2017-05-13', shuliang: '641',
        image: '../../img/tuwenbj.png', image2: '../../img/yuedubj.png', zhixiang: 'zxsjym2'
      }],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

     zxsjym:function(){
       wx.navigateTo({
         url: '../shouyexq/shouyexq'
       })
     },
     zxsjym1: function () {
       wx.navigateTo({
         url: '../zhuangxiusj/zhuangxiusj'
       })
     },
     zxsjym2: function () {
       wx.navigateTo({
         url: '../zhuangxiubj/zhuangxiubj'
       })
     },

     zxbjym:function(e){
       wx.navigateTo({
         url: '../shouyexq/shouyexq'
       })
     
     },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  }
})
