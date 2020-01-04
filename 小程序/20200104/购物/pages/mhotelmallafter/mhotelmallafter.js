const app = getApp();
import wxrequest from '../../request/api'
let utils = require('../../utils/util.js')
Page({
  data: {
    prodstate: 0,//是否已申请售后0:没有，1有
    hotelBookingPhone: '',  //客服电话
    refundsubtype: true,    //是否已提交申请
    canceltype: true,       //是否显示撤销申请按钮
    uptext: '上传凭证',
    productInfo: [],        //上传凭证 传递数据
    showproductInfo: [],    //上传凭证 展示用
    csRequestDTOs: [],      //凭证图
    csRequestDTOstype: false,   //是否有凭证
    customerId: '',
    rebateState: '',//退款换货说明
    prodinfo: '',//商品信息
    name: '',//商品显示名称
    prodnum: '',//商品数量
    prodjg: '',//商品单价
    imgurl: '',//商品图片
    id: '',//售后记录id
    proddeliv: '',//商品已申请售后数量
    delivstatus: '',        //配送单状态0=待确认 1=已确认 2=已配送 3=部分退款 4=全部退款 5=已收货
    aprodamountAll: '',//申请售后总价
    aprodamount: '',//退款金额（用于修改的）
    afternum: 0,//申请售后数量
    roomCode: '',//房间号
    cabId: '',//柜子id
    hotelId: '',
    funcid: '',//功能区id
    array: [{               //售后类型
        id: 4,
        name: '退款'
      },
      {
        id: 1,
        name: '换货'
      },
      {
        id: 2,
        name: '退货退款'
    }],
    orderDeviCode: '',//配送单号
    orderDeviDetailId: '',//配送单详情Id
    orderDeviId: '',//配送单id
    index: 0,
    csKind: 4,               //售后类型值
    csStatus: '',            //售后结果
    csid: ''                 //售后id
  },
  onLoad: function (options) {
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    that.setData({
      customerId: app.globalData.userId,
      cabId: app.globalData.cabId,
      hotelId: app.globalData.hotelId
    });
    if (options.prodstatus == 5) {//0：正常，1:确认前退款，2：退款 ，3：换货，4： 退货退款 , 5:售后待处理
      that.getafterdata(options.csid);
      that.setData({
        csid: options.csid,
        prodstate: 1
      });
    } else {
      let prodinfo = JSON.parse(options.prodinfo);
      let namedata = '';
      let imgdata = '';
      if (prodinfo.prodHotelProductDTO.prodShowName != '' && prodinfo.prodHotelProductDTO.prodShowName){
        namedata = prodinfo.prodHotelProductDTO.prodShowName;
      } else {
        namedata = prodinfo.prodProductDTO.prodShowName;
      }
      if (prodinfo.prodHotelProductDTO.prodLogoUrl != '' && prodinfo.prodHotelProductDTO.prodLogoUrl) {
        imgdata = prodinfo.prodHotelProductDTO.prodLogoUrl;
      } else {
        imgdata = prodinfo.prodProductDTO.prodLogoUrl;
      }
      let afternum = parseInt(prodinfo.prodCount) - parseInt(prodinfo.prodCsTimes);
      let aprodamountAll = (parseInt(prodinfo.prodCount) - parseInt(prodinfo.prodCsTimes)) * parseFloat(prodinfo.prodPrice);
      aprodamountAll = aprodamountAll.toFixed(2);
      that.setData({
        name: namedata,//商品显示名称
        prodnum: prodinfo.prodCount,//商品数量
        prodjg: prodinfo.prodPrice,//商品单价
        imgurl: imgdata,
        delivstatus: options.delivstatus,
        funcid: options.funcid,//功能区id
        prodinfo: prodinfo,
        aprodamountAll: aprodamountAll,
        aprodamount: prodinfo.totalAmount,
        proddeliv: prodinfo.prodCsTimes,//商品已申请数量
        orderDeviCode: options.delivcode,//配送单号
        orderDeviDetailId: prodinfo.id,//配送单详情Id
        orderDeviId: prodinfo.orderDeliveryId,//配送单id
        afternum: afternum//申请售后数量
      });
      that.getTkmoney(prodinfo.id, afternum);
      wx.hideLoading();
    }
    wx.getStorage({
      key: 'hotelBookingPhone',
      success: function (res) {
        that.setData({
          hotelBookingPhone: res.data
        })
      },
    });
    wx.getStorage({
      key: 'roomCode',
      success: function (res) {
        that.setData({
          roomCode: res.data
        })
      },
    });
    if (options.prodstatus == 0) {
      wx.setNavigationBarTitle({
        title: '申请售后'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '售后详情'
      })
    }
  },
  bindPickerChange: function(e){//售后类别选择
    const that = this;
    const proddeliv = that.data.prodinfo.prodCsTimes;//已申请数量
    const prodamount = that.data.prodinfo.prodPrice;//商品单价
    const num = that.data.prodinfo.prodCount;//商品数量
    let aprodamountAll = 0;//申请售后总价
    let afternum = 0;//申请售后商品数量
    let type;
    if (e.detail.value == 0){
      type = 4;
      aprodamountAll = parseFloat(prodamount) * (num - parseInt(proddeliv));
      afternum = num - parseInt(proddeliv);
    } else if (e.detail.value == 1){
      type = 1;
      aprodamountAll = 0;
      afternum = 1;
    } else {
      type = 2;
      afternum = 1;
      aprodamountAll = prodamount;
    }
    that.setData({
      index: e.detail.value,
      aprodamountAll: aprodamountAll,
      aprodamount: prodamount,
      afternum: afternum,
      csKind: type
    });
    that.getTkmoney(that.data.orderDeviDetailId, afternum);
  },
  getTkmoney: function (id, prodCount) {//获取退款金额
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      prodCount: prodCount
    };
    wxrequest.getrefundamount(id, linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          aprodamountAll: resdatas.toFixed(2),
          aprodamount: resdatas.toFixed(2)
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
  aprodamountchange: function (e) {//修改退款金额
    const that = this;
    const prodamount = that.data.prodinfo.prodPrice;//商品单价
    const prodactualamount = that.data.prodinfo.totalAmount;//实付金额
    const proddeliv = that.data.prodinfo.prodCsTimes;//已申请数量
    const num = that.data.prodinfo.prodCount;//商品数量
    let amount = parseFloat(prodamount) * (num - parseInt(proddeliv));

    if (e.detail.value > prodactualamount || e.detail.value > amount){
      wx.showModal({
        title: '提示',
        content: '退款金额不可大于实付金额，请重新填写',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            that.setData({
              aprodamountAll: prodamount
            })
          }
        }
      })
      return;
    }else {
      that.setData({
        aprodamountAll: e.detail.value
      })
    }
  },
  reasonfun: function (e) {//退款/换货说明
    this.setData({
      rebateState: e.detail.value
    })
  },
  shipmentinfofun: function (e) {//物流信息
    this.setData({
      shipmentinfo: e.detail.value
    })
  },
  shipmentfun: function (e) {//物流单号
    this.setData({
      shipmentnum: e.detail.value
    })
  },
  bindChooiceProduct: function () {//上传图片
    const that = this;
    let productInfo = that.data.productInfo;
    let showproductInfo = that.data.showproductInfo;
    let countnum;
    if (that.data.uptype) {
      productInfo = [];
      showproductInfo = [];
      that.setData({
        productInfo: productInfo,
        showproductInfo: showproductInfo
      });
    }
    if (productInfo.length == 0) {
      countnum = 3;
    } else {
      countnum = 3 - productInfo.length;
    }
    wx.chooseImage({
      count: countnum,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        let tempFilePaths = res.tempFilePaths;
        if (tempFilePaths.length > 3) {
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
              formData: {
                'imgIndex': i
              },
              header: {
                'content-type': 'application/json', // 默认值
                'Authorization': 'Bearer' + wx.getStorageSync("token")
              },
              success: function (res) {
                if(res.statusCode == 200){
                  uploadImgCount++;
                  let data = JSON.parse(res.data);
                  if (productInfo == null) {
                    productInfo = [];
                    showproductInfo = [];
                  }
                  
                  productInfo.push(data.data.filePath);
                  showproductInfo.push(data.data.fileUri);

                  if (productInfo.length == 3) {
                    that.setData({
                      uptext: '重新上传',
                      uptype: true,
                    });
                  } else {
                    that.setData({
                      uptext: '上传凭证',
                      uptype: false,
                    });
                  }
                  that.setData({
                    productInfo: productInfo,
                    showproductInfo: showproductInfo
                  });
                  //如果是最后一张,则隐藏等待中  
                  if (uploadImgCount == tempFilePaths.length) {
                    wx.hideToast();
                  }
                } else {
                  wx.hideToast();
                  that.setData({
                    productInfo: [],
                    showproductInfo: [],
                    uptext: '上传凭证',
                    uptype: false,
                  });
                  wx.showModal({
                    title: '错误提示',
                    content: '上传图片失败,请重新上传',
                    showCancel: false
                  });
                }
              },
              fail: function (res) {
                wx.hideToast();
                that.setData({
                  productInfo: [],
                  showproductInfo: [],
                  uptext: '上传凭证',
                  uptype: false,
                });
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
  cutback: function(){//减少数量
    const that = this;
    let afternum = that.data.afternum;//申请售后数量
    const prodamount = that.data.prodinfo.prodPrice;//商品单价
    let aprodamount = 0;//售后金额
    if (afternum == 1){
      wx.showToast({
        title: '商品数量不可为0',
        icon: 'none',
        duration: 2000
      });
      return;
    }else{
      afternum -= 1;
      aprodamount = afternum * parseFloat(prodamount);
      that.setData({
        afternum: afternum,
        aprodamountAll: aprodamount.toFixed(2),
        aprodamount: aprodamount.toFixed(2)
      });
      that.getTkmoney(that.data.orderDeviDetailId, afternum);
    }
  },
  add: function () {//增加数量
    const that = this;
    let afternum = that.data.afternum;//申请售后数量
    const proddeliv = that.data.proddeliv;//已申请总数
    const pornum = that.data.prodnum;//商品总数
    let canpornum = parseInt(pornum) - parseInt(proddeliv);
    let aprodamount = 0;//售后金额
    if (canpornum <= 0) {
      canpornum = 0;
    }
    const prodamount = that.data.prodinfo.prodPrice;//商品单价
    if (afternum >= canpornum){
      wx.showToast({
        title: '申请数量不能大于商品可申请数量，此商品还有' + canpornum +'件可申请售后',
        icon: 'none',
        duration: 3000
      });
      return;
    } else {
      afternum += 1;
      aprodamount = afternum * parseFloat(prodamount);
      that.setData({
        afternum: afternum,
        aprodamountAll: aprodamount.toFixed(2),
        aprodamount: aprodamount.toFixed(2)
      });
      that.getTkmoney(that.data.orderDeviDetailId, afternum);
    }
  },
  cancel: function(){//撤销申请
    const that = this;
    wx.showModal({
      title: '',
      content: '是否撤销申请？',
      success(res) {
        if (res.confirm) {
          wxrequest.putmallafter(that.data.csid).then(res => {
            let resdata = res.data;
            let resdatas = res.data.data;
            if (resdata.code == 0) {
              if(res.data.data){
                wx.showToast({
                  title: '已成功撤销申请',
                  icon: 'success',
                  duration: 1500
                });
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1500);
              } else {
                wx.showToast({
                  title: '此订单已处理，不可撤销',
                  icon: 'success',
                  duration: 1500
                });
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1500);
              }
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
        }
      }
    })
  },
  aftersub: function () {//提交售后申请
    const that = this;
    const thatdata = this.data;
    that.setData({
      refundsubtype: false
    });
    let aprodamount_All = thatdata.aprodamountAll;//退款金额
    if (thatdata.csKind == 1) {//换货
      aprodamount_All = 0.00
    } else if (thatdata.aprodamountAll == 0 || thatdata.aprodamountAll == 0.00 || thatdata.aprodamountAll == '') {
      wx.showModal({
        title: '提示',
        content: '退款金额不可为空、不可为0，请重新填写',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            that.setData({
              aprodamountAll: thatdata.prodinfo.totalAmount
            })
          }
        }
      })
      return;
    }
    let linkData = {
      cabApplReason: '',//迷你吧申请售后原因
      cabCusName: '',//联系人姓名
      cabCusPhone: '',//联系人电话
      cabId: thatdata.cabId,//柜子id
      cabLatticeCode: '',//格子编号
      cabRoomCode: thatdata.roomCode,//柜子房间号
      csDescription: thatdata.rebateState,//售后申请描述
      csType: thatdata.csKind,//售后类型（1：换货，2：退货退款，3：迷你吧，4：退款）
      cusLogisticsCode: thatdata.shipmentnum,//客户物流单号
      cusLogisticsInfo: thatdata.shipmentinfo,//客户物流信息
      customerId: thatdata.customerId,//用户id
      funcId: thatdata.funcid,//功能区Id
      hotelId: thatdata.hotelId,//酒店id
      prodCode: thatdata.prodinfo.prodCode,//商品code
      hotelProdId: thatdata.prodinfo.hotelProdId,//酒店商品Id
      prodOwnerOrgId: thatdata.prodinfo.prodOwnerOrgId,//商品所属组织id
      prodOwnerOrgKind: thatdata.prodinfo.prodOwnerOrgKind,//商品平台类型
      certificateImages: thatdata.productInfo,//凭证图
      prodCount: thatdata.afternum,//售后数量
      refoundAmount: aprodamount_All,//退款金额
      orderDeviCode: thatdata.orderDeviCode,//配送单号
      orderDeviDetailId: thatdata.orderDeviDetailId,//配送单详情Id
      orderDeviId: thatdata.orderDeviId,//配送单id
      id: thatdata.id
    };
    wxrequest.postmnbafter(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        if (res.data.data) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '申请成功！',
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                });
              }
            }
          })
        }
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        that.setData({
          refundsubtype: true
        })
      }
    })
    .catch(err => {
      console.log(err)
    });
  },
  getafterdata: function(csid){//获取已申请售后商品详情
    const that = this;
    that.setData({
      id: csid
    });
    wxrequest.getafterdetail(csid).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      let csRequestDTOstype;
      if (resdata.code == 0) {
        if (resdatas.certificateImages == null || resdatas.certificateImages.length == 0 ){
          csRequestDTOstype = false;
        }else{
          csRequestDTOstype = true;
        }
        let canceltype;
        if (resdatas.status != 1) {
          canceltype = false;
        } else {
          canceltype = true;
        }
        let prodDelivnum;
        if (resdatas.prodCount == undefined){
          prodDelivnum = 0;
        } else {
          prodDelivnum = resdatas.prodCount;
        }
        that.setData({
          name: resdatas.productName,//商品显示名称
          prodnum: resdatas.prodCount,//商品数量
          prodjg: resdatas.prodAmount,//商品单价
          imgurl: resdatas.productImage,//商品图片
          csKind: resdatas.csType,//售后类型
          csStatus: resdatas.status,//售后处理状态
          canceltype: canceltype,//是否显示撤销按钮
          csRequestDTOs: resdatas.certificateImages,//凭证图
          csRequestDTOstype: csRequestDTOstype,//是否显示凭证
          prodinfo: resdatas,//商品信息
          aprodamount: resdatas.prodAmount,
          aprodamountAll: resdatas.prodAmount,
          proddeliv: prodDelivnum,
          orderDeviCode: resdatas.orderDeviCode,//配送单号
          orderDeviDetailId: resdatas.orderDeviDetailId,//配送单详情Id
          orderDeviId: resdatas.orderDeviId,//配送单id
          funcid: resdatas.funcId,//功能区Id
          afternum: resdatas.prodCount
        });
        that.getTkmoney(resdatas.orderDeviDetailId, resdatas.prodCount);
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
  application: function () {//再次申请售后
    this.setData({
      prodstate: 0,
      csKind: 4
    })
  },
  kefun: function () {//联系客服
    const that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.hotelBookingPhone
    })
  }
})