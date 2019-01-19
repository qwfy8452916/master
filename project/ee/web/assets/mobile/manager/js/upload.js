/*
* @Author: qz_dc
* @Date:   2018-09-05 16:44:28
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-13 15:32:35
*/
$(function(){
    // 施工状态
    document.querySelector('.status').addEventListener('click', function () {
      weui.picker([{
          label: '整体拆改',
          value: 0
      }, {
          label: '水电整改',
          value: 1
      }, {
          label: '墙漆涂刷',
          value: 2
      }, {
          label: '地板铺设',
          value: 3
      }], {
          title:'施工状态',
          className: 'custom-classname',
          onChange: function (result) {
              //console.log(item, index);
              // console.log(result);
          },
          onConfirm: function (result) {
              // console.log(result);
              $("#status").html(result[0].label);
              $("#status").attr('data-values',result[0].value);
              $("#status").css('color','#000');
          },
          id: 'picker'
      });
    });

    // 限制100字
    $('#describe').keyup(function(event) {
        checkLen(this);
    });
    function checkLen(obj) {
        var maxChars = 100;
        if (obj.value.length > maxChars)  obj.value = obj.value.substring(0,maxChars);
        var curr = maxChars - obj.value.length;
        document.getElementById("describe").innerHTML = curr.toString();
    }

    var uploadCustomFileList = [];
    var uploadCount = 0;
    weui.uploader('#uploaderCustom', {
        url: 'http://yxb.qizuang.com/mobile/manager/upload',
        auto: false,
        onBeforeQueued: function(files) {
            // if(["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0){
            //     weui.alert('请上传图片');
            //     return false; // 阻止文件添加
            // }
            // if(this.size > 10 * 1024 * 1024){
            //     weui.alert('请上传不超过10M的图片');
            //     return false;
            // }
            // if (files.length > 3) { // 防止一下子选择过多文件
            //     weui.alert('最多只能上传3张图片，请重新选择');
            //     return false;
            // }
            if (uploadCount + 1 > 3) {
                $('.zuiduo').show();
                return false;
            }

            ++uploadCount;

            // return true; // 阻止默认行为，不插入预览图的框架
        },
        onQueued: function() {
            uploadCustomFileList.push(this);
        }
    });

    // 缩略图预览
    document.querySelector('#uploaderCustomFiles').addEventListener('click', function(e){
        var target = e.target;

        while(!target.classList.contains('weui-uploader__file') && target){
            target = target.parentNode;
        }
        if(!target) return;

        var url = target.getAttribute('style') || '';
        var id = target.getAttribute('data-id');

        if(url){
            url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
        }
        // console.log(url)
        // console.log(id)
        var gallery = weui.gallery(url, {
            onDelete: function(){
                weui.confirm('确定删除该图片？', function(){
                    var index;
                    for (var i = 0, len = uploadCustomFileList.length; i < len; ++i) {
                        var file = uploadCustomFileList[i];
                        if(file.id == id){
                            index = i;
                            break;
                        }
                    }
                    if(index !== undefined) uploadCustomFileList.splice(index, 1);

                    target.remove();
                    gallery.hide();
                    // 删除需要递减
                    uploadCount--;
                    // 删除之后小于3张隐藏提示
                    if(uploadCount <= 3){
                      $('.zuiduo').hide();
                    }
                });
            }
        });
    });
})
