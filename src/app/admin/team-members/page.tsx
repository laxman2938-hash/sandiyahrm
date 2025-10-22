'use client';

import { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

interface TeamMember {
  id: number;
  name: string;
  designation?: string;
  image: string;
}

export default function TeamMembersAdmin() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    image: ''
  });

  // Fetch team members
  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      setLoading(true);
      const response = await fetch('/api/team-members');
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setMembers(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError('Failed to load team members');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({
      name: '',
      designation: '',
      image: ''
    });
    setEditingId(null);
  }

  function handleEdit(member: TeamMember) {
    setFormData({
      name: member.name,
      designation: member.designation || '',
      image: member.image
    });
    setEditingId(member.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.image) {
      setError('Please fill in all required fields (name and photo)');
      return;
    }

    try {
      const url = editingId 
        ? `/api/team-members/${editingId}` 
        : '/api/team-members';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to save team member');

      setSuccess(editingId ? 'Team member updated!' : 'Team member added!');
      resetForm();
      await fetchMembers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save team member');
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this team member?')) return;

    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete team member');

      setSuccess('Team member deleted!');
      await fetchMembers();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete team member');
      console.error(err);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Team Members</h1>
        {editingId && (
          <button
            onClick={resetForm}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel Edit
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Form */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="Team member name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., Managing Director (optional)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Photo <span className="text-red-500">*</span>
            </label>
            <ImageUploader
              label="Upload Photo"
              folder="team-members"
              preview={formData.image}
              onUpload={(url) => setFormData({ ...formData, image: url })}
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            {editingId ? 'Update Team Member' : 'Add Team Member'}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Members List</h2>

        {loading ? (
          <p className="text-gray-600">Loading team members...</p>
        ) : members.length === 0 ? (
          <p className="text-gray-600">No team members found. Add one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                {member.image && (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
                  <p className="text-sm text-blue-600 font-semibold">{member.designation}</p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex items-center gap-2 flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                    >
                      <AiOutlineEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
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
