
import 'package:sqflite/sqflite.dart';

import '../../utils/DBUtil.dart';
import '../entity/PrinterCategory.dart';
import '../entity/query/Query.dart';

class PrinterCategoryMapper  {

  ///批量保存打印机市场分类的关系
  Future<List> savePrinterCategorysByBatch(List<PrinterCategory> pcs) async {
    List<Map<String, dynamic>> mapList = new List();

    List<Object> results = new List();

    if (pcs.length > 0) {
      pcs.forEach((pc) {
        Map<String, dynamic> map = pc.toMap();
        mapList.add(map);
      });

      Batch batch = DBUtil.getBatch();
      mapList.forEach((map) async {
        batch.insert(DBUtil.TABLE_PRINTER_CATEGORY, map);
      });
      results = await batch.commit();
    }
    return results;
  }


  ///根据打印机Id删除关系
  void deleteRelationByPrinterId(int printerId) async{
    List whereArgs = new List();
    whereArgs.add(printerId);
    await  DBUtil.delete(DBUtil.TABLE_PRINTER_CATEGORY,where: "printer_id=?",whereArgs: whereArgs );
  }


  ///条件查询订单列表
  Future<List<PrinterCategory>> findItems(List<Query>  querys) async {

    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";

    List<Map> mapList = await DBUtil.queryList(DBUtil.TABLE_PRINTER_CATEGORY, where: where, whereArgs: whereArgs,orderBy: PrinterCategory.ID);

    List<PrinterCategory> pcs = new List();
    if (null != mapList && mapList.length > 0) {
      mapList.forEach((map) {
        PrinterCategory pc = new PrinterCategory();
        pc.toObj(map);
        pcs.add(pc);
      });
    }

    return pcs;
  }


}
