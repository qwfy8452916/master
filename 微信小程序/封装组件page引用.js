
const app = getApp();
const apiUrl = app.getApiUrl();
const collectJs={   //collect相当于另一个人被直接返回定义
  data:{

  },
  collectInit: function (page, dataList){  
   //page是page里this代表page函数collect.collect.collectInit(this,"listshujv");引用传递过来的
   //相当于在page函数中加collectInit函数。page是page函数对象默认是this，dataList是传递的数据     
    let that=this;
    console.log(page)
    console.log(that)
    page.collectFun =(e)=>{          //page.collectFun函数相当于page()内this.collectFun
      let targetType = parseInt(e.currentTarget.dataset.type);
      let targetId = parseInt(e.currentTarget.dataset.id);
      let isCollect = parseInt(e.currentTarget.dataset.collect);
      let method = (isCollect == 0) ? "POST" : "GET";
      app.getUserInfo(function (res) { //授权
        wx.request({
          url: apiUrl +'/appletcarousel/editcollect',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            userid:res.userId,
            classtype:targetType,
            classid:targetId
          },
          method: method,
          dataType:"json",
          success:function(res){
            if(res.data.state==1){
                that.methods.changeStatus(targetId, page,targetType, dataList, method);
            }else{
              app.getLoginAgain(function (res){
                wx.setStorage({
                  key: 'userId',
                  data: res.userId,
                });
              });
            }
          }
        })
      });
    }
    page.setData({
      colloect:this.data
    });
  },
 collectDetailInit:function(page,dataList,){
   let that = this;
   page.collectFunDetail=(e)=>{
     let targetType = parseInt(e.currentTarget.dataset.type);
     let targetId = parseInt(e.currentTarget.dataset.id);
     let isCollect = parseInt(e.currentTarget.dataset.collect);
     let method = (isCollect == 0) ? "POST" : "GET";
     app.getUserInfo(function (res) { //授权
        wx.request({
          url: apiUrl + '/appletcarousel/editcollect',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            userid: res.userId,
            classtype: targetType,
            classid: targetId
          },
          method: method,
          dataType: "json",
          success: function (res) {
            if (res.data.state == 1) {
              that.methods.changeStatusDetail(targetId, page, targetType, dataList, method);
            } else {
              app.getLoginAgain(function (res) {
                wx.setStorage({
                  key: 'userId',
                  data: res.userId,
                });
              });
            }
          }
        })
      });

   }
 },
  methods:{
    changeStatus: function (targetId,page, targetType, dataList, method){
      if (typeof page.data[dataList][0].type == "undefined"){//如果没有类型
        for (let i = 0; i < page.data[dataList].length; i++) {
          if (page.data[dataList][i].id == targetId) {
            let item = dataList + "[" + i + "].is_collect";
            if (method == "POST") {
              wx.showToast({
                title: "收藏成功",
                icon: "success",
                success: function () {
                  page.setData({
                    [item]: 1
                  });
                }
              });
            } else {
              wx.showToast({
                title: "您已取消收藏",
                icon: "success",
                success: function () {
                  page.setData({
                    [item]: 0
                  });
                }
              });
            }
          }
        }
      }else{//如果有类型
        for (let i = 0; i < page.data[dataList].length; i++) {
          if (page.data[dataList][i].id == targetId && page.data[dataList][i].type==targetType ) {
            let item = dataList + "[" + i + "].is_collect";
            if (method == "POST") {
              wx.showToast({
                title: "收藏成功",
                icon: "success",
                success: function () {
                  page.setData({
                    [item]: 1
                  });
                }
              });
            } else {
              wx.showToast({
                title: "您已取消收藏",
                icon: "success",
                success: function () {
                  page.setData({
                    [item]: 0
                  });
                }
              });
            }
          }
        }
      }
     },
    changeStatusDetail(targetId, page, targetType, dataList, method){
 
      let that=page;
      
      if (method=="POST"){
        wx.showToast({
          title: "收藏成功",
          icon: "success",
          success: function () {
            that.setData({
              [dataList+".is_collect"]:1
            });
            
          }
        });
      }else{
        wx.showToast({
          title: "您已取消收藏",
          icon: "success",
          success: function () {
          
            that.setData({
              [dataList + ".is_collect"]: 0
            });
          }
        });
      }
    }
  }
}
module.exports = {
  collect: collectJs
}