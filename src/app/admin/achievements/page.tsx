'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { Achievement } from '@/types';

export default function AchievementsAdmin() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    image: ''
  });

  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    try {
      setLoading(true);
      const response = await fetch('/api/achievements');
      if (!response.ok) throw new Error('Failed to fetch achievements');
      const data = await response.json();
      setAchievements(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load achievements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({ title: '', image: '' });
    setEditingId(null);
  }

  function handleEdit(achievement: Achievement) {
    setFormData({ title: achievement.title, image: achievement.image });
    setEditingId(achievement.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title || !formData.image) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const url = editingId ? `/api/achievements/${editingId}` : '/api/achievements';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save achievement');

      setSuccess(editingId ? 'Achievement updated!' : 'Achievement added!');
      resetForm();
      await fetchAchievements();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save achievement');
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure?')) return;

    try {
      const response = await fetch(`/api/achievements/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');

      setSuccess('Achievement deleted!');
      await fetchAchievements();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete achievement');
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Achievements</h1>
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
          {editingId ? 'Edit Achievement' : 'Add New Achievement'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Achievement title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image <span className="text-red-500">*</span>
            </label>
            <ImageUploader
              label="Upload Achievement Image"
              folder="achievements"
              preview={formData.image}
              onUpload={(url) => setFormData({ ...formData, image: url })}
            />
          </div>

          <button type="submit" className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            {editingId ? 'Update Achievement' : 'Add Achievement'}
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Achievements</h2>

        {loading ? (
          <p className="text-gray-600">Loading achievements...</p>
        ) : achievements.length === 0 ? (
          <p className="text-gray-600">No achievements found. Add one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                {achievement.image && <img src={achievement.image} alt={achievement.title} className="w-full h-48 object-cover" />}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{achievement.title}</h3>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(achievement)}
                      className="flex items-center gap-2 flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                    >
                      <AiOutlineEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
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
