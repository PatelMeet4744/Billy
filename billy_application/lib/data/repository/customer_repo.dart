import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/models/customer_model.dart';
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

  Future<Response> updateProfile(CustomerModel customerModel) async {
    String customerId = customerModel.customerId;
    return await apiClient.putData(
        '${AppConstants.customerAPI}/$customerId', customerModel.toJson());
  }
}
