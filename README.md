# NimbusWolf - Financial Intelligence Platform

A comprehensive financial intelligence platform that aggregates user accounts from 10,000+ financial institutions, provides real-time transaction monitoring, AI-powered fraud detection, investment portfolio tracking, and professional audit services.

## 🚀 Project Overview

NimbusWolf is an all-in-one finance app featuring:
- **Real-time account aggregation** from 10,000+ financial institutions via Plaid
- **Automatic transaction categorization** and trend analysis
- **AI-powered fraud detection** and security alerts
- **Investment portfolio tracking** across all brokerages
- **Insurance policy management** and coverage overview
- **Cash flow forecasting** and budget management
- **Paid yearly audit service** with automatic data compilation
- **Personalized financial recommendations**

## 📁 Project Structure

```
NimbusWolf/
├── frontend/                 # React + TypeScript + Vite application
│   ├── src/
│   │   ├── components/       # React components (organized by domain)
│   │   ├── pages/            # Top-level page components
│   │   ├── services/         # API clients and business logic
│   │   ├── hooks/            # Custom React hooks
│   │   ├── store/            # Redux store and slices
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript type definitions
│   │   └── App.tsx
│   └── package.json
├── backend/                  # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   ├── services/         # Business logic
│   │   ├── middleware/       # Express middleware
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript types
│   │   ├── jobs/             # Background jobs (Bull)
│   │   └── config/           # Configuration
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── package.json
├── shared/                   # Shared types/utils between frontend and backend
├── docs/                     # Documentation
└── files/                    # Project specification files
```

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit + React Query
- **UI Library:** Material-UI (MUI) v5
- **Styling:** Emotion (CSS-in-JS)
- **Routing:** React Router v6
- **Forms:** React Hook Form + Yup
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Real-time:** Socket.io client

### Backend
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Caching:** Redis
- **Authentication:** JWT with refresh tokens
- **File Storage:** AWS S3
- **Queue:** Bull (for background jobs)
- **Email:** SendGrid or AWS SES
- **Real-time:** Socket.io

### Key Integrations
- **Plaid** - Account aggregation
- **Stripe** - Payment processing
- **IEX Cloud** - Stock market data
- **SendGrid** - Email notifications
- **AWS S3** - File storage

## 🚀 Getting Started

### Prerequisites
- Node.js 22.12+ or 20.19+ or 24.0+
- PostgreSQL 14+
- Redis 6+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd NimbusWolf
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**

Backend (.env):
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

Frontend (.env):
```bash
cd frontend
cp .env.example .env
# Edit .env with your configuration
```

5. **Set up the database**
```bash
cd backend
# Update DATABASE_URL in .env
npx prisma migrate dev --name init
npx prisma generate
```

### Running the Application

**Backend (from backend directory):**
```bash
npm run dev
```

**Frontend (from frontend directory):**
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:5000`

## 📚 Development Phases

### Phase 1: Foundation & Authentication ✅ (In Progress)
- [x] Project structure initialization
- [x] Backend dependencies installation
- [x] Frontend dependencies installation
- [x] Database schema setup
- [x] Environment configuration
- [ ] Backend authentication system
- [ ] Frontend authentication components
- [ ] End-to-end testing

### Phase 2: Account Aggregation (Upcoming)
- Plaid integration
- Account connection flow
- Account sync service
- Connected accounts display

### Phase 3+: See `/files/Claude.md` for full roadmap

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests (with Cypress)
cd frontend
npm run test:e2e
```

## 📖 Documentation

- [Full Specification](/files/Asset_Management_App_v2.0_Specification.md)
- [Development Guide](/files/Claude.md)
- [Development Roadmap](/files/39_Week_Development_Roadmap.md)

## 🔐 Security

- Bank-level encryption (AES-256)
- JWT authentication with refresh tokens
- Secure credential storage
- GDPR & CCPA compliant
- SOC 2 Type II compliance ready
- Regular security audits

## 📝 License

[Add your license here]

## 👥 Contributing

[Add contributing guidelines]

## 📧 Contact

[Add contact information]

---

**Built with ❤️ using React, TypeScript, Node.js, and PostgreSQL**
