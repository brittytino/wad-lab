import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/carrental';

export default function CarRentalList() {
  const [rentals, setRentals] = useState([]);
  const [form, setForm] = useState({ 
    bookingId: '', 
    customerName: '', 
    email: '',
    phone: '',
    carModel: '', 
    carType: 'Sedan',
    rentalDays: '',
    pricePerDay: '',
    startDate: '',
    status: 'Reserved'
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setRentals(res.data);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const totalCost = form.rentalDays * form.pricePerDay;
      const rentalData = { ...form, totalCost };
      
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, rentalData);
        setEditId(null);
      } else {
        await axios.post(API_URL, rentalData);
      }
      setForm({ bookingId: '', customerName: '', email: '', phone: '', carModel: '', carType: 'Sedan', rentalDays: '', pricePerDay: '', startDate: '', status: 'Reserved' });
      fetchRentals();
    } catch (error) {
      console.error('Error saving rental:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (rental) => {
    setForm({
      bookingId: rental.bookingId,
      customerName: rental.customerName,
      email: rental.email || '',
      phone: rental.phone || '',
      carModel: rental.carModel,
      carType: rental.carType || 'Sedan',
      rentalDays: rental.rentalDays || '',
      pricePerDay: rental.pricePerDay || '',
      startDate: rental.startDate?.substring(0, 10) || '',
      status: rental.status || 'Reserved'
    });
    setEditId(rental._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rental?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchRentals();
      } catch (error) {
        console.error('Error deleting rental:', error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Reserved': return 'bg-blue-100 text-blue-700';
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">🚗 Car Rental System</h1>
          <p className="text-slate-600">Manage car rental bookings</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {editId ? 'Edit Rental' : 'New Rental Booking'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Booking ID"
              value={form.bookingId}
              onChange={(e) => setForm({ ...form, bookingId: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Car Model"
              value={form.carModel}
              onChange={(e) => setForm({ ...form, carModel: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              required
            />
            <select
              value={form.carType}
              onChange={(e) => setForm({ ...form, carType: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
            >
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Economy">Economy</option>
              <option value="Van">Van</option>
            </select>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="number"
              placeholder="Rental Days"
              value={form.rentalDays}
              onChange={(e) => setForm({ ...form, rentalDays: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price Per Day"
              value={form.pricePerDay}
              onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
              required
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
            >
              <option value="Reserved">Reserved</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="lg:col-span-3 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                {editId ? 'Update Rental' : 'Add Rental'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ bookingId: '', customerName: '', email: '', phone: '', carModel: '', carType: 'Sedan', rentalDays: '', pricePerDay: '', startDate: '', status: 'Reserved' });
                  }}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Rentals Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentals.map((rental) => (
              <div key={rental._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{rental.carModel}</h3>
                      <p className="text-sm text-cyan-100">{rental.carType}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rental.status)}`}>
                      {rental.status}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="text-sm">
                    <p className="font-medium text-slate-700">Booking: {rental.bookingId}</p>
                    <p className="text-slate-600">Customer: {rental.customerName}</p>
                  </div>
                  <div className="text-sm text-slate-600">
                    <p>📧 {rental.email}</p>
                    <p>📞 {rental.phone}</p>
                  </div>
                  <div className="text-sm text-slate-600 pt-2 border-t">
                    <p>Start: {new Date(rental.startDate).toLocaleDateString()}</p>
                    <p>Duration: {rental.rentalDays} days</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs text-slate-500">${rental.pricePerDay}/day</span>
                    <span className="text-lg font-bold text-slate-800">${rental.totalCost}</span>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <button
                      onClick={() => handleEdit(rental)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(rental._id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && rentals.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500">No rentals found. Create your first booking!</p>
          </div>
        )}
      </div>
    </div>
  );
}
