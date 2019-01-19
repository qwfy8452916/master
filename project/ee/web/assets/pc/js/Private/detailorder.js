$(function () {
  // console.log(JSON.parse($('.worker-select').val()));
  // console.log(JSON.parse($('.project-select').val()));
  var initdata = JSON.parse($('.worker-select').val())
  var initproject = JSON.parse($('.project-select').val())
  initdata.project = initproject
  window.changedata = []
  // console.log(initdata);
  
  // 初始化select2多选框
  function resetselect(init) {
    var mgdata = []
    var wgdata = []
    var sdgdata = []
    var yqgdata = []
    var projectdata = ''
    if(init.mg) {
      init.mg.forEach(function (v, i) {
        mgdata[i] = v.account_id
      })
    }
    if(init.sdg){
      init.sdg.forEach(function (v, i) {
        sdgdata[i] = v.account_id
      })
    }
    if(init.yqg) {
      init.yqg.forEach(function (v, i) {
        yqgdata[i] = v.account_id
      })
    }
    if (init.wg) {
      init.wg.forEach(function (v, i) {
        wgdata[i] = v.account_id
      })
    }
    if(init.project.length > 0) {
      projectdata = init.project[0].account_id
    }
    mg.val(mgdata).trigger("change")
    sdg.val(sdgdata).trigger("change")
    wg.val(wgdata).trigger("change")
    yqg.val(yqgdata).trigger("change")
    project.val(projectdata).trigger("change")
  }
  var project
  var sdg
  var wg
  var mg
  var yqg
  function initselect () {
    project = $("#selectmanager").select2({
      templateResult: formatState,
      templateSelection: formatState2,
    });
  
    sdg = $("#selectshuidian").select2({
      templateResult: formatState,
      templateSelection: formatState2,
      multiple: true,
      placeholder: "请选择",
    });
    wg = $("#selectwa").select2({
      templateResult: formatState,
      templateSelection: formatState2,
      multiple: true,
      placeholder: "请选择",
    });
    mg = $("#selectwood").select2({
      templateResult: formatState,
      templateSelection: formatState2,
      multiple: true,
      placeholder: "请选择",
    });
    yqg = $("#selectyouqi").select2({
      templateResult: formatState,
      templateSelection: formatState2,
      multiple: true,
      placeholder: "请选择",
    });
  }

  initselect()
  resetselect(initdata)
  
  
  function getwork(){
    var selectobj = {}
    selectobj.worker_type = 2
    selectobj.order_id = $('.order-id').val()
    if(sdg.val()){
      selectobj.sdg = sdg.val()
    }
    if(wg.val()){
      selectobj.wg = wg.val()
    }
    if(mg.val()){
      selectobj.mg = mg.val()
    }
    if(yqg.val()){
      selectobj.yqg = yqg.val()
    }
    return selectobj
  }

  function getproject(){
    var selectpro = {}
    selectpro.worker_type = 1
    selectpro.order_id = $('.order-id').val()
    if(project.val()){
      selectpro.project = project.val()
    }
    return selectpro
  }
  
  
  function formatState(state) {
    if (!state.id) {
      return state.text;
    }
    var arr = state.text.split('-')
    if (arr[1] == 0) {
      return $('<span>' + arr[0] + '<span class="pull-right" style="color:#428bca;font-size:14px;">' + '空闲中' + '</span>' + '</span>');
    }
    var $state = $(
      '<span>' + arr[0] + '<span class="pull-right" style="color:#428bca;font-size:14px;">' + arr[1] + '个关联订单' + '</span>' + '</span>'
    );
    return $state;
  };

  function formatState2(state) {
    if (!state.id) {
      return state.text;
    }
    var arr = state.text.split('-')
    return arr[0];
  };

  // 施工信息模块
  $('#addshigong').on('click', function () {
    $('.savecanwk.add').css('display', 'none')
    $('.savecanwk.edit').css('display', 'block')
    $('#addsg').css('display', 'block')
  })
  $('#cancel-btn').on('click', function () {
    $('.savecanwk.add').css('display', 'block')
    $('.savecanwk.edit').css('display', 'none')
    $('#addsg').css('display', 'none')
  })

  // 施工人员模块
  // 修改
  $('#modify').on('click', function () {
    $('.savecanwk.addperson').css('display', 'none')
    $('.savecanwk.editperson').css('display', 'block')
    $('.person.first').css('display', 'none')
    $('.person.second').css('display', 'block')
    if($('#xmjl').prop('checked')){
      $('.person.third').css('display', 'block')
    } else{
      $('.person.forth').css('display', 'block')
    }

  })
  // 取消
  $('#cancel-person').on('click', function () {
    resetshigong()
    savechange(changedata)
  })

  function resetshigong() {
    $('.savecanwk.addperson').css('display', 'block')
    $('.savecanwk.editperson').css('display', 'none')
    $('.person.first').css('display', 'block')
    $('.person.second').css('display', 'none')
    $('.person.third').css('display', 'none')
    $('.person.forth').css('display', 'none')
  }


  $('#xmjl').on('change', function () {
    $('.person.third').css('display', 'block')
    $('.person.forth').css('display', 'none')
  })

  $('#xmbz').on('change', function () {
    $('.person.third').css('display', 'none')
    $('.person.forth').css('display', 'block')
  })

  function savechange(getdata){
    if (getdata == '') {
      return
    }
    if(getdata.sdg){
      sdg.val(getdata.sdg).trigger("change")
    }else{
      sdg.val([]).trigger("change")
    }
    if(getdata.mg){
      mg.val(getdata.mg).trigger("change")
    }else {
      mg.val([]).trigger("change")
    }  
    if(getdata.wg){
      wg.val(getdata.wg).trigger("change")
    }else{
      wg.val([]).trigger("change")
    }  
    if(getdata.yqg){
      yqg.val(getdata.yqg).trigger("change")
    }else{
      yqg.val([]).trigger("change")
    }   
    if(getdata.project){
      project.val(getdata.project).trigger("change")
    }else{
      project.val('').trigger("change")
    }     
  }
  function resethtml(data) {
    var div = $('<div></div>')
    if(data.worker_type == 1) {
      if(data.list[0].order_number == 0) {
        div = '<div class="col-xs-3"><span class="pull-left">项目经理 :</span><ul class="pull-left"><li><span class="gongren" style="margin-right:10px;">'+data.list[0].name+'</span><a href="javascript:void(0)">空闲中</a></li></ul></div>'
      } else{
        div = '<div class="col-xs-3"><span class="pull-left">项目经理 :</span><ul class="pull-left"><li><span class="gongren" style="margin-right:10px;">'+data.list[0].name+'</span><a href="javascript:void(0)">'+data.list[0].order_number+'个进行中</a></li></ul></div>'
      }
    } else {
      for(var v in data.list) {
        // console.log(v,data.list[v],div);
        switch(v) {
          case 'wg' :
          div.append('<div class="col-xs-3"><span class="pull-left">瓦工 :</span><ul class="pull-left wa"></ul></div>')
          data.list[v].forEach(function(v,i){
            var child
            if(v.order_number == 0) {
              child = '<li><span class="gongren" style="margin-right:10px;">'+v.name+'</span><a href="javascript:void(0)">空闲中</a></li>'
            } else{
              child = '<li><span class="gongren" style="margin-right:10px;">'+v.name+'</span><a href="javascript:void(0)">'+v.order_number+'个进行中</a></li>'
            }
            $($(div).find('ul.wa')[0]).append(child)
          })
          break
          case 'mg' :
          div.append('<div class="col-xs-3"><span class="pull-left">木工 :</span><ul class="pull-left mu"></ul></div>')
          data.list[v].forEach(function(v,i){
            var child
            if(v.order_number == 0) {
              child = '<li><span class="gongren" style="margin-right:10px;">'+v.name+'</span><a href="javascript:void(0)">空闲中</a></li>'
            } else{
              child = '<li><span class="gongren" style="margin-right:10px;">'+v.name+'</span><a href="javascript:void(0)">'+v.order_number+'个进行中</a></li>'
            }
            $($(div).find('ul.mu')[0]).append(child)
          })
          break
          case 'sdg' :
          div.append('<div class="col-xs-3"><span class="pull-left">水电工 :</span><ul class="pull-left sd"></ul></div>')
          data.list[v].forEach(function(v,i){
            var child
            if(v.order_number == 0) {
              child = '<li><span class="gongren" style="margin-right:10px;">'+v.name+'</span><a href="javascript:void(0)">空闲中</a></li>'
            } else{
              child = '<li><span class="gongren" style="margin-right:10px;">'+v.name+'</span><a href="javascript:void(0)">'+v.order_number+'个进行中</a></li>'
            }
            $($(div).find('ul.sd')[0]).append(child)
          })
          break
          case 'yqg' :
          div.append('<div class="col-xs-3"><span class="pull-left">油漆工 :</span><ul class="pull-left yq"></ul></div>')
          data.list[v].forEach(function(v,i){
            var child
            if(v.order_number == 0) {
              child = '<li><span class="gongren" style="margin-right:10px;">'+v.name+'</span><a href="javascript:void(0)">空闲中</a></li>'
            } else{
              child = '<li><span class="gongren" style="margin-right:10px;">'+v.name+'</span><a href="javascript:void(0)">'+v.order_number+'个进行中</a></li>'
            }
            $($(div).find('ul.yq')[0]).append(child)
          })
          break
        }
      }
    }
    
    $('.person.first').html(div)
  }

  function reselect(data) {
    console.log(data);
    $('.person.third').html(data.project_html)
    $('.person.forth').html(data.worker_html)
    initselect()
    savechange(changedata)
  }
  // 施工人员保存
  $('#save-person').on('click', function () {
    var getdata = {}
    if($('#xmjl').prop('checked')){
      getdata = getproject()
      if(!getdata.project){
        tishitip('请选择项目经理', 2)
        return
      }
    } else {
      getdata = getwork()
      if(!getdata.sdg && !getdata.wg && !getdata.mg&& !getdata.yqg){
        tishitip('请选择项目班组', 2)
        return
      }
    }
    window.changedata = getdata
    savechange(getdata)
      $.ajax({
          url: "/shigong/saveworker/",
          type: "POST",
          dataType: "json",
          data: getdata,
          success: function (data) {
            console.log(data);
              if(data.error_code == 0){
                  resethtml(data.info)
                  reselect(data.worker_html)
                  tishitip('保存成功', 1)
                  resetshigong()
              }
          },
          error: function (xhr) {
              tishitip("请求错误,请稍后再试!", 2);
          }
      })
  })

  // 验收不合格弹框
  $('.nohege').on('click', function () {
    var build_no = $(this).data('id');
    $.ajax({
      url: "/shigong/build/faildesign",
      type: "get",
      dataType: "json",
      data: {
        build_no: build_no
      },
      success: function (data) {
        if (data.error_code == 0) {
          $('.fail-modal').html(data.data);
          $('#unqualified').modal('show');
        }
      },
      error: function (xhr) {
        tishitip("请求错误,请稍后再试!", 2);
      }
    })

  })


  //判断位置上传位置
  var setposition = function () {
    $('.uploader-list').each(function () {
      var widkd = $(this).outerWidth();
      var fitem_num = Math.floor(widkd / 170)
      var totalnum = $(this).find('.file-item').length;
      var yunum = totalnum % fitem_num
      var leftwidth = yunum * 170;
      // console.log(fitem_num)
      if (yunum > 0) {
        $('.uploader-demo').css({
          "position": "relative",
        })
        $(this).next('.filePicker').css({
          "position": "absolute",
          "left": leftwidth + "px",
          "top": "150px"
        })
      } else {
        $(this).next('.filePicker').css({
          "position": "",
          "left": "",
          "top": ""
        })
      }
    })
  }



  //遍历渲染图片数据和张数

  //遍历渲染图片数据和张数

  for (var j = 0; j < $('.getdata').length; j++) {
    var Designdata = JSON.parse($('.getdata').eq(j).val());

    var shr = "";
    for (var i = 0; i < Designdata.length; i++) {
      shr += '<div id="WU_FILE1_' + i + '" class="file-item thumbnail"><input class="nameval" type="hidden" value="' + Designdata[i].img + '"/><img src="//' + Designdata[i].img + '"><span class = "cancel delimgbtns yincdel" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span><div class="file-panel beijingyy" style = "line-height: 30px;">' + Designdata[i].title + '</div></div>'
    }
    $(".kbj").eq(j).find(".uploader-list").html(shr)
    $(".kbj").eq(j).find(".canupload").text($(".kbj").eq(j).find(".file-item").length)
    $(".kbj").eq(j).find(".yuupload").text(9 - $(".kbj").eq(j).find(".file-item").length)
  }

  $('.topaddpic').find(".canupload").text($('.topaddpic').find(".file-item").length);
  $('.topaddpic').find(".yuupload").text(9 - $('.topaddpic').find(".file-item").length);





  //点击删除图片

  $('.uploader-list').on('click', '.delshanchu', function () {
    var that = $(this);

    var piccount = $(this).parent().parent('.uploader-list').find(".file-item").length - 1;
    that.closest('.uploadpicwk').siblings('.zhangshuxz').children('.canupload').text(piccount);
    that.closest('.uploadpicwk').siblings('.zhangshuxz').children('.yuupload').text(9 - piccount);
    $(this).parent().remove();

  })







  //顶部施工信息添加



  $('.savecanwk .saveniu').click(function (event) {
    var Shigongstatus = $.trim($('.shigongstatus').val()),
      Ordernumber = $('.ordernumber').val(),
      Boxmoxing = $.trim($('.boxmoxing').val());
    var imgList = [];
    var file_item = $(this).parents('.firstpicwk').find('.file-item');
    for (var i = 0; i < file_item.length; i++) {
      var item = {
        'img': file_item.eq(i).find(".nameval").val(),
        'title': file_item.eq(i).find(".inbiaoti").val()
      }
      imgList.push(item)
    }
    if (Shigongstatus == "") {
      $(".tishi").html("");
      $(".shigongstatus-tishi").html("请选择施工状态");
      return false;
    }
    $(".tishi").html("");

    $.ajax({
      url: "/build/edit/add",
      type: "post",
      dataType: "json",
      data: {
        build_state: Shigongstatus,
        remark: Boxmoxing,
        build_design: imgList,
        order_no: Ordernumber
      },
      success: function (data) {
        if (data.error_code == 0) {
          var tishixin = "操作成功！";
          tishitip(tishixin, 1)
          setTimeout(function () {
            window.location.reload();
          }, 1000)
        } else if (data.error_code == 820401) {
          tishitip("抱歉，该状态已上传，请选择其他状态！", 2);
        } else {
          tishitip(data.error_msg, 2)
        }
      },
      error: function (xhr) {
        tishitip("请求错误,请稍后再试!", 2);
      }
    })

  });


  //点击删除

  $('body').on('click', '.anniiuwk .editcheck', function () {

    var that = $(this);
    shigongid = $(this).closest(".shigongwk").children(".shigongjilid").val();


    $(this).p_confirm({
      "confirmText": "确定要删除该选项吗？",
      okFun: function () {
        $.ajax({
          url: "/build/unit/del",
          dataType: "json",
          type: "post",
          data: {
            build_id: shigongid
          },
          success: function (data) {
            if (data.error_code == 0) {
              that.closest('shigongwk').remove();
              window.location.reload();
            } else {
              tishitip(data.error_msg, 2);
            }
          },
          error: function (xhr) {
            tishitip("请求错误,请稍后再试！", 2)
          }

        })
      },
      noFun: function () {}
    })

  })





  function appendHtml(data) {

    var panel = "";
    panel = data;
    panel = '<div class="newappendwk">' + panel + '</div>';
    $('.shigonghistory').append(panel);
    var thater = $('.shigonghistory').children('.newappendwk:last-child').find(".kbj");
    for (var k = 0; k < $(panel).find(".shigongwk").length; k++) {
      //点击加载默认图片数据
      var Designdata2 = JSON.parse($('.shigonghistory').children('.newappendwk:last-child').find('.getdata').eq(k).val());
      var shr = "";
      for (var i = 0; i < Designdata2.length; i++) {
        shr += '<div id="WU_FILE1_' + i + '" class="file-item thumbnail"><input class="nameval" type="hidden" value="' + Designdata2[i].img + '"/><img src="//' + Designdata2[i].img + '"><span class = "cancel delimgbtns delshanchu yincdel" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span><div class="file-panel beijingyy" style = "line-height: 30px;">' + Designdata[i].title + '</div></div>'
      }
      $('.shigonghistory').children('.newappendwk:last-child').find(".kbj").eq(k).find(".uploader-list").html(shr)
      thater.eq(k).find(".canupload").text(thater.eq(k).find(".file-item").length)
      thater.eq(k).find(".yuupload").text(9 - thater.eq(k).find(".file-item").length)
      //点击加载默认图片数据

      var index = $('.shigonghistory').children('.newappendwk:last-child').find(".defalutaddpic").eq(k).attr("data-index");
      var className = ".filePicker-" + index;

      myUp(className, ".fileList-" + index);

    }
  }

  //点击获取当前容器
  $("body").on("click", ".defalutaddpic", function () {
    var num = parseInt($(this).attr("data-index"));
    $list = $(this).prev(".fileList-" + num);
  });


  $('.loadmorewk .moreload').click(function (event) {
    var that = $(this),
      Ordernumber = $('.ordernumber').val(),
      page = parseInt(that.attr("data-page"));
    $.ajax({
      url: "/build/list",
      dataType: "json",
      type: "get",
      data: {
        page_current: page,
        order_no: Ordernumber
      },
      success: function (data) {
        if (data.error_code == 0) {
          if (data.data != '') {
            appendHtml(data.data);
            that.attr("data-page", ++page)
          }
          if (data.page.page_current < data.page.total_page) {
            that.text("加载更多")
          } else {
            that.text("没有更多历史记录了！")
          }

        } else {
          tishitip(data.error_msg, 2)
        }
      },
      error: function (xhr) {
        tishitip("请求错误，请稍后再试！", 2)
      }
    })



  });






  //查看示例

  $(".shili").click(function () {
    $(this).erpswiper({
      conWidth: 1100,
      imgItem: [{
        imgPath: "/assets/pc/img/Private/cases/wsjps.jpg",
        imgName: "卫生间铺砖"
      }, {
        imgPath: "/assets/pc/img/Private/cases/sdsgt.jpg",
        imgName: "水电施工图"
      }, {
        imgPath: "/assets/pc/img/Private/cases/psdnsg.jpg",
        imgName: "铺设地暖水管"
      }, {
        imgPath: "/assets/pc/img/Private/cases/nsjc.jpg",
        imgName: "泥沙进场"
      }],
      column: 1
    })
  })



  $('body').on('click', '.shigonghistory .file-item', function () {

    var imgItem = [],
      domArray = $(this).parent().children(".file-item"), //获取要放大的所有元素
      index = $(this).index();
    domArray.each(function (index, el) {
      var itemInfo = {
        imgPath: "",
        imgName: ""
      };
      itemInfo.imgPath = $(el).children('img').attr("src");
      itemInfo.imgName = $(el).children('.beijingyy').text();
      imgItem.push(itemInfo);
    });

    $(this).erpswiper({
      conWidth: 1100,
      imgItem: imgItem,
      column: 1,
      currentIndex: index, //被点击图片的下表
      swiperTitle: "施工图" //图片上面的标题
    })

  })



})