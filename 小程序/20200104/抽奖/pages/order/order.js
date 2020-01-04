// pages/order/order.js
const app = getApp();
import wxrequest from '../../request/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cabNum: 10,
    activeIndex: 0,
    moneyData:[],
    totalMoney:'',
    cabNumType:[
      {
        num:10
      },
      {
        num:50
      },
      {
        num:100
      }
    ],
    typeList:[],
    cabType: '',
    orderDetail:{},
    agreecheck: true,
    onOff: true,
    balance:'',
    payType:1,
    ifLess:false
  },  
  //合作协议
  checka: function(e){
    if(e.detail.value == ''){
      this.setData({
        agreecheck: false
      });
    }else{
      this.setData({
        agreecheck: true
      });
    }
  },
  modalConfirm(){
    wx.showLoading({
      title:'加载中',
      mask:true
    })
    let params = this.data.orderDetail
    delete params['balanceAmount']
    params.cabType = this.data.cabType
    params.payType = this.data.payType
    wxrequest.order(params).then(res => {
      if(res.data.code == 0){
        if(res.data.data != '-1'){
          wxrequest.wxPay({id:res.data.data}).then(res => {
            wx.hideLoading()
            if(res.data.code == 0){
              const resData = res.data.data
              this.setData({
                onOff: true
              });
              resData.success = () => {
                wx.switchTab({
                  url: '/pages/smartCab/smartCab'
                })
              }
              resData.fail = () => {
                wx.showToast({
                  title: '支付取消',
                  icon: 'none'
                })
              }
              wx.requestPayment(resData)
            }
          }).catch(err => {
            wx.hideLoading()
            console.log(err)
         })
        }else{
          wx.hideLoading()
          this.setData({
            onOff: true
          });
          wx.showToast({
            title: '余额支付成功！',
            icon: 'success'
          })
          setTimeout(()=>{
            wx.switchTab({
              url: '/pages/smartCab/smartCab'
            })
          },2000)
        }
      }else{
        wx.hideLoading()
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        this.setData({
          onOff: true
        });
      }
    }).catch(err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  modalCancel(){
    this.setData({
      onOff: true
    })
  },
  decreaseNum(){
    this.setData({
      cabNum: (this.data.cabNum - 1)<1?this.data.cabNum:this.data.cabNum - 1
    })
    this.getAmount();
  },
  addNum(){
    this.setData({
      cabNum: parseInt(this.data.cabNum) + 1
    })
    this.getAmount();
  },
  inputNum(e){
    var reg = /^[+]{0,1}(\d+)$/;
    this.setData({
      cabNum: reg.test(e.detail.value) ? e.detail.value : 1
    })
    this.getAmount();
  },
  getAmount(){
      wx.showLoading({
         title:'加载中',
         mask:true
      })
      wxrequest.getcoupons({isUsed:0}).then(res => {
        if(res.data.code == 0){
            let couponIds = res.data.data.slice(0,this.data.cabNum).map(item => {
               return item.id
            })
            const data = {
               cabCount: this.data.cabNum,
               couponIds: couponIds,
               cabType: this.data.cabType,
            }
            wxrequest.amount(data).then(response => {
              wx.hideLoading()
              if(response.data.code == 0){
                this.setData({
                  orderDetail: response.data.data
                })
                this.showMoney()              
              }
            }).catch(err => {
              wx.hideLoading()
              console.log(err)
            })
         }
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
  },
  radioChange(e){
    this.setData({
      cabType: e.detail.value
    })
    this.getAmount();
  },
  payTypeChange(e){
    this.setData({
      payType: e.detail.value
    })
  },
  changeStyle(event){
    this.setData({
      activeIndex: event.currentTarget.dataset.gid,
      cabNum: event.currentTarget.dataset.gid2
    })
    this.getAmount()
  },
  payMoney(){
    if (!this.data.agreecheck){
      wx.showToast({
        title: '请勾选合作协议',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      onOff: false
    })
    wxrequest.getmyCase().then(res => {
      if(res.data.code == 0){
        this.setData({
          balance: res.data.data.balance
        })
        if(this.data.balance<this.data.totalMoney){
          this.setData({
            ifLess:true
          })
        }else{
          this.setData({
            ifLess:false
          })
        }
      }
    }).catch(err => {
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // orderDetail
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      orderDetail: app.globalData.payOrder
    })
    wxrequest.getcabtype().then(res => {
      if(res.data.code == 0){
        this.setData({
          typeList: res.data.data,
          cabType: res.data.data[0].id
        })
        this.getAmount()
      }
    }).catch(err => {
      console.log(err)
    })
  },

  showMoney(){
    let moneyData = [];
    moneyData.push({
      moneyname: '智盒价格', 
      moneyNum: `${this.data.orderDetail.totalServiceFee.toFixed(2)}`
    })
    if(this.data.orderDetail.couponIds.length){
      moneyData.push({
        moneyname: '优惠券金额', 
        explain: '（ 您可以使用'+ this.data.orderDetail.couponIds.length +'张抵用券 ）',
        moneyNum: `- ${this.data.orderDetail.couponAmount.toFixed(2)}`
      })
    }
    if(this.data.orderDetail.discountAmount){
      moneyData.push({
        moneyname: '减免金额', 
        explain: '（ 每台优惠'+ 100 +'元 ）',
        moneyNum: `- ${this.data.orderDetail.discountAmount.toFixed(2)}`
      })
    }
    this.setData({
      moneyData:moneyData,
      totalMoney: this.data.orderDetail.totalServiceFee.toFixed(2)
    })
  }
})