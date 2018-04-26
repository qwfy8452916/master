$(function(){


$('.sidebar-menu .treeview-menu li').click(function(){
        $('.sidebar-menu .treeview-menu li').removeClass('baisebj')
        $('.zineir').removeClass('fontyanse');
        $('.topp').removeClass('topziys');
         $('.bott').removeClass('bottomzys');

         $('.single').removeClass('baisebj')
         $('.single').children('.fugaodu').children('.outtop').removeClass('topyuanj')
         $('.single').children('.fugaodu').children('.outbot').removeClass('bottyuanj')
       

        $(this).children(".childgaodu").children('.topp').addClass('topziys');
        $(this).children(".childgaodu").children('.bott').addClass('bottomzys');
        $(this).siblings().children('.childgaodu').children('.topp').removeClass('topziys');
        $(this).siblings().children('.childgaodu').children('.bott').removeClass('bottomzys');

        $(this).children(".childgaodu").children('.zineir').addClass('fontyanse');
        $(this).siblings().children(".childgaodu").children('.zineir').removeClass('fontyanse');
        $(this).addClass('baisebj');
        $(this).siblings().removeClass('baisebj');

    });


     $('.single').click(function(){
 
 
           $('.sidebar-menu .treeview-menu li').removeClass('baisebj')
           $('.manydg .zikuang').removeClass('huisebj')
           $('.manydg .zikuang').addClass('zhengtibj')
           $('.zineir').removeClass('fontyanse');
           $('.topp').removeClass('topziys');
           $('.bott').removeClass('bottomzys');



           $('.sidebar-menu .single').removeClass('baisebj')
           $('.sidebar-menu .single').children('.fugaodu').children('.outtop').removeClass('topyuanj')
           $('.single').children('.fugaodu').children('.outbot').removeClass('bottyuanj')
           $(this).addClass('baisebj');
           $(this).children('.fugaodu').children('.outtop').addClass('topyuanj')
           $(this).children('.fugaodu').children('.outbot').addClass('bottyuanj')
           $(this).siblings('.single').removeClass('baisebj');

          
        })
     
     $('.manydg').click(function(){
        $('.single').removeClass('baisebj')
        $('.single').children('.fugaodu').children('.outtop').removeClass('topyuanj')
        $('.single').children('.fugaodu').children('.outbot').removeClass('bottyuanj')

        $(this).children('.zikuang').addClass('huisebj')
        $(this).children('.zikuang').removeClass('zhengtibj')
        $(this).siblings('.manydg').children('.zikuang').addClass('zhengtibj')       
        $(this).siblings('.manydg').children('.zikuang').removeClass('huisebj')
     })



  
})


 