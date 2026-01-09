'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCurrentUser } from '@/lib/auth';
import { HiOutlineTruck, HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login - replace with actual auth
    const user = {
      id: '1',
      name: 'Admin User',
      role: 'admin' as const,
      email,
    };
    
    setCurrentUser(user);
    router.push('/dashboard/admin');
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md border border-primary border-opacity-20 p-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HiOutlineTruck className="w-8 h-8 text-primary" />
          <h1 className="text-primary text-3xl">Uza Logistics</h1>
        </div>
        <p className="text-primary text-opacity-70 text-center mb-2">Admin Portal</p>
        <p className="text-primary text-opacity-70 text-center mb-8">Sign in to your account</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlineEnvelope className="w-4 h-4" />
              <span>Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-primary mb-2">
              <HiOutlineLockClosed className="w-4 h-4" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-secondary py-3 hover:bg-opacity-90"
          >
            <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
}

