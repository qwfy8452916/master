const app = getApp()
let apiUrl = app.getApiUrl(), ImgUrl = app.getImgUrl();
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
    prevCityAreaId: '',
    selectText: '',
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
    telNumber: '',
    emptyNameValue: '',
    isColor: false,
    checkValue:true,
    lingPer:"",
    clickAble:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    wx.getStorage({
      key: 'lingPer',
      success: function (res) {
        that.setData({
          lingPer: res.data
        });
      },
      fail: function (res) {
        wx.setStorage({
          key: 'lingPer',
          data:226,
        });
        that.setData({
          lingPer: 226
        });
      }
    });
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
  Name: function (e) {
    this.setData({ inputname: e.detail.value })
  },
  Phone: function (e) {
    this.setData({ telNumber: e.detail.value })
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


  // 装修设计表单提交1
  formSubmit: function (e) {
    if (!this.data.clickAble){
      alertViewWithCancel("提示", "请勿频繁操作", function () {});
      return false
    }
    let that = this;
    var city = this.data.prevCityAreaId;
    var name = e.currentTarget.dataset.name;
    var tel = e.currentTarget.dataset.phone;
    var check = this.data.checkValue;
    let regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
    let re = new RegExp(regu);
    if (city.length < 1) {
      that.setData({
        xzcity: '请选择城市',
      })
      alertViewWithCancel("提示", "请选择您的所在地区", function () {});
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
      alertViewWithCancel("提示", "请输入手机号码", function () { });
      return;
    } else {
      var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
      if (!reg.test(tel)) {
        alertViewWithCancel("提示", "请输入正确的手机号码", function () {
        });
        return false;
      }
    }

    if (!check){
      alertViewWithCancel("提示", "请勾选我已阅读并同意齐装网的《免责申明》！", function () {
      });
      
      return false;
    }
    that.setData({
      clickAble:false
    });
    setTimeout(function(){
      that.setData({
        clickAble: true
      });
    },5000);
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
          if (res.data.status == 1) {
            that.setData({
              personName: '',
              inputphone: '',
              inputname: '',
              telNumber: '',
            })
            alertViewWithCancel("提示", "领取成功，稍后我们将联系您", function () { });
            that.setData({
              lingPer: that.data.lingPer+ 1
            });
            wx.setStorage({
              key: 'lingPer',
              data: that.data.lingPer,
            })
          } else {
            alertViewWithCancel("提示", res.data.data.info, function () { });
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
              personName: '',
              inputphone: '',
              inputname: '',
              telNumber: '',
            })
            alertViewWithCancel("提示", "领取成功，稍后我们将联系您", function () { });
            that.setData({
              lingPer: that.data.lingPer + 1
            });
            wx.setStorage({
              key: 'lingPer',
              data: that.data.lingPer,
            })
          } else {
            alertViewWithCancel("提示", res.data.data.info, function () { });
          }
          
        }
      });
    }
  },
  checkboxChange:function(e){
    if (this.data.checkValue == true) {
      this.setData({
        checkValue: false
      })
    } else {
      this.setData({
        checkValue: true
      })
    }
  }
})