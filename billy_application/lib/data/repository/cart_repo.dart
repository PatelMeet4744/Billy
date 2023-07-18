import 'dart:convert';

import 'package:billy_application/models/cart_body_model.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CartRepo {
  final SharedPreferences sharedPreferences;
  CartRepo({required this.sharedPreferences});

  List<String> cart = [];
  void addToCartList(List<CartBodyModel> cartList) {
    cart = [];
    // convert objects to string because sharedpreferences only accepts string
    for (var element in cartList) {
      cart.add(jsonEncode(element));
    }

    sharedPreferences.setStringList(AppConstants.CART_LIST, cart);
    // debugPrint("Shared Preference: ${sharedPreferences.getStringList(AppConstants.CART_LIST)}");
    getCartList();
  }

  List<CartBodyModel> getCartList() {
    List<String> carts = [];
    List<CartBodyModel> cartList = [];

    if (sharedPreferences.containsKey(AppConstants.CART_LIST)) {
      carts = sharedPreferences.getStringList(AppConstants.CART_LIST)!;
    }
    debugPrint("Inside getCartList ${carts.toString()}");
    for (var element in carts) {
      cartList.add(CartBodyModel.fromJson(jsonDecode(element)));
    }
    return cartList;
  }

  void removeCart() {
    sharedPreferences.remove(AppConstants.CART_LIST);
  }
}
