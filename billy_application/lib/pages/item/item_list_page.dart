// ignore_for_file: unnecessary_brace_in_string_interps

import 'package:billy_application/base/no_data_page.dart';
import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/controllers/item_controller.dart';
import 'package:billy_application/controllers/restaurant_controller.dart';
import 'package:billy_application/models/item_model.dart';
import 'package:billy_application/pages/item/variant_list_page.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:billy_application/widgets/small_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:get/get.dart';

class ItemListPage extends StatelessWidget {
  final int pageId;
  const ItemListPage({super.key, required this.pageId});

  Future<void> _loadResources(String restaurantId) async {
    await Get.find<ItemController>().getItemByRestaurant(restaurantId);
  }

  @override
  Widget build(BuildContext context) {
    bool userLoggedIn = Get.find<AuthController>().userLoggedIn();
    var restaurant = Get.find<RestaurantController>().restaurantList[pageId];

    if (userLoggedIn) {
      _loadResources(restaurant.restaurantId!);
    }

    Color itemType(String type) {
      Color color;
      if (type == 'veg') {
        color = Colors.green;
      } else if (type == 'non-veg') {
        color = Colors.red;
      } else {
        color = Colors.blue;
      }
      return color;
    }

    String itemDescription(String description, double textHeight) {
      if (description.length > textHeight) {
        return description.substring(0, textHeight.toInt());
      } else {
        return description;
      }
    }

    String itemVariantPriceRange(List<Variant>? variants) {
      var minvariantPrice = variants!
          .map((variant) => variant.variantSalesPrice)
          .reduce((a, b) => a! < b! ? a : b);
      var maxvariantPrice = variants
          .map((variant) => variant.variantSalesPrice)
          .reduce((a, b) => a! > b! ? a : b);
      return "₹${minvariantPrice} - ₹${maxvariantPrice}";
    }

    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mainColor,
        title: BigText(
          text: restaurant.restaurantName!,
          size: Dimensions.font24,
          color: Colors.white,
        ),
        leading: IconButton(
          onPressed: () => Get.back(),
          icon: const Icon(
            Icons.arrow_back,
            color: Colors.white,
          ),
        ),
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          await Get.find<ItemController>()
              .getItemByRestaurant(restaurant.restaurantId!);
        },
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Expanded(
                child: GetBuilder<ItemController>(builder: (item) {
                  return item.itemList.isNotEmpty
                      ? item.isLoaded
                          ? ListView.builder(
                              itemCount: item.itemList.length,
                              itemBuilder: (context, i) {
                                return Card(
                                  child: ExpansionTile(
                                    title:
                                        // Category
                                        Text(
                                      '${item.itemList[i].sId!} (${item.itemList[i].item?.length})',
                                      style: TextStyle(
                                          fontSize: Dimensions.font20,
                                          fontWeight: FontWeight.w500),
                                    ),
                                    collapsedTextColor:
                                        AppColors.mainBlackColor,
                                    collapsedIconColor:
                                        AppColors.mainBlackColor,
                                    children: [
                                      // Items
                                      ListView.builder(
                                          physics:
                                              const NeverScrollableScrollPhysics(),
                                          shrinkWrap: true,
                                          itemCount:
                                              item.itemList[i].item?.length,
                                          itemBuilder: (context, j) {
                                            return SizedBox(
                                              // margin: EdgeInsets.only(top: 8.0, bottom: 8.0)
                                              height: Dimensions.height150,
                                              child: Container(
                                                margin: EdgeInsets.only(
                                                  left: Dimensions.width10,
                                                  right: Dimensions.width10,
                                                  bottom: Dimensions.height10,
                                                ),
                                                child: Row(
                                                  children: [
                                                    //image section
                                                    GestureDetector(
                                                      onTap: () {
                                                        Get.bottomSheet(
                                                          Container(
                                                            color: Colors.white,
                                                            height: Dimensions
                                                                    .screenHeight /
                                                                3,
                                                            width: Dimensions
                                                                .screenWidth,
                                                            child: Column(
                                                              mainAxisAlignment:
                                                                  MainAxisAlignment
                                                                      .start,
                                                              crossAxisAlignment:
                                                                  CrossAxisAlignment
                                                                      .start,
                                                              children: [
                                                                SizedBox(
                                                                  height: Dimensions
                                                                      .height121,
                                                                  child: Stack(
                                                                    children: [
                                                                      Image
                                                                          .network(
                                                                        AppConstants.imageURL +
                                                                            item.itemList[i].item![j].itemImage!,
                                                                        fit: BoxFit
                                                                            .cover,
                                                                        width: Dimensions
                                                                            .screenWidth,
                                                                      ),
                                                                      Positioned(
                                                                        top: 10,
                                                                        right:
                                                                            5,
                                                                        child:
                                                                            GestureDetector(
                                                                          onTap: () =>
                                                                              Navigator.of(context).pop(),
                                                                          child:
                                                                              const AppIcon(
                                                                            icon:
                                                                                Icons.clear,
                                                                            iconColor:
                                                                                Colors.white,
                                                                            backgroundColor:
                                                                                AppColors.mainColor,
                                                                          ),
                                                                        ),
                                                                      )
                                                                    ],
                                                                  ),
                                                                ),
                                                                SizedBox(
                                                                  height: Dimensions
                                                                      .height10,
                                                                ),
                                                                Padding(
                                                                  padding: const EdgeInsets
                                                                          .only(
                                                                      left: 5.0,
                                                                      right:
                                                                          8.0),
                                                                  child: Row(
                                                                    mainAxisAlignment:
                                                                        MainAxisAlignment
                                                                            .spaceBetween,
                                                                    children: [
                                                                      BigText(
                                                                        text: item
                                                                            .itemList[i]
                                                                            .item![j]
                                                                            .itemName!,
                                                                        color: AppColors
                                                                            .mainColor,
                                                                      ),
                                                                      GestureDetector(
                                                                        onTap:
                                                                            (() {}),
                                                                        child:
                                                                            Container(
                                                                          width:
                                                                              Dimensions.width62_5,
                                                                          height:
                                                                              Dimensions.height40,
                                                                          decoration:
                                                                              BoxDecoration(
                                                                            borderRadius:
                                                                                BorderRadius.circular(Dimensions.height10),
                                                                            color:
                                                                                AppColors.mainColor,
                                                                          ),
                                                                          child:
                                                                              Center(
                                                                            child:
                                                                                BigText(
                                                                              text: "Add",
                                                                              color: Colors.white,
                                                                            ),
                                                                          ),
                                                                        ),
                                                                      ),
                                                                    ],
                                                                  ),
                                                                ),
                                                                Padding(
                                                                  padding: const EdgeInsets
                                                                          .only(
                                                                      left:
                                                                          5.0),
                                                                  child:
                                                                      BigText(
                                                                    text: itemVariantPriceRange(item
                                                                        .itemList[
                                                                            i]
                                                                        .item![
                                                                            j]
                                                                        .variant),
                                                                    color: AppColors
                                                                        .mainBlackColor,
                                                                    size: Dimensions
                                                                        .font16,
                                                                  ),
                                                                ),
                                                                SizedBox(
                                                                  height: Dimensions
                                                                      .height10,
                                                                ),
                                                                Padding(
                                                                  padding: const EdgeInsets
                                                                          .only(
                                                                      left: 5.0,
                                                                      right:
                                                                          5.0),
                                                                  child:
                                                                      SmallText(
                                                                    text: itemDescription(
                                                                        item
                                                                            .itemList[i]
                                                                            .item![j]
                                                                            .itemDescription!,
                                                                        100),
                                                                    size: Dimensions
                                                                        .font16,
                                                                  ),
                                                                ),
                                                              ],
                                                            ),
                                                          ),
                                                          elevation: 20.0,
                                                          isDismissible: false,
                                                        );
                                                      },
                                                      child: Container(
                                                        width:
                                                            Dimensions.width120,
                                                        height:
                                                            Dimensions.width120,
                                                        decoration:
                                                            BoxDecoration(
                                                          borderRadius:
                                                              BorderRadius.circular(
                                                                  Dimensions
                                                                      .radius20),
                                                          color: Colors.white38,
                                                          boxShadow: const [
                                                            BoxShadow(
                                                                color: Color(
                                                                    0xFFe8e8e8),
                                                                //blurRadius: 5.0,
                                                                offset: Offset(
                                                                    0, 5)),
                                                            BoxShadow(
                                                                color: Colors
                                                                    .white,
                                                                offset: Offset(
                                                                    -5, 0)),
                                                            BoxShadow(
                                                                color: Colors
                                                                    .white,
                                                                offset: Offset(
                                                                    5, 0)),
                                                          ],
                                                          image:
                                                              DecorationImage(
                                                            fit: BoxFit.fill,
                                                            image: NetworkImage(
                                                                AppConstants
                                                                        .imageURL +
                                                                    item
                                                                        .itemList[
                                                                            i]
                                                                        .item![
                                                                            j]
                                                                        .itemImage!),
                                                          ),
                                                        ),
                                                      ),
                                                    ),
                                                    //text container
                                                    Expanded(
                                                      child: Container(
                                                        margin: EdgeInsets.only(
                                                            left: Dimensions
                                                                .width5),
                                                        height: Dimensions
                                                            .height150,
                                                        decoration:
                                                            BoxDecoration(
                                                          // borderRadius: BorderRadius.all(
                                                          //   Radius.circular(Dimensions.radius20),
                                                          // ),
                                                          color: Colors.white,
                                                          boxShadow: [
                                                            BoxShadow(
                                                              blurRadius: 7,
                                                              spreadRadius: 1,
                                                              offset:
                                                                  const Offset(
                                                                      1, 10),
                                                              color: Colors.grey
                                                                  .withOpacity(
                                                                      0.2),
                                                            ),
                                                          ],
                                                        ),
                                                        child: Padding(
                                                          padding:
                                                              EdgeInsets.only(
                                                            left: Dimensions
                                                                .width10,
                                                            right: Dimensions
                                                                .width10,
                                                          ),
                                                          child: Column(
                                                            crossAxisAlignment:
                                                                CrossAxisAlignment
                                                                    .start,
                                                            mainAxisAlignment:
                                                                MainAxisAlignment
                                                                    .center,
                                                            children: [
                                                              Row(
                                                                mainAxisAlignment:
                                                                    MainAxisAlignment
                                                                        .spaceBetween,
                                                                children: [
                                                                  BigText(
                                                                    text: item
                                                                        .itemList[
                                                                            i]
                                                                        .item![
                                                                            j]
                                                                        .itemName!,
                                                                    color: AppColors
                                                                        .mainColor,
                                                                    size: Dimensions
                                                                        .font22,
                                                                  ),
                                                                  ImageIcon(
                                                                    const AssetImage(
                                                                        "assets/image/itemtype.png"),
                                                                    size: Dimensions
                                                                        .font30,
                                                                    color: itemType(item
                                                                        .itemList[
                                                                            i]
                                                                        .item![
                                                                            j]
                                                                        .itemType!),
                                                                  )
                                                                ],
                                                              ),
                                                              SizedBox(
                                                                  height: Dimensions
                                                                      .height10),
                                                              BigText(
                                                                text: itemVariantPriceRange(item
                                                                    .itemList[i]
                                                                    .item![j]
                                                                    .variant!),
                                                                color: AppColors
                                                                    .mainBlackColor,
                                                                size: Dimensions
                                                                    .font16,
                                                              ),
                                                              // SizedBox(
                                                              //     height: Dimensions
                                                              //         .height5),
                                                              Row(
                                                                mainAxisAlignment:
                                                                    MainAxisAlignment
                                                                        .spaceBetween,
                                                                children: [
                                                                  RatingBar
                                                                      .builder(
                                                                    initialRating:
                                                                        4,
                                                                    minRating:
                                                                        1,
                                                                    direction: Axis
                                                                        .horizontal,
                                                                    allowHalfRating:
                                                                        false,
                                                                    itemCount:
                                                                        5,
                                                                    itemSize:
                                                                        Dimensions
                                                                            .font20,
                                                                    itemPadding: const EdgeInsets
                                                                            .symmetric(
                                                                        horizontal:
                                                                            2.0),
                                                                    itemBuilder:
                                                                        (context,
                                                                                _) =>
                                                                            const Icon(
                                                                      Icons
                                                                          .star,
                                                                      color: Colors
                                                                          .amber,
                                                                    ),
                                                                    onRatingUpdate:
                                                                        (rating) {
                                                                      // ignore: avoid_print
                                                                      print(
                                                                          rating);
                                                                    },
                                                                  ),
                                                                  Container(
                                                                    width: Dimensions
                                                                        .height40,
                                                                    height: Dimensions
                                                                        .height40,
                                                                    decoration:
                                                                        BoxDecoration(
                                                                            borderRadius:
                                                                                BorderRadius.horizontal(
                                                                              left: Radius.zero,
                                                                              right: Radius.circular(Dimensions.height40 / 2),
                                                                            ),
                                                                            color: AppColors.mainColor),
                                                                    child:
                                                                        GestureDetector(
                                                                      onTap:
                                                                          () {
                                                                        Get.bottomSheet(
                                                                          SizedBox(
                                                                            height:
                                                                                Dimensions.screenHeight / 2,
                                                                            child:
                                                                                Column(
                                                                              mainAxisAlignment: MainAxisAlignment.start,
                                                                              crossAxisAlignment: CrossAxisAlignment.start,
                                                                              children: [
                                                                                ListTile(
                                                                                  title: BigText(
                                                                                    text: item.itemList[i].item![j].itemName!,
                                                                                    color: AppColors.mainColor,
                                                                                  ),
                                                                                  trailing: GestureDetector(
                                                                                    onTap: () => Navigator.of(context).pop(),
                                                                                    child: const AppIcon(
                                                                                      icon: Icons.clear,
                                                                                      iconColor: Colors.white,
                                                                                      backgroundColor: AppColors.mainColor,
                                                                                    ),
                                                                                  ),
                                                                                ),
                                                                                Divider(
                                                                                  color: Colors.grey[110],
                                                                                  thickness: 2.0,
                                                                                  indent: 5.0,
                                                                                  endIndent: 5.0,
                                                                                ),
                                                                                SizedBox(
                                                                                  height: Dimensions.height10,
                                                                                ),
                                                                                Padding(
                                                                                  padding: const EdgeInsets.only(left: 5.0),
                                                                                  child: BigText(
                                                                                    text: item.itemList[i].item![j].variant![0].variantuom!,
                                                                                    size: Dimensions.font18,
                                                                                  ),
                                                                                ),
                                                                                SizedBox(
                                                                                  height: Dimensions.height10,
                                                                                ),
                                                                                Container(
                                                                                  color: Colors.white,
                                                                                  child: VariantListPage(i: i, j: j),
                                                                                )
                                                                              ],
                                                                            ),
                                                                          ),
                                                                          elevation:
                                                                              20.0,
                                                                          isDismissible:
                                                                              false,
                                                                          backgroundColor:
                                                                              Colors.grey[100],
                                                                          shape:
                                                                              RoundedRectangleBorder(
                                                                            borderRadius:
                                                                                BorderRadius.only(
                                                                              topLeft: Radius.circular(Dimensions.radius15),
                                                                              topRight: Radius.circular(Dimensions.radius15),
                                                                            ),
                                                                          ),
                                                                        );
                                                                      },
                                                                      child:
                                                                          Icon(
                                                                        Icons
                                                                            .add_shopping_cart_outlined,
                                                                        color: Colors
                                                                            .white,
                                                                        size: Dimensions
                                                                            .font18,
                                                                      ),
                                                                    ),
                                                                  ),
                                                                ],
                                                              ),
                                                              GestureDetector(
                                                                onTap: () {
                                                                  Get.bottomSheet(
                                                                    Container(
                                                                      color: Colors
                                                                          .white,
                                                                      height:
                                                                          Dimensions.screenHeight /
                                                                              3,
                                                                      width: Dimensions
                                                                          .screenWidth,
                                                                      child:
                                                                          Column(
                                                                        mainAxisAlignment:
                                                                            MainAxisAlignment.start,
                                                                        crossAxisAlignment:
                                                                            CrossAxisAlignment.start,
                                                                        children: [
                                                                          SizedBox(
                                                                            height:
                                                                                Dimensions.height121,
                                                                            child:
                                                                                Stack(
                                                                              children: [
                                                                                Image.network(
                                                                                  AppConstants.imageURL + item.itemList[i].item![j].itemImage!,
                                                                                  fit: BoxFit.cover,
                                                                                  width: Dimensions.screenWidth,
                                                                                ),
                                                                                Positioned(
                                                                                  top: 10,
                                                                                  right: 5,
                                                                                  child: GestureDetector(
                                                                                    onTap: () => Navigator.of(context).pop(),
                                                                                    child: const AppIcon(
                                                                                      icon: Icons.clear,
                                                                                      iconColor: Colors.white,
                                                                                      backgroundColor: AppColors.mainColor,
                                                                                    ),
                                                                                  ),
                                                                                )
                                                                              ],
                                                                            ),
                                                                          ),
                                                                          SizedBox(
                                                                            height:
                                                                                Dimensions.height10,
                                                                          ),
                                                                          Padding(
                                                                            padding:
                                                                                const EdgeInsets.only(left: 5.0, right: 8.0),
                                                                            child:
                                                                                Row(
                                                                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                                                              children: [
                                                                                BigText(
                                                                                  text: item.itemList[i].item![j].itemName!,
                                                                                  color: AppColors.mainColor,
                                                                                ),
                                                                                GestureDetector(
                                                                                  onTap: (() {}),
                                                                                  child: Container(
                                                                                    width: Dimensions.width62_5,
                                                                                    height: Dimensions.height40,
                                                                                    decoration: BoxDecoration(
                                                                                      borderRadius: BorderRadius.circular(Dimensions.height10),
                                                                                      color: AppColors.mainColor,
                                                                                    ),
                                                                                    child: Center(
                                                                                      child: BigText(
                                                                                        text: "Add",
                                                                                        color: Colors.white,
                                                                                      ),
                                                                                    ),
                                                                                  ),
                                                                                ),
                                                                              ],
                                                                            ),
                                                                          ),
                                                                          Padding(
                                                                            padding:
                                                                                const EdgeInsets.only(left: 5.0),
                                                                            child:
                                                                                BigText(
                                                                              text: itemVariantPriceRange(item.itemList[i].item![j].variant),
                                                                              color: AppColors.mainBlackColor,
                                                                              size: Dimensions.font16,
                                                                            ),
                                                                          ),
                                                                          SizedBox(
                                                                            height:
                                                                                Dimensions.height10,
                                                                          ),
                                                                          SmallText(
                                                                            text:
                                                                                itemDescription(item.itemList[i].item![j].itemDescription!, 100),
                                                                            size:
                                                                                Dimensions.font16,
                                                                          ),
                                                                        ],
                                                                      ),
                                                                    ),
                                                                    elevation:
                                                                        20.0,
                                                                    isDismissible:
                                                                        false,
                                                                  );
                                                                },
                                                                child: RichText(
                                                                  text:
                                                                      TextSpan(
                                                                    text:
                                                                        "More Details...",
                                                                    style:
                                                                        TextStyle(
                                                                      color: Colors
                                                                              .grey[
                                                                          500],
                                                                      fontSize:
                                                                          Dimensions
                                                                              .font14,
                                                                    ),
                                                                  ),
                                                                ),
                                                              ),
                                                            ],
                                                          ),
                                                        ),
                                                      ),
                                                    )
                                                  ],
                                                ),
                                              ),
                                            );
                                          })
                                    ],
                                  ),
                                );
                              },
                            )
                          : const CircularProgressIndicator(
                              color: AppColors.mainColor,
                            )
                      : const NoDataPage(
                          text: "Food is currently unavailable!",
                          imgPath: "assets/image/empty_box.png");
                }),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
