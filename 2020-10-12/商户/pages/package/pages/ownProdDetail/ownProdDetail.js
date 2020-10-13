// pages/package/pages/ownProdDetail/ownProdDetail.js
const app = getApp();
const apiUrl = app.globalData.requestUrl;
import wxrequest from '../../../../utils/api'
import WxValidate from '../../../../utils/WxValidate'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    authzData: {}, //功能权限
    id: "", //id
    pId: '',
    isInvShow: false,
    isSafeInv: true,
    isFreeShip: false,
    isPickUp: false,
    isNativeProd: false,
    pTypeList: [],   //商品形式列表
    pTypeListIndex: '',
    //电子券选择
    eleCouponsData: [],
    functionData: [], //功能区分类数据
    dateUnit: [
      { name: "天" },
      { name: "月" },
      { name: "年" },
    ], //保质期单位
    dateUnitIndex: 0,
    delivWayList: [], //配送方式数据
    expressFeeList: [], //快递费数据
    expressFeeIndex: '',
    pickUpPointList: [], //自提点数据


    ownProdData: {
      prodName: '', //商品名称
      prodShowName: '', //显示名称
      prodCode: '', //商品编码
      prodType: '', //商品形式
      qualityTime: '', //保质期
      timeType: '天', //保质期单位

      prodUnitMeasure: '', //单位
      prodSupplyPrice: '', //供货价
      prodRetailPrice: '', //零售价
      prodMarketPrice: '', //划线价
      delivWays: [], //配送方式
      pickUpPointIds: [], //自提点id

      isNeedInv: false, //酒店库存
      prodSafeCount: '', //安全库存
      availableSaleQty: '', //可售数量
      isFreeShipping: true, //快递费是否包邮
      expressFeeId: '', //快递模板
      prodLogoPath: '', //列表图路径
      prodLogoUrl: '', //列表图url
      bannerImages: [], //详情banner图路径
      bannerImageList: [], //详情banner图url
      descImageList: [], //商品描述图
      statisticsCategoryId: 0,
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      id: options.id,
      authzData: wx.getStorageSync("pageAuthority"),
    })

    this.getExpressFee();


    this.ownCommodityDetail();

  },

  //获取自营商品信息
  ownCommodityDetail: function () {
    let that = this;
    wxrequest.ownCommodityDetail(this.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let noweleCouponsData = that.data.eleCouponsData;
        let nowpTypeListIndex = that.data.pTypeListIndex;


        let nowtimeType = resdata.data.prodProductDTO.prodWarrantyPeriod;
        nowtimeType = nowtimeType.substring(nowtimeType.length, nowtimeType.length - 1);
        let nowqualityTime = resdata.data.prodProductDTO.prodWarrantyPeriod.substring(1, nowtimeType.length - 1);
        console.log(nowqualityTime)
        let nowdateUnitIndex = that.data.dateUnitIndex;

        noweleCouponsData = resdata.data.elecBatchList.map(item => {
          return {
            couponTypeName: '',
            couponType: item.batchType,
            couponId: item.batchId,
            couponName: item.batchName,
            couponCount: item.count,
            couponSort: item.sort,
          }
        })

        let nowbannerImages = resdata.data.bannerImageList.map(item => {
          return item.imagePath
        })

        let nowbannerImageList = resdata.data.bannerImageList.map(item => {
          return { imageUrl: item.imageUrl }
        })

        let nowdescImageList = resdata.data.descImageList.map(item => {
          return {
            imageUrl: item.imageUrl,
            imagePath: item.imagePath,
            sort: item.sort
          }
        })

        let nowfunctionData = resdata.data.funcParams.map(item => {
          let arr = [];

          for (let i in item.marketCategorys) {
            arr.push({
              categoryName: item.marketCategorys[i]
            })
          }



          return {
            funcId: item.funcId,
            funcName: item.funcName,
            classifyIds: item.marketCategoryIds ? item.marketCategoryIds : [],
            classifyData: arr
          }
        })


        let nowownProdData = {
          prodName: resdata.data.prodProductDTO.prodName,
          prodShowName: resdata.data.prodProductDTO.prodShowName,
          prodCode: resdata.data.prodProductDTO.prodCode,
          prodType: resdata.data.prodProductDTO.prodType,
          qualityTime: nowqualityTime,
          timeType: nowtimeType,
          prodWarrantyPeriod:resdata.data.prodProductDTO.prodWarrantyPeriod,
          prodUnitMeasure: resdata.data.prodProductDTO.prodUnitMeasure,
          prodSupplyPrice: resdata.data.prodSupplyPrice,
          prodRetailPrice: resdata.data.prodRetailPrice,
          prodMarketPrice: resdata.data.prodMarketPrice,
          delivWays: resdata.data.delivWays,
          pickUpPointIds: resdata.data.pickUpPointIds,
          isNeedInv: resdata.data.isNeedInv,
          prodSafeCount: resdata.data.prodSafeCount,
          availableSaleQty: resdata.data.availableSaleQty,
          isFreeShipping: resdata.data.isFreeShipping,
          expressFeeId: resdata.data.expressFeeId,
          prodLogoPath: resdata.data.prodLogoPath,
          prodLogoUrl: resdata.data.prodLogoUrl,
          bannerImages: nowbannerImages,
          bannerImageList: nowbannerImageList,
          descImageList: nowdescImageList,
          statisticsCategoryId: 0,

        }

        for (let i = 0; i < that.data.pTypeList.length; i++) {
          if (that.data.pTypeList[i].id == nowownProdData.prodType) {
            nowpTypeListIndex = i
          }
        }

        for (let i = 0; i < that.data.dateUnit.length; i++) {
          if (that.data.dateUnit[i].name == nowownProdData.timeType) {
            nowdateUnitIndex = i
          }
        }


        that.setData({
          ownProdData: nowownProdData,
          eleCouponsData: noweleCouponsData,
          pTypeListIndex: nowpTypeListIndex,
          dateUnitIndex: nowdateUnitIndex,
          pId: resdata.data.prodProductDTO.id,
          functionData: nowfunctionData
        })

        if (nowownProdData.isNeedInv) {
          that.setData({
            isSafeInv: true
          })
        } else {
          that.setData({
            isSafeInv: false
          })
        }

        //店内送
        let dnsIndex = resdata.data.delivWays.indexOf("1");
        //迷你吧
        let mnbIndex = resdata.data.delivWays.indexOf("3");
        if (dnsIndex == -1 && mnbIndex == -1) {
          that.setData({
            isInvShow: false
          })
        } else {
          that.setData({
            isInvShow: true
          })
        }
        //快递送
        let kdIndex = resdata.data.delivWays.indexOf("2");
        if (kdIndex != -1) {
          that.setData({
            isFreeShip: true
          })
        } else {
          that.setData({
            isFreeShip: false
          })
        }
        //自提区
        let ztIndex = resdata.data.delivWays.indexOf("4");
        if (ztIndex != -1) {
          that.setData({
            isPickUp: true
          })
        } else {
          that.setData({
            isPickUp: false
          })
        }


        that.basicDataItems();
        that.getHotelPickUpPointList();

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






  //获取配送方式 - 字典表
  basicDataItems: function () {
    let that = this;
    let linkData = {
      key: 'DEVI',
      orgId: '0',
      parentKey: '',
      parentValue: ''
    }
    wxrequest.basicDataItems(linkData).then(res => {
      let resdata = res.data;
      let nowdelivWayList = that.data.delivWayList;
      if (resdata.code == 0) {
        nowdelivWayList = resdata.data.map(item => {
          return {
            id: item.dictValue,
            delivWayName: item.dictName
          }
        })

        for (let i = 0; i < nowdelivWayList.length; i++) {

          for (let j = 0; j < that.data.ownProdData.delivWays.length; j++) {
            if (nowdelivWayList[i].id == that.data.ownProdData.delivWays[j]) {
              nowdelivWayList[i].delivejudge = true
              break;
            } else {
              nowdelivWayList[i].delivejudge = false
            }
          }
        }

        that.setData({
          delivWayList: nowdelivWayList
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

  //获取快递费模板列表
  getExpressFee: function () {
    let that = this;
    wxrequest.getExpressFee().then(res => {
      let resdata = res.data;
      let nowexpressFeeList = that.data.expressFeeList;
      if (resdata.code == 0) {
        nowexpressFeeList = resdata.data.map(item => {
          return {
            id: item.id,
            exFeeName: item.modelName
          }
        })
        that.setData({
          expressFeeList: nowexpressFeeList
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

 

  //获取酒店自提点列表
  getHotelPickUpPointList: function () {
    let that = this;
    let linkData = {
      hotelId: wx.getStorageSync('hotelId')
    }
    wxrequest.getHotelPickUpPointList(linkData).then(res => {
      let resdata = res.data;
      let nowpickUpPointList = that.data.pickUpPointList;
      if (resdata.code == 0) {
        nowpickUpPointList = resdata.data.map(item => {
          return {
            id: item.id,
            pickUpPointName: item.pointName
          }
        })
        that.setData({
          pickUpPointList: nowpickUpPointList
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



  //获取酒店自提点列表
  getHotelPickUpPointList: function () {
    let that = this;
    let linkData = {
      hotelId: wx.getStorageSync('hotelId')
    }
    wxrequest.getHotelPickUpPointList(linkData).then(res => {
      let resdata = res.data;
      let nowpickUpPointList;
      if (resdata.code == 0) {
        if (resdata.data.length != 0) {

          nowpickUpPointList = resdata.data.map(item => {
            return {
              id: item.id,
              pickUpPointName: item.pointName,
              pickjudge: false
            }
          })

        }


        for (let i = 0; i < nowpickUpPointList.length; i++) {

          for (let j = 0; j < that.data.ownProdData.pickUpPointIds.length; j++) {
            if (nowpickUpPointList[i].id == that.data.ownProdData.pickUpPointIds[j]) {
              nowpickUpPointList[i].pickjudge = true
              break;
            } else {
              nowpickUpPointList[i].pickjudge = false
            }
          }
        }

        that.setData({
          pickUpPointList: nowpickUpPointList
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