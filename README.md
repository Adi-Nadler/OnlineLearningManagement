# Online Learning Management System

A full-stack Learning Management Dashboard for an online education platform, featuring a .NET Core 8 API backend and Angular 19 frontend, designed to demonstrate modern web development practices and clean architecture principles.

## 📋 Overview

This system allows administrators to:
- View and manage courses (CRUD operations)
- View and manage student enrollments
- Assign students to courses
- Generate enrollment reports

### System Architecture
- **Backend**: ASP.NET Core 8 Web API
- **Frontend**: Angular 19 with Bootstrap 5
- **Data Storage**: In-memory repositories (for demonstration)
- **API Documentation**: Swagger/OpenAPI

## 🚀 Features

### Backend API Features
#### Course Management
- ✅ Create, Read, Update, Delete courses
- ✅ Data validation (dates, required fields)
- ✅ Automatic cascade deletion of enrollments

#### Student Management
- ✅ Full CRUD operations for students
- ✅ Email and name validation

#### Enrollment Management
- ✅ Assign students to courses
- ✅ Prevent duplicate enrollments
- ✅ View enrollment details with student/course information

#### Reporting
- ✅ Enrollment count per course report
- ✅ RESTful API endpoint for data consumption

#### Additional API Features
- ✅ Global exception handling middleware
- ✅ Data seeding for demonstration
- ✅ Comprehensive validation with DataAnnotations

### Frontend Client Features
#### User Interface
- ✅ Modern Angular 19 with standalone components
- ✅ Bootstrap 5.3.7 responsive design
- ✅ Professional popup forms with validation
- ✅ Generic reusable table component

#### Course Management UI
- ✅ Course list with professional styling
- ✅ Add/Edit course popup forms
- ✅ Date validation (start date before end date)
- ✅ Currency formatting for course prices
- ✅ Real-time form validation

#### Enrollment Management UI
- ✅ Student enrollment interface
- ✅ Duplicate enrollment prevention
- ✅ Client-side validation for user experience
- ✅ Loading states and error handling

#### Reporting Dashboard
- ✅ Clean enrollment statistics display
- ✅ Student count per course visualization
- ✅ Professional data presentation

## 🏗️ Architecture & Design

### Project Structure
```
OnlineLearningManagement/
├── Server (.NET Core 8)
│   ├── OnlineLearningManagement.API/          # Web API Layer
│   ├── OnlineLearningManagement.BL/           # Business Logic Layer  
│   ├── OnlineLearningManagement.DAL/          # Data Access Layer
│   ├── OnlineLearningManagement.Model/        # Domain Models
│   └── OnlineLearningManagement.Tests/        # Unit Tests
└── Client (Angular 19)
    └── client-online-learning-management/
        ├── src/app/
        │   ├── core/services/                  # Core services (API, data refresh)
        │   ├── features/                       # Feature modules
        │   │   ├── courses/                    # Course management
        │   │   ├── enrolments/                 # Enrollment management
        │   │   └── reports/                    # Reporting dashboard
        │   ├── models/                         # TypeScript interfaces
        │   └── shared/components/              # Reusable components
        └── Angular configuration files
```

### Backend Design Patterns
- **Repository Pattern**: Abstracts data access logic
- **Dependency Injection**: Promotes loose coupling and testability
- **DTO Pattern**: Separates API contracts from domain models
- **Service Layer**: Encapsulates business logic

### Frontend Architecture
- **Feature-based Structure**: Organized by business domains
- **Standalone Components**: Modern Angular 19 approach
- **Signal-based State Management**: Reactive programming with Angular signals
- **Generic Components**: Reusable UI components for consistency

### Technology Stack

#### Backend Technologies
- **ASP.NET Core 8**: Latest LTS version for optimal performance
- **C# 12**: Modern language features including required properties
- **xUnit**: Industry-standard testing framework
- **Swagger/OpenAPI**: Automatic API documentation
- **In-Memory Storage**: Dictionary-based repositories for simplicity

#### Frontend Technologies
- **Angular 19**: Latest version with standalone components and signals
- **TypeScript**: Type-safe development with modern ES features
- **Bootstrap 5.3.7**: Professional responsive UI framework
- **RxJS**: Reactive programming for data streams
- **Angular Forms**: Template-driven forms with validation

## 🛠️ Setup Instructions

### Prerequisites
- **.NET 8 SDK**
- **Node.js 18+** and **npm**
- **Visual Studio 2022** or **VS Code**
- **Git**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adi-Nadler/OnlineLearningManagement
   cd server
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run the API**
   ```bash
   cd OnlineLearningManagement.API
   dotnet run
   ```

4. **Access the API**
   - API: https://localhost:7261
   - Swagger UI: https://localhost:7261/swagger/index.html

5. **Run tests**
   ```bash
   dotnet test
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd Client/client-online-learning-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the Angular application**
   ```bash
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:4200
   - The app will automatically reload when you make changes

### Full Stack Development
- Start the backend API first (port 7261)
- Start the frontend client (port 4200)
- The Angular app is configured to connect to the API automatically

## 🔌 API Endpoints

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course

### Students
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Enrollments
- `GET /api/enrolments` - Get all enrollments with details
- `GET /api/enrolments/{id}` - Get enrollment by ID
- `POST /api/enrolments` - Create new enrollment
- `DELETE /api/enrolments/{id}` - Delete enrollment

### Reports
- `GET /api/reports/enrolments-per-course` - Get enrollment statistics

## 📊 Sample Data

The system includes pre-seeded data:
- **3 Students**: Alice, Bob, Charlie
- **3 Courses**: Introduction to Programming, Business Communication, Financial Accounting
- **5 Enrollments**: Various student-course combinations

## 🧪 Testing

The solution includes minimal unit test:
- **EnrolmentService Tests**: Validates enrollment creation and business rules
- **Framework**: xUnit with in-memory repositories

## ⚖️ Design Decisions & Trade-offs

### Chosen Approaches
1. **In-Memory Storage**: Simple Dictionary-based repositories for demonstration
2. **Singleton Services**: Maintains data consistency during application lifetime
3. **Cascade Deletion**: Automatically remove enrollments when deleting courses

### Trade-offs Made
1. **Performance vs Simplicity**: In-memory storage over database for easier setup
2. **Validation Strategy**: Mix of service-level and model-level validation
3. **Error Handling**: Global middleware vs per-controller handling

## 🔮 Future Improvements

### Short-term Enhancements
- [ ] Add pagination for large datasets
- [ ] Implement more comprehensive logging
- [ ] Add more reports and analytics
- [ ] Extend unit test coverage
- [ ] Add end-to-end testing for the frontend
- [ ] Implement user authentication and authorization

### Production Considerations
- [ ] Replace in-memory storage with Entity Framework + SQL Server
- [ ] Add JWT authentication and role-based authorization
- [ ] Implement data persistence and migration strategies
- [ ] Add performance monitoring and health checks
- [ ] Configure environment-specific settings
- [ ] Add Docker containerization
- [ ] Implement CI/CD pipelines

### Advanced Features
- [ ] Add course capacity limits and enrollment waiting lists
- [ ] Implement course prerequisites and learning paths
- [ ] Include student grades and progress tracking
- [ ] Add real-time notifications with SignalR
- [ ] Implement advanced reporting and analytics dashboard
- [ ] Add multi-language support (i18n)

## 🤝 Development Practices

### Backend Practices
- **Clean Code**: Meaningful naming, single responsibility principle
- **SOLID Principles**: Proper abstraction and dependency management
- **Error Handling**: Comprehensive exception management
- **API Documentation**: Comprehensive Swagger documentation

### Frontend Practices
- **Modern Angular**: Standalone components, signals, and latest features
- **TypeScript**: Strong typing for better code reliability
- **Component Architecture**: Reusable, modular component design
- **Responsive Design**: Mobile-first Bootstrap implementation
- **Form Validation**: Client-side validation for better user experience

---

This project demonstrates modern full-stack development practices with clean architecture, proper separation of concerns, and comprehensive API design paired with a professional Angular frontend, suitable for a complete learning management system.

