const app = getApp()
let apiUrl = app.getApiUrl(),ImgUrl = app.getImgUrl();
const collect = require('../../utils/collectTool.js');
const fadan = require('../../utils/fadanClassTest.js');
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
Page({
  data: {
    userid: "",
    ImgUrl: ImgUrl,
    classtype:"",
    prevCityAreaId: '',
    selectText: '',
    fd:"",
    freeNum:0,
    autoplay:false,
    selectTextDefault: '请选择城市',
    valuecity: [0, 0, 0],
    val: [],
    prev: [],
    city: [],
    area: [],
    prevIndex: '0',
    cityIndex: '0',
    areaIndex: '0',
    isHideCity: true,
    personName: '',
    inputname:"",
    inputphone:'',
    telNumber: '',
    emptyNameValue: '',
    isColor: false,
    bodyData:null,
    currentIndex:1,
    checkValue:true,
    boxHeight:0,
    outheight:0,
    clickAble:true,
    clickLarge:false,
    setIndex:0
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
  onLoad: function (options) {
    let userid = "";
    let that=this;
    var today=new Date();
    var todayTime=Date.parse(today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate())/1000;
    var oldDayTime=Date.parse("2018/7/29")/1000;
    wx.getStorage({
      key: 'dateTime',
      success: function(res) {//获取缓存成功
        let oldTime=res.data;
        if (todayTime-oldTime>=86400){//缓存过期
          wx.setStorage({//设置新时间戳
            key: 'dateTime',
            data: todayTime
          });
          wx.setStorage({
            key: "freeNum",
            data: '188',
          })
          that.setData({
            freeNum: [1, 8, 8]
          });
        }else{//缓存未过期
          wx.getStorage({
            key: 'freeNum',
            success: function(res) {
              that.setData({
                freeNum: res.data
              });
            },
          })
        }
      },
      fail:function(){
        wx.setStorage({//设置新时间戳
          key: 'dateTime',
          data: todayTime
        });
        wx.setStorage({
          key: "freeNum",
          data: '188',
        })
        that.setData({
          freeNum: [1, 8, 8]
        });
      }
    })

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
    this.getBodyData(options);
  },
  getBodyData: function (options){
    let that = this;
    let url = options.type == 4 ? "/meitudetail" :"/xgtdetail";
    that.setData({
      classtype: options.type
    })
    wx.request({
      url: apiUrl + url,
      data:{
        id:options.id,
        userid:that.data.userid
      },
      success:function(res){
       if(res.data.status==1){
         if (options.type==2){
           res.data.data.pv = parseInt(options.pv)+1;
           res.data.data.description = res.data.data.qc
         }
         for (let i = 0; i < res.data.data.imgs.length;i++){
           res.data.data.imgs[i].height=0;
        }
          that.setData({
            bodyData: res.data.data
          });
          wx.setNavigationBarTitle({
            title: res.data.data.title
          });
        }
       collect.collect.collectDetailInit(that, "bodyData");//收藏引用
      }
    })
  },
  changeCurrent:function(e){
    this.setData({
      currentIndex: e.detail.current+1
    })
  },
  quchuyy: function () {
    let that = this;
    that.setData({
      viewqieh: true,
    });
    let tiShi = app.getNewStorage('tiShi')
    if (!tiShi) {
      app.setNewStorage('tiShi', 'false', 86400)
    }
  },
  EventHandle: function (event) {
    var count = event.detail.current;
    this.data.Idex = count + 1;
    this.data.biaoti = this.data.shujv[count].title;
    this.setData({ Idex: this.data.Idex });
    this.setData({ biaoti: this.data.biaoti });
    wx.setNavigationBarTitle({ title: this.data.biaoti })
  },
  onShow: function () {
    let that = this;
    let json = [];
    let prevJson = [];
    let cityJson = [];
    let areaJson = [];
    let cityUrl;

    // 获取缓存城市数据
    wx.getStorage({
      key: 'cityJson',
      success: function (res) {
        let cityJsonNew = res.data;
        that.setData({ prev: cityJsonNew.prev, city: cityJsonNew.city, area: cityJsonNew.area });
        //   that.setData({ json: cityJsonNew.json })
      },
      // 获取缓存失败
      fail: function () {
        // ajax请求数据并且数据本地缓存存储
        wx.request({
          url: apiUrl + '/zxjt/getcityurl',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            cityUrl = res.data.data.replace("/common/js", "");
            let cityUrlArr = cityUrl.split(':');
            let host = cityUrlArr[1].split('.');
            host[0] = host[0] + 's';
            cityUrlArr[1] = host.join('.');
            let cityUrlStr = cityUrlArr[0] + 's:' + cityUrlArr[1]
            wx.request({
              url: cityUrlStr, // + 'common/js/rlpca20170721143503.js',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                let str = res.data.replace("var rlpca = ", "");
                json = JSON.parse(str), prevJson = [], cityJson = [], areaJson = [];
                json.shift();
                // 删除空省份/城市/区域
                for (let i = 0; i < json.length; i++) {
                  json[i].children.shift()
                  for (var j = 0; j < json[i].children.length; j++) {
                    json[i].children[j].children.shift()
                  }
                };
                // 筛选省份名称+id
                for (let i = 0; i < json.length; i++) {
                  prevJson.push({ id: json[i].id, text: json[i].text });
                }
                // 筛选第一省的第一个城市名称+id
                for (let j = 0; j < json[0].children.length; j++) {
                  cityJson.push({ id: json[0].children[j].id, text: json[0].children[j].text })
                }
                // 筛选第一省/第一个城市/第一个区域名称+id
                for (let k = 0; k < json[0].children[0].children.length; k++) {
                  areaJson.push({ id: json[0].children[0].children[k].id, text: json[0].children[0].children[k].text })
                }
                that.setData({ prev: prevJson, city: cityJson, area: areaJson, json: json });
                wx.setStorage({
                  key: 'cityJson',
                  data: { prev: prevJson, city: cityJson, area: areaJson, json: json },
                })
              }
            })
          }
        })
      }
    });
  },
  selectHandle() {
    this.setData({ isHideCity: false });
  },

  /**
 * 城市选择滑动
 */
  bindChange: function (e) {
    let that = this;
    let cityJson = [];
    let areaJson = [];
    let val = e.detail.value;
    let prev = val[0];
    let city = val[1];
    let area = val[2];
    wx.getStorage({
      key: 'cityJson',
      success: function (res) {
        let json = res.data.json
        // 滑动省份获取城市
        for (let j = 0; j < json[prev].children.length; j++) {
          cityJson.push({ id: json[prev].children[j].id, text: json[prev].children[j].text });
        }
        // 滑动城市获取区域
        for (let k = 0; k < json[prev].children[city].children.length; k++) {
          areaJson.push({ id: json[prev].children[city].children[k].id, text: json[prev].children[city].children[k].text });
        }
        that.setData({ city: cityJson, area: areaJson, prevIndex: prev, cityIndex: city, areaIndex: area });
      }
    });
  },
  closebtn() {
    this.setData({ isHideCity: true });
  },
  /**
   * 城市选择
   */
  okbtn() {
    let that = this;
    let prevInfo = that.data.prev;
    let cityInfo = that.data.city;
    let areaInfo = that.data.area;

    let prevId = prevInfo[that.data.prevIndex].id;
    let cityId = cityInfo[that.data.cityIndex].id;
    let areaId = areaInfo[that.data.areaIndex].id;

    let prevText = prevInfo[that.data.prevIndex].text;
    let cityText = cityInfo[that.data.cityIndex].text;
    let areaText = areaInfo[that.data.areaIndex].text;

    let prevCityAreaId = prevId + ',' + cityId + ',' + areaId;
    let selectText = prevText + ' ' + cityText + ' ' + areaText;
    this.setData({ isHideCity: true, isColor: true, selectText: selectText, prevCityAreaId: prevCityAreaId, areaId: areaId, serverVal: areaText, selectTextDefault: '' });
  },


  getName: function (e) {
    this.setData({ personName: e.detail.value });
  },
  getPhone: function (e) {
    this.setData({ telNumber: e.detail.value });
  },
  Name: function (e) {
    this.setData({ inputname: e.detail.value })
  },
  inputPhone: function (e) {
    this.setData({ inputphone: e.detail.value })
  },
  // 城市选择滑动
  bindChange: function (e) {
    let that = this;
    let cityJson = [];
    let areaJson = [];
    const val = e.detail.value;
    // let json = that.data.json;
    let prev = val[0];
    let city = val[1];
    let area = val[2];
    let oldVal = that.data.val;
    that.setData({ val: val })
    wx.getStorage({
      key: 'cityJson',
      success: function (res) {
        let json = res.data.json
        // 滑动省份获取城市
        if (oldVal[0] != prev && oldVal[1] == city && oldVal[2] == area) {
          city = 0; area = 0;
          that.setData({ valuecity: [prev, 0, 0] })
        } else if (oldVal[0] == prev && oldVal[1] != city && oldVal[2] == area) {
          area = 0;
          that.setData({ valuecity: [prev, city, 0] })
        } else if (oldVal[0] == prev && oldVal[1] == city && oldVal[2] != area) {

        }
        for (let j = 0; j < json[prev].children.length; j++) {
          cityJson.push({ id: json[prev].children[j].id, text: json[prev].children[j].text })
        }
        // 滑动城市获取区域
        for (let k = 0; k < json[prev].children[city].children.length; k++) {
          areaJson.push({ id: json[prev].children[city].children[k].id, text: json[prev].children[city].children[k].text })
        }
        that.setData({ city: cityJson, area: areaJson, prevIndex: prev, cityIndex: city, areaIndex: area })
      }
    });
  },

  closebtn: function () {
    this.setData({ isHideCity: true });
  },

  selectHandle: function () {
    this.setData({ isHideCity: false })
  },

  checkboxChange:function(e){
    this.setData({
      checkValue: !this.data.checkValue
    })
  },

  // 装修设计表单提交1
  formSubmit: function (e) {
    if (!this.data.clickAble) {
      alertViewWithCancel("提示", "请勿频繁操作", function () { });
      return false
    }
    let that = this;
    var city = this.data.prevCityAreaId;
    var name = e.currentTarget.dataset.name;
    var tel = e.currentTarget.dataset.phone;

    let regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
    let re = new RegExp(regu);
    let check = this.data.checkValue;

    if (city.length < 1) {
      that.setData({
        xzcity: '请选择城市',
      })
      alertViewWithCancel("提示", "请选择您的所在地区", function () { });
      return;
    } else {
      that.setData({
        xzcity: '',
      })
    }
    if (name.length < 1) {
      alertViewWithCancel("提示", "请输入姓名", function () {

      });
      return;
    } else if (name.search(re) == -1) {
      alertViewWithCancel("提示", "请输入正确的姓名，仅限中文和英文", function () {
        that.setData({ boolName: true });
      });
      return;
    }

    if (tel.length < 1) {
      alertViewWithCancel("提示", "请输入手机号码", function () {

      });
      return;
    } else {
      var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
      if (!reg.test(tel)) {
        alertViewWithCancel("提示", "请输入正确的手机号码", function () {
        });
        return false;
      }
    }
    if (!check) {
      alertViewWithCancel("提示", "请勾选我已阅读并同意齐装网的《免责申明》！", function () {
      });
      return;
    }
    that.setData({
      clickAble: false
    });
    setTimeout(function () {
      that.setData({
        clickAble: true
      });
    }, 5000);
    if (that.data.src) {
      wx.request({
        url: apiUrl + '/zxjt/submit_order_v2/?src=' + that.data.src,
        data: {
          name: name,
          tel: tel,
          cs: city,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function (res) {
          if(res.data.status==1){
            that.setData({
              inputname: "",
              inputphone: "",
              emptyNameValue:"",
              telNumber:""
            });
            alertViewWithCancel("提示", "领取成功，稍后我们将联系您", function () { });
            let num = parseInt(that.data.freeNum.join("")) - 1;
            that.setData({
              freeNum: num.toString().split("")
            });
            wx.setStorage({
              key: 'freeNum',
              data: that.data.freeNum

            })
          }else{
            alertViewWithCancel("提示", res.data.info, function () { });
          }
         

        }
      });
    } else {
      wx.request({
        url: apiUrl + '/zxjt/submit_order_v2/?src=' + app.globalData.sourceMark,
        data: {
          name: name,
          tel: tel,
          cs: city,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function (res) {
          if (res.data.status == 1) {
            that.setData({
              inputname: "",
              inputphone: "",
              emptyNameValue: "",
              telNumber: ""
            });
            alertViewWithCancel("提示", "领取成功，稍后我们将联系您", function () { });
            let num = parseInt(that.data.freeNum.join(""))-1;
            that.setData({
              freeNum:num.toString().split("")
            });
            wx.setStorage({
              key: 'freeNum',
              data:that.data.freeNum
            
            })
          } else {
            alertViewWithCancel("提示", res.data.info, function () { });
          }
          
         
        }
      });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      res.target.dataset.title = res.target.dataset.title || '此图片没有标题 ^_^!'
    }
    return {
      title: res.target.dataset.title,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  getAsThis:function(){
    var aa = new fadan.fadanClass(this, 2, {
      cityInput: true,
      addressInput: false,
      phoneInput: true,
      nameInput: true,
      areaInput: false,
      btnText: "马上获取"
    })
    this.openWin();
  },
  getPrice:function(){
    var aa = new fadan.fadanClass(this, 5, {
      cityInput: true,
      addressInput: false,
      phoneInput: true,
      nameInput: false,
      areaInput: true,
      btnText: "马上获取"
    })
    this.openWin();
   },
  changeWidth:function(e){
    let width=e.detail.width;
    let height=e.detail.height;
    let boxWidth=0;
    let index=e.target.dataset.index;
    wx.getSystemInfo({
      success: function (res) {
        boxWidth = res.windowWidth;
      }
    });
    let pe = width / height ;
    this.setData({
      ["bodyData.imgs[" + index + "].height"]: boxWidth/pe
    });
  },
  setLarge:function(e){
    let index=e.target.dataset.index;
    this.setData({
      clickLarge:true,
      setIndex:index
    });
  },
  setSmall: function () {
    this.setData({
      clickLarge:false
    });
  }
})