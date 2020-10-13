const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    coupon_list: [],
    global_Data: '',
    adtype: 1,
    specfuntype: true,
    toView: '',
    convenienceStore: '',
    isIpx: app.globalData.isIpx,
    isSupportEn: 0,//中英文开关：0关，1开
    hotelId: '',
    bannerImageList: [],
    imgheights: [],//banner图
    current: 0,
    sortlist: '',//侧边栏
    typelist: '',//分类
    sortype: 0,
    typenum: 0,
    isScene: '',
    isSupportRmsvc: '',//是否支持客房服务 0 不支持，1 支持
    isSupportDelivery: '',//是否支持商城 0 不支持，1 支持
    isSupportRoomAlloc: '',//客房协议价 0 不支持，1 支持
    themecolor: '',//主题颜色
    funcId: '',//功能区id
    pageNum: 1,//当前第几页
    pages: '',//总页数
    typeid: '',//分类id
    commoditylist: [],//商品list
    minibar: '',//迷你吧支持功能（0：不支持，1：展示，2：展示+下单）
    roomDelivery: '',//酒店配送支持功能（1：展示，2：展示+下单）
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    hotelFuncDTOS1: '',//功能区
    hotelFuncDTOS2: '',//功能区
    shareuser: '', //分享人信息
    shareUserAvatarUrl: '',
    shareUserNickName: '',
    redbagtype: '',
    shareObj: '',
    regbagact_type: '',
    act_newcomer: '',
    redPacketShowFlag: '',
    spotpurchaseflag: '',
    funccnname: '',
    funcenname: '',
    sharenum: -1,
    isCanOpen: '',
    openEndTime: '',
    openStartTime: '',
    showtype: 0,//0：弹窗关闭，1：分享方式，2：朋友圈分享，3：认证选择，4：输入手机号
    shareCode: '',
    sharecontant: '',
    posterid: '',
    posterurl: '',
    certificationname: '',
    certificationtel: '',
    pageLayout: 1,//布局方式：1-商品，2-餐饮，3-卡券
    detailpupstype: false,//详情弹窗
    specificationtype: false,//规格弹窗
    detaillistpupstype: false,//明细弹窗
    foodlistdata: [],
    fooddatalist: [],//餐饮购物车
    foodtotalmoney: 0.00,//餐饮购物车总价
    foodtotalnum: 0,//餐饮购物车总数量
    alllistdata: [],//卡券、餐饮列表数据
    cy_detailsdata: '',//餐饮详情数据
    type_num: 0,
    speclist: [],//规格数据
    spec_prodname: '',
    spec_instruction: '',
    spec_name: '',
    spec_retailprice: '',
    spec_img: '',
    spec_num: 1,
    spec_typenum: 0,
    hotelProdId: '',
    proddata: {},
    delivWays: [],
    showlisttype: true,
    funcProdId: '',
    categoryid: '',
    iscertification: '',
    hotelAddImagesfirst: '',
    hotelinfo: '',
    ifshowRules:false,
    ruleData:{},
    isSupportManyTimesOrder: '',//是否支持多人下单
    bindAreaFlag: '',//0：无绑定  1：房间  2：餐桌  3：定点
    unpaidOrders: '',//待支付订单
    iscanselectcoupon: 1,
    isRefreshdata: 0,

    relateHotels: [],//导航列表
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
    that.setData({
      global_Data: app.globalData,
      adtype: app.globalData.adtype,
      iscertification: app.globalData.authFlagMobile,
      hotelId: app.globalData.hotelId,
      shareuser: app.globalData.shareUser,
      shareUserAvatarUrl: app.globalData.shareUserAvatarUrl,
      shareUserNickName: app.globalData.shareUserNickName,
      spotpurchaseflag: app.globalData.spotpurchaseflag
    });
    if (options.id == undefined){
      wx.getStorage({
        key: 'funcAreaId',
        success: function(res) {
          that.setData({
            funcId: res.data
          });
          that.get_funcinfo(res.data);//获取功能区详情
          that.get_shareactivity(res.data);//获取分享功能：-1：不支持，0：分享，1：分享赚钱
        },
      })
    } else {
      that.setData({
        funcId: options.id
      });
      console.log(this.data.funcId)
      that.get_funcinfo(options.id);//获取功能区详情
      that.get_shareactivity(options.id);//获取分享功能：-1：不支持，0：分享，1：分享赚钱
    }
    setTimeout(function () {
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
    }, 500);
    wx.getStorage({
      key: 'minibar',
      success(res) {
        that.setData({
          minibar: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportStore',
      success(res) {
        that.setData({
          convenienceStore: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomDelivery',
      success(res) {
        let isScenetype;
        if (res.data == 2) {
          isScenetype = 1;  //扫码进入
        } else {
          isScenetype = 0;  //非扫码进入
        }
        that.setData({
          roomDelivery: res.data,
          isScene: isScenetype
        })
      }
    });
    wx.getStorage({
      key: 'isSupportRmsvc',
      success(res) {
        that.setData({
          roomService: res.data
        })
      }
    });
    wx.getStorage({
      key: 'isSupportRoomAlloc',
      success(res) {
        that.setData({
          isSupportRoomAlloc: res.data
        })
      }
    });
    that.get_hotelinfo();
  },
  onShow: function(){
    wx.hideHomeButton();
    const that = this;
      this.setData({
        shareObj: app.globalData.shareObj,
        regbagact_type: app.globalData.regbagact_type,
        redPacketShowFlag: app.globalData.redPacketShowFlag,
      })
      if(app.globalData.typeval == 0) {
        let redbagtype = 0;
        if(app.globalData.shareUserNickName){
          redbagtype = 1;
        }
        if(app.globalData.shareUser != '' && app.globalData.shareUser.id != '0' && app.globalData.num == 1 && app.globalData.shareObjectId != null){}
        else {
          let act_newcomer_data = '';
          let actlistdata = app.globalData.actlistdata;
          if(actlistdata.length > 0) {
            act_newcomer_data = actlistdata[0];
          }
          that.setData({
            redbagtype: redbagtype,
            act_newcomer: act_newcomer_data
          });
          if(act_newcomer_data != '' && app.globalData.regbagact_type != 0){
            if(act_newcomer_data.isOpen == 0 && (app.globalData.redPacketShowFlag == 0 || app.globalData.shareObj != 3)){
              app.globalData.actlistdata = [];
            }
          }
          console.log(act_newcomer_data, app.globalData.shareObj, app.globalData.redPacketShowFlag, app.globalData.regbagact_type)
        }
        app.globalData.regbagact_type = 1;
      } else {
        that.setData({
          act_newcomer: ''
        })
      }
      if(app.globalData.isclearfooddata == 1) {
        that.setData({
          fooddatalist: []
        });
        app.globalData.isclearfooddata = 0;
      }
      if(that.data.isRefreshdata == 1) {
        that.get_unpaidOrders();
      }
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
  get_shareactivity: function (func_id) {
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      modelId: func_id,
      modelType: 1,
      shareType: 1,
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
  get_hotelinfo: function () {
    const that = this;
    wxrequest.gethotelinfo(app.globalData.hotelId).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          isSupportEn: resdatas.isSupportEn,
          isSupportRmsvc: resdatas.isSupportRmsvc,
          isSupportDelivery: resdatas.isSupportHshop,
          // isSupportRoomAlloc: resdatas.isSupportRoomAlloc,
          themecolor: JSON.parse(resdatas.hotelThemeDTO.themeDescription)
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
  get_funcinfo: function(id){//获取功能区详情  
    const that = this;
    let linkData = {
      cabId: app.globalData.cabId,
      enterStyle: app.globalData.enterStyle
    };
    wxrequest.getfuncdetail(id, linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      console.log(resdatas)
      if (resdata.code == 0) {
        wx.setNavigationBarTitle({
          title: resdatas.funcCnName + ' ' + resdatas.funcEnName
        });
        // let hotelAddImagesfirst;
        // let hotelAddImages;
        // if (resdatas.funcBannerImages.length != 0) {
        //   hotelAddImagesfirst = resdatas.funcBannerImages[0];
        //   hotelAddImages = resdatas.funcBannerImages;
        //   hotelAddImages.splice(0, 1);
        // } else {
        //   hotelAddImagesfirst = '';
        //   hotelAddImages = '';
        // }
        let iscanselectcoupon = 1;
        app.globalData.points = resdatas.points;
        let isRefreshdata = 0;
        if(resdatas.funcType == 7){
          resdatas.pageLayout = 4
        }
        // console.log(resdatas.funcType)
        // if(resdatas.funcType == 1){
        //   wx.redirectTo({
        //     url: '/pages/index/index?resdatas='+JSON.stringify(resdatas)
        //   })
        //   return
        // }
        // if(resdatas.funcType == 2){
        //   wx.redirectTo({
        //     url: '/pages/reservation/reservation?resdatas='+JSON.stringify(resdatas)
        //   })
        //   return
        // }
        // if(resdatas.funcType == 3){
        //   app.globalData.roomServicedata = JSON.stringify(resdatas);
        //   wx.redirectTo({
        //     url: '/pages/roomservice/roomservice?resdatas='+JSON.stringify(resdatas)
        //   })
        //   return 
        // }
        // if(func) func()
        if(resdatas.pageLayout == 2 && resdatas.isSupportManyTimesOrder == 1 && app.globalData.bindAreaFlag == 2) {
          iscanselectcoupon = 0;
          isRefreshdata = 1;
          that.get_unpaidOrders();
        }
        that.setData({
          isRefreshdata: isRefreshdata,
          iscanselectcoupon: iscanselectcoupon,
          hotelinfo: app.globalData.hotelInfo,
          // hotelAddImagesfirst: hotelAddImagesfirst,
          bannerImageList: resdatas.funcBannerImages,
          funccnname: resdatas.funcCnName,
          funcenname: resdatas.funcEnName,
          isCanOpen: resdatas.isCanOpen,
          openEndTime: resdatas.openEndTime,
          openStartTime: resdatas.openStartTime,
          pageLayout: resdatas.pageLayout,
          delivWays: resdatas.delivWays,
          isSupportManyTimesOrder: resdatas.isSupportManyTimesOrder,
          bindAreaFlag: app.globalData.bindAreaFlag,
          commoditylist: []
        });
        if(resdatas.pageLayout == 2){//餐饮
          that.get_allfoodlist(id);
        } else if(resdatas.pageLayout == 3){//卡券
          that.get_alldatalist(id);
        } else if(resdatas.pageLayout == 4){//导航
          that.get_allRelateHotel(id);
        } else {
          that.getsortlist(id);//获取酒店市场分类一级目录
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
  get_allRelateHotel(id){
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getFuncGuide(id).then(res => {
      wx.hideLoading();
      if (res.data.code == 0) {
        res.data.data.forEach(item => {
          item.hotelRelationDTO.description = item.hotelRelationDTO.description.split('\n')
        })
        this.setData({
          relateHotels: res.data.data
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
  get_allfoodlist(funcId){//获取功能区餐饮列表数据
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      funcId: funcId
    };
    wxrequest.getallfoodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let showlisttype = false;
        if(resdatas.length > 0){
          showlisttype = true;
        }
        that.setData({
          foodlistdata: resdatas,
          showlisttype: showlisttype
        });
        wx.hideLoading();// 隐藏加载框
        if(app.globalData.shareUser != '' && app.globalData.shareUser.id != '0' && app.globalData.num == 1 && app.globalData.shareObjectId != null){
          wx.navigateTo({
            url: '../hotelmalldetails/hotelmalldetails?funcprodid=' + app.globalData.shareObjectId + '&funccnname=' + that.data.funccnname + '&funcenname=' + that.data.funcenname + '&categoryid=' + app.globalData.categoryId
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
  get_alldatalist: function (funcId) {//获取功能区卡券列表数据
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      funcId: funcId,
      cabId: app.globalData.cabId,
      enterStyle: app.globalData.enterStyle
    };
    wxrequest.getalldatalist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let showlisttype = false;
        if(resdatas.length > 0){
          showlisttype = true;
        }
        that.setData({
          alllistdata: resdatas,
          showlisttype: showlisttype
        });
        wx.hideLoading();// 隐藏加载框
        if(app.globalData.shareUser != '' && app.globalData.shareUser.id != '0' && app.globalData.num == 1 && app.globalData.shareObjectId != null){
          wx.navigateTo({
            url: '../hotelmalldetails/hotelmalldetails?funcprodid=' + app.globalData.shareObjectId + '&funccnname=' + that.data.funccnname + '&funcenname=' + that.data.funcenname + '&categoryid=' + app.globalData.categoryId
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
  getsortlist: function (funcId) {//获取酒店市场分类一级目录
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      funcId: funcId,
      parentId: 0
    };
    wxrequest.gethotelclass(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (resdatas.length != 0) {
          that.setData({
            sortlist: resdatas,
            sortype: 0,
            typeid: resdatas[0].id
          });
          that.gettypelist(resdatas[0].id, app.globalData.hotelId);
        } else {
          that.setData({
            sortlist: '',
            typeid: ''
          });
          let typelistid = '';
          that.getcommoditylist(typelistid, app.globalData.hotelId, that.data.funcId, that.data.pageNum);
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
  gettypelist: function (parentId, hotelId) {//获取酒店市场分类二级目录
    const that = this;
    let funcId = that.data.funcId;
    let linkData = {
      hotelId: hotelId,
      funcId: funcId,
      parentId: parentId
    };
    wxrequest.gethotelclass(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let typelistid;
        if (resdatas.length == 0) {
          typelistid = parentId;
        } else {
          typelistid = resdatas[0].id;
        }
        that.setData({
          typelist: resdatas,
          typenum: 0,
          typeid: typelistid
        });
        that.getcommoditylist(typelistid, hotelId, funcId, that.data.pageNum);//获取分类下所有商品
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
  getcommoditylist: function (typelistid, hotelId, funcId, pageNum) {//获取分类下所有商品
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let isScene = that.data.isScene;
    let roomDelivery = that.data.roomDelivery;
    let linkData = {
      categoryId: typelistid,//市场分类id
      funcId: funcId,//功能区id
      hotelId: hotelId,
      isStore: 0,//是否是便利店
      pageNo: pageNum,
      pageSize: 10,
      cabId: app.globalData.cabId,
      enterStyle: app.globalData.enterStyle
    };
    wxrequest.getbldprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let commodity_list1 = that.data.commoditylist;
        const commodity_list2 = that.data.commoditylist;
        if (commodity_list1.length == 0) {
          commodity_list1 = resdata.data.records;
        } else {
          commodity_list1 = commodity_list2.concat(resdata.data.records);
        }
        if (commodity_list1.length != 0){
          commodity_list1.forEach(item => {
            item.ms_val = item.prodShowName.split('（');
          });
        }
        console.log(commodity_list1);
        that.setData({
          commoditylist: commodity_list1,
          pages: resdata.data.pages
        });
        wx.hideNavigationBarLoading();// 隐藏导航栏加载框
        wx.stopPullDownRefresh();// 停止下拉动作
        if(app.globalData.shareUser != '' && app.globalData.shareUser.id != '0' && app.globalData.num == 1 && app.globalData.shareObjectId != null){
          wx.navigateTo({
            url: '../hotelmalldetails/hotelmalldetails?funcprodid=' + app.globalData.shareObjectId + '&funccnname=' + that.data.funccnname + '&funcenname=' + that.data.funcenname + '&categoryid=' + app.globalData.categoryId
          });
        }
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
      wx.hideLoading();
      console.log(err)
    });
  },
  typechange: function (e) {//切换侧边栏
    const that = this;
    that.setData({
      sortype: e.currentTarget.dataset.num,
      typeid: e.currentTarget.dataset.id,
      pageNum: 1,
      commoditylist: []
    });
    that.gettypelist(e.currentTarget.dataset.id, that.data.hotelId);
  },
  changeType: function (e) {//切换二级分类
    const that = this;
    that.setData({
      typenum: e.currentTarget.dataset.num,  
      typeid: e.currentTarget.dataset.id,
      pageNum: 1,
      commoditylist: []
    });
    that.getcommoditylist(e.currentTarget.dataset.id, that.data.hotelId, that.data.funcId, that.data.pageNum);
  },
  details: function (e) {//查看详情
    let categoryid = '';
    if(e.currentTarget.dataset.categoryid) {
      categoryid = e.currentTarget.dataset.categoryid;
    }
    wx.navigateTo({
      url: '../hotelmalldetails/hotelmalldetails?funcprodid=' + e.currentTarget.dataset.funcprodid + '&funccnname=' + this.data.funccnname + '&funcenname=' + this.data.funcenname + '&categoryid=' + categoryid
    });
  },
  changetype: function (e) {//特产分类切换
    const that = this;
    let edata = e.currentTarget.dataset;
    that.setData({
      type: edata.type
    })
  },
  index: function () {//首页
    wx.reLaunch({
      url: '../index/index'
    })
  },
  roomservice: function () {//客房服务
    wx.reLaunch({
      url: '../roomservice/roomservice'
    })
  },
  mypage: function () {//我的
    wx.reLaunch({
      url: '../my/my'
    })
  },
  hotelmall: function (e) {//功能区跳转
    wx.reLaunch({
      url: '../specialty/specialty?id=' + e.currentTarget.dataset.id
    })
  },
  reservation: function () {//客房协议价
    wx.reLaunch({
      url: '../reservation/reservation'
    })
  },
  bindchange: function (e) {
    this.setData({ current: e.detail.current })
  },
  imageLoad: function (e) {//banner图高度自适应
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
  goshopcar: function () {
    wx.navigateTo({
      url: '../hotelmallcar/hotelmallcar'
    })
  },
  isLanding: function () {//判断是否授权登陆
    const that = this;
    that.dialog = that.selectComponent("#dialog");
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {// 已经授权，可以直接调用 getUserInfo 获取头像昵称          
          that.goshopcar();
        } else {
          that.dialog.showDialog();
        }
      }
    })
  },
  onPullDownRefresh: function () {//下拉刷新
    const that = this;
    that.setData({
      moretype: true,
      pageNum: 1,
      sortlist: [],
      typelist: [],
      commoditylist: [],
    })
    that.getsortlist(that.data.funcId);//获取酒店市场分类一级目录
  },
  onReachBottom: function () {//上拉加载
    var that = this;
    let pageNo = that.data.pageNum;
    let pages = that.data.pages;
    if (pageNo < pages) {
      wx.showLoading({// 显示加载图标
        title: '玩命加载中',
      });
      pageNo = pageNo + 1;// 页数+1
      that.setData({
        pageNum: pageNo
      })
      that.getcommoditylist(that.data.typeid, that.data.hotelId, that.data.funcId, pageNo);
    }
  },
  sharefun: function (e) {//获取分享码  shareStyle：1-要认证，2-已认证  sharenum：-1 不支持 0 分享 1 分享赚钱 10支持海报分享，11支持海报分享赚钱
    const that = this;
    const share_num = that.data.sharenum;
    let categoryidval = 0;
    if(that.data.categoryid) {
      categoryidval = that.data.categoryid;
    } else {
      categoryidval = 0;
    }
    let linkData = {
      cabCode: app.globalData.cabCode,
      hotelId: app.globalData.hotelId,
      funcId: that.data.funcId,
      shareObj: 1,
      shareObjId: -1,
      shareUserId: app.globalData.userId,
      shareUserType: 2,
      shareType: 1,//1：列表，2：单项，3：分类
      shareCode: app.globalData.sharecode,
      categoryId: categoryidval
    };
    wxrequest.postsharecode(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          shareCode: resdatas.shareCode,
          posterid: resdatas.id,
          detailpupstype: false
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
          that.sharefun();
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
  bindToView: function(e) {//侧边栏切换
    this.setData({
      toView: 'list-' + e.currentTarget.dataset.id,
      type_num: e.currentTarget.dataset.id
    })
  },
  detailpupsfun: function (e) {//餐饮详情
    const that = this;
    that.setData({
      categoryid: e.currentTarget.dataset.categoryid
    });
    let linkData = {
      funcProdId: e.currentTarget.dataset.funcprodid,
      latticeId: ''
    };
    wxrequest.getpordinfo(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          cy_detailsdata: resdatas
        });
        that.detailpupstypefun();
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
  detailpupstypefun: function () {//详情弹窗显示隐藏
    this.setData({
      detailpupstype: !this.data.detailpupstype
    })
  },
  addnumfun: function (e) {
    const that = this;
    const edata = e.currentTarget.dataset.detaildata;
    that.setData({
      hotelProdId: edata.hotelProdId,
      proddata: edata,
      funcProdId: edata.funcProdId
    });
    if(edata.isSupportSpec == 1){
      that.get_productspec(edata);
    } else {
      that.jioncar(edata);
    }
  },
  getlistindex: function (funcProdId, funcProdSpecId) {//获取购物车中是否存在该商品
    const that =this;
    const fooddata_list = that.data.fooddatalist;
    let type = -1;
    if (fooddata_list.length != 0) {
      for (let i = 0; i < fooddata_list.length; i++) {
        if(funcProdId == fooddata_list[i].funcProdId && funcProdSpecId == fooddata_list[i].funcProdSpecId){
          type = i;
        }
      }
      return type;
    } else {
      return -1;
    }
  },
  get_productspec: function(proddata) {//获取规格
    const that = this;
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
            spec_img: spec_list[0].bannerImageUrl,
            spec_prodname: proddata.prodShowName,
            spec_retailprice: spec_list[0].retailPrice,
            spec_instruction: spec_list[0].specInstruction,
            spec_name: spec_list[0].showName,
            spec_num: spec_list[0].prodnum            
          });
          that.spectoggle();
        } else {
          that.jioncar(proddata);
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
  spectoggle: function(){
    this.setData({
      specificationtype: !this.data.specificationtype,
      specfuntype: true
    });
    wx.hideLoading();
  },
  jioncar: function(edata) {//没有规格加入购物车
    const that = this;
    if(!that.data.specfuntype){
      return false;
    }
    that.setData({
      specfuntype: false
    });
    let fooddata_list = JSON.stringify(that.data.fooddatalist);
    fooddata_list = JSON.parse(fooddata_list);
    edata.funcProdSpecId = 0;
    edata.specname = '';
    edata.instruction = '';
    let index = that.getlistindex(edata.funcProdId, edata.funcProdSpecId);
    let prod_num = 1;
    if(index != -1) {
      prod_num = fooddata_list[index].prodnum;
    }
    const cabCode = '';
    if(index != -1) {
      prod_num = fooddata_list[index].prodnum;
    }
    wx.setStorageSync("plustype", 1);
    that.testadd(cabCode, app.globalData.hotelId, edata.hotelProdId, edata.funcProdSpecId, prod_num);
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
        that.get_fooddetail(edata, index);
        return false;

        
      }
    },300)
  },
  get_fooddetail(edata, index){//获取详情
    const that = this;
    wxrequest.getfooddetail(edata).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.jioncardata(resdatas, index);
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
  jioncardata(edata, index){
    const that = this;
    let fooddata_list = JSON.stringify(that.data.fooddatalist);
    fooddata_list = JSON.parse(fooddata_list);
    edata.prodnum = 1;
    edata.selecttype = true;
    edata.totalprice = edata.prodRetailPrice;
    if(index == -1) {
      fooddata_list.push(edata);
    } else {
      fooddata_list[index].prodnum = fooddata_list[index].prodnum + 1;
      fooddata_list[index].totalprice = fooddata_list[index].prodnum * parseFloat(fooddata_list[index].prodRetailPrice);
      fooddata_list[index].totalprice = fooddata_list[index].totalprice.toFixed(2);
    }
    that.setData({
      fooddatalist: fooddata_list
    });
    that.calculationallfun();
  },
  calculationallfun: function () {//计算总价
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let carlist = JSON.stringify(that.data.fooddatalist);
    const linkData = {
      shoppingCartProd: carlist
    }
    wxrequest.putshoppingCart(app.globalData.hotelId, linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let carlistdata = JSON.parse(resdatas);
        let foodtotal_money = 0.00;
        let foodtotal_num = 0;
        for(let i=0;i<carlistdata.length;i++){
          foodtotal_money = parseFloat(foodtotal_money) + parseFloat(carlistdata[i].totalprice);
          foodtotal_num = parseInt(foodtotal_num) + parseInt(carlistdata[i].prodnum);
        }
        foodtotal_money = foodtotal_money.toFixed(2);
        that.setData({
          fooddatalist: carlistdata,
          foodtotalmoney: foodtotal_money,
          foodtotalnum: foodtotal_num,
          specificationtype: false,
          specfuntype: true
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
  changespcfun: function(e){//切换规格
    const that = this;
    const index = e.currentTarget.dataset.num;
    const spec_list = that.data.speclist;
    that.setData({
      spec_img: spec_list[index].bannerImageUrl,
      spec_retailprice: spec_list[index].retailPrice,
      spec_instruction: spec_list[index].specInstruction,
      spec_name: spec_list[index].showName,
      spec_num: spec_list[index].prodnum,
      spec_typenum: index
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
    const index = that.data.spec_typenum;
    const hotelProdId = that.data.hotelProdId;
    const funcProdSpecId = spec_list[index].id;
    const funcProdId = that.data.funcProdId;
    const fooddata_list = that.data.fooddatalist;
    let prodindex = that.getlistindex(funcProdId, funcProdSpecId);
    if(spec_list[index].availableSaleQty == -999 || spec_list[index].availableSaleQty > 0) {
      if(type == 1) {//-
        if(spec_list[index].prodnum > 0) {
          spec_list[index].prodnum -= 1;
          that.setData({
            speclist: spec_list,
            spec_num: spec_list[index].prodnum
          });
        }
        that.setData({
          specfuntype: true
        });
      } else {//+
        let cabCode = '';
        let prod_num = spec_list[index].prodnum;
        if(prodindex != -1) {
          prod_num = parseInt(spec_list[index].prodnum) + parseInt(fooddata_list[prodindex].prodnum);
        }
        wx.setStorageSync("plustype", 1);
        that.testadd(cabCode, app.globalData.hotelId, hotelProdId, funcProdSpecId, prod_num);
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
            spec_list[index].prodnum += 1;
            that.setData({
              speclist: spec_list,
              spec_num: spec_list[index].prodnum,
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
      });
      that.setData({
        specfuntype: true
      });
    }
  },
  specaddfun: function() {
    const that = this;
    let prod_data = that.data.proddata;
    wxrequest.getfooddetail(prod_data).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.jioncardata2(resdatas);
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
  jioncardata2(proddata) {
    const that = this;
    let prod_data = proddata;
    const spec_list = that.data.speclist;
    const spec_index = that.data.spec_typenum;
    let fooddata_list = JSON.stringify(that.data.fooddatalist);
    fooddata_list = JSON.parse(fooddata_list);
    if(spec_list[spec_index].prodnum > 0){
      let index = that.getlistindex(prod_data.funcProdId, spec_list[spec_index].id);
      if(index == -1) {
        prod_data.instruction = spec_list[spec_index].specInstruction;
        prod_data.funcProdSpecId = spec_list[spec_index].id;
        prod_data.specname = spec_list[spec_index].specName;
        prod_data.prodnum = spec_list[spec_index].prodnum;
        prod_data.prodRetailPrice = spec_list[spec_index].retailPrice;
        prod_data.totalprice = spec_list[spec_index].prodnum * parseFloat(spec_list[spec_index].retailPrice);
        prod_data.totalprice = prod_data.totalprice.toFixed(2);
        prod_data.specname = spec_list[spec_index].showName;
        prod_data.selecttype = true;
        fooddata_list.push(prod_data);
      } else {
        fooddata_list[index].prodnum = spec_list[spec_index].prodnum + fooddata_list[index].prodnum;
        fooddata_list[index].totalprice = fooddata_list[index].prodnum * parseFloat(spec_list[spec_index].retailPrice);
        fooddata_list[index].totalprice = fooddata_list[index].totalprice.toFixed(2);
      }
      that.setData({
        spec_typenum: 0,
        fooddatalist: fooddata_list
      })
      that.calculationallfun();
    } else {
      wx.showToast({
        title: '请添加商品数量',
        icon: 'none',
        duration: 2000
      })
    }
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
  speccarfun: function (e) {//餐饮购物车数量加减
    const that = this;
    if(!that.data.specfuntype) {
      return false;
    }
    that.setData({
      specfuntype: false
    });
    const edata = e.currentTarget.dataset;
    let fooddata_list = that.data.fooddatalist;
    let detaillistpups_type = false;
    if(edata.type == 1) {
      if(fooddata_list[edata.typeindex].prodnum > 1) {
        fooddata_list[edata.typeindex].prodnum -= 1;
        fooddata_list[edata.typeindex].totalprice = fooddata_list[edata.typeindex].prodnum * parseFloat(fooddata_list[edata.typeindex].prodRetailPrice);
        fooddata_list[edata.typeindex].totalprice = fooddata_list[edata.typeindex].totalprice.toFixed(2);
      } else {
        fooddata_list.splice(edata.typeindex, 1);
      }
      if(fooddata_list.length > 0) {
        detaillistpups_type = true;
      }
      that.setData({
        fooddatalist: fooddata_list,
        detaillistpupstype: detaillistpups_type,
        specfuntype: true
      });
      that.calculationallfun();
    } else {
      let cabCode = '';
      const prod_num = fooddata_list[edata.typeindex].prodnum;
      wx.setStorageSync("plustype", 1);
      that.testadd(cabCode, app.globalData.hotelId, fooddata_list[edata.typeindex].hotelProdId, fooddata_list[edata.typeindex].funcProdSpecId, prod_num);
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
          fooddata_list[edata.typeindex].prodnum += 1;
          fooddata_list[edata.typeindex].totalprice = fooddata_list[edata.typeindex].prodnum * parseFloat(fooddata_list[edata.typeindex].prodRetailPrice);
          fooddata_list[edata.typeindex].totalprice = fooddata_list[edata.typeindex].totalprice.toFixed(2);
          that.setData({
            fooddatalist: fooddata_list
          });
          that.calculationallfun();
        }
      },300)
    }
  },
  settlementfun: function () {//去结算
    const that = this;
    that.setData({
      detaillistpupstype: false
    });
    let fooddatalist_data = JSON.stringify(that.data.fooddatalist);
    let delivways_data = JSON.stringify(that.data.delivWays);
    wx.navigateTo({
      url: '../foodsettlement/foodsettlement?fooddatalist=' + fooddatalist_data + '&delivways=' + delivways_data + '&foodtotalnum=' + that.data.foodtotalnum + '&foodtotalmoney=' + that.data.foodtotalmoney + '&funid=' + that.data.funcId + '&ismanyorder=' + that.data.isSupportManyTimesOrder + '&iscanselectcoupon=' + that.data.iscanselectcoupon
    })
  },
  adfun: function() {
    wx.navigateTo({
      url: '../adimg/adimg',
    })
  },
  hotelstoryfun: function () {//酒店文化故事
    wx.navigateTo({
      url: '../hotelstorylist/hotelstorylist'
    })
  },
  onShareAppMessage: function (options) {
    const that = this;
    that.setData({
      showtype: false
    });
    this.post_sharehistory()
    return {
      title: that.data.global_Data.shareUser.username?that.data.global_Data.shareUser.username+'给你发了一个现金红包，领取后可提入微信零钱':'好友给你发了一个现金红包，领取后可提入微信零钱',
      path: 'pages/login/login?sharecode=' + that.data.global_Data.sharecode,  // 路径，传递参数到指定页面。
      imageUrl: that.data.global_Data.imgurldata + 'shareimg.png', // 分享的封面图
      success: function (res) {// 转发成功

      },
      fail: function (res) {// 转发失败
        if (res.errMsg == 'shareAppMessage:fail cancel') {//用户取消转发
          console.log('用户取消转发');
        } else if (res.errMsg == 'shareAppMessage:fail') {//转发失败，其中detail message为详细失败信息
          console.log('转发失败');
        }
      }
    }
  },
  post_sharehistory: function(){//新增酒店分享记录
    const that = this;
    const linkData = {
      shareCode: app.globalData.sharecode
    }
    wxrequest.postsharehistory(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {} else {
        console.log(err)
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
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
  listdetailtoggle: function () {
    this.setData({
      detaillistpupstype: !this.data.detaillistpupstype
    })
  },
  get_unpaidOrders: function () {//多人下单获取待支付订单
    const that = this;
    const linkData = {
      funcId: that.data.funcId,
      cabId: app.globalData.cabId
    }
    wxrequest.getunpaidOrders(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          unpaidOrders: resdatas
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
  jumppay: function () {
    wx.navigateTo({
      url: '../foodpay/foodpay?funcid=' + this.data.funcId
    })
  },
  redirectfun: function (e) {//监听组件传回的userid
    if(app.globalData.typeval == 0) {
      this.setData({
        shareObj: app.globalData.shareObj,
        regbagact_type: app.globalData.regbagact_type,
        redPacketShowFlag: app.globalData.redPacketShowFlag,
      })
      let redbagtype = 0;
      if(app.globalData.shareUserNickName){
        redbagtype = 1;
      }
      if(app.globalData.shareUser != '' && app.globalData.shareUser.id != '0' && app.globalData.num == 1 && app.globalData.shareObjectId != null){}
      else {
        let act_newcomer_data = '';
        let actlistdata = app.globalData.actlistdata;
        if(actlistdata.length > 0) {
          act_newcomer_data = actlistdata[0];
        }
        this.setData({
          redbagtype: redbagtype,
          act_newcomer: act_newcomer_data
        });
        if(act_newcomer_data != '' && app.globalData.regbagact_type != 0){
          if(act_newcomer_data.isOpen == 0 && (app.globalData.redPacketShowFlag == 0 || app.globalData.shareObj != 3)){
            app.globalData.actlistdata = [];
          }
        }
      }
      app.globalData.regbagact_type = 1;
    }
  },
  get_couponlist: function (e) {//获取优惠券列表
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    const edata = e.currentTarget.dataset.proddata;
    let linkData = {
      userId: app.globalData.userId,
      couponRange: 1,
      hotelId: app.globalData.hotelId,
      prodOwnerOrgId: edata.prodOwnerOrgId,
      funcProdId: edata.funcProdId,
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
        this.coupon.showlist(edata);
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