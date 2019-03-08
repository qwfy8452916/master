var vue = new Vue({
    el: '#app',
    data: {
        user_id: '',
        list: [],
    },
    mounted() {
        var that = this;
        $.ajax({
            type: "GET",
            url: window.globalResURL + "/user/get_info",
            success: function (data) {
                user_id = data.data.id;
                $.ajax({
                    type: "GET",
                    url: window.globalResURL + "/pay/apply_record",
                    data: {
                        'user_id': user_id
                    },
                    success: function (data) {
                        that.list = JSON.parse(data).data.list;
                    }
                });
            }
        });
    },
})