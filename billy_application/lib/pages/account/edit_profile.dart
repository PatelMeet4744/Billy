import 'package:billy_application/base/show_custom_snackbar.dart';
import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/controllers/customer_controller.dart';
import 'package:billy_application/models/customer_model.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_form_helper.dart';
import 'package:billy_application/widgets/app_progress_hub.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:line_icons/line_icons.dart';
import 'package:get/get.dart';

class EditProfile extends StatefulWidget {
  const EditProfile({super.key});

  @override
  State<EditProfile> createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> {
  GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  bool isObscurePassword = true;
  late String customerName;
  late String customerEmailID;
  late String customerContact;

  void _updateProfile(CustomerController customerController) {
    final form = globalFormKey.currentState;
    if (form!.validate()) {
      form.save();

      CustomerModel customerModel = CustomerModel(
        customerId: customerController.customerModel.customerId,
        customerName: customerName,
        customerEmailID: customerEmailID,
        customerContact: customerContact,
      );

      customerController.updateProfile(customerModel).then((response) {
        if (response.status) {
          showCustomSnackBar(
            message: response.message,
            title: "Customer Profile",
          );
          Get.toNamed(RouteHelper.getInitial());
        } else {
          showCustomSnackBar(
            isError: !response.status,
            message: response.message,
            title: "Customer Profile",
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
          text: "Edit Profile",
          size: Dimensions.font24,
          color: Colors.white,
        ),
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
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
      body: GetBuilder<CustomerController>(builder: (customerController) {
        return userLoggedIn
            ? (customerController.isLoading
                ? AppProgressHUD(
                    inAsyncCall: false,
                    opacity: 0.3,
                    key: UniqueKey(),
                    child: Form(
                      key: globalFormKey,
                      child: SingleChildScrollView(
                        physics: const BouncingScrollPhysics(),
                        child: Container(
                          width: double.maxFinite,
                          padding: EdgeInsets.only(
                            top: Dimensions.height20,
                          ),
                          child: GestureDetector(
                            onTap: () {
                              FocusScope.of(context).unfocus();
                            },
                            child: ListView(
                              scrollDirection: Axis.vertical,
                              shrinkWrap: true,
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
                                              color:
                                                  Colors.black.withOpacity(0.1),
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
                                  initialValue: customerController
                                      .customerModel.customerName,
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
                                  "Customer Email ID",
                                  (onValidateVal) {
                                    if (onValidateVal.isEmpty) {
                                      return '* Required';
                                    }
                                    bool emailValid = RegExp(
                                            r"^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
                                        .hasMatch(onValidateVal);
                                    if (!emailValid) {
                                      return 'Invalid Customer Email ID.';
                                    }
                                    return null;
                                  },
                                  (onSavedVal) => {
                                    customerEmailID =
                                        onSavedVal.toString().trim(),
                                  },
                                  initialValue: customerController
                                      .customerModel.customerEmailID,
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
                                  "Customer Contact",
                                  (onValidateVal) {
                                    if (onValidateVal.isEmpty) {
                                      return '* Required';
                                    }
                                    return null;
                                  },
                                  (onSavedVal) => {
                                    customerContact =
                                        onSavedVal.toString().trim(),
                                  },
                                  initialValue: customerController
                                      .customerModel.customerContact,
                                  textInputType: TextInputType.phone,
                                  prefixIcon: Icons.phone,
                                ),
                                SizedBox(
                                  height: Dimensions.height30,
                                ),
                                // Buttons
                                Padding(
                                  padding: EdgeInsets.only(
                                      left: Dimensions.width15,
                                      right: Dimensions.width15),
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      OutlinedButton(
                                        onPressed: () {
                                          Get.offNamed(
                                              RouteHelper.getInitial());
                                        },
                                        style: OutlinedButton.styleFrom(
                                          padding: EdgeInsets.symmetric(
                                            horizontal: Dimensions.width50,
                                          ),
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(
                                                Dimensions.radius20),
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
                                        onPressed: () {
                                          _updateProfile(customerController);
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
                                ),
                                SizedBox(
                                  height: Dimensions.height20,
                                ),
                                // Change Password
                                Padding(
                                  padding: EdgeInsets.only(
                                    left: Dimensions.width20,
                                    right: Dimensions.width15,
                                  ),
                                  child: RichText(
                                    text: TextSpan(
                                      recognizer: TapGestureRecognizer()
                                        ..onTap = () => Get.offNamed(RouteHelper
                                            .getChangePasswordPage()),
                                      text: "Change Password",
                                      style: TextStyle(
                                        color: AppColors.mainColor,
                                        fontSize: Dimensions.font18,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  )
                : const Center(
                    child: CircularProgressIndicator(),
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
                        borderRadius:
                            BorderRadius.circular(Dimensions.radius20),
                        image: const DecorationImage(
                          fit: BoxFit.cover,
                          image:
                              AssetImage("assets/image/signintocontinue.png"),
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
              );
      }),
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
