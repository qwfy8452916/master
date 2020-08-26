// pages/cabinetlist/cabinetlist.js
const app = getApp()
let apiUrl = app.globalData.requestUrl;
let hotelid = app.globalData.hotelId;
let passid = app.globalData.passId;
let token = app.globalData.token


function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "删除",
    confirmColor: "#e32121",
    showCancel: true,
    cancelColor:"#ff9700",
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
function alerttishi(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    cancelColor: "#ff9700",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {},
    cabinetlistdata:[],  //柜子列表数据
    repairlistdata: [],  //报修列表数据
    replacelistdata: [],  //更换列表数据
    hotelfloor:null,   //酒店楼层
    housenumber:null,   //房间号
    cabinetid:null,   //柜子id
    cabinetindex:null,  //柜子索引
    pagesize:20,      //每页展示条数
    nowpage:1,        //默认当前页 
    repairpage:1,    //报修单页码
    replacepage: 1,    //更换柜子页码
    sizejudge:0, 
    sizejudge2: 0,
    sizejudge3: 0, 
    hotelid:null,   //酒店id  
    gaodu:600,    
    navarray:[true,false,false],
    // navtext: ["安装列表","报修单","更换柜子"],
    navtext:[{ id: 0, name: '安装列表', quanxian: 'F:MH_CAB_INSTALLLISTTAB' }, { id: 1, name: '报修单', quanxian: 'F:MH_MAL_REPAIRTAB' }, { id: 2, name: '更换柜子', quanxian: 'F:MH_MAL_REPLACETAB' }],
    navindex:0, //导航索引
    Tabindex:'',
    editCabcode:'', //编辑柜子二维码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that=this;

    let hotelId = wx.getStorageSync("hotelId")
    
    that.setData({
      authzData: app.globalData.pageAuthority
    })
    console.log(that.data.authzData)


    for (var i = 0; i < that.data.navtext.length;i++){
      if (!that.data.authzData['F:MH_CAB_INSTALLLISTTAB']){
        if (that.data.navtext[i].quanxian =='F:MH_CAB_INSTALLLISTTAB'){
          let nownavtext1 = that.data.navtext.splice(i, 1)
          that.setData({
            navtext: that.data.navtext
          })
        }
       }
      if (!that.data.authzData['F:MH_MAL_REPAIRTAB']) {
        if (that.data.navtext[i].quanxian == 'F:MH_MAL_REPAIRTAB') {
          let nownavtext2 = that.data.navtext.splice(i, 1)
          that.setData({
            navtext: that.data.navtext
          })
        }
      }
      if (!that.data.authzData['F:MH_MAL_REPLACETAB']) {
        if (that.data.navtext[i].quanxian == 'F:MH_MAL_REPLACETAB') {
          let nownavtext3 = that.data.navtext.splice(i, 1)
          that.setData({
            navtext: that.data.navtext
          })
        }
      }

    }


    //动态设置navindex
    if (that.data.navtext.length > 0) {
      that.setData({
        navindex: that.data.navtext[0].id,
      })
    }


    that.setData({
      hotelid: hotelId
    })
    that.getData(that.data.nowpage);
    that.getrepairdatalist(that.data.repairpage)
    that.getreplacedatalist(that.data.replacepage)


    
    // if (options.navindex==1){
    //   let index = options.navindex

    //   let nownavarray = [false, false,false];
    //   nownavarray[index] = true
    //   that.setData({
    //     navindex:1,
    //     navarray: nownavarray,
    //   })
    // }

    if (options.navindex) {
      let index = options.navindex

      let nownavarray = [false, false, false];
      nownavarray[index] = true
      that.setData({
        navindex: index,
        navarray: nownavarray,
      })
    }
    
    

    
    

    // let popup = this.selectComponent("#tabbar");
    // if (options.tabindex) {
    //   that.setData({
    //     Tabindex: options.tabindex
    //   })
    // } else {
    //   that.setData({
    //     Tabindex: 0
    //   })
    // }
    // popup.dabdata()
    // popup.tabzhixing(that.data.Tabindex)

  },

//获取安装列表

  getData:function(cabpage){
    let that=this;
    let tempDataSet=[];
    

    
    wx.request({
      url: apiUrl + 'cabinet',
      data: {
        hotelId: that.data.hotelid,
        pageSize: 20,
        pageNo: cabpage,
        orgAs:3,
        isWx:1
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode==401){
          app.overtime(res.statusCode)
          return false;
         }
        
        if (res.data.code == 0) {
          wx.showLoading({
            title: "加载中",
            duration: 500,
          })

          if (res.data.data.records.length < 20 && res.data.data.records.length > 0) {
            that.setData({
              sizejudge: 0
            })
          } else {
            that.setData({
              sizejudge: 1
            })
          }
          tempDataSet = that.data.cabinetlistdata.concat(res.data.data.records)
          that.setData({
            cabinetlistdata: tempDataSet
          })
        }else{
          alerttishi("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });

  },

  // 获取报修单列表
  
  getrepairdatalist: function (repairpage){
    let that=this;
    let tempDataSet = [];
    wx.request({
      url: apiUrl + 'mal',
      data: {
        pageSize: 20,
        pageNo:repairpage,
        // hOrgId: wx.getStorageSync("passid"),
        // horgId: "e06c6ee6",
        dealStatus:0,
        orgAs:3
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          wx.showLoading({
            title: "加载中",
            duration: 500,
          })

          if (res.data.data.records.length < 20 && res.data.data.records.length > 0) {
            that.setData({
              sizejudge2: 0
            })
          } else {
            that.setData({
              sizejudge2: 1
            })
          }
          tempDataSet = that.data.repairlistdata.concat(res.data.data.records)
          that.setData({
            repairlistdata: tempDataSet
          })
        }else{
          alerttishi("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });
  },

  // 获取更换柜子列表

  getreplacedatalist: function (replacepage) {
    let that = this;
    let tempDataSet = [];
    wx.request({
      url: apiUrl + 'cab/replace',
      data: {
        pageSize: 20,
        pageNo: replacepage,
        // hotelOrgId:passid,
        orgAs: 3
        
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          wx.showLoading({
            title: "加载中",
            duration: 500,
          })

          if (res.data.data.records.length < 20 && res.data.data.records.length > 0) {
            that.setData({
              sizejudge3: 0
            })
          } else {
            that.setData({
              sizejudge3: 1
            })
          }
          tempDataSet = that.data.replacelistdata.concat(res.data.data.records)
          that.setData({
            replacelistdata: tempDataSet
          })
        }else{
          alerttishi("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });
  },

 //更换柜子
  replacehuan:function(e){
    let cabinetstatus=e.currentTarget.dataset['replacestatus']
    let cabinetid = e.currentTarget.dataset.id
    // if (cabinetstatus==1){
    //   wx.showToast({
    //     title: '请先清空货物!',
    //     icon: 'none',
    //     duration: 1200
    //   });
    //   return false;
    // } else if (cabinetstatus==2){
      wx.scanCode({
        success(res) {
          if (!res.result) {
            alertViewWithCancel("提示", "扫描失败", function () {
            });
            return false
          }
          let str = res.result;
          let reg = RegExp(/(^http:\/\/cab)+[\d*]{0,4}/);
          if (!str.match(reg)) {
            wx.showToast({
              title: '不是柜子二维码',
              icon: 'none',
              duration: 1200
            })
            return false;
          }


          let nowsaomadata = str.match(/=(\S*)/)[1];
          let fictitious = nowsaomadata.substring(0, 2);
          wx.request({
            url: apiUrl + 'cabinet/cabCode',
            header: {
              'content-type': 'application/json',
              'Authorization': wx.getStorageSync("token")
            },
            method: "GET",
            dataType: 'json',
            data: {
              cabCode: nowsaomadata,
              cabId: cabinetid
            },
            success: function (res) {
              if (res.statusCode == 401) {
                app.overtime(res.statusCode)
                return false;
              }
              if (res.data.code == 0){

               if (res.data.data == 2) {
              alerttishi("提示","柜子已被使用", function () {
              });
            }
            if (res.data.data == 0) {
              wx.navigateTo({
                url: '../bindcabinetedit/bindcabinetedit?guizicode=' + nowsaomadata + '&guiziid=' + cabinetid + '&panudan=' + true + '&fictitious=' + fictitious
              })
            }
            if (res.data.data == 1){
              wx.navigateTo({
                url: '../bindcabinetedit/bindcabinetedit?guizicode=' + nowsaomadata + '&guiziid=' + cabinetid + '&panudan=' + false + '&fictitious=' + fictitious
                })
               }
              }else{
                alerttishi("提示", res.data.msg, function () {
                });
              }

            },
            fail: function () {
              console.log("error!!!!");
            }
          })

        },
        fail: function (err) {
          console.log(err);
        }
      })
    // }
  },

  checkdetail:function(e){
    wx.redirectTo({
       url: '../lookdetail/lookdetail?id=' + e.currentTarget.dataset.id,
     })
  },

  repairrecord:function(){
    wx.navigateTo({
      url: '../repairsuccess/repairsuccess',
    })
  },
  replacerecord: function () {
    wx.navigateTo({
      url: '../replacerecord/replacerecord',
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
    let that=this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          gaodu: res.windowHeight*2-340
        })
      }
    })
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
    let that=this;
    
    that.setData({
      cabinetlistdata: [],
      repairlistdata: [], 
      replacelistdata: [],
    })

    that.getData(1);
    that.getrepairdatalist(1)
    that.getreplacedatalist(1)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
  },

  downLoad:function(){
    let that = this;
    let page = that.data.nowpage;
    let page2=that.data.repairpage;
    let page3 = that.data.replacepage;
    
    if (that.data.sizejudge) {
      that.setData({
        nowpage: ++page,
      })
      that.getData(that.data.nowpage);
    }

    if (that.data.sizejudge2) {
      that.setData({
        repairpage: ++page2
      })
      that.getrepairdatalist(that.data.repairpage);
    }

    if (that.data.sizejudge3) {
      that.setData({
        replacepage: ++page3
      })
      that.getreplacedatalist(that.data.replacepage);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  showModalevent(e) {
    let that=this;
    let bindAreaFlag = e.currentTarget.dataset.bindareaflag;
    this.setData({
      bindAreaFlag: bindAreaFlag,
      modalName: e.currentTarget.dataset.target,
      hotelfloor: e.currentTarget.dataset.floor,
      housenumber: e.currentTarget.dataset.roomid,
      cabinetid: e.currentTarget.dataset.id,
      cabinetindex: e.currentTarget.dataset.index,
      editCabcode: e.currentTarget.dataset.cabcode
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  yinying:function(){
    this.setData({
      modalName: null
    })
  },
  showxian:function(e){

  },

  //删除柜子
  delevent:function(e){
    let that=this;

    alertViewWithCancel("是否删除", "酒店楼层" + that.data.hotelfloor + " / 房间号" + that.data.housenumber + "信息?", function () {
      wx.request({
        url: apiUrl + 'cabinet/' + that.data.cabinetid,
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("token")
        },
        method: "DELETE",
        success: function (res) {
          if (res.statusCode == 401) {
            app.overtime(res.statusCode)
            return false;
          }
          if (res.data.code == 0) {
            let nowcabinetlistdata = that.data.cabinetlistdata
            for (var i = 0; i < nowcabinetlistdata.length;i++){
              if (i == that.data.cabinetindex){
                nowcabinetlistdata.splice(that.data.cabinetindex,1)
               }
            }
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 1200
            });
            that.setData({
              cabinetlistdata: nowcabinetlistdata,
              modalName: null
            })
            
          }else{
            alerttishi("提示", res.data.msg, function () {
            });
          }
        },
        fail: function (error) {
          alerttishi("提示", error, function () {
          });
        }
      });

    });
  },

  //编辑柜子
  editevent:function(e){
   let that=this;
    let cabinetid=e.currentTarget.dataset.id

    wx.scanCode({
      success(res) {
        if (!res.result) {
          alertViewWithCancel("提示", "扫描失败", function () {
          });
          return false
        }
        let str = res.result;
        let reg = RegExp(/(^http:\/\/cab)+[\d*]{0,4}/);
        if (!str.match(reg)) {
          wx.showToast({
            title: '不是柜子二维码',
            icon: 'none',
            duration: 1200
          })
          return false;
        }

        let nowsaomadata = str.match(/=(\S*)/)[1];
        let fictitious = nowsaomadata.substring(0, 2);
        if (nowsaomadata !== that.data.editCabcode){
           wx.showToast({
             title: '不是当前柜子二维码',
             icon:'none',
             duration:2000
           })
           return false;
        }
        

        wx.request({
          url: apiUrl + 'cabinet/cabCode',
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("token")
          },
          method: "GET",
          dataType: 'json',
          data: {
            cabCode: nowsaomadata,
            cabId: cabinetid
          },
          success: function (res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode)
              return false;
            }
            if (res.data.code == 0){
            //  if (res.data.data == 2) {
            //   alerttishi("提示","柜子已被使用", function () {
            //   });
            //  }
              wx.navigateTo({
                url: '../bindcabinetedit/bindcabinetedit?guizicode=' + nowsaomadata + '&guiziid=' + cabinetid + '&fictitious=' + fictitious
              })
            }else{
              
                alerttishi("提示", res.data.msg, function () {
                });
            
            }

          },
          fail: function () {
            console.log("error!!!!");
          }
        })

      },
      fail: function (err) {
        console.log(err);
      }
    })
  },



  continueniu:function(){
    let that = this;

    wx.scanCode({
      success(res) {

        if (!res.result){
          alerttishi("提示", "扫描失败", function () {
          });
          return false
        }
        let str = res.result;
        // let reg = RegExp(/http:\/\/cab.kefangbao.com.cn/);
        let reg = RegExp(/(^http:\/\/cab)+[\d*]{0,4}/);
        if (!str.match(reg)) {
          wx.showToast({
            title: '不是柜子二维码',
            icon: 'none',
            duration: 1200
          })
          return false;
        }


        let nowsaomadata = str.match(/=(\S*)/)[1];
        let fictitious = nowsaomadata.substring(0, 2);      
        console.log(res.result)
        console.log(nowsaomadata)
        console.log(fictitious)
        
        wx.request({
          url: apiUrl + 'cabinet/cabCode',
          header: {
            'content-type': 'application/json',
            'Authorization': wx.getStorageSync("token")
          },
          method: "GET",
          dataType: 'json',
          data: {
            cabCode: nowsaomadata,
            cabId: ""
          },
          success: function (res) {
            if (res.statusCode == 401) {
              app.overtime(res.statusCode)
              return false;
             }
            if (res.data.code ==1) {
              alerttishi("提示", res.data.msg, function () {
              });
            }
            // if (res.data.data == 2) {
            //   alerttishi("提示", "柜子已被使用", function () {
            //   });
            // }
            if (res.data.data == 0 || res.data.data == 1) {
              wx.navigateTo({
                url: '../bindcabinet/bindcabinet?guizicode=' + nowsaomadata + '&fictitious=' + fictitious
              })
            }

          },
          fail: function () {
            console.log("error!!!!");
          }
        })

      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  //导航
  navevent:function(e){
    let that=this;
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let nownavarray = [false,false,false];
    nownavarray[index]=true
    that.setData({
      navarray: nownavarray,
      navindex: id
    })
  },
})