// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpsType:[
      {
        iconPath:"../../images/personal/helper/hehuo.png",
        title:"财富合伙人",
        questions:[
          "什么是代运营服务？",
          "为什么收益只享有40%？",
          "代运营与自运营那个更有优势？"
        ],
        urlPath:"/pages/partnership/partnership"
      },
      {
        iconPath:"../../images/personal/helper/tuozhan.png",
        title:"商业模式",
        questions:[
          "什么是酒店智盒？",
          "酒店为什么要使用酒店智盒？",
          "客人为什么愿意使用酒店智盒？"
        ],
        urlPath:"/pages/businessmodel/businessmodel"

      },
      {
        iconPath:"../../images/personal/helper/minibar.png",
        title:"客房便利店",
        questions:[
          "与市场上在售的酒店售货机相比优势在哪里？",
          "设备质量怎么样，如何保修？",
          "设备采用何种通讯方式，是否耗电？"
        ],
        urlPath:"/pages/convenience/convenience"

      },
      {
        iconPath:"../../images/personal/helper/mobile.png",
        title:"掌上酒店",
        questions:[
          "什么是掌上酒店服务量化？",
          "客人如何购买酒店智盒的商品？",
          "客人如何购买酒店商城的商品？"
        ],
        urlPath:"/pages/minihotel/minihotel"

      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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