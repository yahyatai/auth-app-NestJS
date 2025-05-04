# auth-app-NestJS
Implemented a module that would allow a user to sign up and sign in, to the application

*** User Authentication Module

A full-stack authentication system built with Vue.js, NestJS, and MongoDB, containerized with Docker.

*** Project Overview

This project implements a comprehensive user authentication system with signup and signin functionality. It follows secure password policies and includes proper validation on both frontend and backend.

***Features

1- User registration with email, name, and password
2- User login with email and password
3- Secure password requirements enforcement
4- JWT-based authentication
5- Responsive UI design

*** Tech Stack

** Frontend

1- Vue.js 3
2- Vue Router for navigation
3- Axios for API requests
4- SCSS for styling

** Backend

1- NestJS framework
2- TypeScript
3- MongoDB with Mongoose ORM
4- Passport.js for authentication
5- JWT for token-based authentication
6- bcrypt for password hashing
7- Class-validator for DTO validation


*** Getting Started

*** Prerequisites

1- Docker and Docker Compose
2- Node.js (for local development)
3- npm or yarn (for local development)


*** Installation and Setup

1- Clone the repository

git clone https://github.com/yourusername/auth-app-NestJS.git

2- Start the mongoDB using Docker Compose

docker-compose up -d

3- Access the application

Frontend: http://localhost:8081
Backend API: http://localhost:3000



*** Local Development Setup

** Backend (NestJS)

1- Navigate to the backend directory

cd easy_generator_backend

2- Install dependencies

npm install

3- Set up environment variables

cp .env

Then edit the .env file with your specific configuration

** Start the development server

npm run start:dev


** Frontend (Vue)

1- Navigate to the frontend directory

cd easy_generator_frontend

2- Install dependencies

npm install

3- Start the development server

npm run serve


*** API Endpoints

** Authentication

1- POST /api/auth/signup

* Register a new user
* Request body:
	json{
	  "email": "user@example.com",
	  "name": "John Doe",
	  "password": "Secure123!"
	}
* Response:
	json{
	  "id": "user_id",
	  "email": "user@example.com",
	  "name": "John Doe"
	}

2- POST /api/auth/signin

* Login a user
* Request body:
	json{
	  "email": "user@example.com",
	  "password": "Secure123!"
	}
* Response:
	json{
	  "accessToken": "jwt_token",
	  "user": {
		"id": "user_id",
		"email": "user@example.com",
		"name": "John Doe"
	  }
	}

*** Password Requirements

1- Minimum length of 8 characters
2- Contains at least 1 letter
3- Contains at least 1 number
4- Contains at least 1 special character

*** Security Features

1- Password hashing using bcrypt
2- JWT token-based authentication
3- Input validation on both frontend and backend
4- CORS protection
5- Request logging

*** Logging

The backend implements a comprehensive logging system using NestJS's built-in Logger and Winston for:

1- API request logging
2- Error tracking
3- Authentication events
4- Database operations

*** Future Enhancements

Email verification
Password recovery functionality
OAuth2 integration for social logins
Two-factor authentication
User profile management

License
MIT
