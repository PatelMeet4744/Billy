import 'package:billy_application/controllers/auth_controller.dart';
import 'package:billy_application/controllers/cuisines_controller.dart';
import 'package:billy_application/controllers/restaurant_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:billy_application/widgets/exandable_text_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class RestaurantListPage extends StatelessWidget {
  final int pageId;
  const RestaurantListPage({super.key, required this.pageId});

  Future<void> _loadResources(String cuisinesId) async {
    await Get.find<RestaurantController>()
        .getRestaurantListByCusines(cuisinesId);
  }

  @override
  Widget build(BuildContext context) {
    bool userLoggedIn = Get.find<AuthController>().userLoggedIn();
    var cuisines = Get.find<CuisinesController>().cuisinesList[pageId];

    if (userLoggedIn) {
      _loadResources(cuisines.cuisinesId!);
    }

    return Scaffold(
        backgroundColor: Colors.white,
        body: CustomScrollView(
          slivers: [
            SliverAppBar(
              toolbarHeight: Dimensions.height62_5,
              leading: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: () {
                      Get.offNamed(RouteHelper.getInitial());
                    },
                    child: AppIcon(
                      icon: Icons.arrow_back,
                      iconSize: Dimensions.height45 / 2,
                    ),
                  ),
                ],
              ),
              bottom: PreferredSize(
                preferredSize: Size.fromHeight(Dimensions.height20),
                child: Container(
                  width: double.maxFinite,
                  padding: EdgeInsets.only(
                    top: Dimensions.height5,
                    left: Dimensions.width10,
                    bottom: Dimensions.height5,
                  ),
                  decoration: const BoxDecoration(
                    color: Colors.white,
                    // borderRadius: BorderRadius.only(
                    //   topLeft: Radius.circular(Dimensions.radius25),
                    //   topRight: Radius.circular(Dimensions.radius25),
                    // ),
                  ),
                  child: BigText(
                      text: cuisines.cuisinesName!, size: Dimensions.font24),
                ),
              ),
              pinned: true,
              backgroundColor: AppColors.mainColor,
              expandedHeight: Dimensions.cuisinesBannerImgSize,
              flexibleSpace: FlexibleSpaceBar(
                background: Image.network(
                  AppConstants.imageURL + cuisines.cuisinesBanner!,
                  width: double.maxFinite,
                  fit: BoxFit.cover,
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    margin: EdgeInsets.only(
                      left: Dimensions.width10,
                      right: Dimensions.width10,
                    ),
                    child: ExpandableTextWidget(
                        text: cuisines.cuisinesDescription!),
                  ),
                  SizedBox(
                    height: Dimensions.height10,
                  ),
                  GetBuilder<RestaurantController>(builder: (restaurant) {
                    return restaurant.isLoaded
                        ? ListView.builder(
                            physics: const NeverScrollableScrollPhysics(),
                            shrinkWrap: true,
                            itemCount: restaurant.restaurantList.length,
                            itemBuilder: (context, index) {
                              return GestureDetector(
                                onTap: () {},
                                child: Container(
                                  margin: EdgeInsets.only(
                                    left: Dimensions.width5,
                                    right: Dimensions.width5,
                                    bottom: Dimensions.height10,
                                  ),
                                  child: Row(
                                    children: [
                                      //image section
                                      Container(
                                        width: Dimensions.listViewImgSize,
                                        height: Dimensions.listViewImgSize,
                                        decoration: BoxDecoration(
                                          borderRadius: BorderRadius.circular(
                                              Dimensions.radius20),
                                          color: Colors.white38,
                                          boxShadow: const [
                                            BoxShadow(
                                                color: Color(0xFFe8e8e8),
                                                //blurRadius: 5.0,
                                                offset: Offset(0, 5)),
                                            BoxShadow(
                                                color: Colors.white,
                                                offset: Offset(-5, 0)),
                                            BoxShadow(
                                                color: Colors.white,
                                                offset: Offset(5, 0)),
                                          ],
                                          image: DecorationImage(
                                            fit: BoxFit.cover,
                                            image: NetworkImage(
                                                AppConstants.imageURL +
                                                    restaurant
                                                        .restaurantList[index]
                                                        .restaurantImage!),
                                          ),
                                        ),
                                      ),
                                      //text container
                                      Expanded(
                                        child: Container(
                                          margin: EdgeInsets.only(
                                              left: Dimensions.width5),
                                          height: Dimensions.listViewImgSize,
                                          decoration: BoxDecoration(
                                            borderRadius: BorderRadius.all(
                                              Radius.circular(
                                                  Dimensions.radius20),
                                            ),
                                            color: Colors.white,
                                            boxShadow: [
                                              BoxShadow(
                                                blurRadius: 7,
                                                spreadRadius: 1,
                                                offset: const Offset(1, 10),
                                                color: Colors.grey
                                                    .withOpacity(0.2),
                                              ),
                                            ],
                                          ),
                                          child: Padding(
                                            padding: EdgeInsets.only(
                                              left: Dimensions.width10,
                                              right: Dimensions.width10,
                                            ),
                                            child: Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              children: [
                                                BigText(
                                                  text: restaurant
                                                      .restaurantList[index]
                                                      .restaurantName!,
                                                  color: AppColors.mainColor,
                                                ),
                                                SizedBox(
                                                    height:
                                                        Dimensions.height10),
                                                Text(
                                                  restaurant
                                                      .restaurantList[index]
                                                      .restaurantAddress!,
                                                  style: TextStyle(
                                                    color: AppColors.textColor,
                                                    fontFamily: 'Roboto',
                                                    fontSize: Dimensions.font12,
                                                    height: 1.2,
                                                    // fontWeight: FontWeight.w400,
                                                  ),
                                                ),
                                                // SizedBox(height: Dimensions.height10),
                                                //   Row(
                                                //       mainAxisAlignment:
                                                //           MainAxisAlignment.spaceBetween,
                                                //       children: [
                                                //         IconAndTextWidget(
                                                //             icon: Icons.circle_sharp,
                                                //             text: "Normal",
                                                //             iconColor:
                                                //                 AppColors.iconColor1),
                                                //         IconAndTextWidget(
                                                //             icon: Icons.location_on,
                                                //             text: "1.7km",
                                                //             iconColor: AppColors.mainColor),
                                                //         IconAndTextWidget(
                                                //             icon: Icons.access_time_rounded,
                                                //             text: "32min",
                                                //             iconColor: AppColors.iconColor2)
                                                //       ]),
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
                        : const CircularProgressIndicator(
                            color: AppColors.mainColor,
                          );
                  }),
                ],
              ),
            )
          ],
        ));
  }
}
