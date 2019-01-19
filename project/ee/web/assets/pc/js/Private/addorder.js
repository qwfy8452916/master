
$(function(){


    $('.jiedaikefu').select2({
        templateResult: formatState,
        templateSelection:formatState2,
        placeholder: "请选择",
    })
    $('.designyuan').select2({
        templateResult: formatState,
        templateSelection:formatState2,
        placeholder: "请选择",
    })

    function formatState(state) {
        if (!state.id) { return state.text; }
        var ordernumbertext=formateText(state.text)[1]!=0?(formateText(state.text)[1]+'个关联订单'):'空闲中';
        var $state = $( '<div style="overflow:hidden;white-space:nowrap;position:relative"><span style="width:60%;font-size:14px;white-space:nowrap;position:absolute;left:0px;">'+ formateText(state.text)[0]+ '</span>'+'<span style="float:right;color:#169bd5;font-size:14px;">'+ordernumbertext+'</span></div>'
        );
        return $state;
    };

    function formateText(text){
        var array = text.split("&");
        return array;
    }



    
      function formatState2(state) {
        if (!state.id) {
          return state.text;
        }
        var arr = state.text.split('&')
        return arr[0];
      };




   var limit=true;
    $(".ordertime").datetimepicker({
        autoclose:true,
        pickerPosition: "bottom-left",
        todayBtn:1,
        clearBtn:true,
        timePicker: true,
    })
    $(".realtime").datetimepicker({
        autoclose:true,
        pickerPosition: "bottom-left",
        todayBtn:1,
        clearBtn:true,
        timePicker: true,
    })
    $('.orderstatus').change(function(event) {
        var Orderstatus=$.trim($('.orderstatus').val());
        if(Orderstatus=='3'){
            $('.ordertimediv').show();
            $('.realtimediv').hide();
            $('.qiandan_jinediv').hide();

        }else if(Orderstatus=='5'){
            $('.ordertimediv').hide();
            $('.qiandan_jinediv').hide();
            $('.realtimediv').show();
        }else if(Orderstatus=='6'){
            $('.ordertimediv').hide();
            $('.realtimediv').hide();
            $('.qiandan_jinediv').hide();
        }else if(Orderstatus=='8'){
            $('.ordertimediv').hide();
            $('.realtimediv').hide();
            $('.qiandan_jinediv').show();
        }else{
            $('.ordertimediv').hide();
            $('.realtimediv').hide();
            $('.qiandan_jinediv').hide();
        }
    });
    
//复制地址功能
$(".paste-icon").on("click",function(){
    $(".lianxaddress").val($(".address").val());
});
//小区长度限制

$(".xiaoqu").bind("input propertychange",function(){
    var length = 20-$(this).val().length;
    if(length<=0){
      $(this).val($(this).val().substring(0,20))
    }
  });

$('#save-btn').click(function(event) {
   var Yezhuinfoval=$.trim($('.yezhuinfo').val()),
       Phoneshouji=$.trim($('.phoneshouji').val()),
       Weixin=$.trim($('.weixin').val()),
       Xiaoqu=$.trim($('.xiaoqu').val()),
       Huxing=$.trim($('.huxing').val()),
       Mianji=$.trim($('.mianji').val()),
       Address=$.trim($('.address').val()),
       Lianxaddress=$.trim($('.lianxaddress').val()),
       Orderstatus=$.trim($('.orderstatus').val()),
       Orderremark=$.trim($('.orderremark').val()),
       Jiedaikefu=$.trim($('.jiedaikefu').val()),
       Designyuan=$.trim($('.designyuan').val()),
       Xiangmujl=$.trim($('.xiangmujl').val()),
       Ordertime=$.trim($('.ordertime').val()),
       Realtime=$.trim($('.realtime').val()),
       QiandanJine=$.trim($('.qiandan_jine').val()),
       jiedaikefuval=$.trim($('.jiedaikefu').val()),
       designyuanval=$.trim($('.designyuan').val());


       $('.tishi').html("");
       if(Yezhuinfoval==""){
         $('.yezhuinfo-tishi').html("请输入业主姓名");
         $('.yezhuinfo').focus();
          return false;
       }
       // if(Phoneshouji==""){
       //   $('.phoneshouji-tishi').html("请输入手机号");
       //   $('.phoneshouji').focus();
       //   return false;
       // }

        if(Phoneshouji!=""){
            if(!telReg(Phoneshouji)){
                $('.phoneshouji-tishi').html("请输入正确的手机号");
                $('.phoneshouji').focus();
                return false;
            }
        }

       if(Weixin!="" && Weixin.length<6){
        $('.weixin').focus();
        $('.weixin-tishi').html("请输入正确的微信号");
        return false;
       }
  
        if(parseFloat(Mianji)>99999999.99&&Mianji!=""){
            $('.mianji').focus();
            $('.mianji-tishi').html("装修面积不大于99999999.99");
            return false;
        }
        
       if(Orderstatus==""){
         $(".orderstatus").focus();
         $('.orderstatus-tishi').html("请选择订单状态");
         return false;
       }
        if(Orderstatus=="6"){
            if(Orderremark==""){
                $(".orderremark").focus();
                $('.orderremark-tishi').html("请填写入未量房原因");
                return false;
            }
        }else if(Orderstatus=="8"){
            var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
            if(QiandanJine==""){
                $('.qiandan_jine-tishi').html("请输入签单金额");
                return false;
            }
            if(!exp.test(QiandanJine)){
                $('.qiandan_jine-tishi').html("请输入正确签单金额");
                return false
            }
        }

       var imgList=[];
       var file_item=$(".file-item");
       for(var i=0; i<file_item.length;i++){
          var item={
            'img':file_item.eq(i).find(".nameval").val(),
            'title':file_item.eq(i).find(".inbiaoti").val()
          }
          imgList.push(item)
       }
       if(limit==true){
        limit=false;
        $.ajax({
        url:'/order/add/do',
        dataType:'json',
        type:'post',
        data:{
            qiandan_jine:QiandanJine,
            consumer_name:Yezhuinfoval,
            consumer_tel:Phoneshouji,
            consumer_wx_no:Weixin,
            house_type:Huxing,
            xiaoqu:Xiaoqu,
            house_area:Mianji,
            build_address:Address,
            link_address:Lianxaddress,
            state:Orderstatus,
            order_remark:Orderremark,
            order_time:Ordertime,
            lf_time:Realtime,
            reception_id:Jiedaikefu,
            designer_id:Designyuan,
            project_manager:Xiangmujl,
            house_design:imgList,
            designer_id:designyuanval,
            reception_id:jiedaikefuval
        },
        success:function(data){
          if(data.error_code==0){
            var tishixin="操作成功！";
            tishitip(tishixin,1)
            setTimeout(function(){
              window.location.href="/order";
            },1000)
          }else{
            tishitip(data.error_msg,2);
            limit=true;

           }

        },
        error:function(xhr){
           tishitip("请求出错,请稍后再试!",2)
        }
       })
    }
});
})



