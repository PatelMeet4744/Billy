import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

void showCustomSnackBar({
  bool isError = false,
  String message = "",
  String title = "Error",
}) {
  Get.snackbar(
    title,
    message,
    titleText: BigText(text: title, color: Colors.white),
    messageText: Text(
      message,
      style: const TextStyle(
        color: Colors.white,
      ),
    ),
    colorText: Colors.white,
    snackPosition: SnackPosition.TOP,
    backgroundColor: isError ? Colors.redAccent : Colors.greenAccent,
  );
}
