import 'package:flutter/material.dart';

import '../res/Home.dart';
import '../res/Category.dart';
import '../res/Setting.dart';
import '../res/Assemble.dart';

class Tabs extends StatefulWidget {
  Tabs({Key key}) : super(key: key);

  _TabsState createState() => _TabsState();
}

class _TabsState extends State<Tabs> {

  int currentIndex=0;

  List _pageList=[
      AssemblePage(),
      HomePage(),
      CategoryPage(),
      SettingPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        //  appBar: AppBar(
        //      title:Text('FLUTTER DEMO1')
        //  ), 
         body:this._pageList[this.currentIndex],
         bottomNavigationBar: BottomNavigationBar(
             currentIndex: this.currentIndex,  //配置对应的选中索引
             onTap: (int index){
                setState((){
                    this.currentIndex=index;
                });
             },
             iconSize: 36.0,  //icon大小
             fixedColor: Colors.red,  //选中的颜色
             type: BottomNavigationBarType.fixed,  //配置底部tabs可以有多个按钮
             items: [
                 BottomNavigationBarItem(
                   icon:Icon(Icons.add_to_queue),
                   title: Text("演示")
                 ),
                 BottomNavigationBarItem(
                   icon:Icon(Icons.home),
                   title: Text("列表")
                 ),
                 BottomNavigationBarItem(
                   icon:Icon(Icons.category),
                   title: Text("图文")
                 ),
                 BottomNavigationBarItem(
                   icon:Icon(Icons.ac_unit),
                   title: Text("图片")
                 )
             ],
         ),
      );
  }
}

