import 'package:billy_application/controllers/cart_controller.dart';
import 'package:billy_application/data/repository/order_repo.dart';
import 'package:billy_application/models/cart_body_model.dart';
import 'package:billy_application/models/response_model.dart';
import 'package:get/get.dart';

class OrderController extends GetxController {
  final OrderRepo orderRepo;
  OrderController({required this.orderRepo});
  bool _isLoading = false;

  Future<ResponseModel> saveOrder(CartController cartController) async {
    _isLoading = true;
    update();
    late Response response;
    late ResponseModel responseModel;
    if (cartController.orderData().isNotEmpty) {
      response = await orderRepo.saveOrder(cartController.orderData());
      if (response.statusCode == 200) {
        responseModel =
            ResponseModel(response.body["status"], response.body["message"]);
      } else {
        responseModel =
            ResponseModel(response.body["status"], response.body["message"]!);
      }
    } else {
      responseModel = ResponseModel(false, "Empty Cart!");
    }
    _isLoading = false;
    update();
    return responseModel;
  }
}
