'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function ClientDashboardLayout({
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
    if (!user || user.role !== 'client') {
      router.push('/auth/login/client');
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

  if (!user || user.role !== 'client') {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === '/dashboard/client') return 'Client Dashboard';
    if (pathname === '/dashboard/client/shipments') return 'My Shipments';
    if (pathname?.startsWith('/dashboard/client/shipments/new')) return 'Create New Shipment';
    if (pathname?.startsWith('/dashboard/client/shipments/')) return 'Shipment Details';
    return 'Client Dashboard';
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
      <Sidebar role="client" onToggle={setSidebarCollapsed} />
      <div 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: getMainContentMargin() }}
      >
        <Topbar title={getPageTitle()} role="client" userName={user.name} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

