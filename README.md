# Chrome Dino Bot

Skrip ini adalah bot otomatis untuk permainan Chrome Dino yang dimainkan di browser Chrome ketika tidak ada koneksi internet. Bot ini menggunakan JavaScript untuk memonitor rintangan di game dan secara otomatis mengendalikan T-Rex untuk melompat atau menunduk guna menghindari rintangan tersebut. Berikut adalah penjelasan rinci tentang bagaimana skrip ini bekerja:

## Fitur Utama
1. **Pendefinisian Variabel**:
   - `previousSpeed`: Kecepatan sebelumnya dari permainan.
   - `duckTimeoutId`: ID timeout untuk aksi menunduk.
   - `jumpsCount`: Menghitung jumlah lompatan yang dilakukan T-Rex.
   - `ducksCount`: Menghitung jumlah kali T-Rex menunduk.

2. **Fungsi Utama**:
   - `getNearestObstacle()`: Mendapatkan rintangan terdekat dari T-Rex.
   - `checkForObstacles()`: Memeriksa keberadaan rintangan dan memutuskan apakah T-Rex harus melompat atau menunduk.
   - `shouldJump()`: Memeriksa apakah T-Rex perlu melompat berdasarkan jenis rintangan.
   - `shouldDuck()`: Memeriksa apakah T-Rex perlu menunduk.
   - `isObstacleClose()`: Memeriksa apakah rintangan cukup dekat untuk memerlukan tindakan.
   - `simulateJump()`: Mensimulasikan lompatan T-Rex.
   - `simulateDuck()`: Mensimulasikan tindakan menunduk T-Rex.
   - `stopDuck()`: Menghentikan aksi menunduk.
   - `triggerKeyEvent()`: Memicu event keydown atau keyup untuk mengontrol T-Rex.
   - `checkForGameOver()`: Memeriksa apakah permainan berakhir dan merestart permainan jika diperlukan.

3. **Overlay Teks**:
   - `addTextOverlay()`: Menambahkan overlay teks animasi untuk "LIKE", "COMMENT", "SUBSCRIBE" dan juga menghitung jumlah lompatan dan tindukan.
   - `updateCountText()`: Memperbarui teks hitungan lompatan dan tindukan.

4. **Interval**:
   - `setInterval(checkForObstacles, 25)`: Mengecek rintangan setiap 25 milidetik.
   - `setInterval(checkForGameOver, 100)`: Mengecek status game over setiap 100 milidetik.

## Instalasi dan Penggunaan
1. **Clone Repository**:
    ```bash
    git clone https://github.com/zufarrizal/Chrome-Dino.git
    ```
2. **Menjalankan Bot**:
    - Buka permainan Chrome Dino di browser Anda.
    - Buka Developer Tools di Chrome (F12 atau Ctrl+Shift+I).
    - Salin dan tempelkan kode dari file `dino-bot.js` ke konsol dan tekan Enter.

Dengan skrip ini, permainan Chrome Dino Anda akan otomatis dikendalikan oleh bot, sehingga Anda dapat menikmati permainan tanpa harus bermain secara manual.
