import 'dart:math';

double findMedianRecursive(List<int> array1, List<int> array2) {
  return _findMedianRecursiveHelper(array1, array2);
}

double _findMedianRecursiveHelper(List<int> a, List<int> b) {
  if (a.length > b.length) return _findMedianRecursiveHelper(b, a);

  final int x = a.length;
  final int y = b.length;
  final int halfLen = (x + y + 1) ~/ 2;

  int low = 0, high = x;

  while (low <= high) {
    final int partitionX = (low + high) ~/ 2;
    final int partitionY = halfLen - partitionX;

    final int maxX =
        (partitionX == 0) ? double.negativeInfinity.toInt() : a[partitionX - 1];
    final int minX =
        (partitionX == x) ? double.infinity.toInt() : a[partitionX];

    final int maxY =
        (partitionY == 0) ? double.negativeInfinity.toInt() : b[partitionY - 1];
    final int minY =
        (partitionY == y) ? double.infinity.toInt() : b[partitionY];

    if (maxX <= minY && maxY <= minX) {
      if ((x + y) % 2 == 0) {
        return (max(maxX, maxY) + min(minX, minY)) / 2;
      } else {
        return max(maxX, maxY).toDouble();
      }
    } else if (maxX > minY) {
      high = partitionX - 1;
    } else {
      low = partitionX + 1;
    }
  }

  throw Exception('No median found');
}
