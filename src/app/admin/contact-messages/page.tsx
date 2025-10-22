'use client';

import { useEffect, useState } from 'react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
}

export default function ContactMessagesAdmin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (data.success) {
        setMessages(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-slate-600">Loading messages...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Messages</h1>
        <p className="text-slate-600">View and manage contact form submissions</p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No messages yet</h3>
          <p className="text-slate-500">Contact form submissions will appear here</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {messages.map((message) => (
                  <tr key={message.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm text-slate-900">#{message.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{message.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{message.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{message.phone}</td>
                    <td className="px-6 py-4 text-sm text-slate-900">{message.subject}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedMessage(message)}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Message Details</h3>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Name</label>
                <p className="text-lg font-semibold text-slate-900">{selectedMessage.name}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Email</label>
                  <p className="text-sm text-slate-900">{selectedMessage.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase">Phone</label>
                  <p className="text-sm text-slate-900">{selectedMessage.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Subject</label>
                <p className="text-sm text-slate-900">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Message</label>
                <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedMessage.message}
                </p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Received</label>
                <p className="text-sm text-slate-600">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-3 pt-4">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center font-semibold"
                >
                  Reply via Email
                </a>
                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-center font-semibold"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
