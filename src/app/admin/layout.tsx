'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page
      if (pathname === '/admin/login') {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();

        if (data.authenticated) {
          setAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
        router.refresh();
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: '📊' },
    { label: 'Team Members', href: '/admin/team-members', icon: '👥' },
    { label: 'Clients', href: '/admin/clients', icon: '🏢' },
    { label: 'Testimonials', href: '/admin/testimonials', icon: '⭐' },
    { label: 'Gallery', href: '/admin/gallery', icon: '🖼️' },
    { label: 'Achievements', href: '/admin/achievements', icon: '🏆' },
    { label: 'Demand Letters', href: '/admin/demand-letters', icon: '📋' },
    { label: 'Legal Documents', href: '/admin/legal-documents', icon: '📄' },
    { label: 'Contact Messages', href: '/admin/contact-messages', icon: '✉️' },
  ];

  // Show login page
  if (pathname === '/admin/login') {
    return children;
  }

  // Show loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Protected content
  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl">
              🔐
            </div>
            <div>
              <h1 className="text-xl font-bold">Sandiya HR Admin</h1>
              <p className="text-xs text-blue-100">Content Management System</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition text-sm font-semibold"
            >
              View Site →
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition text-sm font-semibold flex items-center gap-2"
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition group ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'hover:bg-blue-50 hover:text-blue-600'
                      }`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
