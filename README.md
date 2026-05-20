# Issue Tracker - Full Stack MERN Application

A comprehensive issue tracking system built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, issue management, and advanced filtering capabilities.

## 🚀 Features

- **User Authentication**: Secure sign up and login with JWT tokens
- **Issue Management**: Create, read, update, and delete issues
- **Advanced Filtering**: Search and filter issues by title, status, priority, and severity
- **Real-time Search**: Debounced search for optimized performance
- **Status Tracking**: Visual dashboard with issue status counts
- **Toast Notifications**: User-friendly notifications for all actions
- **Responsive Design**: Beautiful UI built with Tailwind CSS
- **Protected Routes**: Secure pages with authentication middleware
- **Pagination**: Efficient data display with pagination

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (local or Atlas account)
- npm or yarn package manager

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Fast build tool
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Toastify** - Toast notifications

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Newop_Assignment
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# Add the following environment variables:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Start the backend server
npm start
# Or for development with auto-reload
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/issuetracker
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/issuetracker
JWT_SECRET=your_super_secret_jwt_key_here
```

### Frontend
The frontend is configured to connect to `http://localhost:5000/api` by default. If your backend runs on a different port, update the `baseURL` in `frontend/src/api/axiosClient.ts`.

## 🚀 Usage

1. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - Sign up for a new account or sign in
   - Start managing your issues!

## 📱 Application Features

### Authentication
- **Sign Up**: Create a new account with name, email, and password
- **Sign In**: Log in with email and password
- **Auto-redirect**: Automatic redirection based on authentication status
- **Secure logout**: Clear session and redirect to login

### Issue Management
- **Create Issues**: Add new issues with title, description, status, priority, and severity
- **View All Issues**: See all issues in the system
- **My Issues**: View only issues created by you
- **Update Issues**: Edit existing issues (only your own)
- **Delete Issues**: Remove issues (only your own)
- **View Details**: See full issue information in a modal

### Filtering & Search
- **Search**: Real-time search by title or description (debounced for performance)
- **Status Filter**: Filter by Open, In Progress, Resolved, or Closed
- **Priority Filter**: Filter by Low, Medium, High, or Critical
- **Severity Filter**: Filter by Minor, Moderate, Major, or Critical
- **Clear Filters**: Quick button to reset all filters

### Dashboard
- Visual status cards showing counts for:
  - Total Issues
  - Open Issues
  - In Progress Issues
  - Resolved Issues
  - Closed Issues

## 📂 Project Structure

```
Newop_Assignment/
├── backend/
│   ├── controller/
│   │   ├── Issue-controller.js    # Issue CRUD operations
│   │   └── user-controller.js     # User authentication
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── Issue.js               # Issue schema
│   │   └── User.js                # User schema
│   ├── routes/
│   │   ├── issue-route.js         # Issue routes
│   │   └── user-route.js          # Auth routes
│   ├── server.js                  # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   ├── auth-api.ts        # Auth API calls
    │   │   ├── Issue-api.ts       # Issue API calls
    │   │   └── axiosClient.ts     # Axios configuration
    │   ├── components/
    │   │   ├── Auth/
    │   │   │   ├── SignIn.tsx     # Login component
    │   │   │   └── SignUp.tsx     # Registration component
    │   │   ├── CreateIssue.tsx    # Create issue modal
    │   │   ├── UpdateIssue.tsx    # Update issue modal
    │   │   ├── ViewIssue.tsx      # View issue modal
    │   │   ├── Navbar.tsx         # Navigation bar
    │   │   ├── Pagination.tsx     # Pagination component
    │   │   ├── ProtectedRoute.tsx # Auth guard
    │   │   └── PublicRoute.tsx    # Public route guard
    │   ├── pages/
    │   │   ├── AllIssues.tsx      # All issues page
    │   │   ├── MyIssues.tsx       # User's issues page
    │   │   └── Hero.tsx           # Landing page
    │   ├── store/
    │   │   ├── authSlice.js       # Auth state
    │   │   └── store.js           # Redux store
    │   ├── App.tsx                # Main app component
    │   └── main.tsx               # App entry point
    └── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Issues
- `GET /api/issues` - Get all issues
- `GET /api/issues/:id` - Get single issue
- `GET /api/issues/user/my-issues` - Get user's issues
- `POST /api/issues/create` - Create new issue
- `PUT /api/issues/update/:id` - Update issue
- `DELETE /api/issues/delete/:id` - Delete issue
