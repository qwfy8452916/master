import 'package:date_format/date_format.dart';

class DeliveryDetail {
  ///id
  int _id;

  ///配送单ID
  int _deliveryId;

  ///龙眼服务配送单ID
  int _serviceDeliveryId;

  ///龙眼服务配送单详情ID
  int _serviceDeliveryDetailId;

  ///	市场分类Id
  int _categoryId;

  ///	功能区商品Id
  int _funcProdId;

  ///商品显示名
  String _prodShowName;

  ///商品规格名
  String _prodSpecName;

  ///商品logo图
  String _prodLogoUrl;

  ///商品数量
  double _prodCount;

  ///商品价格
  double _prodPrice;

  ///打印状态 0 =未打印，1 =正在打印， 2=已打印，3=无需打印
  int _printState;

  ///打印时间
  String _printTime;

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map();
    if (null != id) {
      map["id"] = id;
    }
    if (null != deliveryId) {
      map["delivery_id"] = deliveryId;
    }
    if (null != serviceDeliveryId) {
      map["service_delivery_id"] = serviceDeliveryId;
    }
    if (null != serviceDeliveryDetailId) {
      map["service_delivery_detail_id"] = serviceDeliveryDetailId;
    }
    if (null != categoryId) {
      map["category_id"] = categoryId;
    }
    if (null != funcProdId) {
      map["func_prod_id"] = funcProdId;
    }
    if (null != prodShowName) {
      map["prod_show_name"] = prodShowName;
    }
    if (null != prodSpecName) {
      map["prod_spec_name"] = prodSpecName;
    }
    if (null != prodLogoUrl) {
      map["prod_logo_url"] = prodLogoUrl;
    }
    if (null != prodCount) {
      map["prod_count"] = prodCount;
    }
    if (null != prodPrice) {
      map["prod_price"] = prodPrice;
    }
    if (null != printState) {
      map["print_state"] = printState;
    }
    if (null != printTime && "" != printTime) {
      map["print_time"] = DateTime.parse(printTime).millisecondsSinceEpoch;
    }
    return map;
  }

  void toObj(Map<String, dynamic> map) {
    id = map["id"];
    deliveryId = map["delivery_id"];
    serviceDeliveryId = map["service_delivery_id"];
    serviceDeliveryDetailId = map["service_delivery_detail_id"];
    categoryId = map["category_id"];
    funcProdId = map["func_prod_id"];
    prodShowName = map["prod_show_name"];
    prodSpecName = map["prod_spec_name"] == null ? "" : map["prod_spec_name"];
    prodLogoUrl = map["prod_logo_url"];
    prodCount = map["prod_count"];
    prodPrice = map["prod_price"];
    printState = map["print_state"];
    printTime = formatDate( DateTime.fromMillisecondsSinceEpoch(map["print_time"]),[yyyy, '-', mm, '-', dd, " ", HH, ":", nn, ":", ss]);
  }

  int get id => _id;

  set id(int value) {
    _id = value;
  }

  int get deliveryId => _deliveryId;

  set deliveryId(int value) {
    _deliveryId = value;
  }

  int get serviceDeliveryId => _serviceDeliveryId;

  set serviceDeliveryId(int value) {
    _serviceDeliveryId = value;
  }

  int get serviceDeliveryDetailId => _serviceDeliveryDetailId;

  set serviceDeliveryDetailId(int value) {
    _serviceDeliveryDetailId = value;
  }

  int get categoryId => _categoryId;

  set categoryId(int value) {
    _categoryId = value;
  }

  int get funcProdId => _funcProdId;

  set funcProdId(int value) {
    _funcProdId = value;
  }

  String get prodShowName => _prodShowName;

  set prodShowName(String value) {
    _prodShowName = value;
  }

  String get prodSpecName =>  _prodSpecName;

  set prodSpecName(String value) {
    _prodSpecName = value;
  }

  String get prodLogoUrl => _prodLogoUrl;

  set prodLogoUrl(String value) {
    _prodLogoUrl = value;
  }

  double get prodCount => _prodCount;

  set prodCount(double value) {
    _prodCount = value;
  }

  double get prodPrice => _prodPrice;

  set prodPrice(double value) {
    _prodPrice = value;
  }

  int get printState => _printState;

  set printState(int value) {
    _printState = value;
  }

  String get printTime => _printTime;

  set printTime(String value) {
    _printTime = value;
  }

  ///id
  static final String ID = "id";

  ///配送单ID
  static final String DELIVERY_ID = "delivery_id";

  ///龙眼服务配送单ID
  static final String SERVICE_DELIVERY_ID = "service_delivery_id";

  ///龙眼服务配送单详情ID
  static final String SERVICE_DELIVERY_DETAIL_ID = "service_delivery_detail_id";

  ///	市场分类Id
  static final String CAYEGORY_ID = "category_id";

  ///	功能区商品Id
  static final String FUNC_PROD_ID = "func_prod_id";

  ///商品显示名
  static final String PROD_SHOW_NAME = "prod_show_name";

  ///商品规格名
  static final String PROD_SPEC_NAME = "prod_spec_name";

  ///商品logo图
  static final String PROD_LOGO_URL = "prod_logo_url";

  ///商品数量
  static final String PROD_URL = "prod_count";

  ///商品价格
  static final String PROD_PRICE = "prod_price";

  ///打印状态 0 =未打印，1 =正在打印， 2=已打印，3=无需打印
  static final String PRINT_STATE = "print_state";

  ///打印时间
  static final String PRINT_TIME = "print_time";
}
