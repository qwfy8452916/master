


$(function(){
 var Designdata=JSON.parse($('.designdata').val());
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
 var shr="";
      for(var i=0;i<Designdata.length;i++){
        shr+='<div id="WU_FILE1_'+i+'" class="file-item thumbnail"><input class="nameval" type="hidden" value="'+Designdata[i].img+'"/><img src="//'+Designdata[i].img+'"><span class = "cancel delimgbtns delshanchu" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span><div class="file-panel" style = "height: 30px;"><input class="inbiaoti" type="text" value="'+Designdata[i].title+'" placeHolder=""></div></div>'
      }
   $('.uploader-list').html(shr);


    if($('.file-item').length>=9){
      $('.filePicker').hide();
    }else{
      $('.filePicker').show();
    }

 $('.zhangshuxz .canupload').text($('.file-item').length);
 $('.zhangshuxz .yuupload').text(9-$('.file-item').length);


   $('.uploader-list').on('click','.delshanchu',function(){
     var that=$(this);
       if($('.file-item').length<=9){
          $('.filePicker').show();
        }else{
          $('.filePicker').hide();
        }
         that.parent().remove();
         piccount=$('.file-item').length;
         $('.zhangshuxz .canupload').text($('.file-item').length);
         $('.zhangshuxz .yuupload').text(9-$('.file-item').length);

   })


  $('.xuanxiangm').change(function(){
	var selectid=$(this).val();
      $.ajax({
          url:"/manager/worker/group/",
          dataType:"json",
          type:"get",
          data:{manager_id:selectid},
          success:function(data){
              if(data.error_code==0){
                  var str='<option value="">请选择</option>';
                  for(var i=0;i<data.data.length;i++){
                      str+='<option value="'+data.data[i].gid+'">'+data.data[i].group_name+'</option>'
                  }
                  $('.xuanzshigz').html(str);
              }

          },
          error:function(xhr){
              tishitip("请求错误,请稍后再试！",2)
          }
      })

	})


	$('#save-btn').click(function(event) {
    $('.tishi').html("");
      var Yezhuinfoval=$.trim($('.yezhuinfo').val()),
       Phoneshouji=$.trim($('.phoneshouji').val()),
       Weixin=$.trim($('.weixin').val()),
       Huxing=$.trim($('.huxing').val()),
       Mianji=$.trim($('.mianji').val()),
       Address=$.trim($('.address').val()),
       Lianxaddress=$.trim($('.lianxaddress').val()),
       Orderstatus=$.trim($('.orderstatus').val()),
       Jiedaikefu=$.trim($('.jiedaikefu').val()),
       Designyuan=$.trim($('.designyuan').val()),
       Xiangmujl=$.trim($('.xuanxiangm').val()),
       Shigongzu=$.trim($('.xuanzshigz').val()),
       Orderhao=$.trim($('#orderhao').val()),
       Orderremark=$.trim($('.orderremark').val()),
       Ordertime=$.trim($('.ordertime').val()),
       Realtime=$.trim($('.realtime').val()),
       QiandanJine=$.trim($('.qiandan_jine').val()),
       Tupiccount=parseInt($.trim($('.canupload').text()));
       if(Yezhuinfoval==""){
         $('.yezhuinfo-tishi').html("请输入业主姓名");
          return false;
       }
       if(Phoneshouji==""){
         $('.phoneshouji-tishi').html("请输入手机号");
          return false;
       }
       if(!telReg(Phoneshouji)){
         $('.phoneshouji-tishi').html("请输入正确的手机号");
          return false;
       }

      if(Weixin!="" && Weixin.length<6){
          $('.weixin-tishi').html("请输入正确的微信号");
          return false;
       }

       if(Mianji!=""){
         if(parseFloat(Mianji)>99999999.99){
           $('.mianji-tishi').html("装修面积不大于99999999.99");
           return false;
         }
       }
      //  if(Orderstatus==""){
      //    $('.tishi').html("");
      //    $('.orderstatus-tishi').html("请选择订单状态");
      //    return false;
      //  }
      //   if(Orderstatus=="3"){
      //       if(Ordertime==""){
      //           $('.tishi').html("");
      //           $('.ordertime-tishi').html("请选择预约量房时间");
      //           return false;
      //       }
      //   }else if(Orderstatus=="5"){
      //       if(Realtime==""){
      //           $('.tishi').html("");
      //           $('.realtime-tishi').html("请选择实际量房时间");
      //           return false;
      //       }
      //   }else if(Orderstatus=="6"){
      //       if(Reason==""){
      //           $('.tishi').html("");
      //           $('.reason-tishi').html("请选择未量房原因");
      //           return false;
      //       }
      //   }else if(Orderstatus=="8"){
      //       if(QiandanJine==""){
      //           $('.tishi').html("");
      //           $('.qiandan_jine-tishi').html("请输入签单金额");
      //           return false;
      //       }
      //   }
      if(Orderstatus==""){
        $('.orderstatus-tishi').html("请选择订单状态");
        return false;
      }
       if(Orderstatus=="6"){
        if(Orderremark==""){
            $('.tishi').html("");
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



       var imgList=new Array();
       var file_item=$(".file-item");
       for(var i=0; i<file_item.length;i++){
          var item={
            'img':file_item.eq(i).find(".nameval").val(),
            'title':file_item.eq(i).find(".inbiaoti").val()
          }
          imgList.push(item)
       }
       if(imgList.length==0){
          imgList="";
       }


       $.ajax({
        url:'/order/edit/do',
        dataType:'json',
        type:'post',
        data:{qiandan_jine:QiandanJine,consumer_name:Yezhuinfoval,consumer_tel:Phoneshouji,consumer_wx_no:Weixin,house_type:Huxing,house_area:Mianji,build_address:Address,link_address:Lianxaddress,state:Orderstatus,order_time:Ordertime,lf_time:Realtime,order_remark:Orderremark,reception_id:Jiedaikefu,designer_id:Designyuan,project_manager:Xiangmujl,build_group:Shigongzu,house_design:imgList,order_no:Orderhao,},
        success:function(data){
          if(data.error_code==0){
            var tishixin="操作成功！";
            tishitip(tishixin,1)
            setTimeout(function(){
              window.location.href="/order";
            },1000)
          }

        },
        error:function(xhr){
           tishitip("请求出错,请稍后再试!",2)
        }
       })

	});
})

