import '../entity/Delivery.dart';
import '../entity/DeliveryDetail.dart';
import '../entity/PageDTO.dart';
import '../entity/query/Query.dart';
import '../mapper/DeliveryDetailMapper.dart';
import '../mapper/DeliveryMapper.dart';

class DeliveryService {
  DeliveryMapper _deliveryMapper = new DeliveryMapper();
  DeliveryDetailMapper _detailMapper = new DeliveryDetailMapper();

  ///批量保存订单
  Future<List<int>> saveDeliverByBatch(List<Delivery> deliverys) async {
    List<int> deliveryIds = new List();
    for (Delivery delivery in deliverys) {
      int deliveryId = await _deliveryMapper.saveDelivery(delivery);
      deliveryIds.add(deliveryId);

      //批量保存详情
      List<DeliveryDetail> details = delivery.details;
      for (DeliveryDetail detail in details) {
        detail.deliveryId = deliveryId;
      }
      await _detailMapper.saveDetailsByBatch(details);
    }
    return deliveryIds;
  }

  ///根据Id查询订单
  Future<Delivery> getById(int id) async {
    Delivery delivery = await _deliveryMapper.getById(id);
    //查寻条件
    List<Query> detailQuerys = new List();
    detailQuerys.add(Query(DeliveryDetail.DELIVERY_ID, "=", id));

    List<DeliveryDetail> details =await _detailMapper.findItems(detailQuerys);
    delivery.details = details;
    return delivery;
  }


  ///更新订单打印状态状态
  void updDeliveryPrintState(int id,int state) async {

    List<Query> deliveryQuerys = new List();
    deliveryQuerys.add(Query(Delivery.ID, "=", id));

    Delivery updDelivery = new Delivery();
    updDelivery.printState = state;
    _deliveryMapper.updateDelivery(updDelivery,querys:deliveryQuerys);
  }


  ///查询服务ID最大配送单
  Future<Delivery> getMaxServiceIdDelivery() async {
    PageDTO  page = new PageDTO();
    page.pageNo =1;
    page.pageSize =1;

    List<Delivery> deliverys = await _deliveryMapper.findItems(null,page,orderBy:Delivery.SERVICE_DELIVERY_ID + " desc");

    Delivery  delivery;
    if(null !=  deliverys &&  deliverys.length>0){
      delivery = deliverys[0];
    }
    return delivery;
  }


  ///根据页面条件查询配送单
  Future<List<Delivery>> findSearchOrderForPage(String area,String code,String orderTimeStart,String orderTimeEnd) async {
    List<Query> querys = new List();
    //区域
    if ( null != area && area.isNotEmpty) {
      querys.add(Query(Delivery.ROOM_FLOOR, "like", area));
    }

    //单号
    if (null != code && code.isNotEmpty) {
      querys.add(Query(Delivery.DELIV_CODE, "like", code));
    }

    //下单时间区间
    if (null  != orderTimeStart &&    orderTimeStart.isNotEmpty &&  null  != orderTimeEnd && orderTimeEnd.isNotEmpty) {
      querys.add(Query(Delivery.ORDER_TIME, ">=",DateTime.parse(orderTimeStart).millisecondsSinceEpoch));
      querys.add(Query(Delivery.ORDER_TIME, "<",DateTime.parse(orderTimeEnd).add(Duration(days: 1)).millisecondsSinceEpoch));
    }

    return  await _deliveryMapper.findItems(querys, null, orderBy: Delivery.ID+" desc");
  }


  ///查询主页面订单
  Future<List<Delivery>> findOrderForPage(PageDTO page) async {
    List<Query> querys = new List();
    DateTime  now = DateTime.now();
    querys.add(Query(Delivery.ORDER_TIME, ">=", DateTime(now.year,now.month,now.day).millisecondsSinceEpoch));
    querys.add(Query(Delivery.ORDER_TIME, "<",DateTime(now.year,now.month,now.day).add(Duration(days: 1)).millisecondsSinceEpoch));
     return  await _deliveryMapper.findItems(querys, page, orderBy: Delivery.ID+" desc");
  }


  ///删除一周前的配送单
  void deleteWeekAgoDeliverys() async{

    List<Query> deliveryquerys = new List();
    deliveryquerys.add(Query(Delivery.ORDER_TIME, "<=", DateTime.now().add(Duration(days: -7)).millisecondsSinceEpoch));
    List<Delivery> deliverys = await _deliveryMapper.findItems(deliveryquerys,null);

    if(deliverys.length>0){
      //根据DeliveryId删除详情
      for(Delivery delivery in deliverys){
        List<Query> detailquerys = new List();
        detailquerys.add(Query(DeliveryDetail.DELIVERY_ID, "=", delivery.id));
         _detailMapper.deleteDetail(querys: detailquerys);
      }
       _deliveryMapper.deleteDelivery(querys: deliveryquerys);
    }

  }

}
