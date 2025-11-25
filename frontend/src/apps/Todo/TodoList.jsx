import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', completed: false });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
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
      setForm({ title: '', description: '', completed: false });
      fetchTodos();
    } catch (error) {
      console.error('Error saving todo:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (todo) => {
    setForm({ title: todo.title, description: todo.description || '', completed: todo.completed });
    setEditId(todo._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };

  const toggleComplete = async (todo) => {
    try {
      await axios.put(`${API_URL}/${todo._id}`, { ...todo, completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">✅ Todo List</h2>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Todo' : 'Add New Todo'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter todo title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter description (optional)"
              rows="3"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {editId ? 'Update' : 'Add'} Todo
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({ title: '', description: '', completed: false });
                }}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">All Todos ({todos.length})</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-gray-500">No todos found. Add your first todo above!</p>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo)}
                      className="mt-1 mr-3 h-5 w-5 text-blue-600 cursor-pointer"
                    />
                    <div className="flex-1">
                      <h4 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {todo.title}
                      </h4>
                      {todo.description && (
                        <p className={`text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                          {todo.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(todo.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
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
