# 🎓 Sistem Pembelajaran Universitas (University Learning Platform)

Platform pembelajaran dan penilaian berbasis web untuk mahasiswa dan dosen di universitas Indonesia. Aplikasi ini mendukung SSO, manajemen kursus, quiz, tugas, dan laporan nilai dengan antarmuka responsif mobile-first.

## 📋 Fitur Utama

### Untuk Mahasiswa
- ✅ Login dengan SSO (Single Sign-On)
- 📚 Dashboard dengan daftar mata kuliah dan progres
- 📖 Akses materi (video, PDF, teks) dengan dukungan offline
- ✏️ Kerjakan quiz dengan timer dan feedback otomatis
- 📤 Upload tugas (max 20MB) dan cek status penilaian
- 📊 Lihat laporan nilai dan progres pembelajaran

### Untuk Dosen
- ➕ Buat dan kelola kursus
- 📝 Tambah materi pembelajaran (video, PDF, teks)
- 🧪 Buat quiz dengan berbagai tipe soal (MCQ, isian, drag-drop)
- ✍️ Nilai tugas secara manual dengan rubrik
- 📈 Lihat laporan kelas dan analitik

### Untuk Admin
- 👥 Kelola pengguna (CRUD)
- 🔑 Tetapkan role (Student, Lecturer, Admin)
- ⚙️ Konfigurasi sistem

## 🏗️ Arsitektur

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend  │────▶│   Backend    │────▶│  PostgreSQL  │
│  (Next.js)  │     │  (NestJS)    │     │   Database   │
└─────────────┘     └──────────────┘     └──────────────┘
       │                    │                     
       │                    ▼                     
       │            ┌──────────────┐              
       │            │   Keycloak   │              
       │            │     SSO      │              
       │            └──────────────┘              
       │                                          
       ▼                                          
┌──────────────┐                                  
│  MinIO/S3    │                                  
│   Storage    │                                  
└──────────────┘                                  
```

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14+ (TypeScript)
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand + TanStack React Query
- **Styling**: Tailwind CSS + Emotion
- **i18n**: next-intl (Indonesian & English)

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + Keycloak SSO
- **Storage**: MinIO / S3 + CloudFront

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Orchestration**: Kubernetes + Helm
- **Monitoring**: Prometheus + Grafana

## 📦 Instalasi

### Prerequisites
- Node.js 18+
- npm 9+
- Docker & Docker Compose
- PostgreSQL 16+

### Clone Repository
```bash
git clone https://github.com/mutiakanza/skills-copilot-codespaces-vscode.git
cd skills-copilot-codespaces-vscode
```

### Install Dependencies
```bash
npm install
```

### Setup Environment Variables

#### Backend (.env)
```bash
cp backend/.env.example backend/.env
# Edit backend/.env dengan konfigurasi Anda
```

#### Frontend (.env)
```bash
cp frontend/.env.example frontend/.env
# Edit frontend/.env dengan konfigurasi Anda
```

### Database Migration
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

## 🐳 Running with Docker

### Start All Services
```bash
docker-compose up -d
```

Services akan berjalan di:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Keycloak: http://localhost:8080
- MinIO Console: http://localhost:9001
- PostgreSQL: localhost:5432

### Stop All Services
```bash
docker-compose down
```

## 💻 Development

### Run Frontend
```bash
npm run dev:frontend
# atau
cd frontend && npm run dev
```

### Run Backend
```bash
npm run dev:backend
# atau
cd backend && npm run dev
```

### Run Both
```bash
npm run dev
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
cd frontend && npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🔒 Security

- ✅ Password hashing dengan bcrypt
- ✅ JWT token dengan expiration (30 menit)
- ✅ CORS protection
- ✅ Input validation dengan class-validator
- ✅ SQL injection prevention (Prisma ORM)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ HTTPS enforced in production

## 🌍 Internationalization

Aplikasi mendukung:
- 🇮🇩 Bahasa Indonesia (default)
- 🇬🇧 English

Format tanggal: DD/MM/YYYY

## 📱 Responsive Design

Aplikasi dioptimalkan untuk:
- 📱 Mobile (320px - 767px)
- 📱 Tablet (768px - 1023px)
- 💻 Desktop (1024px - 1920px)

## 🔐 Authentication Flow

1. User mengakses aplikasi
2. Redirect ke Keycloak SSO
3. User login dengan kredensial kampus
4. Keycloak mengirim SAML/OAuth2 token
5. Backend validasi token dan generate JWT
6. Frontend menyimpan JWT di localStorage
7. Setiap request menggunakan JWT di header Authorization

## 📊 API Documentation

Swagger UI tersedia di: http://localhost:3001/api/docs

## 🛠️ CI/CD Pipeline

GitHub Actions workflow akan:
1. ✅ Lint code (ESLint, Prettier)
2. 🧪 Run tests (Jest, Cypress)
3. 🏗️ Build aplikasi
4. 🔍 Security scan (Trivy)
5. 🐳 Build & push Docker images
6. 🚀 Deploy ke Kubernetes

## 📝 User Stories

Lihat [Project Requirements](docs/requirements.md) untuk detail lengkap user stories dan acceptance criteria.

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Developer**: Mutia Kanza
- **Project**: Skills Copilot Codespaces VSCode

## 📞 Support

Untuk pertanyaan atau masalah, silakan buat [Issue](https://github.com/mutiakanza/skills-copilot-codespaces-vscode/issues) di GitHub.

---

**Built with ❤️ for Indonesian Universities**
