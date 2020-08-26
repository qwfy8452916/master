import 'package:flutter/material.dart';

class ImagePage extends StatefulWidget {
  ImagePage({Key key}) : super(key: key);

  _ImagePageState createState() => _ImagePageState();
}

class _ImagePageState extends State<ImagePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
       appBar: AppBar(
           title: Text('图片组件'),
           centerTitle: true,
       ),
       
       body: ListView(
          
          padding:EdgeInsets.all(10),
          children:<Widget>[
              Center(
                child:Container(
                    child: Image.network(   //图片组件
                        "https://dwz.cn/k2aFBkb1",
                        alignment: Alignment.topLeft,  //图片显示位置
                        color: Colors.black26,    //图片颜色
                        colorBlendMode: BlendMode.overlay,  //颜色与图片组合属性
                   ),
                    width: 400,  
                    height: 400,
                  decoration: BoxDecoration(
                    color: Colors.blue,
                    ),
                  margin: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                  
               ), 
              ),
            Center(
                child:  Container(
                child: ClipOval(  //设置圆形图片
                   child: Image.network("https://www.itying.com/images/flutter/4.png",
                   width: 200,
                   height: 200,
                   fit: BoxFit.fill,
                   ),
               ),
             ),
            ),
            Center(
                child:  Container(
                child: ClipOval(  //设置圆形图片
                   child: Image.network("https://www.itying.com/images/flutter/4.png",
                   color: Colors.blue,    //图片颜色
                   colorBlendMode: BlendMode.overlay,  //颜色与图片组合属性
                   width: 200,
                   height: 200,
                   fit: BoxFit.fill,
                   ),
               ),
             ),
            ),
            Center(
                child:Container(
                    child: Image.asset(
                        'images/2.0x/timg01.jpg',
                        fit: BoxFit.fill,
                    ),
                    width: 500,  
                    height: 500,
                    decoration: BoxDecoration(
                      color: Colors.blue,
                       ),
                    margin: const EdgeInsets.fromLTRB(0, 10, 0, 10), 
               ), 
              ),
           
          ]
        )  
      );
  }
}















