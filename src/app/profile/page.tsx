'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import AccessibilitySettings from '@/components/AccessibilitySettings';
import Login from '@/components/Login';
import Signup from '@/components/Signup';
import LogoutButton from '@/components/LogoutButton';

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
        <div className="flex flex-col items-center">
          <Link href="/challenge/1" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Start Challenge
          </Link>
          <Link href="/profile" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
            View Profile
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <div>
          <p className="mb-4">Please sign in to start a challenge.</p>
          <div className="flex space-x-4">
            <Login />
            <Signup />
          </div>
        </div>
      )}
      <div className="mt-8">
        <AccessibilitySettings onSettingsChange={() => {}} />
      </div>
    </main>
  );
}