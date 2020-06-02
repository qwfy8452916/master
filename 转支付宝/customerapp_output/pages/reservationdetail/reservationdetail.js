const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    id: '',
    hotelName: '',
    showtype: false,
    shareCode: '',
    cabCode: '',
    themecolor: '',
    //主题颜色
    starTime: '',
    starweek: '',
    day: '',
    endTime: '',
    endweek: '',
    price: '',
    fullflag: '',
    imgheights: [],
    //banner图
    current: 0,
    //第一张banner图
    bannerImageList: [],
    //详情信息
    type: '',
    //1: 房型信息，2：房源信息
    roomdetail: '',
    //信息详情
    shareFlag: ''
  },
  onLoad: function (options) {
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    that.setData({
      id: options.id,
      starTime: options.starTime,
      starweek: options.starweek,
      day: options.day,
      endTime: options.endTime,
      endweek: options.endweek,
      price: options.price,
      fullflag: options.fullflag,
      shareFlag: app.globalData.shareFlag
    });
    wx2my.getStorage({
      key: 'themecolor',
      success: function (res) {
        that.setData({
          themecolor: res.data
        });
      }
    });
    wx2my.getStorage({
      key: 'CabCode',
      success: function (res) {
        that.setData({
          cabCode: res.data
        });
      }
    });
    wx2my.getStorage({
      key: 'hotelName',
      success: function (res) {
        that.setData({
          hotelName: res.data
        });
      }
    });

    if (options.type == 1) {
      //房型信息
      that.get_fxroominfo(options);
    } else {
      //房源信息
      that.get_fyroominfo(options);
    }
  },
  onShow: function () {
    // wx2my.hideShareMenu();
  },
  get_fyroominfo: function (options) {
    //房源信息
    const that = this;
    wxrequest.getfyroominfo(options.id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let imglist = [];

        for (let i = 0; i < resdatas.imageDetailDTOS.length; i++) {
          imglist.push(resdatas.imageDetailDTOS[i].url);
        }

        that.setData({
          type: options.type,
          bannerImageList: imglist,
          roomdetail: resdatas
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
  get_fxroominfo: function (options) {
    //房型信息
    const that = this;
    wxrequest.getfxroominfo(options.id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let imglist = [];

        for (let i = 0; i < resdatas.imageDetailDTOS.length; i++) {
          imglist.push(resdatas.imageDetailDTOS[i].url);
        }

        that.setData({
          type: options.type,
          bannerImageList: imglist,
          roomdetail: resdatas
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
  imageLoad: function (e) {
    //banner图高度自适应
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
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    });
  },
  formfun: function (e) {
    //预定
    const thatdata = this.data;
    wx2my.navigateTo({
      url: '../reservationform/reservationform?id=' + e.currentTarget.dataset.id + '&starTime=' + thatdata.starTime + '&starweek=' + thatdata.starweek + '&day=' + thatdata.day + '&endTime=' + thatdata.endTime + '&endweek=' + thatdata.endweek
    });
  },
  sharefun: function () {
    //获取分享码
    const that = this;
    let linkData = {
      cabCode: that.data.cabCode,
      hotelId: app.globalData.hotelId,
      funcId: -1,
      shareObj: 2,
      shareObjId: that.data.id,
      shareUserId: app.globalData.userId,
      shareUserType: 2
    };
    wxrequest.postsharecode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          shareCode: resdatas.shareCode,
          showtype: true
        });
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
  closefun: function () {
    //关闭分享窗口
    this.setData({
      showtype: false
    });
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    return {
      title: '推荐一家酒店给你，' + that.data.hotelName,
      path: 'pages/login/login?sharecode=' + that.data.shareCode,
      // 路径，传递参数到指定页面。
      imageUrl: that.data.bannerImageList[0],
      // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log('用户取消转发');
      },
      fail: function (res) {
        // 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {
          //用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {
          //转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    };
  }
});