// pages/classifyManage/classifyManage.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    id:'',
    hotelId:'', //酒店id
    funcCnName:'', //功能区名称
    typeDataDetail:[], //分类数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   let that=this;
   this.setData({
     id:options.id,
     hotelId: options.hotelId,
     funcCnName: options.funcCnName,
     authzData: wx.getStorageSync("pageAuthority"),
   })
    
  },


  //功能区分类 - 树
  functionClassifyTreefen:function(){
    let that=this;
    let linkData={
      funcId: that.data.id,
      hotelId: that.data.hotelId
    }
    wxrequest.functionClassifyTreefen(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
         that.setData({
           typeDataDetail: resdata.data
         })
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000
        })
      }
    }).catch(err=>{
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },

  //删除一级分类
  oneDele:function(e){
    let that=this;
    let typedata = e.currentTarget.dataset.typedata;
    let id = typedata.id;
    if (typedata.childDtoList != null && typedata.childDtoList.length >0){
        wx.showToast({
          title: '此条目下存在子级，无法删除!',
          icon:'none',
          duration:2000
        })
        return false;
    }
    wx.showModal({
      title: '提示',
      content: '是否删除该一级分类',
      success(res) {
        if (res.confirm) {
          that.sureDele(id)
        }
      }
    })
  },

  //删除二级分类
  twoDele:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否删除该二级分类',
      success(res){
        if(res.confirm){
          that.sureDele(id)
        }
      }
    })
  },

  //确定删除分类
  sureDele:function(id){
    let that=this;
    wxrequest.functionClassifyDelete(id).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
          if(resdata.data==true){
            that.functionClassifyTreefen();
          }
       }else{
         wx.showToast({
           title: resdata.msg,
           icon:'none',
           duration:2000
         })
       }
    }).catch(err=>{
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },

  //新增一级分类
  oneadd:function(e){
    let that=this;
    wx.navigateTo({
      url: '../addClassify/addClassify?funcCnName=' + that.data.funcCnName + '&id=' + that.data.id+'&judge='+1,
    })
  },

  //修改一级分类
  oneEdit:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../addClassify/addClassify?id=' + id + '&judge=' + 2 + '&funcCnName=' + that.data.funcCnName,
    })
  },

  //新增二级分类twoadd
  twoadd: function (e) {
    let that=this;
    let categorydata = JSON.stringify(e.currentTarget.dataset.categorydata);
    let categoryName = e.currentTarget.dataset.categoryname;
    wx.navigateTo({
      url: '../classifyTwo/classifyTwo?categoryName=' + categoryName + '&judge=' + 1 + '&id=' + that.data.id + '&categorydata=' + categorydata,
    })
  },

  //修改二级分类
  twoEdit:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../classifyTwo/classifyTwo?id=' + id + '&judge=' + 2,
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
    this.functionClassifyTreefen();
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