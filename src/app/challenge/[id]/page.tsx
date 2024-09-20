'use client';

import { useAuth } from '@/components/AuthProvider';
import { withAuth } from '@/components/withAuth';
import Link from 'next/link';

function Challenge({ params }: { params: { id: string } }) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Challenge {params.id}</h1>
        <p className="mb-4">Welcome, {user?.email}! This is a protected challenge page.</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default withAuth(Challenge);