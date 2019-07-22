const app = getApp()
Page({
  data: {
    themecolor: '',//主题颜色
    roomservicetype: [],//商品服务数据
    shoppingbox: [],//购物车数据
    // shoplength: '',
    btntype: true
  },
  onLoad(){
    let that =this;
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
    //   success: function (res) {
    //     that.setData({
    //       shoplength: res.data
    //     })
    //   }
    // });
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        })
      }
    });
  },
  //清空购物车
  empty: function(){
    let shoppingbox_empty = [];
    let shoppingbox_length = 0;
    this.setData({
      roomservicetype: shoppingbox_empty
    });
    wx.setStorage({
      key: 'roomservicelist',
      data: shoppingbox_empty
    });
    // wx.setStorage({
    //   key: 'roomservicelistlength',
    //   data: shoppingbox_length
    // })
  },
  //提交
  submission: function () {
    let service_length = this.data.roomservicetype.length;
    if (service_length == 0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '您没有选择任何服务，请前去选择您需要的服务',
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../roomservice/roomservice'
            })
          }
        }
      })
    }else{
      wx.navigateTo({
        url: '../submission/submission'
      })
    }
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
        if (item.amount == 0) {
          room_servicetype.splice(i, 1);
          this.setData({
            roomservicetype: room_servicetype
          });
          return;
        }else{
          room_servicetype[i].amount = item.amount;
          this.setData({
            roomservicetype: room_servicetype
          });
          return;
        }
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
  }
})