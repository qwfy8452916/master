// pages/package/pages/enterConfigEdit/enterConfigEdit.js
const app = getApp();
const apiUrl = app.globalData.requestUrl;
import wxrequest from '../../../../utils/api'
import WxValidate from '../../../../utils/WxValidate'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    id: "", //功能区id

    cabTypeList: [],  //柜子类型数据
    cabTypeIndex: '',
    deviData: [], //进场数据
    shareData: [], //分享进场数据

    funnterData: [], //功能区进场数据
    homePageData: [], //首页数据
    pageData: [{
      areaName: "我的",
      id: '',
      homePage: 5
    }], //默认首页数据
    pageIndex: 0,

    funTypeBakdata: [
      { id: 0, name: "不支持" },
      { id: 1, name: "显示" },
      { id: 2, name: "显示+下单" },
    ],

    configdata: {
      cabTypeId: '', //柜子类型
      settingName: '', //进场配置名称
      commonEnterDeviList: [], //默认进场
      shareEnterDeviList: [], //分享进场
      availableFuncSupport: true,
      areaList: [], //功能区设置数据
      homePage: '', //默认首页
      homeId: '', //默认首页id
    },


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      id: options.id,
      authzData: wx.getStorageSync("pageAuthority"),
    })
    
   
    
    that.getDictData();

  },

  //查看进场配置
  getVirtualCabinet:function(){
    let that=this;
    wxrequest.selOneenterCabConf(that.data.id).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let nowconfigdata = that.data.configdata;
        let fillBackData=resdata.data;
        

        let nowfunnterData = JSON.stringify(that.data.funnterData);
        let nowfunshareData = JSON.stringify(that.data.funshareData);

        nowconfigdata.cabTypeId = fillBackData.cabTypeId;
        nowconfigdata.settingName = fillBackData.settingName;
        nowconfigdata.commonEnterDeviList = fillBackData.commonEnterDeviList;
        nowconfigdata.shareEnterDeviList = fillBackData.shareEnterDeviList;
        nowconfigdata.availableFuncSupport = fillBackData.availableFuncSupport;
        nowconfigdata.homePage = fillBackData.homePage;
        nowconfigdata.homeId = fillBackData.funcAreaId;
        
        let dealData = fillBackData.cabEnterSettingFuncAreaDTOS;
        let hotelId = wx.getStorageSync('hotelId');
        if (hotelId!=0){
          fillBackData.cabEnterSettingFuncAreaDTOS2.forEach(item=>{
            dealData.push({
              commonEnterDeviList:[],
              enterSettingId:'',
              flag: item.flag,
              funcAreaId: item.funcAreaId,
              funcAreaName: item.funcAreaName,
              id:'',
              shareEnterDeviList:[],
              sort:'',
            })
          })
        }
        
       
        nowconfigdata.areaList = dealData.map(item=>{
          let nowfunTypeBakdata = that.data.funTypeBakdata;
          let nowfunTypeIndex;
          nowfunTypeBakdata.map((cellitem,cellindex)=>{
            if (cellitem.id == item.flag){
             nowfunTypeIndex=cellindex;
            }
          })


          let nowcommonEnterDeviList = item.commonEnterDeviList
          let newfunnterData = JSON.parse(nowfunnterData);
          for (let i = 0; i < newfunnterData.length;i++){
            for (let j = 0; j < nowcommonEnterDeviList.length;j++){
              if (newfunnterData[i].id == nowcommonEnterDeviList[j]){
                newfunnterData[i].enterSet=true
                break;
               }else{
                newfunnterData[i].enterSet = false
               }
            }
          }
          

          let nowshareEnterDeviList = item.shareEnterDeviList
          let newfunshareData = JSON.parse(nowfunshareData);
          for (let i = 0; i < newfunshareData.length; i++) {
            for (let j = 0; j < nowshareEnterDeviList.length; j++) {
              if (newfunshareData[i].id == nowshareEnterDeviList[j]) {
                newfunshareData[i].enterSet = true
                break;
              } else {
                newfunshareData[i].enterSet = false
              }
            }
          }
          
          return {
            areaName: item.funcAreaName,
            id: item.funcAreaId,
            defaultValue: item.flag,
            sort: item.sort,
            commonEnterDeviList: nowcommonEnterDeviList ? nowcommonEnterDeviList:[],
            shareEnterDeviList: item.shareEnterDeviList ? item.shareEnterDeviList:[],
            funnterData: newfunnterData,
            funshareData: newfunshareData,
            homePage:3,
            funTypedata: [
              { id: 0, name: "不支持" },
              { id: 1, name: "显示" },
              { id: 2, name: "显示+下单" },
            ],
            funTypeIndex: nowfunTypeIndex,
          }
        })

        let newdeviData = that.data.deviData
        for (let i = 0; i < newdeviData.length;i++){
          for (let j = 0; j < fillBackData.commonEnterDeviList.length;j++){
            if (newdeviData[i].id == fillBackData.commonEnterDeviList[j]){
              newdeviData[i].enterSet=true
              break;
            }else{
              newdeviData[i].enterSet = false
            }
          }
        }

        let newshareData = that.data.shareData
        for (let i = 0; i < newshareData.length; i++) {
          for (let j = 0; j < fillBackData.shareEnterDeviList.length; j++) {
            if (newshareData[i].id == fillBackData.shareEnterDeviList[j]) {
              newshareData[i].enterSet = true
              break;
            } else {
              newshareData[i].enterSet = false
            }
          }
        }

        let nowBakhomePageData = dealData.map(item => {
          return {
            areaName: item.funcAreaName,
            id: item.funcAreaId,
            homePage: 3
          }
        })
        nowBakhomePageData = JSON.stringify(nowBakhomePageData)
        let nowhomePageData = JSON.parse(nowBakhomePageData)
        const mypage = {
          areaName: "我的",
          id: 0,
          homePage: 5
        }
        
        nowhomePageData.unshift(mypage)

        let bakhomePageData = JSON.parse(nowBakhomePageData);
        bakhomePageData.unshift(mypage)

        for (let i = 0; i < nowhomePageData.length; i++) {
          for (let j = 0; j < nowconfigdata.areaList.length; j++) {
            if (nowhomePageData[i].id == nowconfigdata.areaList[j].id) {

              if (nowconfigdata.areaList[j].defaultValue == 0) {

                nowhomePageData.splice(i, 1)
              }
            }
          }
        }
        
        let nowpageIndex = that.data.pageIndex;
        nowhomePageData.map((item,index)=>{
          if (item.id == fillBackData.funcAreaId){
            nowpageIndex=index;
          }
        })



        that.setData({
          configdata: nowconfigdata,
          deviData: newdeviData,
          shareData: newshareData,
          homePageData: bakhomePageData,
          pageData: nowhomePageData,
          pageIndex: nowpageIndex,
        })

        that.getCabTypeList(fillBackData.cabTypeId);

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


  //柜子类型列表
  getCabTypeList: function (id) {
    let that = this;
    let linkData = {
      pageNo: 1,
      pageSize: 50,
      cabTypeName: '',
    }
    wxrequest.cabinetType(linkData).then(res => {
      let resdata = res.data;
      let nowcabTypeList = that.data.cabTypeList;
      if (resdata.code == 0) {
        nowcabTypeList = resdata.data.records.map(item => {
          return {
            id: item.id,
            cabTypeName: item.cabTypeName
          }
        })
        let nowcabTypeIndex = that.data.cabTypeIndex;
        nowcabTypeList.map((item, index) => {
          if (item.id == id) {
            nowcabTypeIndex = index
          }
        })

        that.setData({
          cabTypeList: nowcabTypeList,
          cabTypeIndex: nowcabTypeIndex
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //选择柜子类型
  bindPickerpCabType: function (e) {
    let that = this;
    let index = e.detail.value;
    that.setData({
      'configdata.cabTypeId': that.data.cabTypeList[index].id,
      cabTypeIndex: index,
    })

  },

  //获取进场配置数据
  getDictData: function () {
    let that = this;
    let linkData = {
      key: 'DEVI',
      orgId: 0
    }
    wxrequest.basicDataItems(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowdeviData = that.data.deviData;
        nowdeviData = resdata.data.map(item => {
          return {
            id: item.dictValue,
            dictName: item.dictName,
            enterSet: false
          }
          return item;
        })
        nowdeviData = JSON.stringify(nowdeviData);
        that.setData({
          deviData: JSON.parse(nowdeviData),
          shareData: JSON.parse(nowdeviData),
          funnterData: JSON.parse(nowdeviData),
          funshareData: JSON.parse(nowdeviData)
        })

        that.getVirtualCabinet();

      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //选择支持默认开放功能区
  selectSwitch: function (e) {
    let that = this;
    let value = e.detail.value;
    let nowhomePageData = [{
      areaName: "我的",
      id: '',
      homePage: 5
    }];
    let nowareaList = that.data.configdata.areaList;
    if (value) {
      nowareaList.map(item => {
        item.defaultValue = 0;
        item.sort = "";
        item.commonEnterDeviList = [];
        item.shareEnterDeviList = [];
        item.funnterData = that.data.funnterData;
        item.funshareData = that.data.funshareData;
        item.funTypeIndex = 0;
        return item;
      })

    }
    this.setData({
      'configdata.availableFuncSupport': value,
      pageData: nowhomePageData,
      'configdata.areaList': nowareaList,
      'configdata.homePage': 5,
      pageIndex: 0
    })

  },


  //选择功能区支持类型
  bindPickerfunType: function (e) {
    let that = this;
    let faindex = e.currentTarget.dataset.index;
    let index = e.detail.value;
    let nowdefaultValue = "configdata.areaList[" + faindex + "].defaultValue"
    let nowfunTypeIndex = "configdata.areaList[" + faindex + "].funTypeIndex"
    this.setData({
      [nowfunTypeIndex]: index,
      [nowdefaultValue]: that.data.configdata.areaList[faindex].funTypedata[index].id
    })
    let newpageData = JSON.stringify(that.data.homePageData);
    let nowpageData = JSON.parse(newpageData);
    let nowareaList = that.data.configdata.areaList;

    for (let i = 0; i < nowpageData.length; i++) {
      for (let j = 0; j < nowareaList.length; j++) {
        if (nowpageData[i].id == nowareaList[j].id) {

          if (nowareaList[j].defaultValue == 0) {
            nowpageData.splice(i, 1)
          }
        }
      }
    }
    that.setData({
      pageData: nowpageData
    })
  },

  //进场配置名称
  settingName: function (e) {
    let value = e.detail.value;
    this.setData({
      'configdata.settingName': value
    })
  },

  //排序
  inputSort: function (e) {
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    let nowsort = "configdata.areaList[" + index + "].sort"
    this.setData({
      [nowsort]: value
    })
  },

  //选择默认首页
  bindPickerpHomePage: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      pageIndex: index,
      'configdata.homePage': that.data.pageData[index].homePage,
      'configdata.homeId': that.data.pageData[index].id
    })
  },



  //确定
  sureBtn: function () {
    let that = this;
    let nowconfigdata = this.data.configdata;

    if (nowconfigdata.cabTypeId == '') {
      wx.showToast({
        title: '请选择柜子类型',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (nowconfigdata.settingName == '') {
      wx.showToast({
        title: '请输入进场配置名称',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (nowconfigdata.commonEnterDeviList.length <= 0) {
      wx.showToast({
        title: '请选择至少一个默认进场配置',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    if (nowconfigdata.shareEnterDeviList.length <= 0) {
      wx.showToast({
        title: '请选择至少一个分享进场配置',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    nowconfigdata.areaList.map(item => {
      if (item.defaultValue == 2) {
        if (item.commonEnterDeviList.length <= 0) {
          wx.showToast({
            title: '请选择至少一个功能区默认进场配置',
            icon: 'none',
            duration: 2000
          })
          return false;
        }

        if (item.shareEnterDeviList.length <= 0) {
          wx.showToast({
            title: '请选择至少一个功能区分享进场配置',
            icon: 'none',
            duration: 2000
          })
          return false;
        }

        if (nowconfigdata.homePage == '') {
          wx.showToast({
            title: '请选择默认首页',
            icon: 'none',
            duration: 2000
          })
          return false;
        }

      }
    })


    let nowareaList = nowconfigdata.areaList.map(item => {
      return {
        flag: item.defaultValue,
        funcAreaId: item.id,
        sort: item.sort,
        shareEnterDeviList: item.shareEnterDeviList,
        commonEnterDeviList: item.commonEnterDeviList
      }
    });


    let linkData = {
      hotelId: wx.getStorageSync('hotelId'),
      shareEnterDeviList: nowconfigdata.shareEnterDeviList,
      commonEnterDeviList: nowconfigdata.commonEnterDeviList,
      settingName: nowconfigdata.settingName,
      cabTypeId: nowconfigdata.cabTypeId,
      homePage: nowconfigdata.homePage,
      availableFuncSupport: nowconfigdata.availableFuncSupport ? 1 : 0,
      cabEnterSettingFuncAreaDTOS: nowareaList
    }
    if (nowconfigdata.homePage != 5) {
      linkData.funcAreaId = nowconfigdata.homeId
    }

    wxrequest.changeenterCabConf(linkData,that.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '进场配置修改成功！',
          icon: 'none',
          duration: 2000
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })


  },







  //选择进场
  delive: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowdeviData = this.data.deviData;
    let nowcommonEnterDeviList = this.data.configdata.commonEnterDeviList;

    let flagIndex;

    if (nowcommonEnterDeviList.length > 0) {
      let flag = nowcommonEnterDeviList.some((item, valueIndex) => {
        if (item == nowdeviData[index].id) {
          flagIndex = valueIndex
          return true;
        }
      })
      if (flag) {
        nowcommonEnterDeviList.splice(flagIndex, 1)
        nowdeviData[index].enterSet = false
      } else {
        nowcommonEnterDeviList.push(nowdeviData[index].id)
        nowdeviData[index].enterSet = true
      }
    } else {
      nowcommonEnterDeviList.push(nowdeviData[index].id)
      nowdeviData[index].enterSet = true
    }



    that.setData({
      'configdata.commonEnterDeviList': nowcommonEnterDeviList,
      deviData: nowdeviData,
    })

  },

  //选择分享进场
  shareEnter: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowshareData = this.data.shareData;
    let nowshareEnterDeviList = this.data.configdata.shareEnterDeviList;

    let flagIndex;

    if (nowshareEnterDeviList.length > 0) {
      let flag = nowshareEnterDeviList.some((item, valueIndex) => {
        if (item == nowshareData[index].id) {
          flagIndex = valueIndex
          return true;
        }
      })
      if (flag) {
        nowshareEnterDeviList.splice(flagIndex, 1)
        nowshareData[index].enterSet = false
      } else {
        nowshareEnterDeviList.push(nowshareData[index].id)
        nowshareData[index].enterSet = true
      }
    } else {
      nowshareEnterDeviList.push(nowshareData[index].id)
      nowshareData[index].enterSet = true
    }



    that.setData({
      'configdata.shareEnterDeviList': nowshareEnterDeviList,
      shareData: nowshareData,
    })

  },


  //选择功能区默认进场
  funEenter: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let fuindex = e.currentTarget.dataset.fuindex;
    let nowareaList = that.data.configdata.areaList;
    let nowfunnterData = nowareaList[fuindex].funnterData;
    let nowcommonEnterDeviList = nowareaList[fuindex].commonEnterDeviList;

    let flagIndex;

    if (nowcommonEnterDeviList.length > 0) {
      let flag = nowcommonEnterDeviList.some((item, valueIndex) => {
        if (item == nowfunnterData[index].id) {
          flagIndex = valueIndex
          return true;
        }
      })
      if (flag) {
        nowcommonEnterDeviList.splice(flagIndex, 1)
        nowfunnterData[index].enterSet = false
      } else {
        nowcommonEnterDeviList.push(nowfunnterData[index].id)
        nowfunnterData[index].enterSet = true
      }
    } else {
      nowcommonEnterDeviList.push(nowfunnterData[index].id)
      nowfunnterData[index].enterSet = true
    }


    let newcommonEnterDeviList = "configdata.areaList[" + fuindex + "].commonEnterDeviList";
    let enterSet = "configdata.areaList[" + fuindex + "].funnterData[" + index + "].enterSet";
    that.setData({
      [newcommonEnterDeviList]: nowcommonEnterDeviList,
      [enterSet]: nowfunnterData[index].enterSet,
    })

  },

  //选择功能区分享进场
  funshare: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let fuindex = e.currentTarget.dataset.fuindex;
    let nowfunshareData = this.data.configdata.areaList[fuindex].funshareData;
    let nowshareEnterDeviList = this.data.configdata.areaList[fuindex].shareEnterDeviList;

    let flagIndex;

    if (nowshareEnterDeviList.length > 0) {
      let flag = nowshareEnterDeviList.some((item, valueIndex) => {
        if (item == nowfunshareData[index].id) {
          flagIndex = valueIndex
          return true;
        }
      })
      if (flag) {
        nowshareEnterDeviList.splice(flagIndex, 1)
        nowfunshareData[index].enterSet = false
      } else {
        nowshareEnterDeviList.push(nowfunshareData[index].id)
        nowfunshareData[index].enterSet = true
      }
    } else {
      nowshareEnterDeviList.push(nowfunshareData[index].id)
      nowfunshareData[index].enterSet = true
    }


    let newshareEnterDeviList = "configdata.areaList[" + fuindex + "].shareEnterDeviList";
    let newfunshareData = "configdata.areaList[" + fuindex + "].funshareData[" + index + "].enterSet";
    that.setData({
      [newshareEnterDeviList]: nowshareEnterDeviList,
      [newfunshareData]: nowfunshareData[index].enterSet,
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