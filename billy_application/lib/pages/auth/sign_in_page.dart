import 'package:billy_application/pages/auth/sign_up_page.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_text_field.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SignInPage extends StatelessWidget {
  const SignInPage({super.key});

  @override
  Widget build(BuildContext context) {
    var passwordController = TextEditingController();
    var contactController = TextEditingController();

    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
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
            AppTextField(
              textController: contactController,
              hinText: "Phone",
              icon: Icons.phone,
              textInputType: TextInputType.phone,
            ),
            SizedBox(
              height: Dimensions.height25,
            ),
            // Password
            AppTextField(
              textController: passwordController,
              hinText: "Password",
              icon: Icons.password_outlined,
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
            Container(
              width: Dimensions.screenWidth / 2,
              height: Dimensions.screenHeight / 13,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(Dimensions.radius30),
                  color: AppColors.mainColor),
              child: Center(
                child: BigText(
                  text: "Sign In",
                  size: Dimensions.font24,
                  color: Colors.white,
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
                            transition: Transition.fade,
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
    );
  }
}
