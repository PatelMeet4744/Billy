import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/data/repository/cart_repo.dart';
import 'package:billy_application/models/cart_body_model.dart';
import 'package:billy_application/models/temp_model.dart';
import 'package:get/get.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';

class CartController extends GetxController {
  final CartRepo cartRepo;
  CartController({required this.cartRepo});

  Map<String, CartBodyModel> _items = {};
  Map<String, CartBodyModel> get items => _items;

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
          isExist: true,
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
          isExist: true,
        );
      });
    }
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
}
