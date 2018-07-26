$(function () {
    $('.tijiaoniu .tijiao').click(function () {
        var data = {cs : $('input[name=city]').attr('data-id'),qx : $('input[name=area]').attr('data-id')};
        $.ajax({
            url: change_area,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.status == 1){
                    layer.msg(data.info,{time: 1300},function () {
                        window.location.href = location_url;
                    });
                }else{
                    layer.msg(data.info,{time: 1300});
                }
            },
            error:function () {
                layer.msg('不知道哪里出错了~',{time: 1300});
            }
        });
    });
});