import 'package:date_format/date_format.dart';
import 'package:flutter/material.dart';
import '../utils/ColorUtil.dart';
import '../utils/DatePickerUtil.dart';
import '../utils/DialogUtil.dart';


class OrderSearch extends StatefulWidget {
  OrderSearch({Key key}) : super(key: key);

  _OrderSearchState createState() => _OrderSearchState();
}

class _OrderSearchState extends State<OrderSearch> {
  String area = "";
  String code = "";
  String startTime = formatDate(DateTime.now().add(Duration(days:-1)), [yyyy, '-', mm, '-', dd]);
  String endTime = formatDate(DateTime.now(), [yyyy, '-', mm, '-', dd]);

  var _areaController = new TextEditingController();
  var _codeController = new TextEditingController();
  FocusNode _areaFocus = FocusNode();
  FocusNode _codeFocus = FocusNode();

  @override
  Widget build(BuildContext context) {

    return WillPopScope(
      onWillPop: _clickBack,
      child: Scaffold(
        appBar: AppBar(
          leading:IconButton(icon: Icon(Icons.arrow_back,color: Colors.white,), onPressed: _clickBack),
          title: Text("搜索"),
          centerTitle: true,
        ),
        body: Column(
          children: <Widget>[
            Expanded(
              child: SingleChildScrollView(
                  child: Container(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Container(
                            padding: EdgeInsets.all(10),
                            child: Text(
                              "输入搜索条件进行筛选",
                              style: TextStyle(
                                  color: ColorUtil.hexColor("#868FA3"), fontSize: 12),
                            ),
                          ),
                          //填写区域地点
                          Container(
                            color: Colors.white,
                              child: ListTile(
                                leading: Text("区域地点",  style: TextStyle(color: ColorUtil.hexColor("#868FA3"),fontSize: 18),),
                                title:  TextField(
                                  focusNode: _areaFocus,
                                  controller: _areaController,
                                  decoration: InputDecoration(
                                    contentPadding: EdgeInsets.all(5),
                                    hintText: "填写区域地点",
                                    border:OutlineInputBorder(borderSide: BorderSide.none),
                                    suffixIcon: ( null != area && area.isNotEmpty )?IconButton(
                                      icon: Icon(
                                        Icons.cancel,
                                        color: ColorUtil.hexColor("#C4C9D0"),
                                      ),
                                      onPressed: clearArea,
                                    ) :null,
                                  ),
                                  onChanged: (value) {
                                    setState(() {
                                      area = value;
                                    });
                                  },
                                ),
                              )
                          ),
                          SizedBox(height: 10),
                          //流水号
                          Container(
                              color: Colors.white,
                              child: ListTile(
                                leading: Text("流  水  号",  style: TextStyle(color: ColorUtil.hexColor("#868FA3"),fontSize: 18),),
                                title:   TextField(
                                  focusNode: _codeFocus,
                                  controller: _codeController,
                                  decoration: InputDecoration(
                                    contentPadding: EdgeInsets.all(5),
                                    hintText: "填写流水号",
                                    border:OutlineInputBorder(borderSide: BorderSide.none),
                                    suffixIcon:  ( null != code && code.isNotEmpty ) ?IconButton(
                                      icon: Icon(
                                        Icons.cancel,
                                        color: ColorUtil.hexColor("#C4C9D0"),
                                      ),
                                      onPressed: clearCode,
                                    ) :null,
                                  ),
                                  onChanged: (value) {
                                    setState(() {
                                      code = value;
                                    });

                                  },
                                ),
                              )
                          ),
                          SizedBox(height: 10),
                          //下单时间
                          Container(
                              color: Colors.white,
                              child: ListTile(
                                leading: Text("下单时间",  style: TextStyle(color: ColorUtil.hexColor("#868FA3"),fontSize: 18),),
                                title: Row(
                                 children: <Widget>[
                                   InkWell(
                                     child: Text(startTime),
                                     onTap: () {
                                       showDatePicker(context, 0);
                                     },
                                   ),
                                   SizedBox(
                                     width: 10,
                                   ),
                                   Text("至",
                                       style: TextStyle(
                                           color: ColorUtil.hexColor("#868FA3"),
                                           fontSize: 18)),
                                   SizedBox(
                                     width: 10,
                                   ),
                                   InkWell(
                                     child: Text(endTime),
                                     onTap: () {
                                       showDatePicker(context, 1);
                                     },
                                   ),
                                 ],
                                )
                              )
                          ),

                        ],
                      ),
                  )),
            ),
            //搜索
            Container(
              margin: EdgeInsets.all(20),
              height: 45.0,
              child: SizedBox.expand(
                child: RaisedButton(
                  onPressed: search,
                  child: Text(
                    '搜索',
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

  Future<bool> _clickBack(){
    Navigator.pushReplacementNamed(context, "/Tabs");
    return Future.value(true);
  }

  void clearArea() {
    setState(() {
      _areaController.text = "";
      area ="";
    });

  }

  void clearCode() {
    setState(() {
      _codeController.text = "";
      code ="";
    });
  }

  void search() {

    if (null  != startTime &&  startTime.isNotEmpty &&  null  != endTime && endTime.isNotEmpty) {

      if(DateTime.parse(startTime).isAfter(DateTime.parse(endTime))){
        DialogUtil.toast("错误的时间范围");
        return;
      }

      if(DateTime.parse(startTime).isBefore(DateTime.now().add(Duration(days: -7)))){
        DialogUtil.toast("只能查询一周内订单");
        return;
      }

    }


    Navigator.pushNamed(context,"/OrderSearchList",arguments:{"ara":area,"code":code,"startTime":startTime,"endTime":endTime});
  }

  void showDatePicker(BuildContext context, int flag) {
    _codeFocus.unfocus();
    _areaFocus.unfocus();

    DatePickerUtil.showDatePicker(context, onConfirm: (date) {
      setState(() {
        if(null != date){
          if (flag == 0) {
            startTime = formatDate(date, [yyyy, '-', mm, '-', dd]);
          } else {
            endTime = formatDate(date, [yyyy, '-', mm, '-', dd]);
          }
        }
      });
    });
  }
}
