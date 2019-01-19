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
    $("#addselect").select2({
        // tags: true,
        // allowClear: true,
        // placeholder: '请选择',
        multiple: true,
    })

    $("#editselect").select2({
        // tags: true,
        // allowClear: true,
        // placeholder: '请选择',
        multiple: true,
    })

    $('body').on('input propertychange', '.select2-search__field', function (event) {
        if ($(this).val().length >= 12) {
            $(this).attr("maxlength", "12");
        }
    });

    $('.departmentxz').select2({
        language: "zh-CN",
        maximumInputLength: 12,
    })
    // 开启编辑弹框
    $('.p-eidt').on('click', function () {
        var id = $(this).attr("data-id");
        $.ajax({
            url: '/workgroup/getWorkerInfoById',
            type: 'POST',
            dataType: 'JSON',
            async: false,
            data: {id:id}
        })
            .done(function (data) {
                if (data.error_code == 0 && data.data.worktype != null) {
                    $("#editselect").val(data.data.worktype).trigger('change')
                    $("#editname").val(data.data.contact_name)
                    $("#editmobile").val(data.data.contact_tel)
                    $("#editaccount").val(data.data.account)
                    $("#edit_id").val(data.data.id)
                    $('#myModal').modal('show')
                }else{
                    tishitip(data.error_msg,2);
                }
            });

    })
    // 开启重置密码弹框
    $('#resetpassword').on('click', function () {
        $('#resetModal').modal('show')
        $('#newpass1').val('')
        $('#newpass2').val('')
    })
    // 开启添加弹框
    $('#add').on('click', function () {
        $('#addModal').modal('show')
        $('#addform')[0].reset()
    })

    // 重置密码保存
    $('#savepassword').on('click', function () {
        console.log(1);
        var Inpassword = $.trim($('#newpass1').val()),
            Surepass = $.trim($('#newpass2').val());
        if (Inpassword == "") {
            $(".passtishi").html("");
            $(".mima-tishi").html("请输入新密码");
            return false;
        }
        var reg4 = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?''""~`{}[\](\){\}:;/]{6,24}/;
        if (Inpassword.length < 6) {
            $(".passtishi").html("");
            $(".mima-tishi").html("请输入6-24位英文、数字或特殊字符");
            return false;
        }
        if (/[\u4E00-\u9FA5]/g.test(Inpassword)) {
            $(".passtishi").html("");
            $(".mima-tishi").html("请不要填写中文");
            return false;
        } 
        if (!reg4.test(Inpassword)) {
            $(".passtishi").html("");
            $('.mima-tishi').html("请不要填写纯数字/纯字母/纯特殊符号");
            return false;
        }
        if (Surepass == "") {
            $(".passtishi").html("");
            $(".sure-tishi").html("请确认新密码");
            return false;
        } else {
            $(".passtishi").html("");
        }
        //密码一致
        if (Surepass != Inpassword) {
            $(".passtishi").html("");
            $(".sure-tishi").html("您两次输入的密码不一致");
            return false;
        }
        var edit_id = $('#edit_id').val().trim()
        $.ajax({
            url: '/workgroup/updatepwd',
            type: 'POST',
            dataType: 'JSON',
            async: false,
            data: {pwd:Surepass,edit_id:edit_id}
        })
            .done(function (data) {
                if (data.error_code == 0) {
                    tishitip(data.error_msg,1);
                    $('#resetModal').modal('hide')
                }else{
                    tishitip(data.error_msg,2);
                }
            });
    })

    // 编辑保存
    $('#editsave').on('click', function () {
        var data = new Object();
        data.edit_id = $('#edit_id').val().trim()
        data.Phonenumber = $('#editmobile').val().trim()
        data.Staffname = $('#editname').val().trim()
        data.Phonenumber = $('#editmobile').val().trim()
        data.Loginumber = $('#editaccount').val().trim()
        data.Weixinnumber = "无";
        data.WorkType = $('#editselect').val()

        $('.yz').text('')
        if (data.edit_id == "") {
            tishitip("操作异常",2);
            $('#myModal').modal('hide')
            return false;
        }
        if (data.Staffname == "") {
            $('.yz.editname').text("请输入工人姓名");
            return false;
        }
        if (data.WorkType == null) {
            $('.yz.editselect').text("请选择工种");
            return false;
        }
        if (data.Loginumber == '') {
            $('.yz.editaccount').text("请输入登录账号");
            return false;
        }
        if (data.Loginumber.length < 6) {
            $('.yz.editaccount').text("请输入6-18位中英文、数字或特殊字符。");
            return false;
        }
        //保存
        save(data);
    })

    // 添加保存
    $('#addsave').on('click', function () {
        var data = new Object();
        data.Staffname = $('#addname').val().trim()
        data.Loginumber = $('#addaccount').val().trim()
        data.Phonenumber = $('#addmobile').val().trim()
        data.Phonenumber = $('#editmobile').val().trim()
        data.Weixinnumber = "无";
        data.WorkType = $('#addselect').val()
        data.Passwordtext = $('#addpassword').val().trim()
        $('.yz').text('')
        if (data.Staffname == "") {
            $('.yz.addname').text("请输入工人姓名");
            return false;
        }
        if (data.WorkType == null) {
            $('.yz.addselect').text("请选择工种");
            return false;
        }
        if (data.Loginumber == '') {
            $('.yz.addaccount').text("请输入登录账号");
            return false;
        }
        if (data.Loginumber.length < 6) {
            $('.yz.addaccount').text("请输入6-18位英文、数字或特殊字符。");
            return false;
        }
        if (data.Passwordtext == "") {
            $('.yz.addpassword').html("请输入登录密码");
            return false;
        }
        var reg2 = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?''""~`{}[\](\){\}:;/]{6,24}/;
        if (data.Passwordtext.length < 6) {
            $(".yz.addpassword").html("请输入6-24位英文、数字或特殊字符");
            return false;
        }
        if (/[\u4E00-\u9FA5]/g.test(data.Passwordtext)) {
            $(".yz.addpassword").html("请不要填写中文");
            return false;
        } 
        if (!reg2.test(data.Passwordtext)) {
            $('.yz.addpassword').html("请不要填写纯数字/纯字母/纯特殊符号");
            return false;
        }
        //保存
        save(data);
    })

    /**
     * 保存数据
     * @param data
     */
    function save(data) {
        $.ajax({
            url: '/workgroup/save',
            type: 'POST',
            dataType: 'JSON',
            data: data
        })
            .done(function (data) {
                if (data.error_code == 0) {
                    tishitip('操作成功',1);
                    $('.modal').modal('hide')
                    setTimeout(function(){
                        window.location.href = '/workgroup';
                    },1000)

                } else if (data.error_code == 400021){
                    //验证账号唯一性
                    $('#addaccount').focus();
                    tishitip(data.error_msg,2);
                    return false;
                }else if (data.error_code == 400022){
                    //验证姓名唯一性
                    $('#addname').focus();
                    tishitip(data.error_msg,2);
                    return false;
                }
                else
                {
                    tishitip(data.error_msg);
                }
            });
    }

    //禁用按钮
    $('.prohibit').click(function (event) {
        var that = this;
        var edit_id = $(that).attr('data-id');
        $(this).p_confirm({
            "confirmText": "确定要禁用该施工组吗？",
            okFun: function () {
                $.ajax({
                    url: '/workgroup/change',
                    type: 'POST',
                    dataType: 'JSON',
                    async: false,
                    data: {status:1,edit_id:edit_id}
                })
                    .done(function (data) {
                        if (data.error_code == 0) {
                            tishitip(data.error_msg,1);
                            setTimeout(function(){
                                window.location.href = '/workgroup';
                            },1000)
                        }else{
                            tishitip(data.error_msg,2);
                        }
                    });
            },
            noFun: function () {}
        })
    });

    //启用按钮
    $('.enable').click(function (event) {
        var that = this;
        var edit_id = $(that).attr('data-id');
        $(this).p_confirm({
            "confirmText": "确定要启用该施工组吗？",
            okFun: function () { $.ajax({
                url: '/workgroup/change',
                type: 'POST',
                dataType: 'JSON',
                async: false,
                data: {status:2,edit_id:edit_id}
            })
                .done(function (data) {
                    if (data.error_code == 0) {
                        tishitip(data.error_msg,1);
                        setTimeout(function(){
                            window.location.href = '/workgroup';
                        },1000)
                    }else{
                        tishitip(data.error_msg,2);
                    }
                });
            },
            noFun: function () {}
        })
    });

    //删除按钮
    $('.delete-group').click(function (event) {
        var that = this;
        var edit_id = $(that).attr('data-id');
        $(this).p_confirm({
            "confirmText": "确定要删除该施工组吗？",
            okFun: function () {
                $.ajax({
                    url: '/workgroup/del',
                    type: 'POST',
                    dataType: 'JSON',
                    async: false,
                    data: {edit_id:edit_id}
                })
                    .done(function (data) {
                        if (data.error_code == 0) {
                            tishitip(data.error_msg,1);
                            setTimeout(function(){
                                window.location.href = '/workgroup';
                            },1000)
                        }else{
                            tishitip(data.error_msg,2);
                        }
                    });
            },
            noFun: function () {}
        })
    });




})