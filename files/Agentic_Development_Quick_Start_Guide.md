# Quick Start Guide: Agentic Development with Claude Code

## How to Use This Prompt System

This guide shows you how to work with Claude Code using an agentic development approach to build the Financial Intelligence Platform.

---

## Setup Instructions

### 1. **Install Claude Code**
```bash
# Install via npm
npm install -g @anthropic-ai/claude-code

# Or install via pip
pip install claude-code
```

### 2. **Get Your API Key**
- Go to https://console.anthropic.com/
- Create a new API key
- Set it in your environment:
```bash
export ANTHROPIC_API_KEY="your-key-here"
```

### 3. **Start Your First Session**
```bash
# Create project directory
mkdir financial-platform
cd financial-platform

# Start Claude Code
claude-code
```

---

## Agentic Development Workflow

### **Phase 1: Initialize with Architecture Agent**

**Prompt Claude Code:**

```
I'm starting Phase 1 of the Financial Intelligence Platform. 

Please adopt the Architecture Agent role and help me:

1. Initialize the project structure (frontend + backend)
2. Set up the database schema with Prisma
3. Configure the basic folder structure

Refer to the Claude_Code_Agentic_Development_Prompt.md for full specifications.

Let's start with Step 1: Initialize Project Structure.
```

Claude will:
- Create the project directories
- Initialize Vite for frontend
- Initialize Node.js/Express for backend
- Install all dependencies
- Set up TypeScript configurations

### **Phase 1: Build Authentication (Auth Agent)**

**After project initialization, prompt:**

```
Great! Now please switch to the Auth Agent role.

I need you to:
1. Create the complete authentication system
2. Implement JWT-based auth with refresh tokens
3. Build the backend services, controllers, and middleware
4. Create the frontend login and registration forms

Follow the Phase 1, Steps 2-4 from the development prompt.
```

Claude will:
- Create Prisma schema
- Run database migrations
- Build auth services and controllers
- Create React authentication components
- Set up protected routes

### **Phase 1: Test Authentication**

**After auth is built:**

```
Now let's test the authentication system.

Please:
1. Start the backend server
2. Start the frontend dev server
3. Test user registration
4. Test user login
5. Verify protected routes work

Guide me through any issues.
```

---

## Working with Multiple Agents

### **Switching Agent Contexts**

When you need to work on different parts of the app, explicitly tell Claude to switch agent roles:

```
Please switch to the [Agent Name] role and work on [specific feature].

Context: [Provide any relevant context]

Tasks:
1. [Task 1]
2. [Task 2]
```

### **Example: Account Aggregation (Phase 2)**

```
Now that Phase 1 is complete, let's move to Phase 2.

Please switch to the Accounts Agent role.

I need you to:
1. Set up Plaid SDK integration
2. Create the PlaidService in the backend
3. Build the account connection API endpoints
4. Create the Plaid Link component in React
5. Build the connected accounts list UI

Use the Plaid sandbox environment for testing.

Refer to Phase 2 in the development prompt for detailed requirements.
```

### **Example: Transaction Processing (Phase 3)**

```
Switch to the Transactions Agent role.

Tasks:
1. Create transaction sync service to pull from Plaid
2. Build automatic categorization engine
3. Create transaction feed component
4. Add search and filter functionality
5. Implement category override feature

Make sure to handle deduplication and real-time updates.
```

### **Example: Fraud Detection (Phase 5)**

```
Switch to the Fraud Agent role.

I need you to build the fraud detection system:

1. Design anomaly detection algorithms:
   - Amount anomalies (spending much more than usual)
   - Location anomalies (purchases far from home)
   - Velocity checks (multiple transactions quickly)
   - Time anomalies (purchases at unusual hours)

2. Create the fraud detection service
3. Build the alert generation system
4. Create fraud alert UI components
5. Implement user actions (confirm/report fraud)

Start with baseline pattern establishment using the last 30 days of transactions.
```

---

## Agent Collaboration Patterns

### **Pattern 1: Architecture → Specialist → UI/UX → Testing**

```
# Step 1: Architecture planning
"Architecture Agent: Design the budget management feature architecture"

# Step 2: Backend implementation
"Budget Agent: Implement the backend services and API"

# Step 3: Frontend implementation
"Budget Agent: Build the React components for budget creation"

# Step 4: Styling
"UI/UX Agent: Style the budget components and ensure responsive design"

# Step 5: Testing
"Testing Agent: Write unit and integration tests for the budget feature"
```

### **Pattern 2: Parallel Development**

When features are independent, you can work on multiple things:

```
Session 1:
"Accounts Agent: Continue working on Plaid integration"

Session 2:
"Dashboard Agent: Build the net worth widget while accounts are being worked on"
```

### **Pattern 3: Bug Fixing**

```
"I'm getting an error: [paste error]

Current context: Working on [feature] as [Agent role]

Please help me:
1. Diagnose the issue
2. Fix it
3. Add error handling to prevent it in the future
4. Add a test to catch this type of issue"
```

---

## Progressive Development Strategy

### **Week 1-2: Foundation**
```
Day 1: "Architecture Agent - Set up project structure"
Day 2-3: "Auth Agent - Build authentication system"
Day 4-5: "Dashboard Agent - Create basic dashboard layout"
```

### **Week 3-5: Core Features**
```
Week 3: "Accounts Agent - Plaid integration and account sync"
Week 4: "Transactions Agent - Transaction processing and categorization"
Week 5: "Dashboard Agent - Integrate accounts and transactions into dashboard"
```

### **Week 6-8: Advanced Features**
```
Week 6: "Investments Agent - Portfolio tracking"
Week 7: "Fraud Agent - Anomaly detection system"
Week 8: "Budget Agent - Budget management and cash flow"
```

### **Week 9-12: Monetization & Polish**
```
Week 9-10: "Audit Agent - Build audit system with payment"
Week 11: "UI/UX Agent - Polish all interfaces"
Week 12: "Testing Agent - Comprehensive testing"
```

---

## Effective Prompting Tips

### **1. Be Specific About Phase and Agent**
❌ Bad: "Build the accounts feature"
✅ Good: "Accounts Agent, Phase 2: Implement Plaid Link integration following the specification"

### **2. Reference Context**
```
"We just completed Phase 1 (authentication). 

Now starting Phase 2 as the Accounts Agent.

Please build the Plaid integration following these requirements:
[paste specific requirements]"
```

### **3. Ask for Explanations**
```
"Before implementing the fraud detection algorithm, please:
1. Explain your approach
2. List the data you'll need
3. Describe the algorithm logic
4. Then implement it"
```

### **4. Request Code Reviews**
```
"As the Testing Agent, please review the authentication code we just wrote:
1. Are there security vulnerabilities?
2. Is error handling complete?
3. Are there edge cases we missed?
4. What tests should we add?"
```

### **5. Iterate and Refine**
```
"The current transaction feed is slow with 1000+ transactions.

As the Transactions Agent, please:
1. Profile the performance issue
2. Implement virtualization or pagination
3. Add loading states
4. Test with large datasets"
```

---

## Session Management

### **Starting a New Session**

Each time you start Claude Code:

```
"I'm continuing development on the Financial Intelligence Platform.

Current Status:
- ✅ Phase 1 complete (Authentication)
- ✅ Phase 2 complete (Plaid integration)
- 🚧 Phase 3 in progress (Transaction processing)

Today's goal: Complete transaction categorization as the Transactions Agent.

Please help me:
[specific tasks]"
```

### **Ending a Session**

Before ending:

```
"Please create a summary of what we accomplished today:
1. Features completed
2. Files created/modified
3. Next steps
4. Any blockers

Also update the Agent Check-In template."
```

---

## Debugging with Agents

### **Error Investigation Pattern**

```
"I'm getting this error when syncing transactions:

[paste error]

Context:
- Agent: Transactions Agent
- Feature: Transaction sync from Plaid
- File: backend/src/services/transaction.service.ts

Please:
1. Analyze the error
2. Check related code
3. Suggest fixes
4. Implement the best solution
5. Add error handling"
```

### **Integration Issues**

```
"The frontend can't connect to the backend.

Context:
- Backend running on localhost:5000
- Frontend on localhost:5173
- Getting CORS errors

Please help as the DevOps Agent:
1. Check CORS configuration
2. Verify API endpoints
3. Test the connection
4. Fix any issues"
```

---

## Code Quality Checks

### **Before Moving to Next Phase**

```
"Before we move from Phase [X] to Phase [Y], please conduct a code review:

As the Testing Agent:
1. Review all code from Phase [X]
2. Ensure tests are written
3. Check for security issues
4. Verify error handling
5. Confirm documentation is complete

As the Architecture Agent:
6. Verify the code follows the modular architecture
7. Check for tight coupling
8. Ensure proper separation of concerns
9. Confirm TypeScript types are complete"
```

---

## Integration Testing

### **End-to-End Testing**

```
"As the Testing Agent, please create E2E tests for the complete user flow:

1. User registers
2. User logs in
3. User connects a bank account (Plaid sandbox)
4. System syncs transactions
5. User views transaction feed
6. User categorizes a transaction
7. User creates a budget
8. User views budget vs. spending

Use Cypress for these tests."
```

---

## Production Preparation

### **Security Audit**

```
"As the Security Agent, please conduct a security audit:

1. Authentication security
2. API endpoint protection
3. Database query safety
4. Input validation
5. XSS prevention
6. CSRF protection
7. Token security
8. Secrets management
9. Rate limiting
10. Error message safety (no data leaks)

Provide a security checklist and recommendations."
```

### **Performance Optimization**

```
"As the DevOps Agent, please optimize performance:

1. Database query optimization
2. API response time
3. Frontend bundle size
4. Image optimization
5. Caching strategy
6. CDN setup
7. Database indexes
8. React component optimization

Run profiling and implement improvements."
```

---

## Tips for Success

### **DO:**
✅ Be specific about agent role and phase
✅ Provide context for each session
✅ Break large tasks into smaller steps
✅ Ask for explanations before implementation
✅ Request code reviews regularly
✅ Test frequently
✅ Document as you build

### **DON'T:**
❌ Jump between phases randomly
❌ Skip testing
❌ Ignore error handling
❌ Forget to commit code regularly
❌ Build without understanding
❌ Skip documentation
❌ Ignore security

---

## Example: Complete Phase 1 Workflow

Here's how a complete Phase 1 session might look:

```markdown
# Session 1: Project Setup

"I'm starting the Financial Intelligence Platform project.

Architecture Agent: Please initialize the project structure:
1. Create financial-platform directory
2. Set up React frontend with Vite and TypeScript
3. Set up Node.js backend with Express and TypeScript
4. Install all required dependencies from the tech stack list
5. Create the folder structure as specified"

[Wait for completion]

"Great! Now set up the database schema:
1. Configure Prisma with PostgreSQL
2. Create the schema with all models (User, ConnectedAccount, Transaction, etc.)
3. Run the initial migration
4. Generate Prisma client"

[Wait for completion]

# Session 2: Authentication Backend

"Auth Agent: Please build the backend authentication system:

1. Create AuthService with:
   - User registration
   - User login
   - JWT token generation
   - Password hashing
   
2. Create AuthController with endpoints:
   - POST /register
   - POST /login
   - POST /refresh-token
   
3. Create auth middleware for protecting routes

4. Set up the Express server with CORS and routes"

[Wait for completion]

# Session 3: Authentication Frontend

"Auth Agent: Now build the frontend authentication:

1. Create authApi service
2. Create LoginForm component
3. Create RegisterForm component
4. Set up React Router with protected routes
5. Implement token storage and refresh logic

Use Material-UI for styling."

[Wait for completion]

# Session 4: Testing

"Testing Agent: Let's test the authentication system:

1. Write unit tests for AuthService
2. Write integration tests for auth endpoints
3. Test the registration flow
4. Test the login flow
5. Test protected route access
6. Test token refresh"

[Wait for completion]

# Session 5: Review and Document

"Please create:
1. Agent Check-In report for Phase 1
2. List of completed files
3. Documentation for the authentication system
4. README with setup instructions
5. Next steps for Phase 2"
```

---

## Ready to Build! 🚀

You now have everything you need to start building the Financial Intelligence Platform using Claude Code with an agentic approach.

**Start with:**
```bash
cd your-workspace
claude-code
```

**Then paste:**
```
I'm starting the Financial Intelligence Platform project.

Please refer to Claude_Code_Agentic_Development_Prompt.md

Let's begin Phase 1 with the Architecture Agent role.
```

Happy coding! 💻🤖
