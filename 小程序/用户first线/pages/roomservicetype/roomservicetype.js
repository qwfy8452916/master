  const app = getApp()
Page({
  data: {
    themecolor: '',//主题颜色
    rmsvcHotelId: '',
    roomservicetype: [],//商品服务数据
    shoppingbox: [],//购物车数据
    // shoplength: '',
    isNewUser: '',//新老用户
    btntype: true
  },
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isNewUser',
      success(res) {
        that.setData({
          isNewUser: res.data
        })
      },
      fail: function () {
        that.setData({
          isNewUser: true
        })
      }
    });
    that.setData({
      rmsvcHotelId: options.rmsvcHotelId,
    });
    that.getservicelist(options.rmsvcHotelId,0);
  },
  next: function (e) {//下一级
    let that = this;
    let id = e.currentTarget.dataset.id;//获取自定义属性
    that.getservicelist(that.data.rmsvcHotelId, id);
  },
  shoppingcart: function () {
    wx.navigateTo({
      url: '../shoppingcart/shoppingcart'
    })
  },
  placeorder :function(){
    let that = this;
    if (that.data.shoppingbox.length == 0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择您需要的服务'
      });
      return;
    }else{
      wx.redirectTo({
        url: '../submission/submission'
      })
    }
  },
  getservicelist: function (rmsvcHotelId, parentId) {//获取（下一级）数据
    let that = this;
    wx.request({
      url: app.data.requestUrl + 'rmsvc/hotelDetail/routine',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      data: {
        rmsvcHotelId: rmsvcHotelId,
        parentId : parentId
      },
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == '0') {
          that.setData({
            roomservicetype: resdatas
          });
        };
      }
    });
  },
  changeshopbox_reduce: function (event){//减少
    this.setData({
      btntype: false
    });
    let item = event.currentTarget.dataset['service'];
    // let shop_length = this.data.shoplength;
    if (item.amount>0){
      item.amount = item.amount-1;
      this.changeroomservicetype(item);
      this.changeshoppingbox(item);
      // shop_length -= 1;
      // this.setData({
      //   shoplength: shop_length
      // });
      this.setStorageData();//更新缓存
    }else{
      this.setData({
        btntype: true
      });
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
  changeroomservicetype: function (item){//修改数组数据
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
      for (let i in shopping_box) {//购物车数据
        if (shopping_box[i].id == item.id) {
          if (item.amount == 0){//如果数量为0，从购物车中删除
            shopping_box.splice(i, 1);
            this.setData({
              shoppingbox: shopping_box
            });
            return;
          }else{
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
  setStorageData: function (){
    let that = this;
    console.log(this.data.shoppingbox);
    wx.setStorage({
      key: 'roomservicelist',
      data: this.data.shoppingbox
    });
    // wx.setStorage({
    //   key: 'roomservicelistlength',
    //   data: this.data.shoplength
    // });
    setTimeout(function(){
      that.setData({
        btntype: true
      });
    },500)
  }
})