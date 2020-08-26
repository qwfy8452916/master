
import '../../utils/DBUtil.dart';
import '../entity/PrinterFunc.dart';
import '../entity/query/Query.dart';

class PrinterFuncMapper {

  ///保存单个
  Future<int> savePrinterFunc(PrinterFunc pf) async {
    return await DBUtil.insert(DBUtil.TABLE_PRINTER_FUNC, pf.toMap());
  }

  ///根据打印机Id删除关系
  void deleteRelationByPrinterId(int printerId) async{
    List whereArgs = new List();
    whereArgs.add(printerId);
    await  DBUtil.delete(DBUtil.TABLE_PRINTER_FUNC,where: "printer_id=?",whereArgs: whereArgs );
  }


  ///条件查询订单列表
  Future<List<PrinterFunc>> findItems(List<Query>  querys) async {

    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";

    List<Map> mapList = await DBUtil.queryList(DBUtil.TABLE_PRINTER_FUNC, where: where, whereArgs: whereArgs,orderBy: PrinterFunc.ID);

    List<PrinterFunc> pfs = new List();
    if (null != mapList && mapList.length > 0) {
      mapList.forEach((map) {
        PrinterFunc pf = new PrinterFunc();
        pf.toObj(map);
        pfs.add(pf);
      });
    }

    return pfs;
  }


}
