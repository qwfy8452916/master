
import '../entity/Printer.dart';
import '../entity/query/Query.dart';
import '../../utils/DBUtil.dart';
import '../entity/PageDTO.dart';

class PrinterMapper {

  ///保存单个
  Future<int> savePrinter(Printer printer) async {
    return await DBUtil.insert(DBUtil.TABLE_PRINTER, printer.toMap());
  }

  ///根据Id查询打印机
  Future<Printer> getById(int id) async {
    Printer printer = new Printer();
    List whereArgs = new List();
    whereArgs.add(id);
    List<Map<String, dynamic>> list = await DBUtil.queryList(DBUtil.TABLE_PRINTER, where: "id=?",whereArgs: whereArgs);

    if (null != list && list.length > 0) {
      printer.toObj(list[0]);
    }
    return printer;
  }

  ///根据Id删除打印机
  void  deletePrinter(int  id) async {
    List whereArgs = new List();
    whereArgs.add(id);
    await  DBUtil.delete(DBUtil.TABLE_PRINTER,where: "id=?",whereArgs: whereArgs );
  }


  ///更新打印机
  void  updatePrinter(Printer printer, {List<Query>  querys}) async {

    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";
    await  DBUtil.update(DBUtil.TABLE_PRINTER,printer.toMap(),where: where, whereArgs: whereArgs);
  }



  ///条件查询订单列表
  Future<List<Printer>> findItems(List<Query>  querys, PageDTO page,{String orderBy}) async {

    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";

    List<Map> mapList = new List();
    if (null != page) {
      mapList = await DBUtil.queryList(DBUtil.TABLE_PRINTER,
          where: where,
          whereArgs: whereArgs,
          orderBy: orderBy,
          limit:page.pageSize,
          offset: page.startIndex);
    } else {
      mapList = await DBUtil.queryList(DBUtil.TABLE_PRINTER, where: where, whereArgs: whereArgs,orderBy: orderBy);
    }

    List<Printer> printers = new List();
    if (null != mapList && mapList.length > 0) {
      mapList.forEach((map) {
        Printer printer = new Printer();
        printer.toObj(map);
        printers.add(printer);
      });
    }

    return printers;
  }


}
