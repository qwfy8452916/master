$(function () {
    $(document).on('click', '.pricesl .djshouc', function () {
        var code = $(this).attr('data-code');
        var shujvlength=$('.dropdown li').length;
          if(shujvlength==1){
              window.location.reload();
            }
        $.ajax({
            url: cancelCollect,
            type: 'POST',
            data: {code: code},
            dataType: 'json',
            success: function (data) {
                if (data.status == 1) {
                    layer.msg(data.info, {time: 1300}, function () {
                        $('li.code'+code).remove();
                        if($("body").height()<$("html").height()){
                          $("#body-wrap").height($("html").height() - $("#footer").outerHeight())
                        }
                    });
                } else {
                    layer.msg(data.info, {time: 1300});
                }
            },
            error: function () {
                layer.msg('不知道哪里出错了~', {time: 1300});
            }
        });
    });
});