// pages/package/pages/qrCodeManage/qrCodeManage.js
const app = getApp();
import wxrequest from '../../../../utils/api';
import drawQrcode from '../../../../utils/weapp.qrcode.min'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    lookQrcode:true,
    formdata: {
      defaultstatusId: '', //柜子状态id
      defaultstatusName: '',  //柜子状态名
      statusIndex: '',

      typeId: '', //类型id
      typeName:'', //类型名称
      typeIndex:'', 

      roomCode:'', //房间号
      iotCard:'', //物联卡
      qrCode:'', //编码
    },

    statusdata: [
      { id: "", name: "全部" }, { id: 1, name: "正常" }, { id: 2, name: "异常" }
    ], //状态数据

    typedata: [
      { id: "", name: "全部" }, { id: 0, name: "实体柜" }, { id: 1, name: "虚拟码" }
    ], //状态数据

    pageNum: 1,
    sizejudge: 0,
    cabinetList: [], //柜子列表
    searchData: [
      { name: "柜子状态", desc: "", codeName: 'defaultstatusId' },
      { name: "类型", desc: "", codeName: 'typeId' },
      { name: "房间号", desc: "", codeName: 'roomCode' },
      { name: "物联卡", desc: "", codeName: 'iotCard' },
      { name: "物理编码", desc: "", codeName: 'qrCode' },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
      searchDatabak: this.data.searchData
    })
    
  },

  //选择状态
  bindPickerStatus:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      'formdata.statusIndex':index,
      'formdata.defaultstatusId': that.data.statusdata[index].id,
      'formdata.defaultstatusName': that.data.statusdata[index].name,
    })
  },

  //选择类型
  bindPickerType:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      'formdata.typeIndex': index,
      'formdata.typeId': that.data.typedata[index].id,
      'formdata.typeName': that.data.typedata[index].name,
    })
  },

  //获取房间号
  roomCodeInput:function(e){
    this.setData({
      'formdata.roomCode':e.detail.value
    })
  },

  //物联卡
  iotCardInput:function(e){
    this.setData({
      'formdata.iotCard': e.detail.value
    })
  },

  //编码
  qrCodeInput:function(e){
    this.setData({
      'formdata.qrCode': e.detail.value
    })
  },



  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    let nowformdata = this.data.formdata;
    if (codeName === 'defaultstatusId') {
      nowformdata.defaultstatusId = ''
      nowformdata.defaultstatusName = ''
      nowformdata.statusIndex = ''
    } else if (codeName === 'typeId') {
      nowformdata.typeId = ''
      nowformdata.typeName = ''
      nowformdata.typeIndex = ''
    } else if (codeName === 'roomCode') {
      nowformdata.roomCode = ''
    } else if (codeName === 'iotCard') {
      nowformdata.iotCard = ''
    }else {
      nowformdata.qrCode = ''
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData,
      formdata: nowformdata
    })
    this.getData()
  },

  //获取数据
  getData: function () {
    let that = this;
    let tempData = [];
    let linkData = {
      orgAs: 2,
      pageNo: this.data.pageNum,
      pageSize: 20,
      hotelId: wx.getStorageSync('hotelId'),
      cabinetStatus: that.data.formdata.defaultstatusId,
      isVisual: that.data.formdata.typeId,
      roomCode: that.data.formdata.roomCode,
      cabinetIot: that.data.formdata.iotCard,
      cabinetQrcode: that.data.formdata.qrCode,
      bindAreaFlag:'',
      enterSettingId:''
    }

    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName === 'defaultstatusId') {
        item.desc = this.data.formdata.defaultstatusId ? this.data.formdata.defaultstatusName.trim() : '';
      } else if (item.codeName === 'typeId') {
        item.desc = this.data.formdata.typeId!=='' ? this.data.formdata.typeName.trim() : '';
      } else if (item.codeName === 'roomCode'){
        item.desc = this.data.formdata.roomCode.trim();
      } else if (item.codeName === 'iotCard') {
        item.desc = this.data.formdata.iotCard.trim();
      }else{
        item.desc = this.data.formdata.qrCode.trim();
      }
      return item;

    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading({
      title: '加载中',
    })
    wxrequest.cabinetGl(linkData).then(res => {
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
          tempData = that.data.cardData.concat(resdata.data.records)
        } else {
          tempData = resdata.data.records
        }

        that.setData({
          cabinetList: tempData
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







  //新增二维码
  addQrcode: function () {
    wx.navigateTo({
      url: '../qrCodeAdd/qrCodeAdd',
    })
  },

  //修改二维码
  qrCodeEdit: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../qrCodeEdit/qrCodeEdit?id=' + id,
    })
  },
  //二维码详情
  detail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../qrCodeDetail/qrCodeDetail?id=' + id,
    })
  },

  //查看二维码
  qrcode:function(e){
    let that=this;
    
    
    that.setData({
      lookQrcode:false,
    })

    let linkData={
      id: e.currentTarget.dataset.id,
    }
    wxrequest.virtuaQrcodel(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        that.setData({
          virtuaQrcodel:resdata.data
        })
        that.draw(resdata.data)
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


  draw (e) {
     for(let i=0;i<e.length;i++){
      drawQrcode({
        width: 160,
        height: 160,
        x: 20,
        y: 20,
        canvasId: 'myQrcode'+i,
        typeNumber: 10,
        text: e[i].qrValue,
        image: {
          dx: 70,
          dy: 70,
          dWidth: 60,
          dHeight: 60
        },
        callback(e) {
        }
      })
     }
  },



  //关闭二维码
  closeBtn:function(){
    this.setData({
      lookQrcode:true
    })
  },


 
  //搜索
  searchBtn: function () {
    let that = this;
    that.setData({
      switchJudge: false,
      pageNum: 1
    })
    that.getData();
  },

  //重置
  reset: function () {
    this.setData({
      'formdata.defaultstatusId': '',
      'formdata.defaultstatusName': '',
      'formdata.statusIndex': '',
      'formdata.typeId': '',
      'formdata.typeName': '',
      'formdata.typeIndex': '',
      'formdata.roomCode': '',
      'formdata.iotCard': '',
      'formdata.qrCode': '',
      pageNum: 1
    })
    this.getData();
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
    this.getData();
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
    this.setData({
      pageNum: 1
    })
    this.getData();
    wx.stopPullDownRefresh()
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
      that.getData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})