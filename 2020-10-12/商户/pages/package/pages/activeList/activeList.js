// pages/package/pages/activeList/activeList.js
const app=getApp();
import wxrequest from '../../../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    switchJudge: false,
    formdata:{
      actType:'', //活动类型id
      actTypeName:'', //活动类型名称
      actTypeIndex:'',

      status:'', //启用状态
      statusName:'', //启用状态名称
      statusIndex:'', 
      date:'',
      date2:'',
    },

    actTypeList:[],//活动类型数据
    statusList:[
      {
          label:'全部',
          value:''
      },
      {
          label:'禁用',
          value:0
      },
      {
          label:'启用',
          value:1
      },
  ], //启用状态

      activedata:[], //活动数据
      pageNum:1,
      sizejudge:0,
      searchData: [
      { name: "活动类型", desc: "", codeName: 'actType' },
      { name: "启用状态", desc: "", codeName: 'status' },
      { name: "活动时间", desc: "",desc2: "", codeName: 'date' },
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

  //获取活动类型列表
  getActList:function(nowactivedata){
    let that=this;
    let linkData={
      key:'ACTTYPE',
      orgId:0
    }
    wxrequest.basicDataItems(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowactTypeList=resdata.data.map(item=>{
           return {
             id:item.dictValue,
             label:item.dictName
           }
         })
         const allObject={
          id: '',
          label: '全部'
         }
         nowactTypeList.unshift(allObject)
         nowactivedata.forEach((item,index)=>{
           nowactTypeList.forEach(key=>{
             if(key.id==item.actType){
                item.actTypeName=key.label;
                item.actTypeId=key.id
             }
           })
         })


         that.setData({
          actTypeList:nowactTypeList,
          activedata:nowactivedata
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

  //选择启用禁用状态
  bindPickerStatus:function(e){
    
    let that=this;
    let index=e.detail.value;
    this.setData({
      'formdata.status':that.data.statusList[index].value,
      'formdata.statusIndex':index,
      'formdata.statusName':that.data.statusList[index].label,
    })
  },




   // 时间段选择  
   bindDateChange(e) {
    let that = this;
    let startdate = e.detail.value
    that.setData({
      'formdata.date': e.detail.value,
      pageNum: 1,
    })
  },

  bindDateChange2(e) {
    let that = this;
    let enddate = e.detail.value;
    that.setData({
      'formdata.date2': e.detail.value,
      pageNum: 1,
    })
  },


  //删除条件
  delTerm: function (e) {
    let index = e.currentTarget.dataset.index;
    let nowsearchData = this.data.searchData;
    let codeName = e.currentTarget.dataset.name;
    let nowformdata = this.data.formdata;
    if (codeName === 'actType') {
      nowformdata.actType=''
      nowformdata.actTypeName=''
      nowformdata.actTypeIndex=''
    }else if(codeName==='status'){
      nowformdata.status=''
      nowformdata.statusName=''
      nowformdata.statusIndex=''
    } else {
      nowformdata.date = ''
      nowformdata.date2 = ''
    }
    nowsearchData.splice(index, 1)
    this.setData({
      searchData: nowsearchData,
      formdata: nowformdata
    })
    this.getData()
  },

  //新增活动
  activeAdd:function(){
    wx.navigateTo({
      url: '../activeAdd/activeAdd',
    })
  },

  //修改活动
  activeEdit:function(e){
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../activeEdit/activeEdit?id='+id,
    })
  },
  //活动详情
  detail:function(e){
    let id =e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../activeDetail/activeDetail?id=' + id,
    })
  },

  //活动设置
  actSet:function(e){
    let id=e.currentTarget.dataset.id;
    let actTypeId=e.currentTarget.dataset.acttypeid;
    if(actTypeId==4){
      wx.navigateTo({ 
        url: '../redEnvelopeDetails/redEnvelopeDetails?id=' + id,
      })
    }else if(actTypeId==5){
      wx.navigateTo({ 
        url: '../secondHalf/secondHalf?id=' + id,
      })
    }else if(actTypeId==6){
      wx.navigateTo({ 
        url: '../meetingSet/meetingSet?id=' + id,
      })
    }
  },

  //删除活动
  delete:function(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否删除此活动',
      confirmText: "删除",
      showCancel: true,
      success: function (res) {
        if (res.confirm){
        that.sureDele(id)
        }
      }
    });
    
    
  },

  //确认删除
  sureDele:function(id){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.deleteActivityOne(id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        that.getData();

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


  //活动类型
  bindPickerChange:function(e){
    let that=this;
    this.setData({
      'formdata.actTypeIndex': e.detail.value,
      'formdata.actType': that.data.actTypeList[e.detail.value].id,
      'formdata.actTypeName': that.data.actTypeList[e.detail.value].label,
    })
  },

  //获取活动
  getData:function(){
    let that=this;
    let tempData=[];

    if (!this.data.date && !this.data.date2) {
    } else if (this.data.date && this.data.date2) {
    } else {
      wx.showToast({
        title: '请选择完整的活动时间',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    let linkData={
      actName:'',
      actType : this.data.formdata.actType,
      hotelId: wx.getStorageSync('hotelId'),
      status: this.data.formdata.status,
      orgAs:3,
      actScopeLevel:'',
      actBegin: this.data.formdata.date,
      actEnd: this.data.formdata.date2, 
      pageNo: this.data.pageNum,
      pageSize: 20,
    }

    let excessive = JSON.stringify(this.data.searchDatabak)
    let nowsearchData = JSON.parse(excessive);
    nowsearchData.map(item => {
      if (item.codeName == 'actType') {
        item.desc = this.data.formdata.actType!=='' ? this.data.formdata.actTypeName:'';
        console.log(this.data.formdata.actTypeName)
      }else if(item.codeName == 'status'){
        item.desc = this.data.formdata.status!=='' ? this.data.formdata.statusName:'';
      } else {
        item.desc = this.data.formdata.date.trim();
        item.desc2 = this.data.formdata.date2.trim();
      }
      return item;
      

    })
    this.setData({
      searchData: nowsearchData
    })

    wx.showLoading({
      title: '加载中',
    })
    wxrequest.selectActivity(linkData).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        if (resdata.data.records.length < 20 && resdata.data.records.length>0){
           that.setData({
             sizejudge:0
           })
        }else{
          that.setData({
            sizejudge: 1
          })
        }
        if (that.data.pageNum>1){
          tempData = that.data.cardData.concat(resdata.data.records)
        }else{
          tempData = resdata.data.records
        }
        tempData.forEach(item=>{
          if(item.actPartInCountType == 0){
            item.actPartInCount = '不限制'
            }else if(item.actPartInCountType == 1){
                item.actPartInCount = item.actPartInCount + '次/每类型'
            }else if(item.actPartInCountType == 2){
                item.actPartInCount = item.actPartInCount + '次/每活动'
            }else if(item.actPartInCountType == 3){
                item.actPartInCount = item.actPartInCount + '次/每天'
            }else if(item.actPartInCountType == 4){
                item.actPartInCount = item.actPartInCount + '次/每周'
            }else if(item.actPartInCountType == 5){
                item.actPartInCount = item.actPartInCount + '次/每月'
            }
            item.actBegin = item.actBegin.split(' ')[0];
            item.actEnd = item.actEnd.split(' ')[0];
            item.status=item.status
        })
        that.getActList(tempData);
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

  //搜索
  searchBtn:function(){
    let that=this;
    that.setData({
      switchJudge: false,
      pageNum:1
    })
    that.getData();
  },

  //重置
  reset:function(){
    this.setData({
      'formdata.actType':'',
      'formdata.actTypeName':'',
      'formdata.actTypeIndex':'',

      'formdata.status':'',
      'formdata.statusName':'',
      'formdata.statusIndex':'',

      'formdata.date':'',
      'formdata.date2':'',
      pageNum:1
    })
    this.getData();
  },

  //开关
  switch1Change:function(e){
    let that=this;
    let id=e.currentTarget.dataset.id;
    let status=e.currentTarget.dataset.status?0:1;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.changeActivityStatus(status,id).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if(resdata.code==0){
        
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
        that.getData();
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000,
        })
        setTimeout(function(){
          that.getData();
        },500)
      }
    }).catch(err=>{
      wx.showToast({
        title:err,
        icon:'none',
        duration:2000
      })
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
    let that=this;
    let nowpage=that.data.pageNum;
    if(that.data.sizejudge){
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