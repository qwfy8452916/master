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
        var option = option || {};
        for(var j = 0;j<rlpca.length;j++){
            if(rlpca[j].id == option.province){// 判断定位省份
                for(var k = 0;k<rlpca[j].children.length;k++){
                    if(rlpca[j].children[k].id == option.city){// 判断定位地级市
                        for(var l = 0;l<rlpca[j].children[k].children.length;l++){
                            if(rlpca[j].children[k].children[l].id == option.area){// 判断定位区域
                                selectQz.createLeft(rlpca,j);
                                selectQz.createCenter(rlpca[j].children,0,k);
                                selectQz.createRight(rlpca[j].children[k].children,0,0,l);
                            }
                        }
                    }
                }
            }
        }
        $("<div class="+'mask'+"></div>").insertAfter(".Area");
        selectQz.events();
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
        var jroll = new JRoll(".left-div", {id: "scroller"});
        $(".left-div").find('li').eq(j).addClass('active');
        var height = $(".left-div").find('li').eq(0).outerHeight();
        jroll.scrollTo(0, -j*height, 0, true);//滚动到定位省份
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
        var jroll1 = new JRoll(".center-div", {id: "scroller1"});
        $(".center-div").find('li').eq(k).addClass('active2');
        var height = $(".center-div").find('li').eq(0).outerHeight();
        if(k){
            jroll1.scrollTo(0, -k*height, 0, true);
        }else{
            $(".center-div").find('li:first').addClass('active2')
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
        var jroll2 = new JRoll(".right-div", {id: "scroller2"});
        $(".right-div").find('li').eq(l).addClass('active2');
        var height = $(".right-div").find('li').eq(0).outerHeight();
        if(l){
            jroll2.scrollTo(0, -l*height, 0, true);
        }
    },
    events:function(){
        //绑定一级联动点击事件
        $("body").on("click",".left-li",function(){
            var id = $(this).data("id");
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            selectQz.createCenter(rlpca[id].children,id); //创建二级联动
            selectQz.createRight(rlpca[id].children[0].children,id,0); //创建三级联动
            
        });
        //绑定二级联动点击事件
        $("body").on("click",".center-li",function(){
            var parentid = $(this).data("parentid");
            $(this).siblings().removeClass('active2');
            $(this).addClass('active2');
            var id = $(this).data("id");
            selectQz.createRight(rlpca[parentid].children[id].children,parentid,id); //创建三级联动 
        });
        //绑定三级联动点击事件
        $("body").on("click",".right-li",function(){
            var rootid = $(this).data("rootid");
            $(this).siblings().removeClass('active2');
            $(this).addClass('active2');
            var parentid = $(this).data("parentid");
            var id = $(this).data("id");
            $('.mask').hide();
            $('.Area').animate({right: "-800px"}, 800,function(){      
                $('.Area').hide();
            });
            // 重新获取赋值---省市区
            $('.dianji2').val(rlpca[rootid].text+" "+rlpca[rootid].children[parentid].text+" "+rlpca[rootid].children[parentid].children[id].text).css('color',"#666");
            $('input[name=province]').attr('data-id', rlpca[rootid].id);
            $('input[name=city]').attr('data-id', rlpca[rootid].children[parentid].id);
            $('input[name=area]').attr('data-id', rlpca[rootid].children[parentid].children[id].id);
        })
        $('.dianji2').on('click',function(){         
            $('.Area').show().stop().animate({right: 0}, 300);
            $('.mask').fadeIn(100);
            var jroll = new JRoll(".left-div", {id: "scroller"});
            var jroll1 = new JRoll(".center-div", {id: "scroller1"});
            var jroll2 = new JRoll(".right-div", {id: "scroller2"});         
        });
        $('body').on('click','.mask',function(){
            $(this).fadeOut(100);
            $('.Area').stop().animate({right: "-800px"}, 300,function(){
                $('.Area').hide();
            });                
        });
    }
}