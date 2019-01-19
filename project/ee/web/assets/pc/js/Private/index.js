$(function () {
    var myChart = echarts.init(document.getElementById('statistic'));
    window.option = {
        title: {
            // text: '一天用电量分布',
            subtext: '签单量'
        },
        grid:{
            x:30,
            y:45,
            x2:30
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1-4周五']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            axisPointer: {
                snap: true
            }
        },
        series: [{
            name: '签单量',
            type: 'line',
            color: 'skyblue',
            smooth: true,
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: 'skyblue'
                    }
                }
            },
            data: [300],
            areaStyle: {
                color: 'skyblue'
            }
        }]
    };

    $('#time').daterangepicker({
        "timePicker": true,
        "timePicker24Hour": true,
        "linkedCalendars": false,
        "autoUpdateInput": false,
        "locale": {
            format: 'YYYY-MM-DD',
            separator: ' ~ ',
            applyLabel: "应用",
            cancelLabel: "取消",
            resetLabel: "重置",
        }
    }, function (start, end, label) {
        beginTimeStore = start;
        endTimeStore = end;
        var diff = parseInt((end - start) / (1000 * 60 * 60 * 24))
        if (diff > 31) {
            alert('时间跨度不得超过31天')
            return
        }
        if (!this.startDate) {
            this.element.val('');
        } else {
            this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
        }
        $('.bottom .month').removeClass('active')
        getStatic(this.startDate.format(this.locale.format),this.endDate.format(this.locale.format))
    });
    // 点击本月
    $('.bottom .month').on('click', function () {
        $('.bottom .search span').removeClass('active')
        $(this).addClass('active')
        $('#time').val(getDay(-30)+' ~ '+getDay(0))
        getStatic(getDay(-30),getDay(0))
    })
    // 点击本周
    // $('.bottom .week').on('click', function () {
    //     $('.bottom .search span').removeClass('active')
    //     $(this).addClass('active')
    //     $('#time').val(getDay(-6)+' ~ '+getDay(0))
    //     getStatic(getDay(-6),getDay(0))
    // })

    function setdata(data) {
        console.log(data)
        var Xdata = []
        var seriesData = []
        for (var key in data) {
            Xdata.push(key)
            seriesData.push(data[key].count)
        }
        window.option.xAxis.data = Xdata
        window.option.series[0].data = seriesData
        myChart.clear()
        myChart.setOption(option);
    }

    setdata(JSON.parse($('#ceshi').val()))


    function getDay(day) {
        var today = new Date();

        var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
        today.setTime(targetday_milliseconds); 
        var tYear = today.getFullYear();
        var tMonth = today.getMonth();
        var tDate = today.getDate();
        tMonth = doHandleMonth(tMonth + 1);
        tDate = doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
    }

    function doHandleMonth(month) {
        var m = month;
        if (month.toString().length == 1) {
            m = "0" + month;
        }
        return m;

    }

//获取筛选条件数据
    function getStatic(start, end) {
        $.ajax({
            url: '/getStatics',
            type: 'POST',
            dataType: 'JSON',
            data: {start: start,end: end}
        })
            .done(function (data) {
                if(data.error_code == 0){
                    setdata(data.info)
                }else {
                    tishitip(data.error_msg);
                }
            });
    }
    window.onload = function() {
        $('.month').addClass('active')
        $('#time').val(getDay(-30)+' ~ '+getDay(0))
        getStatic(getDay(-30),getDay(0))
    }
})