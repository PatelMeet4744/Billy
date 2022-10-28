import 'dart:convert';

import 'package:billy_application/config/config.dart';
import 'package:billy_application/models/bannerResponse.dart';
import 'package:billy_application/models/createotp_response_model.dart';
import 'package:billy_application/models/cuisines.dart';
import 'package:billy_application/models/verifyotp_response_model.dart';
import 'package:billy_application/utils/shared_service.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

final apiService = Provider((ref) => APIService());

class APIService {
  static var client = http.Client();

  Future<List<Cuisines>?> getCuisines(page, pageSize) async {
    Map<String, String> requestHeaders = {'Content-Type': 'application/json'};

    Map<String, String> queryString = {
      'page': page.toString(),
      'pageSize': pageSize.toString()
    };

    var url = Uri.http(Config.apiURL, Config.cuisinesAPI, queryString);

    var response = await client.get(url, headers: requestHeaders);

    if (response.statusCode == 200) {
      var data = jsonDecode(response.body);

      return cuisinesFromJson(data["data"]);
    } else {
      return null;
    }
  }

  static Future<bool> registerCustomer(
    String customerName,
    String customerEmailID,
    String customerPassword,
    String customerContact,
  ) async {
    Map<String, String> requestHeaders = {'Content-Type': 'application/json'};

    var url = Uri.http(Config.apiURL, Config.customerAPI);

    var response = await client.post(
      url,
      headers: requestHeaders,
      body: jsonEncode(
        {
          "customerName": customerName,
          "customerEmailID": customerEmailID,
          "customerPassword": customerPassword,
          "customerContact": double.parse(customerContact)
        },
      ),
    );

    if (response.statusCode == 200) {
      // var data = jsonDecode(response.body);
      // print(data);
      return true;
    } else {
      return false;
    }
  }

  static Future<CreateOTPResponseModel> otpLogin(String mobileNo) async {
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
    };

    var url = Uri.http(Config.apiURL, Config.createOTPAPI);

    var response = await client.post(
      url,
      headers: requestHeaders,
      body: jsonEncode({"customerContact": mobileNo}),
    );

    return createOTPResponseJson(response.body);
  }

  static Future<bool> verifyOtp(
    String mobileNo,
    String otpHash,
    String otpCode,
  ) async {
    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
    };

    var url = Uri.http(Config.apiURL, Config.verifyOTPAPI);

    var response = await client.post(
      url,
      headers: requestHeaders,
      body: jsonEncode(
          {"customerContact": mobileNo, "otp": otpCode, "hash": otpHash}),
    );

    if (response.statusCode == 200) {
      await SharedService.setLoginDetails(verifyOTPResponseJson(response.body));
      return true;
    } else {
      return false;
    }
  }

  Future<BannerResponse> getBannerResponse(page, pageSize) async {
    // get Token From Login Customer
    String? token;
    Future<VerifyOTPResponseModel?> loginDetails = SharedService.loginDetails();
    await loginDetails.then((value) => {token = 'bear ${value?.data.token}'});

    Map<String, String> requestHeaders = {
      'Content-Type': 'application/json',
      'Authorization': token.toString()
    };

    Map<String, String> queryString = {
      'page': page.toString(),
      'pageSize': pageSize.toString()
    };

    var url = Uri.http(Config.apiURL, Config.bannerAPI, queryString);

    var response = await client.get(url, headers: requestHeaders);
    return bannerResponseJson(response.body);
  }
}
