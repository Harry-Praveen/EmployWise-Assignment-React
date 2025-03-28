# EmployWise Assignment

This is a React application that integrates with the Reqres API to perform user management.

## Features
- User authentication (Login)
- User listing with pagination
- Edit and delete users
- Search and filter users 
- Responsive design using Bootstrap

## 🛠️ Installation & Setup

(1)Clone the repository:
    git clone https://github.com/Harry-Praveen/EmployWise-Assignment-React.git

(2)Navigate to the project directory:
    cd EmployWise-Assignment

(3) Install Dependencies:
    npm install

(4)Start the development server:
    npm start

(5)The application will run at http://localhost:3000/login

## Usage

Login Page: Enter the provided credentials and click "Login".

User List: Upon login, users are displayed with pagination.

Edit User: Click "Edit" on a user to modify details.

Delete User: Click "Delete" to remove a user.

## API Endpoints Used

Login: POST /api/login

Get Users: GET /api/users?page=1

Update User: PUT /api/users/{id}

Delete User: DELETE /api/users/{id}


## Assumptions & Considerations

The app does not store user passwords for security.

Token is stored in local storage for session management.

The Reqres API is a mock API, so updates and deletions are not permanent.


## Deployment

The application is deployed at: https://emplyze.onrender.com/

## Developer

Praveen Kumar

GitHub: https://github.com/Harry-Praveen
