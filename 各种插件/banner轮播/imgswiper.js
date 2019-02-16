+(function($){
  
    var morenindex=0,
    piclength;
  $.fn.imgswiper=function(option){
    var dewidth=option.option,
        imgarr=option.imgarr,
        length=imgarr.length,
        imgleft=morenindex=option.currindex?option.currindex:0;

        
        $('body').append('<div class="showkuang"><ul class="bannerlength" style="margin-left:-'+imgleft*520+'px"></ul><span class="niu niu_pre"><</span><span class="niu niu_next">></span></div>');
        for(var i=0;i<length;i++){
          var li='<li data-id="0"><img src="'+imgarr[i].imgpath+'" alt="'+imgarr[i].imgname+'"></li>';
          $('.bannerlength').append(li)
        }

        piclength=length;

  }




    $('body').on('click','.niu_pre',function(){
        if(morenindex==piclength-1){
          return
        }
        morenindex++;
        $('.bannerlength').animate({"margin-left":-(morenindex)*520+"px"},400)
    })
    

    $('body').on('click','.niu_next',function(){
        if(morenindex==0){
          return;
        }
        morenindex--;
        $('.bannerlength').animate({"margin-left":-(morenindex)*520+"px"},400)
    })


})(jQuery)












