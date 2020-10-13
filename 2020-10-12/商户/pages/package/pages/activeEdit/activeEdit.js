// pages/package/pages/activeEdit/activeEdit.js
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
    actTypeList:[], //板块类型
    actTypeIndex:'',
    dateData:[
      {id:1,name:"每周"},
      {id:2,name:"每月"},
      {id:3,name:"每天"},
    ], //日期选择
    dateIndex:'',

    dayStyleArry:[],
    monthStyleArry:[],

    weekData:[
      {id:2,name:"周一",weekjd:false},
      {id:3,name:"周二",weekjd:false},
      {id:4,name:"周三",weekjd:false},
      {id:5,name:"周四",weekjd:false},
      {id:6,name:"周五",weekjd:false},
      {id:7,name:"周六",weekjd:false},
      {id:1,name:"周日",weekjd:false},
    ],
    timeList:[
      {startTime:"",endTime:""},
    ],
    cishuData:[
      {id:0,name:"不限制"},
      {id:1,name:"按类型"},
      {id:2,name:"按活动"},
      {id:3,name:"按时间"},
    ], //参与类型
    cishuIndex:0,
    dateTypeList:[
      {
          id: 0,
          name: '天'
      },
      {
          id: 1,
          name: '周'
      },
      {
          id: 2,
          name: '月'
      },
  ], //时间类型
   dateTypeIndex:0,
    levelData:[
      {id:0,name:"平台"},
      {id:1,name:"单店"},
      {id:2,name:"供应商"},
    ],
    levelIndex:'',
    levelJudge:false,
    spareform: {
      actName:'', //活动名称
      actType:'', //板块类型
      actPartInDateType:'', //日期选择类型
      actBegin:'', //开始日期
      actEnd:'', //结束日期
      dayChoose:[], //选择天
      weekChoose:[], //选择周
      monthChoose:[], //选择月
      actPartInCountType:0, //参与类型
      actPartInCount1:'',
      actPartInCount2:'',
      actPartInCount3:'',
      dateType:0, //时间单位
      actScopeLevel:'', //级别
      actOrgName:'', //所属组织

    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;


    

     let nowdayStyleArry=this.data.dayStyleArry;
     let nowmonthStyleArry=this.data.monthStyleArry;
     for(let i=0;i<31;i++){
      nowdayStyleArry[i]=false;
     }
     for(let i=0;i<31;i++){
      nowdayStyleArry[i]=false;
     }
     this.setData({
      id:options.id,
      dayStyleArry:nowdayStyleArry,
      monthStyleArry:nowmonthStyleArry,
     })
     that.getActList();
    that.initValidate();//验证规则函数
    
    that.getFillbackData();
  },


  //查看活动详情
  getFillbackData:function(){
    let that=this;
    wxrequest.selectActivityOne(that.data.id).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){

        let nowData=resdata.data;
        let nowspareform=that.data.spareform;
        let nowactTypeList=that.data.actTypeList;
        let nowactTypeIndex=that.data.actTypeIndex;
        let nowdateData=that.data.dateData;
        let nowdateIndex=that.data.dateIndex;
        let nowweekData=that.data.weekData;
        let nowdayStyleArry=that.data.dayStyleArry;
        let nowmonthStyleArry=that.data.monthStyleArry;
        let nowcishuData=that.data.cishuData;
        let nowcishuIndex=that.data.cishuIndex;
        let nowdateTypeIndex=that.data.dateTypeIndex;
        let nowlevelData=that.data.levelData;
        let nowlevelIndex=that.data.levelIndex;
        nowspareform.actName=nowData.actName;
        nowspareform.actType=nowData.actType;
        nowspareform.actBegin=nowData.actBegin.split(" ")[0];
        nowspareform.actEnd=nowData.actEnd.split(" ")[0];
        nowspareform.actPartInDateType=nowData.actPartInDateType;
        
        

        nowactTypeList.map((item,index)=>{
          if(item.id==nowData.actType){
            nowactTypeIndex=index
          }
        })

        nowdateData.map((item,index)=>{
          if(item.id==nowData.actPartInDateType){
            nowdateIndex=index
          }
        })
        
        

        

        if(nowData.actPartInDateType==1){
          nowspareform.weekChoose=JSON.parse(nowData.actPartInDate)
          nowspareform.dayChoose=[];
          nowspareform.monthChoose=[];

          for(let i=0;i<nowweekData.length;i++){
            for(let j=0;j<nowData.actPartInDate.length;j++){
              if(nowweekData[i].id==nowData.actPartInDate[j]){
                nowweekData[i].weekjd=true
              }
            }
          }

        }else if(nowData.actPartInDateType==2){
          nowspareform.weekChoose=[];
          nowspareform.dayChoose=[];
          nowspareform.monthChoose=JSON.parse(nowData.actPartInDate)
          for(let i=0;i<12;i++){
            for(let j=0;j<nowData.actPartInDate.length;j++){
              if(i+1==nowData.actPartInDate[j]){
                nowmonthStyleArry[i]=true
              }
            }
          }
        }else if(nowData.actPartInDateType==3){
          nowspareform.weekChoose=[];
          nowspareform.dayChoose=JSON.parse(nowData.actPartInDate)
          nowspareform.monthChoose=[];

          for(let i=0;i<31;i++){
            for(let j=0;j<nowData.actPartInDate.length;j++){
              if(i+1==nowData.actPartInDate[j]){
                nowdayStyleArry[i]=true
              }
            }
          }

        }
        let nowtimeList=that.data.timeList;
        if(nowData.actPartInTime){
          let sparetimeList=JSON.parse(nowData.actPartInTime);
          nowtimeList=sparetimeList.map(item=>{
            return {
              startTime:item.split('-')[0],
              endTime:item.split('-')[1],
            }
          })
        }
        
        
        
        
        

        nowspareform.actPartInCountType=nowData.actPartInCountType;
        nowcishuData.map((item,index)=>{
          if(item.id==nowData.actPartInCountType){
            nowcishuIndex=index
          }
        })

        if(nowspareform.actPartInCountType==1){
          nowspareform.actPartInCount1=nowData.actPartInCount;
          nowspareform.actPartInCount2="";
          nowspareform.actPartInCount3="";
        }else if(nowspareform.actPartInCountType==2){
          nowspareform.actPartInCount2=nowData.actPartInCount;
          nowspareform.actPartInCount1="";
          nowspareform.actPartInCount3="";
        }else if(nowspareform.actPartInCountType==3){
          nowspareform.actPartInCount3=nowData.actPartInCount;
          nowspareform.actPartInCount1="";
          nowspareform.actPartInCount2="";
        }else if(nowspareform.actPartInCountType==4){
          nowspareform.actPartInCount3=nowData.actPartInCount;
          nowspareform.actPartInCount1="";
          nowspareform.actPartInCount2="";
          nowdateTypeIndex=1
        }else if(nowspareform.actPartInCountType==5){
          nowspareform.actPartInCount3=nowData.actPartInCount;
          nowspareform.actPartInCount1="";
          nowspareform.actPartInCount2="";
          nowdateTypeIndex=2
        }
        
        nowspareform.actScopeLevel=nowData.actScopeLevel;
        
        nowlevelData.map((item,index)=>{
          if(item.id==nowData.actScopeLevel){
            nowlevelIndex=index
          }
        })

        nowspareform.actOrgName=nowData.actOrgName;

        that.setData({
          actTypeIndex:nowactTypeIndex,
          spareform:nowspareform,
          dateIndex:nowdateIndex,
          weekData:nowweekData,
          monthStyleArry:nowmonthStyleArry,
          dayStyleArry:nowdayStyleArry,
          timeList:nowtimeList,
          cishuIndex:nowcishuIndex,
          dateTypeIndex:nowdateTypeIndex,
          levelIndex:nowlevelIndex,
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


  //获取板块类型
  getActList:function(e){
    let that=this;
    wxrequest.basicDataItems({key:'ACTTYPE',orgId:0}).then(res=>{
       let resdata=res.data;
       if(resdata.code==0){
         let nowactTypeList=that.data.actTypeList;
         nowactTypeList=resdata.data.map(item=>{
           return {
            id: item.dictValue,
            name: item.dictName
           }
         })
         that.setData({
          actTypeList:nowactTypeList
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

  //选择活动类型
  bindPickerActType:function(e){
   let that=this;
   let index=e.detail.value;
   this.setData({
    actTypeIndex:index,
    'spareform.actType':that.data.actTypeList[index].id
   })
   let nowactType=that.data.spareform.actType;
   if(nowactType==1 || nowactType==2 || nowactType==4 || nowactType==6){
       that.setData({
         'spareform.actScopeLevel':1,
         levelIndex:1,
         levelJudge:true
       })
   }else if(nowactType==5){
     that.setData({
      'spareform.actScopeLevel':2,
      levelIndex:2,
      levelJudge:true
     })
   }else{
      that.setData({
        levelJudge:false
      })
   }
  },

  //日期选择类型
  bindPickerDate:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      dateIndex:index,
      'spareform.actPartInDateType':that.data.dateData[index].id
    })

  },

 //选择日期
 dayselect:function(e){
   let value=e.currentTarget.dataset.value;
   let index=e.currentTarget.dataset.index;
   let nowdayChoose=this.data.spareform.dayChoose;
   let boolIndex;
   let nowIndex="dayStyleArry["+index+"]"
   if (nowdayChoose.length > 0) {

      let flagIndex;
      let flag = nowdayChoose.some((item, valueIndex) => {
        if (item == value) {
          flagIndex = valueIndex
          return true;
         }
        })
       if (flag) {
        nowdayChoose.splice(flagIndex, 1)
        boolIndex=false
        } else {
          nowdayChoose.push(value)
          boolIndex=true
        }
      } else {
        nowdayChoose.push(value);
        boolIndex=true
      }
      this.setData({
        'spareform.dayChoose':nowdayChoose,
        [nowIndex]:boolIndex
      })
      

 },

 //选择周
 weekselect:function(e){
   let that=this;
   let index=e.currentTarget.dataset.index;
   let value=e.currentTarget.dataset.value;
   let nowweekChoose=this.data.spareform.weekChoose;
   let nowweekData=this.data.weekData;
   if (nowweekChoose.length > 0) {

    let flagIndex;
    let flag = nowweekChoose.some((item, valueIndex) => {
      if (item == nowweekData[index].id) {
        flagIndex = valueIndex
        return true;
       }
      })
     if (flag) {
      nowweekChoose.splice(flagIndex, 1)
      nowweekData[index].weekjd=false
      } else {
        nowweekChoose.push(value)
        nowweekData[index].weekjd=true
      }
    } else {
      nowweekChoose.push(value);
      nowweekData[index].weekjd=true
    }
    this.setData({
      'spareform.weekChoose':nowweekChoose,
      weekData:nowweekData
    })

 },

 //选择月
 monthselect:function(e){
  let value=e.currentTarget.dataset.value;
  let index=e.currentTarget.dataset.index;
  let nowmonthChoose=this.data.spareform.monthChoose;
  let boolIndex;
  let nowIndex="monthStyleArry["+index+"]"
  if (nowmonthChoose.length > 0) {

     let flagIndex;
     let flag = nowmonthChoose.some((item, valueIndex) => {
       if (item == value) {
         flagIndex = valueIndex
         return true;
        }
       })
      if (flag) {
       nowmonthChoose.splice(flagIndex, 1)
       boolIndex=false
       } else {
         nowmonthChoose.push(value)
         boolIndex=true
       }
     } else {
       nowmonthChoose.push(value);
       boolIndex=true
     }
     this.setData({
       'spareform.monthChoose':nowmonthChoose,
       [nowIndex]:boolIndex
     })
     
 },

 //添加时间
 addTime:function(){
   let nowtimeList=this.data.timeList;
   if(this.data.timeList.length===5){
      wx.showToast({
        title: "时间列表最多不超过5个！",
        icon:'none',
        duration:2000
      })
      return false;
    }
    nowtimeList.push({
      startTime:"",endTime:""
    })
    this.setData({
      timeList:nowtimeList
    })

 },

 //删除时间
 removeBox:function(e){
   let index=e.currentTarget.dataset.index;
   let nowtimeList=this.data.timeList;
   nowtimeList.splice(index,1)
   this.setData({
    timeList:nowtimeList
   })
 },

 //选择开始时间
 startTime:function(e){

   let value=e.detail.value;
   let index=e.currentTarget.dataset.index;
   let nowstartTime=`timeList[`+index+`].startTime`;
   this.setData({
     [nowstartTime]:value
   })
 },

  //选择结束时间
  endTime:function(e){

    let value=e.detail.value;
    let index=e.currentTarget.dataset.index;
    let nowendTime=`timeList[`+index+`].endTime`;
    this.setData({
      [nowendTime]:value
    })
  },

  //参与次数
  bindPickerCishu:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      cishuIndex:index,
      'spareform.actPartInCountType':that.data.cishuData[index].id
    })
  },

  //选择时间单位
  bindPickerDateType:function(e){
   let that=this;
   let index=e.detail.value;
   this.setData({
    dateTypeIndex:index,
    'spareform.dateType':that.data.dateTypeList[index].id
   })
  },

  //选择级别
  bindPickerLeve:function(e){
    let that=this;
    let index=e.detail.value;
    this.setData({
      levelIndex:index,
      'spareform.actScopeLevel':that.data.levelData[index].id
    })
  },





  //修改数据
  sureBtn:function(){
    let that=this;
    let hotelId=wx.getStorageSync('hotelId');
    let nowspareform=that.data.spareform;
    let linkData = {
      actName:nowspareform.actName,
      actType:nowspareform.actType,
      actBegin:nowspareform.actBegin +' 00:00:00',
      actEnd:nowspareform.actEnd +' 00:00:00',
      actPartInCountType:nowspareform.actPartInCountType,
      actPartInDateType:nowspareform.actPartInDateType,
      actScopeLevel:nowspareform.actScopeLevel,
      actHotelCreateBeans: [{hotelId:hotelId}]
    };
    if(nowspareform.actPartInCountType==1){
      linkData.actPartInCount=nowspareform.actPartInCount1
    }else if(nowspareform.actPartInCountType==2){
      linkData.actPartInCount=nowspareform.actPartInCount2
    }else if(nowspareform.actPartInCountType==3){
      linkData.actPartInCount=nowspareform.actPartInCount3
      if(nowspareform.dateType==1){
        linkData.actPartInCountType = 4
      }else if(nowspareform.dateType==2){
        linkData.actPartInCountType = 5
      }
    }

    if(this.data.timeList[0]){
      linkData.actPartInTime = this.data.timeList.map(item => {
          return `${item.startTime}-${item.endTime}`
      })
  }

    if(nowspareform.actPartInDateType==1){
      linkData.actPartInDate=nowspareform.weekChoose
    }else if(nowspareform.actPartInDateType==2){
      linkData.actPartInDate=nowspareform.monthChoose
    }else if(nowspareform.actPartInDateType==3){
      linkData.actPartInDate=nowspareform.dayChoose
    }



    wx.showLoading({
      title: '加载中',
    })
    wxrequest.changeActivityOne(linkData,that.data.id).then(res=>{
      wx.hideLoading()
      let resdata=res.data;
      if (resdata.code==0){
         wx.showToast({
           title: '操作成功',
           icon:'none',
           duration:2000
         })
         wx.redirectTo({
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
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })


  },


 

  //开始入住时间
  bindDateChange:function(e){
    this.setData({
      'spareform.actBegin':e.detail.value
    })
  },

  //结束入住时间
  bindDateChange2: function (e) {
    this.setData({
      'spareform.actEnd': e.detail.value
    })
  },



  initValidate() {//验证规则函数
    const that = this;
    const rules = {
      actName: {
        required: true
      },
      actType: {
        required: true
      },
      actBegin: {
        required: true
      },
      actEnd: {
        required: true
      },   
      actPartInCount1: {
        required:that.data.spareform.actPartInCountType==1?true:false
      },
      actPartInCount2: {
        required:that.data.spareform.actPartInCountType==2?true:false
      },
      actPartInCount3: {
        required:that.data.spareform.actPartInCountType==3?true:false
      },
      actScopeLevel: {
        required: true
      },
    }

    

    const messages = {
      actName: {
        required: '请输入活动名称'
      },
      actType: {
        required: '请选择活动类型'
      },
      actBegin: {
        required:'请选择活动开始日期',
      },
      actEnd: {
        required:'请选择活动结束日期',
      },
      
      actPartInCount1: {
        required:'请输入次数'
      },
      actPartInCount2: {
        required:'请输入次数'
      },
      actPartInCount3: {
        required:'请输入时间'
      },
      actScopeLevel: {
        required: '请选择级别',
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

    let nowtimeList=this.data.timeList;
    nowtimeList.forEach(item=>{
      if(item.startTime==''){
        this.showModal({
          msg:"请选择活动开始时间"
        });
        return false;
      }
      if(item.endTime==''){
        this.showModal({
          msg:"请选择活动结束时间"
        });
        return false;
      }
    })
    let nowspareform=this.data.spareform;
    let nowparams=Object.assign(nowspareform,params)

    this.setData({
      spareform:nowparams
    })


    this.sureBtn(this.data.form)

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