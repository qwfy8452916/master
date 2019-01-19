$(function(){

    	  $('.classification').click(function(event) {
    	  	 $('.edit-fl').text("添加部门");
    	  	 $('.fenleiname').val("");
    	  	 $('.description').val("");
    	  	 $('.p-backbj').show();
          	 $('.addtanchuang').show();
    	  });

    	  $('.paixu').click(function(event) {
    	  	if($(this).hasClass('fa-caret-down')){
               $(this).removeClass('fa-caret-down');
               $(this).addClass('fa-caret-up')
    	  	}else{
    	  	   $(this).addClass('fa-caret-down');
               $(this).removeClass('fa-caret-up')
    	  	}
    	  });


    	  $('.p-suppliertab .p-edit').click(function(event) {
    	  	 $('.tishi').html("");
    	  	 $('.edit-fl').text("编辑部门");
			  var that =  $(this);
			  var tr = that.parent().parent().parent();
			  $("input[name=dept_name ]").val(tr.find('.dept_name').text());
			  $("textarea[name=dept_desc ]").val(tr.find('.dept_desc').text());
			  $("input[name=dept_id ]").val(that.attr('data-id'));
    	  	  $('.p-backbj').fadeIn();
          	$('.addtanchuang').fadeIn();
    	  });

    	  $('.caozuo a').click(function(event) {
			  var that = $(this);
			  var amount  = that.parent().parent().parent().find('.dept_amount').text();
			  var dept_id =  that.parent().parent().attr('data-id');

			  $(this).p_confirm({
				 "confirmText":"确定要删除该部门吗？",
				 okFun:function(){

				 if(amount!=0){
					 $('.cannotms').text("该部门存在关联人员，无法删除。");
					 $('.p-backbj').fadeIn();
					 $('.operationtc').fadeIn();
				 }else{
					 $.ajax({
						 url: '/department/delete/',
						 type: 'POST',
						 dataType: 'JSON',
						 data: {dept_id:dept_id}
					 })
						 .done(function(data) {
							 if(data.status == 0){
								 tishitip('操作成功',1);
								 setTimeout(function(){ window.location.href="/department/";},1000)
							 }else{
								 tishitip(data.info,2);
							 }
						 })
						 .fail(function(xhr) {
							 tishitip('发生未知错误，请稍后重试~',2);
							 return false;
						 })
				 }

				 },
				 noFun:function(){

				 }
			   })
    	  });

          $('.addtanchuang .foottanc .cancelqx').click(function(event) {
          	 $('.p-backbj').fadeOut();
          	 $('.addtanchuang').fadeOut();
          	 $('.description').val("");
          	 $('.fenleiname').val("")
          });

          $('.addtanchuang .p-close').click(function(event) {
          	 $('.p-backbj').fadeOut();
          	 $('.addtanchuang').fadeOut();
          	 $('.description').val("");
          	 $('.fenleiname').val("")
          });

          $('.deletetk-foot .deletetk-sure').click(function(event) {
          	$('.p-backbj').fadeOut();
          	$('.deletetk').fadeOut();
          });

          $('.deletetk-foot .cancelniu').click(function(event) {
          	$('.p-backbj').fadeOut();
          	$('.deletetk').fadeOut();
          });

          $('.p-suppliertab .prohibit').click(function(event) {
            var that = $(this);
			  var amount  = that.parent().parent().parent().find('.dept_amount').text();
			  var dept_id =  that.parent().parent().attr('data-id');

			  $(this).p_confirm({
             "confirmText":"确定要禁用该部门吗？",
             okFun:function(){
				 if(amount!=0){
					 $('.cannotms').text("该部门存在关联人员，无法禁用。");
					 $('.p-backbj').fadeIn();
					 $('.operationtc').fadeIn();
				 }else{
					 $.ajax({
						 url: '/department/forbid/',
						 type: 'POST',
						 dataType: 'JSON',
						 data: {dept_id:dept_id,dept_status:2}
					 })
						 .done(function(data) {
							 if(data.status == 0){
								 tishitip('操作成功',1);
								setTimeout(function(){ window.location.href="/department/";},1000)
							 }else{
								 tishitip(data.info,2)
							 }
						 })
						 .fail(function(xhr) {
							 tishitip('发生未知错误，请稍后重试~',2)
							 return false;
						 })
				 }
             },
             noFun:function(){

              }
            })

					});
					
        $('.p-suppliertab .openkaiqi').click(function(event) {
			  var that = $(this);
			  var dept_id =  that.parent().parent().attr('data-id');
			  $(this).p_confirm({
				  "confirmText":"确定要启用该部门吗？",
				  okFun:function(){
					  $.ajax({
						  url: '/department/forbid/',
						  type: 'POST',
						  dataType: 'JSON',
						  data: {dept_id:dept_id,dept_status:1}
					  })
						  .done(function(data) {
							  if(data.status == 0){
								  tishitip('操作成功',1);
								  setTimeout(function(){window.location.href="/department/";},1000);
							  }else{
								  tishitip(data.info,2);
							  }
						  })
						  .fail(function(xhr) {
							  tishitip('发生未知错误，请稍后重试~',2);
							  return false;
						  })
				  },
				  noFun:function(){

				  }
			  })

		  });



          $('.caozuosurewk .caozuosurewk-sure').click(function(event) {
          	   $('.p-backbj').fadeOut();
               $('.operationtc').fadeOut();
          });

		  $('.savebc').click(function(){
			  var dept_name = $.trim($("input[name=dept_name ]").val());
			  var dept_desc =  $.trim($("textarea[name=dept_desc ]").val());
			  var dept_id = $("input[name=dept_id ]").val();

              if(dept_name==""){
                 $('.tishi').html("");
                 $('.bumen-tishi').html("请输入部门名称")
                 return false;
              }else{
              	$('.tishi').html("");
              }

			  $.ajax({
				  url: '/department/add/',
				  type: 'POST',
				  dataType: 'JSON',
				  data: {dept_name: dept_name, dept_desc: dept_desc,dept_id:dept_id}
			  })
				  .done(function(data) {
					  if(data.status == 0){
						  tishitip('操作成功',1);
						  var dataOrder = $('.paixu').attr('data-order');
						  setTimeout(function(){ window.location.href="/department/?order="+dataOrder;},100);
					  }else{
						  tishitip(data.info,2);
					  }
				  })
				  .fail(function(xhr) {
					  tishitip('发生未知错误，请稍后重试~',2);
					  return false;
				  })
		  })

			$('.paixu').click(function(){
				var dataOrder = $(this).attr('data-order');
				if(dataOrder == 1){
					window.location = '/department/?order=2';
				}else{
					window.location = '/department/?order=1';
				}
			})
})