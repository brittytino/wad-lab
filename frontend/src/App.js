import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';

// Todo App
import TodoList from './apps/Todo/TodoList';

// Student App
import StudentList from './apps/Students/StudentList';

// Employee App
import EmployeeList from './apps/Employees/EmployeeList';

// Library App
import LibraryList from './apps/Library/LibraryList';

// Inventory App
import InventoryList from './apps/Inventory/InventoryList';

// E-commerce App
import ProductList from './apps/Products/ProductList';

// Expense Tracker
import ExpenseList from './apps/Expenses/ExpenseList';

// Attendance System
import AttendanceList from './apps/Attendance/AttendanceList';

// Feedback System
import FeedbackList from './apps/Feedback/FeedbackList';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const apps = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Todo List', path: '/todos', icon: '✅' },
    { name: 'Students', path: '/students', icon: '🎓' },
    { name: 'Employees', path: '/employees', icon: '👔' },
    { name: 'Library', path: '/library', icon: '📚' },
    { name: 'Inventory', path: '/inventory', icon: '📦' },
    { name: 'Products', path: '/products', icon: '🛍️' },
    { name: 'Expenses', path: '/expenses', icon: '💰' },
    { name: 'Attendance', path: '/attendance', icon: '📋' },
    { name: 'Feedback', path: '/feedback', icon: '💬' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Full-Stack CRUD Apps</h1>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded hover:bg-blue-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className={`${menuOpen ? 'block' : 'hidden'} md:block mt-4`}>
            <div className="flex flex-wrap gap-2">
              {apps.map((app) => (
                <Link
                  key={app.path}
                  to={app.path}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 transition text-sm font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="mr-2">{app.icon}</span>
                  {app.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/library" element={<LibraryList />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/attendance" element={<AttendanceList />} />
          <Route path="/feedback" element={<FeedbackList />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">© 2024 Full-Stack CRUD Applications | Built with React, Node.js & MongoDB</p>
        </div>
      </footer>
    </div>
  );
}
