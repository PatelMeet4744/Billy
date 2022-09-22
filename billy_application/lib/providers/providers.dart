import 'package:shared_preferences/shared_preferences.dart';

class Providers {
  final Future<SharedPreferences> _pref = SharedPreferences.getInstance();

  //  For Onboard Setting
  void setOnboardState(bool status) async {
    final instance = await _pref;

    instance.setBool('status', status);
  }

  Future<bool> getOnboardState() async {
    final instance = await _pref;

    if (instance.containsKey('status')) {
      final value = instance.getBool('status');

      return value!;
    } else {
      return false;
    }
  }
}
