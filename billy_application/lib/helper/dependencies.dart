import 'package:billy_application/utils/app_constants.dart';
import 'package:billy_application/controllers/banner_controller.dart';
import 'package:billy_application/controllers/cuisines_controller.dart';
import 'package:billy_application/data/api/api_client.dart';
import 'package:billy_application/data/repository/banner_repo.dart';
import 'package:billy_application/data/repository/cuisines_repo.dart';
import 'package:get/get.dart';

Future<void> init() async {
  //api client
  Get.lazyPut(() => ApiClient(appBaseUrl: Config.baseURL));

  //repos
  Get.lazyPut(() => BannerRepo(apiClient: Get.find()));
  Get.lazyPut(() => CuisinesRepo(apiClient: Get.find()));

  //controller
  Get.lazyPut(() => BannerController(bannerRepo: Get.find()));
  Get.lazyPut(() => CuisinesController(cuisinesRepo: Get.find()));
}
