// pages/package/pages/ownProdList/ownProdList.js
const app = getApp();
import wxrequest from '../../../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    formdata: {
      prodName: '', //商品名
      prodType:'',  //商品形式
      prodTypeName:'', //商品形式名
      reviewStatus:'', //状态
      reviewStatusName:'', //状态名
    },


    prodTypeData: [
      {name:"全部",id:""},
      { name: "实物", id: 1 },
      { name: "电子", id: 2 },
      { name: "菜品", id: 3 },
    ], //商品形式数据
    prodTypeIndex: "",
    reviewStatusData: [
      { name:"全部",id:""},
      { name: "驳回", id: 0 },
      { name: "通过", id: 1 },
      { name: "待审核", id: 2 },
    ], //状态数据
    reviewStatusIndex: "",
    pageNum: 1,
    sizejudge: 0,
    ownProdData: [], //自营商品列表
    searchData: [
      { name: "商品名称", desc: "", codeName: 'prodName' },
      { name: "形式", desc: "", codeName: 'prodType' },
      { name: "状态", desc: "", codeName: 'reviewStatus' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      pathUrl: app.globalData.imgUrl,
      authzData: wx.getStorageSync("pageAuthority"),
    })


  },


  //删除条件
  delTerm: function (e) {
    let nowsearchData = this.data.searchData;
    let index = e.currentTarget.dataset.index;
    let codeName = e.currentTarget.dataset.name;
    let nowprodTypeIndex = this.data.prodTypeIndex;
    let nowreviewStatusIndex = this.data.reviewStatusIndex;
    let nowformdata = this.data.formdata;
    if (codeName === 'prodName') {
      nowformdata.prodName = ''
    } else if (codeName === 'prodType') {
      nowformdata.prodType = ''
      nowformdata.prodTypeName = ''
      nowprodTypeIndex = ''
    } else if (codeName === 'reviewStatus') {
      nowformdata.reviewStatus = ''
      nowformdata.reviewStatusName = ''
      nowreviewStatusIndex = ''
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData,
      formdata: nowformdata,
      prodTypeIndex: nowprodTypeIndex,
      reviewStatusIndex: nowreviewStatusIndex
    })
    this.ownCommodityList()
  },

  //新增自营商品
  funProdAdd: function () {
    wx.navigateTo({
      url: '../ownProdAdd/ownProdAdd',
    })
  },

  //修改自营商品
  ownProdEdit: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ownProdEdit/ownProdEdit?id=' + id,
    })
  },
  //自营商品详情
  detail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ownProdDetail/ownProdDetail?id=' + id,
    })
  },

  //规格管理
  ownProdSpecsList:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../ownProdSpecsList/ownProdSpecsList?id=' + id,
    })
  },



  //选择形式
  bindPickerChangeprodType: function (e) {
    let that = this;
    this.setData({
      'prodTypeIndex': e.detail.value,
      'formdata.prodType': that.data.prodTypeData[e.detail.value].id,
      'formdata.prodTypeName': that.data.prodTypeData[e.detail.value].name,
    })
  },

  //选择状态
  bindPickerChangeStatus: function (e) {
    let that = this;
    this.setData({
      'reviewStatusIndex': e.detail.value,
      'formdata.reviewStatus': that.data.reviewStatusData[e.detail.value].id,
      'formdata.reviewStatusName': that.data.reviewStatusData[e.detail.value].name,
    })
  },


  //自营商品列表
  ownCommodityList: function () {
    let that = this;
    let tempData = [];
    let linkData = {
      orgAs: 3,
      prodName: that.data.formdata.prodName,
      prodType: that.data.formdata.prodType,
      reviewStatus: that.data.formdata.reviewStatus,
      pageNo: that.data.pageNum,
      pageSize: 20,
    }

    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'prodName') {
        item.desc = this.data.formdata.prodName.toString().length ? this.data.formdata.prodName.trim() : '';
      } else if (item.codeName === 'prodType') {
        item.desc = this.data.formdata.prodType.toString().length ? this.data.formdata.prodTypeName.trim() : '';
      } else if (item.codeName === 'reviewStatus') {
        item.desc = this.data.formdata.reviewStatus.toString().length ? this.data.formdata.reviewStatusName.trim() : '';
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading({
      title: '加载中',
    })
    wxrequest.ownCommodityList(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        if (resdata.data.records.length < 20 && resdata.data.records.length > 0) {
          that.setData({
            sizejudge: 0
          })
        } else {
          that.setData({
            sizejudge: 1
          })
        }
        if (that.data.pageNum > 1) {
          tempData = that.data.ownProdData.concat(resdata.data.records)
        } else {
          tempData = resdata.data.records
        }

        that.setData({
          ownProdData: tempData
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //搜索
  searchBtn: function () {
    let that = this;
    that.setData({
      switchJudge: false,
      pageNum: 1
    })
    that.ownCommodityList();
  },

  //重置
  reset: function () {
    this.setData({
      'formdata.prodName': '',
      'formdata.prodType': '',
      'formdata.prodTypeName': '',
      prodTypeIndex: '',
      'formdata.reviewStatus': '',
      'formdata.reviewStatusName': '',
      reviewStatusIndex: '',
      pageNum: 1
    })
    this.ownCommodityList();
  },







  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },







  //删除
  deleBtn: function (e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除该自营商品',
      success(res) {
        if (res.confirm) {
          that.ownCommodityDelete(id);
        }
      }
    })
  },

  ownCommodityDelete: function (id) {
    let that = this;
    wxrequest.ownCommodityDelete(id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.ownCommodityList();
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



  //商品名称
  prodName:function(e){
    let that=this;
    let value=e.detail.value;
    this.setData({
      'formdata.prodName':value
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
    this.setData({
      searchDatabak: this.data.searchData
    })
    this.ownCommodityList();
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
    let that = this;
    let nowpage = that.data.pageNum;
    if (that.data.sizejudge) {
      that.setData({
        pageNum: ++nowpage
      })
      that.ownCommodityList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})