'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function WarehouseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'warehouse') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'warehouse') {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === '/warehouse') return 'Warehouse Dashboard';
    if (pathname === '/warehouse/incoming') return 'Incoming Shipments';
    if (pathname?.startsWith('/warehouse/confirm/')) return 'Confirm Goods Received';
    return 'Warehouse Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar role="warehouse" />
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <Topbar title={getPageTitle()} role="warehouse" userName={user.name} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

