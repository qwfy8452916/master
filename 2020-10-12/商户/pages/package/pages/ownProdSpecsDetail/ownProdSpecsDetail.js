// pages/package/pages/ownProdSpecsDetail/ownProdSpecsDetail.js
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

    prodSpecsData: {
      specName: '',
      showName: '',
      supplyPrice: '',
      retailPrice: '',
      marketPrice: '',
      availableSaleQty: 0,
      sort: 0,
      specInstruction: '',
      bannerImageList: [],
      bannerImages: [],
    },



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options.id)
    this.setData({
      id: options.id
    })

    this.hotelProdSpecsDetail();
    this.initValidate();//验证规则函数

  },


  //获取商品详情
  hotelProdSpecsDetail: function () {
    let that = this;
    wxrequest.hotelProdSpecsDetail(this.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        let nowprodSpecsData = resdata.data;
        nowprodSpecsData.bannerImages = resdata.data.specBannerPath;
        that.setData({
          prodSpecsData: nowprodSpecsData
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



    const rules = {
      specName: {
        required: true
      },
      showName: {
        required: true
      },
      supplyPrice: {
        required: true
      },
      retailPrice: {
        required: true,
      },
      marketPrice: {
        required: true
      },
      availableSaleQty: {
        required: true,
      },

    }



    const messages = {
      specName: {
        required: '请输入规格名称'
      },
      showName: {
        required: '请输入显示名称'
      },
      supplyPrice: {
        required: '请输入供货价'
      },
      retailPrice: {
        required: "请输入零售价",
      },
      marketPrice: {
        required: '请输入划线价'
      },
      availableSaleQty: {
        required: "请输入可售数量",
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

    let nowprodSpecsData = this.data.prodSpecsData;
    let newprodSpecsData = Object.assign(nowprodSpecsData, params);

    this.setData({
      prodSpecsData: newprodSpecsData,
    });
    this.sureBtn()

  },

  //确定
  sureBtn: function () {
    let that = this;
    let nowprodSpecsData = this.data.prodSpecsData;


    if (that.data.prodSpecsData.bannerImages.length <= 0) {
      wx.showToast({
        title: '请上传详情banner!',
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    if (nowprodSpecsData.sort == '') {
      nowprodSpecsData.sort = 0
    }

    let linkData = {
      specName: nowprodSpecsData.specName,
      showName: nowprodSpecsData.showName,
      supplyPrice: nowprodSpecsData.supplyPrice,
      retailPrice: nowprodSpecsData.retailPrice,
      marketPrice: nowprodSpecsData.marketPrice,
      availableSaleQty: nowprodSpecsData.availableSaleQty,
      sort: nowprodSpecsData.sort,
      specInstruction: nowprodSpecsData.specInstruction,
      bannerImages: JSON.parse(nowprodSpecsData.bannerImages),

    }



    wxrequest.hotelProdSpecsModify(linkData, that.data.id).then(res => {
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '商品规格修改成功！',
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



  //上传详情banner图
  addfunBanner: function () {
    let that = this;
    let nowbannerImageList = that.data.prodSpecsData.bannerImageList;
    let nowbannerImages = that.data.prodSpecsData.bannerImages;
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
              'prodSpecsData.bannerImageList': nowbannerImageList,
              'prodSpecsData.bannerImages': nowbannerImages,
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
    let nowbannerImageList = that.data.prodSpecsData.bannerImageList;
    let nowbannerImages = that.data.prodSpecsData.bannerImages;
    nowbannerImageList.splice(index, 1);
    nowbannerImages.splice(index, 1)
    this.setData({
      'prodSpecsData.bannerImageList': nowbannerImageList,
      'prodSpecsData.bannerImages': nowbannerImages
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