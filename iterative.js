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
 
function generateSortedArray(size) {  
    const array = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));  
    return array.sort((a, b) => a - b); // Sort the array  
}  

const sizes = [100, 500, 1000];  

sizes.forEach(size => {  
    const nums1 = generateSortedArray(size);  
    const nums2 = generateSortedArray(size);  
    console.log(`Testing with input size: ${size}`);  
    measureRunningTime(nums1, nums2);  
});  