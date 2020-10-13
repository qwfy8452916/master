// pages/selectDrawWays/selectDrawWays.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    drawWaysList: [], //渠道数据
    selectActive: [], //选择场景样式
    selectDrawWays: [],  //选择渠道数据
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getdrawWaysList();

  },

  //确定
  surebtn: function () {

    wx.setStorageSync('selectDrawWays', this.data.selectDrawWays);
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      drawWaysjudge: true,
      funjudge: false,
      typejudge: false,
      prodjudge: false,
      groupjudge: false,
      roomjudge: false,
      scenejudge: false,
    })
    wx.navigateBack({
      delta: 1
    })

  },

  //选择渠道
  drawWaysitem: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowdrawWaysList = that.data.drawWaysList;
    let nowselectDrawWays = that.data.selectDrawWays;
    let flagIndex;
    if (nowselectDrawWays.length > 0) {
      
      let flag = nowselectDrawWays.some((item, valueindex) => {
        if (item.dictValue == nowdrawWaysList[index].dictValue) {
          flagIndex = valueindex;
          return true
        }
      })
      if (flag) {
        nowselectDrawWays.splice(flagIndex, 1)
      } else {
        nowselectDrawWays.push(nowdrawWaysList[index])
      }


      // if (JSON.stringify(nowselectDrawWays).indexOf(JSON.stringify(nowdrawWaysList[index])) == -1) {
      //   nowselectDrawWays.push(nowdrawWaysList[index])
      // } else {
      //   for (var i = 0; i < nowselectDrawWays.length; i++) {
      //     if (nowselectDrawWays[i].id == nowdrawWaysList[index].id) {
      //       nowselectDrawWays.splice(i, 1)
      //     }
      //   }
      // }
    } else {
      nowselectDrawWays.push(nowdrawWaysList[index])
    }
    let nowIndex = "selectActive[" + index + "]";
    that.setData({
      selectDrawWays: nowselectDrawWays,
      [nowIndex]: !that.data.selectActive[index],
    })


  },

  //渠道列表
  getdrawWaysList: function () {
    let that = this;
    let linkData = {
      key: 'DRAW_WAY',
      orgId: '0'
    }
    wxrequest.basicDataItems(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowdrawWaysList = resdata.data.map(item => {
          return {
            dictName: item.dictName,
            dictValue: item.dictValue,
            id: item.dictValue
          }
        })
        let nowselectActive = [];
        let nowselectDrawWays = wx.getStorageSync('selectDrawWays') ? wx.getStorageSync('selectDrawWays') : [];
        if (nowselectDrawWays && nowselectDrawWays.length > 0) {


          for (let i = 0; i < nowdrawWaysList.length; i++) {
            for (let j = 0; j < nowselectDrawWays.length; j++) {
              if (nowdrawWaysList[i].dictValue == nowselectDrawWays[j].dictValue) {
                nowselectActive[i] = true
                break;
              } else {
                nowselectActive[i] = false
              }
            }
          }
        }

        this.setData({
          drawWaysList: nowdrawWaysList,
          selectActive: nowselectActive,
          selectDrawWays: nowselectDrawWays
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