var orderinfoid = getParam('order_info_id');
var app = new Vue({
    el: "#app",
    data: {
        list: [],
        select: [
            '多拍/拍错/不想要', '缺货'
        ],
        searchIndex: 0,
        showToast: false,
        title: '多拍/拍错/不想要',
        content: '请选择',
        refund: {
            des: ''
        },
        refundid: '',
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
                that.list = res.data.data;
            }).catch(err => {
                console.log(err)
            });
        },
        //   选择退款原因
        choose: function (item, index) {
            this.searchIndex = index;
            this.title = item;
        },
        showMask: function () {
            this.showToast = true;
        },
        // 取消
        cancel: function () {
            this.showToast = false;
        },
        // 确定
        confirm: function () {
            this.showToast = false;
            this.content = this.title;
        },
        //提交申请
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
            params.append('is_received', 0);
            params.append('order_status', 0);
            params.append('reason', that.content);
            params.append('user_desc', that.refund.des);
            params.append('address', '');
            params.append('images', that.img_url);

            axios({
                method: 'POST',
                url: url,
                data: params,
                headers: {
                    'Content-Type': 'multipart/form-data'
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
});
