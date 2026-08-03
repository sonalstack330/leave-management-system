# Leave Management System

A full-stack leave management application built with Spring Boot (backend) and React (frontend in progress). Manage employee leave requests, track balances, and streamline approval workflows

## 🎯 Project Overview

The Leave Management System is a comprehensive solution for managing employee leave requests in an organization. It handles:

- **Leave Requests**: Employees apply for leave with start/end dates and reasons
- **Leave Balance Tracking**: Automatic deduction from balance upon approval
- **Manager Approvals**: Managers review and approve/reject pending requests
- **Role-Based Access**: Separate views and permissions for employees and managers
- **Audit Trail**: Leave request history with review comments

**Status**: Backend complete ✅ | Frontend in progress 🚧

---
## 🏗️ Architecture

### Backend Architecture: Controller → Service → Repository

```
Request → Controller → Service → Repository → Database
           ↓
         DTOs
         ↓
      Exception Handler
```

**Design Pattern**: Clean Architecture with separation of concerns
- **Controllers**: REST API endpoints, input validation
- **Services**: Business logic, leave balance calculation, approval workflows
- **Repositories**: Data access layer (Spring Data JPA)
- **DTOs**: Request/response objects (decoupled from entities)
- **Exception Handlers**: Global error handling with consistent JSON responses

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 2.7+
- **Database**: MySQL 8.0+
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven
- **API Testing**: Postman

### Frontend (Coming Soon)
- **Framework**: React 18+
- **HTTP Client**: Axios
- **State Management**: React Context/Redux
- **UI Components**: LeaveForm, LeaveList, ManagerDashboard

### DevOps
- **Version Control**: Git
- **Environment**: Local development (localhost:8080)

---
## 📁 Project Structure

```
leave-management-system/
├── leave-management-backend/
│   ├── pom.xml
│   ├── src/main/java/com/leavemanagement/
│   │   ├── LeaveManagementApplication.java          # Spring Boot entry point
│   │   ├── entity/
│   │   │   ├── Employee.java                         # User entity with leave balance
│   │   │   ├── LeaveRequest.java                     # Leave request entity
│   │   │   ├── Role.java                             # ENUM: MANAGER, EMPLOYEE
│   │   │   └── LeaveStatus.java                      # ENUM: PENDING, APPROVED, REJECTED
│   │   ├── repository/
│   │   │   ├── EmployeeRepository.java               # JPA repository for Employee
│   │   │   └── LeaveRequestRepository.java           # JPA repository for LeaveRequest
│   │   ├── service/
│   │   │   ├── EmployeeService.java                  # Employee management logic
│   │   │   └── LeaveRequestService.java              # Leave request + approval logic
│   │   ├── controller/
│   │   │   ├── EmployeeController.java               # REST endpoints for employees
│   │   │   └── LeaveRequestController.java           # REST endpoints for leave requests
│   │   ├── dto/
│   │   │   ├── LeaveRequestDTO.java                  # Apply leave request DTO
│   │   │   └── LeaveReviewDTO.java                   # Approve/reject DTO
│   │   └── exception/
│   │       ├── ResourceNotFoundException.java         # 404 custom exception
│   │       └── GlobalExceptionHandler.java            # Global error handler
│   └── src/main/resources/
│       └── application.properties                    # Database & server config
│
└── README.md                                          # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Java 11+** installed
- **Maven 3.6+** installed
- **MySQL 8.0+** running locally
- **Postman** (for API testing)
- **Git** (for version control)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd leave-management-system
```

### Step 2: Configure Database

Open `leave-management-backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/leave_management?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

server.port=8080
```

Replace `your_mysql_password` with your actual MySQL password.

### Step 3: Build & Run

```bash
# Navigate to backend directory
cd leave-management-backend

# Build the project (downloads dependencies)
mvn clean install

# Run the application
mvn spring-boot:run
```

**Expected Output**:
```
Started LeaveManagementApplication in X.XXX seconds
```

The backend will be available at `http://localhost:8080`

### Step 4: Verify Setup

Open Postman and send a test request:
- **Method**: GET
- **URL**: `http://localhost:8080/api/employees`
- **Expected**: Empty array `[]` (201 if successful)

---