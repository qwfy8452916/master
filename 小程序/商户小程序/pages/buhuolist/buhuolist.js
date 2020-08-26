// pages/buhuolist/buhuolist.js

const app = getApp()
let apiUrl = app.globalData.requestUrl;
let hotelid = app.globalData.hotelId
let token = app.globalData.token
function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    confirmColor: "#ff9700",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      } else if (res) {}
    }
  });
}

function alerttishi(title = "", content = "消息提示", confirm1, confirm2) {
  wx.showModal({
    title: title,
    content: content,
    cancelText: "否",
    confirmText: "是",
    confirmColor: "#ff9700",
    cancelColor: "#ff9700",
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        confirm1()
      } else if (res.cancel) {
        confirm2()
      }
    }
  });
}
function alerttishi2(title = "", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    cancelText: "去关门",
    confirmText: "报修锁具",
    confirmColor: "#ff9700",
    cancelColor: "#ff9700",
    showCancel: true,
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
    latticedatalist:[],  //格子列表数据
    copylatticedatalist: [],//补货完成用来判断格子是否关闭
    completejudge:false,  //补货完成判断
    cabCode: '1535',  //扫码信息
    geziswitch: false,  //开关默认关闭
    flag:true,
    geziarray: [false, false, false, false, false, false, false, false, false],
    buhuojudge:"",  //判断补货是否完成
    latticeid:"" ,  //格子id
    cabId:"",   //柜子id
    getcabType:'',  //柜子类型前两位判断
    dianjipanduan:true,  //补货完成禁止点击
    niujudge:true,   //补货按钮显示
    niuhidden:false,  //是否显示操作按钮
    latticeCodeList:[],  //需要打开的格子集合
    noopenlattice:"",   //返回没打开格子状态
    pageLayout: [], //柜子布局数据

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let that = this;
    
    console.log(options)
    that.setData({
      cabCode: options.guizicode,
    })
    console.log(that.data.cabCode)
    that.getcabtype(options.getcabType)
    // that.getrealupdate();
    
  },
  
   //获取柜子类型
   getcabtype: function (strtype) {
    let that = this;
    wx.request({
      url: apiUrl + 'basic/cabType',
      data: {
        cabType: strtype,
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
          that.setData({
            getcabType: res.data.data.cabType,
            pageLayout: res.data.data.pageLayout
          })
          that.getrealupdate();

        } else {
          alerttishi("提示", res.data.message, function () {
          });
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });
  },

//根据cabCode实时获取格子状态
  getrealupdate:function(){
    let that=this;
    wx.showLoading({
      title:"响应中"
    });
    wx.request({
      url: apiUrl + 'cabinet/status/cabCode',
      data:{
        cabCode: that.data.cabCode
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          that.getlatticedatalist();

        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
            wx.redirectTo({
              url: '../housematterlist/housematterlist',
            })
          });
        }
      },
      fail: function (error) {
        wx.hideLoading();
        alertViewWithCancel("提示", error, function () {
        });
      }
    });
  },



//获取格子列表数据

  getlatticedatalist(){
    let that=this;
    wx.showLoading({
      title:"响应中"
    });
    wx.request({
      url: apiUrl + 'repl/cab/' + that.data.cabCode,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "GET",
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          let nowlatticedatalist = res.data.data;
          let nowpageLayout = JSON.parse(that.data.pageLayout);

          for (var i = 0; i < nowlatticedatalist.length; i++) {
            for (var j = 0; j < nowpageLayout.length; j++) {
              if (nowlatticedatalist[i].latticeCode == nowpageLayout[j].latticeCode) {
                nowlatticedatalist[i] = Object.assign(nowpageLayout[j], nowlatticedatalist[i])
              }
            }
          }
          console.log(nowlatticedatalist)

          that.setData({
            latticedatalist: nowlatticedatalist,
            cabId: res.data.data[0].cabId
          })
          console.log(res.data.data)
          that.niustatus(that.data.latticedatalist)
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
            wx.reLaunch({
              url: '../housematterlist/housematterlist',
            })
          });
        }
      },
      fail: function (error) {
        wx.hideLoading();
        alertViewWithCancel("提示", error, function () {
        });
      }
    });
  },




  //传递柜子id更新柜子信息

  updatecabinet() {
    let that = this;
    wx.showLoading({
      title: "响应中"
    });
    wx.request({
      url: apiUrl + 'repl/cab/cab/' + that.data.cabId,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "PUT",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        wx.hideLoading()
        if (res.data.code == 0) {
          wx.reLaunch({
            url: '../housematterlist/housematterlist',
          })
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    });
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
    let that = this;

  },

  //更新按钮状态

  niustatus:function(data){
    let that = this;
    let nowlatticedatalist = data;
    let arr = new Array();
    let niuarr = new Array();

    for (var i = 0; i < nowlatticedatalist.length; i++) {
      
      if (nowlatticedatalist[i].isOpen == 1 && (nowlatticedatalist[i].opFlag == 1 || nowlatticedatalist[i].opFlag == 2 || nowlatticedatalist[i].opFlag == 3)) {
        arr.push(nowlatticedatalist[i].latticeCode)
      }
      
      //判断没有需要补换货的隐藏下面按钮
      if (nowlatticedatalist[i].opFlag == 1 || nowlatticedatalist[i].opFlag == 2 || nowlatticedatalist[i].opFlag == 3) {
        niuarr.push(nowlatticedatalist[i].latticeCode)
      }

    }

    if (arr.length > 0) {
      that.setData({
        niujudge: false
      })
    } 
    else {
      that.setData({
        niujudge: true,
      })
    }

    if (niuarr.length > 0) {
      that.setData({
        niuhidden: true,
      })
    } else {
      that.setData({
        niuhidden: false,
      })
    }
    that.repairgezi()

  },

  //判断故障格子

  repairgezi:function(){
    let that=this;
    let nowlatticedatalist = that.data.latticedatalist;
    let nownoopenlattice = [];
    console.log(that.data.niujudge)
    for (var i = 0; i < nowlatticedatalist.length; i++) {
      if (that.data.niujudge == false && nowlatticedatalist[i].isOpen == 0 && (nowlatticedatalist[i].opFlag == 1 || nowlatticedatalist[i].opFlag == 2 || nowlatticedatalist[i].opFlag == 3)){
        nownoopenlattice.push(nowlatticedatalist[i].latticeCode)
       }
    }
    that.setData({
      noopenlattice: nownoopenlattice
    })
    console.log(that.data.noopenlattice)

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

  },
  //执行开关
  switchzhixing: function (e) {
    
    let that = this;
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let code = e.currentTarget.dataset.code;
    let cabid = e.currentTarget.dataset.cabid;
    let prodid = e.currentTarget.dataset.prodid;
    let prodname = e.currentTarget.dataset.prodname;
    let isopen = e.currentTarget.dataset.isopen;
    let opflag = e.currentTarget.dataset.huan;

    
    if (isopen == 1 && (opflag == 1 || opflag == 2 || opflag == 3)){
      console.log(index)
      that.addrecord(id, cabid, code, prodid, prodname, index, opflag)
    }
    console.log(that.data.geziarray)

    that.setData({
      latticeid: e.currentTarget.dataset.id
    })
    
  },


  //更新格子数据
  getlatticedata:function(id,index){
    let that=this;
    wx.request({
      url: apiUrl + 'cabinet/lattice/' + id,
      data:{
        isEmpty:0,
        isNeedReplace:0
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "PUT",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          console.log(index)
          // let nowlatticedatalist = that.data.latticedatalist;
          // nowlatticedatalist[index].isEmpty=0
          // that.setData({
          //   latticedatalist: nowlatticedatalist
          // })
          console.log("格子信息更新成功")
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

  //新增格子补货记录
  addrecord: function (id, cabid, code, prodid, prodname, index, opflag){
    let that=this;
    wx.showLoading({
      title: "响应中"
    });
    wx.request({
      url: apiUrl + 'repl/v2',
      // url: apiUrl + '/repl',
      data:{
        cabId: cabid,   //柜子id
        hotelId: wx.getStorageSync("hotelId"),  //酒店id
        latticeCode: code,  //格子编号
        latticeId: id,    //格子id
        prodId: prodid,    //商品id
        prodName: prodname,  //商品名称
        replState: opflag, //货状态
        roomCode: "",   //房间号
        roomFloor: "",  //楼层
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading()
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        console.log(res.data.code)
        if(res.data.code == 0) {
          if(res.data.data == true){
            let nowgeziarray = that.data.geziarray;
            nowgeziarray[index] = true
            that.setData({
              geziarray: nowgeziarray
            })
          }else if(res.data.data == false){
            alerttishi2("提示", "格子门还没有关", function () {
              that.repairniu(11, code);  //判断门没关参数11
            });
          }

            

          // that.getlatticedata(id, index);

        } else if (res.statusCode == 404){
          alertViewWithCancel("提示", res.data.message, function () {
          });
        }else{
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },


  //新增柜子补货记录
  cabaddrecord: function () {
    let that = this;
    wx.request({
      url: apiUrl + 'repl',
      data: {
        cabId: that.data.cabId,   //柜子id
        hotelId: hotelid,  //酒店id
        // latticeCode: code,  //格子编号
        // latticeId: id,    //格子id
        // prodId: prodid,    //商品id
        // prodName: prodname,  //商品名称
        replState: 2, //货状态
        roomCode: "",   //房间号
        roomFloor: "",  //楼层
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "POST",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        console.log(res.data.code)
        if (res.data.code == 0) {
          wx.showToast({
            title: '操作成功',
            icon: 'none',
            duration: 1200
          });
           that.setData({
             dianjipanduan:false
           })
          wx.navigateTo({
            url: '../housematterlist/housematterlist',
          })
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },

//开始补货
bounceniu:function(){
  let that=this;
  let nowlatticedatalist = that.data.latticedatalist;
  let arr=new Array();
  for (var i = 0; i < that.data.latticedatalist.length;i++){
    if (nowlatticedatalist[i].isOpen == 0 && (nowlatticedatalist[i].opFlag == 1 || nowlatticedatalist[i].opFlag == 2 || nowlatticedatalist[i].opFlag == 3)){
      arr.push(nowlatticedatalist[i].latticeCode)
    }   
  }
  that.setData({
    latticeCodeList: arr
  })
  
  
  console.log(arr)
  that.openlattice(arr)
},

//一键弹开
  openlattice: function (arr){
    let that = this;
    wx.showLoading({
      title: "响应中"
    });
    wx.request({
      url: apiUrl + 'cabinet/lattice/open',
      data: {
        cabId: that.data.cabId,   //柜子id
        latticeCodeList: arr,
        cabQrcode:that.data.cabCode,
      },
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("token")
      },
      method: "PUT",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        wx.hideLoading()
        if (res.data.code == 0) {
          let backlatticedata = res.data.data.cabLatticeDTOS;
          let nownoopenlattice = [];
          console.log(res.data.data.cabLatticeDTOS)
          for (var i = 0; i < backlatticedata.length;i++){
            if (backlatticedata[i].isOpen==0){
              nownoopenlattice.push(backlatticedata[i].latticeCode)
             }
          }
          that.setData({
            niujudge:false,
            noopenlattice: nownoopenlattice
          })
          console.log(that.data.noopenlattice)
          that.getlatticedatalist();
        } else {
          alertViewWithCancel("提示", res.data.msg, function () {
          });
        }
      },
      fail: function (error) {
        wx.hideLoading()
        alertViewWithCancel("提示", error, function () {
        });
      }
    })
  },


  //报修锁柜
  repairniu:function(doorjudge,code){
    let that = this;
    //补货门故障报修
    if(doorjudge==11){
      let nownoopenlattice = [];
      nownoopenlattice.push(code)
      that.setData({
        noopenlattice: nownoopenlattice
      })
    }
    
    //补货门故障报修
    if (that.data.noopenlattice.length>0){
      wx.request({
        url: apiUrl + 'mal',
        data: {
          cabId: that.data.cabId,   //柜子id
          latticeCodes: that.data.noopenlattice,
          malType: 3,
        },
        header: {
          'content-type': 'application/json',
          'Authorization': wx.getStorageSync("token")
        },
        method: "POST",
        success: function (res) {
          if (res.statusCode == 401) {
            app.overtime(res.statusCode)
            return false;
          }
          if (res.data.code == 0) {
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 1200
            });
          } else {
            alertViewWithCancel("提示", res.data.msg, function () {
            });
          }
        },
        fail: function (error) {
          alertViewWithCancel("提示", error, function () {
          });
        }
      })
    }else{
      alertViewWithCancel("提示",'门正常打开没有故障报修', function () {
      });
    }
    
  },



  //补货完成
  completeniu:function(res){
    let that = this;
    that.updatecabinet();

    console.log(that.data.noopenlattice)

  },

})