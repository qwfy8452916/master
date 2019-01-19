/*
* @Author: qz_dc
* @Date:   2018-09-04 10:19:49
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-12 10:19:48
*/
$(function(){
    document.querySelector('#work').addEventListener('click', function () {
      weui.picker([{
          label: '请选择',
          value: '',
      }, {
          label: '木工',
          value: 1
      }, {
          label: '瓦工',
          value: 2
      }, {
          label: '油漆工',
          value: 3
      }, {
          label: '其他',
          value: 4
      }], {
          title:'工种',
          className: 'custom-classname',
          onChange: function (result) {
              //console.log(item, index);
              // console.log(result);
          },
          onConfirm: function (result) {
              // console.log(result);
              $("#work").html(result[0].label);
              $("#work").attr('data-values',result[0].value);
              $("#work").css('color','#000');
          },
          id: 'picker'
      });
    });

    $('.save').click(function(event) {
      var name = $('.name').val();
      var tel = $('.tel').val();
      var work = $('#work').attr('data-values');
      var reg = new RegExp("^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
      if(name =="") {
        $.toptip('请输入姓名')
      }else if(tel =="") {
        $.toptip('请输入手机号')
      }else if(!reg.test(tel)) {
        $.toptip('请输入正确手机号码')
      }else if(work ==""){
        $.toptip('请选择工种')
      }
      else $.toptip('提交成功', 'success');
    });
})