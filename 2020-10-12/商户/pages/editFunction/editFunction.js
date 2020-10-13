// pages/addFunction/addFunction.js
const app=getApp();
const apiUrl = app.globalData.requestUrl;
import wxrequest from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
   authzData: {}, //功能权限
   id:"", //功能区id
   roomSwitch:true,
    isPickUp: false,  //是否自提取
    isTakeout: false, //是否支持外卖
   functionData:{
     funcCnName:'', //功能区名称
     funcEnName:'', //功能区英文名称
     funcType:'', //功能区类型
     funcCode:'', //代码
     isShow:1, //默认开放
     sort:0,  //排序
     titlePosition:'', //标题位置
     title:'', //标题
     servicePhone:'', //电话
     isShowWifi:0, //一键wifi开关
     isShowCulture:0, //文化故事
     bookPageLayout:'', //房源页面布局
     delivWays:[], //配送方式
     pickUpPointIds:[], //自提点
     isTimeLimited:0, //限时开放
     openStartTime: "00: 00:00", //开始时间范围
     openEndTime:"23:59:59", //结束时间范围
     isTimeLimitedDeliv:0, //限时送达
     delivLimitDuration:'', //时间间隔
     isSupportManyTimesOrder:0, //多次下单
     pageLayout:'', //商城页面布局
     roomResourcesFlag:1, //房源关系
     bookFuncResources:[], //可用房源
     funcLogoPath:'', //图标路径
     funcLogoUrl:'', //图标地址
   },
    funcTypeList: [], //类型
    funcTypeIndex:'', 
    bannerList:[], //banner图
    titlePositionOption: [
      {
        id: 1,
        title: "上方",
      },
      {
        id: 2,
        title: "下方",
      },
    ], //标题位置参数
    titleIndex:'',
    pageLayoutData: [
      {
        id: 0,
        name: "传统",
      },
      {
        id: 1,
        name: "横幅",
      },
    ], //房源页面布局数据
    layoutIndex:'',
    delivWayList: [], //配送方式
    pickUpPointList: [], //自提点
    shopLayoutData:[], //商城布局数据
    shopLayoutIndex:'',
    roomFlagData: [
      {
        id: 0,
        name: "部分支持",
      },
      {
        id: 1,
        name: "全部支持",
      },
    ],
    roomFlagIndex:1,
    bookFuncResourcesOptions:[], //可用房源数据
    bookFuncResourcesArr:[], //可用房源id数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let that=this;
     this.setData({
       id:options.id,
       authzData: wx.getStorageSync("pageAuthority"),
     })
    this.basicDataItems_ft();
    this.basicDataItems_pl();
    
    this.hotelFunctionDetail();
    
    
    this.initValidate();//验证规则函数

  },

  //获取功能区详情
  hotelFunctionDetail:function(){
    let that=this;
    wxrequest.hotelFunctionDetail(that.data.id).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowfunctionData=resdata.data;
        let nowbannerList = that.data.bannerList;
        let nowfuncTypeIndex = that.data.funcTypeIndex;
        let nowtitleIndex = that.data.titleIndex;
        let nowshopLayoutIndex = that.data.shopLayoutIndex;
        let nowlayoutIndex = that.data.layoutIndex;
        let nowroomFlagIndex = that.data.roomFlagIndex;
        
        let ztIndex;
        let wmIndex;
        if (resdata.data.delivWays!=null){
          ztIndex = resdata.data.delivWays.indexOf("4");
          wmIndex = resdata.data.delivWays.indexOf("7");
        }
        //自提区
      
        let nowisPickUp = that.data.isPickUp;
        if (ztIndex != -1) {
          nowisPickUp = true;
        } else {
          nowisPickUp = false;
          nowfunctionData.pickUpPointIds=[];
        }
        
        //外卖
        
        let nowisTakeout = that.data.isTakeout;
        if (wmIndex != -1) {
          nowisTakeout = true;
        } else {
          nowisTakeout = false;
        }
        

        if (nowfunctionData.bookFuncResources==null){
          nowfunctionData.bookFuncResources=[];
        }
        for (let i = 0; i < that.data.funcTypeList.length; i++) {
          if (that.data.funcTypeList[i].id == nowfunctionData.funcType) {
            nowfuncTypeIndex = i
          }
        }
        for (let i = 0; i < that.data.titlePositionOption.length; i++) {
          if (that.data.titlePositionOption[i].id == nowfunctionData.titlePosition) {
            nowtitleIndex = i
          }
        }
        for (let i = 0; i < that.data.shopLayoutData.length; i++) {
          if (that.data.shopLayoutData[i].id == nowfunctionData.pageLayout) {
            nowshopLayoutIndex = i
          }
        }
        for (let i = 0; i < that.data.pageLayoutData.length; i++) {
          if (that.data.pageLayoutData[i].id == nowfunctionData.bookPageLayout) {
            nowlayoutIndex = i
          }
        }
        for (let i = 0; i < that.data.roomFlagData.length; i++) {
          if (that.data.roomFlagData[i].id == nowfunctionData.roomResourcesFlag) {
            nowroomFlagIndex = i
          }
        }

        if (resdata.data.funcBannerImages!=null){
          nowbannerList = resdata.data.funcBannerImages.map(item=>{
            return {
              id: item.id,
              name: item.imagePath,
              url: item.imageUrl,
              path: item.imagePath,
              linkId: item.linkId,
              isParam: item.isNeedParameter == 1 ? true : false,
              paramsData: item.params,
              paramsLD: [],
            }
          })
        }
        

        // let nowbookFuncResourcesArr = that.data.bookFuncResourcesArr;
        // if (nowfunctionData.bookFuncResources!=null){

        //   nowbookFuncResourcesArr = nowfunctionData.bookFuncResources.map(item=>{
        //     return item.id
        //   })
          
        // }


        that.setData({
          functionData: nowfunctionData,
          // bookFuncResourcesArr: nowbookFuncResourcesArr,
          bannerList: nowbannerList,
          funcTypeIndex: nowfuncTypeIndex,
          titleIndex: nowtitleIndex,
          shopLayoutIndex: nowshopLayoutIndex,
          layoutIndex: nowlayoutIndex,
          roomFlagIndex: nowroomFlagIndex,
          isPickUp: nowisPickUp,
          isTakeout: nowisTakeout
        })

        that.basicDataItems_dw();
        that.getHotelPickUpPointList();
        that.getBookFuncResourcesList();
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




  initValidate() {//验证规则函数
    const that = this;
    const rules = {
      funcCnName: {
        required: true
      },
      funcType: {
        required: true
      },
      funcCode: {
        required: true
      },
      sort: {
        required: true,
        digits: true
      },
      delivLimitDuration:{
        digits: true
      },
      
    }



    const messages = {
      funcCnName: {
        required: '请输入功能区名称'
      },
      funcType:{
        required: '请选择类型'
      },
      funcCode: {
        required: '请输入代码'
      },
      sort: {
        required:"请输入排序",
        digits: '请输入正确的排序'
      },
      delivLimitDuration:{
        digits: '请输入数字'
      },
    
    }
    that.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit: function (e) {//提交表单

    this.initValidate();

    

    const params = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false
    }
    params.isShow = params.isShow ? 1 : 0
    params.isShowTop = params.isShowTop ? 1 : 0
    params.isShowWifi = params.isShowWifi ? 1 : 0
    params.isShowCulture = params.isShowCulture ? 1 : 0
    params.isTimeLimited = params.isTimeLimited ? 1 : 0
    params.isTimeLimitedDeliv = params.isTimeLimitedDeliv ? 1 : 0
    params.isSupportManyTimesOrder = params.isSupportManyTimesOrder ? 1 : 0
    params.isShowTitle = params.isShowTitle ? 1 : 0
    let nowfunctionData = this.data.functionData;
    let newfunctionData=Object.assign(nowfunctionData, params);

    if (typeof (newfunctionData.delivWays) == 'string'){
      newfunctionData.delivWays = newfunctionData.delivWays.split(",")
    }

    if (newfunctionData.pickUpPointIds==''){
      newfunctionData.pickUpPointIds=[]
    }else{
      if (typeof (newfunctionData.pickUpPointIds) == 'string') {
        newfunctionData.pickUpPointIds = newfunctionData.pickUpPointIds.split(",")
      }
    }
    
    
    

    this.setData({
      functionData: newfunctionData,
      // bookFuncResourcesArr: nowbookFuncResourcesArr
    });
    this.sureBtn()

  },

  //确定修改
  sureBtn:function(){
    let that=this;
    let nowfunctionData = this.data.functionData;


    if (nowfunctionData.pageLayout != 3 && that.data.isPickUp && nowfunctionData.pickUpPointIds.length<=0) {
      wx.showToast({
        title: '请选择自提点',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (!that.data.isPickUp){
      nowfunctionData.pickUpPointIds=[];
    }

    if (nowfunctionData.funcType==2 && nowfunctionData.roomResourcesFlag == 0 && nowfunctionData.bookFuncResources.length<1){
      wx.showToast({
        title: '请选择房源',
        icon:'none',
        duration:2000
      })
      return false;
    }

    if (nowfunctionData.funcType == 4 && that.data.isTakeout && nowfunctionData.isTimeLimitedDeliv){
      if (nowfunctionData.delivLimitDuration.toString().length<1){
        wx.showToast({
          title: '请填写时间间隔',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }

    let nowbannerList = this.data.bannerList;
    if (nowbannerList != null) {
      nowbannerList=nowbannerList.map(item => {
        return {
          imagePath: item.path,
          linkId: item.linkId,
          linkParamList: item.paramsData,
        }
      })
    }

    let linkData={
      bookPageLayout: nowfunctionData.bookPageLayout,
      roomResourcesFlag: nowfunctionData.roomResourcesFlag,
      // bookFuncResources: that.data.bookFuncResourcesArr,
      bookFuncResources: nowfunctionData.bookFuncResources,
      isShowTop: nowfunctionData.isShowTop,
      isShowTitle: nowfunctionData.isShowTitle,
      titlePosition: nowfunctionData.titlePosition,
      title: nowfunctionData.title,
      servicePhone: nowfunctionData.servicePhone,
      isShowWifi: nowfunctionData.isShowWifi,
      isShowCulture: nowfunctionData.isShowCulture,
      hotelId: wx.getStorageSync('hotelId'),
      funcCnName: nowfunctionData.funcCnName,
      funcEnName: nowfunctionData.funcEnName,
      funcLogoPath: nowfunctionData.funcLogoPath,
      funcType: nowfunctionData.funcType,
      delivWays: nowfunctionData.delivWays,
      lgcChooseWays: nowfunctionData.lgcChooseWays,
      hotelLgcIds: nowfunctionData.hotelLgcIds,
      isTimeLimited: nowfunctionData.isTimeLimited,
      openStartTime: nowfunctionData.openStartTime,
      openEndTime: nowfunctionData.openEndTime,
      isTimeLimitedDeliv: nowfunctionData.isTimeLimitedDeliv,
      delivLimitDuration: nowfunctionData.delivLimitDuration,
      pickUpPointIds: nowfunctionData.pickUpPointIds,
      isSupportManyTimesOrder: nowfunctionData.isSupportManyTimesOrder,
      funcCode: nowfunctionData.funcCode,
      isShow: nowfunctionData.isShow,
      pageLayout: nowfunctionData.pageLayout,
      sort: nowfunctionData.sort,
      funcBannerImages: nowbannerList
    }

    wxrequest.hotelFunctionModify(linkData, that.data.id).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
          wx.showToast({
            title: '功能区修改成功',
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


  //获取类型 - 字典表
  basicDataItems_ft:function(){
    let that=this;
    let linkData={
      key: "FUNC_TYPE",
      orgId: "0",
      parentKey: "",
      parentValue: "",
    }
    wxrequest.basicDataItems(linkData).then(res=>{
        let resdata=res.data;
        if(resdata.code==0){
          let nowfuncTypeList=resdata.data.map(item=>{
            return {
              id: item.dictValue,
              funcTypeName: item.dictName,
            }
          })
          that.setData({
            funcTypeList: nowfuncTypeList
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
        title:err,
        icon:'none',
        duration:2000
      })
    })
  },

  //选择类型
  bindPickerType:function(e){
   let that=this;
   let index=e.detail.value;
   this.setData({
     funcTypeIndex:index,
     'functionData.funcType': that.data.funcTypeList[index].id
   })
  },

  //标题位置
  bindPickerTitle:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      'functionData.titlePosition': that.data.titlePositionOption[index].id,
      titleIndex:index
    })
  },

  //页面布局
  bindPickerLayput:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      'functionData.bookPageLayout': that.data.pageLayoutData[index].id,
      layoutIndex:index
    })
  },

  //获取配送方式 - 字典表
  basicDataItems_dw:function(){
    let that=this;
    let linkData={
      key: "DEVI",
      orgId: "0",
      parentKey: "",
      parentValue: "",
    };
    wxrequest.basicDataItems(linkData).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowdelivWayList
        if(resdata.data.length!=0){
          nowdelivWayList = resdata.data.map(item => {
            return {
              id: item.dictValue,
              delivWayName: item.dictName,
              delivejudge:false,
            }
          })
        }
        for (let i = 0; i < nowdelivWayList.length;i++){
          
          for (let j = 0; j < that.data.functionData.delivWays.length;j++){
            if (nowdelivWayList[i].id == that.data.functionData.delivWays[j]){
              nowdelivWayList[i].delivejudge=true
              break;
            }else{
              nowdelivWayList[i].delivejudge = false
            }
          }
        }
        
        that.setData({
          delivWayList: nowdelivWayList
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

  //选择配送
  delive:function(e){
    let that=this;
    let index=e.currentTarget.dataset.index;
    let nowdelivWayList = this.data.delivWayList;
    let nowdelivWays = this.data.functionData.delivWays;
    let nowpickUpPointList = this.data.pickUpPointList;
    let nowpickUpPointIds = this.data.functionData.pickUpPointIds;
    let flagIndex;


    if (nowdelivWays.length>0){
      let flag = nowdelivWays.some((item,valueIndex)=>{
        if (item == nowdelivWayList[index].id){
          flagIndex = valueIndex
          return true;
        }
      })
      if (flag){
        nowdelivWays.splice(flagIndex, 1)
        nowdelivWayList[index].delivejudge = false
      }else{
        nowdelivWays.push(nowdelivWayList[index].id)
        nowdelivWayList[index].delivejudge = true
      }
    }else{
      nowdelivWays.push(nowdelivWayList[index].id)
      nowdelivWayList[index].delivejudge=true
    }

    //自提区
    let ztIndex = that.data.functionData.delivWays.indexOf("4");

    let nowisPickUp = that.data.isPickUp;

    if (ztIndex != -1) {
      nowisPickUp = true;
    } else {
      nowisPickUp = false;
      // nowpickUpPointIds=[];
      // nowpickUpPointList.map(item => {
      //   item.pickjudge = false;
      //   return item;
      // })
    }

    //外卖
    let wmIndex = nowdelivWays.indexOf("7");
    let hotelIsSupportTakeOutOrder = wx.getStorageSync('hotelIsSupportTakeOutOrder');
    let nowisTakeout = this.data.isTakeout;
    if (wmIndex != -1) {
      if (this.hotelIsSupportTakeOutOrder == 0) {
        wx.showToast({
          title: '此酒店不支持外卖！',
          icon: 'none',
          duration: 2000
        })
        nowdelivWays.splice(wmIndex, 1);
        return false;
      }
      nowisTakeout = true;
    } else {
      nowisTakeout = false;
    }
    
    that.setData({
      'functionData.delivWays': nowdelivWays,
      delivWayList: nowdelivWayList,
      isPickUp: nowisPickUp,
      isTakeout: nowisTakeout,
      // pickUpPointList: nowpickUpPointList,
      // 'functionData.pickUpPointIds': nowpickUpPointIds,
    })
  },

  //获取酒店自提点列表
  getHotelPickUpPointList:function(){
    let that=this;
    let linkData={
      hotelId: wx.getStorageSync('hotelId')
    }
    wxrequest.getHotelPickUpPointList(linkData).then(res=>{
       let resdata=res.data;
      let nowpickUpPointList;
       if(resdata.code==0){
         if(resdata.data.length!=0){
           
           nowpickUpPointList=resdata.data.map(item=>{
             return {
               id:item.id,
               pickUpPointName: item.pointName,
               pickjudge:false
             }
           })
           
         }
 

         for (let i = 0; i < nowpickUpPointList.length; i++) {

           for (let j = 0; j < that.data.functionData.pickUpPointIds.length; j++) {
             if (nowpickUpPointList[i].id == that.data.functionData.pickUpPointIds[j]) {
               nowpickUpPointList[i].pickjudge = true
               break;
             } else {
               nowpickUpPointList[i].pickjudge = false
             }
           }
         }

         that.setData({
           pickUpPointList: nowpickUpPointList
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

  //选择自提点
  selfTake:function(e){
   let that=this;
   let index=e.currentTarget.dataset.index;
   let nowpickUpPointList = this.data.pickUpPointList;
   let nowpickUpPointIds = this.data.functionData.pickUpPointIds;
   let flagIndex;
    if (nowpickUpPointIds.length > 0) {
      let flag = nowpickUpPointIds.some((item, valueIndex) => {
        if (item == nowpickUpPointList[index].id) {
         
          flagIndex = valueIndex
          return true;
        }
      })
       if (flag) {
          nowpickUpPointIds.splice(flagIndex, 1)
          nowpickUpPointList[index].pickjudge = false
        } else {
          nowpickUpPointIds.push(nowpickUpPointList[index].id)
          nowpickUpPointList[index].pickjudge = true
        }
      } else {
        nowpickUpPointIds.push(nowpickUpPointList[index].id)
        nowpickUpPointList[index].pickjudge = true
      }
      that.setData({
        'functionData.pickUpPointIds': nowpickUpPointIds,
        pickUpPointList: nowpickUpPointList
      })
  },

  //时间范围开始
  bindDateChange:function(e){
    let value=e.detail.value+':00';
    this.setData({
      'functionData.openStartTime': value
    })
  },

  //时间范围结束
  bindDateChange2: function (e) {
    let value = e.detail.value + ':00';
    this.setData({
      'functionData.openEndTime': value
    })
  },

  //获取页面布局 - 字典表
  basicDataItems_pl:function(){
    let that=this;
    let linkData={
      key: "PAGE_LAYOUT",
      orgId: "0",
      parentKey: "",
      parentValue: "",
    }
    wxrequest.basicDataItems(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowshopLayoutData;
         if(resdata.data.length!=0){
           nowshopLayoutData = resdata.data.map(item=>{
             return {
               id: item.dictValue,
               pageLayoutName: item.dictName
             }
           })
         }
         that.setData({
           shopLayoutData: nowshopLayoutData
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

  //选择布局
  bindPickershopLayput:function(e){
    let that=this;
    let index=e.detail.value;
    let nowdelivWayList = this.data.delivWayList;
    if (that.data.shopLayoutData[index].id==3){
      nowdelivWayList.pickUpPointIds=[];
    }
    nowdelivWayList.map(item=>{
      item.delivejudge=false;
      return item;
    })
    this.setData({
      'functionData.pageLayout': that.data.shopLayoutData[index].id,
      shopLayoutIndex: index,
      'functionData.delivWays':[],
      'isTakeout':false,
      'isPickUp': false,
      'functionData.isSupportManyTimesOrder': 0,
      delivWayList: nowdelivWayList
    })
  },

  //选择房源范围
  bindPickerRoomFlag:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      'functionData.roomResourcesFlag': that.data.roomFlagData[index].id,
      roomFlagIndex:index
    })
  },

  //房源列表
  getBookFuncResourcesList:function(){
    let that=this;
    let linkData={
      orgAs: 3,
      hotelId: wx.getStorageSync('hotelId'),
      pageNo: 1,
      pageSize: 200,
    }
    wxrequest.bookResourceList(linkData).then(res=>{
      let resdata=res.data;
      let nowbookFuncResourcesOptions;
      if(resdata.code==0){
        if(resdata.data.length!=0){
          nowbookFuncResourcesOptions=resdata.data.records.map(item=>{
            return {
              id: item.id,
              resourceName: item.resourceName,
              roomTypeId: item.roomTypeId,
              roomjudge:false
            }
          })
        }
        for (let i = 0; i < nowbookFuncResourcesOptions.length; i++) {

          for (let j = 0; j < that.data.functionData.bookFuncResources.length; j++) {
            if (nowbookFuncResourcesOptions[i].id == that.data.functionData.bookFuncResources[j].id) {
              nowbookFuncResourcesOptions[i].roomjudge = true
              break;
            } else {
              nowbookFuncResourcesOptions[i].roomjudge = false
            }
          }
        }
        that.setData({
          bookFuncResourcesOptions: nowbookFuncResourcesOptions
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

  //选择房源
  selectRoom:function(e){
    let that=this;
    let index=e.currentTarget.dataset.index;
    let nowbookFuncResources = that.data.functionData.bookFuncResources
    let nowbookFuncResourcesOptions = that.data.bookFuncResourcesOptions;
    // let nowbookFuncResourcesArr = that.data.bookFuncResourcesArr;
    let flagIndex;
    if (nowbookFuncResources.length>0){
      let flag = nowbookFuncResources.some((item, valueIndex) => {
        if (item.id == nowbookFuncResourcesOptions[index].id) {

          flagIndex = valueIndex
          return true;
        }
      })
      if (flag) {
        nowbookFuncResources.splice(flagIndex, 1)
        nowbookFuncResourcesOptions[index].roomjudge = false
      } else {
        nowbookFuncResources.push(nowbookFuncResourcesOptions[index])
        nowbookFuncResourcesOptions[index].roomjudge = true
      }
      
    }else{
      nowbookFuncResources.push(nowbookFuncResourcesOptions[index])
      nowbookFuncResourcesOptions[index].roomjudge = true
    }
    that.setData({
      bookFuncResources: nowbookFuncResources,
      bookFuncResourcesOptions: nowbookFuncResourcesOptions
    })
  },

  //删除图标
  funIcon:function(){
    this.setData({
      'functionData.funcLogoUrl':'',
      'functionData.funcLogoPath': '',
    })
  },

  //上传图标
  addfunIcon:function(){
    let that=this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: apiUrl + 'basic/file/upload',
          header: {
            'Authorization': wx.getStorageSync("token")
          },
          filePath: tempFilePaths[0],
          name: 'fileContent',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = JSON.parse(res.data)
     
            that.setData({
              'functionData.funcLogoUrl': tempFilePaths[0],
              'functionData.funcLogoPath': data.data,
            })
          }
        })
      }
    })
  },

  //上传banner图
  addfunBanner:function(){
    let that = this;
    let nowbannerList = that.data.bannerList;
    if (nowbannerList.length>=5){
      wx.showToast({
        title: 'banner图最多上传5张',
        icon:'none',
        duration:2000
      })
      return false;
    }
    wx.chooseImage({
      count:5,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: apiUrl + 'basic/file/upload',
          header: {
            'Authorization': wx.getStorageSync("token")
          },
          filePath: tempFilePaths[0],
          name: 'fileContent',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = JSON.parse(res.data)
            
            nowbannerList.push({
              id: '',
              name: '',
              path: data.data,
              url: tempFilePaths[0],
              linkId: 0,
              isParam: false,
              paramsData: [],
              paramsLD: []
            })

            that.setData({
              bannerList: nowbannerList,
            })
          }
        })
      }
    })
  },

  //删除banner图
  removeBan:function(e){
    let that=this;
    let index=e.currentTarget.dataset.index;
    let nowbannerList = this.data.bannerList;
    nowbannerList.splice(index,1);
    this.setData({
      bannerList: nowbannerList
    })
  },

  //房源显示
  trigggerroom:function(){
    this.setData({
      roomSwitch: !this.data.roomSwitch
    })
  },

  //顶部信息
  topInfo:function(e){
    let that=this;
    this.setData({
      'functionData.isShowTop':e.detail.value
    })
  },

  //标题开关
  titleSwitch:function(e){
    this.setData({
      'functionData.isShowTitle': e.detail.value
    })
  },

  //限时开放
  timeLimit:function(e){
    this.setData({
      'functionData.isTimeLimited': e.detail.value
    })
  },

  //限时送达
  deliveLimit:function(e){
    this.setData({
      'functionData.isTimeLimitedDeliv': e.detail.value
    })
  },

  //排序提示
  sorttip:function(){
    wx.showModal({
      title: '提示',
      content: '排序是根据数字的大小从大到小排列，数字越大越靠前，支持整数，默认为0。'
    })
  },

  //多次下的提示
  moretip:function(){
    wx.showModal({
      title: '提示',
      content: '如果开关打开，表示多人扫码，进入的是同一个订单，并可以多人多次点单。如果开关关闭，表示用户扫码下单，每个人都会生成一个新的订单。'
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