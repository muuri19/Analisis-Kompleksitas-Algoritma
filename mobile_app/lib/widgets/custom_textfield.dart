import 'package:flutter/material.dart';

class CustomTextfield extends StatelessWidget {
  const CustomTextfield({super.key, required this.labelText, required this.controller});
  final String labelText;
  final TextEditingController controller;
  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: MediaQuery.of(context).size.width,
        child: TextField(
          decoration: InputDecoration(
              border: const OutlineInputBorder(), labelText: labelText),
        ));
  }
}
