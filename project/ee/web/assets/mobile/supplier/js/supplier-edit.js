/*
* @Author: qz_dc
* @Date:   2018-09-03 15:55:38
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-05 10:07:30
*/
/*
* @Author: jsb
* @Date:   2018-08-31 10:16:01
* @Last Modified by:   jsb
* @Last Modified time: 2018-08-31 17:32:08
*/
$(function(){
    document.querySelector('#balance-way').addEventListener('click', function () {
      weui.picker([{
          label: '请选择',
          value: 0
      }, {
          label: '月结',
          value: 1
      }, {
          label: '及时付款',
          value: 2
      }, {
          label: '季度结',
          value: 3
      }, {
          label: '其他',
          value: 4
      }], {
          title:'结算方式',
          className: 'custom-classname',
          onChange: function (result) {
              //console.log(item, index);
              // console.log(result);
          },
          onConfirm: function (result) {
              // console.log(result);
              $("#balance-way").html(result[0].label)
              $("#balance-way").attr('data-values',result[0].value)

          },
          id: 'picker'
      });
    });
    $('.style-ul li').click(function(event) {
        $(this).toggleClass('current');
    });
    // 类型多选弹框
    $("#style").click(function(event) {
        $('.panel-overlay').fadeIn();
        $('.panel-right').slideDown();
    });
    // 确认按钮
    $('.ensure').click(function(event) {
        var arr = [];
        var value = [];
        for(var i = 0;i < $('.current').length;i++){
            arr.push($('.current').eq(i).text());
            value.push($('.current').eq(i).attr('data-values'))
        }
        $('#style').text(arr);
        $('#style').attr('data-values',value);
        $('.panel-overlay').fadeOut();
        $('.panel-right').fadeOut();
    });

})