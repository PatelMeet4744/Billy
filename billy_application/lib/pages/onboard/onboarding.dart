import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/controllers/banner_controller.dart';
import 'package:billy_application/controllers/cuisines_controller.dart';
import 'package:billy_application/controllers/restaurant_controller.dart';
import 'package:billy_application/pages/onboard/content_model.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

// Widget _defaultHome = const LoginPage();

class Onboarding extends StatefulWidget {
  const Onboarding({super.key});

  @override
  State<Onboarding> createState() => _OnboardingState();
}

class _OnboardingState extends State<Onboarding> {
  int currentIndex = 0;
  late PageController _controller;

  Future<void> _loadResources() async {
    await Get.find<BannerController>().getBannerList();
    await Get.find<CuisinesController>().getCuisinesList();
    await Get.find<RestaurantController>().getRestaurantList();
  }

  @override
  void initState() {
    _controller = PageController(initialPage: 0);
    _loadResources();
    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Expanded(
            child: PageView.builder(
              controller: _controller,
              itemCount: contents.length,
              onPageChanged: (int index) {
                setState(() {
                  currentIndex = index;
                });
              },
              itemBuilder: (_, i) {
                return Padding(
                  padding: const EdgeInsets.all(40),
                  child: Column(
                    children: [
                      Image.asset(
                        contents[i].image,
                        height: 300,
                      ),
                      Text(
                        contents[i].title,
                        // ignore: prefer_const_constructors
                        style: TextStyle(
                          fontSize: 35,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 20),
                      Text(
                        contents[i].discription,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          fontSize: 18,
                          color: Colors.grey,
                        ),
                      )
                    ],
                  ),
                );
              },
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: List.generate(
              contents.length,
              (index) => buildDot(index, context),
            ),
          ),
          Container(
            height: 60,
            margin: const EdgeInsets.all(40),
            width: double.infinity,
            child: TextButton(
              // ignore: sort_child_properties_last
              child: Text(
                  currentIndex == contents.length - 1 ? "Continue" : "Next"),
              onPressed: () {
                if (currentIndex == contents.length - 1) {
                  if (Get.find<AuthController>().userLoggedIn()) {
                    Get.offNamed(RouteHelper.getInitial());
                  } else {
                    Get.offNamed(RouteHelper.getLogin());
                  }
                }
                _controller.nextPage(
                  duration: const Duration(milliseconds: 100),
                  curve: Curves.bounceIn,
                );
              },
              style: TextButton.styleFrom(
                foregroundColor: Colors.white,
                backgroundColor: Theme.of(context).primaryColor,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ), // Background Color
              ),
            ),
          )
        ],
      ),
    );
  }

  Container buildDot(int index, BuildContext context) {
    return Container(
      height: 10,
      width: currentIndex == index ? 25 : 10,
      margin: const EdgeInsets.only(right: 5),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: Theme.of(context).primaryColor,
      ),
    );
  }
}
