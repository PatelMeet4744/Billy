import 'package:billy_application/base/no_data_page.dart';
import 'package:billy_application/controllers/item_controller.dart';
import 'package:billy_application/models/item_model.dart';
import 'package:billy_application/pages/item/item_qty_page.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ItemAddExtraListPage extends StatefulWidget {
  final List<Item>? itemList;
  final int? index;
  final int? selectedVariant;
  final List<int>? selectedItemAddonList;
  final int? previousTotalPrice;
  const ItemAddExtraListPage({
    super.key,
    this.itemList,
    this.index,
    this.selectedVariant,
    this.selectedItemAddonList,
    this.previousTotalPrice,
  });

  @override
  State<ItemAddExtraListPage> createState() => _ItemAddExtraListPageState();
}

class _ItemAddExtraListPageState extends State<ItemAddExtraListPage> {
  int selected = 0;
  List<int> selectedList = [];
  int forwardTotalPrice = 0;

  totalOrderPrice(
      List<Item> itemList,
      int index,
      int selectedVariant,
      int previousTotalPrice,
      List<int> selectedItemAddExtraList,
      int selectedItemAddExtra,
      bool isOptional) {
     int itemAddExtaPrice = 0;
    if (isOptional) {
      if (selectedItemAddExtraList.isNotEmpty) {
        for (int element in selectedItemAddExtraList) {
          itemAddExtaPrice += itemList[index]
              .itemaddextra!
              .addextra![element]
              .addextraFinalPrice!
              .toInt();
        }
      } else {
        itemAddExtaPrice = 0;
      }
    } else {
      itemAddExtaPrice = itemList[index]
          .itemaddextra!
          .addextra![selectedItemAddExtra]
          .addextraFinalPrice!
          .toInt();
    }
    int total = previousTotalPrice + itemAddExtaPrice;
    forwardTotalPrice = total;
    return RichText(
        text: TextSpan(
      style: TextStyle(
        fontSize: Dimensions.font14,
        color: AppColors.mainBlackColor,
      ),
      children: <TextSpan>[
        const TextSpan(text: 'Order Price: '),
        TextSpan(
            text:
                "₹${itemList[index].variant![selectedVariant].variantSalesPrice.toString()} + ₹${(previousTotalPrice - itemList[index].variant![selectedVariant].variantSalesPrice!.toInt()).toString()} + ₹$itemAddExtaPrice = ₹$total",
            style: const TextStyle(fontWeight: FontWeight.bold)),
      ],
    ));
  }

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
              text: widget.itemList![widget.index!].itemaddextra!.title
                  .toString(),
              size: Dimensions.font18,
            ),
          ),
          SizedBox(
            height: Dimensions.height10,
          ),
          Container(
            color: Colors.white,
            child: Container(
              child: itemAddExtraBottomSheet(
                context,
                widget.itemList![widget.index!].itemaddextra!.addextra!,
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget itemAddExtraBottomSheet(
      BuildContext context, List<Addextra>? addextra) {
    bool isOptional = widget
                .itemList![widget.index!].itemaddextra!.customerSelection!
                .toString()
                .toLowerCase() ==
            "optional"
        ? true
        : false;
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GetBuilder<ItemController>(builder: (item) {
          return addextra!.isNotEmpty
              ? item.isLoaded
                  ? ListView.builder(
                      scrollDirection: Axis.vertical,
                      shrinkWrap: true,
                      itemCount: addextra.length,
                      itemBuilder: (context, i) {
                        if (isOptional) {
                          return CheckboxListTile(
                            title: Text(
                                "${addextra[i].addextraName!}  (₹${addextra[i].addextraFinalPrice!})"),
                            value: selectedList.contains(i),
                            onChanged: (value) {
                              setState(() {
                                if (value!) {
                                  selectedList.add(i);
                                } else {
                                  selectedList.remove(i);
                                }
                              });
                            },
                          );
                        } else {
                          return RadioListTile(
                            title: Text(
                                "${addextra[i].addextraName!}  (₹${addextra[i].addextraFinalPrice!})"),
                            value: i,
                            groupValue: selected,
                            onChanged: ((value) {
                              setState(() {
                                selected = value!;
                              });
                            }),
                          );
                        }
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
                  child: totalOrderPrice(
                      widget.itemList!,
                      widget.index!,
                      widget.selectedVariant!,
                      widget.previousTotalPrice!,
                      selectedList,
                      selected,
                      isOptional)),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  BigText(
                    text: "Step: 3/4",
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
                        // Item Qty Page
                        Navigator.of(context).pop();
                        if (!isOptional) {
                          selectedList.add(selected);
                        }
                        Get.bottomSheet(
                          ItemQtyPage(
                            itemList: widget.itemList,
                            index: widget.index,
                            selectedVariant: widget.selectedVariant,
                            selectedItemAddonList: widget.selectedItemAddonList,
                            selectedItemAddExtraList: selectedList,
                            previousTotalPrice: forwardTotalPrice,
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
                        // Icons.add_shopping_cart_outlined,
                        Icons.navigate_next_rounded,
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
  }
}
