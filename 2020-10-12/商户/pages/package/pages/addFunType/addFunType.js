// pages/package/pages/addFunType/addFunType.js
const app = getApp();
import wxrequest from '../../../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addfunTyoeJudge: false,
    addfunctionData: {
      funcId: '', //功能区id
      funName: '', //功能区名称
      classifyIds: [],  //选中分类id
      classifyData: [], //选中分类数据
    }, //功能区分类
    functionList: [], //功能区数据
    functionIndex:'',
    classifyList:[], //分类数据
    classifyIndex:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(JSON.parse(options.delivWays))
    this.setData({
      id: options.id,
      delivWays: JSON.parse(options.delivWays),
      pickUpPointIds: JSON.parse(options.pickUpPointIds)
    })

    this.hotelProdUnsedFunctionList();
    
  },

 

  //获取酒店商品下未被选用的功能区列表
  hotelProdUnsedFunctionList: function () {
    let that = this;
    let linkData={
      hotelId: wx.getStorageSync('hotelId'),
      delivWays: that.data.delivWays.toString(),
      pointIds: that.data.pickUpPointIds.toString(),
    }
    wxrequest.hotelProdUnsedFunctionList(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowfunctionList = that.data.functionList;
        nowfunctionList = resdata.data.map(item => {
          return {
            id: item.id,
            funcCnName: item.funcCnName
          }
        })
        that.setData({
          functionList: nowfunctionList
        })

        

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

  //选择功能区
  bindPickerFun: function (e) {
    let that = this;
    let index = e.detail.value;

    this.setData({
      functionIndex: index,
      'addfunctionData.funcId': that.data.functionList[index].id,
      'addfunctionData.funcName': that.data.functionList[index].funcCnName,
    })
    that.getClassifyList();
    console.log(this.data.addfunctionData)
  },



  //获取功能区市场分类
  getClassifyList:function(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync('hotelId'),
      funcId: that.data.addfunctionData.funcId,
    }
    wxrequest.hotelProdUnsedFunctionCategory(linkData).then(res=>{
       let resdata=res.data;
      let nowclassifyList = that.data.classifyList;
       if(resdata.code==0){
         nowclassifyList=resdata.data.map(item=>{
           return {
             categoryId: item.id,
             categoryName: item.categoryName,
             categoryjudge: false,
           }
         })
         that.setData({
           classifyList: nowclassifyList
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



  //选择分类
  selectclassifyList: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowclassifyList = this.data.classifyList;
    let nowclassifyIds = this.data.addfunctionData.classifyIds;
    let nowclassifyData = this.data.addfunctionData.classifyData;

    let flagIndex;


    if (nowclassifyIds.length > 0) {
      let flag = nowclassifyIds.some((item, valueIndex) => {
        if (item == nowclassifyList[index].categoryId) {
          flagIndex = valueIndex
          return true;
        }
      })
      if (flag) {
        nowclassifyIds.splice(flagIndex, 1)
        nowclassifyData.splice(flagIndex,1)
        nowclassifyList[index].categoryjudge = false
      } else {
        nowclassifyIds.push(nowclassifyList[index].categoryId)
        nowclassifyData.push(nowclassifyList[index])
        nowclassifyList[index].categoryjudge = true
      }
    } else {
      nowclassifyData.push(nowclassifyList[index])
      nowclassifyIds.push(nowclassifyList[index].categoryId)
      nowclassifyList[index].categoryjudge = true
    }


    that.setData({
      'addfunctionData.classifyIds': nowclassifyIds,
      'addfunctionData.classifyData': nowclassifyData,
      classifyList: nowclassifyList,

    })
    console.log(that.data.addfunctionData.classifyIds)
    console.log(that.data.addfunctionData.classifyData)
  },



  //确定
  surebtn: function () {
    let that = this;
    let nowaddfunctionData = this.data.addfunctionData;

    if (nowaddfunctionData.funcId == '') {
      wx.showToast({
        title: '请选择功能区',
        icon: 'none',
        duration: 2000
      })
      return false;
    }


    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      addfunTyoeJudge: true,
      addfunctionData: that.data.addfunctionData
    })
    wx.navigateBack({
      delta: 1
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