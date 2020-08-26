import 'package:flutter/material.dart';


class RoutePage extends StatelessWidget {
//   const RoutePage({Key key}) : super(key: key);
  
   String title;
  RoutePage({this.title="欢迎来到路由跳转页面"});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
       floatingActionButton: FloatingActionButton(
           child: Text('返回'),
           onPressed: (){
               Navigator.of(context).pop();
           },
       ),
       appBar: AppBar(
           title: Text(this.title),
           centerTitle: true,
       ),
       
       body: ListView(
          
          padding:EdgeInsets.all(10),
          children:<Widget>[
                Text(
                    '我是文本我是文本我是文本我是文本',
                    textScaleFactor: 1.2,
                    style:TextStyle(
                     fontSize:20.0,
                     fontWeight: FontWeight.w800,
                     decoration: TextDecoration.underline,
                     decorationColor: Colors.white,
                     decorationStyle: TextDecorationStyle.dashed,
                     letterSpacing: 5.0,
                     color: Colors.blueGrey,
                  )
                 ),
                 Text(
                    '我是文本我是文本我是文本我是文本',
                    textScaleFactor: 1.2,
                    style:TextStyle(
                     fontSize:20.0,
                     fontWeight: FontWeight.w800,
                     decoration: TextDecoration.underline,
                     decorationColor: Colors.white,
                     decorationStyle: TextDecorationStyle.dashed,
                     letterSpacing: 5.0,
                     color: Colors.green,
                  )
                 ),
                 Text(
                    '我是文本我是文本我是文本我是文本',
                    textScaleFactor: 1.2,
                    style:TextStyle(
                     fontSize:20.0,
                     fontWeight: FontWeight.w800,
                     decoration: TextDecoration.underline,
                     decorationColor: Colors.white,
                     decorationStyle: TextDecorationStyle.dashed,
                     letterSpacing: 5.0,
                     color: Colors.red,
                  )
                 ),


           
          ]
        )  
      );
  }
}

// class RoutePage extends StatefulWidget {
//   RoutePage({Key key}) : super(key: key);

//   _RoutePageState createState() => _RoutePageState();
// }

// class _RoutePageState extends State<RoutePage> {
//     String title;
//     RoutePage({this.title="欢迎来到路由跳转页面"});

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//        appBar: AppBar(
//            title: Text(this.title),
//            centerTitle: true,
//        ),
       
//        body: ListView(
          
//           padding:EdgeInsets.all(10),
//           children:<Widget>[
//                 Text(
//                     '我是文本我是文本我是文本我是文本',
//                     textScaleFactor: 1.2,
//                     style:TextStyle(
//                      fontSize:20.0,
//                      fontWeight: FontWeight.w800,
//                      decoration: TextDecoration.underline,
//                      decorationColor: Colors.white,
//                      decorationStyle: TextDecorationStyle.dashed,
//                      letterSpacing: 5.0,
//                      color: Colors.blueGrey,
//                   )
//                  ),
//                  Text(
//                     '我是文本我是文本我是文本我是文本',
//                     textScaleFactor: 1.2,
//                     style:TextStyle(
//                      fontSize:20.0,
//                      fontWeight: FontWeight.w800,
//                      decoration: TextDecoration.underline,
//                      decorationColor: Colors.white,
//                      decorationStyle: TextDecorationStyle.dashed,
//                      letterSpacing: 5.0,
//                      color: Colors.green,
//                   )
//                  ),
//                  Text(
//                     '我是文本我是文本我是文本我是文本',
//                     textScaleFactor: 1.2,
//                     style:TextStyle(
//                      fontSize:20.0,
//                      fontWeight: FontWeight.w800,
//                      decoration: TextDecoration.underline,
//                      decorationColor: Colors.white,
//                      decorationStyle: TextDecorationStyle.dashed,
//                      letterSpacing: 5.0,
//                      color: Colors.red,
//                   )
//                  ),


           
//           ]
//         )  
//       );
//   }
// }















