import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/controllers/cart_controller.dart';
import 'package:billy_application/data/repository/item_repo.dart';
import 'package:billy_application/models/item_model.dart';
import 'package:billy_application/models/temp_model.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ItemController extends GetxController {
  late final ItemRepo itemRepo;
  ItemController({required this.itemRepo});

  late CartController _cartController;
  late AuthController _authController;

  List<Data> _itemList = [];
  List<Data> get itemList => _itemList;

  bool _isLoaded = false;
  bool get isLoaded => _isLoaded;

  late int _qty = AppConstants.minQty;
  int get qty => _qty;

  int _inCartItems = 0;
  int get inCartItems => _inCartItems + _qty;

  Future<void> getItemByRestaurant(String restaurantId) async {
    Response response = await itemRepo.getItemByRestaurant(restaurantId);
    if (response.statusCode == 200) {
      // print("get Item By restaurant");
      _itemList = [];
      _itemList.addAll(ItemModel.fromJson(response.body).data);
      // print(_itemList);
      _isLoaded = true;
      update();
    } else {}
  }

  void setQty(int quantity) {
    _qty = checkQty(quantity);
    update();
  }

  int checkQty(int quantity) {
    if (quantity < AppConstants.minQty) {
      return AppConstants.minQty;
    } else if (quantity > AppConstants.maxQty) {
      return AppConstants.maxQty;
    } else {
      return quantity;
    }
  }

  void initProduct(CartController cartController, AuthController authController,
      String itemId) {
    _qty = AppConstants.minQty;
    _inCartItems = 0;
    _cartController = cartController;
    _authController = authController;
    // ignore: unused_local_variable
    var exist = false;
    exist = _cartController.existInCart(itemId);
  }

  void addItem(TempModel tempModel) {
    if (tempModel.qty!.toInt() > 0) {
      _cartController.addItem(tempModel, _authController);
      _cartController.items.forEach((key, value) {
        debugPrint("Cart Item[$key]:");
        debugPrint("Customer: ${value.customer.toString()}");
        debugPrint("Variant: ${value.variant.toString()}");
        debugPrint("Addon: ${value.addon.toString()}");
        debugPrint("Addextra: ${value.addextra.toString()}");
        debugPrint("CartQty: ${value.cartQty.toString()}");
        debugPrint("CartPrice: ${value.cartPrice.toString()}");
      });
    } else {
      Get.snackbar(
          "Item Count", "You should at least add an item in the cart!");
    }
    update();
  }
}
