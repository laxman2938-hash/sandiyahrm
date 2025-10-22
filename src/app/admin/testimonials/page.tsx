'use client';

import { useEffect, useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Testimonial } from '@/types';

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    photo: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  async function fetchTestimonials() {
    try {
      setLoading(true);
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load testimonials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({ name: '', position: '', photo: '', description: '' });
    setEditingId(null);
  }

  function handleEdit(testimonial: Testimonial) {
    setFormData({
      name: testimonial.name,
      position: testimonial.position,
      photo: testimonial.photo || '',
      description: testimonial.description || ''
    });
    setEditingId(testimonial.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.position) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save testimonial');

      setSuccess(editingId ? 'Testimonial updated!' : 'Testimonial added!');
      resetForm();
      await fetchTestimonials();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save testimonial');
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');

      setSuccess('Testimonial deleted!');
      await fetchTestimonials();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete testimonial');
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
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
          {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Person name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Job title or company"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo
            </label>
            <ImageUploader
              label="Upload Photo"
              folder="testimonials"
              preview={formData.photo}
              onUpload={(url) => setFormData({ ...formData, photo: url })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description / Testimonial Text
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter the testimonial text or feedback..."
              rows={5}
            />
          </div>

          <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            {editingId ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Testimonials</h2>

        {loading ? (
          <p className="text-gray-600">Loading testimonials...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-gray-600">No testimonials found. Add one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                {testimonial.photo && (
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{testimonial.position}</p>
                  {testimonial.description && (
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">{testimonial.description}</p>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="flex items-center gap-2 flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                    >
                      <AiOutlineEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="flex items-center gap-2 flex-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                    >
                      <AiOutlineDelete /> Delete
                    </button>
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
