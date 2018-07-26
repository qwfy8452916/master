$(function () {
    $('.tijiaoniu .tijiao').click(function () {
        var yijianval = $.trim($('.yijianare .yijianms').val());
        var lianxifs = $.trim($('.yijianwaik .telawk input').val());
        var reg = /^[\u4e00-\u9fa5]{0,}$/;
        if (yijianval == '') {
            $('.yijianare .yijianms').focus();
            $('.yijianwaik .tihsims').html('请填写意见').show();
        }else if(lianxifs!=''&&reg.test(lianxifs)){
            $('.yijianwaik .tihsims').html('只可输入英文、数字或字符').show();
        } else {
            $('.yijianwaik .tihsims').html('').hide();
            layer.msg('提交成功', {time: 1300},function () {
                $('.yijianare .yijianms').val("");
                $('.yijianwaik .telawk input').val("")
                window.location.href = location_url;
            })
        }
    });
});