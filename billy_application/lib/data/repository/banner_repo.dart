import 'package:billy_application/config/config.dart';
import 'package:billy_application/data/api/api_client.dart';
import 'package:get/get.dart';

class BannerRepo extends GetxService {
  late final ApiClient apiClient;
  BannerRepo({required this.apiClient});

  Future<Response> getBannerList() async{
    return await apiClient.getData(Config.bannerAPI);
  }
}
