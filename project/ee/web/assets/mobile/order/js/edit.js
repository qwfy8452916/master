$(function () {
    var Global_Order_Url = "/order/edit/do",
        Global_Manager_Url = "/manager/worker/group";
    var $saveBtn = $("span[data-name='save']"),
        $houseHolderInput = $("input[data-name='householder']"),
        $mopbileInput = $("input[data-name='phone']"),
        $wechatInput = $("input[data-name='wechat']"),
        $layoutInput = $("input[data-name='layout']"),
        $layoutDataInput = $("#layout_data"),
        $layoutChoosedInput = $("#layout_choosed"),
        $areaInput = $("input[data-name='area']"),
        $housingEstateInput = $("textarea[data-name='housing-estate']"),
        $houseAddressInput = $("textarea[data-name='house-address']"),
        $contactAddressInput = $("textarea[data-name='contact-address']"),
        $buildStatusInput = $("input[data-name='build-status']"),
        $orderStatusInput = $("input[data-name='order-status']"),
        $servicerInput = $("input[data-name='servicer']"),
        $designerInput = $("input[data-name='designer']"),
        $managerInput = $("input[data-name='manager']"),
        // $buildGroupInput = $("input[data-name='build-group']"),
        $servicerDataInput = $("#servicer_data"),
        $servicerChoosedInput = $("#servicer_choosed"),
        $designerDataInput = $("#designer_data"),
        $designerChoosedInput = $("#designer_choosed"),
       // $managerDataInput = $("#manager_data"),
        $managerChoosedInput = $("#manager_choosed");
        // $buildDataInput = $("#build_data"),
        // $buildChoosedInput = $("#build_choosed");
    var layoutFaceData = inputFill($layoutDataInput.val(), $layoutChoosedInput.val()),
        servicerFaceData = inputFill($servicerDataInput.val(), $servicerChoosedInput.val()),
        designerFaceData = inputFill($designerDataInput.val(), $designerChoosedInput.val()),
      //  managerFaceData = inputFill($managerDataInput.val(), $managerChoosedInput.val()),
        $ordertimeInput = $("input[data-name='ordertime']"),
        $realtimeInput = $("input[data-name='realtime']"),
      //  $reasonInput = $("input[data-name='reason']"),
        $qiandanjineInput = $("input[data-name='qiandan_jine']"),
        $remarkInput=$("input[data-name='remark']");
        // buildFaceData = inputFill($buildDataInput.val(), $buildChoosedInput.val(), ["group_name"]);

    $layoutInput.val(layoutFaceData.name);
    $layoutInput.attr("data-values", layoutFaceData.id);
    $servicerInput.val(servicerFaceData.name.replace(/<span class='one'>/g,"").replace(/<span class='two'>/g,"").replace(/<\/span>/," ").replace(/<\/span>/,""));
    $servicerInput.attr("data-values", servicerFaceData.id);
    $designerInput.val(designerFaceData.name.replace(/<span class='one'>/g,"").replace(/<span class='two'>/g,"").replace(/<\/span>/," ").replace(/<\/span>/,""));
    $designerInput.attr("data-values", designerFaceData.id);
   // $managerInput.val(managerFaceData.name);
   // $managerInput.attr("data-values", managerFaceData.id);
   //  $buildGroupInput.val(buildFaceData.name);

    // $buildGroupInput.attr("data-values", buildFaceData.id);

    fixInputType($mopbileInput);

    $saveBtn.on("click", saveAction);

    $areaInput.on("keyup", function () {
        $(this).val($(this).val().replace(/[^\d.]*/g,"").replace(/^\./g,""));
    });

    $layoutInput.on('click', function (event) {
        event.preventDefault();
        var _this = this;
        weui.picker(dataTransfor($layoutDataInput.val()), {
            title:'户型',
            className: 'custom-classname',
            onChange: function (result) {
                //console.log(item, index);
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                $(_this).val(result[0].label);
                $(_this).attr('data-values',result[0].value);
            },
            id: 'picker'
        });
    });

    $orderStatusInput.on('click', function (event) {
        event.preventDefault();
        var _this = this;
        weui.picker([{
            label: '请选择',
            value: 0
        }, {
            label: '未联系',
            value: 1
        }, {
            label: '已联系',
            value: 2
        }, {
            label: '预约量房',
            value: 3
        }, {
            label: '已见面',
            value: 4
        }, {
            label: '已量房',
            value: 5
        }, {
            label: '未成功量房',
            value: 6
        }, {
            label: '签订设计合同',
            value: 7
        }, {
            label: '签订装修合同',
            value: 8
        }, {
            label: '施工中',
            value: 9
        }, {
            label: '延期单',
            value: 10
        }, {
            label: '已竣工',
            value: 11
        }, {
            label: '废弃单',
            value: 12
        }, {
            label: '完成',
            value: 13
        }], {
            title:'订单状态',
            className: 'custom-classname',
            onChange: function (result) {
                //console.log(item, index);
                // console.log(result);
            },
            onConfirm: function (result) {
                $(_this).val(result[0].label);
                $(_this).attr('data-values',result[0].value);
                $(".hide-status").hide();
                //$(".hide-status input").val("");
                switch (result[0].value) {
                    case 3:
                        $(".hide-status").eq(0).show()
                        break;
                    case 5:
                        $(".hide-status").eq(1).show()
                        break;
                    case 8:
                        $(".hide-status").eq(2).show()
                        break;
                    default:
                        break;
                }
            },
            id: 'picker'
        });
    });

    $buildStatusInput.on('click', function (event) {
        event.preventDefault();
        var _this = this;
        weui.picker([{
            label: '请选择',
            value: 0
        }, {
            label: '1.开工大吉',
            value: 2
        }, {
            label: '2.主体拆改',
            value: 3
        }, {
            label: '3.水电整改',
            value: 4
        }, {
            label: '4.防水施工',
            value: 5
        }, {
            label: '5.泥瓦工程',
            value: 6
        }, {
            label: '6.木工进场',
            value: 7
        }, {
            label: '7.厨卫吊顶',
            value: 8
        }, {
            label: '8.油漆粉刷',
            value: 9
        }, {
            label: '9.铺贴壁纸',
            value: 10
        }, {
            label: '10.成品安装',
            value: 11
        }, {
            label: '11.保洁收尾',
            value: 12
        }, {
            label: '12.家具进场',
            value: 13
        }, {
            label: '13.家电进场',
            value: 14
        }, {
            label: '14.家居配饰',
            value: 15
        }, {
            label: '15.交付工程',
            value: 16
        }], {
            title:'施工状态',
            className: 'custom-classname',
            onChange: function (result) {
                //console.log(item, index);
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                $(_this).val(result[0].label);
                $(_this).attr('data-values',result[0].value);
            },
            id: 'picker'
        });
    });

    // $("input[data-name='order-status']").change(function(){
    //     var Orderstatus=$orderStatusInput.val();
    //     if(Orderstatus=='3'){
    //         $('.ordertimediv').show();
    //         $('.realtimediv').hide();
    //         $('.qiandan_jinediv').hide();
    //         $('.reasondiv').hide();
    //     }else if(Orderstatus=='5'){
    //         $('.ordertimediv').hide();
    //         $('.reasondiv').hide();
    //         $('.qiandan_jinediv').hide();
    //         $('.realtimediv').show();
    //     }else if(Orderstatus=='6'){
    //         $('.ordertimediv').hide();
    //         $('.realtimediv').hide();
    //         $('.qiandan_jinediv').hide();
    //         $('.reasondiv').show();
    //     }else if(Orderstatus=='8'){
    //         $('.ordertimediv').hide();
    //         $('.realtimediv').hide();
    //         $('.reasondiv').hide();
    //         $('.qiandan_jinediv').show();
    //     }else{
    //         $('.ordertimediv').hide();
    //         $('.realtimediv').hide();
    //         $('.qiandan_jinediv').hide();
    //         $('.reasondiv').hide();
    //     }
    // });

    $servicerInput.on('click', function (event) {
        event.preventDefault();
        var _this = this;
        weui.picker(dataTransfor($servicerDataInput.val()), {
            title:'接待客服',
            className: 'custom-classname',
            onChange: function (result) {
                //console.log(item, index);
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                var labelName = result[0].label.replace(/<span class='one'>/g,"").replace(/<span class='two'>/g,"").replace(/<\/span>/," ").replace(/<\/span>/,"")
                $(_this).val(labelName);
                $(_this).attr('data-values',result[0].value);
            },
            id: 'picker'
        });
    });

    $designerInput.on('click', function (event) {
        event.preventDefault();
        var _this = this;
        weui.picker(dataTransfor($designerDataInput.val()), {
            title:'设计师',
            className: 'custom-classname',
            onChange: function (result) {
                //console.log(item, index);
                // console.log(result);
            },
            onConfirm: function (result) {
                // console.log(result);
                var labelName = result[0].label.replace(/<span class='one'>/g,"").replace(/<span class='two'>/g,"").replace(/<\/span>/," ").replace(/<\/span>/,"")
                $(_this).val(labelName);
                $(_this).attr('data-values',result[0].value);
            },
            id: 'picker'
        });
    });

    // $managerInput.on('click', function (event) {
    //     event.preventDefault();
    //     var _this = this;
    //     weui.picker(dataTransfor($managerDataInput.val()), {
    //         title:'项目经理',
    //         className: 'custom-classname',
    //         onChange: function (result) {
    //             //console.log(item, index);
    //             // console.log(result);
    //         },
    //         onConfirm: function (result) {
    //             console.log(result);
    //             $(_this).val(result[0].label);
    //             $(_this).attr('data-values',result[0].value);
    //             $(_this).attr('data-manager-id',result[0].mid);
    //             $buildGroupInput.val("");
    //             $buildGroupInput.attr("data-values","");
    //             ajaxAction({
    //                 url: Global_Manager_Url,
    //                 method: "get",
    //                 data:{
    //                     manager_id: result[0].value
    //                 },
    //                 successCallback: function (res) {
    //                     if(res.error_code==0){
    //                         $buildDataInput.val(JSON.stringify(res.data));
    //                     }
    //                 }
    //             })
    //         },
    //         id: 'picker'
    //     });
    // });

    // $buildGroupInput.on('click', function (event) {
    //     event.preventDefault();
    //     var _this = this;
    //     weui.picker(dataTransfor($buildDataInput.val(), ["group_name", "gid"]), {
    //         title:'施工组',
    //         className: 'build-classname',
    //         onChange: function (result) {
    //             //console.log(item, index);
    //             // console.log(result);
    //         },
    //         onConfirm: function (result) {
    //             // console.log(result);
    //             $(_this).val(result[0].label);
    //             $(_this).attr('data-values',result[0].value);
    //         },
    //         id: 'picker'
    //     });
    // });
    $("#yuyue").datetimePicker();
    $("#shiji").datetimePicker();
    $(document).on('datepickerclose', function () {
        if($("#yuyue").length > 0) {
            $("#yuyue").val('');
        }
        if($("#shiji").length > 0) {
            $("#shiji").val('');
        }
    })

    /**
     * 保存增加的订单
     */
    function saveAction(event) {
        event.stopPropagation();
        var houseHolder = $houseHolderInput.val(),
            mobile = $mopbileInput.val(),
            wechat = $wechatInput.val(),
            orderStatus = $orderStatusInput.val(),
            remark = $remarkInput.val();
        if(!houseHolder){
            $.toptip("请输入业主姓名");
            return;
        }
        if(!mobile){
            $.toptip("请输入手机号");
            return;
        }
        if(!checkPhoneNum(mobile)){
            $.toptip("手机号输入有误，请重新输入");
            return;
        }
        if(wechat){
            if(wechat.length<6){
                $.toptip("请输入正确的微信号");
                return;
            }
        }
        if(!orderStatus || orderStatus=="请选择"){
            $.toptip("请选择订单状态");
            return;
        }
        if(orderStatus == "签订装修合同"){
            var jine = $("input[data-name='qiandan_jine']").val()
            var exp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/
            if(jine==""){
                $.toptip("请输入签单金额");
                return;
            }
            if(!exp.test(jine)){
                $.toptip("请输入正确格式");
                return;
            }
        }
        if(orderStatus == "未成功量房"){
            if(remark==""){
                $.toptip("请输入未成功量房原因");
                return
            }
        }

        $.showLoading("提交中，请稍后");
        ajaxAction({
            url : Global_Order_Url,
            method: "post",
            data : {
                consumer_name : houseHolder,
                consumer_tel : mobile,
                consumer_wx_no : wechat,
                house_type : $layoutInput.attr("data-values")==0?"":$layoutInput.attr("data-values"),
                house_area : $areaInput.val(),
                xiaoqu : $housingEstateInput.val(), // 小区名
                build_address : $houseAddressInput.val(),
                link_address : $contactAddressInput.val(),
                state : $orderStatusInput.attr("data-values")==0?"":$orderStatusInput.attr("data-values"),
                order_time:$ordertimeInput.val(),
                lf_time:$realtimeInput.val(),
                qiandan_jine:$qiandanjineInput.val(),
                order_remark:$remarkInput.val(),
                // build_state : $buildStatusInput.attr("data-values")==0?"":$buildStatusInput.attr("data-values"),
                reception_id : $servicerInput.attr("data-values")==0?"":$servicerInput.attr("data-values"),
                designer_id : $designerInput.attr("data-values")==0?"":$designerInput.attr("data-values"),
                // project_manager : $managerInput.attr("data-values")==0?"":$managerInput.attr("data-values"),// 项目经理
                // build_group : $buildGroupInput.attr("data-values")==0?"":$buildGroupInput.attr("data-values"),//施工组
                order_no: $("#order_no").val(),
                order_remark : $("textarea[data-name='remark']").val()
            },
            successCallback:function (res) {
                if(res.error_code==0){
                    location.href = "/order";
                }else{
                    $.toptip(res.error_msg);
                }
                $.hideLoading();
            },
            failCallback: function (res) {
                $.hideLoading();
            }
        });
    }

    /**
     * 数据转换
     */
    function dataTransfor(originData, fieldArr) {
        var data = JSON.parse(originData),
            ret = [{
                label: '请选择',
                value: 0
            }];
        data.forEach(function (item, index) {
            if(fieldArr){
                ret.push({
                    label: item[fieldArr[0]] || item.name,
                    value: item[fieldArr[1]] || item.id || item.gid,
                })
            }else{
                var labelName = "<span class='one'>" + item.name + "</span>"
                if(item.order_number != undefined) {
                    if(item.order_number == 0) {
                        labelName+="<span class='two'>空闲中</span>"
                    }else{
                        labelName+=("<span class='two'>" + item.order_number + "个关联订单</span>")
                    }
                }
                ret.push({
                    label: labelName,
                    value: item.id || item.gid,
                    mid: item.manager_id
                })
            }
        });
        return ret;
    }

    /**
     * input fill
     * @param originData
     * @param val
     */
    function inputFill(originData, val, fieldArr) {
        if(originData){
            var data = JSON.parse(originData), ret={};
            data.forEach(function (item, index) {
                if(item.id == val || item.gid == val){
                    if(fieldArr){
                        ret.name = item[fieldArr[0]];
                    }else{
                        var labelName = "<span class='one'>" + item.name + "</span>"
                        if(item.order_number != undefined) {
                            if(item.order_number == 0) {
                                labelName+="<span class='two'>空闲中</span>"
                            }else{
                                labelName+=("<span class='two'>" + item.order_number + "个关联订单</span>")
                            }
                        }
                        ret.name = labelName || item.group_name;
                    }

                    ret.id = item.id || item.gid;
                }
            });
            return ret;
        }

    }
})
