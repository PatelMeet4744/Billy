import 'package:get/get.dart';

class Dimensions {
  static double screenHeight = Get.context!.height; // height: 781.09
  static double screenWidth = Get.context!.width; // width: 392.73

  static double pageView = screenHeight / 3.72; // height: 230 210
  static double pageViewContainer = screenHeight / 3.91; // height: 220 200
  // static double pageView = screenHeight / 3.40; // height: 230
  // static double pageViewContainer = screenHeight / 3.55; // height: 220
  static double pageViewTextContainer = screenHeight / 6.51; // height: 120

  //dynamic height padding and margin
  static double height2 = screenHeight / 390.55;
  static double height5 = screenHeight / 156.22;
  static double height10 = screenHeight / 78.11;
  static double height15 = screenHeight / 52.07;
  static double height20 = screenHeight / 39.05;
  static double height30 = screenHeight / 26.04;
  static double height45 = screenHeight / 17.36;
  static double height50 = screenHeight / 15.62;
  static double height62_5 = screenHeight / 12.5;
  static double height75 = screenHeight / 10.41;
  static double height100 = screenHeight / 7.81;
  static double height125 = screenHeight / 6.25;
  static double height150 = screenHeight / 5.21;

  //dynamic screenWidth padding and margin
  static double width5 = screenWidth / 78.55;
  static double width10 = screenWidth / 39.27;
  static double width15 = screenWidth / 26.18;
  static double width20 = screenWidth / 19.64;
  static double width30 = screenWidth / 13.09;
  static double width45 = screenWidth / 8.73;
  static double width50 = screenWidth / 7.85;
  static double width62_5 = screenWidth / 6.28;
  static double width75 = screenWidth / 5.24;

  //dynamic font size
  static double font12 = screenHeight / 65.09;
  static double font14 = screenHeight / 55.79;
  static double font15 = screenHeight / 52.07;
  static double font16 = screenHeight / 48.82;
  static double font20 = screenHeight / 39.05;
  static double font24 = screenHeight / 32.55;
  static double font26 = screenHeight / 30.04;
  static double font30 = screenHeight / 26.04;

  //dynamic icon size
  static double iconSize16 = screenHeight / 48.82;
  static double iconSize24 = screenHeight / 32.55;
  static double iconSize75 = screenHeight / 10.41;
}
