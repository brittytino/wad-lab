import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

// Import all apps
import TodoList from './apps/Todo/TodoList';
import StudentList from './apps/Students/StudentList';
import EmployeeList from './apps/Employees/EmployeeList';
import LibraryList from './apps/Library/LibraryList';
import InventoryList from './apps/Inventory/InventoryList';
import ProductList from './apps/Products/ProductList';
import ExpenseList from './apps/Expenses/ExpenseList';
import AttendanceList from './apps/Attendance/AttendanceList';
import FeedbackList from './apps/Feedback/FeedbackList';
import EventList from './apps/Events/EventList';
import BookstoreList from './apps/Bookstore/BookstoreList';
import GradeList from './apps/Grades/GradeList';
import ContactList from './apps/Contacts/ContactList';
import RestaurantList from './apps/Restaurant/RestaurantList';
import CarRentalList from './apps/CarRental/CarRentalList';
import JobPortalList from './apps/JobPortal/JobPortalList';
import UserList from './apps/Users/UserList';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Main Content */}
      <main>
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
          <Route path="/events" element={<EventList />} />
          <Route path="/bookstore" element={<BookstoreList />} />
          <Route path="/grades" element={<GradeList />} />
          <Route path="/contacts" element={<ContactList />} />
          <Route path="/restaurant" element={<RestaurantList />} />
          <Route path="/carrental" element={<CarRentalList />} />
          <Route path="/jobs" element={<JobPortalList />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </main>
    </div>
  );
}
