

import 'package:flutter/material.dart';
import 'listData.dart';
// import 'package:flutter_app01/res/Form.dart';

class CategoryPage extends StatefulWidget {
  CategoryPage({Key key}) : super(key: key);

  _CategoryPageState createState() => _CategoryPageState();
}

class _CategoryPageState extends State<CategoryPage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home:Scaffold(
         appBar: AppBar(
             title:Text('图片列表'),
             centerTitle: true,
         ), 
         body:HomeContent(),
      ),
      theme: ThemeData(
          primarySwatch: Colors.blue
      ),
    );
    // Column(
    //     crossAxisAlignment: CrossAxisAlignment.start,
    //     mainAxisAlignment: MainAxisAlignment.center,
    //     children: <Widget>[
    //         RaisedButton(
    //             child: Text("跳转到表单页并传值"),
    //             onPressed: (){
    //                Navigator.of(context).push(
    //                    MaterialPageRoute(
    //                        builder:(context)=>FormPage()
    //                    )
    //                );
    //             },
    //             color: Theme.of(context).accentColor,
    //             textTheme: ButtonTextTheme.primary,
    //         )
    //     ],
    // );
  }
}

class HomeContent extends StatelessWidget{

    List<Widget> getdata(){
         
         var tempList=listData.map((value){
             return Container(
                 child: Column(
                     children: <Widget>[
                         Image.network(value['imageUrl']),
                         SizedBox(height: 10),  //文字与图片距离
                         Text(value['title'],
                          textAlign: TextAlign.center,
                          style: TextStyle(
                              fontSize: 20,  //设置文字大小
                          ),
                         )
                     ],
                 ),
                 decoration: BoxDecoration(
                     border: Border.all(   //设置边框
                         color: Color.fromRGBO(233, 233, 233, 0.9)
                     )
                 ),
             );
         });

        return tempList.toList();
    }

    @override
    Widget build(BuildContext context) {
        
        return GridView.count(
           crossAxisCount: 3,   //显示3列
           padding: EdgeInsets.all(10),  //与app上下左右10
           crossAxisSpacing: 10.0,  //左右距离
           mainAxisSpacing: 10.0,   //上下距离
        //    childAspectRatio: 0.6,   //宽度和高度的比例
           children: this.getdata(),
        );
 
      }

  }









