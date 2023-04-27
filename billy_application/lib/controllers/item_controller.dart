import 'package:billy_application/data/repository/item_repo.dart';
import 'package:billy_application/models/item_model.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:get/get.dart';

class ItemController extends GetxController {
  late final ItemRepo itemRepo;

  ItemController({required this.itemRepo});

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

  void initQty() {
    _qty = AppConstants.minQty;
    _inCartItems = 0;
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
}
