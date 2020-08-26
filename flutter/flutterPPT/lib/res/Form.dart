import 'package:flutter/material.dart';


class FormPage extends StatelessWidget {
  const FormPage({Key key}) : super(key: key);
   
  @override
  Widget build(BuildContext context) {

    return Scaffold(
       appBar: AppBar(
           title: Text('文章详情'),
           centerTitle: true,
       ),
       body: ListView(
          
          padding:EdgeInsets.all(10),
          children:<Widget>[
            new Container(
                child:new Text('习近平总书记近日主持召开中央财经委员会第五次会议，研究推动形成优势互补高质量发展的区域经济布局问题、提升产业基础能力和产业链水平问题。总书记在会上发表重要讲话强调，要根据各地区的条件，走合理分工、优化发展的路子，落实主体功能区战略，完善空间治理，形成优势互补、高质量发展的区域经济布局。要充分发挥集中力量办大事的制度优势和超大规模的市场优势，打好产业基础高级化、产业链现代化的攻坚战。',
              textAlign: TextAlign.left,
              style: TextStyle(
                 fontSize:16.0,
                 fontStyle:FontStyle.normal,
                 color: Colors.black,
                 fontWeight: FontWeight.w100,
                 
              ),
             ),
               margin: const EdgeInsets.fromLTRB(0, 10, 0, 10),
            ), 
            new Container(
                child:Image.network(
                   "https://dwz.cn/x3djI9VG",
                    height:230,
                    fit:BoxFit.cover
                 ),
               margin: const EdgeInsets.fromLTRB(0, 10, 0, 10),
             ),
            new Container(
                child:new Text('习近平总书记近日主持召开中央财经委员会第五次会议，研究推动形成优势互补高质量发展的区域经济布局问题、提升产业基础能力和产业链水平问题。总书记在会上发表重要讲话强调，要根据各地区的条件，走合理分工、优化发展的路子，落实主体功能区战略，完善空间治理，形成优势互补、高质量发展的区域经济布局。要充分发挥集中力量办大事的制度优势和超大规模的市场优势，打好产业基础高级化、产业链现代化的攻坚战。',
              textAlign: TextAlign.left,
              style: TextStyle(
                 fontSize:16.0,
                 fontStyle:FontStyle.normal,
                 color: Colors.black,
                 fontWeight: FontWeight.w100,
                 
              ),
             ),
               margin: const EdgeInsets.fromLTRB(0, 10, 0, 10),
            ),
            new Container(
                child:Image.network(
                   "https://dwz.cn/D34kxVPz",
                    height:230,
                    fit:BoxFit.cover
                 ),
               margin: const EdgeInsets.fromLTRB(0, 10, 0, 10),
             ),
            
            Text('习近平总书记近日主持召开中央财经委员会第五次会议，研究推动形成优势互补高质量发展的区域经济布局问题、提升产业基础能力和产业链水平问题。总书记在会上发表重要讲话强调，要根据各地区的条件，走合理分工、优化发展的路子，落实主体功能区战略，完善空间治理，形成优势互补、高质量发展的区域经济布局。要充分发挥集中力量办大事的制度优势和超大规模的市场优势，打好产业基础高级化、产业链现代化的攻坚战。',
              textAlign: TextAlign.left,
              style: TextStyle(
                 fontSize:16.0,
                 fontStyle:FontStyle.normal,
                 color: Colors.black,
                 fontWeight: FontWeight.w100,
                 
              ),
              
            )
          ]
        
          )  
    );
  }
}














