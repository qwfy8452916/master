const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api'; //delivWay 0：都没有 1：客服配送 2：快递配送，3:都有

Page({
  data: {
    province: '',
    //省代号
    cabCode: '',
    userid: '',
    hotelid: '',
    hasprodlist: 0,
    //是否有购物车商品
    selectalltype: false,
    //全选
    roomFloor: '',
    //楼层
    roomCode: '',
    //房间号
    hotelName: '',
    //酒店名称
    receipttype: true,
    //收货信息是否需要填写
    receiptlist: '',
    //收货信息
    buylist: [],
    //购物车初始数据
    deliverylist1: [],
    //现场配送商品
    deliverylist2: [],
    //快递配送商品
    deliverylist3: [],
    //迷你吧商品
    lumpsum: 0.00,
    //商品总额
    lumpsum_Discount: 0.00,
    //商品优惠后总额
    alllength: 0,
    //计算商品种类总数
    coupon_selected: [],
    //已选优惠券
    coupon_optional: [],
    //可选优惠券
    coupontype: false,
    //是否显示优惠券
    coupontype2: false //是否显示优惠券列表

  },
  onLoad: function () {
    const that = this;
    wx2my.showLoading({
      title: '加载中'
    });
    that.setData({
      cabCode: app.globalData.cabCode,
      userid: app.globalData.userId,
      hotelid: app.globalData.hotelId,
      selectalltype: false,
      lumpsum: 0.00,
      lumpsum_Discount: 0.00
    });
    wx2my.getStorage({
      key: 'buylist',
      success: function (res) {
        that.getshoppingcart(res.data);
        that.setData({
          buylist: res.data
        });
      },
      fail: function () {
        const list = [];
        that.getshoppingcart(list);
        that.setData({
          buylist: list
        });
      }
    });
    wx2my.getStorage({
      key: 'money',
      success: function (res) {
        that.setData({
          money: res.data
        });
      },
      fail: function () {
        that.setData({
          money: 0.00
        });
      }
    });
    wx2my.getStorage({
      key: 'roomCode',
      success: function (res) {
        that.setData({
          roomCode: res.data
        });
      }
    });
    wx2my.getStorage({
      key: 'roomFloor',
      success: function (res) {
        that.setData({
          roomFloor: res.data
        });
      }
    });
    wx2my.getStorage({
      key: 'hotelName',
      success: function (res) {
        that.setData({
          hotelName: res.data
        });
      }
    });
  },
  onShow: function () {
    this.setData({
      coupontype: false,
      coupon_selected: [],
      alllength: 0
    });
    this.getSelectedaddress();
  },
  onUnload: function () {
    const that = this;
    let deliverylist_a1 = JSON.stringify(that.data.deliverylist1);
    deliverylist_a1 = JSON.parse(deliverylist_a1);
    let deliverylist_a2 = JSON.stringify(that.data.deliverylist2);
    deliverylist_a2 = JSON.parse(deliverylist_a2);
    let deliverylist_a3 = JSON.stringify(that.data.deliverylist3);
    deliverylist_a3 = JSON.parse(deliverylist_a3);

    for (let i = 0; i < deliverylist_a1.length; i++) {
      deliverylist_a1[i].selecttype = false;
    }

    for (let i = 0; i < deliverylist_a2.length; i++) {
      deliverylist_a2[i].selecttype = false;
    }

    for (let i = 0; i < deliverylist_a3.length; i++) {
      deliverylist_a3[i].selecttype = false;
    }

    that.setData({
      deliverylist1: deliverylist_a1,
      deliverylist2: deliverylist_a2,
      deliverylist3: deliverylist_a3
    });
    let deliverylist_b1 = JSON.stringify(that.data.deliverylist1);
    deliverylist_b1 = JSON.parse(deliverylist_b1);
    let deliverylist_b2 = JSON.stringify(that.data.deliverylist2);
    deliverylist_b2 = JSON.parse(deliverylist_b2);
    let deliverylist_b3 = JSON.stringify(that.data.deliverylist3);
    deliverylist_b3 = JSON.parse(deliverylist_b3);

    for (let i = 0; i < deliverylist_b1.length; i++) {
      //现场送商品
      deliverylist_b1[i].latticeCode = '';
    }

    for (let i = 0; i < deliverylist_b2.length; i++) {
      //快递送商品
      deliverylist_b2[i].latticeCode = '';
      deliverylist_b2[i].prodtype = 4;
    }

    let listdata = deliverylist_b1.concat(deliverylist_b2);
    listdata = listdata.concat(deliverylist_b3);
    wx2my.setStorage({
      key: 'buylist',
      data: listdata
    });
    wx2my.setStorage({
      key: 'deliverylist1',
      data: deliverylist_a1
    });
    wx2my.setStorage({
      key: 'deliverylist2',
      data: deliverylist_a2
    });
    wx2my.setStorage({
      key: 'deliverylist3',
      data: deliverylist_a3
    });
  },
  getshoppingcart: function (buylist) {
    //处理购物车数据   
    const that = this;
    let buy_list = JSON.stringify(buylist);
    buy_list = JSON.parse(buy_list);
    let delivery_list1 = []; //现场配送商品

    let delivery_list2 = []; //快递配送商品

    let delivery_list3 = []; //迷你吧商品

    if (buy_list.length == 0) {
      that.setData({
        hasprodlist: 0
      });
      wx2my.hideLoading();
      return;
    } else {
      for (let i = 0; i < buy_list.length; i++) {
        if (buy_list[i].prodtype == 1) {
          if (buy_list[i].isFree == 1) {
            buy_list[i].prodRetailPrice = 0.00;
            buy_list[i].totalprice = 0.00;
          } else {
            buy_list[i].totalprice = buy_list[i].latticeProdAmt;
          }

          delivery_list3.push(buy_list[i]); //迷你吧商品
        } else {
          if (buy_list[i].delivWay == 1 || buy_list[i].delivWay == 3) {
            buy_list[i].totalprice = buy_list[i].prodRetailPrice * buy_list[i].prodnum;
            delivery_list1.push(buy_list[i]); //现场配送商品
          } else {
            buy_list[i].totalprice = buy_list[i].prodRetailPrice * buy_list[i].prodnum;
            delivery_list2.push(buy_list[i]); //快递配送商品
          }
        }
      }

      for (let i = 0; i < delivery_list1.length; i++) {
        for (let j = i + 1; j < delivery_list1.length; j++) {
          if (delivery_list1[i].hotelProdId == delivery_list1[j].hotelProdId) {
            delivery_list1[i].prodnum = delivery_list1[i].prodnum + delivery_list1[j].prodnum;
            delivery_list1[i].totalprice = parseFloat(delivery_list1[i].prodRetailPrice) * delivery_list1[i].prodnum;
            delivery_list1[i].totalprice = delivery_list1[i].totalprice.toFixed(2);
            delivery_list1.splice(j, 1);
          }
        }
      }

      for (let i = 0; i < delivery_list2.length; i++) {
        for (let j = i + 1; j < delivery_list2.length; j++) {
          if (delivery_list2[i].hotelProdId == delivery_list2[j].hotelProdId) {
            delivery_list2[i].prodnum = delivery_list2[i].prodnum + delivery_list2[j].prodnum;
            delivery_list2[i].totalprice = parseFloat(delivery_list2[i].prodRetailPrice) * delivery_list2[i].prodnum;
            delivery_list2[i].totalprice = delivery_list2[i].totalprice.toFixed(2);
            delivery_list2.splice(j, 1);
          }
        }
      }

      if (delivery_list2.length > 0) {
        this.getSelectedaddress();
      }

      that.setData({
        hasprodlist: 1,
        deliverylist1: delivery_list1,
        //现场配送商品
        deliverylist2: delivery_list2,
        //快递配送商品
        deliverylist3: delivery_list3 //迷你吧商品

      });
      wx2my.setStorage({
        key: 'deliverylist1',
        data: delivery_list1
      });
      wx2my.setStorage({
        key: 'deliverylist2',
        data: delivery_list2
      });
      wx2my.setStorage({
        key: 'deliverylist3',
        data: delivery_list3
      });
      wx2my.hideLoading();
    }
  },
  getSelectedaddress: function () {
    //获取选中地址
    const that = this;
    wx2my.getStorage({
      key: 'addressid',
      success: function (res) {
        if (res.data == '') {
          that.getdefault();
        } else {
          wxrequest.getaddressnow(res.data).then(res => {
            let resdata = res.data;
            let resdatas = res.data.data;

            if (resdata.code == 0) {
              that.setData({
                receiptlist: resdatas,
                receipttype: false
              });
            } else {
              wx2my.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              });
            }
          }).catch(err => {
            wx2my.hideLoading();
            console.log(err);
            wx2my.hideLoading();
            console.log(err);
          });
        }
      },
      fail: function (res) {
        //获取默认地址
        that.getdefault();
      }
    });
  },
  getdefault: function () {
    //获取默认地址
    const that = this;
    let linkData = {
      customerId: app.globalData.userId
    };
    wxrequest.getdefaultaddress(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (res.statusCode != 200) {
        //如果没有默认地址
        that.setData({
          receipttype: true
        });
      } else {
        if (resdata.code == 0) {
          that.setData({
            receiptlist: resdatas,
            province: resdatas.province,
            receipttype: false
          });
        }
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  checkboxChange: function (e) {
    //客房配送选择
    const that = this;
    that.setData({
      coupon_selected: []
    });
    const index = e.currentTarget.dataset.index;
    let checkbox_lista_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_lista_1 = JSON.parse(checkbox_lista_1);
    let checkbox_lista_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_lista_2 = JSON.parse(checkbox_lista_2);
    let checkbox_lista_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_lista_3 = JSON.parse(checkbox_lista_3);
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    checkbox_lista_1[index].selecttype = !checkbox_lista_1[index].selecttype;

    if (checkbox_lista_1[index].selecttype) {
      lumpsum = lumpsum + parseFloat(checkbox_lista_1[index].totalprice);
    } else {
      lumpsum = lumpsum - parseFloat(checkbox_lista_1[index].totalprice);
    }

    let allnum = 0;
    let allnum2 = checkbox_lista_1.length + checkbox_lista_2.length + checkbox_lista_3.length;

    for (let i = 0; i < checkbox_lista_1.length; i++) {
      if (checkbox_lista_1[i].selecttype == true) {
        allnum += 1;
      }
    }

    if (checkbox_lista_2.length > 0) {
      for (let i = 0; i < checkbox_lista_2.length; i++) {
        if (checkbox_lista_2[i].selecttype == true) {
          allnum += 1;
        }
      }
    }

    if (checkbox_lista_3.length > 0) {
      for (let i = 0; i < checkbox_lista_3.length; i++) {
        if (checkbox_lista_3[i].selecttype == true) {
          allnum += 1;
        }
      }
    }

    if (allnum == 0) {
      that.setData({
        selectalltype: false,
        alllength: 0
      });
    } else if (allnum != allnum2) {
      that.setData({
        selectalltype: false,
        alllength: allnum
      });
    } else {
      that.setData({
        selectalltype: true,
        alllength: allnum
      });
    }

    if (lumpsum < 0) {
      lumpsum = 0.00;
    }

    that.setData({
      deliverylist1: checkbox_lista_1,
      lumpsum: lumpsum.toFixed(2),
      lumpsum_Discount: lumpsum.toFixed(2)
    });
    that.getcouponlist(1);
  },
  checkboxChange1: function (e) {
    //快递到家选择
    const that = this;
    that.setData({
      coupon_selected: []
    });
    const index = e.currentTarget.dataset.index;
    let checkbox_listb_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listb_1 = JSON.parse(checkbox_listb_1);
    let checkbox_listb_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listb_2 = JSON.parse(checkbox_listb_2);
    let checkbox_listb_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listb_3 = JSON.parse(checkbox_listb_3);
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    checkbox_listb_2[index].selecttype = !checkbox_listb_2[index].selecttype;

    if (checkbox_listb_2[index].selecttype) {
      lumpsum = lumpsum + parseFloat(checkbox_listb_2[index].totalprice);
    } else {
      lumpsum = lumpsum - parseFloat(checkbox_listb_2[index].totalprice);
    }

    let allnum = 0;
    let allnum2 = checkbox_listb_1.length + checkbox_listb_2.length + checkbox_listb_3.length;

    for (let i = 0; i < checkbox_listb_2.length; i++) {
      if (checkbox_listb_2[i].selecttype == true) {
        allnum += 1;
      }
    }

    if (checkbox_listb_1.length > 0) {
      for (let i = 0; i < checkbox_listb_1.length; i++) {
        if (checkbox_listb_1[i].selecttype == true) {
          allnum += 1;
        }
      }
    }

    if (checkbox_listb_3.length > 0) {
      for (let i = 0; i < checkbox_listb_3.length; i++) {
        if (checkbox_listb_3[i].selecttype == true) {
          allnum += 1;
        }
      }
    }

    if (allnum == 0) {
      that.setData({
        selectalltype: false,
        alllength: 0
      });
    } else if (allnum != allnum2) {
      that.setData({
        selectalltype: false,
        alllength: allnum
      });
    } else {
      that.setData({
        selectalltype: true,
        alllength: allnum
      });
    }

    if (lumpsum < 0) {
      lumpsum = 0.00;
    }

    that.setData({
      deliverylist2: checkbox_listb_2,
      lumpsum: lumpsum.toFixed(2),
      lumpsum_Discount: lumpsum.toFixed(2)
    });
    that.getcouponlist(1);
  },
  checkboxChange2: function (e) {
    //迷你吧选择
    const that = this;
    that.setData({
      coupon_selected: []
    });
    const index = e.currentTarget.dataset.index;
    let checkbox_listc_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listc_1 = JSON.parse(checkbox_listc_1);
    let checkbox_listc_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listc_2 = JSON.parse(checkbox_listc_2);
    let checkbox_listc_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listc_3 = JSON.parse(checkbox_listc_3);
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    checkbox_listc_3[index].selecttype = !checkbox_listc_3[index].selecttype;

    if (checkbox_listc_3[index].selecttype) {
      lumpsum = lumpsum + parseFloat(checkbox_listc_3[index].totalprice);
    } else {
      lumpsum = lumpsum - parseFloat(checkbox_listc_3[index].totalprice);
    }

    let allnum = 0;
    let allnum2 = checkbox_listc_1.length + checkbox_listc_2.length + checkbox_listc_3.length;

    for (let i = 0; i < checkbox_listc_3.length; i++) {
      if (checkbox_listc_3[i].selecttype == true) {
        allnum += 1;
      }
    }

    if (checkbox_listc_1.length > 0) {
      for (let i = 0; i < checkbox_listc_1.length; i++) {
        if (checkbox_listc_1[i].selecttype == true) {
          allnum += 1;
        }
      }
    }

    if (checkbox_listc_2.length > 0) {
      for (let i = 0; i < checkbox_listc_2.length; i++) {
        if (checkbox_listc_2[i].selecttype == true) {
          allnum += 1;
        }
      }
    }

    if (allnum == 0) {
      that.setData({
        selectalltype: false,
        alllength: 0
      });
    } else if (allnum != allnum2) {
      that.setData({
        selectalltype: false,
        alllength: allnum
      });
    } else {
      that.setData({
        selectalltype: true,
        alllength: allnum
      });
    }

    if (lumpsum < 0) {
      lumpsum = 0.00;
    }

    that.setData({
      deliverylist3: checkbox_listc_3,
      lumpsum: lumpsum.toFixed(2),
      lumpsum_Discount: lumpsum.toFixed(2)
    });
    that.getcouponlist(1);
  },
  selectall: function () {
    //全选
    const that = this;
    that.setData({
      coupon_selected: []
    });
    let selectalltype = !that.data.selectalltype; //选择状态

    let lumpsum = 0; //总价

    let checkbox_listc_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listc_1 = JSON.parse(checkbox_listc_1);
    let checkbox_listc_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listc_2 = JSON.parse(checkbox_listc_2);
    let checkbox_listc_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listc_3 = JSON.parse(checkbox_listc_3);
    let alllength = checkbox_listc_1.length + checkbox_listc_2.length + checkbox_listc_3.length;

    if (checkbox_listc_1.length > 0) {
      for (let i = 0; i < checkbox_listc_1.length; i++) {
        checkbox_listc_1[i].selecttype = selectalltype;

        if (selectalltype) {
          lumpsum = lumpsum + parseFloat(checkbox_listc_1[i].totalprice);
        }
      }

      that.setData({
        deliverylist1: checkbox_listc_1
      });
    }

    if (checkbox_listc_2.length > 0) {
      for (let i = 0; i < checkbox_listc_2.length; i++) {
        checkbox_listc_2[i].selecttype = selectalltype;

        if (selectalltype) {
          lumpsum = lumpsum + parseFloat(checkbox_listc_2[i].totalprice);
        }
      }

      that.setData({
        deliverylist2: checkbox_listc_2
      });
    }

    if (checkbox_listc_3.length > 0) {
      for (let i = 0; i < checkbox_listc_3.length; i++) {
        checkbox_listc_3[i].selecttype = selectalltype;

        if (selectalltype) {
          lumpsum = lumpsum + parseFloat(checkbox_listc_3[i].totalprice);
        }
      }

      that.setData({
        deliverylist3: checkbox_listc_3
      });
    }

    if (!selectalltype) {
      alllength = 0;
    }

    that.setData({
      lumpsum: lumpsum.toFixed(2),
      selectalltype: selectalltype,
      alllength: alllength,
      lumpsum_Discount: lumpsum.toFixed(2)
    });
    that.getcouponlist(1);
  },
  cutback: function (e) {
    //减少
    const that = this;
    that.setData({
      coupon_selected: []
    });
    let index = e.currentTarget.dataset.index; //下标

    let listtype = e.currentTarget.dataset.listtype; //数组类别

    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    let checkbox_listd_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listd_1 = JSON.parse(checkbox_listd_1);
    let checkbox_listd_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listd_2 = JSON.parse(checkbox_listd_2);
    let checkbox_listd_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listd_3 = JSON.parse(checkbox_listd_3);

    if (listtype == 1) {
      //客房配送
      if (checkbox_listd_1[index].prodnum == 1) {
        wx2my.showModal({
          title: '提示',
          content: '您确实删除此商品吗？',

          success(res) {
            if (res.confirm) {
              if (lumpsum > 0) {
                lumpsum = lumpsum - parseFloat(checkbox_listd_1[index].prodRetailPrice);
              } else {
                lumpsum = 0.00;
              }

              checkbox_listd_1.splice(index, 1);
              that.setData({
                deliverylist1: checkbox_listd_1,
                lumpsum: lumpsum.toFixed(2),
                lumpsum_Discount: lumpsum.toFixed(2)
              });
              wx2my.setStorage({
                key: 'deliverylist1',
                data: checkbox_listd_1
              });
              that.checkshopcar(checkbox_listd_1, checkbox_listd_2, checkbox_listd_3);
            }
          }

        });
        return;
      } else {
        checkbox_listd_1[index].prodnum = checkbox_listd_1[index].prodnum - 1;
        checkbox_listd_1[index].totalprice = parseFloat(checkbox_listd_1[index].totalprice) - parseFloat(checkbox_listd_1[index].prodRetailPrice);
      }

      if (lumpsum > 0) {
        lumpsum = lumpsum - parseFloat(checkbox_listd_1[index].prodRetailPrice);
      } else {
        lumpsum = 0.00;
      }

      that.setData({
        deliverylist1: checkbox_listd_1
      });
      wx2my.setStorage({
        key: 'deliverylist1',
        data: checkbox_listd_1
      });

      if (checkbox_listd_1[index].selecttype) {
        that.setData({
          lumpsum: lumpsum.toFixed(2),
          lumpsum_Discount: lumpsum.toFixed(2)
        });
      }

      that.getcouponlist(1);
    } else if (listtype == 2) {
      //快递配送
      if (checkbox_listd_2[index].prodnum == 1) {
        //快递到家
        wx2my.showModal({
          title: '提示',
          content: '您确实删除此商品吗？',

          success(res) {
            if (res.confirm) {
              if (lumpsum > 0) {
                lumpsum = lumpsum - parseFloat(checkbox_listd_2[index].prodRetailPrice);
              } else {
                lumpsum = 0.00;
              }

              checkbox_listd_2.splice(index, 1);
              that.setData({
                deliverylist2: checkbox_listd_2,
                lumpsum: lumpsum.toFixed(2),
                lumpsum_Discount: lumpsum.toFixed(2)
              });
              wx2my.setStorage({
                key: 'deliverylist2',
                data: checkbox_listd_2
              });
              that.checkshopcar(checkbox_listd_1, checkbox_listd_2, checkbox_listd_3);
            }
          }

        });
        return;
      } else {
        checkbox_listd_2[index].prodnum = checkbox_listd_2[index].prodnum - 1;
        checkbox_listd_2[index].totalprice = parseFloat(checkbox_listd_2[index].totalprice) - parseFloat(checkbox_listd_2[index].prodRetailPrice);
      }

      if (lumpsum > 0) {
        lumpsum = lumpsum - parseFloat(checkbox_listd_2[index].prodRetailPrice);
      } else {
        lumpsum = 0.00;
      }

      that.setData({
        deliverylist2: checkbox_listd_2
      });
      wx2my.setStorage({
        key: 'deliverylist2',
        data: checkbox_listd_2
      });

      if (checkbox_listd_2[index].selecttype) {
        that.setData({
          lumpsum: lumpsum.toFixed(2),
          lumpsum_Discount: lumpsum.toFixed(2)
        });
      }

      that.getcouponlist(1);
    } else if (listtype == 3) {
      //迷你吧
      wx2my.showModal({
        title: '提示',
        content: '您确实删除此商品吗？',

        success(res) {
          if (res.confirm) {
            if (lumpsum > 0) {
              lumpsum = lumpsum - parseFloat(checkbox_listd_2[index].latticeProdAmt);
            } else {
              lumpsum = 0.00;
            }

            checkbox_listd_3.splice(index, 1);
            that.setData({
              deliverylist3: checkbox_listd_3,
              lumpsum: lumpsum.toFixed(2),
              lumpsum_Discount: lumpsum.toFixed(2)
            });
            wx2my.setStorage({
              key: 'deliverylist3',
              data: checkbox_listd_3
            });
            that.checkshopcar(checkbox_listd_1, checkbox_listd_2, checkbox_listd_3);
          }
        }

      });
    }
  },
  checkshopcar: function (checkbox_listd_1, checkbox_listd_2, checkbox_listd_3) {
    //校验购物车
    const that = this;
    that.getcouponlist(1);

    if (checkbox_listd_1.length <= 0 && checkbox_listd_2.length <= 0 && checkbox_listd_3.length <= 0) {
      that.setData({
        hasprodlist: 0
      });
    }
  },
  increase: function (e) {
    //增加
    const that = this;
    that.setData({
      coupon_selected: []
    });
    wx2my.showLoading({
      title: '加载中',
      mask: true
    });
    setTimeout(function () {
      let cabCode = that.data.cabCode;
      let hotelid = that.data.hotelid;
      let index = e.currentTarget.dataset.index; //下标

      let isneedinv = e.currentTarget.dataset.isneedinv; //下标

      let listtype = e.currentTarget.dataset.listtype; //数组类别

      let prod_Amt = e.currentTarget.dataset.pordamt; //商品当前数量

      prod_Amt = prod_Amt + 1;
      let lumpsum = that.data.lumpsum;
      lumpsum = parseFloat(lumpsum);
      let checkbox_liste_1 = JSON.stringify(that.data.deliverylist1);
      checkbox_liste_1 = JSON.parse(checkbox_liste_1);
      let checkbox_liste_2 = JSON.stringify(that.data.deliverylist2);
      checkbox_liste_2 = JSON.parse(checkbox_liste_2);
      let checkbox_liste_3 = JSON.stringify(that.data.deliverylist3);
      checkbox_liste_3 = JSON.parse(checkbox_liste_3);

      if (listtype == 1) {
        //现场送
        cabCode = '';
        wx2my.setStorageSync("plustype", 1);
        that.testadd(cabCode, hotelid, checkbox_liste_1[index].hotelProdId, prod_Amt);
        setTimeout(function () {
          if (wx2my.getStorageSync('plustype') == 0 && isneedinv == 1) {
            wx2my.setStorage({
              key: "plustype",
              data: 1
            });
            wx2my.hideLoading();
            return;
          } else {
            checkbox_liste_1[index].prodnum += 1;
            checkbox_liste_1[index].totalprice = parseFloat(checkbox_liste_1[index].totalprice) + parseFloat(checkbox_liste_1[index].prodRetailPrice);
            lumpsum = lumpsum + parseFloat(checkbox_liste_1[index].prodRetailPrice);
            that.setData({
              deliverylist1: checkbox_liste_1
            });
            wx2my.setStorage({
              key: 'deliverylist1',
              data: checkbox_liste_1
            });

            if (checkbox_liste_1[index].selecttype) {
              that.setData({
                lumpsum: lumpsum.toFixed(2),
                lumpsum_Discount: lumpsum.toFixed(2)
              });
            }

            that.getcouponlist(1);
            wx2my.hideLoading();
          }
        }, 300);
      } else if (listtype == 2) {
        //快递送
        checkbox_liste_2[index].prodnum += 1;
        checkbox_liste_2[index].totalprice = parseFloat(checkbox_liste_2[index].totalprice) + parseFloat(checkbox_liste_2[index].prodRetailPrice);
        lumpsum = lumpsum + parseFloat(checkbox_liste_2[index].prodRetailPrice);
        that.setData({
          deliverylist2: checkbox_liste_2
        });
        wx2my.setStorage({
          key: 'deliverylist2',
          data: checkbox_liste_2
        });

        if (checkbox_liste_2[index].selecttype) {
          that.setData({
            lumpsum: lumpsum.toFixed(2),
            lumpsum_Discount: lumpsum.toFixed(2)
          });
        }

        that.getcouponlist(1);
        wx2my.hideLoading();
      } else if (listtype == 3) {
        //迷你吧
        wx2my.setStorageSync("plustype", 1);
        that.testadd(cabCode, hotelid, checkbox_liste_3[index].hotelProdId, prod_Amt);
        setTimeout(function () {
          if (wx2my.getStorageSync('plustype') == 0 && isneedinv == 1) {
            wx2my.hideLoading();
            return;
          } else {
            let index_mnb = checkbox_liste_1.findIndex(item => {
              //判断数组中是否存在当前数据,无：-1，有：返回下标
              return item.hotelProdId == checkbox_liste_3[index].hotelProdId;
            });

            if (index_mnb == -1) {
              let mibdata = JSON.stringify(checkbox_liste_3[index]);
              mibdata = JSON.parse(mibdata);
              mibdata.prodnum = 1;
              mibdata.prodRetailPrice = mibdata.prodRetailPrice;
              mibdata.totalprice = mibdata.prodRetailPrice;
              mibdata.selecttype = false;
              checkbox_liste_1.push(mibdata);
              that.setData({
                deliverylist1: checkbox_liste_1,
                selectalltype: false
              });
            } else {
              checkbox_liste_1[index_mnb].prodnum += 1;
              checkbox_liste_1[index_mnb].totalprice = parseFloat(checkbox_liste_1[index_mnb].totalprice) + parseFloat(checkbox_liste_1[index_mnb].prodRetailPrice);
              lumpsum = lumpsum + parseFloat(checkbox_liste_1[index_mnb].prodRetailPrice);
              that.setData({
                deliverylist1: checkbox_liste_1
              });

              if (checkbox_liste_1[index_mnb].selecttype) {
                that.setData({
                  lumpsum: lumpsum.toFixed(2),
                  lumpsum_Discount: lumpsum.toFixed(2)
                });
              }
            }

            wx2my.hideLoading();
            wx2my.showToast({
              title: '已添加到现场配送',
              icon: 'none',
              duration: 2000
            });
            wx2my.setStorage({
              key: 'deliverylist1',
              data: checkbox_liste_1
            });
          }
        }, 300);
      }
    }, 300);
  },
  addTokd: function (e) {
    //添加到快递
    const that = this;
    const index = e.currentTarget.dataset.index; //下标

    let checkbox_listf_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listf_1 = JSON.parse(checkbox_listf_1);
    let checkbox_listf_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listf_2 = JSON.parse(checkbox_listf_2);
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    let addtype2 = checkbox_listf_2.findIndex(item => {
      //判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == checkbox_listf_1[index].hotelProdId;
    });

    if (addtype2 == -1) {
      let airval = JSON.stringify(checkbox_listf_1[index]);
      airval = JSON.parse(airval);
      airval.prodnum = 1;
      airval.prodRetailPrice = airval.prodRetailPrice;
      airval.totalprice = airval.prodRetailPrice;
      airval.selecttype = false;
      checkbox_listf_2.push(airval);
      that.setData({
        deliverylist2: checkbox_listf_2,
        selectalltype: false
      });
    } else {
      checkbox_listf_2[addtype2].prodnum += 1;
      checkbox_listf_2[addtype2].totalprice = parseFloat(checkbox_listf_2[addtype2].totalprice) + parseFloat(checkbox_listf_2[addtype2].prodRetailPrice);
      lumpsum = lumpsum + parseFloat(checkbox_listf_2[addtype2].totalprice);
      that.setData({
        deliverylist2: checkbox_listf_2
      });

      if (checkbox_listf_2[addtype2].selecttype) {
        that.setData({
          lumpsum: lumpsum.toFixed(2),
          lumpsum_Discount: lumpsum.toFixed(2)
        });
      }
    }

    wx2my.showToast({
      title: '已添加到快递到家',
      icon: 'none',
      duration: 2000
    });
    wx2my.setStorage({
      key: 'deliverylist2',
      data: checkbox_listf_2
    });
  },
  addTokf: function (e) {
    //添加到客房
    const that = this;
    let index = e.currentTarget.dataset.index; //下标

    let checkbox_listg_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listg_1 = JSON.parse(checkbox_listg_1);
    let checkbox_listg_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listg_2 = JSON.parse(checkbox_listg_2);
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    let addtype1 = checkbox_listg_1.findIndex(item => {
      //判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == checkbox_listg_2[index].hotelProdId;
    });

    if (addtype1 == -1) {
      let airval = JSON.stringify(checkbox_listg_2[index]);
      airval = JSON.parse(airval);
      airval.prodnum = 1;
      airval.prodRetailPrice = airval.prodRetailPrice;
      airval.totalprice = airval.prodRetailPrice;
      airval.selecttype = false;
      checkbox_listg_1.push(airval);
      that.setData({
        deliverylist1: checkbox_listg_1,
        selectalltype: false
      });
    } else {
      checkbox_listg_1[addtype1].prodnum += 1;
      checkbox_listg_1[addtype1].totalprice = parseFloat(checkbox_listg_1[addtype1].totalprice) + parseFloat(checkbox_listg_1[addtype1].prodRetailPrice);
      lumpsum = lumpsum + parseFloat(checkbox_listg_1[addtype1].totalprice);
      that.setData({
        deliverylist1: checkbox_listg_1
      });

      if (checkbox_listg_1[addtype1].selecttype) {
        that.setData({
          lumpsum: lumpsum.toFixed(2),
          lumpsum_Discount: lumpsum.toFixed(2)
        });
      }
    }

    wx2my.showToast({
      title: '已添加到客房配送',
      icon: 'none',
      duration: 2000
    });
    wx2my.setStorage({
      key: 'deliverylist1',
      data: checkbox_listg_1
    });
  },
  addressfun: function () {
    //地址
    wx2my.navigateTo({
      url: '../hotelmalladdress/hotelmalladdress'
    });
  },
  checkcoupon: function () {
    //校验已选优惠券是否可用
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    const hotelid = that.data.hotelid;
    const userid = that.data.userid;
    const coupon_selected = that.data.coupon_selected; //已选优惠券

    const datajson = that.getdata();
    const minlist = datajson.minlist;
    const finclist = datajson.finclist;
    const selected_id = datajson.selected_id;
    let prodList = minlist.concat(finclist);

    if (selected_id.length != 0) {
      let linkData = {
        prodList: prodList,
        //已选商品
        couponIds: selected_id,
        //已选优惠券id
        cusId: userid,
        hotelId: hotelid
      };
      wxrequest.postverifyavailable(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;

        if (resdata.code == 0) {
          if (resdata.data.length != 0) {
            //有不可用的券
            wx2my.showToast({
              title: '您选的优惠券中有不可用的优惠券，请重新选择优惠券',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              coupon_selected: []
            });
            that.getcouponlist(1);
            wx2my.hideLoading();
          } else {
            that.settlementfun(); //结算
          }
        } else {
          wx2my.showToast({
            title: resdatas.msg,
            icon: 'none',
            duration: 2000
          });
          that.setData({
            coupon_selected: []
          });
          that.getcouponlist(1);
        }
      }).catch(err => {
        wx2my.hideLoading();
        console.log(err);
        wx2my.hideLoading();
        console.log(err);
      });
    } else {
      that.settlementfun(); //结算
    }
  },
  settlementfun: function () {
    //结算  
    const that = this;
    let checkbox_listh_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listh_1 = JSON.parse(checkbox_listh_1);
    let checkbox_listh_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listh_2 = JSON.parse(checkbox_listh_2);
    let checkbox_listh_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listh_3 = JSON.parse(checkbox_listh_3);
    const receipttype = that.data.receipttype;
    let selectnum1 = 0;
    let selectnum2 = 0;
    let selectnum3 = 0;
    let selectnum = 0;
    let orderlist1 = []; //订单-客房配送

    let orderlist2 = []; //订单-快递到家

    let orderlist3 = []; //订单-迷你吧

    if (checkbox_listh_1.length > 0) {
      for (let i = 0; i < checkbox_listh_1.length; i++) {
        if (checkbox_listh_1[i].selecttype) {
          selectnum1 += 1;
          orderlist1.push(checkbox_listh_1[i]);
          checkbox_listh_1[i].selecttype = false;
        }
      }
    }

    if (checkbox_listh_2.length > 0) {
      for (let i = 0; i < checkbox_listh_2.length; i++) {
        if (checkbox_listh_2[i].selecttype) {
          selectnum2 += 1;
          orderlist2.push(checkbox_listh_2[i]);
          checkbox_listh_2[i].selecttype = false;
        }
      }
    }

    if (checkbox_listh_3.length > 0) {
      for (let i = 0; i < checkbox_listh_3.length; i++) {
        if (checkbox_listh_3[i].selecttype) {
          selectnum3 += 1;
          orderlist3.push(checkbox_listh_3[i]);
          checkbox_listh_3[i].selecttype = false;
        }
      }
    }

    selectnum = selectnum1 + selectnum2 + selectnum3;

    if (selectnum2 > 0) {
      if (receipttype) {
        wx2my.showToast({
          title: '请填写快递收件信息',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }

    if (selectnum == 0) {
      wx2my.showToast({
        title: '请选中需要结算的商品',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    let lump_sum = JSON.stringify(that.data.lumpsum);
    lump_sum = JSON.parse(lump_sum);
    let lump_sum_Discount = JSON.stringify(that.data.lumpsum_Discount);
    lump_sum_Discount = JSON.parse(lump_sum_Discount);
    that.setData({
      deliverylist1: checkbox_listh_1,
      //现场配送商品
      deliverylist2: checkbox_listh_2,
      //快递配送商品
      deliverylist3: checkbox_listh_3,
      //迷你吧商品
      selectalltype: false,
      lumpsum: 0.00,
      lumpsum_Discount: 0.00
    });
    wx2my.setStorage({
      key: 'deliverylist1',
      data: checkbox_listh_1
    });
    wx2my.setStorage({
      key: 'deliverylist2',
      data: checkbox_listh_2
    });
    wx2my.setStorage({
      key: 'deliverylist3',
      data: checkbox_listh_3
    });
    wx2my.setStorage({
      key: 'orderlist1',
      data: orderlist1
    });
    wx2my.setStorage({
      key: 'orderlist2',
      data: orderlist2
    });
    wx2my.setStorage({
      key: 'orderlist3',
      data: orderlist3
    });
    wx2my.setStorage({
      key: 'coupon_selected',
      data: that.data.coupon_selected
    });
    wx2my.hideLoading();
    wx2my.navigateTo({
      url: '../hotelmallorder/hotelmallorder?lumpsum=' + lump_sum + '&province=' + that.data.province + "&lump_sum_discount=" + lump_sum_Discount
    });
  },
  testadd: function (cabCode, hotelId, hotelProdId, prod_Amt) {
    //检验商品是否可以增加数量
    const that = this;
    let linkData = {
      cabCode: cabCode,
      hotelId: hotelId,
      hotelProdId: hotelProdId,
      prodAmt: prod_Amt
    };
    wxrequest.testprodnum(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        wx2my.setStorageSync("plustype", 1);
      } else {
        wx2my.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        wx2my.setStorageSync("plustype", 0);
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  showcoupon: function () {
    //显示优惠券列表
    const that = this;

    if (!that.data.coupontype2) {
      that.getcouponlist(1);
    } else {
      that.calculation(that.data.coupon_selected);
    }

    that.setData({
      coupontype2: !that.data.coupontype2
    });
  },
  getcouponlist: function (type) {
    //获取优惠券列表
    wx2my.showLoading({
      title: '加载中'
    });
    const that = this;
    const hotelid = that.data.hotelid;
    const userid = that.data.userid;
    let coupontype = that.data.coupontype;
    let coupon_selected = JSON.stringify(that.data.coupon_selected); //已选优惠券

    coupon_selected = JSON.parse(coupon_selected);
    const datajson = that.getdata();
    const minlist = datajson.minlist;
    const finclist = datajson.finclist;
    const selected_id = datajson.selected_id;
    let prodList = minlist.concat(finclist);

    if (minlist.length != 0 || finclist.length != 0) {
      let linkData = {
        prodList: prodList,
        //已选商品
        couponIds: selected_id,
        //已选优惠券id
        cusId: userid,
        hotelId: hotelid
      };
      wxrequest.getcancouponlist(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;

        if (resdata.code == 0) {
          let listdata_selected = coupon_selected; //已选

          let listdata_optional = []; //可选

          let coupontype = true;

          if (coupon_selected.length == 0 && type == 1 && resdatas.length > 0) {
            //如果没有已选，则取第一个可选优惠券为已选优惠券
            listdata_selected.push(resdatas[0]);
            listdata_optional = resdatas.slice(1);
          } else {
            listdata_optional = resdatas;
          }

          if (coupon_selected.length == 0 && resdatas.length == 0) {
            coupontype = false;
          }

          that.setData({
            coupontype: coupontype,
            coupon_optional: listdata_optional,
            coupon_selected: listdata_selected
          });

          if (coupon_selected.length == 0 && type == 1) {
            //如果没有已选，则取第一个可选优惠券为已选优惠券
            setTimeout(function () {
              that.getcouponlist();
            }, 500);
          }

          that.calculation(listdata_selected);
          wx2my.hideLoading();
        } else {
          wx2my.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      }).catch(err => {
        wx2my.hideLoading();
        console.log(err);
        wx2my.hideLoading();
        console.log(err);
      });
    } else {
      that.setData({
        coupontype: false
      });
      wx2my.hideLoading();
      that.calculation(that.data.coupon_selected);
    }
  },
  changecoupon: function (e) {
    //修改已选优惠券
    const that = this;
    const edata = e.currentTarget.dataset;
    let coupon_selected = that.data.coupon_selected; //已选优惠券

    let coupon_optional = that.data.coupon_optional; //可选优惠券

    if (edata.type == 1) {
      //删除优惠券
      coupon_selected.splice(edata.index, 1);
    } else {
      //添加优惠券
      if (coupon_optional[edata.index].couponLimit == 0) {
        coupon_selected = [], coupon_selected.push(coupon_optional[edata.index]);
      } else {
        coupon_selected.push(coupon_optional[edata.index]);
      }
    }

    that.setData({
      coupon_selected: coupon_selected
    });
    that.getcouponlist();
  },
  calculation: function (listdata) {
    //计算优惠后金额
    const that = this;
    let checkbox_listc_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listc_1 = JSON.parse(checkbox_listc_1);
    let checkbox_listc_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listc_2 = JSON.parse(checkbox_listc_2);
    let checkbox_listc_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listc_3 = JSON.parse(checkbox_listc_3);
    let alllength = checkbox_listc_1.length + checkbox_listc_2.length + checkbox_listc_3.length;
    let selectalltype = that.data.selectalltype; //选择状态

    if (!selectalltype) {
      alllength = 0;
    }

    const lumpsum = parseFloat(that.data.lumpsum); //商品总额

    let lumpsum_Discount = parseFloat(that.data.lumpsum_Discount); //商品优惠后总额

    const coupon_selected = listdata; //已选优惠券

    let discount = 0.00; //优惠金额

    for (let i = 0; i < coupon_selected.length; i++) {
      discount = parseFloat(discount) + parseFloat(coupon_selected[i].reduceMoney);
    }

    lumpsum_Discount = parseFloat(lumpsum) - parseFloat(discount);
    lumpsum_Discount = lumpsum_Discount.toFixed(2);
    that.setData({
      lumpsum_Discount: lumpsum_Discount,
      alllength: alllength
    });
  },

  getdata() {
    //获取minlist、finclist
    const that = this;
    let datajson = {};
    let minlist = []; //酒店商品id

    let finclist = []; //功能区商品id+商品总价

    const coupon_selected = that.data.coupon_selected; //已选优惠券

    let selected_id = []; //已选优惠券id

    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }

    let checkbox_listh_1 = JSON.stringify(that.data.deliverylist1); //现场配送商品

    checkbox_listh_1 = JSON.parse(checkbox_listh_1);
    let checkbox_listh_2 = JSON.stringify(that.data.deliverylist2); //快递配送商品

    checkbox_listh_2 = JSON.parse(checkbox_listh_2);
    let checkbox_listh_3 = JSON.stringify(that.data.deliverylist3); //迷你吧商品

    checkbox_listh_3 = JSON.parse(checkbox_listh_3);

    if (checkbox_listh_1.length > 0) {
      //现场配送商品
      for (let i = 0; i < checkbox_listh_1.length; i++) {
        if (checkbox_listh_1[i].selecttype) {
          let datainfo = {};
          datainfo.funcId = checkbox_listh_1[i].funcId;
          datainfo.funcProdId = checkbox_listh_1[i].funcProdId;
          datainfo.hotelProdId = checkbox_listh_1[i].hotelProdId;
          datainfo.prodOwnerOrgId = checkbox_listh_1[i].prodOwnerOrgId;
          datainfo.prodCount = checkbox_listh_1[i].prodnum;
          datainfo.prodPrice = checkbox_listh_1[i].prodRetailPrice;
          datainfo.totalAmount = checkbox_listh_1[i].totalprice;
          finclist.push(datainfo);
        }
      }
    }

    if (checkbox_listh_2.length > 0) {
      //快递配送商品
      for (let i = 0; i < checkbox_listh_2.length; i++) {
        if (checkbox_listh_2[i].selecttype) {
          let datainfo = {};
          datainfo.funcId = checkbox_listh_2[i].funcId;
          datainfo.funcProdId = checkbox_listh_2[i].funcProdId;
          datainfo.hotelProdId = checkbox_listh_2[i].hotelProdId;
          datainfo.prodOwnerOrgId = checkbox_listh_2[i].prodOwnerOrgId;
          datainfo.prodCount = checkbox_listh_2[i].prodnum;
          datainfo.prodPrice = checkbox_listh_2[i].prodRetailPrice;
          datainfo.totalAmount = checkbox_listh_2[i].totalprice;
          finclist.push(datainfo);
        }
      }
    }

    if (checkbox_listh_3.length > 0) {
      //迷你吧商品
      for (let i = 0; i < checkbox_listh_3.length; i++) {
        if (checkbox_listh_3[i].selecttype) {
          let datainfo = {};
          datainfo.hotelProdId = checkbox_listh_3[i].hotelProdId;
          datainfo.prodOwnerOrgId = checkbox_listh_3[i].prodOwnerOrgId;
          datainfo.prodCount = checkbox_listh_3[i].prodnum;
          datainfo.prodPrice = checkbox_listh_3[i].prodRetailPrice;
          datainfo.totalAmount = checkbox_listh_3[i].totalprice;
          minlist.push(datainfo);
        }
      }
    }

    datajson.minlist = minlist;
    datajson.finclist = finclist;
    datajson.selected_id = selected_id;
    return datajson;
  }

});