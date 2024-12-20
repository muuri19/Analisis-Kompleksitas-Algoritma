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


const nums1 = [1, 3];
const nums2 = [2, 4, 5];

const median = findMedianSortedArrays(nums1, nums2);
console.log("Median:", median);