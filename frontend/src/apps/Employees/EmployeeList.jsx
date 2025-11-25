import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/employees';

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employeeId: '', name: '', email: '', phone: '', department: '', position: '', salary: '', joinDate: '' });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setEmployees(res.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
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
      setForm({ employeeId: '', name: '', email: '', phone: '', department: '', position: '', salary: '', joinDate: '' });
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (employee) => {
    setForm({
      employeeId: employee.employeeId,
      name: employee.name,
      email: employee.email || '',
      phone: employee.phone || '',
      department: employee.department || '',
      position: employee.position || '',
      salary: employee.salary || '',
      joinDate: employee.joinDate ? employee.joinDate.split('T')[0] : ''
    });
    setEditId(employee._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">👔 Employee Details</h2>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Employee' : 'Add New Employee'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
              <input type="text" required value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., EMP001" disabled={!!editId} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="Enter employee name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="1234567890" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input type="text" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., IT" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input type="text" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="e.g., Software Engineer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
              <input type="number" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" placeholder="50000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
              <input type="date" value={form.joinDate} onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              {editId ? 'Update' : 'Add'} Employee
            </button>
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setForm({ employeeId: '', name: '', email: '', phone: '', department: '', position: '', salary: '', joinDate: '' }); }}
                className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">Cancel</button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">All Employees ({employees.length})</h3>
        {loading ? <p className="text-gray-500">Loading...</p> : employees.length === 0 ? (
          <p className="text-gray-500">No employees found. Add your first employee above!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Position</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Salary</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {employees.map((emp) => (
                  <tr key={emp._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{emp.employeeId}</td>
                    <td className="px-4 py-3 text-sm">{emp.name}</td>
                    <td className="px-4 py-3 text-sm">{emp.department || '-'}</td>
                    <td className="px-4 py-3 text-sm">{emp.position || '-'}</td>
                    <td className="px-4 py-3 text-sm">{emp.salary ? `$${emp.salary}` : '-'}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(emp)} className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={() => handleDelete(emp._id)} className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
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
