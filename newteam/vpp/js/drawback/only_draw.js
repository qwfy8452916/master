var orderinfoid = getParam('order_info_id');
var app = new Vue({
    el: "#app",
    data: {
        showToast: false,
        showToast1: false,
        showToast2:false,
        list: [
            '不喜欢/不想要',
            '空包裹',
            '未按约定时间发货',
            '快递/物流一直未到',
            '快递/物流无跟踪记录',
            '货物破损已拒签'
        ],
        goodslist:[
            '与商家协商一致退款',
            '大小/尺寸/重量与商品描述不符',
            '生产日期/保质期与商品描述不符',
            '品种/产地/规格/成分等描述不符',
            '商品变质',
            '少件/漏件',
            '包装/商品破损',
            '卖家发错货'
        ],
        searchIndex: 0,
        searchIndex1: 0,
        goods: [
            '未收到货',
            '已收到货'
        ],
        goodsInfo: {},
        title1: '未收到货',
        title: '不喜欢/不想要',
        content: '请选择',
        content1: '请选择',
        refund: {
            des: ''
        },
        is_received: 0,
        img: [],
        img_url: '',
        fileList: [],
        url: '',
        dialogImageUrl: '',
        dialogVisible: false

    },
    mounted() {
        var that = this;
        that.getData();
    },
    methods: {
        showMask: function () {
            this.showToast = true;
        },
        showMask1: function () {
            this.showToast1 = true;
        },
        cancleMask: function () {
            this.showToast = false;
        },
        cancleMask1: function () {
            this.showToast1 = false;
        },
        select: function (item, index) {
            this.searchIndex = index;
            this.title = item;
        },
        select1: function (item, index) {
            this.searchIndex1 = index;
            this.title1 = item;
            this.is_received = index;
        },
        // 获取数据
        getData: function () {
            var that = this;
            var token = getData('TOKEN');
            that.token = token;
            var url = window.globalResURL + '/order/refund_page?token=' + token;
            that.url = window.globalResURL + '/order/upload_images?token=' + token;
            var params = new URLSearchParams();
            params.append('order_info_id', orderinfoid);
            axios({
                method: 'POST',
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                if (res.data.code = '1001') {
                    that.goodsInfo = res.data.data;
                }
            }).catch(err => {
                console.log(err)
            });
        },
        // 提交申请
        apply: function () {
            var that = this;
            if (that.content == '请选择') {
                alert('请选择退款原因');
                return false;
            }
            if (that.content1 == '请选择') {
                alert('请选择货物状态');
                return false;
            }
            var token = getData('TOKEN');
            var url = window.globalResURL + '/order/apply_refund?token=' + token;
            // var params = new URLSearchParams();
            let params = new FormData();
            params.append('order_info_id', orderinfoid);
            params.append('is_received', that.is_received);
            params.append('order_status', 1);
            params.append('reason', that.content);
            // params.append('reason', that.content1);
            params.append('user_desc', that.refund.des);
            params.append('images', that.img_url);
            // for (i = 0; i < that.img.length; i++) {
            //     params.append(i, that.img[i]);
            // }
            if(that.img.length>3){
                alert('最多上传三张图片');
                return;
            }
            console.log(that.img.length);
            axios({
                method: 'POST',
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                alert(res.data.msg);
                if (res.data.code == '1001') {
                    that.submitInfo = res.data.data;
                    that.refundid = res.data.data.id;
                    go('back_detail.html?id=' + that.refundid);
                }
            }).catch(err => {
                console.log(err)
            });
        },
        // 退款原因确定
        confirm: function () {
            this.showToast = false;
            this.content = this.title;
        },
        // 货物状态确定
        confirm1: function () {
            this.showToast1 = false;
            this.content1 = this.title1;
        },
        uploads() {
            let reader = new FileReader();
            arr = [];
            if( event.target.files.length>3){
                alert('最多上传三张图片');
                return;
            }
            for (i = 0; i < event.target.files.length; i++) {
                arr.push(event.target.files[i]);
                $("#imgBox").append("<img src='"+URL.createObjectURL($(".imgInput")[0].files[i])+"'>");
            }
           
            this.img = arr;         
        },
        handleAvatarSuccess(res, file, fileList) {
            var that = this;
            var arr = [];
            for (i = 0; i < fileList.length; i++) {
                arr.push(fileList[i].response.data);
            }
            that.img_url = arr.join(',');
            console.log(that.img_url)
        },
        handleRemove(file, fileList) {
            var that = this;
            that.img_url = '';
            var arr = [];
            for (i = 0; i < fileList.length; i++) {
                arr.push(fileList[i].response.data);
            }
            that.img_url = arr.join(',');
            console.log(that.img_url)

        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        }
    }
})