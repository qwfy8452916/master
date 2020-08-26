import 'package:flutter/material.dart';
import '../common/Queues.dart';
import '../src/entity/PrinterFunc.dart';
import '../src/entity/PageDTO.dart';
import '../src/entity/Printer.dart';
import '../src/service/PrinterServce.dart';

import '../utils/ColorUtil.dart';
import '../utils/DialogUtil.dart';

class PrinterList extends StatefulWidget {
  PrinterList({Key key}) : super(key: key);

  _PrinterListState createState() => _PrinterListState();
}

class _PrinterListState extends State<PrinterList> {
  ScrollController _controller = new ScrollController(); //滚动加载
  PrinterService _printerService = new PrinterService(); //订单Sevice
  PageDTO _page = new PageDTO(); //分页
  List<Printer> _printers = new List(); //订单列表

  @override
  void initState() {
    super.initState();

    _page.pageSize = 3;
    _page.pageNo = 1;

    getPrinters();

//    //给_controller添加监听
//    _controller.addListener(() {
//      //判断是否滑动到了页面的最底部
//      if (_controller.position.pixels == _controller.position.maxScrollExtent) {
//        //如果不是最后一页数据，则生成新的数据添加到list里面
//        _retrieveData();
//      }
//    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("打印机管理"),
        centerTitle: true,
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.add_circle_outline),
            onPressed: () {
              Navigator.pushReplacementNamed(context, "/PrinterAdd");
            },
          ),
        ],
      ),
      body: this._printers.length > 0
          ? RefreshIndicator(
              onRefresh: _onRefresh,
              child: ListView.separated(
                controller: _controller,
                physics: BouncingScrollPhysics(),
                itemCount: _printers.length,
                itemBuilder: (context, index) {
                  return printerWidget(_printers[index]);
                },
                separatorBuilder: (context, index) {
                  return Container();
                },
              ),
            )
          : noPrinterWidget(),
    );
  }

  ///下拉刷新
  Future<void> _onRefresh() async {
    await Future.delayed(Duration(seconds: 2)).then((e) {
      setState(() {
        _page.pageNo = 1;
        _printers.clear();
        getPrinters();
      });
    });
  }

  ///上拉加载
  void _retrieveData() {
    //上拉加载新的数据
    _page.pageNo++;
    Future.delayed(Duration(seconds: 2)).then((e) {
      getPrinters();
    });
  }

  ///获取所有打印机
  getPrinters() async {
    List<Printer> printers = await _printerService.findAllPrinters();
    setState(() {
      _printers.addAll(printers);
    });
  }

  ///更新打印机的工作状态
  setWorkState(int id) async {
    _printerService.setWorkState(id);
    setState(() {
      DialogUtil.toast("设置完成");
    });
  }

  ///删除打印机
  deletePrinter(Printer printer) async {
    DialogUtil.showSuggestiveSelectDialog(context, "确定删除'${printer.name}'吗？",onSure:() async{
     await _printerService.deletePrinterById(printer.id);
      _printers.remove(printer);
      setState(() {
        Navigator.pop(context);
        DialogUtil.toast("删除成功");
      });
    });
  }

  ///没有订单的提示
  Widget noPrinterWidget() {
    return Container(
      alignment: Alignment.center,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Icon(Icons.print, size: 64.5, color: Colors.grey),
          SizedBox(
            height: 10,
          ),
          Text("暂无打印机请添加",
              style: TextStyle(
                  fontSize: 18, color: ColorUtil.hexColor("#2B2D30"))),
          SizedBox(
            height: 10,
          ),
          Container(
            width: 140,
            height: 40,
            child: RaisedButton(
                child: Text(
                  "添加",
                  style: TextStyle(fontSize: 18),
                ),
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20)),
                textColor: Colors.white,
                onPressed: () {
                  Navigator.pushReplacementNamed(context, "/PrinterAdd");
                }),
          )
        ],
      ),
    );
  }

  ///每个打印机列
  Widget printerWidget(Printer printer) {
    return Container(
      alignment: Alignment.center,
      margin: EdgeInsets.fromLTRB(10, 5, 10, 5),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(10)),
        boxShadow: [
          BoxShadow(
            blurRadius: 2, //阴影范围
            spreadRadius: 0.1, //阴影浓度
            color: Colors.grey, //阴影颜色
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          //顶部title
          Container(
            alignment: Alignment.center,
            padding: EdgeInsets.fromLTRB(0, 10, 0, 0),
            child: Row(
              children: <Widget>[
                SizedBox(width: 15),
                SizedBox(
                  width: 3,
                  child: Container(
                    height: 20,
                    decoration:BoxDecoration(color: ColorUtil.hexColor("#5C68C6")),
                  ),
                ),
                SizedBox(width: 10),
                Container(
                    height: 19,
                    padding: EdgeInsets.fromLTRB(7, 2, 7, 2),
                    alignment: Alignment.center,
                    margin: EdgeInsets.only(right: 10),
                    decoration: BoxDecoration(
                        color: Color.fromRGBO(16, 187, 187, 0.2)),
                    child: Text(
                      printer.connectWay == 1 ? "WIFI" : "蓝牙",
                      style: TextStyle(
                          fontSize: 12,
                          color: ColorUtil.hexColor("#10BBBB")),
                    )),
                Expanded(
                    flex: 4,
                    child: Text(
                      printer.name,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                          fontSize: 16,
                          fontFamily: "PingFangSC-Regular",
                          fontWeight: FontWeight.w600),
                    ),
                ),
                Switch(
                    activeColor: ColorUtil.hexColor("#5C68C6"),
                    value: printer.isWork == 1,
                    onChanged: (v) {
                      printer.isWork = v ? 1 : 0;
                      setWorkState(printer.id);
                    })
              ],
            ),
          ),
          Divider(),
          //中间描述
          ListTile(
            contentPadding: EdgeInsets.only(left: 28, right: 10),
            title: (null != printer.pfuncs && printer.pfuncs.length>0 ) ?  Wrap(spacing: 5,children: _funcWidget(printer.pfuncs)) : Text("支持全部功能区",style: TextStyle(fontSize: 16, color: ColorUtil.hexColor("#5C68C6")),),
            subtitle: Text("创建时间 ${printer.createdAt}"),
            trailing: IconButton(
              icon: Icon(Icons.keyboard_arrow_right),
              iconSize: 30,
              color: Color.fromRGBO(51, 51, 51, 0.3),
              onPressed: () {
                Navigator.pushNamed(context, "/PrinterDetails",arguments:{"printer":printer});
              }),
          ),
          Divider(),
          //底部按钮7
          Container(
            alignment: Alignment.center,
            margin: EdgeInsets.fromLTRB(0, 3, 10, 10),
            child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  Container(
                    alignment: Alignment.center,
                    height: 30,
                    width: 60,
                    decoration: BoxDecoration(
                        border: Border.all(
                            color: ColorUtil.hexColor("#D5D5D6"), width: 1),
                        borderRadius: BorderRadius.circular(15)),
                    child: RaisedButton(
                        child: Text("删除",
                            style: TextStyle(
                                fontSize: 12,
                                fontFamily: "PingFangSC-Regular")),
                        color: Colors.white,
                        elevation: 0,
                        textColor: ColorUtil.hexColor("#2B2D30"),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15)),
                        onPressed: () {
                          deletePrinter(printer);
                        }),
                  ),
                  SizedBox(width: 10),
                  Container(
                    height: 30,
                    width: 60,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                        border: Border.all(
                            color: ColorUtil.hexColor("#D5D5D6"), width: 1),
                        borderRadius: BorderRadius.circular(15)),
                    child: RaisedButton(
                        child: Text("修改",
                            style: TextStyle(
                                fontSize: 12,
                                fontFamily: "PingFangSC-Regular")),
                        color: Colors.white,
                        elevation: 0,
                        textColor: ColorUtil.hexColor("#2B2D30"),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15)),
                        onPressed: () {
                          //跳转页面
                          Navigator.pushReplacementNamed(context, "/PrinterAdd",arguments:{"printer":printer});
                        }),
                  ),
                  SizedBox(width: 10),
                  Container(
                    height: 30,
                    width: 90,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                        border: Border.all(
                            color: ColorUtil.hexColor("#D5D5D6"), width: 1),
                        borderRadius: BorderRadius.circular(15)),
                    child: RaisedButton(
                        child: Text("打印测试",
                            style: TextStyle(
                                fontSize: 12,
                                fontFamily: "PingFangSC-Regular")),
                        color: Colors.white,
                        elevation: 0,
                        textColor: ColorUtil.hexColor("#2B2D30"),
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15)),
                        onPressed: () {

                          String printInfo = 0.toString()+":"+ printer.id.toString() + ":" +0.toString();
                          Queues.deliveryQueue.addFirst(printInfo);
                          DialogUtil.toast("已推送至打印任务中，请稍后");

                        }),
                  ),
                ]),
          ),
        ],
      ),
    );
  }


  List<Widget>  _funcWidget(List<PrinterFunc> pfs){

    ///设置商品列表
      List<Widget> list = new List();
      if (pfs.length > 0) {
        for(int i = 0;i<pfs.length;i++){
          list.add(Text(pfs[i].funcName,style: TextStyle(fontSize: 16, color: ColorUtil.hexColor("#5C68C6"))));
          if(i != pfs.length-1 ){
            list.add( Text("|",style: TextStyle(fontSize: 16, color: ColorUtil.hexColor("#D5D5D6"))));
          }
        }
      }
      return list;
  }


}
