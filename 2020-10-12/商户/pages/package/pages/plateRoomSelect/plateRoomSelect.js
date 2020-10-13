// pages/package/pages/plateRoomSelect/plateRoomSelect.js
const app = getApp();
import wxrequest from '../../../../utils/api'
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
    this.setData({
      roomjudge:options.roomjudge,
      selectResource:JSON.parse(options.selectResource),
      roomsType:options.roomsType,
    })
    this.getResourceList();

  },

  //确定
  surebtn: function () {

    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      roomjudge: true,
      prodjudge: false,
      typejudge:false,
      selectResource:this.data.selectResource,
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
    let roomsType=that.data.roomsType;
    let roomActive;
    let flagIndex;
    if (nowselectResource.length > 0) {
      
      let flag = nowselectResource.some((item, valueindex) => {
        if (item.id == nowresourceList[index].id) {
          flagIndex = valueindex
          return true
        }
      })
      if (flag) {
        roomActive=false
        nowselectResource.splice(flagIndex, 1)
      } else {
        if(roomsType!=1){
          roomActive=true
          nowselectResource.push(nowresourceList[index])
        }
        
      }

    } else {
      roomActive=true
      nowselectResource.push(nowresourceList[index])
    }
    let nowIndex = "selectActive[" + index + "]";
    that.setData({
      selectResource: nowselectResource,
      [nowIndex]: roomActive,
    })


  },

  //房源列表
  getResourceList: function () {
    let that = this;
    let linkData = {
      resourceName: '',
      hotelId: wx.getStorageSync("hotelId"),
      orgAs: 3,
    }
    wxrequest.bookResourceList(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowresourceList = resdata.data.records.map(item => {
          return {
            id: item.id,
            roomTypeName: item.roomTypeName,
            resourceName: item.resourceName,
            roomCount: item.roomCount,
            basicPrice: item.basicPrice,
          }
        })
        let nowselectActive = [];
        let nowselectResource = that.data.selectResource;
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