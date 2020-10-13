const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
    prompt: '',
    optionsdata: {},
    roomService: '',//客房服务支持功能（0：不支持，1：展示，2：展示+下单）
    roomCode: '',
    hotelId: '',
    userid: '',
    prodnum: 0,//商品数量
    remark: '',//备注
    pjdata: [],//上传图片
    pjdata2: [],//post上传图片
    style: '',//表单类型
    subtype: 1,//1：可提交，0：提交中
    detaildata: {}//详情数据
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
    const that = this;
    let optionsdata = JSON.parse(options.infodata);
    that.setData({
      hotelId: app.globalData.hotelId,
      userid: app.globalData.userId,
      style: optionsdata.style,
      optionsdata: optionsdata,
      prompt: options.prompt
    });
    that.getdetaildata(options.id, options.hotelcategoryid);
    wx.getStorage({
      key: 'flagroomservice',
      success(res) {
        console.log(res.data)
        that.setData({
          roomService: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomCode',
      success: function(res) {
        that.setData({
          roomCode: res.data
        });
      }
    });
  },
  getdetaildata: function (id, hotelcategoryid) {//获取详情数据
    const that = this;
    wxrequest.getroomsercicedetail(hotelcategoryid,id).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          detaildata: resdatas
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
      wx.hideLoading();
      console.log(err)
    });
  },
  changeroomCode: function (e) {//修改房间号
    this.setData({
      roomCode: e.detail.value
    });
  },
  remarkfun: function (e) {//备注
    this.setData({
      remark: e.detail.value
    });
  },
  plusfun: function () {//加商品数量
    const that = this;
    let prodnum = that.data.prodnum;
    if (prodnum >= 20) {
      wx.showToast({
        title: '数量已超出范围，不可增加',
        icon: 'none',
        duration: 2000
      });
    } else {
      prodnum = prodnum + 1;
      that.setData({
        prodnum: prodnum
      });
    }
  },
  lessfun: function () {//减商品数量
    const that = this;
    let prodnum = that.data.prodnum;
    if (prodnum >= 1) {
      prodnum = prodnum - 1;
      that.setData({
        prodnum: prodnum
      });
    }
  },
  bindChooiceProduct: function () {//上传图片
    const that = this;
    let pjlength = that.data.pjdata.length;
    let countnum;
    if (pjlength == 0) {
      countnum = 3;
    } else {
      countnum = 3 - pjlength;
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
            content: '最多只能上传3张'
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
                'Authorization': 'Bearer' + app.globalData.token
              },
              success: function (res) {
                if (res.statusCode == 200) {
                  uploadImgCount++;
                  let data = JSON.parse(res.data);
                  let pjlistimg = that.data.pjdata;
                  let pjlistimg2 = that.data.pjdata2;
                  pjlistimg.push(data.data.fileUri);
                  pjlistimg2.push(data.data.filePath);
                  that.setData({
                    pjdata: pjlistimg
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
    const dataval = e.currentTarget.dataset.index;
    let pjdata = that.data.pjdata;
    let pjdata2 = that.data.pjdata2;
    pjdata.splice(dataval.index, 1);
    pjdata2.splice(dataval.index, 1);
    that.setData({
      pjdata: pjdata,
      pjdata2: pjdata2
    });
  },
  subfun: function () {
    wx.showLoading({
      title: '提交中',
    });
    const that = this;
    const optionsdata = that.data.optionsdata;
    const style = that.data.style;
    const roomCode = that.data.roomCode;
    const hotelId = that.data.hotelId;
    const userid = that.data.userid;
    const prodnum = that.data.prodnum;
    const remark = that.data.remark;
    const detaildata = that.data.detaildata;
    let listdata = [];
    let pordinfo = {};
    if (prodnum == 0 && optionsdata.isNeedNum == 1){
      wx.showToast({
        title: '请添加商品数量',
        icon: 'none',
        duration: 2000
      });
      return;
    } 
    if (roomCode == '' && optionsdata.isNeedRoomNo == 1) {
      wx.showToast({
        title: '请填写房间号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    that.setData({
      subtype: 0
    });
    pordinfo.content = "";//动态表单提交内容
    pordinfo.count = prodnum;//商品数量
    pordinfo.hotelCategoryCommonStyleId = detaildata.id;//酒店服务下单通用明细样式表id
    pordinfo.imgPath = that.data.pjdata2;//上传的图片
    pordinfo.rmsvcOrderId = detaildata.id;//客房服务订单父表id
    pordinfo.style = style;//明细样式类型
    listdata.push(pordinfo);
    let linkData = {
      customerId: userid,
      hotelCategoryId: detaildata.hotelCategoryId,
      hotelId: hotelId,
      rmsvcOrderDetailDTOList: listdata,
      roomCode: roomCode,
      userRemark: remark,
      cabId: app.globalData.cabId
    };
    wxrequest.postroomorder(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: that.data.prompt,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '../roomservice/roomservice'
              });
            }
          }
        });
      } else {
        that.setData({
          subtype: 0
        });
        wx.showToast({
          title: resdata.msg,
          icon: 'none',
          duration: 2000
        });
      }
    })
    .catch(err => {
      wx.hideLoading();
      console.log(err)
    });
  }
})