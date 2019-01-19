/*
* @Author: qz_xsc
* @Date:   2018-09-11 09:55:50
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-09-12 11:04:47
*/
//权限设置


;$(function () {
    $(".set-table").on("click", "span", function () {
        var that = $(this);
        var isCheck = parseInt($(this).attr("data-check"));
        var level = parseInt($(this).attr("data-level"));
        if (isCheck == 0) {
            that.addClass("hasChecked");
            that.attr("data-check", 1);
            that.find("i").attr("class", "fa fa-check");
            switch (level) {
                case 2:
                    //三级选择
                    that.parents(".set-three-table").parent('td').prev('.two-title').find("span").addClass("hasChecked").attr("data-check", 1);
                    that.parents(".set-three-table").parent('td').prev('.two-title').find("i").attr("class", "fa fa-check");
                    that.parents(".set-table").find(".one-title").children('span').addClass("hasChecked").attr("data-check", 1);
                    that.parents(".set-table").find(".one-title").find('i').attr("class", "fa fa-check");
                    break;
                case 1:
                    that.parents(".set-table").find(".one-title").children('span').addClass("hasChecked").attr("data-check", 1);
                    that.parents(".set-table").find(".one-title").find('i').attr("class", "fa fa-check");
                    break;
                default:
                    // 一级选项
                    break;
            }
        } else {
            //取消当前及其子类
            that.removeClass("hasChecked");
            that.attr("data-check", 0);
            that.find("i").attr("class", "");
            that.parent("td").next("td").find("span").removeClass("hasChecked").attr("data-check", 0);
            that.parent("td").next("td").find("span").children('i').attr("class", "");
        }
    });

    //保存
    $("#save-btn").on("click", function () {
        $('#post_name').parent(".p-form-column").find('.tishi').text("");
        // 验证
        var post_name = $("#post_name").val();
        if (post_name === "") {
            $('#post_name').parent(".p-form-column").find('.tishi').text("请输入岗位名称");
            $('#post_name').focus();
            return false
        }
        //选中参数
        var menus = [];
        $.each($(".hasChecked"), function (index, value) {
            menus.push($(value).attr("data-id"))
        })
        var edit_id = $(".edit_id").val();
        //保存到后端
        var data = {
            'postName': post_name,
            'postInstall': menus,
            'edit_id': edit_id
        };
        $.ajax({
            url: '/station/save',
            type: 'POST',
            dataType: 'JSON',
            data: data
        })
            .done(function (data) {
                if (data.error_code == 0) {
                    tishitip(data.error_msg,1);
                    window.location.href = '/station/';
                } else if(data.error_code == 400021){
                    $('#post_name').parent(".p-form-column").find('.tishi').text(data.error_msg);
                    $('#post_name').focus();
                }else
                    {
                    tishitip(data.error_msg,2);
                }
            });
    });


    function getSetInfo() {
        var get_one = [];
        var one_title = $(".one-title");
        if (one_title.length == 0) {
            return [];
        }
        for (var i = 0; i < one_title.length; i++) {
            //获取一级分类
            var one_checked = $(one_title[i]).find("span");
            if (one_checked.attr("data-check") == 1) {
                var one = {"id": one_checked.attr("data-id"), 'children': []};
                var two_title = one_checked.parent().next("td").find(".two-title");
                //获取二级分类
                for (var j = 0; j < two_title.length; j++) {
                    var two_checked = $(two_title[j]).find("span");
                    if (two_checked.attr("data-check") == 1) {
                        var two = {'id': two_checked.attr("data-id"), 'children': []};
                        var three_title = two_checked.parent("td").next("td").find("span");
                        //获取三级分类
                        for (var k = 0; k < three_title.length; k++) {
                            if ($(three_title[k]).attr("data-check") == 1) {
                                var three = {
                                    'id': $(three_title[k]).attr("data-id")
                                };
                                //将三级分类怼进二级分类
                                two.children.push(three)
                            }
                        }
                        //将二级分类怼进一级分类
                        one.children.push(two)
                    }
                }
                //将一级分类怼进总数据
                get_one.push(one);
            }
        }
        return get_one;
    }

});


