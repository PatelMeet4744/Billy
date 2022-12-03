import 'package:billy_application/base/show_custom_snackbar.dart';
import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_progress_hub.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:sms_autofill/sms_autofill.dart';
import 'package:snippet_coder_utils/hex_color.dart';

class OTPVerifyPage extends StatefulWidget {
  final String? customerContact;
  final String? hash;

  const OTPVerifyPage({super.key, this.customerContact, this.hash});

  @override
  // ignore: library_private_types_in_public_api
  _OTPVerifyPageState createState() => _OTPVerifyPageState();
}

class _OTPVerifyPageState extends State<OTPVerifyPage> {
  bool enableResendBtn = false;
  String _otpCode = "";
  final int _otpCodeLength = 4;
  // bool _enableButton = false;
  //var autoFill;
  late FocusNode myFocusNode;

  @override
  void initState() {
    super.initState();
    myFocusNode = FocusNode();
    myFocusNode.requestFocus();

    SmsAutoFill().listenForCode.call();

    // autoFill = PinFieldAutoFill(
    //   decoration: UnderlineDecoration(
    //     textStyle: const TextStyle(fontSize: 20, color: Colors.black),
    //     colorBuilder: FixedColorBuilder(Colors.black.withOpacity(0.3)),
    //   ),
    //   currentCode: _otpCode,
    //   codeLength: _otpCodeLength,
    //   onCodeSubmitted: (code) {},
    //   onCodeChanged: (code) {
    //     print(code);
    //     if (code!.length == _otpCodeLength) {
    //       _otpCode = code;
    //       _enableButton = true;
    //       FocusScope.of(context).requestFocus(FocusNode());
    //     }
    //   },
    // );
  }

  void _otplogin(AuthController authController) {
    authController
        .verifyOTPLogin(widget.customerContact!, _otpCode, widget.hash!)
        .then((response) {
      if (response.status) {
        showCustomSnackBar(
          message: response.message,
          title: "Customer Login",
        );
        Navigator.of(context).pop();
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

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: GetBuilder<AuthController>(builder: (authController) {
          return AppProgressHUD(
            inAsyncCall: authController.isLoading,
            opacity: 0.3,
            key: UniqueKey(),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Image.network(
                  "https://i.imgur.com/6aiRpKT.png",
                  height: Dimensions.height180,
                  fit: BoxFit.contain,
                ),
                Padding(
                  padding: EdgeInsets.only(top: Dimensions.height20),
                  child: Center(
                    child: Text(
                      "OTP Verification",
                      style: TextStyle(
                        fontSize: Dimensions.font20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
                SizedBox(height: Dimensions.height10),
                Center(
                  child: Text(
                    "Enter OTP code sent to you mobile \n+91-${widget.customerContact}",
                    maxLines: 2,
                    style: const TextStyle(
                      fontSize: 14,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(
                      Dimensions.width25, 0, Dimensions.width25, 0),
                  //child: autoFill,
                  child: PinFieldAutoFill(
                    decoration: UnderlineDecoration(
                      textStyle: TextStyle(
                          fontSize: Dimensions.font20, color: Colors.black),
                      colorBuilder:
                          FixedColorBuilder(Colors.black.withOpacity(0.3)),
                    ),
                    currentCode: _otpCode,
                    codeLength: _otpCodeLength,
                    onCodeSubmitted: (code) {},
                    onCodeChanged: (code) {
                      if (code!.length == _otpCodeLength) {
                        _otpCode = code;
                        FocusScope.of(context).requestFocus(FocusNode());
                      }
                    },
                  ),
                ),
                SizedBox(
                  height: Dimensions.screenHeight * 0.05,
                ),
                GestureDetector(
                  onTap: (() => _otplogin(authController)),
                  child: Container(
                    width: Dimensions.screenWidth / 2,
                    height: Dimensions.screenHeight / 13,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(Dimensions.radius30),
                      color: HexColor("#78D0B1"),
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
                // Center(
                //   child: FormHelper.submitButton(
                //     "Continue",
                //     () {
                //       if (_enableButton) {
                //         setState(() {
                //           isAPIcallProcess = true;
                //         });

                //         APIService.verifyOtp(
                //                 widget.customerContact!, widget.hash!, _otpCode)
                //             .then((response) {
                //           setState(() {
                //             isAPIcallProcess = false;
                //           });

                //           if (response) {
                //             FormHelper.showSimpleAlertDialog(
                //               context,
                //               Config.appName,
                //               "Customer Login Successfully!",
                //               "OK",
                //               () {
                //                 Navigator.of(context).pop();
                //                 Navigator.pushNamedAndRemoveUntil(
                //                     context, "/nav", (route) => false);
                //               },
                //             );
                //           } else {
                //             FormHelper.showSimpleAlertDialog(
                //               context,
                //               Config.appName,
                //               "Invalid OTP",
                //               "OK",
                //               () {
                //                 Navigator.pop(context);
                //               },
                //             );
                //           }
                //         });
                //       }
                //     },
                //     btnColor: HexColor("#78D0B1"),
                //     borderColor: HexColor("#78D0B1"),
                //     txtColor: HexColor(
                //       "#000000",
                //     ),
                //     borderRadius: 20,
                //   ),
                // ),
              ],
            ),
          );
        }),
      ),
    );
  }

  @override
  void dispose() {
    SmsAutoFill().unregisterListener();
    myFocusNode.dispose();
    super.dispose();
  }
}

class CodeAutoFillTestPage extends StatefulWidget {
  const CodeAutoFillTestPage({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _CodeAutoFillTestPageState createState() => _CodeAutoFillTestPageState();
}

class _CodeAutoFillTestPageState extends State<CodeAutoFillTestPage>
    with CodeAutoFill {
  String? appSignature;
  String? otpCode;

  @override
  void codeUpdated() {
    setState(() {
      otpCode = code!;
    });
  }

  @override
  void initState() {
    super.initState();
    listenForCode();

    SmsAutoFill().getAppSignature.then((signature) {
      setState(() {
        appSignature = signature;
      });
    });
  }

  @override
  void dispose() {
    super.dispose();
    cancel();
  }

  @override
  Widget build(BuildContext context) {
    // ignore: prefer_const_constructors
    final textStyle = TextStyle(fontSize: Dimensions.font18);

    return Scaffold(
      appBar: AppBar(
        title: const Text("Listening for code"),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: EdgeInsets.fromLTRB(
                Dimensions.width32, Dimensions.height32, Dimensions.width32, 0),
            child: Text(
              "This is the current app signature: $appSignature",
            ),
          ),
          const Spacer(),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: Dimensions.width32),
            child: Builder(
              builder: (_) {
                if (otpCode == null) {
                  return Text("Listening for code...", style: textStyle);
                }
                return Text("Code Received: $otpCode", style: textStyle);
              },
            ),
          ),
          const Spacer(),
        ],
      ),
    );
  }
}
