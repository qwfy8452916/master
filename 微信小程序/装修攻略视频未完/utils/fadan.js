const app = getApp()
let apiUrl = app.getApiUrl();
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
const fadan={
  closed:false,
  selectWin:true,
  winType:0,
  selectTextDefault:"请选择城市",
  selectText:"",
  personName:"",
  telNumber:"",
  prev: [],
  city: [],
  area: [],
  prevIndex: '0',
  cityIndex: '0',
  areaIndex: '0',
  valuecity: null,
  val:[],
  json: [],
  isHide: true,
  selectText: '',
  prevCityAreaId: '',
  orderid: '',
  oldData:[0,0,0],
  colorCont:[false,false,false],
  init:function(data,winType){//添加方法
    let that = this;
    let json = [];
    let prevJson = [];
    let cityJson = [];
    let areaJson = [];
    let cityUrl;
    data.openWin = function (){
      data.setData({
        ["fd.closed"]: true,
        ["fd.winType"]: winType
      });
    }
    data.closeWin=function() {
      data.setData({
        ["fd.closed"]: false
      });
    }
    data.openCitySelect=function() {
      data.setData({
        ["fd.selectWin"]: false
      });
      //请求城市
      wx.getStorage({
        key: 'cityJson',
        success: function (res) {
          // console.log(cityJson)
          let cityJsonNew = res.data;
          // console.log(cityJsonNew)
          // console.log(data);
          data.setData({ ["fd.prev"]: cityJsonNew.prev, ["fd.city"]: cityJsonNew.city, ["fd.area"]: cityJsonNew.area });
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
                  data.setData({ prev: prevJson, city: cityJson, area: areaJson, json: json});
                  
                  
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
    }

    data.bindChange=function(e){//城市滑动
      let that = this;
      let cityJson = [];
      let areaJson = [];
      let val = e.detail.value;
      let prev = val[0];
      let city = val[1];
      let area = val[2];
      let oldVal = data.data.fd.val;
      data.setData({ ["fd.val"]: val })
      wx.getStorage({
        key: 'cityJson',
        success: function (res) {
          // console.log(res);
          let json = res.data.json
          // console.log(json);
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
          that.setData({ ["fd.city"]: cityJson, ["fd.area"]: areaJson, ["fd.prevIndex"]: prev, ["fd.cityIndex"]: city, ["fd.areaIndex"]: area })
        }
      });       
    }
    data.closeCitySelect=function(){
      data.setData({
        ["fd.selectWin"]: true
      });

    }
    data.okCitySelect=function(){

      let that = this;
      let prevInfo = that.data.fd.prev;
      let cityInfo = that.data.fd.city;
      let areaInfo = that.data.fd.area;

      let prevId = prevInfo[that.data.fd.prevIndex].id;
      let cityId = cityInfo[that.data.fd.cityIndex].id;
      let areaId = areaInfo[that.data.fd.areaIndex].id;

      let prevText = prevInfo[that.data.fd.prevIndex].text;
      let cityText = cityInfo[that.data.fd.cityIndex].text;
      let areaText = areaInfo[that.data.fd.areaIndex].text;

      let prevCityAreaId = prevId + ',' + cityId + ',' + areaId;
      let selectText = prevText + ' ' + cityText + ' ' + areaText;
      data.setData({ ["fd.selectTextDefault"]: '', ["fd.selectWin"]: true, ["fd.selectText"]: selectText, ["fd.prevCityAreaId"]: prevCityAreaId, ["fd.colorCont[0]"]: true});
    }
    data.fadanBtn=function(e){//发单验证
      let that = this;
      console.log(that)
      var name = data.data.fd.personName
      var tel = data.data.fd.telNumber
      var city = data.data.fd.selectText;

      if (city.length < 1) {
        alertViewWithCancel("提示", "请选择您的地区", function () {
          console.log("点击确定按钮");
        });
        return;
      }
      if(name==""){
        alertViewWithCancel("提示", "请输入您的姓名", function () {
          console.log("点击确定按钮");
        });
        return;
      }
      if (tel.length < 1) {
        alertViewWithCancel("提示", "请输入您的手机号码", function () {
          console.log("点击确定按钮");
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
      wx.request({
        url: apiUrl + '/zxjt/submit_order/?src=' + app.globalData.sourceMark,// zxjtxcx-bj
        data: {
          cs: data.data.fd.prevCityAreaId,
          name:name,
          tel: tel
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        success: function (res) {
          alertViewWithCancel("提示", "获取成功,稍后我们将联系您", function () {
            data.setData({
              ["fd.closed"]: false
            });
          });
        }
      });    }
    data.getName=function(e){
      data.setData({ 
        ["fd.personName"]: e.detail.value,
        ["fd.colorCont[1]"]: true
      });
    }

    data.getPhone=function(e){
      data.setData({
        ["fd.telNumber"]: e.detail.value,
        ["fd.colorCont[2]"]: true
      });
    }

    data.setData({
      fd:this
    });
  },
}
module.exports = {
  fadan: fadan
}
