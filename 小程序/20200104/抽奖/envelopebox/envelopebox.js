Component({
  properties: {
  },
  data: {
    isShow: true
  },
  methods: {
    hideEnvelopebox() {//隐藏弹框 
      this.setData({
        isShow: false
      })
      this.triggerEvent('ifCoupon')
    },
    receivefun() {//领取红包
      this.setData({
        isShow: false
      });
      wx.navigateTo({
        url: '/pages/receiveenvelope/receiveenvelope'
      })
    },
  }
})