// pages/shaix/shaix.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    items01: [
      { value: '001', name: '001', checked: false},
      { value: '002', name: '002', checked: false },
      { value: '003', name: '003', checked: false}
    ],
    items02: [
      { value: '01', name: '01', checked: false },
      { value: '02', name: '02', checked: false },
      { value: '03', name: '03', checked: false }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // boxdianji01:function(e){
    
  //   var index = e.currentTarget.dataset.id;
  //   var lengthcd = this.data.items01.length;
  //   var nowitems01 = this.data.items01;
  //   console.log(index)
  //   for (var i = 0; i < lengthcd ;i++){
  //      if(index==i){
  //        nowitems01[index].checked=true
  //      }else{
  //        nowitems01[i].checked = false
  //      }
  //   }
  //   this.setData({
  //     items01: nowitems01
  //   })

  // },

  // boxdianji02: function (e) {
  //   var value = e.currentTarget.dataset.value
  //   var index02 = e.currentTarget.dataset.id;
  //   var nowitem02 = this.data.items02;
  //   var lengthcd = this.data.items02.length;
  //   var nowarr=this.data.arr;
  //   var panduan=true;
  
    // if (nowarr.length>0){
    //   for (var i = 0; i < lengthcd;i++){
    //       if(index02==i){
    //         nowitem02[i].checked = !nowitem02[i].checked
    //         console.log(i)
    //       }
    //     if (nowarr[i]==value){
    //       panduan=false;
    //       nowarr.splice(index02,1)
    //     }

    // }
    // if (panduan == true) {
    //   nowarr.push(value)
    // }
  // }else{
  //     nowarr.push(value)
  // }




  //   this.setData({
  //     items02: nowitem02,
  //     arr: nowarr
  //   })
  //   console.log(this.data.arr)
  // },


  boxdianji01: function (e) {

    var index = e.currentTarget.dataset.id;
    var nowitems = this.data.items01;

    for (var i = 0; i < nowitems.length; i++) {
      nowitems[i].checked = false
    }

    nowitems[index].checked = true;

    this.setData({
      items01: nowitems
    });

  },

  boxdianji02: function (e) {
    var index = e.currentTarget.dataset.id;

    var nowitem = this.data.items02;
    nowitem[index].checked = !nowitem[index].checked;

    let arr = []

    for (var i = 0; i < nowitem.length; i++) {
      if (nowitem[i].checked) {
        arr.push(nowitem[i].name)
      }
    }

    this.setData({
      items02: nowitem
    });
    console.log(arr)
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