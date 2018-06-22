$(function(){


var input = document.getElementById("file");
             //检测浏览器是否支持FileReader
             if (typeof (FileReader) === 'undefined') {
                 result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
                 input.setAttribute('disabled', 'disabled');
             } else {
             //开启监听
                 input.addEventListener('change', readFile, false);
             }
            function readFile() {
                var file = this.files[0];

                 //限定上传文件的类型，判断是否是图片类型
                 if (!/image\/\w+/.test(file.type)) {
                     alert("只能选择图片");
                     return false;
                }
                 var reader = new FileReader();
                 reader.readAsDataURL(file);
                 reader.onload = function (e) {
                   base64Code=this.result;
                    var formdata = new FormData();
                      formdata.append('file',base64ToBlob(base64Code));
                    //   $.ajax({
                    //     url: "",
                    //     type: "post",
                    //     data: formdata,
                    //     processData: false,
                    //     contentType: false,
                    //     success: function (data) {
                             
                    //     }
                    // });

                    // $('.suregh .genghuan').click(function(event) {
                    //      $('.wrappic').hide();
                    // });

                 }
              }


               function base64ToBlob(urlData) {

                    var arr = urlData.split(',');
                    var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
                    // 去掉url的头，并转化为byte
                    var bytes = window.atob(arr[1]);
                    // 处理异常,将ascii码小于0的转换为大于0
                    var ab = new ArrayBuffer(bytes.length);
                    // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
                    var ia = new Uint8Array(ab);
                    
                    for (var i = 0; i < bytes.length; i++) {
                        ia[i] = bytes.charCodeAt(i);
                    }

                    return new Blob([ab], {
                        type: mime
                    });
   
           }

    
})