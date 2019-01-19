$(function(){

    var flag = true;
    $('.savebaocun').click(function() {
        var Feedbackcontent = $.trim($('.fankuinr').val());
        if(Feedbackcontent == ''){
            tishitip('请输入内容',2);
            return false;
        }
        if(Feedbackcontent.length > 500){
            tishitip('最多可输入为500字',2);
            return false;
        }

        if(flag==true){
          flag=false;
          //验证
          if(Feedbackcontent){
          $.ajax({
              url: '/userset/addFeedback',
              type:'POST',
              dataType: 'JSON',
              data: {feedbackcontent:Feedbackcontent}
          })
            .done(function(data) {
                if(data.status == 0){
                    var tishixin = data.info;
                    tishitip(tishixin,2);
                    flag=true;
                }else{
                    var tishixin = "操作成功！";
                    tishitip(tishixin,1);
                    $('.fankuinr').val('');
                    flag = true;
                }
            })
            .fail(function(xhr) {
                var tishixin = "发生未知错误，请稍后重试~";
                tishitip(tishixin,2);
                return false;
            })
          }else{
              var tishixin = "请输入内容";
              tishitip(tishixin,2);
              return false;
          }

       }


    });




})

