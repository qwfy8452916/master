// pages/package/pages/meetingSet/meetingSet.js
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
    actOrgId:'',
    commoditygai:{
      disCountLad:[],
      repeatFlag:false,
    },
    selectprodData:[],
    detailId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    this.getFillbackData();
  },

  //确定明细
  sureBtn:function(){
    let that=this;
    let nowdisCountLad=this.data.commoditygai.disCountLad;
    let nowselectprodData=this.data.selectprodData;

    for(var i=0;i<nowdisCountLad.length;i++){
      if(nowdisCountLad[i].discount===''){
         wx.showToast({
           title: '请填写折扣',
           icon:'none',
           duration:2000
         })
         return false;
      }
    }
    if(nowselectprodData.length<=0){
      wx.showToast({
        title: '请选择商品',
        icon:'none',
        duration:2000
      })
      return false;
    }
    
    let linkData={
      actId:this.data.id,
      actSecDiscountSettingLadderDTOS:this.data.commoditygai.disCountLad,
      actSecDiscountSettingProdDTOS:nowselectprodData.map(item=>{
        return {
          prodId:item.id,
          prodCode:item.prodCode
        }
      }),
      repeatFlag:this.data.commoditygai.repeatFlag?1:0,
    }
    console.log(linkData)
    wxrequest.secondDiscount(linkData,this.data.detailId).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
         wx.navigateTo({
           url: '../activeList/activeList',
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



    //获取单个活动详情
    getFillbackData:function(){
      let that=this;
      wxrequest.selectActivityOne(that.data.id).then(res=>{
        let resdata=res.data;
        // let nowtableData=that.data.tableData;
        // let nowformData=that.data.formData;
        // let actDetail=resdata.data.actHotelDTOS[0].details[0];
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
  
          // nowtableData=actDetail.settingLadderDTOS.map(item=>{
          //   return {
          //     minAmount:item.minAmount,
          //     maxAmount:item.maxAmount ==-999?'∞':item.maxAmount,
          //     redPacketCount:item.redPacketCount,
          //     isSet: false,
          //   }
          // })
  
          // nowformData.shareMsg=actDetail.shareMsg;
          // nowformData.minOrderAmount=actDetail.minOrderAmount;
          // nowformData.shareImgType=actDetail.shareImgType;
          // nowformData.posterQrX=actDetail.posterQrX;
          // nowformData.posterQrY=actDetail.posterQrY;
          // nowformData.posterQrPx=actDetail.posterQrPx;
          
          // if(nowformData.shareImgType){
          //   nowformData.shareImgCustomPath=actDetail.shareImgCustomPath;
          //   nowformData.shareImgCustomUrl=actDetail.shareImgCustomUrl;
          // }
          // nowformData.posterFlag=actDetail.posterFlag?true:false
         
          // if(nowformData.posterFlag){
          //   nowformData.posterImgPath=actDetail.posterImg;
          //   nowformData.posterImgUrl=actDetail.posterImgUrl
          // }
  
          
          
          // let nowforwardData=that.data.forwardData;
          // let nowforwardIndex=that.data.forwardIndex;
          // for(let i=0;i<nowforwardData.length;i++){
          //   if(nowforwardData[i].id==actDetail.shareImgType){
          //     nowforwardIndex=i
          //   }
          // }
          
          // nowformData.adFlag=actDetail.adFlag?true:false
          // nowformData.hotelAdId=actDetail.hotelAdId;
          // let nowallAdPageList=that.data.allAdPageList;
          // let nowallAdPageIndex=that.data.allAdPageIndex;
          // for(let i=0;i<nowallAdPageList.length;i++){
          //   if(nowallAdPageList[i].id==actDetail.hotelAdId){
          //     nowallAdPageIndex=i
          //   }
          // }
  
          // nowformData.adLinkFlag=actDetail.adLinkFlag?true:false
          // nowformData.hotelAdLinkId=actDetail.hotelAdLinkId;
          // let nowallLinkList=that.data.allLinkList;
          // let nowallLinkIndex=that.data.allLinkIndex;
          // for(let i=0;i<nowallLinkList.length;i++){
          //   if(nowallLinkList[i].id==actDetail.hotelAdLinkId){
          //     nowallLinkIndex=i
          //   }
          // }
  
        //   let isNeedParameter = nowallLinkList.find(item => {
        //     return item.id == actDetail.hotelAdLinkId
        // })
        // if(isNeedParameter){
        //    if(isNeedParameter.isNeedParameter){
        //        that.setData({
        //         ifHasParam:true
        //        })
        //    }else{
        //     that.setData({
        //       ifHasParam:false
        //      })
        //    }
        // }
  
          // that.spliteLinks(actDetail.hotelAdLinkParm)
          let nowdisCountLad=resdata.data.actSecDecCountDetail.actSecDiscountSettingLadderDTOS.map(item => {
            return {
                discount: item.discount,
                prodNumber: item.prodNumber,
            }
        })
          let nowrepeatFlag=resdata.data.actSecDecCountDetail.repeatFlag?true:false

          let nowselectprodData=that.data.selectprodData;
          nowselectprodData=resdata.data.actSecDecCountDetail.actSecDiscountSettingProdDTOS.map(item=>{
            return item.productDTO
          })
          that.setData({
            actName:resdata.data.actName,
            actBegin:resdata.data.actBegin.split(' ')[0],
            actEnd:resdata.data.actEnd.split(' ')[0],
            actPartInCountType:nowactPartInCountType,
            actScopeLevel:resdata.data.actScopeLevel==2?'供应商':resdata.data.data.actScopeLevel==1?'单店':'平台',
            'commoditygai.disCountLad':nowdisCountLad,
            repeatFlag:nowrepeatFlag,
            actOrgId:resdata.data.actOrgId,
            selectprodData:nowselectprodData,
            detailId:resdata.data.actSecDecCountDetail.id,
            // tableData:nowtableData,
            // formData:nowformData,
            // forwardIndex:nowforwardIndex,
            // allAdPageIndex:nowallAdPageIndex,
            // allLinkIndex:nowallLinkIndex,
            // detailId:actDetail.id
          })
          that.getActList(resdata.data.actType)
          // that.getModelDataList();
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

  //新增优惠内容
  addDis:function(e){
    let nowdisCountLad=this.data.commoditygai.disCountLad;
    let index=nowdisCountLad.length;
    let nowObject={
      discount: '',
      prodNumber: index+1,
    }
    nowdisCountLad.push(nowObject)
    this.setData({
      'commoditygai.disCountLad':nowdisCountLad
    })
  },

  //折扣
  disCount:function(e){
    let index=e.currentTarget.dataset.index;
    let value=e.detail.value;
    let nowdiscount="commoditygai.disCountLad["+index+"].discount"
    this.setData({
      [nowdiscount]:value
    })
  },

  //删除折扣
  deleDis:function(e){
    let index=e.currentTarget.dataset.index;
    let nowdiscount=this.data.commoditygai.disCountLad;
    nowdiscount.splice(index,1)
    for(var i=index;i<nowdiscount.length;i++){
      nowdiscount[i].prodNumber--
    }
    this.setData({
      'commoditygai.disCountLad':nowdiscount
    })
  },

  //选择商品
  prodSelect:function(){
    let that=this;

    let selectprodData;
    if(this.data.selectprodData){
      selectprodData=JSON.stringify(this.data.selectprodData)
    }else{
      selectprodData='[]'
    }
 

    wx.navigateTo({
      url: '../discountProd/discountProd?selectprodData='+selectprodData +'&prodjudge='+false+'&actOrgId='+this.data.actOrgId,
    })
  },

  //删除商品
  closeProd:function(e){
    let index=e.currentTarget.dataset.index;
    let nowselectprodData=this.data.selectprodData;
    nowselectprodData.splice(index,1)
    this.setData({
      selectprodData:nowselectprodData
    })
  },

  //重复计算
  repeatFlag:function(e){
    console.log(e)
    let value=e.detail.value;
    this.setData({
      'commoditygai.repeatFlag':value
    })
  },

  
  //上传会议描述图片
  addfunBanner: function () {
    let that = this;
    let nowbannerImageList = that.data.ownProdData.bannerImageList;
    let nowbannerImages = that.data.ownProdData.bannerImages;
    if (nowbannerImageList.length > 5) {
      wx.showToast({
        title: 'banner图最多上传5张',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.chooseImage({
      count: 5,
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
            let imageUrl={
              imageUrl: tempFilePaths[0]
            }
            nowbannerImageList.push(imageUrl)
            nowbannerImages.push(data.data)

            that.setData({
              'ownProdData.bannerImageList': nowbannerImageList,
              'ownProdData.bannerImages': nowbannerImages,
            })

          }
        })
      }
    })
  },

  //会议资料
  uploadbtn:function(){
    let that=this;
    wx.chooseMessageFile({
      count: 10,
      type: 'all',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles
        console.log(res)

        wx.uploadFile({
          url: apiUrl+'basic/file/upload', 
          header: {
'Authorization': wx.getStorageSync("token")
          },
          filePath: tempFilePaths[0].path,
          name: 'fileContent',
          formData: {
'user': 'test'
          },
          success(res) {
            const data = res.data
            console.log(data)
          }
        })

      }
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