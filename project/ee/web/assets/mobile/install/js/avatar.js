$(function () {
    var Global_Avatar_Url = "/userset/saveheadimage";
    var $avatar = $("img[data-name='avatar']");
    weui.uploader('#uploaderCustom', {
        url: '/userset/upload',
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
            // if (uploadCount + 1 > leftSize) {
            //     $('.zuiduo').show();
            //     return false;
            // }
            //
            // ++uploadCount;

            // return true; // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function() {
        },
        onSuccess: function (res) {
            console.log(res);
            if(res.error_code==0){
                $avatar[0].src = "http://"+res.data;
                ajaxAction({
                    url: Global_Avatar_Url,
                    method: "post",
                    data: {
                        headimage: res.data
                    },
                    successCallback: function (res) {
                        $.toptip("修改成功", "success")
                    }
                })
            }
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

    });
})
