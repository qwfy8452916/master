const app = getApp();
import wxrequest from '../../utils/api'
app.Base({
  data: {
    pageNum: 1,
    pageSize: 10,
    sendlis: [],
  },
  onLoad: function (options) {
    const that = this;
    that.get_CouponSendRecord();
  },
  get_CouponSendRecord () {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      pageNo: that.data.pageNum,
      pageSize: that.data.pageSize,
    };
    wxrequest.getCouponSendRecord(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let sendlis_list1 = that.data.sendlis;
        const sendlis_list2 = that.data.sendlis;
        if (sendlis_list2.length == 0) {
          sendlis_list1 = resdatas.records;
        } else {
          sendlis_list1 = sendlis_list2.concat(resdatas.records);
        }
        that.setData({
          sendlis: sendlis_list1
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
      wx.hideLoading();
      console.log(err)
    });
  },
  onPullDownRefresh: function () {//下拉刷新
    const that = this;
    that.setData({
      pageNum: 0,
      sendlis: []
    })
    that.get_CouponSendRecord();
  },
  onReachBottom: function () {//上拉加载
    var that = this;
    let pageNo = that.data.pageNum;
    let pages = that.data.pageSize;
    if (pageNo < pages) {
      pageNo = pageNo + 1;// 页数+1
      that.setData({
        pageNum: pageNo
      })
      that.get_CouponSendRecord();
    }
  }
})