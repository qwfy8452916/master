<?php if (!defined('THINK_PATH')) exit();?><form id="fd_box_form" class="secbox_form" onsubmit="return false;">
    <div class="new_xsc_fadan">
        <div class="new_fadan_box">
            <div class="title_big">我家装修要花多少钱?</div>
            <div class="title_small">挤干水分 报价更准确</div>
        </div>
        <div class="fadan_form">
            <div class="input_line two_input">
                <select id="f_bj_cs" name="cs" class="pull-left"></select>
                <select id="f_bj_qx" class="pull-right" name="qx" class="pull-right"></select>
            </div>
            <i class='valdatemsg one'></i>
            <div class="input_line ">
                <input type="text" name="mianji" placeholder="输入您的房屋面积" />
                <i class="order-icon">㎡</i>
            </div>
            <i class='valdatemsg two'></i>
            <div class="input_line ">
                <input type="text" name="tel" placeholder="输入手机号获取报价结果" maxlength="11" />
                <input type="hidden" name="fb_type" value="baojia">
             </div>
            <i class='valdatemsg three'></i>

            <!--S-免责申明-->
                <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

            <!--E-免责申明-->
            <div class="input_line">
                <button tab-index="0" data-type="2"  type="button" id="tijiao_fadan">立即获取</button>
            </div>
        </div>

    </div>
</form>

<script type="text/javascript">
var shen = null,shi = null;
shen = citys["shen"];
shi = citys["shi"];

var ip_cityid = '<?php echo (cookie('iplookup')); ?>';
var city_id = '<?php echo ($theCityId); ?>';
(city_id == '') ? cityId = ip_cityid : cityId = city_id;
if(cityId == ''){
    getLocation();
}else{
    initCity(cityId);
}

function initCity(cityId){
    App.citys.init("#f_sj_cs","#f_sj_qx",shen,shi,cityId);
    App.citys.init("#f_bj_cs","#f_bj_qx",shen,shi,cityId);
}
$(function(){
    var container = $("#fd_box_form .new_xsc_fadan .fadan_form");

    $("#tijiao_fadan").click(function(event) {

        $(".valdatemsg").html('').css('display','none');

        if (!App.validate.run($("#f_bj_cs", container).val())) {
            $("#f_bj_cs", container).addClass('focus').focus();
            $(".fadan_form .one").html('请选择您的城市').css('display','block');
            return false;
        }
        if (!App.validate.run($("#f_bj_qx", container).val())) {
            $("#f_bj_qx", container).addClass('focus').focus();
            $(".fadan_form .one").html('请选择您的区域').css('display','block');
            return false;
        }

       if (!App.validate.run($("input[name=mianji]", container).val())) {
            $("input[name=mianji]", container).addClass('focus').focus();
            $(".fadan_form .two").html('请输入您的住房面积').css('display','block');
            return false;
        }else{
            if(isNaN($("input[name=mianji]", container).val())){
                $("input[name=mianji]", container).addClass('focus').focus();
                $(".fadan_form .two").html('面积必须是数字').css('display','block');
                return false;
            }
            if ($("input[name=mianji]", container).val()>10000||$("input[name=mianji]", container).val()<1) {
                $("input[name=mianji]", container).addClass('focus').focus();
                $(".fadan_form .two").html('房屋面积请输入1-10000之间的数字^_^!').css('display','block');
                return false;
            }
        }

         if (!App.validate.run($("input[name=tel]", container).val())) {
                $("input[name=tel]", container).addClass('focus').focus();
                $(".fadan_form .three").html('请填写手机号码 ^_^!').css('display','block');
                return false;
            } else {
                var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
                if (!reg.test($("input[name=tel]", container).val())) {
                    $("input[name=tel]", container).addClass('focus').focus();
                    $(".fadan_form .three").html('请填写正确的手机号码 ^_^!').css('display','block');
                    return false;
                }
            }
            if(!checkDisclamer(".secbox_form")){
                return false;
            }
        var data = {
           name:$("input[name=name]",container).val(),
           tel:$("input[name=tel]",container).val(),
           fb_type:$("input[name=fb_type]",container).val(),
           cs:$("select[name=cs]",container).val(),
           qx:$("select[name=qx]",container).val(),
           mianji:$("input[name=mianji]",container).val(),
           source: '<?php echo ($order_source); ?>',
           tpl:'miniStep',
           step:2
        };
        window.order({
            extra:data,
            error:function(){
                $("#f_bj_cs", container).addClass('focus').focus();
                $(".fadan_form .three").html('发送失败,请稍后重试！').css('display','block');
            },
            success:function(data, status, xhr){
                if (data.status == 1) {
                    $("body").append(data.data.tmp);
                } else {
                    $("#f_bj_cs", container).addClass('focus').focus();
                    $(".fadan_form .three").html(data.info).css('display','block');
                }
            },
            validate:function(item, value, method, info){
                return true;
            }
        });
    });
});
</script>