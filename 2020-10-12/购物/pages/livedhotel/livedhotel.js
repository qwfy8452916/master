const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    customerId: '',
    livedlist: [],
    pageNum: 1,
    pages: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      customerId: app.globalData.userId
    });
    that.get_myhistory(1);
  },
  get_myhistory: function (delipage) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      pageSize:10,
      pageNo: delipage,
    };
    wxrequest.getmyhistory(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        const lived_list = that.data.livedlist;
        let listdata = [];
        if(lived_list.length > 0) {
          listdata = lived_list.concat(resdatas.records)
        } else {
          listdata = resdatas.records;
        }
        that.setData({
          pages: resdatas.pages,
          livedlist: listdata
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
      pageNum: 1,
      livedlist: []
    })
    that.get_myhistory(1);//获取酒店市场分类一级目录
  },
  onReachBottom: function () {//上拉加载
    var that = this;
    let pageNo = that.data.pageNum;
    let pages = that.data.pages;
    if (pageNo < pages) {
      wx.showLoading({// 显示加载图标
        title: '玩命加载中',
      });
      pageNo = pageNo + 1;// 页数+1
      that.setData({
        pageNum: pageNo
      })
      that.get_myhistory(pageNo);
    }
  },
  openfun: function (e) {
    const code = e.currentTarget.dataset.code;
    const id = e.currentTarget.dataset.id;
    wx.reLaunch({
      url: '../login/login?historycode=' + code + '&lastvisitid=' + id
    })
  }
})