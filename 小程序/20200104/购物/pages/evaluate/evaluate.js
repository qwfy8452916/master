const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    evaluatelist: '',
    type: ''
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.get_evaluationlist(options.prodcode);
  },
  get_evaluationlist: function (prodcode) {//获取商品评价信息
    const that = this;
    let linkData = {
      hotelId: app.globalData.hotelId,
      prodCode: prodcode
    };
    wxrequest.getevaluationlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let type = false;
        if (res.data.data.length != 0){
          type = true
        }
        that.setData({
          evaluatelist: res.data.data,
          type: type
        });
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
      console.log(err)
    });
  },
  previewImg: function(e){
    let index = e.currentTarget.dataset.index;
    let imgArr = e.currentTarget.dataset.imgarr;
    let imglist = [];
    for (let i = 0; i < imgArr.length; i++){
      imglist.push(imgArr[i].imageUrl);
    }
    wx.previewImage({
      current: imglist[index],     //当前图片地址
      urls: imglist               //所有要预览的图片的地址集合 数组形式
    })
  }
})