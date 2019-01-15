 var ullilength=$('.companylogin ul li').length;
            var kuandu=$('.companylogin ul li').outerWidth(true)+2;
            var ulkuandu=kuandu*ullilength;
            var xianzhikd=kuandu*5
            if(ulkuandu>=xianzhikd){
                $('.companylogin ul').width(xianzhikd)
            }else{
                $('.companylogin ul').width(ulkuandu) 
            }

      new JRoll(".companylogin",{scrollX:true,scrollY:false});


       


        $(function(){

           var sw=new Swiper(".swiper-container",{
                  autoplay: 5000,
                  loop : true,
                  nextButton: '.swiper-button-next',
                  prevButton: '.swiper-button-prev',
            });

               
            //    活动规则
             $('.zxxianghaoli01 .huodrule').click(function(){
                 $('.rulesyiny').fadeIn();
                 $('.rulesneirogn').fadeIn();
             })

             $('.rulesneirogn .knowniu').click(function(){
                $('.rulesyiny').fadeOut();
                $('.rulesneirogn').fadeOut();
             })
             //    活动规则

             //  确认量房
             $('.sureliagnfwk .sureniu').click(function(){
                $('.rulesyiny').fadeIn();
                $('.surelfwk').fadeIn();
             })

            
             $('.sureniuwk .consolider').click(function(){
                $('.rulesyiny').fadeOut();
                $('.surelfwk').fadeOut();
             })

             $('.sureniuwk .surequeren').click(function(){
                $('.rulesyiny').fadeOut();
                $('.surelfwk').fadeOut();
             })
             //  确认量房

            //   未确认量房点击立即领取弹窗 
             $('.takeendyy .nolftake').click(function(){
                $('.rulesyiny').fadeIn();
                $('.nolfwk').fadeIn();
             })

             $('.nolfwk .nolfniu').click(function(){
                $('.rulesyiny').fadeOut();
                $('.nolfwk').fadeOut(); 
             })
            //   未确认量房点击立即领取弹窗 
            
            // 点击已领完弹窗
            $('.takeendyy .endtakedj').click(function(){
                $('.rulesyiny').fadeIn();
                $('.takeendwk').fadeIn();
            })
            $('.takeendwk-niu').click(function(){
                $('.rulesyiny').fadeOut();
                $('.takeendwk').fadeOut();
            })
            // 点击已领完弹窗
          
           //   领取成功弹窗
          $('.youhuiqwk .cantake').click(function(){
                $('.rulesyiny').fadeIn();
                $('.takesuccesswk').fadeIn();
          })

          $('.takesuccesswk-close').click(function(){
                $('.rulesyiny').fadeOut();
                $('.takesuccesswk').fadeOut();
          })

          if($("body").height()<$("html").height()){
            $("article").height($("html").height() - $("#footer").outerHeight()-$('header').outerHeight())
          }

        })