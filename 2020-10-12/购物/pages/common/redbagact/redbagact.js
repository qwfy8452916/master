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
    },
    imgurldata: {
      type: String,
      value: ''
    }
  },
  data: {
    showtype: true,
    redbag_type: 0,
    redbagdata: '',
    adLinkData: '',
  },
  attached(){
    this.getAllInfo()
  },
  methods: {
    closefun: function () {//关闭红包
      this.setData({
        showtype: false,
      });
      if(this.data.adLinkData.adLinkUrl) {
        app.globalData.typeval = 1;
      }
      app.globalData.regbagact_type = 1;
      var myEventDetail = {
        type: 1
      } 
      this.triggerEvent('redirectfun', myEventDetail)
      if(this.data.adLinkData.adUrl){
        wx.navigateTo({
          url: `/pages/adUrlPage/adUrlPage?adURL=${this.data.adLinkData.adUrl}&adURLLink=${escape(this.data.adLinkData.adLinkUrl)}`
        })
      }else if(this.data.adLinkData.adLinkUrl){
        wx.navigateTo({
          url: this.data.adLinkData.adLinkUrl
        })
      }
    },
    viewdetail(){
      this.setData({
        redbag_type: 1
      })
    },
    openfun: function () {//打开红包
      const that = this;
      if(that.data.redbag_type == 0) {
        wx.showLoading({
          title: '加载中',
        });
        let linkData = {
          redPacketCode: app.globalData.businessCode,
          gainCode: app.globalData.shareredbag_code
        };
        wxrequest.getshareredbag(linkData).then(res => {
          let resdata = res.data;
          let resdatas = res.data.data;
          if(resdata.code == 0){
            if (resdatas.code == 0) {
              app.globalData.regbagact_type = 1;
              that.setData({
                redbag_type: 1,
                redbagdata: resdatas
              });
              wx.hideLoading();
            } else if (resdatas.code == 1) {
              that.setData({
                redbag_type: 1,
                redbagdata: resdatas
              });
              wx.hideLoading();
            } else if (resdatas.code == 2) {
              that.setData({
                redbag_type: 2,
                redbagdata: resdatas
              });
              wx.hideLoading();
            }
          } else if(resdata.code == 1) {
            that.setData({
              redbag_type: 4,
            });
            wx.hideLoading();
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
          wx.hideLoading();
          console.log(err)
        });
      }
    },
    getAllInfo: function () {//打开红包
      const that = this;
      if(that.data.redbag_type == 0) {
        wx.showLoading({
          title: '加载中',
        });
        let linkData = {
          redPacketCode: app.globalData.businessCode,
          // gainCode: app.globalData.shareredbag_code
        };
        wxrequest.getAdLinks(linkData).then(res => {
          let resdatas = res.data.data;
          that.setData({
            adLinkData: resdatas
          });
        })
        .catch(err => {
          wx.hideLoading();
          console.log(err)
        });
      }
    },
    viewDetail(){
      wx.navigateTo({
        url: '/pages/myredbag/myredbag'
      })
    },
  }
})