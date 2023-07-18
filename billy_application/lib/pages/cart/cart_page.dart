import 'package:badges/badges.dart';
import 'package:billy_application/base/show_custom_snackbar.dart';
import 'package:billy_application/controllers/cart_controller.dart';
import 'package:billy_application/controllers/order_controller.dart';
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
  void _saveOrder(
      OrderController orderController, CartController cartController) {
    orderController.saveOrder(cartController).then((response) {
      if (response.status) {
        showCustomSnackBar(
          message: response.message,
          title: "Order Now",
        );
        Get.find<CartController>().clear();
        Get.toNamed(RouteHelper.getInitial());
      } else {
        showCustomSnackBar(
          isError: !response.status,
          message: response.message,
          title: "Order Now",
        );
      }
    });
  }

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
          child: Column(
            children: [
              BigText(text: 'Cart'),
              SizedBox(height: Dimensions.height10),
              Container(
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(Dimensions.radius30),
                  boxShadow: [
                    BoxShadow(
                      blurRadius: 10,
                      spreadRadius: 7,
                      offset: const Offset(1, 10),
                      color: Colors.grey.withOpacity(0.1),
                    ),
                  ],
                ),
                height: Dimensions.height60,
                width: Dimensions.width160,
                child: TextButton(
                  onPressed: () {
                    _saveOrder(Get.find<OrderController>(),
                        Get.find<CartController>());
                  },
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Icon(
                        color: AppColors.mainColor,
                        Icons.shopping_bag_outlined,
                        size: Dimensions.height25,
                      ),
                      SizedBox(
                        width: Dimensions.width10,
                      ),
                      BigText(text: "Order Now"),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
