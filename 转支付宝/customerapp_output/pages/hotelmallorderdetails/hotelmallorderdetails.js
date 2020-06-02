const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    hotelBookingPhone: '',
    //客服电话
    orderinfo: '',
    //订单详情
    deliverytype1: '',
    //客房配送显示状态
    deliverytype2: '',
    //快递到家显示状态
    orderlist1: [],
    //客房配送数据
    orderlist2: [],
    //快递到家数据
    consignee: '',
    //收件人
    consigneePhone: '',
    //收件人电话
    addressAll: '',
    //收件人地址
    total1: '',
    //客房配送商品总价
    total2: '',
    //快递到家商品总价
    quantity1: '',
    //客房配送商品总数
    quantity2: '',
    //快递到家商品总数
    isvirtual: '' //是否是虚拟柜 false: 虚拟柜，true: 不是虚拟柜

  },
  onLoad: function (options) {
    const that = this;
    wx2my.getStorage({
      key: 'isvirtual',
      success: function (res) {
        that.setData({
          isvirtual: res.data
        });
      }
    });
    that.get_orderdetail(options.orderid);
  },
  get_orderdetail: function (orderid) {
    const that = this;
    wxrequest.getorderdetail(orderid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let orderlist1 = []; //客房配送数据

      let orderlist2 = []; //快递到家数据

      if (resdata.code == 0) {
        const orderProdDTOS = resdatas.orderProdDTOS;

        for (let i = 0; i < orderProdDTOS.length; i++) {
          if (orderProdDTOS[i].deliveryWay == 1) {
            orderlist1.push(orderProdDTOS[i]);
          } else {
            orderlist2.push(orderProdDTOS[i]);
          }
        }

        let deliverytype1;
        let deliverytype2;
        let consignee; //收件人

        let consigneePhone; //收件人电话

        let addressAll; //收件人地址

        let total1 = 0.00; //客房配送商品总价

        let total2 = 0.00; //快递到家商品总价

        let quantity1 = 0; //客房配送商品总数

        let quantity2 = 0; //快递到家商品总数

        if (orderlist1.length > 0) {
          //客房配送
          deliverytype1 = true;

          for (let i = 0; i < orderlist1.length; i++) {
            total1 = parseFloat(total1) + parseInt(orderlist1[i].prodCount) * parseFloat(orderlist1[i].hotelProductDTO.prodRetailPrice); //总价

            quantity1 = parseInt(quantity1) + parseInt(orderlist1[i].prodCount); //数量
          }
        } else {
          deliverytype1 = false;
          total1 = 0.00;
          quantity1 = 0;
        }

        if (orderlist2.length > 0) {
          //快递到家
          deliverytype2 = true;
          consignee = orderlist2[0].expressPerson;
          consigneePhone = orderlist2[0].expressPhone;
          addressAll = orderlist2[0].expressAddress;

          for (let i = 0; i < orderlist2.length; i++) {
            total2 = parseFloat(total2) + parseInt(orderlist2[i].prodCount) * parseFloat(orderlist2[i].hotelProductDTO.prodRetailPrice); //总价

            quantity2 = parseInt(quantity2) + parseInt(orderlist2[i].prodCount); //数量
          }
        } else {
          deliverytype2 = false;
          consignee = '';
          consigneePhone = '';
          addressAll = '';
          total2 = 0.00;
          quantity2 = 0;
        }

        that.setData({
          orderinfo: resdatas,
          deliverytype1: deliverytype1,
          deliverytype2: deliverytype2,
          orderlist1: orderlist1,
          orderlist2: orderlist2,
          consignee: consignee,
          //收件人
          consigneePhone: consigneePhone,
          //收件人电话
          addressAll: addressAll,
          //收件人地址
          total1: total1.toFixed(2),
          total2: total2.toFixed(2),
          quantity1: quantity1,
          quantity2: quantity2
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
    });
  },
  servicefun: function () {
    //联系客服
    const that = this;
    wx2my.makePhoneCall({
      phoneNumber: that.data.hotelBookingPhone
    });
  }
});