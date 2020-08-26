import 'Base.dart';
import 'PrinterFunc.dart';
import 'package:date_format/date_format.dart';

class Printer extends Base {
  /// 主键
  int _id;

  /// 酒店ID
  int _hotelId;

  /// 打印机名
  String _name;

  /// 连接方式： 1=wifi ， 2=蓝牙
  int _connectWay;

  /// IP地址
  String _ip;

  /// 端口
  int _port;

  /// 纸张大小(毫米)
  int _paperSize;

  /// 小票模板Id
  int _templateId;

  /// 是否工作：0=不工作，1=工作
  int _isWork;

  /// 是否设置工作时间：0=否，1=是
  int _isSetWorkTime;

  /// 工作开始时间
  String _workStartTime;

  /// 工作结束时间
  String _workEndTime;

  /// 是否分商品打印： 0=否，1=是
  int _isPrintedByProd;

  /// 是否打印总单： 0=否，1=是
  int _isPrintAll;

  /// 是否延长打印： 0=否，1=是
  int _isExtendPrint;

  /// 延长时间： 0=否，1=是
  int _extendTime;

  /// 配送方式区分   0 =都支持   1：部分支持 页面没有指定不支持的选项
  int _delivWayFlag;

  /// 区域区分   0 =都支持  1：部分支持 页面没有指定不支持的选项
  int _areaFlag;

  /// 功能区区分   0 =都支持   1：部分支持 页面没有指定不支持的选项
  int _funcFlag;

  ///与功能区的关系列表
  List<PrinterFunc>  _pfuncs;

  /// 小票模板名
  String _tmpName;

  /// 小票模板内容
  String _tmpContent;

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map();
    if(null !=  id){
      map["id"] = id;
    }
    if(null !=  hotelId){
      map["hotel_id"] = hotelId;
    }
    if(null !=  name){
      map["name"] = name;
    }
    if(null !=  connectWay){
      map["connect_way"] = connectWay;
    }
    if(null !=  ip){
      map["ip"] = ip;
    }
    if(null !=  port){
      map["port"] = port;
    }
    if(null !=  paperSize){
      map["paper_size"] = paperSize;
    }
    if(null != templateId){
      map["template_id"] = templateId;
    }
    if(null !=  isWork){
      map["is_work"] = isWork;
    }
    if(null !=  isSetWorkTime){
      map["is_set_work_time"] = isSetWorkTime;
    }
    if(null !=  isSetWorkTime && "" != workStartTime ){
      map["work_start_time"] =workStartTime;
    }
    if(null !=  workEndTime && "" != workEndTime ){
      map["work_end_time"] =workEndTime;
    }
    if(null !=  isPrintedByProd ){
      map["is_printed_by_prod"] = isPrintedByProd;
    }
    if(null !=  isPrintAll ){
      map["is_print_all"] = isPrintAll;
    }
    if(null !=  isExtendPrint ){
      map["is_extend_print"] = isExtendPrint;
    }
    if(null !=  extendTime ){
      map["extend_time"] = extendTime;
    }
    if(null !=  delivWayFlag ) {
      map["deliv_way_flag"] = delivWayFlag;
    }
    if(null !=  areaFlag ) {
      map["area_flag"] = areaFlag;
    }
    if(null !=  funcFlag ) {
      map["func_flag"] = funcFlag;
    }
    map.addAll(super.toMap());
    return map;
  }

  void toObj(Map<String, dynamic> map) {
    id = map["id"];
    hotelId = map["hotel_id"];
    name = map["name"];
    connectWay = map["connect_way"];
    ip = map["ip"];
    port = map["port"];
    paperSize = map["paper_size"];
    templateId = map["template_id"];
    isWork = map["is_work"];
    isSetWorkTime =  map["is_set_work_time"];
    workStartTime =map["work_start_time"];
    workEndTime = map["work_end_time"];
    isPrintedByProd = map["is_printed_by_prod"];
    isPrintAll  = map["is_print_all"];
    isExtendPrint = map["is_extend_print"];
    extendTime = map["extend_time"];
    delivWayFlag =map["deliv_way_flag"];
    areaFlag = map["area_flag"];
    funcFlag = map["func_flag"];
    createdBy = map["created_by"];
    createdAt =formatDate(DateTime.fromMillisecondsSinceEpoch(map["created_at"]), [yyyy, '-', mm, '-', dd, " ",HH,":", nn,":",ss]);
    lastUpdatedBy = map["last_updated_by"];
    lastUpdatedAt =formatDate(DateTime.fromMillisecondsSinceEpoch(map["last_updated_at"]), [yyyy, '-', mm, '-', dd, " ",HH,":", nn,":",ss]);
  }

  int get id => _id;

  set id(int value) {
    _id = value;
  }

  int get hotelId => _hotelId;

  set hotelId(int value) {
    _hotelId = value;
  }

  int get funcFlag => _funcFlag == null  ? 0:_funcFlag;

  set funcFlag(int value) {
    _funcFlag = value;
  }

  int get isPrintedByProd => _isPrintedByProd;

  set isPrintedByProd(int value) {
    _isPrintedByProd = value;
  }

  String get workEndTime => _workEndTime;

  set workEndTime(String value) {
    _workEndTime = value;
  }

  String get workStartTime => _workStartTime;

  set workStartTime(String value) {
    _workStartTime = value;
  }

  int get isSetWorkTime => _isSetWorkTime;

  set isSetWorkTime(int value) {
    _isSetWorkTime = value;
  }

  int get isWork => _isWork;

  set isWork(int value) {
    _isWork = value;
  }

  int get templateId => _templateId;

  set templateId(int value) {
    _templateId = value;
  }

  int get paperSize => _paperSize;

  set paperSize(int value) {
    _paperSize = value;
  }

  int get port => _port;

  set port(int value) {
    _port = value;
  }

  String get ip => _ip;

  set ip(String value) {
    _ip = value;
  }

  int get connectWay => _connectWay;

  set connectWay(int value) {
    _connectWay = value;
  }

  String get name => _name;

  set name(String value) {
    _name = value;
  }

  List<PrinterFunc> get pfuncs => null == _pfuncs?new List():_pfuncs;

  set pfuncs(List<PrinterFunc> value) {
    _pfuncs = value;
  }

  String get tmpName => _tmpName;

  set tmpName(String value) {
    _tmpName = value;
  }

  String get tmpContent => _tmpContent;

  set tmpContent(String value) {
    _tmpContent = value;
  }

  int get isExtendPrint => _isExtendPrint;

  set isExtendPrint(int value) {
    _isExtendPrint = value;
  }

  int get extendTime => _extendTime;

  set extendTime(int value) {
    _extendTime = value;
  }

  int get isPrintAll => _isPrintAll;

  set isPrintAll(int value) {
    _isPrintAll = value;
  }


  int get delivWayFlag => _delivWayFlag;

  set delivWayFlag(int value) {
    _delivWayFlag = value;
  }


  int get areaFlag => _areaFlag;

  set areaFlag(int value) {
    _areaFlag = value;
  }


  /// 主键
  static final String ID = "id";

  /// 酒店ID
  static final String HOTEL_ID = "hotel_id";

  /// 打印机名
  static final String NAME = "name";

  /// 连接方式： 1=wifi ， 2=蓝牙
  static final String CONNECT_WAY = "connect_way";

  /// IP地址
  static final String IP = "ip";

  /// 端口
  static final String PORT = "port";

  /// 纸张大小(毫米)
  static final String PAPER_SIZE = "paper_size";

  /// 小票模板
  static final String TEMPLATE = "template";

  /// 是否工作：0=不工作，1=工作
  static final String IS_WORK = "is_work";

  /// 是否设置工作时间：0=否，1=是
  static final String IS_SET_WORK_TIME = "is_set_work_time";

  /// 工作开始时间
  static final String WORK_START_TIME = "work_start_time";

  /// 工作结束时间
  static final String WORK_END_TIME = "work_end_time";

  /// 是否分商品打印： 0=否，1=是
  static final String IS_PRINT_BY_PROD = "is_printed_by_prod";

  /// 是否打印总单： 0=否，1=是
  static final String IS_PRINT_ALL = "is_print_all";

  /// 是否延长打印： 0=否，1=是
  static final String IS_EXTEND_PRINT = "is_extend_print";

  /// 延长时间： 0=否，1=是
  static final String EXTEND_TIME = "extend_time";

  /// 配送方式区分   0 =都支持   1：部分支持 页面没有指定不支持的选项
  static final String DELV_WAY_FLAG = "deliv_way_flag";

  /// 区域区分   0 =都支持  1：部分支持 页面没有指定不支持的选项
  static final String AREA_FLAG = "area_flag";

  /// 功能区区分   0 =都支持   1：部分支持 页面没有指定不支持的选项
  static final String FUNC_FLAG = "func_flag";

  /// 主键
  static final String CREATED_BY = "created_by";

  /// 酒店ID
  static final String CREATED_AT = "created_at";

  /// 打印机功能区关系ID
  static final String LAST_UPDATE_BY = "last_updated_by";

  /// 打印机ID
  static final String LAST_UPDATE_AT = "last_updated_at";



}
