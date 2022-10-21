import 'dart:async';

import 'package:billy_application/pages/layout/navbar.dart';
import 'package:billy_application/pages/onboard/onboarding.dart';
import 'package:billy_application/providers/providers.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

bool? info;

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  startSplashScreenTimer() async {
    var _duration = new Duration(seconds: 5);
    return new Timer(_duration, navigateToPage);
  }

  void navigateToPage() {
    Navigator.pushReplacement(
      (context),
      MaterialPageRoute(
          builder: (context) =>
              info == true ? const Onboarding() : const Navbar()),
    );
  }

  @override
  void initState() {
    super.initState();
    Providers().getOnboardState().then((value) {
      info = value;
    });
    startSplashScreenTimer();
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
