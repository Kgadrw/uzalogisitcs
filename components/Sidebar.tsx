'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRole } from '@/lib/auth';
import { 
  HiHome, 
  HiTruck, 
  HiPlusCircle,
  HiClipboardList,
  HiUsers,
  HiOfficeBuilding,
  HiCube,
  HiPhone,
  HiTruck as TruckIcon,
  HiMenu,
  HiX
} from 'react-icons/hi';

interface SidebarProps {
  role: UserRole;
  onToggle?: (collapsed: boolean) => void;
}

const clientNavItems = [
  { href: '/dashboard/client', label: 'Dashboard', icon: HiHome },
  { href: '/dashboard/client/shipments', label: 'My Shipments', icon: HiTruck },
  { href: '/dashboard/client/shipments/new', label: 'Create Shipment', icon: HiPlusCircle },
];

const warehouseNavItems = [
  { href: '/dashboard/warehouse', label: 'Dashboard', icon: HiHome },
  { href: '/dashboard/warehouse/incoming', label: 'Incoming Shipments', icon: HiClipboardList },
];

const adminNavItems = [
  { href: '/dashboard/admin', label: 'Dashboard', icon: HiHome },
  { href: '/dashboard/admin/clients', label: 'Client Management', icon: HiUsers },
  { href: '/dashboard/admin/warehouses', label: 'Warehouse Management', icon: HiOfficeBuilding },
  { href: '/dashboard/admin/shipments', label: 'All Shipments', icon: HiCube },
  { href: '/dashboard/admin/assisted', label: 'Assisted Delivery', icon: HiPhone },
];

export default function Sidebar({ role, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, always keep expanded
      if (!mobile) {
        setCollapsed(false);
        onToggle?.(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [onToggle]);

  // Load collapsed state from localStorage on mount (only for mobile)
  useEffect(() => {
    if (isMobile) {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState !== null) {
        const isCollapsed = savedState === 'true';
        setCollapsed(isCollapsed);
        onToggle?.(isCollapsed);
      }
    }
  }, [isMobile, onToggle]);

  const toggleSidebar = () => {
    // Only allow toggle on mobile
    if (!isMobile) return;
    
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
    onToggle?.(newState);
  };

  const navItems = 
    role === 'client' ? clientNavItems :
    role === 'warehouse' ? warehouseNavItems :
    adminNavItems;

  // On desktop, always expanded. On mobile, use collapsed state
  const isCollapsed = isMobile && collapsed;

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-primary overflow-y-auto z-20 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`p-6 ${isCollapsed ? 'px-4' : ''}`}>
        <div className={`mb-8 flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`}>
          <TruckIcon className="w-6 h-6 text-secondary flex-shrink-0" />
          {!isCollapsed && <h1 className="text-secondary text-xl">Uza Logistics</h1>}
        </div>
        
        {/* Only show toggle button on mobile */}
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="mb-4 w-full flex items-center justify-center p-2 text-secondary hover:bg-secondary hover:bg-opacity-10 rounded transition-colors"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <HiMenu className="w-6 h-6" />
            ) : (
              <HiX className="w-6 h-6" />
            )}
          </button>
        )}

        <nav className="space-y-2">
          {navItems.map((item) => {
            // Improved active state detection
            const isExactMatch = pathname === item.href;
            const isNestedMatch = item.href !== '/dashboard/client' && 
                                  item.href !== '/dashboard/warehouse' && 
                                  item.href !== '/dashboard/admin' && 
                                  pathname?.startsWith(item.href);
            const isActive = isExactMatch || isNestedMatch;
            
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-secondary transition-colors rounded ${
                  isCollapsed ? 'justify-center' : ''
                } ${
                  isActive 
                    ? 'bg-secondary bg-opacity-10 border-l-4 border-secondary' 
                    : 'hover:bg-secondary hover:bg-opacity-5'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

