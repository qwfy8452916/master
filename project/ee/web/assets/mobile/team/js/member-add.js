/*
* @Author: jsb
* @Date:   2018-09-01 08:55:40
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-30 17:41:12
*/
$(function () {
    document.querySelector('#department').addEventListener('click', function () {
        weui.picker($.parseJSON(deptSelect), {
            title: '部门',
            className: 'custom-classname',
            onChange: function (result) {
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                $("#department").html(result[0].label);
                $("#department").attr('data-values',result[0].value);
                $("#department").css('color','#333');
            },
            id: 'picker'
        });
    });
    document.querySelector('#station').addEventListener('click', function () {
        weui.picker($.parseJSON(stationSelect), {
            title: '岗位',
            className: 'custom-classname',
            onChange: function (result) {
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                $("#station").html(result[0].label);
                $("#station").attr('data-values', result[0].value);
                $("#station").css('color','#333');
            },
            id: 'picker'
        });
    });

    $('.user').on("keyup", function () {
        $(this).val($(this).val().replace(/\s+/g,""));
    });
    $('.psw').on("keyup", function () {
        $(this).val($(this).val().replace(/\s+/g,""));
    });
    /**
     * 保存按钮 , 验证
     */
    $('.save').click(function (event) {
        var data = new Object();
        data.Staffname = $('.name').val();
        data.Phonenumber = $('.tel').val();
        data.Wechat = $('.wechat').val();
        data.Departmentxz = $('.department').attr('data-values');
        data.Postxz = $('.station').attr('data-values');
        data.Loginumber = $('.user').val();
        data.Passwordtext = $('.psw').val();
        data.Weixinnumber = $('.wechat').val();
        data.edit_id = $('input[name=edit_id]').val();
        var reg = new RegExp("^((13[0-9])|(14[5,7,8,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
        var reg2=/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?]{6,24}/;



        if (data.Staffname == "") {
            $.toptip('请输入姓名');
        } else if (data.Phonenumber == "") {
            $.toptip('请输入手机号');
        } else if (!reg.test(data.Phonenumber)) {
            $.toptip('请输入正确手机号码');
        } else if (data.Departmentxz == "") {
            $.toptip('请选择部门')
        } else if (data.Postxz == "") {
            $.toptip('请选择岗位')
        } else if (data.Loginumber == "") {
            $.toptip('请输入账号')
        } else if ($.trim(data.Loginumber).length < 6) {
            $.toptip('账号请输入6-18位中英文、数字或特殊字符')
        } else if ($('.psw').length > 0){
            if (data.Passwordtext == "") {
                $.toptip('请输入密码')
            } else if (data.Passwordtext.length < 6) {
                $.toptip('密码请输入6-24位英文、数字或特殊字符')
            } else if (!reg2.test(data.Passwordtext)) {
                $.toptip('密码请不要填写纯数字/纯字母/纯特殊符号')
            } else if (data.Wechat!=''){
                if($.trim(data.Wechat).length < 6) {
                    $.toptip('请输入正确的微信号')
                }else save(data);
            } else save(data);
        } else if(data.Wechat!=''){
            if($.trim(data.Wechat).length < 6) {
                $.toptip('请输入正确的微信号')
            }else save(data);
        } else save(data);
    });

    /**
     * 保存数据
     * @param data
     */
    var timer = null;
    function save(data) {
        clearTimeout(timer);
        timer = setTimeout(function(){
            $.ajax({
                url: '/employee/save',
                type: 'POST',
                dataType: 'JSON',
                data: data
            })
            .done(function (data) {
                if (data.error_code == 0) {
                    $.toptip('提交成功', 'success');
                    window.location.href = '/employee';
                } else {
                    $.toptip(data.error_msg)
                    return false;
                }
            });
        },200);
    }
})