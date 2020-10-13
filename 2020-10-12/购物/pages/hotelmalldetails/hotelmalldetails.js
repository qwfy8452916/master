const app = getApp();
import wxrequest from '../../request/api'
//1：店内送，2：快递送 , 3：迷你吧，4：自提取，5：电子券
Page({
  data: {
    coupon_list: [],
    global_Data: '',
    adtype: 1,
    iscanbtn: 1,
    ms_val: '',
    showtype: 0,
    shareCode: '',
    isCanBuy: 0,//是否可以购买 0-no,1-yes
    delivWaynum: 0,//配送方式 0-无,1-现场,2-快递,5-电子
    detailsdata: '',//详情信息
    imgheights: [],//banner图
    current: 0,//第一张banner图
    deliverylength: '',//购物车数量
    isvirtual: '',//是否是虚拟柜 false: 虚拟柜，true: 不是虚拟柜
    pjtotal: '',//评价总条数
    evaluatelist: '',//评价信息
    hotelId: '',
    prodCode: '',
    userid: '',
    coupontype: false,//是否显示优惠券列表
    couponlist: [],//优惠券列表
    funcprodid: '',
    money: '',//购物车金额
    buylist: '',//购物车数据
    shopcart_voucherlist: [],//卡券购物车
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    shareuser: '',
    spotpurchaseflag: '',
    shareFlag: '',
    isCanOpen: '',
    openEndTime: '',
    openStartTime: '',
    sharenum: -1,
    sharecontant: '',
    posterid: '',
    posterurl: '',
    certificationname: '',
    certificationtel: '',
    funcId: '',
    speclist: [],//规格数据
    spec_prodname: '',
    spec_instruction: '',
    spec_name: '',
    spec_retailprice: '',
    spec_num: 1,
    specfuntype: true,
    specificationtype: false,//规格弹窗
    delivWay_typenum: 0,
    spec_typenum: 0,
    isgocar: 0,
    iscertification: '',
    ifshowRules:false,
    ruleData:{},
  },
  onReady(){
    this.coupon = this.selectComponent("#couponlist");
  },
  onLoad: function (options) {
    const that = this;
    wx.hideShareMenu();
    wx.showLoading({
      title: '加载中',
    });
    wx.setNavigationBarTitle({
      title: options.funccnname + ' ' + options.funcenname
    });
    app.globalData.num = 0;
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
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
      key: 'isvirtual',
      success: function (res) {
        that.setData({
          isvirtual: res.data
        })
      },
    });
    that.setData({
      global_Data: app.globalData,
      adtype: app.globalData.adtype,
      shareuser: app.globalData.shareUser,
      userid: app.globalData.userId,
      hotelId: app.globalData.hotelId,
      funcprodid: options.funcprodid,
      spotpurchaseflag: app.globalData.spotpurchaseflag,
      shareFlag: app.globalData.shareFlag,
      iscertification: app.globalData.authFlagMobile
    });
    that.get_pordinfo(options.funcprodid, options.categoryid);//获取商品信息
  },
  onShow:function(){
    const that = this;
    wx.getStorage({
      key: 'buylist',
      success: function (res) {
        that.setData({
          buylist: res.data
        })
      },
      fail: function () {
        that.setData({
          buylist: []
        })
      }
    });
    wx.getStorage({
      key: 'shopcartvoucherlist',
      success: function (res) {
        that.setData({
          shopcart_voucherlist: res.data
        })
      },
      fail: function () {
        that.setData({
          shopcart_voucherlist: []
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
  },
  get_pordinfo: function (funcProdId, categoryid) {//获取商品信息
    const that = this;
    let linkData = {
      funcProdId: funcProdId,
      latticeId: '',
      cabId: app.globalData.cabId,
      enterStyle: app.globalData.enterStyle,
      categoryId: categoryid
    };
    wxrequest.getpordinfo(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        resdatas.prodnum = 1;
        resdatas.prodtype = 3;
        resdatas.selecttype = false;
        resdatas.categoryId = categoryid;
        let isCanBuy = 0;
        let delivWaynum = parseInt(resdatas.delivWays[0]);
        const delivWay = resdatas.delivWay;//配送方式
        if(delivWay == 5 && resdatas.prodType == 2){//卡券
          delivWaynum = 5;
          resdatas.prodtype = 5;
        }
        if(resdatas.availableSaleQty == -999 || resdatas.availableSaleQty > 0){
          isCanBuy = 1;
        } else {
          isCanBuy = 0;
        }
        let ms_val = resdatas.prodShowName.split('（');
        that.setData({
          ms_val: ms_val,
          detailsdata: resdatas,
          isCanBuy: isCanBuy,
          delivWaynum: delivWaynum,
          prodCode: resdatas.prodCode,
          isCanOpen: resdatas.isCanOpen,
          openEndTime: resdatas.openEndTime,
          openStartTime: resdatas.openStartTime,
          funcId: resdatas.funcId
        });
        that.getpjdatafun(resdatas.prodCode);
        that.getcouponlist(resdatas);
        that.get_shareactivity(resdatas.funcId, resdatas.funcProdId, resdatas.categoryId);
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
  getRules(){
    wx.showLoading({
      title: '加载中',
      mask:true
    });
    let params = {
      hotelId: this.data.hotelId
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
  getpjdatafun: function (prodcode) {//获取评价信息
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      pageSize: 1,
      prodCode: prodcode
    };
    wxrequest.getevaluation(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          evaluatelist: res.data.data.records,
          pjtotal: res.data.data.total
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
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
  get_shareactivity: function (func_id, funcProdId, categoryId) {
    const that = this;
    let category_Id = '';
    if(categoryId){
      category_Id = categoryId; 
    } else {
      category_Id = '';
    }
    let linkData = {
      hotelId: app.globalData.hotelId,
      modelId: func_id,
      modelType: 1,
      shareType: 2,
      shareObjId: funcProdId,
      categoryId: category_Id,
      isNewVersion: 1
    };
    wxrequest.getshareactivity(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          sharenum: resdatas
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
  seletdedelivWay: function (e) {
    const that = this;
    const details_data = that.data.detailsdata;
    const typenum = e.currentTarget.dataset.typenum;
    that.setData({
      isgocar: typenum
    });
    if(that.data.delivWaynum == 5) {
      that.addcarfun(typenum);
    } else {
      if(details_data.isSupportSpec == 1) {
        that.get_productspec(details_data);
      } else {
        that.setData({
          speclist: [],
          spec_prodname: details_data.prodShowName,
          spec_retailprice: details_data.prodRetailPrice,
          spec_instruction: '',
          spec_name: '',
          spec_num: 1
        });
        that.spectoggle();
      }
    }
  },
  addcarfun: function (typenum) {//卡券加入购物车
    const that = this;
    if(that.data.iscanbtn == 0) {
      return false
    }
    that.setData({
      iscanbtn: 0
    });
    let index = '';
    let money = parseFloat(that.data.money);
    let shopcart_voucher_list = that.data.shopcart_voucherlist;//卡券购物车
    let details_data = that.data.detailsdata;
    let delivWaynum = that.data.delivWaynum;//配送方式
    let cabCode = '';
    let prod_num = 1;
    if(details_data.prodType == 2 && delivWaynum == 5){//卡券
      index = that.getlistindex(shopcart_voucher_list, details_data.prodCode, -1, -1, 5);
      if(index != -1) {
        prod_num = shopcart_voucher_list[index].prodnum;
      }
      wx.setStorageSync("plustype", 1);
      that.testadd(cabCode, app.globalData.hotelId, details_data.hotelProdId, 0, prod_num);
      setTimeout(function(){
        if (wx.getStorageSync('plustype') == 0) {
          wx.setStorage({
            key: "plustype",
            data: 1
          });
          that.setData({
            iscanbtn: 1
          });
          wx.hideLoading();
          return false;
        } else {
          let detailsinfo = JSON.stringify(details_data);
          detailsinfo = JSON.parse(detailsinfo);
          detailsinfo.delivWay = 5;
          detailsinfo.prodnum = 1;
          if (index == -1) {//购物车没有该商品
            shopcart_voucher_list.push(detailsinfo);
            money = money + detailsinfo.prodRetailPrice;
          } else {//购物车有该商品
            shopcart_voucher_list[index].prodnum = shopcart_voucher_list[index].prodnum + 1;
            money = money + shopcart_voucher_list[index].prodRetailPrice;
          }
          if(typenum != 3){
            wx.showToast({
              title: '已成功加入购物车',
              icon: 'none',
              duration: 3000
            });
          }
        }
        money = money.toFixed(2);
        that.setData({
          shopcart_voucherlist: shopcart_voucher_list,
          money: money,
          iscanbtn: 1
        });
        if (typenum == 3){
          that.goshopcar();
        }
        wx.setStorage({
          key: 'shopcartvoucherlist',
          data: shopcart_voucher_list,
        });
        wx.setStorage({
          key: 'money',
          data: money,
        });
      },300);
    }
  },
  evaluatefun: function () {//查看全部评论
    wx.navigateTo({
      url: '../evaluate/evaluate?prodcode=' + this.data.prodCode
    })
  },
  goshopcar: function(){
    wx.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    });
    const funcArea_id = this.data.funcAreaId;
    wx.getStorage({
      key: 'funcAreaId',
      success: function(res) {
        if(res.data == ''){
          wx.setStorage({
            key: 'funcAreaId',
            data: funcArea_id
          });
        }
      },
      fail: function (){
        wx.setStorage({
          key: 'funcAreaId',
          data: funcArea_id
        });
      }
    })
  },
  isLanding: function (e) {//判断是否授权登陆
    const that = this;
    const edata = e.currentTarget.dataset;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          if (edata.typenum == 1) {//跳转到购物车
            that.goshopcar();
          } else {//加入购物车
            that.addcarfun(edata);
          }
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
  },
  getlistindex: function (list, val, ptype, funcProdSpecId, delivWaynum) {//获取购物车中是否存在该商品
    let type = true;
    let indexnum = -2;
    if (list.length != 0) {
      for (let i = 0; i < list.length; i++) {
        if (type) {
          if (ptype == 1) {//迷你吧商品下标
            if (list[i].latticeCode == val) {
              return i;
            } else {
              type = true;
            }
          } else if (ptype == 2){//便利店商品下标
            if (list[i].prodCode == val && list[i].prodtype == 2) {
              return i;
            } else {
              type = true;
            }
          } else if (ptype == 3) {//其他功能区商品下标
            if(funcProdSpecId == -1){
              if (list[i].prodCode == val && list[i].prodtype == 3 && list[i].delivWay == delivWaynum) {
                return i;
              } else {
                type = true;
              }
            } else {
              if (list[i].prodCode == val && list[i].prodtype == 3 && list[i].funcProdSpecId == funcProdSpecId && list[i].delivWay == delivWaynum) {
                return i;
              } else {
                type = true;
              }
            }
          } else if (ptype == -1){//卡券
            if (list[i].prodCode == val) {
              return i;
            } else {
              type = true;
            }
          }
        }
      }
      if (type && indexnum == -2) {
        return -1;
      }
    } else {
      return -1;
    }
  },
  getcouponlist: function (prodinfo) {//获取优惠券列表
    const that = this;
    let linkData = {
      categoryIds: '',
      cusId: that.data.userid,
      drawWay: 2,//1：领取中心，2：详情页，3：列表页
      funcId: prodinfo.funcId,
      funcProdId: prodinfo.funcProdId,
      hotelId: prodinfo.hotelId,
      hotelProdId: prodinfo.hotelProdId,
      sceneCode: '',
      prodOwnerOrgId: prodinfo.prodOwnerOrgId
    };
    wxrequest.getcouponlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let coupontype = that.data.coupontype
        if (resdatas.length == 0 && coupontype == true) {
          coupontype = false
        }
        that.setData({
          couponlist: resdatas,
          coupontype: coupontype
        });
        wx.hideLoading();
      } else {
        wx.hideLoading();
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
    this.setData({
      coupontype: !this.data.coupontype
    })
  },
  receive: function (e) {//领取优惠券
    const that = this;
    const detailsdata = that.data.detailsdata;
    let linkData = {
      funcId: detailsdata.funcId,
      funcProdId: detailsdata.funcProdId,
      hotelProdId: detailsdata.hotelProdId,
      batchId: e.currentTarget.dataset.id,
      cusId: that.data.userid,
      drawWay: 2,//1：领取中心；2：详情页；3：列表页
      getWay: 1
    };
    wxrequest.postcoupon(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdatas){
          wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 2000
          });
          that.getcouponlist(that.data.detailsdata);
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
  sharefun: function (e) {//获取分享码
    const that = this;
    const share_num = that.data.sharenum;
    const proddata = that.data.detailsdata;
    let linkData = {
      cabCode: app.globalData.cabCode,
      hotelId: app.globalData.hotelId,
      funcId: proddata.funcId,
      shareObj: 1,
      shareObjId: that.data.funcprodid,
      shareUserId: app.globalData.userId,
      shareUserType: 2,
      shareType: 2,//1：列表，2：单项，3：分类
      shareCode: app.globalData.sharecode,
      categoryId: proddata.categoryId
    };
    wxrequest.postsharecode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          shareCode: resdatas.shareCode,
          posterid: resdatas.id
        });
        if(share_num == 0 || share_num == 1){
          that.sharefun1();
        } else {
          that.setData({
            showtype: 1
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
      wx.hideLoading();
      console.log(err)
    });
  },
  closefun: function () {//关闭分享窗口
    this.setData({
      showtype: 0
    })
  },
  sharefun1: function () {//好友分享
    this.closefun();
    wx.navigateTo({
      url: '../employeeshare/employeeshare?employee=' + this.data.shareCode
    })
  },
  get_poster: function(){//朋友圈分享获取海报
    const that = this;
    wxrequest.getposter(that.data.posterid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          posterurl: resdatas,
          showtype: 2
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
  saveimg: function(){
    const that = this;
    wx.showToast({
      icon: 'loading',
      title: '正在保存图片',
      duration: 1000
    })
    let imgUrl = that.data.posterurl;
    wx.downloadFile({//下载文件资源到本地，客户端直接发起一个 HTTP GET 请求，返回文件的本地临时路径
      url: imgUrl,
      success: function (res) {
        // 下载成功后再保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,//返回的临时文件路径，下载后的文件会存储到一个临时文件
          success: function (res) {
            wx.showToast({
              title: '成功保存到相册',
              icon: 'success'
            })
          }
        })
      },
      fail: function (err) {
        if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
          wx.showModal({
            title: '提示',
            content: '需要您授权保存相册',
            showCancel: false,
            success:modalSuccess=>{
              wx.openSetting({
                success(settingdata) {
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限成功,再次点击保存图片按钮即可保存',
                      showCancel: false,
                    })
                  } else {
                    wx.showModal({
                      title: '提示',
                      content: '获取权限失败，将无法保存到相册哦~',
                      showCancel: false,
                    })
                  }
                },
                fail(failData) {
                  console.log("failData",failData)
                },
                complete(finishData) {
                  console.log("finishData", finishData)
                }
              })
            }
          })
        }
      }
    })
  },
  previewImg: function () {
    const that = this;
    let imglist = [];
    imglist.push(that.data.posterurl);
    wx.previewImage({
      current: imglist[0],     //当前图片地址
      urls: imglist               //所有要预览的图片的地址集合 数组形式
    })
  },
  certificationNo: function () {//直接分享
    const that = this;
    const share_num = that.data.sharenum;
    if(share_num == 0 || share_num == 1){
      that.sharefun1();
    } else {
      that.setData({
        showtype: 1
      });
    }
  },
  getPhoneNumber: function (e) {//点击获取手机号码按钮
    const that = this;
    wx.login({
      success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.getcheckSession(res.code, e);
      }
    });
  },
  getcheckSession: function (code, e) {
    const that = this;
    wx.checkSession({
      success: function () {
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {//取消认证，手输手机号
          that.setData({
            showtype: 4
          });
        } else {//同意授权
          let flag = 1;
          let name = '';
          let phone = '';
          that.post_userphonenumber(code, e.detail.iv, e.detail.encryptedData, flag, name, phone);
        }
      },
      fail: function () {
        that.getPhoneNumber();
      }
    });
  },
  post_userphonenumber: function(code, iv, encryptedData, flag, name, phone){//获取微信绑定的手机号
    const that = this;
    const linkData = {
      code: code,
      iv: iv,
      encryptedData: encryptedData,
      flag: flag,
      nickName: name,
      phoneNumber: phone,
      hotelId: app.globalData.hotelId
    }
    wxrequest.postuserphonenumber(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if(resdatas.mobile){
          that.setData({
            showtype: 0,
            iscertification: 1
          });
          app.globalData.authFlagMobile = 1;
          that.isLanding();
        } else {//获取手机号失败，手输手机号
          that.setData({
            showtype: 4
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
      wx.hideLoading();
      console.log(err)
    });
  },
  put_certification: function(certificationname, certificationtel){//保存认证手机号
    const that = this;

    let flag = 0;
    let iv = '';
    let code = '';
    let encryptedData = '';
    that.post_userphonenumber(code, iv, encryptedData, flag, certificationname, certificationtel);

    let fatherUserId = '';
    let fatherUserType = '';
    if(that.data.shareuser != ''){
      fatherUserId = that.data.shareuser.id;
      fatherUserType = that.data.shareuser.type;
    }
    const linkData = {
      fatherUserId: fatherUserId,
      fatherUserType: fatherUserType,
      hotelId: app.globalData.hotelId,
      mobile: certificationtel,
      name: certificationname,
      shareCodeId: that.data.posterid,
      bindShareCode: app.globalData.sharecode
    }
    wxrequest.putcertification(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        console.log('成功');
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
  certificationnamefun: function(e){//认证称呼
    this.setData({
      certificationname: e.detail.value
    })
  },
  certificationtelfun: function(e){//认证手机
    this.setData({
      certificationtel: e.detail.value
    })
  },
  certificationfun: function(){//确认提交认证信息
    const that = this;
    const certification_name = that.data.certificationname;
    const certification_tel = that.data.certificationtel;
    if(certification_name == ''){
      wx.showToast({
        title: '请填写您的称呼',
        icon: 'none',
        duration: 2000
      });
      return false;
    } else if(certification_tel == '' || !/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(certification_tel)){
      wx.showToast({
        title: '请正确填写您的手机号码',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else {
      that.put_certification(certification_name, certification_tel);
    }
  },
  isLanding: function () {//判断是否授权登陆
    const that = this;
    const share_num = that.data.sharenum;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称
          if(share_num == 0 || share_num == 1){
            that.sharefun1();
          } else {
            that.setData({
              showtype: 1
            });
          }
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    const that = this;
    const share_num = that.data.sharenum;
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        if(share_num == 0 || share_num == 1){
          that.sharefun1();
        } else {
          that.setData({
            showtype: 1
          });
        }
      }
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
  getdata() {//获取finclist
    const that = this;
    let datajson = {};
    let finclist = [];//功能区商品id+商品总价
    let details_data = JSON.stringify(that.data.detailsdata);//现场配送商品
    details_data = JSON.parse(details_data);
    let datainfo = {};
    datainfo.funcId = details_data.funcId;
    datainfo.funcProdId = details_data.funcProdId;
    datainfo.hotelProdId = details_data.hotelProdId;
    datainfo.prodOwnerOrgId = details_data.prodOwnerOrgId;
    datainfo.prodCount = details_data.num;
    datainfo.prodPrice = details_data.prodRetailPrice;
    datainfo.totalAmount = details_data.totalprice;
    datainfo.funcProdSpecId = details_data.funcProdSpecId;
    finclist.push(datainfo);
    datajson.finclist = finclist;
    return datajson;
  },
  get_productspec: function(proddata) {//获取规格
    const that = this;
    const details_data = that.data.detailsdata;
    wx.showLoading({
      title: '加载中',
    });
    const linkData = {
      funcProdId: proddata.funcProdId
    }
    wxrequest.getproductspec(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let spec_list = [];
      if (resdata.code == 0) {
        for(let i=0;i<resdatas.length;i++){
          if(resdatas[i].availableSaleQty == -999 || resdatas[i].availableSaleQty > 0) {
            resdatas[i].prodnum = 1;
          } else {
            resdatas[i].prodnum = 0;
          }
          spec_list.push(resdatas[i]);
        }
        if(spec_list.length > 0) {
          that.setData({
            speclist: spec_list,
            spec_prodname: details_data.prodShowName,
            spec_retailprice: spec_list[0].retailPrice,
            spec_instruction: spec_list[0].specInstruction,
            spec_name: spec_list[0].showName,
            spec_num: spec_list[0].prodnum            
          });
        } else {
          that.setData({
            speclist: [],
            spec_prodname: details_data.prodShowName,
            spec_retailprice: details_data.prodRetailPrice,
            spec_instruction: '',
            spec_name: '',
            spec_num: 1
          });
        }
        wx.hideLoading();
        that.spectoggle();
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
  spectoggle: function(){
    this.setData({
      specificationtype: !this.data.specificationtype,
      specfuntype: true
    });
  },
  changespcfun: function(e){//切换规格
    const that = this;
    const index = e.currentTarget.dataset.num;
    const spec_list = that.data.speclist;
    that.setData({
      spec_retailprice: spec_list[index].retailPrice,
      spec_instruction: spec_list[index].specInstruction,
      spec_name: spec_list[index].showName,
      spec_num: spec_list[index].prodnum,
      spec_typenum: index
    })
  },
  changedelivWayfun: function(e){//切换配送方式
    const that = this;
    const delivWay = e.currentTarget.dataset.delivway;
    const index = e.currentTarget.dataset.num;
    that.setData({
      delivWay_typenum: index,
      delivWaynum: delivWay
    })
  },
  specjoinfun: function(e){//规格数量加减
    const that = this;
    if(!that.data.specfuntype){
      return false;
    }
    that.setData({
      specfuntype: false
    });
    const type = e.currentTarget.dataset.type;
    const spec_list = that.data.speclist;
    let details_data = JSON.stringify(that.data.detailsdata);
    details_data = JSON.parse(details_data);
    const hotelProdId = that.data.detailsdata.hotelProdId;
    const index = that.data.spec_typenum;
    const buylist_data = that.data.buylist;//购物车
    const delivWaynum = parseInt(that.data.delivWaynum);//已选配送方式
    let prod_num = that.data.spec_num;
    let funcProdSpecId = 0;
    if(details_data.isSupportSpec == 0 || spec_list[index].availableSaleQty == -999 || spec_list[index].availableSaleQty > 0) {    
      if(spec_list.length > 0) {//有规格
        funcProdSpecId = spec_list[index].id;
      }
      if(type == 1) {//-
        if(prod_num > 1) {
          if(spec_list.length > 0) {//有规格
            spec_list[index].prodnum -= 1;
          } 
          prod_num -= 1;
          that.setData({
            speclist: spec_list,
            spec_num: prod_num
          });
        }
        that.setData({
          specfuntype: true
        });
      } else {//+
        let prod_number = 0;
        let prod_index = that.getlistindex(buylist_data, details_data.prodCode, 3, funcProdSpecId, delivWaynum);
        if(prod_index == -1) {
          prod_number = that.data.spec_num;
        } else {
          prod_number = buylist_data[prod_index].prodnum;
        }
        let cabCode = '';
        wx.setStorageSync("plustype", 1);
        that.testadd(cabCode, app.globalData.hotelId, hotelProdId, funcProdSpecId, prod_number);
        setTimeout(function(){
          if (wx.getStorageSync('plustype') == 0) {
            wx.setStorage({
              key: "plustype",
              data: 1
            });
            that.setData({
              specfuntype: true
            });
            wx.hideLoading();
            return;
          } else {
            if(spec_list.length > 0) {//有规格
              spec_list[index].prodnum += 1;
            }
            prod_num += 1;
            that.setData({
              speclist: spec_list,
              spec_num: prod_num,
              specfuntype: true
            });
          }
        },300)
      }
    } else {
      wx.showToast({
        title: '该规格商品已售罄，请选择其他规格商品',
        icon: 'none',
        duration: 3000
      })
    }
  },
  specaddfun: function() {
    const that = this;
    const isgocar = that.data.isgocar;
    let funcid_list = app.globalData.funcids;
    let funcid_type = 0;
    let details_data = JSON.stringify(that.data.detailsdata);
    details_data = JSON.parse(details_data);
    const spec_list = that.data.speclist;//规格数据
    const spec_index = that.data.spec_typenum;//规格index
    const delivWaynum = parseInt(that.data.delivWaynum);//已选配送方式
    let buylist_data = that.data.buylist;//购物车
    const spec_num = that.data.spec_num;
    const specname = that.data.spec_name;
    let money = parseFloat(that.data.money);
    money = money.toFixed(2);
    let totalprice = 0.00;
    let funcProdSpecId = -1;
    let prodRetailPrice = 0.00;
    if(spec_list.length > 0) {
      funcProdSpecId = spec_list[spec_index].id;
      prodRetailPrice = spec_list[spec_index].retailPrice;
      totalprice = spec_num * parseFloat(spec_list[spec_index].retailPrice);
      totalprice = totalprice.toFixed(2);
    } else {
      funcProdSpecId = 0;
      prodRetailPrice = details_data.prodRetailPrice;
      totalprice = spec_num * parseFloat(details_data.prodRetailPrice);
      totalprice = totalprice.toFixed(2);
    }
    money = parseFloat(money) + parseFloat(totalprice);
    money = money.toFixed(2);
    let index = that.getlistindex(buylist_data, details_data.prodCode, 3, funcProdSpecId, delivWaynum);
    if(spec_num > 0) { 
      if(index == -1) {
        details_data.funcProdSpecId = funcProdSpecId;
        details_data.prodRetailPrice = prodRetailPrice;
        details_data.delivWay = delivWaynum;
        details_data.prodnum = spec_num;
        details_data.specname = specname;
        buylist_data.push(details_data);
      } else {
        buylist_data[index].prodnum = parseInt(buylist_data[index].prodnum) + parseInt(spec_num);
      }
      for(let i=0;i<funcid_list.length;i++){
        if(details_data.funcId == funcid_list[i]) {
          funcid_type = 1;
        }
      }
      if(delivWaynum == 2) {
        if(funcid_type == 0) {
          funcid_list.push(details_data.funcId);
        }
        app.globalData.funcids = funcid_list;
      }
      that.setData({
        money: money,
        buylist: buylist_data,
        spec_num: 0
      });
      wx.setStorage({
        key: 'buylist',
        data: buylist_data,
      });
      wx.setStorage({
        key: 'money',
        data: money,
      });
      if(isgocar != 3){
        wx.showToast({
          title: '已成功加入购物车',
          icon: 'none',
          duration: 3000
        });
        that.spectoggle();
      } else {
        that.spectoggle();
        that.goshopcar();
      }
    } else {
      wx.showToast({
        title: '请添加商品数量',
        icon: 'none',
        duration: 2000
      })
    }
  },
  adfun: function() {
    wx.navigateTo({
      url: '../adimg/adimg',
    })
  },
  backfun: function () {
    wx.navigateBack({
      delta: 1
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
  get_couponlist: function () {//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let linkData = {
      userId: app.globalData.userId,
      couponRange: 1,
      hotelId: app.globalData.hotelId,
      prodOwnerOrgId: that.data.detailsdata.prodOwnerOrgId,
      funcProdId: that.data.detailsdata.funcProdId,
      drawWay: 2
    };
    wxrequest.getcouponlist(linkData).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let resdatas = res.data.data.map(item => {
          item.batchStartTime = item.batchStartTime.substring(0,10);
          item.batchEndTime = item.batchEndTime.substring(0,10);
          return item;
        });
        that.setData({
          coupon_list: resdatas
        });
        this.coupon.showlist(that.data.detailsdata);
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
})