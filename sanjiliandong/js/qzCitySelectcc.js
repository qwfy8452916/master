// 城市数据优化
rlpca.shift();
for(var i=0;i<rlpca.length;i++){
    rlpca[i].children.shift()
    for(var j=0;j<rlpca[i].children.length;j++){
          rlpca[i].children[j].children.shift()
    }
};
// 城市选择
var selectQz = {
    init:function(option){
        option = option || {};
        option.province = option.province || null;
        option.city = option.city || null;
        option.area = option.area || null;

        if(option.province && option.city && option.area){
            for(var j = 0;j<rlpca.length;j++){
                if(rlpca[j].id == option.province){// 判断定位省份
                    for(var k = 0;k<rlpca[j].children.length;k++){
                        if(rlpca[j].children[k].id == option.city){// 判断定位地级市
                            for(var l = 0;l<rlpca[j].children[k].children.length;l++){
                                if(rlpca[j].children[k].children[l].id == option.area){// 判断定位区域
                                    var j1=j,k1=k,l1=l;
                                    selectQz.createLeft(rlpca,j);
                                    selectQz.createCenter(rlpca[j].children,0,k);
                                    selectQz.createRight(rlpca[j].children[k].children,0,0,l);
                                }
                            }
                        }
                    }
                }
            }
            selectQz.events(j1,k1,l1);
        }else{
            selectQz.createLeft(rlpca);
            selectQz.createCenter(rlpca[0].children,0);
            selectQz.createRight(rlpca[0].children[0].children,0,0);
            selectQz.events();
        }
        // 遮罩层
        $("<div class="+'mask'+"></div>").insertAfter(".Area");
    },
    createLeft:function(data,j){
        var html = [];
        html.push("<ul>");
        $.each(data,function(index,obj){
            html.push('<li class="left-li" province-id="'+obj.id+'" data-id="'+index+'"><span>'+obj.text+'</span></li>');
        });
        html.push("</ul>");
        html = html.join('');
        $(".left-div").html(html);
        var jroll = new JRoll(".left-div", {id: "scroller"});// 初始化省份列可以滚动
        var height = $(".left-div").find('li').eq(0).outerHeight();// 获取单个li的高度
        if(j){
            $(".left-div").find('li').eq(j).addClass('active');// 标记定位省份样式
           jroll.scrollTo(0, -j*height, 0, true);// 滚动到定位省份 
        }else{
            $(".left-div").find('li:first').addClass('active');// 如果没有定位到省份，默认标记第一个省份样式
        }
    },
    createCenter:function(data,parentid,k){
        var html = [];
        html.push("<ul>");
        $.each(data,function(index,obj){
            html.push('<li class="center-li" city-id="'+obj.id+'" data-parentid="'+parentid+'" data-id="'+index+'"><span>'+obj.text+'</span></li>');
        });
        html.push("</ul>");
        html = html.join('');
        $(".center-div").html(html);
        var jroll1 = new JRoll(".center-div", {id: "scroller1"}); // 初始化地级市列可以滚动
        var height = $(".center-div").find('li').eq(0).outerHeight();// 获取单个li的高度
        if(k){
            jroll1.scrollTo(0, -k*height, 0, true);// 滚动到定位地级市
            $(".center-div").find('li').eq(k).addClass('active2');// 标记定位地级市样式
        }else{
            $(".center-div").find('li:first').addClass('active2')// 如果没有定位到地级市，默认标记第一个地级市样式
        }
    },
    createRight:function(data,rootid,parentid,l){
        var html = [];
        html.push("<ul>");
        $.each(data,function(index,obj){
            html.push('<li class="right-li" area-id="'+obj.id+'" data-rootid="'+rootid+'" data-parentid="'+parentid+'" data-id="'+index+'"><span>'+obj.text+'</span></li>');
        });
        html.push("</ul>");
        html = html.join('');
        $(".right-div").html(html);
        var jroll2 = new JRoll(".right-div", {id: "scroller2"});// 初始化区域列可以滚动
        var height = $(".right-div").find('li').eq(0).outerHeight();// 获取单个li的高度
        if(l >= 0){
            jroll2.scrollTo(0, -l*height, 0, true);// 滚动到定位区域
            $(".right-div").find('li').eq(l).addClass('active2');// 标记定位区域样式
        }
    },
    events:function(j,k,l){
        // j 定位到的省份 k 定位到的地级市 l 定位到的区域
        //绑定一级联动点击事件
        $("body").on("click",".left-li",function(){
            var id = $(this).data("id");
            jroll = new JRoll(".left-div", {id: "scroller"});
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            selectQz.createCenter(rlpca[id].children,id); //创建二级联动
            selectQz.createRight(rlpca[id].children[0].children,id,0); //创建三级联动
            j = id;
        });
        //绑定二级联动点击事件
        $("body").on("click",".center-li",function(){
            var parentid = $(this).data("parentid");
            jroll1 = new JRoll(".center-div", {id: "scroller1"});
            $(this).siblings().removeClass('active2');
            $(this).addClass('active2');
            var id = $(this).data("id");
            if(j){
                selectQz.createRight(rlpca[j].children[id].children,parentid,id); //创建三级联动 
                k = id;
            }else{
                j = parentid;
                selectQz.createRight(rlpca[parentid].children[id].children,parentid,id); //创建三级联动 
            }
        });
        //绑定三级联动点击事件
        $("body").on("click",".right-li",function(){
            var rootid = $(this).data("rootid");
            jroll2 = new JRoll(".right-div", {id: "scroller2"});
            $(this).siblings().removeClass('active2');
            $(this).addClass('active2');
            var parentid = $(this).data("parentid");
            var id = $(this).data("id");
            $('.mask').hide();
            $('.Area').animate({right: "-800px"}, 800,function(){      
                $('.Area').hide();
            });
            // 重新获取赋值---省市区
            if(j == rootid && k != parentid){
                k = 0;
                $('#showCityPicker2').val(
                    rlpca[rootid].text+" "+
                    rlpca[rootid].children[k].text+" "+
                    rlpca[rootid].children[k].children[id].text).css('color',"#666");
                    $('input[name=province]').attr('data-id', rlpca[rootid].id);
                    $('input[name=city]').attr('data-id', rlpca[rootid].children[k].id);
                    $('input[name=area]').attr('data-id', rlpca[rootid].children[k].children[id].id);
            }else{
                $('#showCityPicker2').val(
                    rlpca[j].text+" "+
                    rlpca[j].children[k].text+" "+
                    rlpca[j].children[k].children[id].text).css('color',"#666");
                    $('input[name=province]').attr('data-id', rlpca[j].id);
                    $('input[name=city]').attr('data-id', rlpca[j].children[k].id);
                    $('input[name=area]').attr('data-id', rlpca[j].children[k].children[id].id);
            }
        });
        $('#showCityPicker2').on('click',function(){         
            $('.Area').show().stop().animate({right: 0}, 300);
            $('.mask').fadeIn(100);
            jroll = new JRoll(".left-div", {id: "scroller"});
            jroll1 = new JRoll(".center-div", {id: "scroller1"});
            jroll2 = new JRoll(".right-div", {id: "scroller2"});        
        });
        $('body').on('click','.mask',function(){
            $(this).fadeOut(100);
            $('.Area').stop().animate({right: "-800px"}, 300,function(){
                $('.Area').hide();
            });                
        });
    }
}