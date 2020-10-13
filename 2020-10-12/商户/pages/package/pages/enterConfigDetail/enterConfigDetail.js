// pages/package/pages/enterConfigDetail/enterConfigDetail.js
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
  getVirtualCabinet: function () {
    let that = this;
    wxrequest.selOneenterCabConf(that.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowconfigdata = that.data.configdata;
        let fillBackData = resdata.data;


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
        if (hotelId != 0) {
          fillBackData.cabEnterSettingFuncAreaDTOS2.forEach(item => {
            dealData.push({
              commonEnterDeviList: [],
              enterSettingId: '',
              flag: item.flag,
              funcAreaId: item.funcAreaId,
              funcAreaName: item.funcAreaName,
              id: '',
              shareEnterDeviList: [],
              sort: '',
            })
          })
        }


        nowconfigdata.areaList = dealData.map(item => {
          let nowfunTypeBakdata = that.data.funTypeBakdata;
          let nowfunTypeIndex;
          nowfunTypeBakdata.map((cellitem, cellindex) => {
            if (cellitem.id == item.flag) {
              nowfunTypeIndex = cellindex;
            }
          })


          let nowcommonEnterDeviList = item.commonEnterDeviList
          let newfunnterData = JSON.parse(nowfunnterData);
          for (let i = 0; i < newfunnterData.length; i++) {
            for (let j = 0; j < nowcommonEnterDeviList.length; j++) {
              if (newfunnterData[i].id == nowcommonEnterDeviList[j]) {
                newfunnterData[i].enterSet = true
                break;
              } else {
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
            commonEnterDeviList: nowcommonEnterDeviList ? nowcommonEnterDeviList : [],
            shareEnterDeviList: item.shareEnterDeviList ? item.shareEnterDeviList : [],
            funnterData: newfunnterData,
            funshareData: newfunshareData,
            homePage: 3,
            funTypedata: [
              { id: 0, name: "不支持" },
              { id: 1, name: "显示" },
              { id: 2, name: "显示+下单" },
            ],
            funTypeIndex: nowfunTypeIndex,
          }
        })

        let newdeviData = that.data.deviData
        for (let i = 0; i < newdeviData.length; i++) {
          for (let j = 0; j < fillBackData.commonEnterDeviList.length; j++) {
            if (newdeviData[i].id == fillBackData.commonEnterDeviList[j]) {
              newdeviData[i].enterSet = true
              break;
            } else {
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
        nowhomePageData.map((item, index) => {
          if (item.id == fillBackData.funcAreaId) {
            nowpageIndex = index;
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