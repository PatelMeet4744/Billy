import 'package:billy_application/data/repository/auth_repo.dart';
import 'package:billy_application/models/response_model.dart';
import 'package:billy_application/models/signup_body_model.dart';
import 'package:get/get.dart';

class AuthController extends GetxController implements GetxService {
  final AuthRepo authRepo;

  AuthController({
    required this.authRepo,
  });

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  Future<ResponseModel> registration(SignUpBody signUpBody) async {
    _isLoading = true;
    update();
    Response response = await authRepo.registration(signUpBody);
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]);
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    _isLoading = false;
    update();
    return responseModel;
  }

  Future<ResponseModel> login(
      String customerContact, String customerPassword) async {
    _isLoading = true;
    update();
    Response response = await authRepo.login(customerContact, customerPassword);
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      saveUser(
        response.body["token"],
        response.body["customer"]["customerName"],
        response.body["customer"]["customerId"],
      );
      responseModel =
          ResponseModel(response.body["status"], "Customer Login Successfully");
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    _isLoading = false;
    update();
    return responseModel;
  }

  Future<ResponseModel> createOTPLogin(String customerContact) async {
    _isLoading = true;
    update();
    Response response = await authRepo.createOTPLogin(customerContact);
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      responseModel =
          ResponseModel(response.body["status"], response.body["fullhash"]);
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    _isLoading = false;
    update();
    return responseModel;
  }

  Future<ResponseModel> verifyOTPLogin(
      String customerContact, String otp, String hash) async {
    _isLoading = true;
    update();
    Response response =
        await authRepo.verifyOTPLogin(customerContact, otp, hash);
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      saveUser(
        response.body["token"],
        response.body["customer"]["customerName"],
        response.body["customer"]["customerId"],
      );
      responseModel =
          ResponseModel(response.body["status"], "Customer Login Successfully");
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    _isLoading = false;
    update();
    return responseModel;
  }

  Future<ResponseModel> loginWithSMS(
      String customerContact, String otp, String verificationId) async {
    _isLoading = true;
    update();
    Response response =
        await authRepo.loginWithSMS(customerContact, otp, verificationId);
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      saveUser(
        response.body["token"],
        response.body["customer"]["customerName"],
        response.body["customer"]["customerId"],
      );
      responseModel =
          ResponseModel(response.body["status"], "Customer Login Successfully");
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    _isLoading = false;
    update();
    return responseModel;
  }

  Future<ResponseModel> verifyCustomer(String customerContact) async {
    _isLoading = true;
    update();
    Response response = await authRepo.verifyCustomer(customerContact);
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    _isLoading = false;
    update();
    return responseModel;
  }

  Future<ResponseModel> resetPassword(
    String customerContact,
    String customerPassword,
    String otp,
    String verificationId,
  ) async {
    _isLoading = true;
    update();
    Response response = await authRepo.resetPassword(
        customerContact, customerPassword, otp, verificationId);
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    _isLoading = false;
    update();
    return responseModel;
  }

  Future<ResponseModel> changePassword(
    String customerId,
    String customerOldPassword,
    String customerPassword,
  ) async {
    _isLoading = true;
    update();
    Response response = await authRepo.changePassword(
        customerId, customerOldPassword, customerPassword);
    late ResponseModel responseModel;
    if (response.statusCode == 200) {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    } else {
      responseModel =
          ResponseModel(response.body["status"], response.body["message"]!);
    }
    _isLoading = false;
    update();
    return responseModel;
  }

  void saveUser(String token, String customerName, String customerId) {
    authRepo.saveUser(token, customerName, customerId);
  }

  bool userLoggedIn() {
    return authRepo.userLoggedIn();
  }

  String getUserToken() {
    return authRepo.getUserToken();
  }

  String getUserId() {
    return authRepo.getUserId();
  }

  bool clearSharedData() {
    return authRepo.clearSharedData();
  }
}
