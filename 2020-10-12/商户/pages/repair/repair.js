// pages/repair/repair.js
const app = getApp()
let apiUrl = app.globalData.requestUrl;
let hotelid = app.globalData.hotelId;
let passid = app.globalData.passId;
let token = app.globalData.token
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
    partsdata: "",
    reasondata: "",
    remarkdata:"",
    replacedata:[{id:true,replacename:"建议更换柜子"}],
    repairresult:2,   //维修结果
    faultparts:"",   //故障部件
    faultreason:"",  //故障原因
    repairid:"",   //报修id
    replace:true,   //是否更换
    replacejudge:true,  //更换显示
    replaceselect:"checkbox",  //更换选中

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let that=this;
    that.setData({
      repairid: options.id
    })
    that.getdata();
  },

  //获取故障信息

  getdata:function(){
    let that=this;
    wx.request({
      url: apiUrl + 'mal/getMalPartOrReason',
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
          console.log(res.data.data)
          that.setData({
            faultdata: res.data.data,
            partsdata:res.data.data.malPart,
            reasondata: res.data.data.malReason
          })
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });

  },

  remarkevent:function(e){
    this.setData({
      remarkdata: e.detail.value
    })
  },

  radioChange:function(e){
    let that=this;
    
    if (e.detail.value==1){
        that.setData({
          replacejudge:false,
          replace:false,
          replaceselect:""
        })
    } else if (e.detail.value == 2){
      that.setData({
        replacejudge: true,
        replaceselect:"checkbox",
        replace:true
      })
    }
   this.setData({
     repairresult: e.detail.value
   })
    console.log(that.data.replace)
  },


  checkboxbujian: function (e) {
    console.log(e.detail.value)
    var items = this.data.partsdata, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break
        }
      }
    }
    let faultparts = values.join(",")

    this.setData({
      partsdata: items,
      faultparts: faultparts
    })
  },

  checkboxreason: function (e) {

    var items = this.data.reasondata, values = e.detail.value;
    for (var i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value == values[j]) {
          items[i].checked = true;
          break
        }
      }
    }
    let faultreason=values.join(",")
    this.setData({
      reasondata: items,
      faultreason: faultreason
    })
  },

  replaceevent:function(e){
    console.log(e.detail.value[0])
    let nowreplace = e.detail.value[0]
    if (nowreplace=='true'){
      this.setData({
        replace: nowreplace
      })
    }else{
      this.setData({
        replace: false
      })
    }
  },

  updatatj: function () {  
    let that=this;
    console.log(that.data.repairresult)
    console.log(that.data.faultparts)
    console.log(that.data.faultreason)
    console.log(that.data.remarkdata)
    if (that.data.repairresult==""){
      alerttishi("提示", "请选择维修结果", function () {
      });
      return false
    }
    wx.request({
      url: apiUrl + 'mal/' + that.data.repairid,
      data:{
        dealStatus: that.data.repairresult,
        malPart: that.data.faultparts,
        malReason: that.data.faultreason,
        remark: that.data.remarkdata,
        isReplaceCab: that.data.replace,
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
          wx.redirectTo({
            url: '../cabinetlist/cabinetlist?navindex=' + 1,
          })
        } else if (res.data.code == 1){
          alerttishi("提示", res.data.msg, function () {
            wx.redirectTo({
              url: '../cabinetlist/cabinetlist?navindex=' + 2,
            })
          });
        }
      },
      fail: function (error) {
        alerttishi("提示", error, function () {
        });
      }
    });
  },

  cancelfanhui: function () {
    wx.redirectTo({
      url: '../lookdetail/lookdetail?id=' + this.data.repairid,
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