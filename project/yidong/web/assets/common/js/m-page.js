(function() {
    $("#page-count").click(function(){
        $("#mask1").fadeIn();
        $("#jump-num-box").animate({
            bottom:"0px"
        });
    });
    $("#mask1").click(function(){
         $("#mask1").fadeOut();
         $("#jump-num-box").animate({
            bottom:"-20em"
         });
    });
})();
