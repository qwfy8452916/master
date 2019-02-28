// 初始化Web Uploader
var comFile = null;
var uploader = WebUploader.create({

  // 选完文件后，是否自动上传。
  auto: true,

  // swf文件路径
  swf: 'Uploader.swf',

  // 文件接收服务端。
  server:  '/img/upload',

  // 选择文件的按钮。可选。
  // 内部根据当前运行是创建，可能是input元素，也可能是flash.
  pick: '#filePicker',
  fileSingleSizeLimit: 6*1024*1024, //  单个文件大小
  pick: {
     id: '#filePicker',
      multiple:false
  },
  fileNumLimit: 1,
  // 只允许选择图片文件。
  accept: {
      title: 'Images',
      extensions: 'gif,jpg,jpeg,bmp,png',
      mimeTypes: 'image/*'
  }
});

// 当有文件添加进来的时候
uploader.on( 'fileQueued', function( file ) {
  var $li = $(
    '<div id="' + file.id + '" class="file-item thumbnail"><span class="delete-card delimgbtns"><i class="fa fa-close" aria-hidden="true"></i></span><img></div>'
    ),
  $img = $li.find('img');

  // $list为容器jQuery实例
  $("#fileList").append( $li );

  // 创建缩略图
  // 如果为非图片文件，可以不用调用此方法。
  // thumbnailWidth x thumbnailHeight 为 100 x 100
  uploader.makeThumb( file, function( error, src ) {
      if ( error ) {
          $img.replaceWith('<span>不能预览</span>');
          return;
      }
      $img.attr( 'src', src );
  }, 200, 120);
  // 删除
  $("body").on("click",".delete-card",function(){
    uploader.removeFile(file,true)
    $(this).parents(".file-item").remove();
    $("#card").val("");
    $("#filePicker").show();
  })
  $("#filePicker").hide();
});

// 文件上传过程中创建进度条实时显示。
uploader.on( 'uploadProgress', function( file, percentage ) {
  var $li = $( '#'+file.id ),
      $percent = $li.find('.progress span');

  // 避免重复创建
  if ( !$percent.length ) {
      $percent = $('<p class="progress"><span></span></p>')
              .appendTo( $li )
              .find('span');
  }

  $percent.css( 'width', percentage * 100 + '%' );
});

// 文件上传成功，给item添加成功class, 用样式标记上传成功。
uploader.on( 'uploadSuccess', function( file, response ) {
  $("#card").val(response.data);
  $( '#'+file.id ).addClass('upload-state-done');
  
});

// 文件上传失败，显示上传出错。
uploader.on( 'uploadError', function( file ) {
  var $li = $( '#'+file.id ),
      $error = $li.find('div.error');

  // 避免重复创建
  if ( !$error.length ) {
      $error = $('<div class="error"></div>').appendTo( $li );
  }

  $error.text('上传失败');
});
uploader.on("error", function (type) {
  if (type == "F_EXCEED_SIZE") {
    tishitip("文件大小不能超过6M",2)
 }
});

// 完成上传完了，成功或者失败，先删除进度条。
uploader.on( 'uploadComplete', function( file ) {
  $( '#'+file.id ).find('.progress').remove();
});
