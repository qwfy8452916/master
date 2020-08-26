// pages/editCard/editCard.js
const app = getApp();
let apiUrl = app.globalData.requestUrl;
import wxrequest from '../../utils/api'
import WxValidate from '../../utils/WxValidate'
app.Base({

  /**
   * 页面的初始数据
   */
  data: {
    id:'', //卡券批次id
    spareform: {
      vouName: '', //卡券名称
      vouBasicPrice: '', //基础价格
      canGive: 0, //允许转赠
      vouInstruction: '', //卡券说明
      vouImagePath: '', //卡券图片
      vouTermType: 0, //使用有效期
      vouTermDays: '', //领取后天数
      vouTermStartDate: '', //使用有效期开始
      vouTermEndDate: '',  //使用有效期截止
      vouUseScene: 1, //使用场景
      vouVerifiedAddress: '', //核销地点
      vouVerifiedTotal: '', //核销次数
      vouDeductibleType: 0, //抵扣设置
      vouDeductibleMoney: '', //现金
      vouDeductibleHotelProdId: '', //选择商品id
      vouDeductibleHotelProdSpecId: '', //获取规格
      vouOwnerOrgKind: 3,
    },
    form: {
      vouName: '', //卡券名称
      vouBasicPrice: '', //基础价格
      canGive: 0, //允许转赠
      vouInstruction: '', //卡券说明
      vouImagePath: '', //卡券图片
      vouTermType: 0, //使用有效期
      vouTermDays: '', //领取后天数
      vouTermStartDate: '', //使用有效期开始
      vouTermEndDate: '',  //使用有效期截止
      vouUseScene: 1, //使用场景
      vouVerifiedAddress: '', //核销地点
      vouVerifiedTotal: '', //核销次数
      vouDeductibleType: 0, //抵扣设置
      vouDeductibleMoney: 0, //现金
      vouDeductibleHotelProdId: '', //选择商品id
      vouDeductibleHotelProdSpecId: '', //获取规格
      vouOwnerOrgKind: 3,
    },
    imgPath: '',
    vouTermData: [
      { name: "领取后天数", id: 0 },
      { name: "固定日期", id: 1 }
    ],
    vouTermIndex: 0,
    sceneData: [
      { name: "到店核销", id: 1 },
      { name: "线上抵扣", id: 2 }
    ],
    sceneIndex: 0,
    vouDeductibleTypeData: [
      { name: "现金", id: 0 },
      { name: "商品", id: 1 }
    ],
    vouDeductibleTypeIndex: 0,

    prodData: [],  //商品数据
    prodIndex: 0,
    isSupportSpec: '', //大于0是有规格

    specData: [], //规格数据
    specIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      id:options.id
    })

    
    
    
    
    this.initValidate();//验证规则函数

    this.cardticketDetail(function(){
      console.log(that.data.form)
      that.getCardticketProd();
      that.getCardticketProdspec();
    });

  },


  //获取卡券详情
  cardticketDetail:function(e){
    let that=this;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.cardticketDetail(that.data.id).then(res=>{
      wx.hideLoading()
       let resdata=res.data;
       let nowvouTermIndex;
       let nowsceneIndex;
       let nowvouDeductibleTypeIndex;
      
       if(resdata.code==0){

         if (resdata.data.vouTermEndDate =="1970-01-01"){
             resdata.data.vouTermEndDate = ""
           }
         if (resdata.data.vouTermStartDate == "1970-01-01") {
           resdata.data.vouTermStartDate = ""
           }

         that.setData({
           form: resdata.data,
           imgPath: resdata.data.vouImageUrl
         })
         

         //获取索引
         that.data.vouTermData.map((item,index) => {
           if (item.id === resdata.data.vouTermType){
             nowvouTermIndex=index
           }
         })
         that.data.sceneData.map((item, index) => {
           if (item.id === resdata.data.vouUseScene) {
             nowsceneIndex = index
           }
         })
         that.data.vouDeductibleTypeData.map((item, index) => {
           if (item.id === resdata.data.vouDeductibleType) {
             nowvouDeductibleTypeIndex = index
           }
         })

       
         
         that.setData({
           vouTermIndex: nowvouTermIndex,
           sceneIndex: nowsceneIndex,
           vouDeductibleTypeIndex: nowvouDeductibleTypeIndex,
         })
         
         typeof e == "function" && e(resdata.data);

       }else{
         wx.showToast({
           title:resdata.msg,
           icon:'none',
           duration:2000
         })
       }
    }).catch(err=>{
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon:'none',
        duration:2000
      })
    })
  },

  //修改数据
  sureBtn: function (params) {
    let that = this;
    let linkData = params;
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.cardticketEdit(linkData,that.data.id).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      if (resdata.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        wx.redirectTo({
          url: '../cardManage/cardManage',
        })
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })


  },



  //获取规格
  bindPickerSpec: function (e) {
    let that = this;
    this.setData({
      specIndex: e.detail.value,
      'form.vouDeductibleHotelProdSpecId': this.data.specData[e.detail.value].id
    })
  },

  //选择商品
  bindPickerProd: function (e) {
    let that = this;
    this.setData({
      prodIndex: e.detail.value,
      specIndex:0,
      isSupportSpec: this.data.prodData[e.detail.value].isSupportSpec,
      'form.vouDeductibleHotelProdId': this.data.prodData[e.detail.value].id
    })
    if (that.data.isSupportSpec > 0) {
      that.getCardticketProdspec();
    }
  },

  //使用有效期开始
  bindDateChange: function (e) {
    this.setData({
      'form.vouTermStartDate': e.detail.value
    })
  },

  //使用有效期截止
  bindDateChange2: function (e) {
    this.setData({
      'form.vouTermEndDate': e.detail.value
    })
  },

  //抵扣设置
  bindPickerDeduct: function (e) {
    this.setData({
      vouDeductibleTypeIndex: e.detail.value,
      'form.vouDeductibleType': this.data.vouDeductibleTypeData[e.detail.value].id
    })
  },

  //使用场景
  bindPickerScene: function (e) {
    this.setData({
      sceneIndex: e.detail.value,
      'form.vouUseScene': this.data.sceneData[e.detail.value].id
    })
  },

  //使用有效期
  bindPickerChange: function (e) {
    this.setData({
      vouTermIndex: e.detail.value,
      'form.vouTermType': this.data.vouTermData[e.detail.value].id
    })

  },

  //开关
  switch1Change: function (e) {
    this.setData({
      'form.canGive': e.detail.value
    })
  },

  //卡券上传
  uploadCard: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
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
              'form.vouImagePath': data.data,
              imgPath: tempFilePaths[0]
            })
          }
        })
      }
    })
  },

  //删除图片
  closeImg: function () {
    this.setData({
      'form.vouImagePath': '',
      imgPath: ''
    })
  },


  initValidate() {//验证规则函数
    const that = this;
    const rules = {
      vouName: {
        required: true
      },
      vouBasicPrice: {
        digits: true
      },
      vouImagePath: {
        required: true
      },
      vouTermDays: {
        digits: true,
        required: that.data.form.vouTermType ? false : true
      },
      vouTermStartDate: {
        required: that.data.form.vouTermType ? true : false
      },
      vouTermEndDate: {
        required: that.data.form.vouTermType ? true : false
      },
      vouVerifiedAddress: {
        required: that.data.form.vouUseScene == 1 ? true : false
      },
      vouVerifiedTotal: {
        required: that.data.form.vouUseScene == 1 ? true : false,
        digits: true,
      },
      vouDeductibleMoney: {
        required: (that.data.form.vouDeductibleType ? false : true && (that.data.form.vouUseScene == 2)),
        digits: true,
      },
    }



    const messages = {
      vouName: {
        required: '请输入卡券名称'
      },
      vouBasicPrice: {
        digits: '基础价格请输入数字'
      },
      vouImagePath: {
        required: '请上传卡券图片'
      },
      vouTermDays: {
        digits: '领取后天数请输入数字',
        required: '请输入领取后天数',
      },
      vouTermStartDate: {
        required: '请选择固定开始日期',
      },
      vouTermEndDate: {
        required: '请选择固定结束日期',
      },
      vouVerifiedAddress: {
        required: '请填写核销地点',
      },
      vouVerifiedTotal: {
        required: '请填写核销次数',
        digits: '核销次数请输入数字',
      },
      vouDeductibleMoney: {
        required: '请填写现金',
        digits: '现金请输入数字',
      }
    }
    that.WxValidate = new WxValidate(rules, messages)
  },

  formSubmit: function (e) {//提交表单

    this.initValidate();

    console.log(e)

    const params = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false
    }
    
    //pick表单设置默认绑定的表单值防止报错
    let nowcanGive = this.data.form.canGive ? 1 : 0;
    let nowvouDeductibleType = this.data.form.vouDeductibleType
    if (this.data.form.vouUseScene == 2) {
      nowvouDeductibleType = this.data.vouDeductibleTypeData[e.detail.value.vouDeductibleType].id
    }
    let nowvouDeductibleHotelProdId = this.data.form.vouDeductibleHotelProdId;
    if (e.detail.value.vouDeductibleHotelProdId >= 0) {
      nowvouDeductibleHotelProdId = this.data.prodData[e.detail.value.vouDeductibleHotelProdId].id
    }
    let nowvouDeductibleHotelProdSpecId = this.data.form.vouDeductibleHotelProdSpecId;
    if (e.detail.value.vouDeductibleHotelProdSpecId >= 0) {
      nowvouDeductibleHotelProdSpecId = this.data.specData[e.detail.value.vouDeductibleHotelProdSpecId].id
    }
    params.canGive = nowcanGive;
    params.vouTermType = this.data.vouTermData[e.detail.value.vouTermType].id;
    params.vouUseScene = this.data.sceneData[e.detail.value.vouUseScene].id,
      params.vouDeductibleType = nowvouDeductibleType;
    params.vouDeductibleHotelProdId = nowvouDeductibleHotelProdId;
    params.vouDeductibleHotelProdSpecId = nowvouDeductibleHotelProdSpecId;

    let nowspareform = JSON.stringify(this.data.spareform)
    let nowparams = Object.assign(JSON.parse(nowspareform), params);
    this.setData({
      form: nowparams,
    });
    this.sureBtn(this.data.form)

  },

  //获取商品数据
  getCardticketProd: function () {
    let that = this;
    let linkData = {
      hotelId: wx.getStorageSync("hotelId")
    }
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getCardticketProd(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      let nowprodIndex;
      let nowisSupportSpec;
      if (resdata.code == 0) {
        

        resdata.data.map((item, index) => {
           if (item.id === that.data.form.vouDeductibleHotelProdId) {
             nowprodIndex = index;
             nowisSupportSpec = item.isSupportSpec
           }
         })

        that.setData({
          prodData: resdata.data,
          prodIndex: nowprodIndex,
          isSupportSpec: nowisSupportSpec
        })
        console.log(that.data.prodData)
        console.log(that.data.prodIndex)
        console.log(that.data.isSupportSpec)

      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'none',
        duration: 2000
      })
    })
  },

  //获取规格
  getCardticketProdspec: function () {
    let that=this;

    console.log(that.data.form)

    let linkData = {
      hotelProdId: that.data.form.vouDeductibleHotelProdId
    }
    wx.showLoading({
      title: '加载中',
    })
    wxrequest.getCardticketProdspec(linkData).then(res => {
      wx.hideLoading()
      let resdata = res.data;
      let nowspecIndex;
      if (resdata.code == 0) {
        
          resdata.data.map((item, index) => {
           if (item.id === that.data.form.vouDeductibleHotelProdSpecId) {
             nowspecIndex = index
            }
          })
        that.setData({
          specData: resdata.data,
          specIndex: nowspecIndex
        })
        console.log(that.data.specData)
        console.log(that.data.specIndex)
      } else {
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err => {
      wx.hideLoading()
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