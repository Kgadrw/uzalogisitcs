'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'client') {
        router.push('/dashboard/client');
      } else if (user.role === 'warehouse') {
        router.push('/dashboard/warehouse');
      } else if (user.role === 'admin') {
        router.push('/dashboard/admin');
      }
    } else {
      // Default to client login if not logged in
      router.push('/auth/login/client');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center">
      <div className="text-primary">Loading...</div>
    </div>
  );
}

