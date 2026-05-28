# Brew SYS — Backend API

REST API untuk sistem manajemen kedai kopi **Brew SYS**, dibangun dengan Express.js, MongoDB, dan TypeScript.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT (jsonwebtoken) + bcrypt
- **File Upload**: Multer (memory storage) + Cloudinary
- **Validation**: Zod
- **Docs**: Swagger UI (swagger-jsdoc + swagger-ui-express)
- **Deploy**: Vercel

## Cara Menjalankan

```bash
# Install dependencies
npm install

# Buat file .env (lihat bagian Environment Variables)
# Lalu jalankan development server
npm run dev
```

Server berjalan di `http://localhost:3000`

## Environment Variables

Buat file `.env` di root folder `be/`:

```env
PORT=3000
SALT_BYCRYPT=10
MONGO_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
JWT_EXPIRES=1h
BASE_URL=https://your-deployed-url.vercel.app
```

## API Documentation

Swagger UI tersedia di:

- **Local**: `http://localhost:3000/docs`
- **Production**: `https://tugas-pemograman-web-be.vercel.app/docs`

## Endpoints

### Auth

| Method | Endpoint      | Deskripsi                               | Auth |
| ------ | ------------- | --------------------------------------- | ---- |
| POST   | `/auth/login` | Login, mendapatkan JWT token            | ❌   |
| GET    | `/auth/me`    | Mendapatkan data user yang sedang login | ✅   |

### Employees

| Method | Endpoint         | Deskripsi                                 | Role         |
| ------ | ---------------- | ----------------------------------------- | ------------ |
| POST   | `/employees`     | Tambah pegawai baru (multipart/form-data) | Admin, Owner |
| GET    | `/employees`     | Ambil semua pegawai                       | Admin, Owner |
| DELETE | `/employees/:id` | Hapus pegawai                             | Admin, Owner |

### Products

| Method | Endpoint        | Deskripsi                                | Role         |
| ------ | --------------- | ---------------------------------------- | ------------ |
| POST   | `/products`     | Tambah produk baru (multipart/form-data) | Semua        |
| GET    | `/products`     | Ambil semua produk                       | Semua        |
| PUT    | `/products/:id` | Update produk                            | Semua        |
| DELETE | `/products/:id` | Hapus produk                             | Admin, Owner |

### Raw Materials

| Method | Endpoint             | Deskripsi              | Role                  |
| ------ | -------------------- | ---------------------- | --------------------- |
| POST   | `/raw-materials`     | Tambah bahan baku      | Admin, Owner, Barista |
| GET    | `/raw-materials`     | Ambil semua bahan baku | Admin, Owner, Barista |
| PUT    | `/raw-materials/:id` | Update bahan baku      | Admin, Owner, Barista |
| DELETE | `/raw-materials/:id` | Hapus bahan baku       | Admin, Owner, Barista |

### Orders

| Method | Endpoint      | Deskripsi         | Role         |
| ------ | ------------- | ----------------- | ------------ |
| POST   | `/orders`     | Buat order baru   | Semua        |
| GET    | `/orders`     | Ambil semua order | Admin, Owner |
| DELETE | `/orders/:id` | Hapus order       | Admin, Owner |

### Stats

| Method | Endpoint | Deskripsi                                                                | Auth |
| ------ | -------- | ------------------------------------------------------------------------ | ---- |
| GET    | `/stats` | Statistik dashboard (produk, bahan baku, pegawai, revenue, chart 7 hari) | ✅   |

## Role & Akses

| Role        | Akses                                          |
| ----------- | ---------------------------------------------- |
| **Admin**   | Semua endpoint                                 |
| **Owner**   | Semua endpoint                                 |
| **Barista** | Produk (CRUD), Bahan Baku (CRUD), Order (buat) |
| **Kasir**   | Produk (read), Order (buat)                    |

## Struktur Folder

```
be/src/
├── controllers/     # Logic handler tiap resource
├── middlewares/     # ACL (JWT verify), RBAC (role check), multer, validator
├── models/          # Mongoose schema (Employee, Product, RawMaterial, Order)
├── routes/          # Express router tiap resource
├── services/        # Koneksi MongoDB
├── utils/           # ENV loader, Cloudinary config, response helper, Swagger, Role constants
└── validators/      # Zod schema untuk validasi request body
```

## Response Format

Semua response menggunakan format konsisten:

```json
{
  "status": "succes" | "failed",
  "message": "pesan deskriptif",
  "data": { ... } | null
}
```

| HTTP Code | Kondisi                          |
| --------- | -------------------------------- |
| 200       | Sukses                           |
| 201       | Data berhasil dibuat             |
| 400       | Validasi gagal / bad request     |
| 401       | Token tidak ada atau tidak valid |
| 403       | Role tidak diizinkan             |
| 404       | Data tidak ditemukan             |
| 500       | Server error                     |
