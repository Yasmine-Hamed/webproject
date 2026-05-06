# WebProject - Full-Stack Student Management System

## Overview

This is a full-stack web application for managing students, courses, enrollments, and instructors. It consists of:

- **Backend**: ASP.NET Core Web API with Entity Framework Core and SQL Server
- **Frontend**: React application with routing, forms, and API integration

The application provides RESTful API endpoints for CRUD operations on students, courses, enrollments, and instructors, secured with JWT authentication. The React frontend offers a user interface for interacting with the data.

## Technologies Used

### Backend
- .NET 9 (ASP.NET Core Web API)
- Entity Framework Core (ORM for SQL Server)
- SQL Server (database)
- JWT (authentication)
- Swagger/OpenAPI (API documentation)

### Frontend
- React 18
- React Router DOM (routing)
- Axios (HTTP client)
- Vite (build tool)
- Express.js (development proxy server)

## Prerequisites

- .NET 9 SDK
- Node.js (v16 or higher)
- SQL Server instance (localdb or remote)
- npm or yarn

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd webproject
   ```

2. **Configure database connection** in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=WebProjectDb;Trusted_Connection=True;MultipleActiveResultSets=true"
   }
   ```

3. **Configure JWT settings** in `appsettings.json`:
   ```json
   "Jwt": {
     "Issuer": "your-issuer",
     "Audience": "your-audience",
     "Key": "your-secret-key-should-be-long"
   }
   ```

4. **Apply database migrations**:
   ```bash
   dotnet ef database update
   ```

5. **Run the backend**:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001` (or as shown in console).

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd zzz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

### Running Both Together

To run both backend and frontend simultaneously:
```bash
cd zzz
npm start
```
This uses concurrently to start both the Express proxy server and Vite dev server.

## API Endpoints

### Authentication
- `POST /api/Auth/login` - Login with credentials, returns JWT token

### Students
- `GET /api/Student` - List all students
- `GET /api/Student/{id}` - Get student by ID
- `POST /api/Student` - Create new student
- `PUT /api/Student/{id}` - Update student
- `DELETE /api/Student/{id}` - Delete student

### Courses
- `GET /api/Course` - List all courses
- `GET /api/Course/{id}` - Get course by ID
- `POST /api/Course` - Create new course
- `PUT /api/Course/{id}` - Update course
- `DELETE /api/Course/{id}` - Delete course

### Enrollments
- `GET /api/Enrollment` - List all enrollments
- `GET /api/Enrollment/{id}` - Get enrollment by ID
- `POST /api/Enrollment` - Create new enrollment
- `PUT /api/Enrollment/{id}` - Update enrollment
- `DELETE /api/Enrollment/{id}` - Delete enrollment

### Instructors
- `GET /api/Instructor` - List all instructors
- `GET /api/Instructor/{id}` - Get instructor by ID
- `POST /api/Instructor` - Create new instructor
- `PUT /api/Instructor/{id}` - Update instructor
- `DELETE /api/Instructor/{id}` - Delete instructor

## Database Migrations

Included migrations:
- `20260331153705_Initial` - Initial schema
- `20260331173341_AddInstructorEntities` - Instructor entities and relationships

## Project Structure

```
webproject/
├── Controller/          # API controllers
├── Data/               # DbContext and models
├── DTOs/               # Data transfer objects
├── Migrations/         # EF Core migrations
├── Models/             # Entity models
├── Services/           # Business logic services
├── zzz/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── backend/        # Express proxy server
│   └── package.json
├── appsettings.json
├── Program.cs
└── webproject.csproj
```

## Usage

1. Start the backend API
2. Start the frontend development server
3. Access the application at `http://localhost:5173`
4. Use the navigation to manage students, courses, enrollments, and instructors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

```powershell
dotnet ef database update
```

## Run

1. Restore packages:

```powershell
dotnet restore
```

2. Build the project:

```powershell
dotnet build
```

3. Run the app:

```powershell
dotnet run
```

4. Open Swagger (default development URL):

- `https://localhost:5001/swagger` or as shown in console.

## Database Migrations

This repository includes EF Core migrations under `Migrations/`, starting with:

- `20260331153705_Initial` (initial schema)
- `20260331173341_AddInstructorEntities` (instructor relationships)

Apply migrations:

```powershell
dotnet ef database update
```

## API Endpoint Documentation

### Auth
- `POST /api/Auth/login` - credentials in JSON body, returns `{ token }` for bearer auth

### Course
- `GET /api/Course` - list courses
- `GET /api/Course/{id}` - course by id
- `POST /api/Course` - create course with `CourseCreateDto`
- `PUT /api/Course/{id}` - update course with `CourseUpdateDto`
- `DELETE /api/Course/{id}` - delete course

### Enrollment
- `GET /api/Enrollment/{studentId}` - get student enrollments
- `POST /api/Enrollment` - create enrollment with `EnrollmentCreateDto`
- `DELETE /api/Enrollment/{studentId}/{courseId}` - remove enrollment

### Student
- `GET /api/Student` - list students
- `GET /api/Student/{id}` - student by id
- `POST /api/Student` - create student with `StudentCreateDto`
- `PUT /api/Student/{id}` - update student with `StudentUpdateDto`

### Instructor
- `GET /api/Instructor` - list instructors
- `GET /api/Instructor/{id}` - instructor by id
- `POST /api/Instructor` - create instructor with `InstructorCreateDto` (Admin only)
- `PUT /api/Instructor/{id}` - update instructor with `InstructorUpdateDto` (Admin only)
- `DELETE /api/Instructor/{id}` - delete instructor (Admin only)

## Swagger / UI Screenshots

The following screenshots demonstrate the app running and endpoint usability in Swagger UI. Save and commit these images in `README-images/` (case-sensitive path on GitHub: `README-images`, not `readme-images`).

1. `README-images/1.png` - login request sample and JWT response
2. `README-images/2.png` - `/api/Auth/login` request body in Swagger
3. `README-images/3.png` - GET `/api/Course` response
4. `README-images/4.png` - POST `/api/Course` request sample
5. `README-images/5.png` - schema DTO tree in Swagger
6. `README-images/6.png` - endpoints listing with required auth lock
7. `README-images/7.png` - executing GET `/api/Course` with bearer header
8. `README-images/8.png` - successful course creation response

![Login and token response](README-images/1.png)

## How to use JWT in Swagger

1. Run the API and open Swagger UI at `https://localhost:5001/swagger`.
2. Expand `Auth` -> `POST /api/Auth/login`.
3. Send body with:

```json
{
  "username": "admin",
  "password": "password"
}
```

4. Copy token from response:

```json
{ "token": "<JWT>" }
```

5. Click `Authorize` (lock icon) on Swagger page.
6. Add header value: `Bearer <JWT>`.
7. Click `Authorize` and then `Close`.
8. Swagger will include JWT in `Authorization` header for all protected requests.

9. Execute protected endpoints such as `GET /api/Course` and `POST /api/Course` (Admin required).

10. To revoke, click `Authorize` -> `Logout`.

![Login payload](README-images/2.png)

![Course GET response](README-images/3.png)

![Course POST request](README-images/4.png)

![Schema docs](README-images/5.png)

![Locked endpoints](README-images/6.png)

![GET course with auth](README-images/7.png)

![Course created](README-images/8.png)

## JWT Authentication

This project uses JWT Bearer authentication with role-based authorization.

- `AuthController` (`POST /api/Auth/login`) returns a JWT token for valid credentials (`admin`/`password`).
- The JWT payload includes `Name` and `Role` claims (e.g., `Admin`).
- In `Program.cs`, `AddAuthentication` uses `JwtBearerDefaults.AuthenticationScheme` with issuer, audience, and signing key validation.
- Role-based rules:
  - `CourseController`: `GET` for any authenticated user; `POST`, `PUT`, `DELETE` for `Admin` only.
  - `StudentController`: `GET` for any authenticated user; `POST` for `Admin`; `PUT` for `Admin` or `Instructor`.
  - `EnrollmentController`: `GET` for any authenticated user; `POST`/`DELETE` for `Admin` or `Instructor`.

## Why HTTP-only cookies are an industry standard for authentication security

1. HTTP-only cookies cannot be read by JavaScript in the browser (`HttpOnly=true`).
   - This strongly reduces risk of client-side script theft via XSS (cross-site scripting).

2. They can support secure flags (`Secure=true`, `SameSite=Strict/Lax`) to further reduce risk of CSRF and man-in-the-middle eavesdropping.

3. Browser automatically includes cookies in requests for the same domain.
   - This makes session handling easy while keeping credentials out of local storage.

4. Cookies are the standard for stateful session sessions in many frameworks.
   - Industry best practice is to protect cookie payloads with HTTPS/TLS and to store minimal value (e.g., opaque session ID or refresh token key). JSON Web Tokens may still be used with `HttpOnly` and `Secure` cookie storage for improved security.

## Notes

- For production, store secrets safely (Azure Key Vault, environment variables, user secrets) and avoid hardcoding JWT keys or DB credentials.
- Enable HTTPS and enforce it with `app.UseHttpsRedirection()` and proper certificate configuration.
