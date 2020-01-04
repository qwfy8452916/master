// pages/divideintodetail/divideintodetail.js
const app = getApp()
let apiUrl = app.getApiUrl();
let token = app.globalData.token

function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    confirmText: "确定",
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // hoteldata: [{ name: '思思酒店', id: '001' }, { name: '万豪酒店', id: '002' }, { name: '香格里拉酒店', id: '003' }],
    hoteldata: [], //酒店数据
    identitydata: [{ hotelAsName: '平台', hotelAs: '1' }, { hotelAsName: '运营商', hotelAs: '2' }, { hotelAsName: '酒店', hotelAs: '3' }, { hotelAsName: '入驻商', hotelAs: '4' }, { hotelAsName: '供应商', hotelAs: '5' }, { hotelAsName: '城市运营商', hotelAs: '6' }, { hotelAsName: '合伙人', hotelAs: '7' }, { hotelAsName: '加盟商', hotelAs: '8' }],
    categorydata: [{ name: '货柜分成', id: '1' }, { name: '商城分成', id: '2' }],
    date: '',//默认起始时间  
    date2: '',//默认结束时间 
    twotime:'',  //限制到期时间
    hotelId:'',  //酒店id
    identityId:'',  //身份
    typeId:'',      //类别id
    dividedata:'',  //分成数据
    gaodu:600,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.setData({
      oprId: options.oprId,
      orgId: options.orgId
    })
    console.log(options.orgAs)
    that.gethotel();
    that.getDividebtn();

  },

  bindPickerChange: function (e) {
    let that=this;
    let index1 = e.detail.value
    let nowhotelId = that.data.hoteldata[index1].hotelId;
    this.setData({
      index1: e.detail.value,
      hotelId: that.data.hoteldata[index1].hotelId,
    })
    that.getidentitydata(nowhotelId);
    that.getDividebtn();
  },

  bindPickerChange2: function (e) {
    let that=this;
    let index2 = e.detail.value;
    this.setData({
      index2: e.detail.value,
      identityId: that.data.identitydata[index2].hotelAs,
    })
    
    that.getDividebtn();
  },
  // //类别
  // bindPickerChange3: function (e) {
  //   let that = this;
  //   let index3 = e.detail.value;
  //   this.setData({
  //     index3: e.detail.value,
  //     typeId: that.data.categorydata[index3].id,
  //   })
  //   that.getDividebtn();
  // },

  // 时间段选择  
  bindDateChange(e) {
    let that = this;
    let startdate = e.detail.value
    this.limitdate(startdate,this.data.date2,'01');
    that.setData({
      date: e.detail.value,
    })
    that.getDividebtn();
  },

  bindDateChange2(e) {
    let that = this;
    let enddate = e.detail.value;
    this.limitdate(this.data.date,enddate,'02');
    that.setData({
      date2: e.detail.value,
    })
    
    that.getDividebtn();
  },

  limitdate: function (startdate, enddate,dateid){
    let that=this;
    let start = new Date(startdate).getTime();
    let endtinme = new Date(enddate).getTime();
    let difference = endtinme - start
    console.log(this.addmulMonth(startdate, 2))
    let twodatetime = new Date(this.data.twotime).getTime() - start + 1000 * 3600 * 24;
    console.log(twodatetime)
    console.log(difference)
    if (difference > twodatetime) {
      alertViewWithCancel("提示", '时间范围为两个月！', function () {
        if (dateid=='01'){
          that.setData({
            date:''
          })
        }
        if (dateid == '02') {
          that.setData({
            date2: ''
          })
        }
        that.getDividebtn();
      });
    }
  },

  addmulMonth: function (dtstr, n){

    var s = dtstr.split("-");
    var yy = parseInt(s[0]);
    var mm = parseInt(s[1]);
    var dd = parseInt(s[2]);
    var dt = new Date(yy, mm, dd);

    var num = dt.getMonth() + parseInt(n);
    if (num / 12 > 1) {
      yy += Math.floor(num / 12);
      mm = num % 12;
    } else {
      mm += parseInt(n);
    }
    this.data.twotime = yy + "-" + mm + "-" + dd;
    return yy + "-" + mm + "-" + dd;

  },

  //获取分成明细
  getDividebtn: function () {
    let that = this;
    wx.request({
      url: apiUrl + '/fin/income',
      data: {
        // accountStatus:0,
        orgAs: that.data.identityId,
        hotelId: that.data.hotelId,
        // oprId: that.data.oprId,
        orgId: that.data.orgId,
        // revenueKind: that.data.typeId,
        startDate: that.data.date,
        endDate: that.data.date2
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token"),
      },
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          // console.log(res.data.data.records)
          that.setData({
            dividedata: res.data.data.records
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

  //获取酒店
  gethotel:function(e){
    let that=this;
    wx.request({
      // url: apiUrl + '/hotel/all',
      url: apiUrl + '/ally/hotel/manage',
      data: {
        allyId: wx.getStorageSync("allyId"),
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token"),
      },
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          console.log(res.data.data)
          that.setData({
            hoteldata: res.data.data
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


  //获取身份
  getidentitydata: function (hotelId) {
    let that = this;
    wx.request({
      // url: apiUrl + '/hotel/all',
      url: apiUrl + '/ally/hotel/manage/as',
      data: {
        allyId: wx.getStorageSync("allyId"),
        hotelId: hotelId
      },
      method: "GET",
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync("Token"),
      },
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        if (res.data.code == 0) {
          console.log(res.data.data)
          that.setData({
            identitydata: res.data.data
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


  //导出
  export: function () {
    let that = this;

    wx.downloadFile({
      url: apiUrl + '/fin/export/download?orgAs=3',
      data:{},
      method:"GET",
      success: function (res) {
        if (res.statusCode == 401) {
          app.overtime(res.statusCode)
          return false;
        }
        const filePath = res.tempFilePath
        // const filePath ='http://example.com/somefile.pdf';
        wx.openDocument({
          filePath: filePath,
          fileType: 'xls',
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      }
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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowHeight)
        //设置map高度，根据当前设备宽高满屏显示
        that.setData({
          gaodu: res.windowHeight * 2 - 420
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