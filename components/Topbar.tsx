'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/lib/auth';
import { UserRole } from '@/lib/auth';
import { HiOutlineBell, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

interface TopbarProps {
  title: string;
  role: UserRole;
  userName: string;
}

export default function Topbar({ title, role, userName }: TopbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    // Redirect to role-specific login page
    if (role === 'client') {
      router.push('/auth/login/client');
    } else if (role === 'warehouse') {
      router.push('/auth/login/warehouse');
    } else {
      router.push('/auth/login/admin');
    }
  };

  const roleLabel = 
    role === 'client' ? 'Client' :
    role === 'warehouse' ? 'Warehouse Partner' :
    'Admin';

  return (
    <div className="sticky top-0 z-10 bg-secondary border-b border-primary border-opacity-20 px-4 md:px-6 py-4 flex items-center justify-between">
      <h2 className="text-primary text-lg md:text-2xl truncate">{title}</h2>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="text-primary text-xs md:text-sm hidden md:block">
          <span>{userName}</span>
          <span className="ml-2 opacity-70">({roleLabel})</span>
        </div>
        <button 
          className="p-2 text-primary hover:bg-primary hover:bg-opacity-5 rounded transition-colors"
          aria-label="Notifications"
        >
          <HiOutlineBell className="w-5 h-5" />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-secondary hover:bg-opacity-90 transition-colors"
        >
          <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}

