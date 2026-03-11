# 💸 SmartSpend — Full Stack Finance Dashboard

![CI/CD](https://github.com/SaiRanees/smartspend-fullstack/actions/workflows/ci.yml/badge.svg)

A production-ready full-stack personal finance application built with **React 18** and **Spring Boot 3.2**. Track income and expenses, visualize spending patterns, manage budgets, and get AI-powered financial insights.

---

## 🖥️ Live Preview

| Dashboard | Transactions | Budget | AI Insights |
|---|---|---|---|
| Summary cards, trend chart, spending donut | Add, filter, delete transactions | Set limits, track spending | Personalized financial tips |

---

## 🏗️ Architecture

```
React Frontend (port 3000)
        ↕ REST API (HTTP/JSON)
Spring Boot Backend (port 8080)
        ↕ Spring Data JPA
MySQL Database (port 3306)
```

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Context API + useReducer | Global state management |
| Recharts | Interactive charts |
| JavaScript ES6+ | Language |

### Backend
| Tech | Purpose |
|---|---|
| Java 21 | Language |
| Spring Boot 3.2 | Web framework |
| Spring Data JPA | Database ORM |
| MySQL | Database |
| Lombok | Boilerplate reduction |
| JUnit 5 + Mockito | Unit testing |

---

## 📁 Project Structure

```
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
```

---

## 🚀 Getting Started

### Prerequisites
- Java 21
- Node.js 18+
- MySQL 8+
- Maven

---

### Step 1 — MySQL Setup

```sql
CREATE DATABASE finance_tracker;
```

---

### Step 2 — Backend Configuration

Open `backend/src/main/resources/application.properties` and set your MySQL password:

```properties
spring.datasource.password=your_mysql_password_here
```

---

### Step 3 — Run Backend

```powershell
cd backend
mvn spring-boot:run
```

Wait for:
```
Started TrackerApplication in X seconds
Tomcat started on port 8080
```

---

### Step 4 — Run Frontend

```powershell
cd frontend
npm install
npm start
```

Opens at **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Add new transaction |
| DELETE | `/api/transactions/{id}` | Delete transaction |
| GET | `/api/transactions/summary` | Get income/expense/balance |
| GET | `/api/transactions/summary/category` | Get spending by category |
| GET | `/api/transactions/category/{name}` | Filter by category |

---

## ✅ CI/CD Pipeline

GitHub Actions automatically runs on every push to `main`:

- **Backend job** — runs JUnit 5 unit tests + builds JAR
- **Frontend job** — installs dependencies + builds React production bundle

---

## 👤 Author

**A. Sai Mohan Ranees**
- GitHub: [@SaiRanees](https://github.com/SaiRanees)
- LinkedIn: [adiraju-sai-mohan](https://www.linkedin.com/in/adiraju-sai-mohan/)
