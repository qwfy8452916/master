const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';

let utils = require('../../utils/util.js');

Page({
  data: {
    topaytype: true,
    themecolor: '',
    //主题颜色
    customerId: '',
    //用户id
    resourceId: '',
    //房源id
    mxboxtype: false,
    //明细弹窗是否显示
    prompttype: false,
    //入住时间不足设置时间的提示是否显示
    roomnum: 1,
    //房间数
    contact: '',
    //联系人
    tel: '',
    //联系电话
    remark: '',
    //备注
    currenttime: '',
    //时间选择起始时间
    userchecktime: '',
    //用户选择入住时间
    userdeparturetime: '',
    //用户选择离店时间
    checktime: '06:00',
    //钟点房设置的开始时间
    deadline: '22:00',
    //钟点房设置的离店时间
    duration: '',
    //钟点房设置的时长
    roomdetail: '',
    //房源信息
    starTime: '',
    //入住时间
    starweek: '',
    //入住-星期
    day: '',
    //入住几晚
    endTime: '',
    //离店时间
    endweek: '',
    //离店-星期
    totalPrice: '',
    //总房价
    totalPrice_: '',
    //总房价计算
    toBookCount: '',
    //房源可选数量
    shareuser: ''
  },
  onLoad: function (options) {
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    that.setData({
      customerId: app.globalData.userId,
      shareuser: app.globalData.shareUser,
      starTime: options.starTime,
      //入住时间
      starweek: options.starweek,
      //入住-星期
      day: options.day,
      //入住几晚
      endTime: options.endTime,
      //离店时间
      endweek: options.endweek,
      //离店-星期
      resourceId: options.id
    });
    wx2my.getStorage({
      key: 'themecolor',
      success: function (res) {
        that.setData({
          themecolor: res.data
        });
      }
    });
    that.get_roominfo(options);
  },
  get_roominfo: function (options) {
    const that = this;
    let linkData = {
      from: options.starTime,
      resource: options.id,
      to: options.endTime
    };
    wxrequest.getroominfo2(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          roomdetail: resdatas,
          totalPrice: resdatas.totalPrice,
          totalPrice_: resdatas.totalPrice,
          deadline: resdatas.hourRoomEndTime,
          checktime: resdatas.hourRoomStartTime,
          duration: resdatas.hourRoomDuration,
          toBookCount: resdatas.toBookCount
        });
        let timedata = utils.formatcurrenttime(new Date()); //获取当前时间

        let timedata2 = Date.parse(new Date()); //获取当前时间

        that.getTiemfun(resdatas.hourRoomDuration, timedata, timedata2); //获取钟点房入住时间和离店时间
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
  getTiemfun: function (timenum, timedata, timedata2) {
    //获取钟点房入住时间和离店时间
    const that = this;
    let userchecktime; //用户选择入住时间

    let checktime = that.data.checktime; //钟点房设置的开始时间

    let currenttime; //时间选择起始时间

    let timedata_ = timedata; //用户选择时间

    let nowtime = utils.formatcurrenttime(new Date()); //获取当前时间

    if (timedata_ >= checktime) {
      //如果当前时间大于等于限定时间，则开始时间为当前时间
      userchecktime = timedata_;
      currenttime = nowtime;
    } else {
      userchecktime = that.data.checktime;
      currenttime = that.data.checktime;
    }

    let prompttype; //入住时间不足设置时间的提示是否显示

    let deadline = that.data.deadline; //钟点房设置的离店时间

    if (deadline == '00:00') {
      deadline = '24:00';
    }

    let endtime2; //计算得到的不足4小时的最后入住时间

    let nowdatetime = utils.formatDate(new Date()); //获取当前日期

    nowdatetime = nowdatetime + ' ' + deadline + ':00';
    nowdatetime = Date.parse(nowdatetime);
    nowdatetime = nowdatetime / 1000;
    let tomorrow_timetamp2 = nowdatetime - timenum * 60 * 60; //加时的时间

    let n_to2 = tomorrow_timetamp2 * 1000;
    let tomorrow_date2 = new Date(n_to2);
    let h_tomorrow2 = tomorrow_date2.getHours(); //加时后的时刻

    let m_tomorrow2 = tomorrow_date2.getMinutes(); //加时后的分钟

    if (h_tomorrow2 < 10) {
      h_tomorrow2 = '0' + h_tomorrow2;
    } else {
      h_tomorrow2 = h_tomorrow2;
    }

    if (m_tomorrow2 < 10) {
      m_tomorrow2 = '0' + m_tomorrow2;
    }

    endtime2 = h_tomorrow2 + ':' + m_tomorrow2;
    let endtime; //计算得到的截止时间

    let endtimedata = utils.formatDate(new Date()); //获取当前日期

    endtimedata = endtimedata + ' ' + userchecktime + ':00';
    endtimedata = Date.parse(endtimedata);
    endtimedata = endtimedata / 1000;
    let tomorrow_timetamp = endtimedata + timenum * 60 * 60; //加时的时间

    let n_to = tomorrow_timetamp * 1000;
    let tomorrow_date = new Date(n_to);
    let h_tomorrow = tomorrow_date.getHours(); //加时后的时刻

    let m_tomorrow = tomorrow_date.getMinutes(); //加时后的分钟

    if (h_tomorrow < 10) {
      h_tomorrow = '0' + h_tomorrow;
    } else {
      h_tomorrow = h_tomorrow;
    }

    if (m_tomorrow < 10) {
      m_tomorrow = '0' + m_tomorrow;
    }

    endtime = h_tomorrow + ':' + m_tomorrow;

    if (endtime2 < timedata) {
      endtime = deadline;
      prompttype = true;
    } else {
      if (endtime >= deadline) {
        //计算得到的截止时间大于等于设置的截至时间，则截至时间为设置的截止时间
        endtime = deadline;
        prompttype = true;
      } else {
        endtime = endtime;
        prompttype = false;
      }
    }

    that.setData({
      userchecktime: userchecktime,
      currenttime: currenttime,
      userdeparturetime: endtime,
      prompttype: prompttype
    });
    wx2my.hideLoading();
  },
  roomnumfun: function (e) {
    //房间数
    const that = this;
    let roomnum = e.detail.value;
    let toBookCount = that.data.toBookCount;
    let totalPricenum = JSON.stringify(that.data.totalPrice);
    totalPricenum = JSON.parse(totalPricenum);

    if (roomnum >= 1 && roomnum <= toBookCount) {
      //计算总金额
      totalPricenum = totalPricenum * 100 * roomnum / 100;
    } else if (roomnum > toBookCount) {
      wx2my.showToast({
        title: '预定房间数量超出范围',
        icon: 'none',
        duration: 2000
      });
      roomnum = 1;
    }

    that.setData({
      roomnum: roomnum,
      totalPrice_: totalPricenum
    });
  },
  contactfun: function (e) {
    //联系人
    this.setData({
      contact: e.detail.value
    });
  },
  telfun: function (e) {
    //联系电话
    this.setData({
      tel: e.detail.value
    });
  },
  remarkfun: function (e) {
    //备注
    this.setData({
      remark: e.detail.value
    });
  },
  showmx: function (e) {
    //显示明细弹窗
    this.setData({
      mxboxtype: !e.currentTarget.dataset.mxboxtype
    });
  },
  hidemx: function () {
    //隐藏明细弹窗
    this.setData({
      mxboxtype: false
    });
  },
  bindTimeChange: function (e) {
    //选择入住时间（钟点房）
    const that = this;
    let time = e.detail.value;
    let timedata = utils.formatDate(new Date()); //获取当前日期

    time = timedata + ' ' + time + ':00';
    time = Date.parse(time);
    that.getTiemfun(that.data.duration, e.detail.value, time); //获取钟点房入住时间和离店时间

    that.setData({
      userchecktime: e.detail.value
    });
  },
  topay: function (e) {
    //去支付
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    const thatdata = this.data;
    const roomnum = thatdata.roomnum; //房间数

    const contact = thatdata.contact; //联系人

    const tel = thatdata.tel; //联系电话

    const remark = thatdata.remark; //备注

    const userchecktime = thatdata.userchecktime; //入住时间

    const userdeparturetime = thatdata.userdeparturetime; //离店时间

    const ishourroom = e.currentTarget.dataset.ishourroom;
    const starTime = thatdata.starTime;
    let endTime = thatdata.endTime;
    let totalPrice_ = thatdata.totalPrice_;
    let hourTime; //钟点房入住时段

    const shareuser = that.data.shareuser;
    let shareUserId = '';
    let shareUserType = '';

    if (shareuser != '0' && shareuser != '') {
      shareUserId = shareuser.id;
      shareUserType = shareuser.type;
    }

    if (ishourroom == 1) {
      //钟点房
      hourTime = userchecktime + '-' + userdeparturetime;
      endTime = starTime;
    } else {
      hourTime = '';
    }

    that.setData({
      //隐藏明细弹窗
      mxboxtype: false
    });

    if (roomnum <= 0) {
      wx2my.showToast({
        title: '至少预定1间房间',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (contact == '') {
      wx2my.showToast({
        title: '请输入住客姓名',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (tel == '') {
      wx2my.showToast({
        title: '请填写手机号码',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (!/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(tel)) {
      wx2my.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (totalPrice_ <= 0) {
      wx2my.showToast({
        title: '价格异常，请重新下单',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    that.setData({
      topaytype: false
    });
    totalPrice_ = totalPrice_.toFixed(2);
    let linkData = {
      shareCode: app.globalData.sharecode,
      shareUserId: shareUserId,
      //分享者的用户Id,
      shareUserType: shareUserType,
      //分享者的用户类型(1:员工，2：顾客)
      cabId: app.globalData.cabId,
      //柜子id
      customerId: thatdata.customerId,
      //用户id
      hotelId: app.globalData.hotelId,
      //酒店id
      resourceId: thatdata.resourceId,
      //房源id
      arrivalDateStr: thatdata.starTime,
      //入住日期
      leaveDateStr: endTime,
      //离店日期
      hourTime: hourTime,
      //钟点房入住时间段
      cusName: contact,
      //住客姓名
      cusPhone: tel,
      //住客手机号
      cusRemark: remark,
      //顾客备注
      roomCount: thatdata.roomnum,
      //房间数
      totalAmount: totalPrice_ //房间总价

    };
    wxrequest.postdfroom(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.post_wxpay(resdatas);
      } else {
        wx2my.showModal({
          title: '提示',
          content: resdata.msg,
          showCancel: false,

          success(res) {
            if (res.confirm) {
              wx2my.navigateBack({
                delta: 1
              });
            }
          }

        });
        that.setData({
          topaytype: true
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  post_wxpay: function (res_data) {
    const that = this;
    const thatdata = this.data;
    let linkData = {
      appletType: app.globalData.appletType,
      id: res_data.id,
      customerId: thatdata.customerId
    };
    wxrequest.postwxpay(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.getpayfun(resdatas, res_data); //支付
      } else {
        wx2my.showModal({
          title: '提示',
          content: resdatas.msg,
          showCancel: false,

          success(res) {
            if (res.confirm) {
              wx2my.navigateBack({
                delta: 1
              });
            }
          }

        });
        that.setData({
          topaytype: true
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  getpayfun: function (data, res_data) {
    //支付
    const that = this;
    that.setData({
      topaytype: false
    });
    wx.requestPayment({
      appId: data.appId,
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
      success: function (res) {
        wx2my.hideToast(); //隐藏加载动画

        if (res.errMsg === "requestPayment:ok") {
          that.confirmfun(res_data.id, res_data.orderCode);
        }
      },
      fail: function (res) {
        //取消订单
        wx2my.hideLoading();
        wx2my.showModal({
          title: '提示',
          content: '订单支付失败，请重新下单',
          showCancel: false,

          success(res) {
            that.setData({
              topaytype: true
            });

            if (res.confirm) {
              wxrequest.canceldforder(res_data.id).then(res => {
                let resdata = res.data;
                let resdatas = res.data.data;

                if (resdata.code == 0) {
                  console.log('订单取消成功');
                } else {
                  console.log('订单取消失败');
                }
              }).catch(err => {
                wx2my.hideLoading();
                console.log(err);
                wx2my.hideLoading();
                console.log(err);
              });
            }
          }

        });
      }
    });
  },
  confirmfun: function (orderid, ordercode) {
    //确认支付状态
    const that = this;
    let linkData = {
      orderCode: ordercode,
      appletType: app.globalData.appletType
    };
    wxrequest.getpaytype(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        if (resdatas.result == 'SUCCESS') {
          wx2my.hideLoading();
          that.setData({
            topaytype: true
          });
          wx2my.redirectTo({
            url: '../reservationdetails/reservationdetails?id=' + orderid + '&redcode=' + resdatas.redCode + '&type=1'
          });
        } else {
          that.setData({
            topaytype: true
          });
          wx2my.showToast({
            title: '支付失败，请重新支付',
            icon: 'none',
            duration: 2000
          });
        }
      } else {
        that.setData({
          topaytype: true
        });
        wx2my.showToast({
          title: '支付失败，请重新支付',
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  }
});