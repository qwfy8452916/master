const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    subordertype: true,//提交订单按钮状态
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,//中英文开关：0关，1开
    themecolor: '',//主题颜色
    userid: '',
    hotelAddImagesfirst: '',//第一张banner
    hotelAddImages: [],
    autoplay: false,
    circular: true,
    interval: 3500,
    duration: 500,
    hotelStarLevel: '',
    hotelName: '',
    hotelDecorationYear: '',
    hotelStyle: '',
    isHasPark: '',
    hotelAddress: '',
    province: '',
    city: '',
    area: '',
    hotelHonor: '',
    hotelBookingPhone: '',
    hotelLatitude: '',
    hotelLongitude: '',
    hotelId: '',//酒店id
    usercode: '',
    cabCode: '',
    cabId: '',//柜子id
    latticeid: '',//格子id
    oprInvoiceSup: '',//运营商是否支持开票 0 不支持，1 支持
    isInvoice: '',//是否开票 0：不开票 1：开票 
    cabinetStatus: 1,//柜子状态（0: 初始状态 1：正常 2：故障）
    wifiSsid: '',//wifi名称
    wifiPassword: '',//wifi密码
    roomCode: '',
    roomFloor: '',
    buylist: [],//选中商品信息
    money: 0.00,//选中商品总价
    mnb_commodity: [],//迷你吧商品列表
    storelist: [],//便利店商品
    hasfuncprod: 0,//是否有其他功能区商品：0-没有，1-有
    prodlength: 0,//购物车商品数量
    pageNo: 1,//当前页
    pages: '',//总页数
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    convenienceStore: '',//便利店支持功能（0：不支持，1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    hotelFuncDTOS1: '',//功能区
    hotelFuncDTOS2: '',//功能区
    shareuser: '',
    shareUserAvatarUrl: '',
    shareUserNickName: '',
    redbagtype: '',
    shareObj: '',
    regbagact_type: '',
    act_newcomer: ''
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      userid: app.globalData.userId,
      hotelId: app.globalData.hotelId,
      cabCode: app.globalData.cabCode,
      cabId: app.globalData.cabId,
      shareuser: app.globalData.shareUser,
      shareUserAvatarUrl: app.globalData.shareUserAvatarUrl,
      shareUserNickName: app.globalData.shareUserNickName,
      regbagact_type: app.globalData.regbagact_type,
      shareObj: app.globalData.shareObj
    });
    that.get_hotelinfo(app.globalData.hotelId, app.globalData.cabCode);//获取酒店信息
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
        })
      }
    });
    wx.getStorage({
      key: 'convenienceStore',
      success(res) {
        that.setData({
          convenienceStore: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomService',
      success(res) {
        that.setData({
          roomService: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomCode',
      success(res) {
        that.setData({
          roomCode: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomFloor',
      success(res) {
        that.setData({
          roomFloor: res.data
        })
      }
    });
    setTimeout(function(){
      wx.getStorage({//功能区列表
        key: 'hotelFuncDTOS1',
        success(res) {
          that.setData({
            hotelFuncDTOS1: res.data
          });
        }
      });
      wx.getStorage({//功能区列表
        key: 'hotelFuncDTOS2',
        success(res) {
          that.setData({
            hotelFuncDTOS2: res.data
          });
        }
      });
    },500);
    that.get_wififun();
  },
  onShow: function () {
    const that = this;
    wx.hideHomeButton();
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      subordertype: true,
      storelist: []
    })
    that.setData({
      mnb_commodity: [],
      storelist: []
    });
    wx.getStorage({
      key: 'buylist',
      success: function (res) {
        that.getlength(res.data);
        that.setData({
          buylist: res.data
        });
      },
      fail: function () {
        that.setData({
          buylist: []
        })
      }
    });
    let redbagtype = 0;
    if(app.globalData.shareUserNickName){
      redbagtype = 1;
    }
    let act_newcomer_data = '';
    let actlistdata = app.globalData.actlistdata;
    let actindex = actlistdata.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.actType == 1;
    });
    if(actindex != -1){
      act_newcomer_data = actlistdata[actindex];
    }
    that.setData({
      redbagtype: redbagtype,
      act_newcomer: act_newcomer_data
    });
    if(act_newcomer_data != ''){
      if(act_newcomer_data.isOpen == 0 && (app.globalData.shareObj != 3 || app.globalData.regbagact_type != 0)){
        actlistdata[actindex].isOpen = 1;
        app.globalData.actlistdata = actlistdata;
      }
      // else {
      //   actlistdata[actindex].isOpen = 0;
      //   app.globalData.actlistdata = actlistdata;
      // }
    }
    app.globalData.regbagact_type = 1;
    that.getpordinfo(app.globalData.cabCode, app.globalData.hotelId);//获取商品信息
    that.getstorelist(app.globalData.hotelId, 1);//获取便利店商品
  },
  get_wififun: function () {//获取wifi
    const that = this;
    let linkData = {
      qrcode: app.globalData.cabCode
    };
    wxrequest.getwifi(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdatas.wifiSsid != '' && resdatas.wifiSsid != null) {
          that.setData({
            wifiSsid: resdatas.wifiSsid,
            wifiPassword: resdatas.wifiPassword
          });
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
      console.log(err)
    });
  },
  get_hotelinfo: function (hotelid, cabCode) {//获取酒店信息
    const that = this;
    wxrequest.gethotelinfo(hotelid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let hotelAddImagesfirst = '';
      let hotelAddImages;
      if (resdata.code == 0) {
        if (resdatas.hshopImageDTOs != null || resdatas.hshopImageDTOs.length != 0) {
          hotelAddImagesfirst = resdatas.cabImageDTOs[0];
          hotelAddImages = resdatas.cabImageDTOs;
          hotelAddImages.splice(0, 1);
        } else {
          hotelAddImagesfirst = '';
          hotelAddImages = '';
        }
        let hotelDecorationYear = resdatas.hotelDecorationYear.substring(0, 4);
        let area = '';
        if (resdatas.area) {//区
          area = resdatas.area.dictName;
        }
        that.setData({
          isSupportEn: resdatas.isSupportEn,//中英文开关：0关，1开
          hotelAddImagesfirst: hotelAddImagesfirst,//酒店第一张banner
          hotelAddImages: hotelAddImages,//酒店banner
          hotelName: resdatas.hotelName,//酒店名称
          hotelStarLevel: resdatas.hotelStarLevel + 1,//酒店星级
          hotelDecorationYear: hotelDecorationYear,//酒店装修时间
          hotelStyle: resdatas.hotelStyle,//酒店装修风格
          isHasPark: resdatas.isHasPark,//是否有停车场
          hotelAddress: resdatas.hotelAddress,//酒店详细地址
          province: resdatas.province.dictName,//省
          city: resdatas.city.dictName,//市
          area: area,//区
          hotelHonor: resdatas.hotelHonor,//酒店荣誉
          hotelBookingPhone: resdatas.hotelBookingPhone,//酒店订房电话
          hotelLatitude: resdatas.hotelLatitude,//酒店纬度
          hotelLongitude: resdatas.hotelLongitude,//酒店经度
          isInvoice: resdatas.isSupportRoomInvoice,//是否支持酒店房费发票
          isSupportRoomAlloc: resdatas.isSupportRoomAlloc,//是否支持客房协议价
          themecolor: JSON.parse(resdatas.hotelThemeDTO.themeDescription)//主题
        });
        that.getoprInvoiceSup(hotelid);//检查酒店所属运营商是否支持开商品发票
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
  getoprInvoiceSup: function (hotelId) {//检查酒店所属运营商是否支持开商品发票
    const that = this;
    let linkData = {
      hotelId: hotelId
    };
    wxrequest.getfininvcheck(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          oprInvoiceSup: resdatas
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
      console.log(err)
    });
  },
  getpordinfo: function (cabCode, hotelId) {//获取迷你吧商品信息 prodtype：1-迷你吧，2-便利店，3-其他功能区
    const that = this;
    let linkData = {
      cabCode: cabCode
    };
    wxrequest.getmnbprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let commoditylist = resdatas.cabProdList;
        let buy_list = that.data.buylist;
        for (let i = 0; i < commoditylist.length; i++) {
          commoditylist[i].prodnum = 0;
          commoditylist[i].prodnumtype = false;
          commoditylist[i].prodtype = 1;
          commoditylist[i].selecttype = false;
        }
        if (buy_list.length != 0){
          for (let j = 0; j < buy_list.length; j++){
            for (let i = 0; i < commoditylist.length; i++) {
              if (buy_list[j].latticeCode == commoditylist[i].latticeCode){
                commoditylist[i].prodnum = commoditylist[i].prodnum + buy_list[j].prodnum;
                commoditylist[i].prodnumtype = buy_list[j].prodnumtype;
              }
            }
          }
        }
        that.setData({
          mnb_commodity: commoditylist
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
  getstorelist: function (hotelId, pageNo){//获取便利店商品
    const that = this;
    const buy_list = that.data.buylist;
    let linkData = {
      hotelId: hotelId,
      isStore: 1,
      pageNo: pageNo,
      pageSize: 10
    };
    wxrequest.getbldprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let records = resdata.data.records;
        for (let i = 0; i < records.length; i++) {
          records[i].prodnum = 0;
          records[i].prodnumtype = false;
          records[i].prodtype = 2;
          records[i].selecttype = false;
        }
        let store_list1 = that.data.storelist;
        const store_list2 = that.data.storelist;
        if (store_list1.length == 0) {
          store_list1 = records;
        } else {
          store_list1 = store_list2.concat(records);
        }
        if (buy_list.length != 0) {
          for (let j = 0; j < buy_list.length; j++) {
            for (let i = 0; i < store_list1.length; i++) {
              if (buy_list[j].prodCode == store_list1[i].prodCode && buy_list[j].prodtype == 2) {
                store_list1[i].prodnum = buy_list[j].prodnum;
                store_list1[i].prodnumtype = buy_list[j].prodnumtype;
              }
            }
          }
        }
        that.setData({
          pages: resdatas.pages,
          storelist: store_list1
        });
        wx.hideNavigationBarLoading();// 隐藏导航栏加载框
        wx.stopPullDownRefresh();// 停止下拉动作
        wx.hideLoading();// 隐藏加载框
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
  hotelstoryfun: function () {//酒店文化故事
    wx.navigateTo({
      url: '../hotelstorylist/hotelstorylist'
    })
  },
  mypage: function () {//我的
    wx.redirectTo({
      url: '../my/my'
    })
  },
  roomservice: function () {//客房服务
    wx.redirectTo({
      url: '../roomservice/roomservice'
    })
  },
  hotelmall: function (e) {//功能区跳转
    wx.redirectTo({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    })
  },
  reservation: function () {//客房协议价
    wx.redirectTo({
      url: '../reservation/reservation'
    })
  },
  details: function (e) {//商品详情
    const that = this;
    let prodcode = e.currentTarget.dataset.prodcode;//获取自定义属性
    let latticeId = e.currentTarget.dataset.latticeid;
    let cabId = that.data.cabId;
    let latticeCode = e.currentTarget.dataset.latticecode;
    let hotelprodid = e.currentTarget.dataset.hotelprodid;
    let img = e.currentTarget.dataset.img;
    let ptype = e.currentTarget.dataset.ptype;
    let funcprodid = e.currentTarget.dataset.funcprodid;
    let isempty = e.currentTarget.dataset.isempty;
    wx.navigateTo({
      url: '../details/details?latticeid=' + latticeId + '&latticecode=' + latticeCode + '&prodcode=' + prodcode + '&hotelprodid=' + hotelprodid + '&img=' + img + '&ptype=' + ptype + '&funcprodid=' + funcprodid + '&isempty=' + isempty
    });
  },
  tel: function () {//电话
    const that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.hotelBookingPhone
    })
  },
  mabview: function () {//地图
    const that = this;
    let hotelLongitude = that.data.hotelLongitude;
    let hotelLatitude = that.data.hotelLatitude;
    let hotelName = that.data.hotelName;
    wx.navigateTo({
      url: '../map/map?hotelLongitude=' + hotelLongitude + '&hotelLatitude=' + hotelLatitude + '&hotelName=' + hotelName
    })
  },
  connect: function () {//点击链接
    const that = this;
    that.connectWifi();//检测手机型号
    that.startWifi();
  },
  connectWifi: function () {//检测手机型号
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var system = '';
        if (res.platform == 'android') system = parseInt(res.system.substr(8));
        if (res.platform == 'ios') system = parseInt(res.system.substr(4));
        if (res.platform == 'android' && system < 6) {
          wx.showToast({
            title: '手机版本不支持',
          })
          return
        }
        if (res.platform == 'ios' && system < 11.2) {
          wx.showToast({
            title: '手机版本不支持',
          })
          return
        }
      }
    })
  },
  startWifi: function () {//初始化 Wi-Fi 模块
    var that = this
    wx.startWifi({
      success: function (res) {
        that.connected();//请求成功连接Wifi
      },
      fail: function (res) {
        wx.showToast({
          title: '接口调用失败',
        })
      }
    })
  },
  connected: function () {// 连接已知Wifi
    var that = this
    wx.connectWifi({
      SSID: that.data.wifiSsid,
      password: that.data.wifiPassword,
      success: function (res) {
        wx.showToast({
          title: 'wifi连接成功',
        })
      },
      fail: function (res) {
        wx.showToast({
          title: 'wifi连接失败',
        })
      }
    })
  },
  move: function () {},
  isLanding: function () {//判断是否授权登陆
    const that = this;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          that.getshoppingcart(app.globalData.userId);
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
  },
  plusfun: function (e) {//商品数量增加校验
    const that = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    setTimeout(function () {
      wx.hideLoading();
      const hotelId = that.data.hotelId;
      let cabCode = that.data.cabCode;
      const edata = e.currentTarget.dataset;
      let prod_amt = edata.prodamt + 1;
      if (edata.isclock == 1) {//柜子已锁定：1是锁定，0是未锁定
        wx.showToast({
          title: '此商品已锁定暂不支持购买，请选择其它商品',
          icon: 'none',
          duration: 2000
        })
        return;
      } else {
        if (edata.ptype == 1) {
          if (edata.isempty == 1) {
            wx.setStorageSync("plustype", 0);
            that.testadd(cabCode, hotelId, edata.hotelprodid, prod_amt);
            setTimeout(function () {
              if (wx.getStorageSync('plustype') == 0) {
                return false;
              } else {
                that.plusfun2(e);
              }
            }, 300);
          } else if (edata.prodnumtype == true) {
            wx.setStorageSync("plustype", 0);
            that.testadd(cabCode, hotelId, edata.hotelprodid, prod_amt);
            setTimeout(function () {
              if (wx.getStorageSync('plustype') == 0) {
                return false;
              } else {
                that.plusfun2(e);
              }
            }, 300);
          } else {
            that.plusfun2(e)
          }
        } else if (edata.ptype == 2) {
          cabCode = '';
          wx.setStorageSync("plustype", 0);
          that.testadd(cabCode, hotelId, edata.hotelprodid, prod_amt);
          setTimeout(function(){
            if (wx.getStorageSync('plustype') == 0) {
              return false;
            } else {
              that.plusfun2(e);
            }
          },300);
        }
      }
    }, 400);
  },
  plusfun2: function (e) {//商品数量增加
    const that = this;
    let cabCode = that.data.cabCode;
    let edata = e.currentTarget.dataset;
    let mnbcommodity = that.data.mnb_commodity;//迷你吧商品
    let storelist = that.data.storelist;//便利店商品
    let buy_list_data = that.data.buylist;
    let buy_list = JSON.stringify(buy_list_data);
    buy_list = JSON.parse(buy_list);
    let prod_amt = edata.prodamt + 1;
    let money = that.data.money;
    money = parseFloat(money);

    let index = -1;
    if (edata.ptype == 1) {
      index = mnbcommodity.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
        return item.latticeCode == edata.latticecode;
      });
      if (index != -1) {
        mnbcommodity[index].prodnumtype = true;
        mnbcommodity[index].prodnum = mnbcommodity[index].prodnum + 1;
        if (mnbcommodity[index].isFree == 1) {
          money = money + 0;
        } else {
          money = money + mnbcommodity[index].latticeProdAmt;
        }
      }
    } else {
      index = storelist.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
        return item.prodCode == edata.prodcode;
      });
      if (index != -1) {
        storelist[index].prodnumtype = true;
        storelist[index].prodnum = storelist[index].prodnum + 1;
        money = money + storelist[index].prodRetailPrice;
      }
    }
    let index1 = -1;

    if (edata.ptype == 1) {//迷你吧商品
      index1 = that.getlistindex(buy_list, edata.latticecode, edata.ptype);
      if (index1 == -1 && edata.isempty != 1) {
        let mnbcommodity_data2 = JSON.stringify(mnbcommodity[index]);
        mnbcommodity_data2 = JSON.parse(mnbcommodity_data2);
        mnbcommodity_data2.prodnum = 1;
        buy_list.push(mnbcommodity_data2);
      } else {
        let index2 = that.getlistindex(buy_list, edata.prodcode, 2);
        if (index2 == -1) {
          let mnbcommodity_data = JSON.stringify(mnbcommodity[index]);
          mnbcommodity_data = JSON.parse(mnbcommodity_data);
          mnbcommodity_data.prodtype = 2;
          mnbcommodity_data.prodnum = 1;
          buy_list.push(mnbcommodity_data);
        } else {
          if (buy_list[index2].prodtype == 2) {
            buy_list[index2].prodnum = buy_list[index2].prodnum + 1;
          }
        }
      }
    } else {//便利店商品
      index1 = that.getlistindex(buy_list, edata.prodcode, edata.ptype);
      if (index1 == -1) {
        buy_list.push(storelist[index]);
      } else {
        buy_list[index1].prodnum = buy_list[index1].prodnum + 1;
      }
    }
    money = money.toFixed(2);
    that.getlength(buy_list);
    that.setData({
      mnb_commodity: mnbcommodity,
      storelist: storelist,
      buylist: buy_list,
      money: money
    });
    wx.setStorage({
      key: 'money',
      data: money,
    });
    wx.setStorage({
      key: 'buylist',
      data: buy_list,
    });
  },
  testadd: function (cabCode, hotelId, hotelProdId, prodnum) {//检验商品是否可以增加数量
    const that = this;
    let linkData = {
      cabCode: cabCode,
      hotelId: hotelId,
      hotelProdId: hotelProdId,
      prodAmt: prodnum
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
      console.log(err)
    });
  },
  lessfun: function (e) {//商品数量减少
    const that = this;
    let edata = e.currentTarget.dataset;
    let mnbcommodity = that.data.mnb_commodity;//迷你吧商品
    let storelist = that.data.storelist;//便利店商品
    let buy_list_data = that.data.buylist;
    let buy_list = JSON.stringify(buy_list_data);
    buy_list = JSON.parse(buy_list);
    let money = that.data.money;
    money = parseFloat(money);
    let index = -1;
    if (edata.ptype == 1) {
      index = mnbcommodity.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
        return item.latticeCode == edata.latticecode;
      });
      if (index != -1) {
        if (mnbcommodity[index].prodnum == 1) {
          mnbcommodity[index].prodnumtype = false;
        }
        mnbcommodity[index].prodnum = mnbcommodity[index].prodnum - 1;
        if (mnbcommodity[index].isFree == 1) {
          money = money - 0;
        } else {
          money = money - mnbcommodity[index].latticeProdAmt;
        }
      }
    } else {
      index = storelist.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
        return item.prodCode == edata.prodcode;
      });
      if (index != -1) {
        if (storelist[index].prodnum == 1) {
          storelist[index].prodnumtype = false;
        }
        storelist[index].prodnum = storelist[index].prodnum - 1;
        money = money - storelist[index].prodRetailPrice;
      }
    }
    let index1 = -1;
    if (edata.ptype == 1) {
      if (mnbcommodity[index].prodnum > 1){
        index1 = that.getlistindex(buy_list, edata.prodcode, 2);
        if (buy_list[index1].prodnum > 1){
          buy_list[index1].prodnum = buy_list[index1].prodnum - 1;
        } else {
          buy_list.splice(index1, 1);
        }
      } else {
        index1 = that.getlistindex(buy_list, edata.latticecode, 1);
        buy_list.splice(index1, 1);
      }
    } else {
      index1 = that.getlistindex(buy_list, edata.prodcode, edata.ptype);
      if (index1 != -1) {
        if (storelist[index].prodnumtype == true) {
          buy_list[index1].prodnum = storelist[index].prodnum;
        } else {
          buy_list.splice(index1, 1);
        }
      }
    }
    if (money <= 0){
      money = 0.00
    }else{
      money = money.toFixed(2);
    }
    that.getlength(buy_list);
    that.setData({
      mnb_commodity: mnbcommodity,
      buylist: buy_list,
      storelist: storelist,
      money: money
    });
    wx.setStorage({
      key: 'money',
      data: money,
    });
    wx.setStorage({
      key: 'buylist',
      data: buy_list,
    });
  },
  onPullDownRefresh: function () {//下拉刷新
    const that = this;
    that.setData({
      pageNo: 1,
      mnb_commodity: [],
      storelist: []
    })
    that.getpordinfo(that.data.cabCode, that.data.hotelId);//获取迷你吧商品信息
    that.getstorelist(that.data.hotelId, that.data.pageNo);//获取便利店商品
  },
  onReachBottom: function () {//上拉加载
    var that = this;
    let pageNo = that.data.pageNo;
    let pages = that.data.pages;
    if (pageNo < pages) {
      wx.showLoading({// 显示加载图标
        title: '玩命加载中',
      });
      pageNo = pageNo + 1;// 页数+1
      that.setData({
        pageNo: pageNo
      })
      that.getstorelist(that.data.hotelId, pageNo);//获取便利店商品
    }
  },
  getlistindex: function (list, val, ptype){//获取购物车中是否存在该商品
    let type = true;
    let indexnum = -2;
    if(list.length != 0){
      for (let i = 0; i < list.length; i++) {
        if (type){
          if (ptype == 1) {//迷你吧商品下标
            if (list[i].latticeCode == val) {
              return i;
            } else {
              type = true;
            }
          } else if (ptype == 2) {//便利店商品下标
            if (list[i].prodCode == val && list[i].prodtype == 2) {
              return i;
            } else {
              type = true;
            }
          } else if (ptype == 3) {//其他功能区商品下标
            if (list[i].prodCode == val && list[i].prodtype == 3) {
              return i;
            } else {
              type = true;
            }
          }
        }
      }
      if (type && indexnum == -2){
        return -1;
      }
    } else {
      return -1;
    }
  },
  goshopcar: function(){//去购物车
    wx.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    });
  },
  getlength: function(list){//计算购物车商品数量和总价
    const that = this;
    let length = 0;
    let money = 0.00;
    let num = 0;
    let hasfuncprod = 0;
    for (let i = 0; i < list.length; i++) {
      let prodtotal = 0.00;
      length = length + list[i].prodnum;
      if(list[i].latticeId){
        prodtotal = parseFloat(list[i].latticeProdAmt);
      }else{
        prodtotal = list[i].prodnum * parseFloat(list[i].prodRetailPrice);
      }
      money = money + prodtotal;
      if (list[i].funcId != 1 && list[i].funcId != 2){
        num += 1;
      }
    }
    if (num != 0){
      hasfuncprod = 1;
    } else {
      hasfuncprod = 0;
    }
    money = money.toFixed(2);
    that.setData({
      prodlength: length,
      money: money,
      hasfuncprod: hasfuncprod
    })
  },
  getshoppingcart: function () {//处理购物车数据
    const that = this;
    const thatdata = this.data;
    const hasfuncprod = thatdata.hasfuncprod;//是否有其他功能区商品：0-没有，1-有
    const customerId = thatdata.userid;
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    if (hasfuncprod == 1){
      wx.hideLoading();
      that.goshopcar();
    } else {
      const buy_list = thatdata.buylist;
      let delivery_list1 = [];//现场配送商品
      let delivery_list2 = [];//快递配送商品
      let delivery_list3 = [];//迷你吧商品
      for (let i = 0; i < buy_list.length; i++) {
        if (buy_list[i].prodtype == 1 && buy_list[i].isEmpty != 1) {
          if (buy_list[i].isFree == 1) {
            buy_list[i].prodRetailPrice = 0.00;
            buy_list[i].totalprice = 0.00;
          } else {
            buy_list[i].totalprice = buy_list[i].latticeProdAmt;
          }
          delivery_list3.push(buy_list[i]);//迷你吧商品
        } else {
          if (buy_list[i].delivWay == 1 || buy_list[i].delivWay == 3) {
            buy_list[i].totalprice = buy_list[i].prodRetailPrice * buy_list[i].prodnum;
            delivery_list1.push(buy_list[i]);//现场配送商品
          } else {
            buy_list[i].totalprice = buy_list[i].prodRetailPrice * buy_list[i].prodnum;
            delivery_list2.push(buy_list[i]);//快递配送商品
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
          if (delivery_list1[i].hotelProdId == delivery_list1[j].hotelProdId) {
            delivery_list2[i].prodnum = delivery_list2[i].prodnum + delivery_list2[j].prodnum;
            delivery_list2[i].totalprice = parseFloat(delivery_list2[i].prodRetailPrice) * delivery_list2[i].prodnum;
            delivery_list2[i].totalprice = delivery_list2[i].totalprice.toFixed(2);
            delivery_list2.splice(j, 1);
          }
        }
      }
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
      that.suborder(delivery_list1, delivery_list3, customerId);
    }
  },
  suborder: function (delivery_list1, delivery_list3, customerId) {//提交订单
    const that = this;
    that.setData({
      subordertype: false
    });
    const thatdata = that.data;
    const shareuser = thatdata.shareuser;
    let shareUserId = '';
    let shareUserType = '';
    if(shareuser != '0' && shareuser != ''){
      shareUserId = shareuser.id;
      shareUserType = shareuser.type;
    }
    let delayPayFlag = 0;
    if (delivery_list3.length > 0) {//有迷你吧商品不支持待支付
      delayPayFlag = 0;
    } else {//没有有迷你吧商品支持待支付
      delayPayFlag = 1;
    }
    for (let i = 0; i < delivery_list1.length;i++) {
      delivery_list1[i].delivWay = 1;
      delivery_list1[i].latticeId = 0;
    }
    for (let i = 0; i < delivery_list3.length; i++) {
      delivery_list3[i].delivWay = 3;
      delivery_list3[i].funcId = 1;
      delivery_list3[i].funcProdId = 0;
    }
    let orderProd = delivery_list1.concat(delivery_list3);
    let lisr_order = [];
    for (let i = 0; i < orderProd.length; i++) {
      let prodinfo = {};
      prodinfo.prodOwnerOrgId = orderProd[i].prodOwnerOrgId;
      prodinfo.prodOwnerOrgKind = orderProd[i].prodOwnerOrgKind;
      prodinfo.hotelId = orderProd[i].hotelId;
      if (orderProd[i].delivWay == 3) {
        prodinfo.latticeId = orderProd[i].latticeId;
        prodinfo.funcProdId = 0;
      } else {
        prodinfo.funcProdId = orderProd[i].funcProdId;
      }
      prodinfo.hotelProdId = orderProd[i].hotelProdId;
      prodinfo.funcId = orderProd[i].funcId;
      prodinfo.prodCode = orderProd[i].prodCode;
      prodinfo.prodCount = orderProd[i].prodnum;
      prodinfo.prodPrice = orderProd[i].latticeProdAmt;
      prodinfo.prodPrice = orderProd[i].prodRetailPrice;
      prodinfo.totalAmount = orderProd[i].totalprice;
      prodinfo.deliveryWay = orderProd[i].delivWay;
      lisr_order.push(prodinfo);
    }
    let lump_sum = 0.00;
    let prodCount = 0;
    for (let i = 0; i < lisr_order.length; i++) {
      prodCount = parseInt(prodCount) + parseInt(lisr_order[i].prodCount);
      lump_sum = parseFloat(lump_sum) + parseFloat(lisr_order[i].totalAmount);
    }
    let linkData = {
      shareUserId: shareUserId,//分享者的用户Id,
      shareUserType: shareUserType,//分享者的用户类型(1:员工，2：顾客)
      cabId: thatdata.cabId,//柜子id
      roomCode: thatdata.roomCode,//房间号
      roomFloor: thatdata.roomFloor,//房间楼层
      contactName: '',//联系人姓名
      contactPhone: '',//联系人手机号码
      roomDeliveryRemark: '',//客房配送留言
      hotelId: thatdata.hotelId,//酒店ID
      customerId: customerId,//顾客id
      delayPayFlag: delayPayFlag,//是否支持待支付(0：否；1：是；有迷你吧商品不支持)
      totalAmount: lump_sum,//商品总价
      prodCount: prodCount,//商品总数量
      expressFee: 0,//快递费总额
      orderDetailDTOList: lisr_order,//订单商品信息
      couponAmount: 0.00,//优惠金额
      couponIds: []//优惠券id_list
    };
    wxrequest.postbuynow(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (lump_sum > 0){
          that.orderpayfun(resdata.data.id, resdata.data.orderCode, customerId, delayPayFlag);
        } else {
          wx.redirectTo({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + resdata.data.id + '&ishasmnb=' + delayPayFlag + '&redcode=-1'
          });
        }
      } else {
        wx.hideToast();//隐藏加载动画
        let msglist = resdata.msg;
        if (msglist.startsWith('msg')){
          let msglist2 = msglist.substring(3, msglist.length);
          let prodname = '';
          let msglist3 = msglist2.split(",");
          let buy_list = that.data.buylist;
          for (let j = 0; j < msglist3.length; j++) {
            for (let i = 0; i < buy_list.length; i++) {
              if (msglist3[j] == buy_list[i].hotelProdId && buy_list[i].prodtype == 2) {
                prodname = buy_list[i].prodShowName;
                buy_list.splice(i, 1);
              }
            }
          }
          that.setData({
            buylist: buy_list
          });
          that.getlength(buy_list);//计算购物车商品数量和总价
          wx.setStorage({
            key: 'buylist',
            data: buy_list
          });
          wx.showToast({
            title: prodname + '等商品库存不足已删除，请重新下单',
            icon: 'none',
            duration: 2000
          });
          setTimeout(function(){
            that.onPullDownRefresh();//刷新迷你吧、便利店数据
          },2500);
        } else {
          wx.showToast({
            title: msglist,
            icon: 'none',
            duration: 2000
          });
        }
        that.setData({
          subordertype: true
        });
        return false;
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  orderpayfun: function (id, order_Code, customerId, delayPayFlag) {//支付请求
    const that = this;
    const orderid = id;
    const orderCode = order_Code;
    let linkData = {
      appletType: app.globalData.appletType,
      id: orderid,
      customerId: customerId
    };
    wxrequest.postprodpay(linkData).then(res => {
      that.changestorage();
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
            wx.hideLoading();//隐藏加载动画
            if (res.errMsg === "requestPayment:ok") {
              that.confirmfun(orderid, orderCode, delayPayFlag);
            }
          },
          fail: function (res) {
            wx.hideLoading();//隐藏加载动画
            if (delayPayFlag == 1){
              wx.navigateTo({
                url: '../prodOrder/prodOrder?typeindex=3'
              });
            } else {
              wx.redirectTo({
                url: '../index/index'
              });
            }
          }
        })
      } else {
        wx.hideToast();//隐藏加载动画
        wx.showToast({
          title: '订单异常，请重新提交',
          icon: 'none',
          duration: 2000
        });
        that.setData({
          subordertype: true
        });
        return;
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  changestorage: function () {//清空购物车
    let kong = [];
    wx.setStorage({
      key: 'deliverylist1',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist2',
      data: kong,
    });
    wx.setStorage({
      key: 'deliverylist3',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist1',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist2',
      data: kong,
    });
    wx.setStorage({
      key: 'orderlist3',
      data: kong,
    });
    wx.setStorage({
      key: 'buylist',
      data: kong,
    });
  },
  confirmfun: function (orderid, ordercode, delayPayFlag) {//确认支付状态
    const that = this;
    let linkData = {
      orderCode: ordercode,
      appletType: app.globalData.appletType
    };
    wxrequest.confirmstatus(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdatas.result == 'SUCCESS') {
          wx.redirectTo({
            url: '../hotelmallsuccess/hotelmallsuccess?orderid=' + orderid + '&ishasmnb=' + delayPayFlag + '&redcode=' + resdatas.redCode
          });
        } else {
          if (delayPayFlag == 1) {
            wx.navigateTo({
              url: '../prodOrder/prodOrder?typeindex=3'
            });
          } else {
            wx.redirectTo({
              url: '../index/index'
            });
          }
        }
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
        that.setData({
          subordertype: true
        });
        return;
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  tzurl: function (e) {
    console.log();
    const that = this;
    let type;
    let urldata = e.currentTarget.dataset.url;
    if(urldata){
      type = urldata.substring(0,2);
      if(type == 'o:'){
        wx.navigateTo({
          url: '../otherview/otherview?url=' + urldata.substring(2)
        });
      } else {
        wx.reLaunch({
          url: '/'+ urldata.substring(2)
        });
      }
    }
  }
})