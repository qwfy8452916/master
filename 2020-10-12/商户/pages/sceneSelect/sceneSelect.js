// pages/sceneSelect/sceneSelect.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    sceneList: [], //场景数据
    selectActive: [], //选择场景样式
    selectScene: [],  //选择场景数据
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getsceneList();

  },

  //确定
  surebtn: function () {

    wx.setStorageSync('selectScene', this.data.selectScene);
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      scenejudge: true,
      funjudge: false,
      typejudge: false,
      prodjudge: false,
      groupjudge: false,
      roomjudge: false,
      drawWaysjudge: false,
    })
    wx.navigateBack({
      delta: 1
    })

  },

  //选择场景
  sceneitem: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowsceneList = that.data.sceneList;
    let nowselectScene = that.data.selectScene;
    let flagIndex;
    if (nowselectScene.length > 0) {

      let flag = nowselectScene.some((item, valueindex) => {
        if (item.dictValue == nowsceneList[index].dictValue) {
          flagIndex = valueindex
          return true
        }
      })
      if (flag) {
        nowselectScene.splice(flagIndex, 1)
      } else {
        nowselectScene.push(nowsceneList[index])
      }

      // if (JSON.stringify(nowselectScene).indexOf(JSON.stringify(nowsceneList[index])) == -1) {
      //   nowselectScene.push(nowsceneList[index])
      // } else {
      //   for (var i = 0; i < nowselectScene.length; i++) {
      //     if (nowselectScene[i].id == nowsceneList[index].id) {
      //       nowselectScene.splice(i, 1)
      //     }
      //   }
      // }
    } else {
      nowselectScene.push(nowsceneList[index])
    }
    let nowIndex = "selectActive[" + index + "]";
    that.setData({
      selectScene: nowselectScene,
      [nowIndex]: !that.data.selectActive[index],
    })


  },

  //场景列表
  getsceneList: function () {
    let that = this;
    let linkData = {
      key: 'COUPON_SCENE',
      orgId: '0'
    }
    wxrequest.basicDataItems(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowsceneList = resdata.data.map(item => {
          return {
            dictName: item.dictName,
            dictValue: item.dictValue,
            id: item.dictValue
          }
        })
        let nowselectActive = [];
        let nowselectScene = wx.getStorageSync('selectScene') ? wx.getStorageSync('selectScene') : [];
        console.log(nowselectScene)
        if (nowselectScene && nowselectScene.length > 0) {


          for (let i = 0; i < nowsceneList.length; i++) {
            for (let j = 0; j < nowselectScene.length; j++) {
              if (nowsceneList[i].dictValue == nowselectScene[j].dictValue) {
                nowselectActive[i] = true
                break;
              } else {
                nowselectActive[i] = false
              }
            }
          }
        }

        this.setData({
          sceneList: nowsceneList,
          selectActive: nowselectActive,
          selectScene: nowselectScene
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

})