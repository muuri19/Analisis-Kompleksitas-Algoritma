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
function measureRunningTime(nums1, nums2) {  
    const startTime = performance.now();  
    const median = findMedianSortedArrays(nums1, nums2);  
    const endTime = performance.now();  
    const duration = endTime - startTime;  

    console.log("Median:", median);  
    console.log(`Running time: ${duration.toFixed(2)} milliseconds`);  
}  
 
function generateOddArray(size) {
    // Generate an array of odd numbers starting from 1
    return Array.from({ length: size }, (_, i) => 1 + i * 2);
}

// Sizes of arrays to test
const sizes = [50, 250, 500, 750];

sizes.forEach(size => {
    const nums1 = generateOddArray(size); // e.g., [1, 3, 5, ..., size * 2 - 1]
    const nums2 = generateOddArray(size); // e.g., [1, 3, 5, ..., size * 2 - 1]
    console.log(`Testing with input size: ${size}`);
    measureRunningTime(nums1, nums2);
});