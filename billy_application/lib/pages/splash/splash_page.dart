import 'dart:async';

import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/controllers/banner_controller.dart';
import 'package:billy_application/controllers/cuisines_controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _SplashPageState createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> with TickerProviderStateMixin {
  late Animation<double> animation;
  late AnimationController controller;

  Future<void> _loadResources() async {
    await Get.find<BannerController>().getBannerList();
    await Get.find<CuisinesController>().getCuisinesList();
  }

  @override
  void initState() {
    super.initState();
    _loadResources();
    Timer(const Duration(seconds: 4), () {
      if (Get.find<AuthController>().userLoggedIn()) {
        Get.offNamed(RouteHelper.getInitial());
      } else {
        Get.offNamed(RouteHelper.getLogin());
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIOverlays([]);
    return Container(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height,
      decoration: const BoxDecoration(
        image: DecorationImage(
          fit: BoxFit.fitHeight,
          image: ExactAssetImage("assets/image/splashscreen.png"),
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
