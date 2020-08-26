import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import '../common/Sqls.dart';

class DBUtil {

  //DB
  static const String DB_NAME = "printer.db";

  //打印机表
  static const String TABLE_TEMPLATE = "template";

  //打印机表
  static const String TABLE_PRINTER = "printer";

  //打印机功能区关系表
  static const String TABLE_PRINTER_FUNC = "printer_func";

  //打印机市场分类关系表
  static const String TABLE_PRINTER_CATEGORY = "printer_category";

  //打印机功能区商品表
  static const String TABLE_PRINTER_FUNC_PRODUCT = "printer_func_product";

  //配送单表
  static const String TABLE_DELIVERY = "delivery";

  //配送单详情表
  static const String TABLE_DELIVERY_DETAIL = "delivery_detail";

  static Database db;
  static String dbPath;

  ///打开DB
  static openDB({Function doOpen}) async {
    String databasePath = await getDatabasesPath();
    dbPath = join(databasePath, DB_NAME);
    print('数据库存储路径path:' + dbPath);
    try {
      db = await openDatabase(dbPath);
    } catch (e) {
      print('DBUtil open() Error $e');
    }
  }

  ///关闭数据库
  static closeDB() async {
    await db.close();
  }

  ///数据库初始化（有一个change_log表保存数据库变动的记录）
  static void init() async {

    //所有sql
    Map<String,String> allSqls =  Sqls.getAllSqls();

    //移除已经执行过的sql
    List changeLogTable = await db.rawQuery('SELECT name FROM sqlite_master WHERE type = "table" and  name="change_log"');
    if (changeLogTable.length > 0) {
      //说明change_log表已经存在

      //然后去查change_log变动的日志
      List changeLogList = await db.rawQuery('SELECT name FROM change_log');

      if(changeLogList.length>0){
        List<String>   changeNames = new List();
        //如果sql变动已经存在
        changeLogList.forEach((element) {
          element.forEach((key, value) {
            changeNames.add(value as String);
          });
        });

        if(changeNames.length>0){
          changeNames.forEach((name) {
            //移除掉所有已经做过变动sql
            allSqls.remove(name);
          });
        }
      }
    }else{
      await db.execute(Sqls.createTableSql_Change_log);
    }

    ///执行sql
    if(allSqls.length>0){
      for(String  key in  allSqls.keys){
        await db.execute(allSqls[key]);
        await db.execute( "INSERT INTO change_log (name) values ('$key');");
      }
    }

  }

  ///sql助手插入 @tableName:表名  @paramters：参数map(字段名必须与表名一样)
  static Future<int> insert(String tableName, Map<String, Object> paramters) async {
    return await db.insert(tableName, paramters);
  }

  ///sql助手查找列表  @tableName:表名  @selects 查询的字段数组 @wheres 条件，如：'uid=? and fuid=?' @whereArgs 参数数组
  static Future<List<Map>> queryList(String tableName,{List<String> selects,String where,List whereArgs,String orderBy,int limit,int offset}) async {
    //调用样例：await dbUtil.queryListByHelper('relation', ['id','uid','fuid'], 'uid=? and fuid=?', [6,1]);
    List<Map> maps = await db.query(tableName,
        columns: selects,
        where: where,
        whereArgs: whereArgs,
        orderBy: orderBy,
        limit: limit,
        offset: offset);
     print("($tableName)查询 ${(null!= maps)?maps.length:0}");
    return maps;
  }

  ///sql助手修改
  static Future<int> update(String tableName, Map<String, Object> setArgs,
      {String where, List whereArgs}) async {
    //样例：
    //Map<String,Object> par = Map<String,Object>();
    //par['fuid'] = 1;
    //dbUtil.updateByHelper('relation', par, 'type=? and uid=?', [0,5]);
    return  await db.update(tableName, setArgs, where: where, whereArgs: whereArgs);
  }

  ///sql助手删除   刪除全部whereStr和whereArgs传null
  static Future<int> delete(String tableName,{String where, List whereArgs}) async {

    return   await db.delete(tableName, where: where, whereArgs: whereArgs);
  }

  ///获取Batch对象，用于执行sql批处理
  static Batch getBatch()  {
    //调用样例
    //  Batch batch = await DBUtil().getBatch();
    //  batch.insert('Test', {'name': 'item'});
    //  batch.update('Test', {'name': 'new_item'}, where: 'name = ?', whereArgs: ['item']);
    //  batch.delete('Test', where: 'name = ?', whereArgs: ['item']);
    //  List<Object> results = await batch.commit();  //返回的是id数组
    //                         //batch.commit(noResult: true);//noResult: true不关心返回结果，性能高
    //                         //batch.commit(continueOnError: true)//continueOnError: true  忽略错误，错误可继续执行
    return  db.batch();
  }

  ///事务控制
  Future<dynamic> transaction(Future<dynamic> Function(Transaction txn) action) async {
    //调用样例
    //  try {
    //     await dbUtil.transaction((txn) async {
    //        Map<String,Object> par = Map<String,Object>();
    //        par['uid'] = Random().nextInt(10); par['fuid'] = Random().nextInt(10);
    //        par['type'] = Random().nextInt(2); par['id'] = 1;
    //        var a = await txn.insert('relation', par);
    //        var b = await txn.insert('relation', par);
    //   });
    //   } catch (e) {
    //     print('sql异常:$e');
    //   }
    return await db.transaction(action);
  }
}
