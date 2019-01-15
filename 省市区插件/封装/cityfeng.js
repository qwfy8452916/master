  
   rlpca.shift();
   for(var i=0;i<rlpca.length;i++){
     rlpca[i].children.shift();
     for(var j=0;j<rlpca[i].children.length;j++){
        rlpca[i].children[j].children.shift()
     }
   }

  

  var fengchange={
   
    
    init:function(){
        fengchange.createleft(rlpca);
        fengchange.createcenter(rlpca[0].children,0,0);
        fengchange.createright(rlpca[0].children[0].children,0,0,0);
        fengchange.event();
    },

   createleft:function(data){
    var html=[];
    html.push('<ul>');
    $.each(data,function(index,obj){
      html.push('<li class="left_li" data-id="'+index+'">'+obj.text+'</li>')
    })
    html.push('</ul>')
    html=html.join('')
    $('.div-left').html(html)
    $('.left_li').first().addClass('activity')
   },

   createcenter:function(data,rootid){
        var html=[];
        html.push('<ul>')
        $.each(data,function(index,obj){
        html.push('<li class="center_li" data-rootid="'+rootid+'" data-id="'+index+'">'+obj.text+'</li>')
        })
        html.push('</ul>')
        html=html.join(''),
        $('.div-center').html(html)
        $('.center_li').first().addClass('activity')
   },

   createright:function(data,rootid,parentid){
        var html=[];
        html.push('<ul>')
        $.each(data,function(index,obj){
        html.push('<li class="right_li" data-rootid="'+rootid+'" data-parentid="'+parentid+'" data-id="'+index+'">'+obj.text+'</li>')
        })
        html.push('</ul>')
        html=html.join('')
        $('.div-right').html(html)
   },


   event:function(){
    $('.city').click(function(){
        $('.cityyy').fadeIn(100);
        $('.citywrap').show().stop().animate({right:"0"},300)
        jroll = new JRoll(".div-left", {id: "scroller"});
        jroll1 = new JRoll(".div-center", {id: "scroller1"});
        jroll2 = new JRoll(".div-right", {id: "scroller2"}); 
    });
    $('.cityyy').click(function(){
        $('.cityyy').hide();
        $('.citywrap').animate({right:"-500px"},300,function(){
            $('.citywrap').hide()
        })
    });

    $('body').on('click','.left_li',function(){
        var id=$(this).data('id')
        fengchange.createcenter(rlpca[id].children,id,0);
        fengchange.createright(rlpca[id].children[0].children,id,0,0)
        $(this).addClass('activity')
        $(this).siblings().removeClass('activity')
        jroll1 = new JRoll(".div-center", {id: "scroller1"});
        jrol2 = new JRoll(".div-right", {id: "scroller2"});
    })

    $('body').on('click','.center_li',function(){
        var id=$(this).data('id')
        var rootid=$(this).data('rootid')
        fengchange.createright(rlpca[rootid].children[id].children,rootid,id)
        $(this).addClass('activity')
        $(this).siblings().removeClass('activity')
        jrol2 = new JRoll(".div-right", {id: "scroller2"});
    })

    $('body').on('click','.right_li',function(){
        var id=$(this).data('id')
        var rootid=$(this).data('rootid')
        var parentid=$(this).data('parentid')

        $(this).addClass('activity')
        $(this).siblings().removeClass('activity')
        console.log(rootid+'+'+parentid+'+'+id)
        $('.city').val(rlpca[rootid].text+' '+rlpca[rootid].children[parentid].text+' '+rlpca[rootid].children[parentid].children[id].text)
        $('.cityyy').hide();
        $('.citywrap').animate({right:"-500px"},300,function(){
            $('.citywrap').hide()
        })
        
    })

   },

}
fengchange.init()


