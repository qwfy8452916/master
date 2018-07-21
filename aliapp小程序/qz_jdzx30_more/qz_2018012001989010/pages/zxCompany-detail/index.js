const app = getApp(),
      apiUrl = app.getApiUrl(),
      oImgUrl = app.getImgUrl();

Page({
  data: {
    imgUrl: oImgUrl,
    details:{},
    caseList:[],
    count:9,
    anlicount:'',
    id:'',
    loadBool:true
  },
  onLoad : function(options){
    let that = this;
    my.httpRequest({
        url: apiUrl+'/appletcarousel/companyDetails',
        data: { id:options.id,count:9},
        header: {
            'content-type': 'application/json'
        },
        success:function(res){

            res.data.details.star = options.star; 
            that.setData({ 
                details: res.data.details, 
                caseList: res.data.cases, 
                id: options.id, 
                anlicount: options.anlicount
            });
            my.setNavigationBar({
                title: res.data.details.qc
            });
        }
    });

  },
    /**
     * 上拉加载更多数据
     */
    loadMore(){
        let that = this,
            count = that.data.count;
        if (that.data.loadBool){
            my.showToast({
                content: '数据加载中...',
                icon: 'loading'
            });
            let len = that.data.caseList.length;
            count += 5;
            my.httpRequest({
                url: apiUrl + '/appletcarousel/companyDetails',
                data: { id: that.data.id, count: count },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    
                    if (len == res.data.cases.length){
                        that.setData({loadBool:false})
                    }else{
                        that.setData({ caseList: res.data.cases, count: count, loadBool: true })
                    }
                }
            });
        }else{
            my.showToast({
                content: '没有更多了',
                icon: 'success'
            });
        }
    },



});
