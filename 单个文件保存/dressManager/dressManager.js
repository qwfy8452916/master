function selectFile() {
    document.getElementById('file').click();
}
var targetImg = null;
var imgIndex = null;
function selectPic(ele) {
    document.getElementById("photo").value = '';
    targetImg = ele;
    document.getElementById('photo').click();
}

//nextstep下一步
var Li4 = $(".step").find('li');
var storeList = [
    {
        "store":"总店",
        "secs":[
            {
                "sec":"礼服分区一",
                "cats":["白纱","红纱","黑纱"]
            },
            {
                "sec":"礼服分区二",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区三",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            // {
            // 	"sec":"礼服分区四",
            // 	"cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            // },
            // {
            // 	"sec":"礼服分区五",
            // 	"cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            // },
        ]
    },
    {
        "store":"新菜瓜",
        "secs":[
            // {
            // 	"sec":"礼服分区一",
            // 	"cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            // },
            {
                "sec":"礼服分区二",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区三",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区四",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区五",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
        ]
    },
    {
        "store":"克洛伊",
        "secs":[
            {
                "sec":"礼服分区一",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区二",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            // {
            // 	"sec":"礼服分区三",
            // 	"cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            // },
            {
                "sec":"礼服分区四",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区五",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
        ]
    },
    {
        "store":"爱优妈",
        "secs":[
            {
                "sec":"礼服分区一",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区二",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区三",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区四",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
            {
                "sec":"礼服分区五",
                "cats":["白纱","红纱","黑纱","黄纱","蓝纱","总店分类一"]
            },
        ]
    }
]
function nextStep(index){
    if(!(index == 0 && document.getElementById("file").value != '')){
        for(var i=0;i<index+1;i++){
            Li4.eq(i).find(".order").html(`<img src="/statics/img/imgsDress/sure.png">`).css("background","none");
            Li4.eq(i).css("color","rgb(197, 200, 205)");
            Li4.eq(i).find(".line").css("border-bottom-color","rgb(44,140,240)");
        }
        if(index != 3){
            Li4.eq(index+1).find(".line").css("border-bottom-color","rgb(197, 200, 205)");
            Li4.eq(index+1).css("color","rgb(81,90,110)");
            Li4.eq(index+1).find(".order").css({
                color: "white",
                borderColor: "rgb(44,140,240)",
                background: "rgb(44,140,240)"
            }).html(index+2);
        }
        for(var j=index+2;j<4;j++){
            Li4.eq(j).find(".order").html(j+1);
            Li4.eq(j).find(".order").css({
                borderColor: "rgb(197, 200, 205)",
                background: "none",
                color: "rgb(197, 200, 205)"
            });
            Li4.eq(j).css("color","rgb(197, 200, 205)");
            Li4.eq(j).find(".line").css("border-bottom-color","rgb(197, 200, 205)");
        }
    }
}
// 读取本地excel文件
function readWorkbookFromLocalFile(file, callback) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {type: 'binary'});
        if(callback) callback(workbook);
    };
    reader.readAsBinaryString(file);
}
//清空所有数据
function clearAll(){
    if(confirm("确认清除所有数据吗?")){
        $("#result").find("li").each(function(index,ele){
            ele.innerHTML = "";
        })
        $(".tabChange").find("span").html(0);
    }
}

//保存数据
function saveAll(){
    var arrspan = $(".tabChange").find("span");
    if(confirm("是否保存所有数据？")){
        if(arrspan.eq(0).html()==0 && arrspan.eq(1).html()==0 && arrspan.eq(2).html()==0){
            var arr = [];
            var arrName = ['c','name','img','cat','sec','store','p','dp','rp','mc','rem'];
            $("#result").find("li").eq(3).find("tr").each(function(index,ele){
                if(index != 0){
                    var obj = {};
                    $(ele).find("td").each(function(index1,ele1){
                        if(index1 != $(ele).find("td").length-1){
                            switch (index1) {
                                case 2:
                                    obj[arrName[index1]] = $(ele1).find("img").attr("src");
                                    break;
                                case 3:
                                case 4:
                                case 5:
                                    obj[arrName[index1]] = ele1.children[0].value;
                                    break;

                                default:
                                    obj[arrName[index1]] = ele1.children[0].innerHTML;
                                    break;
                            }
                        }
                    })
                    arr.push(obj);
                }
            })
            nextStep(3);
            $.ajax({
                type:"POST",
                url:"/dress/import/saveData",
                data:arr,
                contentType:'application/x-www-form-urlencoded',
                success:function(res){
                    console.log(arr);
                    console.log(res);
                    if(res.code == 200){
                        console.log(res);
                        alert("数据保存成功");
                    }
                },
                error:function(error){
                    console.log(error);
                }
            })
        }else{
            alert("数据有问题，无法保存！");
        }
    }
}
//图片上传
function uploadImg(){
    var uploadPic = document.getElementById("photo");
    var form = new FormData();
    form.append("file",uploadPic.files[0]);
    $.ajax({
        url:"/dress/import/uploadimg",
        data: form,
        type:"post",
        contentType:false,
        processData:false,
        success:function(res){
            $(targetImg).html(`<img class="uploadimg" src=${res.data.url}>`);
            if(imgIndex == 2){
                hasImage(targetImg.parentNode.parentNode.parentNode,$("#result").find("li"),imgIndex)
            }
        },
        error:function(error){
            console.log(error);
        },
    })
}
//是否修改完成
function ifALLdone(){
    var arrspan = $(".tabChange").find("span");
    if(arrspan.eq(0).html()==0 && arrspan.eq(1).html()==0 && arrspan.eq(2).html()==0){
        nextStep(2);
    }
}
// 读取 excel文件
function outputWorkbook(workbook) {
    var sheetNames = workbook.SheetNames; // 工作表名称集合
    sheetNames.forEach(name => {
        var worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
        for(var key in worksheet) {
            // v是读取单元格的原始值
            console.log(key, key[0] === '!' ? worksheet[key] : worksheet[key].v);
        }
    });
}

//加载数据到页面同时添加事件
function readWorkbook(workbook) {
    var sheetNames = workbook.SheetNames; // 工作表名称集合
    var worksheet = workbook.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
    for(var word in worksheet){
        if(word.charCodeAt(0) > 74){
            delete worksheet[word];
        }
    }
    var csv = XLSX.utils.sheet_to_csv(worksheet);
    csv2table(csv,function(res){
        var csvArr = res;
        var arrLi = $(".tabChange").find("li");
        var results = $("#result").find("li");
        arrLi.on("click",function(){
            var index = arrLi.index(this);
            arrLi.css({
                color: "rgb(81,90,110)",
                borderBottom: "none"
            })
            pageList(index);
            showData(results.eq(index).find("tr"),index);
            results.css("display","none").eq(index).css("display","block");
            this.style.borderBottom = "2px solid rgb(44,140,240)";
            this.style.color = "rgb(44,140,240)";
        })
        //渲染数据
        results.each(function(index,ele){
            ele.innerHTML = csvArr[index];
            numChange(index);
            ele.onclick = function(e){
                imgIndex = index;
                var target = e.target.parentNode.id;
                if(e.target.value == "删除"){
                    if(confirm("确定删除数据吗?")){
                        deleteData(e.target,index,arrLi);
                    }
                }else if(target){
                    changeData(e.target,index);
                }
            }
            $(ele).find("tr").each(function(index1,ele1){
                if($(ele1).attr("contenteditable") === undefined){
                    var olength = $(ele1).find("td").length;
                    $(ele1).find("td").each(function(index2,ele2){
                        if($(ele2).attr("contenteditable") === undefined && index2!=3 && index2!=4&& index2!=5 && index2 != olength-1){
                            var htmlValue = ele2.innerHTML;
                            ele2.innerHTML = "<div class='tddiv' contenteditable='true'>" + htmlValue +"</div>";
                        }
                    })
                    ele1.onclick = function(){
                        $("tr").each(function(){
                            $(this).find("td").removeClass("active");
                        })
                        if(index != 1){
                            $(this).find("td").addClass("active");
                        }else{
                            $(this).find("td:gt(0)").addClass("active");
                        }
                    }
                }
            })
        })
        arrLi.eq(0).click();
        $(".listImg").hover(function(){
            $(this).find(".bgimg").attr('src','/statics/img/imgsDress/upload1.png');
        },function(){
            $(this).find(".bgimg").attr('src','/statics/img/imgsDress/upload.png');
        }).each(function(index,ele){
            ele.onclick = function(){
                selectPic(this);
            }
            $(ele.parentNode).attr("contenteditable","false");
        })
        //删除数据
        function deleteData(ele,index,arrLi) {
            var trele = ele.parentNode.parentNode;
            var count = $(trele).find("td").eq(0).find("div").html();
            if(index != 1){
                trele.remove();
                numChange(index);
                ifALLdone();
            }else{
                arrAgain[count].shift();
                ele.parentNode.parentNode.remove();
                if(arrAgain[count].length == 1){
                    $(`.${count}`).find("td").eq(0).css("backgroundColor","white");
                    enSure($(`.${count}`),results);
                }
            }
            numChange(index);
            pageList(index);
            showData($("#result").find("li").eq(index).find("tr"),index);
        }
    })
}
var listLength = 6; //一页显示多少数据
var indexArr = [0,0,0,0];
//分页
function pageList(index){
    var listEle = $("#result").find("li").eq(index).find("tr");
    var length = Math.ceil((listEle.length-1)/listLength);
    var str = '';
    for(var i=0;i<length;i++){
        str += `<li id=${i}>${i+1}</li>`;
    }
    $(".pagelist").html(str);
    $(".prev")[0].onclick = function(){
        if(indexArr[index] > 0){
            indexArr[index]--;
            showData(listEle,index);
        }
    }
    $(".next")[0].onclick = function(){
        if(indexArr[index] < length-1){
            indexArr[index]++;
            showData(listEle,index);
        }
    }
    $(".pagelist")[0].onclick = function(e){
        if(e.target.tagName == "LI"){
            indexArr[index] = parseInt(e.target.id);
            showData(listEle,index);

        }
    }
}
//分页数据显示
function showData(listEle,index){
    var arrIndex = indexArr[index];
    listEle.each(function(index){
        if(index != 0){
            this.style.display = "none";
        }
    })
    if(listEle.eq(listLength*arrIndex+1).length){
        for(var i=listLength*arrIndex;i<listLength*(arrIndex+1);i++){
            if(listEle.eq(i+1)){
                listEle.eq(i+1).css("display","");
            }
        }
        changeColor(arrIndex);
    }else{
        if(arrIndex != 0){
            for(var i=listLength*(arrIndex-1);i<listLength*arrIndex;i++){
                if(listEle.eq(i+1)){
                    listEle.eq(i+1).css("display","");
                }
            }
            changeColor(arrIndex-1);
            indexArr[index]--;
        }
    }
}
//按钮颜色改变
function changeColor(index){
    $(".pagelist").find("li").removeClass("listActive");
    $(".pagelist").find("li").eq(index).addClass("listActive");
}
//验证函数 
function checkSelect(tds,ele,isfalse,callback){
    var val1 = tds.eq(3).find("select").val();
    var val2 = tds.eq(4).find("select").val();
    var val3 = $(ele).find("select").val();
    tds.eq(3).find("select")[0].style.color = "red";
    tds.eq(4).find("select")[0].style.color = "red";
    tds.eq(5).find("select")[0].style.color = "red";
    for(var item in storeList){
        if(val1 === storeList[item].store){
            tds.eq(3).find("select")[0].style.color = "rgb(81,90,110)";
            for(var item1 in storeList[item].secs){
                if(val2 === storeList[item].secs[item1].sec){
                    tds.eq(4).find("select")[0].style.color = "rgb(81,90,110)";
                    for(var item2 in storeList[item].secs[item1].cats){
                        if(val3 === storeList[item].secs[item1].cats[item2]){
                            tds.eq(5).find("select")[0].style.color = "rgb(81,90,110)";
                        }else{
                            isfalse = 0;
                        }
                    }
                }else{
                    isfalse = 0;
                }
            }
        }else{
            isfalse = 0;
        }
    }
    callback(isfalse)
}
//验证数据
function enSure(ele,params) {
    var isfalse = 1;
    ele.find("td").each(function(index){
        var value = this.children[0] ? this.children[0].innerHTML : '';
        switch (index) {
            case 3:
                this.id = 3;
            break;
            case 4:
                this.id = 4;
            break;
            case 5:
                checkSelect(ele.find("td"),this,isfalse,(res)=>{
                    isfalse = res;
                })
                this.id = 5;
            break;
            case 6:
            case 7:
            case 8:
                if(!isNaN(Number(value)) && value){
                    this.style.color = "rgb(81,90,110)";
                }else{
                    this.style.color = "red";
                    isfalse = 0;
                }
                this.id = 678;
            break;
            case 0:
            case 9:
                var regx = /^[0-9a-zA-Z]+$/;
                if(regx.test(value)){
                    this.style.color = "rgb(81,90,110)";
                }else{
                    this.style.color = "red";
                    isfalse = 0;
                }
                this.id = 9;
            break;
            default:
        }
    })
    if(isfalse){
        hasImage(ele,params);
    }else{
        params.eq(0).find("tbody").append(ele);
        numChange(0);
    }
}
//验证无图数据
function hasImage(ele,params,index){
    var length = $(ele).find("img").length;
    var ospan = $(".tabChange").find("li");
    if(length != 1){
        params.eq(2).find("tbody").append(ele);
        numChange(2);
        numChange(3);
    }else{
        params.eq(3).find("tbody").append(ele);
        numChange(2);
        numChange(3);
        ifALLdone();
    }
    pageList(index);
    showData(params.eq(index).find("tr"),index);
}
//数量变化
function numChange(index){
    var num = $("#result").find("li").eq(index).find("tr").length - 1;
    $(".tabChange").find("span").eq(index).html(num);
}
//级联逻辑
function jlLogic(ele,id){
    var options = ``;
    var eleParent = ele.parentNode.parentNode;
    switch (id) {
        case 3:
            var option2 = ``;
            for(var i in storeList){
                if(ele.value === storeList[i].store){
                    for(var j in storeList[i].secs){
                        options += `<option value="${storeList[i].secs[j].sec}">${storeList[i].secs[j].sec}</option>`;
                        if(j == 0){
                            for(var k in storeList[i].secs[0].cats){
                                option2 += `<option value="${storeList[i].secs[0].cats[k]}">${storeList[i].secs[0].cats[k]}</option>`;
                            }
                        }
                    }
                }
            }
            $(eleParent).find("select").css("color","rgb(81,90,110)");
            $(eleParent).find("#sec").html(options);
            $(eleParent).find("#cats").html(option2);
            break;
        case 4:
            var sel3 = $(eleParent).find("#store").val();
            for(var i in storeList){
                if(sel3 === storeList[i].store){
                    for(var j in storeList[i].secs){
                        if(ele.value === storeList[i].secs[j].sec){
                            for(var k in storeList[i].secs[j].cats){
                                options += `<option value="${storeList[i].secs[j].cats[k]}">${storeList[i].secs[j].cats[k]}</option>`;
                            }
                        }
                    }
                }
            }
            $(eleParent).find("select").eq(1).css("color","rgb(81,90,110)");
            $(eleParent).find("select").eq(2).css("color","rgb(81,90,110)");
            $(eleParent).find("#cats").html(options);
            break;
        case 5:
            $(eleParent).find("select").eq(2).css("color","rgb(81,90,110)");
            break;
        default:
            break;
    }
}
//修改数据
function changeData(target,index){
    target.oninput = function(){
        var thisTd = this.parentNode;
        var id = Number(thisTd.id);
        var onoff = false;
        var value = this.innerHTML;
        var thisTr = this.parentNode.parentNode;
        switch (id) {
            case 3:
                jlLogic(this,3);
            break;
            case 4:
                jlLogic(this,4);
            break;
            case 5:
                jlLogic(this,5);
            break;
            case 678:
                if(!isNaN(Number(value)) && value){
                    thisTd.style.color = "rgb(81,90,110)";
                }else{
                    thisTd.style.color = "red";
                }
            break;
            case 09:
                var regx = /^[0-9a-zA-Z]+$/;
                if(regx.test(value)){
                    thisTd.style.color = "rgb(81,90,110)";
                }else{
                    thisTd.style.color = "red";
                }
            break;
            default:
        }
        for(var item of thisTr.children){
            if(item.children[0].tagName == "SELECT"){
                if(item.children[0].style.color == 'red'){
                    onoff = true;
                }
            }else if(item.style.color == "red"){
                onoff = true;
            }
        }
        if(!onoff){
            if(index == 0){
                hasImage(thisTr,$("#result").find("li"),0);
                numChange(0);
            }
        }
    }
}
//数据验证重复
function ifChong(IDS,newRow,callback){
    $.ajax({
        type:"POST",
        url:"/dress/import/check_dress_sn",
        data:IDS,
        success:function(res){
            var newRows = [];
            console.log(res);
            if(res.data){
                for(var i=0;i<newRow.length;i++){
                    newRows.push(newRow[i]);
                    if(res.indexOf(newRow[i][0]) != -1){
                        var arr = [].concat(newRow[i]);
                        newRows.push(arr);
                    }
                }
            }else{
                newRows = newRow;
            }
            callback(newRows);
            return newRows;
        },
        error:function(res){
            console.log(res)
        }
    })
}

function findData(data,num){
    var arr = [];
    if(num){
        for(var i in storeList){
            if(storeList[i].store === data[0]){
                for(var j in storeList[i].secs){
                    if(storeList[i].secs[j].sec === data[1]){
                        for(var k in storeList[i].secs[j].cats){
                            arr.push(storeList[i].secs[j].cats[k]);
                        }
                    }
                }
            }
        }
        return arr;
    }else{
        for(var i in storeList){
            if(storeList[i].store === data){
                for(var j in storeList[i].secs){
                    arr.push(storeList[i].secs[j].sec);
                }
            }
        }
        return arr;
    }
}
//初始数据校验
function initCheck(obj,callback){
    var options = ``;
    // if(obj.column === "") obj.column = "请选择";
    if(obj.reg.indexOf(obj.column) != -1){
        for(var item in obj.reg){
            if(obj.column === obj.reg[item]){
                options += `<option selected="selected" value="${obj.reg[item]}">${obj.reg[item]}</option>`;
            }else{
                options += `<option value="${obj.reg[item]}">${obj.reg[item]}</option>`;
            }
        }
        obj.str += '<td id="'+ obj.id +'"><select id="'+ obj.type +'">'+options+'</selece></td>';
    }else{
        options = `<option value="${obj.column}" disabled="disabled" selected="selected">${obj.column}</option>`;
        for(var item in obj.reg){
            options += `<option value="${obj.reg[item]}">${obj.reg[item]}</option>`;
        }
        if(obj.isAgain){
            obj.str += '<td id="'+ obj.id +'"><select id="'+ obj.type +'">'+options+'</selece></td>';
        }else{
            obj.str += '<td id="'+ obj.id +'"><select style="color:red;" id="'+ obj.type +'">'+options+'</selece></td>';
        }
        if(obj.ifTrue !== 'undefined') obj.ifTrue = !obj.ifTrue;
        if(obj.isFalse !== 'undefined') obj.isFalse = 0;
    }
    callback({
        str: obj.str,
        ifTrue: obj.ifTrue,
        isFalse: obj.isFalse
    })
}
// //csv转化表格
var arrAgain = {};
var rego = [["总店","新菜瓜","克洛伊",'爱优妈']];
function csv2table(csv,callback)
{
    var html = html1 = html2 = html3 = '<table class="tableData">';
    var headStr = '<tr contenteditable="false">';
    var str1 = str2 = str3 = '';
    var rows = csv.split('\n');
    var newRow = [];
    var IDS = [];
    arrAgain = {};
    rows.pop(); // 最后一行没用的
    rows.forEach(function(row,idx){
        var columns = row.split(',').slice(0,10);
        if(columns.join('') != ""){
            newRow.push(columns);
            if(idx != 0){
                if(IDS.indexOf(columns[0]) == "-1"){
                    IDS.push(columns[0]);
                }
            }
        }
    })
    ifChong(IDS,newRow,function(newRows){
        newRows.forEach(function(row,idx){
            if(idx != 0){
                if(arrAgain[row[0]]){
                    arrAgain[row[0]].push(idx);
                }else{
                    arrAgain[row[0]] = [idx];
                }
            }
        })
        newRows.forEach(function(columns, idx){
            var olength = columns.length+1;
            var imgStr = `<div class='listImg'>
                <img class="bgimg" src='/statics/img/imgsDress/upload.png'/><img class='camera' src='/statics/img/imgsDress/camera.png'/></div>`;
            var str = '<tr class="'+ columns[0] +'">';
            if(idx == 0){
                columns.splice(2,0,"服装图片"); // 添加行索引
                columns.splice(olength,0,"操作"); // 添加行索引
                columns.forEach(function(column,index){
                    headStr += '<td>'+column+'</td>';
                })
                headStr += '</tr>';
            }else{
                var isFalse = 1;
                var ifTrue = true;
                var iftrueII = true;
                columns.splice(2,0,imgStr); // 添加行索引
                columns.splice(olength,0,"<input type='button' class='delete' value='删除'>"); // 添加行索引
                if(arrAgain[columns[0]].length == 1){
                    columns.forEach(function(column,index) {
                        switch (index) {
                            case 3:
                                initCheck({
                                    reg: rego[0],
                                    column: column,
                                    str: str,
                                    id: 3,
                                    type: "store",
                                    ifTrue: ifTrue,
                                    isFalse: isFalse
                                },(obj)=>{
                                    str = obj.str;
                                    ifTrue = obj.ifTrue;
                                    isFalse = obj.isFalse;
                                })
                            break;
                            case 4:
                                if(ifTrue){
                                    initCheck({
                                        reg: findData(columns[3],0),
                                        column: column,
                                        str: str,
                                        id: 4,
                                        type: "sec",
                                        ifTrue: iftrueII,
                                        isFalse: isFalse
                                    },(obj)=>{
                                        str = obj.str;
                                        ifTrue = obj.ifTrue;
                                        isFalse = obj.isFalse;
                                    })
                                }else{
                                    str += '<td id="4"><select style="color:red;" id="sec">'+`<option value="${column}">${column}</option>`+'</selece></td>';
                                }
                            break;
                            case 5:
                                if(ifTrue && iftrueII){
                                    initCheck({
                                        reg: findData([columns[3],columns[4]],1),
                                        column: column,
                                        str: str,
                                        id: 5,
                                        type: "cats",
                                        isFalse: isFalse
                                    },(obj)=>{
                                        str = obj.str;
                                        isFalse = obj.isFalse;
                                    })
                                }else{
                                    str += '<td id="5"><select style="color:red;" id="cats">'+`<option value="${column}">${column}</option>`+'</selece></td>';
                                }
                            break;
                            case 6:
                            case 7:
                            case 8:
                                if(!isNaN(Number(column)) && column){
                                    str += '<td id="678">'+column+'</td>';
                                }else{
                                    str += '<td id="678" style="color:red;">'+column+'</td>';
                                    isFalse = 0;
                                }
                            break;
                            case 0:
                            case 9:
                                var regx = /^[0-9a-zA-Z]+$/;
                                if(regx.test(column)){
                                    str += '<td id="09">'+column+'</td>';
                                }else{
                                    str += '<td id="09" style="color:red;">'+column+'</td>';
                                    isFalse = 0;
                                }
                            break;
                            default:
                            str += '<td>'+column+'</td>';
                        }
                    });
                    if(isFalse){
                        str1 += str + '</tr>';
                    }else{
                        str2 += str + '</tr>';
                    }
                }
            }
        });
        for(var i in arrAgain){
            if(arrAgain[i].length>1){
                str3 += strTotable(arrAgain[i],newRows);
            }
        }
        html += headStr + str1 + '</table>';
        html1 += headStr + str2 + '</table>';
        html2 += headStr + str3 + '</table>';
        html3 += headStr + '</table>';
        var htmlArr = [html1,html2,html,html3];
        callback(htmlArr);
    });
}

//生成表格重复元素
function strTotable(item,rows){
    var randomC = randomColor();
    var str3 = '';
    for(var j in item){
        var columns = rows[item[j]];
        str3 += '<tr class="'+ columns[0] +'">';
        columns.forEach(function(column,index) {
            switch (index) {
                case 0:
                    str3 += '<td style="background-color:' + randomC + '">'+column+'</td>';
                    break;
                case 3:
                    initCheck({
                        reg: rego[0],
                        column: column,
                        str: str3,
                        isAgain: true
                    },(obj)=>{
                        str3 = obj.str;
                    })
                    
                    break;
                case 4:
                    initCheck({
                        reg: findData(columns[3],0),
                        column: column,
                        str: str3,
                        isAgain: true
                    },(obj)=>{
                        str3 = obj.str;
                    })
                    break;
                case 5:
                    initCheck({
                        reg: findData([columns[3],columns[4]],1),
                        column: column,
                        str: str3,
                        isAgain: true
                    },(obj)=>{
                        str3 = obj.str;
                    })
                    break;
            
                default:
                    str3 += '<td>'+column+'</td>';
                    break;
            }
        })
        str3 += '</tr>';
    }
    return str3;
}

//随机颜色
function randomColor(){
    var str = '';
    for(var i=0;i<3;i++){
        str += Math.round(Math.random()*155 + 100).toString(16);
    }
    return '#' + str;
}
//导入数据
$(function() {
    document.getElementById('file').onchange = function(e) {
        if(this.value != ""){
            if(confirm("确定导入数据吗？")){
                var files = e.target.files;
                if(files.length == 0) return;
                var f = files[0];
                if(!/\.xlsx$/g.test(f.name)) {
                    alert('仅支持读取xlsx格式！');
                    return;
                }
                $("#loading").css("display","block");
                setTimeout(() => {
                    $("#loading").css("display","none");
                    nextStep(1);
                    readWorkbookFromLocalFile(f, function(workbook) {
                        readWorkbook(workbook);
                    });
                }, 3000);
            }
            this.value = '';
        }
    };
    $.ajax({
        url: '/dress/import/get_shop_data',
        type: 'GET',
        dataType:"json",
        success:function(res){
            console.log(res);
            storeList = res;
        },
        error:function(err){
            console.log(err)
        }
    });
    $("#result").find("li").eq(0).html(`
    <table><tr><td>订单号</td><td>客人姓名</td><td>联系方式</td>
        <td>金额</td><td>押金</td><td>订单类型</td><td>所属分店</td>
        <td>销售人</td><td>开单员工</td><td>操作</td></tr></table>
    `)
    $("#result").find(".libox").scroll(function(e){
        var left = e.target.scrollLeft;
        var length = $("tr").eq(0).find("td").length;
        $("tr").each(function(){
            $(this).find("td").eq(0).css("left",left);
            $(this).find("td").eq(1).css("left",left+110);
            $(this).find("td").eq(length-1).css("right",-left);
        })
    })
});