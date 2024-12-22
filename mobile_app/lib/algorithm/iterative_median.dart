double findMedianIterative(List<int> array1, List<int> array2) {
  final List<int> merged = [...array1, ...array2]..sort();
  final int n = merged.length;
  return n % 2 == 0
      ? (merged[n ~/ 2 - 1] + merged[n ~/ 2]) / 2
      : merged[n ~/ 2].toDouble();
}
