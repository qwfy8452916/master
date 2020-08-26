import 'PrinterCategory.dart';
import 'PrinterFuncProduct.dart';

class PrinterFunc  {
  ///主键
  int _id;

  ///酒店Id
  int _hotelId;

  ///打印机ID
  int _printerId;

  ///功能区ID
  int _funcId;

  ///功能区名
  String _funcName;

  ///市场分类关系：0=都支持，1=部分支持  页面没有指定不支持的选项
  int _categoryFlag;

  ///功能区商品关系：0=都支持，1=部分支持 2=部分不支持
  int _funcProdFlag;

  ///市场分类关系
  List<PrinterCategory>   _pCategorys;
  ///商品关系
  List<PrinterFuncProduct>   _pfProds;

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map();
    if(null != id){
      map["id"] = id;
    }
    if(null != hotelId){
      map["hotel_id"] = hotelId;
    }
    if(null != printerId){
      map["printer_id"] = printerId;
    }
    if(null != funcId){
      map["func_id"] = funcId;
    }
    if(null != funcName){
      map["func_name"] = funcName;
    }
    if(null != categoryFlag){
      map["category_flag"] = categoryFlag;
    }
    if(null != funcProdFlag){
      map["func_prod_flag"] = funcProdFlag;
    }
    return map;
  }

  void toObj(Map<String, dynamic> map) {
   id = map["id"];
   hotelId = map["hotel_id"];
   printerId = map["printer_id"];
   funcId = int.parse(map["func_id"]);
   funcName = map["func_name"];
   categoryFlag = map["category_flag"];
   funcProdFlag = map["func_prod_flag"];
  }

  int get funcProdFlag => _funcProdFlag;

  set funcProdFlag(int value) {
    _funcProdFlag = value;
  }

  int get categoryFlag => _categoryFlag;

  set categoryFlag(int value) {
    _categoryFlag = value;
  }

  String get funcName => _funcName;

  set funcName(String value) {
    _funcName = value;
  }

  int get funcId => _funcId;

  set funcId(int value) {
    _funcId = value;
  }

  int get printerId => _printerId;

  set printerId(int value) {
    _printerId = value;
  }

  int get hotelId => _hotelId;

  set hotelId(int value) {
    _hotelId = value;
  }

  int get id => _id;

  set id(int value) {
    _id = value;
  }

  List<PrinterFuncProduct> get pfProds => _pfProds;

  set pfProds(List<PrinterFuncProduct> value) {
    _pfProds = value;
  }

  List<PrinterCategory> get pCategorys => _pCategorys;

  set pCategorys(List<PrinterCategory> value) {
    _pCategorys = value;
  }


  /// 主键
  static final String ID = "id";

  /// 酒店ID
  static final String HOTEL_ID = "hotel_id";

  ///打印机ID
  static final String PRINTER_ID = "printer_id";

  ///功能区ID
  static final String FUNC_ID = "func_id";

  ///功能区名
  static final String FUNC_NAME = "func_name";

  ///市场分类关系：0=都支持，1=部分支持  页面没有指定不支持的选项
  static final String CATEGORY_FLAG = "category_flag";

  ///功能区商品关系：0=都支持，1=部分支持 页面没有指定不支持的选项
  static final String FUNC_PROD_FLAG = "func_prod_flag";


  ///其他属性
  ///是否展示全部
  bool  _isShowAll  = false;
  ///商品关系
  List<PrinterFuncProduct>   _subPfProds = new  List();

  bool get isShowAll => _isShowAll;

  set isShowAll(bool value) {
    _isShowAll = value;
  }

  List<PrinterFuncProduct> get subPfProds => _subPfProds;

  set subPfProds(List<PrinterFuncProduct> value) {
    _subPfProds = value;
  }


}
