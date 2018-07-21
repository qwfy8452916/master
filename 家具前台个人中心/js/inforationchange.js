
 +function($){
   $('.rightbianji .xiugai span').click(function(event) {
   	   var panduanzhi = $(this).parent().attr('data-ji')
   	   $(this).closest('.fujixz').children('.middlebianji').show();
       $(this).parent('.xiugai').hide();
       $(this).parent().parent().children('.bianjicunqu').removeClass('yincang')
   	    switch(panduanzhi){
   	   	case 'sexgai':
   	   	 $(this).closest('.fujixz').children('.middlebianji').children('.sexselect').show();
         $('.sexxb .xingbie').hide();
         break;
        case 'areagai':
          $('.areadiv').show();
          $('.citydiv').show();
          $('.province').show();
          $('.middlebianji .localdiqu').hide();
          break;
   	   } 
   });

   $('.rightbianji .cancelqx').click(function(event) {
   	  $(this).parent().addClass('yincang');
   	  $(this).parent().parent().parent().children('.middlebianji').hide();
   	  $(this).closest('.fujixz').children().children('.xiugai').show();
      $(this).closest('.fujixz').children().children('.xiugai').children('span').hide();
   });

   $('.rightbianji .namesave').click(function(event) {
   	   var nameval = $('.middlebianji .nameinput').val();
   	   if(nameval==""){
           layer.msg('请输入昵称',{
           	time:2000,
           })
   	   }else{
   	   	  $(this).parent('.bianjicunqu').addClass('yincang');
   	   	  $(this).closest('.fujixz').children().children('.xiugai').show();
   	   	  $(this).closest('.fujixz').children().children('.xiugai').children('span').hide();
   	   	  $(this).closest('.fujixz').children('.middlebianji').hide();
   	   	  $('.nameinput').val('');
   	   	  $(this).closest('.fujixz').children('.leftbianji').html(nameval);

   	   }
   });

   $('.rightbianji .sexsave').click(function(){
     var selectval = $('.sexselect').val();
     if(selectval=="请选择"){
       layer.msg('请选择性别',{time:2000,})
     }else{
     	 $(this).parent('.bianjicunqu').addClass('yincang');
         $(this).closest('.fujixz').children('.middlebianji').children('.sexselect').hide();
         $(this).closest('.fujixz').children().children('.xiugai').show();
         $(this).closest('.fujixz').children().children('.xiugai').children('span').hide();
         $('.sexxb .xingbie').html(selectval)
         $('.sexxb .xingbie').show();
     }
   })


   $('.rightbianji .areasave').click(function(event) {
   	  var areasheng = $('.areaprovince').val();
   	  var areashi = $('.areacity').val();
   	  var areaqu = $('.areadq .diqu').val();
      if(areasheng==0||areashi==0||areaqu==0){
      	if(areasheng==0){
      		 layer.msg('请选择省',{time:2000,})
      	}else if(areashi==0){
             layer.msg('请选择市',{time:2000,})
      	}else if(areaqu==0){
             layer.msg('请选择区',{time:2000,})
      	}	
      }else{
      	  $(this).parent('.bianjicunqu').addClass('yincang');
          $('.areadiv').hide();
          $('.citydiv').hide();
          $('.province').hide();
          $('.middlebianji .localdiqu').show();
          $(this).closest('.fujixz').children().children('.xiugai').show();
          $(this).closest('.fujixz').children().children('.xiugai').children('span').hide();
          $('.middlebianji .localdiqu').html(areasheng+'-'+areashi+'-'+areaqu)
      }
   	  
   });


   $('.xinxquyu .fujixz').mouseenter(function(){
   	 if($(this).children().children('.xiugai').children('span').css('display')=='none' && $(this).children().children('.bianjicunqu').hasClass('yincang')){
   	 	$(this).children().children('.xiugai').children('span').show();
   	 }
   });

   //  $('.xinxquyu .fujixz').mouseleave(function(){
   // 	 if($(this).children().children('.xiugai').children('span').css('display')=='inline-block'){
   // 	 	$(this).children().children('.xiugai').children('span').hide();
   // 	 }
   // });
  }(jQuery);

  +function($){
  $('.xinxquyu .touxiang').click(function(event) {
  	  $('.clipyinying').show();
      $('.clipwaik').show();
  });

  $('.anxiuwk .closequx').click(function(event) {
  	  $('.clipyinying').hide();
      $('.clipwaik').hide();
  });



  var countdown=60; 
		function settime(obj) { 
		if (countdown == 0) { 
		obj.removeAttribute("disabled"); 
		obj.value="获取验证码"; 
		countdown = 60; 
		return;
		} else { 
		obj.setAttribute("disabled", true); 
		obj.value="重新发送(" + countdown + ")"; 
		countdown--; 
		} 
		setTimeout(function() { 
		settime(obj) }
		,1000) 
		}

		$('.yanzengmwk .btnyzm').click(function(event) {
            settime(this)
        });

        $('.passwordmm .chongse').click(function(event) {
        	$('.clipyinying').show();
        	$('.guidetanc').show();
        });

        $('.surewk .sureqr').click(function() {
            var reg = new RegExp("^(13|14|15|17|18)[0-9]{9}$"),
                reg2 = new RegExp("^174|175[0-9]{8}$"),
                shoujival = $('.phonewk input').val(),
                yanzhengma = $('.yanzengmwk input').val();
                if(shoujival==''){
                  $('.phonewk input').focus();
                  $('.guidetanc .tjtishi').html("手机号码不能为空").show();
                  return false;
                }else if(!reg.test(shoujival)){
                   $('.phonewk input').focus();
                   $('.guidetanc .tjtishi').html("请填写正确的手机号").show();
                   return false;
                }else if(reg2.test(shoujival)){
                   $('.phonewk input').focus();
                   $('.guidetanc .tjtishi').html("请填写正确的手机号").show();
                   return false;
                }else{
                    $('.guidetanc .tjtishi').html("手机号码不能为空").hide();
                }

                if(yanzhengma==''){
                   $('.guidetanc .tjtishi').html("请填写验证码").show();
                   return false;
                }else{
                    $('.guidetanc .tjtishi').hide();
                    $('.guidetanc').hide()
                    $('.guidetanc2').show()
                }

            })

         $('.guidetanc .guanbi').click(function(event) {
            $('.clipyinying').hide();
            $('.guidetanc').hide();
         });

         $('.surewk .sureqr2').click(function() {
           var reg = /^[\s\S*]{8,12}$/;
           var newpassval = $('.newpassword input').val(),
               surepassval = $('.surepassword input').val();
           if(newpassval==''){
              $('.newpassword input').focus();
              $('.tjtishi02').html('密码不能为空').show();
              return false
           }else if(reg.test(newpassval)){
              $('.tjtishi02').html('');
           }else{
              $('.newpassword input').focus();
              $('.tjtishi02').html('密码为8-20位数').show();
              return false
           }

           if(surepassval==''){
              $('.surepassword input').focus();
              $('.tjtishi02').html('请确认密码').show();
              return false
           }else if(surepassval!=newpassval){
              $('.surepassword input').focus();
              $('.tjtishi02').html('确认密码与输入密码不一致').show();
              return false
           }else if(surepassval==newpassval){
               $('.tjtishi02').html('').show();
              layer.msg('提交成功',{time: 1300},function(){
              	 $('.clipyinying').hide();
                 $('.guidetanc2').hide();
              })
           }

            })

		$('.guidetanc2 .guanbi').click(function(event) {
			$('.clipyinying').hide();
            $('.guidetanc2').hide();
		});
}(jQuery);

