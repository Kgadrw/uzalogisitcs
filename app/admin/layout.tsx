'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Admin Dashboard';
    if (pathname === '/admin/clients') return 'Client Management';
    if (pathname === '/admin/warehouses') return 'Warehouse Management';
    if (pathname === '/admin/shipments') return 'All Shipments';
    if (pathname === '/admin/assisted') return 'Assisted Delivery';
    return 'Admin Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        <Topbar title={getPageTitle()} role="admin" userName={user.name} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

