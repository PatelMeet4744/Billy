import 'package:billy_application/controllers/restaurant_controller.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:billy_application/models/banner_model.dart';
import 'package:billy_application/controllers/banner_controller.dart';
import 'package:billy_application/controllers/cuisines_controller.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:dots_indicator/dots_indicator.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class FoodPageBody extends StatefulWidget {
  const FoodPageBody({super.key});

  @override
  State<FoodPageBody> createState() => _FoodPageBodyState();
}

class _FoodPageBodyState extends State<FoodPageBody> {
  PageController pageController = PageController(viewportFraction: 0.85);
  var _currPageValue = 0.0;
  final double _scaleFactor = 0.8;
  final double _height = Dimensions.pageViewContainer;

  @override
  void initState() {
    super.initState();
    pageController.addListener(() {
      setState(() {
        _currPageValue = pageController.page!;
        // print("Current value is " + _currPageValue.toString());
      });
    });
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        //slider section
        GetBuilder<BannerController>(
          builder: (banners) {
            return banners.isLoaded
                ? SizedBox(
                    height: Dimensions.pageView,
                    child: PageView.builder(
                        controller: pageController,
                        itemCount: banners.bannerList.length,
                        itemBuilder: (context, position) {
                          return _buildPageItem(
                              position, banners.bannerList[position]);
                        }),
                  )
                : const CircularProgressIndicator(
                    color: AppColors.mainColor,
                  );
          },
        ),
        //dots
        GetBuilder<BannerController>(builder: (banners) {
          return DotsIndicator(
            dotsCount:
                banners.bannerList.isEmpty ? 1 : banners.bannerList.length,
            position: _currPageValue,
            decorator: DotsDecorator(
              activeColor: AppColors.mainColor,
              size: const Size.square(9.0),
              activeSize: const Size(18.0, 9.0),
              activeShape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5.0)),
            ),
          );
        }),
        // Cuisines
        SizedBox(
          height: Dimensions.height10,
        ),
        Container(
          margin: EdgeInsets.only(
              left: Dimensions.width30, bottom: Dimensions.height2),
          child: Row(
            children: [
              BigText(text: "Cuisines"),
              // SizedBox(
              //   width: Dimensions.width10,
              // ),
            ],
          ),
        ),
        // list of Cuisines
        Padding(
          padding: const EdgeInsets.only(left: 8.0, top: 8.0, right: 8.0),
          child: Container(
            margin: EdgeInsets.only(
              // top: Dimensions.height2,
              left: Dimensions.width15,
              right: Dimensions.width20,
              // bottom: Dimensions.height10,
            ),
            height: Dimensions.height150,
            alignment: Alignment.centerLeft,
            child: GetBuilder<CuisinesController>(
              builder: (cuisines) {
                return cuisines.isLoaded
                    ? ListView.builder(
                        shrinkWrap: true,
                        physics: const ClampingScrollPhysics(),
                        scrollDirection: Axis.horizontal,
                        itemCount: cuisines.cuisinesList.length,
                        itemBuilder: (context, index) {
                          return GestureDetector(
                            onTap: () {},
                            child: Column(
                              children: [
                                Container(
                                  margin: const EdgeInsets.all(8),
                                  width: Dimensions.width75,
                                  height: Dimensions.height75,
                                  alignment: Alignment.center,
                                  child: Image.network(
                                    AppConstants.imageURL +
                                        cuisines
                                            .cuisinesList[index].cuisinesImage!,
                                    height: Dimensions.height75,
                                  ),
                                ),
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.center,
                                  children: [
                                    Text(
                                      cuisines
                                          .cuisinesList[index].cuisinesName!,
                                      style: TextStyle(
                                        fontFamily: 'Roboto',
                                        fontSize: Dimensions.font12,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    Icon(
                                      Icons.keyboard_arrow_right,
                                      size: Dimensions.iconSize16,
                                      color: AppColors.mainColor,
                                    )
                                  ],
                                )
                              ],
                            ),
                          );
                        },
                      )
                    : const CircularProgressIndicator(
                        color: AppColors.mainColor,
                      );
              },
            ),
          ),
        ),
        // Restaurant
        Container(
          margin: EdgeInsets.only(left: Dimensions.width30),
          child: Row(
            children: [
              BigText(text: "Restaurant"),
              // SizedBox(
              //   width: Dimensions.width10,
              // ),
            ],
          ),
        ),
        // list of Restaurant
        GetBuilder<RestaurantController>(builder: (restaurant) {
          return restaurant.isLoaded
              ? ListView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: restaurant.restaurantList.length,
                  itemBuilder: (context, index) {
                    return GestureDetector(
                      onTap: () {
                        // Get.toNamed(RouteHelper.getRecommendedFood(index));
                      },
                      child: Container(
                        margin: EdgeInsets.only(
                          left: Dimensions.width20,
                          right: Dimensions.width20,
                          bottom: Dimensions.height10,
                        ),
                        child: Row(
                          children: [
                            //image section
                            Container(
                              width: Dimensions.listViewImgSize,
                              height: Dimensions.listViewImgSize,
                              decoration: BoxDecoration(
                                borderRadius:
                                    BorderRadius.circular(Dimensions.radius20),
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
                                  image: NetworkImage(AppConstants.imageURL +
                                      restaurant.restaurantList[index]
                                          .restaurantImage!),
                                ),
                              ),
                            ),
                            //text container
                            Expanded(
                              child: Container(
                                margin:
                                    EdgeInsets.only(left: Dimensions.width5),
                                height: Dimensions.listViewImgSize,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.all(
                                    Radius.circular(Dimensions.radius20),
                                  ),
                                  color: Colors.white,
                                  boxShadow: [
                                    BoxShadow(
                                      blurRadius: 7,
                                      spreadRadius: 1,
                                      offset: const Offset(1, 10),
                                      color: Colors.grey.withOpacity(0.2),
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
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      BigText(
                                        text: restaurant.restaurantList[index]
                                            .restaurantName!,
                                        color: AppColors.mainColor,
                                      ),
                                      SizedBox(height: Dimensions.height10),
                                      Text(
                                        restaurant.restaurantList[index]
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
        SizedBox(
          height: Dimensions.height10,
        ),
      ],
    );
  }

  Widget _buildPageItem(int index, Data banners) {
    Matrix4 matrix = Matrix4.identity();
    if (index == _currPageValue.floor()) {
      var currScale = 1 - (_currPageValue - index) * (1 - _scaleFactor);
      var currTrans = _height * (1 - currScale) / 2;
      matrix = Matrix4.diagonal3Values(1, currScale, 1)
        ..setTranslationRaw(0, currTrans, 0);
    } else if (index == _currPageValue.floor() + 1) {
      var currScale =
          _scaleFactor + (_currPageValue - index + 1) * (1 - _scaleFactor);
      var currTrans = _height * (1 - currScale) / 2;
      matrix = Matrix4.diagonal3Values(1, currScale, 1)
        ..setTranslationRaw(0, currTrans, 0);
    } else if (index == _currPageValue.floor() - 1) {
      var currScale = 1 - (_currPageValue - index) * (1 - _scaleFactor);
      var currTrans = _height * (1 - currScale) / 2;
      matrix = Matrix4.diagonal3Values(1, currScale, 1)
        ..setTranslationRaw(0, currTrans, 0);
    } else {
      var currScale = 0.8;
      var currTrans = _height * (1 - _scaleFactor) / 2;
      matrix = Matrix4.diagonal3Values(1, currScale, 1)
        ..setTranslationRaw(0, currTrans, 0);
    }
    return Transform(
      transform: matrix,
      child: Stack(
        children: [
          Container(
            height: Dimensions.pageViewContainer,
            margin: EdgeInsets.only(
              left: Dimensions.width5,
              right: Dimensions.width5,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(30),
              color:
                  index.isEven ? AppColors.mainColor : const Color(0x33F6881F),
              // ignore: prefer_const_literals_to_create_immutables
              boxShadow: [
                const BoxShadow(
                    color: Color(0xFFe8e8e8),
                    //blurRadius: 5.0,
                    offset: Offset(0, 5)),
                const BoxShadow(color: Colors.white, offset: Offset(-5, 0)),
                const BoxShadow(color: Colors.white, offset: Offset(5, 0)),
              ],
              image: DecorationImage(
                fit: BoxFit.cover,
                image:
                    NetworkImage(AppConstants.imageURL + banners.bannerImage!),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
