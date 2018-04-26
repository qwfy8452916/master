
const app = getApp();
const apiUrl = app.getApiUrl();
const collectJs={
  data:{

  },
  collectInit: function (page, dataList, isCache){
    let that=this;
    page.collectFun =(e)=>{
      let targetType = parseInt(e.currentTarget.dataset.type);
      let targetId = parseInt(e.currentTarget.dataset.id);
      let isCollect = parseInt(e.currentTarget.dataset.collect);
      let method = (isCollect == 0) ? "POST" : "GET";
      app.getUserInfo(function (res) {//授权
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
              let isCollectStatus=that.methods.changeStatus(targetId, page,targetType, dataList, method);
              if(isCache){//如果开启缓存功能
                let collectType = (targetType == 10) ? "viewArticleId" :"viewVideoId " ;
                wx.setStorage({
                  key: collectType,
                  data:{
                    id: targetType,
                    collectStatus: isCollectStatus
                  }
                })
              }
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
                  return 1;
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
                  return 0;
                }
              });
            }
          }
        }
      }
       
       
     }
  }
}
module.exports = {
  collect: collectJs
}