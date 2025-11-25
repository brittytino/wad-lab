import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/restaurant';

export default function RestaurantList() {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ 
    orderNumber: '', 
    customerName: '', 
    tableNumber: '', 
    items: '', 
    totalAmount: '',
    status: 'Pending',
    notes: '' 
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
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
      setForm({ orderNumber: '', customerName: '', tableNumber: '', items: '', totalAmount: '', status: 'Pending', notes: '' });
      fetchOrders();
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (order) => {
    setForm({
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      tableNumber: order.tableNumber || '',
      items: order.items || '',
      totalAmount: order.totalAmount || '',
      status: order.status || 'Pending',
      notes: order.notes || ''
    });
    setEditId(order._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchOrders();
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Preparing': return 'bg-blue-100 text-blue-700';
      case 'Ready': return 'bg-green-100 text-green-700';
      case 'Served': return 'bg-purple-100 text-purple-700';
      case 'Completed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">🍽️ Restaurant Orders</h1>
          <p className="text-slate-600">Manage restaurant orders and table service</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {editId ? 'Edit Order' : 'New Order'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Order Number"
              value={form.orderNumber}
              onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Customer Name"
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Table Number"
              value={form.tableNumber}
              onChange={(e) => setForm({ ...form, tableNumber: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Total Amount"
              value={form.totalAmount}
              onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              required
            />
            <input
              type="text"
              placeholder="Items (comma separated)"
              value={form.items}
              onChange={(e) => setForm({ ...form, items: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
              required
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            >
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Ready">Ready</option>
              <option value="Served">Served</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Notes (Optional)"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition md:col-span-2"
            />
            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                {editId ? 'Update Order' : 'Add Order'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ orderNumber: '', customerName: '', tableNumber: '', items: '', totalAmount: '', status: 'Pending', notes: '' });
                  }}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Orders Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                      <p className="text-sm text-orange-100">Table {order.tableNumber}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-sm font-medium text-slate-700">Customer: {order.customerName}</p>
                    <p className="text-sm text-slate-600 mt-1">Items: {order.items}</p>
                    {order.notes && (
                      <p className="text-xs text-slate-500 mt-1 italic">Note: {order.notes}</p>
                    )}
                  </div>
                  <div className="flex justify-between items-center mb-3 pt-3 border-t">
                    <span className="text-lg font-bold text-slate-800">${order.totalAmount}</span>
                    <span className="text-xs text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(order)}
                      className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                  {order.status !== 'Completed' && (
                    <button
                      onClick={() => {
                        const statuses = ['Pending', 'Preparing', 'Ready', 'Served', 'Completed'];
                        const currentIndex = statuses.indexOf(order.status);
                        if (currentIndex < statuses.length - 1) {
                          updateStatus(order._id, statuses[currentIndex + 1]);
                        }
                      }}
                      className="w-full mt-2 bg-green-50 hover:bg-green-100 text-green-600 py-2 rounded-lg transition text-sm font-medium"
                    >
                      Next Status
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500">No orders found. Create your first order!</p>
          </div>
        )}
      </div>
    </div>
  );
}
