import 'package:flutter/material.dart';

class CardOutput extends StatelessWidget {
  const CardOutput(
      {super.key,
      required this.iteratifMedian,
      required this.recursiveMedian,
      required this.iteratifTime,
      required this.recursiveTime});
  final String iteratifMedian;
  final String recursiveMedian;
  final String iteratifTime;
  final String recursiveTime;

  @override
  Widget build(BuildContext context) {
    return Container(
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
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("Median with Rekursif"),
                Text(recursiveMedian),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("Running Time"),
                Text(recursiveTime),
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
                Text(iteratifMedian),
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text("Running Time"),
                Text(iteratifTime),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
