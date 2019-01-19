 /*
* @Author: qz_xsc
* @Date:   2018-09-06 11:44:30
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-10-15 17:13:55
*/


// 表单验证

var clickAble=true;
$("#save-btn").on("click",function(){
    $(".tishi").text("");
    $('.bank-ts').remove();
    var staffname=$('input[name=staffname]'); //供应商名称
    var province=$('select[name="province"]'); //供应商地址
    var add_detail=$('input[name=add_detail]');//供应商详细地址
    var types =function(){                           //供应商分类
        var spans=$("#types").find(".supp-item-active");
        return spans;
    }();
    //获取选中的分类
    var jsonCategory = new Array();
    $(".supp-item").each(function(index, element) {
        if($(this).attr('data-select') == 1){
            jsonCategory.push($(this).attr('data-value'));
        }
    })


    var link_name=$('input[name=link_name]');  //联系人姓名
    var phone_number=$('input[name=phonenumber]'); //手机号
    var weixinnumber=$('input[name=weixinnumber]'); //微信号
    var email=$('input[name=email]'); //微信号
    var pay_methods=$("select[name=pay_methods]");  //结算方式
    var pay_zfb=$("input[name=pay_zfb]");  //支付宝账号
    var pay_wx=$("input[name=pay_wx]");//微信账号

    if(staffname.val().trim()===''){
        tips_yz(staffname,"请输入供应商名称");
        return false;
    }

    if(province.val()=='0'){
        tips_yz(province,"请选择省/市");
        return false;
    }



    if(add_detail.val().trim().length>30){
        tips_yz(add_detail,"最大长度为30位字符");
        return false;
    }
    if(types.length==0){
        tips_yz($("#types"),"请选择供应商分类");
        return false;
    }
    if(link_name.val().trim()===''){
        tips_yz(link_name,"请输入联系人姓名");
        return false;
    }
    if(phone_number.val().trim()===''){
        tips_yz(phone_number,"请输入联系人手机号");
        return false;
    }

    if(!telReg(phone_number.val().trim())){
        tips_yz(phone_number,"请输入正确的手机号");
        return false;
    }


    if(pay_methods.val()==='0'){
        tips_yz(pay_methods,"请选择结算方式");
        return false;
    }

    var inputList=$(".bank-list"),pass=true;

    $.each(inputList, function(index, value) {
        var num=0;
        $.each($(value).children("input"), function(chi_index, chi_value){
            var val=$(chi_value).val().trim();
            if(val!==''){
                num++
            }
        })
        //如果填了卡号, 但没有填满
        if(num>0&&num<3){
            $('.bank-ts').remove();
            $.each($(value).children("input"), function(chi_index, chi_value) {
                var val=$(chi_value).val().trim();
                if(val===''){
                    $(chi_value).focus();
                    var margin_left=chi_index*($(chi_value).width()+18)+95;
                    $(".bank-list").eq(index).append("<div class='bank-ts' style='color:#F5222D;font-size:14px; margin-left:"+margin_left+"px'>"+$(chi_value).data("text")+"</div>");
                    pass=false;
                    return false;
                }
            });
            return false;
        }

    });

    if(!pass){
        return false;
    }


    //获取银行账号
    var jsonBank = new Array();
    $('.bank-list').each(function(i){
        var that = $(this);
        var bankname = that.find('.bankname').val().trim();
        var bankopen =  that.find('.bankopen').val().trim();
        var bankaccount =  that.find('.bankaccount').val().trim();
        if(bankname!=""&&bankopen!=""&&bankaccount!=""){
            jsonBank.push({"bankname":bankname,"bankopen":bankopen,"bankaccount":bankaccount});
        }
    });
    if(!clickAble){
        return false;
    }
    clickAble=false;
    $.ajax({
        url: '/supplier/add/',
        type: 'POST',
        dataType: 'JSON',
        data: {data:$("#form-add").serializeArray(),category:jsonCategory,bank:jsonBank}
    })
        .done(function(data) {
            if(data.status == 0){
                tishitip("添加成功",1);
                setTimeout(function(){
                    window.location.href="/supplier/";
                },100);

            }else{
                tishitip(data.info,2)
            }
        })
        .fail(function(xhr) {
            tishitip('发生未知错误，请稍后重试~',2);
            clickAble=true;
            return false;
        })



});

// 新增银行账号
$(".addbtn").click(function() {
    // $(".bank-list").last().children('.bank-ts').remove();
    // var inputList=$(".bank-list").last().find("input");
    // var num=0;
    // $.each(inputList, function(index, value) {
    //     var val=$(value).val().trim();
    //     if(val===''){
    //         num++
    //         $(value).focus();
    //         $(".bank-list").last().append("<div class='bank-ts' style='color:#F5222D;font-size:14px; margin-left:"+index*($(value).width()+18)+"px'>"+$(value).data("text")+"</div>");
    //         return false;
    //     }
    // });
    // if(num==0){
    $(".bank-list").last().children('.tishi').remove();
    var bank_item="<div class='bank-list'><span class='spantitle b-fl'>&nbsp;</span><input type='text' class='p-input bankname'  placeholder='请输入账号名称' value='' data-text='请输入账号名称' maxlength='20'><input type='text' class='p-input bankopen' placeholder='请输入开户行' value='' data-text='请输入开户行' maxlength='20'><input type='text' class='p-input bankaccount' placeholder='请输入供应商银行账号' value='' data-text='请输入供应商银行账号'><span class='p-delete'>删除</span></div>";
    $(".bank-item").append(bank_item);
    // }

});


//删除银行账号
$(".pay-way").on("click",".p-delete",function() {
    $(this).parent(".bank-list").remove();
});

// 银行卡号长度拦截
$("body").on("input propertychange",".bankaccount",function(e){
    if($(this).val().length>20){
        $(this).val($(this).val().slice(0,20));
        return;
    }
    var num = e.originalEvent.data;
    if(isNaN(num)){
        $(this).val($(this).val().replace(num,""));
    }
});


//统一验证方法
function tips_yz(obj,text){
    obj.parents(".subcontent").find(".tishi").text(text);
    obj.focus();
}



$(function(){
    //供应商分类 选择
    $(".suppmetro").on("click",".supp-item",function(){
        var select=parseInt($(this).attr("data-select"));
        if(select==0){
            $(this).addClass("supp-item-active").attr("data-select",1);
        }else{
            $(this).removeClass("supp-item-active").attr("data-select",0);
        }
    });

    /*添加供应商分类*/

    $(".supp-item-plus").on("click",function(){
        $(".p-backbj").fadeIn();
        $(".p-tancfl").fadeIn();
    });



    $(".p-close, .cancelqx").on("click",function(){
        $(".p-backbj").fadeOut();
        $(".p-tancfl").fadeOut();
    });


    $(".savebc").on("click",function(){
       var add_text=$(".add_type_name");
       if(add_text.val()===""){
            add_text.parents(".contentnr").find(".mima-tishi").text("请选择供应商分类名称");
            return false;
       }
       var span="<span class='supp-item' data-select='0'>"+add_text.val()+"</span>";
       $(".supp-item-plus").before(span);
       $(".p-backbj").fadeOut();
       $(".p-tancfl").fadeOut();
    });
});