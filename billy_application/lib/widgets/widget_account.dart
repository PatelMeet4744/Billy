import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/app_icon.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:billy_application/widgets/small_text.dart';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class AccountWidget extends StatelessWidget {
  String optionTitle;
  String optionSubTitle;
  AppIcon optionIcon;
  Function optiononTap;

  AccountWidget({
    super.key,
    required this.optionTitle,
    required this.optionSubTitle,
    required this.optionIcon,
    required this.optiononTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding:
          EdgeInsets.only(left: Dimensions.width5, right: Dimensions.width5),
      decoration: BoxDecoration(color: Colors.white, boxShadow: [
        BoxShadow(
          blurRadius: 1,
          offset: const Offset(0, 2),
          color: Colors.grey.withOpacity(0.2),
        ),
      ]),
      child: ListTile(
        leading: optionIcon,
        onTap: () {
          optiononTap();
        },
        title: BigText(
          text: optionTitle,
          size: Dimensions.font18,
        ),
        // title: Text(
        //   optionTitle,
        //   style: TextStyle(
        //     fontSize: Dimensions.font20,
        //     fontWeight: FontWeight.bold,
        //   ),
        // ),
        subtitle: Padding(
          padding: EdgeInsets.only(top: Dimensions.height5),
          child: SmallText(
            text: optionSubTitle,
            size: Dimensions.font14,
          ),
        ),
        trailing: const Icon(Icons.keyboard_arrow_right),
      ),
    );
  }
}
