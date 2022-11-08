import 'package:billy_application/providers/providers.dart';
import 'package:billy_application/utils/shared_service.dart';
import 'package:flutter/material.dart';

bool isLoggedIn = false;

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
    // checkLogin();
    Providers().getOnboardState().then((value) => setState(() {
          _info = value;
        }));
  }

  checkLogin() async {
    isLoggedIn = await SharedService.isLoggedIn();
    // ignore: use_build_context_synchronously
    if (isLoggedIn) SharedService.checkExpiredToken(context, isLoggedIn);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 20,
        title: const Text(
          'Account Settings',
          style: TextStyle(color: Colors.white),
        ),
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
            const SizedBox(
              height: 16,
            ),
            SizedBox(
              height: 50,
              child: TextButton(
                onPressed: () => isLoggedIn ? doUserLogout() : () {},
                child: const Text(
                  'Logout',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  void doUserLogout() async {
    await SharedService.logout(context);
  }
}
