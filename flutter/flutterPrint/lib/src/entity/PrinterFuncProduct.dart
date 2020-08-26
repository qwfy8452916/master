class PrinterFuncProduct  {
  /// 主键
  int _id;

  /// 酒店ID
  int _hotelId;

  /// 打印机功能区关系ID
  int _printerFuncId;

  /// 打印机ID
  int _printerId;

  /// 功能区商品ID
  int _funcProdId;

  /// 商品名
  String _prodShowName;

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map();
    if(null != id){
      map["id"] = id;
    }
    if(null != hotelId){
      map["hotel_id"] = hotelId;
    }
    if(null !=printerFuncId){
      map["printer_func_id"] = printerFuncId;
    }
    if(null != printerId){
      map["printer_id"] = printerId;
    }
    if(null != funcProdId){
      map["func_prod_id"] = funcProdId;
    }
    if(null != prodShowName){
      map["prod_show_name"] = prodShowName;
    }
    return map;
  }

  void toObj(Map<String, dynamic> map) {
    id = map["id"];
    hotelId = map["hotel_id"];
    printerFuncId = map["printer_func_id"];
    printerId = map["printer_id"];
    funcProdId = map["func_prod_id"];
    prodShowName = map["prod_show_name"];
  }

  String get prodShowName => _prodShowName;

  set prodShowName(String value) {
    _prodShowName = value;
  }

  int get funcProdId => _funcProdId;

  set funcProdId(int value) {
    _funcProdId = value;
  }

  int get printerId => _printerId;

  set printerId(int value) {
    _printerId = value;
  }

  int get printerFuncId => _printerFuncId;

  set printerFuncId(int value) {
    _printerFuncId = value;
  }

  int get hotelId => _hotelId;

  set hotelId(int value) {
    _hotelId = value;
  }

  int get id => _id;

  set id(int value) {
    _id = value;
  }

  /// 主键
  static final String ID = "id";

  /// 酒店ID
  static final String HOTEL_ID = "hotel_id";

  /// 打印机功能区关系ID
  static final String PRINTER_FUNC_ID = "printer_func_id";

  /// 打印机ID
  static final String PRINTER_ID = "printer_id";

  /// 市场分类ID
  static final String FUNC_PROD_ID = "func_prod_id";

  /// 市场分类名
  static final String PROD_SHOW_NAME = "prod_show_name";
}
