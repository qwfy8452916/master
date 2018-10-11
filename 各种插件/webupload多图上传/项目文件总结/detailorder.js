
$(function(){



//遍历渲染图片数据和张数

    for(var j=0; j<$('.getdata').length; j++){
       var Designdata=JSON.parse($('.getdata').eq(j).val());

       var shr="";
      for(var i=0;i<Designdata.length;i++){
        shr+='<div id="WU_FILE1_'+i+'" class="file-item thumbnail"><input class="nameval" type="hidden" value="'+Designdata[i].img+'"/><img src="//'+Designdata[i].img+'"><span class = "cancel delimgbtns delshanchu" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span><div class="info"></div><div class="file-panel" style = "height: 30px;"><input class="inbiaoti" type="text" valur="" placeHolder="点击输入标题"></div></div>'
      }
      $(".kbj").eq(j).find(".uploader-list").html(shr)
      $(".kbj").eq(j).find(".canupload").text($(".kbj").eq(j).find(".file-item").length)
      $(".kbj").eq(j).find(".yuupload").text(9-$(".kbj").eq(j).find(".file-item").length)
    }

      $('.topaddpic').find(".canupload").text($('.topaddpic').find(".file-item").length);
      $('.topaddpic').find(".yuupload").text(9-$('.topaddpic').find(".file-item").length);





  //点击删除图片

     $('.uploader-list').on('click','.delshanchu',function(){
     var that=$(this);
         
         var piccount=$(this).parent().parent('.uploader-list').find(".file-item").length-1;
         that.closest('.uploadpicwk').siblings('.zhangshuxz').children('.canupload').text(piccount);
         that.closest('.uploadpicwk').siblings('.zhangshuxz').children('.yuupload').text(9-piccount);
         $(this).parent().remove();

   })







//顶部施工信息添加



  $('.savecanwk .saveniu').click(function(event) {
     var Shigongstatus=$.trim($('.shigongstatus').val()),
         Ordernumber=$('.ordernumber').val(),
         Boxmoxing=$.trim($('.boxmoxing').val());
        // console.log(Ordernumber)


         var imgList=[];
         var file_item=$(this).parents('.firstpicwk').find('.file-item');
         for(var i=0;i<file_item.length;i++){
            var item={
              'img':file_item.eq(i).find(".nameval").val(),
              'title':file_item.eq(i).find(".inbiaoti").val()
            }
          imgList.push(item)
         }

         $.ajax({
          url:"/build/edit/add",
          type:"post",
          dataType:"json",
          data:{build_state:Shigongstatus,remark:Boxmoxing,build_design:imgList,order_no:Ordernumber},
          success:function(data){
           if(data.error_code==0){
              var tishixin="操作成功！";
              tishitip(tishixin,1)
           }else{
            alert(data.error_msg)
           }
          },
          error:function(xhr){
            alert("请求错误,请稍后再试!");
          }
         })

  });


  //点击编辑

      $("body").on("click",".anniiuwk .editcheck",function(){

         $(this).hide();
         $(this).siblings('.anniiuwk .savecancelwk').show();
         $(this).closest(".shigongwk").find(".newms").attr("contenteditable","true");
         $(this).closest(".shigongwk").find(".newms").removeClass("divnoedit");
         $(this).closest(".shigongwk").find(".delshanchu").css("display","inline-block");
         $(this).closest(".shigongwk").find(".delimgbtns").css("display","inline-block");
         $(this).closest(".shigongwk").find(".defalutaddpic").show();
         window.beizhums=$(this).closest(".shigongwk").find(".remarkms").text();

      })


   //点击保存

      $("body").on("click",".savecancelwk .savebaocun",function(){
        var that=this;
        var shigongstatus=1;
        window.shigongremark=$(this).closest(".shigongwk").find(".remarkms").text();
        var orderdanhao=$('.ordernumber').val(),
          shigongid=$(this).closest(".shigongwk").find(".shigongjilid").val();
          

        var imgList=[];
         var file_item=$(this).closest(".shigongwk").find(".file-item");
         for(var i=0;i<file_item.length;i++){
            var item={
              'img':file_item.eq(i).find(".nameval").val(),
              'title':file_item.eq(i).find(".inbiaoti").val()
            }
          imgList.push(item)
         }

         $.ajax({
          url:"/build/unit/edit",
          dataType:"json",
          type:"post",
          data:{build_state:shigongstatus,remark:shigongremark,build_design:imgList,order_no:orderdanhao,build_id:shigongid,},
          success:function(data){
            if(data.error_code==0){
               $(that).parent(".savecancelwk").hide();
               $(that).parent(".savecancelwk").siblings('.anniiuwk .editcheck').show();
               $(that).closest(".shigongwk").find(".newms").attr("contenteditable","false");
               $(that).closest(".shigongwk").find(".newms").addClass("divnoedit");
               $(that).closest(".shigongwk").find(".delshanchu").css("display","none");
               $(that).closest(".shigongwk").find(".delimgbtns").css("display","none");
               $(that).closest(".shigongwk").find(".defalutaddpic").hide();
               $(that).closest(".shigongwk").find(".file-item").removeClass("upload-state-done");
            }else{
              alert(data.error_msg)
            }

          },
          error:function(xhr){
            alert("请求错误,请稍后再试！")
          }
         })
 

      })


  //点击取消

      $("body").on("click",".savecancelwk .cancelniu",function(){

         var nowgetdata=JSON.parse($(this).closest('.kbj').find('.getdata').val());
         var str2="";
         for(var i=0;i<nowgetdata.length;i++){
            str2+='<div id="WU_FILE1_'+i+'" class="file-item thumbnail"><input class="nameval" type="hidden" value="'+nowgetdata[i].img+'"/><img src="//'+nowgetdata[i].img+'"><span class = "cancel delimgbtns delshanchu" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span><div class="info"></div><div class="file-panel" style = "height: 30px;"><input class="inbiaoti" type="text" valur="" placeHolder="点击输入标题"></div></div>'
         }

         $(this).closest('.kbj').find('.uploader-list').html(str2);
         
         $(this).closest('.kbj').find('.zhangshuxz').children('.canupload').text(nowgetdata.length);
         $(this).closest('.kbj').find('.zhangshuxz').children('.yuupload').text(9-nowgetdata.length);



         $(this).parent(".savecancelwk").hide();
         $(this).parent(".savecancelwk").siblings('.anniiuwk .editcheck').show();
         $(this).closest(".shigongwk").find(".newms").attr("contenteditable","false");
         $(this).closest(".shigongwk").find(".newms").addClass("divnoedit");
         $(this).closest(".shigongwk").find(".delshanchu").css("display","none");
         $(this).closest(".shigongwk").find(".delimgbtns").css("display","none");
         $(this).closest(".shigongwk").find(".upload-state-done").hide();
         $(this).closest(".shigongwk").find(".remarkms").text(beizhums);
         $(this).closest(".shigongwk").find(".defalutaddpic").hide();
      })



        $('#save-btn').click(function(event) {
         var tishixin="操作成功！";
         tishitip(tishixin,1)

         });





        function appendHtml(data){

          var panel="";
          panel=data;
          panel='<div class="newappendwk">'+panel+'</div>';
          $('.shigonghistory').append(panel);
          var thater=$('.shigonghistory').children('.newappendwk:last-child').find(".kbj");
            for(var k=0; k<$(panel).find(".shigongwk").length;k++){
              //点击加载默认图片数据
              var Designdata2=JSON.parse($('.shigonghistory').children('.newappendwk:last-child').find('.getdata').eq(k).val());
              var shr="";
            for(var i=0;i<Designdata2.length;i++){
              shr+='<div id="WU_FILE1_'+i+'" class="file-item thumbnail"><input class="nameval" type="hidden" value="'+Designdata2[i].img+'"/><img src="//'+Designdata2[i].img+'"><span class = "cancel delimgbtns delshanchu" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span><div class="info"></div><div class="file-panel" style = "height: 30px;"><input class="inbiaoti" type="text" valur="" placeHolder="点击输入标题"></div></div>'
            }
            $('.shigonghistory').children('.newappendwk:last-child').find(".kbj").eq(k).find(".uploader-list").html(shr)
            thater.eq(k).find(".canupload").text(thater.eq(k).find(".file-item").length)
            thater.eq(k).find(".yuupload").text(9-thater.eq(k).find(".file-item").length)
              //点击加载默认图片数据

              var index=$('.shigonghistory').children('.newappendwk:last-child').find(".defalutaddpic").eq(k).attr("data-index");
              var className=".filePicker-"+index;
              
              myUp(className, ".fileList-"+index);

            }
        }
         
         //点击获取当前容器
         $("body").on("click",".defalutaddpic",function(){
              var num=parseInt($(this).attr("data-index"));
              $list=$(this).prev(".fileList-"+num);
          });


           $('.loadmorewk .moreload').click(function(event) {
            var that=$(this),
                Ordernumber=$('.ordernumber').val(),
                page = parseInt(that.attr("data-page"));
               $.ajax({
                url:"/build/list",
                dataType:"json",
                type:"get",
                data:{page_current:page,order_no:Ordernumber},
                success:function(data){
                  console.log(data)
                  if(data.error_code==0){
                    if(data.data!=""){
                      appendHtml(data.data);
                      that.attr("data-page",++page)
                      that.text("加载更多")
                    }else{
                      that.text("没有更多历史记录了！")
                    }
                    
                  }else{
                    alert(data.error_msg)
                  }
                },
                error:function(xhr){
                  alert("请求错误，请稍后再试！")
                }
               })
             


        });




    

      //查看示例

      $(".shili").click(function(){
          $(this).erpswiper({
            conWidth:1100,
            imgItem:[{
              imgPath:"/assets/pc/img/Private/tuxiangzs.jpg",
              imgName:"全屋设计"
            },{
              imgPath:"/assets/pc/img/Private/tuxiangzs.jpg",
              imgName:"全屋设计"
            },{
              imgPath:"/assets/pc/img/Private/tuxiangzs.jpg",
              imgName:"全屋设计"
            },{
              imgPath:"/assets/pc/img/Private/tuxiangzs.jpg",
              imgName:"全屋设计"
            },{
              imgPath:"/assets/pc/img/Private/tuxiangzs.jpg",
              imgName:"全屋设计"
            },{
              imgPath:"/assets/pc/img/Private/tuxiangzs.jpg",
              imgName:"全屋设计"
            },{
              imgPath:"/assets/pc/img/Private/tuxiangzs.jpg",
              imgName:"全屋设计"
            }],
            column:3
          })
      })



})


