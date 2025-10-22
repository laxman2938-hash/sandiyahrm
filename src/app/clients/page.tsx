'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Client } from '@/types';
import Link from 'next/link';

export default function ClientsPage() {
  const t = useTranslations();
  const locale = useLocale();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response: any = await api.getClients();
        setClients(Array.isArray(response) ? response : response.data?.results || response.data || []);
      } catch (err) {
        setError(t('common.error'));
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [t]);

  if (loading) return (
    <div className="text-center py-20 md:py-40 text-xl md:text-2xl text-slate-600">
      <div className="animate-pulse">Loading clients...</div>
    </div>
  );
  if (error) return (
    <div className="text-center py-20 md:py-40 text-red-600 text-xl md:text-2xl">{error}</div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 text-white py-12 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <span className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6 text-xs md:text-sm font-semibold text-blue-100">
              🤝 Our Partners
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 md:mb-4 leading-tight animate-fade-in-up">Our Clients</h1>
            <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto px-2">
              Trusted by leading organizations across Nepal and the globe
            </p>
          </div>
        </div>
      </section>

      {/* Clients Grid - Advanced Responsive */}
      <section className="py-12 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
         

          {clients.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
              {clients.map((client, idx) => (
                <div
                  key={client.id}
                  className="group"
                  style={{ animation: `slideInUp 0.6s ease-out ${idx * 0.05}s forwards`, opacity: 0 }}
                >
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-lg md:rounded-2xl p-3 md:p-6 hover:shadow-lg transition transform hover:-translate-y-2 hover:border-blue-300 h-full flex flex-col items-center justify-center">
                    <div className="w-full h-16 md:h-24 flex items-center justify-center mb-2 md:mb-4">
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition"
                      />
                    </div>
                    {/* <p className="text-xs md:text-sm font-semibold text-slate-900 text-center line-clamp-2">{client.name}</p> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-20">
              <div className="text-5xl md:text-6xl mb-3 md:mb-4">🏢</div>
              <p className="text-base md:text-xl text-slate-600">No clients to display at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* About Partnership Section */}
      <section className="py-12 md:py-24 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-4">Strategic Partnerships</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-900">Why Partner With Us?</h2>
              <p className="text-sm md:text-lg text-slate-700 mb-4 md:mb-6 leading-relaxed">
                We have established trusted partnerships with leading organizations across multiple industries. Our clients value our commitment to excellence, reliability, and delivering top-tier talent.
              </p>
              <div className="space-y-3 md:space-y-4">
                {[
                  '500+ Global Client Network',
                  '10+ Years of Industry Experience',
                  'Dedicated Account Management'
                ].map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl text-blue-600 flex-shrink-0">✓</span>
                    <span className="text-sm md:text-base text-slate-700 font-semibold">{stat}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl p-8 md:p-12 text-white text-center h-64 md:h-96 flex items-center justify-center">
              <div>
                <div className="text-5xl md:text-7xl mb-3 md:mb-4">🤝</div>
                <p className="text-lg md:text-2xl font-bold">Building Long-term Relationships</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    



      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
