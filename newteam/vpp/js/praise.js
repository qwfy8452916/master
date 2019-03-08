var app = new Vue({
        el: '#app',
        data: {
                list: [],
                userInfo: {}
        },
        methods: {
            showMore:function(index){
                    if($(".fullText").eq(index).text()=="收起"){
                        $(".fullText").eq(index).text('全文');
                        $("#desBox").eq(index).addClass("desBox");
                    }else{
                        $(".fullText").eq(index).text('收起');
                        $("#desBox").eq(index).removeClass("desBox");

                    }
                }
        },
        // 过滤时间
        filters: {
                getDate(time) {
                        if (!time) {
                                return '';
                        }
                        var newDate = new Date();
                        const cd = newDate.getTime() - time * 1000;
                        let result = '';
                        if (cd < 60000) {
                                result = '刚刚';
                        } else if (cd < 3600000) {
                                result = Math.ceil(cd / 60000) + '分钟前';
                        } else if (cd < 86400000) {
                                result = Math.round(cd / 3600000) + '小时前';
                        } else {
                                result = Math.round(cd / 86400000) + '天前';
                        }
                        return result;
                },
                
        },
        mounted() {
                var that = this;
                var token = getData('TOKEN');
                var url = window.globalResURL + '/article/sck_list?token=' + token;
                axios.get(url).then(function (res) {
                        that.list = res.data.data.list;
                        that.userInfo = res.data.data.user;
                        for (i = 0; i < that.list.length; i++) {
                                var time = that.list[i].created_at;
                        }
                })
        }
        })