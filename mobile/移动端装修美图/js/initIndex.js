var cityinfo = rlpca;
(function(mui, doc) {
    mui.init();
    mui.ready(function() {
        var cityPicker3 = new mui.PopPicker({
            layer: 3
        });
        cityPicker3.setData(cityinfo);
        var showCityPickerButton = document.getElementById('showCityPicker2');
        var cityResult = document.getElementById('cityResult');
        showCityPickerButton.addEventListener('tap',
        function(event) {
            var cityID0 = $('input[name=province]').attr('data-id');
            var cityID1 = $('input[name=city]').attr('data-id');
            var cityID2 = $('input[name=area]').attr('data-id');
            cityPicker3.pickers[0].setSelectedValue(cityID0);
            var _time1 = setTimeout(function() {
                cityPicker3.pickers[1].setSelectedValue(cityID1);
                clearTimeout(_time1);
            },
            200);
            var _time2 = setTimeout(function() {
                cityPicker3.pickers[2].setSelectedValue(cityID2);
                clearTimeout(_time2);
            },
            300);
            cityPicker3.show(function(items) {
                var html = '<i class="fa fa-map-marker"></i>' + " " + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
                if ('请选择省' == (items[0] || {}).text) {
                    html = '<i class="fa fa-map-marker"></i> 请选择您所在的区域';
                }
                showCityPickerButton.innerHTML = html;
                showCityPickerButton.style.border = "1px solid #ddd";
                showCityPickerButton.style.color = "#3c3c3c";
                $('input[name=province]').attr('data-id', items[0].id);
                $('input[name=city]').attr('data-id', items[1].id);
                $('input[name=area]').attr('data-id', items[2].id);
            });
        },
        false);
    });
})(mui, document);
$(function() {
    /*function startmarquee(lh, speed, delay) {
        var p = false;
        var t;
        var o = document.getElementById("marqueebox");
        o.innerHTML += o.innerHTML;
        o.style.marginTop = 0;
        o.onmouseover = function() {
            p = true;
        }
        o.onmouseout = function() {
            p = false;
        }
        function start() {
            t = setInterval(scrolling, speed);
            if (!p) o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
        }
        function scrolling() {
            if (parseInt(o.style.marginTop) % lh != 0) {
                o.style.marginTop = parseInt(o.style.marginTop) - 1 + "px";
                if (Math.abs(parseInt(o.style.marginTop)) >= o.scrollHeight / 2) o.style.marginTop = 0;
            } else {
                clearInterval(t);
                setTimeout(start, delay);
            }
        }
        setTimeout(start, delay);
    }*/
    // startmarquee(20, 20, 2000);
    /*TouchSlide({
        slideCell: "#focus",
        titCell: ".hd ul",
        mainCell: ".bd ul",
        effect: "leftLoop",
        autoPlay: true,
        autoPage: true
    });
    TouchSlide({
        slideCell: "#leftTabBox"
    });*/
    $(".home-zb .m-b-btn").click(function(event) {
        var container = $(this).parents(".home-zb");
        var name = $(".m-bj-edit input[name=name]").val();
        var tel = $(".m-bj-edit input[name=tel]").val();
        var cs = $('input[name=city]').attr('data-id');
        var qx = $('input[name=area]').attr('data-id');
        if (!App.validate.run(name)) {
            $(".m-bj-edit input[name=name]").focus();
            alert("请输入您的称呼");
            return false;
        } else {
            var reg = new RegExp("^[\u4e00-\u9fa5a-zA-Z]+$");
            if (!reg.test(name)) {
                $(".m-bj-edit input[name=name]").focus();
                alert("请输入正确的名称，只支持中文和英文");
                return false;
            }
        }
        if (!App.validate.run(tel)) {
            $(".m-bj-edit input[name=tel]").focus();
            alert("请输入您的手机号码");
            return false;
        } else {
            var reg = new RegExp("^[0-9]{11}$");
            if (!reg.test(tel)) {
                $(".m-bj-edit input[name=tel]").focus();
                alert("请输入正确的手机号");
                return false;
            }
        }
        if ('' == cs || '' == qx) {
            alert('请选择您所在的区域 ≧▽≦');
            return false;
        }
        $.ajax({
            url: '/fb_order/',
            type: 'POST',
            dataType: 'JSON',
            data: {
                cs: cs,
                qx: qx,
                name: $("input[name=name]", container).val(),
                tel: $("input[name=tel]", container).val(),
                source: '310'
            }
        }).done(function(data) {
            if (data.status == 1) {
                window.location.href = "/baojiawanshan/";
            } else {
                alert(data.info);
            }
        });
    });
});