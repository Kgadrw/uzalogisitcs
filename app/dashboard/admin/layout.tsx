'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/auth/login/admin');
    }
    // Load initial sidebar state
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(savedState === 'true');
    }
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === '/dashboard/admin') return 'Admin Dashboard';
    if (pathname === '/dashboard/admin/clients') return 'Client Management';
    if (pathname === '/dashboard/admin/warehouses') return 'Warehouse Management';
    if (pathname === '/dashboard/admin/shipments') return 'All Shipments';
    if (pathname === '/dashboard/admin/assisted') return 'Assisted Delivery';
    if (pathname === '/dashboard/admin/pricing') return 'Pricing Management';
    return 'Admin Dashboard';
  };

  const getMainContentMargin = () => {
    if (isMobile) {
      // On mobile, sidebar overlays when collapsed (0 margin), pushes content when expanded
      return sidebarCollapsed ? '0' : '16rem';
    }
    // On desktop, always expanded (16rem = 256px = w-64) - no collapse option
    return '16rem';
  };

  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar role="admin" onToggle={setSidebarCollapsed} />
      <div 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: getMainContentMargin() }}
      >
        <Topbar title={getPageTitle()} role="admin" userName={user.name} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

