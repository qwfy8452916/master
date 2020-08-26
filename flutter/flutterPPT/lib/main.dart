import 'package:flutter/material.dart';
import 'res/Tabs.dart';
import 'res/Search.dart';
import 'res/Form.dart';
void main(){
    runApp(MyApp());
}

class MyApp extends StatelessWidget{

   @override
   Widget build(BuildContext context) {

    return MaterialApp(
      home:Tabs(),
      theme: ThemeData(
        //   primarySwatch: Colors.red
      ),
      routes: {  //统一命名路由
        'form':(context)=>FormPage(),
        'search':(context)=>SearchPage(),
      }
    );
   }
}


