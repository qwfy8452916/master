const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    themecolor: '',//主题颜色
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',//酒店配送支持功能（1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    userid: '',
    hotelId: '',
    roomCode: '',
    toView: '',//切换侧边栏
    detailtype: false,//明细列表是否显示
    prodnumtype: 0,//是否选择了商品
    subtype: 1,//1：可提交，0：提交中
    roomserviceId: '',//服务id
    styledata: {},//客房服务数据
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      userid: app.globalData.userId,
      hotelId: app.globalData.hotelId
    });
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomDelivery',
      success(res) {
        that.setData({
          roomDelivery: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomService',
      success(res) {
        that.setData({
          roomService: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomCode',
      success: function (res) {
        that.setData({
          roomCode: res.data
        });
      }
    });
    that.getroomservicelist(options.id);//获取客房服务列表
  },
  onShow:function () {
    const that = this;
    that.setData({
      prodnumtype: 0
    });
    if (that.data.roomserviceId != ''){
      that.getroomservicelist(that.data.roomserviceId);//获取客房服务列表
    }
  },
  onUnload: function(){
    this.setData({
      roomserviceId: ''
    });
  },
  getroomservicelist: function (id) {//获取客房服务列表
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    wxrequest.getroomorderlist(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      wx.setNavigationBarTitle({
        title: resdatas.showName
      });
      if (resdata.code == 0) {
        if (resdatas.style == "LIST_ORDER"){
          for (let i = 0; i < resdatas.styles.length; i++){
            for (let j = 0; j < resdatas.styles[i].rmsvcHotelCategoryCommonStyleDTOList.length; j++) {
              resdatas.styles[i].rmsvcHotelCategoryCommonStyleDTOList[j].prodnum = 0;
            }
          }
        }
        that.setData({
          styledata: resdatas,
          roomserviceId: id
        });
        wx.hideLoading();
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  detailfun: function (e) {//bannerlist查看详情
    let infodata = {};
    infodata.isNeedAttachment = this.data.styledata.isNeedAttachment;
    infodata.isNeedDescription = this.data.styledata.isNeedDescription;
    infodata.isNeedNum = this.data.styledata.isNeedNum;
    infodata.isNeedRoomNo = this.data.styledata.isNeedRoomNo;
    infodata.style = this.data.styledata.style;
    infodata = JSON.stringify(infodata);
    wx.navigateTo({
      url: '../roomservicedetail1/roomservicedetail1?id=' + e.currentTarget.dataset.id + '&hotelcategoryid=' + e.currentTarget.dataset.hotelcategoryid + '&infodata=' + infodata
    })
  },
  detailfun2: function (e) {//列表详情下单
    let style_data = {};
    style_data.isNeedAttachment = this.data.styledata.isNeedAttachment;
    style_data.isNeedDescription = this.data.styledata.isNeedDescription;
    style_data.isNeedNum = this.data.styledata.isNeedNum;
    style_data.isNeedRoomNo = this.data.styledata.isNeedRoomNo;
    style_data.style = this.data.styledata.style;
    style_data = JSON.stringify(style_data);
    let infodata = JSON.stringify(e.currentTarget.dataset.infodata);
    if (this.data.roomService == 2){
      wx.navigateTo({
        url: '../roomservicedetail2/roomservicedetail2?infodata=' + infodata + '&styledata=' + style_data
      })
    }
  },
  bindToView: function(e) {//侧边栏切换
    this.setData({
      toView: 'list-' + e.currentTarget.dataset.id
    })
  },
  changenum: function (e) {//修改商品数量
    const that = this;
    const index1 = e.currentTarget.dataset.index1;
    const index2 = e.currentTarget.dataset.index2;
    const type = e.currentTarget.dataset.type;
    const listdata = that.data.styledata;
    let prodnumtype = that.data.prodnumtype;
    let prodnum = listdata.styles[index1].rmsvcHotelCategoryCommonStyleDTOList[index2].prodnum;
    listdata.styles[index1].rmsvcHotelCategoryCommonStyleDTOList[index2].index1 = index1;
    listdata.styles[index1].rmsvcHotelCategoryCommonStyleDTOList[index2].index2 = index2;
    if (type == 1) {//减
      if (prodnum >= 1){
        prodnum -= 1;
        prodnumtype -= 1;
      }
    } else {//加
      if (prodnum >= 20){
        wx.showToast({
          title: '数量已超出范围，不可增加',
          icon: 'none',
          duration: 2000
        });
      } else {
        prodnum += 1;
        prodnumtype += 1;
      }
    }
    listdata.styles[index1].rmsvcHotelCategoryCommonStyleDTOList[index2].prodnum = prodnum;
    that.setData({
      styledata: listdata,
      prodnumtype: prodnumtype
    });
  },
  showdetail: function () {//查看明细
    const that = this;
    that.setData({
      detailtype: !that.data.detailtype
    });
  },
  subfun: function () {//提交订单
    const that = this;
    const prodnumtype = that.data.prodnumtype;
    const userid = that.data.userid;
    const hotelId = that.data.hotelId;
    const roomCode = that.data.roomCode;
    const styledata = that.data.styledata.styles;
    let postdata = {};
    let listdata = [];
    if (prodnumtype == 0){
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    for (let i = 0; i < styledata.length; i++) {
      for (let j = 0; j < styledata[i].rmsvcHotelCategoryCommonStyleDTOList.length; j++) {
        let proddata = styledata[i].rmsvcHotelCategoryCommonStyleDTOList[j];
        if (proddata.prodnum > 0) {
          proddata.content = "";//动态表单提交内容
          proddata.count = proddata.prodnum;//商品数量
          proddata.hotelCategoryCommonStyleId = proddata.id;//酒店服务下单通用明细样式表id
          proddata.imgPath = [];//上传的图片
          proddata.rmsvcOrderId = proddata.id;//客房服务订单父表id
          proddata.style = that.data.styledata.style;//明细样式类型
          listdata.push(proddata);
        }
      }
    }
    postdata.customerId = userid;
    postdata.hotelCategoryId = styledata[0].rmsvcHotelCategoryCommonStyleDTOList[0].hotelCategoryId;
    postdata.hotelId = hotelId;
    postdata.rmsvcOrderDetailDTOList = listdata;
    postdata.roomCode = roomCode;
    postdata.userRemark = "";
    postdata.isNeedAttachment = that.data.styledata.isNeedAttachment;
    postdata.isNeedDescription = that.data.styledata.isNeedDescription;
    postdata.isNeedNum = that.data.styledata.isNeedNum;
    postdata.isNeedRoomNo = that.data.styledata.isNeedRoomNo;
    postdata = JSON.stringify(postdata);
    wx.navigateTo({
      url: '../roomservicedetail3/roomservicedetail3?postdata=' + postdata
    });
  },
  telfun: function () {//联系客服
    const that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.styledata.contacts
    });
  }
})