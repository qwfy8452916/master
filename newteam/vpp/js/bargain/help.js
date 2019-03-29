var app = new Vue({
  el: '#app',
  data: {
    showtoast: false,
    showtoast1:false,
    activity:{},
    user:{
      head_img:'',
      username:'',
      id:''
    },
    login_user:{},
    activityprice:'',
    bargainprice:'',
    helpers: [],
    productinfo:{
      stock:0,
      sell_stock:0
    },
    login_user_id:0,
    is_show:true
  },
  mounted() {
    var that = this;
    var mySwiper = new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      }
    })
    that.bargainDetail();
    that.detail();
  },
  methods: {
    helpBargain: function () {
      var activeid=getParam('id');
      var bargain_id=getParam('bargain_id');
      var that=this;
      var token = getData('TOKEN');
      var url = window.globalResURL + '/activity/help_bargain?token=' + token;
      var params = new URLSearchParams();
      params.append('id', activeid);
      params.append('bargain_id', bargain_id);
      params.append('bargain_user_id',that.user.id);
      axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res){
        if(res.data.code=='1001'){
          that.showtoast = true;
          that.bargainprice=res.data.data.bargain_price;
        }
        console.log(res)
        if(res.data.code=='3001'){
          alert(res.data.msg);
        }

      });
    },
    shareBargain:function(){
        this.showtoast1=!this.showtoast1;
    },
    showMask(){
      var that=this;
      that.showtoast = false;
    },
    bargainDetail: function () {
      var bargain_id = getParam('bargain_id');
      var that = this;
      var token = getData('TOKEN');
      var url = window.globalResURL + '/activity/bargain_info?token=' + token;
      axios.get(url, {
        params: {
          bargain_id: bargain_id
        }
      }).then(function (res) {
        if (res.data.code == '1001') {
          that.activity=res.data.data.activity;
          that.user=res.data.data.user;
          var login_user = res.data.data.login_user;
          that.activityprice=res.data.data.final_price;
          that.user.id=res.data.data.user.id;
          that.login_user_id = login_user.id;
        }
      }).catch(function (error) {
        alert(error);
      });
    },
    detail:function(){
      var that=this;
      var activeid=getParam('id');
      var token = getData('TOKEN');
      var url = window.globalResURL + '/activity/details?token=' + token;
      axios.get(url, {
        params: {
          id: activeid
        }
      }).then(function (res) {
        if (res.data.code == '1001') {
          that.activityinfo = res.data.data.activity_info;
          that.productinfo = res.data.data.product_info;
          that.helpers = res.data.data.helpers;
          that.helpers.length = res.data.data.helpers.length;
        }
      }).catch(function (error) {
      });
    }
  }
})
