/*
* @Author: qz_xsc
* @Date:   2018-09-10 09:20:24
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-09-21 11:11:30
*/


;(function($){

    var parms={
        ajaxUrl:"",  //请求城市数据接口
        province:".province",
        city:".city"
    }

    $.fn.citySelect=function(options){
        // 参数合并
        var option=$.extend(parms,options);
        var pro=$(option.province);
        var cit=$(option.city);
        var cityData=[];
        $.ajax({
            url: '/supplier/getcitys/',
            type: 'GET',
            dataType: 'JSON'
        })
            .done(function(data) {
                if(data.status == 0){
                    cityData=data.data;
                    $.each(data.data,function(index,value){ //初始化省份
                        pro.append("<option id='"+value.id+"' value='"+value.id+"'>"+value.name+"</option>");
                    });
                    if(option.sheng!==""){
                        $("select[name=province]").val(option.sheng);
                        $.each(data.data,function(index,value){ //初始化省份
                           if(value.id===option.sheng){
                                var cities=value.city;
                                $.each(cities, function(index,cityVal) {
                                    cit.append("<option id='"+cityVal.id+"' value='"+cityVal.id+"'>"+cityVal.name+"</option>")
                                });
                           }
                        });
                        $("select[name=city]").val(option.shi);
                    }
                }else{
                  tishitip(data.info,2);
                }
            })
            .fail(function(xhr) {
                tishitip('发生未知错误，请稍后重试~',2);
                return false;
            })


        // 获取成功后
        pro.change(function() {
            cit.html("");
            var value=parseInt($(this).val());
            var cities=[];
            if(value==0){
                cit.append("<option value='0'>请选择</option>");
               // cit.val(0);
            }
            $.each(cityData,function(index,val){ //初始化省份
                var index=parseInt(index);
                if(index===value){
                    cities=val.city;
                    $.each(cities, function(index,cityVal) {
                        cit.append("<option id='"+cityVal.id+"' value='"+cityVal.id+"'>"+cityVal.name+"</option>")
                    });
                }
            });
        });
    }
})(jQuery);
