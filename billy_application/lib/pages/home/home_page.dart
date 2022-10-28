import 'package:billy_application/widgets/widget_home_banner.dart';
import 'package:billy_application/widgets/widget_home_cuisines.dart';
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text(
            "Dashboard",
            style: TextStyle(color: Colors.white),
          ),
        ),
        body: Container(
          child: ListView(
            children: const [HomeBannerWidget(), HomeCuisinesWidget()],
          ),
        ));
  }
}
