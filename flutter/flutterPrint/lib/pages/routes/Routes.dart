import 'package:flutter/material.dart';
import '../Login.dart';
import '../PrinterRangeAdd.dart';
import '../PrinterDetails.dart';
import '../Tabs.dart';
import '../PrinterList.dart';
import '../PrinterAdd.dart';
import '../OrderSearch.dart';
import '../ProdList.dart';
import '../OrderDetail.dart';
import '../OrderSearchList.dart';

//配置路由
final routes = {
  '/': (context) => Login(),
  '/Tabs': (context) => Tabs(),
  '/PrinterList': (context) => PrinterList(),
  '/PrinterAdd': (context,{arguments}) => PrinterAdd(arguments:arguments),
  '/PrinterRangeAdd': (context,{arguments}) => PrinterRangeAdd(arguments:arguments),
  '/OrderSearch': (context) => OrderSearch(),
  '/ProdList': (context,{arguments}) => ProdList(arguments:arguments),
  '/OrderDetail': (context,{arguments}) => OrderDetail(arguments:arguments),
  '/PrinterDetails':(context,{arguments}) => PrinterDetails(arguments:arguments),
  '/OrderSearchList':(context,{arguments}) => OrderSearchList(arguments:arguments),
};

//固定写法
var onGenerateRoute = (RouteSettings settings) {
  // 统一处理
  final String name = settings.name;
  final Function pageContentBuilder = routes[name];
  if (pageContentBuilder != null) {
    if (settings.arguments != null) {
      final Route route = MaterialPageRoute(
          builder: (context) =>
              pageContentBuilder(context, arguments: settings.arguments));
      return route;
    } else {
      final Route route =
          MaterialPageRoute(builder: (context) => pageContentBuilder(context));
      return route;
    }
  }
};
