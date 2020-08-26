import 'package:flutter/material.dart';

import '../common/Queues.dart';
import '../src/entity/Delivery.dart';
import '../src/service/DeliveryService.dart';
import '../utils/ColorUtil.dart';
import '../utils/DialogUtil.dart';

class OrderSearchList extends StatefulWidget {

  final Map arguments;

  OrderSearchList({Key key, this.arguments}) : super(key: key);

  _OrderSearchListState createState() => _OrderSearchListState(arguments: arguments);

}

class _OrderSearchListState extends State<OrderSearchList> {

  Map arguments;
  _OrderSearchListState({this.arguments});

  DeliveryService _deliveryService = new DeliveryService(); //订单Sevice
  List<Delivery>  _deliverys = new List(); //订单列表

  String area; //区域
  String code; //订单号
  String startTime; //时间区间开始
  String endTime; //时间区间结束

  @override
  void initState() {
    super.initState();

    area =arguments["area"];
    code =arguments["code"];
    startTime =arguments["startTime"];
    endTime =arguments["endTime"];

    getDeliveryList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: true,
        title: Text("搜索结果"),
        centerTitle: true,
      ),
      body:  Column(children: <Widget>[

        Container(
          height: 45.0,
          child: SizedBox.expand(
              child:  RaisedButton.icon(
                elevation: 0,
                splashColor: Colors.white,
                color: Colors.white,
                icon: Icon(Icons.brush,color: ColorUtil.hexColor("#626EC8"),),
                label: Text("清除搜索条件",style: TextStyle(color:ColorUtil.hexColor("#626EC8")),),
                onPressed: () {
                  Navigator.pushReplacementNamed(context, "/Tabs");
                },)
          ),
        ),
        Expanded(
          child: this._deliverys.length > 0 ?  ListView.builder(
            physics: BouncingScrollPhysics(),
            itemCount: _deliverys.length,
            itemBuilder: (context, index) {
              return deliveryWidget(_deliverys[index]);
            },
          ) : noDeliveryWidget(),
        ),

      ],)
    );
  }


  ///获取订单
  getDeliveryList() async {
    List<Delivery> deliverys = await _deliveryService.findSearchOrderForPage( area, code, startTime, endTime);
    setState(() {
      _deliverys = deliverys;
    });
  }

  ///每个订单列
  Widget deliveryWidget(Delivery delivery) {
    return Container(
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
        children: <Widget>[
          //顶部title
          Container(
            padding: EdgeInsets.fromLTRB(0, 10, 20, 0),
            child: Row(
              children: <Widget>[
                Container(
                  padding: EdgeInsets.only(left: 15, right: 15),
                  alignment: Alignment.center,
                  height: 40,
                  decoration: BoxDecoration(
                      color: Color.fromRGBO(92, 104, 198, 0.1),
                      borderRadius: BorderRadius.only(
                          topRight: Radius.circular(20),
                          bottomRight: Radius.circular(20))),
                  child: Text(
                    delivery.delivCode,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                        fontSize: 18,
                        color: ColorUtil.hexColor("#6B7AD9"),
                        fontFamily: "PingFangSC-Regular",
                        fontWeight: FontWeight.w600),
                  ),
                ),
                Expanded(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.end,
                    children: <Widget>[
                      Radio(
                        activeColor: ColorUtil.hexColor(delivery.printState ==0? "#FF8383" : (delivery.printState ==1? "#FFB503":( delivery.printState ==2? "#10BBBB" :"#868FA3"))),
                        value: 1,
                        onChanged: (v) {},
                        groupValue: 1,
                      ),
                      Text(
                        ///打印状态 0 =未打印，1 =正在打印， 2=已打印，3=无需打印
                        delivery.printState ==0? "未打印" : (delivery.printState ==1? "打印中":( delivery.printState ==2? "已打印" :"无需打印")) ,
                        style: TextStyle(color: ColorUtil.hexColor( delivery.printState ==0? "#FF8383" : (delivery.printState ==1? "#FFB503":( delivery.printState ==2? "#10BBBB" :"#868FA3")))),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
          Divider(),
          //中间描述
          ListTile(
            contentPadding: EdgeInsets.only(left: 28, right: 10),
            title: Row(
              children: <Widget>[
                Container(
                    padding: EdgeInsets.fromLTRB(7, 2, 7, 2),
                    alignment: Alignment.center,
                    margin: EdgeInsets.only(right: 10),
                    decoration: BoxDecoration(
                        color: Color.fromRGBO(255, 131, 131, 0.2)),
                    child: Text(
                      delivery.delivWay == 6
                          ? "堂食"
                          : (delivery.delivWay == 7 ? "外卖" : "外带"),
                      style: TextStyle(
                          fontSize: 12, color: ColorUtil.hexColor("#FF8383")),
                    )),
                Text(
                  "${delivery.roomFloor}-${delivery.roomCode}",
                  style: TextStyle(
                      fontSize: 18, color: ColorUtil.hexColor("#2B2D30")),
                )
              ],
            ),
            subtitle: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(
                  "# ${delivery.funcName}",
                ),
                Text(
                    "共${delivery.prodCount}个商品 商品金额 ¥ ${delivery.totalAmount} "),
                Text("${delivery.orderTime}")
              ],
            ),
          ),
          //底部按钮
          Container(
            margin: EdgeInsets.fromLTRB(0, 10, 10, 10),
            child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  Container(
                    height: 30,
                    width: 60,
                    decoration: BoxDecoration(
                        border: Border.all(
                            color: ColorUtil.hexColor("#D5D5D6"), width: 1),
                        borderRadius: BorderRadius.circular(15)),
                    child: RaisedButton(
                        child: Text("详情",
                            style: TextStyle(
                                fontSize: 12,
                                fontFamily: "PingFangSC-Regular")),
                        color: Colors.white,
                        elevation: 0,
                        textColor: ColorUtil.hexColor("#2B2D30"),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                        onPressed: () {
                          Navigator.pushNamed(context, "/OrderDetail", arguments:{"delivery":delivery});
                        }),
                  ),
                  SizedBox(width: 10),


                  (delivery.printState ==2 || delivery.printState ==3)?  Container(
                    height: 29,
                    width: 90,
                    child: RaisedButton(
                        child: Text("再次打印",
                            style: TextStyle(
                                fontSize: 12,
                                fontFamily: "PingFangSC-Regular")),
                        elevation: 0,
                        textColor: Colors.white,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(15)),
                        onPressed: () {
                          String printInfo = delivery.id.toString()+":"+ 0.toString() + ":" +1.toString();
                          Queues.deliveryQueue.addFirst(printInfo);
                          DialogUtil.toast("已推送至打印任务中，请稍后");
                        }),
                  ) : Container(),
                ]),
          ),
        ],
      ),
    );
  }

  ///没有订单的提示
  Widget noDeliveryWidget() {
    return Container(
      alignment: Alignment.center,
      child: Text("暂无符合条件的订单",style: TextStyle(fontSize: 18, color: ColorUtil.hexColor("#888FA1"))),
    );
  }

}
