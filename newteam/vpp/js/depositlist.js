var vue = new Vue({
    el: '#app',
    data: {
        user_id: '',
        list: [],
        page: 1,
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
        getData: function (currentPage) {
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
                            'user_id': user_id,
                            'page': currentPage
                        },
                        dataType: 'json',
                        success: function (res) {
                            res.list.forEach(function (ele, i) {
                                that.list.push(ele);
                            });
                            that.currentPage = res.page;
                            that.pageCount = res.pageCount;
                        }
                    });
                }
            });
        },
        //加载更多
        handleScroll(data) {
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
            console.log(1)
            this.handleTopChange("loading");//下拉时 改变状态码
            this.currentPage = 1;
            this.allLoaded = false;
            this.list = [];
            setTimeout(() => {
                this.getData(1);
                this.handleTopChange("loadingEnd");
                this.$refs.loadmore.onTopLoaded();
            }, 500);
        },
    },
    mounted() {
        this.getData(this.currentPage)
        window.addEventListener('scroll', this.handleScroll, true)
        this.wrapperHeight = document.documentElement.clientHeight;
    },
})