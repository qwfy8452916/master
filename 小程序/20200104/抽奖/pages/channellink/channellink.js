// pages/channellink/channellink.js
const app = getApp();
import wxrequest from '../../request/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareL: 'http://fortune.kefangbao.com.cn/?c=',
    channelId: '',
    linkList: [],
    maskFlagAdd: true,
    linktitle: '',
    maskFlagEdit: true,
    editid: '',
    titleedit: '',
    sharelinkedit: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let channelinfo = wx.getStorageSync('channelAuth');
    // console.log(channelinfo.id);
    this.setData({
      channelId: channelinfo.id
    });
    this.getsharelink();
  },
  //获取分享链接
  getsharelink: function(){
    let that = this;
    let linkData = {
      id: this.data.channelId,
      shareType: 1
    };
    //shareType分享类型（1：渠道商分享，2：会员分享，3：红包分享）
    wxrequest.channelLink(linkData)
      .then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          const linkDataList = res.data.data.map(item => {
            return {
              id: item.id,
              shareTitle: item.shareTitle,
              shareCode: item.shareCode,
              qrUrl: item.qrUrl
            }
          });
          that.setData({
            linkList: linkDataList
          });
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(err => {
        wx.hideLoading()
        console.log(err)
      })
  },
  //复制链接
  copylink: function(e){
    let linkdetail = this.data.shareL +  e.currentTarget.dataset.linkdetail;
    wx.setClipboardData({
      data: linkdetail,
      success(res){
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },
  //查看二维码
  linkcode: function(e){
    let index = e.currentTarget.dataset.index;
    let codeurl = this.data.linkList[index].qrUrl;
    wx.navigateTo({
      url: '../channelcode/channelcode?qrurl=' + codeurl
    })
  },
  //添加链接
  linkadd: function(){
    this.setData({
      maskFlagAdd: false
    })
  },
  titleinput: function(e){
    this.setData({
      linktitle: e.detail.value
    });
  },
  //确定添加
  confirmadd: function(){
    let that = this;
    if (this.data.linktitle.replace(/\s+/g, '') == "") {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let addData = {
      rowId: this.data.channelId,
      shareType: 1,
      shareTitle: this.data.linktitle
    };
    //shareType分享类型（1：渠道商分享，2：会员分享，3：红包分享）
    wxrequest.channelLinkAdd(addData)
      .then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          that.getsharelink();
          that.setData({
            maskFlagAdd: true,
            linktitle: ''
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(err => {
        wx.hideLoading()
        console.log(err)
      })
  },
  //修改链接标题
  linkedit: function (e) {
    let that = this;
    let sharecodeid = e.currentTarget.dataset.sharecodeid;
    that.setData({
      editid: sharecodeid
    });
    wxrequest.channelLinkDetail(sharecodeid)
      .then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          let sharelc = that.data.shareL + res.data.data.shareCode;
          that.setData({
            titleedit: res.data.data.shareTitle,
            sharelinkedit: sharelc,
            maskFlagEdit: false
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(err => {
        wx.hideLoading()
        console.log(err)
      })
  },
  titleinputedit: function(e){
    this.setData({
      titleedit: e.detail.value
    });
  },
  //确定修改
  confirmedit: function () {
    let that = this;
    if (this.data.titleedit.replace(/\s+/g, '') == "") {
      wx.showToast({
        title: '请输入标题',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let editData = {
      shareTitle: this.data.titleedit
    };
    let eid = that.data.editid;
    //shareType分享类型（1：渠道商分享，2：会员分享，3：红包分享）
    wxrequest.channelLinkEdit(editData, eid)
      .then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          that.getsharelink();
          that.setData({
            maskFlagEdit: true
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(err => {
        wx.hideLoading()
        console.log(err)
      })
  },
  //关闭添加/修改
  addclose: function(){
    this.setData({
      maskFlagAdd: true,
      maskFlagEdit: true
    })
  },
  //查看财富合伙人
  linkskip: function(e){
    let scode = e.currentTarget.dataset.scode;
    wx.navigateTo({
      url: '../channelpartner/channelpartner?sharecode=' + scode
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