import 'package:billy_application/api/api_service.dart';
import 'package:billy_application/config/config.dart';
import 'package:billy_application/pages/login/otp_verify_page.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:snippet_coder_utils/FormHelper.dart';
import 'package:snippet_coder_utils/ProgressHUD.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String mobileNumber = '';
  bool enableBtn = false;
  bool isAPIcallProcess = false;

  @override
  void initState() {
    super.initState();
    mobileNumber = '';
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: ProgressHUD(
          inAsyncCall: isAPIcallProcess,
          opacity: 0.3,
          key: UniqueKey(),
          child: loginUI(),
        ),
      ),
    );
  }

  Widget loginUI() {
    return Scaffold(
      body: Column(
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
          const Padding(
            padding: EdgeInsets.only(top: 20),
            child: Center(
              child: Text(
                "Login with a Mobile Number",
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Color(0xfff6881f)),
              ),
            ),
          ),
          const SizedBox(height: 10),
          const Center(
            child: Text(
              "Enter your mobile number we will send you OTP to verify",
              style: TextStyle(fontSize: 14, color: Colors.grey),
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
                      borderRadius: BorderRadius.circular(4),
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
                      hintText: "Mobile Number",
                      enabledBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: Colors.grey,
                          width: 1,
                        ),
                      ),
                      border: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: Colors.grey,
                          width: 1,
                        ),
                      ),
                      focusedBorder: OutlineInputBorder(
                        borderSide: BorderSide(
                          color: Colors.grey,
                          width: 1,
                        ),
                      ),
                    ),
                    keyboardType: TextInputType.number,
                    onChanged: (String value) {
                      if (value.length > 8) {
                        mobileNumber = value;
                        enableBtn = true;
                      }
                    },
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return '* Required';
                      }
                      return null;
                    },
                  ),
                ),
              ],
            ),
          ),
          Center(
            child: FormHelper.submitButton(
              "Continue",
              () async {
                if (enableBtn && mobileNumber.length > 8) {
                  setState(() {
                    isAPIcallProcess = true;
                  });

                  APIService.otpLogin(mobileNumber).then((response) async {
                    setState(() {
                      isAPIcallProcess = false;
                    });

                    if (response.data != null) {
                      Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(
                          builder: (context) => OTPVerifyPage(
                            otpHash: response.data,
                            mobileNo: mobileNumber,
                          ),
                        ),
                        (route) => false,
                      );
                    } else {
                      FormHelper.showSimpleAlertDialog(
                        context,
                        Config.appName,
                        response.message,
                        "OK",
                        () {
                          Navigator.pop(context);
                        },
                      );
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
              text: TextSpan(
                style: TextStyle(color: Colors.grey, fontSize: 14.0),
                children: <TextSpan>[
                  TextSpan(text: "Don\'t have an account? "),
                  TextSpan(
                    text: "Sign Up",
                    style: const TextStyle(
                      color: Color(0xfff6881f),
                      fontWeight: FontWeight.bold,
                    ),
                    recognizer: TapGestureRecognizer()
                      ..onTap = () {
                        Navigator.of(context).pushNamedAndRemoveUntil(
                          "/register",
                          (route) => false,
                        );
                      },
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}