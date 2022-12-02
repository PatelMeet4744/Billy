import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CustomerRepo {
  final ApiClient apiClient;
  final SharedPreferences sharedPreferences;

  CustomerRepo({
    required this.apiClient,
    required this.sharedPreferences,
  });

  Future<Response> getCustomerInfo() async {
    String customerId =
        sharedPreferences.getString(AppConstants.customerId) ?? "";
    return await apiClient.getData('${AppConstants.customerAPI}/$customerId');
  }
}
