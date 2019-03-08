var app = new Vue({
    el: '#app',
    data: {
       
    },
    mounted() {
        var that = this;
        $.ajax({
            type: "GET",
            url: window.globalResURL + "/user/get_info",
            success: function (data) {
                that.user_id = data.data.id;
            }
        });
    },
    methods: {
        search: function () {
            var that = this;
            $.ajax({
                type: "GET",
                url: window.globalResURL + "/pay/apply_record",
                data: {
                    'user_id': that.user_id
                },
                success: function (data) {
                    console.log(data)
                }
            });
            go('../deposit/depositlist.html');
        }

    }
})