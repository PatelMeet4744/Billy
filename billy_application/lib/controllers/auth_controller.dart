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
      // authRepo.saveUserToken(response.body["token"]);
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
}
