// pages/package/pages/enterConfig/enterConfig.js
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
      cabTypeId: '',  //柜子类型id
      cabTypeName: '', //柜子类型名称
    },


    cabTypeList: [],  //柜子类型数据
    cabTypeIndex: "",
    configData: [], //配置数据
    pageNum: 1,
    sizejudge: 0,
    searchData: [
      { name: "柜子类型", desc: "", codeName: 'cabTypeId' },
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
    let nowcabTypeIndex = this.data.cabTypeIndex;
    let nowformdata = this.data.formdata;
    if (codeName === 'cabTypeId') {
      nowformdata.cabTypeId = ''
      nowformdata.cabTypeName = ''
      nowcabTypeIndex = ''
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData,
      formdata: nowformdata,
      cabTypeIndex: nowcabTypeIndex,
    })
    this.selenterCabConf()
  },

  //新增进场配置
  enterConfigAdd: function () {
    wx.navigateTo({
      url: '../enterConfigAdd/enterConfigAdd',
    })
  },

  //修改进场配置
  enterConfigEdit: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../enterConfigEdit/enterConfigEdit?id=' + id,
    })
  },
  //进场配置详情
  enterConfigDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../enterConfigDetail/enterConfigDetail?id=' + id,
    })
  },

  
  //柜子类型列表
  getCabTypeList:function(){
    let that=this;
    let linkData={
      pageNo: 1,
      pageSize: 50,
      cabTypeName: '',
    };
    wxrequest.cabinetType(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowcabTypeList = that.data.cabTypeList;
        nowcabTypeList=resdata.data.records.map(item=>{
          return {
            id:item.id,
            cabTypeName: item.cabTypeName
          }
          
        })
        const hotelAll = {
          id: '',
          cabTypeName: '全部'
        };
        nowcabTypeList.unshift(hotelAll)
        that.setData({
          cabTypeList: nowcabTypeList
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

  //选择柜子类型
  bindPickerChangeCabType:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      cabTypeIndex:index,
      'formdata.cabTypeId': that.data.cabTypeList[index].id,
      'formdata.cabTypeName': that.data.cabTypeList[index].cabTypeName
    })
  },




  //获取配置数据
  selenterCabConf: function () {
    let that = this;
    let tempData = [];
    let linkData = {
      pageNo: that.data.pageNum,
      pageSize:20,
      cabTypeId: that.data.formdata.cabTypeId
    }

    let excessive = JSON.stringify(that.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'cabTypeId') {
        item.desc = this.data.formdata.cabTypeId.toString().length ? this.data.formdata.cabTypeName.trim() : '';
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading({
      title: '加载中',
    })
    wxrequest.selenterCabConf(linkData).then(res => {
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
          tempData = that.data.configData.concat(resdata.data.records)
        } else {
          tempData = resdata.data.records
        }

        that.setData({
          configData: tempData
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
    that.selenterCabConf();
  },

  //重置
  reset: function () {
    this.setData({
      'formdata.cabTypeId': '',
      'formdata.cabTypeName': '',
      cabTypeIndex: '',
      pageNum: 1
    })
    this.selenterCabConf();
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
      content: '确定删除该进场配置',
      success(res) {
        if (res.confirm) {
          that.delenterCabConf(id);
        }
      }
    })
  },

  delenterCabConf: function (id) {
    let that = this;
    wxrequest.delenterCabConf(id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.selenterCabConf();
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
    this.setData({
      searchDatabak: this.data.searchData
    })
    this.getCabTypeList();
    this.selenterCabConf();
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
      that.selenterCabConf();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})