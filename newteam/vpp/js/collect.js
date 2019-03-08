var app = new Vue({
    el: '#app',
    data: {
        list: []
    },
    methods: {
        getData: function () {
            var that = this;
            ajaxPost(window.globalResURL + "/favorite/myCollect", function (result) {
                if (result.code == 1001) {
                    that.list = result.data;
                }
            });
        }
    },
    mounted() {
        this.getData();
    }
})

$(function () {
    var collectBox = $(".collectBox");
    collectBox.on('touchstart', function (e) {
        x = event.changedTouches[0].pageX;
        y = event.changedTouches[0].pageY;
        swipeX = true;
        swipeY = true;
    })
    collectBox.on('touchmove', function (e) {
        X = event.changedTouches[0].pageX;
        Y = event.changedTouches[0].pageY;
        // 左右滑动
        if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
            event.stopPropagation();
            if (X - x > 10) {   //右滑
                event.preventDefault();
                $(this).find(".del").removeClass('delShow');
            }
            if (x - X > 10) {   //左滑
                event.preventDefault();
                $(this).find(".del").addClass('delShow');
                $(this).siblings().find(".del").removeClass('delShow');
            }
            swipeY = false;
        }
    })
})
