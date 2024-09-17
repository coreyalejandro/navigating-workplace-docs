'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import AccessibilitySettings from '@/components/AccessibilitySettings';
import Auth from '@/components/Auth';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Workplace Document Navigator</h1>
      <p className="mb-4">Practice navigating workplace documents with timed challenges.</p>
      {user ? (
        <Link href="/challenge/1" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Challenge
        </Link>
      ) : (
        <p>Please sign in to start a challenge.</p>
      )}
      <div className="mt-8">
        <AccessibilitySettings onSettingsChange={() => {}} />
      </div>
      <div className="mt-8">
        <Auth />
      </div>
    </main>
  );
}