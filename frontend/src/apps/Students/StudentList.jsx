import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ rollNumber: '', name: '', email: '', phone: '', course: '', year: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
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
      setForm({ rollNumber: '', name: '', email: '', phone: '', course: '', year: '' });
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (student) => {
    setForm({
      rollNumber: student.rollNumber,
      name: student.name,
      email: student.email || '',
      phone: student.phone || '',
      course: student.course || '',
      year: student.year || ''
    });
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🎓 Student Details</h2>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Student' : 'Add New Student'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
              <input
                type="text"
                required
                value={form.rollNumber}
                onChange={(e) => setForm({ ...form, rollNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., ST001"
                disabled={!!editId}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="student@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="1234567890"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
              <input
                type="text"
                value={form.course}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 2024"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              {editId ? 'Update' : 'Add'} Student
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setForm({ rollNumber: '', name: '', email: '', phone: '', course: '', year: '' });
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
        <h3 className="text-xl font-semibold mb-4">All Students ({students.length})</h3>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-500">No students found. Add your first student above!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Roll No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Year</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.rollNumber}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.email || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.phone || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.course || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{student.year || '-'}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(student)}
                          className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
