
var app = new Vue({
    el: '#app',
    data: {
        showMask:false
    },
    methods: {
        showToast:function () {
            this.showMask=true;
        },
        cancelClick:function () {
            this.showMask=false
        }
    },
    mounted(){
        // 初始化 swiper
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true,
            autoplay: true,
            pagination: {
                el: '.swiper-pagination',
            }
        });

    }
});
