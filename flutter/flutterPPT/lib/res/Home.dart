

import 'package:flutter/material.dart';

import '../res/Form.dart';

class HomePage extends StatefulWidget {
    
  HomePage({Key key}) : super(key: key);

  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    //  return HomeContent();
    return MaterialApp(
      home:Scaffold(
         appBar: AppBar(
             title:Text('首页'),
             centerTitle: true,  //标题
         ), 
         body:HomeContent(),    //主体
      ),
      theme: ThemeData(
          primarySwatch: Colors.blue    //样式
      ),
    );
 }
}

class HomeContent extends StatelessWidget{
    @override
    Widget build(BuildContext context) {
      return ListView(
          padding:EdgeInsets.all(10),
          children: <Widget>[
            //  Container(),
            //  Image.network(src),   //挂载组件
            //  Text(), 

        //    RaisedButton(
        //       child: Text("跳转到搜索页面"),
        //       onPressed: (){
        //           Navigator.of(context).push(
        //               MaterialPageRoute(
        //                 builder: (context)=>FormPage()
        //               )
        //           );
        //       },
        //       color: Theme.of(context).accentColor,
        //     ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/4.png"),
                title:Text('习近平总书记近日主持召开中央财经委员会第五次会议'),
                subtitle:Text("研究推动形成优势互补高质量发展的区域经济布局问题、提升产业基础能力和产业链水平问题。")
              ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/5.png"),
                title:Text('福建宁德：“独木冲浪”秀绝技'),
                subtitle:Text("8月18日，洪口乡莒洲村村民在霍童溪准备表演“独木冲浪”绝技。")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/1.png"),
                title:Text('安徽8考生弃清华北大：广泛关注背后是名校情结'),
                subtitle:Text("近日，安徽亳州一中8名学生集体放弃清华北大的报道引发热议。")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/2.png"),
                title:Text('中央环保督察组：福建漳浦非法采矿猖獗 “盆栽式复绿..'),
                subtitle:Text("长期非法开采，造成大面积山体、植被破坏，下游蔡坑水库沦为“牛奶湖”；")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/4.png"),
                title:Text('习近平总书记近日主持召开中央财经委员会第五次会议'),
                subtitle:Text("研究推动形成优势互补高质量发展的区域经济布局问题、提升产业基础能力和产业链水平问题。")
              ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/5.png"),
                title:Text('福建宁德：“独木冲浪”秀绝技'),
                subtitle:Text("8月18日，洪口乡莒洲村村民在霍童溪准备表演“独木冲浪”绝技。")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/6.png"),
                title:Text('四桥所有车道支持不停车缴费'),
                subtitle:Text("晨报讯（通讯员 金轲 南京晨报/爱南京记者 陈彦）记者昨日从南京公路集团获悉，随着长江四桥段完成E/MTC混合车道改造并投入使用")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/2.png"),
                title:Text('中央环保督察组：福建漳浦非法采矿猖獗 “盆栽式复绿..'),
                subtitle:Text("长期非法开采，造成大面积山体、植被破坏，下游蔡坑水库沦为“牛奶湖”；")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),

            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/4.png"),
                title:Text('邻居家遭持刀歹徒抢劫，福建退伍老兵挺身而出身负重伤'),
                subtitle:Text("当邻居家中遭持刀歹徒抢劫时，他挺身而出，冷静与歹徒周旋，救出邻居母女两人，")
              ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/5.png"),
                title:Text('福建宁德：“独木冲浪”秀绝技'),
                subtitle:Text("8月18日，洪口乡莒洲村村民在霍童溪准备表演“独木冲浪”绝技。")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/1.png"),
                title:Text('安徽8考生弃清华北大：广泛关注背后是名校情结'),
                subtitle:Text("近日，安徽亳州一中8名学生集体放弃清华北大的报道引发热议。")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/2.png"),
                title:Text('中央环保督察组：福建漳浦非法采矿猖獗 “盆栽式复绿..'),
                subtitle:Text("长期非法开采，造成大面积山体、植被破坏，下游蔡坑水库沦为“牛奶湖”；")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/3.png"),
                title:Text('2019福建将乐龙栖山国际越野挑战赛举行'),
                subtitle:Text("2019福建将乐龙栖山国际越野挑战赛举行8月18日，参赛选手在比赛中")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/5.png"),
                title:Text('福建宁德：“独木冲浪”秀绝技'),
                subtitle:Text("8月18日，洪口乡莒洲村村民在霍童溪准备表演“独木冲浪”绝技。")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/6.png"),
                title:Text('四桥所有车道支持不停车缴费'),
                subtitle:Text("晨报讯（通讯员 金轲 南京晨报/爱南京记者 陈彦）记者昨日从南京公路集团获悉，随着长江四桥段完成E/MTC混合车道改造并投入使用")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
            RaisedButton(
              child:ListTile(
                leading: Image.network("https://www.itying.com/images/flutter/2.png"),
                title:Text('中央环保督察组：福建漳浦非法采矿猖獗 “盆栽式复绿..'),
                subtitle:Text("长期非法开采，造成大面积山体、植被破坏，下游蔡坑水库沦为“牛奶湖”；")
            ),
              onPressed: (){
                  Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context)=>FormPage()
                      )
                  );
              },
              color: Color.fromRGBO(255, 255, 255, 1)
            ),
     


          ],
      );
    }
}











