var activeid = getParam('id');
var productid = getParam('product_id');
var bargain_id = getParam('bargain_id') ? getParam('bargain_id'): 0;
var app = new Vue({
  el: '#app',
  data: {
    showtoast: false,
    activityinfo: {},
    productinfo: {},
    addbargain: {
      id: '',
      price: ''
    }
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
      }
    }).catch(function (error) {
      alert(error);
    });
  },
  methods: {
    showMask: function () {
      this.showtoast = !this.showtoast;
      var that = this;
      var token = getData('TOKEN');
      var url = window.globalResURL + '/activity/add_bargain?token=' + token;
      var params = new URLSearchParams();
      params.append('id', activeid);
      params.append('product_id', productid);
      axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (res) {
        that.addbargain.price = res.data.data.self_price;
        that.addbargain.id = res.data.data.id;
        setTimeout(function () {
          go('./help.html?bargain_id=' + that.addbargain.id + '&id=' + activeid);
        }, 1000);
      });
    },
    // 立即购买
    buy:function(){
      go('../pay/bargain_buy.html?id='+activeid+'&bargain_id='+bargain_id);
    }
  }
})