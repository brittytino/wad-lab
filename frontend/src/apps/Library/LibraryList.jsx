import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/library';

export default function LibraryList() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ bookId: '', title: '', author: '', isbn: '', category: '', copies: 1, available: 1 });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchBooks(); }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
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
      setForm({ bookId: '', title: '', author: '', isbn: '', category: '', copies: 1, available: 1 });
      fetchBooks();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditId(book._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this book?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchBooks();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📚 Library Management</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Book' : 'Add New Book'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" required value={form.bookId} onChange={(e) => setForm({ ...form, bookId: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Book ID *" disabled={!!editId} />
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Title *" />
            <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Author" />
            <input type="text" value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" placeholder="ISBN" />
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Category" />
            <input type="number" value={form.copies} onChange={(e) => setForm({ ...form, copies: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Total Copies" />
            <input type="number" value={form.available} onChange={(e) => setForm({ ...form, available: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Available" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">{editId ? 'Update' : 'Add'} Book</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ bookId: '', title: '', author: '', isbn: '', category: '', copies: 1, available: 1 }); }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">All Books ({books.length})</h3>
        {books.length === 0 ? <p className="text-gray-500">No books found.</p> : (
          <div className="grid gap-4">
            {books.map((book) => (
              <div key={book._id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{book.title}</h4>
                    <p className="text-sm text-gray-600">by {book.author || 'Unknown'} | ID: {book.bookId}</p>
                    <p className="text-sm text-gray-500 mt-1">Category: {book.category || 'N/A'} | ISBN: {book.isbn || 'N/A'}</p>
                    <p className="text-sm text-gray-700 mt-2"><span className="font-medium">Copies:</span> {book.copies} | <span className="font-medium">Available:</span> {book.available}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(book)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => handleDelete(book._id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
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
