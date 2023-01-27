import 'package:billy_application/base/show_custom_snackbar.dart';
import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/controllers/customer_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_form_helper.dart';
import 'package:billy_application/widgets/app_progress_hub.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ChangePasswordPage extends StatefulWidget {
  const ChangePasswordPage({super.key});

  @override
  State<ChangePasswordPage> createState() => _ChangePasswordPageState();
}

class _ChangePasswordPageState extends State<ChangePasswordPage> {
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  late String customerId = "";
  late String customerOldPassword;
  late String customerPassword;
  late String customerConfirmPassword;
  late bool hideOldPassword = true;
  late bool hidePassword = true;
  late bool hideConfirmPassword = true;

  void _changePassword(AuthController authController) {
    final form = globalFormKey.currentState;

    if (form!.validate()) {
      form.save();
      if (authController.userLoggedIn()) {
        customerId = authController.getUserId();
      } else {
        Navigator.of(context).pop();
        Get.toNamed(RouteHelper.getLogin());
      }
      authController
          .changePassword(customerId, customerOldPassword, customerPassword)
          .then((response) async {
        if (response.status) {
          showCustomSnackBar(
            message: response.message,
            title: "Change Password",
          );
          if (authController.userLoggedIn()) {
            authController.clearSharedData();
            Get.offNamed(RouteHelper.getLogin());
          }
        } else {
          showCustomSnackBar(
            isError: !response.status,
            message: response.message,
            title: "Change Password",
          );
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    bool userLoggedIn = Get.find<AuthController>().userLoggedIn();
    if (userLoggedIn) {
      Get.find<CustomerController>().getCustomerInfo();
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mainColor,
        title: BigText(
          text: "Change Password",
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
      body: userLoggedIn
          ? (GetBuilder<AuthController>(
              builder: (authController) {
                // Change Password UI
                return AppProgressHUD(
                  inAsyncCall: authController.isLoading,
                  opacity: 0.3,
                  key: UniqueKey(),
                  child: Form(
                    key: globalFormKey,
                    child: SingleChildScrollView(
                      physics: const BouncingScrollPhysics(),
                      child: Column(
                        children: [
                          // App Logo
                          SizedBox(
                            height: Dimensions.screenHeight * 0.10,
                          ),
                          // OLD Password
                          AppFormHelper.inputFieldWidget(
                            "customerOldPassword",
                            "Old Password",
                            (onValidateVal) {
                              if (onValidateVal.isEmpty) {
                                return '* Required';
                              }
                              /*
                      The password must match:
                        * At least 8 - 16 characters,
                        * must contain at least 1 uppercase letter,
                        * must contain at least 1 lowercase letter,
                        * and 1 number
                        * Can contain any of this special characters $ % # * & - .
                  */
                              bool isPasswordValid = RegExp(
                                      r"^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$")
                                  .hasMatch(onValidateVal);
                              if (!isPasswordValid) {
                                return 'Invalid Customer Old Password.';
                              }
                              return null;
                            },
                            (onSavedVal) => {
                              customerOldPassword =
                                  onSavedVal.toString().trim(),
                            },
                            prefixIcon: Icons.password_outlined,
                            obscureText: hideOldPassword,
                            suffixIcon: IconButton(
                              onPressed: () {
                                setState(() {
                                  hideOldPassword = !hideOldPassword;
                                });
                              },
                              color: Colors.black.withOpacity(0.5),
                              icon: Icon(hideOldPassword
                                  ? Icons.visibility_off
                                  : Icons.visibility),
                            ),
                          ),
                          SizedBox(
                            height: Dimensions.height20,
                          ),
                          // Password
                          AppFormHelper.inputFieldWidget(
                            "customerPassword",
                            "New Password",
                            (onValidateVal) {
                              if (onValidateVal.isEmpty) {
                                return '* Required';
                              }
                              /*
                      The password must match:
                        * At least 8 - 16 characters,
                        * must contain at least 1 uppercase letter,
                        * must contain at least 1 lowercase letter,
                        * and 1 number
                        * Can contain any of this special characters $ % # * & - .
                  */
                              bool isPasswordValid = RegExp(
                                      r"^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$")
                                  .hasMatch(onValidateVal);
                              if (!isPasswordValid) {
                                return 'Invalid Customer Password.';
                              }
                              return null;
                            },
                            (onSavedVal) => {
                              customerPassword = onSavedVal.toString().trim(),
                            },
                            prefixIcon: Icons.password_outlined,
                            obscureText: hidePassword,
                            suffixIcon: IconButton(
                              onPressed: () {
                                setState(() {
                                  hidePassword = !hidePassword;
                                });
                              },
                              color: Colors.black.withOpacity(0.5),
                              icon: Icon(hidePassword
                                  ? Icons.visibility_off
                                  : Icons.visibility),
                            ),
                            onChange: (val) {
                              customerPassword = val;
                            },
                          ),
                          SizedBox(
                            height: Dimensions.height20,
                          ),
                          // Confirm Password
                          AppFormHelper.inputFieldWidget(
                            "customerConfirmPassword",
                            "Confirm New Password",
                            (onValidateVal) {
                              if (onValidateVal.isEmpty) {
                                return '* Required';
                              }
                              /*
                      The password must match:
                        * At least 8 - 16 characters,
                        * must contain at least 1 uppercase letter,
                        * must contain at least 1 lowercase letter,
                        * and 1 number
                        * Can contain any of this special characters $ % # * & - .
                  */
                              bool isPasswordValid = RegExp(
                                      r"^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$")
                                  .hasMatch(onValidateVal);
                              if (!isPasswordValid) {
                                return 'Invalid Customer Confirm New Password.';
                              }
                              if (onValidateVal != customerPassword) {
                                return 'Customer Confirm New Password Not Matched.';
                              }
                              return null;
                            },
                            (onSavedVal) => {
                              customerConfirmPassword =
                                  onSavedVal.toString().trim(),
                            },
                            prefixIcon: Icons.password_outlined,
                            obscureText: hideConfirmPassword,
                            suffixIcon: IconButton(
                              onPressed: () {
                                setState(() {
                                  hideConfirmPassword = !hideConfirmPassword;
                                });
                              },
                              // color: Colors.redAccent.withOpacity(0.4),
                              color: Colors.black.withOpacity(0.5),
                              icon: Icon(hideConfirmPassword
                                  ? Icons.visibility_off
                                  : Icons.visibility),
                            ),
                          ),
                          SizedBox(
                            height: Dimensions.height25,
                          ),
                          // Buttons
                          Padding(
                            padding: EdgeInsets.only(
                                left: Dimensions.width15,
                                right: Dimensions.width15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                ElevatedButton(
                                  onPressed: () {
                                    _changePassword(authController);
                                  },
                                  style: ElevatedButton.styleFrom(
                                    padding: EdgeInsets.symmetric(
                                      horizontal: Dimensions.width50,
                                    ),
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(
                                          Dimensions.radius20),
                                    ),
                                  ),
                                  child: Text(
                                    "CHANGE",
                                    style: TextStyle(
                                      fontSize: Dimensions.font15,
                                      letterSpacing: 2,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ))
          : Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    width: double.maxFinite,
                    height: Dimensions.height150 + Dimensions.height60,
                    margin: EdgeInsets.only(
                      left: Dimensions.width20,
                      right: Dimensions.width20,
                    ),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(Dimensions.radius20),
                      image: const DecorationImage(
                        fit: BoxFit.cover,
                        image: AssetImage("assets/image/signintocontinue.png"),
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      Get.toNamed(RouteHelper.getLogin());
                    },
                    child: Container(
                      width: double.maxFinite,
                      height: Dimensions.height150 + Dimensions.height60,
                      margin: EdgeInsets.only(
                        left: Dimensions.width20,
                        right: Dimensions.width20,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.mainColor,
                        borderRadius:
                            BorderRadius.circular(Dimensions.radius20),
                      ),
                      child: Center(
                        child: BigText(
                          text: "Sign in",
                          color: Colors.white,
                          size: Dimensions.font26,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
