$(function () {
    var $saveBtn = $("span[data-name='save']"),
        $houseHolderInput = $("input[data-name='householder']"),
        $addMaterial = $("i[data-name='add-material']"),
        $saveAddBtn = $("span[data-name='save-add']"),
        $addMaterialContainer = $("#add-material-container");

    $(document).on("click", function (event) {
        var $target = $(event.target);
        // 删除单项材料
        if( $target.attr("data-name") && $target.attr("data-name").toLowerCase() == "ama-item"){
            var ts = $target.attr('data-target');
            $.confirm("确定要删除?", "提示", function() {
                $target.closest("."+ts).remove();
            }, function() {
                //取消操作
            });
        }
    });

    $addMaterial.on("click", function () {
        $("#materials").popup();
    });

    $saveBtn.on("click", saveAction);

    $saveAddBtn.on("click", saveMaterialAction);

    $('input[name="shop_time"]').on('click', function () {
        var _this = this
        weui.datePicker({
            start: '2016-12-29',
            end: '2030-12-29',
            /**
             * https://zh.wikipedia.org/wiki/Cron
             * cron 表达式后三位
             * 示例：
             *  * * *                每天
             *  5 * *                每个月的5日
             *  1-10 * *             每个月的前10日
             *  1,5,10 * *           每个月的1号、5号、10号
             *  *\/2 * *             每个月的 1、3、5、7...日，注意写的时候斜杠“/”前面没有反斜杠“\”，这是因为是注释所以需要转义
             *  * 2 0                2月的每个周日
             *  * * 0,6              每个周末
             *  * * 3                每周三
             */
            cron: '* * *',
            defaultValue: [2019, 9, 1],
            title:'选择生成时间',
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                console.log(result);
                var year = result[0].value;
                var month = result[1].value;
                var day = result[2].value;
                $(_this).val(month + '/' + day + '/' + year);
            },
            id: 'datePicker'
        });
    });

    $('input[name="send_time"]').on('click', function () {
        var _this = this;
        weui.datePicker({
            start: '2016-12-29',
            end: '2030-12-29',
            cron: '* * *',
            defaultValue: [2019, 9, 1],
            title:'选择结束时间',
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                console.log(result);
                var year = result[0].value;
                var month = result[1].value;
                var day = result[2].value;
                $(_this).val(month + '/' + day + '/' + year);
            },
            id: 'datePicker'
        });
    });

    /**
     * 保存增加的订单
     */
    function saveAction() {
        alert("保存")
    }

    /**
     * 保存新增的材料
     */
    function saveMaterialAction() {
        var $materialNameInput = $("input[data-name='material-name']"),
            $materialSizeInput = $("input[data-name='material-size']"),
            $materialsinglePriceInput = $("input[data-name='material-signle-price']"),
            $materialtotalPriceInput = $("input[data-name='material-total-price']"),
            $materialShopTime = $("input[name='shop_time']"),
            $materialSendTime = $("input[name='send_time']");
        if(!$materialNameInput.val()){
            alert('请输入材料名称');
            return;
        }
        if(!$materialSizeInput.val()){
            alert('请输入材料数量');
            return;
        }
        if(!$materialsinglePriceInput.val()){
            alert('请输入单价');
            return;
        }
        if(!$materialtotalPriceInput.val()){
            alert('请输入总价');
            return;
        }
        if(!$materialShopTime.val()){
            alert('请选择采购时间');
            return;
        }
        if(!$materialSendTime.val()){
            alert('请选择送货时间');
            return;
        }
        // 这里要发送ajax请求到后端，成功后渲染模板到页面上
        $("#add-material-tmpl").tmpl({name:$materialNameInput.val()}).appendTo($addMaterialContainer);
        $("#materials").find("input").val("");
        $.closePopup()
    }

})
