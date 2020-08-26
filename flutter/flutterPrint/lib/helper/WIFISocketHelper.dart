import 'dart:io';


class WIFISocketHelper {

  String _ip;
  int _port;
  Function  onSuccess;
  Function  onFailed;

  WIFISocketHelper(String ip,int port,{Function onSuccess,Function onFailed}){
    this._ip = ip;
    this._port = port;
    this.onSuccess = onSuccess;
    this.onFailed = onFailed;
  }


  Socket _wifiSocket;
  write(List<int> data)  async{
    Socket.connect(_ip, _port,timeout: Duration(seconds: 3)).then((Socket sock) {
      _wifiSocket = sock;
      sock.add(data);
      _wifiSocket.listen(dataHandler,
          onError: errorHandler,
          onDone: doneHandler,
          cancelOnError: false);
//      sock.close();
    }).catchError((e) {
      print("无法连接: $e");
      onFailed();
      if(_wifiSocket != null ){
        _wifiSocket.destroy();
      }
    });
  }

  //接收报文
  void dataHandler(List<int> data){

    print(data);

    if( [20,0,0,15].toString()==data.toString() ){
      if(null  !=  onSuccess){
        onSuccess();
      }
    }else{
      if(null  !=  onFailed){
        onFailed();
      }
    }
    _wifiSocket.destroy();
  }

  void errorHandler(error, StackTrace trace){
    print(error);
    if(null  !=  onFailed){
      onFailed();
    }
    _wifiSocket.destroy();
  }

  void doneHandler(){
    _wifiSocket.destroy();
  }


//  ///获取打印结果
//  List<int>  getResult(){
//    //while循环获取打印结果
//    int startTime = DateTime.now().millisecondsSinceEpoch;
//    while(true){
//      int endTime = DateTime.now().millisecondsSinceEpoch;
//      if(endTime -startTime > 20000){
//        //超时戴白哦没有打印成功，没有打印结果
//        print("wifi打印超时");
//        return  null;
//      }
//
//      if(null  !=  result && result  == [1]){
//        print("wifi打印机连接失败");
//        return  null;
//      }
//
//      //获取socket的返回值
//      if(null  != result){
//        print("wifi打印结果$result");
//        return  result;
//      }
//      sleep(Duration(milliseconds: 100));
//    }
//  }


}
