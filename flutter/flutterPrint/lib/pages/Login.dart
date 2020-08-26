import 'package:flutter/material.dart';

import '../common/Api.dart';
import '../helper/TimerHelper.dart';
import '../src/entity/User.dart';
import '../utils/ColorUtil.dart';
import '../utils/DBUtil.dart';
import '../utils/DialogUtil.dart';
import '../utils/HttpUtil.dart';

class Login extends StatefulWidget {
  Login({Key key}) : super(key: key);

  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  String account;
  String password;

  //获取Key用来获取Form表单组件
  GlobalKey<FormState> _loginKey;
  bool _isShowPassWord;

  var _accountController = new TextEditingController();
  var _passWordController = new TextEditingController();

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _loginKey = new GlobalKey<FormState>();
    _accountController.text = "";
    _passWordController.text = "";
    _isShowPassWord = false;

    //打开数据库连接，并创建DB
    initDB();
  }

  @override
  Widget build(BuildContext context) {
    Size screenSize = MediaQuery.of(context).size;
    double screenWidth = screenSize.width;
    double ratio = screenWidth / 750;
    double topOffset = 50 * ratio;
    double gapOffset = 20 * ratio;
    double gap2Offset = 30 * ratio;
    double bottomOffset = 80 * ratio;
    return WillPopScope(
      onWillPop: _doubleClickBack,
      child: Scaffold(
          body: Container(
            child: Center(
                child: Container(
                  width: double.infinity,
                  height: double.infinity,
                  decoration: BoxDecoration(
                    image: DecorationImage(
                        alignment: Alignment.center,
                        image: AssetImage("images/login.png"), fit: BoxFit.fitWidth),
                  ),
                  child: Form(
                    key: _loginKey,
                    autovalidate: true,
                    child: Container(
//                    margin: EdgeInsets.fromLTRB(37.5, 0, 37.5, 0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
//                        Container(
//                            child: Text(
//                              '登录',
//                              style: TextStyle(
//                                  color: Colors.white,
//                                  fontFamily: "PingFangSC-Medium",
//                                  fontSize: 17),
//                            )),
                          SizedBox(height: topOffset),
                          Container(
                              child: Text(
                                '系统登录',
                                style: TextStyle(
                                    color: ColorUtil.hexColor("#424B93"),
                                    fontFamily: "PingFangSC-Medium",
                                    fontSize: 32),
                              )),
                          SizedBox(height: gap2Offset),

                          //手机号
                          FractionallySizedBox(
                            widthFactor: 0.75,
                            child: TextFormField(
                              autofocus: false,
                              controller: _accountController,
                              decoration: InputDecoration(
                                prefixIcon: Icon(
                                  Icons.phone_android,
                                  color: Color.fromRGBO(92, 104, 198, 0.3),
                                  size: 30,
                                ),
                                hintText: "请填写账号",
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.all(Radius.circular(10))),
                                suffixIcon: (null != account &&   account.isNotEmpty) ? IconButton(
                                  icon: Icon(
                                    Icons.cancel,
                                    color: ColorUtil.hexColor("#C4C9D0"),
                                  ),
                                  onPressed: clearAccount,
                                ) : null,
                              ),
                              onChanged: (value){
                                setState(() {
                                  account = value;
                                });

                              },
                              onSaved: (value) {
                                account = value;
                              },
                            ),
                          ),
                          SizedBox(height: gapOffset),
                          //密码
                          FractionallySizedBox(
                            widthFactor: 0.75,
                            child: TextFormField(
                              autofocus: false,
                              controller: _passWordController,
                              decoration: InputDecoration(
                                  prefixIcon: Icon(
                                    _isShowPassWord ? Icons.lock_open : Icons.lock,
                                    color: Color.fromRGBO(92, 104, 198, 0.3),
                                    size: 30,
                                  ),
                                  hintText: '请填写密码',
                                  labelStyle: TextStyle(
                                      fontSize: 15.0,
                                      color: Color.fromARGB(255, 93, 93, 93)),
                                  border: OutlineInputBorder(
                                    borderRadius: BorderRadius.all(Radius.circular(10)),
                                  ),
                                  suffixIcon: IconButton(
                                    icon: Icon(
                                      _isShowPassWord
                                          ? Icons.visibility
                                          : Icons.visibility_off,
                                      color: ColorUtil.hexColor("#C4C9D0"),
                                    ),
                                    onPressed: showPassWord,
                                  )
                              ),
                              obscureText: !_isShowPassWord,
                              onSaved: (value) {
                                password = value;
                              },
                            ),
                          ),
                          SizedBox(height: gap2Offset),
                          //登录按钮
                          FractionallySizedBox(
                            widthFactor: 0.8,
//                          height: 45.0,
                            child: Container(
                              height: 64,
                              child: SizedBox.expand(
                                child: RaisedButton(
                                  onPressed: login,
                                  child: Text(
                                    '登    录',
                                    style: TextStyle(fontSize: 24.0, color: Colors.white),
                                  ),
                                  shape: RoundedRectangleBorder(
                                      borderRadius: new BorderRadius.circular(10)),
                                ),
                              ),

                            ),
                          ),
                          SizedBox(height: bottomOffset),
                        ],
                      ),
                    ),
                  ),
                ))
            ),
      ),
    ) ;
  }

  void showPassWord() {
    setState(() {
      _isShowPassWord = !_isShowPassWord;
    });
  }

  void clearAccount() {

    setState(() {
      _accountController.text = "";
      account ="";
    });

  }

  void initDB() async {
    //创建数据库
    await DBUtil.openDB(); //开启数据库
    DBUtil.init();
  }

  //登录
  void login() async {

    //读取当前的Form状态
    var loginForm = _loginKey.currentState;
    //验证Form表单
    if (loginForm.validate()) {
      loginForm.save();
    }
    if (account == null || account.length == 0) {
      DialogUtil.toast("请填写账号");
      return;
    }
    if (password == null || password.length == 0) {
      DialogUtil.toast("请填写密码");
      return;
    }
    await HttpUtil().post(
      Api.login,
      params: {
        'account': account,
        'password': password,
        "orgTypes": [3]
      },
      onSuccess: (data) {
        print("$data");

        if (data["hotelDTO"] == null) {
          DialogUtil.toast("当前用户不是酒店员工");
          return;
        }
        Api.user = new User();
        Api.user.hotelId = data["hotelDTO"]["id"];
        Api.user.username = account;
        Api.user.password = password;
        Api.user.token = data['token'];

        TimerHelper.startTimer();
        Navigator.pushNamed(context, "/Tabs");
      },
      onError: (error) {
        DialogUtil.toast(error);
      },
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



//  Future<bool> _onWillPop() {
//    return showDialog(
//      context: context,
//      builder: (context) => new AlertDialog(
//        title: new Text('Are you sure?'),
//        content: new Text('Do you want to exit an App'),
//        actions: <Widget>[
//          new FlatButton(
//            onPressed: () => Navigator.of(context).pop(false),
//            child: new Text('No'),
//          ),
//          new FlatButton(
//            onPressed: () => Navigator.of(context).pop(true),
//            child: new Text('Yes'),
//          ),
//        ],
//      ),
//    ) ?? false;
//  }

}
