import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class AppTextField extends StatelessWidget {
  final TextEditingController textController;
  final String hinText;
  final IconData icon;
  TextInputType? textInputType;

  AppTextField({
    super.key,
    required this.textController,
    required this.hinText,
    required this.icon,
    this.textInputType = TextInputType.text,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(
        left: Dimensions.width20,
        right: Dimensions.width20,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(Dimensions.radius30),
        boxShadow: [
          BoxShadow(
            blurRadius: 10,
            spreadRadius: 7,
            offset: const Offset(1, 10),
            color: Colors.grey.withOpacity(0.2),
          ),
        ],
      ),
      child: TextField(
        controller: textController,
        decoration: InputDecoration(
          // hintText
          hintText: hinText,
          // prefixIcon
          prefixIcon: Icon(
            icon,
            color: AppColors.mainColor,
          ),
          // focusedBorder
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              Dimensions.radius30,
            ),
            borderSide: const BorderSide(
              width: 1.0,
              color: Colors.white,
            ),
          ),
          // enabledBorder
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              Dimensions.radius30,
            ),
            borderSide: const BorderSide(
              width: 1.0,
              color: Colors.white,
            ),
          ),
          // border
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              Dimensions.radius30,
            ),
          ),
        ),
        // keyboardType
        keyboardType: textInputType,
      ),
    );
  }
}
