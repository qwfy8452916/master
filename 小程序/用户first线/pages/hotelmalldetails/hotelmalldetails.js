const app = getApp()
Page({
  data: {
    detailsdata: '',//详情信息
    imgheights: [],//banner图
    current: 0,//第一张banner图
    deliverylength: '',//购物车数量
    deliverylist1: [],//客房配送
    deliverylist2: [],//快递到家
    isvirtual: ''//是否是虚拟柜 false: 虚拟柜，true: 不是虚拟柜
  },
  onLoad: function (options) {
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });

    wx.getStorage({
      key: 'scene',
      success: function(res) {
        let type;
        if (res.data == 1011) {
          type = true;
        } else {
          type = false;
        }
        that.setData({
          scene: type
        })
      },
    })
    wx.getStorage({
      key: 'isvirtual',
      success: function (res) {
        that.setData({
          isvirtual: res.data
        })
      },
    })

    wx.request({//获取商品详情
      url: app.data.requestUrl + 'hotel/product/hshop/product/' + options.hotelProdId,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      success(res) {
        let resdata = res.data;
        if (resdata.code == 0) {
          wx.hideToast();
          that.setData({
            detailsdata: resdata.data
          })
        }
      }
    })
  },
  onShow:function(){
    let that = this;
    wx.getStorage({
      key: 'deliverylist1',
      success: function (res) {
        that.setData({
          deliverylist1: res.data
        })
      },
    });
    wx.getStorage({
      key: 'deliverylist2',
      success: function (res) {
        that.setData({
          deliverylist2: res.data
        })
      },
    });
  },
  imageLoad: function(e){//banner图高度自适应
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  buycarfun: function(){//跳转到购物车
    wx.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    })
  },
  addcarfun: function(e){//加入购物车
    let that = this;
    let delivery_list1 = [];
    let delivery_list2 = [];
    const scene = that.data.scene;
    delivery_list1 = that.data.deliverylist1;//客房配送
    delivery_list2 = that.data.deliverylist2;//快递到家

    let detailsdata = that.data.detailsdata;

    if (scene){//判断进场方式 true: 扫码进入 false: 非扫码进入

    } else if (detailsdata.delivWay != 1){
      detailsdata.delivWay = 2;
    } else {
      wx.showToast({
        title: '此商品暂不支持客房配送，请选择其他商品购买',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    detailsdata.selecttype = false;

    let addtype1 = delivery_list1.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == detailsdata.hotelProdId;
    });
    let addtype2 = delivery_list2.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == detailsdata.hotelProdId;
    });

    if (detailsdata.delivWay != 2){
      if (addtype1 == -1) {
        detailsdata.num = 1;
        detailsdata.totalprice = that.data.detailsdata.prodRetailPrice;
        delivery_list1.push(detailsdata);  
        wx.setStorage({
          key: 'deliverylist1',
          data: delivery_list1,
        });
        that.setData({
          deliverylist1: delivery_list1
        })
        wx.showToast({
          title: '已成功加入购物车',
          icon: 'success',
          duration: 2000
        });
        return;
      } else {
        delivery_list1[addtype1].num += 1;
        if (parseInt(detailsdata.prodAmount) <= delivery_list1[addtype1].num) {
          wx.showToast({
            title: '库存不足，请勿继续添加',
            image: '../../img/icon-img6.png',
            duration: 2000
          });
          return;
        }else{
          console.log(detailsdata.prodAmount, delivery_list1[addtype1].num);
          delivery_list1[addtype1].totalprice = delivery_list1[addtype1].prodRetailPrice * delivery_list1[addtype1].num;
          wx.setStorage({
            key: 'deliverylist1',
            data: delivery_list1,
          });
          that.setData({
            deliverylist1: delivery_list1
          })
          wx.showToast({
            title: '已成功加入购物车',
            icon: 'success',
            duration: 2000
          })
          return;
        }
      }
    }else{
      if (addtype2 == -1) {
        detailsdata.num = 1;
        detailsdata.totalprice = that.data.detailsdata.prodRetailPrice;
        delivery_list2.push(detailsdata);
        wx.setStorage({
          key: 'deliverylist2',
          data: delivery_list2,
        });
        that.setData({
          deliverylist2: delivery_list2
        })
        wx.showToast({
          title: '已成功加入购物车',
          icon: 'success',
          duration: 2000
        });
        return;
      }else{
        delivery_list2[addtype2].num += 1;
        delivery_list2[addtype2].totalprice = delivery_list2[addtype2].prodRetailPrice * delivery_list2[addtype2].num;
        wx.setStorage({
          key: 'deliverylist2',
          data: delivery_list2,
        });
        that.setData({
          deliverylist2: delivery_list2
        })
        wx.showToast({
          title: '已成功加入购物车',
          icon: 'success',
          duration: 2000
        })
        return
      }
    }
  },
  gobuy: function(e){//立即购买
    let that = this;
    let delivery_list1 = [];
    let delivery_list2 = [];
    const scene = that.data.scene;
    delivery_list1 = that.data.deliverylist1;//客房配送
    delivery_list2 = that.data.deliverylist2;//快递到家

    let detailsdata = that.data.detailsdata;

    if (scene) {//判断进场方式 true: 扫码进入 false: 非扫码进入

    } else if (detailsdata.delivWay != 1) {
      detailsdata.delivWay = 2;
    } else {
      wx.showToast({
        title: '此商品暂不支持客房配送，请选择其他商品购买',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    detailsdata.selecttype = false;

    let addtype1 = delivery_list1.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == detailsdata.hotelProdId;
    });
    let addtype2 = delivery_list2.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == detailsdata.hotelProdId;
    });

    if (detailsdata.delivWay != 2) {
      if (addtype1 == -1) {
        detailsdata.num = 1;
        detailsdata.totalprice = that.data.detailsdata.prodRetailPrice;
        delivery_list1.push(detailsdata);
        wx.setStorage({
          key: 'deliverylist1',
          data: delivery_list1,
        });
        that.setData({
          deliverylist1: delivery_list1
        })
        wx.navigateTo({
          url: '../hotelmallcar/hotelmallcar'
        });
      } else {
        delivery_list1[addtype1].num += 1;
        delivery_list1[addtype1].totalprice = delivery_list1[addtype1].prodRetailPrice * delivery_list1[addtype1].num;
        wx.setStorage({
          key: 'deliverylist1',
          data: delivery_list1,
        });
        that.setData({
          deliverylist1: delivery_list1
        })
        wx.navigateTo({
          url: '../hotelmallcar/hotelmallcar'
        });
      }
    } else {
      if (addtype2 == -1) {
        detailsdata.num = 1;
        detailsdata.totalprice = that.data.detailsdata.prodRetailPrice;
        delivery_list2.push(detailsdata);
        wx.setStorage({
          key: 'deliverylist2',
          data: delivery_list2,
        });
        that.setData({
          deliverylist2: delivery_list2
        })
        wx.navigateTo({
          url: '../hotelmallcar/hotelmallcar'
        });
      } else {
        delivery_list2[addtype2].num += 1;
        delivery_list2[addtype2].totalprice = delivery_list2[addtype2].prodRetailPrice * delivery_list2[addtype2].num;
        wx.setStorage({
          key: 'deliverylist2',
          data: delivery_list2,
        });
        that.setData({
          deliverylist2: delivery_list2
        })
        wx.navigateTo({
          url: '../hotelmallcar/hotelmallcar'
        });
      }
    }
  }
})