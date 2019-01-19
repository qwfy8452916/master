/*
* @Author: qz_dc
* @Date:   2018-09-10 10:16:29
* @Last Modified by:   qz_dc
* @Last Modified time: 2018-09-10 10:18:20
*/
$(function(){
    var uploadCustomFileList = [];
    weui.uploader('#uploaderCustom', {
        url: 'http://yxb.qizuang.com/mobile/manager/upload',
        auto: false,
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
        console.log(url)
        console.log(id)
        var gallery = weui.gallery(url, {
            onDelete: function(){
                console.log(111)
                console.log(weui);
                console.log(this);

                weui.confirm('确定删除该图片？', function(){
                    console.log(222);
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
                });
            }
        });
    });
})
