import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/events';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ 
    eventId: '', 
    eventName: '', 
    date: '', 
    venue: '', 
    capacity: '', 
    registered: 0,
    description: '' 
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
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
      setForm({ eventId: '', eventName: '', date: '', venue: '', capacity: '', registered: 0, description: '' });
      fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (event) => {
    setForm({
      eventId: event.eventId,
      eventName: event.eventName,
      date: event.date?.substring(0, 10) || '',
      venue: event.venue || '',
      capacity: event.capacity || '',
      registered: event.registered || 0,
      description: event.description || ''
    });
    setEditId(event._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleRegister = async (id, currentRegistered, capacity) => {
    if (currentRegistered >= capacity) {
      alert('Event is full!');
      return;
    }
    try {
      await axios.put(`${API_URL}/${id}`, { registered: currentRegistered + 1 });
      fetchEvents();
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Event Registration</h1>
          <p className="text-slate-600">Manage and register for events</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {editId ? 'Edit Event' : 'Create New Event'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Event ID"
              value={form.eventId}
              onChange={(e) => setForm({ ...form, eventId: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Event Name"
              value={form.eventName}
              onChange={(e) => setForm({ ...form, eventName: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Venue"
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="number"
              placeholder="Capacity"
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
            />
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                {editId ? 'Update Event' : 'Add Event'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ eventId: '', eventName: '', date: '', venue: '', capacity: '', registered: 0, description: '' });
                  }}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Events List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
                  <h3 className="font-semibold text-lg">{event.eventName}</h3>
                  <p className="text-sm text-indigo-100">ID: {event.eventId}</p>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="font-medium mr-2">📅 Date:</span>
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="font-medium mr-2">📍 Venue:</span>
                    {event.venue}
                  </div>
                  <div className="flex items-center text-sm text-slate-600">
                    <span className="font-medium mr-2">👥 Capacity:</span>
                    {event.registered || 0} / {event.capacity}
                  </div>
                  {event.description && (
                    <p className="text-sm text-slate-500 pt-2 border-t">{event.description}</p>
                  )}
                  <div className="flex gap-2 pt-3">
                    <button
                      onClick={() => handleRegister(event._id, event.registered || 0, event.capacity)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition"
                      disabled={event.registered >= event.capacity}
                    >
                      {event.registered >= event.capacity ? 'Full' : 'Register'}
                    </button>
                    <button
                      onClick={() => handleEdit(event)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-lg transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500">No events found. Create your first event!</p>
          </div>
        )}
      </div>
    </div>
  );
}
