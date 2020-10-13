const app = getApp();
import wxrequest from '../../utils/api'
app.Base({
  data: {
    pageNum: 1,
    pageSize: 10,
    writeofflist: [],
    classindex: 1,
    seachtype: false,
    isCanSeach: true,
    formdata: {
      userId: '',
      vouId: '',
      vouName: '',
      deliveryCode: '',
      pointId: '',
      pointName: '',
      EndTime: '',
      StartTime: '',
    },
    pointlist: [],
    prodpointlist: [],
    pointlistindex: 0,
    voulist: [],
    vouNamelist: [],
    vouNameindex: 0,
    floorstatus: false,
    floorstatus2: true
  },
  onLoad: function (options) {
    this.get_vous();
    this.get_point();
    this.getdatafun();
  },
  getdatafun(){
    const that = this;
    if(that.data.isCanSeach) {
      that.setData({
        seachtype: false,
        isCanSeach: false
      });
      that.goTop();
      if (that.data.classindex == 1){
        setTimeout(()=>{
          that.get_UseCardticketRecord();
        },300)
      } else if (that.data.classindex == 2) {
        setTimeout(()=>{
          that.get_ypoint();
        },300)
      }
    }
  },
  get_UseCardticketRecord () {
    const that = this;
    const fromdata = that.data.formdata;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      hotelId: app.globalData.hotelId,
      cusId: fromdata.userId,
      vouId: fromdata.vouId,
      vouUsedStartTime: fromdata.StartTime,
      vouUsedEndTime: fromdata.EndTime,
      useScene: 2
    };
    wxrequest.getUseCardticketRecord(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          isCanSeach: true,
          voulist: resdatas
        });
        wx.hideLoading();
      } else {
        that.setData({
          isCanSeach: true
        });
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
  get_vous(){
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.getvous(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let itemdata = {
          id: '',
          vouName: '请选择'
        }
        resdatas.unshift(itemdata);
        that.setData({
          vouNamelist: resdatas
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
  get_ypoint(){
    const that = this;
    const fromdata = that.data.formdata;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      hotelId: app.globalData.hotelId,
      customerId: fromdata.userId,
      deliveryCode: fromdata.deliveryCode,
      pointId: fromdata.pointId,
      verifyEndTime: fromdata.EndTime,
      verifyStartTime: fromdata.StartTime
    };
    wxrequest.getypoint(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        that.setData({
          prodpointlist: resdatas,
          isCanSeach: true
        });
        wx.hideLoading();
      } else {
        that.setData({
          isCanSeach: true
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
      console.log(err)
    });
  },
  get_point(){
    const that = this;
    wx.showLoading({
      title: '加载中',
    });
    let linkData = {
      hotelId: app.globalData.hotelId
    };
    wxrequest.getpoint(linkData).then(res => {
      let resdata = res.data;
      let resdatas = res.data.data;
      if (resdata.code == 0) {
        let itemdata = {
          id: '',
          pointName: '全部'
        }
        resdatas.unshift(itemdata);
        that.setData({
          pointlist: resdatas
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
  toggleseach(){
    this.setData({
      seachtype: !this.data.seachtype
    })
  },
  useridfun(e){
    const that = this;
    let formdataval = that.data.formdata;
    formdataval.userId = e.detail.value
    that.setData({
      formdata: formdataval
    })
  },
  deliveryCodefun(e){
    const that = this;
    let formdataval = that.data.formdata;
    formdataval.deliveryCode = e.detail.value
    that.setData({
      formdataval: formdataval
    })
  },
  vouNamefun(e){
    const that = this;
    const vouNamelistdata = that.data.vouNamelist;
    let formdataval = that.data.formdata;
    formdataval.vouId = vouNamelistdata[e.detail.value].id;
    formdataval.vouName = vouNamelistdata[e.detail.value].vouName;
    that.setData({
      vouNameindex: e.detail.value,
      formdataval: formdataval
    })
  },
  pointfun(e){
    const that = this;
    const pointlistdata = that.data.pointlist;
    let formdataval = that.data.formdata;
    formdataval.pointId = pointlistdata[e.detail.value].id;
    formdataval.pointName = pointlistdata[e.detail.value].pointName;
    that.setData({
      pointlistindex: e.detail.value,
      formdataval: formdataval
    })
  },
  satartTfun(e){
    const that = this;
    let formdataval = that.data.formdata;
    formdataval.StartTime = e.detail.value;
    that.setData({
      formdata: formdataval
    })
  },
  endTfun(e){
    const that = this;
    let formdataval = that.data.formdata;
    formdataval.EndTime = e.detail.value;
    that.setData({
      formdata: formdataval
    })
  },
  changeclasstypefun(e){
    const that = this;
    const index = e.currentTarget.dataset.index;
    let formdataval = {
      userId: '',
      vouId: '',
      vouName: '',
      deliveryCode: '',
      pointId: '',
      pointName: '',
      EndTime: '',
      StartTime: '',
    }
    if(index != that.data.classindex) {
      that.setData({
        pointlistindex: 0,
        formdata: formdataval,
        classindex: index,
        seachtype: false,
        isCanSeach: true
      });
      setTimeout(()=>{
        that.getdatafun();
      },300)
    }
  },
  submitfun(e){
    const that = this;
    const typeval = e.currentTarget.dataset.type;
    let formdataval = {
      userId: '',
      vouId: '',
      vouName: '',
      deliveryCode: '',
      pointId: '',
      pointName: '',
      EndTime: '',
      StartTime: '',
    }
    if(typeval == 2){
      that.setData({
        pointlistindex: 0,
        formdata: formdataval
      });
    }
    setTimeout(()=>{
      that.getdatafun();
    },300)
  },
  changeparameterfun(e){
    const that = this;
    const index = e.currentTarget.dataset.parameter;
    const formdataval = that.data.formdata;
    if(index == 1) {
      formdataval.userId = '';
    } else if(index == 2) {
      formdataval.vouId = '';
      formdataval.vouName = '';
    } else if(index == 3) {
      formdataval.deliveryCode = '';
    } else if(index == 4) {
      formdataval.pointId = '';
      formdataval.pointName = '';
    } else if(index == 5) {
      formdataval.EndTime = '';
      formdataval.StartTime = '';
    }
    that.setData({
      formdata: formdataval
    });
    setTimeout(()=>{
      that.getdatafun();
    },300)
  },
  goTop(e){
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      that.setData({
        floorstatus2: false
      })
    }
  },
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
})