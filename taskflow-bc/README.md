# task_manager_bc


TaskFlow Backend
Q. What is TaskFlow Backend?
   TaskFlow Backend is the server-side application of the TaskFlow platform. It is built with Node.js, Express.js, and MongoDB to provide secure RESTful APIs for authentication, user management, group collaboration, and task management.

   The backend handles business logic, user authentication, database operations, and API communication with the frontend.

Q. Why was it built?
   The backend was developed to power the TaskFlow application by providing a secure, scalable, and maintainable API layer.

The primary goals were to:
• Build secure REST APIs
• Implement JWT-based authentication
• Manage users, groups, and tasks
• Practice MongoDB relationships using Mongoose
• Apply MVC architecture for clean code organization
• Create a production-ready backend suitable for real-world applications

Technologies Used:
• Runtime
• Node.js
• Framework
• Express.js
• Database
• MongoDB Atlas
• Mongoose
• Authentication
• JSON Web Token (JWT)
• bcrypt
• Environment Configuration
• dotenv
• Middleware
• CORS
• Express JSON Middleware
• Development Tools
• Nodemon
• Git & GitHub
• Main Features
• Authentication
• User Registration
• User Login
• Password Hashing with bcrypt
• JWT Token Generation
• Protected Routes
• User Management
• User Profile
• Search Users
• Add Friends
• View Friend List
• Group Management
• Create Groups
• Join Groups
• View Group Details
• Manage Group Members
• Task Management
• Create Tasks
• Assign Tasks
• Update Tasks
• Delete Tasks
• Change Task Status
• Retrieve Group Tasks
• Security
• JWT Authentication
• Password Encryption
• Protected API Endpoints
• Environment Variables
• Input Validation

Project Structure
backend/
│
├── config/
│
├── /
│
├── Middleware/
│
├── Models/
│
├── Routes/
│
├── server.js
│
├── package.json
│
└── README.md

Architecture
               Client (React)

                     │
                     ▼

             Express.js Routes

                     │
                     ▼

              Controllers

                     │
                     ▼

          Business Logic Layer

                     │
                     ▼

          Mongoose Models

                     │
                     ▼

             MongoDB Atlas

API Modules

The backend provides REST APIs for the following modules:

Authentication
Register User
Login User
Verify JWT
Users
Get User Profile
Search Users
Add Friends
Get Friend List
Groups
Create Group
Get Group Details
Get All Groups
Add Members
Remove Members
Tasks
Create Task
Update Task
Delete Task
Get Single Task
Get Group Tasks
Environment Variables

Create a .env file inside the backend directory.

PORT=8080

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

Example:
PORT=8080
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow
JWT_SECRET=yourStrongSecretKey

Installation:
Clone Repository = git clone https://github.com/yourusername/taskflow.git

Navigate to Backend = cd backend

Install Dependencies = npm install

Start Development Server = npm run dev OR npm start

The backend will run on = http://localhost:8080

Request Flow:
Client Request

      │

      ▼

Express Route

      │

      ▼

Controller

      │

      ▼

Mongoose Model

      │

      ▼

MongoDB Database

      │

      ▼

Response Sent to Client

Dependencies
Major packages used in this project:

Package	Purpose
express	Web framework
mongoose	MongoDB ODM
jsonwebtoken	JWT authentication
bcrypt	Password hashing
dotenv	Environment variables
cors	Cross-origin requests
nodemon	Development server
express-validator (optional if used)	Request validation

Security Features:
JWT Authentication
Password Hashing with bcrypt
Protected Routes
Environment Variables
CORS Configuration
Input Validation
Error Handling Middleware

Future Improvements:
Email Verification
Password Reset
File Uploads
Notifications
Activity Logs
Role-Based Access Control (RBAC)
Pagination & Filtering
API Rate Limiting
Unit & Integration Testing

Frontend Documentation:
For frontend setup and UI details, refer to:

../frontend/README.md
API Testing

You can test the APIs using:

Postman
Thunder Client
Insomnia
Author

Raghvendra Bhadouriya

Full Stack MERN Developer
GitHub: https://github.com/your-username
LinkedIn: https://linkedin.com/in/your-profile