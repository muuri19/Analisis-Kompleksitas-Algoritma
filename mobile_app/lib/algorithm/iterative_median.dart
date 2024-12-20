  //Jika jumlah elemen ganjil, maka median adalah elemen di tengah
  //Jika jumlah elemen genap, maka median adalah rata-rata dua elemen ditengah
double findMedianIterative(List<int> nums) {
  int n = nums.length;
  if(n % 2 == 1){
    return nums[n ~/ 2].toDouble();
  }else {
    return (nums[n ~/2 - 1] + nums[n ~/2]) / 2;
  }
}

