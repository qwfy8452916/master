const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    subtype: true,//新增地址提交按钮状态
    customerId: '',
    receipttype: false,//表单页or列表页
    receiptlist: '',//收货信息
    addresstag: '',//地址名称
    consignee: '',//收货人
    consigneePhone: '',//收货人手机号
    address: '请选择收货人详细地址',//详细地址
    province: '',//所属省份代号
    city: '',//所属城市代号
    area: '',//所属区域代号
    region: [],//省市区值
    addressinfo: '',
    regiontype: true,//是否显示省市区默认值
    changetype: 0, //0：新增地址，1：新增地址(有取消按钮)，2：修改按钮
    addressid: '',//地址id
    housenumber: '',
    lng: '',
    lat: ''
  },
  onShow: function () {
    const that = this;
    that.setData({
      customerId: app.globalData.userId      
    });
    wx.hideHomeButton();
    that.get_addresslist();
  },
  onUnload: function () {
    app.globalData.addressinfo = '';
  },
  get_addresslist: function () {//获取地址列表
    const that = this;
    let linkData = {
      customerId: app.globalData.userId
    };
    wxrequest.getaddresslist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let receipttype = that.data.receipttype;
      let regiontype = that.data.regiontype;
      let changetype = that.data.changetype;
      if (resdata.code == 0) {
        if (resdatas.length == 0) {
          receipttype = true;
          changetype = 0;
        } else {
          if(changetype != 2){
            changetype = 1;
            receipttype = false;
          } else {
            receipttype = true;
          }
        }
        if(app.globalData.addressinfo != '') {
          receipttype = true;
        }
        that.setData({
          receipttype: receipttype,
          receiptlist: resdatas,
          changetype: changetype,
          regiontype: regiontype,
          addressinfo: app.globalData.addressinfo,
          address: app.globalData.addressinfo.addr
        });
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
  addresstagfun: function (e) {//地址名称
    this.setData({
      addresstag: e.detail.value
    })
  },
  consigneefun: function (e) {//收货人
    this.setData({
      consignee: e.detail.value
    })
  },
  consigneePhonefun: function (e) {//收货人手机号
    this.setData({
      consigneePhone: e.detail.value
    })
  },
  housenumberfun: function (e) {//门牌号
    this.setData({
      housenumber: e.detail.value
    })
  },
  bindRegionChange: function (e) {//省市区
    let province;
    let city;
    let area;
    province = e.detail.code[0];
    city = e.detail.code[1];
    area = e.detail.code[2];
    this.setData({
      regiontype: false,
      region: e.detail.value,
      province: province,
      city: city,
      area: area
    });
    this.get_coordinate(province, city, area);
  },
  get_coordinate: function (province, city, area) {
    const that = this;
    let linkData = {
      PROVINCE: province,
      CITY: city,
      AREA: area,
      mapType: 2 //1腾讯 2高德 3百度
    };
    wxrequest.getcoordinate(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          lng: resdatas.lng,
          lat: resdatas.lat
        });
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
  addressfun: function (e) {//详细地址
    this.setData({
      address: e.detail.value
    })
  },
  subfun: function (e) {//创建地址
    const that = this;
    const customerId = that.data.customerId;
    const addresstag = that.data.addresstag;//收货人
    const consignee = that.data.consignee;//收货人
    const consigneePhone = that.data.consigneePhone;//收货人手机号
    const address = that.data.address;//详细地址
    const province = that.data.province;//所属省份代号
    const city = that.data.city;//所属城市代号
    const area = that.data.area;//所属区域代号
    const housenumber = that.data.housenumber;//门牌号
    const addressinfo = that.data.addressinfo;
    let methodtype;
    let addressnum = address + housenumber;
    let id;
    const type = e.currentTarget.dataset.type;
    if (type == 1) {
      methodtype = 'POST',
      id = ''
    } else {
      methodtype = 'PUT',
      id = that.data.addressid
    }
    if (consignee == '') {
      wx.showToast({
        title: '请输入收货人姓名',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (consigneePhone == '') {
      wx.showToast({
        title: '请输入收货人手机号码',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (!/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(consigneePhone)) {
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (province == '' || city == '' || area == '') {
      wx.showToast({
        title: '请选择收货人地区',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (address == '') {
      wx.showToast({
        title: '请输入收货人详细地址',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if (housenumber == '') {
      wx.showToast({
        title: '请输入门牌号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    that.setData({
      subtype: false
    });
    let linkData = {
      customerId: customerId,
      addressTag: addresstag, //收货人
      consignee: consignee, //收货人
      consigneePhone: consigneePhone, //收货人手机号
      address: addressnum, //详细地址
      province: province, //所属省份代号
      city: city, //所属城市代号
      area: area,  //所属区域代号
      id: id,//地址id
      latitude: addressinfo.latitude,
      longitude: addressinfo.longitude,
      houseNumber: housenumber
    };
    if (type == 1) {
      wxrequest.postcreateaddress(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          if (resdata.data) {
            that.setData({
              receipttype: false,
              subtype: true,
              changetype: 0
            });
            app.globalData.addressinfo = '';
            that.get_addresslist();
          } else {
            wx.showToast({
              title: '新增地址失败，请重新添加',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              subtype: true
            });
          }
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
      wxrequest.putcreateaddress(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          if (resdata.data) {
            that.setData({
              receipttype: false,
              subtype: true,
              changetype: 0
            });
            app.globalData.addressinfo = '';
            that.get_addresslist();
          } else {
            wx.showToast({
              title: '新增地址失败，请重新添加',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              subtype: true
            });
          }
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
    }
  },
  changeaddress: function (e) {//编辑地址
    const that = this;
    const index = e.currentTarget.dataset.index;
    const receiptlist = that.data.receiptlist;
    let region = that.data.region;
    region[0] = receiptlist[index].provinceName;
    region[1] = receiptlist[index].cityName;
    region[2] = receiptlist[index].areaName;
    let addressinfo = {};
    addressinfo.province = receiptlist[index].mapProvince;
    addressinfo.city = receiptlist[index].mapCity;
    addressinfo.district = receiptlist[index].mapArea;
    app.globalData.addressinfo = addressinfo;
    that.setData({
      receipttype: true,
      addresstag: receiptlist[index].addressTag,//地址名称
      consignee: receiptlist[index].consignee,//收货人
      consigneePhone: receiptlist[index].consigneePhone,//收货人手机号
      address: receiptlist[index].address,//详细地址
      addressinfo: addressinfo,
      region: region,  //省市区
      regiontype: false,
      changetype: 2,
      province: receiptlist[index].province,//所属省份代号
      city: receiptlist[index].city,//所属城市代号
      area: receiptlist[index].area,//所属区域代号
      addressid: receiptlist[index].id,
      housenumber: receiptlist[index].houseNumber
    });
    this.get_coordinate(receiptlist[index].province, receiptlist[index].city, receiptlist[index].area);
  },
  cancelfun: function () {//取消修改
    this.setData({
      receipttype: false,
      consignee: '',//收货人
      consigneePhone: '',//收货人手机号
      address: '',//详细地址
      region: [],  //省市区
      regiontype: true,
      changetype: 1
    })
  },
  deletefun: function (e) {//删除地址
    const that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除此地址？',
      success(res) {
        if (res.confirm) {
          let id = e.currentTarget.dataset.id;
          let linkData = {
            customerId: that.data.customerId
          };
          wxrequest.deleteaddress(id,linkData).then(res => {
            let resdata = res.data;
            let resdatas = res.data.data;
            if (resdata.code == 0) {
              if (resdata.data) {
                that.get_addresslist();
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
            wx.hideLoading();
            console.log(err)
          });
        }
      }
    })
  },
  addAddress: function () {//添加地址
    this.setData({
      receipttype: true,
      addresstag: '',
      consignee: '',
      consigneePhone: '',
      address: '请选择收货人详细地址',
      regiontype: true
    });
    app.globalData.addressinfo = '';
  },
  backfun: function (e) {//选择地址后回到上级页面
    wx.setStorage({
      key: 'addressid',
      data: e.currentTarget.dataset.id,
    });
    wx.navigateBack({
      delta: 1
    })
  },
  changedefault: function (e) {//修改默认地址
    const that = this;
    let linkData = {
      customerId: that.data.customerId,
      id: e.currentTarget.dataset.id,
      isDefault: 1
    };
    wxrequest.putcreateaddress(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdata.data) {
          that.get_addresslist();
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
  },
  mapfun: function () {
    if(this.data.lat != '' && this.data.lng != ''){
      wx.navigateTo({
        url: "../shopMap/shopMap?lat=" + this.data.lat + '&lng=' + this.data.lng
      })
    } else {
      wx.showToast({
        title: '请先选择地区',
        icon: 'none',
        duration: 2000
      })
    }
  }
})