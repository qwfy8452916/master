var tokenUrl = "?token=" + getData('TOKEN');
var alias = getParam('alias');
$(function () {
    var nav = $(".listHead").find("a");
    nav.on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
});

var app = new Vue({
    el: '#app',
    data: {
        list: new Array,
        keywords: '',
        dataCurPage: 1,
        loadMore: true,// 第一次加载数据时的正在加载
        loadMoreing: true,// 上拉加载数据时的正在加载
        shopNum: 0,
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        topStatus: '',
        currentPage: 1,
        total: 0,
        last_page: 0,

        topText: '',
        topPullText: '下拉刷新',
        topDropText: '释放更新',
        topLoadingText: '加载中...',
        bottomText: '',
        bottomPullText: '上拉刷新',
        bottomDropText: '释放更新',
        bottomLoadingText: '加载中...',
        sort_field: 'id',
        pageCount:1,
    },
    watch: {
        topStatus(val) {
            switch (val) {
                case 'pull':
                    this.topText = this.topPullText;
                    break;
                case 'drop':
                    this.topText = this.topDropText;
                    break;
                case 'loading':
                    this.topText = this.topLoadingText;
                    break;
            }
        },
        bottomStatus(val) {
            switch (val) {
                case 'pull':
                    this.bottomText = this.bottomPullText;
                    break;
                case 'drop':
                    this.bottomText = this.bottomDropText;
                    break;
                case 'loading':
                    this.bottomText = this.bottomLoadingText;
                    break;
            }
        }
    },
    methods: {
        //详情页
        toBuy: function (id) {
            go('../product/detail.html?id=' + id);
        },
        sort: function (price, order, page) {
            var that = this;
            that.loadMoreing = true;
            ajaxPost(window.globalResURL + "/product/ajax_list", {
                alias: alias,
                sort: price,  //price
                order: order,
                page: page
            }, function (res) {
                console.log(res);
                res.data.forEach(function (ele, i) {
                    that.list.push(ele);// 填充页面数据
                });
                this.dataCurPage = res.data.page;
                this.pageCount = res.data.pageCount;


            });
        },
        sortPrice: function () {
            this.allLoaded = false;
            this.list = [];
            this.sort('cx_price', 1);
            this.sort_field = 'cx_price';
        },
        sortOrigin: function () {
            this.allLoaded = false;
            this.list = [];
            this.sort('id', 1);
            this.sort_field = 'id';
        },
        sortBuy: function () {
            this.allLoaded = false;
            this.list = [];
            this.sort('pay_num', 1);
            this.sort_field = 'pay_num';
        },
        // 搜索
        searchGoods: function () {
            var that = this;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/product/ajax_list",
                data: {
                    // cat_id: 8
                    keyword: that.keywords,
                    alias: alias
                },
                success: function (data) {
                    console.log(data);
                    that.list = data.data;
                }
            });
        },
        // 购物车功能
        toShopCar: function () {
            go("../shopcar.html");
        },
        addNum: function (id) {
            var that = this;
            var selectID = id;
            // this.isActive=true;
            $.ajax({
                type: "POST",
                url: window.globalResURL + "/user/ajax_add_cart",
                data: {
                    product_id: selectID
                },
                success: function (data) {
                    console.log(data);
                    var res = JSON.parse(data);
                    if (res.code == '1001') {
                        that.shopNum++;
                        alert(res.msg);
                        return;
                    } else if (res.code == '2001') {
                        alert(res.msg);
                        return;
                    }
                }
            });
        },
        //加载更多
        handleScroll(data) { // 执行函数
            let bigTopSize = document.querySelector('.list').getBoundingClientRect().top;
            if (bigTopSize < 0) {
                this.wrapperHeight = "calc(100% - " + bigTopSize + "px)"
            } else {
                this.wrapperHeight = '100%'
            }
        },
        handleBottomChange(status) {
            this.bottomStatus = status;
        },
        loadBottom() {
            this.handleBottomChange("loading");
            setTimeout(() => {
                this.sort(this.sort_field, 1, this.dataCurPage + 1);
                if(this.currentPage >= this.pageCount){
                    this.allLoaded = true;
                }
                this.handleBottomChange("loadingEnd");
                this.$refs.loadmore.onBottomLoaded();
            }, 500);
        },
        handleTopChange(status) {
            this.topStatus = status;
        },

        loadTop() {
            this.handleTopChange("loading");//下拉时 改变状态码
            this.currentPage = 1;
            this.allLoaded = false;
            this.list = [];
            setTimeout(() => {
                this.sort(this.sort_field, 1, 1);
                this.handleTopChange("loadingEnd");
                this.$refs.loadmore.onTopLoaded();
            }, 500);
        },
    },
    mounted() {
        this.sort('id', 1, 1);
        window.addEventListener('scroll', this.handleScroll, true)
        this.wrapperHeight = document.documentElement.clientHeight;
    }
});
