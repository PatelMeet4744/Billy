import 'package:billy_application/data/repository/onboard_repo.dart';
import 'package:get/get.dart';

class OnboardController extends GetxController implements GetxService {
  final OnboardRepo onboardRepo;

  OnboardController({
    required this.onboardRepo,
  });

  void setOnboardState(bool status) {
    onboardRepo.setOnboardState(status);
  }

  bool getOnboardState() {
    return onboardRepo.getOnboardState();
  }
}
