$(function () {
    var Global_UploadImg_url = "/house/design/add/do";
    var $publishBtn = $("span[data-name='publish']"),
        $orderNoInput = $("#order_no"),
        leftSize = 9 - $("#number").val();
    var type = $("#imgtype").val();

    $publishBtn.on("click", publishDesign);
    var uploadCustomFileList = [];
    var uploadCount = 0;
    var uploadSuccess = false;
    weui.uploader('#uploaderCustom', {
        url: '/img/upload',
        auto: true,
        onBeforeQueued: function(files) {
            // if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
            //     weui.alert('请上传图片');
            //     return false; // 阻止文件添加
            // }
            if(this.size > 6 * 1024 * 1024){
                weui.alert('请上传不超过6M的图片');
                return false;
            }
            // if (files.length > 3) { // 防止一下子选择过多文件
            //     weui.alert('最多只能上传3张图片，请重新选择');
            //     return false;
            // }
            uploadSuccess = false
            if (uploadCount + 1 > leftSize) {
                $('.zuiduo').show();
                return false;
            }

            ++uploadCount;

            // return true; // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function() {
        },
        onSuccess: function (res) {
            if(res.error_code==0){
                // console.log(this);
                uploadCustomFileList.push({
                    img: res.data,
                    id: this.id
                });
                uploadSuccess = true;
                // if( !($._data($publishBtn[0], 'events') && $._data($publishBtn[0], 'events')['click']) ){
                //     $publishBtn.on("click", publishDesign);
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
                    // 删除之后小于9张隐藏提示
                    if(uploadCount <= leftSize){
                        $('.zuiduo').hide();
                    }
                });
            }
        });
    });

    function publishDesign(event){

        if( $("#uploaderCustomFiles").find("li").length<=0){
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
                house_design: uploadCustomFileList,
                order_no: $orderNoInput.val(),
                type:type
            },
            successCallback: function (res) {
                if(res.error_code==0){
                    location.href = "/order/house/design?order_no="+$orderNoInput.val()+"&type="+type;
                }
            },
            failCallback: function (res) {
                $.toptip("网络异常，请稍后重试！");
            }
        })
    }
})
