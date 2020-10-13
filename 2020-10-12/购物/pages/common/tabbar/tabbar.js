// pages/common/tabbar/tabbar.js
const app = getApp();
import wxrequest from '../../../request/api'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    funcId: {
      type: String,//类型
      value: ''//默认值
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    hotelFuncDTOS:[],
    hotelFuncDTOS1:[],
    isSupportEn:0,
    themecolor:'',
    ifExpand: '',
    expandClose: '',
    expandHeight:'',
    ifshowtabBack: false
  },
  attached(){
    let hotelFuncDTOS1 = wx.getStorageSync('hotelFuncDTOS1')
    let hotelFuncDTOS2 = wx.getStorageSync('hotelFuncDTOS2')
    this.setData({
      hotelFuncDTOS: hotelFuncDTOS1.concat(hotelFuncDTOS2),
      isSupportEn: wx.getStorageSync('isSupportEn'),
      themecolor: wx.getStorageSync('themecolor'),
    })
    // for(var i=0;i<5;i++){
    //   this.data.hotelFuncDTOS.push(hotelFuncDTOS1[0])
    // }
    // this.setData({
    //   hotelFuncDTOS: this.data.hotelFuncDTOS,
    // })
    console.log(this.data.hotelFuncDTOS)
    if(this.data.hotelFuncDTOS.length>4){
      let hotelFuncDTOSBox = this.data.hotelFuncDTOS.slice(0,3)
      hotelFuncDTOSBox.splice(2,0,{expandflag: 1})
      this.setData({
        hotelFuncDTOS: hotelFuncDTOSBox,
        hotelFuncDTOS1: this.data.hotelFuncDTOS.slice(3),
      })
    }
    this.animation = wx.createAnimation({
        duration: 400,
        timingFunction:"ease"
    })

    var obj=wx.createSelectorQuery().in(this);
    obj.select('.expandPage').boundingClientRect(rect =>{
      this.setData({
        expandHeight: rect.height
      })
    }).exec();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    expandMenu(e){
      if(this.data.ifExpand){
        this.animation.top(0).step()
      }else{
        this.animation.top(50 - this.data.expandHeight).step()
      }
      this.setData({
        ifExpand: !this.data.ifExpand,
        ifshowtabBack: this.data.ifExpand?false:true,
        expandClose: this.animation.export(),
      })
      console.log(this.data.expandClose)
    },
    jumpToMy(){
      wx.redirectTo({
        url: '/pages/my/my'
      })
    },
    hotelmall(e){
      let funcId = e.currentTarget.dataset.id;
      let funcType = e.currentTarget.dataset.functype;
      wx.setStorageSync('funcAreaId', funcId);
      wx.setStorageSync('funcType', funcType);
      if(funcType == 1){
        wx.redirectTo({
          url: '/pages/index/index?funcId='+funcId
        })
      }else if(funcType == 2){
        wx.redirectTo({
          url: '/pages/reservation/reservation?funcId='+funcId
        })
      }else if(funcType == 3){
        wx.redirectTo({
          url: '/pages/roomservice/roomservice?funcId='+funcId
        })
      }else{
        wx.redirectTo({
          url: '/pages/specialty/specialty?id=' + funcId
        })
      }
    }
  }
})
