CoC Brain Training V4

ISI:
- 60 soal per skill x 6 skill = 360 soal.
- Setiap sesi berisi tepat 20 soal.
- Soal diacak setiap sesi.
- Soal yang sudah keluar disimpan di browser (localStorage), sehingga tidak muncul lagi pada sesi berikutnya sampai bank 60 soal untuk skill tersebut habis.
- Setelah seluruh 60 soal habis, siklus baru dimulai.
- XP, level, skor skill, streak, waktu latihan, dan riwayat tersimpan di browser.
- Jadwal: Senin Numerical, Selasa RPL, Rabu Memory, Kamis Public Speaking & English, Jumat Logic & Spatial.
- Jalankan dengan VS Code + Live Server.

V4 fixes: pilihan jawaban sekarang benar-benar terkunci setelah satu klik; tombol lain disabled, jawaban terpilih diberi highlight, dan tombol berikutnya aktif. Learning Hub sekarang berisi YouTube + website latihan.


PWA / OFFLINE:
- Setelah pertama kali dibuka melalui HTTPS atau localhost, aplikasi dapat dicache untuk dipakai offline.
- Di Android Chrome: buka URL online -> menu ⋮ -> Install app / Add to Home screen. Jika tombol Install App muncul di sidebar, tekan tombol itu.
- Di iPhone/iPad Safari: buka URL online -> Share -> Add to Home Screen.
- YouTube dan website eksternal tetap membutuhkan internet. Soal, timer, skor, level, streak, statistik, dan data lokal tetap dapat digunakan offline setelah app shell tercache.
- Untuk HP, deploy folder ini ke hosting HTTPS seperti GitHub Pages, Netlify, atau Vercel. Jangan gunakan alamat localhost laptop dari HP.
