# Financial Intelligence Platform - Claude Code Development Prompt
## Agentic Development Team Setup

---

## Project Overview

You are the **Lead Development Coordinator** for building a comprehensive financial intelligence platform (v2.0). This is an all-in-one finance app that aggregates user accounts from 10,000+ financial institutions, provides real-time transaction monitoring, AI-powered fraud detection, investment portfolio tracking, and professional audit services.

**Full Specification:** See `Asset_Management_App_v2.0_Specification.md` for complete requirements.

**Your Mission:** Orchestrate a team of specialized AI development agents to build this platform in a modular, scalable, and maintainable way.

---

## Development Team Structure (Agentic Approach)

You will work as multiple specialized agents, each responsible for specific domains. When working on a particular feature, adopt the persona and focus of that agent.

### **Agent Roles:**

1. **🏗️ Architecture Agent** - Overall system design, tech stack decisions, module integration
2. **🔐 Auth Agent** - Authentication, authorization, session management, security
3. **💳 Accounts Agent** - Plaid integration, account aggregation, sync mechanisms
4. **💰 Transactions Agent** - Transaction processing, categorization, search/filter
5. **📈 Investments Agent** - Portfolio tracking, holdings, performance analysis
6. **🛡️ Fraud Agent** - Anomaly detection, alert systems, security monitoring
7. **💵 Budget Agent** - Budget creation, tracking, cash flow analysis
8. **📊 Dashboard Agent** - Main dashboard, widgets, data visualization
9. **🔍 Audit Agent** - Audit workflow, data compilation, tax calculations, payment
10. **📄 Documents Agent** - File upload, OCR, document processing
11. **🎨 UI/UX Agent** - Component library, styling, responsive design, accessibility
12. **🧪 Testing Agent** - Unit tests, integration tests, E2E tests
13. **🚀 DevOps Agent** - Deployment, CI/CD, monitoring, infrastructure

---

## Technology Stack

### **Frontend:**
```
Framework: React 18+ with TypeScript
State Management: Redux Toolkit (global state) + React Query (server state)
UI Library: Material-UI (MUI) v5
Styling: Emotion (CSS-in-JS with MUI)
Routing: React Router v6
Forms: React Hook Form + Yup validation
HTTP Client: Axios with interceptors
Real-time: Socket.io client
Charts: Recharts
Date Handling: date-fns
Testing: Jest + React Testing Library + Cypress
Build Tool: Vite
```

### **Backend (API):**
```
Framework: Node.js + Express.js (or NestJS for more structure)
Language: TypeScript
Database: PostgreSQL with Prisma ORM
Caching: Redis
Authentication: JWT with refresh tokens
File Storage: AWS S3 (or Google Cloud Storage)
Queue: Bull (for background jobs)
Email: SendGrid or AWS SES
Real-time: Socket.io
```

### **Key Integrations:**
- **Plaid** (account aggregation) - https://plaid.com/docs
- **Stripe** (payment processing) - https://stripe.com/docs
- **IEX Cloud** (stock market data) - https://iexcloud.io/docs
- **SendGrid** (email) - https://docs.sendgrid.com
- **AWS S3** (file storage) - https://aws.amazon.com/s3

---

## Project Structure

```
financial-platform/
├── frontend/                  # React application
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components (organized by domain)
│   │   │   ├── auth/
│   │   │   ├── accounts/
│   │   │   ├── transactions/
│   │   │   ├── investments/
│   │   │   ├── fraud/
│   │   │   ├── budget/
│   │   │   ├── dashboard/
│   │   │   ├── audit/
│   │   │   ├── documents/
│   │   │   └── shared/
│   │   ├── pages/            # Top-level page components
│   │   ├── services/         # API clients and business logic
│   │   │   ├── api/
│   │   │   ├── plaid/
│   │   │   ├── calculations/
│   │   │   └── fraud/
│   │   ├── hooks/            # Custom React hooks
│   │   ├── store/            # Redux store and slices
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript type definitions
│   │   ├── constants/        # App constants
│   │   ├── styles/           # Global styles
│   │   └── App.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
├── backend/                   # Node.js API
│   ├── src/
│   │   ├── controllers/      # Route controllers
│   │   │   ├── auth.controller.ts
│   │   │   ├── accounts.controller.ts
│   │   │   ├── transactions.controller.ts
│   │   │   ├── investments.controller.ts
│   │   │   ├── fraud.controller.ts
│   │   │   ├── budget.controller.ts
│   │   │   ├── audit.controller.ts
│   │   │   └── documents.controller.ts
│   │   ├── services/         # Business logic
│   │   │   ├── auth.service.ts
│   │   │   ├── plaid.service.ts
│   │   │   ├── transaction.service.ts
│   │   │   ├── fraud-detection.service.ts
│   │   │   ├── tax-calculation.service.ts
│   │   │   ├── email.service.ts
│   │   │   └── payment.service.ts
│   │   ├── models/           # Database models (Prisma)
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.middleware.ts
│   │   │   ├── validation.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── routes/           # API routes
│   │   ├── utils/            # Utility functions
│   │   ├── types/            # TypeScript types
│   │   ├── jobs/             # Background jobs (Bull)
│   │   │   ├── sync-accounts.job.ts
│   │   │   ├── fraud-detection.job.ts
│   │   │   └── audit-transmission.job.ts
│   │   ├── config/           # Configuration
│   │   │   ├── database.ts
│   │   │   ├── redis.ts
│   │   │   └── plaid.ts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── shared/                    # Shared types/utils between frontend and backend
│   ├── types/
│   └── constants/
├── docs/                      # Documentation
│   ├── api/
│   ├── architecture/
│   └── setup/
├── scripts/                   # Utility scripts
├── .github/
│   └── workflows/            # CI/CD workflows
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Phase 1 Instructions: Foundation Setup

**Goal:** Set up the project foundation with authentication and basic infrastructure.

### **Step 1: Initialize Project Structure**

**Task for Architecture Agent:**

```bash
# Create root project structure
mkdir financial-platform
cd financial-platform

# Initialize frontend (React + TypeScript + Vite)
npm create vite@latest frontend -- --template react-ts

# Initialize backend (Node.js + TypeScript + Express)
mkdir backend
cd backend
npm init -y
npm install express cors dotenv bcrypt jsonwebtoken
npm install -D typescript @types/node @types/express @types/cors @types/bcrypt @types/jsonwebtoken ts-node-dev nodemon
npx tsc --init

# Install Prisma for database
npm install prisma @prisma/client
npx prisma init

# Install additional backend dependencies
npm install axios redis bull socket.io
npm install @sendgrid/mail stripe plaid

# Go back to frontend
cd ../frontend

# Install frontend dependencies
npm install @mui/material @emotion/react @emotion/styled
npm install react-router-dom
npm install @reduxjs/toolkit react-redux
npm install @tanstack/react-query
npm install react-hook-form yup @hookform/resolvers
npm install axios
npm install recharts
npm install date-fns
npm install socket.io-client

# Install dev dependencies
npm install -D @types/react-router-dom
```

### **Step 2: Database Schema Setup**

**Task for Architecture Agent:**

Create `backend/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  passwordHash  String    @map("password_hash")
  firstName     String?   @map("first_name")
  lastName      String?   @map("last_name")
  phone         String?
  isVerified    Boolean   @default(false) @map("is_verified")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  lastLogin     DateTime? @map("last_login")

  accounts      ConnectedAccount[]
  transactions  Transaction[]
  budgets       Budget[]
  fraudAlerts   FraudAlert[]
  audits        Audit[]
  documents     Document[]

  @@map("users")
}

model ConnectedAccount {
  id                String    @id @default(uuid())
  userId            String    @map("user_id")
  plaidItemId       String?   @unique @map("plaid_item_id")
  plaidAccessToken  String?   @map("plaid_access_token") // Encrypted
  institutionId     String    @map("institution_id")
  institutionName   String    @map("institution_name")
  accountType       String    @map("account_type") // checking, savings, credit, investment, loan
  accountSubtype    String?   @map("account_subtype")
  accountMask       String?   @map("account_mask") // Last 4 digits
  accountName       String?   @map("account_name")
  currentBalance    Decimal?  @map("current_balance") @db.Decimal(15, 2)
  availableBalance  Decimal?  @map("available_balance") @db.Decimal(15, 2)
  isActive          Boolean   @default(true) @map("is_active")
  lastSyncAt        DateTime? @map("last_sync_at")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")

  user          User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  transactions  Transaction[]

  @@map("connected_accounts")
}

model Transaction {
  id                    String    @id @default(uuid())
  userId                String    @map("user_id")
  accountId             String    @map("account_id")
  plaidTransactionId    String?   @unique @map("plaid_transaction_id")
  amount                Decimal   @db.Decimal(15, 2)
  date                  DateTime
  merchantName          String?   @map("merchant_name")
  categoryPrimary       String?   @map("category_primary")
  categoryDetailed      String?   @map("category_detailed")
  isPending             Boolean   @default(false) @map("is_pending")
  notes                 String?
  receiptId             String?   @map("receipt_id")
  createdAt             DateTime  @default(now()) @map("created_at")
  updatedAt             DateTime  @updatedAt @map("updated_at")

  user    User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  account ConnectedAccount  @relation(fields: [accountId], references: [id], onDelete: Cascade)

  @@index([userId, date])
  @@map("transactions")
}

model Budget {
  id              String   @id @default(uuid())
  userId          String   @map("user_id")
  monthYear       String   @map("month_year") // Format: "2024-01"
  category        String
  budgetedAmount  Decimal  @map("budgeted_amount") @db.Decimal(15, 2)
  spentAmount     Decimal  @default(0) @map("spent_amount") @db.Decimal(15, 2)
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, monthYear, category])
  @@map("budgets")
}

model FraudAlert {
  id            String    @id @default(uuid())
  userId        String    @map("user_id")
  transactionId String?   @map("transaction_id")
  alertType     String    @map("alert_type") // amount_anomaly, location_anomaly, velocity, etc.
  severity      String    // high, medium, low
  status        String    @default("open") // open, confirmed, false_positive
  details       Json?
  createdAt     DateTime  @default(now()) @map("created_at")
  resolvedAt    DateTime? @map("resolved_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("fraud_alerts")
}

model Audit {
  id            String    @id @default(uuid())
  userId        String    @map("user_id")
  taxYear       Int       @map("tax_year")
  auditType     String    @map("audit_type") // basic, comprehensive, premium
  status        String    @default("initiated") // initiated, paid, processing, completed
  paymentAmount Decimal?  @map("payment_amount") @db.Decimal(10, 2)
  paymentId     String?   @map("payment_id")
  submittedAt   DateTime  @default(now()) @map("submitted_at")
  completedAt   DateTime? @map("completed_at")
  reportUrl     String?   @map("report_url")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("audits")
}

model Document {
  id            String   @id @default(uuid())
  userId        String   @map("user_id")
  fileName      String   @map("file_name")
  fileType      String   @map("file_type")
  fileSize      Int      @map("file_size")
  storageUrl    String   @map("storage_url")
  documentType  String   @map("document_type") // W2, 1099, receipt, statement, etc.
  extractedText String?  @map("extracted_text") @db.Text
  uploadedAt    DateTime @default(now()) @map("uploaded_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("documents")
}
```

Run migrations:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### **Step 3: Backend Authentication Setup**

**Task for Auth Agent:**

Create complete authentication system with services, controllers, middleware, and routes. (Full code provided in separate file for brevity)

Key files to create:
- `backend/src/services/auth.service.ts` - JWT generation, password hashing, user management
- `backend/src/controllers/auth.controller.ts` - Register, login, refresh token endpoints
- `backend/src/middleware/auth.middleware.ts` - JWT verification middleware
- `backend/src/routes/auth.routes.ts` - Auth route definitions
- `backend/src/server.ts` - Main Express server setup

### **Step 4: Frontend Authentication Setup**

**Task for Auth Agent:**

Create React authentication flow with:
- `frontend/src/services/api/authApi.ts` - API client
- `frontend/src/components/auth/LoginForm.tsx` - Login UI
- `frontend/src/components/auth/RegisterForm.tsx` - Registration UI
- `frontend/src/App.tsx` - Routing and protected routes
- `frontend/src/utils/axiosInterceptor.ts` - Token refresh logic

### **Step 5: Environment Configuration**

Create `backend/.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/financial_platform"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
PORT=5000

# Plaid (get from https://dashboard.plaid.com)
PLAID_CLIENT_ID=""
PLAID_SECRET=""
PLAID_ENV="sandbox"

# Stripe (get from https://dashboard.stripe.com)
STRIPE_SECRET_KEY=""

# SendGrid (get from https://app.sendgrid.com)
SENDGRID_API_KEY=""

# AWS S3
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_S3_BUCKET=""
AWS_REGION="us-east-1"

# Redis
REDIS_URL="redis://localhost:6379"
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## Phase 2-17 Overview (Post Phase 1)

### **Phase 2: Plaid Integration (Weeks 3-5)**
**Accounts Agent Lead**
- Implement Plaid Link component
- Create account connection flow
- Build account sync service
- Display connected accounts

### **Phase 3: Transaction Processing (Weeks 6-8)**
**Transactions Agent Lead**
- Sync transactions from Plaid
- Build categorization engine
- Create transaction feed UI
- Implement search/filter

### **Phase 4: Dashboard Foundation (Weeks 9-10)**
**Dashboard Agent + UI/UX Agent**
- Design dashboard layout
- Create account summary widgets
- Build net worth calculator
- Add recent transactions widget

### **Phase 5: Investment Tracking (Weeks 11-12)**
**Investments Agent Lead**
- Integrate Plaid Investments API
- Build portfolio dashboard
- Create holdings display
- Add performance charts

### **Phase 6: Fraud Detection (Weeks 13-14)**
**Fraud Agent Lead**
- Implement anomaly detection algorithms
- Build alert generation system
- Create fraud dashboard
- Add user action handling

### **Phase 7: Budget Management (Weeks 15-16)**
**Budget Agent Lead**
- Build budget creation UI
- Implement spending tracking
- Create cash flow analysis
- Add budget alerts

### **Phase 8: Insurance Integration (Weeks 17-18)**
**Accounts Agent + Dashboard Agent**
- Extract insurance data
- Build policy dashboard
- Create coverage analysis
- Add premium tracking

### **Phase 9-10: Audit System (Weeks 19-24)**
**Audit Agent Lead**
- Build data compilation service
- Create tax calculation engine
- Implement payment flow (Stripe)
- Build data transmission system

### **Phase 11: Document Upload (Weeks 25-26)**
**Documents Agent Lead**
- Build file upload UI
- Integrate OCR service
- Create document processing
- Build manual data entry forms

### **Phase 12: Reports & Analytics (Weeks 27-28)**
**Dashboard Agent + Reports Agent**
- Build report generation engine
- Create PDF export
- Add email delivery
- Build custom report builder

### **Phase 13: Notifications (Weeks 29-30)**
**DevOps Agent + Backend Agent**
- Set up push notification service
- Build notification center UI
- Add email notifications
- Create notification preferences

### **Phase 14: Security & Compliance (Weeks 31-32)**
**Security Agent + DevOps Agent**
- Conduct security audit
- Implement encryption enhancements
- Add access logging
- Build compliance documentation

### **Phase 15: Testing (Weeks 33-35)**
**Testing Agent Lead**
- Write comprehensive unit tests
- Create integration tests
- Build E2E test suite (Cypress)
- Performance testing

### **Phase 16: Beta Launch (Weeks 36-38)**
**All Agents**
- Beta user onboarding
- Feedback collection
- Bug fixes
- Performance optimization

### **Phase 17: Production Launch (Week 39)**
**DevOps Agent + All Agents**
- Production deployment
- Monitoring setup
- Documentation finalization
- Launch!

---

## Agent Workflow Example

### **Example: Building Account Connection Feature**

**Step 1 - Architecture Agent:**
```
Design: Account connection uses Plaid Link SDK
- Frontend: React component wraps Plaid Link
- Backend: Receives public_token, exchanges for access_token
- Database: Store encrypted access_token in connected_accounts table
- Security: Never store user credentials, only Plaid tokens
```

**Step 2 - Accounts Agent (Backend):**
```typescript
// Create PlaidService
// Implement token exchange
// Store account data in database
// Create API endpoints
```

**Step 3 - Accounts Agent (Frontend):**
```typescript
// Integrate Plaid Link component
// Build connection UI
// Handle success/error flows
// Display connected accounts
```

**Step 4 - UI/UX Agent:**
```typescript
// Style components
// Add loading states
// Improve error messages
// Ensure responsive design
```

**Step 5 - Testing Agent:**
```typescript
// Write unit tests for PlaidService
// Test API endpoints
// Create E2E test for connection flow
```

---

## Code Standards & Best Practices

### **TypeScript:**
- Use strict mode
- Define interfaces for all data structures
- Avoid `any` type - use `unknown` if needed
- Use enums for constants
- Document complex types

### **React:**
- Functional components with hooks
- Custom hooks for shared logic
- Keep components under 200 lines
- Props interface defined above component
- Use memo for expensive computations

### **Backend:**
- Single Responsibility Principle
- Services handle business logic
- Controllers handle HTTP
- Middleware for cross-cutting concerns
- Always validate inputs

### **Database:**
- Use Prisma migrations
- Never edit schema directly in production
- Use transactions for multi-step operations
- Index frequently queried columns
- Use soft deletes where appropriate

### **Security:**
- Never log sensitive data
- Encrypt tokens and passwords
- Validate all inputs
- Use parameterized queries
- Rate limit API endpoints

### **Git:**
- Feature branches: `feature/account-sync`
- Commit messages: Clear and descriptive
- Small, focused commits
- PR reviews required
- Keep branches up to date

---

## Daily Development Checklist

### **Morning:**
- [ ] Pull latest code from main
- [ ] Review assigned tasks
- [ ] Check for blocking issues
- [ ] Prioritize today's work

### **During Development:**
- [ ] Write tests alongside code
- [ ] Run tests frequently
- [ ] Commit working code regularly
- [ ] Document complex logic
- [ ] Ask for help if blocked

### **End of Day:**
- [ ] Push code to feature branch
- [ ] Update task status
- [ ] Document progress
- [ ] Plan tomorrow's work

---

## Success Criteria for Phase 1

- [ ] Project structure created
- [ ] Database schema defined and migrated
- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication works
- [ ] Protected routes redirect properly
- [ ] Token refresh works
- [ ] Frontend-backend communication successful
- [ ] TypeScript compiles with no errors
- [ ] Basic tests passing
- [ ] Code is well-organized and modular
- [ ] Documentation updated

---

## Common Commands Reference

### **Backend:**
```bash
# Development
npm run dev

# Build
npm run build

# Database
npx prisma migrate dev
npx prisma studio

# Tests
npm test
```

### **Frontend:**
```bash
# Development
npm run dev

# Build
npm run build

# Tests
npm test

# Type check
npm run type-check
```

### **Docker:**
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
```

---

## Troubleshooting Guide

### **Database Connection Issues:**
- Check DATABASE_URL in .env
- Verify PostgreSQL is running
- Run migrations: `npx prisma migrate dev`

### **Frontend API Errors:**
- Check VITE_API_URL in .env
- Verify backend is running
- Check CORS configuration

### **Authentication Errors:**
- Verify JWT_SECRET is set
- Check token expiration
- Clear localStorage and re-login

### **Plaid Integration Issues:**
- Use sandbox environment initially
- Check Plaid credentials
- Review Plaid logs in dashboard

---

## Resources & Quick Links

### **Documentation:**
- [Plaid Docs](https://plaid.com/docs/)
- [Stripe Docs](https://stripe.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [MUI Components](https://mui.com/material-ui/)
- [React Router](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)

### **Tools:**
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [Postman](https://www.postman.com/) - API testing
- [DB Browser for SQLite](https://sqlitebrowser.org/) - Database viewer

---

## Agent Check-In Template

Use this template after completing tasks:

```markdown
## Agent Check-In

**Agent:** [Your Agent Role]
**Date:** [Today's Date]
**Phase:** [Current Phase Number]

### Completed Today:
- [Task 1]
- [Task 2]

### Files Modified/Created:
- `path/to/file1.ts`
- `path/to/file2.tsx`

### Tests Added:
- [Test description 1]
- [Test description 2]

### Blockers:
- [Any blocking issues, or "None"]

### Next Steps:
- [What needs to happen next]

### Notes:
- [Any additional context or decisions made]
```

---

## Ready to Start! 🚀

**Your first task:**

Adopt the **Architecture Agent** role and execute Step 1 (Initialize Project Structure).

Once complete, transition to the **Auth Agent** role and implement the authentication system following Steps 2-4.

Remember: 
- Build incrementally
- Test frequently  
- Keep code modular
- Document as you go
- Ask for help when needed

**First command to run:**
```bash
npm create vite@latest financial-platform-frontend -- --template react-ts
```

Good luck building the future of personal finance! 💰🔒📊
