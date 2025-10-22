'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Client } from '@/types';

export default function ClientsAdmin() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: ''
  });

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      const response = await fetch('/api/clients');
      if (!response.ok) throw new Error('Failed to fetch clients');
      const data = await response.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load clients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({ name: '', logo: '' });
    setEditingId(null);
  }

  function handleEdit(client: Client) {
    setFormData({ name: client.name, logo: client.logo });
    setEditingId(client.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.logo) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const url = editingId ? `/api/clients/${editingId}` : '/api/clients';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save client');

      setSuccess(editingId ? 'Client updated!' : 'Client added!');
      resetForm();
      await fetchClients();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save client');
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');

      setSuccess('Client deleted!');
      await fetchClients();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete client');
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Clients</h1>
        {editingId && (
          <button onClick={resetForm} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
            Cancel Edit
          </button>
        )}
      </div>

      {error && <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      {success && <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">{success}</div>}

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? 'Edit Client' : 'Add New Client'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Client name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo <span className="text-red-500">*</span>
            </label>
            <ImageUploader
              label="Upload Client Logo"
              folder="clients"
              preview={formData.logo}
              onUpload={(url) => setFormData({ ...formData, logo: url })}
            />
          </div>

          <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            {editingId ? 'Update Client' : 'Add Client'}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Clients</h2>

        {loading ? (
          <p className="text-gray-600">Loading clients...</p>
        ) : clients.length === 0 ? (
          <p className="text-gray-600">No clients found. Add one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div key={client.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition p-6 flex flex-col items-center justify-center">
                {client.logo && (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-32 object-contain mb-4"
                  />
                )}
                <h3 className="font-bold text-lg text-gray-800 text-center mb-4">{client.name}</h3>
                <div className="flex gap-2 w-full">
                  <button
                    onClick={() => handleEdit(client)}
                    className="flex items-center gap-2 flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                  >
                    <AiOutlineEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="flex items-center gap-2 flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                  >
                    <AiOutlineDelete /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
