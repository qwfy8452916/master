
class PrinterCategory {
  /// 主键
  int _id;

  /// 酒店ID
  int _hotelId;

  /// 打印机功能区关系ID
  int _printerFuncId;

  /// 打印机ID
  int _printerId;

  /// 市场分类ID
  int _categoryId;

  /// 市场分类名
  String _categoryName;

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map();

    if(null !=id){
      map["id"] = id;
    }
    if(null !=hotelId){
      map["hotel_id"] = hotelId;
    }
    if(null !=printerFuncId){
      map["printer_func_id"] = printerFuncId;
    }
    if(null !=printerId){
      map["printer_id"] = printerId;
    }
    if(null !=categoryId){
      map["category_id"] = categoryId;
    }
    if(null !=categoryName){
      map["category_name"] = categoryName;
    }

    return map;
  }

  void toObj(Map<String, dynamic> map) {
   id = map["id"];
   hotelId = map["hotel_id"];
   printerFuncId = map["printer_func_id"];
   printerId = map["printer_id"];
   categoryId = map["category_id"];
   categoryName = map["category_name"];
  }

  int get id => _id;

  set id(int value) {
    _id = value;
  }

  int get hotelId => _hotelId;

  set hotelId(int value) {
    _hotelId = value;
  }

  int get printerFuncId => _printerFuncId;

  String get categoryName => _categoryName;

  set categoryName(String value) {
    _categoryName = value;
  }

  int get categoryId => _categoryId;

  set categoryId(int value) {
    _categoryId = value;
  }

  int get printerId => _printerId;

  set printerId(int value) {
    _printerId = value;
  }

  set printerFuncId(int value) {
    _printerFuncId = value;
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
  static final String CATEGORY_ID = "category_id";

  /// 市场分类名
  static final String CATEGORY_NAME = "category_name";


}
