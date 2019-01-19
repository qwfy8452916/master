//判断位置上传位置
var setposition=function(){
    $('.uploader-list').each(function(){
           var widkd=$(this).outerWidth();
            var fitem_num=Math.floor(widkd/170)
            var totalnum=$(this).find('.file-item').length;
            var yunum=totalnum%fitem_num
            var leftwidth=yunum*170;
            if(yunum>0){
                $('.uploader-demo').css({
                    "position":"relative",
                })
                $(this).next('.filePicker').css({
                    "position":"absolute",
                    "left":leftwidth+"px",
                    "top":"150px"
                })
            }else{
                $(this).next('.filePicker').css({
                    "position":"",
                    "left":"",
                    "top":""
                })
            }
    })  
}

$(function () {



    if($('.mianjitext').text()==""){
      $('.hangwk .hangitem .danweipf').hide()
    }else{
        $('.hangwk .hangitem .danweipf').show()
    }

    $('.jiedaikefu').select2({
        templateResult: formatState,
        templateSelection:formatState2,
        placeholder: "请选择",
        minimumResultsForSearch: -1
    })
    $('.designyuan').select2({
        templateResult: formatState,
        templateSelection:formatState2,
        placeholder: "请选择",
        minimumResultsForSearch: -1
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

   
    
   
     //执行位置
    setposition() 
    window.onresize=setposition




    var flag=true;
    var status = '{$order.manage->getData("state")}';
			if(status==3){
                $('.ordertimediv').show();
                $('.realtimediv').hide();
			}else if(status==5){
                $('.ordertimediv').hide();
                $('.realtimediv').show();
			}else if(status=='6'){
                $('.ordertimediv').hide();
                $('.realtimediv').hide();
                $('.qiandan_jinediv').hide();
            }else if(status=='8'){
                $('.ordertimediv').hide();
                $('.realtimediv').hide();
                $('.qiandan_jinediv').show();
            }else{
                $('.ordertimediv').hide();
                $('.realtimediv').hide();
                $('.qiandan_jinediv').hide();
            }


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

    //返回按钮
    $(".cancelbtn").on('click',function(){
        window.location.href = '/order';
    });



       $('body').on('click','.shejituwk li',function(){
         
         var imgItem=[],
        domArray=$(this).parent().children("li"), //获取要放大的所有元素
        index=$(this).index();
        domArray.each(function(index, el) {
            var itemInfo={imgPath:"",imgName:""};
            itemInfo.imgPath=$(el).children('img').attr("src");
            itemInfo.imgName=$(el).children('.footbiaot').text();
            imgItem.push(itemInfo);
        });

        $(this).erpswiper({
            conWidth:1100,
            imgItem:imgItem,
            column:1,
            currentIndex:index, //被点击图片的下表
            swiperTitle:"设计图" //图片上面的标题
        })

       })



    

    //遍历渲染图片数据和张数
     for(var j=0;j<$('.getdata').length;j++){
        
       var designdata=JSON.parse($('.getdata').eq(j).val());
     var shr='';
     for(var i=0;i<designdata.length;i++){
       shr+='<div id="WU_FILE1_'+i+'" class="file-item thumbnail"><input class="nameval" type="hidden" value="'+designdata[i].img+'"/><img src="//'+designdata[i].img+'"><span class = "cancel delimgbtns delshanchu" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span><div class="info"></div><div class="file-panel" style = "height: 30px;"><input class="inbiaoti" maxlength="10" type="text" value="" placeHolder="点击输入标题"></div></div>'
     }
     $(".designwk").eq(j).find(".uploader-list").html(shr)
     $(".designwk").eq(j).find(".canupload").text($(".designwk").eq(j).find(".file-item").length)
     $(".designwk").eq(j).find(".yuupload").text(9-$(".designwk").eq(j).find(".file-item").length)
    }
    $('.topaddpic').find(".canupload").text($('.topaddpic').find(".file-item").length);
    $('.topaddpic').find(".yuupload").text(9-$('.topaddpic').find(".file-item").length);

       //点击删除图片

       $('.uploader-list').on('click','.delshanchu',function(){
            var that=$(this);
            var piccount=$(this).parent().parent('.uploader-list').find(".file-item").length-1;
            that.closest('.uploadpicwk').siblings('.zhangshuxz').children('.canupload').text(piccount);
            that.closest('.uploadpicwk').siblings('.zhangshuxz').children('.yuupload').text(9-piccount);
            if(piccount<9){
                that.closest('.p-panel').find(".filePicker").show()
            }
            $(this).parent().remove();
            setposition()
   
      })


    //    点击修改
       $('.add-waik .newadd').click(function(){
         var Huxingtext=$('.huxingtext').text(),
         Jiedaikftext=$('.jiedaikftext').text(),
         Designtext=$('.designtext').text(),
         Jiedaikfid=$('.jiedaikftext').attr('data-id'),
         Designid=$('.designtext').attr("data-id");
         $('.apartment option').each(function(){
            if(Huxingtext==$(this).text()){
            $('.apartment').val($(this).val())
            }else{
                $(this).attr("selected",false)
            }
         })
         
    
         
        $('.jiedaikefu').val(Jiedaikfid).trigger("change");
        $('.designyuan').val(Designid).trigger("change");



         $(this).closest('.jibeninfowk').find("input").each(function(){
             $(this).val($(this).attr("data-value"))
         })
         
        

         $(this).closest('.p-panel').find('.tishi').html("")
        var getshujv=getpicinfo02(this)
        var getshujvlength=getshujv.length;
        var shr='';
        if(getshujvlength>=9){  
            $(this).closest(".p-panel").find('.filePicker').hide();
        }else{
            $(this).closest(".p-panel").find('.filePicker').show();
        }


        for(var i=0;i<getshujv.length;i++){
        shr+='<div id="WU_FILE1_'+i+'" class="file-item thumbnail"><input class="nameval" type="hidden" value="'+getshujv[i].img+'"/><img src="//'+getshujv[i].img+'"><span class = "cancel delimgbtns delshanchu" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span><div class="info"></div><div class="file-panel" style = "height: 30px;"><input class="inbiaoti" type="text" maxlength="10" value="'+getshujv[i].title+'" placeHolder="点击输入标题"></div></div>'
        }
        $(this).closest(".p-panel").find(".tabwaikgd02").find(".uploader-list").html(shr)
        $(this).closest(".p-panel").find(".tabwaikgd02").find('.canupload').text(getshujvlength)
        $(this).closest(".p-panel").find(".tabwaikgd02").find('.yuupload').text(9-getshujvlength)

           $(this).parents('.p-panel').find('.addhistorywk').hide();
           $(this).parents('.p-panel').find('.baocquxwk').show();
           $(this).parents('.p-panel').find('.tabwaikgd01').hide();
           $(this).parents('.p-panel').find('.gendan02show').stop().animate({height:"show"},500);
           $(this).parents('.p-panel').find('.tabwaikgd02').show();
           $(this).parents('.p-panel').find('.gendan01show').show()
       })
       
    //    点击取消
       $('.baocquxwk .quxiaocan').click(function(){
        
        

            $(this).parents('.p-panel').find('.gendan02show').stop().animate({height:"hide"},500);
            $(this).closest(".addgendanwk").find('.gendanwk textarea').val("")
            $(this).parents('.p-panel').find('.addhistorywk').show();
            $(this).parents('.p-panel').find('.baocquxwk').hide();
            
            $(this).parents('.p-panel').find('.tabwaikgd02').hide();
            $(this).parents('.p-panel').find('.tabwaikgd01').show();

       })
      
    //   请求 
       function ajaxAction(options){
        var defalutOptions = {
            url : "",
            method : "post",
            data : null,
            successCallback : null,
            failCallback : null
        };
        options = $.extend({}, defalutOptions, options);
        $.ajax({
            url : options.url,
            data : options.data,
            method : options.method,
            success : function(res){
                options.successCallback && options.successCallback(res);
     
            },
            error : function(xhr){
                options.failCallback && options.failCallback(xhr);
            }
        });
    }

   //    跟单保存

   $('.baocquxwk .gendansave').on('click',function(){
        $(this).closest('.p-panel').find('.tishi').html("");
        var that=this;
        var Ordernumber=$('.ordernumber').val();
        var orderstatusval=$('.orderstatus').val(),
            orderstatutext=$('.orderstatus option:selected').text(),
            ordertimeval=$('.ordertime').val(),
            realtimeval=$('.realtime').val(),
            qiandan_jineval=parseFloat($.trim($('.qiandan_jine').val())).toFixed(2),
            gendanxqedival=$.trim($('.gendanxqedi').val());
            if(orderstatusval==""){
                $('.orderstatus-tishi').html("请选择订单状态");
                return false;
            }
           if(orderstatusval=="8"){
                var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
                if(qiandan_jineval=="NaN"){
                    $('.qiandan_jine-tishi').html("请输入签单金额");
                    return false;
                }
                if(!exp.test(qiandan_jineval)){
                    $('.qiandan_jine-tishi').html("请输入正确签单金额");
                    return false
                }
            }
            if(flag==true){
                flag=false
                ajaxAction({
                    url : "/order/editstate/do",
                    method : "post",
                    data : {order_no:Ordernumber,state:orderstatusval,order_time:ordertimeval,lf_time:realtimeval,qiandan_jine:qiandan_jineval,order_remark:gendanxqedival},
                    successCallback : function(res){
                        if(res.error_code==0){
                                     tishitip("操作成功", 1)
                                     
                                        if(ordertimeval==""){
                                        ordertimeval=$('.yuyuetimetext').text();
                                        }
                                        if(realtimeval==""){
                                            realtimeval=$('.shijitimetext').text();
                                        }
                                        if(qiandan_jineval=="NaN"){
                                            qiandan_jineval=$('.jinetext').text();
                                            
                                        }else{
                                            qiandan_jineval=" "+qiandan_jineval+" "
                                        }
                                        $('.yuyuetimetext').text(ordertimeval);
                                        $('.shijitimetext').text(realtimeval);
                                        $('.jinetext').text(qiandan_jineval);
                                        $('.dindantext').text(orderstatutext);
                                        $('.gedanxqtext').text(gendanxqedival);
                                       
                 
                                     $(that).parents('.p-panel').find('.addhistorywk').show();
                                     $(that).parents('.p-panel').find('.baocquxwk').hide();
                                     $(that).parents('.p-panel').find('.gendan02show').stop().animate({height:"hide"},500);
                                     
                                     flag=true;
                                  }else{
                                     tishitip(res.error_msg, 2)
                                     flag=true;
                                  }
                    },
                    failCallback:function(xhr){
                        tishitip("请求错误，请稍后再试", 2)
                        flag=true;
                    }

                });
            }
           
    })

   //   基本信息保存

   $('.baocquxwk .jibeninfosave').on("click",function(){
      $(this).closest('.p-panel').find('.tishi').html("");
      var that=this;
      var Ordernumber=$('.ordernumber').val();
      var ownernameval=$.trim($('.ownername').val()),
      huxingtextval=$('.apartment option:selected').text(),
      mianjival=$.trim($('.mianji').val()),
      xiaoquval=$.trim($('.xiaoqu').val()),
      apartmentval=$('.apartment').val(),
      shoujihaoval=$.trim($('.shoujihao').val()),
      wechatval=$.trim($('.wechat').val()),
      zhuangxiuaddressval=$.trim($('.zhuangxiuaddress').val()),
      contactaddressval=$.trim($('.contactaddress').val()),
      jiedaikefuval=$.trim($('.jiedaikefu').val()),
      designyuanval=$.trim($('.designyuan').val()),
      jiedaikefuid=$('.jiedaikefu').val(),
      designyuanid=$('.designyuan').val();
      if(ownernameval==''){
        $('.owner-tishi').html("请输入业主姓名");
        $('.ownername').focus()
         return false
      }
      if(mianjival!=""){
        if(isNaN(mianjival)){
            $('.mianji-tishi').html("房屋面积为数字");
            $('.mianji').focus();
            return false
        }
        $('.hangwk .hangitem .danweipf').show()
      }else{
        $('.hangwk .hangitem .danweipf').hide() 
      }
      var newReg = new RegExp("^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
    //   if(shoujihaoval==""){
    //     $('.phone-tishi').html("请输入业主手机号");
    //     $('.shoujihao').focus();
    //     return false
    //   }
       if(shoujihaoval!=""){
           if(!newReg.test(shoujihaoval)){
               $('.phone-tishi').html("请输入正确的手机号");
               $('.shoujihao').focus();
               return false
           }
       }

       if(flag==true){
        flag=false
        ajaxAction({
            url : "/order/editbasic/do",
            method : "post",
            data : {order_no:Ordernumber,consumer_name:ownernameval,house_type:apartmentval,house_area:mianjival,consumer_tel:shoujihaoval,consumer_wx_no:wechatval,build_address:zhuangxiuaddressval,link_address:contactaddressval,xiaoqu:xiaoquval,designer_id:designyuanval,reception_id:jiedaikefuval},
            successCallback : function(res){
                
                if(res.error_code==0){
                    tishitip("操作成功", 1)
                    if(huxingtextval!="请选择"){
                        $('.huxingtext').text(huxingtextval)
                    }else{
                        $('.huxingtext').text("")
                    }
                    $('.yezhutext').text(ownernameval)
                    $('.xiaoqutext').text(xiaoquval)
                    $('.mianjitext').text(mianjival)
                    $('.phonetext').text(shoujihaoval)
                    $('.wechattext').text(wechatval)
                    $('.zxadresstext').text(zhuangxiuaddressval)
                    $('.linkaddresstext').text(contactaddressval)
                    $('.xiaoqu').attr("data-value",xiaoquval)
                    $('.ownername').attr("data-value",ownernameval)
                    $('.mianji').attr("data-value",mianjival)
                    $('.shoujihao').attr("data-value",shoujihaoval)
                    $('.wechat').attr("data-value",wechatval)
                    $('.zhuangxiuaddress').attr("data-value",zhuangxiuaddressval)
                    $('.contactaddress').attr("data-value",contactaddressval)
                   
                  
                    if(jiedaikefuval!=""){
                        $('.jiedaikftext').attr("data-id",jiedaikefuid);
                        if(res.data.reception_id_num==0){
                            $('.guanlianjd').text("空闲中")
                        }else{
                            $('.jiedaikftext').text($('.jiedaikefu option:selected').text().split("&")[0])
                            $('.guanlianjd').text(res.data.reception_id_num+"个关联订单")
                        }
                    }else{
                        $('.jiedaikftext').text("")
                    }

                    if(designyuanval!=""){
                        $('.designtext').attr("data-id",designyuanid);
                        if(res.data.reception_id_num==0){
                            $('.guanliandesign').text("空闲中")
                        }else{
                            $('.designtext').text($('.designyuan option:selected').text().split("&")[0])
                            $('.guanliandesign').text(res.data.designer_id_num+"个关联订单")
                        }
                    }else{
                        $('.designtext').text("")
                    }

                    $(".jiedaikefu").html("<option value=''>请选择</option>");
                    $(".designyuan").html("<option value=''>请选择</option>");
                    setData('.jiedaikefu',res.data.reception);
                    setData('.designyuan',res.data.designer);  

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
                    

                    $(that).parents('.p-panel').find('.addhistorywk').show();
                    $(that).parents('.p-panel').find('.baocquxwk').hide();
                    $(that).parents('.p-panel').find('.tabwaikgd02').hide();
                    $(that).parents('.p-panel').find('.tabwaikgd01').show();
                    flag=true;
                }else{
                    tishitip(res.error_msg, 2)
                    flag=true;
                }
            },
            failCallback:function(xhr){
                tishitip("请求错误，请稍后再试", 2)
                flag=true;
            }

        });
    }

   })
   

//    设计图
   $('body').on('click','.yuanspingmsave',function(){
        var that=this;
        var Ordernumber=$('.ordernumber').val();
        var imgList=getpicinfo(this);
        if(flag==true){
            flag=false;

            ajaxAction({
                url : "/order/editimg/do",
                method : "post",
                data : {order_no:Ordernumber,house_design:imgList,type:1},
                successCallback : function(res){
                    if(res.error_code==0){
                        tishitip("操作成功", 1)
                        var shr='';
                        for(var i=0;i<imgList.length;i++){
                        shr+='<li><img src="http://'+imgList[i].img+'" alt="设计图"><span class="footbiaot">'+imgList[i].title+'</span></li>'
                        }
                        $(that).parents('.p-panel').find('.shejituwk').html(shr)
    
                        $(that).parents('.p-panel').find('.addhistorywk').show();
                        $(that).parents('.p-panel').find('.baocquxwk').hide();
                        $(that).parents('.p-panel').find('.tabwaikgd02').hide();
                        $(that).parents('.p-panel').find('.tabwaikgd01').show();
                        flag=true;
                    }else{
                        tishitip(res.error_msg, 2) 
                        flag=true;
                    }
                },
                failCallback:function(xhr){
                    tishitip("请求错误，请稍后再试", 2)
                    flag=true;
                }
    
            });
        }
 
   })
   
//    效果图
   $("body").on("click",".yuanshijiegousave",function(){
      var that=this;
      var Ordernumber=$('.ordernumber').val();
      var imgList=getpicinfo(this);
         if(flag==true){
            flag=false;
            ajaxAction({
                url : "/order/editimg/do",
                method : "post",
                data : {order_no:Ordernumber,house_design:imgList,type:2},
                successCallback : function(res){
                    if(res.error_code==0){
                        tishitip("操作成功", 1)
                        var shr='';
                        for(var i=0;i<imgList.length;i++){
                        shr+='<li><img src="http://'+imgList[i].img+'" alt="设计图"><span class="footbiaot">'+imgList[i].title+'</span></li>'
                        }
                        $(that).parents('.p-panel').find('.shejituwk').html(shr)
    
                        $(that).parents('.p-panel').find('.addhistorywk').show();
                        $(that).parents('.p-panel').find('.baocquxwk').hide();
                        $(that).parents('.p-panel').find('.tabwaikgd02').hide();
                        $(that).parents('.p-panel').find('.tabwaikgd01').show();
                        flag=true;
                    }else{
                        tishitip(res.error_msg, 2) 
                        flag=true;
                    }
                },
                failCallback:function(xhr){
                    tishitip("请求错误，请稍后再试", 2)
                    flag=true;
                }
    
            });
         }
         
   })

    

    function getpicinfo(that){
        var imgList=[];
        var file_item=$(that).closest(".p-panel").find(".file-item");
        for(var i=0;i<file_item.length;i++){
        var item={
            "img":file_item.eq(i).find(".nameval").val(),
            "title":file_item.eq(i).find(".inbiaoti").val()
        }
        imgList.push(item)
        }
        if(imgList.length==0){
            imgList="";
         }
         return imgList
    }

    function getpicinfo02(that){
        var imgList=[];
        var file_item=$(that).closest(".p-panel").find(".tabwaikgd01").find(".shejituwk").find("li");
        for(var i=0;i<file_item.length;i++){
        var item={
            "img":file_item.eq(i).children("img").attr("src").replace(/http:\/\//,''),
            "title":file_item.eq(i).children(".footbiaot").text()
        }
        imgList.push(item)
        }
        if(imgList.length==0){
            imgList="";
         }
         return imgList
    }

   //    点击复制
   $('.copyniu').click(function(){
       var zhuangxiuaddressval = $.trim($('.zhuangxiuaddress').val());
       if(zhuangxiuaddressval!=""){
          $('.contactaddress').val(zhuangxiuaddressval)
       }
   })

})