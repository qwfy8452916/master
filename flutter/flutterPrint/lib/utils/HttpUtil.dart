import 'dart:convert';
import 'dart:async';
import 'package:dio/dio.dart';
import '../common/Api.dart';

/*
 * 封装 restful 请求
 *
 * GET、POST、DELETE、PATCH
 * 主要作用为统一处理相关事务：
 *  - 统一处理请求前缀；
 *  - 统一打印请求信息；
 *  - 统一打印响应信息；
 *  - 统一打印报错信息；
 */
class HttpUtil {
  /// global dio object
  Dio _dio;

  /// default options
//  static const String API_PREFIX = 'http://192.168.1.121:9001/longan/api'; //本地
  static const String API_PREFIX = 'http://49.235.106.179:9001/longan/api'; //测试
  static const int CONNECT_TIMEOUT = 10000;
  static const int RECEIVE_TIMEOUT = 30000;

  HttpUtil() {
    Map<String, dynamic> headers = new Map();

    if(Api.user !=  null  ){
      if (Api.user.token != null && Api.user.token != "") {
        headers["Authorization"] = Api.user.token;
      }

    }



    /// 全局属性：请求前缀、连接超时时间、响应超时时间
    var options = BaseOptions(
      connectTimeout: CONNECT_TIMEOUT,
      receiveTimeout: RECEIVE_TIMEOUT,
      responseType: ResponseType.plain,
      baseUrl: API_PREFIX,
      headers: headers,
      validateStatus: (status) {
        // 不使用http状态码判断状态，使用AdapterInterceptor来处理（适用于标准REST风格）
        return true;
      },
    );
    _dio = new Dio(options);
  }

  ///get请求
  get(String url,
      {Map<String, dynamic> params,
      Function onSuccess,
      Function onError}) async {
    await _request(url, "GET",
        params: params, onSuccess: onSuccess, onError: onError);
  }

  ///post请求
  post(String url,
      {Map<String, dynamic> params,
      Function onSuccess,
      Function onError}) async {
    await _request(url, "POST",
        params: params, onSuccess: onSuccess, onError: onError);
  }

  ///post请求
  put(String url,
      {Map<String, dynamic> params,
      Function onSuccess,
      Function onError}) async {
    await _request(url, "POST",
        params: params, onSuccess: onSuccess, onError: onError);
  }

  ///post请求
  delete(String url,
      {Map<String, dynamic> params,
      Function onSuccess,
      Function onError}) async {
    return await _request(url, "POST",
        params: params, onSuccess: onSuccess, onError: onError);
  }

  /// request method
  /// url 请求链接
  /// parameters 请求参数
  /// method 请求方式
  /// onSuccess 成功回调
  /// onError 失败回调
  Future<Map> _request(String url, String method,
      {Map<String, dynamic> params,
      Function onSuccess,
      Function onError}) async {
    params = params ?? {};

    /// 打印:请求地址-请求方式-请求参数
    print('请求地址：【' + method + '  ' + url + '】');
    print('请求参数：' + params.toString());

    //请求结果
    try {
      Response response;

      if ("GET" == method) {
        response = await _dio.get(url, queryParameters: params);
      } else {
        response = await _dio.request(url,
            data: params, options: new Options(method: method));
      }

      print('响应数据：' + response.toString());

      var result = response.data;
      if (response.statusCode == 200) {
        if (result is String) {
          result = json.decode(result);
        }

        if (result["code"] == 1) {
          onError(result["msg"]);
        } else {
          if (null != onSuccess) {
            onSuccess(result["data"]);
          }
        }
      } else {
        //TODO:Alert提示
        onError("请求状态码：$response.statusCode");
//        throw Exception('statusCode:${response.statusCode}');
      }
    } on DioError catch (e) {
      onError('请求出错：' + e.message);
      //TODO:Alert提示
    }
  }
}
