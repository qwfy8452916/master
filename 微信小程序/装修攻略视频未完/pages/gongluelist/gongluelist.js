// pages/gongluelist/gongluelist.js
const app = getApp()
let apiUrl = app.getApiUrl();
const imgUrl = app.getImgUrl();
const fadan = require('../../utils/fadan.js');
const collect = require('../../utils/collectTool.js');

function alertViewWithCancel(title = "提示", content = "消息提示", confirm) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    success: function (res) {
      if (res.confirm) {
        confirm();
      }
    }
  });
}

let levelOneNav = [{ pid: 0, text: "推荐"  }, { pid: 1, text: "设计" }, { pid: 2, text: "局部装修" }, { pid: 3, text: "装修扫盲" }, { pid: 4, text: "选材导购" }];
let levelTwoNav = {
  0: [],
  1: [{ cid: 1, text: "空间利用" },{ cid: 2, text: "动线设计" },{ cid: 3, text: "案例分析" }],
  2: [{ cid: 4, text: "客厅" },{ cid: 5, text: "卫生间" },{ cid: 6, text: "厨房" },{ cid: 7, text: "阳台" },{ cid: 8, text: "卧室" }, { cid: 9, text: "其他" }], 
  3: [{ cid: 10, text: "合同签订" }, { cid: 11, text: "装修增减项" }, { cid: 12, text: "装修猫腻" },{ cid: 13, text: "常见问题" }],
  4: [{ cid: 14, text: "装修选材" }, { cid: 15, text: "软装搭配" }],
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qiehuanpd:true,
    arr: [false, false, false, false, false,false],
    shuzu: [true, false, false, false, false, false, false],
    intshuzu: [false, false, false, false, false, false, false],
    shoucpd:true,
    levelOneNav:null,
    levelTwoNav:null,
    listshujv:[],
    currentPage:1,
    imgUrl: imgUrl,
    pid:"",
    cid:"",
    numpid:[],
    hasData: 1, //是否还有数据标识
    fd: "",
    dataList:[],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    fadan.fadan.init(this, 1);//发单引用
    collect.collect.collectInit(this,"listshujv");//收藏引用
    that.setData({
      levelOneNav: levelOneNav,
      levelTwoNav: levelTwoNav[0],
    });
    for (let i = 0; i < that.data.levelOneNav.length; i++){
      if (options.id == that.data.levelOneNav[i].pid){
        let arr = "arr["+i+"]";
        that.setData({
          [arr]:true,
          levelTwoNav: levelTwoNav[options.id],
          pid: options.id,
          cid: levelTwoNav[options.id][0].cid
        });
        that.addshujv();
      }

    }


    







  },



  qiehuan:function(e){
     let that=this;
     console.log(e)
     let index=e.currentTarget.dataset.index;
     let acceptpid = e.currentTarget.dataset.pid;
     for (let i = 0; i < that.data.arr.length;i++){
       let current ="arr["+i+"]";
        if(i==index){
          that.setData({
            [current]:true,
            levelTwoNav: levelTwoNav[index],
            pid:acceptpid,
            shuzu: that.data.intshuzu,
          })
           
        }else{
          that.setData({
            [current]: false
          })
        }
     }
     if (index == 0) {
       that.setData({
         currentPage: 1,
         pid:"",
         cid:"",
         listshujv: [],
       })
       that.addshujv();
     }
  
  },

  dianjiqh:function(x){
    let that=this;
    let indexnow = x.currentTarget.dataset.index;
    let acceptcid = x.currentTarget.dataset.cid;
    that.setData({
      listshujv:[],
    })

    for (let i = 0; i < that.data.shuzu.length; i++) {
      let nowdqsj = "shuzu[" + i + "]";
      if (i == indexnow) {
        that.setData({
          [nowdqsj]: true,
          cid: acceptcid,
          currentPage:1,
        })
        that.addshujv();
      } else {
        that.setData({
          [nowdqsj]: false
        })
      }

      
    }
  },

  shoucang:function(){
     var that=this;
     that.setData({
       shoucpd: !that.data.shoucpd,
     })

  },

  selectHandle() {
    this.setData({ isHideCity: false });
  },

  searchxq:function(){
    wx.navigateTo({
       url:"../search/index"
    })
  },

  addshujv:function(){
    let that=this;
    let tempDataSet = [];
    
    wx.showLoading({
      title: "加载中",
      duration: 500,
    })
    wx.request({
      url: apiUrl + '/appletgonglue/getVideoList',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "GET",
      dataType: 'json',
      data: {
        page: that.data.currentPage,
        pid:that.data.pid,
        cid:that.data.cid,
      },
      success: function (res) {
        if (res.data.data.length < 6 && res.data.data.length > 0) {
          that.setData({
            hasData: 0
          });
        } else {
          that.setData({
            hasData: 1
          });
        }

        console.log(res)

        tempDataSet = that.data.listshujv.concat(res.data.data);
        that.setData({
          listshujv: tempDataSet
        })


      },
      fail: function () {
        console.log("error!!!!");
      }
    })

  },

  shipindetail:function(y){
    
    let passid = y.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../play_detail/play_detail?id=" + passid
    })
  },

  // 加载更多数据
  loadMoreData: function () {
    console.log("底")
    let page = this.data.currentPage;
    // 有数据就请求下一页，无数据就不再请求
    if (this.data.hasData) {
      this.setData({
        currentPage: ++page
      });
      this.addshujv();
    }
  },


  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})