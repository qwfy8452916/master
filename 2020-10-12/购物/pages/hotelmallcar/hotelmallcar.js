const app = getApp();
import wxrequest from '../../request/api'
//delivWay 1：现场送，2：快递送 , 3：迷你吧，4：自提，5：电子券, 6：堂食，7：外卖，8：外带
Page({
  data: {
    isshowoffer: false,
    funcids: [],
    iscanbtn: 1,
    province: '',//省代号
    cabCode: '',
    userid: '',
    hotelid: '',
    hasprodlist: 0,//商品购物车是否有商品
    selectalltype: false,//全选
    roomFloor: '',//楼层
    roomCode: '',//房间号
    roomCodeN: '',
    roomCodetype: false,
    hotelName: '',//酒店名称
    receipttype: true,//收货信息是否需要填写
    receiptlist: '',//收货信息
    buylist: [],//购物车初始数据
    shopcartvoucherlist: [],//卡券购物车初始数据
    deliverylist1: [],//现场配送商品 
    deliverylist2: [],//快递配送商品
    deliverylist3: [],//迷你吧商品
    deliverylist4: [],//自提商品
    deliverylist5: [],//卡券商品
    lumpsum_amont: 0.00,//商品总额
    lumpsum: 0.00,//商品总额半价后
    lumpsum_Discount: 0.00,//商品优惠后总额
    alllength: 0,//计算商品种类总数
    coupon_selected: [],//已选优惠券
    coupon_optional: [],//可选优惠券
    coupontype: false,//是否显示优惠券
    coupontype2: false,//是否显示优惠券列表
    coupon_money: 0.00,//优惠总额
    points: [],
    prodvou: [],//商品抵扣券
    prodvou_select: [],//已选商品抵扣券
    prodvou_money: 0.00,//商品抵扣金额
    prodvou_name: '未选择免费领用券',
    prodvou_type: false,
    moneyvou: [],//现金抵扣券
    moneyvou_select: [],//已选现金抵扣券
    moneyvou_money: 0.00,//现金抵扣金额
    moneyvou_name: '未选择现金抵扣券',
    moneyvou_type: false,
    offeramont: 0.00,
    reliefamont: 0.00,
    selelist: [],
    wblogistics: '',
    lgcId: -1,
    lgcHotelId: '',
    lgcIdindex: 0,
    freight: 0.00,//物流运费
    ifshowRules:false,
    ruleData: {},
    carlist: [],
    iscanselectd: true
  },
  onLoad: function () {
    const that = this;
    that.setData({
      funcids: app.globalData.funcids,
      cabCode: app.globalData.cabCode,
      userid: app.globalData.userId,
      hotelid: app.globalData.hotelId,
      points: app.globalData.points,
      selectalltype: false,
      lumpsum: 0.00,
      lumpsum_Discount: 0.00
    });
    wx.getStorage({
      key: 'roomCode',
      success: function (res) {
        that.setData({
          roomCode: res.data,
          roomCodeN: res.data
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
  },
  onShow: function(){
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      coupontype: false,
      coupon_selected: [],
      alllength: 0,
      points: [],
      prodvou: [],//商品抵扣券
      prodvou_select: [],//已选商品抵扣券
      prodvou_money: 0.00,//商品抵扣金额
      prodvou_name: '未选择免费领用券',
      prodvou_type: false,
      moneyvou: [],//现金抵扣券
      moneyvou_select: [],//已选现金抵扣券
      moneyvou_money: 0.00,//现金抵扣金额
      moneyvou_name: '未选择现金抵扣券',
      moneyvou_type: false,
      selelist: []
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
      key: 'buylist',
      success: function (res) {
        that.setData({
          buylist: res.data
        });
      },
      fail: function () {
        const list = [];
        that.setData({
          buylist: list
        })
      }
    });
    wx.getStorage({
      key: 'shopcartvoucherlist',
      success: function (res) {
        that.setData({
          shopcartvoucherlist: res.data
        });
      },
      fail: function () {
        const list = [];
        that.setData({
          shopcartvoucherlist: list
        })
      }
    });
    wx.getStorage({
      key: 'money',
      success: function (res) {
        that.setData({
          money: res.data
        })
      },
      fail: function () {
        that.setData({
          money: 0.00
        })
      }
    });
    that.getSelectedaddress();
    setTimeout(function () {
      that.get_cardata();
    }, 300);
  },
  onUnload: function () {
    this.saveshopcardata();
  },
  get_cardata: function () {//合并购物车
    const that= this;
    let buy_list = JSON.stringify(that.data.buylist);
    buy_list = JSON.parse(buy_list);
    let dz_list = JSON.stringify(that.data.shopcartvoucherlist);
    dz_list = JSON.parse(dz_list);
    let cardata = buy_list.concat(dz_list);
    if (cardata.length == 0){
      that.setData({
        hasprodlist: 0,
        hasprodlist2: 0
      });
      wx.hideLoading();
      return;
    } else {
      for (let i = 0; i < cardata.length; i++){
        if (cardata[i].prodtype == 1){
          if (cardata[i].isFree == 1){
            cardata[i].prodRetailPrice = 0.00;
            cardata[i].totalprice = 0.00;
          }else{
            cardata[i].totalprice = cardata[i].latticeProdAmt;
          }
        } else {
          cardata[i].totalprice = cardata[i].prodRetailPrice * cardata[i].prodnum;
        }
      }
      console.log(cardata);
      that.put_shoppingCart(cardata);
    }
  },
  put_shoppingCart: function (cardata) {//获取购物车第二件半价
    const that = this;
    let carlist = JSON.stringify(cardata);
    const linkData = {
      shoppingCartProd: carlist
    }
    wxrequest.putshoppingCart(app.globalData.hotelId, linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let carlistdata = JSON.parse(resdatas);
        that.setData({
          carlist: carlistdata
        });
        that.classificationfun(carlistdata);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  classificationfun: function (shopcardata) {//拆分购物车
    const that = this;
    let pointsdata = that.data.points;
    let delivery_list1 = [];//现场配送商品
    let delivery_list2 = [];//快递配送商品
    let delivery_list3 = [];//迷你吧商品
    let delivery_list4 = [];//自提商品
    let delivery_list5 = [];//电子商品
    let hasprodlist_type = 0;
    let hasprodlist2_type = 0;
    let lumpsum_amont = 0.00;
    let lumpsumval = 0.00;//商品总价
    let reliefamont = 0.00;
    let selectdnum = 0;
    let allnum = 0;
    let isallselectd = false;
    for (let i = 0; i < shopcardata.length; i++){
      if (shopcardata[i].prodtype == 1){
        delivery_list3.push(shopcardata[i]);//迷你吧商品
      } else if (shopcardata[i].delivWay == 1) {
        delivery_list1.push(shopcardata[i]);//现场配送商品
      } else if (shopcardata[i].delivWay == 2) {
        delivery_list2.push(shopcardata[i]);//快递配送商品
      } else if (shopcardata[i].delivWay == 4) {
        delivery_list4.push(shopcardata[i]);//自提商品
      } else if (shopcardata[i].delivWay == 5) {
        delivery_list5.push(shopcardata[i]);//电子商品
      }
    }
    if(delivery_list3.length > 0 || delivery_list1.length > 0 || delivery_list2.length > 0 || delivery_list4.length > 0) {
      hasprodlist_type = 1;
    }
    if(delivery_list5.length > 0) {
      hasprodlist2_type = 1;
    }
    if (delivery_list2.length > 0){
      this.getSelectedaddress();
    }
    console.log(shopcardata)
    for (let i = 0; i < delivery_list1.length;i++){
      if(delivery_list1[i].selecttype) {
        lumpsum_amont = parseFloat(lumpsum_amont) + parseInt(delivery_list1[i].prodnum) * parseFloat(delivery_list1[i].prodRetailPrice);
        lumpsumval = parseFloat(lumpsumval) + parseFloat(delivery_list1[i].totalprice);
        selectdnum = selectdnum + 1;
        reliefamont = parseFloat(reliefamont) + parseFloat(delivery_list1[i].discountAmount);
      }
      for (let j = i+1; j < delivery_list1.length; j++) {
        if (delivery_list1[i].hotelProdId == delivery_list1[j].hotelProdId && delivery_list1[i].funcProdSpecId == delivery_list1[j].funcProdSpecId) {
          delivery_list1[i].prodnum = delivery_list1[i].prodnum + delivery_list1[j].prodnum;
          delivery_list1[i].totalprice = parseFloat(delivery_list1[i].totalprice) + parseFloat(delivery_list1[i].totalprice);
          delivery_list1[i].totalprice = delivery_list1[i].totalprice.toFixed(2);
          delivery_list1.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < delivery_list2.length; i++) {
      if(delivery_list2[i].selecttype) {
        lumpsum_amont = parseFloat(lumpsum_amont) + parseInt(delivery_list2[i].prodnum) * parseFloat(delivery_list2[i].prodRetailPrice);
        lumpsumval = parseFloat(lumpsumval) + parseFloat(delivery_list2[i].totalprice);
        selectdnum = selectdnum + 1;
        reliefamont = parseFloat(reliefamont) + parseFloat(delivery_list2[i].discountAmount);
      }
      for (let j = i+1; j < delivery_list2.length; j++) {
        if (delivery_list2[i].hotelProdId == delivery_list2[j].hotelProdId && delivery_list2[i].funcProdSpecId == delivery_list2[j].funcProdSpecId) {
          delivery_list2[i].prodnum = delivery_list2[i].prodnum + delivery_list2[j].prodnum;
          delivery_list2[i].totalprice = parseFloat(delivery_list2[i].totalprice) + parseFloat(delivery_list2[i].totalprice);
          delivery_list2[i].totalprice = delivery_list2[i].totalprice.toFixed(2);
          delivery_list2.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < delivery_list3.length; i++) {
      if(delivery_list3[i].selecttype) {
        lumpsum_amont = parseFloat(lumpsum_amont) + parseInt(delivery_list3[i].prodnum) * parseFloat(delivery_list3[i].prodRetailPrice);
        lumpsumval = parseFloat(lumpsumval) + parseFloat(delivery_list3[i].totalprice);
        selectdnum = selectdnum + 1;
        reliefamont = parseFloat(reliefamont) + parseFloat(delivery_list3[i].discountAmount);
      }
    }
    for (let i = 0; i < delivery_list4.length; i++) {
      if(delivery_list4[i].selecttype) {
        lumpsum_amont = parseFloat(lumpsum_amont) + parseInt(delivery_list4[i].prodnum) * parseFloat(delivery_list4[i].prodRetailPrice);
        lumpsumval = parseFloat(lumpsumval) + parseFloat(delivery_list4[i].totalprice);
        selectdnum = selectdnum + 1;
        reliefamont = parseFloat(reliefamont) + parseFloat(delivery_list4[i].discountAmount);
      }
      for (let j = i+1; j < delivery_list4.length; j++) {
        if (delivery_list4[i].hotelProdId == delivery_list4[j].hotelProdId && delivery_list4[i].funcProdSpecId == delivery_list4[j].funcProdSpecId) {
          delivery_list4[i].prodnum = delivery_list4[i].prodnum + delivery_list4[j].prodnum;
          delivery_list4[i].pointId = pointsdata[0].id;
          delivery_list4[i].totalprice = parseFloat(delivery_list4[i].totalprice) + parseFloat(delivery_list4[i].totalprice);
          delivery_list4[i].totalprice = delivery_list4[i].totalprice.toFixed(2);
          delivery_list4.splice(j, 1);
        }
      }
    }
    for (let i = 0; i < delivery_list5.length; i++) {
      if(delivery_list5[i].selecttype) {
        lumpsum_amont = parseFloat(lumpsum_amont) + parseInt(delivery_list5[i].prodnum) * parseFloat(delivery_list5[i].prodRetailPrice);
        lumpsumval = parseFloat(lumpsumval) + parseFloat(delivery_list5[i].totalprice);
        selectdnum = selectdnum + 1;
        reliefamont = parseFloat(reliefamont) + parseFloat(delivery_list5[i].discountAmount);
      }
      for (let j = i+1; j < delivery_list5.length; j++) {
        if (delivery_list5[i].hotelProdId == delivery_list5[j].hotelProdId) {
          delivery_list5[i].prodnum = delivery_list5[i].prodnum + delivery_list5[j].prodnum;
          delivery_list5[i].totalprice = parseFloat(delivery_list5[i].totalprice) + parseFloat(delivery_list5[i].totalprice);
          delivery_list5[i].totalprice = delivery_list5[i].totalprice.toFixed(2);
          delivery_list5.splice(j, 1);
        }
      }
    }
    allnum = delivery_list1.length + delivery_list2.length + delivery_list3.length + delivery_list4.length + delivery_list5.length;
    if(allnum == selectdnum) {
      isallselectd = true;
    }
    if(lumpsumval <= 0) {
      lumpsumval = 0.00;
    }
    console.log('减免金额'+reliefamont);
    lumpsum_amont = lumpsum_amont.toFixed(2);
    reliefamont = reliefamont.toFixed(2);
    lumpsumval = lumpsumval.toFixed(2);
    that.setData({
      lumpsum_amont: lumpsum_amont,
      reliefamont: reliefamont,
      lumpsum: lumpsumval,
      selectalltype: isallselectd,
      hasprodlist: hasprodlist_type,
      hasprodlist2: hasprodlist2_type,
      deliverylist1: delivery_list1,//现场配送商品
      deliverylist2: delivery_list2,//快递配送商品
      deliverylist3: delivery_list3,//迷你吧商品
      deliverylist4: delivery_list4,//自提商品
      deliverylist5: delivery_list5//电子商品
    });
    wx.setStorage({
      key: 'deliverylist1',
      data: delivery_list1,
    });
    wx.setStorage({
      key: 'deliverylist2',
      data: delivery_list2,
    });
    wx.setStorage({
      key: 'deliverylist3',
      data: delivery_list3,
    });
    wx.setStorage({
      key: 'deliverylist4',
      data: delivery_list4,
    });
    wx.setStorage({
      key: 'deliverylist5',
      data: delivery_list5,
    });
    if(selectdnum > 0) {
      that.post_prodvou();//获取用户在酒店可用商品抵扣券
    } else {
      that.setData({
        iscanselectd: true
      })
      wx.hideLoading();
    }
  },
  get_mergecardata: function () {//合并购物车2
    const that = this;
    that.setData({
      coupon_selected: [],//已选优惠券
      coupon_optional: [],//可选优惠券
      coupontype: false,//是否显示优惠券
      coupontype2: false,//是否显示优惠券列表
      prodvou: [],//商品抵扣券
      prodvou_select: [],//已选商品抵扣券
      prodvou_money: 0.00,//商品抵扣金额
      prodvou_name: '未选择免费领用券',
      prodvou_type: false,
      moneyvou: [],//现金抵扣券
      moneyvou_select: [],//已选现金抵扣券
      moneyvou_money: 0.00,//现金抵扣金额
      moneyvou_name: '未选择现金抵扣券',
      moneyvou_type: false,
      lumpsum: 0.00,//商品总额
      lumpsum_Discount: 0.00//商品优惠后总额
    });
    let checkbox_listh_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listh_1 = JSON.parse(checkbox_listh_1);
    let checkbox_listh_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listh_2 = JSON.parse(checkbox_listh_2);
    let checkbox_listh_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listh_3 = JSON.parse(checkbox_listh_3);
    let checkbox_listh_4 = JSON.stringify(that.data.deliverylist4);
    checkbox_listh_4 = JSON.parse(checkbox_listh_4);
    let checkbox_listh_5 = JSON.stringify(that.data.deliverylist5);
    checkbox_listh_5 = JSON.parse(checkbox_listh_5);
    let cardata = checkbox_listh_1.concat(checkbox_listh_2);
    cardata = cardata.concat(checkbox_listh_3);
    cardata = cardata.concat(checkbox_listh_4);
    cardata = cardata.concat(checkbox_listh_5);

    cardata = cardata.map(item => {
      item.totalprice = item.prodnum * item.prodRetailPrice;
      return item;
    });
    console.log(cardata);

    that.put_shoppingCart(cardata);
  },
  getSelectedaddress: function () {//获取选中地址
    const that = this;
    wx.getStorage({
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
              // that.get_logisticslist(app.globalData.funcids);
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000
              })
            }
          })
          .catch(err => {
            wx.hideLoading();
            console.log(err);
          });
        }
      },
      fail: function (res) {//获取默认地址
        that.getdefault();
      }
    });
  },
  getdefault: function () {//获取默认地址
    const that = this;
    let linkData = {
      customerId: app.globalData.userId
    };
    wxrequest.getdefaultaddress(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (res.statusCode != 200) {//如果没有默认地址
        that.setData({
          receipttype: true
        })
      } else {
        if (resdata.code == 0) {
          if(resdatas == '' || resdatas == null){
            that.setData({
              receipttype: true
            });
          } else {
            that.setData({
              receiptlist: resdatas,
              province: resdatas.province,
              receipttype: false
            });
          }
          // that.get_logisticslist(app.globalData.funcids);
        }
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  checkboxChange: function(e){//商品选择
    const that = this;
    if(!that.data.iscanselectd) {
      return false;
    }
    that.setData({
      coupon_selected: [],
      iscanselectd: false
    });
    const index = e.currentTarget.dataset.index;
    const prodtype = e.currentTarget.dataset.prodtype;
    let checkbox_lista_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_lista_1 = JSON.parse(checkbox_lista_1);
    let checkbox_lista_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_lista_2 = JSON.parse(checkbox_lista_2);
    let checkbox_lista_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_lista_3 = JSON.parse(checkbox_lista_3);
    let checkbox_lista_4 = JSON.stringify(that.data.deliverylist4);
    checkbox_lista_4 = JSON.parse(checkbox_lista_4);
    let checkbox_lista_5 = JSON.stringify(that.data.deliverylist5);
    checkbox_lista_5 = JSON.parse(checkbox_lista_5);
    if(prodtype == 1){//店内送
      checkbox_lista_1[index].selecttype = !checkbox_lista_1[index].selecttype;
    } else if (prodtype == 2) {//快递送
      checkbox_lista_2[index].selecttype = !checkbox_lista_2[index].selecttype;
    } else if (prodtype == 3) {//迷你吧
      checkbox_lista_3[index].selecttype = !checkbox_lista_3[index].selecttype;
    } else if (prodtype == 4) {//自提取
      checkbox_lista_4[index].selecttype = !checkbox_lista_4[index].selecttype;
    } else if (prodtype == 5) {//电子
      checkbox_lista_5[index].selecttype = !checkbox_lista_5[index].selecttype;
    }
    let allnum = 0;
    let allnum2 = checkbox_lista_1.length + checkbox_lista_2.length + checkbox_lista_3.length + checkbox_lista_4.length + checkbox_lista_5.length;
    if (checkbox_lista_1.length > 0){
      for (let i = 0; i < checkbox_lista_1.length; i++){
        if (checkbox_lista_1[i].selecttype == true){
          allnum += 1;
        } else {
          checkbox_lista_1[i].totalprice = checkbox_lista_1[i].prodnum * checkbox_lista_1[i].prodRetailPrice;
          checkbox_lista_1[i].totalprice = checkbox_lista_1[i].totalprice.toFixed(2);
        }
      }
    }
    if (checkbox_lista_2.length > 0){
      for (let i = 0; i < checkbox_lista_2.length; i++) {
        if (checkbox_lista_2[i].selecttype == true) {
          allnum += 1;
        } else {
          checkbox_lista_1[i].totalprice = checkbox_lista_1[i].prodnum * checkbox_lista_1[i].prodRetailPrice;
          checkbox_lista_1[i].totalprice = checkbox_lista_1[i].totalprice.toFixed(2);
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
    if (checkbox_lista_4.length > 0) {
      for (let i = 0; i < checkbox_lista_4.length; i++) {
        if (checkbox_lista_4[i].selecttype == true) {
          allnum += 1;
        }
      }
    }
    if (checkbox_lista_5.length > 0) {
      for (let i = 0; i < checkbox_lista_5.length; i++) {
        if (checkbox_lista_5[i].selecttype == true) {
          allnum += 1;
        }
      }
    }
    if (allnum == 0){
      that.setData({
        selectalltype: false,
        alllength: 0
      })
    }else if (allnum != allnum2) {
      that.setData({
        selectalltype: false,
        alllength: allnum
      })
    } else {
      that.setData({
        selectalltype: true,
        alllength: allnum
      })
    }
    that.setData({
      deliverylist1: checkbox_lista_1,
      deliverylist2: checkbox_lista_2,
      deliverylist3: checkbox_lista_3,
      deliverylist4: checkbox_lista_4,
      deliverylist5: checkbox_lista_5,
    });
    setTimeout(function(){
      that.get_mergecardata();
    }, 300);
  },
  selectall: function(){//全选
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      coupon_selected: []
    });
    let offeramontval = that.data.offeramont;
    let selectalltype = !that.data.selectalltype;//选择状态
    let checkbox_listf_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listf_1 = JSON.parse(checkbox_listf_1);
    let checkbox_listf_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listf_2 = JSON.parse(checkbox_listf_2);
    let checkbox_listf_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listf_3 = JSON.parse(checkbox_listf_3);
    let checkbox_listf_4 = JSON.stringify(that.data.deliverylist4);
    checkbox_listf_4 = JSON.parse(checkbox_listf_4);
    let checkbox_listf_5 = JSON.stringify(that.data.deliverylist5);
    checkbox_listf_5 = JSON.parse(checkbox_listf_5);
    let alllength = checkbox_listf_1.length + checkbox_listf_2.length + checkbox_listf_3.length + checkbox_listf_4.length + checkbox_listf_5.length;
    if (checkbox_listf_1.length > 0){
      for (let i = 0; i < checkbox_listf_1.length; i++){
        checkbox_listf_1[i].selecttype = selectalltype;
      }
      that.setData({
        deliverylist1: checkbox_listf_1
      })
    }
    if (checkbox_listf_2.length > 0) {
      for (let i = 0; i < checkbox_listf_2.length; i++) {
        checkbox_listf_2[i].selecttype = selectalltype;
      }
      that.setData({
        deliverylist2: checkbox_listf_2
      })
    }
    if (checkbox_listf_3.length > 0) {
      for (let i = 0; i < checkbox_listf_3.length; i++) {
        checkbox_listf_3[i].selecttype = selectalltype;
      }
      that.setData({
        deliverylist3: checkbox_listf_3
      })
    }
    if (checkbox_listf_4.length > 0) {
      for (let i = 0; i < checkbox_listf_4.length; i++) {
        checkbox_listf_4[i].selecttype = selectalltype;
      }
      that.setData({
        deliverylist4: checkbox_listf_4
      })
    }
    if (checkbox_listf_5.length > 0) {
      for (let i = 0; i < checkbox_listf_5.length; i++) {
        checkbox_listf_5[i].selecttype = selectalltype;
      }
      that.setData({
        deliverylist5: checkbox_listf_5
      })
    }
    if (!selectalltype){
      alllength = 0;
      offeramontval = 0.00;
    }
    that.setData({
      selectalltype: selectalltype,
      alllength: alllength,
      offeramont: offeramontval
    });
    setTimeout(function(){
      that.get_mergecardata();
    }, 300);
  },
  cutback: function(e){//减少
    const that = this;
    that.setData({
      coupon_selected: []
    });
    let index = e.currentTarget.dataset.index;//下标
    let listtype = e.currentTarget.dataset.listtype;//数组类别
    let checkbox_listd_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listd_1 = JSON.parse(checkbox_listd_1);
    let checkbox_listd_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listd_2 = JSON.parse(checkbox_listd_2);
    let checkbox_listd_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listd_3 = JSON.parse(checkbox_listd_3);
    let checkbox_listd_4 = JSON.stringify(that.data.deliverylist4);
    checkbox_listd_4 = JSON.parse(checkbox_listd_4);
    let checkbox_listd_5 = JSON.stringify(that.data.deliverylist5);
    checkbox_listd_5 = JSON.parse(checkbox_listd_5);
    let changelist = [];
    if (listtype == 1) {//现场送
      changelist = checkbox_listd_1;
    } else if (listtype == 2) {//快递配送
      changelist = checkbox_listd_2;
    } else if (listtype == 3) {//迷你吧
      changelist = checkbox_listd_3;
    } else if (listtype == 4) {//自提
      changelist = checkbox_listd_4;
    } else if (listtype == 5) {//卡券
      changelist = checkbox_listd_5;
    }
    if (changelist[index].prodnum <= 1) {
      wx.showModal({
        title: '提示',
        content: '您确实删除此商品吗？',
        success(res) {
          if (res.confirm) {
            changelist.splice(index,1);
            that.cutbackfun(listtype, changelist);
          }
        }
      })
    }else{
      changelist[index].prodnum = changelist[index].prodnum - 1;
      changelist[index].totalprice = parseInt(changelist[index].prodnum) * parseFloat(changelist[index].prodRetailPrice);
      that.cutbackfun(listtype, changelist);
    }
  },
  cutbackfun (listtype, changelist) {
    const that = this;
    if (listtype == 1) {//现场送
      that.setData({
        deliverylist1: changelist
      });
    } else if (listtype == 2) {//快递配送
      that.setData({
        deliverylist2: changelist
      });
    } else if (listtype == 3) {//迷你吧
      that.setData({
        deliverylist3: changelist
      });
    } else if (listtype == 4) {//自提
      that.setData({
        deliverylist4: changelist
      });
    } else if (listtype == 5) {//卡券
      that.setData({
        deliverylist5: changelist
      });
    }
    setTimeout(function(){
      that.get_mergecardata();
    }, 300);
  },
  increase: function(e){//增加
    const that = this;
    if(that.data.iscanbtn == 0) {
      return false
    }
    that.setData({
      coupon_selected: [],
      iscanbtn: 0
    });
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    setTimeout(function(){
      let cabCode = that.data.cabCode;
      let hotelid = that.data.hotelid;
      let index = e.currentTarget.dataset.index;//下标
      let listtype = e.currentTarget.dataset.listtype;//数组类别
      let prod_Amt = e.currentTarget.dataset.pordamt;//商品当前数量
      prod_Amt = prod_Amt + 1;
      let checkbox_liste_1 = JSON.stringify(that.data.deliverylist1);
      checkbox_liste_1 = JSON.parse(checkbox_liste_1);
      let checkbox_liste_2 = JSON.stringify(that.data.deliverylist2);
      checkbox_liste_2 = JSON.parse(checkbox_liste_2);
      let checkbox_liste_3 = JSON.stringify(that.data.deliverylist3);
      checkbox_liste_3 = JSON.parse(checkbox_liste_3);
      let checkbox_liste_4 = JSON.stringify(that.data.deliverylist4);
      checkbox_liste_4 = JSON.parse(checkbox_liste_4);
      let checkbox_liste_5 = JSON.stringify(that.data.deliverylist5);
      checkbox_liste_5 = JSON.parse(checkbox_liste_5);
      let changelist = [];
      if (listtype == 1) {//现场送
        changelist = checkbox_liste_1;
      } else if (listtype == 2) {//快递配送
        changelist = checkbox_liste_2;
      } else if (listtype == 3) {//迷你吧
        changelist = checkbox_liste_3;
      } else if (listtype == 4) {//自提
        changelist = checkbox_liste_4;
      } else if (listtype == 5) {//卡券
        changelist = checkbox_liste_5;
      }
      cabCode = '';
      wx.setStorageSync("plustype", 1);
      that.testadd(cabCode, hotelid, changelist[index].hotelProdId, changelist[index].funcProdSpecId, prod_Amt);
      setTimeout(function(){
        if (wx.getStorageSync('plustype') == 0) {
          wx.setStorage({
            key: "plustype",
            data: 1
          });
          wx.hideLoading();
          return;
        } else {
          changelist[index].prodnum += 1;
          changelist[index].totalprice = parseFloat(changelist[index].prodnum) * parseFloat(changelist[index].prodRetailPrice);
          if (listtype == 1) {//现场送
            that.setData({
              deliverylist1: changelist
            });
          } else if (listtype == 2) {//快递配送
            that.setData({
              deliverylist2: changelist
            });
          } else if (listtype == 3) {//迷你吧
            that.setData({
              deliverylist3: changelist
            });
          } else if (listtype == 4) {//自提
            that.setData({
              deliverylist4: changelist
            });
          } else if (listtype == 5) {//卡券
            that.setData({
              deliverylist5: changelist
            });
          }
        }
      },300);
      that.setData({
        iscanbtn: 1
      });
      setTimeout(function(){
        that.get_mergecardata();
      }, 600);
    },300);
  },
  checkshopcar: function (checkbox_listd_1, checkbox_listd_2, checkbox_listd_3, checkbox_listd_4, checkbox_listd_5) {//校验购物车
    const that = this;
    that.post_prodvou();
    if (checkbox_listd_1.length <= 0 && checkbox_listd_2.length <= 0 && checkbox_listd_3.length <= 0 && checkbox_listd_4.length <= 0) {
      that.setData({
        hasprodlist: 0
      });
    }
    if(checkbox_listd_5.length <= 0){
      that.setData({
        hasprodlist2: 0
      });
    }
  },
  addressfun: function(){//地址
    wx.navigateTo({
      url: '../hotelmalladdress/hotelmalladdress'
    })
  },
  checkcoupon: function () {//校验已选优惠券是否可用
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    const hotelid = that.data.hotelid;
    const userid = that.data.userid;
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    const datajson = that.getdata();
    const minlist = datajson.minlist;
    const finclist = datajson.finclist;
    const selected_id = datajson.selected_id;
    let prodList = minlist.concat(finclist);
    if (selected_id.length != 0) {
      let linkData = {
        prodList: prodList,//已选商品
        couponIds: selected_id,//已选优惠券id
        cusId: userid,
        hotelId: hotelid
      };
      wxrequest.postverifyavailable(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          if (!resdatas) {//有不可用的券
            wx.showToast({
              title: '您选的优惠券中有不可用的优惠券，请重新选择优惠券',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              coupon_selected: []
            });
            that.getcouponlist(1);
            wx.hideLoading();
          } else {
            that.settlementfun();//结算
          }
        } else {
          wx.showToast({
            title: resdata.msg,
            icon: 'none',
            duration: 2000
          });
          that.setData({
            coupon_selected: []
          });
          that.getcouponlist(1);
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
    } else {
      that.settlementfun();//结算
    }
  },
  settlementfun: function(){//结算  
    const that = this;
    let checkbox_listh_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listh_1 = JSON.parse(checkbox_listh_1);
    let checkbox_listh_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listh_2 = JSON.parse(checkbox_listh_2);
    let checkbox_listh_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listh_3 = JSON.parse(checkbox_listh_3);
    let checkbox_listh_4 = JSON.stringify(that.data.deliverylist4);
    checkbox_listh_4 = JSON.parse(checkbox_listh_4);
    let checkbox_listh_5 = JSON.stringify(that.data.deliverylist5);
    checkbox_listh_5 = JSON.parse(checkbox_listh_5);
    const receipttype = that.data.receipttype;
    let selectnum1 = 0;
    let selectnum2 = 0;
    let selectnum3 = 0;
    let selectnum4 = 0;
    let selectnum5 = 0;
    let selectnum = 0;
    let orderlist1 = [];//订单-客房配送
    let orderlist2 = [];//订单-快递到家
    let orderlist3 = [];//订单-迷你吧
    let orderlist4 = [];//订单-自提
    let orderlist5 = [];//订单-卡券
    if (checkbox_listh_1.length > 0){
      for (let i = 0; i < checkbox_listh_1.length; i++){
        if (checkbox_listh_1[i].selecttype){
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
    if (checkbox_listh_4.length > 0) {
      for (let i = 0; i < checkbox_listh_4.length; i++) {
        if (checkbox_listh_4[i].selecttype) {
          selectnum4 += 1;
          orderlist4.push(checkbox_listh_4[i]);
          checkbox_listh_4[i].selecttype = false;
        }
      }
    }
    if (checkbox_listh_5.length > 0) {
      for (let i = 0; i < checkbox_listh_5.length; i++) {
        if (checkbox_listh_5[i].selecttype) {
          selectnum5 += 1;
          orderlist5.push(checkbox_listh_5[i]);
          checkbox_listh_5[i].selecttype = false;
        }
      }
    }
    selectnum = selectnum1 + selectnum2 + selectnum3 + selectnum4 + selectnum5;
    if (selectnum2 > 0){
      if (receipttype) {
        wx.showToast({
          title: '请填写快递收件信息',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    if (selectnum == 0) {
      wx.showToast({
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
      deliverylist1: checkbox_listh_1,//现场配送商品
      deliverylist2: checkbox_listh_2,//快递配送商品
      deliverylist3: checkbox_listh_3,//迷你吧商品
      deliverylist4: checkbox_listh_4,//自提商品
      deliverylist5: checkbox_listh_5,//卡券
      selectalltype: false,
      lumpsum: 0.00,
      lumpsum_Discount: 0.00
    });
    wx.setStorage({
      key: 'prodvouIds',
      data: that.data.prodvou_select,
    });
    wx.setStorage({
      key: 'moneyvouId',
      data: that.data.moneyvou_select,
    });
    wx.setStorage({
      key: 'deliverylist1',
      data: checkbox_listh_1,
    });
    wx.setStorage({
      key: 'deliverylist2',
      data: checkbox_listh_2,
    });
    wx.setStorage({
      key: 'deliverylist3',
      data: checkbox_listh_3,
    });
    wx.setStorage({
      key: 'deliverylist4',
      data: checkbox_listh_4,
    });
    wx.setStorage({
      key: 'deliverylist5',
      data: checkbox_listh_5,
    });
    wx.setStorage({
      key: 'orderlist1',
      data: orderlist1,
    });
    wx.setStorage({
      key: 'orderlist2',
      data: orderlist2,
    });
    wx.setStorage({
      key: 'orderlist3',
      data: orderlist3,
    });
    wx.setStorage({
      key: 'orderlist4',
      data: orderlist4,
    });
    wx.setStorage({
      key: 'orderlist5',
      data: orderlist5,
    });
    wx.setStorage({
      key: 'coupon_selected',
      data: that.data.coupon_selected,
    });

    let shopcatlist = [...checkbox_listh_1,...checkbox_listh_2,...checkbox_listh_3,...checkbox_listh_4];

    wx.setStorage({
      key: 'buylist',
      data: shopcatlist
    });
    wx.setStorage({
      key: 'shopcartvoucherlist',
      data: checkbox_listh_5
    });

    wx.hideLoading();
    wx.navigateTo({
      url: '../hotelmallorder/hotelmallorder?lumpsum=' + lump_sum + '&province=' + that.data.province + "&lump_sum_discount=" + lump_sum_Discount + '&lgcid=' + that.data.lgcId + '&lgchotelid=' + that.data.lgcHotelId + '&freight=' + that.data.freight + '&lgcidindex=' + that.data.lgcIdindex
    });
  },
  testadd: function (cabCode, hotelId, hotelProdId, funcProdSpecId, prod_Amt) {//检验商品是否可以增加数量
    const that = this;
    let prodamt = parseInt(prod_Amt) + 1;
    let linkData = {
      cabCode: cabCode,
      hotelId: hotelId,
      hotelProdId: hotelProdId,
      prodAmt: prodamt,
      funcProdSpecId: funcProdSpecId
    };
    wxrequest.testprodnum(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.setStorageSync("plustype", 1);
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        wx.setStorageSync("plustype", 0);
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  showcoupon: function () {//显示优惠券列表
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
  getcouponlist: function (type) {//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let coupon_selected = JSON.stringify(that.data.coupon_selected);//已选优惠券
    coupon_selected = JSON.parse(coupon_selected);
    const datajson = that.getdata();
    const minlist = datajson.minlist;
    const finclist = datajson.finclist;
    const selected_id = datajson.selected_id;
    if (minlist.length != 0 || finclist.length != 0){
      let linkData = {
        prodList: that.data.selelist,//已选商品prodList
        couponIds: selected_id,//已选优惠券id
        cusId: app.globalData.userId,
        hotelId: app.globalData.hotelId
      };
      wxrequest.getcancouponlist(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          let listdata_selected = coupon_selected;//已选
          let listdata_optional = [];//可选
          let coupontype = true;
          if (coupon_selected.length == 0 && type == 1 && resdatas.length > 0) {//如果没有已选，则取第一个可选优惠券为已选优惠券
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
          if (coupon_selected.length == 0 && type == 1) {//如果没有已选，则取第一个可选优惠券为已选优惠券
            setTimeout(function(){
              that.getcouponlist();
            },500);
          }
          that.get_moneyvou(listdata_selected);
          wx.hideLoading();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
    } else {
      that.setData({
        coupontype: false
      });
      wx.hideLoading();
      that.get_moneyvou(that.data.coupon_selected);
    }
  },
  changecoupon: function (e) {//修改已选优惠券
    const that = this;
    const edata = e.currentTarget.dataset;
    let coupon_selected = that.data.coupon_selected;//已选优惠券
    let coupon_optional = that.data.coupon_optional;//可选优惠券
    if (edata.type == 1) {//删除优惠券
      coupon_selected.splice(edata.index, 1);
    } else {//添加优惠券
      if(coupon_optional[edata.index].couponLimit == 0){
        coupon_selected = [],
        coupon_selected.push(coupon_optional[edata.index]);
      } else {
        coupon_selected.push(coupon_optional[edata.index]);
      } 
    }
    that.setData({
      coupon_selected: coupon_selected
    });
    that.getcouponlist();
  },
  calculation: function (listdata) {//计算优惠后金额
    const that = this;
    let checkbox_listc_1 = JSON.stringify(that.data.deliverylist1);
    checkbox_listc_1 = JSON.parse(checkbox_listc_1);
    let checkbox_listc_2 = JSON.stringify(that.data.deliverylist2);
    checkbox_listc_2 = JSON.parse(checkbox_listc_2);
    let checkbox_listc_3 = JSON.stringify(that.data.deliverylist3);
    checkbox_listc_3 = JSON.parse(checkbox_listc_3);
    let checkbox_listc_4 = JSON.stringify(that.data.deliverylist4);
    checkbox_listc_4 = JSON.parse(checkbox_listc_4);
    let checkbox_listc_5 = JSON.stringify(that.data.deliverylist5);
    checkbox_listc_5 = JSON.parse(checkbox_listc_5);
    const lumpsum = parseFloat(that.data.lumpsum);//商品总额
    let lumpsum_Discount = parseFloat(that.data.lumpsum_Discount);//商品优惠后总额
    const prodvou_money = parseFloat(that.data.prodvou_money);//商品抵扣金额
    const moneyvou_money = parseFloat(that.data.moneyvou_money);//现金抵扣金额
    const coupon_selected = listdata;//已选优惠券
    const reliefamont = parseFloat(that.data.reliefamont);
    let discount = 0.00;//优惠金额
    let offeramont_val = 0.00;
    for (let i = 0; i<coupon_selected.length; i++) {
      discount = parseFloat(discount) + parseFloat(coupon_selected[i].reduceMoney);
    }
    lumpsum_Discount = parseFloat(lumpsum) - parseFloat(prodvou_money) - parseFloat(discount) - parseFloat(moneyvou_money);
    if(lumpsum_Discount < 0) {
      lumpsum_Discount = 0.00;
    }
    offeramont_val = parseFloat(discount) + parseFloat(prodvou_money) + parseFloat(moneyvou_money) + parseFloat(reliefamont);
    offeramont_val = offeramont_val.toFixed(2);
    lumpsum_Discount = lumpsum_Discount.toFixed(2);
    discount = discount.toFixed(2);
    console.log('共优惠'+offeramont_val)
    that.setData({
      coupon_money: discount,
      offeramont: offeramont_val,
      lumpsum_Discount: lumpsum_Discount,
      iscanselectd: true
    });
    wx.hideLoading();
  },
  getdata() {//获取minlist、finclist
    const that = this;
    let datajson = {};
    let minlist = [];//酒店商品id
    let finclist = [];//功能区商品id+商品总价
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let selected_id = [];//已选优惠券id
    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }
    let checkbox_listh_1 = JSON.stringify(that.data.deliverylist1);//现场配送商品
    checkbox_listh_1 = JSON.parse(checkbox_listh_1);
    let checkbox_listh_2 = JSON.stringify(that.data.deliverylist2);//快递配送商品
    checkbox_listh_2 = JSON.parse(checkbox_listh_2);
    let checkbox_listh_3 = JSON.stringify(that.data.deliverylist3);//迷你吧商品
    checkbox_listh_3 = JSON.parse(checkbox_listh_3);
    let checkbox_listh_4 = JSON.stringify(that.data.deliverylist4);//卡券商品
    checkbox_listh_4 = JSON.parse(checkbox_listh_4);
    let checkbox_listh_5 = JSON.stringify(that.data.deliverylist5);//卡券商品
    checkbox_listh_5 = JSON.parse(checkbox_listh_5);
    if (checkbox_listh_1.length > 0) {//现场配送商品
      for (let i = 0; i < checkbox_listh_1.length; i++) {
        if (checkbox_listh_1[i].selecttype) {
          let datainfo = {};
          datainfo.funcId = checkbox_listh_1[i].funcId;
          datainfo.funcProdId = checkbox_listh_1[i].funcProdId;
          datainfo.funcProdSpecId = checkbox_listh_1[i].funcProdSpecId;
          datainfo.hotelProdId = checkbox_listh_1[i].hotelProdId;
          datainfo.prodOwnerOrgId = checkbox_listh_1[i].prodOwnerOrgId;
          datainfo.prodCount = checkbox_listh_1[i].prodnum;
          if(checkbox_listh_1[i].discountPrice != '') {
            datainfo.prodPrice = checkbox_listh_1[i].discountPrice;
          } else {
            datainfo.prodPrice = checkbox_listh_1[i].prodRetailPrice;
          }
          datainfo.totalAmount = checkbox_listh_1[i].totalprice;
          finclist.push(datainfo);
        }
      }
    }
    if (checkbox_listh_2.length > 0) {//快递配送商品
      for (let i = 0; i < checkbox_listh_2.length; i++) {
        if (checkbox_listh_2[i].selecttype) {
          let datainfo = {};
          datainfo.funcId = checkbox_listh_2[i].funcId;
          datainfo.funcProdId = checkbox_listh_2[i].funcProdId;
          datainfo.funcProdSpecId = checkbox_listh_2[i].funcProdSpecId;
          datainfo.hotelProdId = checkbox_listh_2[i].hotelProdId;
          datainfo.prodOwnerOrgId = checkbox_listh_2[i].prodOwnerOrgId;
          datainfo.prodCount = checkbox_listh_2[i].prodnum;
          if(checkbox_listh_2[i].discountPrice != '') {
            datainfo.prodPrice = checkbox_listh_2[i].discountPrice;
          } else {
            datainfo.prodPrice = checkbox_listh_2[i].prodRetailPrice;
          }
          datainfo.totalAmount = checkbox_listh_2[i].totalprice;
          finclist.push(datainfo);
        }
      }
    }
    if (checkbox_listh_3.length > 0) {//迷你吧商品
      for (let i = 0; i < checkbox_listh_3.length; i++) {
        if (checkbox_listh_3[i].selecttype) {
          let datainfo = {};
          datainfo.hotelProdId = checkbox_listh_3[i].hotelProdId;
          datainfo.funcProdSpecId = 0;
          datainfo.prodOwnerOrgId = checkbox_listh_3[i].prodOwnerOrgId;
          datainfo.prodCount = checkbox_listh_3[i].prodnum;
          if(checkbox_listh_3[i].discountPrice != '') {
            datainfo.prodPrice = checkbox_listh_3[i].discountPrice;
          } else {
            datainfo.prodPrice = checkbox_listh_3[i].prodRetailPrice;
          }
          datainfo.totalAmount = checkbox_listh_3[i].totalprice;
          minlist.push(datainfo);
        }
      }
    }
    if (checkbox_listh_4.length > 0) {//自提商品
      for (let i = 0; i < checkbox_listh_4.length; i++) {
        if (checkbox_listh_4[i].selecttype) {
          let datainfo = {};
          datainfo.funcId = checkbox_listh_4[i].funcId;
          datainfo.funcProdId = checkbox_listh_4[i].funcProdId;
          datainfo.funcProdSpecId = checkbox_listh_4[i].funcProdSpecId;
          datainfo.hotelProdId = checkbox_listh_4[i].hotelProdId;
          datainfo.prodOwnerOrgId = checkbox_listh_4[i].prodOwnerOrgId;
          datainfo.prodCount = checkbox_listh_4[i].prodnum;
          if(checkbox_listh_4[i].discountPrice != '') {
            datainfo.prodPrice = checkbox_listh_4[i].discountPrice;
          } else {
            datainfo.prodPrice = checkbox_listh_4[i].prodRetailPrice;
          }
          datainfo.totalAmount = checkbox_listh_4[i].totalprice;
          finclist.push(datainfo);
        }
      }
    }
    if (checkbox_listh_5.length > 0) {//卡券商品
      for (let i = 0; i < checkbox_listh_5.length; i++) {
        if (checkbox_listh_5[i].selecttype) {
          let datainfo = {};
          datainfo.funcId = checkbox_listh_5[i].funcId;
          datainfo.funcProdId = checkbox_listh_5[i].funcProdId;
          datainfo.funcProdSpecId = 0;
          datainfo.hotelProdId = checkbox_listh_5[i].hotelProdId;
          datainfo.prodOwnerOrgId = checkbox_listh_5[i].prodOwnerOrgId;
          datainfo.prodCount = checkbox_listh_5[i].prodnum;
          if(checkbox_listh_5[i].discountPrice != '') {
            datainfo.prodPrice = checkbox_listh_5[i].discountPrice;
          } else {
            datainfo.prodPrice = checkbox_listh_5[i].prodRetailPrice;
          }
          datainfo.totalAmount = checkbox_listh_5[i].totalprice;
          finclist.push(datainfo);
        }
      }
    }
    datajson.minlist = minlist;
    datajson.finclist = finclist;
    datajson.selected_id = selected_id;
    return datajson;
  },
  prodvoutoggle: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    that.setData({
      prodvou_type: !that.data.prodvou_type
    });
    if(edata.type == 1) {
      that.setData({
        coupon_selected: []
      });
      const list_data = that.getdata();
      const minlist = list_data.minlist;
      const finclist = list_data.finclist;
      let prod_list = minlist.concat(finclist);
      that.post_prodlist(prod_list);
    }
  },
  moneyvoutoggle: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    that.setData({
      moneyvou_type: !that.data.moneyvou_type
    });
    if(edata.type == 1) {
      that.calculation(that.data.coupon_selected);
    }
  },
  post_prodvou: function () {//获取用户在酒店可用商品抵扣券
    const that = this;
    const list_data = that.getdata();
    const minlist = list_data.minlist;
    const finclist = list_data.finclist;
    let prod_list = minlist.concat(finclist);
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodList: prod_list
    };
    wxrequest.postprodvou(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        for(let i=0;i<resdatas.length;i++){
          resdatas[i].seletype = false;
        }
        that.setData({
          prodvou: resdatas
        });
        that.post_prodlist(prod_list);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  post_prodlist: function (listdata) {//筛选出未使用卡券的商品
    const that = this;
    let linkData = {
      cusId: app.globalData.userId,
      hotelId: app.globalData.hotelId,
      vouIds: that.data.prodvou_select,
      prodList: listdata
    };
    wxrequest.postprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          selelist: resdatas
        });
        that.getcouponlist(1);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  get_moneyvou: function (listdata) {//获取用户在酒店可用现金抵扣卡券
    const that = this;
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let selected_id = [];//已选优惠券id
    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodList: that.data.selelist,
      couponIds: selected_id//优惠券id_list
    };
    wxrequest.getmoneyvou(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        for(let i=0;i<resdatas.length;i++){
          resdatas[i].seletype = false;
        }
        that.setData({
          moneyvou: resdatas,
          moneyvou_select: [],//已选现金抵扣券
          moneyvou_money: 0.00,//现金抵扣金额
          moneyvou_name: '未选择现金抵扣券',
        });
        that.calculation(listdata);
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  changeprodvou: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    let prodvou_list = that.data.prodvou;
    let money = 0.00;
    let prodvou_name = '未选择免费领用券';
    prodvou_list[edata.index].seletype = !prodvou_list[edata.index].seletype;
    let list = [];
    let indexnum = -1;
    for(let i=0;i<prodvou_list.length;i++){
      if(prodvou_list[i].seletype){
        list.push(prodvou_list[i].id);
        money += parseFloat(prodvou_list[i].prodPrice);
        indexnum = i;
      }
    }
    if(indexnum >= 0) {
      prodvou_name = prodvou_list[indexnum].vouName + '...';
    }
    money = money.toFixed(2);
    that.setData({
      prodvou: prodvou_list,
      prodvou_select: list,
      prodvou_money: money,
      prodvou_name: prodvou_name
    });
  },
  changemoneyvou: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset;
    let moneyvou_list = that.data.moneyvou;
    let moneyvou_name = '未选择现金抵扣券';
    let money = 0.00;
    let moneyvou_select = [];
    if(moneyvou_list[edata.index].seletype){
      moneyvou_name = '未选择现金抵扣券';
      moneyvou_list[edata.index].seletype = false;
    } else {
      for(let i=0;i<moneyvou_list.length;i++){
        moneyvou_list[i].seletype = false;
      }
      moneyvou_list[edata.index].seletype = true;
      moneyvou_name = moneyvou_list[edata.index].vouName;
      money = edata.money.toFixed(2);
      moneyvou_select.push(edata.vouid);
    }
    that.setData({
      moneyvou: moneyvou_list,
      moneyvou_select: moneyvou_select,
      moneyvou_money: money,
      moneyvou_name: moneyvou_name
    });
  },
  roomcodetoggle: function () {
    this.setData({
      roomCodetype: !this.data.roomCodetype
    })
  },
  changeroomcode: function (e) {
    this.setData({
      roomCodeN: e.detail.value
    })
  },
  changeroomcodefun: function () {
    const that = this;
    const roomCodeN = that.data.roomCodeN;
    if(roomCodeN == '') {
      wx.showToast({
        title: '请填写房间号',
        icon: 'none',
        duration: 2000
      })
    } else {
      that.setData({
        roomCode: roomCodeN
      });
      that.roomcodetoggle();
      wx.setStorage({
        key: 'roomCode',
        data: roomCodeN
      });
    }
  },
  getRules(){
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    let params = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.getRedpackRules(params).then(res => {
      wx.hideLoading();
      let resdata = res.data;
      let resdatas = res.data.data;
      if(resdata.code == 0){
        this.setData({
          ifshowRules: true,
          ruleData: resdatas
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  closeRule(){
    this.setData({
      ifshowRules: false
    })
  },
  rulefun: function (e) {//获取半价活动规则
    const id = e.currentTarget.dataset.ruleid;
    wxrequest.getrulefun(id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.showModal({
          title: '活动规则',
          content: resdatas,
          showCancel: false,
          confirmText: '我知道了',
          success (res) {}
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  offerdetails: function () {
    this.setData({
      isshowoffer: !this.data.isshowoffer
    })
  },
  saveshopcardata(){
    const that = this;
    let deliverylist_a1 = JSON.stringify(that.data.deliverylist1);
    deliverylist_a1 = JSON.parse(deliverylist_a1);
    let deliverylist_a2 = JSON.stringify(that.data.deliverylist2);
    deliverylist_a2 = JSON.parse(deliverylist_a2);
    let deliverylist_a3 = JSON.stringify(that.data.deliverylist3);
    deliverylist_a3 = JSON.parse(deliverylist_a3);
    let deliverylist_a4 = JSON.stringify(that.data.deliverylist4);
    deliverylist_a4 = JSON.parse(deliverylist_a4);
    let deliverylist_a5 = JSON.stringify(that.data.deliverylist5);
    deliverylist_a5 = JSON.parse(deliverylist_a5);
    for (let i = 0; i < deliverylist_a1.length; i++) {
      deliverylist_a1[i].selecttype = false;
    }
    for (let i = 0; i < deliverylist_a2.length; i++) {
      deliverylist_a2[i].selecttype = false;
    }
    for (let i = 0; i < deliverylist_a3.length; i++) {
      deliverylist_a3[i].selecttype = false;
    }
    for (let i = 0; i < deliverylist_a4.length; i++) {
      deliverylist_a4[i].selecttype = false;
    }
    for (let i = 0; i < deliverylist_a5.length; i++) {
      deliverylist_a5[i].selecttype = false;
    }
    that.setData({
      deliverylist1: deliverylist_a1,
      deliverylist2: deliverylist_a2,
      deliverylist3: deliverylist_a3,
      deliverylist4: deliverylist_a4,
      deliverylist5: deliverylist_a5
    });
    let deliverylist_b1 = JSON.stringify(that.data.deliverylist1);
    deliverylist_b1 = JSON.parse(deliverylist_b1);
    let deliverylist_b2 = JSON.stringify(that.data.deliverylist2);
    deliverylist_b2 = JSON.parse(deliverylist_b2);
    let deliverylist_b3 = JSON.stringify(that.data.deliverylist3);
    deliverylist_b3 = JSON.parse(deliverylist_b3);
    let deliverylist_b4 = JSON.stringify(that.data.deliverylist4);
    deliverylist_b4 = JSON.parse(deliverylist_b4);
    let deliverylist_b5 = JSON.stringify(that.data.deliverylist5);
    deliverylist_b5 = JSON.parse(deliverylist_b5);
    for (let i = 0; i < deliverylist_b1.length;i++){//现场送商品
      deliverylist_b1[i].latticeCode = '';
    }
    for (let i = 0; i < deliverylist_b2.length; i++) {//快递送商品
      deliverylist_b2[i].latticeCode = '';
      deliverylist_b2[i].prodtype = 4;
    }
    let listdata = deliverylist_b1.concat(deliverylist_b2);
    listdata = listdata.concat(deliverylist_b3);
    listdata = listdata.concat(deliverylist_b4);
    wx.setStorage({
      key: 'buylist',
      data: listdata
    });
    wx.setStorage({
      key: 'shopcartvoucherlist',
      data: deliverylist_a5
    });
    wx.setStorage({
      key: 'deliverylist1',
      data: deliverylist_a1
    });
    wx.setStorage({
      key: 'deliverylist2',
      data: deliverylist_a2
    });
    wx.setStorage({
      key: 'deliverylist3',
      data: deliverylist_a3
    });
    wx.setStorage({
      key: 'deliverylist4',
      data: deliverylist_a4
    });
    wx.setStorage({
      key: 'deliverylist5',
      data: deliverylist_a5
    });
  }
})