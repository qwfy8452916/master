$(function () {
    var Global_UploadImg_url = "/build/edit/add";
    var $orderStatusInput = $("input[data-name='order-status']"),
        $publishBtn = $("span[data-name='publish']"),
        $buildRemarkTextArea = $("#build_remark"),
        $orderNoInput = $("#order_no"),
        $buildStatus = $("#build_status");
    $publishBtn.on("click", publishStatus);
    initBuildStatus();


    $orderStatusInput.on('click', function (event) {
        event.preventDefault();
        var _this = this;
        weui.picker([{
            label: '1.开工大吉',
            value: 2
        }, {
            label: '2.主体拆改',
            value: 3
        }, {
            label: '3.水电整改',
            value: 4
        }, {
            label: '4.防水施工',
            value: 5
        }, {
            label: '5.泥瓦工程',
            value: 6
        }, {
            label: '6.木工进场',
            value: 7
        }, {
            label: '7.厨卫吊顶',
            value: 8
        }, {
            label: '8.油漆粉刷',
            value: 9
        }, {
            label: '9.铺贴壁纸',
            value: 10
        }, {
            label: '10.成品安装',
            value: 11
        }, {
            label: '11.保洁收尾',
            value: 12
        }, {
            label: '12.家具进场',
            value: 13
        }, {
            label: '13.家电进场',
            value: 14
        }, {
            label: '14.家居配饰',
            value: 15
        }, {
            label: '15.交付工程',
            value: 16
        }], {
            title:'订单状态',
            className: 'custom-classname',
            onChange: function (result) {
                //console.log(item, index);
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                $(_this).val(result[0].label);
                $(_this).attr('data-values',result[0].value);
            },
            id: 'picker'
        });
    });

    var uploadCustomFileList = [];
    var uploadCount = 0;
    var uploadSuccess = false;
    weui.uploader('#uploaderCustom', {
        url: '/build/img/upload',
        auto: true,
        onBeforeQueued: function(files) {
            // if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
            //     weui.alert('请上传图片');
            //     return false; // 阻止文件添加
            // }
            // if(this.size > 10 * 1024 * 1024){
            //     weui.alert('请上传不超过10M的图片');
            //     return false;
            // }
            // if (files.length > 3) { // 防止一下子选择过多文件
            //     weui.alert('最多只能上传3张图片，请重新选择');
            //     return false;
            // }
            uploadSuccess = false;
            if (uploadCount + 1 > 9) {
                $('.zuiduo').show();
                return false;
            }

            ++uploadCount;

            // return true; // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function() {
        },
        onSuccess: function (res) {
            // console.log(res);
            if(res.error_code==0){
                uploadCustomFileList.push({
                    img: res.data,
                    id: this.id
                });
                uploadSuccess = true;
                // if( !($._data($publishBtn[0], 'events') && $._data($publishBtn[0], 'events')['click']) ){
                //     $publishBtn.on("click", publishStatus);
                // }
            }
        },
        onError: function(err){
            $.toptip("网络异常，请稍后重试！")
        }
    });

    // 缩略图预览
    document.querySelector('#uploaderCustomFiles').addEventListener('click', function(e){
        var target = e.target;

        while(!target.classList.contains('weui-uploader__file') && target){
            target = target.parentNode;
        }
        if(!target) return;

        var url = target.getAttribute('style') || '';
        var id = target.getAttribute('data-id');

        if(url){
            url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
        }
        // console.log(url)
        // console.log(id)
        var gallery = weui.gallery(url, {
            onDelete: function(){
                weui.confirm('确定删除该图片？', function(){
                    var index;
                    for (var i = 0, len = uploadCustomFileList.length; i < len; ++i) {
                        var file = uploadCustomFileList[i];
                        if(file.id == id){
                            index = i;
                            break;
                        }
                    }
                    if(index !== undefined) uploadCustomFileList.splice(index, 1);

                    target.remove();
                    gallery.hide();
                    // 删除需要递减
                    uploadCount--;
                    // 删除之后小于3张隐藏提示
                    if(uploadCount <= 9){
                        $('.zuiduo').hide();
                    }
                });
            }
        });
    });

    /**
     * 发布施工状态
     * @param event
     */
    function publishStatus(event){
        var orderStatus = $orderStatusInput.val();
        if( !orderStatus ){
            $.toptip("请选择施工状态");
            return;
        }
        if(!uploadSuccess){
            $.toptip("图片处理中，请稍后");
            return;
        }
        $.showLoading("上传中，请稍后");
        ajaxAction({
            url: Global_UploadImg_url,
            method: "post",
            data: {
                build_state: $orderStatusInput.attr("data-values"),
                remark: $buildRemarkTextArea.val(),
                build_design: uploadCustomFileList,
                order_no: $orderNoInput.val()
            },
            successCallback: function (res) {
                if(res.error_code==0){
                    location.href = "/order/build/list?order_no="+$orderNoInput.val();
                }else if(res.error_code==820401){
                    $.toptip("抱歉，该状态已上传，请选择其他状态！", "error")
                }
                $.hideLoading();
            }
        })
    }

    function initBuildStatus() {
        var data = JSON.parse($buildStatus.val());
        $orderStatusInput.val(data.name).attr("data-values", data.id);
    }
})
