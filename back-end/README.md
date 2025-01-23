# Backend API Documentation

## Overview
This is the backend part of the fullstack application built with Node.js, Express.js, and MySQL. It provides authentication and authorization features.

## Setup Instructions

1. **Clone the repository**
   ```
   git clone <repository-url>
   cd my-fullstack-app/backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure the database**
   - Update the `dbConfig.js` file in the `src/config` directory with your MySQL database credentials.

4. **Run the application**
   ```
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/register**
  - Registers a new user.
  - Request body: `{ "username": "string", "password": "string" }`
  
- **POST /api/auth/login**
  - Authenticates a user and returns a JWT token.
  - Request body: `{ "username": "string", "password": "string" }`

## Middleware
- **authMiddleware.js**
  - Contains middleware for verifying JWT tokens.

## Controllers
- **authController.js**
  - Handles user registration and login logic.

## Models
- **userModel.js**
  - Defines the user schema and methods for interacting with the database.

## License
This project is licensed under the MIT License.