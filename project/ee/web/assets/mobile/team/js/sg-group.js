/**
 * +----------------------------------------------------------------------
 * | sg-group
 * +----------------------------------------------------------------------
 * | Author: 2851986856@qq.com
 * +----------------------------------------------------------------------
 */
$(function(){
    window.onpageshow = function(event) {
        if (event.persisted) {
            window.location.reload()
        }
    };
    // 下拉加载
    var loading = false, mobile_search = "";
    $(document.body).infinite().on("infinite", function() {
        if(loading) return;
        loading = true;
        var page = parseInt($('.weui-loadmore__tips').attr('data-id'));
        if(page===0){
            $('.weui-loading').hide();
            $('.weui-loadmore__tips').html('到底了~');
            return;
        }
        setTimeout(function() {
            $.ajax({
                url: '/yuangong/',
                type: 'GET',
                data:{p:page, mobile_search:mobile_search}
            })
                .done(function(data) {
                    if(data.error_code == 0){

                        var tplStr = template('tmpl',data);
                        $('.weui-loadmore__tips').attr('data-id',data.page);
                        $('.part').append(tplStr);
                        loading = false;
                    }
                })
                .fail(function() {
                    console.log("error");
                })

        }, 100);
    })

    // 搜索
    var page = parseInt($('.weui-loadmore__tips').attr('data-id'));
    document.addEventListener("keyup", function(evnet){
        var search = $("#searchInput").val();
        page = 1;
        $('.weui-loadmore__tips').attr('data-id',2);
        mobile_search = search;
        if(event.keyCode == 13){
            if(mobile_search == ''){
                window.location.href = window.location.href;
            }else{
                $.ajax({
                    url: '/yuangong/',
                    type: 'GET',
                    data:{mobile_search:mobile_search}
                })
                    .done(function(data) {
                        if(data.error_code == 0){
                            $("p[data-name='none']").fadeOut(0);
                            var tplStr1 = template('tmpl',data);
                            $('.part').html(tplStr1);
                            if($('.part').children('div').length <= 3){
                                $('.weui-loadmore').hide();
                            }
                            loading = false;
                        }
                        if(data.data == ''||data.data == null){
                            $("p[data-name='none']").fadeIn(0);
                            $('.weui-loadmore').hide();
                        }
                    })
                    .fail(function() {
                        console.log("error");
                    })
            }

        }
        return false;
    }, false)

    if($('.part').children('div').length <= 3){
        $('.weui-loadmore').hide();
    }

    // 模板函数判写入成员个数
    template.helper('hasuids',function(uids){
        var arr=[];
        arr = uids.split(',');
        uids = arr.length;
        return uids;
    })
})
