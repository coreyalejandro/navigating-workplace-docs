'use client';

import { useAuth } from '@/components/AuthProvider';
import LogoutButton from '@/components/LogoutButton';
import Link from 'next/link';

export default function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        <p>Please log in to view this page.</p>
        <Link href="/">Go to Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <p className="mb-2">Email: {user.email}</p>
        <p className="mb-4">User ID: {user.uid}</p>
        <LogoutButton />
        <Link href="/" className="block mt-4 text-blue-500 hover:text-blue-700">
          Go to Home
        </Link>
      </div>
    </div>
  );
}