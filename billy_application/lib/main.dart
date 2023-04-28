import 'package:billy_application/controllers/banner_controller.dart';
import 'package:billy_application/controllers/cart_controller.dart';
import 'package:billy_application/controllers/cuisines_controller.dart';
import 'package:billy_application/controllers/item_controller.dart';
import 'package:billy_application/controllers/restaurant_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get/get.dart';
import 'package:billy_application/helper/dependencies.dart' as dep;
import 'package:flutter/services.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  await dep.init();
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
    return GetBuilder<BannerController>(builder: (_) {
      return GetBuilder<CuisinesController>(builder: (_) {
        return GetBuilder<RestaurantController>(builder: (_) {
          return GetBuilder<ItemController>(builder: (_) {
            return GetBuilder<CartController>(builder: (cartController) {
              cartController.getCartData();
              return GetMaterialApp(
                debugShowCheckedModeBanner: false,
                title: 'Billy',
                darkTheme: ThemeData(brightness: Brightness.dark),
                theme: ThemeData(
                  primarySwatch: MaterialColor(0xfff6881f, color),
                ),
                // home: ItemListPage(),
                initialRoute: RouteHelper.getSplashPage(),
                getPages: RouteHelper.routes,
              );
            });
          });
        });
      });
    });
  }
}
