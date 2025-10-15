'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/auth/register');
  }, [router]);
  return <div>Redirecting...</div>;
}
