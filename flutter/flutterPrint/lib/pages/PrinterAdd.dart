import 'package:flutter/material.dart';
import 'package:date_format/date_format.dart';
import 'package:flutter/services.dart';
import 'dart:ui';
import '../common/Api.dart';
import '../common/Constants.dart';
import '../utils/ColorUtil.dart';
import '../utils/DatePickerUtil.dart';
import '../utils/DialogUtil.dart';

import '../src/entity/Printer.dart';
import '../src/entity/PrinterFunc.dart';
import '../src/entity/PrinterFuncProduct.dart';
import '../src/entity/Template.dart';
import '../src/service/PrinterServce.dart';
import '../src/service/TemplateService.dart';


class PrinterAdd extends StatefulWidget {
  final Map arguments;
  PrinterAdd({Key key, this.arguments}) : super(key: key);

  _PrinterAddState createState() => _PrinterAddState(arguments: arguments);

}

class _PrinterAddState extends State<PrinterAdd> {

  Map arguments;
  _PrinterAddState({this.arguments});


  var _nameController = new TextEditingController();
  FocusNode _nameFocus = FocusNode();
  var _ipController = new TextEditingController();
  FocusNode _ipFocus = FocusNode();
  var _portController = new TextEditingController();
  FocusNode _portFocus = FocusNode();

  Printer _printer;
  PrinterService _printerService = new PrinterService();

  @override
  void initState() {
    super.initState();

    if(null  != arguments){
      _printer   = arguments["printer"];
      _nameController.text = _printer.name;
      _ipController.text = _printer.ip;
      _portController.text = _printer.port.toString();

      if(_printer.pfuncs != null  &&  _printer.pfuncs.length>0  ){
        _printer.pfuncs.forEach((pf) {
          if(pf.pfProds != null  && pf.pfProds.length>0 ){
            if( pf.pfProds.length>3 ){
              pf.subPfProds = pf.pfProds.sublist(0,3);
              pf.isShowAll =false;
            }else{
              pf.subPfProds = pf.pfProds;
              pf.isShowAll =true;
            }
          }
        });
      }
    }

    if(null  == _printer ){
      _printer  = new Printer();
      //设置打印机页面无法设置字段
      _printer.hotelId =Api.user.hotelId;
      _printer.isWork =1;
      _printer.workStartTime ="00:00";
      _printer.workEndTime ="23:59";
      _printer.extendTime = 0;
      _printer.pfuncs = new List();
    }
  }

  @override
  Widget build(BuildContext context) {
    return   WillPopScope(
      onWillPop: () {
        Navigator.pushReplacementNamed(context, "/PrinterList");
        return Future.value(true);
      },
      child:Scaffold(
        appBar: AppBar(
          leading:IconButton(icon: Icon(Icons.arrow_back,color: Colors.white,), onPressed:() {
            Navigator.pushReplacementNamed(context, "/PrinterList");
          }),
          title: null  != arguments? Text("打印机修改"): Text("打印机添加"),
          centerTitle: true,
        ),
        body:Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: <Widget>[
            Expanded(
              child: SingleChildScrollView(
                child: Container(
                  color: Colors.white,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      ///打印设置
                      Container(
                        height: 60,
                        padding: EdgeInsets.only(left: 15),
                        child: Row(
                          children: <Widget>[
                            SizedBox(
                              width: 3,
                              child: Container(
                                height: 18,
                                decoration: BoxDecoration(
                                    color: ColorUtil.hexColor("#5C68C6"),
                                    borderRadius: BorderRadius.all(
                                        Radius.circular(1.5))
                                ),
                              ),
                            ),
                            SizedBox(width: 10),
                            Text(
                              '打印设置',
                              textAlign: TextAlign.left,
                              style: TextStyle(
                                  color: ColorUtil.hexColor("#1D38C4"),
                                  fontFamily: "PingFangSC-Regular",
                                  fontSize: 18),
                            )
                          ],
                        ),
                      ),
                      Divider(height: 0),
                      ///打印机名
                      ListTile(
                        leading: _myTitle("打印机名称"),
                        title:  TextField(
//                        inputFormatters: [LengthLimitingTextInputFormatter(10)],
                          focusNode: _nameFocus,
                          controller: _nameController,
                          decoration: InputDecoration(
                            contentPadding: EdgeInsets.all(5),
                            hintText: "填写打印机名称",
                            border:OutlineInputBorder(borderSide: BorderSide.none),
                            suffixIcon: ( null != _printer.name && _printer.name.isNotEmpty )?IconButton(
                              icon: Icon(
                                Icons.cancel,
                                color: ColorUtil.hexColor("#C4C9D0"),
                              ),
                              onPressed: (){
                                setState(() {
                                  _nameController.text = "";
                                  _printer.name ="";
                                });
                              },
                            ) :null,
                          ),
                          onChanged: (value) {
                            if(value.length > 20){
                              _nameController.text = value.substring(0,20);
                              _printer.name =value.substring(0,20);
                            }else{
                              _printer.name =value;
                            }
                            setState(() {});
                          },
                        ),
                      ),
                      Divider(height: 0),
                      ///连接方式
                      ListTile(
                        leading: _myTitle("连接方式"),
                        title: Text( _printer.connectWay == null ? "请选择连接方式" :(_printer.connectWay == 1 ?"WIFI":"蓝牙") ,
                          textAlign: TextAlign.center,
                          style: TextStyle(color: _printer.connectWay == null ? ColorUtil.hexColor("#C5C9CF"):ColorUtil.hexColor("#2B2D30"),fontSize: 15),
                        ),
                        trailing: IconButton(
                            icon:Icon(Icons.keyboard_arrow_right),
                            iconSize: 29,
                            color: Color.fromRGBO(92, 104, 198, 0.3),
                            onPressed: (){
                              _connectWaySelection(context);
                            }
                        ),
                        onTap: (){
                          _connectWaySelection(context);
                        },
                      ),
                      _printer.connectWay == 1? Divider(height: 0):Container(),
                      ///IP
                      Offstage(
                        offstage: _printer.connectWay != 1,
                        child: Container(
                          color: Color.fromRGBO(92, 104, 198, 0.1),
                          child: ListTile(
                            leading:  _myTitle("IP地址"),
                            title:  TextField(
//                            inputFormatters:  [WhitelistingTextInputFormatter(RegExp("((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))"))],
                              keyboardType: TextInputType.number,
                              focusNode: _ipFocus,
                              controller: _ipController,
                              decoration: InputDecoration(
                                contentPadding: EdgeInsets.all(5),
                                hintText: "例 : 192.168.1.1",
                                border:OutlineInputBorder(borderSide: BorderSide.none),
                                suffixIcon: ( null != _printer.ip && _printer.ip.isNotEmpty )?IconButton(
                                  icon: Icon(
                                    Icons.cancel,
                                    color: ColorUtil.hexColor("#C4C9D0"),
                                  ),
                                  onPressed: (){
                                    setState(() {
                                      _ipController.text = "";
                                      _printer.ip ="";
                                    });
                                  },
                                ) :null,
                              ),
                              onChanged: (value) {
                                setState(() {
                                  _printer.ip = value.trim();
                                });
                              },
                            ),
                          ),
                        ),
                      ),
                      _printer.connectWay == 1? Divider(height: 0):Container(),
                      ///port
                      Offstage(
                        offstage: _printer.connectWay != 1,
                        child: Container(
                          color: Color.fromRGBO(92, 104, 198, 0.1),
                          child: ListTile(
                            leading:_myTitle("端口号"),
                            title:  TextField(
                              keyboardType: TextInputType.number,
                              focusNode: _portFocus,
                              controller: _portController,
                              decoration: InputDecoration(
                                contentPadding: EdgeInsets.all(5),
                                hintText: "例 : 8080",
                                border:OutlineInputBorder(borderSide: BorderSide.none),
                                suffixIcon: ( null != _printer.port && _printer.port.toString().isNotEmpty )?IconButton(
                                  icon: Icon(
                                    Icons.cancel,
                                    color: ColorUtil.hexColor("#C4C9D0"),
                                  ),
                                  onPressed: (){
                                    setState(() {
                                      _portController.text = "";
                                      _printer.port =null;
                                    });
                                  },
                                ) :null,
                              ),
                              onChanged: (value) {
                                try{
                                  _printer.port = int.parse(value);
                                }catch(e){
                                  _portController.text = "";
                                  _printer.port =null;
                                  DialogUtil.toast("请输入数字");
                                }
                                setState(() {});
                              },
                            ),
                          ),
                        ),
                      ),
                      Divider(height: 0),
                      ///纸宽
                      ListTile(
                        leading:_myTitle("纸宽"),
                        title: Text( _printer.paperSize == null ? "请选择打印纸宽度" : _printer.paperSize.toString(),
                          textAlign: TextAlign.center,
                          style: TextStyle(color: _printer.paperSize == null ? ColorUtil.hexColor("#C5C9CF"):ColorUtil.hexColor("#2B2D30"),fontSize: 15),
                        ),
                        trailing: IconButton(
                            icon:Icon(Icons.keyboard_arrow_right),
                            iconSize: 29,
                            color: Color.fromRGBO(92, 104, 198, 0.3),
                            onPressed: (){
                              _paperSizeSelection(context);
                            }
                        ),
                        onTap: (){
                          _paperSizeSelection(context);
                        },
                      ),
                      _printer.paperSize != null? Divider(height: 0):Container(),
                      ///模板
                      Offstage(
                        offstage: _printer.paperSize == null,
                        child:  Container(
                            color: Color.fromRGBO(92, 104, 198, 0.1),
                            child: ListTile(
                              leading: _myTitle("打印模板"),
                              title: Text( _printer.templateId == null ? "请选择打印纸宽度" : _printer.tmpName,
                                textAlign: TextAlign.center,
                                style: TextStyle(color: _printer.templateId == null ? ColorUtil.hexColor("#C5C9CF"):ColorUtil.hexColor("#2B2D30"),fontSize: 15),
                              ),
                              trailing: IconButton(
                                  icon:Icon(Icons.keyboard_arrow_right),
                                  iconSize: 29,
                                  color: Color.fromRGBO(92, 104, 198, 0.3),
                                  onPressed: (){
                                    _templateSelection(context);
                                  }
                              ),
                              onTap: (){
                                _templateSelection(context);
                              },
                            )
                        ),
                      ),
                      Divider(height: 0),
                      ///设置工作时间
                      ListTile(
                        leading: _myTitle("指定打印时间"),
                        trailing: Switch(
                            activeColor: ColorUtil.hexColor("#5C68C6"),
                            value: _printer.isSetWorkTime == 1,
                            onChanged: (v) {
                              _printer.isSetWorkTime = v?1:0;
                              setState(() {});
                            }),
                      ),
                      _printer.isSetWorkTime == 1? Divider(height: 0):Container(),
                      ///时间
                      Offstage(
                        offstage: _printer.isSetWorkTime != 1,  // 不设置时间的时候隐藏
                        child:  Container(
                            color: Color.fromRGBO(92, 104, 198, 0.1),
                            child: ListTile(
                                leading: _myTitle("时间范围"),
                                title: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: <Widget>[
                                    InkWell(
                                      child: Text(_printer.workStartTime != null ?_printer.workStartTime :"00:00" ),
                                      onTap: () {
                                        _showTimePicker(context, 0);
                                      },
                                    ),
                                    SizedBox(
                                      width: 10,
                                    ),
                                    Text("-",
                                        style: TextStyle(
                                            color: ColorUtil.hexColor("#868FA3"),
                                            fontSize: 18)),
                                    SizedBox(
                                      width: 10,
                                    ),
                                    InkWell(
                                      child: Text(_printer.workEndTime != null ?_printer.workEndTime :"23:59"),
                                      onTap: () {
                                        _showTimePicker(context, 1);
                                      },
                                    ),
                                  ],
                                )
                            )
                        ),
                      ),
                      Divider(height: 0),
                      ///分商品打印
                      ListTile(
                        leading: _myTitle("分商品打印"),
                        title:IconButton(
                            alignment:Alignment.centerLeft,
                            color: Color.fromRGBO(43, 45, 48, 0.5),
                            icon: Icon(Icons.info),
                            onPressed: (){
                              DialogUtil.toast(Constants.PRINT_BY_PROD);
                            }),
                        trailing: Switch(
                            activeColor: ColorUtil.hexColor("#5C68C6"),
                            value: _printer.isPrintedByProd == 1,
                            onChanged: (v) {
                              _printer.isPrintedByProd = v?1:0;
                              setState(() {});
                            }),
                      ),
                      _printer.isPrintedByProd == 1? Divider(height: 0):Container(),
                      ///打印总单
                      Offstage(
                        offstage: _printer.isPrintedByProd != 1,  // 不设置时间的时候隐藏
                        child:  Container(
                            color: Color.fromRGBO(92, 104, 198, 0.1),
                            child: ListTile(
                              leading: _myTitle("打印总单"),
                              trailing: Switch(
                                  activeColor: ColorUtil.hexColor("#5C68C6"),
                                  value: _printer.isPrintAll == 1,
                                  onChanged: (v) {
                                    _printer.isPrintAll = v?1:0;
                                    setState(() {});
                                  }),
                            )
                        ),
                      ),
                      Divider(height: 0),
                      ///下单延长打印
                      ListTile(
                        leading: _myTitle("下单延长打印"),
                        trailing: Switch(
                            activeColor: ColorUtil.hexColor("#5C68C6"),
                            value: _printer.isExtendPrint== 1,
                            onChanged: (v) {
                              _printer.isExtendPrint = v?1:0;

                              if(_printer.isExtendPrint == 0){
                                _printer.extendTime = 0;
                              }
                              setState(() {});
                            }),
                      ),
                      _printer.isExtendPrint == 1? Divider(height: 0):Container(),
                      ///延长时间
                      Offstage(
                        offstage: _printer.isExtendPrint != 1,
                        child: Container(
                          color: Color.fromRGBO(92, 104, 198, 0.1),
                          child: ListTile(
                            leading: _myTitle("延长时间"),
                            title: Row(
                              children: <Widget>[

                                IconButton(
                                    alignment:Alignment.centerLeft,
                                    color: Color.fromRGBO(43, 45, 48, 0.5),
                                    icon: Icon(Icons.info),
                                    onPressed: (){
                                      DialogUtil.toast(Constants.EXTEND_PRINT);
                                    }),

                                Text( _printer.extendTime.toString()+"s",
                                  style: TextStyle(color: _printer.extendTime == null ? ColorUtil.hexColor("#C5C9CF"):ColorUtil.hexColor("#2B2D30"),fontSize: 15),
                                ),

                              ],),
                            trailing: IconButton(
                                icon:Icon(Icons.keyboard_arrow_right),
                                iconSize: 29,
                                color: Color.fromRGBO(92, 104, 198, 0.3),
                                onPressed: (){
                                  _extendTimeSelection(context);
                                }
                            ),
                            onTap: (){
                              _extendTimeSelection(context);
                            },
                          ),
                        ),
                      ),
                      Divider(height: 0),
                      Container(height: 10,width: MediaQuery.of(context).size.width,color:Color.fromRGBO(135, 143, 163,0.1),),
                      ///打印范围
                      Container(
                        height: 60,
                        padding: EdgeInsets.only(left: 15,right: 15),
                        child: Row(
                          children: <Widget>[
                            Expanded(
                              flex: 3,
                              child: Row(
                                children: <Widget>[
                                  SizedBox(
                                    width: 3,
                                    child: Container(
                                      height: 18,
                                      decoration: BoxDecoration(color: ColorUtil.hexColor("#5C68C6"),borderRadius: BorderRadius.all(Radius.circular(1.5))
                                      ),
                                    ),
                                  ),
                                  SizedBox(width: 10),
                                  Text(
                                    '选择打印范围',
                                    textAlign: TextAlign.left,
                                    style: TextStyle( color: ColorUtil.hexColor("#5C68C6"),fontFamily: "PingFangSC-Regular",fontSize: 18),
                                  ),
                                  Text(
                                    '*',
                                    textAlign: TextAlign.left,
                                    style: TextStyle(color: ColorUtil.hexColor("#FF8383"),fontFamily: "PingFangSC-Regular",fontSize: 16),
                                  ),
                                ],
                              ),
                            ),
                            RaisedButton.icon(
                              icon: Icon(Icons.add),
                              label: Text("添加"),
                              color: Colors.white,
                              elevation: 0,
                              splashColor: Colors.white,
                              highlightColor:Colors.white,
                              textColor:ColorUtil.hexColor("#5C68C6"),
                              onPressed: (){
                                Navigator.pushNamed(context, "/PrinterRangeAdd").then((value) => _setRanges(value));
                              }, ),
                          ],
                        ),
                      ),
                      Divider(height: 0),
                      ///详细范围
                      Container(
                        child: Column(
                            children: _getRangeWidgetList()
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            Container(
              margin: EdgeInsets.all(15),
              height: 45.0,
              child: SizedBox.expand(
                child: RaisedButton(
                  onPressed: _save,
                  child: Text(
                    '确定',
                    style: TextStyle(fontSize: 14.0, color: Colors.white),
                  ),
                  shape: RoundedRectangleBorder(
                      borderRadius: new BorderRadius.circular(10)),
                ),
              ),
            ),
          ],
        ),
      ) ,
    );
  }

  ///form表单每个元素的标题
  Widget  _myTitle(String  title){
    return  Container(
      width: 100,
      child: Text(title, style: TextStyle( color: ColorUtil.hexColor("#868FA3"), fontSize: 16))
    );
  }


  ///输入框时取焦点
  _unfoucs() {
    _nameFocus.unfocus();
    _ipFocus.unfocus();
    _portFocus.unfocus();
  }

  ///连接方式flag选项
  _connectWaySelection(BuildContext context) async{
    _unfoucs();

    List<Map<String,Object>>  wayList = new List();
    Map<String,Object>  flag0 = new Map();
    flag0["way"] = 1;
    flag0["name"] = "WIFI" ;
    Map<String,Object>  flag1 = new Map();
    flag1["way"] = 2;
    flag1["name"] = "蓝牙" ;
    wayList.add(flag0);
    wayList.add(flag1);

    List<Widget> titleList  =  new  List();
    for(int  i = 0;i<wayList.length;i++){
      titleList.add(Container(
          color: (i%2 == 0)?Colors.white : Color.fromRGBO(92, 104, 198, 0.1),
          child: ListTile(
            title: Text(wayList[i]["name"]),
            onTap: (){
              _printer.connectWay = wayList[i]["way"];
              setState(() {});
              Navigator.pop(context);
            },
          )),);
    }

    DialogUtil.showSelectionModalBottomSheet(context,titleList);

  }

  ///纸宽选项
  _paperSizeSelection(BuildContext context) async{
    _unfoucs();

    List<int>  paperSizeList = new List();
    paperSizeList.add(58);
    paperSizeList.add(80);

    List<Widget> titleList  =  new  List();
    for(int  i = 0;i<paperSizeList.length;i++){
      titleList.add(Container(
          color: (i%2 == 0)?Colors.white : Color.fromRGBO(92, 104, 198, 0.1),
          child: ListTile(
            title: Text(paperSizeList[i].toString()),
            onTap: (){
              if(_printer.paperSize != paperSizeList[i]){
                //清除模板内容
                _printer.templateId = null;
                _printer.tmpName = null;
              }

              _printer.paperSize = paperSizeList[i];
              setState(() {});
              Navigator.pop(context);
            },
          )),);
    }

    DialogUtil.showSelectionModalBottomSheet(context,titleList);

  }

  ///模板选项
  _templateSelection(BuildContext context) async{
    _unfoucs();

    if(_printer.paperSize== null  || _printer.paperSize == 0 ){
      DialogUtil.toast("请先选择纸宽");
      return;
    }
    TemplateService tmpService   =  new TemplateService();
    List<Template> templates  =await tmpService.findTmpsByPaperSize(_printer.paperSize);

    List<Widget> titleList  =  new  List();
    for(int  i = 0;i<templates.length;i++){
      titleList.add(Container(
          color: (i%2 == 0)?Colors.white : Color.fromRGBO(92, 104, 198, 0.1),
          child: ListTile(
            title: Text(templates[i].name),
            onTap: (){
              _printer.templateId = templates[i].id;
              _printer.tmpName = templates[i].name;
              setState(() {});
              Navigator.pop(context);
            },
          )),);
    }

    DialogUtil.showSelectionModalBottomSheet(context,titleList);
  }

  ///时间选择器
  _showTimePicker(BuildContext context, int flag){
    _unfoucs();
    DatePickerUtil.showTimePicker(
        context,
        flag == 0 ? "开始时间" : "结束时间",
        onChange: (date) {
          setState(() {
            if (null != date) {
              if (flag == 0) {
                _printer.workStartTime = formatDate(date, [HH, ':', nn]);
              } else {
                _printer.workEndTime = formatDate(date,[HH, ':', nn]);
              }
            }
          });
        });
  }

  ///模板选项
  _extendTimeSelection(BuildContext context) async{
    _unfoucs();

    List<int>  timeList = new List();
    timeList.add(0);
    timeList.add(10);
    timeList.add(20);
    timeList.add(30);
    List<Widget> titleList  =  new  List();
    for(int  i = 0;i<timeList.length;i++){
      titleList.add(Container(
          color: (i%2 == 0)?Colors.white : Color.fromRGBO(92, 104, 198, 0.1),
          child: ListTile(
            title: Text(timeList[i].toString()+"s"),
            onTap: (){
              _printer.extendTime = timeList[i];
              setState(() {});
              Navigator.pop(context);
            },
          )),);
    }

    DialogUtil.showSelectionModalBottomSheet(context,titleList);
  }

  ///子页设置完数据
  void  _setRanges(PrinterFunc pf){

    if(null == _printer.pfuncs || _printer.pfuncs.length<=0){
      _printer.pfuncs = new List();
    }

    //设置数据
    if(null  !=  pf){
      _printer.pfuncs.add(pf);
      print(_printer.pfuncs);
    }
    setState(() {});
  }

  ///范围列表
  List<Widget> _getRangeWidgetList(){
    List<Widget>  rangeWidgetList   = new List();

    if(null  != _printer.pfuncs &&  _printer.pfuncs.length>0){
      for(int  i = 0;i<_printer.pfuncs.length;i++){
        rangeWidgetList.add(_perRangeWidget(_printer.pfuncs[i],i));
      }
    }
    return rangeWidgetList;
  }

  ///每个范围
  Widget _perRangeWidget(PrinterFunc pf,int index){
    return  Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(20)),
        boxShadow: [
          BoxShadow(
            blurRadius: 2, //阴影范围
            spreadRadius: 0.1, //阴影浓度
            color: Colors.grey, //阴影颜色
          ),
        ],
      ),
      margin: EdgeInsets.fromLTRB(10, 5, 10, 5),
      child: Column(
        children: <Widget>[
          ///顶部
          Container(
            decoration: BoxDecoration(
              color: Color.fromRGBO(98, 121, 224, 0.2),
              borderRadius: BorderRadius.only(topLeft:Radius.circular(20),topRight: Radius.circular(20)),
            ),
            child: ListTile(
              leading:IconButton(
                  icon:  Icon(Icons.remove_circle),
                  iconSize: 30,
                  color:ColorUtil.hexColor('#FF8383'),
                  onPressed: (){
                    //移除
                    _printer.pfuncs.remove(pf);
                    setState(() { });
                  }),
              title:Text("范围  "+(index+1).toString(),textAlign: TextAlign.left,style: TextStyle(color: ColorUtil.hexColor("#5C68C6")),),
              trailing: RaisedButton.icon(
                color:  Color.fromRGBO(98, 121, 224,0.0),
                elevation: 0,
                splashColor:  Color.fromRGBO(98, 121, 224,0.0),
                highlightColor: Color.fromRGBO(98, 121, 224,0.0),
                textColor:ColorUtil.hexColor("#5C68C6"),
                icon: Icon(Icons.edit),
                label: Text("编辑"),
                onPressed: (){
                  Navigator.pushNamed(context, "/PrinterRangeAdd",arguments: {"printerFunc":pf}).then((value) => {
                    setState((){})
                  });
                },),

            ),
          ),
          ///中间内容
          Container(
            padding: EdgeInsets.only(left: 15,right: 15),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                ///功能区
                Container(
                  margin: EdgeInsets.only(top:10 ,bottom: 5),
                  child:Row(
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: Text("功能区",style: TextStyle(fontSize: 16,color: ColorUtil.hexColor("#888FA1")),),
                      ),

                      Expanded(
                        flex: 3,
                        child: Text(pf.funcName,style: TextStyle(fontSize: 14),),
                      )
                    ],
                  ),
                ),
                ///分类
                Container(
                  margin: EdgeInsets.only(top:5 ,bottom: 5),
                  child: Row(
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: Text("分类", style: TextStyle(fontSize: 16, color: ColorUtil.hexColor("#888FA1")),),
                      ),
                      Expanded(
                        flex: 3,
                        child: Text(pf.categoryFlag  == 1 ? pf.pCategorys.map((e) => e.categoryName).toList().join("、"):"" , style: TextStyle(fontSize: 14),),
                      )
                    ],
                  ),),
                ///商品
                pf.funcProdFlag != 0?Container(
                  margin: EdgeInsets.only(top:5 ,bottom: 5),
                  child: Text(pf.funcProdFlag ==1? "指定商品" :"除指定商品",style: TextStyle(fontSize: 16,color: ColorUtil.hexColor("#888FA1")),),
                ): Container(
                  margin: EdgeInsets.only(top:5 ,bottom: 10),
                  child: Row(
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: Text("商品", style: TextStyle(fontSize: 16, color: ColorUtil.hexColor("#888FA1")),),
                      ),
                      Expanded(
                        flex: 3,
                        child: Text("全部" , style: TextStyle(fontSize: 14),),
                      )
                    ],
                  ),),
                ///商品列表
                (pf.pfProds !=  null &&   pf.pfProds.length >0) ? Container(
                    margin: EdgeInsets.only(bottom: 10),
                    child:  Column(
                      children: _getProdWidgetList(pf.subPfProds)
                    )
                ):Container(),

              ],
            ),
          ),
          ///底部
          (pf.pfProds !=  null &&   pf.pfProds.length >3) ?  Container(
              height: 50,
              decoration: BoxDecoration(
                color: Color.fromRGBO(98, 121, 224, 0.1),
                borderRadius: BorderRadius.only(bottomLeft:Radius.circular(20),bottomRight: Radius.circular(20)),
              ),

              child: RaisedButton(
                color: Color.fromRGBO(98, 121, 224, 0),
                elevation: 0,
                splashColor:Color.fromRGBO(98, 121, 224, 0),
                highlightColor:Color.fromRGBO(98, 121, 224, 0),
                child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text( pf.isShowAll?"收起":"查看全部",style:TextStyle(fontSize: 16,color: ColorUtil.hexColor("#5C68C6"))),
                  Icon( pf.isShowAll?Icons.keyboard_arrow_up:Icons.keyboard_arrow_down,size: 20,color: ColorUtil.hexColor("#5C68C6"),)
                ],
              ),
                onPressed: (){
                    pf.isShowAll =  !pf.isShowAll;
                    if(pf.isShowAll){
                      pf.subPfProds  =  pf.pfProds;
                    }else{
                      pf.subPfProds  =  pf.pfProds.sublist(0,3);
                    }
                    setState(() {});
                },)
          ) :Container(),
        ],
      ),

    );
  }

  ///打印范围之商品List
  List<Widget> _getProdWidgetList(List<PrinterFuncProduct>  pfpList){

    List<Widget>  prodWidgetList   = new List();
    if(null  != pfpList&&  pfpList.length >0){
      pfpList.forEach((pfp) {
        prodWidgetList.add( Text(pfp.prodShowName,style: TextStyle(fontSize: 14)),);
      });
    }
    return prodWidgetList;
  }


  //保存打印机
  _save() async{

    print(_printer.name);

    if(null ==  _printer.name ||  "" ==  _printer.name ){
        DialogUtil.toast("请填写打印机名");
        return;
    }

    if(null ==  _printer.connectWay){
      DialogUtil.toast("请选择打印机连接方式");
      return;
    }else{
      if(_printer.connectWay == 1){
        if(null ==  _printer.ip ||   "" ==  _printer.ip ){
          DialogUtil.toast("请填写ip");
          return;
        }else{
          RegExp ipStr = new RegExp(r"^.((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))).$");
          if(!ipStr.hasMatch(_printer.ip)){
            DialogUtil.toast("请输入正确的IP地址");
            return;
          }
        }

        if(null ==  _printer.port ||   0 ==  _printer.port ){
          DialogUtil.toast("请填写端口号");
          return;
        }
      }
    }

    if(null ==  _printer.paperSize  ){
      DialogUtil.toast("请选择纸张大小");
      return;
    }

    if(null ==  _printer.templateId  ){
      DialogUtil.toast("请选择模板");
      return;
    }

    if(null  !=  _printer.isSetWorkTime && _printer.isSetWorkTime ==1 ){
      if(null  ==  _printer.workStartTime || ""  ==  _printer.workStartTime  || null  ==  _printer.workEndTime || ""  ==  _printer.workEndTime ){
        DialogUtil.toast("请工作时间期间");
        return;
      }
    }

    if(_printer.id != null &&  _printer.id != 0  ){
     await _printerService.updatePrinter(_printer);
    }else{
     await _printerService.savePrinter(_printer);
    }
    Navigator.pushReplacementNamed(context, "/PrinterList");
  }


}
