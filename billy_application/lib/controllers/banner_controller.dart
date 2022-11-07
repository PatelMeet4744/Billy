import 'package:billy_application/data/repository/banner_repo.dart';
import 'package:billy_application/models/banner_model.dart';
import 'package:get/get.dart';

class BannerController extends GetxController {
  late final BannerRepo bannerRepo;

  BannerController({required this.bannerRepo});
  List<Data> _bannerList = [];
  List<Data> get bannerList => _bannerList;

  bool _isLoaded = false;
  bool get isLoaded => _isLoaded;
  
  Future<void> getBannerList() async {
    Response response = await bannerRepo.getBannerList();
    if (response.statusCode == 200) {
      //print("get Banner");
      _bannerList = [];
      _bannerList.addAll(BannerModel.fromJson(response.body).data);
      // print(_bannerList);
      _isLoaded = true;
      update();
    } else {}
  }
}
