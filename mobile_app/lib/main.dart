import 'package:flutter/material.dart';
import 'package:mobile_app/pages/home_pages.dart';

void main() {
  runApp(const MedianApp());
}

class MedianApp extends StatelessWidget {
  const MedianApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: HomePages.routeName,
      routes: {
        HomePages.routeName: (context) => const HomePages(),
      },
    );
  }
}

