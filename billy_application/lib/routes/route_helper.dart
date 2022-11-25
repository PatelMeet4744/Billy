// ignore_for_file: prefer_const_constructors

import 'package:billy_application/pages/auth/sign_in_page.dart';
import 'package:billy_application/pages/auth/sign_up_page.dart';
import 'package:billy_application/pages/home/home_page.dart';
import 'package:billy_application/pages/login/otp_verify_page.dart';
import 'package:billy_application/pages/splash/splash_page.dart';
import 'package:get/get.dart';

class RouteHelper {
  static const String splashPage = "/splash-page";
  static const String initial = "/";
  static const String register = "/register";
  static const String login = "/login";
  static const String otplogin = "/otp-login";

  static String getSplashPage() => '$splashPage';
  static String getInitial() => '$initial';
  static String getRegister() => '$register';
  static String getLogin() => '$login';
  static String getOTPLogin(String mobileNo, String otpHash) =>
      '$otplogin?mobileNo=$mobileNo&otpHash=$otpHash';

  static List<GetPage> routes = [
    GetPage(name: splashPage, page: () => SplashPage()),
    GetPage(name: initial, page: () => HomePage()),
    GetPage(
      name: register,
      page: () => SignUpPage(),
      transition: Transition.leftToRight,
    ),
    GetPage(name: login, page: () => SignInPage()),
    GetPage(
      name: otplogin,
      page: () {
        // ignore: avoid_print
        print("otp verify page called");
        var mobileNo = Get.parameters['mobileNo'];
        var otpHash = Get.parameters['otpHash'];

        // ignore: avoid_print
        print("Get Parameter mobileNo $mobileNo");
        // ignore: avoid_print
        print("Get Parameter otpHash $otpHash");
        return OTPVerifyPage(customerContact: mobileNo, hash: otpHash);
      },
      transition: Transition.rightToLeft,
    ),
  ];
}
