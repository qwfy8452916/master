const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    themecolor: '',//主题颜色
    index: 0,
    array: ['15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00'],
    datevalue: '今日',
    datetime: '',
    timetype: '',
    roomservicetype: [],//商品服务数据
    shoppingbox: [],//购物车数据
    startdate: '',
    enddate: '',
    username: '',
    usertel: '',
    userroom: '',
    userremark: '',
    usernamefocus: false,
    usertelfocus: false,
    userroomfocus: false,
    remarkfocus: false,
    hotelId: '',
    userid: '',
    // shoplength: '',
    btntype: true
  },
  onLoad: function (options) {
    let that = this;
    let start_date = utils.formatDate(new Date());
    let end_date = utils.formatDateend(new Date());
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
    that.setData({
      datetime: start_date,
      startdate: start_date,
      enddate: end_date
    });
    wx.getStorage({
      key: 'roomservicelist',
      success(res) {
        that.setData({
          roomservicetype: res.data,
          shoppingbox: res.data
        });
      }
    });
    // wx.getStorage({
    //   key: 'roomservicelistlength',
    //   success(res) {
    //     that.setData({
    //       shoplength: res.data
    //     });
    //   }
    // });
    wx.getStorage({
      key: 'hotelId',
      success(res) {
        that.setData({
          hotelId: res.data
        });
      }
    });
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
        });
      }
    });
  },
  username: function(e){
    this.setData({
      username: e.detail.value
    })
  },
  usertel: function (e) {
    this.setData({
      usertel: e.detail.value
    })
  },
  userroom: function (e) {
    this.setData({
      userroom: e.detail.value
    })
  },
  userremark: function (e) {
    this.setData({
      userremark: e.detail.value
    })
  },
  bindDateChange: function (e) {
    this.setData({
      datevalue: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value,
      datetime: this.data.array[e.detail.value]
    })
  },
  radioChange: function(e){
    this.setData({
      index: e.detail.value,
      timetype: e.detail.value
    })
  },
  submission: function(){
    let that = this;
    let user_name = that.data.username.replace(/\s+/g, '');
    let user_tel = that.data.usertel;
    let user_room = that.data.userroom;
    let user_remark = that.data.userremark;
    let time_type = that.data.timetype;
    let psot_service = [];
    let roomservice_type = that.data.roomservicetype;
    let arrivedAt= '';

    if (roomservice_type == 0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择您需要的服务',
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../roomservice/roomservice'
            })
          }
        }
      });
      return;
    }
    for (let i in roomservice_type){
      psot_service[i]= { rmsvcHotelDetailId: roomservice_type[i].id, amount: roomservice_type[i].amount}
    }
    if (user_name == ''){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您的姓名'
      });
      return;
    }
    if (user_tel == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您的联系电话'
      });
      return;
    } else if (!/^1(3|4|5|7|8)\d{9}$/.test(user_tel)){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您正确的联系电话'
      });
      return;
    }
    if (user_room == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您的房间号'
      });
      return;
    }
    if (time_type == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择送达时间'
      });
      return;
    } else if (time_type == 0){
        arrivedAt = '立即';
    } else if (time_type == 1){
        arrivedAt = that.data.datetime + ' ' + that.data.array[that.data.index]
    }
    if (user_remark.length > 250){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '备注内容过多，请精简到250字以内'
      });
      return;
    }
    wx.request({
      url: app.data.requestUrl + 'rmsvc/records', 
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        arrivedAt: arrivedAt,
        customerName: that.data.username,
        mobile: that.data.usertel,
        roomCode: that.data.userroom,
        remark: that.data.userremark,
        dtos: psot_service,
        hotelId: that.data.hotelId,
        customerId: that.data.userid
      },
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        let empty = [];
        let emptylength = 0;
        if (resdata.code == '0') {
          wx.setStorage({
            key: 'roomservicelist',
            data: empty
          });
          // wx.setStorage({
          //   key: 'roomservicelistlength',
          //   data: emptylength
          // });
          wx.reLaunch({
            url: '../roomservicesuccess/roomservicesuccess?serviceid=' + resdatas
          })
        };
      }
    });
  },
  changeshopbox_reduce: function (event) {//减少
      this.setData({
        btntype: false
      });
      let item = event.currentTarget.dataset['service'];
      // let shop_length = this.data.shoplength;
      if (item.amount > 0) {
        item.amount = item.amount - 1;
        this.changeroomservicetype(item);
        this.changeshoppingbox(item);
        // shop_length -= 1;
        // this.setData({
        //   shoplength: shop_length
        // });
        this.setStorageData();//更新缓存
      }
  },
  changeshopbox_add: function (event) {//增加
      this.setData({
        btntype: false
      });
      let item = event.currentTarget.dataset['service'];
      // let shop_length = this.data.shoplength;
      item.amount = item.amount + 1;
      this.changeroomservicetype(item);
      this.changeshoppingbox(item);
      // shop_length += 1;
      // this.setData({
      //   shoplength: shop_length
      // });
      this.setStorageData();//更新缓存
  },
  changeroomservicetype: function (item) {//修改数组数据
    let room_servicetype = this.data.roomservicetype;
    for (let i in room_servicetype) {//商品服务数据
      if (room_servicetype[i].id == item.id) {
        room_servicetype[i].amount = item.amount;
        this.setData({
          roomservicetype: room_servicetype
        });
        return;
      }
    };
  },
  changeshoppingbox: function (item) {//更新购物车数据
    let shopping_box = this.data.shoppingbox;
    if (shopping_box.length > 0) {
      let lengthtype = false;
      for (let i in shopping_box) {//购物车数据
        if (shopping_box[i].id == item.id) {
          if (item.amount == 0) {//如果数量为0，从购物车中删除
            shopping_box.splice(i, 1);
            this.setData({
              shoppingbox: shopping_box
            });
            return;
          } else {
            shopping_box[i].amount = item.amount;
            this.setData({
              shoppingbox: shopping_box
            });
            return;
          }
        }
      }
      shopping_box.push(item);
    } else {
      shopping_box.push(item);
    }
    this.setData({
      shoppingbox: shopping_box
    });
  },
  setStorageData: function () {
    let that = this;
    wx.setStorage({
      key: 'roomservicelist',
      data: this.data.shoppingbox
    });
    // wx.setStorage({
    //   key: 'roomservicelistlength',
    //   data: this.data.shoplength
    // });
    setTimeout(function () {
      that.setData({
        btntype: true
      });
    }, 500)
    that.setData({
      roomservicetype : this.data.shoppingbox
    })
  },
  subcancel: function(){
    let that = this;
    let roomservice_list = [];
    let roomservicelist_length = 0;
    wx.setStorage({
      key: 'roomservicelist',
      data: roomservice_list
    });
    // wx.setStorage({
    //   key: 'roomservicelistlength',
    //   data: roomservicelist_length
    // });
    wx.redirectTo({
      url: '../roomservice/roomservice'
    })
  }
})