const app = getApp();
import wxrequest from '../../request/api'
Page({
  data: {
     size: 600,//转盘大小,
     musicflg: true, //声音
     fastJuedin: true,//快速决定
     repeat: false,//不重复抽取
     probability: true,// 概率
     s_awards: '',//结果
     option: '标题',
     cabTotal:0,
     title:'住橙智盒投资',
     //转盘的总数据，想添加多个可以往这数组里添加一条格式一样的数据
    //  zhuanpanArr: [
    //     {
    //        id: 0,
    //        option: '我帅吗？',//转盘的标题名称
    //        awards: [
    //           {
    //              id: 0,                // id递增
    //              name: "帅",           // 选项名 超过9个字时字体会变小点 大于13个数时会隐藏掉超出的
    //              color: '#FFA827',    // 选项的背景颜色
    //              probability: 0       // 概率 0代表永远也转不到这个选项，数字越大概率也就越大,data中的probability属性设置为true时是才生效, 这属性也必须填写，不填写会出错
    //           },
    //           {
    //              id: 1,
    //              name: "很帅",
    //              color: '#AA47BC',
    //              probability: 10
    //           },
    //           {
    //              id: 2,
    //              name: "贼帅",
    //              color: '#42A5F6',
    //              probability: 10
    //           },
    //           {
    //              id: 3,
    //              name: "非常帅",
    //              color: '#66BB6A',
    //              probability: 10
    //           },
    //           {
    //              id: 4,
    //              name: "超级帅",
    //              color: '#FFA500',
    //              probability: 100
    //           },
    //           {
    //              id: 4,
    //              name: "宇宙无敌第一帅",
    //              color: '#FF4500',
    //              probability: 300
    //           }
    //        ]
    //     }
    //  ],
     //更改数据可以更改这属性，格式要像下面这样写才行
      awardsConfig: {},
      showtype: false,
      isShare:false,
      isSalesman:false,
      ifFirst:true,
      nextLaunchTime:'',
      ifshowShare: app.globalData.loginInfo.upperShareCode,
      roundel:'',
      blocks: 'none',
      onloadif: false,
      couponID:'',
      fsAmount:'',
      ifcanshow:false
   },
  //跳转订单
  gotoOrder(){
     if(this.data.cabTotal){
        this.roundel._zhuan()
     }else{
        wx.navigateTo({
           url: '/pages/order/order'
        })
     }
   },
   
   closeDialog(){
      this.setData({
        blocks: 'none'
      })
    },
   imageLoad(){
      this.setData({
        onloadif: true
      })
    },
    getcoupon(){
      const params = {
        couponId: this.data.couponID,
        count: 100,
        shareCode: wx.getStorageSync('shareCode')
      }
      wx.showLoading({
        title:'加载中',
        mask:true
      })
      wxrequest.getcoupon(params).then(res => {
        wx.hideLoading()
        if(res.data.code == 0){
          this.setData({
            blocks:'none'
          })
          wx.showToast({
            title: '领取成功',
            icon: 'success'
          })
          this.relogin()
        }else if(res.data.code == 1){
          this.setData({
            blocks:'none'
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }).catch(err => {
        wx.hideLoading()
        console.log(err)
      })
    },
  //跳转订单
  gotoOrder2(){
      wx.navigateTo({
         url: '/pages/order/order'
      })
   },
  //接收当前转盘初始化时传来的参数
  getData(e) {
     this.setData({
        option: e.detail.option
     })
  },

  //接收当前转盘结束后的答案选项
  getAwards(e) {
     this.setData({
        s_awards: e.detail,
     })
     this.getCabnum()
  },

  //开始转动或者结束转动
  startZhuan(e) {
     this.setData({
        zhuanflg: e.detail ? true : false
     })
  },

  //切换转盘选项
//   switchZhuanpan(e) {
//      //当转盘停止时才执行切换转盘
//      if (!this.data.zhuanflg) {
//         var idx = e.currentTarget.dataset.idx, zhuanpanArr = this.data.zhuanpanArr, obj = {};
//         for (let i in zhuanpanArr) {
//            if (this.data.option != zhuanpanArr[i].option && zhuanpanArr[i].id == idx) {
//               obj.option = zhuanpanArr[i].option;
//               obj.awards = zhuanpanArr[i].awards;
//               this.setData({
//                  awardsConfig: obj //其实默认要更改当前转盘的数据要传个这个对象，才有效果
//               })
//               break;
//            }
//         }
//      }
//   },

  //转盘声音
  switch1Change1(e) {
     var value = e.detail.value;
     if (this.data.zhuanflg) {
        wx.showToast({
           title: '当转盘停止转动后才有效',
           icon: 'none'
        })
        return;
     } else {
        this.setData({
           musicflg: value
        })
     }
  },

  //不重复抽取
  switch1Change2(e) {
     var value = e.detail.value;
     if (this.data.zhuanflg) {
        wx.showToast({
           title: '当转盘停止转动后才有效',
           icon: 'none'
        })
        return;
     } else {
        this.setData({
           repeat: value
        })
     }
  },

  //快速决定
  switch1Change3(e) {
     var value = e.detail.value;
     if (this.data.zhuanflg) {
        wx.showToast({
           title: '当转盘停止转动后才有效',
           icon: 'none'
        })
        return;
     } else {
        this.setData({
           fastJuedin: value
        })
     }
  },

  //概率 == 如果不重复抽取开启的话 概率是无效的
  switch1Change4(e) {
     var value = e.detail.value;
     if (this.data.zhuanflg) {
        wx.showToast({
           title: '当转盘停止转动后才有效',
           icon: 'none'
        })
        return;
     } else {
        this.setData({
           probability: value
        })
     }
  },
  share(){
      wx.navigateTo({
         url: '/pages/ChannelReg/ChannelReg'
      })
   },
   goTorule(){
      wx.navigateTo({
         url:'/pages/shareRule/shareRule'
      })
   },
   getifCoupon(e){
      if(this.data.ifcanshow){
         this.setData({
            blocks: 'block',
         })
      }
   },
   hasCoupons(option){
      if(wx.getStorageSync('userAuth')){
        wxrequest.getablecoupon().then(res => {
          if(res.data.code == 0){
             console.log(res.data.data)
             console.log(res.data.data)
            if(res.data.data.length != 0){
              this.setData({
                ifcanshow: true,
                couponID: res.data.data[0].id,
                fsAmount: res.data.data[0].fsAmount
              })
              if(option){
                 this.setData({
                     blocks: 'block',
                 })
              }
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }else{
        this.setData({
          blocks: 'block'
        })
      }
    },
   onLoad: function (options) {
      //实例化组件对象，这样有需要时就能调用组件内的方法
      this.roundel = this.selectComponent("#roundel");
      console.log(options)
      if(options.shareCode){
         var shareCode = options.shareCode
      }else if(options.q){
         var qrUrl = decodeURIComponent(options.q);
         var q = this.getQueryString(qrUrl, 'c');
         var shareCode = q
      }
      if(shareCode){
         if (app.globalData.islogin){
            console.log('先登录了')
            this.getShareCode(shareCode)
         }else{
            app.shareReturnBack = res => {
               console.log('后登录了')
               this.getShareCode(shareCode)
            }
         }
      } 
   },
   getShareCode(shareCode){
      const params = {shareCode}
      wxrequest.wxgetshareCode(params).then(res => {
         if(res.data.code == 0){
            console.log(res.data)
            let resData = res.data.data;
            if(resData.businessCode){
               wx.setStorageSync('businessCode',resData.businessCode)
               this.setData({
                  showtype: true
               })
               if(resData.shareCode){
                  this.hasCoupons()
                  wx.setStorageSync('shareCode',resData.shareCode)
               }
            }else if(resData.shareCode){
               this.hasCoupons(true)
               wx.setStorageSync('shareCode',resData.shareCode)
            }
         }
      }).catch(err => {
         console.log(err)
      })
   },
   onShareAppMessage: function () {
      wx.showLoading({
         title:'加载中',
         mask:true
      })
      let shareCode = app.globalData.loginInfo.shareCode
      return {
        title:'您有10000元现金券待领取',
        imageUrl: 'cloud://fortunestar-pics-p6drx.666f-fortunestar-pics-p6drx-1300540775/券好友分享.jpg',
        path:'/pages/smartCab/smartCab?shareCode=' + shareCode
      }
   },
   onShow(){
      if(wx.getStorageSync('isMember')){
         this.setData({
            isShare:true,
         })
      }
      if(this.data.ifcanshow){
         this.setData({
            blocks: 'block',
        })
      }
      if (app.globalData.islogin){
         if(app.globalData.loginInfo.isSalesman){
            this.setData({
              isSalesman:true
            })
          }
          if(app.globalData.loginInfo.upperShareCode){
            this.setData({
              ifshowShare:true
            })
          }
          this.showFunc()
       }else{
         app.isSalesmanCallback = res => {
            this.setData({
               isSalesman:true
            })
         };
         app.upperShareCodeCallback = res => {
            this.setData({
               ifshowShare:true
            })
         };
         app.loginReturnBack = res => {
            this.showFunc()
         }
      }
   },
   showFunc(){
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      wx.showLoading({
         title:'加载中',
         mask:true
      })
      wxrequest.getInitHotel({count: 7}).then(res => {
         wx.hideLoading()
         if(res.data.code == 0){
            let awardsss = [];
            res.data.data.forEach((item,index) => {
               awardsss.push({
                  id: index,
                  name: item.hotelName,
                  imageUrl: item.hotelImageUrl,
                  // imageUrl: '../images/touzi/test.png',
                  color: '#ffffff',
                  probability: 0
               })
            })
            awardsss.push({
               imageUrl:"../images/touzi/more.png",
               color: '#ffffff',
               probability: 0,
               isQuestion:true
            })     
            this.setData({
               awardsConfig: {
                  option: '转盘抽奖',
                  awards: awardsss
               }
            })
         }
      }).catch(err => {
         wx.hideLoading()
         console.log(err)
      })
      this.getFirstStatus()
      this.getCabnum()
   },
   relogin(){
      wx.showLoading({
        title:'加载中',
        mask:true
      })
      wx.login({
        success: res => {
          wx.request({
            url: app.globalData.apiUrl + '/fs/investor/loginByWX', //仅为示例，并非真实的接口地址
            method: 'POST',
            data: {code: res.code},
            header: {'content-type': 'application/json'},
            success (res) {
              wx.hideLoading()
              if(res.data.code == 0){
                let resData = res.data.data.fsInvestorDTO
                wx.setStorageSync('userAuth', {
                  openid: resData.openId,
                  id: resData.id
                })
                wx.setStorageSync('token',resData.token)
                wx.setStorageSync('isMember',resData.isMember)
                app.globalData.loginInfo = resData;         
              }
              wx.reLaunch({
                url:'/pages/smartCab/smartCab'
              })
            },
            fail: function() {
              wx.hideLoading();
              console.log(err)
            }
          })
        }
      })
   },
   getFirstStatus(){
      wxrequest.getFirstStatus().then(res => {
         if(res.data.code == 0){
            if(res.data.data.status == 1){
               this.setData({
                  ifFirst: true
               })
            }else{
               this.setData({
                  ifFirst: false,
                  nextLaunchTime: res.data.data.nextLaunchTime
               })
            }
         }
      }).catch(err => {
         console.log(err)
      })
   },
   resetFirst(){
      this.getFirstStatus()
   },
   getCabnum(){
      if(wx.getStorageSync('userAuth')){
         wxrequest.getUserCabinet().then(res => {
            if(res.data.code == 0){
               const resData = res.data.data
               this.setData({
                  cabTotal: resData
               })
            }
         }).catch(err => {
            console.log(err)
         })
      }
   },

   getQueryString: function (url, name) {//解析链接方法
      var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
      var r = url.substr(1).match(reg);
      if (r != null) {
        return r[2];
      }
      return null;
   },
})