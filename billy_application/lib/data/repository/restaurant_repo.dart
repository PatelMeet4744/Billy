import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:get/get.dart';

class RestaurantRepo extends GetxService {
  late final ApiClient apiClient;
  RestaurantRepo({required this.apiClient});

  Future<Response> getRestaurantList() async {
    return await apiClient.getData(AppConstants.restaurantAPI);
  }

  Future<Response> getRestaurantListByCusines(String cuisinesId) async {
    return await apiClient
        .getData('${AppConstants.restaurantAPI}/cuisines/$cuisinesId');
  }
}
