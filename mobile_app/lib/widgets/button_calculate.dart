import 'package:flutter/material.dart';

class ButtonCalculate extends StatelessWidget {
  const ButtonCalculate({super.key, required this.onPressed});
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(4))),
        child: const Text(
          "Calculate",
          style: TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}
