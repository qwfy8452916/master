const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    type: true,
    selectalltype: false,
    isInvoice: '',//酒店是否支持开房费发票
    hotelId: '',
    customerId: '',
    bilingtype: '',//开票类型 1:普票 2:专票 101:房费票
    listdata: []//待开票列表
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let type;
    let bilingtype;
    if (options.isinvoice == 1){
      type = true;
      bilingtype = '';
    } else {
      type = false;
      bilingtype = 1;
    }
    that.setData({
      hotelId: app.globalData.hotelId,
      customerId: app.globalData.userId,
      isInvoice: options.isinvoice,
      type: type,
      bilingtype: bilingtype
    });
    that.get_invoicedlist();
  },
  get_invoicedlist: function () {//获取待开票列表
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      customerId: app.globalData.userId
    };
    wxrequest.getinvoicedlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          listdata: resdatas
        });
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
      console.log(err)
    });
  },
  bilingtypefun: function (e) {//开票类型
    this.setData({
      bilingtype: e.currentTarget.dataset.bilingtype,
      type: false
    });
  },
  checkboxChange: function (e) {//开票商品选择
    const that = this;
    const itemindex = e.currentTarget.dataset.itemindex;
    const item2index = e.currentTarget.dataset.item2index;
    let list_data = JSON.stringify(that.data.listdata);
    let num = 0;
    let selectalltype = that.data.selectalltype;
    list_data = JSON.parse(list_data);

    list_data[itemindex][item2index].isSelect = !list_data[itemindex][item2index].isSelect;

    for (let i = 0; i < list_data.length; i++) {
      for (let j = 0; j < list_data[i].length; j++) {
        if (!list_data[i][j].isSelect){
          num = num + 1;
        }
      }
    }
    if (num == 0){
      selectalltype = true;
    } else {
      selectalltype = false;
    }

    that.setData({
      listdata: list_data,
      selectalltype: selectalltype
    });

  },
  selectall: function () {//全部选择
    const that = this;
    let selectalltype = that.data.selectalltype;
    let list_data = JSON.stringify(that.data.listdata);
    list_data = JSON.parse(list_data);
    selectalltype = !selectalltype;
    for (let i = 0; i < list_data.length; i++){
      for (let j = 0; j < list_data[i].length; j++){
        list_data[i][j].isSelect = selectalltype;
      }
    }
    that.setData({
      listdata: list_data,
      selectalltype: selectalltype
    });
  },
  nextfun: function () {//下一步
    const that = this;
    const list_data = that.data.listdata;
    let amount = 0;
    let kplist = [];
    for (let i = 0; i < list_data.length; i++) {//获取选中的商品数据
      for (let j = 0; j < list_data[i].length; j++) {
        if (list_data[i][j].isSelect) {
          let kpdata = {};
          kpdata.orderCode = list_data[i][j].orderCode;
          kpdata.hotelProdId = list_data[i][j].hotelProdId;
          kpdata.orderProdId = list_data[i][j].orderProdId;
          kpdata.prodCode = list_data[i][j].prodCode;
          kpdata.orderId = list_data[i][j].orderId;
          kpdata.orderType = list_data[i][j].orderType;
          kpdata.prodOwnerOrgId = list_data[i][j].prodOwnerOrgId;
          kpdata.quantity = list_data[i][j].quantity;
          kplist.push(kpdata);
          amount = amount + list_data[i][j].invoAmount;
        }
      }
    }
    if (kplist.length == 0) {
      wx.showToast({
        title: '请选择需要开票的商品',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.setStorage({
      key: 'kplist',
      data: kplist,
    });
    amount = amount.toFixed(2);
    wx.navigateTo({
      url: '../billingform/billingform?bilingtype=' + that.data.bilingtype + '&totalprice=' + amount
    })
  }
})