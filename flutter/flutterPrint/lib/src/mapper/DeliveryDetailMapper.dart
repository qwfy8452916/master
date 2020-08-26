import 'package:sqflite/sqflite.dart';

import '../../utils/DBUtil.dart';
import '../entity/DeliveryDetail.dart';
import '../entity/query/Query.dart';

class DeliveryDetailMapper {
  ///批量保存订单详情
  Future<List> saveDetailsByBatch(List<DeliveryDetail> details) async {
    List<Map<String, dynamic>> mapList = new List();

    List<Object> results = new List();

    if (details.length > 0) {
      details.forEach((detail) {
        Map<String, dynamic> map = detail.toMap();
        mapList.add(map);
      });

      Batch batch = DBUtil.getBatch();
      mapList.forEach((map) async {
        batch.insert(DBUtil.TABLE_DELIVERY_DETAIL, map);
      });
      results = await batch.commit();
    }
    return results;
  }



  ///更新订单
  void  updateDetail(DeliveryDetail detail, {List<Query>  querys}) async {

    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";
    await  DBUtil.update(DBUtil.TABLE_DELIVERY_DETAIL,detail.toMap(),where: where, whereArgs: whereArgs);
  }


  ///删除订单
  void  deleteDetail({List<Query>  querys}) async {
    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";
    await  DBUtil.delete(DBUtil.TABLE_DELIVERY_DETAIL,where: where, whereArgs: whereArgs);
  }




  ///条件查询订单列表
  Future<List<DeliveryDetail>> findItems(List<Query> querys) async {
    String where = "";
    List<dynamic> whereArgs = new List();

    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery( whereArgs, query);
      });
    }
    where += "1=1";

    List<Map> mapList = await DBUtil.queryList(DBUtil.TABLE_DELIVERY_DETAIL, where: where, whereArgs: whereArgs,orderBy: DeliveryDetail.ID);

    List<DeliveryDetail> details = new List();
    if (null != mapList && mapList.length > 0) {
      mapList.forEach((map) {
        DeliveryDetail detail = new DeliveryDetail();
        detail.toObj(map);
        details.add(detail);
      });
    }

    return details;
  }
}
