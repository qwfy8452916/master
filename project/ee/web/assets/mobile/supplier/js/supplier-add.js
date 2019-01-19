/*
* @Author: jsb
* @Date:   2018-08-31 10:16:01
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-12 10:19:23
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
        $('#style').css('color',"#333");
        $('.panel-overlay').fadeOut();
        $('.panel-right').fadeOut();
    });

    $('.save').click(function(event) {
      var gongying = $('.gongying').val();
      var lianxi = $('.lianxi').val();
      var tel = $('.tel').val();
      var style = $('#style').attr('data-values');
      var reg = new RegExp("^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
      if(gongying =="") {
        $.toptip('请输入供应商名称')
      }else if(lianxi =="") {
        $.toptip('请输入联系人')
      }else if(tel =="") {
        $.toptip('手机号输入有误，请重新输入')
      }else if(!reg.test(tel)) {
        $.toptip('请输入正确手机号码')
      }else if(style ==""){
        $.toptip('请至少选择一个分类')
      }
      else $.toptip('提交成功', 'success');
    });
})