// pages/package/pages/activeDetail/activeDetail.js
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
        
        
      console.log(11)
        

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