# Vrello - Task Manager Application

Vrello is a task management application similar to Trello, allowing users to create, update, and manage tasks within different columns. Users can move tasks between columns using drag-and-drop functionality and have the option to sign up and log in via Google.

## Deployed App Link
https://vrello.vercel.app/ 

## Screenshots
<img width="1465" alt="Screenshot 2024-07-21 at 5 31 42 PM" src="https://github.com/user-attachments/assets/7ee03fd5-679e-458a-9926-c700124d9209">
<img width="1470" alt="Screenshot 2024-07-21 at 5 32 07 PM" src="https://github.com/user-attachments/assets/dca8123b-1558-4c17-896f-c9fa0171c647">
<img width="1470" alt="Screenshot 2024-07-21 at 5 32 34 PM" src="https://github.com/user-attachments/assets/57045233-d0ec-45b3-84c8-aaaca7c17392">
<img width="1470" alt="Screenshot 2024-07-21 at 5 35 18 PM" src="https://github.com/user-attachments/assets/1dfb41e9-a338-4144-b584-319666f015ac">

## Features

- **User Authentication**
  - User registration and login
  - Google login authentication
- **Task Management**
  - Create, read, update, and delete tasks
  - Move tasks between columns using drag-and-drop
- **User Interface**
  - Responsive and intuitive design based on provided mockups
  - Authentication required on every page
- **Backend API**
  - RESTful API for handling CRUD operations for tasks
  - Routes for user registration, login, and Google login
- **Data Storage**
  - Tasks and user information stored in MongoDB
- **Validation**
  - Server-side validation for task data and user information
- **Error Handling**
  - Proper error messages and status codes

## Bonus Features

- User profiles with avatars
- Task due dates
- Task searching capabilities

## Tech Stack

- **Frontend**: React, React Router, Drag-and-Drop library
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Passport.js, Google OAuth
- **Deployment**: Vercel (Frontend), Render (Backend)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/vrello.git
   cd vrello
