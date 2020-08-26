import '../entity/Template.dart';
import '../../utils/DBUtil.dart';
import '../entity/query/Query.dart';

class TemplateMapper {
  ///根据Id查询订单
  Future<Template> getById(int id) async {
    Template tmp = new Template();
    List whereArgs = new List();
    whereArgs.add(id);
    List<Map<String, dynamic>> list = await DBUtil.queryList(
        DBUtil.TABLE_TEMPLATE,
        where: "id=?",
        whereArgs: whereArgs);

    if (null != list && list.length > 0) {
      tmp.toObj(list[0]);
    }
    return tmp;
  }

  ///条件查询订单列表
  Future<List<Template>> findItems(List<Query> querys) async {
    String where = "";
    List<dynamic> whereArgs = new List();

    if (null != querys && querys.length > 0) {
      querys.forEach((query) {
        where += query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";

    List<Map> mapList =  await DBUtil.queryList(DBUtil.TABLE_TEMPLATE,where: where, whereArgs: whereArgs, orderBy: Template.ID );

    List<Template> tmps = new List();
    if (null != mapList && mapList.length > 0) {
      mapList.forEach((map) {
        Template tmp = new Template();
        tmp.toObj(map);
        tmps.add(tmp);
      });
    }
    return tmps;
  }
}
