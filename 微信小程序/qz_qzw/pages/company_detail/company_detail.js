// pages/company_detail/company_detail.js
const app = getApp();
const util = require('../../utils/util.js');
const fadan = require('../../utils/fadan.js');
const apiUrl = app.getApiUrl();
const imgUrl = app.getImgUrl();
const WxParse = require("../../wxParse/wxParse.js");
const collect = require('../../utils/collectTool.js');

function getLocalTime(nS) {
  Date.prototype.toLocaleString = function () {
    return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + "  " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
  };
  var d = new Date(nS * 1000);
  var t = d.toLocaleString();
  return t;
}
var time = 0;
var touchDot = 0;//触摸时的原点
var interval = "";
var flag_hd = true;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userid: "",
    imgUrl: imgUrl,
    star:[1],
    isHide:[true],
    isMore:[true],
    shouqi:false,
    companyArr:null,
    casesArr:[],
    teamArr:[],
    commentArr:[],
    timeArr:[],
    timeNum:[],
    honorArr:[],
    honor:true,
    cases:true,
    team:true,
    comments:true,
    introduce:true,
    companyData:[],
    scrollContainerWidth:"",
    scrollHonorWidth:"",
    find:false,
    toDesigner:false,
  },
  // 获取userid
  getUserid: function () {
    let that = this;
    app.getUserInfo(function (res) {//授权
      wx.setStorage({
        key: 'userId',
        data: res.userId,
      });
      that.setData({
        userid: res.userId
      });
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userid = "";
    let that = this;
    //从缓存里获取userid，获取不到就从服务器获取
    try {
      userid = wx.getStorageSync("userId");
      if (userid) {
        this.setData({
          userid: userid
        });
      } else {
        this.getUserid();
      }
    } catch (e) {
      this.getUserid();
    }
    app.getUserInfo(function (userInfo) {
      that.setData({ userid: userInfo.userId })
    })
    
    fadan.fadan.init(that, 4, {
      cityInput: true,
      addressInput: false,
      phoneInput: true,
      nameInput: true,
      areaInput: false,
      btnText: "马上获取",
    });

    wx.request({
      url: apiUrl + '/company/detail?',
      data: {
        id: options.id,
        bm: options.bm,
        classtype:'9',
        userid: userid,
        p:'1',
        pagecount:'10',
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let arr = [];
        for (let i = 0; i < res.data.comments.length;i++){
          that.data.timeNum[i] = getLocalTime(res.data.comments[i].time);
          arr[i] = {
            "timeNum": that.data.timeNum[i]
          }
          res.data.comments[i].timeNum = arr[i].timeNum;
        }

        let cases = (res.data.cases).slice(0, 6);
        let comments = (res.data.comments).slice(0, 3);
        let good = Math.ceil((res.data.detail.good)/20);
        for(let i = 0;i < good;i++){
          that.data.star[i] = i;
        };

        that.setData({
          companyArr: res.data.detail,
          star: that.data.star,
          casesArr: cases,
          teamArr: res.data.team,
          commentArr: comments,
          honorArr: res.data.honor,
          scrollDesignerWidth: res.data.team.length * 190,
          scrollHonorWidth: res.data.honor.length * 610,
          yuan:-100
        });
        if (res.data.cases.length < 6){
          that.setData({
            scrollContainerWidth: res.data.cases.length * 411 +'rpx',
          })
        } else {
          that.setData({
            scrollContainerWidth: '2484rpx',
          })
        }
        collect.collect.collectDetailInit(that, "companyArr");//收藏引用
        if (res.data.cases.length == 0) {
          that.setData({
            cases: false
          })
        }
        if (res.data.team.length == 0) {
          that.setData({
            team: false
          })
        }
        if (res.data.comments.length == 0) {
          that.setData({
            comments: false
          })
        }
        if (res.data.detail.jianjie.length == 0) {
          that.setData({
            introduce:false
          })
        }
        if (res.data.honor.length==0){
          that.setData({
            honor:false
          })
        }

        var str = res.data.detail.jianjie.join("");
        if(str.length < 85){
          that.setData({
            isMore: false
          })
        };

        var bool = [that.data.cases, that.data.team, that.data.comments, that.data.introduce, that.data.honor];
        var a = 0;
        for (var i = 0; i < bool.length; i++) {
          if(bool[i]||bool[i]&&bool[i+1]){
            a++;
          }
        }
        if(a==0||a==1){
          that.setData({
            find:true
          })
        }
      }
    });

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
    flag_hd = true;    //重新进入页面之后，可以再次执行滑动切换页面代码
    clearInterval(interval); // 清除setInterval
    time = 0;
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
   * 页面相关事件处理函数--监听用户滚动
   */
  onPageScroll: function (e) {
    this.setData({
      find:true
    })
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
  
  },
  look:function (e) {
    this.setData({
      isHide:false,
      isMore:false,
      shouqi:true
    })
  },
  stop: function (e) {
    this.setData({
      isHide: true,
      isMore: true,
      shouqi: false
    })
  },

  toExample:function (e) {
    let id = this.data.companyArr.id;
    let bm =  this.options.bm;
    wx.navigateTo({
      url: '../example/example?id=' + id + '&bm=' + bm +'&p=1&pagecount=15'
    });
  },
  toDesignerDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../designer_detail/designer_detail?id=' + id + '&p=1&pagecount=10'
    });
  },
  toComments: function (e) {
    let id = this.data.companyArr.id;
    wx.navigateTo({
      url: '../comments/comments?id=' + id + '&p=1&pagecount=10'
    });
  },
  toDesigner: function (e) {
    let id = this.data.companyArr.id;
    let bm = this.options.bm;
    wx.navigateTo({
      url: '../designer/designer?id=' + id + '&bm='+bm+'&p=1&pagecount=10'
    });
  },
  toExampleDetail:function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../xgt-detail/index?id=' + id + '&type=2&pv=' + app.getPVNum()
    });
  },

  scroll: util.throttle(function (e) {
    console.log(e);
    let id = this.data.companyArr.id;
    let bm = this.options.bm;
    let that = this;
    let left = e.detail.scrollLeft;
    if (left > 500) {
      wx.navigateTo({
        url: '../designer/designer?id=' + id + '&bm=' + bm + '&p=1&pagecount=10'
      })
    }
  }, 2000),


  // 触摸开始事件
  // touchStart: function (e) {
  //   touchDot = e.touches[0].pageX; // 获取触摸时的原点
  //   // 使用js计时器记录时间    
  //   interval = setInterval(function () {
  //     time++;
  //   }, 100);
  // },
  // 触摸结束事件
  // touchEnd: function (e) {
  //   var touchMove = e.changedTouches[0].pageX;
  //   let id = this.data.companyArr.id;
  //   let bm = this.options.bm;
  //   console.log(touchDot)
  //   console.log(touchMove)
  //   // 向左滑动   
  //   if (touchMove - touchDot <= -40 && time < 10 && flag_hd == true) {
  //     flag_hd = false;
  //     //执行切换页面的方法
  //     console.log("向右滑动");
  //     wx.navigateTo({
  //       url: '../designer/designer?id=' + id + '&bm=' + bm + '&p=1&pagecount=10'
  //     })
  //   }
    // 向右滑动   
  //   if (touchMove - touchDot >= 40 && time < 10 && flag_hd == true) {
  //     flag_hd = false;
  //     //执行切换页面的方法
  //     console.log("向左滑动");

  //   }
  //   clearInterval(interval); // 清除setInterval
  //   time = 0;
  // }
})