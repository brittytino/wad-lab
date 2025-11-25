# Full-Stack CRUD Applications

A comprehensive collection of **9 full-stack CRUD applications** built with **React**, **Node.js**, **Express**, and **MongoDB**. All applications are integrated into a single repository with a unified backend and beautiful Tailwind CSS styling.

## 🚀 Applications Included

1. **✅ Todo List** - Manage daily tasks and to-do items
2. **🎓 Student Details** - Student information management system
3. **👔 Employee Details** - Employee records and data management
4. **📚 Library Management** - Book inventory and library system
5. **📦 Inventory Management** - Product stock and supplier tracking
6. **🛍️ E-commerce Products** - Product catalog for online store
7. **💰 Expense Tracker** - Track and categorize expenses
8. **📋 Student Attendance** - Attendance recording system
9. **💬 Feedback System** - Collect and manage user feedback

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **MongoDB Compass** (Optional, for GUI) - [Download](https://www.mongodb.com/products/compass)

## 🛠️ Installation

### 1. Clone the Repository

```bash
cd /path/to/your/project
# Or download and extract the project
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Setup MongoDB

**Option A: Using MongoDB Compass**
1. Open MongoDB Compass
2. Connect to `mongodb://127.0.0.1:27017`
3. The database `fullstack_crud_apps` will be created automatically when you run the backend

**Option B: Using MongoDB CLI**
```bash
# Start MongoDB service
# On Windows:
net start MongoDB

# On Mac/Linux:
sudo systemctl start mongod
```

### 5. Configure Environment Variables (Optional)

The backend already has default settings, but you can customize them:

Edit `backend/.env` if needed:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fullstack_crud_apps
```

## ▶️ Running the Application

You need to run **both** backend and frontend servers.

### Method 1: Run Both Servers (Recommended)

Open **TWO** terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### Method 2: Using npm scripts (if configured)

```bash
# Run backend in development mode with nodemon
cd backend
npm run dev

# Run frontend (in another terminal)
cd frontend
npm start
```

## 🌐 Accessing the Application

Once both servers are running:

1. **Frontend:** http://localhost:3000
2. **Backend API:** http://localhost:5000
3. **MongoDB:** mongodb://127.0.0.1:27017

## 📱 Usage

### Navigation

- Click on any application card on the home page to access that application
- Use the top navigation bar to switch between applications
- Each application has full CRUD functionality (Create, Read, Update, Delete)

### Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Changes are immediately reflected
- **Form Validation**: Required fields are validated before submission
- **User-Friendly**: Clear error messages and success notifications
- **Modern UI**: Built with Tailwind CSS for a beautiful interface

## 🗂️ Project Structure

```
smp1/
├── backend/
│   ├── .env                 # Environment variables
│   ├── .env.example         # Example environment file
│   ├── package.json         # Backend dependencies
│   └── server.js            # Main backend server with all APIs
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── apps/            # Application components
│   │   │   ├── Todo/
│   │   │   ├── Students/
│   │   │   ├── Employees/
│   │   │   ├── Library/
│   │   │   ├── Inventory/
│   │   │   ├── Products/
│   │   │   ├── Expenses/
│   │   │   ├── Attendance/
│   │   │   └── Feedback/
│   │   ├── pages/
│   │   │   └── Home.jsx     # Home page with app cards
│   │   ├── App.js           # Main app with routing
│   │   ├── index.js         # Entry point
│   │   └── index.css        # Tailwind CSS
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind configuration
│   └── postcss.config.js    # PostCSS configuration
│
└── README.md                # This file
```

## 🔧 API Endpoints

All APIs are available at `http://localhost:5000/api/`

### Todo API
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

### Students API
- `GET /api/students` - Get all students
- `POST /api/students` - Create a student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Employees API
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create an employee
- `PUT /api/employees/:id` - Update an employee
- `DELETE /api/employees/:id` - Delete an employee

### Library API
- `GET /api/library` - Get all books
- `POST /api/library` - Add a book
- `PUT /api/library/:id` - Update a book
- `DELETE /api/library/:id` - Delete a book

### Inventory API
- `GET /api/inventory` - Get all items
- `POST /api/inventory` - Add an item
- `PUT /api/inventory/:id` - Update an item
- `DELETE /api/inventory/:id` - Delete an item

### Products API
- `GET /api/products` - Get all products
- `POST /api/products` - Add a product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Expenses API
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add an expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense

### Attendance API
- `GET /api/attendance` - Get all records
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update a record
- `DELETE /api/attendance/:id` - Delete a record

### Feedback API
- `GET /api/feedback` - Get all feedback
- `POST /api/feedback` - Submit feedback
- `PUT /api/feedback/:id` - Update feedback
- `DELETE /api/feedback/:id` - Delete feedback

## 🐛 Troubleshooting

### Backend won't start
- **Check MongoDB**: Make sure MongoDB is running
- **Check Port**: Port 5000 might be in use. Change it in `backend/.env`
- **Install Dependencies**: Run `npm install` in the backend folder

### Frontend won't start
- **Check Port**: Port 3000 might be in use
- **Install Dependencies**: Run `npm install` in the frontend folder
- **Clear Cache**: Delete `node_modules` and run `npm install` again

### Connection Errors
- **Backend not running**: Make sure backend is running on port 5000
- **CORS Issues**: The backend is already configured for CORS, but check if you modified it
- **MongoDB Connection**: Verify MongoDB is running and accessible at `mongodb://127.0.0.1:27017`

### Data not showing
- **Check Console**: Open browser DevTools (F12) and check for errors
- **Check Network**: Verify API calls are successful in the Network tab
- **Database**: Use MongoDB Compass to check if data exists in the database

## 📝 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Scripts** - Create React App tooling

## 🤝 Contributing

This is a learning project. Feel free to:
- Add new features
- Improve the UI
- Fix bugs
- Add more applications

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Support

If you encounter any issues:
1. Check the Troubleshooting section above
2. Verify all prerequisites are installed
3. Make sure both servers are running
4. Check the console for error messages

## 🎯 Quick Start Summary

```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2. Start MongoDB (if not running)
# Use MongoDB Compass or CLI

# 3. Start backend (Terminal 1)
cd backend
npm start

# 4. Start frontend (Terminal 2)
cd frontend
npm start

# 5. Open browser
# http://localhost:3000
```

---

**Happy Coding! 🚀**
