import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/models/cart_body_model.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:get/get.dart';

class OrderRepo extends GetxService {
  late final ApiClient apiClient;
  OrderRepo({required this.apiClient});

  Future<Response> saveOrder(List<CartBodyModel> cartItem) async {
    var orderMasterData = {};
    var totalPrice = 0;
    String customer = "";
    cartItem.forEach(((element) {
      totalPrice += element.cartPrice!.toInt();
      customer = element.customer!.toString();
    }));

    orderMasterData = {
      "customer": customer,
      "billingAddress": "634c37e38bd497f4a9e0a79c",
      "orderTotalPrice": totalPrice,
      "orderCouponCode": "",
      "orderFinalPrice": totalPrice,
      "orderPaymentStatus": "pending",
      "orderPaymentType": "cod",
      "orderStatus": "pending"
    };

    Response response =
        await apiClient.postData(AppConstants.orderMasterAPI, orderMasterData);

    var orderMasterId = response.body['data']['orderMasterId'].toString();
    var orderDetailData = {};
    cartItem.forEach(((element) {
      orderDetailData = {
        "orderMaster": orderMasterId,
        "item": element.item,
        "variant": element.variant,
        "addon": element.addon,
        "addextra": element.addextra,
        "orderQty": element.cartQty
      };
    }));
    return await apiClient.postData(
        AppConstants.orderDetailAPI, orderDetailData);
  }
}
