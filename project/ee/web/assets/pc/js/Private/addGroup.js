$(function () {



    var shigongcount=$('.p-suppliertab tbody .group_user').length;
     $('.classification .shigongsl').text(shigongcount)

    $(".cancelbtn").on('click', function () {
        window.location.href = '/workgroup'
    })

    $('.p-suppliertab').on("click", ".delquchu", function () {
        $(this).parent().parent('tr').remove();
        shigongcount=parseInt($('.p-suppliertab tbody .group_user').length);
        console.log(shigongcount)
        $('.classification .shigongsl').text(shigongcount)
    })


    $('.wrapadd').click(function (event) {
        var worktypeSelect = $(".worktypeSelect .work_type").html();
        $('.wraptbody').append("<tr class='group_user'><td><span class='tdspan'><input type='text' class='work_name' placeholder='请输入施工人员姓名'><div class='tishi work_name-tishi'></div></span></td><td><select class='p-input work_type'>" + worktypeSelect + "</select><div class='tishi selectgz-tishi'></div></td><td><span class='tdspan'><input type='text' class='work_tel' placeholder='请输入施工人员手机号' maxlength='11'><div class='tishi work_tel-tishi'></div></span></td><td><span class='tdspan'><input type='text' class='work_wx' placeholder='请输入施工人员微信号'><div class='tishi work_wx-tishi'></div></span></td><td><span class='delquchu'>删除</span></td></tr>");
           $('.work_type').last().find('option').removeAttr("selected")
        shigongcount=parseInt($('.p-suppliertab tbody .group_user').length);
        $('.classification .shigongsl').text(shigongcount)
    });

    
     

    //保存
    $('.savebaocun').click(function (event) {
        //验证
        var group_name = $.trim($(".group_name").val());//施工组
        var project_user = $.trim($(".project_user").val());//项目经理
        var manager_wortype = $.trim($(".manager_wortype").val());//项目经理工种
        var edit_id = $(".edit_id").val();
        if (!group_name) {
            $('.tishi').html("");
            $('.shigzu-tis').html("请输入施工组名称")
            return false;
        }
        if (!project_user) {
            $('.tishi').html("");
            $('.xiangmu-tish').html("请选择项目经理")
            return false;
        }
        $('.tishi').html("");
        //获取参数
        var group_user = [];
        var send = true;
        $.each($('.group_user'), function (k, v) {
            send = true;
            var _this = $(this);
            var work_name = $.trim(_this.find(".work_name").val());
            if (!work_name) {
                $('.tishi').html("");
                _this.find('.work_name-tishi').html("请输入施工人员姓名")
                send = false;
                return false;
            }
            var work_type = $.trim(_this.find(".work_type").val());
            if (!work_type) {
                $('.tishi').html("");
                _this.find('.selectgz-tishi').html("请选择工种")
                send = false;
                return false;
            }
            var work_tel = $.trim(_this.find(".work_tel").val());
            if (!work_tel) {
                $('.tishi').html("");
                _this.find('.work_tel-tishi').html("请输入手机号")
                send = false;
                return false;
            }

            if (!telReg(work_tel)) {
                $('.tishi').html("");
                _this.find('.work_tel-tishi').html("请输入正确的手机号")
                send = false;
                return false;
            }
            $('.tishi').html("");


            var work_wx = $.trim(_this.find('.work_wx').val());
            send = true;
            group_user.push({work_name: work_name, work_type: work_type, work_tel: work_tel, work_wx: work_wx});
        });
        //发送数据
        if (send) {
            save(group_name, project_user, group_user, edit_id, manager_wortype);
        }
    });

})

/**]
 * 添加施工组信息
 * @param group_name 施工组名
 * @param project_user 项目经理
 * @param group_user 施工人员信息
 */
function save(group_name, project_user, group_user, edit_id, manager_wortype) {
    $(".shigzu-tis").html('');
    $.ajax({
        url: '/workgroup/save',
        type: 'POST',
        dataType: 'JSON',
        data: {
            group_name: group_name,
            project_user: project_user,
            group_user: group_user,
            edit_id: edit_id,
            manager_wortype: manager_wortype
        }
    })
        .done(function (data) {
            if (data.error_code == 0) {
                var tishixi = "操作成功";
                tishitip(tishixi, 1);
                window.location.href = '/workgroup';
            }else if(data.error_code == 400021){
                $(".shigzu-tis").html(data.error_msg);
            } else {
                tishitip(data.error_msg,2);
            }
        });
}