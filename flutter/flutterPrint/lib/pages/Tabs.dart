import 'package:flutter/material.dart';
import '../utils/DialogUtil.dart';
import 'OrderList.dart';
import 'Setting.dart';
import '../utils/ColorUtil.dart';
import '../utils/DBUtil.dart';
import '../helper/TimerHelper.dart';
import '../common/Api.dart';

class Tabs extends StatefulWidget {
  Tabs({Key key}) : super(key: key);

  _TabsState createState() => _TabsState();
}

class _TabsState extends State<Tabs> {
  int _currentIndex = 0;
  List _pageList = [
    OrderList(),
    SettingPage(),
  ];

  @override
  Widget build(BuildContext context) {

    return WillPopScope(
      onWillPop: _doubleClickBack,
      child:Scaffold(
        body: this._pageList[this._currentIndex],
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: this._currentIndex,
          //配置对应的索引值选中
          onTap: (int index) {
            setState(() {
              //改变状态
              this._currentIndex = index;
            });
          },
          iconSize: 36.0,
          //icon的大小
          fixedColor: ColorUtil.hexColor("#5C68C6"),
          //选中的颜色
          type: BottomNavigationBarType.fixed,
          //配置底部tabs可以有多个按钮
          items: [
            BottomNavigationBarItem(
                icon: Icon(Icons.list),
                title: Text("订单")
            ),
            BottomNavigationBarItem(
                icon: Icon(Icons.settings),
                title: Text("打印机")
            )
          ],
        ),
      ) ,
    );
  }

  //退出程序
  int last = 0;
  Future<bool> _doubleClickBack() {

    int now = DateTime.now().millisecondsSinceEpoch;
    if (now - last > 1000) {
      last = DateTime.now().millisecondsSinceEpoch;
      DialogUtil.toast("再按一次退出");
      return Future.value(false);
    } else {
      TimerHelper.closeTimer();
      DBUtil.closeDB();
      Api.user = null;
      return Future.value(true);
    }
  }
}
