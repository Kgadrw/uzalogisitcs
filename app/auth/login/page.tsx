'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineTruck } from 'react-icons/hi2';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to client login as default (or show error)
    // This page should not be accessible - each role has their own login URL
    router.push('/auth/login/client');
  }, [router]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="text-primary">Redirecting...</div>
    </div>
  );
}
