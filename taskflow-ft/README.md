# task_manager



TaskFlow Frontend
Q. What is TaskFlow Frontend?
   TaskFlow Frontend is the client-side application of the TaskFlow platform, built with React.js and Vite. It provides a modern, responsive, and user-friendly interface that enables users to manage teams, collaborate on projects, and organize tasks efficiently.

   The frontend communicates with the backend through REST APIs and delivers a seamless user experience with secure authentication and real-time UI updates.

Q. Why was it built?
   The frontend was built to provide an intuitive and responsive interface for team collaboration and task management. It focuses on creating a smooth user experience while demonstrating modern React development practices.

The primary goals were to:-
.Build a responsive single-page application (SPA)
.Practice component-based architecture
.Implement protected routing using JWT
.Manage global state using Context API
.Consume REST APIs using Axios
.Create an attractive and user-friendly dashboard
.Technologies Used
.Core Technologies
.React.js
.Vite
.JavaScript (ES6+)
.HTML5
.CSS3
.Styling
.Tailwind CSS
.React Icons
.Routing
.React Router DOM
.State Management
.Context API
.useReducer
.useState
.useEffect
.API Communication
.Axios
.Authentication
.JWT Token (handled through backend APIs)
.Main Features
.Authentication
.User Registration
.User Login
.Protected Routes
.Persistent Authentication
.Logout Functionality
.Dashboard
.Responsive Dashboard
.Sidebar Navigation
.Top Navigation Bar
.User Profile
.Group Management
.Create New Groups
.View Joined Groups
.Search Users
.Add Friends
.View Group Members
.Task Management
.Create Tasks
.Edit Tasks
.Delete Tasks
.Assign Tasks to Group Members
.Update Task Status
.View All Group Tasks
.User Experience
.Fully Responsive Design
.Loading Skeletons
.Modern Glassmorphism UI
.Clean Navigation
.Error Handling
.Success Notifications

Project Structure:-
frontend/
│
├── public/
│
├── src/
|   ├── assets/
│   ├── components/
│   ├── context/
│   ├── forms/
│   ├── Group/
│   ├── navigation/
│   ├── pages/
│   ├── task/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md

Screenshots

Store screenshots inside a screenshots folder.

screenshots/
│── landing.png
│── signup.png
│── signin.png
│── dashboard.png
│── group-workspace.png
│── profile.png

Then display them like this:

## Landing
![Landing](../screenshots/landing.png)

## Singup
![Signup](../screenshots/signup.png)

## Login
![Login](../screenshots/signin.png)

## Dashboard
![Dashboard](../screenshots/dashboard.png)

## Group Workspace
![Group Workspace](../screenshots/group-workspace.png)

## Profile
![Profile](../screenshots/profile.png)

Live Demo

Frontend URL

https://your-frontend.vercel.app

Replace it with your deployed Vercel link.

Frontend Architecture
                   User
                     │
                     ▼
             React Components
                     │
             React Router DOM
                     │
             Context API
                     │
             Axios Requests
                     │
             REST API Backend
Getting Started
Clone the Repository
git clone https://github.com/yourusername/taskflow.git
Navigate to the Frontend
cd frontend
Install Dependencies
npm install
Configure Environment Variables

Create a .env file in the frontend root.

VITE_API_URL=http://localhost:8080

For production:

VITE_API_URL=https://your-backend.onrender.com
Start Development Server
npm run dev

The application will be available at:

http://localhost:5173
Build for Production
npm run build
Preview Production Build
npm run preview