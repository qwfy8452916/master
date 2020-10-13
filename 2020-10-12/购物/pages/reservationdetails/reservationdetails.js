const app = getApp();
import wxrequest from '../../request/api'
let util = require("../../utils/util.js");
Page({
  data: {
    global_Data: '',
    showtype: false,
    type: '',
    user_name: '',
    redcode: '',
    id: '',//订单id
    orderinfo: '',//订单信息
    roominfo: '',
    arrivalWeek: '',
    leaveWeek: '',
    iscancel: true//是否可退订
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        that.setData({
          user_name: res.data.nickName
        });
      },
      fail: function(){
        that.setData({
          user_name: ''
        });
      }
    });
    let red_code = options.redcode;
    if(red_code == '' || red_code == 'null'){
      red_code = -1;
    }
    that.setData({
      global_Data: app.globalData,
      id: options.id,
      redcode: red_code,
      type: options.type
    });
    that.get_dfdetail(options.id);
  },
  onShow: function() {
  },
  get_dfdetail: function(id){//获取订房详情
    const that = this;
    wxrequest.getdfdetail(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let arrivaltime = util.getDates(1, resdatas.arrivalDate);
        let arrivalWeek = arrivaltime[0].week;
        let leavetime = util.getDates(1, resdatas.leaveDate);
        let leaveWeek = leavetime[0].week;
        that.setData({
          orderinfo: resdatas,
          roominfo: resdatas.bookRoomResourceDTO,
          arrivalWeek: arrivalWeek,
          leaveWeek: leaveWeek
        });
        that.iscancelfun(resdatas.bookRoomResourceDTO.cancelDeadline, resdatas.arrivalDate);//是否可退订
      } else {
        wx.showModal({
          title: '提示',
          content: resdata.msg,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              });
            }
          }
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  iscancelfun: function (cancelDeadline, arrivalDate) {//是否可退订
    const that = this;
    let today = util.formatDate(new Date());//获取当前日期
    let timedata = util.formatcurrenttime(new Date()); //获取当前时间
    let todaytime = today + ' ' + timedata;//当前日期时间点
    let cancelDeadlineval = cancelDeadline;
    if (cancelDeadline == null || cancelDeadline == '00:00'){
      cancelDeadlineval = '24:00:00';
    }
    let arrivaltime = arrivalDate + ' ' + cancelDeadlineval;//退订最后日期时间点
    let iscancel;
    if (todaytime > arrivaltime){
      iscancel = false;
    }else{
      iscancel = true;
    }
    that.setData({
      iscancel: iscancel
    });
    console.log(this.data.iscancel)
    wx.hideLoading();
  },
  unsubscribefun: function () {//申请退订
    const that = this;
    wxrequest.putdforder(that.data.id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0 && resdatas) {
        wx.showModal({
          title: '提示',
          content: '订单已申请取消，等待确认',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../reservationlist/reservationlist'
              })
            }
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: resdata.msg,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../reservationlist/reservationlist'
              })
            }
          }
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  sharefun: function () {//打开分享窗口
    this.setData({
      showtype: true
    });
    wxrequest.putredbagtype(that.data.redcode).then(res => {
      const resdata = res.data;
      if (resdata.code == 0) {
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
  closefun: function () {//关闭分享窗口
    this.setData({
      showtype: false
    })
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    return {
      title: that.data.user_name?that.data.user_name+'给你发了一个现金红包，领取后可提入微信零钱':'好友给你发了一个现金红包，领取后可提入微信零钱',
      path: 'pages/login/login?sharecode=' + that.data.redcode,  // 路径，传递参数到指定页面。
      imageUrl: that.data.global_Data.imgurldata + 'shareimg.png', // 分享的封面图
      success: function (res) {// 转发成功
        
      },
      fail: function (res) {// 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {//用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {//转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    }
  }
})