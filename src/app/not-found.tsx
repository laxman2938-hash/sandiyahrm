import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold mb-6">404</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-blue-100 mb-8">Sorry, we couldn't find the page you're looking for.</p>
        <Link
          href="/"
          className="inline-block bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition transform hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
