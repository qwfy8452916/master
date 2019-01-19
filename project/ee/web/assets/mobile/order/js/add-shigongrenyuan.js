/**
 * +----------------------------------------------------------------------
 * | add-shigongrenyuan
 * +----------------------------------------------------------------------
 * | Author: 2851986856@qq.com
 * +----------------------------------------------------------------------
 */
$(function () {
    var Global_SGRY_Url = "/order/shigongrenyuan/save";
    var $saveBtn = $("span[data-name='save']"),
        $houseHolderInput = $("input[data-name='householder']"),
        $mopbileInput = $("input[data-name='phone']"),
        $houseAddressInput = $("textarea[data-name='house-address']"),
        $workerTypeInput = $("input[data-name='worker-type']"),
        $subjectManagerInput = $("input[data-name='subject-manager']"),
        $managerDataInput = $("#manager_data"),
        $workerAllDataInput = $("#worker_all"),
        workerData = JSON.parse($workerAllDataInput.val()),
        $plumberElectricianInput = $("input[data-name='plumber-electrician']"),
        $bricklayerInput = $("input[data-name='bricklayer']"),
        $carpentryInput = $("input[data-name='carpentry']"),
        $painterInput = $("input[data-name='painter']"),
        $managerBlock = $(".manager-block"),
        $workerGroupBlock = $(".worker-group-block"),
        mgData = null,
        sdgData = null,
        wgData = null,
        yqgData = null,
        workerTypeVal = '', // 人员类型值
        workerTypeLabel = ''; // 人员类型标签名

    fixInputType($mopbileInput);

    // 用于回显数据
    initWorker()

    $saveBtn.on("click", saveAction);

    // 人员类型picker
    $workerTypeInput.on('click', function (event) {
        event.preventDefault();
        var _this = this;
        weui.picker([{
            label: '请选择',
            value: 0
        }, {
            label: '项目经理',
            value: 1
        }, {
            label: '施工班组',
            value: 2
        }], {
            title:'人员类型',
            className: 'custom-classname',
            onChange: function (result) {
                // console.log(item, index);
                // console.log(result);
            },
            onConfirm: function (result) {
                workerTypeVal = result[0].value;
                workerTypeLabel = result[0].label;
                $(_this).val(result[0].label);
                $(_this).attr('data-values',result[0].value);
                if(workerTypeVal == 1) {
                    // 项目经理
                    $managerBlock.fadeIn(0);
                    $workerGroupBlock.fadeOut(0)
                }else if(workerTypeVal == 2) {
                    // 施工班组
                    $managerBlock.fadeOut(0);
                    $workerGroupBlock.fadeIn(0)
                }
            },
            id: 'picker'
        });
    });

    // 项目经理picker
    $subjectManagerInput.on('click', function (event) {
        event.preventDefault();
        var _this = this;
        weui.picker(dataTransfor($managerDataInput.val()), {
            title:'项目经理',
            className: 'custom-classname',
            onChange: function (result) {
            },
            onConfirm: function (result) {
                var labelName = result[0].label.replace(/<span class='one'>/g,"").replace(/<span class='two'>/g,"").replace(/<\/span>/," ").replace(/<\/span>/,"")
                $(_this).val(labelName);
                $(_this).attr('data-values',result[0].value);
            },
            id: 'picker'
        });
    });

    if(workerData.sdg && workerData.sdg.length > 0) {
        sdgData = workerData.sdg
        var sdgSelectData = dataTransforSelect(JSON.stringify(sdgData))
        // 水电工select
        // ps：该插件数据title不能重复，否则重名的只能选择一个且第二次选择时会把所有同名的都选中
        // 必须先初始化，否则要第二次点击才能生效
        $plumberElectricianInput.select({
            title: "水电工",
            multi: true,
            items: sdgSelectData,
            onChange: function (item) {
                $(this).attr("data-values", item.values)
            }
        });
        $plumberElectricianInput.on('click', function (event) {
            event.preventDefault();
            $(this).select("open")
        });
    }

    if(workerData.wg && workerData.wg.length > 0) {
        wgData = workerData.wg
        var wgSelectData = dataTransforSelect(JSON.stringify(wgData))
        // 瓦工select
        $bricklayerInput.select({
            title: "瓦工",
            multi: true,
            items: wgSelectData,
            onChange: function (item) {
                $(this).attr("data-values", item.values)
            }
        });
        $bricklayerInput.on('click', function (event) {
            event.preventDefault();
            $(this).select("open")
        });
    }

    if(workerData.mg && workerData.mg.length > 0) {
        mgData = workerData.mg
        var mgSelectData = dataTransforSelect(JSON.stringify(mgData))
        // console.log(mgData)
        // 木工select
        $carpentryInput.select({
            title: "木工",
            multi: true,
            items: mgSelectData,
            onChange: function (item) {
                $(this).attr("data-values", item.values)
            }
        });
        $carpentryInput.on('click', function (event) {
            event.preventDefault();
            $(this).select("open")
        });
    }

    if(workerData.yqg && workerData.yqg.length > 0) {
        yqgData = workerData.yqg
        var yqgSelectData = dataTransforSelect(JSON.stringify(yqgData))
        // 油漆工select
        $painterInput.select({
            title: "油漆工",
            multi: true,
            items: yqgSelectData,
            onChange: function (item) {
                $(this).attr("data-values", item.values)
            }
        });
        $painterInput.on('click', function (event) {
            event.preventDefault();
            $(this).select("open")
        });
    }


    /**
     * 保存增加的订单
     */
    function saveAction(event) {
        event.stopPropagation();
        var houseHolder = $houseHolderInput.val(),
            mobile = $mopbileInput.val(),
            workerType = $workerTypeInput.val();
        var extendData = {};
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
        if(!workerType || workerType=="请选择"){
            $.toptip("请选择人员类型");
            return;
        }
        if(workerTypeVal == 1) {
            // 项目经理数据
            extendData = {
                subjectManager: $subjectManagerInput.attr('data-values')
            }
        }else if(workerTypeVal == 2) {
            // 施工班组数据
            extendData = {
                sdg: $plumberElectricianInput.attr('data-values').split(","),
                wg: $bricklayerInput.attr('data-values').split(","),
                mg: $carpentryInput.attr('data-values').split(","),
                yqg: $painterInput.attr('data-values').split(",")
            }
        }
        var baseData = {
            order_id: $('#order_no').val(),
            consumer_name : houseHolder,
            consumer_tel : mobile,
            build_address : $houseAddressInput.val(),
            worker_type : $workerTypeInput.attr("data-values")==0?"":$workerTypeInput.attr("data-values"),
        }
        var fullData = $.extend({}, baseData, extendData)
        $.showLoading("提交中，请稍后");
        ajaxAction({
            url : Global_SGRY_Url,
            method: "post",
            data : fullData,
            successCallback:function (res) {
                if(res.error_code==0){
                    location.href = "/shigong";
                }else{
                    $.toptip(res.error_msg);
                }
                $.hideLoading();
            },
            failCallback: function (res) {
                $.toptip("网络异常，请稍后重试!")
                $.hideLoading();
            }
        });
    }

    /**
     * 数据转换，把json转换成picker插件需要的数据格式
     * @param originData 原始数据
     * @returns {{label: string, value: number}[]}
     */
    function dataTransfor(originData) {
        var data = JSON.parse(originData),
            ret = [{
                label: '请选择',
                value: 0
            }];
        data.forEach(function (item, index) {
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
        });
        return ret;
    }

    /**
     * 数据转换，把json转换成select插件需要的数据格式
     * @param originData
     * @returns {{title: string, value: number}[]}
     */
    function dataTransforSelect(originData) {
        var data = JSON.parse(originData),
            ret = [];
        data.forEach(function (item, index) {
            var labelName = item.name
            if(item.order_number != undefined) {
                if(item.order_number == 0) {
                    labelName+="空闲中"
                }else{
                    labelName+=(" " + item.order_number + "个关联订单")
                }
            }
            ret.push({
                title: labelName,
                value: item.id
            })
        });
        return ret;
    }

    /**
     * 初始化人员类型，当已经添加施工人员后再次打开页面需要把之前的选择显示出来
     */
    function initWorker() {
        var $workerAllChoosedInput = $("#worker_all_choosed"),
            workerAllChoosedData = JSON.parse($workerAllChoosedInput.val()),
            worker = workerAllChoosedData.worker,
            manager = workerAllChoosedData.project;
        if(worker.length <=0 && manager.length <= 0) {
            return
        }
        if(manager.length > 0) {
            // 项目经理分支
            workerTypeVal = 1
            $workerTypeInput.val("项目经理")
            $workerTypeInput.attr("data-values", 1)
            $subjectManagerInput.val(manager[0].contact_name)
            $subjectManagerInput.attr("data-values",manager[0].account_id)
            $managerBlock.fadeIn(0)
            $workerGroupBlock.fadeOut(0)
        }else{
            // 施工班组分支
            workerTypeVal = 2
            $workerTypeInput.val("施工班组")
            $workerTypeInput.attr("data-values", 2)
            workerGroupAction(worker)
            $managerBlock.fadeOut(0)
            $workerGroupBlock.fadeIn(0)
        }
    }

    /**
     * 给对应的input框填充数据
     * @param workerData
     */
    function workerGroupAction(workerData) {
        if(!workerData){
            return
        }
        console.log(workerData)
        if(workerData.sdg && workerData.sdg.length > 0) {
            var sdgText = formatSelectData(workerData.sdg).text,
                sdgIds = formatSelectData(workerData.sdg).ids;
            $plumberElectricianInput.val(sdgText)
            $plumberElectricianInput.attr('data-values', sdgIds)
        }
        if(workerData.wg && workerData.wg.length > 0) {
            var wgText = formatSelectData(workerData.wg).text,
                wgIds = formatSelectData(workerData.wg).ids;
            $bricklayerInput.val(wgText)
            $bricklayerInput.attr('data-values', wgIds)
        }
        if(workerData.mg && workerData.mg.length > 0) {
            var mgText = formatSelectData(workerData.mg).text,
                mgIds = formatSelectData(workerData.mg).ids;
            $carpentryInput.val(mgText)
            $carpentryInput.attr('data-values', mgIds)
        }
        if(workerData.yqg && workerData.yqg.length > 0) {
            var yqgText = formatSelectData(workerData.yqg).text,
                yqgIds = formatSelectData(workerData.yqg).ids;
            $painterInput.val(yqgText)
            $painterInput.attr('data-values', yqgIds)
        }
    }

    /**
     * 把原始数据格式化成select所需要的插件
     * @param data
     * @returns {{text: string, ids: string}}
     */
    function formatSelectData(data) {
        var text = "", ids = "", len = 0
        len = data.length - 1
        data.forEach(function (item,index) {
            if(index == len) {
                text+=item.contact_name
                ids+=item.account_id
            }else{
                text+=(item.contact_name + ",")
                ids+=(item.account_id + ",")
            }

        })
        return {
            text: text,
            ids: ids
        }
    }

})
