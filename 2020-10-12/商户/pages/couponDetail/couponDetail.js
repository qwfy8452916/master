// pages/couponDetail/couponDetail.js
const app = getApp();
import wxrequest from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //批次id
    selectResource: [],  //选择房源数据
    selectFunData: [], //选择功能区数据
    selectTypeId: [], //选择分类id
    selectprodData: [], //选择商品数据
    selectScene: [], //选择场景数据
    selectDrawWays: [], //选择渠道数据
    addCoupondata: {
      couponOwnerOrgKind: 3,
      couponType: 1,
      hotelRelationFlag: 3,
      couponLimit: 1,
      couponBatchName: '', //批次名称
      couponName: '', //优惠券名称
      couponRange: '', //优惠范围
      sceneCodes: [], //场景
      groupId: '', //选择分组
      discountWay: '', //优惠方式
      useLimitMoney: '', //使用门槛
      reduceMoney: '', //优惠券金额
      couponDiscount: '', //折扣
      discountMaxMoney: 0, //封顶金额
      discountMinBuyMoney: 0, //最低消费金额
      batchStartTime: '', //领取发放开始时间
      batchEndTime: '', //领取方法结束时间
      couponTermType: '', //使用有效期
      couponTermAfterDay: 1, //领取后第几天
      couponTermDays: '', //多少天内有效
      couponTermStartDate: '', //固定日期开始
      couponTermEndDate: '', //固定日期结束
      canDraw: 0, //可领取
      drawWays: [], //领取渠道
      drawCountTotal: 0, //领取总数量
      drawCountPerUser: 0, //每人领取数量
      canGive: 0, //可发放
      giveCountTotal: 0, //发放总数量
      giveCountPerUser: 0, //每人发放数量
      canSell: 0, //可售卖
      canGift: 0, //可发送
      batchHotelRelation: {
        hotelId: '', //酒店id
        funcRelationFlag: '', //功能区范围
        hotelProdRelationFlag: '', //商品范围
        batchHotelFuncRelations: [], //功能区数据
        batchHotelProdRelations: [], //商品数据
        roomResourceRelationFlag: '', //房源范围
        batchRoomResourceRelations: [], //房源数据
      }
    },
    groupName: '', //选择分组名称
    rangeData: [
      { name: "商品", id: 1 },
      { name: "订房", id: 2 },
    ], //优惠范围数据
    rangeIndex: '',
    funcData: [
      { name: '全部可用', id: 0 },
      { name: '指定可用', id: 1 },
      { name: '指定不可用', id: 2 },
    ],//功能区数据
    funIndex: '',
    roomResourceData: [
      { name: '全部可用', id: 0 },
      { name: '指定可用', id: 1 },
      { name: '指定不可用', id: 2 },
    ],//房源数据
    roomResourceIndex: '',
    prodData: [
      { name: '全部可用', id: 0 },
      { name: '指定可用', id: 1 },
      { name: '指定不可用', id: 2 },
    ],//功能区数据
    prodIndex: '',

    sceneIndex: '',
    discountWayData: [
      { name: '满减券', id: 1 },
      { name: '折扣券', id: 2 },
    ], //优惠方式
    discountIndex: '',
    termTypeData: [
      { name: '领取后', id: 0 },
      { name: '固定日期', id: 1 },
    ], //使用有效期
    termTypeIndex: '',
    afterDaydata: [
      { name: '即时', id: 1 },
      { name: '第二天', id: 2 },
      { name: '第三天', id: 3 },
      { name: '第四天', id: 4 },
      { name: '第五天', id: 5 },
      { name: '第六天', id: 6 },
      { name: '第七天', id: 7 },
    ], //领取后第几天数据
    afterDayIndex: 0,
    switchJudge:true,


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      id: options.id
    })
    this.checkCouponBatch();

    this.initValidate();//验证规则函数


  },

  //查看优惠券批次详情

  checkCouponBatch: function () {
    let that = this;
    wxrequest.checkCouponBatch(this.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowaddCoupondata = resdata.data;
        let nowrangeIndex;
        let nowfunIndex;
        let nowprodIndex;
        let nowdiscountIndex;
        let nowtermTypeIndex;
        let nowafterDayIndex;
        let nowroomResourceIndex;
        let nowselectFunData = nowaddCoupondata.batchHotelRelation.batchHotelFuncRelations;
        let nowselectprodData = nowaddCoupondata.batchHotelRelation.batchHotelProdRelations;
        let nowselectScene = nowaddCoupondata.batchSceneRelations;
        let nowselectDrawWays = nowaddCoupondata.batchDrawWayRelations;
        let nowselectResource = nowaddCoupondata.batchHotelRelation.batchRoomResourceRelations;
        for (let i = 0; i < that.data.rangeData.length; i++) {
          if (that.data.rangeData[i].id == nowaddCoupondata.couponRange) {
            nowrangeIndex = i
          }
        }
        for (let i = 0; i < that.data.funcData.length; i++) {
          if (that.data.funcData[i].id == nowaddCoupondata.batchHotelRelation.funcRelationFlag) {
            nowfunIndex = i
          }
        }
        for (let i = 0; i < that.data.prodData.length; i++) {
          if (that.data.prodData[i].id == nowaddCoupondata.batchHotelRelation.hotelProdRelationFlag) {
            nowprodIndex = i
          }
        }
        for (let i = 0; i < that.data.discountWayData.length; i++) {
          if (that.data.discountWayData[i].id == nowaddCoupondata.discountWay) {
            nowdiscountIndex = i
          }
        }
        for (let i = 0; i < that.data.termTypeData.length; i++) {
          if (that.data.termTypeData[i].id == nowaddCoupondata.couponTermType) {
            nowtermTypeIndex = i
          }
        }
        for (let i = 0; i < that.data.afterDaydata.length; i++) {
          if (that.data.afterDaydata[i].id == nowaddCoupondata.couponTermAfterDay) {
            nowafterDayIndex = i
          }
        }
        for (let i = 0; i < that.data.roomResourceData.length; i++) {
          if (that.data.roomResourceData[i].id == nowaddCoupondata.batchHotelRelation.roomResourceRelationFlag) {
            nowroomResourceIndex = i
          }
        }


        if (nowselectFunData) {
          nowselectFunData = nowselectFunData.map(item => {
            return {
              id: item.funcId,
              funcCnName: item.funcName,
              getTypeData: item.batchCategoryRelations,
              categoryIds: item.categoryIds
            }
          })
        }


        if (nowselectprodData) {
          nowselectprodData = nowselectprodData.map(item => {
            return {
              id: item.hotelProdId,
              prodKindName: item.prodOwnerOrgKindName,
              prodOwnerOrgName: item.prodOwnerOrgName,
              prodName: item.prodName,
              prodShowName: item.prodShowName,
            }
          })
        }
        if (nowselectScene) {
          nowselectScene = nowselectScene.map(item => {
            return {
              dictValue: item.sceneCode,
              dictName: item.sceneName,
            }
          })
        }

        if (nowselectDrawWays) {
          nowselectDrawWays = nowselectDrawWays.map(item => {
            return {
              dictValue: item.drawWay,
              dictName: item.drawWayName,
            }
          })
        }

        if (nowselectResource) {
          nowselectResource = nowselectResource.map(item => {
            return {
              id: item.roomResourceId,
              resourceName: item.resourceName,
              roomTypeName: item.roomTypeName,
              roomCount: item.roomCount,
              basicPrice: item.basicPrice,
            }
          })
        }

        wx.setStorageSync('selectFunData', nowselectFunData)
        wx.setStorageSync('selectprodData', nowselectprodData)
        wx.setStorageSync('selectScene', nowselectScene)
        wx.setStorageSync('selectDrawWays', nowselectDrawWays)
        wx.setStorageSync('selectResource', nowselectResource)

        that.setData({
          addCoupondata: nowaddCoupondata,
          rangeIndex: nowrangeIndex,
          funIndex: nowfunIndex,
          selectFunData: nowselectFunData,
          prodIndex: nowprodIndex,
          selectprodData: nowselectprodData,
          selectScene: nowselectScene,
          discountIndex: nowdiscountIndex,
          termTypeIndex: nowtermTypeIndex,
          afterDayIndex: nowafterDayIndex,
          selectDrawWays: nowselectDrawWays,
          roomResourceIndex: nowroomResourceIndex,
          selectResource: nowselectResource
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },



  //优惠范围
  bindPickerRange: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      'addCoupondata.couponRange': that.data.rangeData[index].id,
      rangeIndex: index
    })
    if (that.data.addCoupondata.couponRange == 1) {
      that.setData({
        selectResource: []
      })
      wx.removeStorageSync('selectResource')
    } else if (that.data.addCoupondata.couponRange == 2) {
      wx.removeStorageSync('selectFunData')
      wx.removeStorageSync('selectprodData')
      wx.removeStorageSync('selectTypeData')
      wx.removeStorageSync('classIndex')
      that.setData({
        selectFunData: [],
        selectprodData: [],
        selectTypeData: []
      })
    }
  },

  //选择功能区
  bindPickerFun: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      'addCoupondata.batchHotelRelation.funcRelationFlag': that.data.funcData[index].id,
      funIndex: index
    })
  },

  //选择房源
  bindPickerRoom: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      'addCoupondata.batchHotelRelation.roomResourceRelationFlag': that.data.funcData[index].id,
      roomResourceIndex: index
    })
  },

  //选择商品范围
  bindPickerprod: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      'addCoupondata.batchHotelRelation.hotelProdRelationFlag': that.data.funcData[index].id,
      prodIndex: index
    })
  },

  //添加功能区
  funselect: function () {
    wx.navigateTo({
      url: '../funselect/funselect'
    })
  },

  //选择商品
  prodselect: function () {
    wx.navigateTo({
      url: '../prodSelect/prodSelect'
    })
  },

  //选择房源
  roomSelect: function () {
    wx.navigateTo({
      url: '../roomSelect/roomSelect',
    })
  },

  //指定分类
  typebtn: function (e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    wx.removeStorageSync("selectTypeData");
    wx.removeStorageSync('selectTypeId');
    wx.setStorageSync('typesure', false)
    wx.setStorageSync('classIndex', index)
    wx.navigateTo({
      url: '../classifySelect/classifySelect?id=' + id
    })
  },

  //删除商品

  deleprod: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowselectprodData = this.data.selectprodData;
    nowselectprodData.splice(index, 1)
    this.setData({
      selectprodData: nowselectprodData
    })
    wx.setStorageSync('selectprodData', nowselectprodData)

  },


  //删除功能区
  deleFun: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowselectFunData = this.data.selectFunData;
    nowselectFunData.splice(index, 1)

    this.setData({
      selectFunData: nowselectFunData
    })
    wx.setStorageSync('selectFunData', nowselectFunData)
  },




  initValidate() {//验证规则函数
    const that = this;
    const rules = {
      couponBatchName: {
        required: true
      },
      couponName: {
        required: true
      },
      couponRange: {
        required: true
      },
      funcRelationFlag: {
        digits: true,
        required: that.data.addCoupondata.couponRange == 1 ? true : false
      },
      hotelProdRelationFlag: {
        digits: true,
        required: that.data.addCoupondata.couponRange == 1 ? true : false
      },
      roomResourceRelationFlag: {
        digits: true,
        required: that.data.addCoupondata.couponRange == 2 ? true : false
      },
      groupId: {
        required: true
      },
      discountWay: {
        required: true
      },
      batchStartTime: {
        required: true
      },
      batchEndTime: {
        required: true
      },
      couponTermType: {
        required: true
      },
      couponTermDays: {
        digits: true,
        required: that.data.addCoupondata.couponTermType === '0' ? true : false
      },
      couponTermStartDate: {
        required: that.data.addCoupondata.couponTermType === '1' ? true : false
      },
      couponTermEndDate: {
        required: that.data.addCoupondata.couponTermType === '1' ? true : false
      },


    }



    const messages = {
      couponBatchName: {
        required: '请输入批次名称'
      },
      couponName: {
        required: '请输入优惠券名称'
      },
      couponRange: {
        required: '请选择优惠范围'
      },
      funcRelationFlag: {
        required: '请选择功能区可用范围'
      },
      hotelProdRelationFlag: {
        required: '请选择商品可用范围'
      },
      roomResourceRelationFlag: {
        required: '请选择房源可用范围'
      },
      groupId: {
        required: '请选择优惠券分组'
      },
      discountWay: {
        required: '请选择优惠券方式'
      },
      batchStartTime: {
        required: '请选择领取发放开始时间'
      },
      batchEndTime: {
        required: '请选择领取发放结束时间'
      },
      couponTermType: {
        required: '请选择使用有效期方式'
      },
      couponTermDays: {
        required: '请输入领取后第几天有效'
      },
      couponTermStartDate: {
        required: '请选择固定日期开始时间'
      },
      couponTermEndDate: {
        required: '请选择固定日期结束时间'
      },


    }
    that.WxValidate = new WxValidate(rules, messages)
  },

  //验证提交
  formSubmit: function (e) {
    let that = this;

    this.initValidate();
    const params = e.detail.value;

    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false
    }

    // delete params.funcRelationFlag;
    // delete params.hotelProdRelationFlag
    // delete params.roomResourceRelationFlag

    let nowaddCoupondata = that.data.addCoupondata;
    // nowaddCoupondata.batchHotelRelation.hotelId = wx.getStorageSync('hotelId');
    // nowaddCoupondata.batchHotelRelation.batchHotelFuncRelations = that.data.selectFunData.map(item => {
    //   return {
    //     funcId: item.id,
    //     categoryIds: item.categoryIds,
    //   }
    // })
    // nowaddCoupondata.batchHotelRelation.batchHotelProdRelations = that.data.selectprodData.map(item => {
    //   return {
    //     hotelProdId: item.id,
    //     prodCode: item.prodCode
    //   }
    // })
    // nowaddCoupondata.batchHotelRelation.batchRoomResourceRelations = that.data.selectResource.map(item => {
    //   return {
    //     roomResourceId: item.id,
    //   }
    // })
    nowaddCoupondata.sceneCodes = that.data.selectScene.map(item => {
      return item.dictValue
    })
    nowaddCoupondata.drawWays = that.data.selectDrawWays.map(item => {
      return item.dictValue
    })
    if (that.data.addCoupondata.canDraw && nowaddCoupondata.drawWays < 1) {
      this.showModal({ msg: "请选择领取渠道" });
      return false;
    }

    Object.assign(nowaddCoupondata, params)

    that.setData({
      addCoupondata: nowaddCoupondata
    })
    that.editCouponBatch()
  },

  //修改
  editCouponBatch: function () {
    let that = this;
    let nownowaddCoupondata = that.data.addCoupondata;
    let linkData = {
      couponOwnerOrgKind: nownowaddCoupondata.couponOwnerOrgKind,
      couponType: nownowaddCoupondata.couponType,
      couponRange: nownowaddCoupondata.couponRange,
      couponLimit: nownowaddCoupondata.couponLimit,
      couponBatchName: nownowaddCoupondata.couponBatchName,
      couponName: nownowaddCoupondata.couponName,
      sceneCodes: nownowaddCoupondata.sceneCodes,
      batchStartTime: nownowaddCoupondata.batchStartTime,
      batchEndTime: nownowaddCoupondata.batchEndTime,
      couponTermType: nownowaddCoupondata.couponTermType,
      couponTermAfterDay: nownowaddCoupondata.couponTermAfterDay,
      couponTermDays: nownowaddCoupondata.couponTermDays,
      couponTermStartDate: nownowaddCoupondata.couponTermStartDate,
      couponTermEndDate: nownowaddCoupondata.couponTermEndDate,
      canDraw: nownowaddCoupondata.canDraw,
      drawWays: nownowaddCoupondata.drawWays,
      drawCountTotal: nownowaddCoupondata.drawCountTotal,
      drawCountPerUser: nownowaddCoupondata.drawCountPerUser,
      canGive: nownowaddCoupondata.canGive,
      giveCountTotal: nownowaddCoupondata.giveCountTotal,
      giveCountPerUser: nownowaddCoupondata.giveCountPerUser,
      canSell: nownowaddCoupondata.canSell,
      canGift: nownowaddCoupondata.canGift,
    };

    wxrequest.editCouponBatch(linkData, that.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
        })
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this;



    let typesure = wx.getStorageSync('typesure');

    if (this.data.funjudge) {
      let nowselectFunData = wx.getStorageSync('selectFunData')

      this.setData({
        selectFunData: nowselectFunData
      })
    }

    if (this.data.typejudge && typesure) {
      let nowselectFunData = wx.getStorageSync('selectFunData')
      let nowselectTypeData = wx.getStorageSync('selectTypeData');
      let nowselectTypeId = wx.getStorageSync('selectTypeId');
      let classIndex = wx.getStorageSync('classIndex');
      nowselectFunData[classIndex].getTypeData = nowselectTypeData;
      nowselectFunData[classIndex].categoryIds = nowselectTypeId;
      wx.setStorageSync('selectFunData', nowselectFunData)
      this.setData({
        selectFunData: nowselectFunData,
        selectTypeData: nowselectTypeData,
        selectTypeId: nowselectTypeId
      })

    }

    if (this.data.prodjudge) {
      let nowselectprodData = wx.getStorageSync('selectprodData')

      this.setData({
        selectprodData: nowselectprodData
      })
    }

    if (this.data.groupjudge) {

      this.setData({
        'addCoupondata.groupName': that.data.groupName,
        'addCoupondata.groupId': that.data.groupId
      })


    }

    if (this.data.roomjudge) {
      let nowselectResource = wx.getStorageSync('selectResource')
      this.setData({
        selectResource: nowselectResource
      })
    }

    if (this.data.scenejudge) {
      let nowselectScene = wx.getStorageSync('selectScene')
      this.setData({
        selectScene: nowselectScene
      })
    }

    if (this.data.drawWaysjudge) {
      let nowselectDrawWays = wx.getStorageSync('selectDrawWays')
      this.setData({
        selectDrawWays: nowselectDrawWays,
      })
    }


  },

  //展开缩放
  switkg:function(){
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})