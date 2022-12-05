import 'package:billy_application/controllers/onboard_controller.dart';
import 'package:billy_application/routes/route_helper.dart';
import 'package:billy_application/utils/colors.dart';
import 'package:billy_application/utils/dimensions.dart';
import 'package:billy_application/widgets/big_text.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SettingPage extends StatefulWidget {
  const SettingPage({super.key});

  @override
  State<SettingPage> createState() => _SettingPageState();
}

class _SettingPageState extends State<SettingPage> {
  bool _info = false;

  @override
  void initState() {
    super.initState();
    _info = Get.find<OnboardController>().getOnboardState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: AppColors.mainColor,
        title: BigText(
          text: "Setting",
          size: Dimensions.font24,
          color: Colors.white,
        ),
        leading: IconButton(
          onPressed: () => Get.offNamed(RouteHelper.getInitial()),
          icon: const Icon(
            Icons.arrow_back,
            color: Colors.white,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.settings,
              color: Colors.white,
            ),
          ),
        ],
      ),
      body: Container(
        padding: const EdgeInsets.all(10),
        child: Column(
          children: [
            ListTile(
              title: const Text("App Info"),
              subtitle: const Text("Enable App Information"),
              trailing: Switch(
                  value: _info,
                  onChanged: (value) {
                    setState(() {
                      _info = value;
                    });
                    Get.find<OnboardController>().setOnboardState(value);
                  }),
            ),
          ],
        ),
      ),
    );
  }
}
