function findMedianSortedArrays(nums1, nums2) {
    let combinedArray = nums1.concat(nums2);

    function insertionSortRecursive(arr, n) {
        
        if (n <= 1) return;
        insertionSortRecursive(arr, n - 1);

        let last = arr[n - 1];
        let j = n - 2;

        while (j >= 0 && arr[j] > last) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = last;
    }

    insertionSortRecursive(combinedArray, combinedArray.length);

    const length = combinedArray.length;
    if (length % 2 === 1) {
        
        return combinedArray[Math.floor(length / 2)];
    } else {
        
        const mid1 = combinedArray[length / 2 - 1];
        const mid2 = combinedArray[length / 2];
        return (mid1 + mid2) / 2;
    }
}

const nums1 = [1, 3, 7, 9 ,11, 12 ,17, 20];
const nums2 = [2, 4, 5];

const median = findMedianSortedArrays(nums1, nums2);
console.log("Median:", median);