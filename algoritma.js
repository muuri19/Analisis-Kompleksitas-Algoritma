const { performance } = require('perf_hooks'); // Gunakan untuk mengukur waktu eksekusi di Node.js

// Fungsi untuk mengukur waktu eksekusi sebuah fungsi
function measureExecutionTime(func, ...args) {
    const start = performance.now(); // Catat waktu mulai
    const result = func(...args); // Jalankan fungsi
    const end = performance.now(); // Catat waktu selesai
    return { result, time: end - start }; // Kembalikan hasil dan waktu eksekusi
}

// Fungsi iteratif untuk mencari median dari dua array
function findMedianIterative(arr1, arr2) {
    // O(n + m): Gabungkan kedua array
    let mergedArray = arr1.concat(arr2);

    // O((n + m) log(n + m)): Urutkan array gabungan
    mergedArray.sort((a, b) => a - b);

    let n = mergedArray.length; // O(1): Hitung panjang array gabungan

    // O(1): Tentukan median berdasarkan panjang array
    return n % 2 === 1
        ? mergedArray[Math.floor(n / 2)] // Akses elemen tengah jika jumlah elemen ganjil
        : (mergedArray[n / 2 - 1] + mergedArray[n / 2]) / 2; // Rata-rata dua elemen tengah jika jumlah elemen genap
}

// Fungsi rekursif untuk mencari median dari dua array
function findMedianRecursive(arr1, arr2) {
    // Fungsi bantu untuk menghitung median dari satu array
    function medianSingleArray(arr) {
        let n = arr.length; // O(1): Hitung panjang array
        // O(1): Tentukan median array tunggal
        return n % 2 === 1
            ? arr[Math.floor(n / 2)] // Median untuk jumlah elemen ganjil
            : (arr[n / 2 - 1] + arr[n / 2]) / 2; // Median untuk jumlah elemen genap
    }

    let n1 = arr1.length; // O(1)
    let n2 = arr2.length; // O(1)

    // O(1): Basis rekursi
    if (n1 === 1 && n2 === 1) return (arr1[0] + arr2[0]) / 2;
    if (n1 === 0) return medianSingleArray(arr2);
    if (n2 === 0) return medianSingleArray(arr1);

    // O(1): Hitung median masing-masing array
    let median1 = medianSingleArray(arr1);
    let median2 = medianSingleArray(arr2);

    // O(1): Jika median sama, kembalikan median
    if (median1 === median2) return median1;

    // Rekursi dengan array yang lebih kecil
    if (median1 < median2) {
        // O(k): Potong array berdasarkan median
        return findMedianRecursive(
            arr1.slice(Math.floor(n1 / 2)), // Elemen kanan dari arr1
            arr2.slice(0, Math.ceil(n2 / 2)) // Elemen kiri dari arr2
        );
    } else {
        // O(k): Potong array berdasarkan median
        return findMedianRecursive(
            arr1.slice(0, Math.ceil(n1 / 2)), // Elemen kiri dari arr1
            arr2.slice(Math.floor(n2 / 2)) // Elemen kanan dari arr2
        );
    }
}

// Ukuran array yang diuji
const sizes = [10, 100, 1000, 10000, 100000]; // Variasi input untuk mengukur performa
const results = [];

for (let size of sizes) {
    // O(n): Membuat array random
    const array1 = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
    const array2 = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));

    // O(n log n): Mengurutkan array untuk fungsi rekursif
    const sortedArray1 = [...array1].sort((a, b) => a - b);
    const sortedArray2 = [...array2].sort((a, b) => a - b);

    // Ukur waktu eksekusi fungsi iteratif dan rekursif
    const iterative = measureExecutionTime(findMedianIterative, array1, array2);
    const recursive = measureExecutionTime(findMedianRecursive, sortedArray1, sortedArray2);

    // Simpan hasil pengukuran
    results.push({
        size,
        iterativeTime: iterative.time.toFixed(2), // Waktu fungsi iteratif
        recursiveTime: recursive.time.toFixed(2), // Waktu fungsi rekursif
        iterativeMedian: iterative.result, // Median hasil iteratif
        recursiveMedian: recursive.result, // Median hasil rekursif
    });
}

// Tampilkan hasil dalam tabel
console.table(results);

// Input manual untuk pengujian
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

            // Median iteratif
            const iterativeMedian = findMedianIterative(array1, array2);

            // Median rekursif
            const recursiveMedian = findMedianRecursive(
                array1.sort((a, b) => a - b),
                array2.sort((a, b) => a - b)
            );

            // Hasil
            console.log("\nHasil Median:");
            console.log("Iteratif:", iterativeMedian);
            console.log("Rekursif:", recursiveMedian);

            rl.close();
        });
    });
}

// Jalankan manual test
manualTest();
