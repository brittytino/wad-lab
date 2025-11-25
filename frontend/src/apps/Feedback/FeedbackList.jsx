import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/feedback';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', rating: 5 });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchFeedbacks(); }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(API_URL);
      setFeedbacks(res.data);
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
      setForm({ name: '', email: '', subject: '', message: '', rating: 5 });
      fetchFeedbacks();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const avgRating = feedbacks.length > 0 ? (feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) / feedbacks.length).toFixed(1) : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">💬 Feedback System</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold">Total Feedbacks</h3>
          <p className="text-4xl font-bold">{feedbacks.length}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold">Average Rating</h3>
          <p className="text-4xl font-bold">⭐ {avgRating}/5</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Feedback' : 'Submit Feedback'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Your Name" />
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500" placeholder="Your Email" />
            <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 md:col-span-2" placeholder="Subject" />
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 md:col-span-2" placeholder="Your Message *" rows="4" />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm({ ...form, rating: star })}
                    className={`text-3xl ${star <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">{editId ? 'Update' : 'Submit'} Feedback</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: '', email: '', subject: '', message: '', rating: 5 }); }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">All Feedbacks ({feedbacks.length})</h3>
        {feedbacks.length === 0 ? <p className="text-gray-500">No feedbacks yet.</p> : (
          <div className="space-y-4">
            {feedbacks.map((feedback) => (
              <div key={feedback._id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{feedback.subject || 'No Subject'}</h4>
                    <p className="text-sm text-gray-600">{feedback.name || 'Anonymous'} {feedback.email && `(${feedback.email})`}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-lg ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{feedback.message}</p>
                <p className="text-xs text-gray-400">{new Date(feedback.createdAt).toLocaleString()}</p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => { setForm(feedback); setEditId(feedback._id); }} 
                    className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                  <button onClick={async () => { if (window.confirm('Delete?')) { await axios.delete(`${API_URL}/${feedback._id}`); fetchFeedbacks(); }}}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
