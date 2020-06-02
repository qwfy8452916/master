const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
const app = getApp();
import wxrequest from '../../request/api';
Page({
  data: {
    cabId: '',
    hotelId: '',
    userid: '',
    subtype: 1,
    themecolor: '',
    //主题颜色
    uptext: '上传凭证',
    uptype: false,
    aftersaletype: [{
      dictValue: '0',
      dictName: '请选择'
    }],
    afterprod: [{
      id: '',
      hotelProdId: '',
      prodCode: '',
      prodShowName: '请选择'
    }],
    showproductInfo: [],
    //上传凭证 展示用
    dictValue: 0,
    //迷你吧申请售后原因
    operatorId: '',
    username: '',
    usertel: '',
    userremark: '',
    roomCode: '',
    //房间号
    prodcode: '',
    //商品code
    prodOwnerOrgId: '',
    //商品所属组织id
    prodOwnerOrgKind: '',
    //商品平台类型
    deliid: '',
    delivcode: '',
    devidetailid: '',
    productInfo: [],
    //上传凭证  传递数据
    back: '',
    hotelProdId: '',
    roomFloor: '',
    latticeCode: '',
    latticeId: '',
    prodShowName: '',
    totalAmount: ''
  },
  onLoad: function (options) {
    const that = this;
    that.setData({
      cabId: app.globalData.cabId,
      hotelId: app.globalData.hotelId,
      userid: app.globalData.userId,
      deliid: options.deliid,
      delivcode: options.delivcode,
      devidetailid: options.devidetailid,
      roomCode: options.roomcode,
      prodcode: options.prodcode
    });
    let after_prod = that.data.afterprod;
    let aftersale_type = that.data.aftersaletype;
    wx2my.getStorage({
      key: 'operatorId',

      success(res) {
        that.setData({
          operatorId: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'roomFloor',

      success(res) {
        that.setData({
          roomFloor: res.data
        });
      }

    });
    wx2my.getStorage({
      key: 'themecolor',

      success(res) {
        that.setData({
          themecolor: res.data
        });
      }

    });
    that.get_orderprodlist(options);
    let linkData = {
      key: 'AFTER_SALE_REASON',
      orgId: '0'
    };
    wxrequest.getaftertype(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        that.setData({
          aftersaletype: aftersale_type.concat(resdatas)
        });
      } else {
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  get_orderprodlist: function (options) {
    //获取订单商品
    const that = this;
    let linkData = {
      deliId: options.deliid
    };
    wxrequest.getorderprodlist(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        resdatas.forEach(item => {
          if (item.prodCode == options.prodcode) {
            that.setData({
              latticeCode: item.latticeCode,
              prodcode: item.prodCode,
              prodOwnerOrgId: item.prodOwnerOrgId,
              prodOwnerOrgKind: item.prodOwnerOrgKind,
              hotelProdId: item.hotelProdId,
              prodShowName: item.prodShowName
            });
          }
        });
        wx2my.hideLoading();
      } else {
        wx2my.hideLoading();
        wx2my.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    });
  },
  usertel: function (e) {
    this.setData({
      usertel: e.detail.value
    });
  },
  userremark: function (e) {
    this.setData({
      userremark: e.detail.value
    });
  },
  bindPickerChange: function (e) {
    //选择售后类型
    this.setData({
      dictValue: e.detail.value
    });
  },
  bindChooiceProduct: function () {
    //上传图片
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

    wx2my.chooseImage({
      count: countnum,
      sizeType: ['compressed'],
      // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'],
      // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        let tempFilePaths = res.tempFilePaths;

        if (tempFilePaths.length > 3) {
          wx2my.showModal({
            title: '提示',
            showCancel: false,
            content: '最多只能上传3张'
          });
          return;
        } else {
          //启动上传等待中...  
          wx2my.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          });
          let uploadImgCount = 0;

          for (let i = 0, h = tempFilePaths.length; i < h; i++) {
            wx2my.uploadFile({
              url: app.globalData.requestUrl + 'basic/file/upload2',
              filePath: tempFilePaths[i],
              name: 'fileContent',
              formData: {
                'imgIndex': i
              },
              header: {
                'content-type': 'application/json',
                // 默认值
                'Authorization': 'Bearer' + wx2my.getStorageSync("token")
              },
              success: function (res) {
                if (res.statusCode == 200) {
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
                      uptype: true
                    });
                  } else {
                    that.setData({
                      uptext: '上传',
                      uptype: false
                    });
                  }

                  that.setData({
                    productInfo: productInfo,
                    showproductInfo: showproductInfo
                  }); //如果是最后一张,则隐藏等待中  

                  if (uploadImgCount == tempFilePaths.length) {
                    wx2my.hideToast();
                  }
                } else {
                  wx2my.hideToast();
                  that.setData({
                    productInfo: [],
                    showproductInfo: [],
                    uptext: '上传凭证',
                    uptype: false
                  });
                  wx2my.showModal({
                    title: '错误提示',
                    content: '上传图片失败,请重新上传',
                    showCancel: false
                  });
                }
              },
              fail: function (res) {
                wx2my.hideToast();
                that.setData({
                  productInfo: [],
                  showproductInfo: [],
                  uptext: '上传凭证',
                  uptype: false
                });
                wx2my.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) {}
                });
              }
            });
          }
        }
      }
    });
  },
  subfun: function () {
    //提交申请售后
    const that = this;
    let dictValue = that.data.dictValue; //售后原因序号

    let aftersale_type = that.data.aftersaletype; //售后原因

    let username = that.data.username; //姓名

    let usertel = that.data.usertel; //电话

    let userremark = that.data.userremark; //备注

    let productInfo = that.data.productInfo; //上传图片地址

    if (username == '') {
      wx2my.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您的姓名'
      });
      return;
    }

    if (usertel == '') {
      wx2my.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您的联系电话'
      });
      return;
    } else if (!/^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(usertel)) {
      wx2my.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入您正确的联系电话'
      });
      return;
    }

    if (productInfo.length == 0) {
      wx2my.showModal({
        title: '提示',
        showCancel: false,
        content: '请上传至少一张凭证'
      });
      return;
    }

    if (aftersale_type[dictValue].dictName === "其他" && userremark.length == 0) {
      wx2my.showModal({
        title: '提示',
        showCancel: false,
        content: '请填写备注'
      });
      return;
    }

    if (dictValue == 0) {
      //判断是否选择售后原因
      wx2my.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择您申请售后的原因'
      });
      return;
    }

    that.setData({
      subtype: 0
    });
    let linkData = {
      cabApplReason: that.data.aftersaletype[dictValue].dictValue,
      //迷你吧申请售后原因
      cabCusName: username,
      //联系人姓名
      cabCusPhone: usertel,
      //联系人电话
      cabId: that.data.cabId,
      //柜子id
      cabLatticeCode: that.data.latticeCode,
      //格子编号
      cabRoomCode: that.data.roomCode,
      //柜子房间号
      csDescription: userremark,
      //售后申请描述
      csType: 3,
      //售后类型（1：换货，2：退货退款，3：迷你吧，4：退款）
      cusLogisticsCode: '',
      //客户物流单号
      cusLogisticsInfo: '',
      //客户物流信息
      customerId: that.data.userid,
      //用户id
      funcId: 1,
      //功能区Id
      hotelId: that.data.hotelId,
      //酒店id
      prodCode: that.data.prodcode,
      //商品code
      hotelProdId: that.data.hotelProdId,
      //酒店商品Id
      prodOwnerOrgId: that.data.prodOwnerOrgId,
      //商品所属组织id
      prodOwnerOrgKind: that.data.prodOwnerOrgKind,
      //商品平台类型
      certificateImages: productInfo,
      //凭证图
      prodCount: 1,
      refoundAmount: 0,
      orderDeviCode: that.data.delivcode,
      orderDeviDetailId: that.data.devidetailid,
      orderDeviId: that.data.deliid
    };
    wxrequest.postmnbafter(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;

      if (resdata.code == 0) {
        wx2my.showModal({
          title: '提示',
          showCancel: false,
          content: '申请售后提交成功',

          success(res) {
            if (res.confirm) {
              wx2my.reLaunch({
                url: '../index/index'
              });
            }
          }

        });
      } else {
        wx2my.showModal({
          title: '提示',
          showCancel: false,
          content: resdata.msg,

          success(res) {
            if (res.confirm) {
              wx2my.navigateTo({
                url: '../prodOrder/prodOrder?typeindex=all'
              });
            }
          }

        });
      }
    }).catch(err => {
      wx2my.hideLoading();
      console.log(err);
    });
  }
});