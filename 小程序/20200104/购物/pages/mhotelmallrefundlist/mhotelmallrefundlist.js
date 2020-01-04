const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    customerId: '',
    hotelId: '',
    datalist: [],
    pages: '',//总页数
    pageNum: 1, //第一次加载，设置1 
    moretype: true //没有更多数据了
  },
  onLoad: function (options) {},
  onShow: function(){
    const that = this;
    that.setData({
      customerId: app.globalData.userId,
      hotelId: app.globalData.hotelId,
      datalist: []
    });
    that.getdatalist(app.globalData.userId, app.globalData.hotelId, 1);
  },
  getdatalist: function (customerId, hotelId, pageNo) {//获取列表数据
    const that = this;
    let linkData = {
      customId : customerId,
      hotelId: hotelId,
      pageNo: pageNo,
      pageSize: 10
    };
    wxrequest.getafterlist(linkData).then(res => {
      const resdata = res.data.data;
      let datalist = that.data.datalist;
      if (resdata.code == 0) {
        const ndatalist = that.data.datalist;
        if (datalist.length == 0) {
          datalist = resdata.records;
        } else {
          datalist = ndatalist.concat(resdata.records);
        }
        that.setData({
          datalist: datalist,
          pages: resdata.pages
        })
      } else {
        that.setData({
          searchLoadingComplete: false
        })
      }
      wx.hideNavigationBarLoading();// 隐藏导航栏加载框
      wx.stopPullDownRefresh();// 停止下拉动作
      wx.hideLoading();// 隐藏加载框
    })
    .catch(err => {
      console.log(err)
    });
  },
  onPullDownRefresh: function () {//下拉刷新
    const that = this;
    that.setData({
      moretype: true,
      pageNum: 1,
      datalist: []
    });
    that.getdatalist(that.data.customerId, that.data.hotelId, 1);
  },
  onReachBottom: function () {//上拉加载
    var that = this;
    let pageNo = that.data.pageNum;
    let pages = that.data.pages;
    if (pages == pageNo) {
      that.setData({
        moretype: false
      })
    } else {
      wx.showLoading({// 显示加载图标
        title: '玩命加载中',
      });
      pageNo = pageNo + 1;// 页数+1
      that.setData({
        pageNum: pageNo
      })
      that.getdatalist(that.data.customerId, that.data.hotelId, pageNo);
    }
  },
  detail: function(e){//查看详情
    const dataval = e.currentTarget.dataset;
    wx: wx.navigateTo({
      url: '../mhotelmallafter/mhotelmallafter?prodstatus=5' + '&csid=' + dataval.csid
    })
  }
})