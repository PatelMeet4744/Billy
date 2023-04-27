import 'package:billy_application/base/no_data_page.dart';
import 'package:billy_application/controllers/item_controller.dart';
import 'package:billy_application/models/item_model.dart';
import 'package:billy_application/utils/app_constants.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:numberpicker/numberpicker.dart';

class ItemQtyPage extends StatefulWidget {
  final List<Item>? itemList;
  final int? index;
  final int? selectedVariant;
  final List<int>? selectedItemAddonList;
  final List<int>? selectedItemAddExtraList;
  final int? previousTotalPrice;

  const ItemQtyPage({
    super.key,
    this.itemList,
    this.index,
    this.selectedVariant,
    this.selectedItemAddonList,
    this.selectedItemAddExtraList,
    this.previousTotalPrice,
  });

  @override
  State<ItemQtyPage> createState() => _ItemQtyPageState();
}

class _ItemQtyPageState extends State<ItemQtyPage> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: Dimensions.screenHeight / 3,
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
              text: "QTY",
              size: Dimensions.font18,
            ),
          ),
          SizedBox(
            height: Dimensions.height10,
          ),
          Container(
            color: Colors.white,
            child: Container(
              child: itemQtyBottomSheet(
                context,
                widget.itemList![widget.index!].itemaddextra!.addextra!,
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget itemQtyBottomSheet(BuildContext context, List<Addextra>? addextra) {
    Get.find<ItemController>().initQty();
    return GetBuilder<ItemController>(builder: (item) {
      return Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          addextra!.isNotEmpty
              ? item.isLoaded
                  ? Center(
                      child: NumberPicker(
                        value: item.qty,
                        minValue: AppConstants.minQty,
                        maxValue: AppConstants.maxQty,
                        onChanged: (value) => item.setQty(value),
                        axis: Axis.horizontal,
                      ),
                    )
                  : const CircularProgressIndicator(
                      color: AppColors.mainColor,
                    )
              : const NoDataPage(
                  text: "Food is currently unavailable!",
                  imgPath: "assets/image/empty_box.png"),
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
                  child: Text(
                      'Order Price: ${item.qty} x ₹${widget.previousTotalPrice} = ₹${(item.qty * widget.previousTotalPrice!)}'),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    BigText(
                      text: "Step: 4/4",
                      size: Dimensions.font16,
                      color: AppColors.mainBlackColor,
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
                          Navigator.of(context).pop();
                        },
                        child: Icon(
                          Icons.add_shopping_cart_outlined,
                          color: Colors.white,
                          size: Dimensions.font22,
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
    });
  }
}
