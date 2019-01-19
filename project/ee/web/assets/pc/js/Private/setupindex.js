
    	$(function(){

    		$('.paixu').click(function(event) {
    	  	if($(this).hasClass('fa-caret-down')){
               $(this).removeClass('fa-caret-down');
               $(this).addClass('fa-caret-up')
    	  	}else{
    	  	   $(this).addClass('fa-caret-down');
               $(this).removeClass('fa-caret-up')
    	  	}
    	  });

    	  $('.classification').click(function(event) {
    	  	 $('.edit-fl').text("添加供应商分类");
    	  	 $('.fenleiname').val("");
    	  	 $('.p-backbj').fadeIn();
          	 $('.addtanchuang').fadeIn();
    	  });

    	  $('.p-suppliertab .p-eidt').click(function(event) {
    	  	 $('.edit-fl').text("编辑供应商分类");
    	  	 $('.tishi').html("");
			  var that =  $(this);
			  var tr = that.parent().parent().parent();
			  $("input[name=category_name ]").val(tr.find('.category_name').text());
			  $("input[name=category_id ]").val(that.parent().parent().attr('data-id'));
    	  	 $('.p-backbj').fadeIn();
           $('.addtanchuang').fadeIn();
    	  });

			$('.p-suppliertab .p-delete').click(function(event) {
				var that = $(this);
				var amount  = that.parent().parent().parent().find('.category_amount').text();
				var category_id =  that.parent().parent().attr('data-id');
				$(this).p_confirm({
					"confirmText":"确定要删除该供应商吗？",
					okFun:function(){

						if(amount!=0){
							$('.cannotms').text("该分类存在关联供应商，无法删除。");
							$('.p-backbj').fadeIn();
							$('.operationtc').fadeIn();
						}else{
							$.ajax({
								url: '/category/delete/',
								type: 'POST',
								dataType: 'JSON',
								data: {category_id:category_id}
							})
								.done(function(data) {
									if(data.status == 0){
										tishitip('操作成功',1);
										setTimeout(function(){window.location.href="/category/";},1000)
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
          });

          $('.addtanchuang .p-close').click(function(event) {
          	 $('.p-backbj').fadeOut();
          	 $('.addtanchuang').fadeOut();
          });

          $('.deletetk-foot .deletetk-sure').click(function(event) {
          	$('.p-backbj').fadeOut();
          	$('.deletetk').fadeOut();
          });

          $('.deletetk-foot .cancelniu').click(function(event) {
          	$('.p-backbj').fadeOut();
          	$('.deletetk').fadeOut();
          });


          $('.caozuosurewk').click(function(event) {
          	 $('.p-backbj').fadeOut();
			 $('.operationtc').fadeOut();
          });

			$('.savebc').click(function(){
				var category_name = $.trim($("input[name=category_name ]").val());
				var category_id = $("input[name=category_id ]").val();
				if(category_name==""){
                  $('.tishi').html("");
                  $('.gongys-tishi').html("请输入供应商名称");
                  return false;
				}else{
					$('.tishi').html("");
				}
				$.ajax({
					url: '/category/add/',
					type: 'POST',
					dataType: 'JSON',
					data: {category_name: category_name, category_id:category_id}
				})
					.done(function(data) {
						if(data.status == 0){
							tishitip('操作成功',1);
							var dataOrder = $('.paixu').attr('data-order');
							setTimeout(function(){window.location.href="/category/?order="+dataOrder;},100)
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
					window.location = '/category/?order=2';
				}else{
					window.location = '/category/?order=1';
				}

			})

    	})