//index.js
//获取应用实例
const app = getApp()
let apiUrl = app.getApiUrl();
// let storagehc = app.globalData.token;
// let storagehc = app.globalstorage(function(res){
//   return res.data
// });
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    isHideCity:true,
    radioItems: [
      { name: 'lianxradio01', value: '已与您联系' },
      { name: 'lianxradio02', value: '已为您量房' }
    ],
    delcompdata:null,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this  
    console.log(options.order_no)
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })


    wx.request({
      url: apiUrl + '/v1/myrenovation/getcompanylist',
      data: { orderid:options.order_no },
      header: {
        'content-type': 'application/json',
        'token': app.globalData.token
      },
      method:"POST",
      success: function (res) {
        console.log(res)
        that.setData({
          delcompdata:res.data.data.list
        })
        console.log(that.data.delcompdata)
      }
    });
    

  },

  tancselect:function(){
     var that=this;
     that.setData({
       isHideCity:false
     })
  },
  yingyclose:function(){
    var that = this;
    that.setData({
      isHideCity: true,
    })
  },
  quxiaotc:function(){
    var that = this;
    that.setData({
      isHideCity: true,
    })
  },
  savebc: function () {
    var that = this;
    that.setData({
      isHideCity: true,
    })
  },

  radioChange: function (e) {
    console.log(e)
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  qianyue:function(){
    wx.navigateTo({
      url: '../companyprogress/companyprogress',
    })
  },
  login:function(){
    wx.navigateTo({
      url: '../myorder/myorder'
    })
  }
})
