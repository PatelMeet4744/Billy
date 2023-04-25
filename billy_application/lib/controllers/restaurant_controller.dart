import 'package:billy_application/data/repository/restaurant_repo.dart';
import 'package:billy_application/models/restaurant_model.dart';
import 'package:get/get.dart';

class RestaurantController extends GetxController {
  late final RestaurantRepo restaurantRepo;

  RestaurantController({required this.restaurantRepo});
  List<Data> _restaurantList = [];
  List<Data> get restaurantList => _restaurantList;

  bool _isLoaded = false;
  bool get isLoaded => _isLoaded;

  Future<void> getRestaurantList() async {
    Response response = await restaurantRepo.getRestaurantList();
    if (response.statusCode == 200) {
      //print("get Restaurant");
      _restaurantList = [];
      _restaurantList.addAll(RestaurantModel.fromJson(response.body).data);
      // print(_restaurantList);
      _isLoaded = true;
      update();
    } else {}
  }

  Future<void> getRestaurantListByCusines(String cuisinesId) async {
    Response response =
        await restaurantRepo.getRestaurantListByCusines(cuisinesId);
    if (response.statusCode == 200) {
      //print("get Restaurant By Cusines");
      _restaurantList = [];
      _restaurantList.addAll(RestaurantModel.fromJson(response.body).data);
      // print(_restaurantList);
      _isLoaded = true;
      update();
    } else {}
  }
}
