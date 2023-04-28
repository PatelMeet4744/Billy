import 'package:badges/badges.dart';
import 'package:billy_application/controllers/cart_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:line_icons/line_icons.dart';

class CartPage extends StatefulWidget {
  const CartPage({super.key});

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // showing the header
        Container(
          margin: EdgeInsets.only(
              top: Dimensions.height45, bottom: Dimensions.height15),
          padding: EdgeInsets.only(
              left: Dimensions.width10, right: Dimensions.width20),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                onTap: () {
                  Get.find<CartController>().clear();
                  Get.offNamed(RouteHelper.getInitial());
                },
                child: Container(
                  width: Dimensions.width45,
                  height: Dimensions.height45,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: AppColors.mainColor,
                  ),
                  child: Icon(
                    Icons.clear_rounded,
                    color: Colors.white,
                    size: Dimensions.iconSize24,
                  ),
                ),
              ),
              Center(
                child: Container(
                  width: Dimensions.width45,
                  height: Dimensions.height45,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(15),
                    color: AppColors.mainColor,
                  ),
                  child: Center(
                    child: Badge(
                      badgeContent: Text(
                        Get.find<CartController>().totalItemsQty.toString(),
                        style: TextStyle(
                            color: AppColors.mainColor,
                            fontSize: Dimensions.font12),
                      ),
                      badgeStyle: const BadgeStyle(
                        badgeColor: Colors.white,
                        elevation: 0,
                      ),
                      // position: BadgePosition.topEnd(top: -12, end: -12),
                      child: Icon(
                        LineIcons.shoppingCart,
                        color: Colors.white,
                        size: Dimensions.font24,
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
        // showing the body
        Center(
          child: BigText(text: 'Cart'),
        ),
      ],
    );
  }
}
