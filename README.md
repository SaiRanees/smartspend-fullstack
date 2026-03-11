# 💸 SmartSpend — Full-Stack Finance App
![CI/CD](https://github.com/SaiRanees/smartspend-fullstack/actions/workflows/ci.yml/badge.svg)

> React 18 Frontend + Spring Boot 3.2 Backend + MySQL

---

## 📦 Project Structure

```
smartspend-fullstack/
├── backend/       ← Spring Boot REST API (Java 21)
└── frontend/      ← React 18 Dashboard (JavaScript)
```

---

## 🗄️ Architecture

```
React Frontend (port 3000)
        ↕  HTTP REST API calls
Spring Boot Backend (port 8080)
        ↕  Spring Data JPA
MySQL Database (port 3306)
```

---

## ⚙️ Setup — Step by Step

### Step 1: Create MySQL Database
Open MySQL Workbench or terminal and run:
```sql
CREATE DATABASE finance_tracker;
```

### Step 2: Configure Backend
Open `backend/src/main/resources/application.properties`
Change this line to your MySQL password:
```
spring.datasource.password=your_mysql_password_here
```

### Step 3: Run the Backend
Open the `backend/` folder in IntelliJ IDEA or VS Code.
Run the main class:
```
backend/src/main/java/com/finance/tracker/TrackerApplication.java
```
Or from terminal inside the `backend/` folder:
```bash
./mvnw spring-boot:run
```
Backend starts at → **http://localhost:8080**

### Step 4: Run the Frontend
Open a new terminal inside the `frontend/` folder:
```bash
npm install
npm start
```
Frontend starts at → **http://localhost:3000**

---

## 🔗 API Endpoints (Spring Boot)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/transactions | Get all transactions |
| POST   | /api/transactions | Add new transaction |
| DELETE | /api/transactions/{id} | Delete transaction |
| GET    | /api/transactions/summary | Total income, expense, balance |
| GET    | /api/transactions/summary/category | Spending by category |
| GET    | /api/transactions/category/{name} | Filter by category |

---

## 🧪 Sample POST Request Body
```json
{
  "title": "Salary",
  "amount": 85000,
  "category": "Salary",
  "type": "INCOME",
  "date": "2025-03-01"
}
```

---

## 🎤 Interview Talking Point

> "I built both ends of the stack. The Spring Boot backend exposes REST APIs
> with a Controller-Service-Repository architecture, input validation, and
> centralized exception handling. The React frontend consumes those APIs through
> a dedicated service layer — so swapping the backend URL is just one config change."
