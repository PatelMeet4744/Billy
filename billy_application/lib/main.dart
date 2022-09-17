import 'package:billy_application/onboarding.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Billy',
      theme: ThemeData(
        primarySwatch: Colors.deepOrange,
      ),
      home: Onboarding(),
    );
  }
}
