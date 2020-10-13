// pages/package/pages/plateTypeSlect/plateTypeSlect.js
const app = getApp();
import wxrequest from '../../../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    funId:'',  //功能区id
    typeData: [
      { name: "分类1", id: 1 },
      { name: "分类2", id: 2 },
      { name: "分类3", id: 3 },
      { name: "分类4", id: 4 },
    ], //分类数据
    selectActive: [], //选择分类样式
    selectTypeData: [],  //选择分类数据
    selectTypeId:[], //选择分类id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    console.log(options.selectTypeData)
    
    this.setData({
      funId: options.funcId,
      selectTypeData:JSON.parse(options.selectTypeData),
      typejudge:options.typejudge
    })

    this.getFunctionClassify();
  

  },

  //确定
  surebtn: function () {

    let that = this;
    let nowselectTypeData = that.data.selectTypeData;
    let nowselectTypeId = [];
    nowselectTypeData.map(item => {
      nowselectTypeId.push(item.id)
    })


    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      typejudge: true,
      roomjudge: false,
      prodjudge: false,
      selectTypeId:nowselectTypeId,
      selectTypeData:this.data.selectTypeData,
    })
    wx.navigateBack({
      delta: 1
    })


  },

  //选择分类
  funitem: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowtypeData = that.data.typeData;
    let nowselectTypeData = that.data.selectTypeData;
    let flagIndex;
    if (nowselectTypeData.length > 0) {
      
      let flag = nowselectTypeData.some((item, valueindex) => {
        if (item.id == nowtypeData[index].id) {
          flagIndex = valueindex
          return true
        }
      })
      if (flag) {
        nowselectTypeData.splice(flagIndex, 1)
      } else {
        nowselectTypeData.push(nowtypeData[index])
      }

    } else {
      nowselectTypeData.push(nowtypeData[index])
    }
    let nowIndex = "selectActive[" + index + "]";
    that.setData({
      selectTypeData: nowselectTypeData,
      [nowIndex]: !that.data.selectActive[index],
    })

    console.log(that.data.selectTypeData)
    console.log(that.data.selectActive)


  },

  //分类列表
  getFunctionClassify: function () {
    let that = this;
    let linkData = {
      funcId: that.data.funId,
      hotelId: wx.getStorageSync("hotelId")
    }
    wxrequest.functionClassifyTree(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowtypeData = resdata.data.map(item => {
          return {
            id: item.id,
            categoryName: item.categoryName,
            getTypeData: [],
            categoryIds: [],
          }
        })
        
        let nowselectActive = [];
        // let nowselectFunData = wx.getStorageSync('selectFunData');
        // let classIndex = wx.getStorageSync('classIndex')
        let nowselectTypeData = this.data.selectTypeData;
        // if (nowselectTypeData && nowselectTypeData.length>0){
        //   nowselectTypeData = nowselectTypeData.map(item => {
        //     return {
        //       id: item.categoryId ? item.categoryId : item.id,
        //       categoryName: item.categoryName
        //     }
        //   })
        // }
        

        if (nowselectTypeData && nowselectTypeData.length > 0) {
          

          for (let i = 0; i < nowtypeData.length; i++) {
            for (let j = 0; j < nowselectTypeData.length; j++) {
              if (nowtypeData[i].id == nowselectTypeData[j].id) {
                nowselectActive[i] = true
                break;
              } else {
                nowselectActive[i] = false
              }
            }
          }
        }else{
          nowselectTypeData=[];
        }
        this.setData({
          typeData: nowtypeData,
          selectActive: nowselectActive,
          selectTypeData: nowselectTypeData
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