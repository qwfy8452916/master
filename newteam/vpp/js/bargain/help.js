var app = new Vue({
  el: '#app',
  data: {
    showtoast: false,
    activity:{},
    user:{
      head_img:'',
      username:'',
      id:''
    },
    login_user:{},
    activityprice:'',
    bargainprice:''
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
  },
  methods: {
    helpBargain: function () {
      this.showtoast = !this.showtoast;
      var activeid=getParam('id');
      var bargain_id=getParam('bargain_id');
      var that=this;
      var token = getData('TOKEN');
      var url = window.globalResURL + '/activity/help_bargain?token=' + token;
      var params = new URLSearchParams();
      params.append('id', activeid);
      params.append('bargain_id', bargain_id);
      params.append('bargain_user_id',uesrid);
      axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(res){
        that.bargainprice=res.data.data.bargain_price;
      });
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
          that.activityprice=res.data.data.final_price;
          that.user.id=res.data.data.user.id;
          uesrid=that.user.id;
        }
      }).catch(function (error) {
        alert(error);
      });
    }
  }
})