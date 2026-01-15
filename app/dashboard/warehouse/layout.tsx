'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function WarehouseDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const user = getCurrentUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user || user.role !== 'warehouse') {
      router.push('/auth/login/warehouse');
      return;
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

  if (!user || user.role !== 'warehouse') {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === '/dashboard/warehouse') return 'Warehouse Dashboard';
    if (pathname === '/dashboard/warehouse/incoming') return 'Incoming Shipments';
    if (pathname?.startsWith('/dashboard/warehouse/confirm/')) return 'Confirm Goods Received';
    return 'Warehouse Dashboard';
  };

  const getMainContentMargin = () => {
    // During SSR and initial render, use default desktop margin
    if (!mounted) {
      return '14rem';
    }
    if (isMobile) {
      // On mobile, sidebar overlays when collapsed (0 margin), pushes content when expanded
      return sidebarCollapsed ? '0' : '14rem';
    }
    // On desktop, adjust margin based on collapsed state
    // 14rem = 224px (w-56) when expanded, 5rem = 80px (w-20) when collapsed
    return sidebarCollapsed ? '5rem' : '14rem';
  };

  // Always render the same structure to prevent hydration mismatch
  // The Sidebar component handles its own state and will update after mount

  return (
    <div className="flex min-h-screen bg-secondary">
      <Sidebar role="warehouse" onToggle={setSidebarCollapsed} />
      <div 
        className="flex-1 flex flex-col transition-all duration-300"
        style={{ marginLeft: getMainContentMargin() }}
      >
        <Topbar title={getPageTitle()} role="warehouse" userName={user.name} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

