$(function(){

    $('.tijiaoniu .tijiao').click(function() {
            var reg =/^[^\s\d\$\*\+@!！，,.。：:'"？?`~!@#/%\^&-=][^\s\d]{1,}[\u4E00-\u9FA5\uf900-\ufa2d\a-z\A-Z]{2,10}/;
            var nichengval=$.trim($('.newname .nameinput').val());

            if(nichengval!=""){

                   if(reg.test(nichengval)){
                    $('.nichengms .redtishi').hide();
                    $.ajax({
                        url: change_nickname,
                        type: 'POST',
                        data: {nick_name:nichengval},
                        dataType: 'json',
                        success: function (data) {
                            if (data.status == 1){
                                layer.msg(data.info,{time: 1300},function () {
                                    $('.phonewaik .redtishi').html("");
                                    window.location.href = location_url;
                                });
                            }else{
                                $('.phonewaik .redtishi').html(data.info).show();
                            }
                        },
                        error:function () {
                            layer.msg('不知道哪里出错了~',{time: 1300});
                        }
                    });
                 }else{
                    $('.nichengms .redtishi').html("请输入正确的昵称").show();
                 }
           }else{
             $('.nichengms .redtishi').html("昵称不能为空").show(); 
           }

        
        });




});