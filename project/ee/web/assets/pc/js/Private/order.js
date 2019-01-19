     

      datariqi(".dateriqi");
      function datariqi(select){
         $(select).daterangepicker({
            "opens":'left',
            "alwaysShowCalendars": true,
            "linkedCalendars":false,
            "autoUpdateInput": false,
            "timePicker": true,
            "timePicker24Hour": false,
            "linkedCalendars": false,
            "autoUpdateInput": false,
            locale : {
                format: 'YYYY-MM-DD HH:mm:ss',
                separator: ' ~ ',
                applyLabel : '确定',
                cancelLabel : '取消',
                fromLabel : '起始时间',
                toLabel : '结束时间',
                resetLabel: "重置",
                customRangeLabel : '自定义',
                daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
                monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
                        '七月', '八月', '九月', '十月', '十一月', '十二月' ],
                firstDay : 1
            },

        },
        function(start, end, label) {
            if (!this.startDate) {
                this.element.val('');
            } else {
                this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
            }
            
               startshijian=$("input[name='start_time']").val(this.startDate.format(this.locale.format));
               endshijian=$("input[name='end_time']").val(this.endDate.format(this.locale.format));
            
        });
        
      }
  
      $(window).resize(setBtnPosition);

   $(function(){


    var create_time_start = $("input[name='start_time']").val();
    var create_time_end = $("input[name='end_time']").val();
    

    if(create_time_start && create_time_end){
        $(".dateriqi").val(create_time_start+" ~ "+create_time_end);
    }




    $('.resetcz').click(function(event) {
     	$('.wrapinput input').val("");
     	$('.wrapinput select').val("");

    });

    $('.sousuo').click(function(event) {
       
      $('.biaodantj').submit();

    });


   })