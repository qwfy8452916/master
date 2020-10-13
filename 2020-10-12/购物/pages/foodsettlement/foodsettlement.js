const app = getApp();
import wxrequest from '../../request/api'
//1：店内送，2：快递送 , 3：迷你吧，4：自提取，5：电子券, 6：堂食，7：外卖，8：外带
Page({
  data: {
    funcId: '',
    fooddatalist: [],
    fooddatalist2: [], 
    array: [],
    delivway: '',
    index: 0,
    roomCode: '',
    roomCodeN: '',
    roomCodetype: false,
    roomFloor: '',
    points: [],
    receiptlist: '',
    receipttype: true,
    foodtotalnum: '',
    foodtotalmoney: 0.00,
    foodtotalmoney2: 0.00,
    coupon_selected: [],//已选优惠券
    coupon_optional: [],//可选优惠券
    prodvou: [],//商品抵扣券
    prodvou_select: [],//已选商品抵扣券
    prodvou_money: 0.00,//现金抵扣金额
    prodvou_name: '未选择免费领用券',
    prodvou_type: false,
    moneyvou: [],//现金抵扣券
    moneyvou_select: [],//已选现金抵扣券
    moneyvou_money: 0.00,//现金抵扣金额
    moneyvou_name: '未选择现金抵扣券',
    moneyvou_type: false,
    coupontype: false,//是否显示优惠券
    coupontype2: false,//是否显示优惠券列表
    paytype: 1,
    remark: '',
    textareatype: false,
    usernamekf: '',
    userphone: '',
    discount: 0.00,
    province: '',
    nameplaceholder: '',
    telplaceholder: '',
    wblogistics: '',
    lgcId: -1,
    lgcHotelId: '',
    lgcIdindex: 0,
    freight: 0.00,//外部快递
    courierfee: 0.00,//快递模板费
    isSupportManyTimesOrder: '',
    iscanselectcoupon: '',
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中'
    });
    const that = this;
    const delivways_data = JSON.parse(options.delivways);
    const fooddatalist_data = JSON.parse(options.fooddatalist);
    let array_list = [];
    let nameplaceholder = '请填写联系人';
    let telplaceholder = '请填写联系电话';
    for(let i=0;i<delivways_data.length;i++){
      let array_data = {};
      if(delivways_data[i] == 1){
        array_data.id = 1;
        array_data.name = '店内送';
        array_list.push(array_data);
      } else if(delivways_data[i] == 2){
        array_data.id = 2;
        array_data.name = '快递送';
        array_list.push(array_data);
      } else if(delivways_data[i] == 4){
        array_data.id = 4;
        array_data.name = '自提取';
        array_list.push(array_data);
      }  else if(delivways_data[i] == 5){
        array_data.id = 5;
        array_data.name = '电子券';
        array_list.push(array_data);
      }  else if(delivways_data[i] == 6){
        array_data.id = 6;
        array_data.name = '堂食';
        array_list.push(array_data);
      }  else if(delivways_data[i] == 7){
        array_data.id = 7;
        array_data.name = '外卖';
        array_list.push(array_data);
      }  else if(delivways_data[i] == 8){
        array_data.id = 8;
        array_data.name = '外带';
        array_list.push(array_data);
      }
    }
    if(array_list.length > 0 && array_list[0].id == 1) {
      nameplaceholder = '请填写联系人(非必填)';
      telplaceholder = '请填写联系电话(非必填)';
    }
    that.setData({
      fooddatalist: fooddatalist_data,
      fooddatalist2: fooddatalist_data,
      array: array_list,
      points: app.globalData.points,
      foodtotalnum: options.foodtotalnum,
      foodtotalmoney: options.foodtotalmoney,
      delivway: array_list[0].id,
      funcId: options.funid,
      nameplaceholder: nameplaceholder,
      telplaceholder: telplaceholder,
      isSupportManyTimesOrder: options.ismanyorder,
      iscanselectcoupon: options.iscanselectcoupon
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
    that.post_prodvou();
  },
  onShow: function () {
    this.getSelectedaddress();
  },
  bindPickerChange: function (e) {
    const that = this;
    let nameplaceholder = '请填写联系人';
    let telplaceholder = '请填写联系电话';
    if(that.data.array[e.detail.value].id != 7) {
      nameplaceholder = '请填写联系人(非必填)';
      telplaceholder = '请填写联系电话(非必填)';
    }
    that.setData({
      index: e.detail.value,
      delivway: that.data.array[e.detail.value].id,
      nameplaceholder: nameplaceholder,
      telplaceholder: telplaceholder,
      lgcIdindex: 0,
    });
    that.post_prodvou();
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
              if(resdatas) {
                that.get_coordinate(resdatas);
              }
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
          if(resdatas) {
            that.get_coordinate(resdatas);
          }
        }
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  addressfun: function(){//地址
    wx.navigateTo({
      url: '../hotelmalladdress/hotelmalladdress'
    })
  },
  post_prodvou: function () {//获取用户在酒店可用商品抵扣券
    const that = this;
    const list_data = that.getdata();
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodList: list_data.finclist
    };
    wxrequest.postprodvou(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        for(let i=0;i<resdatas.length;i++){
          resdatas[i].seletype = false
        }
        that.setData({
          prodvou: resdatas
        });
        that.post_prodlist(list_data.finclist);
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
          fooddatalist2: resdatas
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
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodList: that.data.fooddatalist2,
      couponIds: that.data.selected_id//优惠券id_list
    };
    wxrequest.getmoneyvou(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        for(let i=0;i<resdatas.length;i++){
          resdatas[i].seletype = false
        }
        that.setData({
          moneyvou: resdatas,
          moneyvou_select: [],
          moneyvou_name: '未选择现金抵扣券',
          moneyvou_money: 0.00
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
    const selected_id = datajson.selected_id;
    const vouIds_list = that.data.prodvou_select;
    let linkData = {
      prodList: that.data.fooddatalist2,
      couponIds: selected_id,//已选优惠券id
      vouIds: vouIds_list,//已选商品抵扣券id
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
  checkcoupon: function () {//校验已选优惠券是否可用
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    const hotelid = that.data.hotelid;
    const userid = that.data.userid;
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    const datajson = that.getdata();
    const finclist = datajson.finclist;
    const selected_id = datajson.selected_id;
    let prodList = finclist;
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
          that.getcouponlist();
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
  getdata() {//获取finclist
    const that = this;
    let datajson = {};
    let finclist = [];//功能区商品id+商品总价
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let selected_id = [];//已选优惠券id
    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }
    let fooddata_list = JSON.stringify(that.data.fooddatalist);
    fooddata_list = JSON.parse(fooddata_list);
    for (let i = 0; i < fooddata_list.length; i++) {
      let datainfo = {};
      datainfo.funcId = fooddata_list[i].funcId;
      datainfo.funcProdId = fooddata_list[i].funcProdId;
      datainfo.hotelProdId = fooddata_list[i].hotelProdId;
      datainfo.prodOwnerOrgId = fooddata_list[i].prodOwnerOrgId;
      datainfo.prodCount = fooddata_list[i].prodnum;if(fooddata_list[i].discountPrice != '') {
        datainfo.prodPrice = fooddata_list[i].discountPrice;
      } else {
        datainfo.prodPrice = fooddata_list[i].prodRetailPrice;
      }
      datainfo.totalAmount = fooddata_list[i].totalprice;
      datainfo.funcProdSpecId = fooddata_list[i].funcProdSpecId;
      finclist.push(datainfo);
    }
    datajson.finclist = finclist;
    datajson.selected_id = selected_id;
    return datajson;
  },
  getcardata(){
    const that = this;
    let fooddata_list = JSON.stringify(that.data.fooddatalist);
    fooddata_list = JSON.parse(fooddata_list);
    for (let i = 0; i < fooddata_list.length; i++) {
      for (let j = i+1; j < fooddata_list.length; j++) {
        if (fooddata_list[i].hotelProdId == fooddata_list[j].hotelProdId) {
          fooddata_list[i].prodnum = fooddata_list[i].prodnum + fooddata_list[j].prodnum;
          fooddata_list[i].totalprice = parseFloat(fooddata_list[i].prodRetailPrice) * fooddata_list[i].prodnum;
          fooddata_list[i].totalprice = fooddata_list[i].totalprice.toFixed(2);
          fooddata_list.splice(j, 1);
        }
      }
    }
    return fooddata_list;
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
      const listdata = that.getdata(); 
      that.post_prodlist(listdata.finclist);
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
  calculation: function (listdata) {//计算优惠后金额
    const that = this;
    let fooddata_list = JSON.stringify(that.data.fooddatalist);
    fooddata_list = JSON.parse(fooddata_list);
    const lumpsum = parseFloat(that.data.foodtotalmoney);//商品总额
    const prodvou_money = parseFloat(that.data.prodvou_money);//商品抵扣金额
    const moneyvou_money = parseFloat(that.data.moneyvou_money);//现金抵扣金额
    let lumpsum_Discount = 0.00;//商品优惠后总额
    const coupon_selected = listdata;//已选优惠券
    const freight = parseFloat(that.data.freight);//外部物流费
    const courierfee = parseFloat(that.data.courierfee);//外部物流费
    const delivway = that.data.delivway;
    const iscanselectcoupon = that.data.iscanselectcoupon;
    let discount = 0.00;//优惠金额
    for (let i = 0; i<coupon_selected.length; i++) {
      discount = parseFloat(discount) + parseFloat(coupon_selected[i].reduceMoney);
      discount = discount.toFixed(2);
    }
    if(iscanselectcoupon == 0 && delivway == 6) {
      lumpsum_Discount = parseFloat(lumpsum);
      that.setData({

      });
    } else {
      lumpsum_Discount = parseFloat(lumpsum) - parseFloat(prodvou_money) - parseFloat(discount) - parseFloat(moneyvou_money);
    }
    if(lumpsum_Discount <= 0) {
      lumpsum_Discount = 0.00;
    }
    if(delivway == 7) {
        lumpsum_Discount =  parseFloat(lumpsum_Discount) +  parseFloat(freight);
    } else if(delivway == 2){
      lumpsum_Discount =  parseFloat(lumpsum_Discount) +  parseFloat(courierfee);
    }
    if(lumpsum_Discount <= 0) {
      lumpsum_Discount = 0.00;
    }
    lumpsum_Discount = lumpsum_Discount.toFixed(2);
    that.setData({
      foodtotalmoney2: lumpsum_Discount,
      discount: discount
    });
    wx.hideLoading();
  },
  bindTextAreaBlur: function (e) {
    this.setData({
      remark: e.detail.value
    });
  },
  toggletext: function () {
    this.setData({
      textareatype: !this.data.textareatype
    })
  },
  settlementfun: function () {//提交订单
    const that = this;
    if(that.data.paytype != 1) {
      return false;
    }
    that.setData({
      paytype: 0
    });
    const thatdata = that.data;
    const usernamekf = thatdata.usernamekf;//客房配送联系人
    const userphone = thatdata.userphone;//客房配送联系电话
    const delivway = thatdata.delivway;
    let logisticsFee = that.data.freight;
    if(delivway != 7) {
      logisticsFee = 0.00;
    }
    // if(delivway == 7) {
    //   if(usernamekf == ''){
    //     wx.showToast({
    //       title: '请填写联系人',
    //       icon: 'none',
    //       duration: 2000
    //     });
    //     that.setData({
    //       paytype: 1
    //     });
    //     return false;
    //   } else if(userphone == '' || !/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(userphone)){
    //     wx.showToast({
    //       title: '请填写联系电话',
    //       icon: 'none',
    //       duration: 2000
    //     });
    //     that.setData({
    //       paytype: 1
    //     });
    //     return false;
    //   }
    // }
    const shareuser = app.globalData.shareUser;
    let shareUserId = '';
    let shareUserType = '';
    if(shareuser != '0' && shareuser != ''){
      shareUserId = shareuser.id;
      shareUserType = shareuser.type;
    }
    wx.showToast({
      title: '支付中,请稍等',
      icon: 'loading',
      mask: true,
      duration: 60000
    });
    let receiptlist = thatdata.receiptlist;//快递收货信息
    let couponAmount = parseFloat(thatdata.discount).toFixed(2);//优惠总金额
    let lump_sum = parseFloat(thatdata.foodtotalmoney2).toFixed(2);//实际支付金额
    let orderProd = JSON.stringify(that.data.fooddatalist);
    orderProd = JSON.parse(orderProd);
    let lisr_order = [];
    let prodCount = 0;
    for (let i = 0; i < orderProd.length; i++) {
      let prodinfo = {};
      if(orderProd[i].discountPrice) {
        prodinfo.discountPrice = orderProd[i].discountPrice;
      } else {
        prodinfo.discountPrice = '';
      }
      if(orderProd[i].discountAmount) {
        prodinfo.discountAmount = orderProd[i].discountAmount;
      } else {
        prodinfo.discountAmount = '';
      }
      prodinfo.actSecDiscountSettingId = orderProd[i].actSecDiscountSettingId;
      prodinfo.latticeId = 0;
      prodinfo.prodOwnerOrgId = orderProd[i].prodOwnerOrgId;
      prodinfo.prodOwnerOrgKind = orderProd[i].prodOwnerOrgKind;
      prodinfo.hotelId = orderProd[i].hotelId;
      prodinfo.funcId = orderProd[i].funcId;
      prodinfo.funcProdId = orderProd[i].funcProdId;
      prodinfo.hotelProdId = orderProd[i].hotelProdId;
      prodinfo.prodCode = orderProd[i].prodCode;
      if(delivway == 7) {
        prodinfo.expressPerson = receiptlist.consignee;
        prodinfo.expressPhone = receiptlist.consigneePhone;
        prodinfo.expressAddress = receiptlist.address;
      } else {
        prodinfo.expressPerson = '';
        prodinfo.expressPhone = '';
        prodinfo.expressAddress = '';
      }
      prodinfo.isFreeShipping = orderProd[i].isFreeShipping;
      prodinfo.expressFeeId = orderProd[i].expressFeeId;
      prodinfo.message = '';
      prodinfo.prodCount = orderProd[i].prodnum;
      prodinfo.prodPrice = orderProd[i].prodRetailPrice;
      prodinfo.totalAmount = orderProd[i].totalprice;
      prodinfo.deliveryWay = delivway;
      prodinfo.funcProdSpecId = orderProd[i].funcProdSpecId;
      if(delivway == 4 && that.data.points && that.data.points[0].id != 0) {
        prodinfo.pointId = that.data.points[0].id;
      } else {
        prodinfo.pointId = 0;
      }
      if(orderProd[i].categoryId) {
        prodinfo.prodCategoryId = orderProd[i].categoryId;
      } else {
        prodinfo.prodCategoryId = '';
      }
      lisr_order.push(prodinfo);
      prodCount += orderProd[i].prodnum;
    }
    const coupon_selected = that.data.coupon_selected;//已选优惠券
    let selected_id = [];//已选优惠券id
    if (coupon_selected.length != 0) {
      for (let i = 0; i < coupon_selected.length; i++) {
        selected_id.push(coupon_selected[i].id);
      }
    }
    let prodVouIds_data = [];
    if(that.data.prodvou_select.length > 0) {
      prodVouIds_data = that.data.prodvou_select;
    }
    let linkData = {
      shareStyle: app.globalData.shareStyle,
      shareCode: app.globalData.sharecode,
      shareUserId: shareUserId,//分享者的用户Id,
      shareUserType: shareUserType,//分享者的用户类型(1:员工，2：顾客)
      cabId: app.globalData.cabId,//柜子id
      roomCode: thatdata.roomCode,//房间号
      roomFloor: thatdata.roomFloor,//房间楼层
      contactName: usernamekf,//联系人姓名
      contactPhone: userphone,//联系人手机号码
      roomDeliveryRemark: thatdata.remark,//客房配送留言
      hotelId: app.globalData.hotelId,//酒店ID
      customerId: app.globalData.userId,//顾客id
      delayPayFlag: 1,//是否支持待支付(0：否；1：是；有迷你吧商品不支持)
      totalAmount: lump_sum,//商品总价 
      prodCount: prodCount,//商品总数量
      expressFee: 0.00,//快递费总额
      orderDetailDTOList: lisr_order,//订单商品信息
      couponAmount: couponAmount,//优惠金额
      couponIds: selected_id,//优惠券id_list
      vouDeductAmount: that.data.prodvou_money,//商品抵扣金额
      cashDeductAmount: that.data.moneyvou_money,//现金抵扣金额
      prodVouIds: prodVouIds_data,//已选商品抵扣券id(数组)
      moneyVouIds: that.data.moneyvou_select,//已选现金抵扣券id
      lgcHotelId: '',//外部物流id
      lgcActualFee: logisticsFee,//外部物流费用
      lgcLatitude: receiptlist.latitude,
      lgcLongitude: receiptlist.longitude,
      settleShareCode: app.globalData.settleShareCode,
      visitRecordId: app.globalData.visitRecordId,
      delivWay: delivway,
      specFuncId: that.data.funcId,
      bindAreaFlag: app.globalData.bindAreaFlag,
      isSupportManyTimesOrder: that.data.isSupportManyTimesOrder 
    };
    wxrequest.postbuynow(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        app.globalData.isclearfooddata = 1;
        if(resdatas.isNeedPay == 0 && delivway == 6) {
          wx.redirectTo({
            url: '../foodpay/foodpay?funcid=' + that.data.funcId
          });
        } else {
          if (lump_sum > 0){
            that.orderpayfun(resdatas.id, resdatas.orderCode, 1);
          } else {
            wx.reLaunch({
              url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + resdata.data.id + '&ishasmnb=1' + '&redcode=-1'
            })
          }
        }
      } else {
        wx.hideToast();//隐藏加载动画
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
        that.setData({
          paytype: 1
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  orderpayfun: function (id, code, delayPayFlag) {//支付请求
    const that = this;
    let orderid = id;
    let ordercode = code;
    let linkData = {
      appletType: app.globalData.appletType,
      id: orderid,
      customerId: that.data.customerId
    };
    wxrequest.postprodpay(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
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
              that.confirmfun(orderid, ordercode, delayPayFlag);//确认支付状态
            }
          },
          fail: function (res) {
            wx.hideToast();//隐藏加载动画
            wx.reLaunch({
              url: '../my/my?type=' + 1
            });
          }
        })
      } else {
        wx.hideToast();//隐藏加载动画
        wx.showToast({
          title: '订单异常，请重新提交',
          icon: 'none',
          duration: 2000
        });
        wx.removeStorage({
          key: 'coupon_selected',
          success(res) {  }
        });
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          });
        }, 3000);
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  confirmfun: function (orderid, ordercode, delayPayFlag){//确认支付状态
    const that = this;
    let linkData = {
      orderCode: ordercode,
      appletType: app.globalData.appletType
    };
    wxrequest.confirmstatus(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let red_code = -1;
        if(resdatas.redPacketDTO) {
          red_code = resdatas.redPacketDTO.shareCode
          var redData = JSON.stringify(resdatas.redPacketDTO);
        }
        if (resdatas.result == 'SUCCESS') {
          wx.reLaunch({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + orderid + '&ishasmnb=' + delayPayFlag + '&redcode=' + red_code + '&redData=' + redData
          });
        } else {
          wx.reLaunch({
            url: '../my/my?type=' + 1
          });
        }
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        wx.removeStorage({
          key: 'coupon_selected',
          success(res) {  }
        });
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        }, 3000);
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  },
  usernamekffun: function (e) {
    if(e.detail.value == ''){
      wx.showToast({
        title: '请填写联系人',
        icon: 'none',
        duration: 2000
      });
    } else {
      this.setData({
        usernamekf: e.detail.value
      })
    }
  },
  userphonefun: function (e) {
    if(e.detail.value == ''){
      wx.showToast({
        title: '请填写联系电话',
        icon: 'none',
        duration: 2000
      });
    } else {
      this.setData({
        userphone: e.detail.value
      })
    }
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
  get_coordinate: function (data) {//获取经纬度
    const that = this;
    let linkData = {
      PROVINCE: data.province,
      CITY: data.city,
      AREA: data.area,
      mapType: 2 //1腾讯 2高德 3百度
    };
    wxrequest.getcoordinate(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if(data.latitude == 0 || data.longitude == 0){
          data.latitude = resdatas.lat;
          data.longitude = resdatas.lng;
          that.setData({
            receiptlist: data
          });
        }
        that.get_freight(data);
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
  get_freight: function (receiptlist) {
    const that = this;
    if(receiptlist != '' && receiptlist != null) {
      let linkData = {
        recLat: receiptlist.latitude,
        recLong: receiptlist.longitude,
        shopLat: parseFloat(app.globalData.hotelLatitude),
        shopLong: parseFloat(app.globalData.hotelLongitude),
        lgcHotelId: app.globalData.hotelId
      };
      wxrequest.postfreight(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          that.setData({
            freight: resdatas
          });
          that.getproduct(receiptlist.province);
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
  getproduct: function (provinceCode){//快递商品分类
    const that = this;
    let postData = {
      provinceCode: provinceCode,
      params: that.data.fooddatalist
    }
    postData = JSON.stringify(postData);
    wxrequest.postcategories(postData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let courierfee = 0.00;
      if (resdata.code == 0) {
        for (let i = 0; i < resdatas.length; i++){
          resdatas[i].messtype = 1;
          resdatas[i].message = '';
          courierfee = parseFloat(courierfee) + parseFloat(resdatas[i].totalExpressFee);
        }
        courierfee = courierfee.toFixed(2);
        that.setData({
          courierfee: courierfee
        });
        that.calculation(that.data.coupon_selected);
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
})