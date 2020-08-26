

import 'package:flutter/material.dart';

import '../res/Image.dart';
import '../res/Container.dart';
import '../res/Route.dart';


class AssemblePage extends StatefulWidget {
    
  AssemblePage({Key key}) : super(key: key);

  _AssemblePageState createState() => _AssemblePageState();
}

class _AssemblePageState extends State<AssemblePage> {
  @override
  Widget build(BuildContext context) {
    //  return HomeContent();
    return Scaffold(
         appBar: AppBar(
             title:Text('Flutter介绍目录'),//标题
             centerTitle: true,  
         ), 
         body:HomeContent(),    //主体
      );
   }
  }

class HomeContent extends StatelessWidget{
    @override
    Widget build(BuildContext context) {
      return ListView(
          padding:EdgeInsets.all(10),
          children: <Widget>[
            RaisedButton(
              child:ListTile(
                leading: Icon(Icons.settings,color: Colors.blue,size: 40,),
                title:Text('Flutter图片组件',
                style: TextStyle(
                        fontSize: 24,
                        color: Colors.blue
                    ),
                ),
              ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>ImagePage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1),
              
            ),
            RaisedButton(
              child:ListTile(
                leading: Icon(Icons.settings,color: Colors.blue,size: 40,),
                title:Text(
                    'Flutter容器组件介绍',
                    style: TextStyle(
                        fontSize: 24,
                        color: Colors.brown
                      ),
                    ),
              ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>ContainerPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Icon(Icons.settings,color: Colors.blue,size: 40,),
                title:Text(
                    'Flutter路由介绍',
                    style: TextStyle(
                        fontSize: 24,
                        color: Colors.green
                      ),
                    ),
              ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>RoutePage(title:'我是跳转传值')
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),

            RaisedButton(
              child:ListTile(
                leading: Icon(Icons.settings,color: Colors.blue,size: 40,),
                title:Text(
                    'Flutter路由介绍',
                    style: TextStyle(
                        fontSize: 24,
                        color: Colors.red
                      ),
                    ),
              ),
              onPressed: () {
              //命名路由跳转
               Navigator.pushNamed(context, 'form');
                 },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Icon(Icons.settings,color: Colors.blue,size: 40,),
                title:Text(
                    'ListView动态列表',
                    style: TextStyle(
                        fontSize: 24,
                        color: Colors.deepPurple
                      ),
                    ),
              ),
              onPressed: () {
              //命名路由跳转
               Navigator.pushNamed(context, 'search');
                 },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
          ],
      );
    }
}











