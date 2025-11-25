import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ productCode: '', name: '', description: '', price: '', category: '', stock: 0, imageUrl: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
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
      setForm({ productCode: '', name: '', description: '', price: '', category: '', stock: 0, imageUrl: '' });
      fetchProducts();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">🛍️ E-commerce Products</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">{editId ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" required value={form.productCode} onChange={(e) => setForm({ ...form, productCode: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="Product Code *" disabled={!!editId} />
            <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="Product Name *" />
            <input type="number" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="Price *" />
            <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="Stock Quantity" />
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="Category" />
            <input type="url" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500" placeholder="Image URL" />
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 md:col-span-2" placeholder="Description" rows="2" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">{editId ? 'Update' : 'Add'} Product</button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ productCode: '', name: '', description: '', price: '', category: '', stock: 0, imageUrl: '' }); }}
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">All Products ({products.length})</h3>
        {products.length === 0 ? <p className="text-gray-500">No products found.</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                  <p className="text-xl font-bold text-pink-600 mb-2">${product.price}</p>
                  <p className="text-sm text-gray-500">Code: {product.productCode} | Stock: {product.stock}</p>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => { setForm(product); setEditId(product._id); }} 
                      className="flex-1 px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={async () => { if (window.confirm('Delete?')) { await axios.delete(`${API_URL}/${product._id}`); fetchProducts(); }}}
                      className="flex-1 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
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
