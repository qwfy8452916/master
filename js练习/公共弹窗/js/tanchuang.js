
;(function($){

var defaultobject={
    text:'我知道了',
   closezhix:function(){

   }
}

var p_fadeIn=function(a,b){
    $('body').append(a);
    $('body').append(b);
    a.fadeIn();
    b.fadeIn();
}

$.fn.tanchaugn=function(options){
   var parms=$.extend(defaultobject,options);
   var yinying='<div class="rulesyiny"></div>';
   var tanccontent='<div class="rulesneirogn"><div class="rules-title">活动规则</div><p class="rulesnr">1、11月1日至11月12日,每天00:00发放IT数码品类立1111元优惠券,优惠券有效期为11月1日00:00-11月2日23:59;</p><p class="rulesnr">2、每种优惠券每个ID限领一张券;白条优惠券可与商城优惠叠加,白条优惠不可叠加使用。</p><div class="knowniu">'+parms.text+'</div></div>';
   p_fadeIn($(yinying),$(tanccontent))
}

$('body').on('click','.knowniu',function(){
    defaultobject.closezhix();
     $('.rulesyiny').fadeOut();
     $('.rulesneirogn').fadeOut();
})

})(jQuery)







