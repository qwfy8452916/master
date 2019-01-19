<?php if (!defined('THINK_PATH')) exit();?> <form>
    <div class="gl_box_form">
        <div  class="gl_item">
            <div class="gl_t">
                <span><i>吉日</i>开工 开工<i>大吉</i> !</span>
                <span>10秒测算您的装修<i>吉日</i> !</span>
            </div>
            <div class="gl_t_box">
                <div class="inputs">
                    <input type="text" name="name" placeholder="请输入您的称呼"/>
                </div>
                <div class="inputs">
                    <input type="text" name="tel" placeholder="请输入您的手机号" maxlength="11" />
                    <input type="hidden" name="fb_type" value="huangli">
                </div>
                <div class="inputs">
                    <select  name="start">
                        <option value="1">一个月内装修</option>
                        <option value="2" selected>三个月内装修</option>
                        <option value="3">半年内装修</option>
                    </select>
                </div>
                <div class="gl_vb">
                    <select id="gl_box_cs" class="" name="gl_box_cs">
                    </select>
                    <select id="gl_box_qx" class="gl_right" name="gl_box_qx">
                    </select>
                </div>
                <div class="no-margin">
                <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                <!--E-免责申明-->
                </div>

                <div class="inputs btn">
                    <button type="button">测算吉日</button>
                </div>
            </div>
        </div>
    </div>
</form>
<script type="text/javascript">
var ip_cityid = '<?php echo (cookie('iplookup')); ?>';
var city_id = '<?php echo ($theCityId); ?>';
(city_id == '') ? cityId = ip_cityid : cityId = city_id;

if(cityId == ''){
    getLocation();
}else{
    initCity(cityId);
}
function initCity(cityId){
    App.citys.init("#gl_box_cs","#gl_box_qx",shen,shi,cityId);
}

    $(function(){
        $(".gl_box_form button").click(function(event) {
            var _this = $(this);
            var parents = _this.parents(".gl_box_form");
            $(".focus").removeClass('focus');
            if(!App.validate.run($("input[name=name]",parents).val())){
                $("input[name=name]",parents).focus().addClass('focus');
                $.pt({
                    target: $("input[name=name]",parents),
                    content: '请输入您的名称!',
                    width: 'auto'
                });
                return false;
            } else {
                var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
                if (!reg.test($("input[name=name]",parents).val())) {
                    $("input[name=name]",parents).focus().addClass('focus');
                    $("input[name=name]",parents).val('');
                    $.pt({
                        target: $("input[name=name]",parents),
                        content: '请输入正确的名称，只支持中文和英文',
                        width: 'auto'
                    });
                    return false;
                }
            }

            if(!App.validate.run($("input[name=tel]",parents).val())){
                $("input[name=tel]",parents).focus().addClass('focus');
                $.pt({
                    target: $("input[name=tel]",parents),
                    content: '请填写正确的手机号码 ^_^!',
                    width: 'auto'
                });
                return false;
            } else {
                var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$");
                if (!reg.test($("input[name=tel]",parents).val())) {
                    $("input[name=tel]",parents).focus().addClass('focus');
                    $("input[name=tel]",parents).val('');
                    $.pt({
                        target: $("input[name=tel]",parents),
                        content: '请填写正确的手机号码 ^_^!',
                        width: 'auto'
                    });
                    return false;
                }
            }
            if(!App.validate.run($("#gl_box_cs",parents).val())){
                $("#gl_box_cs",parents).focus().addClass('focus');
                $.pt({
                    target: $("#gl_box_cs",parents),
                    content: '请选择您所在的城市!',
                    width: 'auto'
                });

                return false;
            }
            if(!checkDisclamer(".gl_t_box")){
                return false;
            }

            window.order({
                extra:{
                    name:$("input[name=name]",parents).val(),
                    tel: $("input[name=tel]",parents).val(),
                    fb_type: $("input[name=fb_type]",parents).val(),
                    hltime: $("select[name=start]",parents).val(),
                    cs:$('#gl_box_cs').val(),
                    qx:$('#gl_box_qx').val(),
                    source: '183',
                    step:99
                },
                error:function(){
                    return true;
                },
                success:function(data, status, xhr){
                    if (data.status == 1) {
                        $(document.body).append(data.data.tmp);
                    }
                },
                validate:function(item, value, method, info){
                    return true;
                }
            });
        });
    });
</script>