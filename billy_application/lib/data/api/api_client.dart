import 'dart:convert';

import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:get/get.dart';

class ApiClient extends GetConnect implements GetxService {
  late String token;
  late final String appBaseUrl;
  late Map<String, String> mainHeaders;

  ApiClient({required this.appBaseUrl}) {
    baseUrl = appBaseUrl;
    timeout = const Duration(seconds: 30);
    token = Config.token;
    mainHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $token',
    };
  }

  void updateHeader(String token) {
    mainHeaders = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer $token',
    };
  }

  void userLoggedIn() {
    if (Get.find<AuthController>().userLoggedIn()) {
      updateHeader(Get.find<AuthController>().getUserToken());
    }
  }

  Future<Response> getData(String uri) async {
    try {
      userLoggedIn();
      Response response = await get(uri, headers: mainHeaders);
      return response;
    } catch (e) {
      // ignore: avoid_print
      print(e.toString());
      return Response(statusCode: 1, statusText: e.toString());
    }
  }

  Future<Response> getDataWithoutToken(String uri) async {
    try {
      Response response = await get(uri);
      return response;
    } catch (e) {
      // ignore: avoid_print
      print(e.toString());
      return Response(statusCode: 1, statusText: e.toString());
    }
  }

  Future<Response> postData(String uri, dynamic body) async {
    try {
      Response response = await post(uri, body, headers: mainHeaders);
      return response;
    } catch (e) {
      // ignore: avoid_print
      print(e.toString());
      return Response(statusCode: 1, statusText: e.toString());
    }
  }
}
