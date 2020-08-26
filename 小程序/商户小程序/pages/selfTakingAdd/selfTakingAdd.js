// pages/selfTakingAdd/selfTakingAdd.js
const app=getApp();
import wxrequest from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      pointName:'', //自提点名称
      pointInstruction:'', //自提点说明
      hotelId:'',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.initValidate();//验证规则函数
  },





  initValidate() {//验证规则函数
    const that = this;
    const rules = {
      pointName: {
        required: true
      },
      pointInstruction:{
        required: true
      }
    }


    const messages = {
      pointName: {
        required: '请输入自提点名称'
      },
      pointInstruction: {
        required: '请输入自提点说明'
      },
    }
    that.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit: function (e) {//提交表单

    this.initValidate();
    const params = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false
    }
    params.hotelId = wx.getStorageSync("hotelId");

    this.setData({
      form: params,
    });
    this.sureBtn(this.data.form)

  },

  //确定新增
  sureBtn:function(data){
    let that=this;
    wx.showLoading({
      title: '提交中'
    })
    wxrequest.createSelftake(data).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        wx.redirectTo({
          url: '../selfTakingList/selfTakingList',
        })
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000
        })
      }
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})