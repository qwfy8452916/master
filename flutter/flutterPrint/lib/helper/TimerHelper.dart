import 'dart:async';
import 'package:date_format/date_format.dart';
import '../src/service/PrintService.dart';
import '../common/Queues.dart';
import '../src/entity/Delivery.dart';
import '../src/entity/DeliveryDetail.dart';
import '../src/service/DeliveryService.dart';
import '../common/Api.dart';
import '../utils/HttpUtil.dart';

class TimerHelper {
  static Timer deliveryTimer;
  static Timer dealTimer;
  static Timer delDeliveryTimer;
  static DeliveryService _deliveryService = new DeliveryService();
  static PrintService _printService = new PrintService();

  ///获取订单列表
  static _getOrderDeliveryList() async {
    int time = 10;
    int deliveryId = 747;

    //先获取本地数据最大的配送单ID
    Delivery delivery = await _deliveryService.getMaxServiceIdDelivery();
    if (null != delivery) {
      deliveryId = delivery.serviceDeliveryId;
    }

    //每30秒跑一次
    Timer.periodic(Duration(seconds: 30), (timer) {
      deliveryTimer = timer;

      Timer(Duration(microseconds: time), () {
        //请求service获取配送单数据
        HttpUtil().get(
          Api.delivery,
          params: {
            'hotelId': Api.user.hotelId,
            'deliveryId': deliveryId,
          },
          onSuccess: (data) {
            print("${DateTime.now()} -- $data");
            //保存本地数据库
            //放入队列、
            if (data != null && data is List && data.length > 0) {
              //重置时间
              time = 10;
              List<Delivery> deliveryList = new List();

              int maxId = 0;
              data.forEach((value) {
                if (maxId < value['id']) {
                  maxId = value['id'];
                }
                Delivery delivery = new Delivery();
                delivery.serviceDeliveryId = value["id"];
                delivery.delivCode = value["serialNumber"];
                delivery.roomFloor = value["roomFloor"];
                delivery.roomCode = value["roomCode"];
                delivery.funcId = value["funcId"];
                delivery.funcName = value["funcName"];
                delivery.delivWay = value["delivWay"];
                delivery.prodCount = value["prodCount"];
                delivery.totalAmount = value["totalAmount"];
                delivery.isCancel = 0;
                delivery.orderTime = value["createdAt"];
                delivery.printState = 0;
                delivery.createdAt = formatDate(DateTime.now(),[yyyy, '-', mm, '-', dd, " ", HH, ":", nn, ":", ss]);
                delivery.lastUpdatedAt = formatDate(DateTime.now(),[yyyy, '-', mm, '-', dd, " ", HH, ":", nn, ":", ss]);

                //组织详情
                var details = value["orderDeliveryDetailDTOList"];
                if (details is List) {
                  List<DeliveryDetail> detailList = new List();
                  details.forEach((element) {
                    DeliveryDetail detail = new DeliveryDetail();
                    detail.serviceDeliveryId = element["orderDeliveryId"];
                    detail.serviceDeliveryDetailId = element["id"];
                    detail.categoryId = element["prodCategoryId"];
                    detail.funcProdId = element["funcProdId"];
                    detail.prodShowName =element["prodHotelProductDTO"]["prodShowName"];
                    detail.prodSpecName = element["prodSpecs"];
                    detail.prodLogoUrl =element["prodHotelProductDTO"]["prodLogoUrl"];
                    detail.prodCount = element["prodCount"];
                    detail.prodPrice = element["prodPrice"];
                    detail.printState = 0;
                    detail.printTime = '1970-01-01 00:00:00';
                    detailList.add(detail);
                  });
                  delivery.details = detailList;
                }
                deliveryList.add(delivery);
              });

              //保存业务数据
              _deliveryService.saveDeliverByBatch(deliveryList).then((results) => {
                        if (results != null &&results is List &&results.length > 0){
                            results.forEach((value) {
                              String printInfo = value.toString()+":"+ 0.toString() + ":" +0.toString();
                              Queues.deliveryQueue.addLast(printInfo);
                            })
                          }
                      });

              deliveryId  =maxId;
            } else {
              //延迟30秒
              time = 30000;
            }
          },
        );
      });
    });
  }

  ///处理订单
  static _dealOrderDeliveryList() {
    Timer.periodic(Duration(seconds: 2), (timer) {
      dealTimer = timer;
      //请求service获取配送单数据
      if (Queues.deliveryQueue.isNotEmpty) {
        print("当前队列里的数据 （${Queues.deliveryQueue}）" );
        String printInfo = Queues.deliveryQueue.first;
        Queues.deliveryQueue.removeFirst();
        _printService.dealDelivery(printInfo);
      }
    });
  }

  ///删除一周前的订单
  static _delBeforeOneWeekDelivery() {
    Timer.periodic(Duration(hours: 2), (timer) {
      delDeliveryTimer = timer;
      //请求service获取配送单数据
      //删除一周前的订单
      _deliveryService.deleteWeekAgoDeliverys();
    });
  }

  ///启动定时器
  static void startTimer() {

    if(null == deliveryTimer){
      //启动拉去订单
      _getOrderDeliveryList();
    }
    if(null == dealTimer){
      //启动处理订单
      _dealOrderDeliveryList();
    }
    if(null == delDeliveryTimer){
      //启动的删除订单
      _delBeforeOneWeekDelivery();
    }

  }

  ///关闭定时器
  static void closeTimer()  async{
    //关闭获取的定时器
    if (null != deliveryTimer) {
      deliveryTimer.cancel();
      deliveryTimer = null;
    }

    //关闭处理配送单定时器
    if (null != dealTimer) {
      dealTimer.cancel();
      dealTimer = null;
    }

    //关闭处理配送单定时器
    if (null != delDeliveryTimer) {
      delDeliveryTimer.cancel();
      delDeliveryTimer = null;
    }

    //清空对列
    Queues.deliveryQueue.clear();
  }
}
