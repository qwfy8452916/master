import 'package:flutter/material.dart';

class ContainerPage extends StatefulWidget {
  ContainerPage({Key key}) : super(key: key);

  _ContainerPageState createState() => _ContainerPageState();
}

class _ContainerPageState extends State<ContainerPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
       appBar: AppBar(
           title: Text('Container组件介绍'),
           centerTitle: true,
       ),
       
       body:Center(
          child:Container(
             child:Text(
                 '我是Text文本组件我是Text文本组件我是Text文本组件',
                 textAlign: TextAlign.left,
                 overflow: TextOverflow.ellipsis,
                 maxLines:2,
                 textScaleFactor: 1.8,
                 style:TextStyle(
                     fontSize:20.0,
                     fontWeight: FontWeight.w800,
                     fontStyle: FontStyle.italic,
                     decoration: TextDecoration.underline,
                     decorationColor: Colors.white,
                     decorationStyle: TextDecorationStyle.dashed,
                     letterSpacing: 5.0,
                     color: Colors.red,
                    //  color: Color.fromRGBO(14, 245, 107, 1)
                 )
             ),
             width: 300.0,
             height: 300.0,
             //  padding: EdgeInsets.all(20),
             padding: EdgeInsets.fromLTRB(10, 30, 5, 0),
             margin: EdgeInsets.fromLTRB(10, 30, 5, 0),
             transform: Matrix4.rotationZ(0.3),  //旋转
             alignment: Alignment.bottomLeft,   //文字显示位置
             decoration: BoxDecoration(
                 color: Colors.yellow,
                 borderRadius: BorderRadius.all(
                     Radius.circular(10)
                 ),
                 border:Border.all(
                     color:Colors.blue,
                 )
             ),
           ),
        ) 
 );
  }
}















