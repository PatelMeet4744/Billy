import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/data/repository/cart_repo.dart';
import 'package:billy_application/models/cart_body_model.dart';
import 'package:billy_application/models/temp_model.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CartController extends GetxController {
  final CartRepo cartRepo;
  CartController({required this.cartRepo});

  // ignore: prefer_final_fields
  Map<String, CartBodyModel> _items = {};
  Map<String, CartBodyModel> get items => _items;

  List<CartBodyModel> storeItems = [];

  void addItem(TempModel tempModel, AuthController authController) {
    String itemId = tempModel.itemList![tempModel.index!].sId!.toString();
    String variant =
        tempModel.itemList![tempModel.index!].variant![tempModel.variant!].sId!;
    String addon = "";
    String addextra = "";

    if (tempModel.selectedItemAddonList!.isNotEmpty) {
      for (var element in tempModel.selectedItemAddonList!) {
        addon +=
            "${tempModel.itemList![tempModel.index!].itemaddon!.addon![element].sId!},";
      }
      addon = addon.substring(0, addon.length - 1);
    }

    if (tempModel.selectedItemAddExtraList!.isNotEmpty) {
      for (var element in tempModel.selectedItemAddExtraList!) {
        addextra +=
            "${tempModel.itemList![tempModel.index!].itemaddextra!.addextra![element].sId!},";
      }
      addextra = addextra.substring(0, addextra.length - 1);
    }

    if (_items.containsKey(itemId)) {
      _items.update(itemId, (value) {
        return CartBodyModel(
          customer: authController.getUserId(),
          item: value.item,
          variant: variant,
          addon: addon,
          addextra: addextra,
          cartQty: tempModel.qty!.toInt(),
          cartPrice: tempModel.totalPrice!.toInt(),
        );
      });
    } else {
      _items.putIfAbsent(itemId, () {
        return CartBodyModel(
          customer: authController.getUserId(),
          item: itemId,
          variant: variant,
          addon: addon,
          addextra: addextra,
          cartQty: tempModel.qty!.toInt(),
          cartPrice: tempModel.totalPrice!.toInt(),
        );
      });
    }
    cartRepo.addToCartList(getItems);
    update();
  }

  bool existInCart(String itemId) {
    if (_items.containsKey(itemId)) {
      return true;
    }
    return false;
  }

  int get totalItemsQty {
    int totalQty = 0;
    _items.forEach((key, value) {
      totalQty += value.cartQty!.toInt();
    });
    return totalQty;
  }

  List<CartBodyModel> get getItems {
    return _items.entries.map((e) {
      return e.value;
    }).toList();
  }

  List<CartBodyModel> getCartData() {
    setCart = cartRepo.getCartList();
    // var item = cartRepo.getCartList();
    // item.forEach((element) => print("item: ${element.item}"));
    return storeItems;
  }

  List<CartBodyModel> orderData() {
    return cartRepo.getCartList();
  }

  set setCart(List<CartBodyModel> items) {
    storeItems = items;
    debugPrint("Length of cart items ${storeItems.length.toString()}");
    for (var i = 0; i < storeItems.length; i++) {
      _items.putIfAbsent(storeItems[i].item!, () => storeItems[i]);
    }
    // print("Cart Items ${storeItems}");
  }

  void clear() {
    _items = {};
    cartRepo.removeCart();
    update();
  }
}
