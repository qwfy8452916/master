const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    formdata: '',
    isdtform: 0,
    showView: false,
    orderlist: [],
    roomCode: '',
    createdAt: '',
    //下单时间
    confirmTime: '',
    //确认时间
    cancelTime: '',
    //取消时间
    cancelReason: '',
    //取消原因
    remark: '',
    //下单备注
    userremark: '',
    //取消备注
    detaildata: '',
    imglist: [],
    servicename: '',
    serviceimg: '',
    serviceid: '',
    //详情id
    status: '' //0:待确认；1:已确认；2:已完成；3:已取消

  },
  onLoad: function (options) {
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    that.setData({
      serviceid: options.serviceid
    });
    that.get_orderlist(options.serviceid);
  },
  get_orderlist: function (serviceid) {
    const that = this;
    wxrequest.getorderlist(serviceid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        let detaildata = Object.values(resdatas.orderDetailMap)[0];
        let imglist = detaildata[0].imgPath;
        let dynamicformdata = detaildata[0];
        let formdata = [];
        let isdtform = 0;

        if (dynamicformdata.style === 'DYNAMIC_FORM' && dynamicformdata.content != '' && dynamicformdata.content != null) {
          formdata = JSON.parse(dynamicformdata.content);
          isdtform = 1;
        }

        that.setData({
          formdata: formdata,
          isdtform: isdtform,
          detaildata: detaildata,
          servicename: resdatas.hotelCategoryName,
          serviceimg: resdatas.hotelCategoryPicUrl,
          roomCode: resdatas.roomCode,
          createdAt: resdatas.createdAt,
          remark: resdatas.userRemark,
          status: resdatas.status,
          confirmTime: resdatas.confirmTime,
          //确认时间
          cancelTime: resdatas.cancelTime,
          //取消时间
          cancelReason: resdatas.cancelReason,
          //取消时间
          imglist: imglist
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

  cancelorderdetails() {
    //取消订单
    const that = this;
    let remark = that.data.userremark;

    if (remark == '') {
      wx2my.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您取消订单的原因'
      });
      return;
    }

    let linkData = {
      cancelReason: remark
    };
    wxrequest.putcancelorder3(that.data.serviceid, linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          showView: !that.data.showView
        });
        wx2my.redirectTo({
          url: '../kffulist/kffulist'
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

  boxshow() {
    //显示取消订单box
    this.setData({
      showView: !this.data.showView
    });
  },

  userremark: function (e) {
    //备注
    this.setData({
      userremark: e.detail.value
    });
  }
});