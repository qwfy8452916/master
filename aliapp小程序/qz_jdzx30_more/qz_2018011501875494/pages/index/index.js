const app = getApp();
let apiUrl = app.getApiUrl(),
    imgUrl = app.getImgUrl();

let config = require("../../config.js");

function alertViewWithCancel(title, content, confirm) {
    my.alert({
        title: title || "提示",
        content: content || "消息提示",
        success: function () {
            confirm();
        }
    });
}

Page({
  data: {
    //轮播图部分
    imgUrl : imgUrl,
    indicatorDots : false,
    autoplay : true,
    interval : 2000,
    duration : 1500,
    swiperHeight : "260rpx",
    bannerList : null,
    //发单部分
    isHideCity : true,
    province: [],
    city: [],
    area: [],
    json : [],//所有城市数据
    provinceIndex: '0',
    cityIndex: '0',
    areaIndex: '0',
    valuecity: [0, 0, 0],
    val:[],
    selectTextDefault : "",
    selectText : "",
    customerName : "",
    customerPhone : "",
    popHide : false
  },
  // 城市选择控件 开始
  openCitySelectBox : function(){
    this.setData({
      isHideCity : !this.data.isHideCity
    });
  },
  closebtn : function(){
    this.setData({
      isHideCity : true
    });
  },
  okbtn : function(){
    let that = this;
    let provinceInfo = that.data.province;
    let cityInfo = that.data.city;
    let areaInfo = that.data.area;

    let provinceId = provinceInfo[that.data.provinceIndex].id;
    let cityId = cityInfo[that.data.cityIndex].id;
    let areaId = areaInfo[that.data.areaIndex].id;

    let provinceText = provinceInfo[that.data.provinceIndex].text;
    let cityText = cityInfo[that.data.cityIndex].text;
    let areaText = areaInfo[that.data.areaIndex].text;

    let provinceCityAreaId = provinceId + ',' + cityId + ',' + areaId;
    let selectText = provinceText + ' ' + cityText + ' ' + areaText;
    this.setData({ 
      isHideCity: true, 
      isColor: true, 
      selectText: selectText, 
      provinceCityAreaId: provinceCityAreaId, 
      areaId: areaId, 
      serverVal: areaText, 
      selectTextDefault:''
    });
  },
  // onload 数据初始化
  onLoad : function(){
    let that = this, 
    provinceJson = [],
    cityJson = [],
    areaJson = [];
    /**
     * 获取城市缓存数据
     */
    my.getStorage({
        key: 'cityJson',
        success: function (res) {
          let cityJsonNew = res.data;
          //console.log("onload");
        //   my.alert({
        //       content : "cityJsonNew："+cityJsonNew
        //   });
          //console.log(res.data.length);
          if(cityJsonNew){
            that.setData({ 
                province: cityJsonNew.province, 
                city: cityJsonNew.city, 
                area: cityJsonNew.area 
            });
          }else{
            that.getCityData();
          }
        },
        // 获取缓存失败,这里有bug，永远进不来fail分支
        fail: function () {
        //   my.alert({
        //     content : "获取不到缓存"
        //   });
        }
    });
    
    that.getBannerList();

    my.setNavigationBar({
        title: app.getAppTitle()
    });
  },
  // ajax获取城市数据
  getCityData : function(){
    let that = this;
    // ajax请求数据并且数据本地缓存存储
    my.httpRequest({
        url: apiUrl + '/zxjt/getcityurl',
        headers: {
            'content-type': 'application/json'
        },
        method : "get",
        dataType : "json",
        success: function (res) {
            let cityUrl = res.data.data.replace("/common/js", "");
            let cityUrlArr = cityUrl.split(':');
            let host = cityUrlArr[1].split('.');
            host[0] = host[0] + 's';
            cityUrlArr[1] = host.join('.');
            let cityUrlStr = cityUrlArr[0] + 's:' + cityUrlArr[1] // s:

            my.httpRequest({
                url: cityUrlStr, // + 'common/js/rlpca20170721143503.js',
                method : "get",
                dataType : "text",
                success: function (res) {
                    let str = res.data.replace("var rlpca = ", ""),
                    json = JSON.parse(str), provinceJson = [], cityJson = [], areaJson = [];
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
                        provinceJson.push({ id: json[i].id, text: json[i].text });
                    }
                    // 筛选第一省的第一个城市名称+id
                    for (let j = 0; j < json[0].children.length; j++) {
                        cityJson.push({ id: json[0].children[j].id, text: json[0].children[j].text })
                    }
                    // 筛选第一省/第一个城市/第一个区域名称+id
                    for (let k = 0; k < json[0].children[0].children.length; k++) {
                        areaJson.push({ id: json[0].children[0].children[k].id, text: json[0].children[0].children[k].text })
                    }
                    
                    that.setData({ 
                      province: provinceJson, 
                      city: cityJson, 
                      area: areaJson,
                      json : json
                    });

                    
                    //设置缓存，这里有个bug，不管是否成功都不执行回调
                    my.setStorage({
                        key: 'cityJson',
                        data: { 
                            province : provinceJson, 
                            city : cityJson, 
                            area : areaJson, 
                            json : json 
                        },
                        success :function(){
                            // my.alert({
                            //     content : "缓存设置成功"
                            // });
                        },
                        fail : function(){
                            // my.alert({
                            //     content : "缓存设置失败"
                            // });
                        }
                    });
                  }
            })
        },
        fail : function(res){
            my.alert({
                content : "无法请求,"+res.errorMessage+","+res.error
            });
        }
      })
    },
    
    /**
     * 城市选择滑动
     */
    citySelect: function (e) {
        let that = this;
        let cityJson = [];
        let areaJson = [];
        let oldVal = that.data.val;
        let val = e.detail.value;
        //console.log(val[0]);
        //console.log(val[1]);
        //console.log(val[2]);
        that.setData({ 
            val:val
        })
        let province = val[0];
        let city = val[1];
        let area = val[2];
        my.getStorage({
            key: 'cityJson',
            success: function (res) {
                // my.alert({
                //     content : "res.data.json"
                // });
                //这里并未获取到任何缓存
                //console.log(res.data+"success");

                let json = res.data ? res.data.json : that.data.json;

                // my.alert({
                //     content : "json.length"+json.length
                // });
                
                //滑动省份获取城市
                if (oldVal[0] != province && oldVal[1] == city && oldVal[2] == area) {
                    city = 0; area = 0;
                    that.setData({ valuecity: [province,0,0]})
                } else if (oldVal[0] == province && oldVal[1] != city && oldVal[2] == area) {
                    area = 0;
                    that.setData({ valuecity: [province, city, 0] })
                } else if (oldVal[0] == province && oldVal[1] == city && oldVal[2] != area) {

                }
                for (let j = 0; j < json[province].children.length; j++) {
                    cityJson.push({ id: json[province].children[j].id, text: json[province].children[j].text });
                }
                // 滑动城市获取区域
                for (let k = 0; k < json[province].children[city].children.length; k++) {
                    areaJson.push({ id: json[province].children[city].children[k].id, text: json[province].children[city].children[k].text });
                }
                that.setData({ 
                    city: cityJson, 
                    area: areaJson, 
                    provinceIndex: province, 
                    cityIndex: city, 
                    areaIndex: area
                });
            }
        });

    },
    toArticleCenter : function(){
      my.navigateTo({
        url : "../article-center/index"
      });
    },
    toArticleList : function(e){
      let urlStr = e.currentTarget.dataset.urlStr,
          urlStrName = e.currentTarget.dataset.urlStrName;
      my.navigateTo({
        url: '../article-list/index?urlstr=' + urlStr + '&urlstrname=' + urlStrName
      })
    },
    /**
    * 立即计算跳转到报价页
    */
    toBaojiaPop:function(){
        this.setData({ popHide: true });
        my.navigateTo({
            url: '../quoted-price/index'
        });
    },
    toLayoutDesign : function(){
        my.navigateTo({
            url: '../layout-design/index'
        });
    },
    /**
    * 弹窗消失
    */
    popHide:function(){
        this.setData({
            popHide:true
        });
    },
    setCustomerName:function(e){
        this.setData({ 
          customerName: e.detail.value 
        });
    },
    setCustomerPhone:function(e) {
        this.setData({ 
          customerPhone: e.detail.value 
        });
    },
    submitForm:function() {
        let regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
        let re = new RegExp(regu);

        let that = this;
        if (that.data.selectText.length < 1) {
            //that.setData({ selectTextDefault: '请选择城市：'})
            alertViewWithCancel("提示", "请选择您的所在地区", function () { });
            return;
        } else {
            that.setData({ selectTextDefault: ''})
        }
        
        if (that.data.customerName.length < 1) {
            alertViewWithCancel("提示", "请输入您的称呼", function () {
                //that.setData({ boolName: true });
            });
            return;
        } else if (that.data.customerName.search(re) == -1) {
            alertViewWithCancel("提示", "请输入正确的名称，只支持中文和英文", function () {
                //that.setData({ boolName: true });
            });
            return;
        }
        
        if (that.data.customerPhone.length < 1) {
            alertViewWithCancel("提示", "请输入手机号", function () { });
            return;
        } else {
            var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
            if (!reg.test(that.data.customerPhone)) {
                alertViewWithCancel("提示", "请输入正确的手机号", function () { });
                return false;
            }
        }

        if (that.data.src) {
            my.httpRequest({

                url: apiUrl + '/zxjt/submit_order/?src=' + that.data.src,
                data: {
                    name: that.data.customerName,
                    tel: that.data.customerPhone,
                    cs: app.transformCity(that.data.selectText)
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success: function (res) {
                    alertViewWithCancel("提示", "提交成功，请注意接听电话", function () { });
                    my.alert({
                        content : res.info
                    });
                }
            });
        } else {
            my.httpRequest({
                url: apiUrl + '/zxjt/submit_order/?src='+config.service.sourceMark,
                data: {
                    name: that.data.customerName,
                    tel: that.data.customerPhone,
                    cs: app.transformCity(that.data.selectText)
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success: function (res) {
                    alertViewWithCancel("提示", "提交成功，请注意接听电话", function () { });
                },
                fail : function(res){
                    alertViewWithCancel("提示", "提交失败", function () { });
                }
            });
        }

    },
    getBannerList : function(){
        let that = this;
        /**
         * 获取首页banner数据
         */
        let bannerList = app.getNewStorage('bannerList') || '';
        if (bannerList){
            that.setData({ 
                bannerList: bannerList.slice(0,1)
            });
        }else{
            my.httpRequest({
                url: apiUrl+'/appletcarousel/banner',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    that.setData({
                        bannerList:res.data.bannerList.slice(0,1)
                    });
                    app.setNewStorage('bannerList', res.data.bannerList, 60)
                }
            });
        }
    },


});
