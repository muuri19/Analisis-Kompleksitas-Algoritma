function findMedianSortedArrays(nums1, nums2) {
    let combinedArray = nums1.concat(nums2);

    let n = combinedArray.length;
    for (let i = 1; i < n; i++) {
        let current = combinedArray[i];
        let j = i - 1;

        while (j >= 0 && combinedArray[j] > current) {
            combinedArray[j + 1] = combinedArray[j];
            j--;
        }
        combinedArray[j + 1] = current; 
    }

    
    if (n % 2 === 1) {
        return combinedArray[Math.floor(n / 2)];
    } else {
        const mid1 = combinedArray[n / 2 - 1];
        const mid2 = combinedArray[n / 2];
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