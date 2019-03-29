var orderinfoid = getParam('order_info_id');
var app = new Vue({
    el: "#app",
    data: {
        showToast: false,
        list: [
            '与商家协商一致退款',
            '大小/尺寸/重量与商品描述不符',
            '生产日期/保质期与商品描述不符',
            '品种/产地/规格/成分等描述不符',
            '商品变质',
            '少件/漏件',
            '包装/商品破损',
            '卖家发错货'
        ],
        is_select: false,
        searchIndex: 0,
        goodsInfo: {},
        title: '请选择',
        content: '请选择',
        is_received: 1,
        refund: {
            des: ""
        },
        submitInfo: [],
        img: [],
        img_url: '',
        fileList: [],
        url: '',
        dialogImageUrl: '',
        dialogVisible: false,
    },
    mounted() {
        var that = this;
        that.getData();
    },
    methods: {
        handlePreview(file) {
            console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
            console.log(this.dialogImageUrl);
        },
        showMask: function () {
            this.showToast = true;
        },
        cancleMask: function () {
            this.showToast = false;
        },
        select: function (item, index) {
            this.searchIndex = index;
            this.title = item;
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
        // 确定
        confirm: function () {
            this.showToast = false;
            this.content = this.title;
        },
        // 提交申请
        apply: function () {
            var that = this;
            if (that.content == '请选择') {
                alert('请选择退款原因');
                return false;
            }
            var token = getData('TOKEN');
            var url = window.globalResURL + '/order/apply_refund?token=' + token;
            // var params = new URLSearchParams();
            let params = new FormData();
            params.append('order_info_id', orderinfoid);
            params.append('is_received', that.is_received);
            params.append('order_status', 2);
            params.append('reason', that.content);
            params.append('user_desc', that.refund.des);
            params.append('address_id', 0);
            params.append('images', that.img_url);
            for (i = 0; i < that.img.length; i++) {
                params.append(i, that.img[i]);
            }

            axios({
                method: 'POST',
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (res) {
                if (res.data.code == '1001') {
                    that.submitInfo = res.data.data;
                    that.refundid = res.data.data.id;
                    go('back_detail.html?id=' + that.refundid);
                }
            }).catch(err => {
                console.log(err)
            });
        },
        uploads() {
            let reader = new FileReader();
            arr = [];
            if (event.target.files.length > 3) {
                alert('最多上传三张图片');
                return;
            }
            for (i = 0; i < event.target.files.length; i++) {
                arr.push(event.target.files[i]);
                $("#imgBox").append("<img src='" + URL.createObjectURL($(".imgInput")[0].files[i]) + "'>");
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
        },
        handleRemove(file, fileList) {
            var that = this;
            that.img_url = '';
            var arr = [];
            for (i = 0; i < fileList.length; i++) {
                arr.push(fileList[i].response.data);
            }
            that.img_url = arr.join(',');
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
    }
})