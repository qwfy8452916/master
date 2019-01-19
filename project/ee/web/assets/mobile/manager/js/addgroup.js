/*
* @Author: qz_dc
* @Date:   2018-09-04 09:16:52
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-12 08:41:44
*/
$(function(){
    document.querySelector('#work').addEventListener('click', function () {
      weui.picker([{
          label: '请选择',
          value: 0
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
      var group = $('.group').val();
      var work = $('#work').val();
      if(group =="") {
        $.toptip('请输入施工组名称')
      }
      else $.toptip('提交成功', 'success');
    });
})