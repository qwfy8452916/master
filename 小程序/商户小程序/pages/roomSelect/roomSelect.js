// pages/roomSelect/roomSelect.js
const app = getApp();
import wxrequest from '../../utils/api'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    resourceList: [], //房源数据
    selectActive: [], //选择房源样式
    selectResource: [],  //选择房源数据
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getResourceList();

  },

  //确定
  surebtn: function () {

    wx.setStorageSync('selectResource', this.data.selectResource);
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      roomjudge: true,
      funjudge: false,
      typejudge: false,
      prodjudge: false,
      groupjudge: false,
      scenejudge: false,
      drawWaysjudge: false,
    })
    wx.navigateBack({
      delta: 1
    })

  },

  //选择房源
  roomitem: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowresourceList = that.data.resourceList;
    let nowselectResource = that.data.selectResource;
    let flagIndex;
    if (nowselectResource.length > 0) {
      
      let flag = nowselectResource.some((item, valueindex) => {
        if (item.id == nowresourceList[index].id) {
          flagIndex = valueindex
          return true
        }
      })
      if (flag) {
        nowselectResource.splice(flagIndex, 1)
      } else {
        nowselectResource.push(nowresourceList[index])
      }

      // if (JSON.stringify(nowselectResource).indexOf(JSON.stringify(nowresourceList[index])) == -1) {
      //   nowselectResource.push(nowresourceList[index])
      // } else {
      //   for (var i = 0; i < nowselectResource.length; i++) {
      //     if (nowselectResource[i].id == nowresourceList[index].id) {
      //       nowselectResource.splice(i, 1)
      //     }
      //   }
      // }
    } else {
      nowselectResource.push(nowresourceList[index])
    }
    let nowIndex = "selectActive[" + index + "]";
    that.setData({
      selectResource: nowselectResource,
      [nowIndex]: !that.data.selectActive[index],
    })


  },

  //房源列表
  getResourceList: function () {
    let that = this;
    let linkData = {
      resourceName: '',
      hotelId: wx.getStorageSync("hotelId")
    }
    wxrequest.getAppointResource(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowresourceList = resdata.data.map(item => {
          return {
            id: item.id,
            roomTypeName: item.roomTypeName,
            resourceName: item.resourceName,
            roomCount: item.roomCount,
            basicPrice: item.basicPrice,
          }
        })
        let nowselectActive = [];
        let nowselectResource = wx.getStorageSync('selectResource') ? wx.getStorageSync('selectResource') : [];
        if (nowselectResource && nowselectResource.length > 0) {

          for (let i = 0; i < nowresourceList.length; i++) {
            for (let j = 0; j < nowselectResource.length; j++) {
              if (nowresourceList[i].id == nowselectResource[j].id) {
                nowselectActive[i] = true
                break;
              } else {
                nowselectActive[i] = false
              }
            }
          }
        }

        this.setData({
          resourceList: nowresourceList,
          selectActive: nowselectActive,
          selectResource: nowselectResource
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