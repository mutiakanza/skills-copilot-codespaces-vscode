# 🎯 Project Requirements: Learning & Assessment Web App

## 📖 Ringkasan

Aplikasi web **mobile-first** yang mendukung proses belajar-mengajar serta penilaian (quiz, tugas, ujian) untuk mahasiswa dan dosen di universitas Indonesia. Aplikasi berbahasa Indonesia (dengan opsi bahasa Inggris), terintegrasi dengan SSO kampus, dan siap di-deploy menggunakan Docker/Kubernetes.

---

## 🗂️ Scope

### In-Scope
✅ Autentikasi via SSO (SAML/OAuth2) – Keycloak / Azure AD  
✅ Dashboard mahasiswa & dosen  
✅ Manajemen kursus (create, enrol, materi)  
✅ Konten learning: video, PDF, teks, forum diskusi  
✅ Assessment: quiz (pilihan ganda, isian, drag-drop), assignment upload, auto-grade & manual grade  
✅ Laporan nilai & progres  
✅ API RESTful + optional GraphQL  
✅ CI/CD (GitHub Actions) & Docker image  

### Out-Of-Scope
❌ Integrasi LMS eksternal (Moodle, Blackboard)  
❌ Live streaming kelas (gunakan embed YouTube)  
❌ Sistem pembayaran / billing  

---

## 👤 User Stories & Acceptance Criteria

### 1. Login dengan SSO (Mahasiswa)
**User Story**: Sebagai mahasiswa, saya ingin login dengan SSO sehingga tidak perlu password tambahan.

**Acceptance Criteria**:
- ✅ Login berhasil via SSO Keycloak
- ✅ Error message jelas bila gagal
- ✅ Session timeout 30 menit
- ✅ Redirect ke dashboard setelah login berhasil

**Implementation**:
- Backend: `/api/auth/sso` endpoint
- Frontend: SSO login button di halaman login
- Keycloak realm configuration

---

### 2. Lihat Daftar Mata Kuliah (Mahasiswa)
**User Story**: Sebagai mahasiswa, saya ingin melihat daftar mata kuliah di dashboard.

**Acceptance Criteria**:
- ✅ Tampilkan nama kursus
- ✅ Tampilkan progres (%)
- ✅ Tampilkan notifikasi
- ✅ Filter berdasarkan status (aktif/selesai)

**Implementation**:
- API: `GET /api/courses?role=STUDENT&userId={id}`
- UI: Dashboard dengan card list kursus
- Prisma query dengan progress calculation

---

### 3. Akses Materi Offline (Mahasiswa)
**User Story**: Sebagai mahasiswa, saya ingin akses materi offline (download PDF, cache video).

**Acceptance Criteria**:
- ✅ File dapat di-download (≤20 MB)
- ✅ Service Worker men-cache video
- ✅ Offline indicator di UI
- ✅ Sync data ketika online kembali

**Implementation**:
- PWA configuration dengan Service Worker
- MinIO presigned URLs untuk download
- IndexedDB untuk cache management
- Download button di material page

---

### 4. Kerjakan Quiz (Mahasiswa)
**User Story**: Sebagai mahasiswa, saya ingin kerjakan quiz dengan timer & lihat skor serta penjelasan.

**Acceptance Criteria**:
- ✅ Submit sebelum timer habis
- ✅ Skor & feedback muncul otomatis
- ✅ Tampilkan jawaban benar/salah
- ✅ Penjelasan untuk setiap soal

**Implementation**:
- API: `POST /api/quizzes/{id}/attempt`
- Timer component dengan countdown
- Auto-submit on timeout
- Result page dengan explanation

---

### 5. Unggah Tugas (Mahasiswa)
**User Story**: Sebagai mahasiswa, saya ingin unggah tugas dan cek status penilaian.

**Acceptance Criteria**:
- ✅ Upload berhasil, file ≤20 MB
- ✅ Status: Submitted → Graded → Published
- ✅ Download file yang sudah diupload
- ✅ Lihat feedback dari dosen

**Implementation**:
- API: `POST /api/assignments/upload`
- File upload dengan progress bar
- MinIO storage integration
- Status badge component

---

### 6. Buat Kursus Baru (Dosen)
**User Story**: Sebagai dosen, saya ingin buat kursus baru serta menambah materi & jadwal.

**Acceptance Criteria**:
- ✅ Form lengkap (title, desc, tanggal, enrol key)
- ✅ Validation error messages
- ✅ Success notification
- ✅ Redirect ke course detail page

**Implementation**:
- API: `POST /api/courses`
- Form with react-hook-form
- MUI form components
- Validation with Zod/Yup

---

### 7. Buat Quiz (Dosen)
**User Story**: Sebagai dosen, saya ingin buat quiz dengan tipe soal: MCQ, isian, drag-drop, beri bobot tiap soal.

**Acceptance Criteria**:
- ✅ Quiz editor drag-and-drop
- ✅ Validasi semua field
- ✅ Preview quiz sebelum publish
- ✅ Set bobot untuk setiap soal
- ✅ Set passing score

**Implementation**:
- API: `POST /api/quizzes`
- Drag-drop question builder
- Question type selector
- Weight input for each question
- Preview modal

---

### 8. Nilai Tugas (Dosen)
**User Story**: Sebagai dosen, saya ingin nilai tugas secara manual (rubrik atau numeric) & kirim feedback.

**Acceptance Criteria**:
- ✅ UI menampilkan file assignment
- ✅ UI rubrik penilaian
- ✅ Input nilai numeric
- ✅ Mahasiswa dapat notifikasi email/push
- ✅ Feedback text area

**Implementation**:
- API: `POST /api/assignments/{id}/grade`
- PDF/file viewer component
- Rubric form builder
- Email notification service
- Feedback textarea with rich text

---

### 9. Kelola Hak Akses (Admin)
**User Story**: Sebagai admin, saya ingin kelola hak akses (tambah/hapus user, set role).

**Acceptance Criteria**:
- ✅ Admin dapat assign role: student, lecturer, admin
- ✅ CRUD operations untuk user
- ✅ Bulk actions (multiple users)
- ✅ Search dan filter users

**Implementation**:
- API: `PUT /api/users/{id}/role`
- User management table
- Role selector dropdown
- Confirmation dialogs
- Bulk action toolbar

---

### 10. Responsif Design (Semua User)
**User Story**: Sebagai user, saya ingin aplikasi responsif di desktop, tablet, smartphone.

**Acceptance Criteria**:
- ✅ Lulus tes pada breakpoint 320 px – 1920 px
- ✅ Touch-friendly pada mobile
- ✅ Hamburger menu pada mobile
- ✅ Adaptive layout

**Implementation**:
- Tailwind CSS responsive utilities
- MUI responsive grid system
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

---

### 11. Lokalisasi (Semua User)
**User Story**: Sebagai user, saya ingin aplikasi dalam Bahasa Indonesia (default) + English (optional).

**Acceptance Criteria**:
- ✅ `next-intl` dengan fallback
- ✅ Tanggal format `DD/MM/YYYY`
- ✅ Language switcher di header
- ✅ Semua text sudah ditranslasi

**Implementation**:
- next-intl configuration
- Translation files: id.json, en.json
- Locale switcher component
- Date formatting dengan date-fns

---

### 12. Keamanan & Privasi (Semua User)
**User Story**: Sebagai user, saya ingin data saya aman dan mematuhi PDPA & GDPR.

**Acceptance Criteria**:
- ✅ Password hashed (bcrypt)
- ✅ Enkripsi data pribadi
- ✅ Fitur request data deletion
- ✅ Privacy policy page
- ✅ Cookie consent

**Implementation**:
- bcrypt untuk password hashing
- JWT dengan expiration
- HTTPS only in production
- Data deletion endpoint
- Privacy policy component
- Cookie banner

---

## 🏗️ Arsitektur Tingkat Tinggi

```
┌──────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │  Next.js   │  │    MUI     │  │  Tailwind  │             │
│  │    App     │  │ Components │  │    CSS     │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │  Zustand   │  │React Query │  │ next-intl  │             │
│  │   Store    │  │   Cache    │  │    i18n    │             │
│  └────────────┘  └────────────┘  └────────────┘             │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                         API GATEWAY                           │
│                    (NGINX / API Gateway)                      │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                         BACKEND LAYER                         │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │   NestJS   │  │  Prisma    │  │    JWT     │             │
│  │Controllers │  │    ORM     │  │    Auth    │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │  Services  │  │Validators  │  │   Guards   │             │
│  └────────────┘  └────────────┘  └────────────┘             │
└──────────────────────────────────────────────────────────────┘
                              │
                 ┌────────────┴────────────┐
                 ▼                         ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│    DATABASE LAYER        │   │     STORAGE LAYER        │
│  ┌────────────────────┐  │   │  ┌────────────────────┐  │
│  │    PostgreSQL      │  │   │  │   MinIO / S3       │  │
│  │   (Primary DB)     │  │   │  │  (File Storage)    │  │
│  └────────────────────┘  │   │  └────────────────────┘  │
└──────────────────────────┘   └──────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION LAYER                       │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                    Keycloak SSO                         │  │
│  │         (SAML / OAuth2 / OpenID Connect)               │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                        │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │   Docker   │  │ Kubernetes │  │   Helm     │             │
│  │ Containers │  │    K8s     │  │  Charts    │             │
│  └────────────┘  └────────────┘  └────────────┘             │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                    MONITORING & LOGGING                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │ Prometheus │  │  Grafana   │  │    Loki    │             │
│  │  Metrics   │  │Dashboards  │  │    Logs    │             │
│  └────────────┘  └────────────┘  └────────────┘             │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema (Prisma)

Lihat file: `backend/prisma/schema.prisma`

### Core Tables:
- **User**: Mahasiswa, Dosen, Admin
- **Course**: Mata kuliah
- **Material**: Materi pembelajaran
- **Enrollment**: Pendaftaran kursus
- **Quiz**: Kuis
- **QuizQuestion**: Soal kuis
- **QuizAttempt**: Percobaan kuis
- **Assignment**: Tugas
- **Grading**: Penilaian

---

## 🔐 Authentication Flow

```
┌─────────┐                                    ┌──────────┐
│  User   │                                    │ Keycloak │
└────┬────┘                                    └─────┬────┘
     │                                                │
     │  1. Click "Login with SSO"                    │
     ├──────────────────────────────────────────────▶│
     │                                                │
     │  2. Redirect to Keycloak Login Page          │
     │◀──────────────────────────────────────────────┤
     │                                                │
     │  3. Enter Campus Credentials                  │
     ├──────────────────────────────────────────────▶│
     │                                                │
     │  4. Return SAML/OAuth2 Token                  │
     │◀──────────────────────────────────────────────┤
     │                                                │
     ▼                                                ▼
┌─────────────┐                              ┌──────────────┐
│   Frontend  │                              │   Backend    │
└─────┬───────┘                              └──────┬───────┘
      │                                              │
      │  5. Send Token to Backend                   │
      ├─────────────────────────────────────────────▶│
      │                                              │
      │  6. Validate Token & Generate JWT           │
      │◀─────────────────────────────────────────────┤
      │                                              │
      │  7. Store JWT in LocalStorage               │
      │                                              │
      │  8. Subsequent Requests with JWT            │
      ├─────────────────────────────────────────────▶│
      │                                              │
```

---

## 🧪 Testing Strategy

### Unit Tests (Jest + RTL)
- ✅ Components rendering
- ✅ Services logic
- ✅ Utilities functions
- ✅ Target: 80% coverage

### Integration Tests
- ✅ API endpoints
- ✅ Database operations
- ✅ Authentication flow

### E2E Tests (Cypress)
- ✅ User journeys
- ✅ Critical paths
- ✅ Cross-browser testing

---

## 📦 Deployment

### Development
```bash
docker-compose up -d
```

### Production (Kubernetes)
```bash
kubectl apply -f k8s/
helm install univ-learning ./helm-chart
```

### CI/CD Pipeline
- Lint → Test → Build → Security Scan → Deploy

---

## 📈 Performance Targets

- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3s
- ✅ API Response Time: < 200ms (p95)
- ✅ Lighthouse Score: > 90

---

## 🔒 Security Checklist

- [x] HTTPS enforced
- [x] JWT with expiration
- [x] Password hashing (bcrypt)
- [x] Input validation
- [x] SQL injection prevention
- [x] XSS protection
- [x] CSRF protection
- [x] Rate limiting
- [x] Security headers
- [x] Dependency scanning

---

## 📝 Documentation

- ✅ API Documentation: Swagger UI
- ✅ UI Components: Storybook
- ✅ Architecture: This document
- ✅ User Guide: Coming soon
- ✅ Developer Guide: README.md

---

**Last Updated**: 2025-10-12
