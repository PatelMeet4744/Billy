import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_form_helper.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:line_icons/line_icons.dart';
import 'package:get/get.dart';

class EditProfile extends StatefulWidget {
  const EditProfile({super.key});

  @override
  State<EditProfile> createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> {
  bool isObscurePassword = true;
  late String customerName;
  late String customerEmailID;
  late String customerContact;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mainColor,
        title: BigText(
          text: "Edit Profile",
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
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.settings,
              color: Colors.white,
            ),
          ),
        ],
      ),
      body: Container(
        width: double.maxFinite,
        padding: EdgeInsets.only(
          top: Dimensions.height20,
        ),
        child: GestureDetector(
          onTap: () {
            FocusScope.of(context).unfocus();
          },
          child: ListView(
            children: [
              Center(
                child: Stack(
                  children: [
                    Container(
                      width: Dimensions.screenWidth / 3.02,
                      height: Dimensions.screenHeight / 6.0,
                      decoration: BoxDecoration(
                        border: Border.all(
                          width: Dimensions.width4,
                          color: Colors.white,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 10,
                            spreadRadius: 2,
                          ),
                        ],
                        shape: BoxShape.circle,
                        // image: const DecorationImage(
                        //   fit: BoxFit.cover,
                        //   image: ExactAssetImage("assets/image/g.png"),
                        // ),
                      ),
                      child: Icon(
                        Icons.person,
                        color: Colors.white,
                        size: Dimensions.height100,
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        height: Dimensions.height40,
                        width: Dimensions.width40,
                        decoration: BoxDecoration(
                          border: Border.all(
                            width: Dimensions.width4,
                            color: AppColors.mainColor,
                          ),
                          shape: BoxShape.circle,
                          color: AppColors.mainColor,
                        ),
                        child: const Icon(
                          Icons.edit,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: Dimensions.height30),
              // Name
              AppFormHelper.inputFieldWidgetWithLabel(
                "customerName",
                "Name",
                "Customer Name",
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
                height: Dimensions.height5,
              ),
              // Email ID
              AppFormHelper.inputFieldWidgetWithLabel(
                "customerEmailID",
                "Email ID",
                "Email ID",
                (onValidateVal) {
                  if (onValidateVal.isEmpty) {
                    return '* Required';
                  }
                  bool emailValid = RegExp(r"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
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
                height: Dimensions.height5,
              ),
              // Mobile No.
              AppFormHelper.inputFieldWidgetWithLabel(
                "customerContact",
                "Contact Number",
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
                height: Dimensions.height30,
              ),
              // Buttons
              Padding(
                padding: EdgeInsets.only(
                    left: Dimensions.width15, right: Dimensions.width15),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    OutlinedButton(
                      onPressed: () {},
                      style: OutlinedButton.styleFrom(
                        padding: EdgeInsets.symmetric(
                          horizontal: Dimensions.width50,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius:
                              BorderRadius.circular(Dimensions.radius20),
                        ),
                      ),
                      child: Text(
                        "CANCEL",
                        style: TextStyle(
                          fontSize: Dimensions.font15,
                          letterSpacing: 2,
                          color: Colors.black,
                        ),
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        padding: EdgeInsets.symmetric(
                          horizontal: Dimensions.width50,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius:
                              BorderRadius.circular(Dimensions.radius20),
                        ),
                      ),
                      child: Text(
                        "SAVE",
                        style: TextStyle(
                          fontSize: Dimensions.font15,
                          letterSpacing: 2,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  Widget buildTextField(
      String labelText, String placeHolder, bool isPasswordTextField) {
    return Padding(
      padding: EdgeInsets.only(
        bottom: Dimensions.height30,
      ),
      child: TextField(
        obscureText: isPasswordTextField ? isObscurePassword : false,
        decoration: InputDecoration(
          suffixIcon: isPasswordTextField
              ? IconButton(
                  onPressed: () {},
                  icon: const Icon(Icons.remove_red_eye, color: Colors.grey),
                )
              : null,
          contentPadding: EdgeInsets.only(bottom: Dimensions.height5),
          labelText: labelText,
          floatingLabelBehavior: FloatingLabelBehavior.always,
          hintText: placeHolder,
          hintStyle: TextStyle(
            fontSize: Dimensions.font16,
            fontWeight: FontWeight.bold,
            color: Colors.grey,
          ),
        ),
      ),
    );
  }
}
