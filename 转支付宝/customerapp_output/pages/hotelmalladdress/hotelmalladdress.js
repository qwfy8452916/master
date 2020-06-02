const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    subtype: true,
    //新增地址提交按钮状态
    customerId: '',
    receipttype: true,
    //表单页or列表页
    receiptlist: '',
    //收货信息
    consignee: '',
    //收货人
    consigneePhone: '',
    //收货人手机号
    address: '',
    //详细地址
    province: '',
    //所属省份代号
    city: '',
    //所属城市代号
    area: '',
    //所属区域代号
    region: [],
    //省市区值
    regiontype: true,
    //是否显示省市区默认值
    changetype: 0,
    //0：新增地址，1：新增地址(有取消按钮)，2：修改按钮
    addressid: '' //地址id

  },
  onShow: function () {
    const that = this;
    that.setData({
      customerId: app.globalData.userId
    });
    wx.hideHomeButton();
    that.get_addresslist();
  },
  get_addresslist: function () {
    //获取地址列表
    const that = this;
    let linkData = {
      customerId: app.globalData.userId
    };
    wxrequest.getaddresslist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let receipttype = that.data.receipttype;
      let changetype = that.data.changetype;

      if (resdata.code == 0) {
        if (resdatas.length == 0) {
          receipttype = true;

          changetype: 0;
        } else {
          receipttype = false;

          changetype: 1;
        }

        that.setData({
          receipttype: receipttype,
          receiptlist: resdatas,
          changetype: changetype
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
  consigneefun: function (e) {
    //收货人
    this.setData({
      consignee: e.detail.value
    });
  },
  consigneePhonefun: function (e) {
    //收货人手机号
    this.setData({
      consigneePhone: e.detail.value
    });
  },
  bindRegionChange: function (e) {
    //省市区
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
  },
  addressfun: function (e) {
    //详细地址
    this.setData({
      address: e.detail.value
    });
  },
  subfun: function (e) {
    //创建地址
    const that = this;
    const customerId = that.data.customerId;
    const consignee = that.data.consignee; //收货人

    const consigneePhone = that.data.consigneePhone; //收货人手机号

    const address = that.data.address; //详细地址

    const province = that.data.province; //所属省份代号

    const city = that.data.city; //所属城市代号

    const area = that.data.area; //所属区域代号

    let methodtype;
    let id;
    const type = e.currentTarget.dataset.type;

    if (type == 1) {
      methodtype = 'POST', id = '';
    } else {
      methodtype = 'PUT', id = that.data.addressid;
    }

    if (consignee == '') {
      wx2my.showToast({
        title: '请输入收货人姓名',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (consigneePhone == '') {
      wx2my.showToast({
        title: '请输入收货人手机号码',
        icon: 'none',
        duration: 2000
      });
      return;
    } else if (!/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(consigneePhone)) {
      wx2my.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (province == '' || city == '' || area == '') {
      wx2my.showToast({
        title: '请选择收货人地区',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    if (address == '') {
      wx2my.showToast({
        title: '请输入收货人详细地址',
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
      consignee: consignee,
      //收货人
      consigneePhone: consigneePhone,
      //收货人手机号
      address: address,
      //详细地址
      province: province,
      //所属省份代号
      city: city,
      //所属城市代号
      area: area,
      //所属区域代号
      id: id //地址id

    };

    if (type == 1) {
      wxrequest.postcreateaddress(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;

        if (resdata.code == 0) {
          if (resdata.data) {
            that.setData({
              receipttype: false,
              subtype: true
            });
            that.get_addresslist();
          } else {
            wx2my.showToast({
              title: '新增地址失败，请重新添加',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              subtype: true
            });
          }

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
      wxrequest.putcreateaddress(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;

        if (resdata.code == 0) {
          if (resdata.data) {
            that.setData({
              receipttype: false,
              subtype: true
            });
            that.get_addresslist();
          } else {
            wx2my.showToast({
              title: '新增地址失败，请重新添加',
              icon: 'none',
              duration: 2000
            });
            that.setData({
              subtype: true
            });
          }

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
    }
  },
  changeaddress: function (e) {
    //编辑地址
    const that = this;
    const index = e.currentTarget.dataset.index;
    const receiptlist = that.data.receiptlist;
    let region = that.data.region;
    region[0] = receiptlist[index].provinceName;
    region[1] = receiptlist[index].cityName;
    region[2] = receiptlist[index].areaName;
    that.setData({
      receipttype: true,
      consignee: receiptlist[index].consignee,
      //收货人
      consigneePhone: receiptlist[index].consigneePhone,
      //收货人手机号
      address: receiptlist[index].address,
      //详细地址
      region: region,
      //省市区
      regiontype: false,
      changetype: 2,
      province: receiptlist[index].province,
      //所属省份代号
      city: receiptlist[index].city,
      //所属城市代号
      area: receiptlist[index].area,
      //所属区域代号
      addressid: receiptlist[index].id
    });
  },
  cancelfun: function () {
    //取消修改
    this.setData({
      receipttype: false,
      consignee: '',
      //收货人
      consigneePhone: '',
      //收货人手机号
      address: '',
      //详细地址
      region: [],
      //省市区
      regiontype: true,
      changetype: 1
    });
  },
  deletefun: function (e) {
    //删除地址
    const that = this;
    wx2my.showModal({
      title: '提示',
      content: '是否删除此地址？',

      success(res) {
        if (res.confirm) {
          let id = e.currentTarget.dataset.id;
          let linkData = {
            customerId: that.data.customerId
          };
          wxrequest.deleteaddress(id, linkData).then(res => {
            let resdata = res.data;
            let resdatas = res.data.data;

            if (resdata.code == 0) {
              if (resdata.data) {
                that.get_addresslist();
              }
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
      }

    });
  },
  addAddress: function () {
    //添加地址
    this.setData({
      receipttype: true,
      consignee: '',
      consigneePhone: '',
      address: '',
      regiontype: true
    });
  },
  backfun: function (e) {
    //选择地址后回到上级页面
    wx2my.setStorage({
      key: 'addressid',
      data: e.currentTarget.dataset.id
    });
    wx2my.navigateBack({
      delta: 1
    });
  },
  changedefault: function (e) {
    //修改默认地址
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
  }
});