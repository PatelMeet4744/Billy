import 'package:billy_application/pages/home/food_page_body.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:billy_application/widgets/dimensions.dart';
import 'package:billy_application/widgets/small_text.dart';
import 'package:flutter/material.dart';

class MainFoodPage extends StatefulWidget {
  const MainFoodPage({super.key});

  @override
  State<MainFoodPage> createState() => _MainFoodPageState();
}

class _MainFoodPageState extends State<MainFoodPage> {
  @override
  Widget build(BuildContext context) {
    print("current height is ${MediaQuery.of(context).size.height}");
    print("current width is ${MediaQuery.of(context).size.width}");
    return Scaffold(
      body: Column(
        children: [
          // showing the header
          Container(
            margin: EdgeInsets.only(
                top: Dimensions.height45, bottom: Dimensions.height15),
            padding: EdgeInsets.only(
                left: Dimensions.width20, right: Dimensions.width20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  children: [
                    BigText(text: "Gujarat", color: AppColors.mainColor),
                    Row(
                      children: [
                        SmallText(text: "Bardoli", color: Colors.black54),
                        const Icon(Icons.arrow_drop_down_rounded)
                      ],
                    )
                  ],
                ),
                Center(
                  child: Container(
                    width: Dimensions.width45,
                    height: Dimensions.height45,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(15),
                      color: AppColors.mainColor,
                    ),
                    child: Icon(
                      Icons.search,
                      color: Colors.white,
                      size: Dimensions.iconSize24,
                    ),
                  ),
                ),
              ],
            ),
          ),
          // showing the body
          const FoodPageBody(),
        ],
      ),
    );
  }
}
