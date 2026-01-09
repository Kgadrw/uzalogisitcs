'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'client') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'client') {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === '/client') return 'Client Dashboard';
    if (pathname === '/client/shipments') return 'My Shipments';
    if (pathname?.startsWith('/client/shipments/new')) return 'Create New Shipment';
    if (pathname?.startsWith('/client/shipments/')) return 'Shipment Details';
    return 'Client Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar role="client" />
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <Topbar title={getPageTitle()} role="client" userName={user.name} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

