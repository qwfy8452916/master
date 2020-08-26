import 'package:flutter/material.dart';
import 'pages/routes/Routes.dart';
import 'utils/ColorUtil.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '龙眼打单',
      theme: ThemeData(
        backgroundColor: ColorUtil.hexColor("#6279E0"),
        buttonColor: ColorUtil.hexColor("#5C68C6"),
        disabledColor: ColorUtil.hexColor("#f9f9f9"),
        primaryColor:ColorUtil.hexColor("#5C68C6"),
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      debugShowCheckedModeBanner: false, //去掉debug图标
      onGenerateRoute: onGenerateRoute,
    );
  }
}
