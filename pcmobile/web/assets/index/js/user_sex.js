$(function () {

    $(document).on('click','.sexselect11',function(){
              if($('#x11').is(":checked")){
                $('.sexselect11 .nanshi').removeClass('iconhidden');
                $('.sexselect12 .nvshi').addClass('iconhidden')
              }
           });

           $(document).on('click','.sexselect12',function(){
              if($('#x12').is(":checked")){
                $('.sexselect11 .nanshi').addClass('iconhidden');
                $('.sexselect12 .nvshi').removeClass('iconhidden');
              }
           });



    $('.tijiaoniu .tijiao').click(function () {
        var data = {sex : $('input[name=sex]:checked').val()};
        if (!data.sex){
            layer.msg('请选择性别',{time: 1300});
            return false;
        }
        $.ajax({
            url: change_sex,
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