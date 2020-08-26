class Template {
  int _id;
  String _name;
  int _paperSize;
  String _tmpContent;

  Map<String, dynamic> toMap() {
    Map<String, dynamic> map = new Map();
    if(null !=  id){
      map["id"] = id;
    }
    if(null !=  name){
      map["name"] = name;
    }
    if(null !=  paperSize){
      map["paper_size"] = paperSize;
    }
    if(null !=  tmpContent){
      map["tmp_content"] = tmpContent;
    }
    return map;
  }

  void toObj(Map<String, dynamic> map) {
    id = map["id"];
    name = map["name"];
    paperSize = map["paper_size"];
    tmpContent = map["tmp_content"];
  }



  int get id => _id;

  set id(int value) {
    _id = value;
  }

  String get name => _name;

  String get tmpContent => _tmpContent;

  set tmpContent(String value) {
    _tmpContent = value;
  }

  int get paperSize => _paperSize;

  set paperSize(int value) {
    _paperSize = value;
  }

  set name(String value) {
    _name = value;
  }


  /// 主键
  static final String ID = "id";

  /// 打印机名
  static final String NAME = "name";

  /// 纸张大小(毫米)
  static final String PAPER_SIZE = "paper_size";

  /// 模板内容
  static final String TMP_CONTENT = "tmp_content";


}
