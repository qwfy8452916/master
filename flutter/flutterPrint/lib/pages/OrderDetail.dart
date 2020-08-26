import 'package:flutter/material.dart';
import '../common/Queues.dart';
import '../utils/DialogUtil.dart';
import '../src/entity/DeliveryDetail.dart';
import '../src/service/DeliveryDetailService.dart';
import '../src/entity/Delivery.dart';
import '../utils/ColorUtil.dart';

class OrderDetail extends StatefulWidget {
  final Map arguments;

  OrderDetail({Key key, this.arguments}) : super(key: key);

  _OrderDetailState createState() => _OrderDetailState(arguments: arguments);
}

class _OrderDetailState extends State<OrderDetail> {
  Map arguments;
  _OrderDetailState({this.arguments});
  DeliveryDetailService  _detailService   =  new DeliveryDetailService();

  Delivery _delivery;
  List<DeliveryDetail> _details  = new List();


  @override
  void initState() {
    super.initState();
    //获取前一页传来参数
    _delivery = arguments["delivery"];
    getDetails();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("订单详情"), centerTitle: true),
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              //订单详情
              Container(
                color: Colors.white,
                child: Column(
                  children: <Widget>[
                    Container(
                      padding: EdgeInsets.fromLTRB(0, 10, 20, 0),
                      height: 57.5,
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
                              _delivery.delivCode,
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
                                  activeColor: ColorUtil.hexColor(_delivery.printState ==0? "#FF8383" : (_delivery.printState ==1? "#FFB503":( _delivery.printState ==2? "#10BBBB" :"#868FA3"))),
                                  value: 1,
                                  onChanged: (v) {},
                                  groupValue: 1,
                                ),
                                Text(
                                  ///打印状态 0 =未打印，1 =正在打印， 2=已打印，3=无需打印
                                  _delivery.printState ==0? "未打印" : (_delivery.printState ==1? "打印中":( _delivery.printState ==2? "已打印" :"无需打印")) ,
                                  style: TextStyle(color: ColorUtil.hexColor(_delivery.printState ==0? "#FF8383" : (_delivery.printState ==1? "#FFB503":( _delivery.printState ==2? "#10BBBB" :"#868FA3")))),
                                ),
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                    Divider(),
                    Container(
                      height: 44,
                      child: Row(
                        children: <Widget>[
                          SizedBox(width: 10),
                          Text(
                            "${_delivery.roomFloor}-${_delivery.roomCode}",
                            style: TextStyle(
                                fontSize: 18,
                                color: ColorUtil.hexColor("#2B2D30")),
                          ),
                          SizedBox(width: 10),
                          Container(
                              height: 19,
                              padding: EdgeInsets.fromLTRB(7, 2, 7, 2),
                              alignment: Alignment.center,
                              margin: EdgeInsets.only(right: 10),
                              decoration: BoxDecoration(
                                  color: Color.fromRGBO(255, 131, 131, 0.2)),
                              child: Text(
                                _delivery.delivWay == 6 ? "堂食" : (_delivery.delivWay == 7 ? "外卖" : "外带"),
                                style: TextStyle(
                                    fontSize: 12,
                                    color: ColorUtil.hexColor("#FF8383")),
                              )),

                        ],
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 10),

              //订单商品
              Container(
                color: Colors.white,
                child: Column(
                  children: <Widget>[
                    Container(
                      height: 45,
                      child:  Row(
                        children: <Widget>[
                          SizedBox(width: 15),
                          SizedBox(
                            width: 3,
                            child: Container(
                              height: 20,
                              decoration: BoxDecoration(
                                  color: ColorUtil.hexColor("#5C68C6")),
                            ),
                          ),
                          SizedBox(width: 10),
                          Expanded(
                              flex: 4,
                              child: Text(
                                "${_delivery.funcName}-商品信息",
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(
                                    fontSize: 16,
                                    fontFamily: "PingFangSC-Regular",
                                    fontWeight: FontWeight.w600),
                              )),
                        ],
                      ),
                    ),
                    Divider(),
                    Container(
                      child: this._details.length>0 ? Column(
                        children: _detailWidgetList()
                      ):Text("加载中"),
                    ),

                    //合计部分
                    Container(
                      height: 44,
                      alignment: Alignment.centerRight,
                      padding: EdgeInsets.only(right: 10),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: <Widget>[
                          Text("商品数量   ${_delivery.prodCount}",style: TextStyle(color: ColorUtil.hexColor("#2B2D30"),fontSize: 14),),
                          SizedBox(width: 30,),
                          Text("合计  ",style: TextStyle(color: ColorUtil.hexColor("#2B2D30"),fontSize: 14),),
                          Text("￥${_delivery.totalAmount}",style: TextStyle(color: ColorUtil.hexColor("#FF8383"),fontSize: 14),),
                        ],
                      ),
                    ),
                    (_delivery.printState ==2 || _delivery.printState ==3) ? Divider(): Container(),
                     //再打印
                    (_delivery.printState ==2 || _delivery.printState ==3) ?  Container(
                      alignment: Alignment.centerRight,
                      padding: EdgeInsets.only(right: 10,bottom: 10),

                      child: RaisedButton(
                          child: Text("再次打印"),
                          textColor:Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                          onPressed: (){
                            String printInfo = _delivery.id.toString() +
                                ":" +
                                0.toString() +
                                ":" +
                                1.toString();
                            Queues.deliveryQueue.addFirst(printInfo);
                            DialogUtil.toast("已推送至打印任务中，请稍等");
                          }
                      ),

                    ) : Container()
                  ],
                ),



              ),
            ],
          ),
        ));
  }


  ///获取订单详情
  getDetails() async{
    List<DeliveryDetail> details  =   await _detailService.findItemsByDeliveryId(_delivery.id);
    setState(() {
      _details  = details;
    });

  }

  ///设置商品列表
  List<Widget> _detailWidgetList() {
    List<Widget> list = new List();
    if (_details.length > 0) {
      for (DeliveryDetail detail in _details) {
        list.add(Container(
          height: 100,
          child: Row(
            children: <Widget>[
              Container(
                height: 70,
                width: 70,
                margin: EdgeInsets.only(left:10, right:10),
                child: Image.network(detail.prodLogoUrl,fit: BoxFit.cover,),
              ),
              Expanded(
                flex: 2,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: <Widget>[
                    SizedBox(height: 10,),
                    Text(detail.prodShowName,overflow:TextOverflow.ellipsis,style: TextStyle(color:ColorUtil.hexColor("#2B2D30"),fontSize: 14)),
                    Text((detail.prodSpecName == null ||  detail.prodSpecName == "")? " ": detail.prodSpecName ,style: TextStyle(color:ColorUtil.hexColor("#888FA1"),fontSize: 12)),
                    SizedBox(height: 20),
                    Text("￥${detail.prodPrice}",style: TextStyle(color: ColorUtil.hexColor("#FF8383"),fontSize: 16,fontWeight:FontWeight.w500),),
                  ],
                ),
              ),
              Container(
                margin: EdgeInsets.only(left:10, right:10),
                child: Column(
                  children: <Widget>[
                    SizedBox(height: 13,),
                    Text("x${detail.prodCount}",  style: TextStyle(color: ColorUtil.hexColor("#888FA1"),fontSize: 14),),
                    SizedBox(height: 20,),
                    (detail.printState ==2 || detail.printState == 3) ?  IconButton(icon: Icon(Icons.print),iconSize: 29,color: ColorUtil.hexColor("#626EC8"),onPressed: (){

                      String printInfo = _delivery.id.toString()+":"+ detail.id.toString() + ":" +1.toString();
                      Queues.deliveryQueue.addFirst(printInfo);
                      DialogUtil.toast("已推送至打印任务中，请稍等");
                    },):Container(height: 48,width: 48,)
                  ],
                ),
              ),
            ],
          ),
        ));
        list.add(Divider());
      }
    }
    return list;
  }






}
