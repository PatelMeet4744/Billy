import 'package:billy_application/base/show_custom_snackbar.dart';
import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/models/signup_body_model.dart';
import 'package:billy_application/pages/auth/sign_in_page.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_form_helper.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:line_icons/line_icons.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  // bool isAsyncCallProcess = false;
  late String customerName;
  late String customerEmailID;
  late String customerPassword;
  late String customerConfirmPassword;
  late String customerContact;
  late bool hidePassword = true;
  late bool hideConfirmPassword = true;

  var singUpImages = [
    "t.png",
    "f.png",
    "g.png",
  ];

  void _registration(AuthController authController) {
    final form = globalFormKey.currentState;

    if (form!.validate()) {
      form.save();

      SignUpBody signUpBody = SignUpBody(
        customerName: customerName,
        customerEmailID: customerEmailID,
        customerPassword: customerPassword,
        customerContact: customerContact,
      );

      authController.registration(signUpBody).then((response) {
        if (response.status) {
          showCustomSnackBar(
            message: response.message,
            title: "Customer Registration",
          );
          Navigator.of(context).pop();
          Get.toNamed(RouteHelper.getLogin());
        } else {
          showCustomSnackBar(
            isError: !response.status,
            message: response.message,
            title: "Customer Registration",
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
          // Register UI
          return ProgressHUD(
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
                    // Name
                    AppFormHelper.inputFieldWidget(
                      "customerName",
                      "Name",
                      (onValidateVal) {
                        if (onValidateVal.isEmpty) {
                          return '* Required';
                        }
                        return null;
                      },
                      (onSavedVal) => {
                        customerName = onSavedVal.toString().trim(),
                      },
                      prefixIcon: LineIcons.userEdit,
                      textInputType: TextInputType.name,
                    ),
                    SizedBox(
                      height: Dimensions.height20,
                    ),
                    // Email ID
                    AppFormHelper.inputFieldWidget(
                      "customerEmailID",
                      "Email ID",
                      (onValidateVal) {
                        if (onValidateVal.isEmpty) {
                          return '* Required';
                        }
                        bool emailValid =
                            RegExp(r"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
                                .hasMatch(onValidateVal);
                        if (!emailValid) {
                          return 'Invalid Customer Email ID.';
                        }
                        return null;
                      },
                      (onSavedVal) => {
                        customerEmailID = onSavedVal.toString().trim(),
                      },
                      prefixIcon: Icons.email_outlined,
                      textInputType: TextInputType.emailAddress,
                    ),
                    SizedBox(
                      height: Dimensions.height20,
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
                      height: Dimensions.height20,
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
                    // Sign Up Button
                    GestureDetector(
                      onTap: () {
                        _registration(authController);
                      },
                      child: Container(
                        width: Dimensions.screenWidth / 2,
                        height: Dimensions.screenHeight / 13,
                        decoration: BoxDecoration(
                            borderRadius:
                                BorderRadius.circular(Dimensions.radius30),
                            color: AppColors.mainColor),
                        child: Center(
                          child: BigText(
                            text: "Sign Up",
                            size: Dimensions.font24,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Have an account already?
                    RichText(
                      text: TextSpan(
                        recognizer: TapGestureRecognizer()
                          ..onTap = () => Get.to(
                                () => const SignInPage(),
                                transition: Transition.rightToLeft,
                              ),
                        text: "Have an account already?",
                        style: TextStyle(
                          color: Colors.grey[500],
                          fontSize: Dimensions.font18,
                        ),
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.screenHeight * 0.05,
                    ),
                    // Sign up options
                    RichText(
                      text: TextSpan(
                        recognizer: TapGestureRecognizer()
                          ..onTap = () => const SignInPage(),
                        text: "Sign up using one of the following methods",
                        style: TextStyle(
                          color: Colors.grey[500],
                          fontSize: Dimensions.font16,
                        ),
                      ),
                    ),
                    SizedBox(
                      height: Dimensions.height10,
                    ),
                    // Social Media Icons
                    Wrap(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: CircleAvatar(
                            radius: Dimensions.radius20,
                            backgroundImage:
                                AssetImage("assets/image/${singUpImages[0]}"),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: CircleAvatar(
                            radius: Dimensions.radius20,
                            backgroundImage:
                                AssetImage("assets/image/${singUpImages[1]}"),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: CircleAvatar(
                            radius: Dimensions.radius20,
                            backgroundImage:
                                AssetImage("assets/image/${singUpImages[2]}"),
                          ),
                        ),
                      ],
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
