const app = getApp()
Page({
  data: {
    themecolor: '',//主题颜色
    uptext: '上传凭证',
    uptype: false,
    username: '',
    usertel: '',
    userremark: '',
    aftersaletype: [
      {
        dictValue: '0',
        dictName: '请选择'
      }
    ],
    dictValue: 0,
    cabId: '',
    productInfo: [],//上传凭证
    hotelId: '',
    operatorId: '',
    userid: '',
    orderCode: '',//订单号
    orderId: '',//订单id
    prodid: '',//商品id
    back: '',
    roomCode: '',//房间号
    latticeCode: '',
    latticeId: '',
    cabCode: ''
  },
  onLoad: function (options) {
    console.log(options);
    let that = this;
    let aftersale_type = that.data.aftersaletype;
    wx.getStorage({
      key: 'hotelId',
      success(res) {
        that.setData({
          hotelId: res.data
        });
      }
    });
    wx.getStorage({
      key: 'operatorId',
      success(res) {
        that.setData({
          operatorId: res.data
        });
      }
    });
    wx.getStorage({
      key: 'userid',
      success(res) {
        that.setData({
          userid: res.data
        });
      }
    });
    wx.getStorage({
      key: 'themecolor',
      success(res) {
        that.setData({
          themecolor: res.data
        });
      }
    });
    wx.getStorage({
      key: 'CabCode',
      success(res) {
        that.setData({
          cabCode: res.data
        })
      }
    });



    that.setData({
      cabId: options.cabId,
      orderCode: options.orderCode,
      orderId: options.orderId,
      prodid: options.prodid,
      back: options.back,
      roomCode: options.roomCode,
      latticeCode: options.latticeCode,
      latticeId: options.latticeId
    });
    wx.request({
      url: app.data.requestUrl + 'basic/dict/items/',
      // url: 'http://192.168.1.51:9001/longan/api/basic/dict/items/',
      header: {
        'content-type': 'application/json', // 默认值         
        'Authorization': wx.getStorageSync("token")
      },
      method: "get",
      data: {
        key: 'AFTER_SALE_REASON',
        orgId: '0'
      },
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        let empty = [];
        if (resdata.code == '0') {
          that.setData({
            aftersaletype: aftersale_type.concat(resdatas)
          })
        };
      }
    });
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  usertel: function (e) {
    this.setData({
      usertel: e.detail.value
    })
  },
  userremark: function (e) {
    this.setData({
      userremark: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      dictValue: e.detail.value
    })
  },
  backfun: function(){
    let that = this;
    if (that.data.back == 1){
      wx.redirectTo({
        url: '../paysuccess/paysuccess?cabId=' + that.data.cabId + '&orderCode=' + that.data.orderCode + '&orderId=' + that.data.orderId + '&prodid=' + that.data.prodid + '&back=1' + '&roomCode=' + that.data.roomCode + '&latticeCode=' + that.data.latticeCode + '&latticeId=' + that.data.latticeId + '&hotelId=' + that.data.hotelId
      })
    }else{
      wx.redirectTo({
        url: '../orderlist/orderlist'
      })
    }
  },
  //上传图片
  bindChooiceProduct: function () {
    let that = this;
    let productInfo = that.data.productInfo;
    let productInfo2 = [];
    if (that.data.uptype) {
      that.setData({
        productInfo: productInfo2
      });
    }
    wx.chooseImage({
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        let tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 3){
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '最多只能上传3张'
          });
          return;
        }else{
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
              // url: 'http://192.168.1.51:9001/longan/api/basic/file/upload',
              url: app.data.requestUrl + 'basic/file/upload',
              filePath: tempFilePaths[i],
              name: 'fileContent',
              formData: {
                'imgIndex': i
              },
              header: {
                "Content-Type": "multipart/form-data"
              },
              success: function (res) {
                uploadImgCount++;
                var data = JSON.parse(res.data);
                //服务器返回格式: { "Catalog": "testFolder", "FileName": "1.jpg", "Url": "https://test.com/1.jpg" }  
                var productInfo = that.data.productInfo;
                if (productInfo == null) {
                  productInfo = [];
                }
                productInfo.push(
                  data.data
                );
                if (productInfo.length == 3){
                  that.setData({
                    uptext: '重新上传',
                    uptype: true,
                  });
                }else{
                  that.setData({
                    uptext: '上传',
                    uptype: false,
                  });
                }
                that.setData({
                  productInfo: productInfo
                });
                //如果是最后一张,则隐藏等待中  
                if (uploadImgCount == tempFilePaths.length) {
                  wx.hideToast();
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
  subfun: function () {
    let that = this;
    let dictValue = that.data.dictValue;//售后原因序号
    let aftersale_type = that.data.aftersaletype;//售后原因
    let username = that.data.username;//姓名
    let usertel = that.data.usertel;//电话
    let userremark = that.data.userremark;//备注
    let productInfo = that.data.productInfo;//上传图片地址
    if (dictValue == 0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择您申请售后的原因'
      });
      return;
    } else if (dictValue == 1){
      wx.request({
        url: app.data.requestUrl + 'mal',
        header: {
          'content-type': 'application/json', // 默认值         
          'Authorization': wx.getStorageSync("token")
        },
        method: "post",
        data: {
          cabId: that.data.cabId,
          customerId: that.data.userid,
          latticeCode: that.data.latticeCode,
          malType: 2, //0-初始类型; 1-扫码失败; 2-柜门不开; 3-锁具异常; 4-其他
        },
        success(res) {
          console.log("已报修");
        }
      });
    }
    if (username == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您的姓名'
      });
      return;
    }
    if (usertel == '') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您的联系电话'
      });
      return;
    } else if (!/^1(3|4|5|7|8)\d{9}$/.test(usertel)) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您正确的联系电话'
      });
      return;
    }
    if (productInfo.length == 0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请上传至少一张凭证'
      });
      return;
    }
    if (aftersale_type[dictValue].dictName === "其他" && userremark.length == 0){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写备注'
      });
      return;
    }
    wx.request({
      // url: 'http://192.168.1.51:9001/longan/api/cs/request',
      url: app.data.requestUrl + 'cs/request',
      header: {
        'content-type': 'application/json', // 默认值         
        'Authorization': wx.getStorageSync("token")
      },
      method: "post",
      data: {
        oprOrgIdStr: that.data.operatorId,
        hotelIdStr: that.data.hotelId,
        requestReasonStr: that.data.aftersaletype[dictValue].id,
        customerIdStr: that.data.userid,
        customerName: username,
        customerMobile: usertel,
        userRoomCode: that.data.roomCode,
        accessoryPath: JSON.stringify(productInfo),
        requestRemark: that.data.userremark,
        cabIdStr: that.data.cabId,
        orderCode: that.data.orderCode,
        orderIdStr: that.data.orderId,
        prodIdStr: that.data.prodid
      },   
      success(res) {
        let resdata = res.data;
        let resdatas = res.data.data;
        let empty = [];
        console.log(res.statusCode)
        if (resdata.code == '0') {
          console.log("请求成功了");
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '申请售后提交成功',
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../index/index?cabCode=' + that.data.cabCode
                })
              }
            }
          });
        }else{
          console.log(resdata.msg);
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: resdata.msg,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../index/index?cabCode=' + that.data.cabCode
                })
              }
            }
          });
        };
      },
      fail: function(){
        console.log("请求失败啦");
      }
    });
  }
})