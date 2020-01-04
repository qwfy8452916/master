const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    orderinfo: [],  //订单信息
    pjdata: [],     //评价数据
    orderId: ''     //订单id
  },
  onLoad: function (options) {
    const that = this;
    let url;
    that.setData({
      orderId: options.id
    });
    that.getorderinfo(options);
  },
  getorderinfo: function (options) {//获取订单信息
    const that = this;
    wxrequest.getorderdetail2(options.id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let orderinfoA = JSON.stringify(resdatas.orderDeliveryDetailDTOList);//解决地址引用带来的问题
        orderinfoA = JSON.parse(orderinfoA);//解决地址引用带来的问题
        let orderinfoB = JSON.stringify(resdatas.orderDeliveryDetailDTOList);//解决地址引用带来的问题
        orderinfoB = JSON.parse(orderinfoB);//解决地址引用带来的问题
        for (let i = 0; i < resdatas.orderDeliveryDetailDTOList.length; i++){
          orderinfoB[i] = {};
          orderinfoB[i].remarkContent = ''; //评价内容
          orderinfoB[i].remarkImages = [];//评价图片
          orderinfoB[i].imglist = [];//显示评价图片
          orderinfoB[i].hotelId = parseInt(app.globalData.hotelId);//酒店id
          orderinfoB[i].customerId = parseInt(app.globalData.userId);//用户id
          orderinfoB[i].hotelProdId = parseInt(orderinfoA[i].hotelProdId);//酒店商品id
          orderinfoB[i].prodCode = orderinfoA[i].prodCode;//酒店商品code
          orderinfoA[i].uptype = true;
        }
        that.setData({
          orderinfo: orderinfoA,
          pjdata: orderinfoB
        })
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
  bindChooiceProduct: function (e) {//上传图片
    const that = this;
    let index = e.currentTarget.dataset.index;
    const hotelprodid = e.currentTarget.dataset.hotelprodid;
    let orderinfo = that.data.orderinfo;
    let pjlength = that.data.pjdata[index].remarkImages.length;
    let countnum;
    if (pjlength == 0){
      countnum = 9;
    } else {
      countnum = 9 - pjlength;
    }
    wx.chooseImage({
      count: countnum,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > countnum) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '最多只能上传9张'
          });
          return;
        } else {
          //启动上传等待中...  
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          })
          let uploadImgCount = 0;
          for (let i = 0, h = tempFilePaths.length; i < h; i++) {
            wx.uploadFile({
              url: app.globalData.requestUrl + 'basic/file/upload2',
              filePath: tempFilePaths[i],
              name: 'fileContent',
              header: {
                
              },
              formData: {
                'imgIndex': i
              },
              header: {
                // "Content-Type": "multipart/form-data",
                'content-type': 'application/json', // 默认值
                'Authorization': 'Bearer' + wx.getStorageSync("token")
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  uploadImgCount++;
                  let data = JSON.parse(res.data);
                  let pjdata = that.data.pjdata;
                  let pjlistimg = that.data.pjdata[index].remarkImages;
                  let imglist = that.data.pjdata[index].imglist;
                  
                  pjlistimg.push(data.data.filePath);

                  let imgdata = {};
                  imgdata.fileUri = data.data.fileUri;
                  imgdata.hotelprodid = hotelprodid;
                  imglist.push(imgdata);

                  if (pjlistimg.length == 9) {
                    orderinfo[index].uptype = false;
                  } else {
                    orderinfo[index].uptype = true;
                  }

                  pjdata[index].remarkImages = pjlistimg;
                  pjdata[index].imglist = imglist;

                  that.setData({
                    pjdata: pjdata,
                    orderinfo: orderinfo
                  });
                  //如果是最后一张,则隐藏等待中  
                  if (uploadImgCount == tempFilePaths.length) {
                    wx.hideToast();
                  }
                } else {
                  wx.hideToast();
                  wx.showModal({
                    title: '错误提示',
                    content: '上传图片失败,请重新上传',
                    showCancel: false
                  })
                }
              },
              fail: function (res) {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) { }
                })
              }
            });
          }
        }
      }
    });
  },
  closeimg: function (e) {//删除图片
    const that = this;
    const dataval = e.currentTarget.dataset;
    let pjdata = that.data.pjdata;

    let indexnum = pjdata.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == dataval.hotelprodid;
    });

    let orderinfo = that.data.orderinfo;
    pjdata[indexnum].remarkImages.splice(dataval.index, 1);
    pjdata[indexnum].imglist.splice(dataval.index, 1);
    orderinfo[indexnum].uptype = true;
    that.setData({
      pjdata: pjdata,
      orderinfo: orderinfo
    });
  },
  pjtext: function (e) {//评价内容e.detail.value,e.currentTarget.dataset.index
    const that = this;
    let index = e.currentTarget.dataset.index;
    let pjdata = that.data.pjdata;
    pjdata[index].remarkContent = e.detail.value;
    that.setData({
      pjdata: pjdata
    })
  },
  subpj: function(){//提交评价
    const that = this;
    let num = 0;
    let pj_data = JSON.stringify(that.data.pjdata);
    pj_data = JSON.parse(pj_data);
    const orderId = parseInt(that.data.orderId);//订单id
    for (let i = 0; i < pj_data.length; i++){
      if (pj_data[i].remarkContent == '' && pj_data[i].remarkImages.length == 0){
        num = num + 1;
      }
    }
    if (pj_data.length == num){
      wx.showToast({
        title: '请填写至少一条评价信息',
        icon: 'none',
        duration: 2000
      });
      return;
    } else {
      for (let i = 0; i < pj_data.length; i++) {
        if (pj_data[i].remarkContent == '' && pj_data[i].remarkImages.length == 0) {
          pj_data.splice(i,1);
        }
      }
      let linkData = {
        orderDeliveryId: orderId,
        remarkDTOS: pj_data
      };
      wxrequest.postevaluation(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if (resdata.code == 0) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err)
      });
    }
  }
})