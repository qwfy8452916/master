import '../entity/PageDTO.dart';
import '../entity/query/Query.dart';
import '../../common/Api.dart';
import '../entity/Printer.dart';
import '../entity/PrinterCategory.dart';
import '../entity/PrinterFunc.dart';
import '../entity/PrinterFuncProduct.dart';
import '../entity/Template.dart';
import '../mapper/PrinterCategoryMapper.dart';
import '../mapper/PrinterFuncMapper.dart';
import '../mapper/PrinterFuncProductMapper.dart';
import '../mapper/PrinterMapper.dart';
import '../mapper/TemplateMapper.dart';
import 'package:date_format/date_format.dart';

class PrinterService {
  PrinterMapper _printerMapper = new PrinterMapper();
  PrinterFuncMapper _pfMapper = new PrinterFuncMapper();
  PrinterCategoryMapper _pcMapper = new PrinterCategoryMapper();
  PrinterFuncProductMapper _pfpMapper = new PrinterFuncProductMapper();
  TemplateMapper _tmpMapper = new TemplateMapper();

  ///保存打印机
  void savePrinter(Printer printer) async {
    printer.createdAt =formatDate(DateTime.now(),[yyyy, '-', mm, '-', dd, " ", HH, ":", nn, ":", ss]);
    printer.lastUpdatedAt = formatDate(DateTime.now(),[yyyy, '-', mm, '-', dd, " ", HH, ":", nn, ":", ss]);
    printer.hotelId = Api.user.hotelId;

    //保存打印机数据
    if (null != printer.pfuncs && printer.pfuncs.length > 0) {
      printer.funcFlag = 1; //部分支持
    }
    int printerId = await _printerMapper.savePrinter(printer);

    //保存功能区关系
    if (printer.funcFlag == 1) {
      List<PrinterFunc> pfuncs = printer.pfuncs;

      for (PrinterFunc pf in pfuncs) {
        pf.printerId = printerId;
        pf.hotelId = printer.hotelId;

        if (null == pf.pfProds && pf.pfProds.length <= 0) {
          pf.funcProdFlag = 0;
        }

        if (null != pf.pCategorys && pf.pCategorys.length > 0) {
          pf.categoryFlag = 1;
        }

        int pfId = await _pfMapper.savePrinterFunc(pf);

        if (pf.categoryFlag == 1) {
          ///市场分类关系
          List<PrinterCategory> pcs = pf.pCategorys;
          //批量保存商品关系
          for (PrinterCategory pc in pcs) {
            pc.hotelId = printer.hotelId;
            pc.printerId = printerId;
            pc.printerFuncId = pfId;
          }

          //批量保存市场分类关系
          await _pcMapper.savePrinterCategorysByBatch(pcs);
        }

        if (pf.funcProdFlag != 0 ) {
          ///商品关系
          List<PrinterFuncProduct> pfps = pf.pfProds;

          for (PrinterFuncProduct pfp in pfps) {
            pfp.hotelId = printer.hotelId;
            pfp.printerId = printerId;
            pfp.printerFuncId = pfId;
          }

          //批量保存商品关系
          //批量保存市场分类关系
          await _pfpMapper.savePrinterFuncProductsByBatch(pfps);
        }
      }
    }
  }

  ///根据Id查询打印机
  Future<Printer>  getPrinterById(int  id) async{
    Printer printer  =  await _printerMapper.getById(id);

    if(null != printer.templateId &&  printer.templateId !=  0 ){
      Template tmp =  await _tmpMapper.getById(printer.templateId);
      printer.tmpContent = tmp.tmpContent;
      printer.tmpName = tmp.name;
    }

    if (printer.funcFlag == 1) {

      //查询条件
      List<Query> pfQuerys = new List();
      pfQuerys.add(Query(PrinterFunc.PRINTER_ID, "=", printer.id));

      List<PrinterFunc> pfs = await _pfMapper.findItems(pfQuerys);
      if (pfs.length > 0) {
        for (PrinterFunc pf in pfs) {
          //市场分类关系
          if (pf.categoryFlag == 1) {

            //查询条件
            List<Query> pcQuerys = new List();
            pcQuerys.add(Query(PrinterCategory.PRINTER_FUNC_ID, "=", pf.id));

            List<PrinterCategory> pcs =await _pcMapper.findItems(pcQuerys);
            pf.pCategorys = pcs;
          }

          //商品的关系
          if (pf.funcProdFlag != 0) {
            //查询条件
            List<Query> pfpQuerys = new List();
            pfpQuerys.add(Query(PrinterFuncProduct.PRINTER_FUNC_ID, "=", pf.id));
            List<PrinterFuncProduct> pfps =await _pfpMapper.findItems(pfpQuerys);
            pf.pfProds = pfps;
          }
        }
      }
      printer.pfuncs = pfs;
    }
    return printer;
  }

  ///根据打印机ID删除打印机
  void deletePrinterById(int  id,{Function onError}) async{
    //先删除功能区，市场分类，商品的关系
     _pcMapper.deleteRelationByPrinterId(id);
     _pfpMapper.deleteRelationByPrinterId(id);
     _pfMapper.deleteRelationByPrinterId(id);
     _printerMapper.deletePrinter(id);
  }

  ///设置工作状态
  void setWorkState(int  id) async {

    Printer printer   = await  _printerMapper.getById(id);

    List<Query> printerQuerys = new List();
    printerQuerys.add(Query(Printer.ID, "=", id));

    Printer updPrinter = new Printer();
    if(printer.isWork == 1){
      updPrinter.isWork = 0;
    }else{
      updPrinter.isWork = 1;
    }

    _printerMapper.updatePrinter(updPrinter,querys:printerQuerys);
  }

  ///更新打印机
  void updatePrinter(Printer printer,{Function onError}) async {

    if(null == printer.id || printer.id == 0){
      if(null  !=  onError){
        onError("请确定需要修改的Id");
        return;
      }
    }
    List<Query> printerQuerys = new List();
    printerQuerys.add(Query(Printer.ID, "=", printer.id));


    printer.lastUpdatedAt =formatDate(DateTime.now(),[yyyy, '-', mm, '-', dd, " ", HH, ":", nn, ":", ss]);
    if (null != printer.pfuncs && printer.pfuncs.length > 0) {
      printer.funcFlag = 1; //部分支持
    }
    _printerMapper.updatePrinter(printer,querys:printerQuerys);

    //先删除所有子类  //重新保存
    _pcMapper.deleteRelationByPrinterId(printer.id );
    _pfpMapper.deleteRelationByPrinterId(printer.id );
    _pfMapper.deleteRelationByPrinterId(printer.id );

    //保存功能区关系
    if (printer.funcFlag == 1) {
      List<PrinterFunc> pfuncs = printer.pfuncs;

      for (PrinterFunc pf in pfuncs) {
        pf.id = null;
        pf.printerId = printer.id;
        pf.hotelId = printer.hotelId;

        if (null !=  pf.pfProds && pf.pfProds.length > 0) {
          pf.funcProdFlag = 1;
        }

        if (null != pf.pCategorys && pf.pCategorys.length > 0) {
          pf.categoryFlag = 1;
        }

        int pfId = await _pfMapper.savePrinterFunc(pf);

        if (pf.categoryFlag == 1 ) {
          ///市场分类关系
          List<PrinterCategory> pcs = pf.pCategorys;
          for (PrinterCategory pc in pcs) {
            pc.id = null;
            pc.hotelId = printer.hotelId;
            pc.printerId = printer.id;
            pc.printerFuncId = pfId;
          }

          //批量保存市场分类关系
          await _pcMapper.savePrinterCategorysByBatch(pcs);
        }

        if (pf.funcProdFlag != 0  ) {
          ///商品关系
          List<PrinterFuncProduct> pfps = pf.pfProds;

          for (PrinterFuncProduct pfp in pfps) {
            pfp.id=null;
            pfp.hotelId = printer.hotelId;
            pfp.printerId = printer.id;
            pfp.printerFuncId = pfId;
          }

          //批量保存商品关系
          //批量保存市场分类关系
          await _pfpMapper.savePrinterFuncProductsByBatch(pfps);
        }
      }
    }



  }

  ///获取酒店所有打印机
  Future<List<Printer>> findAllPrinters({PageDTO page})  async{
    List<Printer> printers = new List();
    //查寻条件
    List<Query> printerQuerys = new List();
    printerQuerys.add(Query(Printer.HOTEL_ID, "=", Api.user.hotelId));
    printers = await _printerMapper.findItems(printerQuerys, page,orderBy: Printer.ID+" desc");
    if (printers.length > 0) {

      for (Printer printer in printers) {

        if(null != printer.templateId &&  printer.templateId !=  0 ){
          Template tmp =  await _tmpMapper.getById(printer.templateId);
          printer.tmpContent = tmp.tmpContent;
          printer.tmpName = tmp.name;
        }

        if (printer.funcFlag == 1) {

          //查询条件
          List<Query> pfQuerys = new List();
          pfQuerys.add(Query(PrinterFunc.PRINTER_ID, "=", printer.id));

          List<PrinterFunc> pfs = await _pfMapper.findItems(pfQuerys);
          if (pfs.length > 0) {
            for (PrinterFunc pf in pfs) {
              //市场分类关系
              if (pf.categoryFlag == 1) {

                //查询条件
                List<Query> pcQuerys = new List();
                pcQuerys.add(Query(PrinterCategory.PRINTER_FUNC_ID, "=", pf.id));

                List<PrinterCategory> pcs =await _pcMapper.findItems(pcQuerys);
                pf.pCategorys = pcs;
              }

              //商品的关系
              if (pf.funcProdFlag != 0) {
                //查询条件
                List<Query> pfpQuerys = new List();
                pfpQuerys.add(Query(PrinterFuncProduct.PRINTER_FUNC_ID, "=", pf.id));
                List<PrinterFuncProduct> pfps =await _pfpMapper.findItems(pfpQuerys);
                pf.pfProds = pfps;
              }
            }
          }
          printer.pfuncs = pfs;
        }
      }
    }
    return printers;
  }

  ///根据具体时间获取所有正在工作的打印机
  Future<List<Printer>> findWorkingPrinters(String dateTime) async {

    //在工作且在工作时间范围内打印机
    List<Printer>  workingPrinters  = new List();

    List<Printer> allPrinters = await findAllPrinters();
    if(allPrinters.length>0) {

      //所有正在工作的打印机
      List<Printer> workPrinters = allPrinters.where((element) =>
      element.isWork == 1).toList();

      //看在不在工作时间范围内
      if (null != workPrinters && workPrinters.length > 0) {
        //首先时间是今天
        DateTime now = DateTime.now();
        int year = now.year;
        int month = now.month;
        int day = now.day;

        //指定时间
        DateTime appointTime = DateTime.parse(dateTime);

        //时间范围包含指定时间打印机是需要
        for (Printer printer in workPrinters) {
          //设置了时间范围
          if (printer.isSetWorkTime == 1) {
            List<String> workStartTimeArr = printer.workStartTime.split(":");
            DateTime startWorkTime = DateTime(
                year, month, day, int.parse(workStartTimeArr[0]),
                int.parse(workStartTimeArr[1]), 0);
            List<String> workEndTimeArr = printer.workEndTime.split(":");
            DateTime endWorkTime = DateTime(
                year, month, day, int.parse(workEndTimeArr[0]),
                int.parse(workEndTimeArr[1]), 0);
            if (startWorkTime.isBefore(appointTime) &&
                endWorkTime.isAfter(appointTime)) {
              workingPrinters.add(printer);
            }
          } else {
            workingPrinters.add(printer);
          }
        }
      }
    }
    return workingPrinters;
  }
}
