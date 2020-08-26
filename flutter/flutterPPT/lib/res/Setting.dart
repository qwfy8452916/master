import 'package:flutter/material.dart';

class SettingPage extends StatefulWidget {
  SettingPage({Key key}) : super(key: key);

  _SettingPageState createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPage> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
    theme: ThemeData(
          primarySwatch: Colors.red
    ),
    home:Scaffold(
         appBar: AppBar(
             title:Text('图文'),
             centerTitle: true,    //标题
         ), 
         
         
         body: ListView(
        
          padding:EdgeInsets.all(10),
          children: <Widget>[
             Container(
                height:180,
                child: ListView(
                    scrollDirection:Axis.horizontal,
                
                children: <Widget>[

                    Container(
                        width: 180.0,
                        color: Colors.red,
                        child: ListView(
                            children: <Widget>[
                                Image.network(
                                    "https://www.itying.com/images/flutter/3.png",
                                    height: 150,
                                    ),
                                Text(
                                    '滑动图1',
                                    textAlign:TextAlign.center,
                                    )
                            ],
                        ),
                    ),
                    Container(
                        width: 180.0,
                        color: Colors.red,
                        child: ListView(
                            children: <Widget>[
                                Image.network(
                                    "https://www.itying.com/images/flutter/1.png",
                                    height: 150,
                                    ),
                                Text(
                                    '滑动图2',
                                    textAlign:TextAlign.center,
                                    )
                            ],
                        ),
                    ),
                    Container(
                        width: 180.0,
                        color: Colors.red,
                        child: ListView(
                            children: <Widget>[
                                Image.network(
                                    "https://www.itying.com/images/flutter/2.png",
                                    height: 150,
                                    ),
                                Text(
                                    '滑动图3',
                                    textAlign:TextAlign.center,
                                    )
                            ],
                        ),
                    ),
                    Container(
                        width: 180.0,
                        color: Colors.red,
                        child: ListView(
                            children: <Widget>[
                                Image.network(
                                    "https://www.itying.com/images/flutter/4.png",
                                    height: 150,
                                    ),
                                Text(
                                    '滑动图4',
                                    textAlign:TextAlign.center,
                                    )
                            ],
                        ),
                    ),
                    Container(
                        width: 180.0,
                        color: Colors.red,
                        child: ListView(
                            children: <Widget>[
                                Image.network(
                                    "https://www.itying.com/images/flutter/5.png",
                                    height: 150,
                                    ),
                                Text(
                                    '滑动图5',
                                    textAlign:TextAlign.center,
                                    )
                            ],
                        ),
                    ),
                    
             ]
                ),
            ),

            Image.network("https://www.itying.com/images/flutter/1.png"),
            Container(
                child: Text(
                    'GRAVI FALLS',
                    textAlign:TextAlign.center,
                    style:TextStyle(
                    fontSize: 28
                        ),
                    ),
                    height: 60,
                    padding: EdgeInsets.fromLTRB(0, 10, 0, 10), 
            ),
            Image.network("https://www.itying.com/images/flutter/2.png"),
            Container(
                child: Text(
                    'A CORNER OF THE ROOM',
                    textAlign:TextAlign.center,
                    style:TextStyle(                                                                                                                         fontSize: 28
                        ),
                    ),
                    height: 60,
                    padding: EdgeInsets.fromLTRB(0, 10, 0, 10), 
            ),
            Image.network("https://www.itying.com/images/flutter/3.png"),
            Container(
                child: Text(
                    'TOY ARMORED VEHICLE',
                    textAlign:TextAlign.center,
                    style:TextStyle(
                                                                                                                                        fontSize: 28
                        ),
                    ),
                    height: 60,
                    padding: EdgeInsets.fromLTRB(0, 10, 0, 10), 
            ),
            Container(
                width: 180.0,
                height: 180.0,
                color: Colors.orange,
            ),
          ])  //主体
      ),
    );
     
  }
}






