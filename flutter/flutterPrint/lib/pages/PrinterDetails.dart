import 'dart:ui';

import 'package:flutter/material.dart';

import '../common/Api.dart';
import '../src/entity/Printer.dart';
import '../src/entity/PrinterFunc.dart';
import '../src/entity/PrinterFuncProduct.dart';
import '../utils/ColorUtil.dart';


class PrinterDetails extends StatefulWidget {
  final Map arguments;

  PrinterDetails({Key key, this.arguments}) : super(key: key);

  _PrinterDetailsState createState() => _PrinterDetailsState(arguments: arguments);
}

class _PrinterDetailsState extends State<PrinterDetails> {
  //接收数据
  Map arguments;
  _PrinterDetailsState({this.arguments});

  Printer _printer;

  @override
  void initState() {
    super.initState();

    if(null  != arguments){
      _printer   = arguments["printer"];

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
      _printer.pfuncs = new List();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("打印机详情"),
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
                    _myListTitle("打印机名称",_printer.name ),
                    ///连接方式
                    _myListTitle("连接方式",_printer.connectWay == 1 ?"WIFI":"蓝牙"),
                    ///IP
                    Offstage(
                      offstage: _printer.connectWay != 1,
                      child: _myListTitle("IP地址",_printer.ip),
                    ),
                    ///port
                    Offstage(
                      offstage: _printer.connectWay != 1,
                      child:_myListTitle("端口号",_printer.port.toString()),
                    ),
                    Divider(height: 0),
                    ///纸宽
                    _myListTitle("纸宽",_printer.paperSize.toString()),
                    ///模板
                    _myListTitle("打印模板",_printer.tmpName),
                    _printer.isSetWorkTime == 1? Divider(height: 0):Container(),
                    ///时间
                    Offstage(
                      offstage: _printer.isSetWorkTime != 1,  // 不设置时间的时候隐藏
                      child: _myListTitle("打印时间范围",_printer.workStartTime +"-"+_printer.workEndTime),
                    ),
                    Divider(height: 0),
                    ///分商品打印
                    _myListTitle("分商品打印",_printer.isPrintedByProd == 1?"是":"否"),
                    ///打印总单
                    Offstage(
                      offstage: _printer.isPrintedByProd != 1,  // 不设置时间的时候隐藏
                      child: _myListTitle("打印总单",_printer.isPrintAll == 1?"是":"否"),
                    ),
                    Divider(height: 0),
                    ///延长时间
                    Offstage(
                      offstage: _printer.isExtendPrint != 1,
                      child: _myListTitle("打印延长时间",_printer.extendTime.toString()+"s",),
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
                                  '打印范围',
                                  textAlign: TextAlign.left,
                                  style: TextStyle( color: ColorUtil.hexColor("#5C68C6"),fontFamily: "PingFangSC-Regular",fontSize: 18),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    Divider(height: 0),
                    ///详细范围
                    Container(
                      child: Column(
                          children: _getRangeWidgetList()
                      ),
                    ) ,
                  ],
                ),
              ),
            ),
          ),

        ],
      ),
    );
  }


  ///每个元素内容
  Widget  _myListTitle(String title,String  content){
    return Container(
        child: ListTile(
          leading: _myTitle(title),
          title: Text(content, style: TextStyle(
              color: ColorUtil.hexColor("#2B2D30"), fontSize: 16)),
        ));
  }

  ///form表单每个元素的标题
  Widget  _myTitle(String  title){
    return  Container(
        width: 100,
        child: Text(title, style: TextStyle( color: ColorUtil.hexColor("#868FA3"), fontSize: 15))
    );
  }


  ///子页设置完数据
  void  _setRanges(PrinterFunc pf){
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
    }else{
      rangeWidgetList.add(
          Container(
            height: 56,
            alignment: Alignment.center,
            child: Text(
              "无范围限制",style: TextStyle(fontSize:20,color: ColorUtil.hexColor("#5C68C6")))
          )
      );
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
              title:Text("范围  "+(index+1).toString(),textAlign: TextAlign.left,style: TextStyle(color: ColorUtil.hexColor("#5C68C6")),),
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


}
