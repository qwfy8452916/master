import 'package:flutter/material.dart';
import '../res/listData.dart';

class SearchPage extends StatelessWidget {
  const SearchPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: Text("动态列表"),
            centerTitle: true,
        ),
        body:HomeContent()
    );
  }
}

class HomeContent extends StatelessWidget{


        //自定义方法

        List<Widget> getdata(){
            
            List<Widget> list=new List();
            for(var i=0;i<20;i++){
                list.add(ListTile(
                    title:Text("我是$i列表"),
                 ));
            }
            return list;
        }


    @override
    Widget build(BuildContext context) {
        
        return ListView(
          
          children: this.getdata(),
          );
 
      }

  }












