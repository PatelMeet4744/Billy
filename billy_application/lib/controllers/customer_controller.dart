import 'package:billy_application/data/repository/customer_repo.dart';
import 'package:billy_application/models/customer_model.dart';
import 'package:billy_application/models/response_model.dart';
import 'package:get/get.dart';

class CustomerController extends GetxController implements GetxService {
  final CustomerRepo customerRepo;

  CustomerController({
    required this.customerRepo,
  });

  bool _isLoading = false;
  late CustomerModel _customerModel;

  bool get isLoading => _isLoading;
  CustomerModel get customerModel => _customerModel;

  Future<ResponseModel> getCustomerInfo() async {
    Response response = await customerRepo.getCustomerInfo();
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      _customerModel = CustomerModel.fromJson(response.body['customer']);
      _isLoading = true;
      responseModel = ResponseModel(response.body["status"], "Successfully");
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    update();
    return responseModel;
  }
}
