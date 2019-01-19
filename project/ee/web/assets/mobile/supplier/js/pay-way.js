$(function(){

    document.querySelector('.pay-way').addEventListener('click', function () {
        weui.picker([{
            label: '微信',
            value: 1
        }, {
            label: '支付宝',
            value: 2
        }, {
            label: '银行账号',
            value: 3
        }, ], {
            title:'付款方式',
            className: 'custom-classname',
            onChange: function (result) {
                // console.log(result);
            },
            onConfirm: function (result) {
                var way = result[0].label;
                switch(way){
                    case "微信":
                        $('.wechat').show();
                        $('.zhifubao').hide();
                        $('.bank').hide();
                        break;
                    case "支付宝":
                        $('.zhifubao').show();
                        $('.wechat').hide();
                        $('.bank').hide();
                        break;
                    case "银行账号":
                        $('.bank').show();
                         $('.wechat').hide();
                        $('.zhifubao').hide();
                        break;
                }
                $(".pay-way").val(result[0].label)
                $(".pay-way").attr('data-values',result[0].value)
            },
            id: 'picker'
        });
    });
})