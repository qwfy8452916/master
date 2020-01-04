const app = getApp();
import wxrequest from '../../../request/api'
Component({
  properties: {
    shareUserAvatarUrl: {
      type: String,
      value: ''
    },
    shareUserNickName: {
      type: String,
      value: ''
    },
    redbagtype: {
      type: Number,
      value: ''
    }
  },
  data: {
    showtype: true,
    redbag_type: 0,
    redbagdata: ''
  },
  methods: {
    closefun: function () {//关闭红包
      this.setData({
        showtype: false
      });
    },
    openfun: function () {//打开红包
      const that = this;
      if(that.data.redbag_type == 0) {
        wx.showLoading({
          title: '加载中',
        });
        let linkData = {
          redPacketCode: app.globalData.shareredbag_code
        };
        wxrequest.getshareredbag(linkData).then(res => {
          let resdata = res.data;
          let resdatas = res.data.data;
          if(resdata.code == 0){
            if (resdatas.code == 0 || resdatas.code == 1) {
              that.setData({
                redbag_type: 1,
                redbagdata: resdatas
              });
              wx.hideLoading();
            } else {
              that.setData({
                redbag_type: 2
              });
              wx.hideLoading();
            }
          } else {
            wx.hideLoading();
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
  }
})