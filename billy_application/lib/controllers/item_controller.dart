import 'package:billy_application/data/repository/item_repo.dart';
import 'package:billy_application/models/item_model.dart';
import 'package:get/get.dart';

class ItemController extends GetxController {
  late final ItemRepo itemRepo;

  ItemController({required this.itemRepo});

  List<Data> _itemList = [];
  List<Data> get itemList => _itemList;

  bool _isLoaded = false;
  bool get isLoaded => _isLoaded;

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
}
