import 'Base.dart';
import 'DeliveryDetail.dart';
import 'package:date_format/date_format.dart';


class Delivery extends Base {
  ///主键
  int _id;

  ///服务器配送单Id
  int _serviceDeliveryId;

  ///配送单Code
  String _delivCode;

  ///区域
  String _roomFloor;

  ///地点
  String _roomCode;

  ///功能区Id
  int _funcId;

  ///功能区名
  String _funcName;

  ///配送当时
  int _delivWay;

  ///商品数量
  double _prodCount;

  ///总价格
  double _totalAmount;

  ///是否取消
  int _isCancel;

  ///下单时间
  String _orderTime;

  ///打印状态 0 =未打印，1 =正在打印， 2=已打印，3=无需打印
  int _printState;

  ///配送单详情
  List<DeliveryDetail>  _details;

  int get id => _id;

  int get serviceDeliveryId => _serviceDeliveryId;

  String get delivCode => _delivCode;

  String get roomFloor => _roomFloor;

  String get roomCode => _roomCode;

  int get funcId => _funcId;

  String get funcName => _funcName;

  int get delivWay => _delivWay;

  double get prodCount => _prodCount;

  double get totalAmount => _totalAmount;

  int get isCancel => _isCancel;

  set isCancel(int value) {
    _isCancel = value;
  }

  set totalAmount(double value) {
    _totalAmount = value;
  }

  set prodCount(double value) {
    _prodCount = value;
  }

  set delivWay(int value) {
    _delivWay = value;
  }

  set funcName(String value) {
    _funcName = value;
  }

  set funcId(int value) {
    _funcId = value;
  }

  set roomCode(String value) {
    _roomCode = value;
  }

  set roomFloor(String value) {
    _roomFloor = value;
  }

  set delivCode(String value) {
    _delivCode = value;
  }

  set serviceDeliveryId(int value) {
    _serviceDeliveryId = value;
  }

  set id(int value) {
    _id = value;
  }

  String get orderTime => _orderTime;

  set orderTime(String value) {
    _orderTime = value;
  }


  int get printState => _printState;

  set printState(int value) {
    _printState = value;
  }

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map();
    if(null != id){
      map["id"] = id;
    }
    if(null != serviceDeliveryId){
      map["service_delivery_id"] = serviceDeliveryId;
    }
    if(null != delivCode){
      map["deliv_code"] = delivCode;
    }
    if(null != roomFloor){
      map["room_floor"] = roomFloor;
    }
    if(null != roomCode){
      map["room_code"] = roomCode;
    }
    if(null != funcId){
      map["func_id"] = funcId;
    }
    if(null != funcName){
      map["func_name"] = funcName;
    }
    if(null != delivWay){
      map["deliv_way"] = delivWay;
    }
    if(null != prodCount){
      map["prod_count"] = prodCount;
    }
    if(null != totalAmount){
      map["total_amount"] = totalAmount;
    }
    if(null != isCancel){
      map["is_cancel"] = isCancel;
    }
    if(null != orderTime){
      map["order_time"] =DateTime.parse(orderTime).millisecondsSinceEpoch;
    }
    if(null != printState){
      map["print_state"] =printState;
    }
    map.addAll(super.toMap());
    return map;
  }

  void toObj(Map<String, dynamic> map) {
    id = map["id"];
    serviceDeliveryId = map["service_delivery_id"];
    delivCode = map["deliv_code"];
    roomFloor = map["room_floor"];
    roomCode = map["room_code"];
    funcId = map["func_id"];
    funcName = map["func_name"];
    delivWay = map["deliv_way"];
    prodCount = map["prod_count"];
    totalAmount = map["total_amount"];
    isCancel = map["is_cancel"];
    orderTime =formatDate(DateTime.fromMillisecondsSinceEpoch(map["order_time"],isUtc:true), [yyyy, '-', mm, '-', dd, " ",HH,":", nn,":",ss]);
    printState = map["print_state"];
    createdBy = map["created_by"];
    createdAt = formatDate(DateTime.fromMillisecondsSinceEpoch(map["created_at"]), [yyyy, '-', mm, '-', dd, " ",HH,":", nn,":",ss]);
    lastUpdatedBy = map["last_updated_by"];
    lastUpdatedAt = formatDate(DateTime.fromMillisecondsSinceEpoch(map["last_updated_at"]), [yyyy, '-', mm, '-', dd, " ",HH,":", nn,":",ss]);
  }



  //对象Copy
  Delivery copy() {
    Delivery newDelivery  = new Delivery();
    newDelivery.id =  id;
    newDelivery.serviceDeliveryId =  serviceDeliveryId;
    newDelivery.delivCode =  delivCode;
    newDelivery.roomFloor = roomFloor;
    newDelivery.roomCode =  roomCode;
    newDelivery.funcId =funcId;
    newDelivery.funcName =funcName;
    newDelivery.delivWay = delivWay;
    newDelivery.prodCount = prodCount;
    newDelivery.totalAmount = totalAmount;
    newDelivery.isCancel = isCancel;
    newDelivery.orderTime =orderTime;
    newDelivery.printState = printState;
    newDelivery.details = details;
    newDelivery.createdBy = createdBy;
    newDelivery.createdAt = createdAt;
    newDelivery.lastUpdatedBy =  lastUpdatedBy;
    newDelivery.lastUpdatedAt = lastUpdatedAt;
    return newDelivery;
  }



  List<DeliveryDetail> get details => _details;

  set details(List<DeliveryDetail> value) {
    _details = value;
  }



  ///主键
  static final String ID = "id";

  ///服务器配送单Id
  static final String SERVICE_DELIVERY_ID = "service_delivery_id";

  ///配送单Code
  static final String DELIV_CODE = "deliv_code";

  ///区域
  static final String ROOM_FLOOR = "room_floor";

  ///地点
  static final String ROOM_CODE = "room_code";

  ///功能区Id
  static final String FUNC_ID = "func_id";

  ///功能区名
  static final String FUNC_NAME = "func_name";

  ///配送当时
  static final String DELIV_WAY = "deliv_way";

  ///商品数量
  static final String PROD_COUNT = "prod_count";

  ///总价格
  static final String TOTAL_AMOUNT = "total_amount";

  ///是否取消
  static final String IS_CANCEL = "is_cancel";

  ///下单时间
  static final String ORDER_TIME = "order_time";

  ///打印状态
  static final String PRINT_STATE = "print_state";

  /// 主键
  static final String CREATED_BY = "created_by";

  /// 酒店ID
  static final String CREATED_AT = "created_at";

  /// 打印机功能区关系ID
  static final String LAST_UPDATE_BY = "last_updated_by";

  /// 打印机ID
  static final String LAST_UPDATE_AT = "last_updated_at";


}
