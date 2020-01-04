const app = getApp();
import wxrequest from '../../../request/api'
Component({
  properties: {
    actImageUrl: {
      type: String,
      value: ''
    },
    actId: {
      type: Number,
      value: ''
    },
    actAdImageUrl: {
      type: String,
      value: ''
    }
  },
  data: {
    showtype: true,
    newcomertype: 0,
    listdata: ''
  },
  methods: {
    closefun: function () {//关闭活动
      this.setData({
        showtype: false
      });
    },
    openfun: function () {//打开红包
      const that = this;
      wx.showLoading({
        title: '加载中',
      });
      let linkData = {
        actId: that.properties.actId,
        hotelId: app.globalData.hotelId
      };
      wxrequest.putActNewcomer(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if(resdata.code == 0){
          that.setData({
            newcomertype: 1,
            listdata: resdatas
          });
          wx.hideLoading();
        } else {
          wx.hideLoading();
          that.setData({
            showtype: false
          });
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      })
      .catch(err => {
        console.log(err)
      });
    }
  }
})