import 'package:billy_application/providers/providers.dart';
import 'package:flutter/material.dart';

class Account extends StatefulWidget {
  const Account({super.key});

  @override
  State<Account> createState() => _AccountState();
}

class _AccountState extends State<Account> {
  bool _info = false;

  @override
  void initState() {
    super.initState();

    Providers().getOnboardState().then((value) => setState(() {
          _info = value;
        }));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 20,
        title: const Text('Account Settings'),
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
                    Providers().setOnboardState(value);
                  }),
            ),
          ],
        ),
      ),
    );
  }
}
