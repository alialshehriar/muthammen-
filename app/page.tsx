'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page
    router.push('/home');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">بذرة</h1>
        <p className="text-xl">جاري التحميل...</p>
      </div>
    </div>
  );
}

