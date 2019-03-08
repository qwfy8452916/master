var app = new Vue({
    el: '#app',
    data: {
        list: [],
        category: [],
        serachindex: 0
    },
    methods: {
        goDetail: function (id) {
            go("./spa/index.html?id=" + id);
        },
        getData: function (cat_id) {
            var that = this;
            $.ajax({
                type: "GET",
                url: window.globalResURL + "/thematic/index",
                data: {
                    cat_id: cat_id
                },
                success: function (data) {
                    data = JSON.parse(data);
                    that.list = data.data.list;
                    that.category = data.data.category;
                }
            })
        }
    },
    mounted() {
        this.getData(); 
    }
})
