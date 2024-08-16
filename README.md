# Basic Login and Registration Backend

This repository provides a backend implementation for user authentication, including user registration, login, and session management. It uses Node.js, Express, PostgreSQL, and bcrypt for password security.

## Features

- **User Registration**: Allows users to create accounts with a name, email, and password.
- **User Login**: Authenticates users with their email and password.
- **Password Security**: Utilizes bcrypt to hash passwords before storing them.
- **Environment Variables**: Configuration managed via a `.env` file for better security and flexibility.
- **CORS Support**: Configured to allow cross-origin requests from a specified frontend.

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: bcrypt for password hashing
- **CORS**: Allows cross-origin requests from a specified frontend

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rizvi-Faiz/Basic-login-and-registration-backend.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Basic-login-and-registration-backend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root directory and add the following environment variables:
   ```env
   PORT=8000
   DB_USER=your_postgres_user
   DB_HOST=localhost
   DB_NAME=SampleWeb
   DB_PASSWORD=your_postgres_password
   DB_PORT=5432
   SALT_ROUNDS=10
   ```

5. **Initialize the PostgreSQL database:**
   - Create a PostgreSQL database named `SampleWeb`.
   - Create a `users` table with the following structure:
     ```sql
     CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100) UNIQUE,
       password VARCHAR(255)
     );
     ```

## API Endpoints

### User Registration

- **URL**: `/register`
- **Method**: `POST`
- **Body Parameters**:
  - `name`: string
  - `email`: string
  - `password`: string
- **Response**:
  - `output`: "Registration Successful" or error message
  - `status`: true or false

### User Login

- **URL**: `/login`
- **Method**: `POST`
- **Body Parameters**:
  - `email`: string
  - `password`: string
- **Response**:
  - `output`: "User Logged In", "Incorrect Password", or "User not found. Try Registering"
  - `status`: true or false

## Configuration

- **Port**: The server listens on the port specified in the `.env` file (default is 8000).
- **Database**: Connection settings are configured through environment variables in the `.env` file.
- **Password Hashing**: The number of salt rounds used for hashing passwords is specified in the `.env` file.

## Running the Server

Start the server with:

```bash
npm start
```

The server will be accessible at `http://localhost:8000`.

## Handling Submodule Changes (if applicable)

If you have a submodule, manage changes separately:

1. **Navigate to the Submodule Directory:**
   ```bash
   cd client
   ```

2. **Review and Commit Submodule Changes:**
   ```bash
   git status
   git add .
   git commit -m "Describe changes in the client submodule"
   ```

3. **Return to the Main Repository:**
   ```bash
   cd ..
   ```

4. **Stage and Commit Updated Submodule Reference:**
   ```bash
   git add client
   git commit -m "Updated submodule reference"
   ```

5. **Push Changes:**
   ```bash
   git push
   ```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## Contact

For any inquiries or issues, contact me at rizvifaiz1073@gmail.com.

---

Thank you for using this backend! If you found it helpful, please consider giving a ⭐ on the repository.
```
