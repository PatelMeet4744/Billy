import 'dart:convert';

import 'package:billy_application/models/cart_body_model.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:flutter/cupertino.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CartRepo {
  final SharedPreferences sharedPreferences;
  CartRepo({required this.sharedPreferences});

  List<String> cart = [];
  void addToCartList(List<CartBodyModel> cartList) {
    cart = [];
// convert objects to string because sharedpreferences only accepts string
    cartList.forEach((element) {
      return cart.add(jsonEncode(element));
    });

    sharedPreferences.setStringList(AppConstants.cartList, cart);
    debugPrint(
        "Shared Preference: ${sharedPreferences.getStringList(AppConstants.cartList)}");
  }
}
