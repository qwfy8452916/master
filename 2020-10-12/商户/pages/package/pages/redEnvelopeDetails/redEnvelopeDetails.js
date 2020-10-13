// pages/package/pages/redEnvelopeDetails/redEnvelopeDetails.js
const app=getApp();
let apiUrl = app.globalData.requestUrl;
import wxrequest from '../../../../utils/api'
import WxValidate from '../../../../utils/WxValidate'

app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    detailId:'',
    redShadowfath:false,
    redShadow:false,
    paramsShadow:false,
    rotateJudge:true,
    actName:'', //活动名称
    actBegin:'', //活动开始日期
    actEnd:'', //活动结束日期
    actPartInCountType:'', //参与次数
    tableData:[], //红包阶梯
    addrednum:'', //红包金额
    forwardData:[
      {id:0,name:"使用默认"},
      {id:1,name:"自定义"},
    ], //转发预览数据
    forwardIndex:'',
    allAdPageList:[], //广告页数据
    allAdPageIndex:'',
    allLinkList:[], //广告后页
    allLinkIndex:'', 
    ifHasParam:false, //判断按钮
    paramData:[],
    modelLink:{},
    modelData:[], //板块数据
    bonusAmountList:[], //奖励来源
    BaselineList:[], //计算基准
    formData:{
      shareImgType:0, //转发预览
      minOrderAmount:'', //最小订单金额
      shareMsg:'', //转发提示
      shareImgCustomPath:'', //转发预览图片路径
      shareImgCustomUrl:'', //转发预览图片url
      posterFlag:false, //海报开关
      posterImgPath:'', //海报路径
      posterImgUrl:'', //海报url
      posterQrX:'', //x轴
      posterQrY:'', //y轴
      posterQrPx:'', //二维码尺寸
      adFlag:false, //是否选中广告页
      hotelAdId:'', //广告页
      adLinkFlag:false, //是否选中广告后页
      hotelAdLinkId:'', //广告后页
      
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let that=this;
    this.setData({
      id:options.id
    })

    this.initValidate();//验证规则函数
    
    that.getAlllinks();
    that.getFillbackData();
    that.getADpages();
    that.getbonusAmountList()

    
    

  },



  initValidate() {//验证规则函数
    const that = this;
    const rules = {
      minOrderAmount: {
        required: true
      },
      posterQrX: {
        required: that.data.formData.posterFlag?true:false,
        digits: that.data.formData.posterFlag?true:false,
      },
      posterQrY: {
        required: that.data.formData.posterFlag?true:false,
        digits: that.data.formData.posterFlag?true:false,
      },
      posterQrPx: {
        required: that.data.formData.posterFlag?true:false,
        digitsfloat: that.data.formData.posterFlag?true:false,
      },
      // categoryScopeType: {
      //   required: that.data.addFormData.modelType==1?true:false
      // },
      // prodScopeType: {
      //   required: that.data.addFormData.modelType==1?true:false
      // },
      // roomsType: {
      //   required: that.data.addFormData.modelType==2?true:false
      // },
      // redPacketAmountFrom: {
      //   required: true
      // },
      // redSetType: {
      //   required: true
      // },
      // bonusBaselineType: {
      //   required: that.data.addFormData.redSetType==1?true:false
      // },
      // redPacketRate: {
      //   digits: true,
      //   required: that.data.addFormData.redSetType==1?true:false
      // },
      // redAmount: {
      //   digitsfloat: true,
      //   required: that.data.addFormData.redSetType==2?true:false
      // },

    }



    const messages = {
      minOrderAmount: {
        required: '请输入最小订单金额'
      },
      posterQrX: {
        required: '请输入二维码X轴位置',
        digits:'请输入正确的X轴位置'
      },
      posterQrY: {
        required: '请输入二维码Y轴位置',
        digits:'请输入正确的Y轴位置'
      },
      posterQrPx: {
        required: '请输入二维码尺寸',
        digitsfloat:'请输入正确的尺寸'
      },
      // categoryScopeType: {
      //   required: '请选择分类范围'
      // },
      // prodScopeType: {
      //   required: '请选择商品范围'
      // },
      // roomsType: {
      //   required: '请选择房源范围'
      // },
      // redPacketAmountFrom: {
      //   required: '请选择红包奖励来源'
      // },
      // redSetType: {
      //   required: '请选择红包奖励类型'
      // },
      // bonusBaselineType: {
      //   required: '请选择计算基准'
      // },
      // redPacketRate: {
      //   required: '请输入红包比例',
      //   digits:'请输入正确的红包比例'
      // },
      // redAmount: {
      //   required:'请输入红包金额',
      //   digitsfloat: '请输入正确的红包金额'
      // },


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
    
    let nowformData=that.data.formData;

    Object.assign(nowformData, params)
    
    that.setData({
      formData: nowformData
    })

    
    that.resetRedpackModel()
  },

  //确定
  resetRedpackModel: function (){
    let that=this;
    let nowtableData=that.data.tableData;
    nowtableData.forEach(item=>{
      if(item.redPacketCount==''){
        wx.showToast({
          title: '请输入红包数量',
          icon:'none',
          duration:2000
        })
        return false;
      }
    })


    if(that.data.formData.shareImgType==1){
      if(that.data.formData.shareImgCustomPath==''){
        wx.showToast({
          title: '请上传转发预览图片',
          icon:'none',
          duration:2000
        })
        return false;
      }
     }

     if(that.data.formData.posterFlag){
       if(that.data.formData.posterImgPath==''){
        wx.showToast({
          title: '请上传海报模板',
          icon:'none',
          duration:2000
        })
        return false;
       }
     }

     if(that.data.formData.adFlag){
      if(that.data.formData.hotelAdId==='' || that.data.formData.hotelAdId==null){
       wx.showToast({
         title: '请选择广告页',
         icon:'none',
         duration:2000
       })
       return false;
      }
    }

    if(that.data.formData.adLinkFlag){
      if(that.data.formData.hotelAdLinkId==='' || that.data.formData.hotelAdLinkId==null){
       wx.showToast({
         title: '请选择广告页',
         icon:'none',
         duration:2000
       })
       return false;
      }
    }


    let linkData={
      actHotelId:wx.getStorageSync('hotelId'),
      minOrderAmount:that.data.formData.minOrderAmount,
      posterFlag:that.data.formData.posterFlag?1:0,
      posterImg:that.data.formData.posterImgPath,
      posterQrPx:that.data.formData.posterQrPx,
      posterQrX:that.data.formData.posterQrX,
      posterQrY:that.data.formData.posterQrY,
      shareImgType:that.data.formData.shareImgType,
      shareMsg:that.data.formData.shareMsg,
      adFlag:that.data.formData.adFlag?1:0,
      adLinkFlag:that.data.formData.adLinkFlag?1:0,
      shareImgCustomPath:that.data.formData.shareImgCustomPath,
      hotelAdId:that.data.formData.hotelAdId,
      hotelAdLinkId:that.data.formData.hotelAdLinkId,

    };

    let nowmodelLink=that.data.modelLink;
  
    if(JSON.stringify(nowmodelLink) != '{}'){
         linkData.hotelAdLinkParm = this.getLinkParm(nowmodelLink)
     }else{
         linkData.hotelAdLinkParm = ''
     }

     linkData.settingLadderDTOS = nowtableData.map(item => {
          return {
              maxAmount: item.maxAmount=='∞'?-999:item.maxAmount,
              minAmount: item.minAmount,
              redPacketCount: item.redPacketCount
          }
      })




    wxrequest.resetRedpackModel(linkData,that.data.id).then(res=>{
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


  getLinkParm(obj){
    var i = 0
    var stringLink = ''
    for(var item in obj){
        if(i>0){
            stringLink += ('&'+item+'='+obj[item])
        }else{
            stringLink += (item+'='+obj[item])
        }
        i++
    }
    return stringLink

  },

  //修改参数
  ensureParams:function(){

    let nowparamData=this.data.paramData;
    let nowmodelLink=this.data.modelLink;
    nowparamData.forEach(item=>{
      if(item.isNecessary && nowmodelLink[item.parameterName]===''){
         wx.showToast({
           title: item.parameterName+'请输入参数',
           icon:'none',
           duration:2000
         })
         return false;
      }
    })
    wx.showToast({
      title: '操作成功',
      icon:'none',
      duration:2000
    })
    this.setData({
      paramsShadow:false,
      redShadowfath:false
    })
  },



  //获取单个活动详情
  getFillbackData:function(){
    let that=this;
    wxrequest.selectActivityOne(that.data.id).then(res=>{
      let resdata=res.data;
      let nowtableData=that.data.tableData;
      let nowformData=that.data.formData;
      let actDetail=resdata.data.actHotelDTOS[0].details[0];
      if(resdata.code==0){
        let nowactPartInCountType=that.data.actPartInCountType;
        if(resdata.data.actPartInCountType==0){
          nowactPartInCountType='不限制'
        }else if(resdata.data.actPartInCountType==1){
          nowactPartInCountType=resdata.data.actPartInCount +'次/每类型'
        }else if(resdata.data.actPartInCountType==2){
          nowactPartInCountType=resdata.data.actPartInCount +'次/每活动'
        }else if(resdata.data.actPartInCountType==3){
          nowactPartInCountType=resdata.data.actPartInCount +'次/每天'
        }else if(resdata.data.actPartInCountType==4){
          nowactPartInCountType=resdata.data.actPartInCount +'次/每周'
        }else if(resdata.data.actPartInCountType==5){
          nowactPartInCountType=resdata.data.actPartInCount +'次/每月'
        }

        nowtableData=actDetail.settingLadderDTOS.map(item=>{
          return {
            minAmount:item.minAmount,
            maxAmount:item.maxAmount ==-999?'∞':item.maxAmount,
            redPacketCount:item.redPacketCount,
            isSet: false,
          }
        })

        nowformData.shareMsg=actDetail.shareMsg;
        nowformData.minOrderAmount=actDetail.minOrderAmount;
        nowformData.shareImgType=actDetail.shareImgType;
        nowformData.posterQrX=actDetail.posterQrX;
        nowformData.posterQrY=actDetail.posterQrY;
        nowformData.posterQrPx=actDetail.posterQrPx;
        
        if(nowformData.shareImgType){
          nowformData.shareImgCustomPath=actDetail.shareImgCustomPath;
          nowformData.shareImgCustomUrl=actDetail.shareImgCustomUrl;
        }
        nowformData.posterFlag=actDetail.posterFlag?true:false
       
        if(nowformData.posterFlag){
          nowformData.posterImgPath=actDetail.posterImg;
          nowformData.posterImgUrl=actDetail.posterImgUrl
        }

        
        
        let nowforwardData=that.data.forwardData;
        let nowforwardIndex=that.data.forwardIndex;
        for(let i=0;i<nowforwardData.length;i++){
          if(nowforwardData[i].id==actDetail.shareImgType){
            nowforwardIndex=i
          }
        }
        
        nowformData.adFlag=actDetail.adFlag?true:false
        nowformData.hotelAdId=actDetail.hotelAdId;
        let nowallAdPageList=that.data.allAdPageList;
        let nowallAdPageIndex=that.data.allAdPageIndex;
        for(let i=0;i<nowallAdPageList.length;i++){
          if(nowallAdPageList[i].id==actDetail.hotelAdId){
            nowallAdPageIndex=i
          }
        }

        nowformData.adLinkFlag=actDetail.adLinkFlag?true:false
        nowformData.hotelAdLinkId=actDetail.hotelAdLinkId;
        let nowallLinkList=that.data.allLinkList;
        let nowallLinkIndex=that.data.allLinkIndex;
        for(let i=0;i<nowallLinkList.length;i++){
          if(nowallLinkList[i].id==actDetail.hotelAdLinkId){
            nowallLinkIndex=i
          }
        }

        let isNeedParameter = nowallLinkList.find(item => {
          return item.id == actDetail.hotelAdLinkId
      })
      if(isNeedParameter){
         if(isNeedParameter.isNeedParameter){
             that.setData({
              ifHasParam:true
             })
         }else{
          that.setData({
            ifHasParam:false
           })
         }
      }

        that.spliteLinks(actDetail.hotelAdLinkParm)
        that.setData({
          actName:resdata.data.actName,
          actBegin:resdata.data.actBegin.split(' ')[0],
          actEnd:resdata.data.actEnd.split(' ')[0],
          actPartInCountType:nowactPartInCountType,
          tableData:nowtableData,
          formData:nowformData,
          forwardIndex:nowforwardIndex,
          allAdPageIndex:nowallAdPageIndex,
          allLinkIndex:nowallLinkIndex,
          detailId:actDetail.id
        })
        that.getActList(resdata.data.actType)
        that.getModelDataList();
        if(that.data.formData.hotelAdLinkId){
          that.getParamsData()
      }
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

  //解析字符串
  spliteLinks:function(stringLink){
    let that=this;
    let nowmodelLink={};
    if(stringLink != ''){
      stringLink.split('&').forEach(item => {
          let param = item.split('=')[0]
          let value = item.split('=')[1]
          nowmodelLink[param]=value
      })
      that.setData({
        modelLink:nowmodelLink
      })
    }
  },



  //获取活动列表
  getActList:function(type){
    let that=this;
    wxrequest.basicDataItems({key:'ACTTYPE',orgId:0}).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
          let nowactType=resdata.data.find(item=>{
            return item.dictValue=type
          }).dictName;
          that.setData({
            actType:nowactType
          })
       }else{
         wx.showToast({
           title: resdata.msg,
           icon:'none',
           duration:2000,
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

  //所有广告页
  getADpages:function(){
    let that=this;
    let hotelId=wx.getStorageSync('hotelId')
    wxrequest.selAllAdPages({hotelId:hotelId}).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
           that.setData({
            allAdPageList:resdata.data
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
  
  //广告后页数据
  getAlllinks:function(){
    let that=this;
    let linkData={
      pageNo: 1,
      pageSize: 50,
    }
    wxrequest.selNewLink(linkData).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowallLinkList=resdata.data.records.filter(item=>item.isEnable==1);
          that.setData({
            allLinkList:nowallLinkList
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
  
  
  addbtn:function(){
    this.setData({
      redShadow:true,
      redShadowfath:true
    })
  },

  //取消
  redbtnCancel:function(){
    this.setData({
      redShadow:false,
      redShadowfath:false
    })
  },
  
  //删除图片
  closePic:function(){

    this.setData({
      'formData.shareImgCustomUrl':'',
      'formData.shareImgCustomPath': '',
    })
  },

  //红包金额
  redInput:function(e){
    this.setData({
      addrednum:e.detail.value
    })

  },

  //设置参数
  setParams:function(){
    let that=this;
    that.setData({
      redShadowfath:true,
      paramsShadow:true
    })
  },

  ensureRed:function(){
    let that=this;
    let nowtableData=this.data.tableData;
    let nowaddrednum=this.data.addrednum;
    if(!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]{1,2}$)/.test(nowaddrednum)){
      wx.showToast({
        title: '请规范输入红包金额',
        icon:'none',
        duration:2000
      })
      return false;
    }else{
      nowtableData.forEach((item,index)=>{
          if(Number(item.minAmount)<Number(nowaddrednum) && (Number(item.maxAmount)>Number(nowaddrednum)||item.maxAmount=='∞')){
              let insertObj = {
                  minAmount: item.minAmount,
                  redPacketCount: item.redPacketCount,
                  maxAmount: nowaddrednum,
                  isSet:false
              }
              item.minAmount = nowaddrednum
              nowtableData.splice(index,0,insertObj)
              
          }

          if(Number(item.minRedpackNum) == Number(this.addrednum) || Number(item.maxRedpackNum) == Number(this.addrednum)){
            this.$message({
                message: '已有该红包金额区间，请重新输入其他金额！',
                type: 'warning'
            })
         }

         that.setData({
          tableData:nowtableData,
          redShadow:false,
          redShadowfath:false
        })
        
      })
    }

  },

  //删除红包
  removeBox:function(e){
    let index=e.currentTarget.dataset.index;
    let nowtableData=this.data.tableData;
    nowtableData.splice(index,1)
    this.setData({
      tableData:nowtableData
    })
  },

  //上传图片
  addfunPic:function(){
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
              'formData.shareImgCustomUrl': tempFilePaths[0],
              'formData.shareImgCustomPath': data.data,
            })
          }
        })
      }
    })
  },

    //删除海报图片
    closePoster:function(){
      this.setData({
        'formData.posterImgUrl':'',
        'formData.posterImgPath': '',
      })
    },

  //选择转发设置
  bindPickerForward:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      forwardIndex:index,
      'formData.shareImgType':that.data.forwardData[index].id,
    })
  },

  //选择广告页
  bindPickerallAdPage:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      allAdPageIndex:index,
      'formData.hotelAdId':that.data.forwardData[index].id,
    })

  },

  //选择广告后页
  bindPickerAllLink:function(e){
    let that=this;
    let index=e.detail.value;

    let nowhotelAdLinkId=that.data.allLinkList[index].id;
    let nowallLinkList=that.data.allLinkList;
    let nowifHasParam=that.data.ifHasParam;
    let isNeedParameter=nowallLinkList.find(item=>{
      return item.id==nowhotelAdLinkId
    })

    this.setData({
      'formData.hotelAdLinkId':nowhotelAdLinkId,
    })

    if(isNeedParameter){
      if(isNeedParameter.isNeedParameter){
        nowifHasParam=true;
        that.getParamsData()
      }else{
        nowifHasParam=false;
      }
     
    }
    this.setData({
      allLinkIndex:index,
      // 'formData.hotelAdLinkId':nowhotelAdLinkId,
      ifHasParam:nowifHasParam
    })
  },


  //查询参数
  getParamsData:function(){
    let that=this;
    let linkData={
      linkId:that.data.formData.hotelAdLinkId
    }
    wxrequest.selNewParams(linkData).then(res=>{
        let resdata=res.data;
        if(resdata.code==0){
          let nowparamData=that.data.paramData;
          let nowmodelLink=that.data.modelLink;
          nowparamData=resdata.data;
 
          let newobj = {}
          nowparamData.forEach(item=>{
            let ifhas = false
            let value = ''
            for(var items in nowmodelLink){
               if(item.parameterName == items){
                ifhas = true
                value = nowmodelLink[items]
               }  
            }
             if(ifhas){
                  newobj[item.parameterName] = value
              }else{
                  newobj[item.parameterName] = item.defaultValue
              }
          })
          nowmodelLink = newobj

          that.setData({
            paramData:nowparamData,
            modelLink:nowmodelLink,
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
  
  //取消参数设置
  paramsCancel:function(){
    let that=this;
    this.setData({
      redShadowfath:false,
      paramsShadow:false,
    })
  },

  //获取链接参数
  parsmsInput:function(e){
    let that=this;
    let key=e.currentTarget.dataset.index;
    let value=e.detail.value;
    let nowmodelLink=that.data.modelLink;

    for(let i in nowmodelLink){
      if(i==key){
        nowmodelLink[i]=value
      }
    }

    that.setData({
      modelLink:nowmodelLink
    })
  },

    //上传海报图片
    addPoster:function(){
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
                'formData.posterImgUrl': tempFilePaths[0],
                'formData.posterImgPath': data.data,
              })
            }
          })
        }
      })
    },
    

  //缩展
  rotatechange:function(){
    this.setData({
      rotateJudge:!this.data.rotateJudge
    })
  },

  //查询板块
  getModelDataList:function(){
    let that=this;
    wxrequest.selRedpackModel({settinId:this.data.detailId}).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowmodelData=resdata.data;
        nowmodelData.forEach(item=>{
          item.redPacketAmountFrom= that.changeAFName(item.redPacketAmountFrom).label
          item.bonusBaselineType = !item.bonusBaselineType?'-':that.changeBSName(item.bonusBaselineType).label
        })

        that.setData({
          modelData:nowmodelData
        })
      }else{
        wx.showToast({
          title:resdata.msg,
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

  changeAFName(id){

    return this.data.bonusAmountList.find(item => {
        return item.id == id
    })
},
changeBSName(id){
    return this.data.BaselineList.find(item => {
        return item.id == id
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
         that.getBaselineList()
       }
    }).catch(err=>{
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
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

  //板块添加
  plateAdd:function(){
    wx.navigateTo({
      url: '../plateAdd/plateAdd?detailId='+this.data.detailId,
    })
  },

  //获取数量
  redPacketCount:function(e){

    let index=e.currentTarget.dataset.index;
    let value=e.detail.value

    let nowredPacketCount="tableData["+index+"].redPacketCount";
    this.setData({
      [nowredPacketCount]:value
    })
  },

  //海报
  posterFlag:function(e){
    let value=e.detail.value;
    this.setData({
      'formData.posterFlag':value
    })
  },

  //广告开关
  adFlag:function(e){
    let value=e.detail.value;
    this.setData({
      'formData.adFlag':value
    })

  },

  //广告后页
  adLinkFlag:function(e){
    let value=e.detail.value;
    this.setData({
      'formData.adLinkFlag':value
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

     this.getModelDataList();
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