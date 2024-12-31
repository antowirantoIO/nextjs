# **Project Structure and Best Practices**

Dokumentasi ini menjelaskan struktur folder, pola penamaan file, dan prinsip pengembangan untuk proyek ini. Dengan panduan ini, diharapkan setiap pengembang dapat memahami, memelihara, dan mengembangkan proyek dengan lebih mudah dan efisien.

---

## **1. Project Directory Structure**

Struktur proyek ini dirancang agar modular, fleksibel, dan scalable untuk pengembangan jangka panjang. Semua fitur utama, logika bisnis, dan antarmuka pengguna dikelompokkan berdasarkan tanggung jawab masing-masing.

```
project-name/
├── app/                           # Directory utama untuk App Router (Next.js)
│   ├── auth/                      # Modul autentikasi
│   │   ├── login/                 # Halaman login
│   │   │   ├── page.tsx           # Route halaman login
│   │   │   └── layout.tsx         # Layout khusus halaman login (opsional)
│   │   ├── register/              # Halaman register
│   │   │   ├── page.tsx           # Route halaman register
│   │   │   └── layout.tsx         # Layout khusus halaman register (opsional)
│   │   └── ...
│   ├── dashboard/                 # Modul dashboard
│   │   ├── layout.tsx             # Layout utama dashboard
│   │   ├── page.tsx               # Halaman utama dashboard
│   │   ├── users/                 # Modul manajemen pengguna
│   │   │   ├── page.tsx           # Halaman daftar pengguna
│   │   │   └── create/            # Subroute untuk menambahkan pengguna baru
│   │   │       └── page.tsx
│   │   ├── posts/                 # Modul manajemen postingan
│   │   │   ├── page.tsx           # Halaman daftar postingan
│   │   │   └── create/            # Subroute untuk menambahkan postingan baru
│   │   │       └── page.tsx
│   │   └── ...
│   ├── layout.tsx                 # Layout utama aplikasi
│   ├── page.tsx                   # Halaman landing utama
│   └── ...
├── modules/                       # Directory modular untuk logika bisnis, hooks, dan fitur
│   ├── auth/                      # Modul autentikasi
│   │   ├── components/            # Komponen spesifik autentikasi (e.g., LoginForm)
│   │   ├── hooks/                 # Custom hooks untuk autentikasi
│   │   ├── lib/                   # Logika bisnis atau layanan autentikasi
│   │   ├── types/                 # Tipe data dan interface TypeScript untuk autentikasi
│   │   ├── utils/                 # Utilitas tambahan untuk autentikasi
│   │   ├── tests/                 # Unit dan integration tests untuk autentikasi
│   │   └── README.md              # Dokumentasi modul autentikasi
│   ├── users/                     # Modul manajemen pengguna
│   ├── posts/                     # Modul manajemen postingan
│   └── ...
├── components/                    # Komponen UI yang dapat digunakan kembali di seluruh aplikasi
│   ├── ui/                        # Komponen generik seperti Button, Modal
│   ├── forms/                     # Komponen khusus untuk form (e.g., Input, Select)
│   ├── layout/                    # Komponen tata letak (Navbar, Sidebar)
│   └── ...
├── config/                        # File konfigurasi global
│   ├── axios.ts                   # Konfigurasi Axios
│   ├── zustandStore.ts            # Konfigurasi Zustand
│   ├── react-query.ts             # Konfigurasi React Query
│   ├── tailwind.config.js         # Konfigurasi Tailwind CSS
│   └── ...
├── hooks/                         # Custom hooks yang dapat digunakan di seluruh aplikasi
│   ├── useAuth.ts                 # Hook untuk autentikasi
│   ├── useFetch.ts                # Hook untuk pengambilan data
│   ├── useZustand.ts              # Hook untuk Zustand
│   └── ...
├── lib/                           # Library dan utilitas global
│   ├── formatters/                # Utilitas format data (e.g., tanggal, mata uang)
│   ├── validators/                # Logika validasi data
│   ├── types/                     # Tipe dan interface TypeScript yang digunakan bersama
│   └── ...
├── public/                        # Aset statis (gambar, ikon)
├── styles/                        # File gaya global dan konfigurasi
├── tests/                         # Pengujian unit, integrasi, dan e2e
├── utils/                         # Fungsi utilitas umum
├── .env                           # File variabel lingkungan
├── tsconfig.json                  # Konfigurasi TypeScript
├── next.config.js                 # Konfigurasi Next.js
├── package.json                   # File dependencies dan scripts
└── README.md                      # Dokumentasi proyek
```

---

## **2. Penamaan File**

### **a. Komponen**
- **Format**: `PascalCase`
- **Kegunaan**: Nama file mencerminkan fungsi spesifik komponen tersebut.
- **Contoh**:
  ```
  components/
  ├── LoginForm.tsx
  ├── Navbar.tsx
  ├── forms/
  │   ├── Input.tsx
  │   ├── Select.tsx
  └── ...
  ```

### **b. Hooks**
- **Format**: `camelCase`, diawali dengan `use`.
- **Kegunaan**: Nama file mencerminkan tujuan hook.
- **Contoh**:
  ```
  hooks/
  ├── useAuth.ts
  ├── useFetch.ts
  └── ...
  ```

### **c. Libraries dan Utilities**
- **Format**: `camelCase` atau `kebab-case` sesuai konteks.
- **Kegunaan**: Nama file mencerminkan fungsi logika bisnis atau utilitasnya.
- **Contoh**:
  ```
  lib/
  ├── authService.ts
  ├── tokenManager.ts
  └── ...
  ```

### **d. Types**
- **Format**: `PascalCase`
- **Kegunaan**: Nama file sesuai dengan entitas yang diwakili.
- **Contoh**:
  ```
  types/
  ├── AuthResponse.ts
  ├── User.ts
  └── ...
  ```

### **e. Tests**
- **Format**: File test diberi suffix `.test.ts` atau `.test.tsx`.
- **Kegunaan**: Nama file mencerminkan file atau fitur yang diuji.
- **Contoh**:
  ```
  tests/
  ├── authService.test.ts
  ├── LoginForm.test.tsx
  └── ...
  ```

---

## **3. Key Principles**

1. **Modular dan Isolated**:
    - Struktur modul di `modules/` memisahkan logika bisnis agar tidak bercampur dengan logika presentasi di `app/`.
    - Mempermudah penambahan fitur baru tanpa memengaruhi bagian lain dari aplikasi.

2. **Reusable dan Scalable**:
    - Komponen dan hooks reusable disimpan di `components/` dan `hooks/`.
    - Logika bisnis yang spesifik disimpan di dalam `modules/`.

3. **Konsistensi Penamaan**:
    - Komponen menggunakan **PascalCase**.
    - Hooks diawali dengan `use` dan menggunakan **camelCase**.
    - Utilities dan libraries menggunakan **camelCase** atau **kebab-case**.

4. **Testing-Ready**:
    - Setiap file atau fungsi penting memiliki pengujian yang sesuai untuk menjaga kualitas kode.

5. **Dokumentasi Modul**:
    - Setiap folder modul di `modules/` memiliki `README.md` untuk menjelaskan tujuan dan detail implementasinya.

---

Dengan struktur ini, proyek Anda siap untuk dikembangkan dengan **konsistensi, fleksibilitas, dan maintainability** tingkat tinggi! 🚀