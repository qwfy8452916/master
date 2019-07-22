const app = getApp()
Page({
  data: {
    deliverylist1: [],//客房配送
    deliverytype1: '',//是否显示客房配送
    deliverylist2: [],//快递到家
    deliverytype2: '',//是否显示快递到家
    lumpsum: '0.00',//商品总额
    alllength: '',//结算商品种类总数
    selectalltype: false,//全选
    roomFloor: '',//楼层
    roomCode: '',//房间号
    hotelName: '',//酒店名称
    receipttype: '',//收货信息是否需要填写
    receiptlist: '',//收货信息
    isvirtual: ''//是否是虚拟柜 false: 虚拟柜，true: 不是虚拟柜
  },
  onShow: function () {
    let that = this;

    that.setData({
      selectalltype: false,
      lumpsum: '0.00'
    })

    wx.getStorage({
      key: 'isvirtual',
      success: function (res) {
        that.setData({
          isvirtual: res.data
        })
      },
    })

    wx.getStorage({
      key: 'addressid',
      success: function (res) {//获取选中地址
        wx.request({
          url: app.data.requestUrl + 'order/address/' + res.data,
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': wx.getStorageSync("token")
          },
          method: "get",
          success(res) {
            const resdata = res.data;
            const resdatas = res.data.data;
            let receipttype = that.data.receipttype;
            if (resdata.code == 0) {
              that.setData({
                receiptlist: resdatas,
                receipttype: false
              })
            }
          }
        })
      },
      fail: function (res) {//获取默认地址
        wx.getStorage({
          key: 'userid',
          success: function (res) {
            wx.request({
              url: app.data.requestUrl + 'order/address/default',
              header: {
                'content-type': 'application/json', // 默认值
                'Authorization': wx.getStorageSync("token")
              },
              method: "get",
              data: {
                customerId: res.data
              },
              success(res) {
                const resdata = res.data;
                const resdatas = res.data.data;
                let receipttype = that.data.receipttype;
                // console.log(res.statusCode)
                if (res.statusCode != 200) {//如果没有默认地址
                  that.setData({
                    receipttype: true
                  })
                }else{
                  if (resdata.code == 0) {
                    that.setData({
                      receiptlist: resdatas,
                      receipttype: false
                    })
                  }
                }
              },
              fail(res) {
                that.setData({
                  receiptlist: resdatas,
                  receipttype: true
                })
              }
            })
          }
        });
      }
    });
    wx.getStorage({
      key: 'deliverylist1',
      success: function(res) {
        if (res.data.length > 0){
          that.setData({
            deliverylist1: res.data,
            deliverytype1: true
          })
        }else{
          that.setData({
            deliverytype1: false
          })
        }        
      }
    });
    wx.getStorage({
      key: 'deliverylist2',
      success: function (res) {
        if (res.data.length > 0) {
          that.setData({
            deliverylist2: res.data,
            deliverytype2: true
          })
        } else {
          that.setData({
            deliverytype2: false
          })
        }
      }
    });
    wx.getStorage({
      key: 'roomCode',
      success: function (res) {
        that.setData({
          roomCode: res.data
        })
      }
    });
    wx.getStorage({
      key: 'roomFloor',
      success: function (res) {
        that.setData({
          roomFloor: res.data
        })
      }
    });
    wx.getStorage({
      key: 'hotelName',
      success: function (res) {
        that.setData({
          hotelName: res.data
        })
      }
    });
  },
  onUnload: function () {
    let that = this;
    let deliverylist_a1 = that.data.deliverylist1;
    let deliverylist_a2 = that.data.deliverylist2;
    for (let i = 0; i < deliverylist_a1.length;i++){
      deliverylist_a1[i].selecttype = false;
    }
    for (let i = 0; i < deliverylist_a2.length; i++) {
      deliverylist_a2[i].selecttype = false;
    }
    wx.setStorage({
      key: 'deliverylist1',
      data: deliverylist_a1
    });
    wx.setStorage({
      key: 'deliverylist2',
      data: deliverylist_a2
    });
  },
  checkboxChange: function(e){//客房配送选择
    let that = this;
    const index = e.currentTarget.dataset.index;
    let checkbox_lista_1 = that.data.deliverylist1;
    let checkbox_lista_2 = that.data.deliverylist2;    

    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    checkbox_lista_1[index].selecttype = !checkbox_lista_1[index].selecttype;
    if (checkbox_lista_1[index].selecttype){
      lumpsum = lumpsum + parseFloat(checkbox_lista_1[index].totalprice);
    }else{
      lumpsum = lumpsum - parseFloat(checkbox_lista_1[index].totalprice);
    }
    
    let allnum = 0;
    let allnum2 = checkbox_lista_1.length + checkbox_lista_2.length;
    for (let i = 0; i < checkbox_lista_1.length; i++){
      if (checkbox_lista_1[i].selecttype == true){
        allnum += 1;
      }
    }
    if (checkbox_lista_2.length > 0){
      for (let i = 0; i < checkbox_lista_2.length; i++) {
        if (checkbox_lista_2[i].selecttype == true) {
          allnum += 1;
        }
      }
    }
    if (allnum == 0){
      that.setData({
        selectalltype: false,
        alllength: ''
      })
    }else if (allnum != allnum2) {
      that.setData({
        selectalltype: false,
        alllength: allnum
      })
    } else {
      that.setData({
        selectalltype: true,
        alllength: allnum
      })
    }

    if (lumpsum < 0) {
      lumpsum = 0.00
    }

    
    
    that.setData({
      deliverylist1: checkbox_lista_1,
      lumpsum: lumpsum.toFixed(2)
    });

  },
  checkboxChange1: function (e) {//快递到家选择
    let that = this;
    const index = e.currentTarget.dataset.index;
    let checkbox_listb_1 = that.data.deliverylist1;
    let checkbox_listb_2 = that.data.deliverylist2;
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    checkbox_listb_2[index].selecttype = !checkbox_listb_2[index].selecttype;
    if (checkbox_listb_2[index].selecttype) {
      lumpsum = lumpsum + parseFloat(checkbox_listb_2[index].totalprice);
    } else {
      lumpsum = lumpsum - parseFloat(checkbox_listb_2[index].totalprice);
    }
    
    let allnum = 0;
    let allnum2 = checkbox_listb_1.length + checkbox_listb_2.length;
    for (let i = 0; i < checkbox_listb_2.length; i++) {
      if (checkbox_listb_2[i].selecttype == true) {
        allnum += 1;
      }
    }
    if (checkbox_listb_1.length > 0) {
      for (let i = 0; i < checkbox_listb_1.length; i++) {
        if (checkbox_listb_1[i].selecttype == true) {
          allnum += 1;
        }
      }
    }
    if (allnum == 0) {
      that.setData({
        selectalltype: false,
        alllength: ''
      })
    } else if (allnum != allnum2) {
      that.setData({
        selectalltype: false,
        alllength: allnum
      })
    } else {
      that.setData({
        selectalltype: true,
        alllength: allnum
      })
    }

    if (lumpsum < 0){
      lumpsum = 0.00
    }

    that.setData({
      deliverylist2: checkbox_listb_2,
      lumpsum: lumpsum.toFixed(2)
    })
  },
  selectall: function(){//全选
    let that = this;
    let selectalltype = !that.data.selectalltype;//选择状态
    let lumpsum = 0;//总价
    let checkbox_listc_1 = that.data.deliverylist1;
    let checkbox_listc_2 = that.data.deliverylist2;
    let alllength = checkbox_listc_1.length + checkbox_listc_2.length;
    if (checkbox_listc_1.length > 0){
      for (let i = 0; i < checkbox_listc_1.length; i++){
        checkbox_listc_1[i].selecttype = selectalltype;
        if (selectalltype){
          lumpsum = lumpsum + parseFloat(checkbox_listc_1[i].totalprice);
        }
      }
      that.setData({
        deliverylist1: checkbox_listc_1
      })
    }
    if (checkbox_listc_2.length > 0) {
      for (let i = 0; i < checkbox_listc_2.length; i++) {
        checkbox_listc_2[i].selecttype = selectalltype;
        if (selectalltype) {
          lumpsum = lumpsum + parseFloat(checkbox_listc_2[i].totalprice);
        }
      }
      that.setData({
        deliverylist2: checkbox_listc_2
      })
    }
    that.setData({
      lumpsum: lumpsum.toFixed(2),
      selectalltype: selectalltype,
      alllength: alllength
    })
  },
  cutback: function(e){//减少
    let that = this;
    let index = e.currentTarget.dataset.index;//下标
    let listtype = e.currentTarget.dataset.listtype;//数组类别
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    let checkbox_listd_1 = that.data.deliverylist1;
    let checkbox_listd_2 = that.data.deliverylist2;
    let deliverytype1;
    let deliverytype2;

    if (listtype == 1){
      if (checkbox_listd_1[index].num == 1) {//客房配送
        wx.showModal({
          title: '提示',
          content: '您确实删除此商品吗？',
          success(res) {
            if (res.confirm) {
              checkbox_listd_1.splice(index,1); 
              if (checkbox_listd_1.length == 0){
                deliverytype1 = false
              }else{
                deliverytype1 = true
              }
              that.setData({
                deliverylist1: checkbox_listd_1,
                deliverytype1: deliverytype1
              });                     
            }
          }
        })
        
      }else{
        checkbox_listd_1[index].num -= 1;
        checkbox_listd_1[index].totalprice = parseFloat(checkbox_listd_1[index].totalprice) - parseFloat(checkbox_listd_1[index].prodRetailPrice);
      }
      if (lumpsum > 0) {
        lumpsum = lumpsum - parseFloat(checkbox_listd_1[index].prodRetailPrice);
      } else {
        lumpsum = 0.00
      }
      that.setData({
        deliverylist1: checkbox_listd_1
      });
      if (checkbox_listd_1[index].selecttype){
        that.setData({
          lumpsum: lumpsum.toFixed(2)
        });
      }
      if (checkbox_listd_1[index].num > 0) {
        checkbox_listd_1[index].selecttype = false;
      }
    }else{
      if (checkbox_listd_2[index].num == 1) {//快递到家
        wx.showModal({
          title: '提示',
          content: '您确实删除此商品吗？',
          success(res) {
            if (res.confirm) {
              checkbox_listd_2.splice(index, 1);
              if (checkbox_listd_2.length == 0) {
                deliverytype2 = false
              } else {
                deliverytype2 = true
              }
              that.setData({
                deliverylist2: checkbox_listd_2,
                deliverytype2: deliverytype2
              });
            }
          }
        })
      } else {
        checkbox_listd_2[index].num -= 1;
        checkbox_listd_2[index].totalprice = parseFloat(checkbox_listd_2[index].totalprice) - parseFloat(checkbox_listd_2[index].prodRetailPrice);
      }
      if (lumpsum > 0) {
        lumpsum = lumpsum - parseFloat(checkbox_listd_2[index].prodRetailPrice);
      } else {
        lumpsum = 0.00
      }
      that.setData({
        deliverylist2: checkbox_listd_2
      })
      if (checkbox_listd_2[index].selecttype) {
        that.setData({
          lumpsum: lumpsum.toFixed(2)
        });
      }
      if (checkbox_listd_2[index].num>0){
        checkbox_listd_2[index].selecttype = false;
      }
    }
  },
  increase: function(e){//增加
    let that = this;
    let index = e.currentTarget.dataset.index;//下标
    let listtype = e.currentTarget.dataset.listtype;//数组类别
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    let checkbox_liste_1 = that.data.deliverylist1;
    let checkbox_liste_2 = that.data.deliverylist2;

    if (listtype == 1){
      if (parseInt(checkbox_liste_1[index].prodAmount) <= checkbox_liste_1[index].num){
        wx.showToast({
          title: '库存不足，请勿继续添加',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      checkbox_liste_1[index].num += 1;
      checkbox_liste_1[index].totalprice = parseFloat(checkbox_liste_1[index].totalprice) + parseFloat(checkbox_liste_1[index].prodRetailPrice);
      lumpsum = lumpsum + parseFloat(checkbox_liste_1[index].prodRetailPrice);
      that.setData({
        deliverylist1: checkbox_liste_1
      });
      if (checkbox_liste_1[index].selecttype){
        that.setData({
          lumpsum: lumpsum.toFixed(2)
        });
      }
    }else{
      checkbox_liste_2[index].num += 1;
      checkbox_liste_2[index].totalprice = parseFloat(checkbox_liste_2[index].totalprice) + parseFloat(checkbox_liste_2[index].prodRetailPrice);
      lumpsum = lumpsum + parseFloat(checkbox_liste_2[index].prodRetailPrice);
      that.setData({
        deliverylist2: checkbox_liste_2
      });
      if (checkbox_liste_2[index].selecttype) {
        that.setData({
          lumpsum: lumpsum.toFixed(2)
        });
      }
    }
  },

  addTokd: function(e){//添加到快递
    let that = this;
    const index = e.currentTarget.dataset.index;//下标
    let checkbox_listf_1 = that.data.deliverylist1;
    let checkbox_listf_2 = that.data.deliverylist2; 
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);

    let addtype2 = checkbox_listf_2.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == checkbox_listf_1[index].hotelProdId;
    });

    if (addtype2 == -1){

      let airval = JSON.stringify(checkbox_listf_1[index]);
      airval = JSON.parse(airval);
      
      airval.num = 1;
      airval.totalprice = airval.prodRetailPrice;
      airval.selecttype = false;
      checkbox_listf_2.push(airval);
      that.setData({
        deliverylist2: checkbox_listf_2,
        deliverytype2: true,
        selectalltype: false
      })
    }else{
      checkbox_listf_2[addtype2].num += 1;
      checkbox_listf_2[addtype2].totalprice = parseFloat(checkbox_listf_2[addtype2].totalprice) + parseFloat(checkbox_listf_2[addtype2].prodRetailPrice);
      lumpsum = lumpsum + parseFloat(checkbox_listf_2[addtype2].prodRetailPrice);
      that.setData({
        deliverylist2: checkbox_listf_2
      });
      if (checkbox_listf_2[addtype2].selecttype) {
        that.setData({
          lumpsum: lumpsum.toFixed(2)
        });
      }
    }
  },


  addTokf: function (e) {//添加到客房
    let that = this;
    let index = e.currentTarget.dataset.index;//下标
    let checkbox_listg_1 = that.data.deliverylist1;
    let checkbox_listg_2 = that.data.deliverylist2;
    let lumpsum = that.data.lumpsum;
    lumpsum = parseFloat(lumpsum);
    let addtype1 = checkbox_listg_1.findIndex(item => {//判断数组中是否存在当前数据,无：-1，有：返回下标
      return item.hotelProdId == checkbox_listg_2[index].hotelProdId;
    });

    if (addtype1 == -1) {
      let airval = JSON.stringify(checkbox_listg_2[index]);
      airval = JSON.parse(airval);
      airval.num = 1;
      airval.totalprice = airval.prodRetailPrice;
      airval.selecttype = false;
      checkbox_listg_1.push(airval);
      that.setData({
        deliverylist1: checkbox_listg_1,
        deliverytype1: true,
        selectalltype: false
      })
    } else {
      checkbox_listg_1[addtype1].num += 1;
      checkbox_listg_1[addtype1].totalprice = parseFloat(checkbox_listg_1[addtype1].totalprice) + parseFloat(checkbox_listg_1[addtype1].prodRetailPrice);
      lumpsum = lumpsum + parseFloat(checkbox_listg_1[addtype1].prodRetailPrice);
      that.setData({
        deliverylist1: checkbox_listg_1
      });
      if (checkbox_listg_1[addtype1].selecttype){
        that.setData({
          lumpsum: lumpsum.toFixed(2)
        });
      }
    }
  },
  addressfun: function(){//地址
    wx.navigateTo({
      url: '../hotelmalladdress/hotelmalladdress'
    })
  },
  settlementfun: function(){//结算  
    const that = this;
    let checkbox_listh_1 = that.data.deliverylist1;
    let checkbox_listh_2 = that.data.deliverylist2;
    const receipttype = that.data.receipttype;
    let selectnum1 = 0;
    let selectnum2 = 0;
    let selectnum = 0;

    let orderlist1 = [];//订单-客房配送
    let orderlist2 = [];//订单-快递到家

    if (checkbox_listh_1.length > 0){
      for (let i = 0; i < checkbox_listh_1.length; i++){
        if (checkbox_listh_1[i].selecttype){
          selectnum1 += 1;
          orderlist1.push(checkbox_listh_1[i]);
          checkbox_listh_1[i].selecttype = false;
        }
      }
    }
    if (checkbox_listh_2.length > 0) {
      for (let i = 0; i < checkbox_listh_2.length; i++) {
        if (checkbox_listh_2[i].selecttype) {
          selectnum2 += 1;
          orderlist2.push(checkbox_listh_2[i]);
          checkbox_listh_2[i].selecttype = false;
        }
      }
    }

    selectnum = selectnum1 + selectnum2;

    if (selectnum2 > 0){
      if (receipttype) {
        wx.showToast({
          title: '请填写快递收件信息',
          icon: 'none',
          duration: 2000
        });
        return;
      }
    }
    if (selectnum == 0) {
      wx.showToast({
        title: '请选中需要结算的商品',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.setStorage({
      key: 'deliverylist1',
      data: checkbox_listh_1,
    });
    wx.setStorage({
      key: 'deliverylist2',
      data: checkbox_listh_2,
    })

    wx.setStorage({
      key: 'orderlist1',
      data: orderlist1,
    });
    wx.setStorage({
      key: 'orderlist2',
      data: orderlist2,
    })

    wx.navigateTo({
      url: '../hotelmallorder/hotelmallorder?lumpsum=' + that.data.lumpsum
    })

  }
})