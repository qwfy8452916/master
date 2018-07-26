/*
* @Author: qz_xsc
* @Date:   2018-06-09 13:54:13
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-06-27 09:04:03
*/
!(function ($) {
  $.fn.extend({
    dropLoadMore:function(chuan){
        var _this=$(this);
        _this.after("<div class='loading-container'></div>")
        var beforeScrollTop = $(window).scrollTop();
        var delta=0;
        var dropLock=true;
        var children_num=_this.children().length;
        if(children_num==chuan.parms.pageSize){
             window.addEventListener("scroll", function() {
                var afterScrollTop = $(window).scrollTop(),
                    delta = afterScrollTop - beforeScrollTop;
                    if(delta>0){
                        var scrHeight=$(window).scrollTop();
                        var docHeight=$(document).height();
                        var winHeight=$(this).height();
                        var distance=docHeight-scrHeight-winHeight;
                        if(distance<100){
                            if(dropLock){
                                dropLock=false;
                                   $(".loading-container").fadeIn(0);
                                   $.ajax({
                                    url:chuan.ajaxUrl,
                                    dataType:'json',
                                    type:'get',
                                    data:chuan.parms,
                                    success:function(data){
                                      if(data.status==1&&data.data.length>0){
                                        chuan.appendEle(data,_this,chuan.parms.page);
                                        chuan.parms.page++;
                                        dropLock=true;
                                      }else{
                                        if(data.data.length==0){
                                            $(".loading-container").after("<div class='no-more'>更多商品持续更新中，敬请期待</div>")
                                        }
                                        $(".loading-container").fadeOut(0);
                                        return false
                                      }
                                      $(".loading-container").fadeOut(0);
                                    },
                                    erorr:function(){
                                        $(".loading-container").fadeOut(0);
                                    }
                                   })
                            }
                        }
                    }
                    beforeScrollTop = afterScrollTop;
            });
        }
        }

  });
})(jQuery);
