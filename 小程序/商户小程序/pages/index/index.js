const app=getApp();
import * as echarts from '../../ec-canvas/echarts';
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '销售数据'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['商品订单数1', '商品订单数2'],
      orient: 'vertical',
      x: 'right',
      y: 'top'
    },

    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '商品订单数1',
        type: 'line',
        stack: '总量',
        itemStyle: {
          normal: {
            color: '#e7c4df',
          }
        },
        areaStyle: {
          color: '#e7c4df',
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '商品订单数2',
        type: 'line',
        stack: '总量',
        itemStyle: {
          normal: {
            color: '#d7e5f7',
          }
        },
        areaStyle: {
          color: '#d7e5f7',
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
    ]
  };

  chart.setOption(option);
  return chart;
}
app.Base({
  data: {
    tabAuthority:{}, //菜单权限
    pageAuthority: {}, //功能权限
    switchonoff:'',
    ec: {
      onInit: initChart
    },
    switchJudge:true,
    Tabindex: '',
  },
  onLoad: function (options) {
    let that=this;
    this.setData({
      tabAuthority: wx.getStorageSync("tabAuthority"),
      pageAuthority: wx.getStorageSync("pageAuthority"),
    })

  

    console.log(this.data.tabAuthority)
    console.log(this.data.pageAuthority)



    let popup = this.selectComponent("#tabbar");
    if (options.tabindex) {
      that.setData({
        Tabindex: options.tabindex
      })
    } else {
      that.setData({
        Tabindex: 0
      })
    }
    popup.dabdata()
    popup.tabzhixing(that.data.Tabindex)
    
  },


  //我的应用
  switchdj:function(){
    this.setData({
      switchJudge: !this.data.switchJudge
    })
  },


  miniba:function(){
    wx.navigateTo({
      url: '/pages/miniNav/miniNav',
    })
  },

  person:function(){
    wx.navigateTo({
      url: '../personalcenter/personalcenter',
    })
  },

  //基础设置
  basicSet: function () {
    wx.navigateTo({
      url: '../basicSet/basicSet',
    })
  },
  
  //当面服务
  faceServer:function(){
    wx.navigateTo({
      url: '../faceServer/faceServer',
    })
  },

  //订单处理
  orderDeal:function(){
    wx.navigateTo({
      url: '../order/order',
    })
  },


  //卡券
  cardCoupon: function () {
    wx.navigateTo({
      url: '../card/card',
    })
  },

  //财务
  finance: function () {
    wx.navigateTo({
      url: '../finance/finance',
    })
  },


  //优惠券管理
  couponManage: function () {
    wx.navigateTo({
      url: '../couponManage/couponManage',
    })
  },

  //分销
  shareTotal:function(){
    wx.navigateTo({
      url: '../shareTotal/shareTotal',
    })
  },

  //自营配送单
  ownDeliveryList: function () {
    wx.navigateTo({
      url: '../ownDeliveryList/ownDeliveryList',
    })
  },

  //自营售后
  ownAfterSale: function () {
    wx.navigateTo({
      url: '../ownAfterSale/ownAfterSale',
    })
  },


})