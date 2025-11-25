import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const applications = [
    {
      title: 'Todo List',
      description: 'Manage your daily tasks and to-do items',
      path: '/todos',
      icon: '✅',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Student Details',
      description: 'Manage student information and records',
      path: '/students',
      icon: '🎓',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Employee Details',
      description: 'Track employee data and information',
      path: '/employees',
      icon: '👔',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Library Management',
      description: 'Manage books, borrowing, and library inventory',
      path: '/library',
      icon: '📚',
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Inventory Management',
      description: 'Track products, stock levels, and suppliers',
      path: '/inventory',
      icon: '📦',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      title: 'E-commerce Products',
      description: 'Manage product catalog for online store',
      path: '/products',
      icon: '🛍️',
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Expense Tracker',
      description: 'Track and categorize your expenses',
      path: '/expenses',
      icon: '💰',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      title: 'Student Attendance',
      description: 'Record and track student attendance',
      path: '/attendance',
      icon: '📋',
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Feedback System',
      description: 'Collect and manage user feedback',
      path: '/feedback',
      icon: '💬',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Full-Stack CRUD Applications
        </h2>
        <p className="text-lg text-gray-600">
          A comprehensive collection of 9 full-stack applications built with React, Node.js, and MongoDB
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <Link
            key={app.path}
            to={app.path}
            className="group block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className={`bg-gradient-to-r ${app.color} p-6 text-white`}>
                <div className="text-5xl mb-2">{app.icon}</div>
                <h3 className="text-xl font-bold">{app.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 group-hover:text-gray-800 transition">
                  {app.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 font-medium">
                  <span>Open App</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Features</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Full CRUD operations (Create, Read, Update, Delete)</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>MongoDB database integration</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Modern React frontend with Tailwind CSS</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Express.js RESTful API backend</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Responsive design for all devices</span>
          </li>
          <li className="flex items-start">
            <span className="text-green-500 mr-2">✓</span>
            <span>Easy to run and deploy</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
