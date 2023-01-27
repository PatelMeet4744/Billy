import 'package:billy_application/base/show_custom_snackbar.dart';
import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_form_helper.dart';
import 'package:billy_application/widgets/app_progress_hub.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ResetPasswordPage extends StatefulWidget {
  final String? customerContact;
  final String? otp;
  final String? verificationId;
  const ResetPasswordPage(
      {super.key, this.customerContact, this.otp, this.verificationId});

  @override
  State<ResetPasswordPage> createState() => _ResetPasswordPageState();
}

class _ResetPasswordPageState extends State<ResetPasswordPage> {
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  late String customerPassword;
  late String customerConfirmPassword;
  late bool hidePassword = true;
  late bool hideConfirmPassword = true;

  void _resetPassword(AuthController authController) {
    final form = globalFormKey.currentState;

    if (form!.validate()) {
      form.save();

      authController
          .resetPassword(widget.customerContact!, customerPassword, widget.otp!,
              widget.verificationId!)
          .then((response) async {
        if (response.status) {
          showCustomSnackBar(
            message: response.message,
            title: "Reset Password",
          );
          Navigator.of(context).pop();
          Get.toNamed(RouteHelper.getLogin());
        } else {
          showCustomSnackBar(
            isError: !response.status,
            message: response.message,
            title: "Reset Password",
          );
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: GetBuilder<AuthController>(
        builder: (authController) {
          // Reset Password UI
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
                    Center(
                      child: Image.asset(
                        "assets/image/BillyLogo.png",
                        fit: BoxFit.contain,
                        width: Dimensions.width150,
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.screenHeight * 0.05,
                    ),
                    // Reset Password Text
                    Container(
                      margin: EdgeInsets.only(left: Dimensions.width20),
                      width: double.maxFinite,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Reset Password",
                            style: TextStyle(
                              fontSize: Dimensions.font30,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.height25,
                    ),
                    // Password
                    AppFormHelper.inputFieldWidget(
                      "customerPassword",
                      "Password",
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
                      "Confirm Password",
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
                          return 'Invalid Customer Confirm Password.';
                        }
                        if (onValidateVal != customerPassword) {
                          return 'Customer Confirm Password Not Matched.';
                        }
                        return null;
                      },
                      (onSavedVal) => {
                        customerConfirmPassword = onSavedVal.toString().trim(),
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
                    // Sign Up Button
                    GestureDetector(
                      onTap: () {
                        _resetPassword(authController);
                      },
                      child: Container(
                        width: (Dimensions.screenWidth / 2) + 45,
                        height: Dimensions.screenHeight / 14,
                        decoration: BoxDecoration(
                            borderRadius:
                                BorderRadius.circular(Dimensions.radius30),
                            color: AppColors.mainColor),
                        child: Center(
                          child: BigText(
                            text: "Reset Password",
                            size: Dimensions.font24,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
