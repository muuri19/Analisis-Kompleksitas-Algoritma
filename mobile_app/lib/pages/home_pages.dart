import 'package:flutter/material.dart';
import 'package:mobile_app/algorithm/iterative_median.dart';
import 'package:mobile_app/algorithm/recursive_median.dart';
import 'package:mobile_app/widgets/button_calculate.dart';

class HomePages extends StatefulWidget {
  static const routeName = 'home';
  const HomePages({super.key});

  @override
  State<HomePages> createState() => _HomePagesState();
}

class _HomePagesState extends State<HomePages> {
  final TextEditingController _array1Controller = TextEditingController();
  final TextEditingController _array2Controller = TextEditingController();
  String? _medianIterative;
  String? _medianRecursive;
  String? _analysisIterative;
  String? _analysisRecursive;

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
              SizedBox(
                  width: MediaQuery.of(context).size.width,
                  child: TextField(
                    controller: _array1Controller,
                    keyboardType: TextInputType.text,
                    decoration: const InputDecoration(
                      hintText: "Input Array 1",
                      border: OutlineInputBorder(),
                    ),
                  )),
              const SizedBox(
                height: 8,
              ),
              SizedBox(
                  width: MediaQuery.of(context).size.width,
                  child: TextField(
                    controller: _array2Controller,
                    keyboardType: TextInputType.text,
                    decoration: const InputDecoration(
                      hintText: "Input Array 2",
                      border: OutlineInputBorder(),
                    ),
                  )),
              const SizedBox(
                height: 15,
              ),
              ButtonCalculate(
                onPressed: _calculateMedian,
              ),
              const SizedBox(
                height: 15,
              ),
              if (_medianIterative != null) ...[
                Container(
                  width: MediaQuery.of(context).size.width,
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(4),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.blue.withOpacity(0.5),
                          blurRadius: 4,
                          offset: const Offset(2, 4),
                        )
                      ]),
                  child: Padding(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 10, vertical: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text("Median with Rekursif"),
                            Text("$_medianRecursive"),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text("Running Time"),
                            Text("$_analysisRecursive"),
                          ],
                        ),
                        const SizedBox(
                          height: 8,
                        ),
                        const Divider(
                          height: 1,
                        ),
                        const SizedBox(
                          height: 8,
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text("Median with Iterative"),
                            Text("$_medianIterative"),
                          ],
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text("Running Time"),
                            Text("$_analysisIterative"),
                          ],
                        ),
                      ],
                    ),
                  ),
                )
              ],
            ],
          ),
        ),
      ),
    );
  }

  void _showError(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Error'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _calculateMedian() {
    final List<int> array1 = _parseInput(_array1Controller.text);
    final List<int> array2 = _parseInput(_array2Controller.text);

    if (array1.isEmpty || array2.isEmpty) {
      _showError('Both arrays must contain valid numbers.');
      return;
    }

    final Stopwatch stopwatch = Stopwatch();

    stopwatch.start();
    final iterativeMedian = findMedianIterative(array1, array2);
    stopwatch.stop();
    final iterativeTime = stopwatch.elapsedMicroseconds;

    stopwatch.reset();

    stopwatch.start();
    final recursiveMedian = findMedianRecursive(array1, array2);
    stopwatch.stop();
    final recursiveTime = stopwatch.elapsedMicroseconds;

    setState(() {
      _medianIterative = iterativeMedian.toString();
      _medianRecursive = recursiveMedian.toString();
      _analysisIterative = '$iterativeTime Microseconds';
      _analysisRecursive = '$recursiveTime Microseconds';
    });
  }

  List<int> _parseInput(String input) {
    return input
        .split(',')
        .map((e) => int.tryParse(e.trim()))
        .where((e) => e != null)
        .cast<int>()
        .toList();
  }
}
