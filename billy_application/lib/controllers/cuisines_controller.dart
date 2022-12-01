import 'package:billy_application/data/repository/cuisines_repo.dart';
import 'package:billy_application/models/cuisines_model.dart';
import 'package:get/get.dart';

class CuisinesController extends GetxController {
  late final CuisinesRepo cuisinesRepo;

  CuisinesController({required this.cuisinesRepo});
  List<Data> _cuisinesList = [];
  List<Data> get cuisinesList => _cuisinesList;

  bool _isLoaded = false;
  bool get isLoaded => _isLoaded;

  Future<void> getCuisinesList() async {
    Response response = await cuisinesRepo.getCuisinesList();
    if (response.statusCode == 200) {
      //print("get Cuisines");
      _cuisinesList = [];
      _cuisinesList.addAll(CuisinesModel.fromJson(response.body).data);
      // print(_cuisinesList);
      _isLoaded = true;
      update();
    } else {}
  }
}
