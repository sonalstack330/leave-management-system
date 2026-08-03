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
