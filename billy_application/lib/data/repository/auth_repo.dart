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
    return await apiClient.postData(
        AppConstants.customerAPI, signUpBody.toJson());
  }

  bool userLoggedIn() {
    return sharedPreferences.containsKey(AppConstants.token);
  }

  String getUserToken() {
    return sharedPreferences.getString(AppConstants.token) ?? "";
  }

  String getUserId() {
    return sharedPreferences.getString(AppConstants.customerId) ?? "";
  }

  Future<Response> login(
      String customerContact, String customerPassword) async {
    return await apiClient.postData(AppConstants.loginAPI, {
      "customerContact": int.parse(customerContact),
      "customerPassword": customerPassword
    });
  }

  Future<Response> createOTPLogin(String customerContact) async {
    return await apiClient.postData(
      AppConstants.createOTPAPI,
      {
        "customerContact": int.parse(customerContact),
      },
    );
  }

  Future<Response> verifyOTPLogin(
      String customerContact, String otp, String hash) async {
    return await apiClient.postData(AppConstants.verifyOTPAPI, {
      "customerContact": int.parse(customerContact),
      "otp": otp,
      "hash": hash,
    });
  }

  Future<Response> loginWithSMS(
      String customerContact, String otp, String verificationId) async {
    return await apiClient.postData(AppConstants.loginWithSMS, {
      "customerContact": int.parse(customerContact),
      "otp": otp,
      "verificationId": verificationId,
    });
  }

  Future<Response> verifyCustomer(String customerContact) async {
    return await apiClient
        .getData('${AppConstants.verifyCustomer}/$customerContact');
  }

  Future<Response> resetPassword(String customerContact,
      String customerPassword, String otp, String verificationId) async {
    return await apiClient
        .putData('${AppConstants.resetPasswordAPI}/$customerContact', {
      "customerPassword": customerPassword,
      "otp": otp,
      "verificationId": verificationId,
    });
  }

  Future<Response> changePassword(
    String customerId,
    String customerOldPassword,
    String customerPassword,
  ) async {
    return await apiClient.putData(
      '${AppConstants.changePasswordAPI}/$customerId',
      {
        "customerOldPassword": customerOldPassword,
        "customerPassword": customerPassword
      },
    );
  }

  Future<void> saveUser(
    String token,
    String customerName,
    String customerId,
  ) async {
    try {
      sharedPreferences.setString(AppConstants.customerName, customerName);
      sharedPreferences.setString(AppConstants.customerId, customerId);
      sharedPreferences.setString(AppConstants.token, token);
      apiClient.token = token;
      apiClient.updateHeader(token);
    } catch (e) {
      // ignore: avoid_print
      print(e.toString());
    }
  }

  bool clearSharedData() {
    sharedPreferences.remove(AppConstants.customerName);
    sharedPreferences.remove(AppConstants.customerId);
    sharedPreferences.remove(AppConstants.token);
    apiClient.token = '';
    apiClient.updateHeader('');
    return true;
  }
}
