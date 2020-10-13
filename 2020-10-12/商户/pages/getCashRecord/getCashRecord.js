// pages/getCashRecord/getCashRecord.js
const app=getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    switchJudge:false,
    statusData: [{ statusName: '全部', id: '' }, { statusName: '待处理', id: '1' }, { statusName: '已转账', id: '2' }, { statusName: '转账失败', id: '3' }],
    statusId:'', //状态id
    statusName: '', //状态名称
    date:'',
    date2:'',
    index:'',
    pageNum:1,
    cashData:[], //提现明细数据
    sizeJudge:0,
    searchData: [
      { name: "提现状态", desc: "", codeName: 'statusId' },
      { name: "申请时间", desc: "", desc2: '', codeName: 'date' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchDatabak: this.data.searchData
    })
    this.getcashlist();
  },


  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    if (codeName === 'statusId') {
      this.setData({
        statusId: '',
        index: ''
      })
    } else {
      this.setData({
        date: '',
        date2: '',
      })
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData
    })
    this.getcashlist()
  },


  //获取提现记录数据
  getcashlist: function () {
    let that = this;
    let tempDataSet = [];

    if (!this.data.date && !this.data.date2) {
    } else if (this.data.date && this.data.date2) {
    } else {
      wx.showToast({
        title: '请选择完整申请时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let linkData = {
      pageNo: this.data.pageNum,
      pageSize: 20,
      orgAs: 3,
      all: 0,
      status: this.data.statusId,
      startDate:this.data.date,
      endDate:this.data.date2,
    };

    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'statusId') {
        item.desc = this.data.statusId ? this.data.statusName.trim() : '';
      } else {
        item.desc = this.data.date.trim();
        item.desc2 = this.data.date2.trim();
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading({
      title: "加载中"
    })
    wxrequest.withdrawMoneylist(linkData).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      if (resdata.code == 0) {
        if (resdata.data.records.length < 20 && resdata.data.records.length > 0) {
          that.setData({
            sizeJudge: 0
          })
        } else {
          that.setData({
            sizeJudge: 1
          })
        }
        if (that.data.pageNum > 1) {
          tempDataSet = that.data.cashData.concat(resdata.data.records)
        } else {
          tempDataSet = res.data.data.records
        }
        that.setData({
          cashData: tempDataSet
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading();
      console.log(err)
    })
  },


  bindPickerChange: function (e) {
    let that = this;
    this.setData({
      index: e.detail.value,
      statusId: that.data.statusData[e.detail.value].id,
      statusName: that.data.statusData[e.detail.value].statusName,
    })
  },


  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    let startdate = e.detail.value
    that.setData({
      date: e.detail.value,
      pageNum: 1,
    })
  },

  bindDateChange2(e) {
    let that = this;
    let enddate = e.detail.value;
    that.setData({
      date2: e.detail.value,
      pageNum: 1,
    })
  },

  //搜索
  searchBtn:function(){
    this.setData({
      switchJudge:false,
      pageNum: 1
    })
    this.getcashlist();
  },

  //重置
  reset:function(){
    this.setData({
      date:'',
      date2:'',
      statusId:'',
      index:'',
      pageNum: 1,
    })
    this.getcashlist();
  },

  //提现详情
  getCashDetail:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../getCashDetail/getCashDetail?id='+id,
    })
  },

  switchdj: function () {
    this.setData({
      switchJudge: !this.data.switchJudge
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
    let page=this.data.pageNum;
    if (this.data.sizeJudge){
       this.setData({
         pageNum: ++page
       })
      this.getcashlist();
    }
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