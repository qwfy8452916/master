$(function () {
    $(".datepicker").datepicker({
        autoclose:true,
        formate:'yyyy-mm-dd'
    })


    $("body").on("click",".closeedit",function(){
        $(".p_domask").remove();
    });


    $(".oedit").click(function(event) {
        var _this = $(this);
        var company_name=_this.parent().parent().children().eq(-3).text()
        $.ajax({
            url: '/orders/qiandanup/',
            type: 'GET',
            dataType: 'JSON',
            data: {id: _this.attr("data-id")}
        })
        .done(function(data) {
            if (data.status == 1) {
                $("body").append(data.data);
                $(".companyName").html(company_name);
            }
        });
    });

    $("body").on("click","#btnSave",function(){
        $.ajax({
            url: '/orders/qiandanup/',
            type: 'POST',
            dataType: 'JSON',
            data: {
                status:$("input[name=status]:checked").val(),
                recommend:$("input[name=recommend]:checked").val(),
                id:orderid
            }
        })
        .done(function(data) {
            console.log(data);
            if (data.status == 1) {
                alert("操作成功！");
                window.location.href = window.location.href;
            } else {
                alert(data.info);
            }
        });
    });

    $(".canncel").click(function(event) {
        if (confirm("确定取消订单状态？")) {
            var _this = $(this);
            $.ajax({
                url: '/orders/qiandancancel',
                type: 'POST',
                dataType: 'JSON',
                data: {id: _this.attr("data-id")}
            })
            .done(function(data) {
                if (data.status == 1) {
                    window.location.href = window.location.href;
                } else {
                    alert(data.info);
                }
            });
        }
    });

    $("body").on("click",".icon_headset",function(){
        var _this = $(this);
        if (!confirm("确定IP话机拨打电话?")) {
            return false;
        };
        $.ajax({
            url: '/voip/other_order_voipcallback',
            type: 'POST',
            dataType: 'JSON',
            data: {
                id: _this.attr("data-id")
            }
        })
        .done(function(data) {
            if (data.code == 200) {
                alert(data.errmsg);
            } else {
                alert(data.errmsg || data.info);
            }
        });
    });

    $("#btnReset").click(function(event) {
        $("input[name=id],input[name=begin],input[name=end],input[name=company]").attr("value","");
        $("#city").select2("val","");
    });
})
