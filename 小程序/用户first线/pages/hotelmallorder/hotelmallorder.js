const app = getApp()
Page({
  data: {
    isvirtual: '',//是否是虚拟柜 false: 虚拟柜，true: 不是虚拟柜
    deliverylist1: [],//客房配送
    total1: [],//客房配送合计
    totalnum1: '',//客房配送商品总数量
    deliverytype1: '',//是否显示客房配送
    deliverylist2: [],//快递到家
    total2: [],//客房配送合计
    totalnum2: '',//快递到家商品总数量
    deliverytype2: '',//是否显示快递到家
    alllength: '',//结算商品种类总数
    roomFloor: '',//楼层
    roomCode: '',//房间号
    hotelName: '',//酒店名称
    receipttype: '',//收货信息是否需要填写
    receiptlist: '',//收货信息
    lumpsum: '0.00',//商品总额

    usernamekf: '',//客房配送联系人
    userphone: '',//客房配送联系电话
    remark1: '',//客房配送留言
    remark2: '',//快递到家留言

    hotelId: '',
    customerId: '',

    paytype: true,//支付按钮状态

    catlist1: '',//购物车数据-客房配送
    catlist2: ''//购物车数据-快递到家

  },
  onLoad: function (options) {
    const that = this;

    that.setData({
      lumpsum: options.lumpsum
    })

    wx.getStorage({
      key: 'isvirtual',
      success: function (res) {
        that.setData({
          isvirtual: res.data
        })
      },
    })

    let total1 = 0.00;
    let total2 = 0.00;
    let totalnum1 = 0;
    let totalnum2 = 0;

    let deliverytype1 = false;
    let deliverytype2 = false;
    wx.getStorage({
      key: 'orderlist1',
      success: function(res) {
        const resdata = res.data;
        const length = resdata.length;
        if (length > 0){
          for (let i = 0; i < res.data.length; i++) {
            total1 += parseFloat(resdata[i].totalprice);
            totalnum1 += parseInt(resdata[i].num);
          }
          deliverytype1 = true;
        }else{
          total1 = 0.00;
          totalnum1 = 0;
          deliverytype1 = false;
        }
        that.setData({
          deliverylist1: resdata,
          total1: total1.toFixed(2),
          totalnum1: totalnum1,
          deliverytype1: deliverytype1
        })
      }
    });

    wx.getStorage({
      key: 'deliverylist1',
      success: function (res) {
        that.setData({
          catlist1: res.data
        })
      }
    });
    wx.getStorage({
      key: 'deliverylist2',
      success: function (res) {
        that.setData({
          catlist2: res.data
        })
      }
    });


    wx.getStorage({
      key: 'orderlist2',
      success: function (res) {
        const resdata = res.data;
        const length = resdata.length;
        if (length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            total2 += parseFloat(resdata[i].totalprice);
            totalnum2 += parseInt(resdata[i].num);
          }
          deliverytype2 = true;
        } else {
          total2 = 0.00;
          totalnum2 = 0;
          deliverytype2 = false;
        }
        that.setData({
          deliverylist2: resdata,
          total2: total2.toFixed(2),
          totalnum2: totalnum2,
          deliverytype2: deliverytype2
        })
      }
    });

    wx.getStorage({
      key: 'roomCode',
      success: function (res) {
        that.setData({
          roomCode: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomFloor',
      success: function (res) {
        that.setData({
          roomFloor: res.data
        })
      }
    });
    wx.getStorage({
      key: 'hotelName',
      success: function (res) {
        that.setData({
          hotelName: res.data
        })
      }
    });
    wx.getStorage({
      key: 'hotelId',
      success: function (res) {
        that.setData({
          hotelId: res.data
        })
      }
    });
    wx.getStorage({
      key: 'userid',
      success: function (res) {
        that.setData({
          customerId: res.data
        })
      }
    });
  },
  onShow: function () {
    const that = this;
    wx.getStorage({
      key: 'addressid',
      success: function (res) {//获取选中地址
        wx.request({
          url: app.data.requestUrl + 'order/address/' + res.data,
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': wx.getStorageSync("token")
          },
          method: "get",
          success(res) {
            const resdata = res.data;
            const resdatas = res.data.data;
            let receipttype = that.data.receipttype;
            if (resdata.code == 0) {
              that.setData({
                receiptlist: resdatas,
                receipttype: false
              })
            }
          }
        })
      },
      fail: function (res) {//获取默认地址
        wx.getStorage({
          key: 'userid',
          success: function (res) {
            wx.request({
              url: app.data.requestUrl + 'order/address/default',
              header: {
                'content-type': 'application/json', // 默认值
                'Authorization': wx.getStorageSync("token")
              },
              method: "get",
              data: {
                customerId: res.data
              },
              success(res) {
                const resdata = res.data;
                const resdatas = res.data.data;
                let receipttype = that.data.receipttype;
                if (resdata.code == 0) {
                  that.setData({
                    receiptlist: resdatas,
                    receipttype: false
                  })
                }
              }
            })
          }
        });
      }
    });
  },
  onUnload: function () {
    const orderlist1 = [];//订单-客房配送
    const orderlist2 = [];//订单-快递到家
    wx.setStorage({
      key: 'orderlist1',
      data: orderlist1
    });
    wx.setStorage({
      key: 'orderlist2',
      data: orderlist2
    });
    // this.changestorage()
  },
  addressfun: function () {//地址
    wx.navigateTo({
      url: '../hotelmalladdress/hotelmalladdress'
    })
  },
  bindTextAreaBlur: function(e){//备注信息
    const that = this;
    const type = e.currentTarget.dataset.type;
    if (type == 1){
      that.setData({
        remark1: e.detail.value
      })
    }else{
      that.setData({
        remark2: e.detail.value
      })
    }
  },
  usernamefun: function (e) {//联系人
    this.setData({
      usernamekf: e.detail.value
    })
  },
  telfun: function (e) {//联系人
    this.setData({
      userphone: e.detail.value
    })
  },
  settlementfun: function(){//提交订单
    const that = this;
    const thatdata = that.data;
    const usernamekf = thatdata.usernamekf;//客房配送联系人
    const userphone = thatdata.userphone;//客房配送联系电话

    if (usernamekf == ''){
      wx.showToast({
        title: '请填写联系人',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (userphone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (!/^1(3|4|5|7|8)\d{9}$/.test(userphone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    
    wx.showToast({
      title: '支付中,请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    })
    that.setData({
      paytype: false
    })

    let prodCount = parseInt(thatdata.totalnum1) + parseInt(thatdata.totalnum2);
    const deliverylist1 = thatdata.deliverylist1;
    const deliverylist2 = thatdata.deliverylist2;
    let orderProd1 = [];
    let orderProd2 = [];

    if (deliverylist1.length > 0){
      for (let i = 0; i < deliverylist1.length; i++){
        orderProd1[i] = { 
          hotelProdId: deliverylist1[i].hotelProdId,
          deliveryWay: 1,
          prodCount: deliverylist1[i].num,
          totalAmount: deliverylist1[i].prodRetailPrice
        }
      }
    }
    if (deliverylist2.length > 0) {
      for (let i = 0; i < deliverylist2.length; i++) {
        orderProd2[i] = {
          hotelProdId: deliverylist2[i].hotelProdId,
          deliveryWay: 2,
          prodCount: deliverylist2[i].num,
          totalAmount: deliverylist2[i].prodRetailPrice,
          expressAddress: thatdata.receiptlist.addressAll,
          expressPerson: thatdata.receiptlist.consignee,
          expressPhone: thatdata.receiptlist.consigneePhone
        }
      }
    }

    let orderProd = orderProd1.concat(orderProd2);

    wx.request({
      url: app.data.requestUrl + 'order/hShop',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "POST",
      data: {
        contactName: usernamekf,//联系人姓名
        contactPhone: userphone,//联系人手机号码
        roomDeliveryRemark: thatdata.remark1,//客房配送留言
        expressRemark: thatdata.remark2,//快递到家留言
        hotelId: thatdata.hotelId,//酒店ID
        customerId: thatdata.customerId,//顾客id
        totalAmount: thatdata.lumpsum,//商品总价
        roomCode: thatdata.roomCode,//房间号
        roomFloor: thatdata.roomFloor,//房间楼层
        prodCount: prodCount,//商品数量
        orderProdDTOS: orderProd//订单商品信息
      },
      success(res) {
        const resdata = res.data;
        if (resdata.code == 0){
          that.orderpayfun(resdata.data);
        }else{
          wx.hideToast();//隐藏加载动画
          wx.showToast({
            title: '订单异常，请重新提交',
            icon: 'none',
            duration: 2000
          });
          that.setData({
            paytype: true
          })
          return;
        }
      }
    })

  },
  orderpayfun: function (id){//支付请求
    const that = this;
    const orderid = id;
    wx.request({
      url: app.data.requestUrl + 'order/hShop/pay',
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "POST",
      data: {
        id: orderid,
        customerId: that.data.customerId
      },
      success(ress) {
        that.changestorage();
        const resdata = ress.data;
        const resdatas = ress.data.data;
        if (resdata.code == 0) {
          wx.requestPayment({
            appId: resdatas.appId,
            timeStamp: resdatas.timeStamp,
            nonceStr: resdatas.nonceStr,
            package: resdatas.package,
            signType: 'MD5',
            paySign: resdatas.paySign,
            success: function (res) {
              wx.hideToast();//隐藏加载动画
              if (res.errMsg === "requestPayment:ok") {
                wx.redirectTo({
                  url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + orderid
                })
              }
            },
            fail: function (res) {
              wx.hideToast();//隐藏加载动画
              wx.redirectTo({
                url: '../mhotelmall/mhotelmall?typeindex=3&hotelId=' + that.data.hotelId + '&userid=' + that.data.customerId
              })
            }
          })

        }else{
          wx.hideToast();//隐藏加载动画
          wx.showToast({
            title: '订单异常，请重新提交',
            icon: 'none',
            duration: 2000
          });
          that.setData({
            paytype: true
          })
          return;
        }
      }
    })
  },
  changestorage: function(){
    const that = this;
    let catlist1 = that.data.catlist1;
    let catlist2 = that.data.catlist2;
    const deliverylist1 = that.data.deliverylist1;
    const deliverylist2 = that.data.deliverylist2;
    const list = [];

    for (let i = 0; i < deliverylist1.length; i++) {
      let index = catlist1.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
        return item.hotelProdId == deliverylist1[i].hotelProdId;
      });
      if (index != -1) {
        catlist1.splice(index, 1)
      }
    }
    for (let i = 0; i < deliverylist2.length; i++) {
      let index = catlist2.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
        return item.hotelProdId == deliverylist2[i].hotelProdId;
      });
      if (index != -1) {
        catlist2.splice(index, 1)
      }
    }

    if (catlist1.length == 0){
      wx.setStorage({
        key: 'deliverylist1',
        data: list
      });
    }else{
      wx.setStorage({
        key: 'deliverylist1',
        data: catlist1
      });
    }
    if (catlist2.length == 0) {
      wx.setStorage({
        key: 'deliverylist2',
        data: list
      });
    } else {
      wx.setStorage({
        key: 'deliverylist2',
        data: catlist2
      });
    }
  }
})