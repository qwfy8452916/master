$(function(){
    $('.exitlogin a').click(function() {
        $.ajax({
            url: Logout_url,
            type: "post",
            processData: false,
            contentType: false,
            success: function (data) {
                layer.msg(data.info,{time: 1300},function () {
                   window.location.href = '/';
                });
            },
            error:function () {
                layer.msg('不知道哪里出错了~',{time: 1300});
            }
        });
    });
});