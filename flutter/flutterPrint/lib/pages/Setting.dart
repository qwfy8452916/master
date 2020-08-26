import 'package:flutter/material.dart';
import '../utils/DBUtil.dart';
import '../common/Api.dart';
import '../helper/TimerHelper.dart';
import '../utils/ColorUtil.dart';
import '../utils/DialogUtil.dart';

class SettingPage extends StatefulWidget {
  SettingPage({Key key}) : super(key: key);

  _SettingPageState createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text("设置"),
        centerTitle: true,
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.power_settings_new),
            onPressed: _loginOut,
          ),
        ],
      ),
      body: ListView(
        children: <Widget>[
          Container(
            margin: EdgeInsets.fromLTRB(10, 10, 10, 0),
            height: 80,
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
            child: ListTile(
              contentPadding: EdgeInsets.all(10),
              leading: Icon(Icons.print,
                  size: 50, color: ColorUtil.hexColor("#5C68C6")),
              title: Text("打印机管理",
                  style: TextStyle(fontSize: 16, color: Colors.black)),
              trailing: Icon(Icons.keyboard_arrow_right,
                  size: 40, color: Color.fromRGBO(51, 51, 51, 0.3)),
              onTap: () {
                Navigator.pushNamed(context, "/PrinterList");
              },
            ),
          ),
        ],
      ),
    );
  }

  void _loginOut() {
    DialogUtil.showSuggestiveSelectDialog(context, "确定退出吗？",
        onSure: () {
          TimerHelper.closeTimer();
          DBUtil.closeDB();
          Api.user = null;
          Navigator.pushNamedAndRemoveUntil(context, "/", (route) => route == null);
        });

  }
}
