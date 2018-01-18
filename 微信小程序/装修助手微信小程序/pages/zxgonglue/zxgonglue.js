//显示带取消按钮的消息提示框
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
let app = getApp();
let apiUrl = app.getApiUrl();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    zxbefore: 'top-hoverd-btn',
    zxbecenter: '',
    zxafter: '',
    selectPerson: true,
    firstPerson: '请选择您的装修日期',
    inputphone: '',
    inputfangan: '',
    mji: "",
    prev: [],
    city: [],
    area: [],
    prevIndex: '0',
    cityIndex: '0',
    areaIndex: '0',
    valuecity: null,
    json: [],
    isHideCity: true,
    selectText: '',
    xzcity: '请选择城市',
    prevCityAreaId: '',
    tabshujv:null,
    xuancai: 'xuancai',
    jubu: 'jubu',
    fs: 'fs',
    xuancaishujv:null,
    jvbushujv: null,
    fsshujv: null,
    zxzq: [
      {
        image: '../../img/bjlogo01.png',
        url:'shoufang',
        text: '收房验房'
      },
      {
        image: '../../img/bjlogo03.png',
        url: 'gongsi',
        text: '找装修公司'
      },
      {
        image: '../../img/bjlogo02.png',
        url: 'shejiyusuan',
        text: '设计与预算'
      },
      {
        image: '../../img/bjlogo04.png',
        url: 'xuancai',
        text: '装修选材'
      }
    ],
    zxzz: [
      {
        image: '../../img/bjlogo05.png',
        url: 'shuidian',
        text: '水电'
      },
      {
        image: '../../img/bjlogo06.png',
        url: 'niwa',
        text: '泥瓦'
      },
      {
        image: '../../img/bjlogo07.png',
        url: 'mugong',
        text: '木工'
      },
      {
        image: '../../img/bjlogo08.png',
        url: 'youqi',
        text: '油漆'
      }
    ],
    zxzh: [
      {
        image: '../../img/bjlogo09.png',
        url: 'jianche',
        text: '检测验收'
      },
      {
        image: '../../img/bjlogo10.png',
        url: 'peishi',
        text: '后期配饰'
      },
      {
        image: '../../img/bjlogo11.png',
        url: 'baoyang',
        text: '装修保养'
      },
      {
        image: '../../img/bjlogo12.png',
        url: 'jjsh',
        text: '家居生活'
      }
    ],
    banner:[
      {
        image: 'http://staticqn.qizuang.com/zhuanti/20170315/58c9066600cba-slt930.jpg',
        text: 'banner01'
      },
      {
        image: 'http://staticqn.qizuang.com/zhuanti/20170315/58c901f8eb65e-slt930.jpg',
        text: 'banner02'
      },
      {
        image: 'http://staticqn.qizuang.com/zhuanti/20160829/57c386c4d7ec2-slt930.jpg',
        text: 'banner03'
      },
      {
        image: 'http://staticqn.qizuang.com/zhuanti/20160823/57bc17501d653-slt930.jpg',
        text: 'banner04'
      },
      {
        image: 'http://staticqn.qizuang.com/zhuanti/20160823/57bc085f23986-slt930.jpg',
        text: 'banner05'
      }
    ],
  },




  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    let that = this;
    that.setData({ tabshujv: that.data.zxzq })

    wx.request({
      url: apiUrl + '/appletcarousel/zxlclist',
      data: {
        count:2,
        category : that.data.xuancai
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          xuancaishujv:res.data
        })

      },
      fail: function () {
        console.log('error!!!!!!!!!!!!!!')
      }
    })


    wx.request({
      url: apiUrl + '/appletcarousel/zxlclist',
      data: {
        count: 2,
        category: that.data.jubu
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          jubushujv: res.data
        })

      },
      fail: function () {
        console.log('error!!!!!!!!!!!!!!')
      }
    })


    wx.request({
      url: apiUrl + '/appletcarousel/zxlclist',
      data: {
        count: 2,
        category: that.data.fs
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          fsshujv: res.data
        })

      },
      fail: function () {
        console.log('error!!!!!!!!!!!!!!')
      }
    })

  },


  toArticle: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../shouyexq/shouyexq?id=' + id
    })
  },


  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectPerson: false,
      })
    } else {
      this.setData({

        selectPerson: true,
      })
    }
  },
  //点击切换
  mySelect: function (e) {
    console.log(e)
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
    })
  },

  // 装修设计表单提交1
  formSubmit: function (e) {
    let that = this;
    // console.log("提交表单");
    console.log(e);
    var city = this.data.selectText;
    var time = this.data.firstPerson;
    var tel = e.currentTarget.dataset.phone;
    var xiaoqu = e.currentTarget.dataset.fangan;
    
    if (time =="请选择您的装修日期") {
      alertViewWithCancel("提示", "请选择您的装修时间", function () {
      });
      return;
    }
    if (city.length < 1) {
      that.setData({
        xzcity: '选择城市',
      })
      alertViewWithCancel("提示", "请选择您的所在地区", function () {
      });
      return;
    } else {
      that.setData({
        xzcity: '',
      })
    }

    console.log(time)
    if (xiaoqu.length < 1) {
      alertViewWithCancel("提示", "请输入您的小区", function () {
      });
      return;
    }

    if (tel.length < 1) {
      alertViewWithCancel("提示", "请输入手机号", function () {
      });
      return;
    } else {
      var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
      if (!reg.test(tel)) {
        alertViewWithCancel("提示", "请填写正确的手机号码", function () {
        });
        console.log(" ^_^!");
        return false;
      }
    }
    

    if (that.data.src) {
      wx.request({
        url: apiUrl + '/zxjt/submit_order/?src=' + that.data.src,
        data: {
          tel: tel,
          cs: city,
          xiaoqu: xiaoqu,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function (res) {
          // console.log(res)
          alertViewWithCancel("提示", "提交成功，请注意接听电话", function () {
            console.log("点击确定按钮");
          });
        }
      });
    } else {

      wx.request({
        url: apiUrl + '/zxjt/submit_order/?src=xcx-0',
        data: {
          tel: tel,
          cs: city,
          xiaoqu: xiaoqu,
          time: time,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function (res) {
          // console.log(res)
          alertViewWithCancel("提示", "提交成功，请注意接听电话", function () {
            console.log("点击确定按钮");
          });
        }
      });
    }
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  // 装修前
  tozxbefore: function () {
    this.setData({ tabshujv: this.data.zxzq })
    this.updateBtnStatus('zxbefore');

  },
  // 装修中
  tozxbecenter: function () {
    this.setData({ tabshujv: this.data.zxzz})
    this.updateBtnStatus('zxbecenter');

  },
  // 装修后
  tozxafter: function () {
    this.setData({ tabshujv: this.data.zxzh})
    this.updateBtnStatus('zxafter');

  },

  updateBtnStatus: function (k) {
    this.setData({
      zxbefore: this.getHoverd('zxbefore', k),
      zxbecenter: this.getHoverd('zxbecenter', k),
      zxafter: this.getHoverd('zxafter', k),
    });
  },
  getHoverd: function (src, dest) {
    return (src === dest ? 'top-hoverd-btn' : '');
  },

  /**
   * 生命周期函数--监听页面显示
   */
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

  inputPhone: function (e) {
    this.setData({ inputphone: e.detail.value })
  },
  inputFangan: function (e) {
    this.setData({ inputfangan: e.detail.value })
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
    wx.getStorage({
      key: 'cityJson',
      success: function (res) {
        let json = res.data.json
        // 滑动省份获取城市
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
  okbtn: function () {
    let that = this;
    let prevInfo = that.data.prev;
    let cityInfo = that.data.city;
    let areaInfo = that.data.area;

    let prevId = prevInfo[that.data.prevIndex].id
    let cityId = cityInfo[that.data.cityIndex].id
    let areaId = areaInfo[that.data.areaIndex].id

    let prevText = prevInfo[that.data.prevIndex].text
    let cityText = cityInfo[that.data.cityIndex].text
    let areaText = areaInfo[that.data.areaIndex].text

    let prevCityAreaId = prevId + ',' + cityId + ',' + areaId
    let selectText = prevText + ' ' + cityText + ' ' + areaText;
    console.log(prevCityAreaId + selectText);
    this.setData({ xzcity: '', isHideCity: true, selectText: selectText, prevCityAreaId: prevCityAreaId });
    console.log(selectText)

  },
  selectHandle: function () {
    this.setData({ isHideCity: false })
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

  zxgllist:function(e){
    let urlStr = e.currentTarget.dataset.urlstr,
      urlStrName = e.currentTarget.dataset.urlstrname;
    wx.navigateTo({
      url: '../zxgonglue_list/zxgonglue_list?urlstr=' + urlStr + '&urlstrname=' + urlStrName
    })

  },

  jinruzxgs:function(){
    wx.navigateTo({
      url: '../des_company/des_company',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})