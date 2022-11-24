library snippetcoder_utils;

import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:flutter/material.dart';

class AppFormHelper {
  static Widget inputFieldWidget(
    String keyName,
    String hintText,
    Function onValidate,
    Function onSaved, {
    String initialValue = "",
    obscureText = false,
    Widget? suffixIcon,
    // Color borderColor = const Color(0xFFF6881F),
    // Color borderFocusColor = const Color(0xFFF6881F),
    Color borderColor = Colors.white,
    Color borderFocusColor = Colors.white,
    double focusedBorderWidth = 1.0,
    double enabledBorderWidth = 1.0,
    required IconData prefixIcon,
    bool isMultiline = false,
    Function? onChange,
    Color validationColor = Colors.redAccent,
    int multilineRows = 4,
    TextInputType textInputType = TextInputType.text,
    Color backgroundColor = Colors.transparent,
  }) {
    return Container(
      margin: EdgeInsets.only(
        left: Dimensions.width20,
        right: Dimensions.width20,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(Dimensions.radius15),
        boxShadow: [
          BoxShadow(
            blurRadius: 3,
            spreadRadius: 1,
            offset: const Offset(1, 1),
            color: Colors.grey.withOpacity(0.2),
          ),
        ],
      ),
      child: TextFormField(
        initialValue: initialValue,
        key: Key(initialValue.toString()),
        obscureText: obscureText,
        keyboardType: textInputType,
        maxLines: isMultiline ? multilineRows : 1,
        validator: (val) {
          return onValidate(val);
        },
        onSaved: (val) {
          onSaved(val);
        },
        onChanged: (val) {
          onChange != null ? onChange(val) : null;
        },
        decoration: InputDecoration(
          filled: true,
          fillColor: backgroundColor,
          contentPadding: EdgeInsets.all(Dimensions.height6),
          errorStyle: TextStyle(
            color: validationColor,
            // fontWeight: FontWeight.bold,
            fontSize: Dimensions.font12,
          ),
          errorBorder: InputBorder.none,
          // focusedErrorBorder: InputBorder.none,
          // hintText
          hintText: hintText,
          suffixIcon: suffixIcon,
          // prefixIcon
          prefixIcon: Icon(
            prefixIcon,
            color: AppColors.mainColor,
          ),
          // focusedBorder
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              Dimensions.radius15,
            ),
            borderSide: BorderSide(
              width: focusedBorderWidth,
              color: borderFocusColor,
            ),
          ),
          // enabledBorder
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(Dimensions.radius15),
            borderSide: BorderSide(
              width: enabledBorderWidth,
              color: borderColor,
            ),
          ),
          // border
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(
              Dimensions.radius15,
            ),
          ),
        ),
      ),
    );
  }

  static Widget inputFieldWidgetWithLabel(
    String keyName,
    String labelName,
    String hintText,
    Function onValidate,
    Function onSaved, {
    String initialValue = "",
    obscureText = false,
    bool labelBold = true,
    Widget? suffixIcon,
    Color borderColor = Colors.white,
    Color borderFocusColor = Colors.white,
    double focusedBorderWidth = 1.0,
    double enabledBorderWidth = 1.0,
    required IconData prefixIcon,
    bool isMultiline = false,
    Function? onChange,
    Color textColor = Colors.black,
    Color validationColor = Colors.redAccent,
    int multilineRows = 4,
    TextInputType textInputType = TextInputType.text,
    Color backgroundColor = Colors.transparent,
  }) {
    return Container(
      padding:
          EdgeInsets.only(left: Dimensions.width10, right: Dimensions.width10),
      child: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.only(
              left: Dimensions.width20,
              right: Dimensions.width20,
              top: Dimensions.height10,
              bottom: Dimensions.height10,
            ),
            child: Align(
              alignment: Alignment.topLeft,
              child: Text(
                labelName,
                textAlign: TextAlign.left,
                style: TextStyle(
                  fontSize: Dimensions.font20,
                  fontWeight: labelBold ? FontWeight.bold : null,
                ),
              ),
            ),
          ),
          inputFieldWidget(
            keyName,
            hintText,
            onValidate,
            onSaved,
            initialValue: initialValue,
            obscureText: obscureText,
            textInputType: textInputType,
            suffixIcon: suffixIcon,
            borderColor: borderColor,
            borderFocusColor: borderFocusColor,
            enabledBorderWidth: enabledBorderWidth,
            focusedBorderWidth: focusedBorderWidth,
            prefixIcon: prefixIcon,
            onChange: onChange,
            isMultiline: isMultiline,
            validationColor: validationColor,
            multilineRows: multilineRows,
            backgroundColor: backgroundColor,
          ),
        ],
      ),
    );
  }
}
