'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  HiCurrencyDollar
} from 'react-icons/hi';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';

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
  { href: '/dashboard/admin/pricing', label: 'Pricing Management', icon: HiCurrencyDollar },
];

export default function Sidebar({ role, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load collapsed state from localStorage on mount (after hydration)
  useEffect(() => {
    if (!mounted) return;
    
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      const isCollapsed = savedState === 'true';
      setCollapsed(isCollapsed);
      onToggle?.(isCollapsed);
    }
  }, [mounted, onToggle]);

  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
    onToggle?.(newState);
  };

  const navItems = 
    role === 'client' ? clientNavItems :
    role === 'warehouse' ? warehouseNavItems :
    adminNavItems;

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-primary overflow-y-auto z-20 transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className={`p-6 ${collapsed ? 'px-4' : ''}`}>
        <div className={`mb-8 flex items-center gap-2 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="flex-shrink-0 w-16 h-16">
              <Image 
                src="/logo.png" 
                alt="Logo" 
                width={64} 
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          {/* Toggle button - always visible */}
          <button
            onClick={toggleSidebar}
            className={`flex items-center justify-center p-2 text-secondary hover:bg-secondary hover:bg-opacity-10 rounded transition-colors ${
              collapsed ? 'w-full' : ''
            }`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <HiOutlineChevronRight className="w-5 h-5 text-secondary" />
            ) : (
              <HiOutlineChevronLeft className="w-5 h-5 text-secondary" />
            )}
          </button>
        </div>

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
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive 
                    ? 'bg-secondary bg-opacity-10 border-l-4 border-secondary' 
                    : 'hover:bg-secondary hover:bg-opacity-5'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0 text-secondary" />
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

