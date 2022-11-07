// ignore_for_file: prefer_const_constructors

import 'package:billy_application/pages/home/main_food_page.dart';
import 'package:billy_application/pages/login/otp_login_page.dart';
import 'package:billy_application/pages/register/register_page.dart';
import 'package:billy_application/pages/splash/splash_page.dart';
import 'package:get/get.dart';

class RouteHelper {
  static const String splashPage = "/splash-page";
  static const String initial = "/";
  static const String register = "/register";
  static const String login = "/login";

  static String getSplashPage() => '$splashPage';
  static String getInitial() => '$initial';
  static String getRegister() => '$register';
  static String getLogin() => '$login';

  static List<GetPage> routes = [
    GetPage(name: splashPage, page: () => SplashPage()),
    GetPage(name: initial, page: () => MainFoodPage()),
    GetPage(name: register, page: () => RegisterPage()),
    GetPage(name: login, page: () => LoginPage()),
  ];
}
