import 'package:badges/badges.dart';
import 'package:billy_application/controllers/cart_controller.dart';
import 'package:billy_application/pages/account/account_page.dart';
import 'package:billy_application/pages/cart/cart_page.dart';
import 'package:billy_application/pages/home/main_food_page.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:line_icons/line_icons.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  List pages = [
    const MainFoodPage(),
    const Center(
      child: Text(
        'Likes',
      ),
    ),
    const CartPage(),
    const AccountPage(),
  ];
  @override
  void initState() {
    _selectedIndex = 0;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[_selectedIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              blurRadius: 20,
              color: Colors.black.withOpacity(.1),
            )
          ],
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15.0, vertical: 8),
            child: GetBuilder<CartController>(builder: (cartController) {
              return GNav(
                rippleColor: Theme.of(context).primaryColor,
                hoverColor: Colors.grey[100]!,
                gap: 8,
                activeColor: Colors.white,
                iconSize: 24,
                padding:
                    const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                duration: const Duration(milliseconds: 400),
                tabBackgroundColor: Theme.of(context).primaryColor,
                color: Colors.black,
                // ignore: prefer_const_literals_to_create_immutables
                tabs: [
                  const GButton(
                    icon: LineIcons.home,
                    text: 'Home',
                  ),
                  const GButton(
                    icon: LineIcons.heart,
                    text: 'Likes',
                  ),
                  GButton(
                    icon: LineIcons.shoppingCart,
                    text: 'Cart',
                    leading: cartController.totalItemsQty.toInt() == 0
                        ? null
                        : Badge(
                            badgeContent: Text(
                              cartController.totalItemsQty.toString(),
                              style: TextStyle(
                                color: _selectedIndex == 2
                                    ? AppColors.mainColor
                                    : Colors.white,
                              ),
                            ),
                            badgeStyle: BadgeStyle(
                              badgeColor: _selectedIndex == 2
                                  ? Colors.white
                                  : AppColors.mainColor,
                              elevation: 0,
                            ),
                            // position: BadgePosition.topEnd(top: -12, end: -12),
                            child: Icon(
                              LineIcons.shoppingCart,
                              color: _selectedIndex == 2 ? Colors.white : null,
                            ),
                          ),
                  ),
                  const GButton(
                    icon: LineIcons.user,
                    text: 'Profile',
                  ),
                ],
                selectedIndex: _selectedIndex,
                onTabChange: (index) {
                  setState(() {
                    _selectedIndex = index;
                  });
                },
              );
            }),
          ),
        ),
      ),
    );
  }
}
