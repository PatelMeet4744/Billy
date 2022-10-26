import 'package:billy_application/pages/layout/navbar.dart';
import 'package:billy_application/pages/login/otp_login_page.dart';
import 'package:billy_application/pages/register/register_page.dart';
import 'package:billy_application/pages/splashscreen/splash_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

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
  Map<int, Color> color = {
    50: const Color(0x18F6881F),
    100: const Color(0x33F6881F),
    200: const Color(0x4BF6881F),
    300: const Color(0x66F6881F),
    500: const Color(0x99F6881F),
    400: const Color(0x79F6881F),
    600: const Color(0xB1F6881F),
    700: const Color(0xCCF6881F),
    800: const Color(0xE4F6881F),
    900: const Color(0xFFF6881F),
  };
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Billy',
      darkTheme: ThemeData(brightness: Brightness.dark),
      theme: ThemeData(
        primarySwatch: MaterialColor(0xfff6881f, color),
      ),
      home: const SplashPage(),
      // home: const RegisterPage(),
      routes: <String, WidgetBuilder>{
        '/register': ((context) => const RegisterPage()),
        '/login': ((context) => const LoginPage()),
        '/nav': ((context) => const Navbar())
      },
    );
  }
}
