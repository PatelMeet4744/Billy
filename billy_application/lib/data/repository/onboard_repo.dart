import 'package:billy_application/utils/app_constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

class OnboardRepo {
  final SharedPreferences sharedPreferences;

  OnboardRepo({
    required this.sharedPreferences,
  });

  Future<void> setOnboardState(bool status) async {
    try {
      sharedPreferences.setBool(AppConstants.onboard, status);
    } catch (e) {
      // ignore: avoid_print
      print(e.toString());
    }
  }

  bool getOnboardState() {
    return sharedPreferences.getBool(AppConstants.onboard) ?? false;
  }
}
