import 'package:billy_application/base/show_custom_snackbar.dart';
import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/pages/auth/sign_up_page.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_form_helper.dart';
import 'package:billy_application/widgets/app_progress_hub.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:billy_application/widgets/small_text.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SignInPage extends StatefulWidget {
  const SignInPage({super.key});

  @override
  State<SignInPage> createState() => _SignInPageState();
}

class _SignInPageState extends State<SignInPage> {
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  late String customerContact;
  late String customerPassword;
  late bool hidePassword = true;
  late bool passwordValidate = true;

  void _login(AuthController authController) {
    setState(() {
      passwordValidate = true;
    });

    final form = globalFormKey.currentState;
    if (form!.validate()) {
      form.save();

      authController.login(customerContact, customerPassword).then((response) {
        if (response.status) {
          showCustomSnackBar(
            message: response.message,
            title: "Customer Login",
          );
          // Navigator.of(context).pop();
          Get.toNamed(RouteHelper.getInitial());
        } else {
          showCustomSnackBar(
            isError: !response.status,
            message: response.message,
            title: "Customer Login",
          );
        }
      });
    }
  }

  void _otpGenerate(AuthController authController) {
    setState(() {
      passwordValidate = false;
    });

    final form = globalFormKey.currentState;
    if (form!.validate()) {
      form.save();
      authController.createOTPLogin(customerContact).then((response) {
        if (response.status) {
          // showCustomSnackBar(
          //   message: response.message,
          //   title: "Customer Login",
          // );
          Get.toNamed(
            RouteHelper.getOTPLogin(
              customerContact,
              response.message,
            ),
          );
        } else {
          showCustomSnackBar(
            isError: !response.status,
            message: response.message,
            title: "Customer Login",
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
                    // Hello Text
                    Container(
                      margin: EdgeInsets.only(left: Dimensions.width20),
                      width: double.maxFinite,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Hello",
                            style: TextStyle(
                              fontSize: Dimensions.font70,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            "Sign into your account",
                            style: TextStyle(
                              color: Colors.grey[500],
                              fontSize: Dimensions.font16,
                            ),
                          ),
                        ],
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.height25,
                    ),
                    // Mobile No.
                    AppFormHelper.inputFieldWidget(
                      "customerContact",
                      "Contact Number",
                      (onValidateVal) {
                        if (onValidateVal.isEmpty) {
                          return '* Required';
                        }
                        return null;
                      },
                      (onSavedVal) => {
                        customerContact = onSavedVal.toString().trim(),
                      },
                      textInputType: TextInputType.phone,
                      prefixIcon: Icons.phone,
                    ),
                    SizedBox(
                      height: Dimensions.height25,
                    ),
                    // Password
                    AppFormHelper.inputFieldWidget(
                      "customerPassword",
                      "Password",
                      (onValidateVal) {
                        if (passwordValidate) {
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
                    ),
                    SizedBox(
                      height: Dimensions.height20,
                    ),
                    // Tag line
                    Row(
                      children: [
                        Expanded(child: Container()),
                        RichText(
                          text: TextSpan(
                            text: "Sign into your account",
                            style: TextStyle(
                              color: Colors.grey[500],
                              fontSize: Dimensions.font18,
                            ),
                          ),
                        ),
                        SizedBox(
                          width: Dimensions.width20,
                        ),
                      ],
                    ),
                    SizedBox(
                      height: Dimensions.screenHeight * 0.05,
                    ),
                    // Sign In Button
                    GestureDetector(
                      onTap: (() => _login(authController)),
                      child: Container(
                        width: Dimensions.screenWidth / 2,
                        height: Dimensions.screenHeight / 13,
                        decoration: BoxDecoration(
                          borderRadius:
                              BorderRadius.circular(Dimensions.radius30),
                          color: AppColors.mainColor,
                        ),
                        child: Center(
                          child: BigText(
                            text: "Sign In",
                            size: Dimensions.font24,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // or
                    SmallText(
                      text: "or",
                      size: Dimensions.font20,
                      color: Colors.grey[500],
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Genrate OTP
                    GestureDetector(
                      onTap: (() => _otpGenerate(authController)),
                      child: Container(
                        width: Dimensions.screenWidth / 2,
                        height: Dimensions.screenHeight / 13,
                        decoration: BoxDecoration(
                          borderRadius:
                              BorderRadius.circular(Dimensions.radius30),
                          color: AppColors.titleColor,
                        ),
                        child: Center(
                          child: BigText(
                            text: "Generate OTP",
                            size: Dimensions.font24,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.screenHeight * 0.05,
                    ),
                    // Don't have an account?
                    RichText(
                      text: TextSpan(
                        text: "Don't have an account?",
                        style: TextStyle(
                          color: Colors.grey[500],
                          fontSize: Dimensions.font20,
                        ),
                        children: [
                          TextSpan(
                            recognizer: TapGestureRecognizer()
                              ..onTap = () => Get.to(
                                    () => const SignUpPage(),
                                    transition: Transition.leftToRight,
                                  ),
                            text: " Create",
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: AppColors.mainBlackColor,
                              fontSize: Dimensions.font20,
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
      ),
    );
  }
}
