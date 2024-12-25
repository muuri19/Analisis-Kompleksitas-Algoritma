const { performance } = require('perf_hooks');

// Fungsi untuk mengukur waktu eksekusi algoritma.
// Penjelasan: Fungsi ini memulai pengukuran waktu sebelum algoritma dijalankan dan menghitung selisihnya setelah selesai.
// Argumen: func - fungsi algoritma, args - parameter yang akan diteruskan ke fungsi.
function measureExecutionTime(func, ...args) {
    const start = performance.now(); // Mulai pengukuran waktu.
    const result = func(...args);    // Jalankan fungsi dengan argumen.
    const end = performance.now();  // Catat waktu setelah selesai.
    return { result, time: end - start }; // Kembalikan hasil fungsi dan waktu eksekusi.
}

// Fungsi untuk mencari median secara iteratif.
function findMedianIterative(arr1, arr2) {
    let combinedArray = arr1.concat(arr2); // Gabungkan kedua array.

    let n = combinedArray.length; // Panjang array gabungan.
    // Proses pengurutan menggunakan Insertion Sort.
    for (let i = 1; i < n; i++) {
        let current = combinedArray[i];
        let j = i - 1;

        while (j >= 0 && combinedArray[j] > current) {
            combinedArray[j + 1] = combinedArray[j];
            j--;
        }
        combinedArray[j + 1] = current; // Masukkan elemen di tempat yang sesuai.
    }

    // Cari median berdasarkan jumlah elemen.
    if (n % 2 === 1) {
        return combinedArray[Math.floor(n / 2)]; // Median untuk jumlah elemen ganjil.
    } else {
        const mid1 = combinedArray[n / 2 - 1];
        const mid2 = combinedArray[n / 2];
        return (mid1 + mid2) / 2; // Median untuk jumlah elemen genap.
    }
}

// Fungsi untuk mencari median secara rekursif.
function findMedianRecursive(arr1, arr2) {
    let combinedArray = arr1.concat(arr2); // Gabungkan kedua array.

    // Fungsi rekursif untuk melakukan Insertion Sort.
    function insertionSortRecursive(arr, n) {
        if (n <= 1) return; // Basis rekursi: jika hanya satu elemen, tidak perlu diurutkan.
        insertionSortRecursive(arr, n - 1); // Rekursif ke elemen sebelumnya.
        let last = arr[n - 1];
        let j = n - 2;
        while (j >= 0 && arr[j] > last) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = last; // Tempatkan elemen terakhir di posisi yang tepat.
    }

    insertionSortRecursive(combinedArray, combinedArray.length); // Panggil fungsi rekursif.

    const length = combinedArray.length; // Panjang array gabungan.
    if (length % 2 === 1) {
        return combinedArray[Math.floor(length / 2)]; // Median untuk jumlah elemen ganjil.
    } else {
        const mid1 = combinedArray[length / 2 - 1];
        const mid2 = combinedArray[length / 2];
        return (mid1 + mid2) / 2; // Median untuk jumlah elemen genap.
    }
}

// Membandingkan efisiensi waktu antara algoritma iteratif dan rekursif.
const sizes = [10, 100, 200, 500, 1000, 2000, 2500, 3500]; // Ukuran array untuk uji coba.
const results = []; // Menyimpan hasil perbandingan.

for (let size of sizes) {
    // Buat array acak untuk pengujian.
    const array1 = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
    const array2 = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));

    // Urutkan array untuk pengujian rekursif.
    const sortedArray1 = [...array1].sort((a, b) => a - b);
    const sortedArray2 = [...array2].sort((a, b) => a - b);

    // Ukur waktu eksekusi algoritma.
    const iterative = measureExecutionTime(findMedianIterative, array1, array2);
    const recursive = measureExecutionTime(findMedianRecursive, sortedArray1, sortedArray2);

    // Simpan hasil pengujian.
    results.push({
        size,
        iterativeTime: iterative.time.toFixed(2),
        recursiveTime: recursive.time.toFixed(2),
        iterativeMedian: iterative.result,
        recursiveMedian: recursive.result,
    });
}

console.table(results); // Tampilkan hasil pengujian dalam tabel.

// Fungsi untuk melakukan uji coba manual oleh user.
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

            // Hitung median menggunakan metode iteratif dan rekursif.
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

manualTest(); // Panggil fungsi uji manual.
