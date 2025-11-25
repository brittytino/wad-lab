import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/attendance';

export default function AttendanceList() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ studentRoll: '', studentName: '', date: '', status: 'Present', subject: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchRecords(); }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(API_URL);
      setRecords(res.data);
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
      setForm({ studentRoll: '', studentName: '', date: '', status: 'Present', subject: '' });
      fetchRecords();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📋 Student Attendance System</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Record' : 'Mark Attendance'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" required value={form.studentRoll} onChange={(e) => setForm({ ...form, studentRoll: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="Student Roll Number *" />
            <input type="text" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="Student Name" />
            <input type="date" required value={form.date ? form.date.split('T')[0] : ''} onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500">
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>
            <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 md:col-span-2" placeholder="Subject (optional)" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">{editId ? 'Update' : 'Mark'} Attendance</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ studentRoll: '', studentName: '', date: '', status: 'Present', subject: '' }); }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Attendance Records ({records.length})</h3>
        {records.length === 0 ? <p className="text-gray-500">No records found.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Roll No</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Subject</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {records.map((record) => (
                  <tr key={record._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{record.studentRoll}</td>
                    <td className="px-4 py-3 text-sm">{record.studentName || '-'}</td>
                    <td className="px-4 py-3 text-sm">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        record.status === 'Present' ? 'bg-green-100 text-green-800' : 
                        record.status === 'Absent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>{record.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">{record.subject || '-'}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => { setForm({ ...record, date: record.date.split('T')[0] }); setEditId(record._id); }} 
                          className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={async () => { if (window.confirm('Delete?')) { await axios.delete(`${API_URL}/${record._id}`); fetchRecords(); }}}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
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
