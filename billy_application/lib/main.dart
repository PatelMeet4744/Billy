import 'package:billy_application/pages/splashscreen/splash_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

bool? info;

void main() {
  // WidgetsFlutterBinding.ensureInitialized();

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
        home: const SplashPage());
  }
}
