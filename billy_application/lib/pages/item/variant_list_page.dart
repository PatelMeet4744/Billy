import 'package:billy_application/base/no_data_page.dart';
import 'package:billy_application/controllers/item_controller.dart';
import 'package:billy_application/models/item_model.dart';
import 'package:billy_application/pages/item/item_addon_list_page.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class VariantListPage extends StatefulWidget {
  final List<Item>? itemList;
  final int? index;

  const VariantListPage({Key? key, this.itemList, this.index})
      : super(key: key);

  @override
  State<VariantListPage> createState() => _VariantListPageState();
}

class _VariantListPageState extends State<VariantListPage> {
  int selected = 0;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: Dimensions.screenHeight / 2,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ListTile(
            title: BigText(
              text: widget.itemList![widget.index!].itemName!,
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
              text: widget.itemList![widget.index!].variant![0].variantuom!,
              size: Dimensions.font18,
            ),
          ),
          SizedBox(
            height: Dimensions.height10,
          ),
          Container(
            color: Colors.white,
            child: variantListBottomSheet(
                context, widget.itemList![widget.index!].variant!),
          )
        ],
      ),
    );
  }

  Widget variantListBottomSheet(BuildContext context, List<Variant>? variant) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GetBuilder<ItemController>(builder: (item) {
          return variant!.isNotEmpty
              ? item.isLoaded
                  ? ListView.builder(
                      scrollDirection: Axis.vertical,
                      shrinkWrap: true,
                      itemCount: variant.length,
                      itemBuilder: (context, i) {
                        return RadioListTile(
                          title: Text(
                              "${variant[i].variantName!}  (₹${variant[i].variantSalesPrice!})"),
                          value: i,
                          groupValue: selected,
                          onChanged: ((value) {
                            setState(() {
                              selected = value!;
                            });
                          }),
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
        Container(
          padding: const EdgeInsets.only(left: 5.0, right: 2.0, top: 8.0),
          color: Colors.grey[100],
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Divider(
                color: Colors.grey[110],
                thickness: 2.0,
                indent: 5.0,
                endIndent: 5.0,
              ),
              SizedBox(height: Dimensions.height10),
              Padding(
                padding: const EdgeInsets.only(left: 5.0),
                child: RichText(
                    text: TextSpan(
                  style: TextStyle(
                    fontSize: Dimensions.font14,
                    color: AppColors.mainBlackColor,
                  ),
                  children: <TextSpan>[
                    TextSpan(text: 'Purchase Price: '),
                    TextSpan(
                        text: "₹${variant![selected].variantPrice!}",
                        style: const TextStyle(fontWeight: FontWeight.bold)),
                  ],
                )),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 5.0),
                    child: BigText(
                      text: "Step1/3",
                      size: Dimensions.font16,
                      color: AppColors.mainBlackColor,
                    ),
                  ),
                  Container(
                    width: Dimensions.height50,
                    height: Dimensions.height40,
                    decoration: BoxDecoration(
                        borderRadius: BorderRadius.horizontal(
                          left: Radius.zero,
                          right: Radius.circular(Dimensions.height40 / 2),
                        ),
                        color: AppColors.mainColor),
                    child: GestureDetector(
                      onTap: () {
                        // Item Addon List Page
                        Get.bottomSheet(
                          ItemAddonListPage(
                            itemList: widget.itemList,
                            index: widget.index,
                            selectedVariant: selected,
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
                      },
                      child: Icon(
                        Icons.navigate_next_rounded,
                        color: Colors.white,
                        size: Dimensions.font26,
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
