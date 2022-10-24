import 'package:billy_application/api/api_service.dart';
import 'package:billy_application/config/config.dart';
import 'package:flutter/material.dart';
import 'package:line_icons/line_icon.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:line_icons/line_icons.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  static final GlobalKey<FormState> globalFormKey = GlobalKey<FormState>();
  bool isAsyncCallProcess = false;
  String? customerName;
  String? customerEmailID;
  String? customerPassword;
  String? customerConfirmPassword;
  String? customerContact;
  bool hidePassword = true;
  bool hideConfirmPassword = true;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          backgroundColor: Colors.white,
          body: ProgressHUD(
            // ignore: sort_child_properties_last
            child: Form(
              key: globalFormKey,
              child: registerUI(),
            ),
            inAsyncCall: isAsyncCallProcess,
            opacity: 0.3,
            key: UniqueKey(),
          )),
    );
  }

  Widget registerUI() {
    return SingleChildScrollView(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(
                height: 10,
              ),
              Align(
                alignment: Alignment.center,
                child: Image.asset(
                  "assets/image/BillyLogo.png",
                  fit: BoxFit.contain,
                  width: 150,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              // ignore: prefer_const_constructors
              Text(
                "",
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 35,
                ),
              ),
              const SizedBox(
                height: 10,
              ),
            ],
          ),
          // ignore: prefer_const_constructors
          Center(
            child: const Text(
              "Register",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 30,
                color: Color(0xfff6881f),
              ),
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          FormHelper.inputFieldWidget(
            context,
            "customerName",
            "Name",
            (onValidateVal) {
              if (onValidateVal.isEmpty) {
                return '* Required';
              }

              return null;
            },
            (onSavedVal) => {customerName = onSavedVal.toString().trim()},
            showPrefixIcon: true,
            prefixIcon: LineIcon(LineIcons.userEdit),
            borderRadius: 10,
            contentPadding: 15,
            fontSize: 14,
            prefixIconPaddingLeft: 10,
            borderColor: Colors.grey.shade400,
            textColor: Colors.black,
            prefixIconColor: Colors.black,
            hintColor: Colors.black.withOpacity(0.5),
            backgroundColor: Colors.grey.shade100,
            borderFocusColor: Colors.grey.shade200,
          ),
          const SizedBox(
            height: 10,
          ),
          FormHelper.inputFieldWidget(
            context,
            "customerEmailID",
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
            (onSavedVal) => {customerEmailID = onSavedVal.toString().trim()},
            showPrefixIcon: true,
            prefixIcon: const Icon(Icons.email_outlined),
            borderRadius: 10,
            contentPadding: 15,
            fontSize: 14,
            prefixIconPaddingLeft: 10,
            borderColor: Colors.grey.shade400,
            textColor: Colors.black,
            prefixIconColor: Colors.black,
            hintColor: Colors.black.withOpacity(0.5),
            backgroundColor: Colors.grey.shade100,
            borderFocusColor: Colors.grey.shade200,
          ),
          const SizedBox(
            height: 10,
          ),
          FormHelper.inputFieldWidget(
              context,
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
                bool emailValid = RegExp(
                        r"^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$")
                    .hasMatch(onValidateVal);
                if (!emailValid) {
                  return 'Invalid Customer Password.';
                }
                return null;
              },
              (onSavedVal) => {customerPassword = onSavedVal.toString().trim()},
              showPrefixIcon: true,
              prefixIcon: const Icon(Icons.password_outlined),
              borderRadius: 10,
              contentPadding: 15,
              fontSize: 14,
              prefixIconPaddingLeft: 10,
              borderColor: Colors.grey.shade400,
              textColor: Colors.black,
              prefixIconColor: Colors.black,
              hintColor: Colors.black.withOpacity(0.5),
              backgroundColor: Colors.grey.shade100,
              borderFocusColor: Colors.grey.shade200,
              obscureText: hidePassword,
              suffixIcon: IconButton(
                onPressed: () {
                  setState(() {
                    hidePassword = !hidePassword;
                  });
                },
                // color: Colors.redAccent.withOpacity(0.4),
                color: Colors.black.withOpacity(0.5),
                icon: Icon(
                    hidePassword ? Icons.visibility_off : Icons.visibility),
              ),
              onChange: (val) {
                customerPassword = val;
              }),
          const SizedBox(
            height: 10,
          ),
          FormHelper.inputFieldWidget(
            context,
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
              bool emailValid = RegExp(
                      r"^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$")
                  .hasMatch(onValidateVal);
              if (!emailValid) {
                return 'Invalid Customer Confirm Password.';
              }
              if (onValidateVal != customerPassword) {
                return 'Customer Confirm Password Not Matched.';
              }
              return null;
            },
            (onSavedVal) =>
                {customerConfirmPassword = onSavedVal.toString().trim()},
            showPrefixIcon: true,
            prefixIcon: const Icon(Icons.password_outlined),
            borderRadius: 10,
            contentPadding: 15,
            fontSize: 14,
            prefixIconPaddingLeft: 10,
            borderColor: Colors.grey.shade400,
            textColor: Colors.black,
            prefixIconColor: Colors.black,
            hintColor: Colors.black.withOpacity(0.5),
            backgroundColor: Colors.grey.shade100,
            borderFocusColor: Colors.grey.shade200,
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
          const SizedBox(height: 10),
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Flexible(
                  child: Container(
                    height: 47,
                    width: 50,
                    margin: const EdgeInsets.fromLTRB(0, 10, 3, 32),
                    //padding: EdgeInsets.fromLTRB(0, 10, 0, 50),
                    decoration: BoxDecoration(
                      color: Colors.grey.shade100,
                      borderRadius: BorderRadius.circular(10.0),
                      border: Border.all(
                        color: Colors.grey,
                      ),
                    ),
                    child: const Center(
                      child: Text(
                        "+91",
                        style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ),
                Flexible(
                  flex: 5,
                  child: TextFormField(
                    maxLines: 1,
                    maxLength: 10,
                    initialValue: "",
                    decoration: const InputDecoration(
                      contentPadding: EdgeInsets.all(6),
                      filled: true,
                      fillColor: Color(0xFFF5F5F5),
                      hintText: "Contact Number",
                      enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(10.0)),
                        borderSide: BorderSide(
                          color: Colors.grey,
                          width: 1,
                        ),
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.all(Radius.circular(10.0)),
                        borderSide: BorderSide(
                          color: Colors.grey,
                          width: 1,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: Color(0xFFEEEEEE),
                          width: 1,
                        ),
                      ),
                    ),
                    keyboardType: TextInputType.number,
                    onChanged: (String value) {
                      if (value.length > 8) {
                        customerContact = value;
                      }
                    },
                    validator: (value) {
                      return null;
                    },
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(
            height: 10,
          ),
          Center(
            child: FormHelper.submitButton(
              "Sign Up",
              () {
                if (validateSave()) {
                  setState(() {
                    isAsyncCallProcess = true;
                  });
                  APIService.registerCustomer(
                    customerName!,
                    customerEmailID!,
                    customerPassword!,
                    customerContact!,
                  ).then((response) {
                    setState(() {
                      isAsyncCallProcess = false;
                    });

                    if (response) {
                      FormHelper.showSimpleAlertDialog(context, Config.appName,
                          "Registration Completed Successfully", "Ok", () {
                        Navigator.of(context).pop();
                      });
                    } else {
                      FormHelper.showSimpleAlertDialog(
                          context, Config.appName, "Registration Fail", "Ok",
                          () {
                        Navigator.of(context).pop();
                      });
                    }
                  });
                }
              },
              btnColor: Theme.of(context).primaryColor,
              borderColor: Colors.white,
              txtColor: Colors.white,
              borderRadius: 20,
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          Center(
            child: RichText(
              text: const TextSpan(
                style: TextStyle(color: Colors.grey, fontSize: 14.0),
                children: <TextSpan>[
                  TextSpan(text: "Already have an account? "),
                  TextSpan(
                    text: "Sign In",
                    style: TextStyle(
                      color: Color(0xfff6881f),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }

  bool validateSave() {
    final form = globalFormKey.currentState;

    if (form!.validate()) {
      form.save();
      return true;
    } else {
      return false;
    }
  }
}
