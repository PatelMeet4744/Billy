import 'package:flutter/material.dart';

class ItemAddonListPage extends StatefulWidget {
  const ItemAddonListPage({super.key});

  @override
  State<ItemAddonListPage> createState() => _ItemAddonListPageState();
}

class _ItemAddonListPageState extends State<ItemAddonListPage> {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 200,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          const Text('Second Bottom Sheet'),
          ElevatedButton(
            onPressed: () {
              // Navigator.pop(context);
              // showThirdBottomSheet(context);
            },
            child: const Text('Show Third Bottom Sheet'),
          ),
        ],
      ),
    );
  }
}
