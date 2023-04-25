import 'package:billy_application/base/no_data_page.dart';
import 'package:billy_application/controllers/item_controller.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class VariantListPage extends StatefulWidget {
  final int i, j;

  const VariantListPage({Key? key, required this.i, required this.j})
      : super(key: key);

  @override
  State<VariantListPage> createState() => _VariantListPageState();
}

class _VariantListPageState extends State<VariantListPage> {
  late int selectedIndex;
  @override
  void initState() {
    super.initState();
    setState(() {
      selectedIndex = 0;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GetBuilder<ItemController>(builder: (item) {
          return item.itemList[widget.i].item![widget.j].variant!.isNotEmpty
              ? item.isLoaded
                  ? ListView.builder(
                      scrollDirection: Axis.vertical,
                      shrinkWrap: true,
                      itemCount: item
                          .itemList[widget.i].item![widget.j].variant!.length,
                      itemBuilder: (context, k) {
                        return RadioListTile(
                          title: Text(
                              "${item.itemList[widget.i].item![widget.j].variant![k].variantName!}  (₹${item.itemList[widget.i].item![widget.j].variant![k].variantSalesPrice!})"),
                          value: k,
                          groupValue: item.itemList[widget.i].item![widget.j]
                              .variant![k].variantuom,
                          onChanged: ((value) {
                            setState(() {
                              selectedIndex = value! as int;
                            });
                          }),
                          selected: k == selectedIndex ? true : false,
                        );
                        // return CheckboxListTile(
                        //   title: Text(item.itemList[widget.i].item![widget.j]
                        //       .variant![k].variantName!),
                        //   value: checkedItems[k],
                        //   onChanged: (newValue) {
                        //     setState(() {
                        //       checkedItems[k] = newValue ?? false;
                        //     });
                        //   },
                        // );
                      },
                    )
                  : const CircularProgressIndicator(
                      color: AppColors.mainColor,
                    )
              : const NoDataPage(
                  text: "Food is currently unavailable!",
                  imgPath: "assets/image/empty_box.png");
        }),
        Container(
          padding: const EdgeInsets.only(left: 5.0, right: 2.0, top: 8.0),
          color: Colors.grey[100],
          child: Column(
            children: [
              Divider(
                color: Colors.grey[110],
                thickness: 2.0,
                indent: 5.0,
                endIndent: 5.0,
              ),
              BigText(
                text:
                    "Order Price = ₹${Get.find<ItemController>().itemList[widget.i].item![widget.j].variant![selectedIndex].variantSalesPrice!}",
                size: Dimensions.font16,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  BigText(
                    text: "Step1/3",
                    size: Dimensions.font16,
                    color: AppColors.mainBlackColor,
                  ),
                  Container(
                    width: Dimensions.height40,
                    height: Dimensions.height40,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.horizontal(
                          left: Radius.zero,
                          right: Radius.circular(Dimensions.height40 / 2),
                        ),
                        color: AppColors.mainColor),
                    child: GestureDetector(
                      onTap: () {
                        // Navigator.pop(context);
                        // Item Addon List Page
                        Get.bottomSheet(
                          SizedBox(
                            height: Dimensions.screenHeight / 2,
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.start,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                ListTile(
                                  title: BigText(
                                    text: "Item",
                                    color: AppColors.mainColor,
                                  ),
                                  trailing: GestureDetector(
                                    onTap: () => Navigator.pop(context),
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
                                    text: "Add on",
                                    size: Dimensions.font18,
                                  ),
                                ),
                                SizedBox(
                                  height: Dimensions.height10,
                                ),
                                Container(
                                  color: Colors.white,
                                  child: Container(
                                    child: Text("List of item addodn"),
                                  ),
                                )
                              ],
                            ),
                          ),
                          elevation: 20.0,
                          isDismissible: false,
                          backgroundColor: Colors.grey[100],
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(Dimensions.radius15),
                              topRight: Radius.circular(Dimensions.radius15),
                            ),
                          ),
                        );

                        // Get.toNamed(RouteHelper.getItemAddonListPage());
                      },
                      child: Icon(
                        Icons.navigate_next_rounded,
                        color: Colors.white,
                        size: Dimensions.font18,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
