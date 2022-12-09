import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ApiClient extends GetConnect implements GetxService {
  late String token;
  late final String appBaseUrl;
  late SharedPreferences sharedPreferences;
  late Map<String, String> mainHeaders;

  ApiClient({required this.appBaseUrl, required this.sharedPreferences}) {
    baseUrl = appBaseUrl;
    timeout = const Duration(seconds: 30);
    token = sharedPreferences.getString(AppConstants.token) ?? "";
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

  Future<Response> getData(String uri, {Map<String, String>? headers}) async {
    try {
      userLoggedIn();
      Response response = await get(uri, headers: headers ?? mainHeaders);
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

  Future<Response> putData(String uri, dynamic body) async {
    try {
      Response response = await put(uri, body, headers: mainHeaders);
      return response;
    } catch (e) {
      // ignore: avoid_print
      print(e.toString());
      return Response(statusCode: 1, statusText: e.toString());
    }
  }
}
