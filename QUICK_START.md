# 🚀 NimbusWolf Quick Start - Everything is Running!

## ✅ Current Status

### **All Services are LIVE!**

| Service | Status | URL | Container |
|---------|--------|-----|-----------|
| **Frontend** | ✅ RUNNING | http://localhost:5173 | nimbuswolf-frontend (Docker) |
| **Backend API** | ✅ RUNNING | http://localhost:5000 | Local (npm) |
| **PostgreSQL** | ✅ RUNNING | localhost:5433 | nimbuswolf-postgres (Docker) |
| **Redis** | ✅ RUNNING | localhost:6380 | nimbuswolf-redis (Docker) |
| **PgAdmin** | ⚠️ Restarting | http://localhost:5051 | nimbuswolf-pgadmin (Docker) |

---

## 🎯 Test the Authentication System NOW!

### **1. Open the App**
```
http://localhost:5173
```

You should be redirected to the login page.

### **2. Register a New Account**
1. Click "Don't have an account? Sign Up"
2. Fill in the form:
   - **Email:** your@email.com
   - **Password:** Test123!@# (needs uppercase, lowercase, number, special char)
   - **First Name:** Your name
   - **Last Name:** Your last name
3. Click "Sign Up"
4. You'll be automatically logged in and redirected to the dashboard!

### **3. Check the Dashboard**
You should see:
- Welcome message with your name
- Your email and profile info
- Account statistics (currently 0)
- Quick action buttons
- Logout button

### **4. Test Logout & Login**
1. Click "Logout" button (top right)
2. You'll be redirected to login page
3. Try to access `/dashboard` directly - you'll be redirected to login (protected route works!)
4. Login with your credentials
5. You're back in the dashboard!

---

## 🐳 Docker Services

### **Frontend Container**
```bash
# View logs
docker compose logs frontend -f

# Restart frontend
docker compose restart frontend

# Rebuild frontend (if you change code)
docker compose build frontend
docker compose up -d frontend
```

### **All Containers**
```bash
# View all running containers
docker compose ps

# View all logs
docker compose logs -f

# Stop all containers
docker compose down

# Start all containers
docker compose up -d
```

---

## 🔧 Backend API

The backend is running locally (not in Docker):

```bash
# Currently running in background

# To stop (if needed)
# Find the process: ps aux | grep "npm run dev"
# Kill it: kill <PID>

# To restart
cd backend
npm run dev
```

---

## 🧪 Test API Endpoints Directly

### **Health Check**
```bash
curl http://localhost:5000/api/v1/health
```

### **Register User (via API)**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### **Login User (via API)**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#"
  }'
```

### **Get Current User (Protected)**
```bash
# Replace <TOKEN> with the accessToken from login response
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer <TOKEN>"
```

---

## 📊 Access the Database

### **Option 1: Prisma Studio (Recommended)**
```bash
cd backend
npx prisma studio
```
Opens at: http://localhost:5555

### **Option 2: psql Command Line**
```bash
docker exec nimbuswolf-postgres psql -U nimbuswolf -d nimbuswolf_dev

# Then run SQL:
# \dt                    -- List tables
# SELECT * FROM users;   -- View users
# \q                     -- Quit
```

### **Option 3: PgAdmin (if running)**
URL: http://localhost:5051
- Email: admin@nimbuswolf.local
- Password: admin

Add server:
- Name: NimbusWolf
- Host: nimbuswolf-postgres (or localhost)
- Port: 5432 (internal) or 5433 (from host)
- Username: nimbuswolf
- Password: nimbuswolf_dev_password

---

## 🛠️ Development Workflow

### **Making Frontend Changes**
The frontend container has hot reload enabled:
1. Edit files in `frontend/src/`
2. Save the file
3. Browser will automatically refresh (might take 2-3 seconds)

### **Making Backend Changes**
The backend has nodemon/ts-node-dev watching:
1. Edit files in `backend/src/`
2. Save the file
3. Server automatically restarts

### **Database Schema Changes**
```bash
cd backend

# 1. Edit prisma/schema.prisma
# 2. Create migration
npx prisma migrate dev --name your_migration_name

# 3. Generate client (if needed)
npx prisma generate
```

---

## 🔍 Debugging

### **Frontend Not Loading?**
```bash
# Check if container is running
docker compose ps

# View frontend logs
docker compose logs frontend

# Restart frontend
docker compose restart frontend
```

### **Backend Errors?**
```bash
# Check terminal where backend is running
# Or check the background process output

# Restart backend
cd backend
npm run dev
```

### **Database Connection Issues?**
```bash
# Check PostgreSQL is running
docker compose ps

# Check PostgreSQL logs
docker compose logs postgres

# Test connection
docker exec nimbuswolf-postgres pg_isready -U nimbuswolf
```

### **CORS Errors?**
Check that:
- Backend is running on port 5000
- Frontend is accessing http://localhost:5000 (not 127.0.0.1)
- Backend .env has `FRONTEND_URL="http://localhost:5173"`

---

## 📝 Features to Test

### ✅ Authentication
- [x] Register new user
- [x] Login with credentials
- [x] Logout
- [x] Protected routes (try accessing /dashboard when logged out)
- [x] Automatic token refresh (access token expires in 15 minutes)

### ✅ User Interface
- [x] Login form with validation
- [x] Register form with password requirements
- [x] Dashboard with user info
- [x] Material-UI components
- [x] Responsive design

### ✅ Security
- [x] Password hashing (bcrypt)
- [x] JWT tokens (access + refresh)
- [x] httpOnly cookies for refresh token
- [x] Input sanitization
- [x] Protected API endpoints

---

## 🎉 What's Next?

Now that authentication is working, you can:

1. **Test the full authentication flow** (register, login, logout)
2. **Phase 2: Plaid Integration** - Connect bank accounts
3. **Phase 3: Transaction Processing** - Sync and categorize transactions
4. **Phase 4: Dashboard Enhancement** - Build out the full dashboard

---

## 💡 Pro Tips

### **View All Running Processes**
```bash
# Docker containers
docker compose ps

# Backend process (if you need to find it)
ps aux | grep "npm run dev"
```

### **Stop Everything**
```bash
# Stop Docker containers
docker compose down

# Backend will need to be stopped manually if running
# (Use Ctrl+C in the terminal where it's running)
```

### **Fresh Start**
```bash
# Stop everything
docker compose down

# Start fresh
docker compose up -d

# Start backend
cd backend
npm run dev
```

### **View Real-Time Logs**
```bash
# All containers
docker compose logs -f

# Just frontend
docker compose logs frontend -f

# Just database
docker compose logs postgres -f
```

---

## 🐛 Common Issues

### **Port Already in Use**
If you get port conflicts:
```bash
# Check what's using port 5173
lsof -i :5173

# Check what's using port 5000
lsof -i :5000

# Kill the process if needed
kill -9 <PID>
```

### **Cannot Connect to Database**
```bash
# Restart PostgreSQL
docker compose restart postgres

# Or restart everything
docker compose down
docker compose up -d
```

### **Frontend Build Errors**
```bash
# Rebuild the frontend image
docker compose build frontend --no-cache
docker compose up -d frontend
```

---

## 📞 Need Help?

Check the logs:
```bash
# Frontend logs
docker compose logs frontend --tail=50

# Backend logs (check the terminal where it's running)

# Database logs
docker compose logs postgres --tail=50
```

---

**🎊 Everything is set up and running! Go test your authentication system at http://localhost:5173**
