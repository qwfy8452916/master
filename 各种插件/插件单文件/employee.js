$(function () {


    $('.paixu').click(function(event) {
          if($(this).hasClass('fa-caret-down')){
               $(this).removeClass('fa-caret-down');
               $(this).addClass('fa-caret-up')
          }else{
               $(this).addClass('fa-caret-down');
               $(this).removeClass('fa-caret-up')
          }
        });

    $('.formniuiwk .sousniu').click(function (event) {
        $('.staffname').val($.trim($('.staffname').val()));
        $('.departmentxz').val($.trim($('.departmentxz').val()));
        $('.positionxz').val($.trim($('.positionxz').val()));
        $('.statusxz').val($.trim($('.statusxz').val()));
        $(".search_form").submit();
    });

    $('.formniuiwk .resetniu').click(function (event) {
        $('.staffname').val("");
        $('.departmentxz').val("");
        $('.positionxz').val("");
        $('.statusxz').val("");

    });

    //禁用操作
    $('.disableniu').click(function (event) {
        var data = new Object(),
        kaiqigbms=$(this).text()+"成功";
        data.status = $(this).attr('data-status');
        data.edit_id = $(this).attr('data-id');
        that=$(this);
        $(this).p_confirm({
            "confirmText": "确定要" + $(this).text() + "该选项吗？",
            okFun: function () {
                $.ajax({
                    url: '/employee/change',
                    type: 'POST',
                    dataType: 'JSON',
                    data: data
                })
                    .done(function (data) {
                        if (data.error_code == 0) {
                            tishitip(kaiqigbms,1);
                             window.location.reload();

                        } else {
                            tishitip(data.error_msg,1);
                            return false;
                        }
                    });
            },
            noFun: function () {
            }
        })
    });

    //删除操作
    $('.delniu').click(function (event) {
        var edit_id = $(this).attr('data-id');
        var datacount=parseInt($('.p-total-num').text());
        var that=this;
        $(this).p_confirm({
            "confirmText": "确定要删除该选项吗？",
            okFun: function () {
                $.ajax({
                    url: '/employee/del',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {edit_id: edit_id}
                })
                    .done(function (data) {
                        if (data.error_code == 0) {
                            var tishixin="操作成功！";
                            tishitip(tishixin,1)
                            $(that).parents('tr').remove();
                            $('.p-total-num').text(datacount-1)

                        } else {
                            tishitip(data.error_msg,0);
                            return false;
                        }
                    });
            },
            noFun: function () {
            }
        })
    });


    $('.deletetk-sure').click(function (event) {
        $('.p-backbj').hide();
        $('.deletetk').hide();
    });

    $('.deletetk-sure').click(function (event) {
        if ($('.deletetk').attr("switchkg") == "2") {
            $('.cannotms').text("该部门存在关联人员，无法禁用。");
            $('.p-backbj').show();
            $('.operationtc').show();
        } else if ($('.deletetk').attr("switchkg") == "1") {
            $('.cannotms').text("该部门存在关联人员，无法删除。");
            $('.p-backbj').show();
            $('.operationtc').show();
        }
    })

    $('.deletetk-foot .cancelniu').click(function (event) {
        $('.p-backbj').hide();
        $('.deletetk').hide();
    });

    $('.caozuosurewk .caozuosurewk-sure').click(function (event) {
        $('.p-backbj').hide();
        $('.operationtc').hide();
    });


})