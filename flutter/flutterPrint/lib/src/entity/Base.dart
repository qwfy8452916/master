class Base {
  ///创建人
  String _createdBy;

  ///创建时间戳
  String _createdAt;

  ///更新人
  String _lastUpdatedBy;

  ///更新时间时间戳
  String _lastUpdatedAt;

  String get createdBy => _createdBy;

  set createdBy(String value) {
    _createdBy = value;
  }

  String get createdAt => _createdAt;

  String get lastUpdatedAt => _lastUpdatedAt;

  set lastUpdatedAt(String value) {
    _lastUpdatedAt = value;
  }

  String get lastUpdatedBy => _lastUpdatedBy;

  set lastUpdatedBy(String value) {
    _lastUpdatedBy = value;
  }

  set createdAt(String value) {
    _createdAt = value;
  }

  //给数据库为时间戳
  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map();

    if(null  !=createdBy  ){
      map["created_by"] = createdBy;
    }
    if(null  !=createdAt  &&  "" !=  createdAt ){
      map["created_at"] = DateTime.parse(createdAt).millisecondsSinceEpoch;
    }
    if(null  !=lastUpdatedBy  ){
      map["last_updated_by"] = lastUpdatedBy;
    }
    if(null  !=lastUpdatedAt &&  "" !=  lastUpdatedAt ){
      map["last_updated_at"] = DateTime.parse(lastUpdatedAt).millisecondsSinceEpoch;
    }
    return map;
  }

}
