# Getting Started Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Docker** and **Docker Compose** ([Download](https://www.docker.com/))
- **Git** ([Download](https://git-scm.com/))

Optional:
- **PostgreSQL** 16+ (if running without Docker)
- **Keycloak** (if running without Docker)

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/mutiakanza/skills-copilot-codespaces-vscode.git
cd skills-copilot-codespaces-vscode
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for both frontend and backend using npm workspaces.

### 3. Setup Environment Variables

#### Backend
```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and update if needed:
```env
DATABASE_URL="postgresql://univuser:univpass@localhost:5432/univlearning?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
KEYCLOAK_URL="http://localhost:8080"
PORT=3001
```

#### Frontend
```bash
cp frontend/.env.example frontend/.env
```

The default values should work for local development.

### 4. Start with Docker Compose

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port 5432
- Keycloak on port 8080
- MinIO on ports 9000 (API) and 9001 (Console)
- Backend on port 3001
- Frontend on port 3000

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Keycloak**: http://localhost:8080
- **MinIO Console**: http://localhost:9001

## Development Setup

### Option 1: With Docker (Recommended)

1. **Start all services**:
   ```bash
   docker-compose up -d
   ```

2. **View logs**:
   ```bash
   docker-compose logs -f
   ```

3. **Stop services**:
   ```bash
   docker-compose down
   ```

### Option 2: Without Docker

#### 1. Start PostgreSQL

Install PostgreSQL locally or use a cloud instance, then create the database:

```sql
CREATE DATABASE univlearning;
CREATE USER univuser WITH PASSWORD 'univpass';
GRANT ALL PRIVILEGES ON DATABASE univlearning TO univuser;
```

#### 2. Generate Prisma Client

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

#### 3. Start Backend

```bash
cd backend
npm run dev
```

Backend will run on http://localhost:3001

#### 4. Start Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:3000

## Database Setup

### Run Migrations

```bash
cd backend
npx prisma migrate dev --name init
```

### Seed Database (Optional)

Create a seed file `backend/prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@university.ac.id' },
    update: {},
    create: {
      email: 'admin@university.ac.id',
      name: 'Admin User',
      role: 'ADMIN',
      passwordHash: adminPassword,
    },
  });

  // Create lecturer
  const lecturerPassword = await bcrypt.hash('lecturer123', 10);
  const lecturer = await prisma.user.upsert({
    where: { email: 'lecturer@university.ac.id' },
    update: {},
    create: {
      email: 'lecturer@university.ac.id',
      name: 'Dosen Example',
      role: 'LECTURER',
      passwordHash: lecturerPassword,
    },
  });

  // Create student
  const studentPassword = await bcrypt.hash('student123', 10);
  const student = await prisma.user.upsert({
    where: { email: 'student@university.ac.id' },
    update: {},
    create: {
      email: 'student@university.ac.id',
      name: 'Mahasiswa Example',
      role: 'STUDENT',
      passwordHash: studentPassword,
    },
  });

  console.log({ admin, lecturer, student });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run the seed:

```bash
npx prisma db seed
```

## Keycloak Setup (SSO)

### 1. Access Keycloak Admin Console

- URL: http://localhost:8080
- Username: `admin`
- Password: `admin`

### 2. Create Realm

1. Click "Add realm"
2. Name: `university`
3. Click "Create"

### 3. Create Client

1. Go to Clients → Create
2. Client ID: `univ-learning-app`
3. Client Protocol: `openid-connect`
4. Root URL: `http://localhost:3000`
5. Click "Save"

### 4. Configure Client

1. Access Type: `confidential`
2. Valid Redirect URIs: `http://localhost:3000/*`
3. Click "Save"
4. Go to "Credentials" tab
5. Copy the "Secret" to your backend `.env` file

### 5. Create Test User

1. Go to Users → Add user
2. Username: `testuser`
3. Email: `testuser@university.ac.id`
4. Click "Save"
5. Go to "Credentials" tab
6. Set password: `test123`
7. Temporary: `OFF`
8. Click "Reset Password"

## Testing the Application

### Backend API Tests

```bash
cd backend
npm run test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

### E2E Tests (Cypress)

```bash
cd frontend
npm run test:e2e
```

## API Testing with cURL

### Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@university.ac.id","password":"student123"}'
```

### Get Courses
```bash
TOKEN="your-jwt-token-here"
curl http://localhost:3001/api/courses \
  -H "Authorization: Bearer $TOKEN"
```

### Create Course
```bash
TOKEN="your-jwt-token-here"
curl -X POST http://localhost:3001/api/courses \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Introduction to Programming",
    "description": "Learn basic programming concepts"
  }'
```

## Building for Production

### Backend

```bash
cd backend
npm run build
```

Built files will be in `backend/dist/`

### Frontend

```bash
cd frontend
npm run build
```

Built files will be in `frontend/.next/`

### Docker Images

```bash
# Build backend
docker build -f docker/Dockerfile.backend -t univ-backend:latest ./backend

# Build frontend
docker build -f docker/Dockerfile.frontend -t univ-frontend:latest ./frontend
```

## Deployment

### Kubernetes

```bash
# Apply all manifests
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/backend
kubectl logs -f deployment/frontend
```

### Environment Variables in Production

Create Kubernetes secrets:

```bash
# Backend secrets
kubectl create secret generic backend-secrets \
  --from-literal=database-url="postgresql://user:pass@postgres:5432/db" \
  --from-literal=jwt-secret="your-production-secret"

# PostgreSQL secrets
kubectl create secret generic postgres-secrets \
  --from-literal=username="univuser" \
  --from-literal=password="secure-password"
```

## Common Issues

### Port Already in Use

If ports 3000 or 3001 are in use:

```bash
# Find process using port
lsof -i :3000
lsof -i :3001

# Kill process
kill -9 <PID>
```

Or change ports in `.env` files.

### Database Connection Error

1. Check PostgreSQL is running:
   ```bash
   docker-compose ps postgres
   ```

2. Verify DATABASE_URL in `backend/.env`

3. Test connection:
   ```bash
   cd backend
   npx prisma studio
   ```

### Prisma Client Not Generated

```bash
cd backend
npx prisma generate
```

### Docker Build Fails

Clear Docker cache:

```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

### Module Not Found Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
npm install
```

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in `backend/` or `frontend/`

### 3. Test Changes

```bash
# Backend
cd backend
npm run lint
npm run test
npm run build

# Frontend
cd frontend
npm run lint
npm run test
npm run build
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

### 5. Create Pull Request

Go to GitHub and create a pull request.

## Useful Commands

### Backend

```bash
cd backend

# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start:prod         # Start production server

# Database
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Run migrations
npx prisma db seed         # Seed database

# Testing
npm run test               # Run tests
npm run test:watch         # Watch mode
npm run test:cov           # Coverage report

# Linting
npm run lint               # Lint code
npm run format             # Format code
```

### Frontend

```bash
cd frontend

# Development
npm run dev                # Start dev server
npm run build             # Build for production
npm run start             # Start production server

# Testing
npm run test              # Run tests
npm run test:e2e          # E2E tests

# Linting
npm run lint              # Lint code
```

### Docker

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f [service-name]

# Restart service
docker-compose restart [service-name]

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild
docker-compose up -d --build
```

## Next Steps

1. ✅ Complete the Getting Started guide
2. 📖 Read the [Requirements Documentation](requirements.md)
3. 🏗️ Review the [Implementation Summary](IMPLEMENTATION.md)
4. 💻 Start developing features
5. 🧪 Write tests for your features
6. 📝 Update documentation

## Support

For issues or questions:
- 📧 Email: support@university.ac.id
- 🐛 GitHub Issues: [Create an issue](https://github.com/mutiakanza/skills-copilot-codespaces-vscode/issues)
- 📚 Documentation: [View docs](../README.md)

---

**Happy Coding! 🚀**
