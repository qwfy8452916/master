/*
 * 所有请求的API
 */
import '../src/entity/User.dart';

class Api {

  static  User  user ;

  //登录
  static final String login = "/user/login";

  //获取商品详情
  static final String unusedFuncProds = "/prod/func/product/hotel/app/unused";

  static final String delivery = "/order/delivery/app/after/delivery";

  //功能区列表
  static final String funcList = "/hotel/func/hotel/app/unused/dish/func";

  //分类列表
  static final String categoryList = "/hotel/func/market/category/hotel/app/unused";


}
