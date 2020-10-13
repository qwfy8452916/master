// pages/selfTakingList/selfTakingList.js
const app=getApp();
import wxrequest from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    pageNum:1,
    sizejudge:0,
    selftakingData:[], //自提点数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
    })
    this.selftakingList();
  },


  //获取自提点
  selftakingList:function(){
    let that=this;
    let tempDataSet=[];
    let linkData={
      hotelId: wx.getStorageSync('hotelId'),
      pageNo: that.data.pageNum,
      pageSize:20
    }
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.selftakingList(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        if (resdata.data.records.length > 0 && resdata.data.records.length<20){
          that.setData({
            sizejudge:0
          })
        }else{
          that.setData({
            sizejudge: 1
          })
        }
        if(that.data.pageNum>1){
          tempDataSet = that.data.selftakingData.concat(resdata.data.records)
        }else{
          tempDataSet = resdata.data.records
        }
        that.setData({
          selftakingData: tempDataSet
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

  //开启状态
  switch1Change:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wxrequest.selftakeStatus(id).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         wx.showToast({
           title:"操作成功",
           icon:'none',
           duration:2000
         })
         that.selftakingList();
       }else{
         wx.showToast({
            title:resdata.msg,
            icon:'none',
            duration:2000
         })
         setTimeout(function () {
           that.selftakingList();
         }, 500)
       }
    }).catch(err=>{
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },

  //删除
  deleteSelftake:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;

    wx.showModal({
      title: '提示',
      content: '是否删除此自提点',
      confirmText: "删除",
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          that.sureDele(id)
        }
      }
    });
   
  },

  sureDele:function(id){
    let that=this;
    wxrequest.deleteSelftake(id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.selftakingList();
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //新增自提点
  selfTakingAdd:function(){
    wx.navigateTo({
      url: '../selfTakingAdd/selfTakingAdd',
    })
  },

  //修改自提点
  selfTakingEdit:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../selfTakingEdit/selfTakingEdit?id='+id,
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
    let nowpageNum=this.data.pageNum;
    if(sizejudge){
       this.setData({
         pageNum: ++nowpageNum
       })
      this.selftakingList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})