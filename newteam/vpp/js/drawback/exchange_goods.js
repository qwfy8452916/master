var orderinfoid = getParam('order_info_id');
var app = new Vue({
    el: "#app",
    data: {
        list: {},
        addressInfo: {},
        code: '',
        refund: {
            des: ''
        },
        content: '七天无理由换货',
        addressid: '',
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
        // 获取数据
        getData: function () {
            var that = this;
            var token = getData('TOKEN');
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
                    that.list = res.data.data;
                    that.addressInfo = res.data.data.address;
                }
            }).catch(err => {
                console.log(err)
            });
        },
        // 提交申请
        apply: function () {
            var that = this;
            var token = getData('TOKEN');
            var url = window.globalResURL + '/order/apply_refund?token=' + token;
            // var params = new URLSearchParams();
            let params = new FormData();
            params.append('order_info_id', orderinfoid);
            params.append('is_received', 1);
            params.append('order_status', 3);
            params.append('reason', that.content);
            params.append('user_desc', that.refund.des);
            params.append('address', that.addressInfo.province + that.addressInfo.city + that.addressInfo.area + that.addressInfo.address);
            params.append('images', that.img_url);
            // for (i = 0; i < that.img.length; i++) {
            //     params.append(i, that.img[i]);
            // }
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
        // 选择地址
        goAddress: function () {
            go('../my/address.html')
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
        handlePreview(file) {
            console.log(file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }

    }
})
