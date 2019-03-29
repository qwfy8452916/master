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

            // 处理时间戳，转换时间
            function unixToStr(unix) {
                var nowTime = parseInt(new Date().getTime() / 1000);
                var remaining = parseInt(unix) - nowTime;
                if (remaining > 0) {
                    var timeH = remaining / 3600 < 10 ? '0' + parseInt(remaining / 3600) : parseInt(remaining / 3600);
                    var timeM = remaining / 60 % 60 < 10 ? '0' + parseInt(remaining / 60 % 60) : parseInt(remaining / 60 % 60);
                    var timeS = remaining % 60 < 10 ? '0' + remaining % 60 : remaining % 60;
                } else {
                    var timeH = '00';
                    var timeM = '00';
                    var timeS = '00';
                }
                // 输出倒计时
                time = {
                    h: timeH,
                    m: timeM,
                    s: timeS
                }
                return time;
            }
            if (res.data.code == '1001') {
                var timeRun = function(){
                    setTimeout(function () {
                        for (var i = 0; i < res.data.data.list.length; i++) {
                            var timeStr = unixToStr(res.data.data.list[i].end_date);
                            res.data.data.list[i].djs = timeStr.h + ':' + timeStr.m + ':' + timeStr.s;
                        }
                        that.list = res.data.data.list;
                        timeRun();
                    }, 1000);
                }
                timeRun();
            }


        })
    },
    methods: {
        toBargin: function (id, product_id) {
            go('../../view/bargain/detail.html?id=' + id + '&product_id=' + product_id);
        }
    }
})