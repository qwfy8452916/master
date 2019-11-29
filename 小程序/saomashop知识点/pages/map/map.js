Page({
  data: {
    Height: 0,
    scale: 13,
    latitude: "",
    longitude: "",
    markers: [],
    controls: [{
      id: 1,
      iconPath: '../images/jia.png',
      position: {
        left: 300,
        top: 100,
        width: 60,
        height: 60
      },
      clickable: true
    }, {
      id: 2,
      iconPath: '../images/jian.png',
      position: {
        left: 300,
        top: 160,
        width: 60,
        height: 60
      },
      clickable: true
    }],
    circles: []
  },

  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })

    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        console.log(res)
        _this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: "1",
            latitude: res.latitude,
            longitude: res.longitude,
            width: 50,
            height: 50,
            iconPath: "../images/my.png",
            title: "我的当前位置",
            label: {
              content: '龙运大厦',
              color: '#f0f'
            },
          }],
          content: '气泡名称',
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 3000,
            strokeWidth: 1
          }]
        })

        // wx.openLocation({
        //   latitude: res.latitude,
        //   longitude: res.longitude,
        //   name: "苏州市政府",
        //   // address: res.data.address,
        //   scale: 15
        // })

      },
      fail: function (error) {
        console.log(error);
        wx.getSetting({
          success: function (res) {
            var statu = res.authSetting;
            if (!statu['scope.userLocation']) {
              wx.showModal({
                title: '是否授权当前位置',
                content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                success: function (tip) {
                  if (tip.confirm) {
                    wx.openSetting({
                      success: function (data) {
                        if (data.authSetting["scope.userLocation"] === true) {
                          wx.showToast({
                            title: '授权成功',
                            icon: 'success',
                            duration: 1000
                          })
                          //授权成功之后，再调用chooseLocation选择地方
                          // wx.chooseLocation({
                          //   success: function (res) {
                          //     obj.setData({
                          //       addr: res.address
                          //     })
                          //   },
                          // })
                        } else {
                          wx.showToast({
                            title: '授权失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      }
                    })
                  }
                }
              })
            }
          },
          fail: function (res) {
            wx.showToast({
              title: '调用授权窗口失败',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    console.log(e.markerId)
    wx.showActionSheet({
      itemList: ["A"],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      that.setData({
        scale: --this.data.scale
      })
    } else {
      that.setData({
        scale: ++this.data.scale
      })
    }
  },

  getLocationdz: function () {
    var _this = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        var name = res.name
        var address = res.address
        var latitude = res.latitude
        var longitude = res.longitude
        _this.setData({
          name: name,
          address: address,
          latitude: latitude,
          longitude: longitude
        })
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name:name,
          scale: 15
        })

      }
    })
  },

  gotohere: function (res) {
    console.log(res);
    let lat = ''; // 获取点击的markers经纬度
    let lon = ''; // 获取点击的markers经纬度
    let name = ''; // 获取点击的markers名称
    let markerId = res.markerId;// 获取点击的markers  id
    let markers = res.currentTarget.dataset.markers;// 获取markers列表

    for (let item of markers) {
      if (item.id === markerId) {
        lat = item.latitude;
        lon = item.longitude;
        name = item.callout.content;
        wx.openLocation({ // 打开微信内置地图，实现导航功能（在内置地图里面打开地图软件）
          latitude: lat,
          longitude: lon,
          name: name,
          success: function (res) {
            console.log(res);
          },
          fail: function (res) {
            console.log(res);
          }
        })
        break;
      }
    }
  },

  daohang:function(e){
    let weid = parseInt(e.currentTarget.dataset.wd);
    let jind = parseInt(e.currentTarget.dataset.jd);
    let name = e.currentTarget.dataset.name;
    console.log(weid)
     wx.openLocation({
       latitude: 31.3141910000,
       longitude: 120.5697310000,
       scale: 18,
       name: name,
       address: '金平区长平路93号'
        })

  }


})
