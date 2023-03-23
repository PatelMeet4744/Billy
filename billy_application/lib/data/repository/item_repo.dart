import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:get/get.dart';

class ItemRepo extends GetxService {
  late final ApiClient apiClient;
  ItemRepo({required this.apiClient});

  Future<Response> getItemByRestaurant(String restaurantId) async {
    return await apiClient
        .getData('${AppConstants.itemAPI}/restaurant/$restaurantId');
  }
}
