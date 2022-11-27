import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/data/repository/auth_repo.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:billy_application/controllers/banner_controller.dart';
import 'package:billy_application/controllers/cuisines_controller.dart';
import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/data/repository/banner_repo.dart';
import 'package:billy_application/data/repository/cuisines_repo.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> init() async {
  final sharedPreferences = await SharedPreferences.getInstance();

  Get.lazyPut(() => sharedPreferences);
  //api client
  Get.lazyPut(() => ApiClient(appBaseUrl: AppConstants.baseURL));
  Get.lazyPut(
      () => AuthRepo(apiClient: Get.find(), sharedPreferences: Get.find()));

  //repos
  Get.lazyPut(() => BannerRepo(apiClient: Get.find()));
  Get.lazyPut(() => CuisinesRepo(apiClient: Get.find()));

  //controller
  Get.lazyPut(() => AuthController(authRepo: Get.find()));
  Get.lazyPut(() => BannerController(bannerRepo: Get.find()));
  Get.lazyPut(() => CuisinesController(cuisinesRepo: Get.find()));
}
