$(function () {

    var flag=true;

    if($('.mianjitext').text()==""){
        $('.hangwk .hangitem .danweipf').hide()
      }else{
          $('.hangwk .hangitem .danweipf').show()
      }

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



     //    点击修改


    $('.add-waik .newadd').click(function(){
        var Huxingtext=$('.huxingtext').text(),
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

          $(this).parents('.p-panel').find('.addhistorywk').hide();
          $(this).parents('.p-panel').find('.baocquxwk').show();
          $(this).parents('.p-panel').find('.tabwaikgd01').hide();
          $(this).parents('.p-panel').find('.tabwaikgd02').show();

      })
      




      //    点击取消
      $('.baocquxwk .quxiaocan').click(function(){
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


      $('.loadmorewk .moreload').click(function (event) {

        var that = $(this),
            page = parseInt(that.attr("data-page")),
            ordernumber = $('.getorder').val();

        $.ajax({
            url: "/order/order/detail/list",
            dataType: "json",
            type: "get",
            data: {page_current: page, order_no: ordernumber,},
            success: function (data) {
                if (data.error_code == 0) {
                    if (data.data != '') {
                        that.attr("data-page", ++page)
                        $('.shigonghistory').append(data.data);
                    }
                    if (data.page.page_current < data.page.total_page) {
                        that.text("加载更多");
                    } else {
                        that.text("没有更多历史记录了！");
                    }
                } else {
                    tishitip(data.error_msg, 2)
                }

            },
            error: function (xhr) {
                tishitip("请求错误,请稍后再试！", 2)
            }
        })

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
            swiperTitle:"施工图" //图片上面的标题
        })

       })


})


