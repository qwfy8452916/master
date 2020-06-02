// pages/newtable/newtable.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // cabdata: [{ "width": "35", "height": "33.33", "left": "0", "top": "0", "latticeCode": "A" }, { "width": "35", "height": "33.33", "left": "35", "top": "0", "latticeCode": "B" }, { "width": "35", "height": "33.33", "left": "0", "top": "33.33", "latticeCode": "C" }, { "width": "35", "height": "33.33", "left": "35", "top": "33.33", "latticeCode": "D" }, { "width": "35", "height": "33.33", "left": "0", "top": "66.66", "latticeCode": "E" }, { "width": "35", "height": "33.33", "left": "35", "top": "66.66", "latticeCode": "F" }, { "width": "30", "height": "66.66", "left": "70", "top": "0", "latticeCode": "G" }, { "width": "30", "height": "33.33", "left": "70", "top": "66.66", "latticeCode": "H" }],
    cabdata: [{ "width": "35", "height": "33.33", "left": "0", "top": "0", "latticeCode": "A" }, { "width": "35", "height": "33.33", "left": "35", "top": "0", "latticeCode": "B" }, { "width": "35", "height": "33.33", "left": "0", "top": "33.33", "latticeCode": "C" }, { "width": "35", "height": "33.33", "left": "35", "top": "33.33", "latticeCode": "D" }, { "width": "35", "height": "33.33", "left": "0", "top": "66.66", "latticeCode": "E" }, { "width": "35", "height": "33.33", "left": "35", "top": "66.66", "latticeCode": "F" }, { "width": "30", "height": "66.66", "left": "70", "top": "0", "latticeCode": "G" }, { "width": "30", "height": "33.33", "left": "70", "top": "66.66", "latticeCode": "H" }],

    // cabdata: [{ "width": "35", "height": "50", "left": "0", "top": "0", "latticeCode": "A" },{ "width": "35", "height": "50", "left": "0", "top": "50", "latticeCode": "C" },{ "width": "35", "height": "50", "left": "35", "top": "0", "latticeCode": "B" },{ "width": "35", "height": "50", "left": "35", "top": "50", "latticeCode": "D" },{ "width": "30", "height": "100", "left": "70", "top": "0", "latticeCode": "E" }],
    cesecabdata: '[{ "width": "35", "height": "50", "left": "0", "top": "0", "latticeCode": "A" },{ "width": "35", "height": "50", "left": "0", "top": "50", "latticeCode": "B" },{ "width": "35", "height": "50", "left": "35", "top": "0", "latticeCode": "C" },{ "width": "35", "height": "50", "left": "35", "top": "50", "latticeCode": "D" },{ "width": "30", "height": "100", "left": "70", "top": "0", "latticeCode": "E" }]',
    hebingData:[
      { "x01": '001', "y01": '002','z01':'003'},
      { "x02": '001', "y02": '002', 'z02': '003' },
      { "x03": '001', "y03": '002', 'z03': '003' },
      { "x04": '001', "y04": '002', 'z04': '003' },
      { "x05": '001', "y05": '002', 'z05': '003' }
    ],
    // cabdata:[
    //   { width: '33.3', height: '20', top: '0', left: '0' ,code:'A'},
    //   { width: '33.3', height: '25', top: '0', left: '33.3', code: 'B' },
    //   { width: '33.3', height: '30', top: '0', left: '66.6', code: 'C'},
    //   { width: '33.3', height: '40', top: '20', left: '0', code: 'D'},
    //   { width: '33.3', height: '30', top: '25', left: '33.3', code: 'E'},
    //   { width: '33.3', height: '70', top: '30', left: '66.6', code: 'F'},
    //   { width: '33.3', height: '40', top: '60', left: '0', code: 'G'},
    //   { width: '33.3', height: '45', top: '55', left: '33.3', code: 'H'},
    // ],
    // cabdata: [
    //   { width: '20', height: '20', top: '0', left: '0', code: 'A' },
    //   { width: '50', height: '25', top: '0', left: '20', code: 'B' },
    //   { width: '30', height: '100', top: '0', left: '70', code: 'C' },
    //   { width: '20', height: '80', top: '20', left: '0', code: 'D' },
    //   { width: '50', height: '75', top: '25', left: '20', code: 'E' },
    // ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nowcabdata = this.data.cabdata;
    nowcabdata=nowcabdata.map(item=>{
      return {
        width: item.width,
        height: item.height,
        left: item.left,
        top: item.top,
        latticeCode: item.latticeCode,
        flag:false
      }
    })
    console.log(nowcabdata)
    this.setData({
      cabdata: nowcabdata
    })
  },

  switchzhixing(e){
    console.log(e)
    let index=e.currentTarget.dataset.index
    let nowcabdata = this.data.cabdata
        nowcabdata[index].flag = !nowcabdata[index].flag
    this.setData({
      cabdata: nowcabdata
    })
    console.log(this.data.cabdata)
  },

  jump(){
    wx.navigateTo({
      url: '../table/table?cesecabdata=' + this.data.cesecabdata,
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