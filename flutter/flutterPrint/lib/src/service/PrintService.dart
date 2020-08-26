import 'dart:io';
import 'package:date_format/date_format.dart';
import '../../common/Queues.dart';
import '../../helper/PrinterLocker.dart';
import '../../helper/TemplateHelper.dart';
import '../../helper/ToBytesHelper.dart';
import '../../helper/WIFISocketHelper.dart';
import '../entity/Delivery.dart';
import '../entity/DeliveryDetail.dart';
import '../entity/Printer.dart';
import '../entity/PrinterFunc.dart';
import 'DeliveryDetailService.dart';
import 'DeliveryService.dart';
import 'PrinterServce.dart';

class PrintService {
  DeliveryService _deliveryService = new DeliveryService();
  DeliveryDetailService _detailService = new DeliveryDetailService();
  PrinterService _printerService = new PrinterService();

  ///匹配订单与打印机
  void dealDelivery(String printInfo, {Function onError}) async {
    List<String> printerInfoArr = printInfo.split(":");
    int deliveryId = int.parse(printerInfoArr[0]); //配送单Id

    if (deliveryId == 0) {
      int printerId =int.parse( printerInfoArr[1]); //打印机Id  （一般情况下为0）

      //打印测试，直接推送
      try {
        printTest(printerId);
      } catch (e) {
        print(e);
      }
      return;
    }

    int detailId = int.parse(printerInfoArr[1]); //订单详情Id  （一般情况下为0）
    int isAgain = int.parse(printerInfoArr[2]); //是否重新打印 （一般情况下为0）

    try {
      if (isAgain == 0) {
        //进来更新订单的状态  正在打印
        _deliveryService.updDeliveryPrintState(deliveryId, 1);
      }

      //根据deliveryId查出配送单的详情
      Delivery delivery = await _deliveryService.getById(deliveryId);

      //获取所有正在工作且在工作时间的打印机
      List<Printer> printers = await _printerService.findWorkingPrinters(delivery.orderTime);
      if (printers.length <= 0) {
        if (null != onError) {
          onError("未找到正在工作的打印机");
        }
        return;
      }

      if (isAgain == 0) {
        //如果不是重新打印，则移除已经打印过的商品
        List<DeliveryDetail> unPrintDetails = new List();

        for (DeliveryDetail detail in delivery.details) {
          if (detail.printState == 0) {
            unPrintDetails.add(detail);
          }
        }

        if (unPrintDetails.length > 0) {
          delivery.details = unPrintDetails;
        } else {
          //更新订单的状态   打印完成
          _deliveryService.updDeliveryPrintState(deliveryId, 2);
          return;
        }
      }

      //根据detailId控制具体商品还是全部商品
      if (detailId > 0) {
        //如果详情Id>0,表示打印具体的商品
        List<DeliveryDetail> details = delivery.details;
        DeliveryDetail detail = details.firstWhere((e) => e.id == detailId);

        //将delivery下的details配置成具体详情
        List<DeliveryDetail> newDetails = new List();
        newDetails.add(detail);
        delivery.totalAmount = detail.prodCount*detail.prodPrice;
        delivery.prodCount = detail.prodCount;
        delivery.details = newDetails;
      }

      //先找到支持当前配送单功能区的打印机
      List<Printer> supportFuncPrinters = new List();

      for (Printer printer in printers) {
        //全部gnq支持
        if (printer.funcFlag == 0) {
          supportFuncPrinters.add(printer);
        }

        //部分gnq支持
        if (printer.funcFlag == 1) {
          List<int> funcIds = printer.pfuncs.map((e) => e.funcId).toList();
          if (funcIds.contains(delivery.funcId)) {
            supportFuncPrinters.add(printer);
          }
        }
      }

      if (supportFuncPrinters.length <= 0) {
        onError("未找到支持当前配送单所在功能区的打印机");
        return;
      }

      //没有打印机支持商品详情
      List<DeliveryDetail> noPrinterSupportDetail = new List();

      //根据打印机分割配送单 (此配送单的大体信息一样，但是里面details不一样)
      Map<Printer, Delivery> deliveryGroupByFcp = new Map();
      for (Printer printer in supportFuncPrinters) {
        //全部支持的情况下，配送单数据不变
        if (printer.funcFlag == 0) {
          deliveryGroupByFcp[printer] = delivery;
        }

        //部分支持的情况下，配送单的数据可能回变化（详情商品可能比原来数据少）
        if (printer.funcFlag == 1) {
          //新商品详情
          List<DeliveryDetail> newDetails = new List();

          //获取打印机功能区关系
          List<PrinterFunc> pfs = printer.pfuncs;
          //一个打印机与一个指定功能区的关系只能有一个
          PrinterFunc pf = pfs.firstWhere((e) => e.funcId == delivery.funcId);

          for (DeliveryDetail detail in delivery.details) {
            if (pf.categoryFlag == 0 || pf.funcProdFlag == 0) {
              //市场分类与商品只要有一个支持
              newDetails.add(detail);
            }

            //市场分类部分支持
            if (pf.categoryFlag == 1) {

              List<int> categoryIds =pf.pCategorys.map((e) => e.categoryId).toList();

              //市场分类包含
              if (categoryIds.contains(detail.categoryId)) {
                newDetails.add(detail);
              } else {
                //如果市场分类不包含，看商品
                if (pf.funcProdFlag == 1) {
                  List<int> funcProdIds =pf.pfProds.map((e) => e.funcProdId).toList();
                  if (funcProdIds.contains(detail.funcProdId)) {
                    newDetails.add(detail);
                  } else {
                    noPrinterSupportDetail.add(detail);
                  }
                }else if(pf.funcProdFlag == 2){
                  //商品部分不支持
                  List<int> funcProdIds =pf.pfProds.map((e) => e.funcProdId).toList();
                  if (!funcProdIds.contains(detail.funcProdId)) {
                    newDetails.add(detail);
                  } else {
                    noPrinterSupportDetail.add(detail);
                  }
                }
              }
            }
          }

          if (newDetails.length > 0) {
            //copy出一个新的配送单
            Delivery newDelivery = delivery.copy();
            newDelivery.details = newDetails;
            double prodCount = 0;
            double totalAmt = 0;

            for (DeliveryDetail detail in newDetails) {
              prodCount += detail.prodCount;
              totalAmt += (detail.prodCount * detail.prodPrice);
            }
            newDelivery.prodCount = prodCount;
            newDelivery.totalAmount = totalAmt;

            deliveryGroupByFcp[printer] = newDelivery;
          }
        }
      }

      if (noPrinterSupportDetail.length > 0) {
        print("没有打印机支持配送单详情有：$noPrinterSupportDetail");
      }

      //最后将按功能区，市场分类，商品分配好的关系再分配（按照打印机是否分商品打印分配）
      //分配完后printer的可能有重复
      List<Map<Printer, Delivery>> groupByIsByProd = new List();

      if (deliveryGroupByFcp.length > 0) {
        deliveryGroupByFcp.forEach((printer, newDelivery) {

          //分商品打印的时候
          if (printer.isPrintedByProd == 1) {
            List<DeliveryDetail> newDetails = newDelivery.details;
            for (DeliveryDetail newDetail in newDetails) {
              Map<Printer, Delivery> map = new Map();

              Delivery perDetailDelivery = newDelivery.copy();
              List<DeliveryDetail> perDetails = new List();
              perDetails.add(newDetail);
              perDetailDelivery.details = perDetails;
              perDetailDelivery.prodCount = newDetail.prodCount;
              perDetailDelivery.totalAmount =newDetail.prodCount * newDetail.prodPrice;

              map[printer] = perDetailDelivery;
              groupByIsByProd.add(map);
            }
          } else {
            //不分商品打印的时候
            Map<Printer, Delivery> map = new Map();
            map[printer] = delivery;
            groupByIsByProd.add(map);
          }
        });
      }

      //推送打印
      if (groupByIsByProd.length > 0) {
        printDelivery(groupByIsByProd, isAgain, deliveryId,printInfo);

//        //如果打印失败次数=0 且 不是重打印
//        if (failedCount == 0 && isAgain == 0) {
//          //更新订单的状态   打印完成
//          _deliveryService.updDeliveryPrintState(deliveryId, 2);
//        }
//
//        //如果打印失败次数>0 且 不是重打印
//        if(failedCount > 0 && isAgain == 0){
//          //则更新订单状态为未打印
//          _deliveryService.updDeliveryPrintState(deliveryId, 0);
//        }
//
//        //打印失败，将打印信息重新放回队列
//        if(failedCount > 0 ){
//          Queues.deliveryQueue.addLast(printInfo);
//        }
      }
    } catch (e) {
      if (isAgain == 0) {
        //更新订单的状态   打印未完成
        _deliveryService.updDeliveryPrintState(deliveryId, 0);
      }
      Queues.deliveryQueue.addLast(printInfo);
    }

  }

  ///推送打印
  ///List<Map<Printer, Delivery>> relations
  ///此数据中 ：  集合中deliveryID一样， 但是details不一样，printer也不一样
  ///printer与Detail向对应；
  ///return 打印失败的次数
  void printDelivery(List<Map<Printer, Delivery>> relations,int isAgain, int deliveryId,String printInfo) async {


    for (Map<Printer, Delivery> relation in relations) {
      for (Printer printer in relation.keys) {
        Delivery delivery = relation[printer];

        Map<String, Object> info = new Map();
        info["delivId"] = delivery.id.toString();
        info["delivCode"] = delivery.delivCode;
        info["orderTime"] = delivery.orderTime;
        info["area"] = delivery.roomFloor + "-" + delivery.roomCode;
        info["prodCount"] = delivery.prodCount.toString();
        info["totalAmount"] = delivery.totalAmount.toString();

        List<Map<String, Object>> detailsList = new List();

        List<int> detailIds = new List();

        for (DeliveryDetail detail in delivery.details) {
          Map<String, Object> detailInfo = new Map();
          detailIds.add(detail.id);
          detailInfo["detailId"] = detail.id.toString();
          detailInfo["prodShowName"] = detail.prodShowName;
          detailInfo["prodCount"] = detail.prodCount.toString();
          detailInfo["prodPrice"] = detail.prodPrice.toString();
          detailInfo["prodSpecName"] = detail.prodSpecName;
          detailsList.add(detailInfo);
        }
        info["datalist"] = detailsList;

        String tmpContent = printer.tmpContent;
        if (isAgain == 1) {
          tmpContent = "[重]\n" + tmpContent;
        }

        List<String> cmds = TemplateHelper.getCmd(tmpContent, info);
        List<int> bytes = ToBytesHelper.getBytes(cmds, printer.paperSize);

        await PrinterLocker.doInLock(printer.id, () async {
          WIFISocketHelper socketHelper = WIFISocketHelper(
              printer.ip,
              printer.port,
              onSuccess: () {
                //打印成功
                if (isAgain == 0) {
                  for (int detailId in detailIds) {
                    //更新详情的打印状态
                    _detailService.updDetailPrintState(detailId, 2);
                  }

                  //更新订单的状态   打印完成
                  _deliveryService.updDeliveryPrintState(deliveryId, 2);
                }
              },
              onFailed: () {
                //失败一次，次数加1
                if(isAgain == 0){
                  //则更新订单状态为未打印
                  _deliveryService.updDeliveryPrintState(deliveryId, 0);
                }
                //打印失败，将打印信息重新放回队列
                Queues.deliveryQueue.addLast(printInfo);

              });
          await socketHelper.write(bytes); //推送打印
          sleep(Duration(milliseconds: 300));
        });
      }
    }
  }


  ///打印测试页
  void printTest(int  printerId) async{
    Printer  printer  = await _printerService.getPrinterById(printerId);

        Map<String, Object> info = new Map();
        info["delivCode"] = "A00000";
        info["orderTime"] = formatDate(DateTime.now(),[yyyy, '-', mm, '-', dd, " ", HH, ":", nn, ":", ss]);
        info["area"] =  "测试区-000";
        info["prodCount"] = 4.toString();
        info["totalAmount"] = 1000.00.toString();

        List<Map<String, Object>> detailsList = new List();
        for (int i= 0;i<4;i++) {
          Map<String, Object> detailInfo = new Map();

          if(i==0){
            detailInfo["prodShowName"] = "测试商品测试商品测试商品测试商品";
          }else{
            detailInfo["prodShowName"] = "测试商品"+i.toString();
          }
          detailInfo["prodCount"] = 1.toString();
          detailInfo["prodPrice"] = 250.00.toString();
          detailInfo["prodSpecName"] = "规格"+i.toString();
          detailsList.add(detailInfo);
        }
        info["datalist"] = detailsList;

    List<String> cmds = TemplateHelper.getCmd(printer.tmpContent, info);
    List<int> bytes = ToBytesHelper.getBytes(cmds, printer.paperSize);

//    List<int>   content = new List();
//    content.addAll(gbk.encode("测试单据"));
//    content.addAll([0x1D,0x61, 0x0F,0x1D, 0x21, 0x00, 0x1b, 0x33, 0x0e, 0x1b, 0x64, 0x06, 0x1b, 0x61, 0x00, 0x1D,0x56, 0x42, 0x00]);

    await PrinterLocker.doInLock(printerId, () async {
      WIFISocketHelper socket = WIFISocketHelper(printer.ip,printer.port,onSuccess:()=> print("打印成功"), onFailed:()=> print("打印失败"));
      socket.write(bytes);
    });

  }



}
