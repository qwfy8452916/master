const app = getApp();
import wxrequest from '../../../request/api'
Component({
  properties: {
    actImageUrl: {
      type: String,
      value: ''
    },
    actId: {
      type: Number,
      value: ''
    },
    actType: {
      type: Number,
      value: ''
    },
    actAdImageUrl: {
      type: String,
      value: ''
    }
  },
  data: {
    showtype: true,
    newcomertype: 0,//还原0
    listdata: '',
    coupon_explain: '',   //优惠券说明
  },
  methods: {
    closefun: function () {//关闭活动
      const that = this;
      let lastActIdlist = app.globalData.lastActIds;
      lastActIdlist.push(that.properties.actId);
      let lastActIdlistval = lastActIdlist.toString();
      const linkData = {
        hotelId: app.globalData.hotelId,
        cabId: app.globalData.cabId,
        type: 2,
        lastActId: lastActIdlistval
      };
      wxrequest.getActlist(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data;
        if(resdata.code == 0){
          app.globalData.actlistdata = resdatas;
          if(resdatas.length > 0 && that.properties.actType != 1) {
            that.setData({
              actImageUrl: resdatas[0].curActHotelDTO.actImageUrl,
              actId: resdatas[0].curActHotelDTO.actId,
              actAdImageUrl: resdatas[0].curActHotelDTO.actAdImageUrl,
              newcomertype: 0
            });
          } else {
            this.setData({
              showtype: false
            });
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
        wx.hideLoading();
        console.log(err);
      });
    },
    openfun: function () {//参与
      const that = this;
      wx.showLoading({
        title: '加载中',
      });
      if(that.properties.actType == 1) {
        that.get_meetingcoupon();
      } else {
        that.participatefun();
      }
    },
    participatefun(){
      const that = this;
      let linkData = {
        actId: that.properties.actId,
        hotelId: app.globalData.hotelId,
        cabCode: app.globalData.cabCode
      };
      wxrequest.postpartin(linkData).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data
        if(resdata.code == 0){
          let couponlist = resdatas.map(item => {
            if(item.couponType == 1) {
              item.couponCouponDTO.couponDiscount = parseFloat(item.couponCouponDTO.couponDiscount/10).toFixed(1);
            }
            item.exstate = false;
            if(item.vouVoucherDTO && item.vouVoucherDTO.vouInstruction) {
              item.vouInstructions = item.vouVoucherDTO.vouInstruction.split(/[\n,]/g);
              item.vouInstructions.map((item2,index)=>{
                if(item2 == ''){
                  item.vouInstructions.splice(index, 1);
                }
              })
            }
            return item;
          });
          console.log(couponlist)
          that.setData({
            newcomertype: 1,
            listdata: couponlist
          });
          wx.hideLoading();
        } else {
          wx.hideLoading();
          that.setData({
            showtype: false
          });
          console.log(resdata.msg);
          wx.showToast({
            title: resdata.msg,
            icon: 'none',
            duration: 2000
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err);
      });
    },
    get_meetingcoupon: function () {
      const that = this;
      wxrequest.putmeetingcoupon2(that.properties.actId).then(res => {
        let resdata = res.data;
        let resdatas = res.data.data.map(item => {
          if(item.couponType == 1) {
            item.couponCouponDTO.couponDiscount = parseFloat(item.couponCouponDTO.couponDiscount/10).toFixed(1);
          }
          item.exstate = false;
          return item;
        });
        if(resdata.code == 0){
          that.setData({
            newcomertype: 1,
            listdata: resdatas
          });
          wx.hideLoading();
          var myEventDetail = {// detail对象，提供给事件监听函数
            statustype: 1
          } 
          // var myEventOption = {} // 触发事件的选项
          that.triggerEvent('redirectfun', myEventDetail)
        } else {
          wx.hideLoading();
          that.setData({
            showtype: false
          });
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        }
      })
      .catch(err => {
        wx.hideLoading();
        console.log(err);
      });
    },
    //查看使用说明
    lookexplain(e){
      const that = this;
      let params = {
        hotelId: app.globalData.hotelId,
      };
      let id = e.currentTarget.dataset.id;
      let idx = e.currentTarget.dataset.idx;
      wxrequest.getcouponexplain(params, id).then(res => {
        let resdata = res.data;
        if (resdata.code == 0) {
          that.setData({
            coupon_explain: resdata.data
          });
          let coupon_l = that.data.listdata.map(item => {
            item.exstate = false;
            return item;
          });
          coupon_l[idx].exstate = true;
          console.log(idx, coupon_l)
          that.setData({
            listdata: coupon_l
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
  }
})