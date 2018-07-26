$(function(){
    $('.photo .touxiang').click(function(event) {
        $('.wrappic').fadeIn();
    });
    $('#head-img-cacel').click(function (event) {
        $('.wrappic').hide();
    });

    //实例化头像插件
    var clipArea = new bjj.PhotoClip("#clipArea", {
        size: [260, 260],
        outputSize: [640, 640],
        file: "#file",
        view: "#view",
        ok: "#clipBtn",
        loadStart: function () {

        },
        loadComplete: function () {

        },
        clipFinish: function (dataURL) {
            $('.wrappic').hide();

            var formdata = new FormData();
            formdata.append('upfile', base64ToBlob(dataURL));
            formdata.append('method', 'headimg');
            $.ajax({
                url: Img_upload,
                type: "post",
                data: formdata,
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function (data) {
                    if(data.err == 1){
                        layer.msg('修改失败',{time: 1300},function () {
                            $('.wrappic').hide();
                        });
                    }else{
                        layer.msg('修改成功',{time: 1300},function () {
                            $('.wrappic').hide();
                            //修改为上传后的头像
                            $('.touxiang img').attr('src', data.url);
                        });
                    }

                },
                error:function () {
                    layer.msg('不知道哪里出错了~',{time: 1300});
                }
            });
        }
    });

    //base64转成图片对象
    function base64ToBlob(urlData) {
        var arr = urlData.split(',');
        var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
        // 去掉url的头，并转化为byte
        var bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        var ia = new Uint8Array(ab);

        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        return new Blob([ab], {
            type: mime
        });

    }
});