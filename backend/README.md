# Personal Finance Tracker 💰

A RESTful API built with **Java Spring Boot** and **MySQL** to track personal income and expenses.

---

## Tech Stack
- Java 17
- Spring Boot 3.2
- Spring Data JPA + Hibernate
- MySQL
- Lombok
- JUnit 5 + Mockito

---

## ⚙️ Setup (VS Code)

### Prerequisites
- Java 17+
- Maven
- MySQL running locally
- VS Code with **Extension Pack for Java** installed

### Step 1 — Create the database
Open MySQL and run:
```sql
CREATE DATABASE finance_tracker;
```

### Step 2 — Update credentials
Open `src/main/resources/application.properties` and update:
```
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 3 — Run the app
In VS Code terminal:
```bash
mvn spring-boot:run
```
App starts at: **http://localhost:8080**

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transactions` | Add a new transaction |
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions/category/{category}` | Filter by category |
| DELETE | `/api/transactions/{id}` | Delete a transaction |
| GET | `/api/transactions/summary` | Income / Expense / Balance |
| GET | `/api/transactions/summary/category` | Spending breakdown by category |

---

## Sample Requests (Postman)

**Add Income:**
```json
POST /api/transactions
{
  "title": "Salary",
  "amount": 50000,
  "category": "Salary",
  "type": "INCOME",
  "date": "2025-03-01"
}
```

**Add Expense:**
```json
POST /api/transactions
{
  "title": "Rent",
  "amount": 12000,
  "category": "Housing",
  "type": "EXPENSE",
  "date": "2025-03-02"
}
```

**Summary Response:**
```json
{
  "totalIncome": 50000.0,
  "totalExpense": 12000.0,
  "balance": 38000.0
}
```

---

## Project Architecture
```
Controller  →  REST endpoints
    |
Service     →  Business logic (Java Streams)
    |
Repository  →  Spring Data JPA
    |
MySQL DB
```

---

## Run Tests
```bash
mvn test
```

---

## What I Would Improve Next
- JWT authentication
- Monthly budget limits with alerts
- Deploy on Render/AWS with CI/CD
- Swagger UI for API docs
