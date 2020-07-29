// pages/imageSelect/imageSelect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgData:[   //渲染数据
      { "img": "", num:'' },
      { "img": "", num: ''},
      { "img": "", num: ''},
      { "img": "", num: ''},
      { "img": "", num: ''},
      { "img": "", num: ''}
    ],
    arr:[],  //保存选择数据的索引数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //点击选中
  dianji:function(e){
    let nowImgData = this.data.imgData;
    let idx=e.currentTarget.dataset.index;  //获取点击索引
    let nowArray = this.data.arr;  //获取保存索引的数组
    let i = nowArray.indexOf(idx)  //判断当前索引在数组里是否存在
    console.log(idx)
    console.log(i)
    if (i!==-1){  //存在删除同时数据中num字段清空
      nowArray.splice(i, 1);
      nowImgData[idx].num=""
    }else{  //不存在存进数组中
      nowArray.push(idx)
    }
    
    console.log(nowArray)
    let num=1; //给num默认值
    for (var a = 0; a < nowArray.length;a++){
      let index = nowArray[a]  //循环保存数组中的索引
      // console.log(index)
      // console.log(num++)
      nowImgData[index].num = num++;   //修改选中的数据num值
    }
    console.log(nowImgData)
    this.setData({  //重新渲染数据
      imgData: nowImgData
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