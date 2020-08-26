
import 'package:sqflite/sqflite.dart';

import '../../utils/DBUtil.dart';
import '../entity/PrinterFuncProduct.dart';
import '../entity/query/Query.dart';

class PrinterFuncProductMapper {


  ///批量保存订单详情
  Future<List> savePrinterFuncProductsByBatch(List<PrinterFuncProduct> pfps) async {
    List<Map<String, dynamic>> mapList = new List();

    List<Object> results = new List();

    if (pfps.length > 0) {
      pfps.forEach((pfp) {
        Map<String, dynamic> map = pfp.toMap();
        mapList.add(map);
      });

      Batch batch = DBUtil.getBatch();
      mapList.forEach((map) async {
        batch.insert(DBUtil.TABLE_PRINTER_FUNC_PRODUCT, map);
      });
      results = await batch.commit();

    }
    return results;
  }


  ///根据打印机Id删除关系
  void deleteRelationByPrinterId(int printerId) async{
    List whereArgs = new List();
    whereArgs.add(printerId);
    await  DBUtil.delete(DBUtil.TABLE_PRINTER_FUNC_PRODUCT,where: "printer_id=?",whereArgs: whereArgs );
  }


  ///条件查询订单列表
  Future<List<PrinterFuncProduct>> findItems(List<Query>  querys) async {

    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery( whereArgs, query);
      });
    }
    where += "1=1";

    List<Map> mapList = await DBUtil.queryList(DBUtil.TABLE_PRINTER_FUNC_PRODUCT, where: where, whereArgs: whereArgs,orderBy:PrinterFuncProduct.ID );

    List<PrinterFuncProduct> pfps = new List();
    if (null != mapList && mapList.length > 0) {
      mapList.forEach((map) {
        PrinterFuncProduct pfp = new PrinterFuncProduct();
        pfp.toObj(map);
        pfps.add(pfp);
      });
    }

    return pfps;
  }



}
