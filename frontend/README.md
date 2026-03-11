# 💸 SmartSpend — AI-Powered Finance Dashboard

> Built with React · Feature-Based Architecture · AI Insights via Claude API

---

## 🚀 Quick Start

```bash
npm install
npm start
# → http://localhost:3000
```

---

## 📦 Package / Feature-Based Architecture

```
src/
│
├── core/                          ← App-wide infrastructure
│   ├── router/
│   │   └── AppRouter.jsx          # All route definitions
│   ├── store/
│   │   └── AppStore.js            # Global state (useReducer + Context)
│   └── theme/
│       └── ThemeProvider.js       # Dark/light theme context
│
├── shared/                        ← Reusable across ALL features
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   └── Button.css
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   └── Card.css
│   │   ├── StatCard/
│   │   │   ├── StatCard.jsx
│   │   │   └── StatCard.css
│   │   └── Modal/
│   │       ├── Modal.jsx
│   │       └── Modal.css
│   ├── hooks/
│   │   └── useLocalStorage.js     # Persist state to localStorage
│   ├── utils/
│   │   └── formatters.js          # Currency, date, category helpers
│   ├── constants/
│   │   ├── routes.js              # Route path constants
│   │   └── categories.js          # Category config (icon, color, label)
│   └── styles/
│       └── globals.css            # CSS variables, reset, animations
│
├── features/                      ← Self-contained feature packages
│   │
│   ├── dashboard/                 ── DASHBOARD FEATURE PACKAGE ──
│   │   ├── services/
│   │   │   └── dashboardService.js    # Fetches all dashboard data
│   │   ├── hooks/
│   │   │   └── useDashboard.js        # Dashboard state & derived data
│   │   ├── components/
│   │   │   ├── SummaryCards.jsx       # 4 KPI stat cards
│   │   │   ├── TrendChart.jsx         # Income vs Expenses line chart
│   │   │   ├── SpendingDonut.jsx      # Category donut chart
│   │   │   └── RecentActivity.jsx     # Last 7 transactions list
│   │   ├── styles/
│   │   │   └── dashboard.css
│   │   └── DashboardPage.jsx          # Feature entry point / page
│   │
│   ├── transactions/              ── TRANSACTIONS FEATURE PACKAGE ──
│   │   ├── services/
│   │   │   └── transactionService.js  # Add / delete API calls
│   │   ├── hooks/
│   │   │   └── useTransactions.js     # Filter, search, CRUD logic
│   │   ├── components/
│   │   │   ├── TransactionFilters.jsx # Search + category + type filters
│   │   │   ├── TransactionTable.jsx   # Responsive data table
│   │   │   └── AddTransactionModal.jsx# Add new transaction form
│   │   └── TransactionsPage.jsx       # Feature entry point / page
│   │
│   ├── budget/                    ── BUDGET FEATURE PACKAGE ──
│   │   ├── services/
│   │   │   └── budgetService.js       # Update budget limit API
│   │   ├── hooks/
│   │   │   └── useBudget.js           # Budget state + spent calculations
│   │   ├── components/
│   │   │   └── BudgetCard.jsx         # Per-category progress card
│   │   ├── styles/
│   │   │   └── budget.css
│   │   └── BudgetPage.jsx             # Feature entry point / page
│   │
│   └── insights/                  ── AI INSIGHTS FEATURE PACKAGE ──
│       ├── services/
│       │   └── insightsService.js     # Claude AI API integration
│       ├── hooks/
│       │   └── useInsights.js         # Insight fetch state
│       ├── components/
│       │   └── InsightCard.jsx        # Single AI insight display
│       ├── styles/
│       │   └── insights.css
│       └── InsightsPage.jsx           # Feature entry point / page
│
├── layout/                        ← Shell / chrome (not a feature)
│   ├── Sidebar/
│   │   ├── Sidebar.jsx            # Nav links, theme toggle, user info
│   │   └── Sidebar.css
│   ├── Topbar/
│   │   ├── Topbar.jsx             # Page title + date
│   │   └── Topbar.css
│   └── AppLayout/
│       ├── AppLayout.jsx          # Combines sidebar + topbar + main
│       └── AppLayout.css
│
├── App.jsx                        ← Root: wires providers + layout + router
└── index.js                       ← ReactDOM entry point
```

---

## ✅ JD Requirements Covered

| Requirement | Implementation |
|---|---|
| Scalable React app | Feature-based architecture — each feature is independent |
| Responsive design | CSS Grid with breakpoints, mobile-first |
| HTML/CSS/JS standards | Semantic HTML, CSS custom properties, ES6+ modules |
| Collaborate with designers | Shared design system (Button, Card, Modal, StatCard) |
| Modern frameworks | React 18, React Router v6, Recharts |
| GenAI awareness | Claude API integration in Insights feature |

---

## 🎤 Interview Answer — Architecture Decision

> "I used a feature-based package architecture. Each feature — dashboard, transactions, budget, insights — is a self-contained module with its own service layer for API calls, a custom hook for business logic, and components for rendering. The shared folder holds the design system, and core holds app-wide infrastructure like routing, state, and theme. This means adding a new feature never touches existing code."

---

## 📄 Pages

| Page | Route | Key Features |
|---|---|---|
| Dashboard | `/` | KPI cards, line chart, donut chart, recent activity |
| Transactions | `/transactions` | CRUD table, search, category + type filter |
| Budget | `/budget` | Animated progress bars, edit limits modal |
| AI Insights | `/insights` | Claude AI-powered spending analysis |
