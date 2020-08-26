import 'package:sqflite/sqflite.dart';

import '../../utils/DBUtil.dart';
import '../entity/Delivery.dart';
import '../entity/query/Query.dart';
import '../entity/PageDTO.dart';

class DeliveryMapper {
  ///批量保存订单
  Future<List> saveDeliverByBatch(List<Delivery> deliverys) async {
    List<Map<String, dynamic>> mapList = new List();
    List<Object> results = new List();
    if (deliverys.length > 0) {
      deliverys.forEach((delivery) {
        Map<String, dynamic> map = delivery.toMap();
        mapList.add(map);
      });

      Batch batch = DBUtil.getBatch();
      mapList.forEach((map) async {
        batch.insert(DBUtil.TABLE_DELIVERY, map);
      });
      results = await batch.commit();
    }
    return results;
  }

  ///保存单个
  Future<int> saveDelivery(Delivery delivery) async {
    return await DBUtil.insert(DBUtil.TABLE_DELIVERY, delivery.toMap());
  }

  ///根据Id查询订单
  Future<Delivery> getById(int id) async {
    Delivery delivery = new Delivery();
    List whereArgs = new List();
    whereArgs.add(id);
    List<Map<String, dynamic>> list = await DBUtil.queryList(
        DBUtil.TABLE_DELIVERY,
        where: "id=?",
        whereArgs: whereArgs);

    if (null != list && list.length > 0) {
      delivery.toObj(list[0]);
    }
    return delivery;
  }


  ///更新订单
  void updateDelivery(Delivery delivery, {List<Query>  querys}) async {

    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";
    await  DBUtil.update(DBUtil.TABLE_DELIVERY,delivery.toMap(),where: where, whereArgs: whereArgs);
  }

  ///删除订单
  void  deleteDelivery({List<Query>  querys}) async {
    String where = "";
    List<dynamic> whereArgs = new List();
    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where +=  query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";
    await  DBUtil.delete(DBUtil.TABLE_DELIVERY,where: where, whereArgs: whereArgs);
  }



  ///条件查询订单列表
  Future<List<Delivery>> findItems(List<Query> querys, PageDTO page,{String orderBy}) async {
    String where = "";
    List<dynamic> whereArgs = new List();

    if (null !=querys && querys.length > 0) {
      querys.forEach((query) {
        where += query.orgQuery(whereArgs, query);
      });
    }
    where += "1=1";

    List<Map> mapList = new List();
    if (null != page) {
      mapList = await DBUtil.queryList(DBUtil.TABLE_DELIVERY,
          where: where,
          whereArgs: whereArgs,
          orderBy: orderBy,
          limit: page.pageSize,
          offset: page.startIndex);
    } else {
      mapList = await DBUtil.queryList(DBUtil.TABLE_DELIVERY,
          where: where, whereArgs: whereArgs, orderBy: orderBy);
    }

    List<Delivery> deliveys = new List();
    if (null != mapList && mapList.length > 0) {
      mapList.forEach((map) {
        Delivery delivery = new Delivery();
        delivery.toObj(map);
        deliveys.add(delivery);
      });
    }
    return deliveys;
  }
}
