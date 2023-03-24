// ignore_for_file: prefer_const_constructors

import 'package:billy_application/pages/account/change_password_page.dart';
import 'package:billy_application/pages/account/edit_profile.dart';
import 'package:billy_application/pages/account/setting_page.dart';
import 'package:billy_application/pages/auth/reset_password_page.dart';
import 'package:billy_application/pages/auth/sign_in_page.dart';
import 'package:billy_application/pages/auth/sign_up_page.dart';
import 'package:billy_application/pages/home/home_page.dart';
import 'package:billy_application/pages/item/item_list_page.dart';
import 'package:billy_application/pages/login/otp_verify_page.dart';
import 'package:billy_application/pages/onboard/onboarding.dart';
import 'package:billy_application/pages/restaurant/restaurant_list_page.dart';
import 'package:billy_application/pages/splash/splash_page.dart';
import 'package:get/get.dart';

class RouteHelper {
  static const String splashPage = "/splash-page";
  static const String onboardPage = "/onboard-page";
  static const String initial = "/";
  static const String register = "/register";
  static const String login = "/login";
  static const String otplogin = "/otp-login";
  static const String resetPasswordPage = "/reset-password-page";
  static const String editprofile = "/edit-profile";
  static const String setting = "/setting-profile";
  static const String changePasswordPage = "/change-password-page";
  static const String restaurantListPage = "/restaurant-list-page";
  static const String itemListPage = "/item-list-page";

  static String getSplashPage() => splashPage;
  static String getOnboardPage() => onboardPage;
  static String getInitial() => initial;
  static String getRegister() => register;
  static String getLogin() => login;
  static String getOTPLogin(
          String mobileNo, String verificationId, bool isResetPage) =>
      '$otplogin?mobileNo=$mobileNo&verificationId=$verificationId&isResetPage=$isResetPage';
  // static String getOTPLogin(String mobileNo, String otpHash, String verificationId) =>
  //     '$otplogin?mobileNo=$mobileNo&otpHash=$otpHash&verificationId=$verificationId';
  static String getResetPasswordPage(
          String mobileNo, String otp, String verificationId) =>
      '$resetPasswordPage?mobileNo=$mobileNo&otp=$otp&verificationId=$verificationId';
  static String getEditProfile() => editprofile;
  static String getSetting() => setting;
  static String getChangePasswordPage() => changePasswordPage;
  // static String getRestaurantListPage(String cuisinesId) =>
  //     '$restaurantListPage?cuisinesId=$cuisinesId';
  static String getRestaurantListPage(int pageId) =>
      '$restaurantListPage?pageId=$pageId';
  static String getItemListPage(int pageId) => '$itemListPage?pageId=$pageId';

  static List<GetPage> routes = [
    GetPage(name: splashPage, page: () => SplashPage()),
    GetPage(
      name: onboardPage,
      page: () => Onboarding(),
      transition: Transition.leftToRight,
    ),
    GetPage(
      name: initial,
      page: () => HomePage(),
      transition: Transition.rightToLeft,
    ),
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
        // var otpHash = Get.parameters['otpHash'];
        var verificationId = Get.parameters['verificationId'];
        var isResetPage =
            Get.parameters['isResetPage']?.toLowerCase() == 'true';

        // ignore: avoid_print
        print("Get Parameter mobileNo $mobileNo");
        // ignore: avoid_print
        print("Get Parameter verificationId $verificationId");
        // ignore: avoid_print
        print("Get Parameter isResetPage $isResetPage");
        // ignore: avoid_print
        // print("Get Parameter otpHash $otpHash");
        // return OTPVerifyPage(customerContact: mobileNo, hash: otpHash,verificationId: verificationId);
        return OTPVerifyPage(
          customerContact: mobileNo,
          verificationId: verificationId,
          isResetPage: isResetPage,
        );
      },
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: resetPasswordPage,
      page: () {
        // ignore: avoid_print
        print("reset password page called");
        var mobileNo = Get.parameters['mobileNo'];
        var otp = Get.parameters['otp'];
        var verificationId = Get.parameters['verificationId'];

        // ignore: avoid_print
        print("Get Parameter mobileNo $mobileNo");
        // ignore: avoid_print
        print("Get Parameter otp $otp");
        // ignore: avoid_print
        print("Get Parameter verificationId $verificationId");

        return ResetPasswordPage(
          customerContact: mobileNo,
          otp: otp,
          verificationId: verificationId,
        );
      },
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: editprofile,
      page: () => EditProfile(),
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: setting,
      page: () => SettingPage(),
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: changePasswordPage,
      page: () => ChangePasswordPage(),
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: restaurantListPage,
      page: () {
        var pageId = Get.parameters['pageId'];
        return RestaurantListPage(pageId: int.parse(pageId!));
      },
      transition: Transition.rightToLeft,
    ),
    GetPage(
      name: itemListPage,
      page: () {
        var pageId = Get.parameters['pageId'];
        return ItemListPage(pageId: int.parse(pageId!));
      },
      transition: Transition.rightToLeft,
    )
  ];
}
