const { performance } = require('perf_hooks');
function measureExecutionTime(func, ...args) {
    const start = performance.now();
    const result = func(...args);
    const end = performance.now();
    return { result, time: end - start };
}

function findMedianIterative(arr1, arr2) {
    let combinedArray = arr1.concat(arr2);
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


function findMedianRecursive(arr1, arr2) {
    let combinedArray = arr1.concat(arr2);

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


const sizes = [50, 250, 500, 750, 1000, 1500, 2500, 3500];
const results = [];

for (let size of sizes) {

    const array1 = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    const array2 = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));

    const sortedArray1 = [...array1].sort((a, b) => a - b);
    const sortedArray2 = [...array2].sort((a, b) => a - b);

    const iterative = measureExecutionTime(findMedianIterative, array1, array2);
    const recursive = measureExecutionTime(findMedianRecursive, sortedArray1, sortedArray2);

    results.push({
        size,
        iterativeTime: iterative.time.toFixed(2),
        recursiveTime: recursive.time.toFixed(2),
        iterativeMedian: iterative.result,
        recursiveMedian: recursive.result,
    });
}

console.table(results);

function manualTest() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("Masukkan array pertama (pisahkan dengan koma): ", (input1) => {
        const array1 = input1.split(",").map(Number);

        rl.question("Masukkan array kedua (pisahkan dengan koma): ", (input2) => {
            const array2 = input2.split(",").map(Number);

            const iterativeMedian = findMedianIterative(array1, array2);
            const recursiveMedian = findMedianRecursive(
                array1.sort((a, b) => a - b),
                array2.sort((a, b) => a - b)
            );

            console.log("\nHasil Median:");
            console.log("Iteratif:", iterativeMedian);
            console.log("Rekursif:", recursiveMedian);

            rl.close();
        });
    });
}

manualTest(); 
