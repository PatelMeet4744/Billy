// ignore_for_file: constant_identifier_names, use_build_context_synchronously, no_leading_underscores_for_local_identifiers

import 'dart:convert';

import 'package:api_cache_manager/api_cache_manager.dart';
import 'package:api_cache_manager/models/cache_db_model.dart';
import 'package:billy_application/models/verifyotp_response_model.dart';
import 'package:flutter/material.dart';

class SharedService {
  static const String KEY_NAME = "login_key";

  static Future<bool> isLoggedIn() async {
    var isCacheKeyExist = await APICacheManager().isAPICacheKeyExist(KEY_NAME);
    return isCacheKeyExist;
  }

  static Future<void> checkExpiredToken(
      BuildContext context, bool isCacheKeyExist) async {
    if (isCacheKeyExist) {
      DateTime nowDateTime = DateTime.now();
      String? expirdAt = DateTime.now().toString();

      Future<VerifyOTPResponseModel?> loginDetails =
          SharedService.loginDetails();
      await loginDetails.then((value) => {expirdAt = (value!.data.expirdAt)});

      DateTime _expirdAt = DateTime.parse(expirdAt!);
      if (_expirdAt.compareTo(nowDateTime) < 0) {
        await SharedService.logout(context);
      }
    }
  }

  static Future<void> setLoginDetails(VerifyOTPResponseModel model) async {
    APICacheDBModel cacheDBModel = APICacheDBModel(
      key: KEY_NAME,
      syncData: jsonEncode(model.toJson()),
    );

    await APICacheManager().addCacheData(cacheDBModel);
  }

  static Future<VerifyOTPResponseModel?> loginDetails() async {
    var isCacheKeyExist = await APICacheManager().isAPICacheKeyExist(KEY_NAME);

    if (isCacheKeyExist) {
      var cacheData = await APICacheManager().getCacheData(KEY_NAME);

      return verifyOTPResponseJson(cacheData.syncData);
    }

    return null;
  }

  static Future<void> logout(BuildContext context) async {
    await APICacheManager().deleteCache(KEY_NAME);
    Navigator.pushNamedAndRemoveUntil(context, "/login", (route) => false);
  }
}
