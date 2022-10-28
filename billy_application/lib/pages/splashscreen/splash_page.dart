import 'dart:async';

import 'package:billy_application/pages/layout/navbar.dart';
import 'package:billy_application/pages/login/otp_login_page.dart';
import 'package:billy_application/pages/onboard/onboarding.dart';
import 'package:billy_application/providers/providers.dart';
import 'package:billy_application/utils/shared_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

bool? info;
Widget _defaultHome = const LoginPage();

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  startSplashScreenTimer() async {
    var duration = const Duration(seconds: 5);
    return Timer(duration, navigateToPage);
  }

  @override
  void initState() {
    super.initState();
    checkLogin();
    Providers().getOnboardState().then((value) {
      info = value;
    });
    startSplashScreenTimer();
  }

  checkLogin() async {
    bool result = await SharedService.isLoggedIn();

    if (result) {
      // ignore: use_build_context_synchronously
      await SharedService.checkExpiredToken(context, result);
      _defaultHome = const Navbar();
    }
  }

  void navigateToPage() {
    Navigator.pushReplacement(
      (context),
      MaterialPageRoute(
          builder: (context) =>
              info == true ? const Onboarding() : _defaultHome),
    );
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIOverlays([]);

    return Container(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height,
      decoration: BoxDecoration(
        image: DecorationImage(
          fit: BoxFit.fitHeight,
          image: const ExactAssetImage("assets/image/splashscreen.png"),
        ),
      ),
    );
  }

  @override
  void dispose() {
    SystemChrome.setEnabledSystemUIOverlays(SystemUiOverlay.values);
    super.dispose();
  }
}
