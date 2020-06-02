const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 500,
    bannerImageList: [],
    imgheights: [],
    current: 0,
    detials: ''
  },
  onLoad: function (options) {
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    that.get_characeristicdetail(options.id);
  },
  get_characeristicdetail: function (id) {
    //获取客房设施详情
    const that = this;
    wxrequest.getcharaceristicdetail(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let bannerImageList = [];

        if (res.data.data.imageDTOS.length > 0) {
          for (let i = 0; i < res.data.data.imageDTOS.length; i++) {
            bannerImageList.push(res.data.data.imageDTOS[i].url);
          }
        }

        that.setData({
          detials: res.data.data,
          bannerImageList: bannerImageList
        });
        wx2my.hideLoading();
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    });
  },
  imageLoad: function (e) {
    var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
    ratio = imgwidth / imgheight; //计算的高度值  

    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights; //把每一张图片的对应的高度记录到数组里  

    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    });
  }
});