// pages/package/pages/ownProdEdit/ownProdEdit.js
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
    pId:'', 
    isInvShow: false,
    isSafeInv: true,
    isFreeShip: false,
    isPickUp: false,
    isNativeProd: false,
    pTypeList: [],   //商品形式列表
    pTypeListIndex: '',
    //电子券选择
    eleCouponsData: [
      // {
      //   couponType: '', //类型
      //   couponTypeName: '', //类型名称
      //   couponId: '', //名称id
      //   couponName: '', //名称
      //   couponCount: 1, //数量
      //   couponSort: 0, //排序
      // }
    ],
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
      prodCode:'', //商品编码
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
    console.log(options)
    this.setData({
      id: options.id,
      authzData: wx.getStorageSync("pageAuthority"),
    })
    this.basicDataItems_PT();
    
    this.getExpressFee();
    

    this.ownCommodityDetail();
    this.initValidate();//验证规则函数

  },

//获取自营商品信息
  ownCommodityDetail:function(){
    let that=this;
    wxrequest.ownCommodityDetail(this.data.id).then(res=>{
      let resdata=res.data;
      if(resdata.code==0){
        let noweleCouponsData = that.data.eleCouponsData;
        let nowpTypeListIndex = that.data.pTypeListIndex;

        
        let nowtimeType = resdata.data.prodProductDTO.prodWarrantyPeriod;
        nowtimeType = nowtimeType.substring(nowtimeType.length, nowtimeType.length-1);
        let nowqualityTime = resdata.data.prodProductDTO.prodWarrantyPeriod.substring(1, nowtimeType.length - 1);
        console.log(nowqualityTime)
        let nowdateUnitIndex = that.data.dateUnitIndex;

        noweleCouponsData = resdata.data.elecBatchList.map(item=>{
          return {
            couponTypeName: '',
            couponType: item.batchType,
            couponId: item.batchId,
            couponName: item.batchName,
            couponCount: item.count,
            couponSort: item.sort,
          }
        })

        let nowbannerImages = resdata.data.bannerImageList.map(item=>{
          return item.imagePath
        })

        let nowbannerImageList = resdata.data.bannerImageList.map(item => {
          return {imageUrl: item.imageUrl}
        })
        
        let nowdescImageList = resdata.data.descImageList.map(item=>{
          return {
            imageUrl: item.imageUrl,
            imagePath: item.imagePath,
            sort:item.sort
          }
        })

        let nowfunctionData = resdata.data.funcParams.map(item=>{
          let arr=[];
           
            for (let i in item.marketCategorys) {
              arr.push({
                categoryName: item.marketCategorys[i] 
              })
            }
  
          

          return {
            funcId: item.funcId,
            funcName: item.funcName,
            classifyIds: item.marketCategoryIds ? item.marketCategoryIds:[],
            classifyData: arr
          }
        })


        let nowownProdData={
          prodName: resdata.data.prodProductDTO.prodName,
          prodShowName: resdata.data.prodProductDTO.prodShowName,
          prodCode: resdata.data.prodProductDTO.prodCode,
          prodType: resdata.data.prodProductDTO.prodType,
          qualityTime: nowqualityTime,
          timeType: nowtimeType,
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

        if (nowownProdData.isNeedInv){
          that.setData({
            isSafeInv: true
          })
        }else{
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
            isInvShow:false
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
        
      }else{
        wx.showToast({
          title: resdata.msg,
          icon:'none',
          duration:2000
        })
      }
    }).catch(err=>{
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },


  //获取商品形式 - 字典表
  basicDataItems_PT: function () {
    let that = this;
    let linkData = {
      key: 'PROD_TYPE',
      orgId: '0',
      parentKey: '',
      parentValue: ''
    }
    wxrequest.basicDataItems(linkData).then(res => {
      let resdata = res.data;
      let nowpTypeList = that.data.pTypeList;
      if (resdata.code == 0) {
        nowpTypeList = resdata.data.map(item => {
          return {
            id: parseInt(item.dictValue),
            name: item.dictName
          }
        })
        that.setData({
          pTypeList: nowpTypeList
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

  //选择商品形式
  bindPickerpType: function (e) {
    let that = this;
    let index = e.detail.value;
    let nowdelivWayList = this.data.delivWayList;
    let nowdelivWays = that.data.ownProdData.delivWays;
    let noweleCouponsData = this.data.eleCouponsData;
    nowdelivWays = [];

    nowdelivWayList.map(item => {
      item.delivejudge = false
      return item;
    })
    if (that.data.pTypeList[index].id == 2) {
      nowdelivWays = [5];
      noweleCouponsData: [];
    }
    this.setData({
      'ownProdData.prodType': that.data.pTypeList[index].id,
      pTypeListIndex: index,
      'ownProdData.delivWays': nowdelivWays,
      delivWayList: nowdelivWayList,
      eleCouponsData: noweleCouponsData,
      isInvShow: false
    })

  },

  //移除电子券选择
  removeDz: function (e) {
    let index = e.currentTarget.dataset.index;
    let noweleCouponsData = this.data.eleCouponsData;
    noweleCouponsData.splice(index, 1)
    this.setData({
      eleCouponsData: noweleCouponsData
    })
  },

  //添加功能区分类
  addFunType: function () {
    let that = this;

    if (that.data.ownProdData.delivWays.length <= 0) {
      wx.showToast({
        title: '请选择配送方式',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    this.setData({
      addfunTyoeJudge: false
    })

    let delivWays = that.data.ownProdData.delivWays;
    let pickUpPointIds = that.data.ownProdData.pickUpPointIds;
    wx.navigateTo({
      url: '../addFunType/addFunType?delivWays=' + JSON.stringify(delivWays) + '&pickUpPointIds=' + JSON.stringify(pickUpPointIds),
    })
  },

  //选择保质期单位
  bindPickerUnit: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      dateUnitIndex: index,
      'ownProdData.timeType': that.data.dateUnit[index].name
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

  //快递开关
  expressfee: function (e) {
    let that = this;
    let value = e.detail.value;
    let nowexpressFeeId = that.data.ownProdData.expressFeeId;
    if (value) {
      nowexpressFeeId = ''
    }
    this.setData({
      'ownProdData.isFreeShipping': value,
      'ownProdData.expressFeeId': nowexpressFeeId
    })

  },

  //选择是否需要库存
  selectIsInv: function (e) {
    let that = this;
    let value = e.detail.value;
    if (value) {
      this.setData({
        isSafeInv: true,
        'ownProdData.isNeedInv': true
      })
    } else {
      this.setData({
        isSafeInv: false,
        'ownProdData.isNeedInv': false
      })
    }
  },

  //选择快递模板
  bindPickerExpressFee: function (e) {
    let that = this;
    let index = e.detail.value;
    this.setData({
      'ownProdData.expressFeeId': that.data.expressFeeList[index].id,
      expressFeeIndex: index,
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




  initValidate() {//验证规则函数

    const that = this;
    let nowdelivWays;
    if (that.data.ownProdData.prodType != 2 && that.data.ownProdData.prodType != '') {
      nowdelivWays = that.data.ownProdData.delivWays;
      nowdelivWays = nowdelivWays.length;
    } else {
      nowdelivWays = true
    }

    let nowprodSafeCount;
    if (this.data.ownProdData.isNeedInv && that.data.ownProdData.prodSafeCount == '' && this.data.isInvShow) {
      nowprodSafeCount = true
    } else {
      nowprodSafeCount = false
    }


    const rules = {
      prodName: {
        required: true
      },
      prodShowName: {
        required: true
      },
      prodType: {
        required: true
      },
      qualityTime: {
        required: true,
        digits: true
      },
      prodUnitMeasure: {
        required: true
      },
      prodSupplyPrice: {
        required: true,
        digitsfloat: true
      },
      prodRetailPrice: {
        required: true,
        digitsfloat: true
      },
      delivWays: {
        required: nowdelivWays ? false : true
      },
      prodSafeCount: {
        required: nowprodSafeCount ? true : false
      },
      availableSaleQty: {
        required: true
      },

    }



    const messages = {
      prodName: {
        required: '请输入商品名称'
      },
      prodShowName: {
        required: '请输入显示名称'
      },
      prodType: {
        required: '请选择商品形式'
      },
      qualityTime: {
        required: "请输入保质期",
        digits: '请输入正确的保质期'
      },
      prodUnitMeasure: {
        required: '请输入单位'
      },
      prodSupplyPrice: {
        required: "请输入供货价",
        digitsfloat: '请输入正确的供货价'
      },
      prodRetailPrice: {
        required: "请输入零售价",
        digitsfloat: '请输入正确的零售价'
      },
      delivWays: {
        required: '请选择配送方式'
      },
      prodSafeCount: {
        required: '请输入安全库存'
      },
      availableSaleQty: {
        required: '请输入可售数量'
      },

    }
    that.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit: function (e) {//提交表单

    this.initValidate();



    const params = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false
    }
    params.isNeedInv = params.isNeedInv ? 1 : 0
    params.isFreeShipping = params.isFreeShipping ? 1 : 0



    let nowownProdData = this.data.ownProdData;
    let newownProdData = Object.assign(nowownProdData, params);

    this.setData({
      ownProdData: newownProdData,
    });
    this.sureBtn()

  },

  //确定
  sureBtn: function () {
    let that = this;
    let nowownProdData = this.data.ownProdData;

    let isNative;
    if (this.data.isNativeProd) {
      isNative = 1
    } else {
      isNative = 0
    }


    //店内送、迷你吧
    let dnsIndex = nowownProdData.delivWays.indexOf("1");
    let mnbIndex = nowownProdData.delivWays.indexOf("3");
    if (dnsIndex != -1 || mnbIndex != -1) {
      if (nowownProdData.isNeedInv) {
        if (nowownProdData.prodSafeCount == '') {
          wx.showToast({
            title: '请输入安全库存',
            icon: 'none',
            duration: 2000
          })
          return false
        }
      }
    }

    //快递送
    let kdIndex = nowownProdData.delivWays.indexOf("2");
    if (kdIndex != -1) {
      if (!nowownProdData.isFreeShipping) {
        if (nowownProdData.expressFeeId == '') {
          wx.showToast({
            title: '请选择快递费模板!',
            icon: 'none',
            duration: 2000
          })
          return false
        }
      }
    }


    if (that.data.functionData.length <= 0) {
      wx.showToast({
        title: '请选择功能区',
        icon: 'none',
        duration: 2000
      })
      return false;
    }


    //判断功能区不可重复
    let funcIds = [];
    for (let i = 0; i < this.data.functionData.length; i++) {
      funcIds.push(this.data.functionData[i].funcId);
    }
    let funcIdsSort = funcIds.sort();
    for (let j = 0; j < funcIds.length; j++) {
      if (funcIdsSort[j] == funcIdsSort[j + 1]) {
        wx.showToast({
          title: '功能区不可重复选择!',
          icon: 'none',
          duration: 2000
        })
        return false
      }
    }

    let funcDataList = this.data.functionData.map(item => {
      return {
        funcId: item.funcId,
        marketCategoryIds: item.classifyIds
      }
    });



    if (that.data.ownProdData.prodLogoPath == '') {
      wx.showToast({
        title: '请上传列表图!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (that.data.ownProdData.bannerImages.length <= 0) {
      wx.showToast({
        title: '请上传详情banner!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }





    let elecBatchList = that.data.eleCouponsData.map(item => {
      return {
        batchType: item.couponType,
        batchId: item.couponId,
        count: item.couponCount,
        sort: item.couponSort,
      }
    })

    let pMarketPrice;
    if (nowownProdData.prodMarketPrice == '') {
      pMarketPrice = '';
    } else {
      pMarketPrice = parseFloat(nowownProdData.prodMarketPrice).toFixed(2);
    }

    let descPath = nowownProdData.descImageList.map(item => {
      return {
        imagePath: item.imagePath,
        sort: item.sort,
      }
    });

    const productInfo = {
      id: that.data.pId,
      prodName: nowownProdData.prodName,
      prodShowName: nowownProdData.prodShowName,
      prodType: nowownProdData.prodType,
      elecBatchList: elecBatchList,
      prodWarrantyPeriod: nowownProdData.qualityTime + nowownProdData.timeType,
      prodUnitMeasure: nowownProdData.prodUnitMeasure,
      prodSupplyPrice: parseFloat(nowownProdData.prodSupplyPrice).toFixed(2),
      prodRetailPrice: parseFloat(nowownProdData.prodRetailPrice).toFixed(2),
      prodMarketPrice: pMarketPrice,
      delivWays: nowownProdData.delivWays,
      isNeedInv: nowownProdData.isNeedInv,
      prodSafeCount: nowownProdData.prodSafeCount,
      availableSaleQty: nowownProdData.availableSaleQty,
      isFreeShipping: nowownProdData.isFreeShipping,
      expressFeeId: nowownProdData.expressFeeId,
      pickUpPointIds: nowownProdData.pickUpPointIds,
      prodLogoPath: nowownProdData.prodLogoPath,
      bannerImages: nowownProdData.bannerImages,
      statisticsCategoryId: nowownProdData.statisticsCategoryId,
      descImageList: descPath,
    }


    let linkData = {
      prodOwnerOrgKind: 3,
      hotelId: wx.getStorageSync('hotelId'),
      prodProductDTO: productInfo,
      prodShowName: nowownProdData.prodShowName,
      prodType: nowownProdData.prodType,
      elecBatchList: elecBatchList,
      prodSupplyPrice: parseFloat(nowownProdData.prodSupplyPrice).toFixed(2),
      prodRetailPrice: parseFloat(nowownProdData.prodRetailPrice).toFixed(2),
      prodMarketPrice: pMarketPrice,
      delivWays: nowownProdData.delivWays,
      isNeedInv: nowownProdData.isNeedInv,
      prodSafeCount: nowownProdData.prodSafeCount,
      availableSaleQty: nowownProdData.availableSaleQty,
      isFreeShipping: nowownProdData.isFreeShipping,
      expressFeeId: nowownProdData.expressFeeId,
      pickUpPointIds: nowownProdData.pickUpPointIds,
      isLocalSpecialty: isNative,
      funcParams: funcDataList,
      prodLogoPath: nowownProdData.prodLogoPath,
      bannerImages: nowownProdData.bannerImages,
      descImageList: descPath,
    }

    console.log(linkData)
    // return false;


    wxrequest.ownCommodityModify(linkData,that.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '自营商品修改成功！',
          icon: 'none',
          duration: 2000
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


  //移除功能区分类
  removeCou: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowfunctionData = this.data.functionData;
    nowfunctionData.splice(index, 1)
    this.setData({
      functionData: nowfunctionData
    })
  },


  //选择配送
  delive: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowdelivWayList = this.data.delivWayList;
    let nowdelivWays = this.data.ownProdData.delivWays;
    let nowprodType = this.data.ownProdData.prodType;

    let flagIndex;


    if (nowdelivWays.length > 0) {
      let flag = nowdelivWays.some((item, valueIndex) => {
        if (item == nowdelivWayList[index].id) {
          flagIndex = valueIndex
          return true;
        }
      })
      if (flag) {
        nowdelivWays.splice(flagIndex, 1)
        nowdelivWayList[index].delivejudge = false
      } else {
        nowdelivWays.push(nowdelivWayList[index].id)
        nowdelivWayList[index].delivejudge = true
      }
    } else {
      nowdelivWays.push(nowdelivWayList[index].id)
      nowdelivWayList[index].delivejudge = true
    }

    if (nowdelivWays.length != 0) {
      //店内送
      let dnsIndex = nowdelivWays.indexOf("1");
      //快递送
      let kdIndex = nowdelivWays.indexOf("2");
      //迷你吧
      let mnbIndex = nowdelivWays.indexOf("3");
      //自提区
      let ztIndex = nowdelivWays.indexOf("4");
      //电子商品
      let zzIndex = nowdelivWays.indexOf("5");
      //堂食
      let tsIndex = nowdelivWays.indexOf("6");
      //外卖
      let wmIndex = nowdelivWays.indexOf("7");
      //外带
      let wdIndex = nowdelivWays.indexOf("8");
      if (nowprodType == 1) {
        //店内送
        if (dnsIndex == -1 && mnbIndex == -1) {
          that.setData({
            isInvShow: false,
            'ownProdData.isNeedInv': false
          })
        } else {
          that.setData({
            isInvShow: true,
            'ownProdData.isNeedInv': true
          })
        }
        //快递送
        if (kdIndex != -1) {
          that.setData({
            isFreeShip: true,
          })
        } else {
          that.setData({
            isFreeShip: false,
          })
        }
        //自提区
        if (ztIndex != -1) {
          that.setData({
            isPickUp: true,
          })
        } else {
          that.setData({
            isPickUp: false,
          })
        }
      } else if (nowprodType == 3) {
        //外卖
        let hotelIsSupportTakeOutOrder = wx.getStorageSync('hotelIsSupportTakeOutOrder');
        if (wmIndex != -1) {
          if (hotelIsSupportTakeOutOrder == 0) {
            wx.showToast({
              title: '此酒店不支持外卖',
              icon: 'none',
              duration: 2000
            })
            nowdelivWays.splice(wmIndex, 1);
            return false;
          }
        }
      }
    } else {
      that.setData({
        isInvShow: false,
        isFreeShip: false,
        isPickUp: false,
        functionData: [],
      })
    }


    that.setData({
      'ownProdData.delivWays': nowdelivWays,
      delivWayList: nowdelivWayList,
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

  //选择自提点
  selfTake: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowpickUpPointList = this.data.pickUpPointList;
    let nowpickUpPointIds = this.data.ownProdData.pickUpPointIds;
    let flagIndex;
    if (nowpickUpPointIds.length > 0) {
      let flag = nowpickUpPointIds.some((item, valueIndex) => {
        if (item == nowpickUpPointList[index].id) {

          flagIndex = valueIndex
          return true;
        }
      })
      if (flag) {
        nowpickUpPointIds.splice(flagIndex, 1)
        nowpickUpPointList[index].pickjudge = false
      } else {
        nowpickUpPointIds.push(nowpickUpPointList[index].id)
        nowpickUpPointList[index].pickjudge = true
      }
    } else {

      nowpickUpPointIds.push(nowpickUpPointList[index].id)
      nowpickUpPointList[index].pickjudge = true
    }
    that.setData({
      'ownProdData.pickUpPointIds': nowpickUpPointIds,
      pickUpPointList: nowpickUpPointList
    })

  },



  //删除图标
  funIcon: function () {
    this.setData({
      'ownProdData.prodLogoUrl': '',
      'ownProdData.prodLogoPath': '',
    })
  },

  //上传列表
  addfunList: function () {
    let that = this;
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: apiUrl + 'basic/file/upload',
          header: {
            'Authorization': wx.getStorageSync("token")
          },
          filePath: tempFilePaths[0],
          name: 'fileContent',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = JSON.parse(res.data)

            that.setData({
              'ownProdData.prodLogoUrl': tempFilePaths[0],
              'ownProdData.prodLogoPath': data.data,
            })

          }
        })
      }
    })
  },

  //上传详情banner图
  addfunBanner: function () {
    let that = this;
    let nowbannerImageList = that.data.ownProdData.bannerImageList;
    let nowbannerImages = that.data.ownProdData.bannerImages;
    if (nowbannerImageList.length > 5) {
      wx.showToast({
        title: 'banner图最多上传5张',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.chooseImage({
      count: 5,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: apiUrl + 'basic/file/upload',
          header: {
            'Authorization': wx.getStorageSync("token")
          },
          filePath: tempFilePaths[0],
          name: 'fileContent',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = JSON.parse(res.data)
            let imageUrl = {
              imageUrl: tempFilePaths[0]
            }
            nowbannerImageList.push(imageUrl)
            nowbannerImages.push(data.data)

            that.setData({
              'ownProdData.bannerImageList': nowbannerImageList,
              'ownProdData.bannerImages': nowbannerImages,
            })

          }
        })
      }
    })
  },

  //删除详情banner图
  removeBan: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowbannerImageList = that.data.ownProdData.bannerImageList;
    let nowbannerImages = that.data.ownProdData.bannerImages;
    nowbannerImageList.splice(index, 1);
    nowbannerImages.splice(index, 1)
    this.setData({
      'ownProdData.bannerImageList': nowbannerImageList,
      'ownProdData.bannerImages': nowbannerImages
    })
  },


  //上传商品描述图
  adddescImage: function () {
    let that = this;
    let nowdescImageList = that.data.ownProdData.descImageList;
    if (nowdescImageList.length > 5) {
      wx.showToast({
        title: 'banner图最多上传5张',
        icon: 'none',
        duration: 2000
      })
      return false;
    }
    wx.chooseImage({
      count: 5,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: apiUrl + 'basic/file/upload',
          header: {
            'Authorization': wx.getStorageSync("token")
          },
          filePath: tempFilePaths[0],
          name: 'fileContent',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = JSON.parse(res.data)
            let imageUrl = {
              imageUrl: tempFilePaths[0],
              imagePath: data.data,
              sort: ''
            }
            nowdescImageList.push(imageUrl)

            that.setData({
              'ownProdData.descImageList': nowdescImageList,
            })
    
          }
        })
      }
    })
  },

  //删除商品描述图
  removeDesc: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let nowdescImageList = that.data.ownProdData.descImageList;
    nowdescImageList.splice(index, 1);
    this.setData({
      'ownProdData.descImageList': nowdescImageList,
    })

  },




  //添加电子券
  addcoupon: function () {
    this.setData({
      addCoujudge: false
    })
    wx.navigateTo({
      url: '../AddElectronCoupon/AddElectronCoupon',
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

    let noweleCouponsData = this.data.eleCouponsData;
    let nowfunctionData = this.data.functionData;
    if (this.data.addCoujudge) {
      noweleCouponsData.push(this.data.eleCouponsAdd)
      this.setData({
        addCoujudge: false
      })
    }

    if (this.data.addfunTyoeJudge) {
      nowfunctionData.push(this.data.addfunctionData)
      this.setData({
        addfunTyoeJudge: false
      })
    }
    this.setData({
      eleCouponsData: noweleCouponsData,
      functionData: nowfunctionData
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