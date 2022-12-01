import 'package:billy_application/utils/app_constants.dart';
import 'package:billy_application/data/api/api_client.dart';
import 'package:get/get.dart';

class CuisinesRepo extends GetxService {
  late final ApiClient apiClient;
  CuisinesRepo({required this.apiClient});

  Future<Response> getCuisinesList() async {
    return await apiClient.getData(AppConstants.cuisinesAPI);
  }
}
