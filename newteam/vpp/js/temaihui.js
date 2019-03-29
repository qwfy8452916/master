var cat_id = getParam('cat_id');
var serachindex = getParam('index') ? getParam('index') : 0;
var app = new Vue({
    el: '#app',
    data: {
        list: [],
        category: [],
        serachindex: 0,

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
        pageCount: 1
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
        goDetail: function (id) {
            go("./spa/index.html?id=" + id);
        },
        getData: function (page) {
            var that = this;
            that.cat_id = cat_id;
            that.serachindex = serachindex;
            ajaxGet(window.globalResURL + "/thematic/index?cat_id=" + cat_id, { size: 10, page: page }, function (data) {
                data.data.list.forEach(function (ele, i) {
                    that.list.push(ele);// 填充页面数据
                });
                that.category = data.data.category;
                that.currentPage = data.data.page;
                that.pageCount = data.data.pageCount;
            });
        },
        goTo: function (cat_id, index) {
            go("./temaihui.html?cat_id=" + cat_id + '&index=' + index);
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
                this.getData(this.currentPage + 1);
                if (this.currentPage >= this.pageCount) {
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
                this.getData(this.currentPage);
                this.handleTopChange("loadingEnd");
                this.$refs.loadmore.onTopLoaded();
            }, 500);
        },
    },
    mounted() {
        this.getData(this.currentPage);
    }

})
