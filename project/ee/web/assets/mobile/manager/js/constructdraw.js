/*
* @Author: qz_dc
* @Date:   2018-09-05 14:33:59
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-13 13:51:23
*/
$(function(){
    var pb1 = $.photoBrowser({
        items: [
          "../../assets/mobile/common/img/avator.png",
          "../../assets/mobile/common/img/avator2.png",
          "../../assets/mobile/common/img/avatar.png",
        ],

        onSlideChange: function(index) {
          console.log(this, index);
        },

        onOpen: function() {
          console.log("onOpen", this);
        },
        onClose: function() {
          console.log("onClose", this);
        }
    });
    $(".pb").click(function(event) {
        pb1.open();
    });
})