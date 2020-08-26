import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:flutter/cupertino.dart';
import 'package:longan_counter/utils/ColorUtil.dart';

class DialogUtil {

  ///toast
  static void toast(msg) {
    Fluttertoast.showToast(
        msg: msg,
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIos: 3,
        backgroundColor: Colors.black54,
        textColor: Colors.white,
        fontSize: 16.0);
  }

  ///提示
  static void  showSuggestiveSelectDialog(BuildContext context, String msg ,{Function onSure}){
    showDialog(
        context: context,
        builder: (context){
          return CupertinoAlertDialog(
            content: new SingleChildScrollView(
              child: ListBody(
                children: <Widget>[
                  SizedBox(height: 20),
                  Text(msg,style: TextStyle(color: ColorUtil.hexColor("#040E21"),fontSize: 18,fontWeight: FontWeight.w600),),
                  SizedBox(height: 20),
                ],
              ),
            ),
            actions: <Widget>[
              CupertinoDialogAction(
                child: Text("确定",style: TextStyle(color: Colors.red)),
                onPressed: onSure
              ),
              CupertinoDialogAction(
                child: Text("取消",style: TextStyle(color: Colors.grey)),
                onPressed: ()=>Navigator.pop(context)
              ),
            ],
          );
        }
    );
  }

  ///BottomSheet底部弹框(类似selection)
  static void showSelectionModalBottomSheet(BuildContext context,List<Widget> widgets) async{

    //一个ListTitle的高度大约是57
    double height = widgets.length*57.0;
    showModalBottomSheet(
        context: context,
        builder: (context){
          return Container(
            height: height>400?400:height,
            child: ListView(
              children: widgets,
            ),
          );
        }
    );
  }
}
