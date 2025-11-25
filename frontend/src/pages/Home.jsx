import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const applications = [
    { title: 'Todo List', description: 'Manage your daily tasks and to-do items', path: '/todos', icon: '✅', color: 'from-blue-500 to-blue-600' },
    { title: 'Student Management', description: 'Manage student information and records', path: '/students', icon: '🎓', color: 'from-green-500 to-emerald-600' },
    { title: 'Employee Management', description: 'Track employee data and information', path: '/employees', icon: '👔', color: 'from-purple-500 to-purple-600' },
    { title: 'Library Management', description: 'Manage books, borrowing, and library inventory', path: '/library', icon: '📚', color: 'from-red-500 to-red-600' },
    { title: 'Online Store', description: 'Manage product catalog for online store', path: '/products', icon: '🛍️', color: 'from-pink-500 to-pink-600' },
    { title: 'Event Registration', description: 'Manage and register for events', path: '/events', icon: '🎉', color: 'from-indigo-500 to-purple-600' },
    { title: 'Inventory Management', description: 'Track products, stock levels, and suppliers', path: '/inventory', icon: '📦', color: 'from-yellow-500 to-yellow-600' },
    { title: 'Customer Feedback', description: 'Collect and manage user feedback', path: '/feedback', icon: '💬', color: 'from-orange-500 to-orange-600' },
    { title: 'Bookstore Management', description: 'Manage bookstore inventory and sales', path: '/bookstore', icon: '📖', color: 'from-amber-500 to-orange-600' },
    { title: 'Grade Tracker', description: 'Track and manage student grades', path: '/grades', icon: '📊', color: 'from-blue-500 to-indigo-600' },
    { title: 'Contact Management', description: 'Organize and manage your contacts', path: '/contacts', icon: '📇', color: 'from-teal-500 to-cyan-600' },
    { title: 'Expense Tracker', description: 'Track and categorize your expenses', path: '/expenses', icon: '💰', color: 'from-green-500 to-emerald-600' },
    { title: 'Restaurant Orders', description: 'Manage restaurant orders and table service', path: '/restaurant', icon: '🍽️', color: 'from-orange-500 to-red-600' },
    { title: 'Car Rental System', description: 'Manage car rental bookings', path: '/carrental', icon: '🚗', color: 'from-cyan-500 to-blue-600' },
    { title: 'Job Portal', description: 'Post and manage job openings', path: '/jobs', icon: '💼', color: 'from-purple-500 to-pink-600' },
    { title: 'User Management', description: 'Sign up and manage user accounts', path: '/users', icon: '👤', color: 'from-violet-500 to-purple-600' },
    { title: 'Student Attendance', description: 'Record and track student attendance', path: '/attendance', icon: '📋', color: 'from-slate-500 to-slate-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold">
              17 Management Systems
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Management Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive suite of full-stack management applications
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {applications.map((app) => (
            <Link key={app.path} to={app.path} className="group block transform hover:-translate-y-1 transition-all">
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-100 h-full">
                <div className={`bg-gradient-to-br ${app.color} p-6 text-white`}>
                  <div className="text-4xl mb-3">{app.icon}</div>
                  <h3 className="text-lg font-bold">{app.title}</h3>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold text-sm">
                    <span>Launch App</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
