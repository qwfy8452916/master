/*
* @Author: Administrator
* @Date:   2019-01-14 08:38:55
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-16 13:50:29
*/

function select3() {
  var obj = this;
  obj.default = {
    selectData: [],
    multniple: false,
    data: [],
    placeholder: '请选择',
    getValue: function() {},
    targetEle: ''
  }
  obj.initSelect = function(options) {
    var opts = $.extend({},
    obj.default, options); //使用jQuery.extend 覆盖插件默认参数
    if (!opts.targetEle) {
      console.error("请配置选择器");
      return
    }
    obj.init(opts);

    //确定
    $("body").off("click","#" + opts.targetEle.substr(1, opts.targetEle.length - 1) + " .select-btn-pamary");
    $("body").on("click", "#" + opts.targetEle.substr(1, opts.targetEle.length - 1) + " .select-btn-pamary",function() {
      var res = [];
      $(opts.targetEle).find(".select-content").html("");
      $("#" + opts.targetEle.substr(1, opts.targetEle.length - 1)).find("li").each(function() {
        if ($(this).find('input').prop("checked")) {
          var result = {
            id:$(this).data("id"),
            name:$(this).text()
          }
          res.push(result);
          $(opts.targetEle).find(".select-content").append("<span class='select-item' data-id='" + $(this).data('id') + "'>" + $(this).find(".select-name").text() + "</span>")
        }
      });
      if($(opts.targetEle).find(".select-item").length==0){
        $(opts.targetEle).html("<div class='select-container'><div class='select-content'><span class='placeholder'>" + opts.placeholder + "</span></div><div class='icon-select'></div></div>");
      }
      opts.getValue(res);
      $(this).parents(".select3-chosebox").remove();
    });
    //取消
    $("body").off("click","#" + opts.targetEle.substr(1, opts.targetEle.length - 1) + " .select-btn-default");
    $("body").on("click", "#" + opts.targetEle.substr(1, opts.targetEle.length - 1) + " .select-btn-default",function() {
      $(this).parents(".select3-chosebox").remove();
    });

    // 点击空白区域，取消弹窗
    $('body').on("click",function(event) {
      var select3 = $('.select3');
      if (!select3.is(event.target) && $(".select3-chosebox").has(event.target).length === 0 && select3.has(event.target).length === 0) {
        $(".select3-chosebox").remove()
      }
    })
  }

  // 初始化数据
  this.init = function(opts) {
    var _this = $(opts.targetEle);
    var dataList = opts.data;
    _this.addClass('select3');
    _this.attr("data-name", opts.targetEle.substr(1, opts.targetEle.length - 1));

    //插入选中数据
    if (dataList.length == 0) {
      _this.html("<div class='select-container'><div class='select-content'><span class='placeholder'>" + opts.placeholder + "</span></div><div class='icon-select'></div></div>");
    } else {
      var selectedData = "";
      _this.html("<div class='select-container'><div class='select-content'></div><div class='icon-select'></div></div>");
      for (var i = 0; i < dataList.length; i++) {
        selectedData = selectedData + "<span data-id='" + dataList[i].id + "'class='select-item'>" + dataList[i].name + "</span>";
      }
      _this.find(".select-content").html(selectedData);
    }
    // 点击创建选项
    _this.unbind('click');
    _this.click(function() {
      obj.createSelect(opts)
    });
    $("body").off("click","#" + opts.targetEle.substr(1, opts.targetEle.length - 1) + " li");
    $("body").on("click", "#" + opts.targetEle.substr(1, opts.targetEle.length - 1) + " li", opts, obj.getSelectData);
    $("body").on("click", '.select-no-data',function() {
      $("#" + opts.targetEle.substr(1, opts.targetEle.length - 1)).remove();
    })
  }

  // 创建选项
  this.createSelect = function(opts) {
    var _this = $(opts.targetEle);
    var topDis = _this.offset().top;
    var leftDis = _this.offset().left;
    var thisHeight = _this.outerHeight();
    var thisWidth = _this.outerWidth();
    var hasLength = $("#" + opts.targetEle.substr(1, opts.targetEle.length - 1)).length;
    if (hasLength > 0) {
      $("#" + opts.targetEle.substr(1, opts.targetEle.length - 1)).remove();
      return
    }
    $('body').find(".select3-chosebox").remove();
    var selectBox = "<div class='select3-chosebox' id='" + opts.targetEle.substr(1, opts.targetEle.length - 1) + "' style='width:" + thisWidth + "px; left:" + leftDis + "px; top:" + (topDis + thisHeight) + "px'></div>";
    $('body').append(selectBox);
    var dataList = opts.selectData;
    if (dataList.length === 0) {
      $(".select3-chosebox").append("<div class='select-no-data'>没有任何选项</div>");
    } else {
      var selectItem = "";
      $(".select3-chosebox").append("<ul></ul>");
      for (var i = 0; i < dataList.length; i++) {
        var rightText = dataList[i].order_number > 0 ? dataList[i].order_number + "个关联订单": "空闲中";
        selectItem = selectItem + "<li data-id='" + dataList[i].id + "'><input type='checkbox'/><span class='select-name'>" + dataList[i].name + "</span><span class='select-rel'>" + rightText + "</span></li>";
      }
    }

    // 初始化选中项
    $(".select3-chosebox").find("ul").html(selectItem);
    var currentData = _this.find(".select-item");
    if (currentData.length > 0) {
      for (var j = 0; j < currentData.length; j++) {
        $(".select3-chosebox ul li").each(function() {
          if ($(this).data("id") == $(currentData[j]).data('id')) {
            $(this).find("input").prop("checked", true);
            if(!opts.multiple){
              $(this).addClass("select3-active");
            }
          }
        })
      }
    }
    // 如果是多选，显示确定按钮
    if (opts.multiple && dataList.length > 0) {
      var btnBox = "<div class='select-btn-box'><span class='select-btn select-btn-pamary'>确定</span><span class='select-btn select-btn-default'>取消</span></div>";
      $(".select3-chosebox").append(btnBox);
      $(".select3-chosebox").find("input").css('display', 'block');
    }
  }

  // 点击获取选项
  this.getSelectData = function(event) {
    var that = $(this);
    var isCurrent = that.find('input').length > 0 ? that.find('input').prop("checked") : that.prop('checked');

    if (isCurrent) {
      that.find('input').prop("checked", false);
      that.prop('checked', false);
    } else {
      that.find('input').prop("checked", true);
      that.prop('checked', true)
    }
    if (!event.data.multiple) { //单选
      that.siblings().find("input").prop("checked", false);
      that.parent("li").siblings().find("input").prop("checked", false);
      $(event.data.targetEle).find(".select-content").html("<span class='select-item' data-id='" + that.data('id') + "'>" + that.find(".select-name").text() + "</span>");
      that.parents(".select3-chosebox").remove();
      //结果回调
      event.data.getValue(obj.getResult($(event.data.targetEle)));
    }
  }

  //回调选中结果
  this.getResult = function(_this) {
    var resultData = [];
    _this.find(".select-item").each(function() {
      var result = {
        id:$(this).data("id"),
        name:$(this).text()
      }
      resultData.push(result);
    });
    return resultData;
  }
}
