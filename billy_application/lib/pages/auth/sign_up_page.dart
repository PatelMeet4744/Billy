import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_text_field.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:line_icons/line_icons.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    var nameController = TextEditingController();
    var emailController = TextEditingController();
    var passwordController = TextEditingController();
    var confirmPasswordController = TextEditingController();
    var contactController = TextEditingController();
    var singUpImages = [
      "t.png",
      "f.png",
      "g.png",
    ];

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
            // Name
            AppTextField(
              textController: nameController,
              hinText: "Name",
              icon: LineIcons.userEdit,
              textInputType: TextInputType.name,
            ),
            SizedBox(
              height: Dimensions.height20,
            ),
            // Email ID
            AppTextField(
              textController: emailController,
              hinText: "Email ID",
              icon: Icons.email_outlined,
              textInputType: TextInputType.emailAddress,
            ),
            SizedBox(
              height: Dimensions.height20,
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
            // Confirm Password
            AppTextField(
              textController: confirmPasswordController,
              hinText: "Confirm Password",
              icon: Icons.password_outlined,
            ),
            SizedBox(
              height: Dimensions.height20,
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
            // Sign Up Button
            Container(
              width: Dimensions.screenWidth / 2,
              height: Dimensions.screenHeight / 13,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(Dimensions.radius30),
                  color: AppColors.mainColor),
              child: Center(
                child: BigText(
                  text: "Sign Up",
                  size: Dimensions.font24,
                  color: Colors.white,
                ),
              ),
            ),
            SizedBox(
              height: Dimensions.height10,
            ),
            // Have an account already?
            RichText(
              text: TextSpan(
                recognizer: TapGestureRecognizer()..onTap = () => Get.back(),
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
                recognizer: TapGestureRecognizer()..onTap = () => Get.back(),
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
            )
          ],
        ),
      ),
    );
  }
}
