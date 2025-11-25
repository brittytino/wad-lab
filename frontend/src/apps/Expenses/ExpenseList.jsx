import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses';

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(API_URL);
      setExpenses(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ title: '', amount: '', category: '', date: '', description: '' });
      fetchExpenses();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">💰 Expense Tracker</h2>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold">Total Expenses</h3>
        <p className="text-4xl font-bold">${totalExpenses.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Expense' : 'Add New Expense'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Expense Title *" />
            <input type="number" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Amount *" />
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" placeholder="Category (e.g., Food, Transport)" />
            <input type="date" value={form.date ? form.date.split('T')[0] : ''} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 md:col-span-2" placeholder="Description" rows="2" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">{editId ? 'Update' : 'Add'} Expense</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', amount: '', category: '', date: '', description: '' }); }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">All Expenses ({expenses.length})</h3>
        {expenses.length === 0 ? <p className="text-gray-500">No expenses found.</p> : (
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div key={expense._id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{expense.title}</h4>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                    <p className="text-sm text-gray-500 mt-1">Category: {expense.category || 'N/A'} | Date: {new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">${expense.amount}</p>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => { setForm({ ...expense, date: expense.date.split('T')[0] }); setEditId(expense._id); }} 
                        className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                      <button onClick={async () => { if (window.confirm('Delete?')) { await axios.delete(`${API_URL}/${expense._id}`); fetchExpenses(); }}}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
