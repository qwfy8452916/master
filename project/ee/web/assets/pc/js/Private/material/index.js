/*
* @Author: qz_xsc
* @Date:   2018-09-07 09:22:54
* @Last Modified by:   qz_xsc
* @Last Modified time: 2018-09-26 13:21:14
*/
;$(function(){
    // 重置
    $("#reset").on("click",function(){
        $(".input-container input").val("");
    });


    //删除订单

    $("body").on("click",".p-delete",function(){
        var order_id=$(this).data('id');
        var that=$(this).parents(".p-panel");

        $(this).p_confirm({
            "confirmText":"确定要删除该材料进销吗?",
            okFun:function(){
                $.ajax({
                    url: '/material/del',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {oid:order_id}
                })
                    .done(function(data) {

                        if(data.error_code == 0){
                            tishitip('操作成功',1);
                            setTimeout(function(){ that.remove();},500)
                        }else{
                            tishitip(data.error_msg,2);
                        }
                    })
                    .fail(function(xhr) {
                        tishitip('发生未知错误，请稍后重试~',2);
                        return false;
                    })
            }
        });
    });
    //到货处理

    $("body").on("click",".getHuo",function(){
        var that=$(this);
        var id=that.parent().parent().data('id');

        that.p_confirm({
            "confirmText":"确定该材料已到货吗?",
            okFun:function(){
                //确认按钮之后
                $.ajax({
                    url: '/material/editstate',
                    type: 'POST',
                    dataType: 'JSON',
                    data: {mid:id}
                })
                    .done(function(data) {
                        if(data.error_code == 0){
                            that.parent("td").prev("td").text("已到货");
                            that.remove();
                        }else{
                            tishitip(data.error_msg,2);
                        }
                    })
                    .fail(function(xhr) {
                        tishitip('发生未知错误，请稍后重试~',2);
                        return false;
                    })
            }
        })
    });

    // 加载更多
    $("#more_span").on("click",function(){
        var that=$(this);
        var page = parseInt(that.attr("data-page"));
        if(page===0){
            return false;
        }
        var ordercode = $('input[name=ordercode]').val(),
            yzname = $('input[name=yzname]').val(),
            gys = $('input[name=gys]').val(),
            cl = $('input[name=cl]').val(),
            piaoju = $('input[name=piaoju]').val();

        that.css("display","none");
        $("#wait").css("display","block");
        $.ajax({
            url: '/material/',
            type: 'GET',
            dataType: 'JSON',
            data: {p:page,ordercode:ordercode,yzname:yzname,gys:gys,cl:cl,piaoju:piaoju}
        })
        .done(function(data) {
            console.log(data)
            if(data.error_code == 0){
                if(data.data!==""){

                    appendHtml(data.data);
                    that.attr("data-page",++page);
                    if(data.page==0){
                        that.attr("data-page",0);
                        that.text("没有更多了")
                    }
                }else{
                    that.attr("data-page",0);
                    that.text("没有更多了")
                }
                $("#wait").css("display","none");
                that.css("display","block");

            }else{
                tishitip(data.error_msg,2);
            }
        })
        .fail(function(xhr) {
            tishitip('发生未知错误，请稍后重试~',2);
            return false;
        })
    });

    function appendHtml(data){
        for(var i in data){
            var panel="",
            table="<table class='p-suppliertab'><thead><tr><td>材料名称</td><td>数量</td><td>单价(元)</td><td>总价(元)</td><td>采购时间</td><td>送货时间</td><td>票据单号</td><td>状态</td><td>操作</td></tr></thead><tbody>",
            basetr="";
           panel="<div class='p-panel'><table class='panel-title'><td><a href='/order?order_no="+data[i].erp_id+"'><span>订单编号：</span>"+data[i].erp_id+"</td><td><span>业主姓名：</span>"+data[i].consumer_name+"</td><td><span>供应商：</span>"+data[i].supplier_name+"</td></table>";
           var trData=data[i].list;
           for(var j=0;j<trData.length;j++){
             var tr="<tr><td>"+trData[j].name+"</td><td>"+trData[j].amount+"</td><td>"+trData[j].price+"</td><td>"+trData[j].amount*trData[j].price+"</td><td>"+trData[j].buy_time+"</td><td>"+trData[j].send_time+"</td><td>"+trData[j].note+"</td><td>"+setHmlt(trData[j].state)+"</td><td>"+setDaoHuo(trData[j].state)+"</td></tr>";
             basetr=basetr+tr;
           }
          var bottom_str="<div class='panel-foot'><a href='/material/detail/?id="+data[i].id+"' class='p-eidt'>详情</a><a href='/material/add?edit_id="+data[i].id+"' class='p-eidt'>编辑</a><span class='p-delete' data-id='"+data[i].id+"'>删除</span></div></div>";
            basetr=table+basetr+"</tbody></table>"+bottom_str;
            panel=panel+basetr;
            $("#addHtml").append($(panel));
        }
    }

    function setHmlt(num){
        if(num==1){
            return "到货";
        }else{
            return "未到货";
        }
    }
    function setDaoHuo(num){
         if(num==1){
            return "";
        }else{
            return "<span class='p-eidt getHuo' data-id='1'>到货</span>";
        }
    }

    function dateChange(timestamp){
         //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
    var time = new Date(timestamp);
        var year = time.getFullYear();
        var month = time.getMonth()+1;
        var date = time.getDate();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        return  year+"-"+month+"-"+date+" "+hours+":"+minutes+":"+seconds;
    }
});