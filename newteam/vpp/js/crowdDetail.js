var activeID = getParam('id');
// console.log(activeID);
var vm = new Vue({
    el: '#app',
    data: {
        list: {},
        dangwei: [],
        activity_id: '',

        is_collect: false
    },
    mounted() {
        this.getData();
    },
    methods: {
        goselectGear: function (id) {
            go("selectGear.html?id=" + id);
        },
        collection: function () {
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/favorite/add_favorites_log",
                data: {
                    id: that.activity_id,
                    table: 'activity'
                },
                dataType: 'json',
                success: function (res) {
                    if (res.status == 1) {
                        that.is_collect = true;
                    } else {
                        that.is_collect = false;
                    }
                    alert(res.msg)
                }
            });
        },
        getData: function () {
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/activity/detail",
                data: {
                    detail: activeID,
                    category: 'crowdfunding'
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == '1001') {
                        that.list = data.data;
                        that.activity_id = that.list.id;
                        that.dangwei = data.data.product
                        that.isCollect(that.activity_id);
                    }
                }
            });
        },
        isCollect:function (product_id) {
            var that = this;
            ajaxPost(window.globalResURL + "/favorite/isCollect", {'assoc_table':'activity',product_id:product_id},function (result) {
                if (result.status == 1) {
                    that.is_collect = true;
                }
            });
        }
    },

});
