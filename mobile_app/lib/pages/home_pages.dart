import 'package:flutter/material.dart';
import 'package:mobile_app/algorithm/iterative_median.dart';
import 'package:mobile_app/config/constans.dart';
import 'package:mobile_app/widgets/button_calculate.dart';
import 'package:mobile_app/widgets/card_output.dart';
import 'package:mobile_app/widgets/custom_textfield.dart';

class HomePages extends StatefulWidget {
  static const routeName = 'home';
  const HomePages({super.key});

  @override
  State<HomePages> createState() => _HomePagesState();
}

class _HomePagesState extends State<HomePages> {
  final TextEditingController array1Controller = TextEditingController();
  final TextEditingController array2Controller = TextEditingController();

  double? iteratifMedian;
  double? recursiveMedian;
  Duration? iteratifTime;
  Duration? recursiveTime;

  void calculateMedian() {
    final List<int> array1 = array1Controller.text
        .split(',')
        .map((e) => int.tryParse(e.trim()) ?? 0)
        .toList();
    final List<int> array2 = array1Controller.text
        .split(',')
        .map((e) => int.tryParse(e.trim()) ?? 0)
        .toList();

    final List<int> combinedArray = [...array1, ...array2]..sort();

    //Calculate Iterative Method
    final stopwatch1 = Stopwatch()..start();
    iteratifMedian = findMedianIterative(combinedArray);
    stopwatch1.stop();
    iteratifTime = stopwatch1.elapsed;

    //Calculate Iterative Method
    final stopwatch2 = Stopwatch()..start();
    iteratifMedian = findMedianIterative(combinedArray);
    stopwatch2.stop();
    iteratifTime = stopwatch2.elapsed;

    Constants.logger.i(
        "Median Iterative : $iteratifMedian\nMedian Recursive : $recursiveMedian");
    Constants.logger.i(
        "Running Time Iterative: $iteratifTime\nRunning Time Recursive : $recursiveTime");

    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("MEDIAN FINDER"),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
          child: Column(
            children: [
              CustomTextfield(
                labelText: "Array 1",
                controller: array1Controller,
              ),
              const SizedBox(
                height: 15,
              ),
              CustomTextfield(
                labelText: "Array 2",
                controller: array2Controller,
              ),
              const SizedBox(
                height: 15,
              ),
              ButtonCalculate(
                onPressed: calculateMedian,
              ),
              const SizedBox(
                height: 15,
              ),
              if (iteratifMedian != null && recursiveMedian != null) ...[
                CardOutput(
                    iteratifMedian: iteratifMedian.toString(),
                    recursiveMedian: recursiveMedian.toString(),
                    iteratifTime: iteratifTime.toString(),
                    recursiveTime: toString())
              ]
            ],
          ),
        ),
      ),
    );
  }
}
