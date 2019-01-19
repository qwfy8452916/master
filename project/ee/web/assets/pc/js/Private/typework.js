$(function () {


    $('.paixu').click(function (event) {
        if ($(this).hasClass('fa-caret-down')) {
            $(this).removeClass('fa-caret-down');
            $(this).addClass('fa-caret-up')
        } else {
            $(this).addClass('fa-caret-down');
            $(this).removeClass('fa-caret-up')
        }
    });

    //点击新增
    $('.classification').click(function (event) {
        $('.fenlei-tishi').html("");
        $('.edit-fl').text("添加工种")
        $('.p-backbj').show();
        $('.addtanchuang').show();
        //将页面编辑的id删除,就是添加操作
        $("input[name=edit_id]").val('');
        $("input[name=type_name]").val('');
    });

    $('.p-suppliertab .editbj span').click(function (event) {
        $('.fenlei-tishi').html("");
        $('.edit-fl').text("编辑工种")
        $('.p-backbj').show();
        $('.addtanchuang').show();
        //将页面编辑的id删除,就是添加操作
        $("input[name=edit_id]").val('');
        $("input[name=type_name]").val('');
    });

    //保存操作
    $(".save").on('click', function () {
        var edit_id = $("input[name=edit_id]").val();
        var type_name = $.trim($("input[name=type_name]").val());
        if (type_name == "") {
            $('.tishi').html("");
            $('.fenlei-tishi').html("请输入工种名称");
            return false;
        } else {
            $('.tishi').html("");
        }

        $.ajax({
            url: '/worktype/edit',
            type: 'POST',
            dataType: 'JSON',
            data: {edit_id: edit_id, type_name: type_name}
        })
            .done(function (data) {
                $('.fenlei-tishi').html("");
                if (data.error_code == 0) {
                    tishitip('保存成功', 1)
                    window.location.href = window.location.href;
                } else {
                    $('.fenlei-tishi').html(data.error_msg);
                }
            });
    });

    //编辑操作
    $('.editbj span').click(function (event) {
        $('.fenlei-tishi').html("");
        //获取当前id
        var edit_id = $(this).attr('data-id');
        $.ajax({
            url: '/worktype/get',
            type: 'GET',
            dataType: 'JSON',
            data: {edit_id: edit_id}
        })
            .done(function (data) {
                if (data.status == 1) {
                    //修改页面编辑的id,页面名称
                    $("input[name=edit_id]").val(data.data.id);
                    $("input[name=type_name]").val(data.data.name);
                    //显示弹窗
                    $('.edit-fl').text("编辑工种")
                    $('.p-backbj').show();
                    $('.addtanchuang').show();
                } else {
                    tishitip(data.info,2);
                }
            });
    });

    $('.caozuo span').click(function (event) {
        $('.fenlei-tishi').html("");
        //获取当前id
        var edit_id = $(this).attr('data-id');
        $(this).p_confirm({
            "confirmText": "你确定要删除该工种吗？",
            okFun: function () {
                $.ajax({
                    url: '/worktype/del',
                    type: 'DELETE',
                    dataType: 'JSON',
                    data: {edit_id: edit_id}
                })
                    .done(function (data) {
                        if (data.status == 1) {
                         var tishixin="操作成功！";
                          tishitip(tishixin,1)
                          setTimeout(function(){
                            window.location.href = window.location.href;
                          },1000)

                        } else {
                            tishitip(data.info,2);
                        }
                    });
            },
            noFun: function () {

            }
        })
    });


    $('.addtanchuang .foottanc .cancelqx').click(function (event) {
        $('.p-backbj').hide();
        $('.addtanchuang').hide();
    });

    $('.addtanchuang .p-close').click(function (event) {
        $('.p-backbj').hide();
        $('.addtanchuang').hide();
    });


})