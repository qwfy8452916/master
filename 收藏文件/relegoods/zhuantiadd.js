$(function () {


    //标签复选框初始化
    $(".tags").select2({
        language: "zh-CN",
        tags: false,
        multiple: true, //是否使用多个标签
        ajax: {
            url: global_searchTag_Url,
            dataType: 'json',
            type: 'GET',
            delay: 1000,
            data: function (params) {
                return {
                    search: params.term, //查询参数
                };
            },
            processResults: function (data, page) {

                var items = $.map(data.data,function(value){
                    var item ={};
                    item.id = value.id;
                    item.name = value.name;
                    return item;
                });
                return {
                    results: items
                };
            },
            cache: true
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        /*最小需要输入多少个字符才进行查询，与之相关的小需要输入多少个字符才进行查询，与之相关的maximumSelectionLength表示最大输入限制*/
        minimumInputLength: 1,
        templateResult: function (repo) {
            if (repo.loading) {
                return repo.text;
            }
            return markup = '<option value="'+repo.id+'">'+repo.name+'</option>';
        },
        templateSelection: function (repo) {
            return repo.name || repo.text;
        }
    });

    //新增标签弹窗操作以及数据保存操作
    $('.addbq').click(function () {
        $('.addlabel').fadeIn();
    });
    $('.addlabel .fa-close,.footwaik .guabi').click(function () {
        $(".addlabel").hide();
    });
    $('.footwaik .baocun').click(function () {
        var nameval=$('.addlabel .biaoqwaik input[name=name]').val();
        var typeval=$('.addlabel .biaoqwaik input[type=radio]:checked').val();

        subMit(Global_AddTag_url,{name:nameval,type:typeval},function () {
            $(".addlabel").hide();
        });
    });

    //图片上传
    $("#images").fileinput({
        language: 'zh', //设置语言,
        uploadUrl: Global_upload_toQiniu,
        browseClass: "btn btn-primary",
        allowedFileExtensions: ['jpg', 'png', 'gif'],
        uploadClass: "btn btn-info",
        removeClass: "btn btn-danger",
        uploadAsync: true,
        dropZoneEnabled: false,
        overwriteInitial: true,
        maxFileCount: 1,
        uploadExtraData: {
            prefix: 'meitubanner',
            chars: 'true'
        },
        minImageWidth: 750, //图片的最小宽度
        minImageHeight: 420,//图片的最小高度
        maxImageWidth: 750,//图片的最大宽度
        maxImageHeight: 420,//图片的最大高度
        maxFileSize: 1000000000,
        previewSettings: {
            image: {width: "323px", height: "164px"}
        },
        initialPreview:mydefault_img
    }).on('fileuploaded', function (event, data, id, index) {
        if (parseInt(data.response.status) === 1) {
            $('#headimg').val(data.response.data);
        } else {
            layer.msg(data.response.info, {time: 1300});
            return false;
        }
    }).on("fileuploaderror", function (event, data) {
        //layer.msg('服务器去了彗星~');
        return false;
    }).on("fileclear", function () {
        $("#headimg").val("");
        $(".img-upload .fileinput-upload-button").removeClass('disabled');
    });

    //编辑器初始化
    var ue = UE.getEditor('editor', {
        autoClearinitialContent: false,
        serverUrl: Global_uedit_upUrl,
        toolbars: [
            ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'paragraph', 'fontfamily', 'fontsize', '|',
                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|', 'simpleupload', 'insertimage', 'link', 'unlink'
            ]
        ],
        maximumWords: 10000
    });

    //编辑器赋值
    if (global_subject_content != ''){
        ue.ready(function() {ue.setContent(global_subject_content);});
    }

    //选取相关商品标签弹窗关闭和弹出
    $('#box').click(function (event) {
        $(".zzc").fadeIn();
        $(".win-title").text('选取相关商品');
        $("#selectBox", parent.document.body).attr("src", Global_document_url)
    });
    $('#cancel').click(function () {
        var model = $('#module').val();
        $(".zzc").fadeOut();
    });

    //选取相关商品保存选择
    $('body').on('click', '#saveBtn', function () {
        var storage = window.sessionStorage;
        var arr = [];
        for (var i = 0, len = storage.length; i < len; i++) {
            var key = storage.key(i);
            if (key !=='spec'&&key!=='spec_val'&&key!=='sub_cate'&&key!=='top_cate'){
                arr.push(key);
            }
        }
        $('.sessionval').val(arr.join());
        $(".zzc").fadeOut();
        getselectList(url,arr.join());
    });

    //启用状态按钮初始化
    $('input[class="mycheck"]').bootstrapSwitch({'size':'mini'});

    //整体数据提交
    $('.save').click(function () {
        var data = {};
        $.each($('#form').serializeArray(), function(key, val){
            data[val.name] = $.trim(val.value);
        });
        if($("#tags").val()) {
            data.tags = $("#tags").val().join(",");
        }else{
            data.tags = "";
        }
        if (data.status == 'on'){
            data.status =1;
        }else{
            data.status =2;
        }
        $('.save').attr('disabled', 'disabled');
        subMit(global_save_url,data,function () {
            window.location.href = local_url;
        });
    });

    //取消并返回列表
    $('.cancel').click(function () {
        layer.confirm('确定取消更改？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            window.location.href = local_url;
        }, function () {
            layer.closeAll();
        });
    });
});
//设置初始化默认值
function setDefaultItem(value)
{
    if (value != '') {
        var sessionstr2 = sessionStorage.getItem("subjectCodeList") ? JSON.parse(sessionStorage.getItem("subjectCodeList")).join("|") : [];
        idsArray = value.split(',');
        console.log(typeof idsArray)
        // for (var i = 0, len = idsArray.length; i < len; i++) {

        //     // console.log(idsArray[i])
        //     // sessionStorage.setItem(idsArray[i], true)
        // }
        sessionStorage.setItem("subjectCodeList",JSON.stringify(idsArray));
    }
}

//获取相关商品列表
function getselectList(url,ids)
{
    $.ajax({
        url:url ,
        dataType: 'json',
        type: 'get',
        data: {ids: ids},
        success:function (data) {
            var strini = "";
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].goods_imgs == "") {
                    strini += '<li data-id="'+data.data[i].code+'"><img src="/assets/admin/subject/img/picbj.jpg"><div class="tuwenms">' + data.data[i].title + '</div></li>'
                } else {
                    strini += '<li data-id="'+data.data[i].code+'"><img src="' + data.data[i].goods_imgs[0].img_url + '"><div class="tuwenms">' + data.data[i].title + '</div></li>'
                }
            }
            $('.picarray .detailpic').html(strini);
            var licount = $('.picarray .detailpic li').length;
            var liwidth = $('.picarray .detailpic li').outerWidth(true) + 1;
            var ulwidth = licount * liwidth;
            $('.picarray .detailpic').width(ulwidth);
        },
        error:function () {
            layer.msg('服务器去了火星~~',{time: 1300});
        }
    });
}