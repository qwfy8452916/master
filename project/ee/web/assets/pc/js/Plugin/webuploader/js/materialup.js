//  图片webupload 上传

var $list;
var nowniu;
var inputurl;
function myUp(picCon,listCon){
   
    var $ = jQuery,
        // $list = $(listCon),
        // $filePicker = $(picCon), // 上传按钮
        $list = listCon,
        $filePicker = picCon,
        $upimgmax = 1, // 支持上传最大个数
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio,
        // 初始化Web Uploader
        uploader = WebUploader.create({
            // 自动上传。
            auto: true,
            // swf文件路径
            swf: '/assets/pc/js/Plugin/webuploader/js/Uploader.swf',
            // 文件接收服务端。
            server:"/material/img/upload",  //  这里是图片上传地址
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash
            pick: {
                id: $filePicker,
                multiple: false
            },
            duplicate: true,
            fileSingleSizeLimit: 6*1024*1024, //  单个文件大小
            fileNumLimit: $upimgmax, // 限制上传个数
            accept: {
                title: 'Images',
                extensions: 'jpg,jpeg,png,bmp',
                mimeTypes: 'image/jpg,image/jpeg,image/png,image/bmp' //修改这行
            },
            thumb: {
                width: 110,
                height: 110,
                // 图片质量，只有type为`image/jpeg`的时候才有效。
                quality: 70,
                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: true,
                // 是否允许裁剪。
                crop: true,
                // 为空的话则保留原有图片格式。
                // 否则强制转换成指定的类型。
                type: 'image/jpeg'
            }
        });
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function(file) {
        var $li = $(
                '<div id="' + file.id + '" class="file-item thumbnail">' +
                '<img>' +
                // '<div class="info">' + file.name + '</div>' +
                '<div class = "file-panel" style = "height: 30px;" >' +
                '<span class = "cancel delimgbtns" title="删除">删除</span></div>' +
                '</div>'
            ),
            $img = $li.find('img');
        $list.append($li);
        removefiles(file); // 文件删除
        // 创建缩略图
        uploader.makeThumb(file, function(error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
        var uploadfilesNum = uploader.getStats().queueNum; //  共选中几个图片
        // 最多支持 5张
        if ($('.file-item').length >= $upimgmax) {
            $filePicker.hide();
            if ($('.file-item').length >= ($upimgmax + 1)) {
                // 中断 取消 大于  5张图片的对象
                uploader.removeFile(file, true);
                // $('.file-item').last().remove();
            }
        } else {
            $filePicker.show();
        }
    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function(file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');
        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>').appendTo($li).find('span');
        }
        $percent.css('width', percentage * 100 + '%');
    });
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function(file, response) {
        console.log(response.data)
        inputurl.val(response.data)
        inputurl.siblings('.wrapniuwk').show();
        inputurl.siblings('.uploader-demo2').hide();
        var $li = $('#' + file.id),
            $img = $li.find('img'),
            $fileUrl = response.data[0].url, // 图片上传地址
            $filename = file.name, // 上传文件名称
            $filesize = (file.size / 1024).toFixed(2); // 上传文件尺寸大小 保留2位
        $li.addClass('upload-state-done');
        // console.log(file);
        // console.log(response);
        // console.log('图片地址:' + $fileUrl);
        $img.attr('src', $fileUrl);
        removefiles(file); // 删除文件
        removehttpfiles();
        // 传值赋值
        // 商品详细图片 位置
       // 这里自己赋值 传值
    });

    uploader.on("error", function (type) {
        if (type == "F_EXCEED_SIZE") {
           var tishixin="文件大小不能超过6M";
           tishitip(tishixin,2)
           // alert("文件大小不能超过6M");
       }else {
              console.log(type)
               // alert("上传出错！请检查后重新上传！错误代码"+type);
               // tishitip("上传出错！请检查后重新上传！错误代码"+type,2)
       }
   });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function(file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');
        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }
        $error.text('上传失败');
    });
    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function(file) {
        $('#' + file.id).find('.progress').remove();



        uploader.reset();
        // console.log(file);
        // 获取文件统计信息。返回一个包含一下信息的对象。
        /*successNum 上传成功的文件数
        progressNum 上传中的文件数
        cancelNum 被删除的文件数
        invalidNum 无效的文件数
        uploadFailNum 上传失败的文件数
        queueNum 还在队列中的文件数
        interruptNum 被暂停的文件数
        */
        // console.log(uploader.getStats().uploadFailNum);
    });
    uploader.on('error', function(handler) {
        if (handler == "Q_EXCEED_NUM_LIMIT") {
            // layer.msg("最多只能上传 " + $upimgmax + "张图片");
        }
    });
    // 删除按钮事件
    function removefiles(file) {
        // 删除本条数据
        // $('.delimgbtns').each(function(index, el) {
        $('.delimgbtns').click(function() {
            // 中断 取消 传图
            uploader.removeFile(file, true);
            var spthisdiv = $(this).parent();
            spthisdiv.parent('.file-item').remove();
            $filePicker.show(); // 上传按钮显示
        });
        // });
    }
    // 删除服务器文件
    function removehttpfiles() {
        // 删除本条数据
        // $('.delimgbtns').each(function(index, el) {
        $('.delimgbtns').click(function() {
            // event.preventDefault();
            var spthisdiv = $(this).parent();
            // 如果上传成功才执行
            var thisimgsrc = spthisdiv.siblings('img').attr('src');
            var geturl = "attach/deleteFlowFile";
            $.axpost(
                geturl, {
                    url: thisimgsrc,
                },
                //请求成功时处理
                function(data) {
                    layer.msg('删除成功');
                });
        });
        // });
    }

}

$("body").on("click",".filePicker",function(){
    nowniu=$(this);
    $list=$(this).prev(".fileList");
    console.log(this)
    // $('#save-btn').attr("disabled",true)
    $(this).closest('.p-panel').find('.savubaocun').attr("disabled",true)
    countnum=$list.find('.file-item').length;
    inputurl=$(this).closest('.tdpicwk').children('.picinput')

  });

// myUp('.filePicker','.uploader-list');
myUp($('.filePicker'),$('.uploader-list'));
