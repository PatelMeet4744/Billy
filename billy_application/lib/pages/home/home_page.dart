import 'package:billy_application/widgets/widget_home_cuisines.dart';
import 'package:flutter/material.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("Dashboard"),
        ),
        body: Container(
          child: ListView(
            children: const [HomeCuisinesWidget()],
          ),
        ));
  }
}
