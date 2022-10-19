import 'package:flutter/material.dart';
import 'package:billy_application/pages/layout/navbar.dart';
import 'package:billy_application/pages/onboard/onboarding.dart';
import 'package:billy_application/providers/providers.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

bool? info;

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  Providers().getOnboardState().then((value) {
    info = value;
  });
  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Billy',
      darkTheme: ThemeData(brightness: Brightness.dark),
      theme: ThemeData(
        primarySwatch: Colors.deepOrange,
      ),
      home: info == true ? const Onboarding() : const Navbar(),
    );
  }
}
