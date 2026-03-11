💸 SmartSpend — Full Stack Finance Dashboard
Show Image
A production-ready full-stack personal finance application built with React 18 and Spring Boot 3.2. Track income and expenses, visualize spending patterns, manage budgets, and get AI-powered financial insights.

🖥️ Live Preview
DashboardTransactionsBudgetAI InsightsSummary cards, trend chart, spending donutAdd, filter, delete transactionsSet limits, track spendingPersonalized financial tips

🏗️ Architecture
React Frontend (port 3000)
        ↕ REST API (HTTP/JSON)
Spring Boot Backend (port 8080)
        ↕ Spring Data JPA
MySQL Database (port 3306)

🛠️ Tech Stack
Frontend
TechPurposeReact 18UI frameworkReact Router v6Client-side routingContext API + useReducerGlobal state managementRechartsInteractive chartsJavaScript ES6+Language
Backend
TechPurposeJava 21LanguageSpring Boot 3.2Web frameworkSpring Data JPADatabase ORMMySQLDatabaseLombokBoilerplate reductionJUnit 5 + MockitoUnit testing

📁 Project Structure
smartspend-fullstack/
├── frontend/                        # React application
│   └── src/
│       ├── core/                    # Router, store, theme
│       ├── features/                # Feature modules
│       │   ├── dashboard/           # Dashboard page
│       │   ├── transactions/        # Transactions page
│       │   ├── budget/              # Budget page
│       │   └── insights/            # AI Insights page
│       ├── layout/                  # Sidebar, Topbar, AppLayout
│       └── shared/                  # Reusable components, utils
│
├── backend/                         # Spring Boot application
│   └── src/main/java/com/finance/tracker/
│       ├── controller/              # REST endpoints
│       ├── service/                 # Business logic
│       ├── repository/              # Database layer
│       ├── model/                   # Entity classes
│       ├── exception/               # Exception handling
│       └── config/                  # CORS configuration
│
└── .github/workflows/ci.yml         # GitHub Actions CI/CD

🚀 Getting Started
Prerequisites

Java 21
Node.js 18+
MySQL 8+
Maven


Step 1 — MySQL Setup
sqlCREATE DATABASE finance_tracker;

Step 2 — Backend Configuration
Open backend/src/main/resources/application.properties and set your MySQL password:
propertiesspring.datasource.password=your_mysql_password_here

Step 3 — Run Backend
powershellcd backend
mvn spring-boot:run
Wait for:
Started TrackerApplication in X seconds
Tomcat started on port 8080

Step 4 — Run Frontend
powershellcd frontend
npm install
npm start
Opens at http://localhost:3000

🔌 API Endpoints
MethodEndpointDescriptionGET/api/transactionsGet all transactionsPOST/api/transactionsAdd new transactionDELETE/api/transactions/{id}Delete transactionGET/api/transactions/summaryGet income/expense/balanceGET/api/transactions/summary/categoryGet spending by categoryGET/api/transactions/category/{name}Filter by category

✅ CI/CD Pipeline
GitHub Actions automatically runs on every push to main:

Backend job — runs JUnit 5 unit tests + builds JAR
Frontend job — installs dependencies + builds React production bundle


👤 Author
A. Sai Mohan Ranees

GitHub: @SaiRanees
LinkedIn: adiraju-sai-mohan
