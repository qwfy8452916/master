<?php if (!defined('THINK_PATH')) exit();?><!--设计伸缩广告-->
<div class="zb_footer_box1" style="height: 250px">
    <div class="zb_footer_bg">
    </div>
    <div class="wrap wrap-posi ">
        <div class="zb_l_bg2">
        </div>
        <div class="zb_m_container sideBaojia" id="sideBaojia" style="height: 250px">
            <div class="zb-leftsider">
                <p class="zb-userlength">今日已有<em><?php echo releaseCount("fbrs");?></em>人获取装修报价</p>
                <ul class="zb_m_container_edit">
                    <li><input type="text" name="side-mianji" placeholder="请填写房屋面积"><span>m²</span></li>
                    <li>
                        <input type="text" name="side-tel"  placeholder="请输入您的手机号码" maxlength="11">
                        <input type="hidden" name="fb_type" value="baojia">
                    </li>
                    <li><input type="text" name="side-xiaoqu" placeholder="您的小区，以便匹配"></li>
                </ul>
                <div class="no-margin">
                <!--S-免责申明-->
                    <div class="disclamer-line">
    <span class="disclamer-check pull-left" data-checked="true"><i class="fa fa-check"></i></span>
    <span class="disclamer-text pull-left">我已阅读并同意齐装网的</span>
    <a href="http://www.qizuang.com/about/disclamer" target="_blank" class="pull-left"><span>《免责申明》</span></a>
</div>

                <!--E-免责申明-->
                </div>
            </div>
            <button class="bj_btn"></button>
        <div class="zb-rightsider">
            <dl>
                <dt>您的装修预算约为<em>0</em>万元<a href="javascript:;">预算明细</a></dt>
                <dd>客厅预算：0万元</dd>
                <dd>卧室预算：0万元</dd>
                <dd>厨房预算：0万元</dd>
                <dd>卫生间预算：0万元</dd>
                <dd>水电预算：0万元</dd>
                <dd>其他预算：0万元</dd>
            </dl>
        </div>
        <p class="err red"></p>
        <div class="s-p">
            <p>*本价格为新房估算价格（半包，不含水电工程），旧房价格由实际工程量决定。</p>
            <p>*稍后客服将致电您，为您提供免费装修咨询服务。</p>
        </div>
        </div>
        <div class="zb_close">
        </div>
    </div>
</div>
<div class="zb_footer_box_little">
    <img src="/assets/common/img/tanchuang2.png" alt="免费获取报价" class="baiduab-beha"/>
</div>

<script>
    $(window).scroll(function(){
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop ;
        var height = $(".nav1,.nav").offset().top + $(".nav1").outerHeight()+10;
        if($(".pub-head-empty").length>0){
            height=$(".pub-head-empty").offset().top + $(".nav1").outerHeight()+10;
        }
        if(scrollTop > height){
            console.log(height )

            $(".zb_footer_box1").show();
            $(".zb_footer_box_little").show();
        }else{
            $(".zb_footer_box1").hide();
            $(".zb_footer_box_little").hide();
        }
    });

    $(".zb_footer_box1 .zb_close").click(function(event) {
        animate($(".zb_footer_box1"),$(".zb_footer_box_little"));
    });

    function animate(from,to){
        var length = from.outerWidth();
        from.animate({"left":"-="+length},800,function(){
            to.animate({"left":"0"},800);
        });
    }
    $(".zb_footer_box_little").click(function(event) {
        animate($(".zb_footer_box_little"),$(".zb_footer_box1"));
    });

    var isReset = false;

    $("#sideBaojia .bj_btn").click(function(event) {
        var container = $(this).parents(".zb_footer_box1");


        $(".sideBaojia .err",container).html("");
        $(".sideBaojia .err",container).css('display','block');

        var mianji = $("input[name=side-mianji]",container);
        var xiaoqu = $("input[name=side-xiaoqu]",container);
        var tel = $("input[name=side-tel]",container);

        if(isReset == true){
            $('.zb-rightsider').html('<dl><dt>您的装修预算约为<em>0</em>万元<a href="javascript:;">预算明细</a></dt><dd>客厅预算：0万元</dd><dd>卧室预算：0万元</dd><dd>厨房预算：0万元</dd><dd>卫生间预算：0万元</dd><dd>阳台预算：0万元</dd><dd>其他预算：0万元</dd></dl>');
            $(".sideBaojia input[name=side-xiaoqu]").val('');
            $(".sideBaojia input[name=side-tel]").val('');
            $(".sideBaojia input[name=side-mianji]").val('');
            $("#sideBaojia .bj_btn").removeClass('rbj_btn').addClass('bj_btn');
            $(".sideBaojia .s-p").hide();
            $(".zb-leftsider").css("margin-top","25px");
            $(".zb-rightsider").css("margin-top","35px");
            isReset = false;
            return false;
        }



        var data = {
            mianji:$(".sideBaojia input[name=side-mianji]").val(),
            tel:$(".sideBaojia input[name=side-tel]").val(),
            xiaoqu:$(".sideBaojia input[name=side-xiaoqu]").val(),
            fb_type:$(".sideBaojia input[name=fb_type]").val(),
            source: '173'
        };



        window.order({
            extra:data,
            error:function(){
                alert('发布失败,请刷新页面！');
            },
            success:function(data, status, xhr){
                if (data.status == 1) {
                    $.ajax({
                        url: '/bjresult/',
                        type: 'POST',
                        dataType: 'JSON',
                        data:{
                            type:'html'
                        }
                    })
                    .done(function(res) {
                        if(res.status == 1){
                            $(".zb-rightsider").show();
                            $(".sideBaojia .s-p").show();
                            $(".zb-rightsider").html(res.data);
                            $("#sideBaojia .bj_btn").removeClass('bj_btn').addClass('rbj_btn');
                            $(".zb-leftsider").css("margin","0");
                            $(".zb-rightsider").css("margin-top","0");
                            isReset = true;
                        }else{
                            alert(res.info);
                        }
                    })
                    .fail(function(xhr) {
                        alert('获取报价失败,请稍后再试！');
                    });
                } else {
                    alert(data.info);
                }
            },
            validate:function(item, value, method, info){
                if ('mianji' == item) {
                    if ("" == value) {
                       mianji.focus();
                       $(".sideBaojia .err").html("亲，您还没有填写房屋面积^_^！");
                       return false;
                    }
                    var re = /^[1-9]+(.[0-9]{1,2})?$/gi;
                    if (!re.test(value)) {
                        mianji.focus();
                        $(".sideBaojia .err").html("房屋面积请输入1-10000之间的数字^_^!");
                        return false;
                    }
                };

                if ('xiaoqu' == item) {
                    if ("" == value) {
                        xiaoqu.focus();
                        $(".sideBaojia .err").html("亲，您还没有填写小区名称^_^！");
                        return false;
                    }
                    var re = /^[0-9]+(.[0-9]{1,2})?$/gi;
                    if (re.test(value)) {
                        xiaoqu.focus();
                        $(".sideBaojia .err").html("亲，请填写正确的小区名称！");
                        return false;
                    }
                };

                if ('tel' == item && 'notempty' == method) {
                    tel.focus();
                    $(".sideBaojia .err").html("亲，您还没有填写手机号码！");
                    return false;
                };

                if ('tel' == item && 'ismobile' == method) {
                    tel.focus();
                    $(".sideBaojia .err").html("亲，请输入11位手机号码！");
                    return false;
                };
                if(!checkDisclamer(".sideBaojia")){
                    return false;
                }
                $(".sideBaojia .err",container).html("").hide();
                return true;
            }
        });
    });
</script>