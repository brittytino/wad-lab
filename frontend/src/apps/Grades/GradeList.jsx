import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/grades';

export default function GradeList() {
  const [grades, setGrades] = useState([]);
  const [form, setForm] = useState({ 
    studentRoll: '', 
    studentName: '', 
    subject: '', 
    marks: '', 
    maxMarks: 100,
    semester: '',
    examType: 'Midterm'
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGrades();
  }, []);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setGrades(res.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const gradeData = {
        ...form,
        percentage: (form.marks / form.maxMarks) * 100,
        grade: calculateGrade((form.marks / form.maxMarks) * 100)
      };
      
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, gradeData);
        setEditId(null);
      } else {
        await axios.post(API_URL, gradeData);
      }
      setForm({ studentRoll: '', studentName: '', subject: '', marks: '', maxMarks: 100, semester: '', examType: 'Midterm' });
      fetchGrades();
    } catch (error) {
      console.error('Error saving grade:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  const handleEdit = (grade) => {
    setForm({
      studentRoll: grade.studentRoll,
      studentName: grade.studentName,
      subject: grade.subject || '',
      marks: grade.marks || '',
      maxMarks: grade.maxMarks || 100,
      semester: grade.semester || '',
      examType: grade.examType || 'Midterm'
    });
    setEditId(grade._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchGrades();
      } catch (error) {
        console.error('Error deleting grade:', error);
      }
    }
  };

  const getGradeColor = (grade) => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-100 text-green-700';
    if (grade === 'B+' || grade === 'B') return 'bg-blue-100 text-blue-700';
    if (grade === 'C') return 'bg-yellow-100 text-yellow-700';
    if (grade === 'D') return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">📊 Grade Tracker</h1>
          <p className="text-slate-600">Track and manage student grades</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {editId ? 'Edit Grade' : 'Add New Grade'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Student Roll Number"
              value={form.studentRoll}
              onChange={(e) => setForm({ ...form, studentRoll: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Student Name"
              value={form.studentName}
              onChange={(e) => setForm({ ...form, studentName: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
            <select
              value={form.examType}
              onChange={(e) => setForm({ ...form, examType: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            >
              <option value="Midterm">Midterm</option>
              <option value="Final">Final</option>
              <option value="Quiz">Quiz</option>
              <option value="Assignment">Assignment</option>
            </select>
            <input
              type="number"
              placeholder="Marks Obtained"
              value={form.marks}
              onChange={(e) => setForm({ ...form, marks: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="number"
              placeholder="Maximum Marks"
              value={form.maxMarks}
              onChange={(e) => setForm({ ...form, maxMarks: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Semester (e.g., Fall 2024)"
              value={form.semester}
              onChange={(e) => setForm({ ...form, semester: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                {editId ? 'Update Grade' : 'Add Grade'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ studentRoll: '', studentName: '', subject: '', marks: '', maxMarks: 100, semester: '', examType: 'Midterm' });
                  }}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Grades Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Roll No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Exam Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Marks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Percentage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Semester</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {grades.map((grade) => (
                    <tr key={grade._id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{grade.studentRoll}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{grade.studentName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{grade.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{grade.examType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{grade.marks}/{grade.maxMarks}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{grade.percentage?.toFixed(2)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getGradeColor(grade.grade)}`}>
                          {grade.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{grade.semester}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleEdit(grade)}
                          className="text-blue-600 hover:text-blue-800 mr-3 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(grade._id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {grades.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">No grades found. Add your first grade entry!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
