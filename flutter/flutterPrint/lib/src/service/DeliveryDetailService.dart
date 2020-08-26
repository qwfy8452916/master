import '../entity/DeliveryDetail.dart';
import '../entity/query/Query.dart';
import '../mapper/DeliveryDetailMapper.dart';

class DeliveryDetailService {
  DeliveryDetailMapper _detailMapper = new DeliveryDetailMapper();

  ///批量保存订单详情
  Future<List<DeliveryDetail>> findItemsByDeliveryId(int deliveryId) async {

    List<Query> detailQuerys = new List();
    detailQuerys.add(Query(DeliveryDetail.DELIVERY_ID, "=", deliveryId));

    return  await _detailMapper.findItems(detailQuerys);
  }


  ///更新订单详情状态
  void updDetailPrintState(int id,int state) async {

    List<Query> detailQuerys = new List();
    detailQuerys.add(Query(DeliveryDetail.ID, "=", id));

    DeliveryDetail updDetail = new DeliveryDetail();
    updDetail.printState = state;

    _detailMapper.updateDetail(updDetail,querys:detailQuerys);
  }


}
