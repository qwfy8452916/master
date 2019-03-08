var app = new Vue({
    el: '#app',
    data: {
        list: [],
        timeless: [],
        product_id: '',
    },
    mounted() {
        var that = this;
        var token = getData('TOKEN');
        var url = window.globalResURL + '/activity/bargain?token=' + token;
        axios.get(url).then(function (res) {
            if (res.data.code == '1001') {
                that.list = res.data.data.list;
            }
        })
    },
    methods: {
        toBargin: function (id, product_id) {
            go('../../view/bargain/detail.html?id=' + id + '&product_id=' + product_id);
        }
    }
})