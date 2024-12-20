/* 
1. Fungsi ini membagi array berdasarkan posisi awal dan akhir (start, end).
2. Ini memungkinkan kita mengontrol bagian mana dari array yang sedang diproses.
3. Sama seperti metode iteratif, jika jumlah elemen ganjil, maka median adalah elemen di tengah.
4. Jika jumlah elemen genap, maka median adalah rata-rata dua elemen tengah.
 */

double findMedianRecursive(List<int> nums, int start, int end){
  int length = end - start + 1;
  if(length % 2 == 1){
    return nums[start + length ~/ 2].toDouble();
  }else{
    int mid1 = start + length ~/2 - 1;
    int mid2 = start + length ~/2;
    return (nums[mid1] + nums[mid2]) / 2;
  }
}