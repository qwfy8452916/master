// pages/package/pages/plateAdd/plateAdd.js
const app=getApp();
import wxrequest from '../../../../utils/api'
import WxValidate from '../../../../utils/WxValidate'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    detailId:'',
    modelTypeList:[
      {id:1,name:"功能区"},
      {id:2,name:"客房协议价"},
    ], //板块类型数据
    modelTypeIndex:'',
    modelList:[],
    modelIndex:'',
    typeData:[
      {id:0,"name":"全部可用"},
      {id:1,"name":"指定可用"},
      {id:2,"name":"指定不可用"},
    ], //分类可用范围
    typeIndex:'',
    prodData:[
      {id:0,"name":"全部可用"},
      {id:1,"name":"指定可用"},
      {id:2,"name":"指定不可用"},
    ], //商品可用范围
    prodIndex:'',
    roomSourceData:[
      {id:0,"name":"全部可用"},
      {id:1,"name":"指定可用"},
      {id:2,"name":"指定不可用"},
    ], //房源可用范围
    roomSourceIndex:'',
    bonusAmountList:[], //红包奖励来源数据
    bonusIndex:'',
    rewardTypeData:[
      {id:1,name:"比例"},
      {id:2,name:"固定金额/件商品"}
    ], //红包奖励类型数据
    rewardTypeIndex:'', 

    BaselineList:[], //计算基准
    BaselineIndex:'',

    selectTypeData:[], //选中分类
    selectprodData:[], //选择商品
    selectResource:[], //选择房源

    addFormData:{
      modelType:'', //板块类型
      funcId:'', //板块
      categoryScopeType:'', //分类
      prodScopeType:'', //商品
      roomsType:'', //房源
      redPacketAmountFrom:'', //红包奖励来源
      redSetType:'', //红包奖励类型
      bonusBaselineType:'', //计算基准
      redPacketRate:'', //红包比例
      redAmount:'', //红包金额
    },
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      authzData: wx.getStorageSync("pageAuthority"),
      detailId:options.detailId,
    })
    this.initValidate();//验证规则函数
    this.getbonusAmountList()
    this.getBaselineList();
  },


//选择板块类型
bindPickerModelType:function(e){
  let that=this;
  let index=e.detail.value;
  let modelType=that.data.modelTypeList[index].id;
  if(modelType==1){
    that.getSelectedHotel();
  }else if(modelType==2){
     let nowmodelList=[{id:-1,label:"客房协议价"}]
     that.setData({
       modelList:nowmodelList
     })
   }
  that.setData({
    modelTypeIndex:index,
    'addFormData.modelType':modelType
  })
},

//获取功能区板块
getSelectedHotel:function(){
  let that=this;
  let linkData={
    hotelId:wx.getStorageSync('hotelId')
  }
  wxrequest.getCouponFunctionList(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowmodelList=resdata.data.map(item=>{
          return {
            label: item.funcCnName,
            id: item.id,
          }
        })
        that.setData({
          modelList:nowmodelList
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

//选择板块
bindPickerModel:function(e){
  let that=this;
  let index=e.detail.value;
  that.setData({
    modelIndex:index,
    'addFormData.funcId':that.data.modelList[index].id
  })
},

//选择分类
bindPickerType:function(e){
  let index=e.detail.value;
  this.setData({
    typeIndex:index,
    'addFormData.categoryScopeType':this.data.typeData[index].id
  })
},

//选择商品
bindPickerProd:function(e){
  let index=e.detail.value;
  let nowselectprodData=this.data.selectprodData;
  if(this.data.prodData[index].id==1){
    nowselectprodData=[];
  }
  this.setData({
    prodIndex:index,
    'addFormData.prodScopeType':this.data.prodData[index].id,
     selectprodData:nowselectprodData
  })
},

//奖励来源
getbonusAmountList:function(){
  let that=this;
  wxrequest.basicDataItems({key:'SHARE_BONUS_FROM',orgId: 0}).then(res=>{
     let resdata=res.data;
     if(resdata.code==0){
       let nowbonusAmountList=resdata.data.map(item=>{
         return {
          label: item.dictName,
          id: parseInt(item.dictValue),
         }
       })
       that.setData({
        bonusAmountList:nowbonusAmountList
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

//选择红包奖励来源
bindPickerBonus:function(e){
  let index=e.detail.value;
  this.setData({
    bonusIndex:index,
    'addFormData.redPacketAmountFrom':this.data.bonusAmountList[index].id
  })
},

//选择红包奖励类型
bindPickerReward:function(e){
  let index=e.detail.value;
  this.setData({
    rewardTypeIndex:index,
    'addFormData.redSetType':this.data.rewardTypeData[index].id
  })
},

 //计算基准
 getBaselineList:function(){
  let that=this;
  wxrequest.basicDataItems({key:'SHARE_BONUS_BASE ',orgId: 0}).then(res=>{
     let resdata=res.data;
     if(resdata.code==0){
        let nowBaselineList=resdata.data.map(item=>{
          return {
              label: item.dictName,
              id: parseInt(item.dictValue),
          }
        })
        that.setData({
          BaselineList:nowBaselineList
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

//选择计算基准
bindPickerBase:function(e){
  let index=e.detail.value;
  this.setData({
    BaselineIndex:index,
    'addFormData.bonusBaselineType':this.data.BaselineList[index].id
  })
},








  initValidate() {//验证规则函数
    const that = this;
    const rules = {
      modelType: {
        required: true
      },
      funcId: {
        required: true
      },
      categoryScopeType: {
        required: that.data.addFormData.modelType==1?true:false
      },
      prodScopeType: {
        required: that.data.addFormData.modelType==1?true:false
      },
      roomsType: {
        required: that.data.addFormData.modelType==2?true:false
      },
      redPacketAmountFrom: {
        required: true
      },
      redSetType: {
        required: true
      },
      bonusBaselineType: {
        required: that.data.addFormData.redSetType==1?true:false
      },
      redPacketRate: {
        digits: true,
        required: that.data.addFormData.redSetType==1?true:false
      },
      redAmount: {
        digitsfloat: true,
        required: that.data.addFormData.redSetType==2?true:false
      },

    }



    const messages = {
      modelType: {
        required: '请选择板块类型'
      },
      funcId: {
        required: '请选择板块'
      },
      categoryScopeType: {
        required: '请选择分类范围'
      },
      prodScopeType: {
        required: '请选择商品范围'
      },
      roomsType: {
        required: '请选择房源范围'
      },
      redPacketAmountFrom: {
        required: '请选择红包奖励来源'
      },
      redSetType: {
        required: '请选择红包奖励类型'
      },
      bonusBaselineType: {
        required: '请选择计算基准'
      },
      redPacketRate: {
        required: '请输入红包比例',
        digits:'请输入正确的红包比例'
      },
      redAmount: {
        required:'请输入红包金额',
        digitsfloat: '请输入正确的红包金额'
      },


    }
    that.WxValidate = new WxValidate(rules, messages)
  },

  //验证提交
  formSubmit:function(e){
    let that=this;

    this.initValidate();
    const params = e.detail.value;

    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false
    }
    
    let nowaddFormData=that.data.addFormData;

    Object.assign(nowaddFormData, params)
    
    that.setData({
      addFormData: nowaddFormData
    })
    that.addRedpackModel()
  },

  //新增
  addRedpackModel: function (){
    let that=this;
    let selectTypeData=this.data.selectTypeData;
    if(this.data.addFormData.categoryScopeType==1 || this.data.addFormData.categoryScopeType==2){
       if(selectTypeData.length<1){
        wx.showToast({
          title: '请选择分类！',
          icon:'none',
          duration:2000
        })
        return false;
       }
    }

    let selectprodData=this.data.selectprodData;
    if(this.data.addFormData.prodScopeType==1 || this.data.addFormData.prodScopeType==2){
      if(selectprodData.length<1){
       wx.showToast({
         title: '请选择商品！',
         icon:'none',
         duration:2000
       })
       return false;
      }
   }
   let selectResource=this.data.selectResource;
   if(this.data.addFormData.roomsType==1 || this.data.addFormData.roomsType==2){
    if(selectResource.length<1){
     wx.showToast({
       title: '请选择房源！',
       icon:'none',
       duration:2000
     })
      return false;
     }
   }

  let nowredPacketRate="";
  if(that.data.addFormData.redSetType==1){
    nowredPacketRate=that.data.addFormData.redPacketRate
  }else if(that.data.addFormData.redSetType==2){
    nowredPacketRate=that.data.addFormData.redAmount
  }

   
   let typeIdArray=[];
   let nowselectTypeData=that.data.selectTypeData;
   if(that.data.addFormData.modelType==1){
    typeIdArray=nowselectTypeData.map(item=>{
      return item.id
    })
   }

   let prodIdArray=[];
   let nowselectprodData=that.data.selectprodData;
   let nowselectResource=that.data.selectResource;
   if(that.data.addFormData.modelType==1){
    prodIdArray=nowselectprodData.map(item=>{
      return item.id
    })
   }else if(that.data.addFormData.modelType==2){
    prodIdArray=nowselectResource.map(item=>{
      return item.id
    })
   }
   

    let linkData={
      actRedPacketSettingId:that.data.detailId,
      modelId:that.data.addFormData.funcId,
      modelType:that.data.addFormData.modelType,
      redPacketRate:nowredPacketRate,
      redSetType:that.data.addFormData.redSetType,
      redPacketAmountFrom:that.data.addFormData.redPacketAmountFrom,
      bonusBaselineType:that.data.addFormData.bonusBaselineType,
      categoryScopeType:that.data.addFormData.categoryScopeType,
      prodScopeType:that.data.addFormData.prodScopeType,
      categoryScopeList:typeIdArray,
      prodScopeList:prodIdArray,
    };

    wxrequest.addRedpackModel(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
        wx.navigateBack({
          delta: 1
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
  plateTypeSlect:function(){

    if(!this.data.addFormData.funcId){
       wx.showToast({
         title: '请选择板块',
         icon:'none',
         duration:2000
       })
       return false;
    }
    let selectTypeData;
    if(this.data.selectTypeData){
      selectTypeData=JSON.stringify(this.data.selectTypeData)
    }else{
      selectTypeData='[]'
    }
    
    wx.navigateTo({
      url: '../plateTypeSlect/plateTypeSlect?funcId='+this.data.addFormData.funcId + '&selectTypeData='+selectTypeData +'&typejudge='+false,
    })
  },

  //删除分类
  typeDel:function(e){
    let index=e.currentTarget.dataset.index
    let nowselectTypeId=this.data.selectTypeId;
    let nowselectTypeData=this.data.selectTypeData;
    nowselectTypeId.splice(index,1)
    nowselectTypeData.splice(index,1)
    this.setData({
      selectTypeId:nowselectTypeId,
      selectTypeData:nowselectTypeData,
    })
  },

  //选择商品
  plateProdSlect:function(){
    let that=this;
    if(!this.data.addFormData.funcId){
      wx.showToast({
        title: '请选择板块',
        icon:'none',
        duration:2000
      })
      return false;
   }

    let selectprodData;
    if(this.data.selectprodData){
      selectprodData=JSON.stringify(this.data.selectprodData)
    }else{
      selectprodData='[]'
    }

    let prodScopeType=this.data.addFormData.prodScopeType

    wx.navigateTo({
      url: '../plateProdSlect/plateProdSlect?selectprodData='+selectprodData +'&prodjudge='+false +'&funcId='+that.data.addFormData.funcId+'&prodScopeType='+prodScopeType,
    })
  },

  //选择商品
  delProd:function(e){

    let index=e.currentTarget.dataset.index;
    let nowselectprodData=this.data.selectprodData;
    nowselectprodData.splice(index,1)
    this.setData({
      selectprodData:nowselectprodData
    })
  },

  //选择房源
  plateRoomSelect:function(){
    let that=this;
    if(!this.data.addFormData.funcId){
      wx.showToast({
        title: '请选择板块',
        icon:'none',
        duration:2000
      })
      return false;
     }
      let selectResource;
      if(this.data.selectResource){
        selectResource=JSON.stringify(this.data.selectResource)
      }else{
        selectResource='[]'
      }
      let roomsType=that.data.addFormData.roomsType;
     wx.navigateTo({
       url: '../plateRoomSelect/plateRoomSelect?roomjudge='+false+'&selectResource='+selectResource+'&roomsType='+roomsType,
     })
  },

  //选择房源范围
  bindPickerRoom:function(e){
    let index=e.detail.value;

    let selectResource=this.data.selectResource;
    if(this.data.roomSourceData[index].id==1){
      selectResource=[]
    }
    this.setData({
      roomSourceIndex:index,
      'addFormData.roomsType':this.data.roomSourceData[index].id,
      selectResource:selectResource,
    })
  },

  //删除房源
  delResource:function(e){
   let index=e.currentTarget.dataset.index;
   let selectResource=this.data.selectResource;
   selectResource.splice(index,1)
   this.setData({
    selectResource:selectResource
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
    let that = this;
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