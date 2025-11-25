import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/inventory';

export default function InventoryList() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ productId: '', name: '', category: '', quantity: 0, price: '', supplier: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
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
      setForm({ productId: '', name: '', category: '', quantity: 0, price: '', supplier: '' });
      fetchItems();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this item?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchItems();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📦 Inventory Management</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Item' : 'Add New Item'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" required value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Product ID *" disabled={!!editId} />
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Product Name *" />
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Category" />
            <input type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Quantity" />
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Price" />
            <input type="text" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500" placeholder="Supplier" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">{editId ? 'Update' : 'Add'} Item</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ productId: '', name: '', category: '', quantity: 0, price: '', supplier: '' }); }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">All Items ({items.length})</h3>
        {items.length === 0 ? <p className="text-gray-500">No items found.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Product ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{item.productId}</td>
                    <td className="px-4 py-3 text-sm">{item.name}</td>
                    <td className="px-4 py-3 text-sm">{item.category || '-'}</td>
                    <td className="px-4 py-3 text-sm">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm">${item.price || 0}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="px-3 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                        <button onClick={() => handleDelete(item._id)} className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
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
