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

  Future<Response> createOTPLogin(String customerContact) async {
    return await apiClient.postData(
      Config.createOTPAPI,
      {
        "customerContact": int.parse(customerContact),
      },
    );
  }

  Future<Response> verifyOTPLogin(
      String customerContact, String otp, String hash) async {
    return await apiClient.postData(Config.verifyOTPAPI, {
      "customerContact": int.parse(customerContact),
      "otp": otp,
      "hash": hash,
    });
  }

  Future<void> saveUser(
    String token,
    String customerName,
    String customerId,
  ) async {
    try {
      sharedPreferences.setString(Config.customerName, customerName);
      sharedPreferences.setString(Config.customerId, customerId);
      sharedPreferences.setString(Config.token, token);
      apiClient.token = token;
      apiClient.updateHeader(token);
    } catch (e) {
      // ignore: avoid_print
      print(e.toString());
    }
  }

  bool clearSharedData() {
    sharedPreferences.remove(Config.customerName);
    sharedPreferences.remove(Config.customerId);
    sharedPreferences.remove(Config.token);
    apiClient.token = '';
    apiClient.updateHeader('');
    return true;
  }
}
