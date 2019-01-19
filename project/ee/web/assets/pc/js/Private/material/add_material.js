/*
* @Author: qz_xsc
* @Date:   2018-09-07 09:22:54
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-09-30 13:58:38
*/
;$(function(){
    $(".buy-date").datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss'
    });

    $(".send-date").datetimepicker({
         format: 'yyyy-mm-dd hh:ii:ss'
    });

    var clickAble=true;
    //保存验证
    $("#save-order").on("click",function(){
        $(".tishi").html("");
        var yzname=$("#yzname");
        var gysname=$("#gysname");


        if(yzname.val()==0||yzname.val()==""||yzname.val()==null){
            yzname.siblings(".tishi").text("请选择业主");
            yzname.focus();
            return false;
        }

        if(gysname.val()==0){
            gysname.focus();
            gysname.parent("td").next("td").find(".tishi").text("请选择供应商");
            return false;
        }

        var lastTr=$("#mater-list .mtr");
        var mname=true,mamount=true,mprice=true,mpiaoju=true;
        $.each(lastTr,function(index, ele) {
            var td=$(ele).find('.mname');
            if(td.val().trim()==""){
                td.focus();
                td.after("<div class='tishi' style='margin-left:30px;height:0px; text-align:left;'>请输入材料名称</div>");
                mname=false;
                return false;
            }
        });

        if(!mname){
            return false;
        }

         $.each(lastTr,function(index, ele) {
            var num=$(ele).find('.mamount');
            var price=$(ele).find('.mprice');
            var piaoju=$(ele).find('.piaoju');
            if(num.val().trim()>99999999){
                num.focus();
                num.after("<div class='tishi' style='margin-left:10px;height:0px; text-align:left;'>数量不能大于99999999</div>");
                mamount=false;
                return false;
            }
            if(price.val().trim()>99999999.99 ){
                price.focus();
                price.after("<div class='tishi' style='margin-left:10px;height:0px; text-align:left;'>单价不能大于99999999.99</div>");
                mprice=false;
                return false;
            }
            var floatNum=/^[0-9]+(.[0-9]{1,2})?$/;
            if(!floatNum.test(price.val().trim())&&price.val()!=""){
                price.focus();
                price.after("<div class='tishi' style='margin-left:10px;height:0px; text-align:left;'>最多只能保留两位小数</div>");
                mprice=false;
                return false;
            }
            var reg=/^[\d\s-]{1,}$/;
            if (!reg.test(piaoju.val().trim())&&piaoju.val()!=""){
                piaoju.focus();
                piaoju.after("<div class='tishi' style='margin-left:10px;height:0px; text-align:left;'>只能输入数字, 横杠或空格</div>");
                mpiaoju=false;
                return false;
            }

        });

        if(!mamount||!mprice||!mpiaoju){
            return false;
        }

        var erp_id = $("#erp_id").text();
        var category = $('select[name=category]').val();
        var supplier = $('select[name=supplier]').val();
        var suppliername =  $('select[name=supplier]').find("option:selected").text();
        var material_id =$('input[name=material_id]').val();
        //获取材料
        var jsonmaterial = new Array();
        $('.mtr').each(function(i){
            var that = $(this);
            var mname = that.find('.mname').val();
            var mamount =  that.find('.mamount').val();
            var mprice =  that.find('.mprice').val();
            var mbuytime = that.find('.mbuytime').val();
            var msendtime = that.find('.msendtime').val();
            var piaoju = that.find('.piaoju').val();
            var id = that.find('.material_id').val();
            jsonmaterial.push({"mname":mname,"mamount":mamount,"mprice":mprice,"mbuytime":mbuytime,"msendtime":msendtime,"piaoju":piaoju,'id':id});
        })


        if(!clickAble){
            return false;
        }
        clickAble=false;
        $.ajax({
            url: '/material/edit/',
            type: 'POST',
            dataType: 'JSON',
            data: {erp_id: erp_id, category: category,supplier:supplier,suppliername:suppliername,material:jsonmaterial,material_id:material_id}
        })
        .done(function(data) {
            if(data.error_code == 0){
                tishitip('操作成功',1);
                setTimeout(function(){
                    window.location.href="/material/";
                },1000);
            }else{
                clickAble=true;
                tishitip(data.error_msg,2);
            }
        })
        .fail(function(xhr) {
            tishitip('发生未知错误，请稍后重试~',2);
            clickAble=true;
            return false;
        })


    });



    $("body").on('input propertychange',".mamount", function(e){
        //数量验证
        var array = $(this).val().split(".");

        if(array.length>1){

            $(this).val(array[0])
        }
        if($(this).val().length>11){
            $(this).val($(this).val().slice(0,11));
            return;
        }
        var num = e.originalEvent.data;
        if(isNaN(num)||num==" "){
            $(this).val($(this).val().replace(num,""));
        }
    });

    $("body").on('input propertychange',".mprice", function(e){

        //价格验证
        if($(this).val().length>11){
            $(this).val($(this).val().slice(0,11));
            return;
        }
        var price = e.originalEvent.data;
        if(isNaN(price)&&price!="."){
            $(this).val($(this).val().replace(price,""));
        }else{
            if($(this).val().indexOf(".")!=-1){
                var val=$(this).val().split(".");
                if(val.length ==2 && val[1].length>2){
                   $(this).val($(this).val().slice(0,$(this).val().length-1))
                }else if(val.length>2){
                    var str="";
                    str=val[0]+".";
                    $(this).val(str);
                }
            }
        }
    });

    $("body").on('input propertychange',".piaoju",function(e){
        //票据验证
        $(this).next(".tishi").remove();
        //18位验证
        if($(this).val().length>18){
            $(this).val($(this).val().slice(0,18));
            return;
        }
        var code=e.originalEvent.data;
        if(typeof code != 'undefined'){
            if(isNaN(code)&&code!="-"&&code!=" "){
                 $(this).val("");
            }
        }
    })





    //添加材料
    $("#add-material-btn").on("click",function(){
        var tr="<tr class='mtr'><td><input type='text'  class='mname'  placeholder='请输入材料名称' maxlength='20'><input type='hidden'  class='material_id' ></td><td><input type='text' placeholder='输入数量' class='mamount' ></td><td><input type='price' class='mprice' placeholder='请输入单价'></td><td><input  type='text' class='buy-date mbuytime'><i class='fa fa-calendar'></i></td><td><input type='text' class='send-date msendtime'><i class='fa fa-calendar'></i></td><td><input type='text' class='piaoju' placeholder='请输入票据单号'></td><td><span class='p-delete p-delete-one'>删除</span></td></tr>";
        $("#mater-list").append(tr);
        $(".buy-date").datetimepicker({
             format: 'yyyy-mm-dd hh:ii:ss'
        });
        $(".send-date").datetimepicker({
             format: 'yyyy-mm-dd hh:ii:ss'
        });
    });




    //删除材料
    $("#mater-list").on("click",".p-delete-one",function(){
        var that=$(this);
        that.parents("tr").remove();
    });

    $("#mater-list").on("click",".p-delete-true",function(){
        var that = $(this);
        var material_id =that.data("id");
        $.ajax({
            url: '/material/delmaterial/',
            type: 'POST',
            dataType: 'JSON',
            data: {material_id:material_id}
        })
            .done(function(data) {
                if(data.error_code == 0){
                    that.parents("tr").remove();
                }else{
                    tishitip(data.error_msg,2);
                }
            })
            .fail(function(xhr) {
                tishitip('发生未知错误，请稍后重试~',2);
                return false;
            })
    });
});