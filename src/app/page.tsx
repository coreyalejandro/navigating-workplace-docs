import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Workplace Document Navigator</h1>
      <p className="mb-4">Practice navigating workplace documents with timed challenges.</p>
      <Link href="/challenge/1" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Start Challenge
      </Link>
    </main>
  );
}