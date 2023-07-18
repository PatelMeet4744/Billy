import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:billy_application/widgets/widget_account.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:line_icons/line_icons.dart';

class AccountPage extends StatelessWidget {
  const AccountPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mainColor,
        title: BigText(
          text: "Profile",
          size: Dimensions.font24,
          color: Colors.white,
        ),
        leading: IconButton(
          onPressed: () => Get.offNamed(RouteHelper.getInitial()),
          icon: const Icon(
            Icons.arrow_back,
            color: Colors.white,
          ),
        ),
      ),
      body: Container(
        width: double.maxFinite,
        margin: EdgeInsets.only(top: Dimensions.height20),
        child: Expanded(
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // profile icon
                AppIcon(
                  // icon: LineIcons.user,
                  icon: Icons.person,
                  backgroundColor: AppColors.mainColor,
                  iconColor: Colors.white,
                  iconSize: Dimensions.height121 / 2,
                  size: Dimensions.height121,
                ),
                SizedBox(
                  height: Dimensions.height10,
                ),
                // Option List
                Column(
                  children: [
                    // Option 1
                    AccountWidget(
                      optionTitle: "Orders",
                      optionSubTitle: "Check my orders",
                      optionIcon: AppIcon(
                        icon: LineIcons.shoppingCart,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 2
                    AccountWidget(
                      optionTitle: "Coupons",
                      optionSubTitle: "Discounts And Gifts",
                      optionIcon: AppIcon(
                        icon: LineIcons.gift,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 3
                    AccountWidget(
                      optionTitle: "Edit Profile",
                      optionSubTitle: "Update your profile",
                      optionIcon: AppIcon(
                        icon: LineIcons.userEdit,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        Get.toNamed(RouteHelper.getEditProfile()),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 4
                    AccountWidget(
                      optionTitle: "Save Addresses",
                      optionSubTitle: "change your address",
                      optionIcon: AppIcon(
                        icon: LineIcons.mapMarked,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 5
                    AccountWidget(
                      optionTitle: "Wallet",
                      optionSubTitle: "Rewords on your Wallet",
                      optionIcon: AppIcon(
                        icon: LineIcons.wallet,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 6
                    AccountWidget(
                      optionTitle: "Select Language",
                      optionSubTitle: "Localization Support",
                      optionIcon: AppIcon(
                        icon: LineIcons.language,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 7
                    AccountWidget(
                      optionTitle: "Reviews",
                      optionSubTitle: "Review on order",
                      optionIcon: AppIcon(
                        icon: Icons.reviews,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 8
                    AccountWidget(
                      optionTitle: "Refer & Earn",
                      optionSubTitle:
                          "Refer the apps to your friends or family members",
                      optionIcon: AppIcon(
                        icon: LineIcons.indianRupeeSign,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 9
                    AccountWidget(
                      optionTitle: "Setting",
                      optionSubTitle: "Change billy setting",
                      optionIcon: AppIcon(
                        icon: Icons.settings,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                      ),
                      optiononTap: () => {
                        Get.offNamed(RouteHelper.getSetting()),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Option 10
                    AccountWidget(
                      optionTitle: "Terms and Conditions",
                      optionSubTitle: "Rewords on your Wallet",
                      optionIcon: AppIcon(
                        icon: LineIcons.fileContract,
                        iconSize: Dimensions.height45 / 2,
                        size: Dimensions.height45,
                        backgroundColor: AppColors.mainColor,
                        iconColor: Colors.white,
                      ),
                      optiononTap: () => {
                        // Get.offNamed(RouteHelper.splashPage),
                      },
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    //  Logout
                    Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius:
                            BorderRadius.circular(Dimensions.radius30),
                        boxShadow: [
                          BoxShadow(
                            blurRadius: 10,
                            spreadRadius: 7,
                            offset: const Offset(1, 10),
                            color: Colors.grey.withOpacity(0.1),
                          ),
                        ],
                      ),
                      height: Dimensions.height60,
                      width: Dimensions.width160,
                      child: TextButton(
                        onPressed: () {
                          if (Get.find<AuthController>().userLoggedIn()) {
                            Get.find<AuthController>().clearSharedData();
                            Get.offNamed(RouteHelper.getLogin());
                          }
                        },
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: [
                            Icon(
                              color: AppColors.mainColor,
                              Icons.logout,
                              size: Dimensions.height25,
                            ),
                            SizedBox(
                              width: Dimensions.width10,
                            ),
                            BigText(text: "Log Out"),
                          ],
                        ),
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
