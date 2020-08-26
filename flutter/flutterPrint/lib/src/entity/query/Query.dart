class Query {
  Query(this._column, this._where, this._data);

  ///字段
  String _column;

  ///对比（比如  = ，  >=，   <=，   >，  <，like )，暂不支持（in between  exist等列表类查询）
  String _where;

  ///实际数据
  Object _data;

  String get column => _column;

  set column(String value) {
    _column = value;
  }

  String get where => _where;

  Object get data => _data;

  set data(Object value) {
    _data = value;
  }

  set where(String value) {
    _where = value;
  }

  String orgQuery(List<dynamic> whereArgs, Query query) {
    String   whereStr ="";
    if (query.where == "like") {
      whereStr += (query.column + query.where + "%"+query.data+"%  and");
    } else {
      whereStr += (query.column + query.where + "? and ");
      whereArgs.add(query.data);
    }

    return whereStr;
  }
}
