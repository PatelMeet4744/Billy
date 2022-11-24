import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/models/signup_body_model.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:get/get.dart';

class AuthRepo {
  final ApiClient apiClient;
  final SharedPreferences sharedPreferences;

  AuthRepo({
    required this.apiClient,
    required this.sharedPreferences,
  });

  Future<Response> registration(SignUpBody signUpBody) async {
    return await apiClient.postData(Config.customerAPI, signUpBody.toJson());
  }

  bool userLoggedIn() {
    return sharedPreferences.containsKey(Config.token);
  }

  String getUserToken() {
    return sharedPreferences.getString(Config.token) ?? "";
  }

  Future<Response> login(
      String customerContact, String customerPassword) async {
    return await apiClient.postData(Config.loginAPI, {
      "customerContact": int.parse(customerContact),
      "customerPassword": customerPassword
    });
  }

  Future<void> saveUser(
    String token,
    String customerName,
    String customerId,
  ) async {
    try {
      apiClient.token = token;
      apiClient.updateHeader(token);
      await sharedPreferences.setString(Config.token, token);
      await sharedPreferences.setString(Config.customerName, customerName);
      await sharedPreferences.setString(Config.customerId, customerId);
    } catch (e) {
      // ignore: avoid_print
      print(e.toString());
    }
  }
}
